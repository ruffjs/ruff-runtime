'use strict';

var EventEmitter = require('events');
var util = require('util');

function nop() { }

function SystemObject() {
    EventEmitter.call(this);
}

util.inherits(SystemObject, EventEmitter);

function MakeSystemObjectConstructor(id) {
    return function (options) {
        var attach = options.attach;
        var detach = options.detach || nop;

        function Constructor() {
            SystemObject.call(this);
            attach.apply(this, arguments);
        }

        util.inherits(Constructor, SystemObject);

        Constructor.id = id;

        // Parameters: options, context, next
        Constructor.async = attach.length >= 3;

        var prototype = Constructor.prototype;

        prototype.detach = detach;

        var exports = options.exports || Object.create(null);

        Object
            .getOwnPropertyNames(exports)
            .forEach(function (key) {
                var descriptor = Object.getOwnPropertyDescriptor(exports, key);
                Object.defineProperty(prototype, key, descriptor);
            })

        return Constructor;
    }
}

['os', 'app']
    .forEach(function (id) {
        module.exports[id] = MakeSystemObjectConstructor(id);
    });
