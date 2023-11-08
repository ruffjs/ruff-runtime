#ifndef RUFF_SPAWN_SYNC_H
#define RUFF_SPAWN_SYNC_H

#include "duv.h"

typedef struct {
    uv_loop_t loop;
    int64_t exit_status;
    int term_signal;
    int pid;
    uv_process_t *handle;
} spawn_sync_run_loop_t;

duk_ret_t duv_spawn_sync(duk_context *ctx);
#endif
