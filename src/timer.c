#include "timer.h"
#include <time.h>

duk_ret_t duv_new_timer(duk_context *ctx) {
  uv_timer_t* handle;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {NULL}
  });

  handle = duk_push_fixed_buffer(ctx, sizeof(*handle));
  duv_check(ctx, uv_timer_init(duv_loop(ctx), handle));
  handle->data = duv_setup_handle(ctx);
  return 1;
}

duk_ret_t duv_update_loop_time(duk_context *ctx) {
  uv_update_time(duv_loop(ctx));
  return 0;
}

static void sleep_ms(unsigned int secs) {
    struct timeval tval;
    tval.tv_sec=secs/1000;
    tval.tv_usec=(secs*1000)%1000000;
    select(0,NULL,NULL,NULL,&tval);
}

duk_ret_t duv_sleep(duk_context *ctx) {
    unsigned int timeout = duk_get_uint(ctx, 0);
    sleep_ms(timeout);
    return 0;
}

duk_ret_t duv_timer_start(duk_context *ctx) {
  uv_timer_t* handle;
  uint64_t timeout;
  uint64_t repeat;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {"timer", duv_is_timer},
    {"timeout", duk_is_number},
    {"repeat", duk_is_number},
    {"ontimeout", duk_is_function},
    {NULL}
  });

  handle = duk_get_buffer(ctx, 0, NULL);
  timeout = duk_get_uint(ctx, 1);
  repeat = duk_get_uint(ctx, 2);

  duv_update_loop_time(ctx);

  duv_check(ctx, uv_timer_start(handle, duv_timer_cb, timeout, repeat));
  duv_store_handler(ctx, handle->data, DUV_TIMEOUT, 3);
  return 0;
}

duk_ret_t duv_timer_stop(duk_context *ctx) {
  uv_timer_t* handle;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {"timer", duv_is_timer},
    {NULL}
  });

  handle = duk_get_buffer(ctx, 0, NULL);
  duv_check(ctx, uv_timer_stop(handle));
  return 0;
}

duk_ret_t duv_timer_again(duk_context *ctx) {
  uv_timer_t* handle;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {"timer", duv_is_timer},
    {NULL}
  });

  handle = duk_get_buffer(ctx, 0, NULL);
  duv_check(ctx, uv_timer_again(handle));
  return 0;
}

duk_ret_t duv_timer_set_repeat(duk_context *ctx) {
  uv_timer_t* handle;
  uint64_t repeat;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {"timer", duv_is_timer},
    {"repeat", duk_is_number},
    {NULL}
  });

  handle = duk_get_buffer(ctx, 0, NULL);
  repeat = duk_get_uint(ctx, 1);
  uv_timer_set_repeat(handle, repeat);
  return 0;
}

duk_ret_t duv_timer_get_repeat(duk_context *ctx) {
  uv_timer_t* handle;

  dschema_check(ctx, (const duv_schema_entry[]) {
    {"timer", duv_is_timer},
    {NULL}
  });

  handle = duk_get_buffer(ctx, 0, NULL);
  duk_push_number(ctx, uv_timer_get_repeat(handle));
  return 1;
}
