#include "duv.h"
#include "misc.h"
#include <inttypes.h>
#include <string.h>
#include <sys/stat.h>
#include "ruff.h"

static uv_loop_t loop;

// Sync readfile using libuv APIs as an API function.
static duk_ret_t duv_loadfile(duk_context *ctx) {
  const char* path = duk_require_string(ctx, 0);
  uv_fs_t req;
  int fd = 0;
  uint64_t size;
  char* chunk;
  uv_buf_t buf;

  if (uv_fs_open(&loop, &req, path, O_RDONLY, 0644, NULL) < 0) {
    goto fail;
  }
  uv_fs_req_cleanup(&req);

  fd = req.result;
  if (uv_fs_fstat(&loop, &req, fd, NULL) < 0) {
    uv_fs_req_cleanup(&req);
    goto fail;
  }
  uv_fs_req_cleanup(&req);
  size = req.statbuf.st_size;
  chunk = duk_alloc(ctx, size);
  buf = uv_buf_init(chunk, size);
  if (uv_fs_read(&loop, &req, fd, &buf, 1, 0, NULL) < 0) {
    duk_free(ctx, chunk);
    uv_fs_req_cleanup(&req);
    goto fail;
  }
  uv_fs_req_cleanup(&req);

  duk_push_lstring(ctx, chunk, size);
  duk_free(ctx, chunk);

  uv_fs_close(&loop, &req, fd, NULL);
  uv_fs_req_cleanup(&req);

  return 1;

fail:
  if (fd) {
    uv_fs_close(&loop, &req, fd, NULL);
  }
  uv_fs_req_cleanup(&req);
  duk_error(ctx, DUK_ERR_ERROR, "%s: %s: %s", uv_err_name(req.result), uv_strerror(req.result), path);
}

static duk_ret_t duv_path_join(duk_context *ctx) {
  printf("please implement in JS side\n");
  return 0;
}

static duk_ret_t duv_require(duk_context *ctx) {
  int is_main = 0;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {"id", duk_is_string},
    {NULL}
  });

  // push Duktape
  duk_get_global_string(ctx, "Duktape");

  // id = Duktape.modResolve(this, id);
  duk_get_prop_string(ctx, -1, "modResolve");
  duk_push_this(ctx);
  {
    // Check if we're in main
    duk_get_prop_string(ctx, -1, "exports");
    if (duk_is_undefined(ctx, -1)) { is_main = 1; }
    duk_pop(ctx);
  }
  duk_dup(ctx, 0);
  duk_call_method(ctx, 1);
  duk_replace(ctx, 0);

  // push Duktape.modLoaded
  duk_get_prop_string(ctx, -1, "modLoaded");

  // push Duktape.modLoaded[id];
  duk_dup(ctx, 0);
  duk_get_prop(ctx, -2);

  // if (typeof Duktape.modLoaded[id] === 'object') {
  //   return Duktape.modLoaded[id].exports;
  // }
  if (duk_is_object(ctx, -1)) {
    duk_get_prop_string(ctx, -1, "exports");
    return 1;
  }

  // pop Duktape.modLoaded[id]
  duk_pop(ctx);

  // push module = { id: id, exports: {} }
  duk_push_object(ctx);
  duk_dup(ctx, 0);
  duk_put_prop_string(ctx, -2, "id");
  duk_push_object(ctx);
  duk_put_prop_string(ctx, -2, "exports");

  // Set module.main = true if we're the first script
  if (is_main) {
    duk_push_boolean(ctx, 1);
    duk_put_prop_string(ctx, -2, "main");
  }

  // Or set module.parent = parent if we're a child.
  else {
    duk_push_this(ctx);
    duk_put_prop_string(ctx, -2, "parent");
  }

  // Set the prototype for the module to access require.
  duk_push_global_stash(ctx);
  duk_get_prop_string(ctx, -1, "modulePrototype");
  duk_set_prototype(ctx, -3);
  duk_pop(ctx);

  // Duktape.modLoaded[id] = module
  duk_dup(ctx, 0);
  duk_dup(ctx, -2);
  duk_put_prop(ctx, -4);

  // remove Duktape.modLoaded
  duk_remove(ctx, -2);

  // push Duktape.modLoad(module)
  duk_get_prop_string(ctx, -2, "modLoad");
  duk_dup(ctx, -2);
  duk_call_method(ctx, 0);

  // if ret !== undefined module.exports = ret;
  if (duk_is_undefined(ctx, -1)) {
    duk_pop(ctx);
  }
  else {
    duk_put_prop_string(ctx, -2, "exports");
  }

  duk_get_prop_string(ctx, -1, "exports");

  return 1;
}

// Default implementation for modResolve
// Duktape.modResolve = function (parent, id) {
//   return pathJoin(parent.id, "..", id);
// };
static duk_ret_t duv_mod_resolve(duk_context *ctx) {
  dschema_check(ctx, (const duv_schema_entry[]) {
    {"id", duk_is_string},
    {NULL}
  });

  duk_push_this(ctx);
  duk_push_c_function(ctx, duv_path_join, DUK_VARARGS);
  duk_get_prop_string(ctx, -2, "id");
  duk_push_string(ctx, "..");
  duk_dup(ctx, 0);
  duk_call(ctx, 3);

  return 1;
}

// Default Duktape.modLoad implementation
// return Duktape.modCompile.call(module, loadFile(module.id));
//     or load shared libraries using Duktape.loadlib.
static duk_ret_t duv_mod_load(duk_context *ctx) {
  const char* id;
  const char* ext;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {NULL}
  });

  duk_get_global_string(ctx, "Duktape");
  duk_push_this(ctx);
  duk_get_prop_string(ctx, -1, "id");
  id = duk_get_string(ctx, -1);
  if (!id) {
    duk_error(ctx, DUK_ERR_ERROR, "Missing id in module");
    return 0;
  }

  // calculate the extension to know which compiler to use.
  ext = id + strlen(id);
  while (ext > id && ext[0] != '.') { --ext; }

  if (strcmp(ext, ".js") == 0) {
    // Stack: [Duktape, this, id]
    duk_push_c_function(ctx, duv_loadfile, 1);
    // Stack: [Duktape, this, id, loadfile]
    duk_insert(ctx, -2);
    // Stack: [Duktape, this, loadfile, id]
    duk_call(ctx, 1);
    // Stack: [Duktape, this, data]
    duk_get_prop_string(ctx, -3, "modCompile");
    // Stack: [Duktape, this, data, modCompile]
    duk_insert(ctx, -3);
    // Stack: [Duktape, modCompile, this, data]
    duk_call_method(ctx, 1);
    // Stack: [Duktape, exports]
    return 1;
  }

  if (strcmp(ext, ".so") == 0 || strcmp(ext, ".dll") == 0) {
    const char* name = ext;
    while (name > id && name[-1] != '/' && name[-1] != '\\') { --name; }
    // Stack: [Duktape, this, id]
    duk_get_prop_string(ctx, -3, "loadlib");
    // Stack: [Duktape, this, id, loadlib]
    duk_insert(ctx, -2);
    // Stack: [Duktape, this, loadlib, id]
    duk_push_sprintf(ctx, "dukopen_%.*s", (int)(ext - name), name);
    // Stack: [Duktape, this, loadlib, id, name]
    duk_call(ctx, 2);
    // Stack: [Duktape, this, fn]
    duk_call(ctx, 0);
    // Stack: [Duktape, this, exports]
    duk_dup(ctx, -1);
    // Stack: [Duktape, this, exports, exports]
    duk_put_prop_string(ctx, -3, "exports");
    // Stack: [Duktape, this, exports]
    return 1;
  }

  duk_error(ctx, DUK_ERR_ERROR,
    "Unsupported extension: '%s', must be '.js', '.so', or '.dll'.", ext);
  return 0;
}

// Load a duktape C function from a shared library by path and name.
static duk_ret_t duv_loadlib(duk_context *ctx) {
  const char *name, *path;
  uv_lib_t lib;
  duk_c_function fn;

  // Check the args
  dschema_check(ctx, (const duv_schema_entry[]) {
    {"path", duk_is_string},
    {"name", duk_is_string},
    {NULL}
  });

  path = duk_get_string(ctx, 0);
  name = duk_get_string(ctx, 1);

  if (uv_dlopen(path, &lib)) {
    duk_error(ctx, DUK_ERR_ERROR, "Cannot load shared library %s", path);
    return 0;
  }
  if (uv_dlsym(&lib, name, (void**)&fn)) {
    duk_error(ctx, DUK_ERR_ERROR, "Unable to find %s in %s", name, path);
    return 0;
  }
  duk_push_c_function(ctx, fn, 0);
  return 1;
}

// Given a module and js code, compile the code and execute as CJS module
// return the result of the compiled code ran as a function.
// Stack: [code or bytecode, injection]
static duk_ret_t duv_mod_compile(duk_context *ctx) {
  const char* injection;

  // -> [code or bytecode, injection]
  if (duk_is_string(ctx, -1)) {
    injection = duk_get_string(ctx, -1);
  } else {
    injection = "";
  }

  // -> [code or bytecode]
  duk_pop(ctx);

  const uint8_t* code_ptr = duk_get_buffer_data(ctx, -1, NULL);

  // Prepare module wrapper function.
  if (code_ptr && code_ptr[0] == 0xbf) {
    // -> [module wrapper function]
    duk_load_function(ctx);
  } else {
    if (duk_is_buffer(ctx, -1)) {
      duk_buffer_to_string(ctx, -1);
    }
    // -> [code, this]
    duk_push_this(ctx);
    // -> [code, this, this.id]
    duk_get_prop_string(ctx, -1, "id");
    // -> [code, this.id]
    duk_remove(ctx, -2);
    // -> [module wrapper function]
    duk_compile(ctx, DUK_COMPILE_FUNCTION);
  }

  // Push `this`.
  // -> [module wrapper function, this]
  duk_push_this(ctx);

  // Push first argument `__filename`.
  // -> [module wrapper function, this, __filename]
  duk_get_prop_string(ctx, -1, "id");

  // Push second argument `__dirname`.
  // -> [module wrapper function, this, __filename, __dirname]
  duk_push_string(ctx, ruff_get_dirname(duk_get_string(ctx, -1)));

  // Push third argument `module`.
  // -> [module wrapper function, this, __filename, __dirname, module]
  duk_push_this(ctx);

  // Prepare fourth argument `exports`.
  // -> [module wrapper function, this, __filename, __dirname, module, exports]
  duk_get_prop_string(ctx, -1, "exports");

  // Prepare fifth argument `require` and bind it with current module.
  // -> [..., module, exports, module.require]
  duk_get_prop_string(ctx, -2, "require");
  // -> [..., module, exports, module.require, "bind"]
  duk_push_string(ctx, "bind");
  // -> [..., module, exports, module.require, "bind", module]
  duk_push_this(ctx);
  // -> [..., module, exports, module.require, module.require.bind(module)]
  duk_call_prop(ctx, -3, 1);
  // -> [..., module, exports, module.require.bind(module)]
  duk_remove(ctx, -2);

  // Prepare `resolve` method for `require`.
  // -> [..., module, exports, module.require.bind(module), global]
  duk_push_global_object(ctx);
  // -> [..., module, exports, module.require.bind(module), global, Duktape]
  duk_get_prop_string(ctx, -1, "Duktape");
  // -> [..., module, exports, module.require.bind(module), Duktape]
  duk_remove(ctx, -2);
  // -> [..., module, exports, module.require.bind(module), Duktape, Duktape.modResolve]
  duk_get_prop_string(ctx, -1, "modResolve");
  // -> [..., module, exports, module.require.bind(module), Duktape.modResolve]
  duk_remove(ctx, -2);
  // -> [..., module, exports, module.require.bind(module), Duktape.modResolve, "bind"]
  duk_push_string(ctx, "bind");
  // -> [..., module, exports, module.require.bind(module), Duktape.modResolve, "bind", module]
  duk_push_this(ctx);
  // -> [..., module, exports, module.require.bind(module), Duktape.modResolve, Duktape.modResolve.bind(module)]
  duk_call_prop(ctx, -3, 1);
  // -> [..., module, exports, module.require.bind(module), Duktape.modResolve.bind(module)]
  duk_remove(ctx, -2);
  // -> [..., module, exports, module.require.bind(module)]
  duk_put_prop_string(ctx, -2, "resolve");

  // Push the last argument `injection`.
  // -> [..., module, exports, module.require.bind(module), injection]
  duk_push_string(ctx, injection);

  // -> [return value]
  duk_call_method(ctx, 6);

  return 1;
}

static duk_ret_t duv_main(duk_context *ctx) {
  int length;
  char run_path[PATH_MAX];
  size_t size = sizeof(run_path);
  const char *entry;

  duv_check(ctx, uv_exepath(run_path, &size));

  duk_push_global_object(ctx);
  duk_dup(ctx, -1);
  duk_put_prop_string(ctx, -2, "global");

  duk_push_boolean(ctx, 1);
  duk_put_prop_string(ctx, -2, "dukluv");

  // Load duv module into global uv
  duk_push_c_function(ctx, dukopen_uv, 0);
  duk_call(ctx, 0);
  duk_put_prop_string(ctx, -2, "uv");

  // Load ruff module into global ruff
  duk_push_c_function(ctx, dukopen_ruff, 0);
  duk_call(ctx, 0);
  duk_put_prop_string(ctx, -2, "ruff");
  duk_module_duktape_init(ctx);
  // Replace the module loader with Duktape 2.x polyfill.
  duk_get_prop_string(ctx, -1, "Duktape");
  duk_del_prop_string(ctx, -1, "modSearch");
  duk_push_c_function(ctx, duv_mod_compile, 2);
  duk_put_prop_string(ctx, -2, "modCompile");
  duk_push_c_function(ctx, duv_mod_resolve, 1);
  duk_put_prop_string(ctx, -2, "modResolve");
  duk_push_c_function(ctx, duv_mod_load, 0);
  duk_put_prop_string(ctx, -2, "modLoad");
  duk_push_c_function(ctx, duv_loadlib, 2);
  duk_put_prop_string(ctx, -2, "loadlib");
  duk_pop(ctx);

  // Put in some quick globals to test things.
  duk_push_c_function(ctx, duv_path_join, DUK_VARARGS);
  duk_put_prop_string(ctx, -2, "pathJoin");

  duk_push_c_function(ctx, duv_loadfile, 1);
  duk_put_prop_string(ctx, -2, "loadFile");

  // require.call({id:uv.cwd()+"/main.c"}, path);
  duk_push_c_function(ctx, duv_require, 1);
  {
    // Store this require function in the module prototype
    duk_push_global_stash(ctx);
    duk_push_object(ctx);
    duk_dup(ctx, -3);
    duk_put_prop_string(ctx, -2, "require");
    duk_put_prop_string(ctx, -2, "modulePrototype");
    duk_pop(ctx);
  }

  duk_print_alert_init(ctx, 0 /*flags*/);
  entry = ruff_get_bootstrap_lcode(&length);

  if (entry == NULL) {
    printf("fail to load entry file");
    return 0;
  }
  if (duk_pcompile_lstring(ctx, DUK_COMPILE_FUNCTION | DUK_COMPILE_STRICT, entry, length) != 0) {
    printf("compile failed: %s\n", duk_safe_to_string(ctx, -1));
  } else {
    duk_push_object(ctx);
    duk_push_string(ctx, run_path);
    duk_put_prop_string(ctx, -2, "id");

    //set prototyp.require
    duk_push_global_stash(ctx);
    duk_get_prop_string(ctx, -1, "modulePrototype");
    duk_set_prototype(ctx, -3);
    duk_pop(ctx);

    duk_dup(ctx, 0);
    duk_push_string(ctx, PROCESS_PLATFORM);
    duk_put_prop_string(ctx, -2, "platform");

    duk_push_c_function(ctx, ruff_get_buildin_js, 1);
    duk_put_prop_string(ctx, -2, "getBuildinJs");
    duk_call_method(ctx, 1);
    //int my_ret = duk_pcall_method(ctx, 1);      /* [ func ] -> [ result ] */
    //if (my_ret != DUK_EXEC_SUCCESS) {
    //    printf("error: %s\n", duk_buffer_to_string(ctx, -1));
    //    return -1;
    //}
  }

  uv_run(&loop, UV_RUN_DEFAULT);

  return 0;
}

int main(int argc, char *argv[]) {
  int ret = 0;
  duk_context *ctx = NULL;
  duk_idx_t arg_arr_idx;
  duk_idx_t env_arr_idx;

  uv_loop_init(&loop);

  uv_setup_args(argc, argv);

  ctx = duk_create_heap(NULL, NULL, NULL, &loop, NULL);
  if (!ctx) {
    fprintf(stderr, "Problem initiailizing duktape heap\n");
    return -1;
  }
  loop.data = ctx;

  ruff_handle_args(ctx, argc, (const char **) argv, &arg_arr_idx);
  ruff_handle_env(ctx, &env_arr_idx);

  duk_push_c_function(ctx, duv_main, 1);
  duk_push_object(ctx);

  duk_dup(ctx, arg_arr_idx);
  duk_put_prop_string(ctx, -2, "argv");

  duk_dup(ctx, env_arr_idx);
  duk_put_prop_string(ctx, -2, "env");

  duk_push_c_function(ctx, ruff_exit, 2);
  duk_put_prop_string(ctx, -2, "exit");

  duk_push_number(ctx, uv_hrtime());
  duk_put_prop_string(ctx, -2, "_up_hrtime");

  if (duk_pcall(ctx, 1) == DUK_EXEC_SUCCESS) {
    ret = 0;
  } else {
    if (duk_is_object(ctx, -1)) {
      duk_get_prop_string(ctx, -1, "stack");
    }
    else {
      fprintf(stderr, "\nThrown Value: %s\n\n", duk_json_encode(ctx, -1));
    }
    // handle exception in js side
    duk_push_c_function(ctx, ruff_handle_fatal, 1);
    duk_dup(ctx, -2);
    duk_pcall(ctx, 1);
    return 0;
  }

  _ruff_exit(ctx, 0, 0);
}
