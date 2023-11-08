# DNS

The `dns` module contains functions to perform name resolution.

## dns.getServers()
<span class="api-platform">Ruff available: v1.6.2</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Returns an array of IP address strings that are being used for name resolution.

## dns.setServer(servers)
<span class="api-platform">Ruff available: v1.6.2</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Sets the IP addresses of the servers to be used when resolving. The servers argument is an array of IPv4 or IPv6 addresses.

If a port specified on the address it will be removed.

An error will be thrown if an invalid address is provided.

The dns.setServers() method must not be called while a DNS query is in progress.

## dns.lookup(hostname[, options], callback)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

Resolves a hostname (e.g. `'nanchao.org'`) into the first found A (IPv4) record.
`options` can be an object or integer. If `options` is not provided, then IPv4 is
valid. If `options` is an integer, then it must be `4`.

Alternatively, `options` can be an object containing these properties:

* `family` {Number} - The record family. If present, must be the integer
  `4`. If not provided, IP v4 is accepted.
* `all`: {Boolean} - When `true`, the callback returns all resolved addresses
  in an array, otherwise returns a single address. Defaults to `false`.

All properties are optional. An example usage of options is shown below.

```
{
  family: 4,
  all: false
}
```

The `callback` function has arguments `(err, address, family)`. `address` is a
string representation of an IPv4. `family` is the integer `4` and denotes the family
of `address` (not necessarily the value initially passed to `lookup`).

With the `all` option set to `true`, the arguments change to
`(err, addresses)`, with `addresses` being an array of objects with the
properties `address` and `family`.

On error, `err` is an [`Error`][] object, where `err.code` is the error code.
