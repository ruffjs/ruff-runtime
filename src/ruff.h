#ifndef RUFF_H
#define RUFF_H
#include "uv.h"
#include "duktape.h"

#ifdef WIN32
#define PATH_SEPARATOR '\\'
#else
#define PATH_SEPARATOR '/'
#endif

#ifdef WIN32
    #define PROCESS_PLATFORM "win32"
#elif defined(__APPLE__)
    #define PROCESS_PLATFORM "darwin"
#elif defined(__linux__)
    #define PROCESS_PLATFORM "linux"
#else
    #error Platform Unknown!!!
#endif

void ruff_handle_args(duk_context *ctx, const int argc, const char **argv, int *pArgv_arr_index);
void ruff_handle_env(duk_context *ctx, int *pEnv_arr_index);
const char* ruff_get_dirname(const char* path);
const char* ruff_get_bootstrap_lcode(int *length);
const char* ruff_version(void);

int ruff_array_to_args(duk_context *ctx, const int array_index,
                         char *buffer, const int buffer_len,
                         char **args, const int args_len);

duk_ret_t ruff_get_buildin_js(duk_context *ctx);
duk_ret_t ruff_load_kernel_module(duk_context *ctx);
duk_ret_t ruff_unload_kernel_module(duk_context *ctx);
duk_ret_t ruff_exec_sync(duk_context *ctx);
void _ruff_exit(duk_context *ctx, duk_int_t code, duk_int_t bypass_emit);
duk_ret_t ruff_exit(duk_context *ctx);
duk_ret_t ruff_handle_fatal(duk_context *ctx);
duk_ret_t ruff_load_function(duk_context *ctx);
duk_ret_t ruff_dump_function(duk_context *ctx);
duk_ret_t ruff_get_signal_const(duk_context *ctx);
#endif
