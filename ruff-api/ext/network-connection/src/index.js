'use strict';

var assert = require('assert');

function checkType(obj, type) {
    assert.ifError(typeof obj !== type && new TypeError('Option `' + obj + '` is expected to be a ' + type));
    return obj;
}

function networkConnection(options) {
    function Constructor(name, config) {
        this.config.set = this.config.set.bind(this);
        this.config.get = this.config.get.bind(this);
        this.config.clear = this.config.clear.bind(this);

        this._name = name;
        if (config) {
            this.config.clear(this._name);
            this.config.set(config);
        }

        Object.defineProperties(Constructor.prototype, {
            name: {
                get: function () {
                    return this._name;
                },
                enumerable: true
            }
        });
    }

    var prototype = Constructor.prototype;

    prototype.config = {
        set: function () {
            return checkType(options.config.set, 'function')
                    .bind(this, this._name)
                    .apply(this, arguments);
        },
        get: function () {
            return checkType(options.config.get, 'function')
                    .bind(this, this._name)
                    .apply(this, arguments);
        },
        clear: function () {
            return checkType(options.config.clear, 'function')
                    .bind(this, this._name)
                    .apply(this, arguments);
        }
    };

    prototype.service = {
        start: checkType(options.service.start, 'function'),
        stop: checkType(options.service.stop, 'function'),
        enable: checkType(options.service.enable, 'function'),
        disable: checkType(options.service.disable, 'function')
    };

    prototype.getStatus = checkType(options.getStatus, 'function');

    return Constructor;
}

module.exports = networkConnection;
