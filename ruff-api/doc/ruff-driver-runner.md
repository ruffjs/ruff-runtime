# Ruff Driver Runner

The `ruff-app-runner` module provides you a facility for Ruff driver developers to run driver on their development machine. You may include this module with `require('ruff-driver-runner')`;

```javascript
var assert = require('assert');

var runner = require('ruff-driver-runner');
var when = require('ruff-mock').when;

export['test should work well'] = function(done) {
    runner.run('../', function(error, context) {
        var inputs = context.inputs;
        var device = context.device;

        var gpio = inputs['gpio'];

        when(gpio)
            .read(Function)
            .then(function (callback) {
                callback(undefined, 1);
            });

        gpio.read(function (error, value) {
            assert.ifError(error);
            assert.equal(value, 1);
        });
    }
}

require('test').run(exports);
```

Ruff driver runner creates a virtual runtime built with `ruff-mock`, which allows developers to:

* Retrive mock interface

The second parameter of `run` function of driver runner is `context`. Where the interface could be retrived from

```javascript
var gpio = context.inputs['gpio'];
```

The name of the reference for `context.inputs` should be same with the name described in `driver.json`.

Please checkout [Ruff Mock](./ruff-mock.html) for more information.

## runner.run(driverPath, runCallback)

* `driverPath` refer to your driver path which contains `driver.json`.
* `runCallback` will run once the virtual runtime has been created and your `attach` function has been invoked.
