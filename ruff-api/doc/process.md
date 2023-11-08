# Process

The `process` object is a `global` that provides information about, and control over, the current process.
As a global, it is always available to applications without using `require()`.

## process.hrtime([time])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.7.0</span>

The `process.hrtime()` method returns the current high-resolution real time in a `[seconds, nanoseconds]` tuple Array.
`time` is an optional parameter that must be the result of a previous `process.hrtime()` call
(and therefore, a real time in a `[seconds, nanoseconds]` tuple Array containing a previous time)
to diff with the current time.
These times are relative to an arbitrary time in the past,
and not related to the time of day and therefore not subject to clock drift.
The primary use is for measuring performance between intervals.

Passing in the result of a previous call to `process.hrtime()` is useful for calculating an amount of time passed between calls:

```javascript
var time = process.hrtime();
// [ 1800216, 25 ]

setTimeout(function() {
  var diff = process.hrtime(time);
  // [ 1, 552 ]

  console.log('Took', diff[0] * 1e9 + diff[1], 'nanoseconds');
  // benchmark took 1000000527 nanoseconds
}, 1000);
```

Constructing an array by some method other than calling `process.hrtime()` and passing the result to process.hrtime() will result in undefined behavior.

## process.nextTick(callback[, ...args])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

- `callback` &lt;Function&gt;
- `...args` &lt;any&gt;

The `process.nextTick()` method adds the `callback` to the "next tick queue".
Once the current turn of the event loop turn runs to completion,
all callbacks currently in the next tick queue will be called.

This is not a simple alias to `setTimeout(fn, 0)`, it's much more efficient.
It runs before any additional I/O events (including timers) fire in subsequent ticks of the event loop.

```javascript
console.log('start');
process.nextTick(function() {
    console.log('nextTick callback');
});
console.log('scheduled');
// Output:
// start
// scheduled
// nextTick callback
```
