'use strict';

var driver = require('../src/index.js');
var assert = require('assert');
var trait = require('trait');

exports['test should create driver'] = function (done) {
    var DeviceConstructor = driver({
        attach: function () {
            done();
        }
    });

    new DeviceConstructor();
};

//exports['test should throw error if attach is not a function'] = function () {
//    assert.throws(function () {
//        driver({ attach: 1 });
//    }, TypeError);
//};

exports['test should create driver without detach'] = function () {
    var DeviceConstructor = driver({
        attach: function () { }
    });

    var device = new DeviceConstructor();
    device.detach();
};

exports['test should create driver with detach'] = function (done) {
    var DeviceConstructor = driver({
        attach: function () { },
        detach: function () {
            done();
        }
    });

    var device = new DeviceConstructor();
    device.detach();
};

//exports['test should throw error if detach is not a function'] = function () {
//    assert.throws(function () {
//        driver({
//            attach: function () { },
//            detach: 1
//        });
//    }, TypeError);
//};
//
exports['test should create driver with exports'] = function (done) {
    var DeviceConstructor = driver({
        attach: function () { },
        exports: {
            readValue: function () {
                done();
            }
        }
    });

    var device = new DeviceConstructor();
    device.readValue();
};

exports['test should pass arguments to driver'] = function () {
    var DeviceConstructor = driver({
        attach: function (options, arg) {
            this.arg = arg;
        }
    });

    var device = new DeviceConstructor({}, 1);
    assert.equal(device.arg, 1);
};

exports['test should create driver with getInterface'] = function (done) {
    var DeviceConstructor = driver({
        attach: function () { },
        getInterface: function () {
            done();
        }
    });

    var device = new DeviceConstructor();
    device.getInterface();
};

exports['test should create driver without getInterface'] = function () {
    var DeviceConstructor = driver({
        attach: function () { }
    });

    new DeviceConstructor();
};

//exports['test should throw error if getInterface is not a function'] = function () {
//    assert.throws(function () {
//        driver({
//            attach: function () { },
//            getInterface: 1
//        });
//    }, TypeError);
//};

//exports['test should throw exception if attach is missing'] = function () {
//    assert.throws(function () {
//        driver({});
//    }, Error);
//};

exports['test should work with trait'] = function () {
    var LED = trait({
        turnOn: function () {
            this.write(1);
        },
        turnOff: function () {
            this.write(0);
        },
        write: trait.required
    });

    var DeviceConstructor = driver({
        attach: function () { },
        exports: {
            write: function (value) {
                this._value_ = value;
            }
        },
        traits: [LED]
    });

    var device = new DeviceConstructor();
    device.turnOn();
    assert.equal(1, device._value_);
    device.turnOff();
    assert.equal(0, device._value_);
};

exports['test should extend trait for driver instance'] = function () {
    var FooTrait = trait({
        foo: function () {
            return 1;
        }
    });

    var DriverClass = driver({
        attach: function () { }
    });

    var device = new DriverClass();
    device.extend(FooTrait);
    assert.equal(1, device.foo());
};

exports['test should extend driver instance directly'] = function () {
    var DriverClass = driver({
        attach: function () { }
    });

    var device = new DriverClass();
    device.extend({
        foo: function () {
            return 1;
        }
    });
    assert.equal(1, device.foo());
};

require('test').run(exports);
