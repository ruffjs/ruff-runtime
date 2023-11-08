'use strict';

var fs = require('fs');
var path = require('path');
var buildNetwrokManager = require('network-manager');
var Storage = require('ruff-util').Storage;

var prototype = Object.create(null);

prototype.init = function (configFilePath) {
    if (!configFilePath) {
        throw new Error('Please pass a config file to Constructor.');
    }

    var that = this;
    this._config = require(path.resolve(configFilePath));
    this._database = new Storage(path.resolve(this._config.databasePath));

    this._types = Object.keys(this._config.types).sort();
    Object.defineProperties(this, {
        types: {
            get: function () {
                return this._types;
            }
        }
    });

    this._types.forEach(function (type) {
        var typeArgs = that._config.types[type];
        var Constructor = require(typeArgs.module);
        var filePath = path.resolve(typeArgs.configFilePath);

        Object.defineProperty(that, type, {
            value: new Constructor(filePath),
            writable: false,
            enumerable: true,
            configurable: false
        });
    });
};

prototype.addNetwork = function (type, connectionManager) {
    this._types = this._types.push(type);

    Object.defineProperty(this, type, {
        value: connectionManager,
        writable: true,
        enumerable: true,
        configurable: true
    });
};
prototype.setDefaultGatewayIp = function (ip) {
    uv.exec_sync('/sbin/route', ['add', 'default', 'gw', ip]);
};
prototype.getDefaultGatewayIp = function () {
    var defaultRouteFile = '/tmp/default_route';
    var cmd = '/bin/touch ' + defaultRouteFile + ' && /sbin/route -n | /usr/bin/awk \'match($1, /0.0.0.0/) {print $2}\' > ' + defaultRouteFile;
    uv.exec_sync('/bin/sh', ['-c', cmd]);
    var res = fs.readFileSync(defaultRouteFile, 'utf-8').match(/[0-9.]+/);
    return res ? res[0] : null;
};
prototype.deleteDefaultGatewayIp = function (ip) {
    uv.exec_sync('/sbin/route', ['del', 'default', 'gw', ip]);
};

var extentions = prototype.extentions = Object.create(null);

extentions.saveDefaultNetwork = function (type, name) {
    this._database.set('default', name ? type + ':' + name : type);
};
extentions.getDefaultNetwork = function () {
    var typeAndName = this._database.get('default');
    if (typeAndName) {
        return this._database.get('default').split(':');
    }
    return [];
};

module.exports = buildNetwrokManager(prototype);
