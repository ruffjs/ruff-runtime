#include "duv.h"

#include "refs.h"
#include "utils.h"
#include "loop.h"
#include "req.h"
#include "handle.h"
#include "timer.h"
#include "stream.h"
#include "tcp.h"
#include "udp.h"
#include "pipe.h"
#include "tty.h"
#include "fs.h"
#include "poll.h"
#include "misc.h"
#include "process.h"
#include "spawn_sync.h"
#include "ruff.h"
#include "miniz.h"
#include "dns.h"

static const duk_function_list_entry duv_funcs[] = {
  // loop.c
  {"run", duv_run, 0},
  {"walk", duv_walk, 1},
  {"unref", duv_unuvref, 1},

  // req.c
  {"cancel", duv_cancel, 1},

  // handle.c
  {"close", duv_close, 2},
  {"idle_init", duv_idle_init, 0},
  {"idle_start", duv_idle_start, 2},
  {"idle_stop", duv_idle_stop, 1},
  {"prepare_init", duv_prepare_init, 0},
  {"prepare_start", duv_prepare_start, 2},
  {"prepare_stop", duv_prepare_stop, 1},
  {"check_init", duv_check_init, 0},
  {"check_start", duv_check_start, 2},
  {"check_stop", duv_check_stop, 1},

  // timer.c
  {"mdelay", duv_sleep, 1},
  {"new_timer", duv_new_timer, 0},
  {"update_loop_time", duv_update_loop_time, 0},
  {"timer_start", duv_timer_start, 4},
  {"timer_stop", duv_timer_stop, 1},
  {"timer_again", duv_timer_again, 1},
  {"timer_set_repeat", duv_timer_set_repeat, 2},
  {"timer_get_repeat", duv_timer_get_repeat, 1},

  // stream.c
  {"shutdown", duv_shutdown, 2},
  {"listen", duv_listen, 3},
  {"accept", duv_accept, 2},
  {"read_start", duv_read_start, 2},
  {"read_stop", duv_read_stop, 1},
  {"write", duv_write, 3},
  {"is_readable", duv_is_readable, 1},
  {"is_writable", duv_is_writable, 1},
  {"stream_set_blocking", duv_stream_set_blocking, 2},

  // udp.c
  {"udp_broadcast", duv_broadcast, 1},
  {"new_udp", duv_new_udp, 0},
  {"udp_bind", duv_udp_bind, 3},
  {"udp_broadcast_to", duv_udp_broadcast_to_port, 3},
  {"udp_recv_start", duv_udp_recv_start, 2},
  {"udp_recv_stop", duv_udp_recv_stop, 1},
  {"udp_send", duv_udp_send, 5},
  {"udp_getsockname", duv_udp_getsockname, 1},
  {"udp_setbroadcast", duv_udp_setbroadcast, 2},

  // tcp.c
  {"new_tcp", duv_new_tcp, 0},
  {"tcp_open", duv_tcp_open, 2},
  {"tcp_nodelay", duv_tcp_nodelay, 2},
  {"tcp_keepalive", duv_tcp_keepalive, 3},
  {"tcp_simultaneous_accepts", duv_tcp_simultaneous_accepts, 2},
  {"tcp_bind", duv_tcp_bind, 3},
  {"tcp_getpeername", duv_tcp_getpeername, 1},
  {"tcp_getsockname", duv_tcp_getsockname, 1},
  {"tcp_connect", duv_tcp_connect, 4},

  // pipe.c
  {"new_pipe", duv_new_pipe, 1},
  {"pipe_open", duv_pipe_open, 2},
  {"pipe_bind", duv_pipe_bind, 2},
  {"pipe_connect", duv_pipe_connect, 3},
  {"pipe_getsockname", duv_pipe_getsockname, 1},
  {"pipe_pending_instances", duv_pipe_pending_instances, 2},
  {"pipe_pending_count", duv_pipe_pending_count, 1},
  {"pipe_pending_type", duv_pipe_pending_type, 1},

  // tty.c
  {"new_tty", duv_new_tty, 2},
  {"tty_set_mode", duv_tty_set_mode, 2},
  {"tty_reset_mode", duv_tty_reset_mode, 0},
  {"tty_get_winsize", duv_tty_get_winsize, 1},

  // fs.c
  {"fs_close", duv_fs_close, 2},
  {"fs_open", duv_fs_open, 4},
  {"fs_read", duv_fs_read, 4},
  {"fs_unlink", duv_fs_unlink, 2},
  {"fs_write", duv_fs_write, 4},
  {"fs_mkdir", duv_fs_mkdir, 3},
  {"fs_mkdtemp", duv_fs_mkdtemp, 2},
  {"fs_rmdir", duv_fs_rmdir, 2},
  {"fs_scandir", duv_fs_scandir, 2},
  {"fs_scandir_next", duv_fs_scandir_next, 1},
  {"fs_stat", duv_fs_stat, 2},
  {"fs_fstat", duv_fs_fstat, 2},
  {"fs_lstat", duv_fs_lstat, 2},
  {"fs_rename", duv_fs_rename, 3},
  {"fs_fsync", duv_fs_fsync, 2},
  {"fs_fdatasync", duv_fs_fdatasync, 2},
  {"fs_ftruncate", duv_fs_ftruncate, 3},
  {"fs_sendfile", duv_fs_sendfile, 5},
  {"fs_access", duv_fs_access, 3},
  {"fs_chmod", duv_fs_chmod, 3},
  {"fs_fchmod", duv_fs_fchmod, 3},
  {"fs_utime", duv_fs_utime, 4},
  {"fs_futime", duv_fs_futime, 4},
  {"fs_link", duv_fs_link, 3},
  {"fs_symlink", duv_fs_symlink, 4},
  {"fs_readlink", duv_fs_readlink, 2},
  {"fs_chown", duv_fs_chown, 4},
  {"fs_fchown", duv_fs_fchown, 4},

  // poll.c
  {"new_poll",   duv_new_poll, 1},
  {"poll_start", duv_poll_start, 3},
  {"poll_stop",  duv_poll_stop, 1},

  // process.c
  {"spawn",         duv_spawn,          4},
  {"spawn_sync",    duv_spawn_sync,     4},
  {"get_spawn_pid", duv_get_spawn_pid,  1},
  {"kill_process",  duv_kill_process,   2},
  {"signal_init",   duv_signal_init, 	0},
  {"signal_start",	duv_signal_start,   3},
  {"signal_stop",	duv_signal_stop, 	1},
  {"getpid",        duv_getpid,         0},
  {"kill",          duv_kill,           2},

  // misc.c
  {"guess_handle", duv_guess_handle, 1},
  {"version", duv_version, 0},
  {"version_string", duv_version_string, 0},
  {"get_process_title", duv_get_process_title, 0},
  {"set_process_title", duv_set_process_title, 1},
  {"resident_set_memory", duv_resident_set_memory, 0},
  {"uptime", duv_uptime, 0},
  {"getrusage", duv_getrusage, 0},
  {"cpu_info", duv_cpu_info, 0},
  {"interface_addresses", duv_interface_addresses, 0},
  {"loadavg", duv_loadavg, 0},
  {"exepath", duv_exepath, 0},
  {"cwd", duv_cwd, 0},
  {"umask", duv_umask, 1},
  {"chdir", duv_chdir, 1},
  {"get_total_memory", duv_get_total_memory, 0},
  {"get_free_memory", duv_get_free_memory, 0},
  {"hrtime", duv_hrtime, 0},
  {"is_ipv4", duv_is_ipv4, 1},
  {"is_ipv6", duv_is_ipv6, 1},
  {"errname", duv_errname, 1},
  {"fast_buffer_indexof", duv_fast_buffer_indexof, 3},

  // miniz.c
  {"inflate", duv_tinfl, 2},
  {"deflate", duv_tdefl, 2},

  // ruff.c
  {"exec_sync", ruff_exec_sync, 2},
  {"load_function", ruff_load_function, 1},
  {"dump_function", ruff_dump_function, 2},

  // process.c
  { "get_sig_const", ruff_get_signal_const},

  // dns.c
  { "getaddrinfo", duv_getaddrinfo, 4},
  {NULL, NULL, 0},
};

static const duk_number_list_entry duv_consts[] = {
  { "UV_EPIPE", (double)UV_EPIPE },
  { "UV_EINVAL", (double)UV_EINVAL },
  { "UV_EADDRINUSE", (double)UV_EADDRINUSE },
  { "UV_ECANCELED", (double)UV_ECANCELED },

  { "UV_EOF", (double)UV_EOF },

  {NULL, 0.0},
};

duk_ret_t dukopen_uv(duk_context *ctx) {
  duv_ref_setup(ctx);

  // Create a uv table on the global
  duk_push_object(ctx);
  duk_put_function_list(ctx, -1, duv_funcs);
  duk_put_number_list(ctx, -1, duv_consts);
  return 1;
}

duk_ret_t dukopen_ruff(duk_context *ctx) {
  duk_push_object(ctx);

  // Get duktape version
  char duktape_version[10] = { 0 };
  int duk_major = DUK_VERSION / 10000;
  int duk_minor = DUK_VERSION / 100 % 100;
  int duk_patch = DUK_VERSION % 100;
  sprintf(duktape_version, "%d.%d.%d", duk_major, duk_minor, duk_patch);

  duk_push_object(ctx);
  duk_push_string(ctx, duktape_version);
  duk_put_prop_string(ctx, -2, "duktape");
  duk_push_string(ctx, ruff_version());
  duk_put_prop_string(ctx, -2, "ruff");
  duk_put_prop_string(ctx, -2, "versions");

  return 1;
}
