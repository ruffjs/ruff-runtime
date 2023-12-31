# util

These functions are in the module `'util'`. Use `require('util')` to
access them.

The `util` module is primarily designed to support the needs of ruff.js's
internal APIs.  Many of these utilities are useful for your own
programs.  If you find that these functions are lacking for your
purposes, however, you are encouraged to write your own utilities.  We
are not interested in any future additions to the `util` module that
are unnecessary for ruff.js's internal functionality.

## util.debuglog(section)

* `section` {String} The section of the program to be debugged
* Returns: {Function} The logging function

This is used to create a function which conditionally writes to stderr
based on the existence of a `NODE_DEBUG` environment variable.  If the
`section` name appears in that environment variable, then the returned
function will be similar to `console.error()`.  If not, then the
returned function is a no-op.

For example:

```javascript
var debuglog = util.debuglog('foo');

var bar = 123;
debuglog('hello from foo [%d]', bar);
```

If this program is run with `RUFF_DEBUG=foo` in the environment, then
it will output something like:

    FOO 3245: hello from foo [123]

where `3245` is the process id.  If it is not run with that
environment variable set, then it will not print anything.

You may separate multiple `RUFF_DEBUG` environment variables with a
comma.  For example, `RUFF_DEBUG=fs,net,tls`.


## util.format(format[, ...])

Returns a formatted string using the first argument as a `printf`-like format.

The first argument is a string that contains zero or more *placeholders*.
Each placeholder is replaced with the converted value from its corresponding
argument. Supported placeholders are:

* `%s` - String.
* `%d` - Number (both integer and float).
* `%j` - JSON.  Replaced with the string `'[Circular]'` if the argument
contains circular references.
* `%%` - single percent sign (`'%'`). This does not consume an argument.

If the placeholder does not have a corresponding argument, the placeholder is
not replaced.

    util.format('%s:%s', 'foo'); // 'foo:%s'

If there are more arguments than placeholders, the extra arguments are
coerced to strings (for objects and symbols, `util.inspect()` is used)
and then concatenated, delimited by a space.

    util.format('%s:%s', 'foo', 'bar', 'baz'); // 'foo:bar baz'

If the first argument is not a format string then `util.format()` returns
a string that is the concatenation of all its arguments separated by spaces.
Each argument is converted to a string with `util.inspect()`.

    util.format(1, 2, 3); // '1 2 3'

## util.log(string)

Output with timestamp on `stdout`.

    require('util').log('Timestamped message.');

## util.inspect(object[, options])

Return a string representation of `object`, which is useful for debugging.

An optional *options* object may be passed that alters certain aspects of the
formatted string:

 - `showHidden` - if `true` then the object's non-enumerable and symbol
   properties will be shown too. Defaults to `false`.

 - `depth` - tells `inspect` how many times to recurse while formatting the
   object. This is useful for inspecting large complicated objects. Defaults to
   `2`. To make it recurse indefinitely pass `null`.

 - `colors` - if `true`, then the output will be styled with ANSI color codes.
   Defaults to `false`. Colors are customizable, see below.

 - `customInspect` - if `false`, then custom `inspect(depth, opts)` functions
   defined on the objects being inspected won't be called. Defaults to `true`.

Example of inspecting all properties of the `util` object:

    var util = require('util');

    console.log(util.inspect(util, { showHidden: true, depth: null }));

Values may supply their own custom `inspect(depth, opts)` functions, when
called they receive the current depth in the recursive inspection, as well as
the options object passed to `util.inspect()`.

### Customizing `util.inspect` colors

<!-- type=misc -->

Color output (if enabled) of `util.inspect` is customizable globally
via `util.inspect.styles` and `util.inspect.colors` objects.

`util.inspect.styles` is a map assigning each style a color
from `util.inspect.colors`.
Highlighted styles and their default values are:
 * `number` (yellow)
 * `boolean` (yellow)
 * `string` (green)
 * `date` (magenta)
 * `regexp` (red)
 * `null` (bold)
 * `undefined` (grey)
 * `special` - only function at this time (cyan)
 * `name` (intentionally no styling)

Predefined color codes are: `white`, `grey`, `black`, `blue`, `cyan`,
`green`, `magenta`, `red` and `yellow`.
There are also `bold`, `italic`, `underline` and `inverse` codes.

### Custom `inspect()` function on Objects

<!-- type=misc -->

Objects also may define their own `inspect(depth)` function which `util.inspect()`
will invoke and use the result of when inspecting the object:

    var util = require('util');

    var obj = { name: 'nate' };
    obj.inspect = function(depth) {
      return '{' + this.name + '}';
    };

    util.inspect(obj);
      // "{nate}"

You may also return another Object entirely, and the returned String will be
formatted according to the returned Object. This is similar to how
`JSON.stringify()` works:

    var obj = { foo: 'this will not show up in the inspect() output' };
    obj.inspect = function(depth) {
      return { bar: 'baz' };
    };

    util.inspect(obj);
      // "{ bar: 'baz' }"


## util.inherits(constructor, superConstructor)

Inherit the prototype methods from one
into another.  The prototype of `constructor` will be set to a new
object created from `superConstructor`.

As an additional convenience, `superConstructor` will be accessible
through the `constructor.super_` property.

    var util = require("util");
    //TODO events has not been achieved
    var EventEmitter = require("events");

    function MyStream() {
        EventEmitter.call(this);
    }

    util.inherits(MyStream, EventEmitter);

    MyStream.prototype.write = function(data) {
        this.emit("data", data);
    }

    var stream = new MyStream();

    console.log(stream instanceof EventEmitter); // true
    console.log(MyStream.super_ === EventEmitter); // true

    stream.on("data", function(data) {
        console.log('Received data: "' + data + '"');
    })
    stream.write("It works!"); // Received data: "It works!"


## util.deprecate(function, string)

Marks that a method should not be used any more.

    var util = require('util');

    exports.puts = util.deprecate(function() {
      for (var i = 0, len = arguments.length; i < len; ++i) {
        //TODO process has not been achieved
        process.stdout.write(arguments[i] + '\n');
      }
    }, 'util.puts: Use console.log instead');

It returns a modified function which warns once by default.

## util.mixin(base, exts)

