'use strict';

var path = require('path');

var Storage = require('ruff-util').Storage;
var buildConnectionManager = require('connection-manager');

var mobile = require('./mobile');

function MobileManager(configFilePath, name, profile) {
    if (!configFilePath) {
        throw new Error('Please pass a config file to Constructor.');
    }
    var _config = require(path.resolve(configFilePath));
    var database = new Storage(path.resolve(_config.databasePath));

    var args = [];
    if (typeof name === 'object') {
        args[0] = 'default';
        args[1] = profile;
    } else if (name && profile) {
        args[0] = name;
        args[1] = profile;
    } else {
        args = undefined;
    }

    function parseArgs(name, arg, type, defaultValue) {
        var args = [];
        if (typeof name === type || name === undefined) {
            args[0] = defaultValue;
            args[1] = name;
        } else {
            args[0] = name;
            args[1] = arg;
        }
        return args;
    }

    var Connection = buildConnectionManager({
        addProfile: function (name, profile) {
            var args = parseArgs(name, profile, 'object');
            if (args[0] === undefined) {
                args[0] = 'default';
            }
            var obj = Object.create(null);
            obj[args[0] ? args[0] : 'default'] = args[1];
            database.set('profile', obj);
        },
        removeProfile: function (name) {
            database.delete('profile');
        },
        getProfile: function (name) {
            var profiles = database.get('profile');
            return profiles ? profiles[name] : null;
        },
        getNames: function () {
            return Object.keys(database.get('profile', {}));
        },
        connect: function (name, callback) {
            var args = parseArgs(name, callback, 'function', 'default');
            var devPath = database.get('profile')[args[0]].path;

            mobile.connect(devPath, args[1]);
        },
        disconnect: function (name, callback) {
            var args = parseArgs(name, callback, 'function', 'default');
            var devPath = database.get('profile')[args[0]].path;

            mobile.disconnect(devPath, args[1]);
        },
        getStatus: function (name) {
            if (name === undefined) {
                name = 'default';
            }
            return mobile.getStatus(database.get('profile')[name].path);
        },

        extentions: {
            enableService: function (name) {
                if (name === undefined) {
                    name = 'default';
                }
                mobile.enableService(database.get('profile')[name].path);
            },
            disableService: function (name) {
                if (name === undefined) {
                    name = 'default';
                }
                mobile.disableService(database.get('profile')[name].path);
            },
            getBrand: mobile.getBrand.bind(mobile)
        }
    });

    return new Connection(args);
}

module.exports = MobileManager;
