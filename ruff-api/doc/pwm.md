# PWM

Pulse-width modulation (PWM), or pulse-duration modulation (PDM), is a modulation technique used to encode a message into a pulsing signal.

## Using a PWM Interface in Driver

### Configuring `driver.json`

To use a PWM interface in a driver, you need to have an input with type `"pwm"` in the `driver.json`:

```json
{
    "models": [],
    "inputs": {
        "pwm": {
            "type": "pwm",
            "args": {
                "frequency": 200
            }
        }
    }
}
```

In the JSON configuration above, the first `"pwm"` is just the name of the PWM interface (you can change it to something else if you want to),
which will be used as the key to get the interface instance in the driver.
And the `"type": "pwm"` informs Ruff framework to distribute an PWM interface instead of others.

#### Arguments

##### `frequency`

The frequency of output square wave, defaults to `200`.

PWM interfaces may share the same frequency due to hardware limitations,
You might get errors if you are trying to get PWM interfaces with different frequencies.

### Writing a Driver

```js
'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs) {
        this._pwm = inputs['pwm'];
    },
    exports: {
        setHalfDuty: function (callback) {
            this._pwm.setDuty(0.5, callback);
        }
    }
});
```

## API References

### Methods

#### `setDuty(duty[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Set the duty ratio (`0`~`1`) of the interface.

#### `setFrequency(frequency[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Set the frequency of the interface, please refer to argument `frequency` for limitations.

#### `getDuty(callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

`callback` - function(error, duty)

Get the duty of the interface.

#### `getFrequency(callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

`callback` - function(error, frequency)

Get the frequency of the interface.