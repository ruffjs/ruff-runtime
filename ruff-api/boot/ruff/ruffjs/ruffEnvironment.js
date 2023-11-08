var Path = require('path');

const TEXT_MAX_SIZE = 2048;
const MAC_PATTERN = new RegExp('^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$');

//-----------------------------------------------------------------------------

function fileExists(path) {
    try {
        uv.fs_stat(path);
        return true;
    } catch (e) {
        return false;
    }
}

function readAll(path, max) {
    var fd = uv.fs_open(path, 'r', 0);
    if (fd < 0) {
        throw new Error('Unable to read: ' + path);
    }
    var buf = uv.fs_read(fd, max, 0);
    if (buf.length === max) {
        throw new Error('Might be a short read!');
    }
    uv.fs_close(fd);
    return buf;
}

function readAllText(path) {
    var text = new Buffer(readAll(path, TEXT_MAX_SIZE)).toString();
    var ch = text.charCodeAt(text.length-1);
    // strip tailling '\0' and '\n';
    return [0, 10].indexOf(ch) != -1 ? text.slice(0, -1) : text;
}

function readPartial(path, offset, length) {
    var fd = uv.fs_open(path, 'r', 0);
    if (fd < 0) {
        throw new Error('Unable to read: ' + path);
    }
    var buf = uv.fs_read(fd, length, offset);
    uv.fs_close(fd);
    return buf;
}

//-----------------------------------------------------------------------------

process.ruff = { };

var initRuffEnv = function() {
    process.ruff.sn = '';
    process.ruff.mac = '';
    process.ruff.key0 = '';
};

var initWin32Env = initRuffEnv;

var initDarwinEnv = initRuffEnv;

var initLinuxEnv = function() {
    var PATH_MAC = '/sys/class/net/eth0/address';
    var PATH_RUFF_BOARD = '/sys/firmware/devicetree/base/ruff_board/';
    var PATH_MTD_MAP = '/proc/mtd';
    var PATH_MTD_DIR = '/dev/';

    var MTD_ITEMS = [
        {
            id: 'MAC',
            parse: function(file, offset, length) {
                var dataBuf = readPartial(file, offset, length);
                return Duktape.enc('hex', dataBuf);
            }
        },
        {
            id: 'SerialNumber',
            parse: function(file, offset, length) {
                var lenBuf = readPartial(file, offset, 2);
                if (lenBuf[0] == 0xff && lenBuf[1] == 0xff) {
                    return "";
                }
                var len = (lenBuf[0] << 8) | lenBuf[1];
                offset += lenBuf.length;
                var dataBuf = readPartial(file, offset, len);
                var sn = new Buffer(dataBuf).toString();
                for (var i = 0; i < sn.length; ++i) {
                    if (sn[i] < ' ' || sn[i] > '~') {
                        sn = '';
                        break;
                    }
                }
                return sn;
            }
        },
        {
            id: 'Key0',
            parse: function(file, offset, length) {
                var lenBuf = readPartial(file, offset, 2);
                if (lenBuf[0] == 0xff && lenBuf[1] == 0xff) {
                    return "";
                }
                offset += lenBuf.length;
                var len = (lenBuf[0] << 8) | lenBuf[1];
                var dataBuf = readPartial(file, offset, len);
                return Duktape.enc('hex', dataBuf);
            }
        }
    ];

    var MTD_NAME = 'position';
    var MTD_OFFSET = 'address';
    var MTD_LENGTH = 'length';

    //-----------------------------------------------------------------------------

    /* check for PC
     */
    var isPC = !fileExists(PATH_RUFF_BOARD);
    if (isPC) {
        initRuffEnv();
        return;
    }

    /* check for mtd items
     * NOTE:
     * Unable to determine whether it is the first batch board yet.
     */
    var hasMtdItems = (function() {
        for (var i = 0; i < MTD_ITEMS.length; ++i) {
            var name = MTD_ITEMS[i].id;
            var path = Path.join(PATH_RUFF_BOARD, name);
            if (!fileExists(path)) {
                return false;
            }
        }
        return true;
    })();

    if (!hasMtdItems) {
        var mac = readAllText(PATH_MAC);
        if (!MAC_PATTERN.test(mac)) {
            throw new Error('Fail to get mac: "' + mac + '"');
        }
        mac = mac.split(':').join('');
        process.ruff.mac = mac;
        process.ruff.sn = '';
        process.ruff.key0 = '';
        return;
    }

    /* Try to parse and fetch mtd info
     */
    function parseMtdMap(path) {
        var mtdMap = {};

        var text = readAllText(path);
        for (var offset = 0; offset < text.length;) {
            var begin = text.indexOf('mtd', offset);
            if (begin < 0) break;
            offset = begin + 1;
            var end = text.indexOf(':', offset);
            if (end < 0) break;
            offset = end + 1;
            var id = text.substr(begin, end-begin);

            begin = text.indexOf('"', offset);
            if (begin < 0) break;
            offset = begin + 1;
            end = text.indexOf('"', offset);
            if (end < 0) break;
            offset = end + 1;
            var name = text.substr(begin+1, end-begin-1);

            mtdMap[name] = id;
        }

        return mtdMap;
    }

    var mtdMap = parseMtdMap(PATH_MTD_MAP, TEXT_MAX_SIZE);

    //-----------------------------------------------------------------------------

    function fetchAllMtds(mtdMap) {
        var mtd = {};

        function fetchMtd(item) {
            var id = item.id;
            var parse = item.parse;

            var dir = Path.join(PATH_RUFF_BOARD, id);
            var name = readAllText(Path.join(dir, MTD_NAME));
            var offset = parseInt(readAllText(Path.join(dir, MTD_OFFSET)), 'hex');
            var length = parseInt(readAllText(Path.join(dir, MTD_LENGTH)), 'hex');

            var mtdFile = Path.join(PATH_MTD_DIR, mtdMap[name]);
            mtd[id] = parse(mtdFile, offset, length);
        }

        MTD_ITEMS.forEach(fetchMtd);

        return mtd;
    }

    var mtd;
    function ruffGet(id) {
        if (!mtd) {
            mtd = fetchAllMtds(mtdMap);
        }
        return mtd[id];
    }

    Object.defineProperties(process.ruff, {
        'mac': {
            get: ruffGet.bind(null, 'MAC')
        },
        'sn': {
            get: ruffGet.bind(null, 'SerialNumber')
        },
		'key0': {
            get: ruffGet.bind(null, 'Key0')
        }
    });

};

var initPlatformEnv = Object.freeze({
    'win32': initWin32Env,
    'darwin': initDarwinEnv,
    'linux': initLinuxEnv
});

if (typeof initPlatformEnv[process.platform] === 'function') {
    initPlatformEnv[process.platform]();
} else {
    throw new Error('Platform unknown');
}
