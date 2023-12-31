# File System

<!--name=fs-->

File I/O is provided by simple wrappers around standard POSIX functions.  To
use this module do `require('fs')`. All the methods have asynchronous and
synchronous forms.

The asynchronous form always takes a completion callback as its last argument.
The arguments passed to the completion callback depend on the method, but the
first argument is always reserved for an exception. If the operation was
completed successfully, then the first argument will be `null` or `undefined`.

When using the synchronous form any exceptions are immediately thrown.
You can use try/catch to handle exceptions or allow them to bubble up.

Here is an example of the asynchronous version:

    var fs = require('fs');

    fs.unlink('/tmp/hello', function (err) {
      if (err) throw err;
      console.log('successfully deleted /tmp/hello');
    });

Here is the synchronous version:

    var fs = require('fs');

    fs.unlinkSync('/tmp/hello');
    console.log('successfully deleted /tmp/hello');

With the asynchronous methods there is no guaranteed ordering. So the
following is prone to error:

    fs.rename('/tmp/hello', '/tmp/world', function (err) {
      if (err) throw err;
      console.log('renamed complete');
    });
    fs.stat('/tmp/world', function (err, stats) {
      if (err) throw err;
      console.log('stats: ' + JSON.stringify(stats));
    });

It could be that `fs.stat` is executed before `fs.rename`.
The correct way to do this is to chain the callbacks.

    fs.rename('/tmp/hello', '/tmp/world', function (err) {
      if (err) throw err;
      fs.stat('/tmp/world', function (err, stats) {
        if (err) throw err;
        console.log('stats: ' + JSON.stringify(stats));
      });
    });

In busy processes, the programmer is _strongly encouraged_ to use the
asynchronous versions of these calls. The synchronous versions will block
the entire process until they complete--halting all connections.

The relative path to a filename can be used. Remember, however, that this path
will be relative to `process.cwd()`.

Most fs functions let you omit the callback argument. If you do, a default
callback is used that rethrows errors. To get a trace to the original call
site, set the RUFF_DEBUG environment variable:

    $ cat script.js
    function bad() {
      require('fs').readFile('/');
    }
    bad();

    $ env RUFF_DEBUG=fs node script.js
    fs.js:66
            throw err;
                  ^
    Error: EISDIR, read
        rethrow (fs.js:61)
        maybeCallback (fs.js:79)
        Object.fs.readFile (fs.js:153)
        bad (/path/to/script.js:2)
        Object.<anonymous> (/path/to/script.js:5)
        <etc.>


## fs.rename(oldPath, newPath, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous rename(2). No arguments other than a possible exception are given
to the completion callback.

## fs.renameSync(oldPath, newPath)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous rename(2). Returns `undefined`.

## fs.ftruncate(fd, len, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous ftruncate(2). No arguments other than a possible exception are
given to the completion callback.

## fs.ftruncateSync(fd, len)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous ftruncate(2). Returns `undefined`.

## fs.truncate(path, len, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous truncate(2). No arguments other than a possible exception are
given to the completion callback. A file descriptor can also be passed as the
first argument. In this case, `fs.ftruncate()` is called.

## fs.truncateSync(path, len)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous truncate(2). Returns `undefined`.

## fs.chown(path, uid, gid, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous chown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.chownSync(path, uid, gid)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous chown(2). Returns `undefined`.

## fs.fchown(fd, uid, gid, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous fchown(2). No arguments other than a possible exception are given
to the completion callback.

## fs.fchownSync(fd, uid, gid)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous fchown(2). Returns `undefined`.

## fs.chmod(path, mode, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous chmod(2). No arguments other than a possible exception are given
to the completion callback.

## fs.chmodSync(path, mode)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous chmod(2). Returns `undefined`.

## fs.fchmod(fd, mode, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous fchmod(2). No arguments other than a possible exception
are given to the completion callback.

## fs.fchmodSync(fd, mode)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous fchmod(2). Returns `undefined`.

## fs.stat(path, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous stat(2). The callback gets two arguments `(err, stats)` where
`stats` is a [fs.Stats](#fs_class_fs_stats) object.  See the [fs.Stats](#fs_class_fs_stats)
section below for more information.

## fs.lstat(path, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous lstat(2). The callback gets two arguments `(err, stats)` where
`stats` is a `fs.Stats` object. `lstat()` is identical to `stat()`, except that if
`path` is a symbolic link, then the link itself is stat-ed, not the file that it
refers to.

## fs.fstat(fd, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous fstat(2). The callback gets two arguments `(err, stats)` where
`stats` is a `fs.Stats` object. `fstat()` is identical to `stat()`, except that
the file to be stat-ed is specified by the file descriptor `fd`.

## fs.statSync(path)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous stat(2). Returns an instance of `fs.Stats`.

## fs.lstatSync(path)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous lstat(2). Returns an instance of `fs.Stats`.

## fs.fstatSync(fd)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous fstat(2). Returns an instance of `fs.Stats`.

## fs.link(srcpath, dstpath, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous link(2). No arguments other than a possible exception are given to
the completion callback.

## fs.linkSync(srcpath, dstpath)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous link(2). Returns `undefined`.

## fs.symlink(destination, path[, type], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous symlink(2). No arguments other than a possible exception are given
to the completion callback.
The `type` argument can be set to `'dir'`, `'file'`, or `'junction'` (default
is `'file'`) and is only available on Windows (ignored on other platforms).
Note that Windows junction points require the destination path to be absolute.  When using
`'junction'`, the `destination` argument will automatically be normalized to absolute path.

## fs.symlinkSync(destination, path[, type])
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous symlink(2). Returns `undefined`.

## fs.readlink(path, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous readlink(2). The callback gets two arguments `(err,
linkString)`.

## fs.readlinkSync(path)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous readlink(2). Returns the symbolic link's string value.

## fs.realpath(path[, cache], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous realpath(2). The `callback` gets two arguments `(err,
resolvedPath)`. May use `process.cwd` to resolve relative paths. `cache` is an
object literal of mapped paths that can be used to force a specific path
resolution or avoid additional `fs.stat` calls for known real paths.

Example:

    var cache = {'/etc':'/private/etc'};
    fs.realpath('/etc/passwd', cache, function (err, resolvedPath) {
      if (err) throw err;
      console.log(resolvedPath);
    });

## fs.realpathSync(path[, cache])
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous realpath(2). Returns the resolved path.

## fs.unlink(path, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous unlink(2). No arguments other than a possible exception are given
to the completion callback.

## fs.unlinkSync(path)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous unlink(2). Returns `undefined`.

## fs.rmdir(path, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous rmdir(2). No arguments other than a possible exception are given
to the completion callback.

## fs.rmdirSync(path)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous rmdir(2). Returns `undefined`.

## fs.mkdir(path[, mode], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous mkdir(2). No arguments other than a possible exception are given
to the completion callback. `mode` defaults to `0777`.

## fs.mkdirSync(path[, mode])
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous mkdir(2). Returns `undefined`.

## fs.close(fd, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous close(2).  No arguments other than a possible exception are given
to the completion callback.

## fs.closeSync(fd)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous close(2). Returns `undefined`.

## fs.open(path, flags[, mode], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous file open. See open(2). `flags` can be:

* `'r'` - Open file for reading.
An exception occurs if the file does not exist.

* `'r+'` - Open file for reading and writing.
An exception occurs if the file does not exist.

* `'rs'` - Open file for reading in synchronous mode. Instructs the operating
  system to bypass the local file system cache.

  This is primarily useful for opening files on NFS mounts as it allows you to
  skip the potentially stale local cache. It has a very real impact on I/O
  performance so don't use this flag unless you need it.

  Note that this doesn't turn `fs.open()` into a synchronous blocking call.
  If that's what you want then you should be using `fs.openSync()`

* `'rs+'` - Open file for reading and writing, telling the OS to open it
  synchronously. See notes for `'rs'` about using this with caution.

* `'w'` - Open file for writing.
The file is created (if it does not exist) or truncated (if it exists).

* `'wx'` - Like `'w'` but fails if `path` exists.

* `'w+'` - Open file for reading and writing.
The file is created (if it does not exist) or truncated (if it exists).

* `'wx+'` - Like `'w+'` but fails if `path` exists.

* `'a'` - Open file for appending.
The file is created if it does not exist.

* `'ax'` - Like `'a'` but fails if `path` exists.

* `'a+'` - Open file for reading and appending.
The file is created if it does not exist.

* `'ax+'` - Like `'a+'` but fails if `path` exists.

`mode` sets the file mode (permission and sticky bits), but only if the file was
created. It defaults to `0666`, readable and writeable.

The callback gets two arguments `(err, fd)`.

The exclusive flag `'x'` (`O_EXCL` flag in open(2)) ensures that `path` is newly
created. On POSIX systems, `path` is considered to exist even if it is a symlink
to a non-existent file. The exclusive flag may or may not work with network file
systems.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

## fs.openSync(path, flags[, mode])
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous version of `fs.open()`. Returns an integer representing the file
descriptor.

## fs.utimes(path, atime, mtime, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Change file timestamps of the file referenced by the supplied path.

Note: the arguments `atime` and `mtime` of the following related functions does
follow the below rules:

- If the value is a numberable string like "123456789", the value would get
  converted to corresponding number.
- If the value is `NaN` or `Infinity`, the value would get converted to
  `Date.now()`.

## fs.utimesSync(path, atime, mtime)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous version of `fs.utimes()`. Returns `undefined`.


## fs.futimes(fd, atime, mtime, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Change the file timestamps of a file referenced by the supplied file
descriptor.

## fs.futimesSync(fd, atime, mtime)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous version of `fs.futimes()`. Returns `undefined`.

## fs.fsync(fd, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Asynchronous fsync(2). No arguments other than a possible exception are given
to the completion callback.

## fs.fsyncSync(fd)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous fsync(2). Returns `undefined`.

## fs.write(fd, buffer[, position], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Write `buffer` to the file specified by `fd`.

`position` refers to the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'`, the data will be written
at the 0. See pwrite(2).

The callback will be given three arguments `(err, written, buffer)` where
`written` specifies how many _bytes_ were written from `buffer`.

Note that it is unsafe to use `fs.write` multiple times on the same file
without waiting for the callback. For this scenario,
`fs.createWriteStream` is strongly recommended.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

## fs.write(fd, data[, position], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Write `data` to the file specified by `fd`.  If `data` is not a Buffer instance
then the value will be coerced to new Buffer().

`position` refers to the offset from the beginning of the file where this data
should be written. If `typeof position !== 'number'` the data will be written at
the current position. See pwrite(2).

The callback will receive the arguments `(err, written, string)` where `written`
specifies how many _bytes_ the passed string required to be written. Note that
bytes written is not the same as string characters. See
[Buffer.byteLength](buffer.html#buffer_class_method_buffer_bytelength_string_encoding).

Unlike when writing `buffer`, the entire string must be written. No substring
may be specified. This is because the byte offset of the resulting data may not
be the same as the string offset.

Note that it is unsafe to use `fs.write` multiple times on the same file
without waiting for the callback. For this scenario,
`fs.createWriteStream` is strongly recommended.

On Linux, positional writes don't work when the file is opened in append mode.
The kernel ignores the position argument and always appends the data to
the end of the file.

## fs.writeSync(fd, buffer, offset, length[, position])
<span class="api-platform">Ruff available: v1.6.0</span>

## fs.writeSync(fd, data[, position[, encoding]])
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous versions of `fs.write()`. Returns the number of bytes written.

## fs.read(fd, buffer, offset, length, position, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Read data from the file specified by `fd`.

`buffer` is the buffer that the data will be written to.

`offset` is the offset in the buffer to start writing at.

`length` is an integer specifying the number of bytes to read.

`position` is an integer specifying where to begin reading from in the file.
If `position` is `null`, data will be read from the current file position.

The callback is given the three arguments, `(err, bytesRead, buffer)`.

## fs.readSync(fd, buffer, position)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous version of `fs.read`. Returns the number of `bytesRead`.

## fs.readFile(filename[, options], callback)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.1</span>

* `filename` {String}
* `options` {Object | String}
  * `encoding` {String | Null} default = `null`
  * `flag` {String} default = `'r'`
* `callback` {Function}

Asynchronously reads the entire contents of a file. Example:

    fs.readFile('/etc/passwd', function (err, data) {
      if (err) throw err;
      console.log(data);
    });

The callback is passed two arguments `(err, data)`, where `data` is the
contents of the file.

If no encoding is specified, then the raw buffer is returned.

If `options` is a string, then it specifies the encoding. Example:

    fs.readFile('/etc/passwd', 'utf8', callback);


## fs.readFileSync(filename[, options])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.1</span>

Synchronous version of `fs.readFile`. Returns the contents of the `filename`.

If the `encoding` option is specified then this function returns a
string. Otherwise it returns a buffer.


## fs.writeFile(filename, data[, options], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

* `filename` {String}
* `data` {String | Buffer}
* `options` {Object | String}
  * `encoding` {String | Null} default = `'utf8'`
  * `mode` {Number} default = `0666`
  * `flag` {String} default = `'w'`
* `callback` {Function}

Asynchronously writes data to a file, replacing the file if it already exists.
`data` can be a string or a buffer.

The `encoding` option is ignored if `data` is a buffer. It defaults
to `'utf8'`.

Example:

    fs.writeFile('message.txt', 'Hello Node.js', function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });

If `options` is a string, then it specifies the encoding. Example:

    fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);

## fs.writeFileSync(filename, data[, options])
<span class="api-platform">Ruff available: v1.6.0</span>

The synchronous version of `fs.writeFile`. Returns `undefined`.

## fs.appendFile(filename, data[, options], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

* `filename` {String}
* `data` {String | Buffer}
* `options` {Object | String}
  * `encoding` {String | Null} default = `'utf8'`
  * `mode` {Number} default = `0666`
  * `flag` {String} default = `'a'`
* `callback` {Function}

Asynchronously append data to a file, creating the file if it does not yet exist.
`data` can be a string or a buffer.

Example:

    fs.appendFile('message.txt', 'data to append', function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });

If `options` is a string, then it specifies the encoding. Example:

    fs.appendFile('message.txt', 'data to append', 'utf8', callback);

## fs.appendFileSync(filename, data[, options])
<span class="api-platform">Ruff available: v1.6.0</span>

The synchronous version of `fs.appendFile`. Returns `undefined`.

## fs.exists(path, callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Test whether or not the given path exists by checking with the file system.
Then call the `callback` argument with either true or false.  Example:

    fs.exists('/etc/passwd', function (exists) {
      console.log(exists ? "it's there" : 'no passwd!');
    });

`fs.exists()` should not be used to check if a file exists before calling
`fs.open()`. Doing so introduces a race condition since other processes may
change the file's state between the two calls. Instead, user code should
call `fs.open()` directly and handle the error raised if the file is
non-existent.

## fs.existsSync(path)
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous version of [`fs.exists`](fs.html#fs_fs_exists_path_callback).
Returns `true` if the file exists, `false` otherwise.

## fs.access(path[, mode], callback)
<span class="api-platform">Ruff available: v1.6.0</span>

Tests a user's permissions for the file specified by `path`. `mode` is an
optional integer that specifies the accessibility checks to be performed. The
following constants define the possible values of `mode`. It is possible to
create a mask consisting of the bitwise OR of two or more values.

The final argument, `callback`, is a callback function that is invoked with
a possible error argument. If any of the accessibility checks fail, the error
argument will be populated. The following example checks if the file
`/etc/passwd` can be read and written by the current process.

    fs.access('/etc/passwd', 'rw', function (err) {
      console.log(err ? 'no access!' : 'can read/write');
    });

## fs.accessSync(path[, mode])
<span class="api-platform">Ruff available: v1.6.0</span>

Synchronous version of `fs.access`. This throws if any accessibility checks
fail, and does nothing otherwise.

## Class: fs.Stats

Objects returned from `fs.stat()`, `fs.lstat()` and `fs.fstat()` and their
synchronous counterparts are of this type.

 - `stats.isFile()`
 - `stats.isDirectory()`
 - `stats.isBlockDevice()`
 - `stats.isCharacterDevice()`
 - `stats.isSymbolicLink()` (only valid with  `fs.lstat()`)
 - `stats.isFIFO()`
 - `stats.isSocket()`

For a regular file `util.inspect(stats)` would return a string very
similar to this:

    { mode: 33188,
      uid: 501,
      gid: 20,
      size: 0,
      atime: 2015-11-24 13:56:20.000+08:00,
      mtime: 2015-11-24 11:48:37.000+08:00,
      ctime: 2015-11-24 11:48:37.000+08:00,
      type: 'file' }

Please note that `atime`, `mtime`, and `ctime` are
instances of [Date][MDN-Date] object and to compare the values of
these objects you should use appropriate methods. For most general
uses [getTime()][MDN-Date-getTime] will return the number of
milliseconds elapsed since _1 January 1970 00:00:00 UTC_ and this
integer should be sufficient for any comparison, however there are
additional methods which can be used for displaying fuzzy information.
More details can be found in the [MDN JavaScript Reference][MDN-Date]
page.

[MDN-Date]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date
[MDN-Date-getTime]: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/getTime

### Stat Time Values

The times in the stat object have the following semantics:

* `atime` "Access Time" - Time when file data last accessed.  Changed
  by the `mknod(2)`, `utimes(2)`, and `read(2)` system calls.
* `mtime` "Modified Time" - Time when file data last modified.
  Changed by the `mknod(2)`, `utimes(2)`, and `write(2)` system calls.
* `ctime` "Change Time" - Time when file status was last changed
  (inode data modification).  Changed by the `chmod(2)`, `chown(2)`,
  `link(2)`, `mknod(2)`, `rename(2)`, `unlink(2)`, `utimes(2)`,
  `read(2)`, and `write(2)` system calls.

## fs.createReadStream(path[, options])
<span class="api-platform">Ruff available: v1.6.0</span>

Returns a new ReadStream object (See `Readable Stream`).

Be aware that, unlike the default value set for `highWaterMark` on a
readable stream (16 kb), the stream returned by this method has a
default value of 64 kb for the same parameter.

`options` is an object or string with the following defaults:

    { flags: 'r',
      encoding: null,
      fd: null,
      mode: 0666,
      autoClose: true
    }

`options` can include `start` and `end` values to read a range of bytes from
the file instead of the entire file.  Both `start` and `end` are inclusive and
start at 0. The `encoding` can be `'utf8'`, `'ascii'`, or `'base64'`.

If `fd` is specified, `ReadStream` will ignore the `path` argument and will use
the specified file descriptor. This means that no `open` event will be emitted.

If `autoClose` is false, then the file descriptor won't be closed, even if
there's an error.  It is your responsibility to close it and make sure
there's no file descriptor leak.  If `autoClose` is set to true (default
behavior), on `error` or `end` the file descriptor will be closed
automatically.

`mode` sets the file mode (permission and sticky bits), but only if the
file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

    fs.createReadStream('sample.txt', {start: 90, end: 99});

If `options` is a string, then it specifies the encoding.

## Class: fs.ReadStream

`ReadStream` is a [Readable Stream](stream.html#stream_class_stream_readable).

### Event: 'open'

* `fd` {Integer} file descriptor used by the ReadStream.

Emitted when the ReadStream's file is opened.


## fs.createWriteStream(path[, options])
<span class="api-platform">Ruff available: v1.6.0</span>

Returns a new WriteStream object (See `Writable Stream`).

`options` is an object or string with the following defaults:

    { flags: 'w',
      defaultEncoding: 'utf8',
      fd: null,
      mode: 0666 }

`options` may also include a `start` option to allow writing data at
some position past the beginning of the file.  Modifying a file rather
than replacing it may require a `flags` mode of `r+` rather than the
default mode `w`. The `defaultEncoding` can be `'utf8'`, `'ascii'`, `binary`,
or `'base64'`.

Like `ReadStream` above, if `fd` is specified, `WriteStream` will ignore the
`path` argument and will use the specified file descriptor. This means that no
`open` event will be emitted.

If `options` is a string, then it specifies the encoding.

## Class: fs.WriteStream

`WriteStream` is a [Writable Stream](stream.html#stream_class_stream_writable).

### Event: 'open'

* `fd` {Integer} file descriptor used by the WriteStream.

Emitted when the WriteStream's file is opened.

### file.bytesWritten

The number of bytes written so far. Does not include data that is still queued
for writing.
