# I²C

I²C (Inter-Integrated Circuit), pronounced I-squared-C, is a multi-master, multi-slave, single-ended, serial computer bus invented by Philips Semiconductor (now NXP Semiconductors).

## Using a I²C Interface in Driver

### Configuring `driver.json`

To use a I²C interface in a driver, you need to have an input with type `"i2c"` in the `driver.json`:

```json
{
    "models": [],
    "inputs": {
        "i2c": {
            "type": "i2c",
            "args": {
                "address": -1
            }
        }
    }
}
```

In the JSON configuration above, the first `"i2c"` is just the name of the I²C interface (you can change it to something else if you want to),
which will be used as the key to get the interface instance in the driver.
And the `"type": "i2c"` informs Ruff framework to distribute an I²C interface instead of others.

#### Arguments

##### `address`

Required, address of this I²C interface. You can usually find this value from the hardware datasheet.

## Writing a Driver

```js
'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs) {
        this._i2c = inputs['i2c'];
    },
    exports: {
        getUselessData: function (callback) {
            this._i2c.readByte(0x01, function (error, value) {
                if (error) {
                    callback(error);
                    return;
                }

                callback(undefined, 0xff - value);
            });
        }
    }
});
```

## API References

### Methods

#### `readByte(command, callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Read a byte from the interface.

- **command:** A byte to write before reading from the interface, could be `-1` if none.

#### `readWord(command, callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Read a 16-bit integer from the interface.

- **command:** A byte to write before reading from the interface, could be `-1` if none.

#### `readBytes(command, length, callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Read a bytes array (array of number) with length given.

- **command:** A byte to write before reading from the interface, could be `-1` if none.
- **length:** The length of bytes array to read.

#### `writeByte(command, value[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Write a byte to the interface.

- **command:** A byte to write before writing to the interface, could be `-1` if none.
- **value:** Byte to write.

#### `writeWord(command, value[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Write a 16-bit integer to the interface.

- **command:** A byte to write before writing to the interface, could be `-1` if none.
- **value:** The 16-bit integer to write.

#### `writeBytes(command, values[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Write an array of bytes to the interface.

- **command:** A byte to write before writing to the interface, could be `-1` if none.
- **values:** The array of bytes to write.
