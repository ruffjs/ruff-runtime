# QEI

A quadrature encoder, also known as a 2-channel incremental encoder, converts linear displacement into a pulse signal. By monitoring both the number of pulses and the relative phase of the two signals, you can track the position, direction of rotation, and speed.

QEI (Quadrature Encdoer Interface) module interprets the code produced by a quadrature encoder wheel to acquire **position**, **direction** and **velocity** of the encoder wheel.

## Using a QEI in Driver

### Configuring `driver.json`

To use a QEI in a device driver, you need to have an input with type `"qei"` in the `driver.json`:

```json
{
    "models": [],
    "args": {
        "ppr": 390
    },
    "inputs": {
        "qei": {
            "type": "qei"
        }
    }
}
```

In the JSON configuration above,

- The `"ppr": 390` argument tells your **device driver** (not interface driver) that when the wheel rotates one round, the encoder A/B channel outputs 390 pulses. This argument is optional.

- The first `"qei"` is just the name of the QEI (you can change it to something else if you want to),
which will be used as the key to get the interface instance in the device driver.

- The `"type": "qei"` informs Ruff framework to distribute an QEI instead of others.

#### Arguments

##### `ppr` (optional)

If your encoder outputs only two channels (phase-A and phase-B signals), you can set the ppr argument (pulses per round) to replace the third channel (index signal), which is used to reset the position counter.

If your encdoer outputs three channels (phase-A, phase-B and index signals), you can ignore this argument.

### Writing a Driver

```js
'use strict';

var driver = require('ruff-driver');

module.exports = driver({

    attach: function (inputs, context) {
        this._qei = inputs['qei'];
        this._ppr = context.args.ppr;
        this._qei.setPPR(context.args.ppr);
    },

    exports: {
        getRpm: function (callback) {
            var that = this;
            this._qei.getVelocity(function (error, velocity) {
                that._qei.getDirection(function (error, direction) {
                    var rpm = direction * velocity * 60 / that._ppr;
                    callback(undefined, rpm);
                });
            });
        }
    }
});
~
```

## API References

### Methods

#### `reset([callback[)`
<span class="api-platform">Ruff Lite available: v0.6.0</span>

Reset the position.

#### `getPosition(callback)`
<span class="api-platform">Ruff Lite available: v0.6.0</span>

`callback` - function(error, position)

The output position ranges from `0` to `4 * ppr`. Since one pulse of A or B has two edges (rising edge and falling edge). So the total position for one encoder pulse is 4. The maximum position is `4 * ppr`.

#### `getDirection(callback)`
<span class="api-platform">Ruff Lite available: v0.6.0</span>

`callback` - function(error, direction)

The output direction is 1 or -1, which represents forward rotation or backward rotation.

#### `getVelocity(callback)`
<span class="api-platform">Ruff Lite available: v0.6.0</span>

`callback` - function(error, velocity)

The output velocity unit is PPS (Pulses Per Second). For example, you can calculate RPM (Round Per Minute) the following formula.

`rpm = ± pps * 60 / ppr`

#### `setPPR(ppr[, callback])`
<span class="api-platform">Ruff Lite available: v0.6.0</span>

`callback` - function()

Set the PPR (Pulses Per Round) of the QEI in case of no index channel of your encoder.
