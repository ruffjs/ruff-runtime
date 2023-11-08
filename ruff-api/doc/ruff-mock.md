# Ruff Mock

Ruff Mock is the built-in mocking library for Ruff, it provides simple yet
useful features including mocking and spying for object methods.

## GitHub

https://github.com/ruffjs/ruff-mock

## Usage

```javascript
var mock = require('ruff-mock');
var when = mock.when;

var foo = mock();

when(foo).bar('hello').return('world');

foo.bar('hello'); // 'world'
```

## Mocking

### Basic Usage

```javascript
var mock = require('ruff-mock');

var when = mock.when;
var whenever = mock.whenever;

var mocked = mock();

when(mocked).get('foo').return('bar');
when(mocked).get('foo').return('biu');

mocked.get('foo'); // 'bar'
mocked.get('foo'); // 'biu'

whenever(mocked).get('ha').return('yo');

mocked.get('ha'); // 'yo'
mocked.get('ha'); // 'yo'
```

### Arguments Matching

```javascript
var assert = require('assert');
var mock = require('ruff-mock');

var any = mock.any;
var when = mock.when;

var mocked = mock();

when(mocked)
    .handleCallback(String, Function)
    .then(function (name, callback) {
        assert.equal(name, 'foo');
        callback(undefined, 'bar');
    });

mocked.handleCallback('foo', function (error, result) {
    assert.ifError(error);
    assert.equal(result, 'bar');
});

when(mocked).increase(any).then(function (value) {
    return value + 1;
});

mocked.increase(123); // 124
```

### Expectation of `return`, `throw` and `then`

```javascript
var mock = require('ruff-mock');

var when = mock.when;

var mocked = mock();

when(mocked).foo().return('yo');
when(mocked).bar().throw(new Error());
when(mocked).pia().then(function () {
    return 'ha';
});

mocked.foo(); // 'yo'
mocked.bar(); // throw error
mocked.pia(); // 'ha'
```

## Spying

```javascript
var mock = require('ruff-mock');

var expect = mock.expect;
var spy = mock.spy;
var twice = mock.twice;
var verify = mock.verify;

var spied = spy({
    foo: function (a, b) {
        return a + b;
    },
    bar: function () { }
});

spied.foo(123, 543); // 666
spied.bar();
spied.bar();

verify(spied).foo(123, 543);
verify(spied, twice()).bar();
```

Ruff mock provides some default verification options:

- `once`: make sure the target function has been invoked only once.
- `twice`: make sure the target function has been invoked only twice.
- `times`: you can specify how many times the target function has been invoked.
- `atLeast`: how many times the target function has been invoked at least.
- `atMost`: how many times the target function has been invoked at most.
- `never`: making sure interaction(s) never happened.
