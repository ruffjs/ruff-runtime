'use strict';

var fs = require('fs');
var SysUart = require('sys-uart');
var invokeCallbackAsync = require('util').invokeCallbackAsync;

var DAIL_SCRIPT = '/etc/ruffmbb/script/mbb.sh';
var STATUS_FILE = '/etc/ruffmbb/status';
var SERVICE_FILE = '/etc/init.d/ruffmbb';

var BRAND_TABLE = {
    46000: 'ChinaMobile',
    46001: 'ChinaUnicom',
    46002: 'ChinaMobile',
    46003: 'ChinaTelecom'
};

function getBrand(devPath, timeout, callback) {
    if (typeof timeout === 'function') {
        callback = timeout;
        timeout = 10000;
    }

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
            callback(new Error('timeout'));
        });
    }, timeout);
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

function connect(devPath, callback) {
    getBrand(devPath, function (error, name) {
        if (error) {
            callback && callback(error);
            return;
        }
        try {
            uv.exec_sync('/bin/sh', [DAIL_SCRIPT, 'up', devPath, name]);
        } catch (e) {
            callback && callback(e);
            return;
        }
        callback && callback();
    });
}

function disconnect(devPath, callback) {
    var error;
    try {
        uv.exec_sync('/bin/sh', [DAIL_SCRIPT, 'down']);
    } catch (e) {
        error = e;
    }
    invokeCallbackAsync(callback, error);
}

function service(state) {
    uv.exec_sync(SERVICE_FILE, [state]);
}

function serviceEnable(devPath) {
    service('enable');
}

function serviceDisable(devPath) {
    service('disable');
}

function getStatus(devPath) {
    var allStatus = Object.create(null);
    var status = fs
        .readFileSync(STATUS_FILE, 'utf-8')
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

exports.getBrand = getBrand;
exports.connect = connect;
exports.disconnect = disconnect;
exports.serviceEnable = serviceEnable;
exports.serviceDisable = serviceDisable;
exports.getStatus = getStatus;
