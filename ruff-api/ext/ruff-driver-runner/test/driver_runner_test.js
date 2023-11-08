'use strict';

var path = require('path');
var when = require('ruff-mock').when;

var driverPath = path.join(this.id, '..', 'sr501');
var runner = require('../src/index.js');

exports['test should build driver'] = function (done) {
    var run = false;

    runner.run(driverPath, function (error, context) {
        if (error) {
            done(error);
            return;
        }

        var sr501 = context.device;
        var gpio = context.inputs['gpio'];

        sr501.on('away', function () {
            done();
        });

        when(gpio).read().return(0);
        gpio.emit('interrupt');
    });
};

exports['test should run once for each interrupt'] = function (done) {
    runner.run(driverPath, function (error, context) {
        if (error) {
            done(error);
            return;
        }

        var sr501 = context.device;
        var gpio = context.inputs['gpio'];

        sr501.on('away', function () {
            done();
        });

        when(gpio).read().return(0);
        gpio.emit('interrupt');
    });
};

require('test').run(exports);
