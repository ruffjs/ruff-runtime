exports.inherits = function (ctor, superCtor) {
    if (ctor === undefined || ctor === null) {
        throw new TypeError('The constructor to "inherits" must not be ' +
                                                'null or undefined');
    }

    if (superCtor === undefined || superCtor === null) {
        throw new TypeError('The super constructor to "inherits" must not ' +
                                                'be null or undefined');
    }

    if (superCtor.prototype === undefined) {
        throw new TypeError('The super constructor to "inherits" must ' +
                                                'have a prototype');
    }

    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};

exports.mixin = function (Constructor, objects) {
    var prototype = Constructor.prototype;

    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        var keys = Object.keys(object);

        for (var j = 0; j < keys.length; j++) {
            var key = keys[j];
            prototype[key] = object[key];
        }
    }
};

exports._errnoException = Error;

exports._extend = function (origin, add) {
    // Don't do anything if add isn't an object
    if (add === null || typeof add !== 'object') {
        return origin;
    }

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
        origin[keys[i]] = add[keys[i]];
    }
    return origin;
};

exports.assertCallback = function (callback) {
    if (typeof callback !== 'function') {
        throw new TypeError('Callback is expected to be a function');
    }
};

exports.invokeCallback = function (callback, error, value) {
    if (callback === undefined) {
        return;
    }

    if (typeof callback !== 'function') {
        throw new TypeError('Callback is expected to be a function, but got ' + typeof callback + ' instead');
    }

    callback(error, value);
};

exports.invokeCallbackAsync = function (callback, error, value) {
    if (callback === undefined) {
        return;
    }

    if (typeof callback !== 'function') {
        throw new TypeError('Callback is expected to be a function, but got ' + typeof callback + ' instead');
    }

    process.nextTick(callback, error, value);
};
