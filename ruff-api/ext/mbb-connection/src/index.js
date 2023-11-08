'use strict';

var path = require('path');
var fs = require('fs');
var SysUart = require('sys-uart');
var invokeCallbackAsync = require('util').invokeCallbackAsync;

var Storage = require('ruff-util').Storage;
var buildConnection = require('network-connection');

var BRAND_TABLE = {
    46000: 'ChinaMobile',
    46001: 'ChinaUnicom',
    46002: 'ChinaMobile',
    46003: 'ChinaTelecom'
};

function getBrand(devPath, callback) {
    if (!devPath) {
        invokeCallbackAsync(callback, new Error('Device is not specified'));
    }
    try {
        fs.statSync(devPath);
    } catch (error) {
        invokeCallbackAsync(callback, new Error('Device is not existed'));
    }

    var sysUART = new SysUart({
        device: {
            path: devPath
        }
    });

    var uart = sysUART.getInterface('uart', {});

    var timer = setTimeout(function () {
        uart.close(function (error) {
            if (error) {
                callback(error);
                return;
            }
            callback();
        });
    }, 10000);
    checkBrand();

    function checkBrand() {
        uart.write('AT+CIMI\r', function () {
            uart.read(function (error, data) {
                if (error) {
                    callback(error);
                    return;
                }
                uart.close(function (error) {
                    if (error) {
                        callback(error);
                        return;
                    }
                    clearTimeout(timer);
                    var res = data.toString().match(/[0-9]{14,}/g);
                    if (res) {
                        var name = BRAND_TABLE[res[0].slice(0, 5)];
                        if (name) {
                            callback(undefined, name);
                            return;
                        }
                    }
                    callback(new Error('Device brand is unknown'));
                });
            });
        });
    }
}

function MbbConnection(configFilePath, name, config) {
    var _config = require(path.resolve(configFilePath));
    var database = new Storage(path.resolve(_config.databasePath));

    var dialScript = path.resolve(_config.dailScript);
    var statusFile = path.resolve(_config.statusFile);
    var serviceFile = path.resolve(_config.serviceFile);

    function service(state) {
        uv.exec_sync(serviceFile, [state]);
    }

    var Connection = buildConnection({
        config: {
            set: function (name, config) {
                database.set('config', config);
            },

            get: function () {
                return database.get('config');
            },

            clear: function () {
                database.delete('config');
            }
        },

        service: {
            start: function (callback) {
                var devPath = database.get('config').path;

                getBrand(devPath, function (error, name) {
                    if (error) {
                        callback && callback(error);
                        return;
                    }
                    try {
                        uv.exec_sync('/bin/sh', [dialScript, 'up', devPath, name]);
                    } catch (e) {
                        callback && callback(e);
                        return;
                    }
                    callback && callback();
                });
            },

            stop: function (callback) {
                var error;
                try {
                    uv.exec_sync('/bin/sh', [dialScript, 'down']);
                } catch (e) {
                    error = e;
                }
                invokeCallbackAsync(callback, error);
            },

            enable: function () {
                service('enable');
            },

            disable: function () {
                service('disabel');
            }
        },

        getStatus: function () {
            var allStatus = Object.create(null);
            var status = fs
                .readFileSync(statusFile, 'utf-8')
                .split('\n')
                .filter(function (line) {
                    return line.trim();
                })
                .map(function (line) {
                    var current = [];
                    current.push(line.substr(0, line.indexOf(':')));
                    current.push(line.substr(line.indexOf(':') + 1));
                    return current;
                });
            status.forEach(function (currentStatus) {
                allStatus[currentStatus[0]] = currentStatus[1];
            });
            return allStatus;
        }
    });

    return new Connection(name, config);
}

module.exports = MbbConnection;
