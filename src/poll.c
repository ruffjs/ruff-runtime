#include "poll.h"

static void duv_poll_cb(uv_poll_t *handle, int status, int event)
{
    duk_context *ctx = handle->loop->data;
    duk_push_uint(ctx, status);
    duk_push_uint(ctx, event);
    duv_emit_event(ctx, handle->data, DUV_POLL, 2);
}

duk_ret_t duv_new_poll(duk_context *ctx) {
    uv_poll_t *handle;
    int fd = duk_require_int(ctx, 0);

    handle = duk_push_fixed_buffer(ctx, sizeof(*handle));
    handle->data = duv_setup_handle(ctx);
    duv_check(ctx, uv_poll_init(duv_loop(ctx), handle, fd));
    return 1;
}

duk_ret_t duv_poll_start(duk_context *ctx) {
    duk_size_t size;
    uv_poll_t *handle = duk_require_buffer(ctx, 0, &size);
    int event = duk_require_int(ctx, 1);

    if (size != sizeof(*handle)) {
        duk_error(ctx, DUK_ERR_TYPE_ERROR, "invalid poll handle");
    }

    duv_store_handler(ctx, handle->data, DUV_POLL, 2);
    duv_check(ctx, uv_poll_start(handle, event, duv_poll_cb));
    return 0;
}

duk_ret_t duv_poll_stop(duk_context *ctx) {
    duk_size_t size;
    uv_poll_t *handle = duk_require_buffer(ctx, 0, &size);

    if (size != sizeof(*handle)) {
        duk_error(ctx, DUK_ERR_TYPE_ERROR, "invalid poll handle");
    }
    duv_check(ctx, uv_poll_stop(handle));
    return 0;
}
