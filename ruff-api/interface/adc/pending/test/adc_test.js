var adc = require('../src/index.js');
var driver = adc.driver;
var assert = require('assert');

function Options(args) {
    this._args = args;
}

Options.prototype.getRequired = function(key) {
    var value = this._args[key];
    if (value === undefined) {
        throw new Error(key + ' undefined');
    }
    return value;
};

function IllegalOne(args) {
    return new(driver({
        attach: function(options) {

        },
        exports: {
            getResolution: function() {
                return args.resolution;
            }
        }

    }))(new Options(args));
}

function IllegalTwo(args) {
    return new(driver({
        attach: function(options) {

        },
        exports: {
            getRawValue: function() {
                return 100;
            }
        }

    }))(new Options(args));
}

function IllegalThree(args) {
    return new(driver({
        attach: function(options) {

        },
        exports: {
            getRawValue: function() {
                return 100;
            },
            getResolution: function() {
                return args.resolution;
            },
            getVoltage: function() {
                return 10;
            }
        }

    }))(new Options(args));
}

function IllegalFour(args) {
    return new(driver({
        attach: function(options) {

        },
        exports: {
            getRawValue: function() {
                return 100;
            },
            getResolution: function() {
                return args.resolution;
            },
            getCurrent: function() {
                return 10;
            }
        }

    }))(new Options(args));
}

function buildAdc(args) {
    return new(driver({
        attach: function(options) {

        },
        exports: {
            getRawValue: function() {
                return 100;
            },
            getResolution: function() {
                return args.resolution;
            }
        }

    }))(new Options(args));
}

exports = {
    'test should have getRaw': function() {
        var adc = buildAdc({
            type: "voltage",
            min: 0,
            max: 5,
            resolution: 12
        });
        assert.equal(adc.getRawValue(), 100);
    },
    'test should have getVoltage': function() {
        var adc = buildAdc({
            type: "voltage",
            min: 0,
            max: 5,
            resolution: 10
        });
        assert.equal(adc.getVoltage(), 500 / 1024);
    },
    'test should have getCurrent': function() {
        var adc = buildAdc({
            type: "current",
            min: 0,
            max: 5,
            resolution: 10,
            resistance: 10
        });
        assert.equal(adc.getCurrent(), 50 / 1024);
    },
    'test should throw error when type is not voltage then get voltage': function() {
        var adc = buildAdc({
            type: "current",
            min: 0,
            max: 5,
            resolution: 10,
            resistance: 10
        });
        assert.throws(function() {
            adc.getVoltage();
        });
    },
    'test should throw error when type is not current then get current': function() {
        var adc = buildAdc({
            type: "voltage",
            min: 0,
            max: 5,
            resolution: 10
        });
        assert.throws(function() {
            adc.getCurrent();
        });
    },
    'test should throw error when adc illegal': function() {
        assert.throws(function() {
            IllegalOne({
                type: "voltage",
                min: 0,
                max: 5,
                resolution: 10
            });
        });
        assert.throws(function() {
            IllegalTwo({
                type: "voltage",
                min: 0,
                max: 5,
                resolution: 10
            });
        });
        assert.throws(function() {
            IllegalThree({
                type: "voltage",
                min: 0,
                max: 5,
                resolution: 10
            });
        });
        assert.throws(function() {
            IllegalFour({
                type: "voltage",
                min: 0,
                max: 5,
                resolution: 10
            });
        });
    }
};

require('test').run(exports);