# uv internal document

There are such handles in libuv

- `uv_loop_t`
- `uv_handle_t`
- `uv_stream_t`
- `uv_tcp_t`
- `uv_udp_t`
- `uv_pipe_t`
- `uv_tty_t`
- `uv_poll_t`
- `uv_timer_t`
- `uv_prepare_t`
- `uv_check_t`
- `uv_idle_t`
- `uv_async_t`
- `uv_process_t`
- `uv_fs_event_t`
- `uv_fs_poll_t`
- `uv_signal_t`

There are such request in libuv

- `uv_req_t`
- `uv_getaddrinfo_t`
- `uv_getnameinfo_t`
- `uv_shutdown_t`
- `uv_write_t`
- `uv_connect_t`
- `uv_udp_send_t`
- `uv_fs_t`
- `uv_work_t`

## internal uv API for duktape

### [loop](http://docs.libuv.org/en/v1.x/loop.html)
```javascript
run();
walk(callback);
close(handle, callback); // uv_handle_t
```

### [request](http://docs.libuv.org/en/v1.x/request.html)
```javascript
cancel(request); // uv_req_t
```

### [idle](http://docs.libuv.org/en/v1.x/idle.html)
```javascript
handle new_idle(); // uv_idle_t
idle_start(handle, callback);
idle_stop(handle);
```

### [prepare](http://docs.libuv.org/en/v1.x/prepare.html)
```javascript
handle new_prepare(); // uv_prepare_t
prepare_start(handel, callback);
prepare_stop(handle);
```

### [check](http://docs.libuv.org/en/v1.x/check.html)
```javascript
handle new_check(); // uv_check_t
check_start(handle, callback);
check_stop(handle);
```

### [timer](http://docs.libuv.org/en/v1.x/timer.html)
```javascript
handle new_timer(); // uv_timer_t
timer_start(handle, timeout, repeat, callback);
timer_stop(handle);
timer_again(handle);
timer_set_repeat(handle, repeat);
repeat timer_get_repeat(handle);
mdelay(timeout);
```

### [stream](http://docs.libuv.org/en/v1.x/stream.html)
```javascript
listen(handle, backlog, callback); // uv_stream_t
accept(serverhandle, clienthandle);
read_start(handle, callback);
read_stop(handle);
retval is_readable(handle);
request write(handle, data, callback); // uv_write_t
retval is_writable(handle);
stream_set_blocking(handle, blocking);
request shutdown(handle, callback); // uv_shutdown_t
```

### [tcp](http://docs.libuv.org/en/v1.x/tcp.html)
```javascript
handle new_tcp(); // uv_tcp_t
tcp_open(handle, socket);
tcp_nodelay(handle, enable);
tcp_keepalive(handle, enable, delay);
tcp_simultaneous_accepts(handle, enable);
tcp_bind(handle, host, port);
name tcp_getpeername(handle);
name tcp_getsockname(handle);
request tcp_connect(handle, host, port, callback); // uv_connect_t
```

### [pipe](http://docs.libuv.org/en/v1.x/pipe.html)
```javascript
handle new_pipe(ipc); // uv_pipe_t
pipe_open(handle, fd);
pipe_bind(handle, name);
request pipe_connect(handle, name, callback); // uv_connect_t
name pipe_getsockname(handle);
pipe_pending_instances(handle, count);
count pipe_pending_count(handle);
type pipe_pending_type(handle);
```

### [tty](http://docs.libuv.org/en/v1.x/tty.html)
```javascript
handle new_tty(fd, readable); // uv_tty_t
tty_set_mode(handle, mode);
tty_reset_mode();
size tty_get_winsize(handle);
```

### [udp](http://docs.libuv.org/en/v1.x/udp.html)
```javascript
handle new_udp(); // uv_udp_t
udp_bind(handle, host, port);
request udp_send(handle, data, host, port, callback); // uv_udp_send_t
udp_recv_start(handle, callback);
udp_recv_stop(handle);
udp_broadcast(data);
udp_broadcast_to(handle, data, port);
name udp_getsockname(handle);
```

### [fs_event](http://docs.libuv.org/en/v1.x/fs_event.html)
```javascript
handle fs_watch(path, callback); // uv_fs_event_t
fs_stop_watch(handle);
```

### [fs_poll](http://docs.libuv.org/en/v1.x/fs_poll.html)
```javascript
handle fs_poll_init(fd); // uv_poll_t
fs_poll_start(handle, event, callback);
fs_poll_stop(handle);
```

### [process](http://docs.libuv.org/en/v1.x/process.html)
```javascript
pid getpid();
handle spawn(file, args, cwd, fdstdin, fdstdout, fdstderr, callback); // uv_process_t
pid get_spawn_pid(handle);
kill(pid, signum);
kill_process(handle, signum);
```

### [signal](http://docs.libuv.org/en/v1.x/signal.html)
```javascript
handle signal_init(); // uv_signal_t
signal_start(handle, signum, callback);
signal_stop(handle);
```

### [fs operations](http://docs.libuv.org/en/v1.x/fs.html)
```javascript
fd fs_open(path, flags, mode, callback);
retval fs_close(fd, callback); // return 1 for failure and 0 for success 
data fs_read(fd, length, offset, callback);
length fs_write(fd, data, offset, callback);
retval fs_unlink(path, callback);
retval fs_mkdir(path, mode, callback);
retval fs_mkdtemp(template, callback);
retval fs_rmdir(path, callback);
retval fs_scandir(path, callback);
retval fs_scandir_next(request);  // uv_fs_t
retval fs_stat(path, callback);
retval fs_fstat(file, callback);
retval fs_lstat(path, callback);
retval fs_rename(path, newpath, callback);
retval fs_fsync(file, callback);
retval fs_fdatasync(file, callback);
retval fs_ftruncate(file, offset, callback);
retval fs_sendfile(outfd, infd, inoffset, length, callback);
retval fs_access(path, mode, callback);
retval fs_chmod(path, mode, callback);
retval fs_fchomd(file, mode, callback);
retval fs_utime(file, atime, mtime, callback);
retval fs_futime(file, atime, mtime, callback);
retval fs_link(path, newpath, callback);
retval fs_symlink(path, newpath, flags, callback);
retval fs_readlink(path, callback);
retval fs_chown(path, uid, gid, callback);
```

### [misc utils](http://docs.libuv.org/en/v1.x/misc.html)
```javascript
handletype guess_handle(file);
ruffversion version();
uvversion version_string();
title get_process_title();
set_process_title(title);
size resident_set_memory();
uptime uptime();
rusage getrusage();
cpuinfo cpu_info();
itfinfo interface_addresses();
loadavg loadavg();
exepath exepath();
cwd cwd();
chdir(path);
totalmem get_total_memory();
freemem get_free_memory();
hrtime hrtime();
retval is_ipv4(address);
retval is_ipv6(address);
errname errname(errno);
```
