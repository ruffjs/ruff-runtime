# Test

This module is used to run as test framework. It can be accessed with
`require('test')`.

Automated tests are an important part of software development today. Providing a standard test library will help encourage more people to write more tests. Additionally, the API will likely be written in the form of tests.

You can simply declare tests with module's exports and test name should start with 'test' but not equal to 'test'.

```javascript
exports["test behaviour X"] = function() {
    behaviour.X()
};
```

or

```javascript
exports.testPatience = function () {
    require('os').sleep(1000);
};
```

Sub-objects with names that start with but are not equal to "test" will be run as sub-tests.

```javascript
exports.testSubTest = require("./sub-test");
```

And then you can run the tests with `run` method.

```javascript
require("test").run(exports);
```

## test.run(moduleExports)
<span class="api-platform">Ruff available: v1.6.0</span>

Run all tests in module's exports.
