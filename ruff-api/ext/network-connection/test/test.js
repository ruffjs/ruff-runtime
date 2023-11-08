'use strict';

var assert = require('assert');
var test = require('test');

var connection = require('../src/index');

module.exports = {
    'test should create connection': function () {
        var ConnectionConstructor = connection({
            config: {
                set: Function,
                get: Function,
                clear: Function
            },
            service: {
                start: Function,
                stop: Function,
                enable: Function,
                disable: Function
            },
            getStatus: Function
        });

        new ConnectionConstructor();
    },

    'test should invoke expected function': function () {
        var message = {
            set: 'this is set function',
            get: 'this is get function',
            clear: 'this is clear function',
            start: 'this is start function',
            stop: 'this is stop function',
            enable: 'this is enable function',
            disable: 'this is disable function',
            getStatus: 'this is getStatus function'
        };
        var ConnectionConstructor = connection({
            config: {
                set: function () {
                    return message.set;
                },
                get: function () {
                    return message.get;
                },
                clear: function () {
                    return message.clear;
                }
            },
            service: {
                start: function () {
                    return message.start;
                },
                stop: function () {
                    return message.stop;
                },
                enable: function () {
                    return message.enable;
                },
                disable: function () {
                    return message.disable;
                }
            },
            getStatus: function () {
                return message.getStatus;
            }
        });

        var concreteConnection = new ConnectionConstructor();
        assert.equal(concreteConnection.config.set(), message.set);
        assert.equal(concreteConnection.config.get(), message.get);
        assert.equal(concreteConnection.config.clear(), message.clear);
        assert.equal(concreteConnection.service.start(), message.start);
        assert.equal(concreteConnection.service.stop(), message.stop);
        assert.equal(concreteConnection.service.enable(), message.enable);
        assert.equal(concreteConnection.service.disable(), message.disable);
        assert.equal(concreteConnection.getStatus(), message.getStatus);
    }
};

test.run(module.exports);
