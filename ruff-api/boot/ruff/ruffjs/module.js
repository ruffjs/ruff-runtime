'use strict';

var path = require('path');

var hop = Object.prototype.hasOwnProperty;

var RUFF_HOME = process.env.RUFF_SDK_PATH || process.env.RUFF_HOME || path.join(uv.exepath(), '../..');

// Cache is important as file system operation is slow on board.
// There are two kinds of caches for resolving paths and module names separately:
// 1. For paths, the key is `searchPath` because it's relatively cheap to `path.resolve(dir, name)`.
// 2. For module names, the key is a combination of `dir` and `name`.
//    As requiring the same module from files of the same directory should result the same.

var modulePathToPathCache = {};
var moduleDirAndNameToCache = {};

function resolve(name, parent) {
    var dir = path.dirname(parent);
    var targetPath;

    if (/^\.{1,2}/.test(name) || path.isAbsolute(name)) {
        var searchPath = path.resolve(dir, name);

        if (hop.call(modulePathToPathCache, searchPath)) {
            return modulePathToPathCache[searchPath];
        }

        targetPath = loadAsFile(searchPath) || loadAsDirectory(searchPath);

        if (targetPath) {
            modulePathToPathCache[searchPath] = targetPath;
            return targetPath;
        }
    } else {
        var cacheKey = dir + '\n' + name;

        if (hop.call(moduleDirAndNameToCache, cacheKey)) {
            return moduleDirAndNameToCache[cacheKey];
        }

        targetPath = loadRuffModules(name, dir);

        if (targetPath) {
            moduleDirAndNameToCache[cacheKey] = targetPath;
            return targetPath;
        }
    }

    if (/~embedded~/.test(parent)) {
        print('Cannot find module "' + name + '"');
        process.exit(1);
    }

    throw new Error('Cannot find module "' + name + '"');
}

exports.resolve = resolve;

function loadAs(module, loader) {
    var filePath = module.id;

    var extname = path.extname(filePath);

    if (extname === '.json') {
        module.exports = JSON.parse(bufferToString(readFileSync(filePath)));
    } else if (extname === '.so' || extname === '.dll') {
        loader.call(module);
    } else {
        var bcFilePath = filePath + '.bc';

        if (isFileSync(bcFilePath)) {
            Duktape.modCompile.call(module, readFileSync(bcFilePath));
        } else {
            Duktape.modCompile.call(module, bufferToString(readFileSync(filePath)));
        }
    }
}

exports.loadAs = loadAs;

var fileStatsCache = {};

function statSync(filePath) {
    if (hop.call(fileStatsCache, filePath)) {
        return fileStatsCache[filePath];
    }

    var stats;

    try {
        stats = uv.fs_stat(filePath);
    } catch (e) { }

    fileStatsCache[filePath] = stats;

    return stats;
}

function isFileSync(filePath) {
    var stats = statSync(filePath);
    return stats ? stats.type === 'file' : false;
}

function isFileOrHasByteCodeSync(filePath) {
    return isFileSync(filePath) || /\.js$/i.test(filePath) && isFileSync(filePath + '.bc');
}

function readFileSync(path) {
    var stats = uv.fs_stat(path);
    var fd = uv.fs_open(path, 'r', parseInt('666', 8));

    var buffer = uv.fs_read(fd, stats.size, 0, 0);

    uv.fs_close(fd);

    return buffer;
}

var possibleFileExtensions = [
    '',
    '.js',
    '.json',
    '.so',
    '.dll'
];

function loadAsFile(filePath) {
    for (var i = 0; i < possibleFileExtensions.length; i++) {
        var possibleFilePath = filePath + possibleFileExtensions[i];

        if (isFileOrHasByteCodeSync(possibleFilePath)) {
            return possibleFilePath;
        }
    }

    return undefined;
}

var possibleIndexFileNames = [
    'index.js',
    'src/index.js',
    'index.json',
    'src/index.json',
    'index.so',
    'index.dll'
];

var _decoder = new TextDecoder('utf-8');

function bufferToString(buffer) {
    return _decoder.decode(buffer);
}

function loadAsDirectory(dir) {
    var packageFilePath = path.join(dir, 'package.json');

    if (isFileOrHasByteCodeSync(packageFilePath)) {
        var json = bufferToString(readFileSync(packageFilePath));
        var data = JSON.parse(json);
        var main = data.main;

        if (main) {
            return loadAsFile(path.join(dir, main));
        }
    }

    for (var i = 0; i < possibleIndexFileNames.length; i++) {
        var possibleFilePath = path.join(dir, possibleIndexFileNames[i]);

        if (isFileOrHasByteCodeSync(possibleFilePath)) {
            return possibleFilePath;
        }
    }

    return undefined;
}

function loadRuffModules(name, start) {
    var dirs = getRuffModulesPaths(start);

    for (var i = 0; i < dirs.length; i++) {
        var searchPath = path.join(dirs[i], name);
        var targetPath = loadAsFile(searchPath) || loadAsDirectory(searchPath);

        if (targetPath) {
            return targetPath;
        }
    }

    return undefined;
}

var splitRe = process.platform === 'win32' ? /[\/\\]/ : /\//;
var defaultRuffModulesPath = path.join(RUFF_HOME, 'ruff_modules');

function getRuffModulesPaths(start) {
    var parts = path
        .resolve(start)
        .split(splitRe);

    var dirs = [defaultRuffModulesPath];

    for (var i = parts.length - 1; i >= 0; i--) {
        if (parts[i] === 'ruff_modules') {
            continue;
        }

        var dirPaths = parts.slice(0, i + 1);
        dirPaths.push('ruff_modules');

        var dir = dirPaths.join(path.sep);
        dirs.push(dir);
    }

    return dirs;
}
