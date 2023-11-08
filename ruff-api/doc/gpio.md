# GPIO

General-purpose input/output (GPIO) is a generic pin on an integrated circuit whose behavior—including whether it is an input or output pin—is controllable by the user at run time.

## Using a GPIO Interface in Driver

### Configuring `driver.json`

To use a GPIO interface in a driver, you need to have an input with type `"gpio"` in the `driver.json`:

```json
{
    "models": [],
    "inputs": {
        "gpio-in": {
            "type": "gpio",
            "args": {
                "direction": "in",
                "edge": "both"
            }
        },
        "gpio-out": {
            "type": "gpio",
            "args": {
                "direction": "out",
                "level": "low"
            }
        }
    }
}
```

In the JSON configuration above, `"gpio-in"` and `"gpio-out"` are just names of the GPIO interfaces (you can change them to something else if you want to),
which will be used as the key to get the interface instances in the driver.
And the `"type": "gpio"` informs Ruff framework to distribute an GPIO interface instead of others.

#### Arguments

##### `direction`

The direction of the interface, could either be `"in"` or `"out"`.

##### `edge`

The edge of the interface that controls interrupt events, could be one of `"none"`, `"rising"`, `"falling"` or `"both"`.
This argument takes effect only if `direction` is set to `"in"`.

An interrupt event will only be emitted if one of the conditions is matched:

- The electrical level rose from low to high and the edge is set to `"rising"` or `"both"`.
- The electrical level fell from high to low and the edge is set to `"falling"` or `"both"`.

##### `level`

The initial electrical level of the interface, could be either `"low"` or `"high"`.
This argument takes effect only if `direction` is set to `"out"`.

### Writing a Driver

```js
'use strict';

var driver = require('ruff-driver');
var gpio = require('gpio');

var Level = gpio.Level;
var Direction = gpio.Direction;
var Edge = gpio.Edge;

module.exports = driver({
    attach: function (inputs) {
        this._gpioIn = inputs['gpio-in'];
        this._gpioOut = inputs['gpio-out'];

        this._gpioIn.on('interrupt', function (value) {
            console.log('interrupt', value);
        });
    },
    exports: {
        turnOn: function (callback) {
            this._gpioOut.write(Level.high, callback);
        },
        turnOff: function (callback) {
            this._gpioOut.write(Level.low, callback);
        }
    }
});
```

## API References

### Methods

#### `read(callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Read from the interface, the value would be either `Level.low` (`0`) or `Level.high` (`1`).

#### `getDirection(callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Get direction of the interface, the value would be either `Direction.in` or `Direction.out`.

#### `getEdge(callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Get edge of the interface, the value would be one of `Edge.none`, `Edge.rising`, `Edge.falling` or `Edge.both`.

#### `write(value[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Write to the interface.

- **value:** Could be one of the values under `Level` (`0` or `1`).

#### `setDirection(direction, level[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Set direction of the interface.

- **direction:** Could be one of the values under `Direction` or its keys.
- **level:** Could be one of the values under `Level` (`0` or `1`) or its keys.

#### `setEdge(edge[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Set edge of the interface.

- **edge:** Could be one of the values under `Edge` or its keys.

#### `poll(timeoutUs, callback)`
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Monitor gpio level changing during period set by `timeoutUs`, and report the state changed times in callback

- **timeoutUs:** Timeout for monitor, unit by microsecond.
- **callback:** function(`error`, `gpio_level_changed_times`).

Event: 'interrupt'
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Emitted when the GPIO interface is triggered by a interrupt.
