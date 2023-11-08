# Timers

All of the timer functions are globals.  You do not need to `require()`
this module in order to use them.

## setTimeout(callback, delay[, arg][, ...])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

To schedule execution of a one-time `callback` after `delay` milliseconds. Returns a
`timeoutObject` for possible use with `clearTimeout()`. Optionally you can
also pass arguments to the callback.

It is important to note that your callback will probably not be called in exactly
`delay` milliseconds - Ruff makes no guarantees about the exact timing of when
the callback will fire, nor of the ordering things will fire in. The callback will
be called as close as possible to the time specified.

## clearTimeout(timeoutObject)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Prevents a timeout from triggering.

## setInterval(callback, delay[, arg][, ...])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

To schedule the repeated execution of `callback` every `delay` milliseconds.
Returns a `intervalObject` for possible use with `clearInterval()`. Optionally
you can also pass arguments to the callback.

## clearInterval(intervalObject)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Stops an interval from triggering.

## setImmediate(callback[, arg][, ...])
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

To schedule the "immediate" execution of `callback` after I/O events
callbacks and before `setTimeout` and `setInterval` . Returns an
`immediateObject` for possible use with `clearImmediate()`. Optionally you
can also pass arguments to the callback.

Callbacks for immediates are queued in the order in which they were created.
The entire callback queue is processed every event loop iteration. If you queue
an immediate from inside an executing callback, that immediate won't fire
until the next event loop iteration.

## clearImmediate(immediateObject)
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Stops an immediate from triggering.

