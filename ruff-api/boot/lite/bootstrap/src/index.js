'use strict';

global.console = {};
global.console.log = print;
global.log = Object.create(null);

console.log('loading...');
//-----------------------------------------------------------------------------

var posix = {};

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

posix.isAbsolute = function (path) {
    return !!path && path[0] === '/';
};

posix.normalize = function (path) {
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

posix.join = function () {
    var path = '';
    for (var i = 0; i < arguments.length; i++) {
        var segment = arguments[i];
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

posix.dirname = function (path) {
    var off = path.lastIndexOf('/');
    return off >= 0 ? path.substr(0, off) : '.';
};

var path = posix;

function modResolve(fromId, id) {
    var resolvedId = null;

    do {
        // guess: relative path
        //if (/^\.{1,2}\//.test(id)) {
        if (id[0] === '.') {
            resolvedId = path.join(path.dirname(fromId), id);
            if (ruff.hasfile(resolvedId)) {
                break;
            }
            resolvedId += '.js';
            if (ruff.hasfile(resolvedId)) {
                break;
            }
        }

        // guess: absolute path
        resolvedId = id;
        if (ruff.hasfile(resolvedId)) {
            break;
        }

        // guess: inside module folder
        resolvedId = path.join('ruff_modules', id + '.js');
        if (ruff.hasfile(resolvedId)) {
            break;
        }

        // guess: entry is "index.js"
        resolvedId = path.join('ruff_modules', id, 'index.js');
        if (ruff.hasfile(resolvedId)) {
            break;
        }

        // guess: entry is "src/index.js"
        resolvedId = path.join('ruff_modules', id, 'src', 'index.js');
        if (ruff.hasfile(resolvedId)) {
            break;
        }

        // guess: entry relies on "package.json"
        var packageJson = path.join('ruff_modules', id, 'package.json');
        if (ruff.hasfile(packageJson)) {
            var jsonData = ruff.loadfile(packageJson);
            if (jsonData) {
                var jsonObject = JSON.parse(jsonData);
                if (jsonObject.main) {
                    resolvedId = jsonObject.main;
                    if (ruff.hasfile(resolvedId)) {
                        break;
                    }
                }
            }
        }

        throw new Error('Cannot find module \'' + id + '\'');
    } while (false);

    return resolvedId;
}

function modCompile(code) {
    var opening = '(function(exports,require,module,__filename,__dirname){\n';
    var closing = '\n});';
    var compiled =  ruff.compile(opening + code + closing);
    return compiled;
}

// setup `require`, `exports` for a module
function initModule(module) {
    // NOTE: Never overwrite `module.id`, be careful to overwrite `module.exports`.
    var text;
    var notLib = module.id.lastIndexOf('.so') < 0;
    if (notLib) {
        var notJson = module.id.lastIndexOf('.json') < 0;
        if (notJson) {
            var filename = module.id;
            var dirname = path.dirname(filename);
            module.require = makeRequire(filename);

            Object.defineProperty(module, 'id', {
                value: module.id,
                writable: false
            });

            if (ruff.isByteCodeFile(filename)) {
                ruff.runByteCodeFromFile.call(module,
                                                 module.id,
                                                 module.exports,
                                                 module.require,
                                                 module,
                                                 filename,
                                                 dirname);
            } else {
                text = ruff.loadfile(module.id);
                var func;
                try {
                    func = modCompile(text);
                } catch (error) {
                    log.error('Failed to compile', '"' + module.id + '"');
                }
                try {
                    func.call(module, module.exports, module.require, module, filename, dirname);
                } catch (error) {
                    log.error(error);
                    log.error('Failed to load', '"' + module.id + '"');
                    throw(error);
                }
            }
        } else {
            if (ruff.isByteCodeFile(module.id)) {
                module.exports = ruff.runByteCodeFromFile.call(module, module.id);
            } else {
                text = ruff.loadfile(module.id);
                try {
                    module.exports = JSON.parse(text);
                } catch(error) {
                    log.error('error parse json', module.id, error);
                }
            }
        }
    } else {
        module.exports = ruff.loadlib(module.id);
    }
}

var cachedModules = Object.create(null);

function makeRequire(fromId) {
    return function (id) {
        var resolvedId = modResolve(fromId, id);
        // console.log(fromId, '=>', id, '=>', resolvedId);
        var module = cachedModules[resolvedId];
        if (!module) {
            module = {
                id: resolvedId,
                exports: {
                }
            };
            // To support circular `require`,
            // module should be put into cached before init.
            cachedModules[resolvedId] = module;
            initModule(module);
        }
        return module.exports;
    };
}

var require = makeRequire('bootstrap');
require('startup');
