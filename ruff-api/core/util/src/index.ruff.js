'use strict';

var noDeprecation = process.noDeprecation;

var kDefaultMaxLength = 100;

function tryStringify(arg) {
    try {
        return JSON.stringify(arg);
    } catch (_) {
        return '[Circular]';
    }
}

exports.format = function (f) {
    if (typeof f !== 'string') {
        var objects = new Array(arguments.length);
        for (var index = 0; index < arguments.length; index++) {
            objects[index] = inspect(arguments[index]);
        }
        return objects.join(' ');
    }

    var argLen = arguments.length;

    if (argLen === 1) {
        return f;
    }

    var str = '';
    var a = 1;
    var lastPos = 0;
    for (var i = 0; i < f.length;) {
        if (f.charCodeAt(i) === 37/* '%'*/ && i + 1 < f.length) {
            switch (f.charCodeAt(i + 1)) {
                case 100: // 'd'
                    if (a >= argLen) {
                        break;
                    }
                    if (lastPos < i) {
                        str += f.slice(lastPos, i);
                    }
                    str += Number(arguments[a++]);
                    lastPos = i += 2;
                    continue;
                case 106: // 'j'
                    if (a >= argLen) {
                        break;
                    }
                    if (lastPos < i) {
                        str += f.slice(lastPos, i);
                    }
                    str += tryStringify(arguments[a++]);
                    lastPos = i += 2;
                    continue;
                case 115: // 's'
                    if (a >= argLen) {
                        break;
                    }
                    if (lastPos < i) {
                        str += f.slice(lastPos, i);
                    }
                    str += String(arguments[a++]);
                    lastPos = i += 2;
                    continue;
                case 37: // '%'
                    if (lastPos < i) {
                        str += f.slice(lastPos, i);
                    }
                    str += '%';
                    lastPos = i += 2;
                    continue;
            }
        }
        ++i;
    }
    if (lastPos === 0) {
        str = f;
    } else if (lastPos < f.length) {
        str += f.slice(lastPos);
    }
    while (a < argLen) {
        var x = arguments[a++];
        if (x === null || (typeof x !== 'object' && typeof x !== 'symbol')) {
            str += ' ' + x;
        } else {
            str += ' ' + inspect(x);
        }
    }
    return str;
};

function printDeprecationMessage(msg, warned, ctor) {
    if (warned || noDeprecation) {
        return true;
    }
    // eslint-disable-next-line no-console
    console.warn(msg);
    return true;
}

exports.deprecate = function (fn, msg) {
    // Allow for deprecating things in the process of starting up.
    if (global.process === undefined) {
        return function () {
            return exports.deprecate(fn, msg).apply(this, arguments);
        };
    }

    if (process.noDeprecation === true) {
        return fn;
    }

    var warned = false;
    function deprecated() {
        warned = printDeprecationMessage(msg, warned, deprecated);
        return fn.apply(this, arguments);
    }

    return deprecated;
};

var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
    if (debugEnviron === undefined) {
        debugEnviron = process.env.RUFF_DEBUG || '';
    }
    set = set.toUpperCase();
    if (!debugs[set]) {
        if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
            var pid = uv.getpid();
            debugs[set] = function () {
                var msg = exports.format.apply(exports, arguments);
                // eslint-disable-next-line no-console
                console.error('%s %d: %s', set, pid, msg);
            };
        } else {
            debugs[set] = function () {};
        }
    }
    return debugs[set];
};

/**
 * Echos the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
    // default options
    var ctx = {
        seen: [],
        stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) {
        ctx.depth = arguments[2];
    }
    if (arguments.length >= 4) {
        ctx.colors = arguments[3];
    }
    if (typeof opts === 'boolean') {
        // legacy...
        ctx.showHidden = opts;
    } else if (opts) {
        // got an "options" object
        exports._extend(ctx, opts);
    }
    // set default options
    if (ctx.showHidden === undefined) {
        ctx.showHidden = false;
    }
    if (ctx.depth === undefined) {
        ctx.depth = 2;
    }
    if (ctx.colors === undefined) {
        ctx.colors = false;
    }
    if (ctx.customInspect === undefined) {
        ctx.customInspect = true;
    }
    if (ctx.showProxy === undefined) {
        ctx.showProxy = false;
    }
    if (ctx.colors) {
        ctx.stylize = stylizeWithColor;
    }
    if (ctx.maxArrayLength === undefined) {
        ctx.maxArrayLength = kDefaultMaxLength;
    }
    if (ctx.maxArrayLength === null) {
        ctx.maxArrayLength = Infinity;
    }
    return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
    bold : [1, 22],
    italic : [3, 23],
    underline : [4, 24],
    inverse : [7, 27],
    white : [37, 39],
    grey : [90, 39],
    black : [30, 39],
    blue : [34, 39],
    cyan : [36, 39],
    green : [32, 39],
    magenta : [35, 39],
    red : [31, 39],
    yellow : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
    special: 'cyan',
    number: 'yellow',
    boolean: 'yellow',
    undefined: 'grey',
    null: 'bold',
    string: 'green',
    symbol: 'green',
    date: 'magenta',
    // "name": intentionally not styling
    regexp: 'red'
};

function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
        return '\u001b[' + inspect.colors[style][0] + 'm' + str +
                     '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
        return str;
    }
}

function stylizeNoColor(str, styleType) {
    return str;
}

function arrayToHash(array) {
    var hash = Object.create(null);

    for (var i = 0; i < array.length; i++) {
        var val = array[i];
        hash[val] = true;
    }

    return hash;
}

function getConstructorOf(obj) {
    while (obj) {
        var descriptor = Object.getOwnPropertyDescriptor(obj, 'constructor');
        if (descriptor !== undefined &&
                typeof descriptor.value === 'function' &&
                descriptor.value.name !== '') {
            return descriptor.value;
        }

        obj = Object.getPrototypeOf(obj);
    }

    return null;
}

function objectToString(o) {
    return Object.prototype.toString.call(o);
}

function isError(e) {
    return objectToString(e) === '[object Error]' || e instanceof Error;
}

function formatValue(ctx, value, recurseTimes) {
    // eslint-disable-next-line valid-typeof
    if (typeof value === 'buffer') {
        return 'native object';
    }

    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
            value &&
            typeof value.inspect === 'function' &&
            // Filter out the util module, it's inspect function is special
            value.inspect !== exports.inspect &&
            // Also filter out any prototype objects using the circular check.
            !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (typeof ret !== 'string') {
            ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
        return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
    }

    // This could be a boxed primitive (new String(), etc.), check valueOf()
    // NOTE: Avoid calling `valueOf` on `Date` instance because it will return
    // a number which, when object has some additional user-stored `keys`,
    // will be printed out.
    var formatted;
    var raw = value;
    try {
        // the .valueOf() call can fail for a multitude of reasons
        if (!isDate(value)) {
            raw = value.valueOf();
        }
    } catch (e) {
        // ignore...
    }

    if (typeof raw === 'string') {
        // for boxed Strings, we have to remove the 0-n indexed entries,
        // since they just noisy up the output and are redundant
        keys = keys.filter(function (key) {
            return !(key >= 0 && key < raw.length);
        });
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
        if (typeof value === 'function') {
            var name = value.name ? ': ' + value.name : '';
            return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
            return ctx.stylize(Date.prototype.toISOString.call(value), 'date');
        }
        if (isError(value)) {
            return formatError(value);
        }
        // now check the `raw` value to handle boxed primitives
        if (typeof raw === 'string') {
            formatted = formatPrimitiveNoColor(ctx, raw);
            return ctx.stylize('[String: ' + formatted + ']', 'string');
        }
        if (typeof raw === 'number') {
            formatted = formatPrimitiveNoColor(ctx, raw);
            return ctx.stylize('[Number: ' + formatted + ']', 'number');
        }
        if (typeof raw === 'boolean') {
            formatted = formatPrimitiveNoColor(ctx, raw);
            return ctx.stylize('[Boolean: ' + formatted + ']', 'boolean');
        }
    }

    var constructor = getConstructorOf(value);
    var base = '';
    var empty = false;
    var braces;
    var formatter = formatObject;

    // We can't compare constructors for various objects using a comparison like
    // `constructor === Array` because the object could have come from a different
    // context and thus the constructor won't match. Instead we check the
    // constructor names (including those up the prototype chain where needed) to
    // determine object types.
    if (Array.isArray(value)) {
        // Unset the constructor to prevent "Array [...]" for ordinary arrays.
        if (constructor && constructor.name === 'Array') {
            constructor = null;
        }
        braces = ['[', ']'];
        empty = value.length === 0;
        formatter = formatArray;
    } else {
        // Unset the constructor to prevent "Object {...}" for ordinary objects.
        if (constructor && constructor.name === 'Object') {
            constructor = null;
        }
        braces = ['{', '}'];
        empty = true;    // No other data than keys.
    }
    empty = empty === true && keys.length === 0;
    // Make functions say that they are functions
    if (typeof value === 'function') {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
        base = ' ' + Date.prototype.toISOString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
        base = ' ' + formatError(value);
    }

    // Make boxed primitive Strings look like such
    if (typeof raw === 'string') {
        formatted = formatPrimitiveNoColor(ctx, raw);
        base = ' ' + '[String: ' + formatted + ']';
    }

    // Make boxed primitive Numbers look like such
    if (typeof raw === 'number') {
        formatted = formatPrimitiveNoColor(ctx, raw);
        base = ' ' + '[Number: ' + formatted + ']';
    }

    // Make boxed primitive Booleans look like such
    if (typeof raw === 'boolean') {
        formatted = formatPrimitiveNoColor(ctx, raw);
        base = ' ' + '[Boolean: ' + formatted + ']';
    }

    // Add constructor name if available
    if (base === '' && constructor) {
        braces[0] = constructor.name + ' ' + braces[0];
    }

    if (empty === true) {
        return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
            return ctx.stylize('[Object]', 'special');
        }
    }

    ctx.seen.push(value);

    var output = formatter(ctx, value, recurseTimes, visibleKeys, keys);

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
}

function formatNumber(ctx, value) {
    // Format -0 as '-0'. Strict equality won't distinguish 0 from -0,
    // so instead we use the fact that 1 / -0 < 0 whereas 1 / 0 > 0 .
    if (value === 0 && 1 / value < 0) {
        return ctx.stylize('-0', 'number');
    }
    return ctx.stylize(String(value), 'number');
}

function formatPrimitive(ctx, value) {
    if (value === undefined) {
        return ctx.stylize('undefined', 'undefined');
    }

    // For some reason typeof null is "object", so special case here.
    if (value === null) {
        return ctx.stylize('null', 'null');
    }

    var type = typeof value;

    if (type === 'string') {
        var simple = '\'' +
                                 JSON.stringify(value)
                                         .replace(/^"|"$/g, '')
                                         .replace(/'/g, '\\\'')
                                         .replace(/\\"/g, '"') +
                                 '\'';
        return ctx.stylize(simple, 'string');
    }
    if (type === 'number') {
        return formatNumber(ctx, value);
    }
    if (type === 'boolean') {
        return ctx.stylize(String(value), 'boolean');
    }
    // es6 symbol primitive
    if (type === 'symbol') {
        return ctx.stylize(value.toString(), 'symbol');
    }
}

function formatPrimitiveNoColor(ctx, value) {
    var stylize = ctx.stylize;
    ctx.stylize = stylizeNoColor;
    var str = formatPrimitive(ctx, value);
    ctx.stylize = stylize;
    return str;
}

function formatError(value) {
    return value.stack || '[' + Error.prototype.toString.call(value) + ']';
}

function formatObject(ctx, value, recurseTimes, visibleKeys, keys) {
    return keys.map(function (key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, false);
    });
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    var maxLength = Math.min(Math.max(0, ctx.maxArrayLength), value.length);
    var remaining = value.length - maxLength;
    for (var i = 0; i < maxLength; ++i) {
        if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                    String(i), true));
        } else {
            output.push('');
        }
    }
    if (remaining > 0) {
        output.push('... ' + remaining + ' more item' + (remaining > 1 ? 's' : ''));
    }
    keys.forEach(function (key) {
        if (typeof key === 'symbol' || !key.match(/^\d+$/)) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                    key, true));
        }
    });
    return output;
}

function formatTypedArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var maxLength = Math.min(Math.max(0, ctx.maxArrayLength), value.length);
    var remaining = value.length - maxLength;
    var output = new Array(maxLength);
    for (var i = 0; i < maxLength; ++i) {
        output[i] = formatNumber(ctx, value[i]);
    }
    if (remaining > 0) {
        output.push('... ' + remaining + ' more item' + (remaining > 1 ? 's' : ''));
    }
    for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        if (typeof key === 'symbol' || !key.match(/^\d+$/)) {
            output.push(
                    formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
    }
    return output;
}

function formatSet(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    value.forEach(function (v) {
        var nextRecurseTimes = recurseTimes === null ? null : recurseTimes - 1;
        var str = formatValue(ctx, v, nextRecurseTimes);
        output.push(str);
    });
    keys.forEach(function (key) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                                                             key, false));
    });
    return output;
}

function formatMap(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    value.forEach(function (v, k) {
        var nextRecurseTimes = recurseTimes === null ? null : recurseTimes - 1;
        var str = formatValue(ctx, k, nextRecurseTimes);
        str += ' => ';
        str += formatValue(ctx, v, nextRecurseTimes);
        output.push(str);
    });
    keys.forEach(function (key) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
                                                             key, false));
    });
    return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name;
    var str;
    var desc;
    // eslint-disable-next-line valid-typeof
    desc = typeof value !== 'buffer' && Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
    if (desc.get) {
        if (desc.set) {
            str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
            str = ctx.stylize('[Getter]', 'special');
        }
    } else if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
    }
    if (!hasOwnProperty(visibleKeys, key)) {
        if (typeof key === 'symbol') {
            name = '[' + ctx.stylize(key.toString(), 'symbol') + ']';
        } else {
            name = '[' + key + ']';
        }
    }
    if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
            if (recurseTimes === null) {
                str = formatValue(ctx, desc.value, null);
            } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf('\n') > -1) {
                if (array) {
                    str = str.replace(/\n/g, '\n    ');
                } else {
                    str = str.replace(/(^|\n)/g, '\n     ');
                }
            }
        } else {
            str = ctx.stylize('[Circular]', 'special');
        }
    }
    if (name === undefined) {
        if (array && key.match(/^\d+$/)) {
            return str;
        }
        name = JSON.stringify(String(key));
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2);
            name = ctx.stylize(name, 'name');
        } else {
            name = name.replace(/'/g, '\\\'')
                                 .replace(/\\"/g, '"')
                                 .replace(/(^"|"$)/g, '\'')
                                 .replace(/\\\\/g, '\\');
            name = ctx.stylize(name, 'string');
        }
    }

    return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function (prev, cur) {
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
        return braces[0] +
                     // If the opening "brace" is too large, like in the case of "Set {",
                     // we need to force the first item to be on the next line or the
                     // items will not line up correctly.
                     (base === '' && braces[0].length === 1 ? '' : base + '\n ') +
                     ' ' +
                     output.join(',\n    ') +
                     ' ' +
                     braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.isArray = Array.isArray;

function isBoolean(arg) {
    return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
    return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
    return arg === null || arg === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
    return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
    return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
    return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
    return arg === undefined;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
    return re instanceof RegExp;
}
exports.isRegExp = isRegExp;

function isObject(arg) {
    return arg !== null && typeof arg === 'object';
}
exports.isObject = isObject;

function isDate(d) {
    return d instanceof Date;
}
exports.isDate = isDate;

exports.isError = isError;

function isFunction(arg) {
    return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
    return arg === null ||
                 typeof arg !== 'object' && typeof arg !== 'function';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                                'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
    var d = new Date();
    var time = [pad(d.getHours()),
                            pad(d.getMinutes()),
                            pad(d.getSeconds())].join(':');
    return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
    // eslint-disable-next-line no-console
    console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *         prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 * @throws {TypeError} Will error if either constructor is null, or if
 *         the super constructor lacks a prototype.
 */
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

function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}

// Deprecated old stuff.

exports.print = function () {
    for (var i = 0, len = arguments.length; i < len; ++i) {
        process.stdout.write(String(arguments[i]));
    }
};

exports.puts = function () {
    for (var i = 0, len = arguments.length; i < len; ++i) {
        process.stdout.write(arguments[i] + '\n');
    }
};

exports.debug = function (x) {
    process.stderr.write('DEBUG: ' + x + '\n');
};

exports.error = function (x) {
    for (var i = 0, len = arguments.length; i < len; ++i) {
        process.stderr.write(arguments[i] + '\n');
    }
};

exports._errnoException = function (err, syscall, original) {
    if (typeof err !== 'number') {
        return err;
    }

    var errname = uv.errname(err);
    var message = syscall + ' ' + errname;
    if (original) {
        message += ' ' + original;
    }
    var e = new Error(message);
    e.code = errname;
    e.errno = errname;
    e.syscall = syscall;
    return e;
};

exports._exceptionWithHostPort = function (
    err,
    syscall,
    address,
    port,
    additional) {
    var details;
    if (port && port > 0) {
        details = address + ':' + port;
    } else {
        details = address;
    }

    if (additional) {
        details += ' - Local (' + additional + ')';
    }
    var ex = exports._errnoException(err, syscall, details);
    ex.address = address;
    if (port) {
        ex.port = port;
    }
    return ex;
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

const encode = new TextEncoder('uft-8');
exports._toNativeBuffer = function (buffer) {

    if (typeof buffer === 'string') {
        return Uint8Array.plainOf(encode.encode(buffer));
    }
    /* eslint-disable new-cap */
    var plainBuffer = Uint8Array.plainOf(buffer);

    if (plainBuffer.length === buffer.length) {
        return plainBuffer;
    } else {
        return Uint8Array.plainOf(new Buffer(buffer));
    }
};

exports._NativeBufferToBuffer = function(buffer) {
    return Buffer.from(buffer);
}
