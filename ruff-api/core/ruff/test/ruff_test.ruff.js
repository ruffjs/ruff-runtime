'use strict';

return;
var assert = require('assert');
var path = require('path');
var driver = require('ruff-driver');

var RuffBox = require('../src/ruff-box.js');

require('t');

var SYS_GPIO_INTERFACE = {};

var driverConstructorMap = {
    'sys-gpio': driver({
        attach: function () {

        },
        getInterface: function (name) {
            assert.equal(name, 'gpio');
            return SYS_GPIO_INTERFACE;
        }
    }),
    'led-gpio': driver({
        attach: function (inputs) {
            assert.equal(inputs['gpio'], SYS_GPIO_INTERFACE);
        }
    })
};

function getDeviceConstructor(name) {
    return driverConstructorMap[name];
}

describe('Class `RuffBox`', function () {
    describe('Basic `ruff_box.json`', function () {
        var box;

        it('should emit ready event asynchronously', function (done) {
            box = new RuffBox(path.join(__dirname, 'ruff-box-jsons/basic.json'));
            box._getDeviceConstructor = getDeviceConstructor;
            box.on('ready', done);
        });

        it('should get device that loads synchronously synchronously', function () {
            var sync;

            box.getDevice('gpio-22', function (error, device) {
                if (error) {
                    throw error;
                }

                assert(device instanceof getDeviceConstructor('sys-gpio'));
                sync = true;
            });

            assert(sync);
        });

        it('should get device interface that loads synchronously synchronously', function () {
            var sync;

            box.getDeviceInterface('gpio-23', 'gpio', {}, function (error, gotInterface) {
                if (error) {
                    throw error;
                }

                assert.equal(gotInterface, SYS_GPIO_INTERFACE);
                sync = true;
            });

            assert(sync);
        });

        it('should get device loads synchronously with inputs synchronously', function () {
            var sync;

            box.getDevice('led-0', function (error, device) {
                if (error) {
                    throw error;
                }

                assert(device instanceof getDeviceConstructor('led-gpio'));
                sync = true;
            });

            assert(sync);
        });
    });
});
