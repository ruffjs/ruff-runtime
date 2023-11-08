#ifndef DUV_HANDLE_H
#define DUV_HANDLE_H

#include "duv.h"

duk_ret_t duv_idle_init(duk_context* ctx);
duk_ret_t duv_idle_init(duk_context* ctx);
duk_ret_t duv_idle_start(duk_context* ctx);
duk_ret_t duv_idle_stop(duk_context* ctx);

duk_ret_t duv_prepare_init(duk_context* ctx);
duk_ret_t duv_prepare_start(duk_context* ctx);
duk_ret_t duv_prepare_stop(duk_context* ctx);

duk_ret_t duv_check_init(duk_context* ctx);
duk_ret_t duv_check_start(duk_context* ctx);
duk_ret_t duv_check_stop(duk_context* ctx);

duk_ret_t duv_close(duk_context *ctx);

#endif
