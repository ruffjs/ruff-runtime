# net

The `net` module provides you with an asynchronous network wrapper. It contains
functions for creating both servers and clients (called streams). You can include
this module with `require('net');`.

## net.createServer([options][, connectionListener])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Creates a new server. The `connectionListener` argument is
automatically set as a listener for the ['connection'][] event.

`options` is an object with the following defaults:

    {
      allowHalfOpen: false,
      pauseOnConnect: false
    }

If `allowHalfOpen` is `true`, then the socket won't automatically send a FIN
packet when the other end of the socket sends a FIN packet. The socket becomes
non-readable, but still writable. You should call the `end()` method explicitly.
See ['end'][] event for more information.

If `pauseOnConnect` is `true`, then the socket associated with each incoming
connection will be paused, and no data will be read from its handle. This allows
connections to be passed between processes without any data being read by the
original process. To begin reading data from a paused socket, call `resume()`.

Here is an example of an echo server which listens for connections
on port 8124:

    var net = require('net');
    var server = net.createServer(function(c) { //'connection' listener
      console.log('client connected');
      c.on('end', function() {
        console.log('client disconnected');
      });
      c.write('hello\r\n');
    });
    server.listen(8124, function() { //'listening' listener
      console.log('server bound');
    });

Test this by using `telnet`:

    telnet localhost 8124

To listen on the socket `/tmp/echo.sock` the third line from the last would
just be changed to

    server.listen('/tmp/echo.sock', function() { //'listening' listener

Use `nc` to connect to a UNIX domain socket server:

    nc -U /tmp/echo.sock

## net.connect(options[, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>
## net.createConnection(options[, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

A factory function, which returns a new ['net.Socket'](#net_class_net_socket)
and automatically connects with the supplied `options`.

The options are passed to both the ['net.Socket'](#net_class_net_socket)
constructor and the ['socket.connect'](#net_socket_connect_options_connectlistener)
method.

The `connectListener` parameter will be added as a listener for the
['connect'][] event once.

Here is an example of a client of the previously described echo server:

    var net = require('net');
    var client = net.connect({port: 8124},
        function() { //'connect' listener
      console.log('connected to server!');
      client.write('world!\r\n');
    });
    client.on('data', function(data) {
      console.log(data.toString());
      client.end();
    });
    client.on('end', function() {
      console.log('disconnected from server');
    });

## net.connect(port[, host][, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>
## net.createConnection(port[, host][, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>

A factory function, which returns a new
['net.Socket'](#net_class_net_socket) and automatically connects to the
supplied `port` and `host`.

If `host` is omitted, `'localhost'` will be assumed.

The `connectListener` parameter will be added as a listener for the
['connect'][] event once.

## net.connect(path[, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>
## net.createConnection(path[, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>

A factory function, which returns a new unix
['net.Socket'](#net_class_net_socket) and automatically connects to the
supplied `path`.

The `connectListener` parameter will be added as a listener for the
['connect'][] event once.

## Class: net.Server
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

This class is used to create a TCP or local server.

### server.listen(port[, hostname][, backlog][, callback])
<span class="api-platform">Ruff available: v1.6.0</span>

Begin accepting connections on the specified `port` and `hostname`. If the
`hostname` is omitted, the server will accept connections on any IPv6 address
(`::`) when IPv6 is available, or any IPv4 address (`0.0.0.0`) otherwise. A
port value of zero will assign a random port.

Backlog is the maximum length of the queue of pending connections.
The actual length will be determined by your OS through sysctl settings such as
`tcp_max_syn_backlog` and `somaxconn` on linux. The default value of this
parameter is 511 (not 512).

This function is asynchronous.  When the server has been bound,
['listening'][] event will be emitted.  The last parameter `callback`
will be added as a listener for the ['listening'][] event.

One issue some users run into is getting `EADDRINUSE` errors. This means that
another server is already running on the requested port. One way of handling this
would be to wait a second and then try again. This can be done with

    server.on('error', function (e) {
      if (e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(function () {
          server.close();
          server.listen(PORT, HOST);
        }, 1000);
      }
    });

(Note: All sockets in Ruff set `SO_REUSEADDR` already)


### server.listen(path[, callback])
<span class="api-platform">Ruff available: v1.6.0</span>

* `path` {String}
* `callback` {Function}

Start a local socket server listening for connections on the given `path`.

This function is asynchronous.  When the server has been bound,
['listening'][] event will be emitted.  The last parameter `callback`
will be added as a listener for the ['listening'][] event.

On UNIX, the local domain is usually known as the UNIX domain. The path is a
filesystem path name. It is subject to the same naming conventions and
permissions checks as would be done on file creation, will be visible in the
filesystem, and will *persist until unlinked*.

### server.listen(handle[, callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

* `handle` {Object}
* `callback` {Function}

The `handle` object can be set to either a server or socket (anything
with an underlying `_handle` member), or a `{fd: <n>}` object.

This will cause the server to accept connections on the specified
handle, but it is presumed that the file descriptor or handle has
already been bound to a port or domain socket.

Listening on a file descriptor is not supported on Windows.

This function is asynchronous.  When the server has been bound,
['listening'][] event will be emitted.
The last parameter `callback` will be added as a listener for the
['listening'][] event.

### server.listen(options[, callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

* `options` {Object} - Required. Supports the following properties:
  * `port` {Number} - Optional.
  * `host` {String} - Optional.
  * `backlog` {Number} - Optional.
* `callback` {Function} - Optional.

The `port`, `host`, and `backlog` properties of `options`, as well as the
optional callback function, behave as they do on a call to
[server.listen(port, \[host\], \[backlog\], \[callback\])
](#net_server_listen_port_hostname_backlog_callback). Alternatively, the `path`
option can be used to specify a UNIX socket.

If `exclusive` is `false` (default), then cluster workers will use the same
underlying handle, allowing connection handling duties to be shared. When
`exclusive` is `true`, the handle is not shared, and attempted port sharing
results in an error. An example which listens on an exclusive port is
shown below.

    server.listen({
      host: 'localhost',
      port: 80
    });

### server.close([callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Stops the server from accepting new connections and keeps existing
connections. This function is asynchronous, the server is finally
closed when all connections are ended and the server emits a ['close'][] event.
The optional `callback` will be called once the `'close'` event occurs. Unlike
that event, it will be called with an Error as its only argument if the server
was not open when it was closed.

### server.address()
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Returns the bound address, the address family name and port of the server
as reported by the operating system.
Useful to find which port was assigned when giving getting an OS-assigned address.
Returns an object with three properties, e.g.
`{ port: 12346, family: 'IPv4', address: '127.0.0.1' }`

Example:

    var server = net.createServer(function (socket) {
      socket.end("goodbye\n");
    });

    // grab a random port.
    server.listen(function() {
      address = server.address();
      console.log("opened server on %j", address);
    });

Don't call `server.address()` until the `'listening'` event has been emitted.


### server.maxConnections
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Set this property to reject connections when the server's connection count gets
high.

It is not recommended to use this option once a socket has been sent to a child
with `child_process.fork()`.

### server.connections
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>


The number of concurrent connections on the server.

This becomes `null` when sending a socket to a child with
`child_process.fork()`. To poll forks and get current number of active
connections use asynchronous `server.getConnections` instead.

### server.getConnections(callback)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Asynchronously get the number of concurrent connections on the server. Works
when sockets were sent to forks.

Callback should take two arguments `err` and `count`.

`net.Server` is an [EventEmitter][] with the following events:

### Event: 'listening'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Emitted when the server has been bound after calling `server.listen`.

### Event: 'connection'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

* {Socket object} The connection object

Emitted when a new connection is made. `socket` is an instance of
`net.Socket`.

### Event: 'close'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Emitted when the server closes. Note that if connections exist, this
event is not emitted until all connections are ended.

### Event: 'error'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

* {Error Object}

Emitted when an error occurs.  The ['close'][] event will be called directly
following this event.  See example in discussion of `server.listen`.

## Class: net.Socket
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

This object is an abstraction of a TCP or local socket.  `net.Socket`
instances implement a duplex Stream interface.  They can be created by the
user and used as a client (with `connect()`) or they can be created by Ruff
and passed to the user through the `'connection'` event of a server.

### new net.Socket([options])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Construct a new socket object.

`options` is an object with the following defaults:

    { fd: null,
      allowHalfOpen: false,
      readable: false,
      writable: false
    }

`fd` allows you to specify the existing file descriptor of socket.
Set `readable` and/or `writable` to `true` to allow reads and/or writes on this
socket (NOTE: Works only when `fd` is passed).
About `allowHalfOpen`, refer to `createServer()` and `'end'` event.

### socket.connect(options[, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Opens the connection for a given socket.

For TCP sockets, `options` argument should be an object which specifies:

  - `port`: Port the client should connect to (Required).

  - `host`: Host the client should connect to. Defaults to `'localhost'`.

  - `localAddress`: Local interface to bind to for network connections.

  - `localPort`: Local port to bind to for network connections.

  - `lookup` : Custom lookup function. Defaults to `dns.lookup`.

Normally this method is not needed, as `net.createConnection` opens the
socket. Use this only if you are implementing a custom Socket.

This function is asynchronous. When the ['connect'][] event is emitted the
socket is established. If there is a problem connecting, the `'connect'` event
will not be emitted, the `'error'` event will be emitted with the exception.

The `connectListener` parameter will be added as a listener for the
['connect'][] event.

### socket.connect(port[, host][, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>
### socket.connect(path[, connectListener])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

As [socket.connect(options[, connectListener])](#net_socket_connect_options_connectlistener),
with options either as either `{port: port, host: host}` or `{path: path}`.


### socket.write(data[, encoding][, callback])
<span class="api-platform">Ruff available: v1.6.0</span>
### socket.write(data[, callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Sends data on the socket. The second parameter specifies the encoding in the
case of a string--it defaults to UTF8 encoding.

Returns `true` if the entire data was flushed successfully to the kernel
buffer. Returns `false` if all or part of the data was queued in user memory.
`'drain'` will be emitted when the buffer is again free.

The optional `callback` parameter will be executed when the data is finally
written out - this may not be immediately.

### socket.end([data][, encoding])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Half-closes the socket. i.e., it sends a FIN packet. It is possible the
server will still send some data.

If `data` is specified, it is equivalent to calling
`socket.write(data, encoding)` followed by `socket.end()`.

### socket.destroy()
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Ensures that no more I/O activity happens on this socket. Only necessary in
case of errors (parse error or so).


`net.Socket` instances are [EventEmitter][] with the following events:

### Event: 'lookup'
<span class="api-platform">Ruff available: v1.6.0</span>

Emitted after resolving the hostname but before connecting.
Not applicable to UNIX sockets.

* `err` {Error | Null} The error object.  See [dns.lookup()][].
* `address` {String} The IP address.
* `family` {String | Null} The address type.  See [dns.lookup()][].

### Event: 'connect'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Emitted when a socket connection is successfully established.
See `connect()`.

### Event: 'data'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

* {Buffer object}

Emitted when data is received.  The argument `data` will be a `Buffer` or
`String`.  Encoding of data is set by `socket.setEncoding()`.
(See the [Readable Stream][] section for more information.)

Note that the __data will be lost__ if there is no listener when a `Socket`
emits a `'data'` event.

### Event: 'end'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Emitted when the other end of the socket sends a FIN packet.

By default (`allowHalfOpen == false`) the socket will destroy its file
descriptor  once it has written out its pending write queue.  However, by
setting `allowHalfOpen == true` the socket will not automatically `end()`
its side allowing the user to write arbitrary amounts of data, with the
caveat that the user is required to `end()` their side now.


### Event: 'timeout'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Emitted if the socket times out from inactivity. This is only to notify that
the socket has been idle. The user must manually close the connection.

See also: `socket.setTimeout()`


### Event: 'close'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

* `had_error` {Boolean} `true` if the socket had a transmission error.

Emitted once the socket is fully closed. The argument `had_error` is a boolean
which says if the socket was closed due to a transmission error.

## net.isIP(input)
<span class="api-platform">Ruff available: v1.6.0</span>

Tests if input is an IP address. Returns 0 for invalid strings,
returns 4 for IP version 4 addresses, and returns 6 for IP version 6 addresses.


## net.isIPv4(input)
<span class="api-platform">Ruff available: v1.6.0</span>

Returns true if input is a version 4 IP address, otherwise returns false.


## net.isIPv6(input)
<span class="api-platform">Ruff available: v1.6.0</span>

Returns true if input is a version 6 IP address, otherwise returns false.

['close']: #net_event_close
['connect']: #net_event_connect
['connection']: #net_event_connection
['end']: #net_event_end
[EventEmitter]: events.html#events_class_events_eventemitter
['listening']: #net_event_listening
[server.getConnections]: #net_server_getconnections_callback
[Readable Stream]: stream.html#stream_class_stream_readable
[stream.setEncoding()]: stream.html#stream_readable_setencoding_encoding
[dns.lookup()]: dns.html#dns_dns_lookup_hostname_options_callback
