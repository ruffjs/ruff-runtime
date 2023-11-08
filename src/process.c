#include "process.h"
#include "ruff.h"

#define ARRAY_SIZE(a) (sizeof(a) / sizeof((a)[0]))

static void js_exit_cb(uv_process_t* handle,
                       int64_t exit_status,
                       int term_signal) {
    duk_context *ctx = handle->loop->data;
    duk_push_uint(ctx, (unsigned int) exit_status);
    duk_push_uint(ctx, term_signal);
    duv_emit_event(ctx, handle->data, DUV_HANDLE, 2);
    // unnecessary to invoke duv_cleanup_handle since duv_close would do it
    // handle->data = duv_cleanup_handle(ctx, handle->data);
}

static void signal_cb(uv_signal_t * handle, int signal_num) {
    duk_context *ctx = handle->loop->data;
    duk_push_uint(ctx, (unsigned int) signal_num);
    duv_emit_event(ctx, handle->data, DUV_SIGNAL, 1);
}

static void set_stdio_for_pipe(duk_context *ctx, int stdio_idx,
                               uv_stdio_container_t* p_pipe_stdio) {
    p_pipe_stdio->flags = UV_CREATE_PIPE;
    if (duk_get_prop_string(ctx, stdio_idx, "handle")) {
        p_pipe_stdio->data.stream = (uv_stream_t*)duk_get_buffer(ctx, -1, NULL);
    }
    duk_pop(ctx);

    if (duk_get_prop_string(ctx, stdio_idx, "readable")) {
        if (duk_get_boolean(ctx, -1)) {
            p_pipe_stdio->flags |= UV_READABLE_PIPE;
        }
    }
    duk_pop(ctx);

    if (duk_get_prop_string(ctx, stdio_idx, "writable")) {
        if (duk_get_boolean(ctx, -1)) {
            p_pipe_stdio->flags |= UV_WRITABLE_PIPE;
        }
    }
    duk_pop(ctx);
}

#define RUFF_STDIO_MAX_NUM 4
static void parse_and_set_stdio(duk_context *ctx, int idx,
                                uv_stdio_container_t* p_child_stdios,
                                int* p_stdio_count) {

    int i=0;
    if (duk_get_prop_string(ctx, idx, "stdio")) {
        uv_stdio_container_t* p_stdio;

        if (duk_is_array(ctx, -1)) {
            duk_enum(ctx, -1, DUK_ENUM_ARRAY_INDICES_ONLY);
            while (duk_next(ctx, -1,  1)) {
                if (i >= RUFF_STDIO_MAX_NUM) {
                    duk_error(ctx, DUK_ERR_ERROR, "failed to parse params");
                }
                p_stdio = &p_child_stdios[i];
                if (duk_is_object(ctx, -1)) {
                    if (duk_get_prop_string(ctx, -1, "type")) {
                        const char* type = duk_to_string(ctx, -1);
                        if (strcmp("ignore", type) == 0) {
                            p_stdio->flags = UV_IGNORE;
                        } else if ((strcmp("inherit", type) == 0) || (strcmp("fd", type) == 0)) {
                            p_stdio->flags = UV_INHERIT_FD;
                            if (duk_get_prop_string(ctx, -2, "fd")) {
                                p_stdio->data.fd = duk_get_int(ctx, -1);
                            }
                            duk_pop(ctx); // fd
                        } else if (strcmp("pipe", type) == 0) {
                            set_stdio_for_pipe(ctx, -2, p_stdio);
                        }
                    }
                    duk_pop(ctx); // type
                }
                duk_pop_2(ctx);
                i++;
            }
            //pop ... enum
            duk_pop(ctx);
        } else {
            duk_error(ctx, DUK_ERR_ERROR, "failed to parse params");
        }

        *p_stdio_count = i;
    }

    duk_pop(ctx);
}

static void parse_and_set_uid(duk_context* ctx, int idx, uv_process_options_t* p_option) {
    if (duk_get_prop_string(ctx, idx, "uid")) {
        p_option->uid = duk_get_int(ctx, -1);
        p_option->flags |=  UV_PROCESS_SETUID;
    }
    duk_pop(ctx);
}

static void parse_and_set_gid(duk_context* ctx, int idx, uv_process_options_t* p_option) {
    if (duk_get_prop_string(ctx, idx, "gid")) {
        p_option->gid = duk_get_int(ctx, -1);
        p_option->flags |=  UV_PROCESS_SETGID;
    }
    duk_pop(ctx);
}

static void parse_and_set_cwd(duk_context* ctx, int idx, uv_process_options_t* p_option) {
    if (duk_get_prop_string(ctx, idx, "cwd")) {
        p_option->cwd = duk_to_string(ctx, -1);
    }
    duk_pop(ctx);
}

static void parse_and_set_env(duk_context* ctx, int idx,
                              char* buffer, int buffer_size,
                              char** env, int env_size) {
    if (duk_get_prop_string(ctx, idx, "env")) {
        if (ruff_array_to_args(ctx, -1, buffer, buffer_size,
                               env, env_size) < 0) {
            duk_error(ctx, DUK_ERR_ERROR, "failed to parse env");
        }
    }
    duk_pop(ctx);
}

static void parse_and_set_detach(duk_context* ctx,
                                 int idx,
                                 uv_process_options_t* p_option) {
    if (duk_get_prop_string(ctx, idx, "detached")) {
        if (duk_get_boolean(ctx, -1)) {
            p_option->flags = UV_PROCESS_DETACHED;
        }
    }
    duk_pop(ctx);
}

#define RUFF_SPAWN_MAX_ENV  64
#define RUFF_SPAWN_MAX_ARGS 64
#define RUFF_SPAWN_BUF_SIZE 4096

int ruff_uv_spawn(duk_context *ctx, ruff_uv_spawn_ctrl_t *ctrl) {
    uv_process_t *handle;
    uv_process_options_t options = { 0 };
    uv_stdio_container_t child_stdio[RUFF_STDIO_MAX_NUM];
    const char* command;
    char* args[RUFF_SPAWN_MAX_ARGS] = { 0 };
    char  buffer[RUFF_SPAWN_BUF_SIZE]= { 0 };
    char* env[RUFF_SPAWN_MAX_ENV] = { 0 };
    char  buffer_env[RUFF_SPAWN_BUF_SIZE] = { 0 };

    int func_idx = 2;
    command  = duk_get_string(ctx, 0);
    args[0]  = (char *) command;

    if (ruff_array_to_args(ctx, 1, buffer,
                           sizeof(buffer),
                           &args[1],
                           (sizeof(args)/(sizeof(char *)) - 1)) < 0) {
        duk_error(ctx, DUK_ERR_ERROR, "failed to parse params");
    }

    options.args = args;
    options.env  = env;
    options.stdio = child_stdio;
    if (ctrl->flag & RUFF_SPAWN_SET_EXIT_CB) {
        options.exit_cb = ctrl->exit_cb;
    } else {
        options.exit_cb = js_exit_cb;
    }

    options.file = command;

    if (!duk_is_object(ctx, 2)) {
        duk_error(ctx, DUK_ERR_ERROR, "failed to parse params");
    }
    if (!duk_is_function(ctx, 2)) {
        if (duk_get_prop_string(ctx, 2, "argv0")) {
            args[0] = (char*)duk_to_string(ctx, -1);
        }
        duk_pop(ctx);

        parse_and_set_detach(ctx, 2, &options);
        parse_and_set_cwd(ctx, 2, &options);
        parse_and_set_stdio(ctx, 2, child_stdio, &options.stdio_count);
        parse_and_set_env(ctx, 2,
                          buffer_env,
                          sizeof(buffer_env),
                          env,
                          ARRAY_SIZE(env));
        parse_and_set_uid(ctx, 2, &options);
        parse_and_set_gid(ctx, 2, &options);
        func_idx++;
    }

    handle = duk_push_fixed_buffer(ctx, sizeof(uv_process_t));

    if (ctrl->flag & RUFF_SPAWN_SETUP_HANDLE) {
        handle->data = duv_setup_handle(ctx);
        duv_store_handler(ctx, handle->data, DUV_HANDLE, func_idx);
    } else {
        if (ctrl->flag & RUFF_SPAWN_SET_DATA) {
            handle->data = ctrl->data;
        }
    }

    duv_check(ctx, uv_spawn(ctrl->loop, handle, &options));

    return 1;

}

duk_ret_t duv_spawn(duk_context *ctx) {
    ruff_uv_spawn_ctrl_t ctrl = { 0 };

    ctrl.loop = duv_loop(ctx);
    ctrl.flag = RUFF_SPAWN_SETUP_HANDLE;
    return ruff_uv_spawn(ctx, &ctrl);
}

duk_ret_t duv_get_spawn_pid(duk_context *ctx) {
    duk_size_t size;

    uv_process_t *handle = duk_require_buffer(ctx, 0, &size);

    if (size != sizeof(uv_process_t)) {
        fprintf(stderr, "invalid spawn handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    duk_push_int(ctx, handle->pid);

    return 1;
}

duk_ret_t duv_kill_process(duk_context *ctx) {
    duk_size_t size;
    int signal_num;

    uv_process_t *handle = duk_require_buffer(ctx, 0, &size);
    if (size != sizeof(uv_process_t)) {
        fprintf(stderr, "invalid spawn handle\n");
        return DUK_RET_TYPE_ERROR;
    }

    signal_num = duk_get_int(ctx, 1);
    if (!signal_num) {
        signal_num = 9;
    }
    duv_check(ctx, uv_process_kill(handle, signal_num));
    return 0;
}

duk_ret_t duv_signal_init(duk_context *ctx) {
    uv_signal_t *handle;

    handle = duk_push_fixed_buffer(ctx, sizeof(uv_signal_t));
    handle->data = duv_setup_handle(ctx);
    duv_check(ctx, uv_signal_init(duv_loop(ctx), handle));
    return 1;
}

duk_ret_t duv_signal_start(duk_context *ctx) {
    uv_signal_t *handle;
    duk_size_t size;
    int signal_num;

    handle	= duk_require_buffer(ctx, 0, &size);
    if (size != sizeof(uv_signal_t)) {
        fprintf(stderr, "invalid spawn handle\n");
        return DUK_RET_TYPE_ERROR;
    }
    signal_num = duk_require_int(ctx, 1);

    duv_store_handler(ctx, handle->data, DUV_SIGNAL, 2);
    duv_check(ctx, uv_signal_start(handle, signal_cb, signal_num));
    return 0;
}

duk_ret_t duv_signal_stop(duk_context *ctx) {
    uv_signal_t *handle;
    duk_size_t size;

    handle	= duk_require_buffer(ctx, 0, &size);
    if (size != sizeof(uv_signal_t)) {
        fprintf(stderr, "invalid spawn handle\n");
        return DUK_RET_TYPE_ERROR;
    }
    duv_check(ctx, uv_signal_stop(handle));
    return 0;
}

duk_ret_t duv_getpid(duk_context *ctx) {
    duk_push_uint(ctx, (duk_uint_t)(getpid()));
    return 1;
}

duk_ret_t duv_kill(duk_context *ctx) {
#ifndef _WIN32
    pid_t pid = duk_require_uint(ctx, 0);
    int signal_num = duk_require_int(ctx, 1);

    kill(pid, signal_num);
#endif
    return 0;
}
