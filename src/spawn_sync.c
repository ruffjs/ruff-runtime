#include "process.h"
#include "spawn_sync.h"
#include "ruff.h"

static void exit_cb(uv_process_t* handle,
                    int64_t exit_status,
                    int term_signal) {

    spawn_sync_run_loop_t *run_loop = (spawn_sync_run_loop_t *)(handle->data);
    run_loop->exit_status = exit_status;
    run_loop->term_signal = term_signal;
    run_loop->pid = handle->pid;
    run_loop->handle = handle;
}

static int init_spawn_run_loop(spawn_sync_run_loop_t **handle) {

    assert(handle);

    *handle = malloc(sizeof(spawn_sync_run_loop_t));
    assert(uv_loop_init(&((*handle)->loop)) == 0);

    return 0;
}

static void uninit_spawn_run_loop(spawn_sync_run_loop_t **handle) {
    assert(handle);

    if (*handle) {
        uv_run(&((*handle)->loop), UV_RUN_DEFAULT);
        uv_loop_close(&((*handle)->loop));
        free(*handle);
        *handle = NULL;
    }
    return;
}

duk_ret_t duv_spawn_sync(duk_context *ctx) {
    ruff_uv_spawn_ctrl_t ctrl = { 0 };
    spawn_sync_run_loop_t *run_loop;
    duk_idx_t child;

    if (init_spawn_run_loop(&run_loop) != 0) {
        duk_error(ctx, DUK_ERR_ERROR, "fail to init spawn loop");
    }
    ctrl.loop = &(run_loop->loop);
    ctrl.flag = RUFF_SPAWN_SET_DATA | RUFF_SPAWN_SET_EXIT_CB;
    ctrl.exit_cb = exit_cb;
    ctrl.data = run_loop;

    ruff_uv_spawn(ctx, &ctrl);

    if (uv_run(&(run_loop->loop), UV_RUN_DEFAULT) != 0) {
        duk_error(ctx, DUK_ERR_ERROR, "fail to run spawn loop");
    }

    if (run_loop->handle) {
        uv_close(run_loop->handle, NULL);
        run_loop->handle = NULL;
    }

    child = duk_push_object(ctx);

    duk_push_int(ctx, run_loop->pid);
    duk_put_prop_string(ctx, child, "pid");

    duk_push_int(ctx, run_loop->exit_status);
    duk_put_prop_string(ctx, child, "status");

    uninit_spawn_run_loop(&run_loop);
    return 1;
}
