'use strict';
var isWindows = process.platform === 'win32';

function assertPath(path) {
    if (typeof path !== 'string') {
        throw new TypeError('Path must be a string. Received ' + path);
    }
}

// resolves . and .. elements in a path array with directory names there
// must be no slashes or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
    var res = [];
    for (var i = 0; i < parts.length; i++) {
        var p = parts[i];

        // ignore empty parts
        if (!p || p === '.') {
            continue;
        }

        if (p === '..') {
            if (res.length && res[res.length - 1] !== '..') {
                res.pop();
            } else if (allowAboveRoot) {
                res.push('..');
            }
        } else {
            res.push(p);
        }
    }

    return res;
}

// Returns an array with empty elements removed from either end of the input
// array or the original array if no elements need to be removed
function trimArray(arr) {
    var lastIndex = arr.length - 1;
    var start = 0;
    for (; start <= lastIndex; start++) {
        if (arr[start]) {
            break;
        }
    }

    var end = lastIndex;
    for (; end >= 0; end--) {
        if (arr[end]) {
            break;
        }
    }

    if (start === 0 && end === lastIndex) {
        return arr;
    }
    if (start > end) {
        return [];
    }
    return arr.slice(start, end + 1);
}

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

function _format(sep, pathObject) {
    var dir = pathObject.dir || pathObject.root;
    var base = pathObject.base ||
        ((pathObject.name || '') + (pathObject.ext || ''));
    if (!dir) {
        return base;
    }
    if (dir === pathObject.root) {
        return dir + base;
    }
    return dir + sep + base;
}

var win32 = {};

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename) {
    // Separate device+slash from tail
    var result = splitDeviceRe.exec(filename),
        device = (result[1] || '') + (result[2] || ''),
        tail = result[3];
    // Split the tail into dir, basename and extension
    var result2 = splitTailRe.exec(tail),
        dir = result2[1],
        basename = result2[2],
        ext = result2[3];
    return [device, dir, basename, ext];
}

function win32StatPath(path) {
    var result = splitDeviceRe.exec(path),
        device = result[1] || '',
        isUnc = !!device && device[1] !== ':';
    return {
        device: device,
        isUnc: isUnc,
        isAbsolute: isUnc || !!result[2], // UNC paths are always absolute
        tail: result[3]
    };
}

function normalizeUNCRoot(device) {
    return '\\\\' + device.replace(/^[\\\/]+/, '').replace(/[\\\/]+/g, '\\');
}

// path.resolve([from ...], to)
win32.resolve = function () {
    var resolvedDevice = '',
        resolvedTail = '',
        resolvedAbsolute = false,
        isUnc;

    for (var i = arguments.length - 1; i >= -1; i--) {
        var path;
        if (i >= 0) {
            path = arguments[i];
        } else if (!resolvedDevice) {
            path = process.cwd();
        } else {
            // Windows has the concept of drive-specific current working
            // directories. If we've resolved a drive letter but not yet an
            // absolute path, get cwd for that drive. We're sure the device is not
            // an unc path at this points, because unc paths are always absolute.
            path = process.env['=' + resolvedDevice];
            // Verify that a drive-local cwd was found and that it actually points
            // to our drive. If not, default to the drive's root.
            if (!path || path.substr(0, 3).toLowerCase() !==
                resolvedDevice.toLowerCase() + '\\') {
                path = resolvedDevice + '\\';
            }
        }

        assertPath(path);

        // Skip empty entries
        if (path === '') {
            continue;
        }

        var result = win32StatPath(path),
            device = result.device,
            isAbsolute = result.isAbsolute,
            tail = result.tail;

        isUnc = result.isUnc;

        if (device &&
            resolvedDevice &&
            device.toLowerCase() !== resolvedDevice.toLowerCase()) {
            // This path points to another device so it is not applicable
            continue;
        }

        if (!resolvedDevice) {
            resolvedDevice = device;
        }
        if (!resolvedAbsolute) {
            resolvedTail = tail + '\\' + resolvedTail;
            resolvedAbsolute = isAbsolute;
        }

        if (resolvedDevice && resolvedAbsolute) {
            break;
        }
    }

    // Convert slashes to backslashes when `resolvedDevice` points to an UNC
    // root. Also squash multiple slashes into a single one where appropriate.
    if (isUnc) {
        resolvedDevice = normalizeUNCRoot(resolvedDevice);
    }

    // At this point the path should be resolved to a full absolute path,
    // but handle relative paths to be safe (might happen when process.cwd()
    // fails)

    // Normalize the tail path
    resolvedTail = normalizeArray(resolvedTail.split(/[\\\/]+/),
        !resolvedAbsolute).join('\\');

    return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
        '.';
};


win32.normalize = function (path) {
    assertPath(path);

    var result = win32StatPath(path),
        device = result.device,
        isUnc = result.isUnc,
        isAbsolute = result.isAbsolute,
        tail = result.tail,
        trailingSlash = /[\\\/]$/.test(tail);

    // Normalize the tail path
    tail = normalizeArray(tail.split(/[\\\/]+/), !isAbsolute).join('\\');

    if (!tail && !isAbsolute) {
        tail = '.';
    }
    if (tail && trailingSlash) {
        tail += '\\';
    }

    // Convert slashes to backslashes when `device` points to an UNC root.
    // Also squash multiple slashes into a single one where appropriate.
    if (isUnc) {
        device = normalizeUNCRoot(device);
    }

    return device + (isAbsolute ? '\\' : '') + tail;
};


win32.isAbsolute = function (path) {
    assertPath(path);
    return win32StatPath(path).isAbsolute;
};

win32.join = function () {
    var paths = [];
    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        assertPath(arg);
        if (arg) {
            paths.push(arg);
        }
    }

    var joined = paths.join('\\');

    // Make sure that the joined path doesn't start with two slashes, because
    // normalize() will mistake it for an UNC path then.
    //
    // This step is skipped when it is very clear that the user actually
    // intended to point at an UNC path. This is assumed when the first
    // non-empty string arguments starts with exactly two slashes followed by
    // at least one more non-slash character.
    //
    // Note that for normalize() to treat a path as an UNC path it needs to
    // have at least 2 components, so we don't filter for that here.
    // This means that the user can use join to construct UNC paths from
    // a server name and a share name; for example:
    //   path.join('//server', 'share') -> '\\\\server\\share\')
    if (!/^[\\\/]{2}[^\\\/]/.test(paths[0])) {
        joined = joined.replace(/^[\\\/]{2,}/, '\\');
    }

    return win32.normalize(joined);
};


// path.relative(from, to)
// it will solve the relative path from 'from' to 'to', for instance:
// from = 'C:\\orandea\\test\\aaa'
// to = 'C:\\orandea\\impl\\bbb'
// The output of the function should be: '..\\..\\impl\\bbb'
win32.relative = function (from, to) {
    assertPath(from);
    assertPath(to);

    from = win32.resolve(from);
    to = win32.resolve(to);

    // windows is not case sensitive
    var lowerFrom = from.toLowerCase();
    var lowerTo = to.toLowerCase();

    var toParts = trimArray(to.split('\\'));

    var lowerFromParts = trimArray(lowerFrom.split('\\'));
    var lowerToParts = trimArray(lowerTo.split('\\'));

    var length = Math.min(lowerFromParts.length, lowerToParts.length);
    var samePartsLength = length;
    var i;
    for (i = 0; i < length; i++) {
        if (lowerFromParts[i] !== lowerToParts[i]) {
            samePartsLength = i;
            break;
        }
    }

    if (samePartsLength === 0) {
        return to;
    }

    var outputParts = [];
    for (i = samePartsLength; i < lowerFromParts.length; i++) {
        outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('\\');
};


win32._makeLong = function (path) {
    // Note: this will *probably* throw somewhere.
    if (typeof path !== 'string') {
        return path;
    }

    if (!path) {
        return '';
    }

    var resolvedPath = win32.resolve(path);

    if (/^[a-zA-Z]\:\\/.test(resolvedPath)) {
        // path is local filesystem path, which needs to be converted
        // to long UNC path.
        return '\\\\?\\' + resolvedPath;
    } else if (/^\\\\[^?.]/.test(resolvedPath)) {
        // path is network UNC path, which needs to be converted
        // to long UNC path.
        return '\\\\?\\UNC\\' + resolvedPath.substring(2);
    }

    return path;
};


win32.dirname = function (path) {
    var result = win32SplitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
        // No dirname whatsoever
        return '.';
    }

    if (dir) {
        // It has a dirname, strip trailing slash
        dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
};


win32.basename = function (path, ext) {
    if (ext !== undefined && typeof ext !== 'string') {
        throw new TypeError('"ext" argument must be a string');
    }

    var f = win32SplitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
    }
    return f;
};


win32.extname = function (path) {
    return win32SplitPath(path)[3];
};


win32.format = function (pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new TypeError(
            'Parameter "pathObject" must be an object, not ' + typeof pathObject
        );
    }

    return _format('\\', pathObject);
};


win32.parse = function (path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) {
        return ret;
    }

    var len = path.length;
    var rootEnd = 0;
    var code = path.charCodeAt(0);
    var isAbsolute = false;

    // Try to match a root
    if (len > 1) {
        if (code === 47/*/*/ || code === 92/*\*/) {
            // Possible UNC root

            isAbsolute = true;

            code = path.charCodeAt(1);
            rootEnd = 1;
            if (code === 47/*/*/ || code === 92/*\*/) {
                // Matched double path separator at beginning
                var j = 2;
                var last = j;
                // Match 1 or more non-path separators
                for (; j < len; ++j) {
                    code = path.charCodeAt(j);
                    if (code === 47/*/*/ || code === 92/*\*/) {
                        break;
                    }
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    for (; j < len; ++j) {
                        code = path.charCodeAt(j);
                        if (code !== 47/*/*/ && code !== 92/*\*/) {
                            break;
                        }
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            code = path.charCodeAt(j);
                            if (code === 47/*/*/ || code === 92/*\*/) {
                                break;
                            }
                        }
                        if (j === len) {
                            // We matched a UNC root only

                            rootEnd = j;
                        } else if (j !== last) {
                            // We matched a UNC root with leftovers

                            rootEnd = j + 1;
                        }
                    }
                }
            }
        } else if ((code >= 65/*A*/ && code <= 90/*Z*/) ||
            (code >= 97/*a*/ && code <= 122/*z*/)) {
            // Possible device root

            code = path.charCodeAt(1);
            if (path.charCodeAt(1) === 58/*:*/) {
                rootEnd = 2;
                if (len > 2) {
                    code = path.charCodeAt(2);
                    if (code === 47/*/*/ || code === 92/*\*/) {
                        if (len === 3) {
                            // `path` contains just a drive root, exit early to avoid
                            // unnecessary work
                            ret.root = ret.dir = path.slice(0, 3);
                            return ret;
                        }
                        isAbsolute = true;
                        rootEnd = 3;
                    }
                } else {
                    // `path` contains just a drive root, exit early to avoid
                    // unnecessary work
                    ret.root = ret.dir = path.slice(0, 2);
                    return ret;
                }
            }
        }
    } else if (code === 47/*/*/ || code === 92/*\*/) {
        // `path` contains just a path separator, exit early to avoid
        // unnecessary work
        ret.root = ret.dir = path[0];
        return ret;
    }

    if (rootEnd > 0) {
        ret.root = path.slice(0, rootEnd);
    }

    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= rootEnd; --i) {
        code = path.charCodeAt(i);
        if (code === 47/*/*/ || code === 92/*\*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            // We saw the first non-path separator, mark this as the end of our
            // extension
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46/*.*/) {
            // If this is our first dot, mark it as the start of our extension
            if (startDot === -1) {
                startDot = i;
            }
            else if (preDotState !== 1) {
                preDotState = 1;
            }
        } else if (startDot !== -1) {
            // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
    }

    if (startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
            startDot === end - 1 &&
            startDot === startPart + 1)) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(rootEnd, end);
            }
            else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(rootEnd, startDot);
            ret.base = path.slice(rootEnd, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) {
        ret.dir = path.slice(0, startPart - 1);
    }
    else if (isAbsolute) {
        ret.dir = path.slice(0, rootEnd);
    }

    return ret;
};


win32.sep = '\\';
win32.delimiter = ';';


// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};


function posixSplitPath(filename) {
    var out = splitPathRe.exec(filename);
    out.shift();
    return out;
}


// path.resolve([from ...], to)
// posix version
posix.resolve = function () {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path = (i >= 0) ? arguments[i] : process.cwd();

        assertPath(path);

        // Skip empty entries
        if (path === '') {
            continue;
        }

        resolvedPath = path + '/' + resolvedPath;
        resolvedAbsolute = path[0] === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(resolvedPath.split('/'),
        !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
posix.normalize = function (path) {
    assertPath(path);

    var isAbsolute = posix.isAbsolute(path),
        trailingSlash = path && path[path.length - 1] === '/';

    // Normalize the path
    path = normalizeArray(path.split('/'), !isAbsolute).join('/');

    if (!path && !isAbsolute) {
        path = '.';
    }
    if (path && trailingSlash) {
        path += '/';
    }

    return (isAbsolute ? '/' : '') + path;
};

// posix version
posix.isAbsolute = function (path) {
    assertPath(path);
    return !!path && path[0] === '/';
};

// posix version
posix.join = function () {
    var path = '';
    for (var i = 0; i < arguments.length; i++) {
        var segment = arguments[i];
        assertPath(segment);
        if (segment) {
            if (!path) {
                path += segment;
            } else {
                path += '/' + segment;
            }
        }
    }
    return posix.normalize(path);
};


// path.relative(from, to)
// posix version
posix.relative = function (from, to) {
    assertPath(from);
    assertPath(to);

    from = posix.resolve(from).substr(1);
    to = posix.resolve(to).substr(1);

    var fromParts = trimArray(from.split('/'));
    var toParts = trimArray(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    var i;
    for (i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
        }
    }

    var outputParts = [];
    for (i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
};


posix._makeLong = function (path) {
    return path;
};


posix.dirname = function (path) {
    var result = posixSplitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
        // No dirname whatsoever
        return '.';
    }

    if (dir) {
        // It has a dirname, strip trailing slash
        dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
};


posix.basename = function (path, ext) {
    if (ext !== undefined && typeof ext !== 'string') {
        throw new TypeError('"ext" argument must be a string');
    }

    var f = posixSplitPath(path)[2];

    if (ext && f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
    }
    return f;
};


posix.extname = function (path) {
    return posixSplitPath(path)[3];
};

posix.format = function (pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new TypeError(
            'Parameter "pathObject" must be an object, not ' + typeof pathObject
        );
    }

    return _format('/', pathObject);
};

posix.parse = function (path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) {
        return ret;
    }
    var code = path.charCodeAt(0);
    var isAbsolute = (code === 47/*/*/);
    var start;
    if (isAbsolute) {
        ret.root = '/';
        start = 1;
    } else {
        start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
        code = path.charCodeAt(i);
        if (code === 47/*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
                startPart = i + 1;
                break;
            }
            continue;
        }
        if (end === -1) {
            // We saw the first non-path separator, mark this as the end of our
            // extension
            matchedSlash = false;
            end = i + 1;
        }
        if (code === 46/*.*/) {
            // If this is our first dot, mark it as the start of our extension
            if (startDot === -1) {
                startDot = i;
            }
            else if (preDotState !== 1) {
                preDotState = 1;
            }
        } else if (startDot !== -1) {
            // We saw a non-dot and non-path separator before our dot, so we should
            // have a good chance at having a non-empty extension
            preDotState = -1;
        }
    }

    if (startDot === -1 ||
        end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        (preDotState === 1 &&
            startDot === end - 1 &&
            startDot === startPart + 1)) {
        if (end !== -1) {
            if (startPart === 0 && isAbsolute) {
                ret.base = ret.name = path.slice(1, end);
            }
            else {
                ret.base = ret.name = path.slice(startPart, end);
            }
        }
    } else {
        if (startPart === 0 && isAbsolute) {
            ret.name = path.slice(1, startDot);
            ret.base = path.slice(1, end);
        } else {
            ret.name = path.slice(startPart, startDot);
            ret.base = path.slice(startPart, end);
        }
        ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) {
        ret.dir = path.slice(0, startPart - 1);
    }
    else if (isAbsolute) {
        ret.dir = '/';
    }

    return ret;
};

posix.sep = '/';
posix.delimiter = ':';

if (isWindows) {
    module.exports = win32;
}
else {
    // posix
    module.exports = posix;
}

module.exports.posix = posix;
module.exports.win32 = win32;
