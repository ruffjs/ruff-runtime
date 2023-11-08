#ifndef DUV_MISC_H
#define DUV_MISC_H
#include "duv.h"

duk_ret_t duv_guess_handle(duk_context *ctx);
duk_ret_t duv_version(duk_context *ctx);
duk_ret_t duv_version_string(duk_context *ctx);
duk_ret_t duv_get_process_title(duk_context *ctx);
duk_ret_t duv_set_process_title(duk_context *ctx);
duk_ret_t duv_resident_set_memory(duk_context *ctx);
duk_ret_t duv_uptime(duk_context *ctx);
duk_ret_t duv_getrusage(duk_context *ctx);
duk_ret_t duv_cpu_info(duk_context *ctx);
duk_ret_t duv_interface_addresses(duk_context *ctx);
duk_ret_t duv_loadavg(duk_context *ctx);
duk_ret_t duv_exepath(duk_context *ctx);
duk_ret_t duv_cwd(duk_context *ctx);
duk_ret_t duv_umask(duk_context *ctx);
duk_ret_t duv_chdir(duk_context *ctx);
duk_ret_t duv_get_total_memory(duk_context *ctx);
duk_ret_t duv_get_free_memory(duk_context *ctx);
duk_ret_t duv_hrtime(duk_context *ctx);
duk_ret_t duv_is_ipv4(duk_context *ctx);
duk_ret_t duv_is_ipv6(duk_context *ctx);
duk_ret_t duv_errname(duk_context *ctx);
duk_ret_t duv_fast_buffer_indexof(duk_context *ctx);

const char* ruff_version(void);
#endif
