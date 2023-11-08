#ifndef RUFF_PROCESS_H
#define RUFF_PROCESS_H

#include "duv.h"

duk_ret_t duv_spawn(duk_context *ctx);
duk_ret_t duv_get_spawn_pid(duk_context *ctx);
duk_ret_t duv_kill_process(duk_context *ctx);

duk_ret_t duv_signal_init(duk_context *ctx);
duk_ret_t duv_signal_start(duk_context *ctx);
duk_ret_t duv_signal_stop(duk_context *ctx);
duk_ret_t duv_getpid(duk_context *ctx);
duk_ret_t duv_kill(duk_context *ctx);

#define RUFF_SPAWN_SETUP_HANDLE     1 << 0
#define RUFF_SPAWN_SET_EXIT_CB      1 << 1
#define RUFF_SPAWN_SET_DATA         1 << 2
typedef struct {
    uint32_t flag;
    uv_loop_t *loop;
    uv_exit_cb exit_cb;
    void *data;
} ruff_uv_spawn_ctrl_t;

int ruff_uv_spawn(duk_context *ctx, ruff_uv_spawn_ctrl_t *ctrl);
#endif
