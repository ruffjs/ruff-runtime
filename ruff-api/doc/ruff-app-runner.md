# Ruff Application Runner

The `ruff-app-runner` module provides you a facility for Ruff application developers to run application on their development machines. You may include this module with `require('ruff-app-runner')`;

```javascript
var runner = require('ruff-app-runner');
var verify = require('ruff-mock').verify;

exports['test should call turn on while application is ready'] = function() {
    runner.run(appPath, function() {
        verify($('led-0')).turnOn();
    });
};

require('test').run(exports);
```

Ruff app runner creates a virtual runtime built with `ruff-mock`, which allows applicaiton developers to:

* Mock device data

Mock device can set its function's return value, e.g:

```javascript
when($('temperature')).getTemperature().thenReturn(24);
```

* Verify device behavior

Upon code execution, invocation behavior can be verified by `verify`.

```javascript
verify($('led')).turnOn();
```

* Trigger device event

Every mock device supports EventEmitter. Their events can be triggered by `emit`.

```javascript
$('ir').emit('away');
```

For more mock details, you can refer to `ruff-mock` module document.

## runner.run(appPath, runCallback).end(endCallback)

* `appPath` refer to your applicaiton path that contains `app.json`.
* `runCallback` will run once the virtual runtime has been created and your `ready` function has been invoked.
* `endCallback` will run once your `end` function has been invoked.

You can ignore the `end` part if you don't need it.
