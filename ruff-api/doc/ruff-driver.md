# Ruff Driver

The `ruff-driver` module provides you a facility for Ruff driver developers to build their device driver.

## Usage

```js
var driver = require('ruff-driver');
```

## Configuring `driver.json`

`driver.json` is the configuration file that describes the information that related to the driver,
and what interfaces the device requires and exports.

```json
{
    "models": [...],
    "inputs": {
        "...": {
            "type": ...,
            "args": {
                ...
            }
        }
    }
}
```

Please refer to interface documentations for more detailed configurations:

- [GPIO](./gpio.html)
- [I²C](./i2c.html)
- [UART](./uart.html)
- [PWM](./pwm.html)
- [ADC](./adc.html)

## Defining Device

```js
'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs) {
        // ...
    }
});
```

### Options

#### `attach(inputs, context[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

A function with three or less parameters that intializes the device instance.

- **inputs:** A map of assigned interfaces according to `driver.json`.
- **context:** Context of this instance to attach.
  - **id:** ID of the device.
  - **model:** Model of the device.
  - **args:** A map of device arguments.
- **callback:** If the third parameter presents, the callback for asyncrhonous attaching.

#### `detach([callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Optional. A function that disposes the device instance.

- **callback:** If presents, the callback for asynchronous detaching.

#### `getInterface(name, options[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Optional. A function to get interface instance if any, this should be required if `driver.json` has `outputs` configured.

- **name:** The name of interface requested.
- **options:** Options (defined by `args` in `driver.json`) to initiate the interface.
- **callback:** If presents, the callback for asyncrhonous attaching.

#### `exports`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Optional. An object with properties or methods to be copied to the prototype of device.

#### `traits`

Optional. An array of [traits](./trait.html) to be applied.
