#ifndef RUFF_UDP_H
#define RUFF_UDP_H

#include "duv.h"

duk_ret_t duv_broadcast(duk_context *ctx);

duk_ret_t duv_new_udp(duk_context *ctx);

duk_ret_t duv_udp_bind(duk_context *ctx);

duk_ret_t duv_udp_broadcast_to_port(duk_context *ctx);

duk_ret_t duv_udp_recv_start(duk_context *ctx);

duk_ret_t duv_udp_recv_stop(duk_context *ctx);

duk_ret_t duv_udp_send(duk_context *ctx);

duk_ret_t duv_udp_getsockname(duk_context *ctx);

duk_ret_t duv_udp_setbroadcast(duk_context *ctx);

#endif
