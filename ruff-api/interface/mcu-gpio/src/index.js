'use strict';

var EventEmitter = require('events');
var driver = require('ruff-driver');
var Gpio = require('gpio');
var util = require('util');

var Direction = Gpio.Direction;
var Level = Gpio.Level;
var Edge = Gpio.Edge;
var Pull = Gpio.Pull;

// NOTE: interruptObj is used by all gpioInterrupt
var interruptObj;

function GpioInterface(pin, features, defaults, callback) {
    EventEmitter.call(this);

    this.features = features;
    this.pinNum = ruff.gpio.getHandle(pin);
    this.gpio = ruff.gpio;

    this.activeLow = defaults.activeLow || false;
    this.direction = Direction[defaults.direction] || Direction.in;
    this.level = Level[defaults.level] || Level.low;
    this.pull = Pull[defaults.pull] || Pull.floating;
    this.edge = Edge[defaults.edge] || Edge.none;

    if (this._hasFeature('read') && this._hasFeature('write')) {
        this.gpio.setDirection(this.pinNum, this.direction);
        if (this.direction === Direction.out) {
            this._setOutputFunctions(callback);
        } else {
            this._setInputFunctions(callback);
        }
    } else if (this._hasFeature('read')) {
        this.gpio.setDirection(this.pinNum, Direction.in);
        this.direction = Direction.in;
        this._setInputFunctions(callback);
    } else if (this._hasFeature('write')) {
        this.gpio.setDirection(this.pinNum, Direction.out);
        this.direction = Direction.out;
        this._setOutputFunctions(callback);
    }
}

util.inherits(GpioInterface, EventEmitter);

GpioInterface.get = function (pin, features, defaults, callback) {
    new GpioInterface(pin, features, defaults, callback);
};

GpioInterface.prototype._FeatureError = function (apiName) {
    return new Error('Unsupported API `' + apiName + '` for this GPIO');
};

GpioInterface.prototype._ParameterError = function (parameter, apiName) {
    return new Error('Invalid parameter `' + parameter + '` calling `' + apiName + '`');
};

GpioInterface.prototype._setOutputFunctions = function (callback) {
    var that = this;
    this.setActiveLow(this.activeLow, function (error) {
        if (error) {
            callback(error);
            return;
        }

        that.write(that.level, function (error) {
            if (error) {
                callback(error);
            }
            callback(undefined, that);
        });
    });
};

GpioInterface.prototype._setInputFunctions = function (callback) {
    if (!this._hasFeature('interrupt') && !(this._hasFeature('pull'))) {
        callback(undefined, this);
        return;
    }

    var that = this;

    // NOTE: setEdge should be setup before setPull
    this.setEdge(this.edge, function (error) {
        // no matter if there is error, setPull should always be called

        if (!that._hasFeature('pull')) {
            callback(undefined, that);
            return;
        }

        that.setPull(that.pull, function (error) {
            if (error) {
                callback(error);
            }

            callback(undefined, that);
        });
    });
};

// open API

GpioInterface.prototype._hasFeature = function (feature) {
    var found = false;

    var that = this;
    Object.keys(this.features).forEach(function (featureType) {
        if (that.features[featureType].indexOf(feature) !== -1) {
            found = true;
        }
    });

    return found;
};

GpioInterface.prototype._listFeatures = function () {
    var features = new Array(0);

    var that = this;
    Object.keys(this.features).forEach(function (featureType) {
        that.features[featureType].forEach(function (feature) {
            features.push(feature);
        });
    });

    return features;
};

GpioInterface.prototype.getDirection = function (callback) {
    util.assertCallback(callback);

    util.invokeCallbackAsync(callback, undefined, this.direction);
};

// featured API (read)

GpioInterface.prototype.read = function (callback) {
    if (!this._hasFeature('read')) {
        util.invokeCallbackAsync(callback, this._FeatureError('read'));
        return;
    }

    util.assertCallback(callback);

    var value = this.gpio.read(this.pinNum);

    util.invokeCallbackAsync(callback, undefined, value);
};

// featured API (interrupt)

// TODO: if edge is 'rising'/'falling', it does NOT work well.

GpioInterface.prototype.setEdge = function (edge, callback) {
    if (!this._hasFeature('interrupt')) {
        util.invokeCallbackAsync(callback, this._FeatureError('setEdge'));
        return;
    }

    if (typeof edge === 'string') {
        if (Object.keys(Edge).indexOf(edge) !== -1) {
            edge = Edge[edge];
        } else {
            throw this._ParameterError(edge, 'setEdge');
        }
    }

    if (edge !== Edge.none && edge !== Edge.rising &&
        edge !== Edge.falling && edge !== Edge.both) {
        throw this._ParameterError(edge, 'setEdge');
    }

    this.edge = edge;

    this.gpio.setEdge(this.pinNum, edge);

    if (edge !== Edge.none) {
        this._enableInterrupt();
    }

    util.invokeCallbackAsync(callback);
};

GpioInterface.prototype.getEdge = function (callback) {
    if (!this._hasFeature('interrupt')) {
        util.invokeCallbackAsync(callback, this._FeatureError('getEdge'));
        return;
    }

    util.assertCallback(callback);

    util.invokeCallbackAsync(callback, undefined, this.edge);
};

GpioInterface.prototype._enableInterrupt = function () {
    if (!this._hasFeature('interrupt')) {
        throw this._FeatureError('_enableInterrupt');
    }

    if (!interruptObj) {
        var GpioInterrupt = require('./interrupt.js');
        interruptObj = new GpioInterrupt(this.gpio);
    }

    interruptObj.watch(this.pinNum, this, 'interrupt');
};

GpioInterface.prototype._disableInterrupt = function () {
    if (!this._hasFeature('interrupt')) {
        throw this._FeatureError('_disableInterrupt');
    }

    interruptObj.unwatch(this.pinNum);
};

// featured API (poll)

GpioInterface.prototype.poll = function (timeoutUs, callback) {
    if (!this._hasFeature('poll')) {
        util.invokeCallbackAsync(callback, this._FeatureError('poll'));
        return;
    }

    if (typeof timeoutUs !== 'number') {
        throw this._ParameterError(timeoutUs, 'poll');
    }

    util.assertCallback(callback);

    var value = this.gpio.poll(this.pinNum, timeoutUs);

    util.invokeCallbackAsync(callback, undefined, value);
};

// featured API (pull)

GpioInterface.prototype.setPull = function (pull, callback) {
    if (!this._hasFeature('pull')) {
        util.invokeCallbackAsync(callback, this._FeatureError('setPull'));
        return;
    }

    if (typeof pull === 'string') {
        if (Object.keys(Pull).indexOf(pull) !== -1) {
            pull = Pull[pull];
        } else {
            throw this._ParameterError(pull, 'setPull');
        }
    }

    if (pull !== Pull.floating && pull !== Pull.up && pull !== Pull.down) {
        throw this._ParameterError(pull, 'setPull');
    }

    this.pull = pull;

    this.gpio.setPull(this.pinNum, pull);

    util.invokeCallbackAsync(callback);
};

GpioInterface.prototype.getPull = function (callback) {
    if (!this._hasFeature('pull')) {
        util.invokeCallbackAsync(callback, this._FeatureError('getPull'));
        return;
    }

    util.assertCallback(callback);

    util.invokeCallbackAsync(callback, undefined, this.pull);
};

// featured API (write)

GpioInterface.prototype.write = function (level, callback) {
    if (!this._hasFeature('write')) {
        util.invokeCallbackAsync(callback, this._FeatureError('write'));
        return;
    }

    if (typeof level === 'string') {
        if (Object.keys(Level).indexOf(level) !== -1) {
            level = Level[level];
        } else {
            throw this._ParameterError(level, 'write');
        }
    }

    if (level !== Level.low && level !== Level.high) {
        throw this._ParameterError(level, 'write');
    }

    var trueLevel = (this.activeLow === true) ? 1 - level : level;
    this.gpio.write(this.pinNum, trueLevel ? true : false);

    util.invokeCallbackAsync(callback);
};

GpioInterface.prototype.setActiveLow = function (activeLow, callback) {
    if (!this._hasFeature('write')) {
        util.invokeCallbackAsync(callback, this._FeatureError('setActiveLow'));
        return;
    }

    if (activeLow !== true && activeLow !== false) {
        throw this._ParameterError(activeLow, 'setActiveLow');
    }

    this.activeLow = activeLow;

    util.invokeCallbackAsync(callback);
};

GpioInterface.prototype.getActiveLow = function (callback) {
    if (!this._hasFeature('write')) {
        util.invokeCallbackAsync(callback, this._FeatureError('getActiveLow'));
        return;
    }

    util.assertCallback(callback);

    util.invokeCallbackAsync(callback, undefined, this.activeLow);
};

// featuerd API (read/write)

GpioInterface.prototype.setDirection = function (direction, level, callback) {
    if (!(this._hasFeature('read') && this._hasFeature('write'))) {
        util.invokeCallbackAsync(callback, this._FeatureError('setDirection'));
        return;
    }

    var value;

    if (typeof direction === 'string') {
        if (Object.keys(Direction).indexOf(direction) !== -1) {
            direction = Direction[direction];
        } else {
            throw this._ParameterError(direction, 'setDirection');
        }
    }

    if (direction !== Direction.in && direction !== Direction.out) {
        throw this._ParameterError(direction, 'setDirection');
    }

    this.direction = direction;

    if (direction === Direction.out) {
        if (level === undefined) {
            level = 0;
        }

        if (typeof level === 'string') {
            if (Object.keys(Level).indexOf(level) !== -1) {
                level = Level[level];
            } else {
                throw this._ParameterError(level, 'setDirection');
            }
        }

        if (level !== Level.low && level !== Level.high) {
            throw this._ParameterError(level, 'setDirection');
        }

        this.level = level;

        value = level + Object.keys(Direction).length;
    } else {
        value = direction;
    }

    this.gpio.setDirection(this.pinNum, value);

    util.invokeCallbackAsync(callback);
};

module.exports = driver({
    attach: function (inputs, context) {
        this.pinName = inputs['pin'].pin;
        this.features = context.features['gpio'] || {
            "input": [
                "read",
                "interrupt",
                "pull"
            ],
            "output": [
                "write"
            ]
        };
    },

    detach: function () {
        if (this.interface) {
            if (this._hasFeature('interrupt')) {
                this._disableInterrupt();
            }
            this.interface = undefined;
        }
    },

    getInterface: function (name, defaults, callback) {
        if (name !== 'gpio') {
            throw new Error('Interface name is expected to be `gpio`');
        }

        util.assertCallback(callback);

        if (this.interface) {
            util.invokeCallbackAsync(callback, undefined, this.interface);
            return;
        }

        var that = this;
        GpioInterface.get(this.pinName, this.features, defaults, function (error, gpioInterface) {
            if (error) {
                callback(error);
                return;
            }

            that.interface = gpioInterface;
            callback(undefined, gpioInterface);
        });
    },

    exports: {}
});
