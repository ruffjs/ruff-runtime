var events = require('../src/index.js');
var assert = require('assert');
var util = require('util');

var orignal_print;

exports.beforeEach = function() {
    orignal_print = print;
    print = function(string) {};
};

exports.afterEach = function() {
    print = orignal_print;
};

exports['test should add listeners'] = function() {
    var emitter = new events.EventEmitter();

    var events_new_listener_emited = [];
    var listeners_new_listener_emited = [];
    var times_hello_emited = 0;

    // sanity check
    assert.equal(emitter.addListener, emitter.on);

    emitter.on('newListener', function(event, listener) {
        if (event === 'newListener')
            return; // Don't track our adding of newListener listeners.
        events_new_listener_emited.push(event);
        listeners_new_listener_emited.push(listener);
    });

    function hello(a, b) {
        times_hello_emited += 1;
        assert.equal('a', a);
        assert.equal('b', b);
    }
    emitter.once('newListener', function(name, listener) {
        assert.equal(name, 'hello');
        assert.equal(listener, hello);
        assert.deepEqual(this.listeners('hello'), []);
    });
    emitter.on('hello', hello);

    var foo = function() {};
    emitter.once('foo', foo);

    emitter.emit('hello', 'a', 'b');

    // just make sure that this doesn't throw:
    var f = new events.EventEmitter();
    f.setMaxListeners(0);

    var listen1 = function listen1() {};
    var listen2 = function listen2() {};
    var emitter1 = new events.EventEmitter();
    emitter1.once('newListener', function() {
        assert.deepEqual(emitter1.listeners('hello'), []);
        emitter1.once('newListener', function() {
            assert.deepEqual(emitter1.listeners('hello'), []);
        });
        emitter1.on('hello', listen2);
    });
    emitter1.on('hello', listen1);
    // The order of listeners on an event is not always the order in which the
    // listeners were added.
    assert.deepEqual(emitter1.listeners('hello'), [listen2, listen1]);
}

exports['test should check listener leaks'] = function() {
    var emitter = new events.EventEmitter();

    // default
    for (var i = 0; i < 10; i++) {
        emitter.on('default', function() {});
    }
    assert.ok(!emitter._events['default'].hasOwnProperty('warned'));
    emitter.on('default', function() {});
    assert.ok(emitter._events['default'].warned);

    // specific
    emitter.setMaxListeners(5);
    for (var i = 0; i < 5; i++) {
        emitter.on('specific', function() {});
    }
    assert.ok(!emitter._events['specific'].hasOwnProperty('warned'));
    emitter.on('specific', function() {});
    assert.ok(emitter._events['specific'].warned);

    // only one
    emitter.setMaxListeners(1);
    emitter.on('only one', function() {});
    assert.ok(!emitter._events['only one'].hasOwnProperty('warned'));
    emitter.on('only one', function() {});
    assert.ok(emitter._events['only one'].hasOwnProperty('warned'));

    // unlimited
    emitter.setMaxListeners(0);
    for (var i = 0; i < 1000; i++) {
        emitter.on('unlimited', function() {});
    }
    assert.ok(!emitter._events['unlimited'].hasOwnProperty('warned'));

    // process-wide
    events.EventEmitter.defaultMaxListeners = 42;
    emitter = new events.EventEmitter();

    for (var i = 0; i < 42; ++i) {
        emitter.on('fortytwo', function() {});
    }
    assert.ok(!emitter._events['fortytwo'].hasOwnProperty('warned'));
    emitter.on('fortytwo', function() {});
    assert.ok(emitter._events['fortytwo'].hasOwnProperty('warned'));
    delete emitter._events['fortytwo'].warned;

    events.EventEmitter.defaultMaxListeners = 44;
    emitter.on('fortytwo', function() {});
    assert.ok(!emitter._events['fortytwo'].hasOwnProperty('warned'));
    emitter.on('fortytwo', function() {});
    assert.ok(emitter._events['fortytwo'].hasOwnProperty('warned'));

    // but _maxListeners still has precedence over defaultMaxListeners
    events.EventEmitter.defaultMaxListeners = 42;
    emitter = new events.EventEmitter();
    emitter.setMaxListeners(1);
    emitter.on('uno', function() {});
    assert.ok(!emitter._events['uno'].hasOwnProperty('warned'));
    emitter.on('uno', function() {});
    assert.ok(emitter._events['uno'].hasOwnProperty('warned'));

    assert.strictEqual(emitter, emitter.setMaxListeners(1));
}

exports['test should emit error'] = function() {
    var emitter = new events.EventEmitter();
    assert.throws(function() {
        emitter.emit('error', 'Accepts a string');
    }, /Accepts a string/);
}

exports['test should get max listeners'] = function() {
    var emitter = new events.EventEmitter();

    assert.strictEqual(emitter.getMaxListeners(), events.EventEmitter.defaultMaxListeners);

    emitter.setMaxListeners(0);
    assert.strictEqual(emitter.getMaxListeners(), 0);

    emitter.setMaxListeners(3);
    assert.strictEqual(emitter.getMaxListeners(), 3);

    // https://github.com/nodejs/node/issues/523 - second call should not throw.
    var recv = {};
    events.EventEmitter.prototype.on.call(recv, 'event', function() {});
    events.EventEmitter.prototype.on.call(recv, 'event', function() {});
}

exports['test should get emitter listener count'] = function() {
    var emitter = new events.EventEmitter();
    emitter.on('foo', function() {});
    emitter.on('foo', function() {});
    emitter.on('baz', function() {});
    // Allow any type
    emitter.on(123, function() {});

    assert.strictEqual(events.EventEmitter.listenerCount(emitter, 'foo'), 2);
    assert.strictEqual(emitter.listenerCount('foo'), 2);
    assert.strictEqual(emitter.listenerCount('bar'), 0);
    assert.strictEqual(emitter.listenerCount('baz'), 1);
    assert.strictEqual(emitter.listenerCount(123), 1);
}

exports['test should remove listener'] = function() {
    var testListener = function() {};
    var emitter = new events.EventEmitter();
    assert.strictEqual(emitter.listenerCount('baz'), 0);
    emitter.on('baz', testListener);
    assert.strictEqual(emitter.listenerCount('baz'), 1);
    emitter.removeListener('baz', testListener);
    assert.strictEqual(emitter.listenerCount('baz'), 0);
}

exports['test should have side effects'] = function() {

    var emitter = new events.EventEmitter();
    var fl; // foo listeners

    fl = emitter.listeners('foo');
    assert(Array.isArray(fl));
    assert(fl.length === 0);
    assert.deepEqual(emitter._events, {});

    emitter.on('foo', assert.fail);
    fl = emitter.listeners('foo');
    assert(emitter._events.foo === assert.fail);
    assert(Array.isArray(fl));
    assert(fl.length === 1);
    assert(fl[0] === assert.fail);

    emitter.listeners('bar');
    assert(!emitter._events.hasOwnProperty('bar'));

    emitter.on('foo', assert.ok);
    fl = emitter.listeners('foo');

    assert(Array.isArray(emitter._events.foo));
    assert(emitter._events.foo.length === 2);
    assert(emitter._events.foo[0] === assert.fail);
    assert(emitter._events.foo[1] === assert.ok);

    assert(Array.isArray(fl));
    assert(fl.length === 2);
    assert(fl[0] === assert.fail);
    assert(fl[1] === assert.ok);
}

exports['test should get a copy when call listeners'] = function() {
    function listener() {};

    function listener2() {};

    var emitter1 = new events.EventEmitter();
    emitter1.on('foo', listener);
    var fooListeners = emitter1.listeners('foo');
    assert.deepEqual(emitter1.listeners('foo'), [listener]);
    emitter1.removeAllListeners('foo');
    assert.deepEqual(emitter1.listeners('foo'), []);
    assert.deepEqual(fooListeners, [listener]);

    var emitter2 = new events.EventEmitter();
    emitter2.on('foo', listener);
    var e2ListenersCopy = emitter2.listeners('foo');
    assert.deepEqual(e2ListenersCopy, [listener]);
    assert.deepEqual(emitter2.listeners('foo'), [listener]);
    e2ListenersCopy.push(listener2);
    assert.deepEqual(emitter2.listeners('foo'), [listener]);
    assert.deepEqual(e2ListenersCopy, [listener, listener2]);

    var emitter3 = new events.EventEmitter();
    emitter3.on('foo', listener);
    var e3ListenersCopy = emitter3.listeners('foo');
    emitter3.on('foo', listener2);
    assert.deepEqual(emitter3.listeners('foo'), [listener, listener2]);
    assert.deepEqual(e3ListenersCopy, [listener]);
}

exports['test should not throw error when set maxListener number'] = function() {
    var emitter = new events.EventEmitter();
    emitter.setMaxListeners(42);
}

exports['test should throw error when set maxListener not a number'] = function() {
    var emitter = new events.EventEmitter();
    assert.throws(function() {
        emitter.setMaxListeners(NaN);
    });

    assert.throws(function() {
        emitter.setMaxListeners(-1);
    });

    assert.throws(function() {
        emitter.setMaxListeners('and even this');
    });
}

function isRuffLite() {
    if (global.ruff && ruff.versions && ruff.versions.jerryscript) {
        return true;
    } else {
        return false;
    }
}

if (!isRuffLite()) {
    exports['test should get method name'] = function() {
        var emitter = events.EventEmitter.prototype;
        assert.equal(emitter.constructor.name, 'EventEmitter');
        assert.equal(emitter.on, emitter.addListener); // Same method.
        Object.getOwnPropertyNames(emitter).forEach(function(name) {
            if (name === 'constructor' || name === 'on') {
                return;
            }
            if (typeof emitter[name] !== 'function') {
                return;
            }
            assert.equal(emitter[name].name, name);
        });
    }
}
exports['test should emit listener'] = function() {
    var callbacks_called = [];

    var emitter = new events.EventEmitter();

    function callback1() {
        callbacks_called.push('callback1');
        emitter.on('foo', callback2);
        emitter.on('foo', callback3);
        emitter.removeListener('foo', callback1);
    }

    function callback2() {
        callbacks_called.push('callback2');
        emitter.removeListener('foo', callback2);
    }

    function callback3() {
        callbacks_called.push('callback3');
        emitter.removeListener('foo', callback3);
    }

    emitter.on('foo', callback1);
    assert.equal(1, emitter.listeners('foo').length);

    emitter.emit('foo');
    assert.equal(2, emitter.listeners('foo').length);
    assert.deepEqual(['callback1'], callbacks_called);

    emitter.emit('foo');
    assert.equal(0, emitter.listeners('foo').length);
    assert.deepEqual(['callback1', 'callback2', 'callback3'], callbacks_called);

    emitter.emit('foo');
    assert.equal(0, emitter.listeners('foo').length);
    assert.deepEqual(['callback1', 'callback2', 'callback3'], callbacks_called);

    emitter.on('foo', callback1);
    emitter.on('foo', callback2);
    assert.equal(2, emitter.listeners('foo').length);
    emitter.removeAllListeners('foo');
    assert.equal(0, emitter.listeners('foo').length);

    callbacks_called = [];

    emitter.on('foo', callback2);
    emitter.on('foo', callback3);
    assert.equal(2, emitter.listeners('foo').length);
    emitter.emit('foo');
    assert.deepEqual(['callback2', 'callback3'], callbacks_called);
    assert.equal(0, emitter.listeners('foo').length);
}

exports['test should get right number args'] = function() {
    var emitter = new events.EventEmitter();
    var num_args_emited = [];

    emitter.on('numArgs', function() {
        var numArgs = arguments.length;
        num_args_emited.push(numArgs);
    });

    emitter.emit('numArgs');
    emitter.emit('numArgs', null);
    emitter.emit('numArgs', null, null);
    emitter.emit('numArgs', null, null, null);
    emitter.emit('numArgs', null, null, null, null);
    emitter.emit('numArgs', null, null, null, null, null);

    assert.deepEqual([0, 1, 2, 3, 4, 5], num_args_emited);
}

exports['test should emit only one when regist once'] = function() {
    var emitter = new events.EventEmitter();
    var times_hello_emited = 0;

    emitter.once('hello', function(a, b) {
        times_hello_emited++;
    });

    emitter.emit('hello', 'a', 'b');
    emitter.emit('hello', 'a', 'b');
    emitter.emit('hello', 'a', 'b');
    emitter.emit('hello', 'a', 'b');

    assert.equal(1, times_hello_emited);

    var remove = function() {
        assert.fail(1, 0, 'once->foo should not be emitted', '!');
    };

    emitter.once('foo', remove);
    emitter.removeListener('foo', remove);
    emitter.emit('foo');


    var times_recurse_emitted = 0;

    emitter.once('emitter', function() {
        emitter.emit('emitter');
        times_recurse_emitted++;
    });

    emitter.once('emitter', function() {
        times_recurse_emitted++;
    });

    emitter.emit('emitter');
    assert.equal(2, times_recurse_emitted);
};

exports['test should be inherited'] = function() {
    util.inherits(MyEE, events.EventEmitter);

    function MyEE(cb) {
        this.once(1, cb);
        this.emit(1);
        this.removeAllListeners();
        events.EventEmitter.call(this);
    }

    var called = false;
    var myee = new MyEE(function() {
        called = true;
    });

    assert(called);
    assert.deepEqual(myee._events, {});

    util.inherits(ErrorEE, events.EventEmitter);

    function ErrorEE() {
        this.emit('error', new Error('blerg'));
    }

    assert.throws(function() {
        new ErrorEE();
    }, /blerg/);

    function MyEE2() {
        events.EventEmitter.call(this);
    }

    MyEE2.prototype = new events.EventEmitter();

    var ee1 = new MyEE2();
    var ee2 = new MyEE2();

    ee1.on('x', function() {});

    assert.equal(ee2.listenerCount('x'), 0);
};


exports['test should remove listener when inherited'] = function() {
    function MyEE() {
        events.EventEmitter.call(this);
    }
    util.inherits(MyEE, events.EventEmitter);
    var testListener = function() {};
    var secondListener = function() {};
    var emitter = new MyEE();
    assert.strictEqual(emitter.listenerCount('baz'), 0);
    emitter.on('baz', testListener);
    assert.strictEqual(emitter.listenerCount('baz'), 1);
    emitter.removeListener('baz', testListener);
    assert.strictEqual(emitter.listenerCount('baz'), 0);

    assert.strictEqual(emitter.listenerCount(undefined), 0);
    emitter.on(undefined, secondListener);
    assert.strictEqual(emitter.listenerCount(undefined), 1);
    emitter.removeListener(undefined, secondListener);
    assert.strictEqual(emitter.listenerCount(undefined), 0);

}

require('test').run(exports);
