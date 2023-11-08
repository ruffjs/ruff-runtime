'use strict';

var assert = require('assert');

exports['test should ensure unique value is always copied'] = function () {
    var buffer = Buffer.alloc(1024); // safe constructor

    assert.strictEqual(1024, buffer.length);
    buffer[0] = -1;

    assert.strictEqual(buffer[0], 255);
    for (var i = 0; i < 1024; i++) {
        var value = i % 256;
        buffer[i] = value;
        assert.strictEqual(value, buffer[i]);
    }
};

exports['test should throw exception when pass invalidate parameter to fill'] = function () {
    assert.throws(function () {
        Buffer(8).fill('a', -1);
    });

    assert.throws(function () {
        Buffer(8).fill('a', 0, 9);
    });
};

exports['test should fill'] = function () {
    var buffer = Buffer.alloc(1024); // safe constructor
    var position = 0;
    var buffer2 = new Buffer(512);

    var buf = Buffer.alloc(64);
    buf.fill(10);
    for (var i = 0; i < buf.length; i++)
        assert.equal(buf[i], 10);

    buf.fill(11, 0, buf.length >> 1);
    for (var i = 0; i < (buf.length >> 1); i++)
        assert.equal(buf[i], 11);
    for (var i = (buf.length >> 1) + 1; i < buf.length; i++)
        assert.equal(buf[i], 10);

    buf.fill('h');
    for (var i = 0; i < buf.length; i++)
        assert.equal('h'.charCodeAt(0), buf[i]);

    buf.fill(0);
    for (var i = 0; i < buf.length; i++)
        assert.equal(0, buf[i]);

    buf.fill(null);
    for (var i = 0; i < buf.length; i++)
        assert.equal(0, buf[i]);

    buf.fill(1, 16, 32);
    for (var i = 0; i < 16; i++)
        assert.equal(0, buf[i]);
    for (; i < 32; i++)
        assert.equal(1, buf[i]);
    for (; i < buf.length; i++)
        assert.equal(0, buf[i]);
};

exports['test should copy'] = function () {
    var position = 0;
    var buffer1 = new Buffer(1024); // safe constructor
    var buffer2 = new Buffer(512);

    // try to copy from before the beginning of buffer1
    buffer1.copy(buffer2, 0, 100, 10);

    // copy throws at negative sourceStart
    assert.throws(function () {
        new Buffer(5).copy(new Buffer(5), 0, -1);
    }, RangeError);

    // check sourceEnd resets to targetEnd if former is greater than the latter
    buffer1.fill(++position);
    buffer2.fill(++position);
    buffer1.copy(buffer2, 0, 0, 1025);
    for (var i = 0; i < buffer2.length; i++) {
        assert.strictEqual(buffer1[i], buffer2[i]);
    }

    // throw with negative sourceEnd
    assert.throws(function () {
        buffer1.copy(buffer2, 0, 0, -1);
    }, RangeError);

    // when sourceStart is greater than sourceEnd, zero copied
    assert.equal(buffer1.copy(buffer2, 0, 100, 10), 0);

    // when targetStart > targetLength, zero copied
    assert.equal(buffer1.copy(buffer2, 512, 0, 10), 0);

    // try to copy 0 bytes worth of data into an empty buffer
    buffer1.copy(new Buffer(0), 0, 0, 0);

// try to copy 0 bytes past the end of the target buffer
    buffer1.copy(new Buffer(0), 1, 1, 1);
    buffer1.copy(new Buffer(1), 1, 1, 1);

// try to copy 0 bytes from past the end of the source buffer
    buffer1.copy(new Buffer(1), 0, 2048, 2048);

    // Test Buffer.copy() segfault
    assert.throws(function () {
        Buffer(10).copy();
    });
};

/*
exports['test should toString'] = function () {
// invalid encoding for Buffer.toString
    var caught_error = null;
    try {
        Buffer(1024).toString('invalid');
    } catch (err) {
        caught_error = err;
    }
    assert.strictEqual('Unknown encoding: invalid', caught_error.message);
};
*/

exports['test should write(U)IntLE/BE'] = function () {
    (function () {
        var buf = new Buffer(3);
        buf.writeUIntLE(0x123456, 0, 3);
        //assert.deepEqual(buf.toJSON().data, [0x56, 0x34, 0x12]);
        assert.equal(buf.readUIntLE(0, 3), 0x123456);

        buf = new Buffer(3);
        buf.writeUIntBE(0x123456, 0, 3);
        //assert.deepEqual(buf.toJSON().data, [0x12, 0x34, 0x56]);
        assert.equal(buf.readUIntBE(0, 3), 0x123456);

        buf = new Buffer(3);
        buf.writeIntLE(0x123456, 0, 3);
        //assert.deepEqual(buf.toJSON().data, [0x56, 0x34, 0x12]);
        assert.equal(buf.readIntLE(0, 3), 0x123456);

        buf = new Buffer(3);
        buf.writeIntBE(0x123456, 0, 3);
        //assert.deepEqual(buf.toJSON().data, [0x12, 0x34, 0x56]);
        assert.equal(buf.readIntBE(0, 3), 0x123456);

        buf = new Buffer(3);
        buf.writeIntLE(-0x123456, 0, 3);
        //assert.deepEqual(buf.toJSON().data, [0xaa, 0xcb, 0xed]);
        assert.equal(buf.readIntLE(0, 3), -0x123456);

        buf = new Buffer(3);
        buf.writeIntBE(-0x123456, 0, 3);
        //assert.deepEqual(buf.toJSON().data, [0xed, 0xcb, 0xaa]);
        assert.equal(buf.readIntBE(0, 3), -0x123456);

        buf = new Buffer(5);
        buf.writeUIntLE(0x1234567890, 0, 5);
        //assert.deepEqual(buf.toJSON().data, [0x90, 0x78, 0x56, 0x34, 0x12]);
        assert.equal(buf.readUIntLE(0, 5), 0x1234567890);

        buf = new Buffer(5);
        buf.writeUIntBE(0x1234567890, 0, 5);
        //assert.deepEqual(buf.toJSON().data, [0x12, 0x34, 0x56, 0x78, 0x90]);
        assert.equal(buf.readUIntBE(0, 5), 0x1234567890);

        buf = new Buffer(5);
        buf.writeIntLE(0x1234567890, 0, 5);
        //assert.deepEqual(buf.toJSON().data, [0x90, 0x78, 0x56, 0x34, 0x12]);
        assert.equal(buf.readIntLE(0, 5), 0x1234567890);

        buf = new Buffer(5);
        buf.writeIntBE(0x1234567890, 0, 5);
        //assert.deepEqual(buf.toJSON().data, [0x12, 0x34, 0x56, 0x78, 0x90]);
        assert.equal(buf.readIntBE(0, 5), 0x1234567890);

        buf = new Buffer(5);
        buf.writeIntLE(-0x1234567890, 0, 5);
        //assert.deepEqual(buf.toJSON().data, [0x70, 0x87, 0xa9, 0xcb, 0xed]);
        assert.equal(buf.readIntLE(0, 5), -0x1234567890);

        buf = new Buffer(5);
        buf.writeIntBE(-0x1234567890, 0, 5);
        //assert.deepEqual(buf.toJSON().data, [0xed, 0xcb, 0xa9, 0x87, 0x70]);
        assert.equal(buf.readIntBE(0, 5), -0x1234567890);
    })();
};

exports['test should read(U)IntLE/BE'] = function () {
    (function () {
        var buf = new Buffer([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);

        assert.equal(buf.readUIntLE(0, 1), 0x01);
        assert.equal(buf.readUIntBE(0, 1), 0x01);
        assert.equal(buf.readUIntLE(0, 3), 0x030201);
        assert.equal(buf.readUIntBE(0, 3), 0x010203);
        assert.equal(buf.readUIntLE(0, 5), 0x0504030201);
        assert.equal(buf.readUIntBE(0, 5), 0x0102030405);
        assert.equal(buf.readUIntLE(0, 6), 0x060504030201);
        assert.equal(buf.readUIntBE(0, 6), 0x010203040506);
        assert.equal(buf.readIntLE(0, 1), 0x01);
        assert.equal(buf.readIntBE(0, 1), 0x01);
        assert.equal(buf.readIntLE(0, 3), 0x030201);
        assert.equal(buf.readIntBE(0, 3), 0x010203);
        assert.equal(buf.readIntLE(0, 5), 0x0504030201);
        assert.equal(buf.readIntBE(0, 5), 0x0102030405);
        assert.equal(buf.readIntLE(0, 6), 0x060504030201);
        assert.equal(buf.readIntBE(0, 6), 0x010203040506);
    })();
};

/*
exports['test should write'] = function () {
    var b = Buffer(1024); // safe constructor
// invalid encoding for Buffer.write
    var caught_error = null;
    try {
        b.write('test string', 0, 5, 'invalid');
    } catch (err) {
        caught_error = err;
    }
    assert.strictEqual('Unknown encoding: invalid', caught_error.message);

    // try to write a 0-length string beyond the end of b
    assert.throws(function () {
        b.write('', 2048);
    }, RangeError);

    // throw when writing to negative offset
    assert.throws(function () {
        b.write('a', -1);
    }, RangeError);

    // throw when writing past bounds from the pool
    assert.throws(function () {
        b.write('a', 2048);
    }, RangeError);

    // throw when writing to negative offset
    assert.throws(function () {
        b.write('a', -1);
    }, RangeError);

    // Ensure that the length argument is respected.
    'ascii utf8 hex base64 binary'.split(' ').forEach(function (enc) {
        assert.equal(Buffer(1).write('aaaaaa', 0, 1, enc), 1);
    });
};
*/

exports['test should create new Buffer'] = function () {
    // try to create 0-length buffers
    var buffer1 = new Buffer('');
    //var buffer2 = new Buffer('', 'binary');
    var buffer3 = new Buffer(0);

    assert.equal(buffer1.length, 0);
    //assert.equal(buffer2.length, 0);
    assert.equal(buffer3.length, 0);

    assert.equal(buffer1 instanceof Buffer, true);
    //assert.equal(buffer2 instanceof Buffer, true);
    assert.equal(buffer3 instanceof Buffer, true);
};

/*
exports['test should constructor handle encodings correctly'] = function () {
    var cases = [
        {
            text: '~哈',
            encodings: [undefined, 'utf8', 'utf-8'],
            buffer: new Buffer([0x7e, 0xe5, 0x93, 0x88])
        },
        {
            text: '~哈',
            encodings: ['utf16le', 'utf-16le', 'ucs2', 'ucs-2'],
            buffer: new Buffer([0x7e, 0x00, 0xc8, 0x54])
        },
        {
            text: '0102abac',
            encodings: ['hex'],
            buffer: new Buffer([0x01, 0x02, 0xab, 0xac])
        },
        {
            text: 'AQKrrA==',
            encodings: ['base64'],
            buffer: new Buffer([0x01, 0x02, 0xab, 0xac])
        },
        {
            text: '\xff\xee',
            encodings: ['binary', 'ascii'],
            buffer: new Buffer([0xff, 0xee])
        }
    ];

    cases.forEach(function (testCase) {
        testCase.encodings.forEach(function (encoding) {
            var buffer = new Buffer(testCase.text, encoding);

            assert.equal(buffer.compare(testCase.buffer), 0);

            if (encoding !== 'ascii') {
                assert.equal(buffer.toString(encoding), testCase.text);
            }
        });
    });
};

exports['test should toString a 0-length slice of a buffer'] = function () {
    assert.equal(new Buffer('abc').toString('ascii', 0, 0), '');
    assert.equal(new Buffer('abc').toString('ascii', -100, -100), '');
    assert.equal(new Buffer('abc').toString('ascii', 100, 100), '');
};

exports['test should test for smart defaults and ability to pass string values as offset'] = function () {
    var writeTest = new Buffer('abcdes');
    writeTest.write('n', 'ascii');
    writeTest.write('o', '1', 'ascii');
    writeTest.write('d', '2', 'ascii');
    writeTest.write('e', 3, 'ascii');
    writeTest.write('j', 4, 'ascii');
    assert.equal(writeTest.toString(), 'nodejs');
};

exports['test should work in ASCII slice'] = function () {
    var buf = Buffer(1024); // safe constructor
    var asciiString = 'hello world';
    var offset = 100;

    for (var i = 0; i < asciiString.length; i++) {
        buf[i] = asciiString.charCodeAt(i);
    }
    var asciiSlice = buf.toString('ascii', 0, asciiString.length);
    assert.equal(asciiString, asciiSlice);

    var written = buf.write(asciiString, offset, 'ascii');
    assert.equal(asciiString.length, written);
    var asciiSlice = buf.toString('ascii', offset, offset + asciiString.length);
    assert.equal(asciiString, asciiSlice);

    var sliceA = buf.slice(offset, offset + asciiString.length);
    var sliceB = buf.slice(offset, offset + asciiString.length);
    for (var i = 0; i < asciiString.length; i++) {
        assert.equal(sliceA[i], sliceB[i]);
    }

    var utf8String = '¡hέlló wôrld!';
    var offset = 100;

    buf.write(utf8String, 0, Buffer.byteLength(utf8String), 'utf8');
    var utf8Slice = buf.toString('utf8', 0, Buffer.byteLength(utf8String));
    assert.equal(utf8String, utf8Slice);

    var written = buf.write(utf8String, offset, 'utf8');
    assert.equal(Buffer.byteLength(utf8String), written);
    utf8Slice = buf.toString('utf8', offset, offset + Buffer.byteLength(utf8String));
    assert.equal(utf8String, utf8Slice);

    var sliceA = buf.slice(offset, offset + Buffer.byteLength(utf8String));
    var sliceB = buf.slice(offset, offset + Buffer.byteLength(utf8String));
    for (var i = 0; i < Buffer.byteLength(utf8String); i++) {
        assert.equal(sliceA[i], sliceB[i]);
    }

    var slice = buf.slice(100, 150);
    assert.equal(50, slice.length);
    for (var i = 0; i < 50; i++) {
        assert.equal(buf[100 + i], slice[i]);
    }
};

exports['test should isEncoding'] = function () {
    assert.equal(Buffer.isEncoding('hex'), true);

    ['hex',
        'utf8',
        'utf-8',
        'ascii',
        'binary',
        'base64',
        'ucs2',
        'ucs-2',
        'utf16le',
        'utf-16le'].forEach(function (enc) {
            assert.equal(Buffer.isEncoding(enc), true);
        });

    ['utf9',
        'utf-7',
        'Unicode-FTW',
        'new gnu gun'].forEach(function (enc) {
            assert.equal(Buffer.isEncoding(enc), false);
        });
};

exports['test should fix nodejs issues'] = function () {
    // issue GH-3416
    Buffer(Buffer(0), 0, 0);

    // GH-5110
    (function () {
        var buffer = new Buffer('test'),
            string = JSON.stringify(buffer);

        assert.equal(string, '{"type":"Buffer","data":[116,101,115,116]}');

        assert.deepEqual(buffer, JSON.parse(string, function (key, value) {
            return value && value.type === 'Buffer'
                ? new Buffer(value.data)
                : value;
        }));
    })();

    // issue GH-4331
    assert.throws(function () {
        new Buffer(0xFFFFFFFF);
    }, RangeError);
    assert.throws(function () {
        new Buffer(0xFFFFFFFFF);
    }, RangeError);

    // Regression test for #6111. Constructing a buffer from another buffer
    // should a) work, and b) not corrupt the source buffer.
    (function () {
        var a = [0];
        for (var i = 0; i < 7; ++i) a = a.concat(a);
        a = a.map(function (_, i) {
            return i;
        });
        var b = Buffer(a);
        var c = Buffer(b);
        assert.equal(b.length, a.length);
        assert.equal(c.length, a.length);
        for (var i = 0, k = a.length; i < k; ++i) {
            assert.equal(a[i], i);
            assert.equal(b[i], i);
            assert.equal(c[i], i);
        }
    })();

    // Regression test for https://github.com/nodejs/node/issues/649.
    assert.throws(function () {
        Buffer(1422561062959).toString('utf8');
    });
};
*/
exports['test should triple slice'] = function () {
    // Test triple  slice
    var a = new Buffer(8);
    for (var i = 0; i < 8; i++) a[i] = i;
    var b = a.slice(4, 8);
    assert.equal(4, b[0]);
    assert.equal(5, b[1]);
    assert.equal(6, b[2]);
    assert.equal(7, b[3]);
    var c = b.slice(2, 4);
    assert.equal(6, c[0]);
    assert.equal(7, c[1]);

    var d = new Buffer([23, 42, 255]);
    assert.equal(d.length, 3);
    assert.equal(d[0], 23);
    assert.equal(d[1], 42);
    assert.equal(d[2], 255);

    /*
    assert.deepEqual(d, new Buffer(d));

    var e = new Buffer('über');
    assert.deepEqual(e, new Buffer([195, 188, 98, 101, 114]));

    var arrayIsh = {0: 0, 1: 1, 2: 2, 3: 3, length: 4};
    var g = new Buffer(arrayIsh);
    assert.deepEqual(g, new Buffer([0, 1, 2, 3]));
    var strArrayIsh = {0: '0', 1: '1', 2: '2', 3: '3', length: 4};
    g = new Buffer(strArrayIsh);
    assert.deepEqual(g, new Buffer([0, 1, 2, 3]));
    */
};
/*
exports['test should create buffers larger than pool size'] = function () {
    // Creating buffers larger than pool size.
    var l = Buffer.poolSize + 5;
    var s = '';
    for (var i = 0; i < l; i++) {
        s += 'h';
    }

    var b = new Buffer(s);

    for (var i = 0; i < l; i++) {
        assert.equal('h'.charCodeAt(0), b[i]);
    }

    var sb = b.toString();
    assert.equal(sb.length, s.length);
    assert.equal(sb, s);
};

exports['test should run UTF-8 string includes null character'] = function () {
    // #1210 Test UTF-8 string includes null character
    var buf = new Buffer('\0');
    assert.equal(buf.length, 1);
    buf = new Buffer('\0\0');
    assert.equal(buf.length, 2);

    buf = new Buffer(2);
    var written = buf.write(''); // 0byte
    assert.equal(written, 0);
    written = buf.write('\0'); // 1byte (v8 adds null terminator)
    assert.equal(written, 1);
    written = buf.write('a\0'); // 1byte * 2
    assert.equal(written, 2);
    written = buf.write('あ'); // 3bytes
    assert.equal(written, 2);
    written = buf.write('\0あ'); // 1byte + 3bytes
    assert.equal(written, 2);
    written = buf.write('\0\0あ'); // 1byte * 2 + 3bytes
    assert.equal(written, 2);

    buf = new Buffer(10);
    written = buf.write('あいう'); // 3bytes * 3 (v8 adds null terminator)
    assert.equal(written, 9);
    written = buf.write('あいう\0'); // 3bytes * 3 + 1byte
    assert.equal(written, 10);
};
*/

exports['test should compare'] = function () {
    var b = new Buffer(1).fill('a');
    var c = new Buffer(1).fill('c');
    var d = new Buffer(2).fill('aa');

    assert.equal(b.compare(c), -1);
    assert.equal(c.compare(d), 1);
    assert.equal(d.compare(b), 1);
    assert.equal(b.compare(d), -1);
    assert.equal(b.compare(b), 0);

    assert.equal(Buffer.compare(b, c), -1);
    assert.equal(Buffer.compare(c, d), 1);
    assert.equal(Buffer.compare(d, b), 1);
    assert.equal(Buffer.compare(b, d), -1);
    assert.equal(Buffer.compare(c, c), 0);

    assert.equal(Buffer.compare(Buffer.alloc(0), Buffer.alloc(0)), 0);
    assert.equal(Buffer.compare(Buffer.alloc(0), Buffer.alloc(1)), -1);
    assert.equal(Buffer.compare(Buffer.alloc(1), Buffer.alloc(0)), 1);

    assert.throws(function () {
        var b = new Buffer(1);
        Buffer.compare(b, 'abc');
    });

    assert.throws(function () {
        var b = new Buffer(1);
        Buffer.compare('abc', b);
    });

    assert.throws(function () {
        var b = new Buffer(1);
        b.compare('abc');
    });
};

exports['test should slice'] = function () {
    (function () {
        var buf = new Buffer('0123456789');
        assert.equal(buf.slice(-10, 10), '0123456789');
        assert.equal(buf.slice(-20, 10), '0123456789');
        assert.equal(buf.slice(-20, -10), '');
        assert.equal(buf.slice(), '0123456789');
        assert.equal(buf.slice(0), '0123456789');
        assert.equal(buf.slice(0, 0), '');
        assert.equal(buf.slice(undefined), '0123456789');
        assert.equal(buf.slice('foobar'), '0123456789');
        assert.equal(buf.slice(undefined, undefined), '0123456789');
        assert.equal(buf.slice(2), '23456789');
        assert.equal(buf.slice(5), '56789');
        assert.equal(buf.slice(10), '');
        assert.equal(buf.slice(5, 8), '567');
        assert.equal(buf.slice(8, -1), '8');
        assert.equal(buf.slice(-10), '0123456789');
        assert.equal(buf.slice(0, -9), '0');
        assert.equal(buf.slice(0, -10), '');
        assert.equal(buf.slice(0, -1), '012345678');
        assert.equal(buf.slice(2, -2), '234567');
        assert.equal(buf.slice(0, 65536), '0123456789');
        assert.equal(buf.slice(65536, 0), '');
        assert.equal(buf.slice(-5, -8), '');
        assert.equal(buf.slice(-5, -3), '56');
        assert.equal(buf.slice(-10, 10), '0123456789');
        for (var i = 0, s = buf.toString(); i < buf.length; ++i) {
            assert.equal(buf.slice(i), s.slice(i));
            assert.equal(buf.slice(0, i), s.slice(0, i));
            assert.equal(buf.slice(-i), s.slice(-i));
            assert.equal(buf.slice(0, -i), s.slice(0, -i));
        }

        assert.equal(buf.slice('0', '1'), '0');
        assert.equal(buf.slice('-5', '10'), '56789');
        assert.equal(buf.slice('-10', '10'), '0123456789');
        assert.equal(buf.slice('-10', '-5'), '01234');
        assert.equal(buf.slice('-10', '-0'), '');
        assert.equal(buf.slice('111'), '');
        assert.equal(buf.slice('0', '-111'), '');
    })();
    /*
    assert.throws(function () {
        new Buffer((-1 >>> 0) + 1);
    }, RangeError);
    */
};

exports['test should check offset'] = function () {
    // offset checks
    var buf = new Buffer(0);

    assert.throws(function () {
        buf.readUInt8(0);
    }, RangeError);
    assert.throws(function () {
        buf.readInt8(0);
    }, RangeError);

    var buf = new Buffer([0xFF]);

    assert.equal(buf.readUInt8(0), 255);
    assert.equal(buf.readInt8(0), -1);

    [16, 32].forEach(function (bits) {
        var buf = new Buffer(bits / 8 - 1);

        assert.throws(function () {
            buf['readUInt' + bits + 'BE'](0);
            },
            RangeError,
            'readUInt' + bits + 'BE');

        assert.throws(function () {
                buf['readUInt' + bits + 'LE'](0);
            },
            RangeError,
            'readUInt' + bits + 'LE');

        assert.throws(function () {
                buf['readInt' + bits + 'BE'](0);
            },
            RangeError,
            'readInt' + bits + 'BE()');

        assert.throws(function () {
                buf['readInt' + bits + 'LE'](0);
            },
            RangeError,
            'readInt' + bits + 'LE()');
    });

    [16, 32].forEach(function (bits) {
        var buf = new Buffer([0xFF, 0xFF, 0xFF, 0xFF]);
        assert.equal(buf['readUInt' + bits + 'BE'](0),
            (0xFFFFFFFF >>> (32 - bits)));

        assert.equal(buf['readUInt' + bits + 'LE'](0),
            (0xFFFFFFFF >>> (32 - bits)));

        assert.equal(buf['readInt' + bits + 'BE'](0),
            (0xFFFFFFFF >> (32 - bits)));

        assert.equal(buf['readInt' + bits + 'LE'](0),
            (0xFFFFFFFF >> (32 - bits)));
    });
};
/*
exports['test should write with maxLength'] = function () {
    // #243 Test write() with maxLength
    var buf = new Buffer(4);
    buf.fill(0xFF);
    var written = buf.write('abcd', 1, 2, 'utf8');
    assert.equal(written, 2);
    assert.equal(buf[0], 0xFF);
    assert.equal(buf[1], 0x61);
    assert.equal(buf[2], 0x62);
    assert.equal(buf[3], 0xFF);

    buf.fill(0xFF);
    written = buf.write('abcd', 1, 4);
    assert.equal(written, 3);
    assert.equal(buf[0], 0xFF);
    assert.equal(buf[1], 0x61);
    assert.equal(buf[2], 0x62);
    assert.equal(buf[3], 0x63);

    buf.fill(0xFF);
    written = buf.write('abcd', 1, 2, 'utf8');  // legacy style
    assert.equal(written, 2);
    assert.equal(buf[0], 0xFF);
    assert.equal(buf[1], 0x61);
    assert.equal(buf[2], 0x62);
    assert.equal(buf[3], 0xFF);
};
*/

exports['test should return offset'] = function () {
    // test offset returns are correct
    var b = new Buffer(16);
    assert.equal(4, b.writeUInt32LE(0, 0));
    assert.equal(6, b.writeUInt16LE(0, 4));
    assert.equal(7, b.writeUInt8(0, 6));
    assert.equal(8, b.writeInt8(0, 7));
    assert.equal(16, b.writeDoubleLE(0, 8));
};

exports['test should attempt to overflow buffers, similar to previous bug in array buffers'] = function () {
    // attempt to overflow buffers, similar to previous bug in array buffers
    assert.throws(function () {
        var buf = new Buffer(8);
        buf.readFloatLE(0xffffffff);
    }, RangeError);

    assert.throws(function () {
        var buf = new Buffer(8);
        buf.writeFloatLE(0.0, 0xffffffff);
    }, RangeError);

    assert.throws(function () {
        var buf = new Buffer(8);
        buf.readFloatLE(0xffffffff);
    }, RangeError);

    assert.throws(function () {
        var buf = new Buffer(8);
        buf.writeFloatLE(0.0, 0xffffffff);
    }, RangeError);
};

exports['test should ensure negative values cannot get past offset'] = function () {
    assert.throws(function () {
        var buf = new Buffer(8);
        buf.readFloatLE(-1);
    }, RangeError);

    assert.throws(function () {
        var buf = new Buffer(8);
        buf.writeFloatLE(0.0, -1);
    }, RangeError);

    assert.throws(function () {
        var buf = new Buffer(8);
        buf.readFloatLE(-1);
    }, RangeError);

    assert.throws(function () {
        var buf = new Buffer(8);
        buf.writeFloatLE(0.0, -1);
    }, RangeError);
};

exports['test should equals'] = function(){
    var b = new Buffer(5).fill('abcdf');
    var c = new Buffer(5).fill('abcdf');
    var d = new Buffer(5).fill('abcde');
    var e = new Buffer(6).fill('abcdef');

    assert.ok(b.equals(c));
    assert.ok(!c.equals(d));
    assert.ok(!d.equals(e));
    assert.ok(d.equals(d));

    assert.throws(function () {
        var b = new Buffer(1);
        b.equals('abc');
    });
};

/*
exports['test should work will with prototype'] = function () {
    // Test prototype getters don't throw
    assert.equal(Buffer.prototype.parent, undefined);
    assert.equal(Buffer.prototype.offset, undefined);

    var ps = Buffer.poolSize;
    Buffer.poolSize = 0;
    assert.equal(Buffer(1).parent, undefined);
    Buffer.poolSize = ps;
};

exports['test should return correct length'] = function () {
    // Call .fill() first, stops valgrind warning about uninitialized memory reads.
    Buffer(3.3).fill().toString(); // throws bad argument error in commit 43cb4ec
    assert.equal(Buffer(-1).length, 0);
    assert.equal(Buffer(NaN).length, 0);
    assert.equal(Buffer(3.3).length, 3);
    assert.equal(Buffer({length: 3.3}).length, 3);
    assert.equal(Buffer({length: 'BAM'}).length, 0);

    // Make sure that strings are not coerced to numbers.
    assert.equal(Buffer('99').length, 2);
    assert.equal(Buffer('13.37').length, 5);
};
*/

exports['test should slice'] = function () {
    // make sure only top level parent propagates from allocPool
    var b = new Buffer(5);
    var c = b.slice(0, 4);
    var d = c.slice(0, 2);
    assert.equal(b.parent, c.parent);
    assert.equal(b.parent, d.parent);

    /*
    // Bug regression test
    var testValue = '\u00F6\u65E5\u672C\u8A9E'; // ö日本語
    var buffer = new Buffer(32);
    var size = buffer.write(testValue, 0, 'utf8');
    var slice = buffer.toString('utf8', 0, size);
    assert.equal(slice, testValue);
    */

    // Single argument slice
    b = new Buffer('abcde');
    assert.equal('bcde', b.slice(1).toString());

    // slice(0,0).length === 0
    assert.equal(0, Buffer.from('hello').slice(0, 0).length);

    /*
    // test for buffer overrun
    var buf = new Buffer([0, 0, 0, 0, 0]); // length: 5
    var sub = buf.slice(0, 4);         // length: 4
    var written = sub.write('12345', 'binary');
    assert.equal(written, 4);
    assert.equal(buf[4], 0);
    */
};

exports['test should throw exception when pass error parameter to buffer constructor'] = function () {
    //
    //assert.throws(function () {
    //    new Buffer();
    //}, /must start with number, buffer, array or string/);
    //
    //assert.throws(function () {
    //    new Buffer(null);
    //}, /must start with number, buffer, array or string/);
};

exports['test should write little-endian float'] = function () {
    var buf = Buffer.alloc(4);
    buf.writeFloatLE(1.539989614439558e-36);
    for (var i = 0; i < buf.length; ++i) {
        assert.equal(buf[i], i + 1);
    }
};

exports['test should read little-endian float'] = function () {
    var buf = Buffer.from([1, 2, 3, 4]);
    var val = buf.readFloatLE();
    assert.equal(val, 1.539989614439558e-36);
};

exports['test should write little-endian double'] = function () {
    var buf = Buffer.alloc(8);
    buf.writeDoubleLE(5.447603722011605e-270);
    for (var i = 0; i < buf.length; ++i) {
        assert.equal(buf[i], i + 1);
    }
};

exports['test should read little-endian double'] = function () {
    var buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
    var val = buf.readDoubleLE();
    assert.equal(val, 5.447603722011605e-270);
};

exports['test should write big-endian float'] = function () {
    var buf = Buffer.alloc(4);
    buf.writeFloatBE(2.387939260590663e-38);
    for (var i = 0; i < buf.length; ++i) {
        assert.equal(buf[i], i + 1);
    }
};

exports['test should read big-endian float'] = function () {
    var buf = Buffer.from([1, 2, 3, 4]);
    var val = buf.readFloatBE();
    assert.equal(val, 2.387939260590663e-38);
};

exports['test should write big-endian double'] = function () {
    var buf = Buffer.alloc(8);
    buf.writeDoubleBE(8.20788039913184e-304);
    for (var i = 0; i < buf.length; ++i) {
        assert.equal(buf[i], i + 1);
    }
};

exports['test should read big-endian double'] = function () {
    var buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);
    var val = buf.readDoubleBE();
    assert.equal(val, 8.20788039913184e-304);
};

exports['test should return hex string'] = function () {
    var buf = Buffer.alloc(8);

    buf[0] = 0x01;
    buf[1] = 0x23;
    buf[2] = 0x45;
    buf[3] = 0x67;
    buf[4] = 0x89;
    buf[5] = 0xab;
    buf[6] = 0xcd;
    buf[7] = 0xef;

    assert.equal('0123456789abcdef', buf.toString('hex').toLowerCase());
    assert.equal('0123456789abcdef', buf.toString('HEX').toLowerCase());
};

exports['test should slice and return hex string'] = function () {
    var buf = Buffer.alloc(8);

    buf[0] = 0x01;
    buf[1] = 0x23;
    buf[2] = 0x45;
    buf[3] = 0x67;
    buf[4] = 0x89;
    buf[5] = 0xab;
    buf[6] = 0xcd;
    buf[7] = 0xef;

    buf = buf.slice(4, 4 + 2);

    assert.equal('89ab', buf.toString('hex').toLowerCase());
    assert.equal('89ab', buf.toString('HEX').toLowerCase());
};

exports['test should throw TypeError exception when input illegal encoding'] = function () {
    assert.throws(function () {
        var buf = new Buffer(8);
        buf.toString(2);
    }, TypeError);

    assert.throws(function () {
        var buf = new Buffer(8);
        buf.toString('xxx');
    }, TypeError);
};

exports['test should return Buffer from hex string'] = function () {
    var buf1 = Buffer.from('0123456789abcdef', 'hex');
    var buf2 = Buffer.from('0123456789ABCDEF', 'hex');
    var buf3 = Buffer.from('1a2bxx0012ef', 'hex');
    var buf4 = Buffer.from('xb', 'hex');
    var buf5 = Buffer.from('bx', 'hex');

    assert.equal('0123456789abcdef', buf1.toString('hex'));
    assert.equal('0123456789abcdef', buf2.toString('hex'));
    assert.equal('1a2b', buf3.toString('hex'));
    assert.equal('', buf4.toString('hex'));
    assert.equal('', buf5.toString('hex'));

    assert.throws(function () {
        var buf = Buffer.from('1', 'hex');
        buf.toString('hex');
    }, TypeError);

    buf1 = buf1.slice(4, 6);
    assert(buf1.readUInt8(0) === 0x89);
    assert(buf1.readUInt8(1) === 0xab);
};

exports['test buffer indexOf'] = function() {
    var b = Buffer.from('abcdef');
    var buf_a = Buffer.from('a');
    var buf_bc = Buffer.from('bc');
    var buf_f = Buffer.from('f');
    var buf_z = Buffer.from('z');
    var buf_empty = Buffer.from('');

    assert.equal(b.indexOf('a'), 0);
    assert.equal(b.indexOf(97), 0);
    assert.equal(b.indexOf('a', 1), -1);
    assert.equal(b.indexOf('a', -1), -1);
    assert.equal(b.indexOf('a', -4), -1);
    assert.equal(b.indexOf('bc', -5), 1);
    assert.equal(b.indexOf('a', -b.length), 0);
    assert.equal(b.indexOf('a', NaN), 0);
    assert.equal(b.indexOf('a', -Infinity), 0);
    assert.equal(b.indexOf('a', Infinity), -1);
    assert.equal(b.indexOf('bc'), 1);
    assert.equal(b.indexOf('bc', 2), -1);
    assert.equal(b.indexOf('bc', -1), -1);
    assert.equal(b.indexOf('bc', -3), -1);
    assert.equal(b.indexOf('bc', -5), 1);
    assert.equal(b.indexOf('bc', NaN), 1);
    assert.equal(b.indexOf('bc', -Infinity), 1);
    assert.equal(b.indexOf('bc', Infinity), -1);
    assert.equal(b.indexOf('f'), b.length - 1);
    assert.equal(b.indexOf('z'), -1);
    assert.equal(b.indexOf(buf_a), 0);
    assert.equal(b.indexOf(buf_a, 1), -1);
    assert.equal(b.indexOf(buf_a, -1), -1);
    assert.equal(b.indexOf(buf_a, -4), -1);
    assert.equal(b.indexOf(buf_a, -b.length), 0);
    assert.equal(b.indexOf(buf_a, NaN), 0);
    assert.equal(b.indexOf(buf_a, -Infinity), 0);
    assert.equal(b.indexOf(buf_a, Infinity), -1);
    assert.equal(b.indexOf(buf_bc), 1);
    assert.equal(b.indexOf(buf_bc, 2), -1);
    assert.equal(b.indexOf(buf_bc, -1), -1);
    assert.equal(b.indexOf(buf_bc, -3), -1);
    assert.equal(b.indexOf(buf_bc, -5), 1);
    assert.equal(b.indexOf(buf_bc, NaN), 1);
    assert.equal(b.indexOf(buf_bc, -Infinity), 1);
    assert.equal(b.indexOf(buf_bc, Infinity), -1);
    assert.equal(b.indexOf(buf_f), b.length - 1);
    assert.equal(b.indexOf(buf_z), -1);
};

exports['test buffer indexOf for sliced'] = function() {
    var buf = Buffer.from('abcdefg');
    assert.equal(buf.slice(3).indexOf('d'), 0);
    assert.equal(buf.indexOf(buf.slice(3)), 3);
    assert.equal(buf.slice(3).indexOf(buf.slice(3)), 0);
};

exports['test buffer lastIndexOf'] = function() {
    var buf = Buffer.from('this buffer is a buffer');
    assert.equal(buf.lastIndexOf('buffer'), 17);
    assert.equal(buf.slice(buf.length/2).lastIndexOf('buffer'), 6);
    assert.equal(buf.lastIndexOf(buf.slice(buf.length/2)), 11);
    assert.equal(buf.slice(buf.length/2).lastIndexOf(buf.slice(buf.length/2)), 0);
};

require('test').run(exports);
