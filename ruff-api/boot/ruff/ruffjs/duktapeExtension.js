var path = require('path');

function duktapeExtension(_this, process) {
    var debugEnvironmentVariable = process.env.RUFF_DEBUG || '';
    var debugEnabled = /\bDEBUG_RUFF\b/i.test(debugEnvironmentVariable);

    function debugLog(msg) {
        if (debugEnabled) {
            print('DEBUG_RUFF_LOG', msg);
        }
    }

    var Module = _this.require('module.js');

    return {
        modResolve: function(id) {
            debugLog('modResolve: this.id[' + this.id + '] id[' + id + ']');
            return Module.resolve(id, this.id);
        },

        modLoad: function(loader) {
            debugLog('modLoad: this.id[' + this.id + ']');
            Module.loadAs(this, loader);
        }
    };
}

module.exports = duktapeExtension;
