# UART

A universal asynchronous receiver/transmitter, abbreviated UART /ˈjuːɑːrt/, is a computer hardware device that translates data between characters (usually bytes) in a computer and an asynchronous serial communication format that encapsulates those characters between start bits and stop bits.

## Using a UART Interface in Driver

### Configuring `driver.json`

To use a UART interface in a driver, you need to have an input with type `"uart"` in the `driver.json`:

```json
{
    "models": [],
    "inputs": {
        "uart": {
            "type": "uart",
            "args": {
                "baudRate": 57600,
                "stopBits": 1,
                "dataBits": 8,
                "parity": "none",
                "flowControl": "none"
            }
        }
    }
}
```

In the JSON configuration above, the first `"uart"` is just the name of the UART interface (you can change it to something else if you want to),
which will be used as the key to get the interface instance in the driver.
And the `"type": "uart"` informs Ruff framework to distribute an UART interface instead of others.

#### Arguments

##### `boudRate`

Baud rate, defaults to `57600`.

##### `stopBits`

Stop bits, defaults to `1`.

##### `dataBits`

Data bits, defaults to `8`.

##### `parity`

Parity, defaults to `"none"`, could be either of `"none"`, `"odd"` or `"even"`.

##### `flowControl`

Flow control, defaults to `"none"`, could be either of `"none"`, `"hardware"` or `"software"`.

## Writing a Driver

```js
'use strict';

var driver = require('ruff-driver');

module.exports = driver({
    attach: function (inputs) {
        this._uart = inputs['uart'];
    },
    exports: {
        writeTwice: function (data, callback) {
            this._uart.write(data);
            this._uart.write(data, callback);
        },
        readText: function (callback) {
            this._uart.read(function (error, data) {
                if (error) {
                    callback(error);
                    return;
                }

                callback(undefined, data.toString());
            });
        }
    }
});
```

## API References

### Methods

#### `on(event, callback)`
<span class="api-platform">Ruff available: v1.9.0</span>
<span class="api-platform">Ruff Lite available: v0.8.0</span>

Developers could register event `data` to receive data from the uart, and register `error` in case of error.
The prototype of `callback` maybe `function(data)` for `data` event, while `function(error)` for `error` event, and the parameter data is an instance of `Buffer` while error is an instance of `Error`.

``` js
uart.on('data', function(data) {
    console.log('Received:', data.toString());
});

uart.on('error', function(error) {
    console.log(error);
});
```

#### `read(callback)`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Read incoming data (as `Buffer`) from the interface.

**This method would be deprecated in the future, please use `on(event, callback)` instead.**

#### `write(data[, callback])`
<span class="api-platform">Ruff available: v1.6.0</span>
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Write data to the interface.

- **data:** data to write, could be either a `Buffer` or a `string`.
