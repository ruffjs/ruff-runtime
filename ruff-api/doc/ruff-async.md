# Ruff Async

Ruff asynchronous programming utilities.

## Usage

```js
var async = require('ruff-async');
```

## API Referernces

### Classes

#### `Queue`
<span class="api-platform">Ruff available: v1.6.0</span>

`new Queue(handler)`

Create a queue instance with given handler.

- **handler:** A function that take its last argument as a callback.

It is common for a method to queue inner operations, and `Queue` provides an easy way for both library developers and application developers.

```js
'use strict';

var Queue = require('ruff-async').Queue;

function Foo() {
    // Create a queue handled by `_writeHandler`.
    this._queue = new Queue(this._writeHandler);
}

Foo.prototype._writeHandler = function (data, callback) {
    // Do some asynchronous operation, and callback.
    setTimeout(callback, 100);
};

Foo.prototype.write = function (data, callback) {
    // Callback here is optional, make assertion by yourself if necessary.
    this._queue.push(this, [data], callback);
};

var foo = new Foo();

foo.write('biu');
foo.write('pia');
foo.write('yo', function (error) {
    // An error happened on `foo.write('biu')` or `foo.write('pia')` could be caught here,
    // and operations after that error will not have `_writeHandler` called.
});
```

An error will fall through from one operation to another only if:

- No callback is provided for the previous operation.
- The later operation is pushed in the same event loop as the previous one.

##### Members

| Member | Description |
| - | - |
| `push(thisArg, args[, callback])` | Push an item into the queue. The handler passed to `Queue` constructor will be called as `handler.apply(thisArg, args.concat(next))`, where the `next(error, value)` callback is created inside `Queue` rather than what a user passed in. |

### Functions

#### `series(tasks[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>

Run tasks in series.

- **tasks:** An array of functions that takes one argument as the `next(error, value)` callback.
- **callback:** A callback that has the first argument as error, and the second as the array of values passed to the second parameter of `next` callback.

```js
var async = require('ruff-async');

async.series([
    function(next) {
        console.log('1');
        next(undefined, 1);
    },
    function(next) {
        console.log('2');
        next(undefined, 2);
    },
    function(next) {
        console.log('3');
        next(undefined, 3);
    },
], function(error, values) {
    if (error) {
        console.log('error', error);
    }

    console.log('values', values);
});

```

#### `eachSeries(values, handler[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>

Traverse values in series by an asynchronous handler.

- **values:** An array of values to be traversed.
- **handler:** An asynchronous handler that takes the first argument as a value to be traversed, and the second as the `next(error)` callback.
- **callback:** A callback that has the first argument as error, if any.
