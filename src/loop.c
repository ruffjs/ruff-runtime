#include "loop.h"
#include "duktape.h"

duk_ret_t duv_run(duk_context *ctx) {
  int ret = uv_run(duv_loop(ctx), UV_RUN_DEFAULT);
  if (ret < 0) {
    duv_error(ctx, ret);
  }
  return 0;
}

static void duv_walk_cb(uv_handle_t *handle, duk_context *ctx) {
  duv_handle_t* data = handle->data;
  duk_dup(ctx, 0);
  duv_push_ref(ctx, data->context);
  duv_push_ref(ctx, data->ref);
  duk_call_method(ctx, 1);
}

duk_ret_t duv_walk(duk_context *ctx) {
  if (!duk_is_function(ctx, 0)) {
    duk_error(ctx, DUK_ERR_TYPE_ERROR, "Invalid argument type for callback");
  }
  uv_walk(duv_loop(ctx), (void (*)(uv_handle_t*, void*))duv_walk_cb, ctx);
  return 0;
}

duk_ret_t duv_unuvref(duk_context *ctx) {
  uv_handle_t* handle;

  if (!duk_is_buffer(ctx, 0)) {
    duk_error(ctx, DUK_ERR_TYPE_ERROR, "Invalid argument type for handle");
  }

  handle = duk_get_buffer(ctx, 0, NULL);
  uv_unref(handle);
  return 0;
}
