'use strict';

var fs = require('fs');

var hop = Object.prototype.hasOwnProperty;

function Storage(filePath) {
    this.path = filePath;

    if (fs.existsSync(filePath)) {
        this.data = require(filePath);
    } else {
        this.data = {};
    }
}

Storage.prototype.get = function (key, defaultValue) {
    var value = hop.call(this.data, key) ?
        this.data[key] : undefined;

    if (value !== undefined) {
        return value;
    } else {
        return defaultValue;
    }
};

Storage.prototype.set = function (key, value) {
    if (typeof key === 'string') {
        this.data[key] = value;
    } else {
        var data = key;
        var storageData = this.data;

        Object
            .keys(data)
            .forEach(function (key) {
                storageData[key] = data[key];
            });
    }

    fs.writeFileSync(this.path, JSON.stringify(this.data, null, '    '));
};

Storage.prototype.delete = function (key) {
    if (delete this.data[key]) {
        fs.writeFileSync(this.path, JSON.stringify(this.data, null, '    '));
    }
};

Storage.prototype.keys = function () {
    return Object.keys(this.data);
};

module.exports = Storage;
