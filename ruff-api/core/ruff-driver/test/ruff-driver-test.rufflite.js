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

require('test').run(exports);
