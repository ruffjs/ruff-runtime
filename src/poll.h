#ifndef DUV_POLL_H
#define DUV_POLL_H

#include "duv.h"

duk_ret_t duv_new_poll(duk_context *ctx);
duk_ret_t duv_poll_start(duk_context *ctx);
duk_ret_t duv_poll_stop(duk_context *ctx);

#endif
