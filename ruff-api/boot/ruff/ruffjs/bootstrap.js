function bootstrap(process) {
    var EMBEDDED_PREFIX = '~embedded~/';

    function parseEmbeddedCompressedBytecode(data) {
        var offset = 0;
        var map = {};

        while (offset < data.length) {
            var filenameLength = data.readUInt8(offset);
            offset += 1; // NAME_LENGTH_BYTES

            var filename = data.toString('utf-8', offset, offset + filenameLength);
            offset += filenameLength;

            var compressedBytecodeLength = data.readUInt32BE(offset);
            offset += 4; // CONTENT_LENGTH_BYTES
            var compressedBytecode = new Buffer(data.slice(offset, offset + compressedBytecodeLength));
            offset += compressedBytecodeLength;

            // eslint-disable-next-line new-cap
            map[EMBEDDED_PREFIX + filename] = Uint8Array.plainOf(compressedBytecode);
        }

        return map;
    }

    var ruffExtension;
    var path;

    var embeddedCompressedBytecodeMap = parseEmbeddedCompressedBytecode(new Buffer(process.getBuildinJs()));

    delete process.getBuildinJs;

    function resolveNativeModule(parent, id) {
        var tryName = EMBEDDED_PREFIX + id;

        if (hasOwnProperty.call(embeddedCompressedBytecodeMap, tryName)) {
            return tryName;
        } else if (path) {
            if (/\.js$/.test(id)) {
                // js file case
                var dir = path.dirname(id);

                tryName = EMBEDDED_PREFIX + path.join(dir, id);

                if (hasOwnProperty.call(embeddedCompressedBytecodeMap, tryName)) {
                    return tryName;
                }
            } else {
                // handle module case
                tryName = EMBEDDED_PREFIX + path.join(id, 'src/index.js');

                if (hasOwnProperty.call(embeddedCompressedBytecodeMap, tryName)) {
                    return tryName;
                }
            }
        }

        return undefined;
    }

    var originalModLoad = Duktape.modLoad;
    var originalModCompile = Duktape.modCompile;

    Duktape.modResolve = function (id) {
        var resolvedNativeModuleId = resolveNativeModule(this.id, id);

        if (resolvedNativeModuleId) {
            return resolvedNativeModuleId;
        } else if (ruffExtension) {
            return path.join(ruffExtension.modResolve.call(this, id));
        } else {
            throw new Error('Cannot find module \'' + id + '\'');
        }
    };

    Duktape.modLoad = function () {
        var id = this.id;

        if (hasOwnProperty.call(embeddedCompressedBytecodeMap, id)) {
            return Duktape.modCompile.call(this, embeddedCompressedBytecodeMap[id]);
        } else if (ruffExtension) {
            return ruffExtension.modLoad.call(this, originalModLoad);
        } else {
            return originalModLoad.call(this);
        }
    };

    var remoteConsoleEnabled = process.argv.indexOf('--console') >= 0;

    Duktape.modCompile = function (code) {
        if (typeof code === 'string') {
            if (code.substr(0, 2) === '#!') {
                code = '//' + code;
            }

            code =
                'function (__filename, __dirname, module, exports, require) {' + code + '\n' +
                ';eval(arguments[arguments.length - 1]);}';
        } else {
            code = uv.inflate(code, 0);
        }

        require.resolve = Duktape.modResolve.bind(this);

        var injection;

        if (remoteConsoleEnabled && this.id === global.__appEntry) {
            injection = 'require("_console_eval").eval=function(){return eval(arguments[0]);};';
        }
        return originalModCompile.call(this, code, injection);
    };

    global.process = process;

    process.hrtime = function (tic) {
        if (!tic) {
            tic = [ 0, 0 ];
        }
        var elasped = uv.hrtime() - (tic[0] * 1e9 + tic[1]);
        var sec = Math.floor(elasped / 1e9);
        var ns = elasped - sec * 1e9;
        return [ sec, ns ];
    };

    /*
    this.require('startup.js')(process);
    */
    path = this.require('path');

    var env = process.env;
    process.env = {};
    for (var i = 0; i < env.length; i++) {
        var kv = env[i];
        var index = kv.indexOf('=');
        var key = kv.slice(0, index);
        var value = kv.slice(index + 1, kv.length);
        process.env[key] = value;
    }
    process.cwd = uv.cwd;
    ruffExtension = this.require('duktapeExtension.js')(this, process);

    this.require('ruffEnvironment.js');
    this.require('startup.js')(this, process);
}
