#include "handle.h"

#define GEN_HANDLE_CB(_type_)                                                           \
    static void duv_##_type_##_cb(uv_##_type_##_t *handle)                              \
    {                                                                                   \
        duk_context *ctx = handle->loop->data;                                          \
        duv_emit_event(ctx, (duv_handle_t*)handle->data, DUV_HANDLE, 0);                \
    }

#define GEN_HANDLE_INIT(_type_)                                                         \
    duk_ret_t duv_##_type_##_init(duk_context *ctx)                                     \
    {                                                                                   \
        uv_##_type_##_t *_##_type_##_handle;                                            \
        _##_type_##_handle = duk_push_fixed_buffer(ctx, sizeof(uv_##_type_##_t));       \
        duv_check(ctx, uv_##_type_##_init(duv_loop(ctx), _##_type_##_handle));          \
        _##_type_##_handle->data = duv_setup_handle(ctx);                               \
        return 1;                                                                       \
    }

#define GEN_HANDLE_START(_type_, unref)                                                 \
    duk_ret_t duv_##_type_##_start(duk_context *ctx) {                                  \
        duk_size_t size;                                                                \
        uv_##_type_##_t *_##_type_##_handle = duk_require_buffer(ctx, 0, &size);        \
        if (size != sizeof(uv_##_type_##_t)) {                                          \
            duk_error(ctx, DUK_ERR_TYPE_ERROR, "invalid handle");                       \
        }                                                                               \
        duv_check(ctx, uv_##_type_##_start(_##_type_##_handle, duv_##_type_##_cb));     \
        duv_store_handler(ctx, _##_type_##_handle->data, DUV_HANDLE, 1);                \
        if (unref) {                                                                    \
            uv_unref((uv_handle_t*)_##_type_##_handle);                                 \
        }                                                                               \
        return 0;                                                                       \
    }

#define GEN_HANDLE_STOP(_type_)                                                         \
    duk_ret_t duv_##_type_##_stop(duk_context *ctx) {                                   \
        duk_size_t size;                                                                \
        uv_##_type_##_t *_##_type_##_handle = duk_require_buffer(ctx, 0, &size);        \
        if (size != sizeof(uv_##_type_##_t)) {                                          \
            duk_error(ctx, DUK_ERR_TYPE_ERROR, "invalid handle");                       \
        }                                                                               \
        duv_check(ctx, uv_##_type_##_stop(_##_type_##_handle));                         \
        return 0;                                                                       \
    }

GEN_HANDLE_CB(idle)
GEN_HANDLE_INIT(idle)
GEN_HANDLE_START(idle, 0)
GEN_HANDLE_STOP(idle)

GEN_HANDLE_CB(prepare)
GEN_HANDLE_INIT(prepare)
GEN_HANDLE_START(prepare, 1)
GEN_HANDLE_STOP(prepare)

GEN_HANDLE_CB(check)
GEN_HANDLE_INIT(check)
GEN_HANDLE_START(check, 1)
GEN_HANDLE_STOP(check)

duk_ret_t duv_close(duk_context *ctx) {
  uv_handle_t* handle;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {"handle", duv_is_handle},
    {"onclosed", dschema_is_continuation},
    {NULL}
  });

  handle = duk_get_buffer(ctx, 0, NULL);
  uv_close(handle, duv_close_cb);
  duv_store_handler(ctx, handle->data, DUV_CLOSED, 1);
  return 0;
}
