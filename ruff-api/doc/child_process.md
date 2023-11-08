# Child Process

The `child_process` module provides the ability to spawn child processes

By default, pipes for `stdin`, `stdout` and `stderr` are established between
the parent process and the spawned child.

The [`child_process.spawn()`][] method spawns the child process asynchronously,
without blocking the event loop.

## child_process.spawn(command[, args][, options])
<span class="api-platform">Ruff available: v1.6.0</span>

* `command` {String} The command to run
* `args` {Array} List of string arguments
* `options` {Object}
  * `cwd` {String} Current working directory of the child process
  * `env` {Object} Environment key-value pairs
  * `argv0` {String} Explicitly set the value of `argv[0]` sent to the child
    process. This will be set to `command` if not specified.
  * `stdio` {Array|String} Child's stdio configuration. (See
    [`options.stdio`][`stdio`])
  * `detached` {Boolean} Prepare child to run independently of its parent
    process. Specific behavior depends on the platform, see
    [`options.detached`][])
  * `uid` {Number} Sets the user identity of the process. (See setuid(2).)
  * `gid` {Number} Sets the group identity of the process. (See setgid(2).)
* return: {ChildProcess}

The `child_process.spawn()` method spawns a new process using the given
`command`, with command line arguments in `args`. If omitted, `args` defaults
to an empty array.

A third argument may be used to specify additional options, with these defaults:

```js
{
  cwd: undefined,
  env: process.env
}
```

Use `cwd` to specify the working directory from which the process is spawned.
If not given, the default is to inherit the current working directory.

Use `env` to specify environment variables that will be visible to the new
process, the default is [`process.env`][].

Example of running `ls -lh /`, capturing `stdout`, `stderr`, and the
exit code:
```js
const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', '/']);

ls.stdout.on('data', function (data) {
  console.log('stdout:', data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr:', data);
});

ls.on('exit', function (code) {
  console.log('child process exited with code:', code);
});
```

### options.stdio

The `options.stdio` option is used to configure the pipes that are established
between the parent and child process. By default, the child's stdin, stdout,
and stderr are redirected to corresponding [`child.stdin`][], [`child.stdout`][], and
[`child.stderr`][] streams on the [`ChildProcess`][] object. This is equivalent to
setting the `options.stdio` equal to `['pipe', 'pipe', 'pipe']`.

For convenience, `options.stdio` may be one of the following strings:

* `'pipe'` - equivalent to `['pipe', 'pipe', 'pipe']` (the default)
* `'ignore'` - equivalent to `['ignore', 'ignore', 'ignore']`
* `'inherit'` - equivalent to `[process.stdin, process.stdout, process.stderr]`
   or `[0,1,2]`

Otherwise, the value of `options.stdio` is an array where each index corresponds
to an fd in the child. The fds 0, 1, and 2 correspond to stdin, stdout,
and stderr, respectively. Additional fds can be specified to create additional
pipes between the parent and child. The value is one of the following:

1. `'pipe'` - Create a pipe between the child process and the parent process.
   The parent end of the pipe is exposed to the parent as a property on the
   `child_process` object as [`child.stdio[fd]`][`stdio`]. Pipes created for
   fds 0 - 2 are also available as [`child.stdin`][], [`child.stdout`][]
   and [`child.stderr`][], respectively.
2. `'ignore'` - Instructs Node.js to ignore the fd in the child. While Node.js
   will always open fds 0 - 2 for the processes it spawns, setting the fd to
   `'ignore'` will cause Node.js to open `/dev/null` and attach it to the
   child's fd.
   corresponds to the index in the `stdio` array. Note that the stream must
   have an underlying descriptor (file streams do not until the `'open'`
   event has occurred).
3. Positive integer - The integer value is interpreted as a file descriptor
   that is is currently open in the parent process. It is shared with the child
   process, similar to how {Stream} objects can be shared.
4. `null`, `undefined` - Use default value. For stdio fds 0, 1 and 2 (in other
   words, stdin, stdout, and stderr) a pipe is created. For fd 3 and up, the
   default is `'ignore'`.

## Class: ChildProcess

Instances of the `ChildProcess` class are [`EventEmitters`][`EventEmitter`] that represent
spawned child processes.

Instances of `ChildProcess` are not intended to be created directly. Rather,
use the [`child_process.spawn()`][], [`child_process.exec()`][],
[`child_process.execFile()`][], or [`child_process.fork()`][] methods to create
instances of `ChildProcess`.

### Event: 'error'

* `err` {Error} the error.

The `'error'` event is emitted whenever:

1. The process could not be spawned, or
2. The process could not be killed, or
3. Sending a message to the child process failed.

Note that the `'exit'` event may or may not fire after an error has occurred.
If you are listening to both the `'exit'` and `'error'` events, it is important
to guard against accidentally invoking handler functions multiple times.

### Event: 'exit'

* `code` {Number} the exit code if the child exited on its own.
* `signal` {String} the signal by which the child process was terminated.

The `'exit'` event is emitted after the child process ends. If the process
exited, `code` is the final exit code of the process, otherwise `null`. If the
process terminated due to receipt of a signal, `signal` is the string name of
the signal, otherwise `null`. One of the two will always be non-null.


### child.kill([signal])
<span class="api-platform">Ruff available: v1.6.0</span>

* `signal` {String}

### child.stderr
<span class="api-platform">Ruff available: v1.6.0</span>

* {Stream}

A `Readable Stream` that represents the child process's `stderr`.

### child.stdin
<span class="api-platform">Ruff available: v1.6.0</span>

* {Stream}

A `Writable Stream` that represents the child process's `stdin`.

### child.stdout
<span class="api-platform">Ruff available: v1.6.0</span>

* {Stream}

A `Readable Stream` that represents the child process's `stdout`.
