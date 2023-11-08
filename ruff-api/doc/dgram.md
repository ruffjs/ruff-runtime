# UDP / Datagram Sockets

<!-- name=dgram -->

Datagram sockets are available through `require('dgram')`.


## dgram.createSocket([callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

* `callback` Function. Attached as a listener to `message` events.
  Optional
* Returns: Socket object

Takes an optional callback which is added as a listener for `message` events.

Call `socket.bind()` if you want to receive datagrams. `socket.bind()` will
bind to the "all interfaces" address on a random port (it does the right thing
for both `udp4` and `udp6` sockets). You can then retrieve the address and port
with `socket.address().address` and `socket.address().port`.

## Class: dgram.Socket
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

The dgram Socket class encapsulates the datagram functionality.  It
should be created via `dgram.createSocket(...)`

### Event: 'message'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

* `msg` Buffer object. The message
* `rinfo` Object. Remote address information

Emitted when a new datagram is available on a socket.  `msg` is a `Buffer` and
`rinfo` is an object with the sender's address information:

    socket.on('message', function(msg, rinfo) {
      console.log('Received %d bytes from %s:%d\n',
                  msg.length, rinfo.address, rinfo.port);
    });

### Event: 'listening'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Emitted when a socket starts listening for datagrams.  This happens as soon as UDP sockets
are created.

### Event: 'close'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Emitted after a socket is closed with `close()`.  No new `message` events will be emitted
on this socket.

### Event: 'error'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

* `exception` Error object

Emitted when an error occurs.

### socket.send(buf, offset, length, port, address[, callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

* `buf` Buffer object or string.  Message to be sent
* `offset` Integer. Offset in the buffer where the message starts.
* `length` Integer. Number of bytes in the message.
* `port` Integer. Destination port.
* `address` String. Destination hostname or IP address.
* `callback` Function. Called when the message has been sent. Optional.

For UDP sockets, the destination port and address must be specified.

If the address is omitted or is an empty string, `'0.0.0.0'` or `'::0'` is used
instead.  Depending on the network configuration, those defaults may or may not
work; it's best to be explicit about the destination address.

If the socket has not been previously bound with a call to `bind`, it gets
assigned a random port number and is bound to the "all interfaces" address
(`'0.0.0.0'` for `udp4` sockets, `'::0'` for `udp6` sockets.)

An optional callback may be specified to detect for determining when it's
safe to reuse the `buf` object. The only way to know for sure that the datagram
has been sent is by using a callback. If an error occurs and a callback is
given, the error will be the first argument to the callback. If a callback is
not given, the error is emitted as an `'error'` event on the `socket` object.

With consideration for multi-byte characters, `offset` and `length` will
be calculated with respect to
[byte length](buffer.html#buffer_class_method_buffer_bytelength_string_encoding)
and not the character position.

Example of sending a UDP packet to a random port on `127.0.0.1`;

    var dgram = require('dgram');
    var message = new Buffer("Some bytes");
    var client = dgram.createSocket("udp4");
    client.send(message, 0, message.length, 41234, "127.0.0.1", function(err) {
      client.close();
    });

**A Note about UDP datagram size**

The maximum size of an `IPv4/v6` datagram depends on the `MTU` (_Maximum Transmission Unit_)
and on the `Payload Length` field size.

- The `Payload Length` field is `16 bits` wide, which means that a normal payload
  cannot be larger than 64K octets including internet header and data
  (65,507 bytes = 65,535 − 8 bytes UDP header − 20 bytes IP header);
  this is generally true for loopback interfaces, but such long datagrams
  are impractical for most hosts and networks.

- The `MTU` is the largest size a given link layer technology can support for datagrams.
  For any link, `IPv4` mandates a minimum `MTU` of `68` octets, while the recommended `MTU`
  for IPv4 is `576` (typically recommended as the `MTU` for dial-up type applications),
  whether they arrive whole or in fragments.

  For `IPv6`, the minimum `MTU` is `1280` octets, however, the mandatory minimum
  fragment reassembly buffer size is `1500` octets.
  The value of `68` octets is very small, since most current link layer technologies have
  a minimum `MTU` of `1500` (like Ethernet).

Note that it's impossible to know in advance the MTU of each link through which
a packet might travel, and that generally sending a datagram greater than
the (receiver) `MTU` won't work (the packet gets silently dropped, without
informing the source that the data did not reach its intended recipient).

### socket.bind([port][, address][, callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

* `port` Integer, Optional
* `address` String, Optional
* `callback` Function with no parameters, Optional. Callback when
  binding is done.

For UDP sockets, listen for datagrams on a named `port` and optional
`address`. If `port` is not specified, the OS will try to bind to a random
port. If `address` is not specified, the OS will try to listen on
all addresses.  After binding is done, a "listening" event is emitted
and the `callback`(if specified) is called. Specifying both a
"listening" event listener and `callback` is not harmful but not very
useful.

A bound datagram socket keeps the Ruff process running to receive
datagrams.

If binding fails, an "error" event is generated. In rare case (e.g.
binding a closed socket), an `Error` may be thrown by this method.

Example of a UDP server listening on port 41234:

    var dgram = require("dgram");

    var server = dgram.createSocket("udp4");

    server.on("error", function (err) {
      console.log("server error:\n" + err.stack);
      server.close();
    });
    
    server.on("message", function (msg, rinfo) {
      console.log("server got: " + msg + " from " +
        rinfo.address + ":" + rinfo.port);
    });
    
    server.on("listening", function () {
      var address = server.address();
      console.log("server listening " +
          address.address + ":" + address.port);
    });
    
    server.bind(41234);
    // server listening 0.0.0.0:41234


### socket.bind(options[, callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

* `options` {Object} - Required. Supports the following properties:
  * `port` {Number} - Required.
  * `address` {String} - Optional.
* `callback` {Function} - Optional.

The `port` and `address` properties of `options`, as well as the optional
callback function, behave as they do on a call to
[socket.bind(port, \[address\], \[callback\])
](#dgram_socket_bind_port_address_callback).

    socket.bind({
      address: 'localhost',
      port: 8000
    });


### socket.close([callback])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Close the underlying socket and stop listening for data on it. If a callback is
provided, it is added as a listener for the ['close'](#dgram_event_close) event.

### socket.address()
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Returns an object containing the address information for a socket.  For UDP sockets,
this object will contain `address` , `family` and `port`.

### socket.setBroadcast(flag)
<span class="api-platform">Ruff available: v1.11.2</span>

* `flag` boolean.  Whether to enable or disable broadast

Sets or clears the `SO_BROADCAST` socket option. When set to `true`, UDP packets may
be sent to a local interface's broadcast address.

**If the socket has not been previously bound with a call to `bind` or `send`,**
**it would throw an error when this API is called.**

Example of broadcasting UDP packet to network `192.168.1.0`;

    var dgram = require('dgram');
    var message = new Buffer("Some bytes");
    var client = dgram.createSocket("udp4");
    client.bind(function () {
      client.setBroadcast(1);
    });
    client.send(message, 0, message.length, 41234, "192.168.1.255", function(err) {
      client.close();
    });
