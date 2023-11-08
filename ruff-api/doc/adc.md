# ADC

An analog-to-digital converter (ADC, A/D, A–D, or A-to-D) is a device that converts a continuous physical quantity (usually voltage) to a digital number that represents the quantity's amplitude.

## Using an ADC Interface in Driver

### Configuring `driver.json`

To use an ADC interface in a driver, you need to have an input with type `"adc"` in the `driver.json`:

```json
{
    "models": [],
    "inputs": {
        "adc": {
            "type": "adc"
        }
    }
}
```

In the JSON configuration above, the first `"adc"` is just the name of the ADC interface (you can change it to something else if you want to),
which will be used as the key to get the interface instance in the driver.
And the `"type": "adc"` informs Ruff framework to distribute an ADC interface instead of others.

### Writing a Driver

```js
'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs) {
        this._adc = inputs['adc'];
    },
    exports: {
        // Example: a method that appends unit 'v' to got voltage number.
        getInputVoltage: function (callback) {
            this._adc.getVoltage(function (error, voltage) {
                if (error) {
                    callback(error);
                    return;
                }

                callback(undefined, voltage + 'v');
            });
        }
    }
});
```

## API References

### Methods

#### `getVoltage(callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Get the voltage of the interface.
