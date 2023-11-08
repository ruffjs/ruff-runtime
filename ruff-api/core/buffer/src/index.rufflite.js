'use strict';

function Buffer(object) {
    var ruffBuffer = null;
    var start = null;
    var end = null;
    switch (object.constructor) {
        case Number:
        case Array:
        case String: {
            ruffBuffer = new RuffBuffer(object);
            start = 0;
            end = ruffBuffer.length;
            break;
        }
        case RuffBuffer: {
            ruffBuffer = object;
            if (arguments.length === 1) {
                start = 0;
                end = ruffBuffer.length;
            } else if (arguments.length === 3){
                start = arguments[1] >>> 0;
                end = arguments[2] >>> 0;
            } else {
                throw new Error('invalid range');
            }
            break;
        }
        case Buffer: {
            var inbuf = object;
            var _inbuf = inbuf._ruffBuffer;
            var outbuf = Buffer.alloc(inbuf.length, 0);
            var _outbuf = outbuf._ruffBuffer;
            _inbuf.copy(_outbuf, 0, inbuf._start, inbuf._start + inbuf.length);
            return outbuf;
        }
        default:
            throw new Error('invalid object');
    }
    Object.defineProperties(this, {
        '_ruffBuffer': {
            value: ruffBuffer,
            enumerable: false,
            writable: false
        },
        '_start': {
            value: start,
            enumerable: false,
            writable: false
        },
        'length': {
            value: end - start,
            enumerable: true,
            writable: false
        }
    });
}

Buffer.alloc = function (size, fill) {
    var ruffBuffer = new RuffBuffer(size, fill);
    return new Buffer(ruffBuffer);
};

function hexStringToBuffer(hexStr) {
    var mapping = '0123456789abcdef';

    if (hexStr.length % 2) {
        throw new TypeError('Invalid hex string');
    }

    var bufLen = hexStr.length / 2;
    hexStr = hexStr.toLowerCase();

    var buf = new Buffer(bufLen);
    for (var offset = 0; offset < bufLen; offset++) {
        var idx1 = mapping.indexOf(hexStr[2 * offset]);
        var idx2 = mapping.indexOf(hexStr[2 * offset + 1]);

        // non-fatal error, ignore remaining characters
        if (idx1 === -1 || idx2 === -1) {
            return buf.slice(0, offset);
        }

        buf.writeUInt8((idx1 << 4) + idx2, offset);
    }

    return buf;
}

Buffer.from = function (object) {
    var encoding = '';
    if (arguments.length > 1) {
        encoding = arguments[1];
    }
    if (encoding && typeof encoding === 'string') {
        encoding = encoding.toLowerCase();
    } else {
        encoding = 'utf8';
    }

    switch (encoding) {
        case 'utf8':
        case 'utf-8':
        case 'ascii':
            return new Buffer(object);
        case 'hex':
            return hexStringToBuffer(object);
        default:
            throw new TypeError('Unknown encoding: ' + encoding);
    }
};

Buffer.compare = function (buf1, buf2) {
    if (!(buf1 instanceof Buffer)) {
        throw new TypeError('Target must be Buffer');
    }
    return buf1.compare(buf2);
};

Buffer.concat = function (list, totalLength) {
    if (typeof totalLength !== 'number') {
        totalLength = 0;
        for (var i = 0; i < list.length; ++i) {
            var _inbuf = list[i]._ruffBuffer;
            totalLength += list[i].length;
        }
    }

    var outbuf = new Buffer(totalLength);
    var _outbuf = outbuf._ruffBuffer;
    var outbufOffset = 0;
    for (var i = 0; i < list.length; ++i) {
        var start = list[i]._start
        var end = start + list[i].length;
        var _inbuf = list[i]._ruffBuffer;
        outbufOffset += _inbuf.copy(_outbuf, outbufOffset, start, end);
    }
    return outbuf;
};

Buffer.isBuffer = function (obj) {
    return obj instanceof Buffer;
};

Buffer.byteLength = function (string) {
    return Buffer.from(string).length;
};

//-----------------------------------------------------------------------------

Buffer.prototype.__get_index__ = function (index) {
    return this.readUInt8(index);
};

Buffer.prototype.__put_index__ = function (index, value) {
    if (typeof value === 'number') {
        if (value >= 0) {
            this.writeUInt8(value, index);
        } else {
            this.writeInt8(value, index);
        }
    }
    return this.readUInt8(index);
};

//-----------------------------------------------------------------------------

function hexSlice(ruffBuffer, start, end) {
    var str = '';

    for (var i = start; i < end; i++) {
        var byte = ruffBuffer.readByte(i, true);
        str += ('0' + byte.toString(16)).substr(-2);
    }

    return str;
}

Buffer.prototype.toString = function (encoding, start, end) {
    if (typeof start !== 'number') {
        start = 0;
    }
    if (typeof end !== 'number') {
        end = this.length;
    }

    // take offset
    start += this._start;
    end += this._start;

    if (encoding) {
        if (typeof encoding === 'string') {
            encoding = encoding.toLowerCase();
        }
    } else {
        encoding = 'utf8';
    }
    switch (encoding) {
        case 'ascii':
        case 'utf8':
        case 'utf-8':
            return this._ruffBuffer.toString(start, end);
        case 'hex':
            return hexSlice(this._ruffBuffer, start, end);
        default:
            throw new TypeError('Unknown encoding: ' + encoding);
    }
};

Buffer.prototype.slice = function (start, end) {
    // fix args
    if (typeof start === 'string' && !isNaN(start)) {
        start = parseInt(start);
    }
    if (typeof end === 'string' && !isNaN(end)) {
        end = parseInt(end);
    }
    if (typeof start !== 'number') {
        start = 0;
    } else {
        start = fixPos(start, this.length);
    }
    if (typeof end !== 'number') {
        end = this.length;
    } else {
        end = fixPos(end, this.length);
    }
    // fix end
    if (end <= start) {
        end = start;
    }
    // take offset
    start += this._start;
    end += this._start;
    return new Buffer(this._ruffBuffer, start, end);

    function fixPos(pos, length) {
        if (pos > length) {             // fix positive
            pos = length;
        } else if (pos < -length) {     // fix negative
            pos = -length;
        }
        if (pos < 0) {                  // negative to positive
            pos += length;
        }
        return pos;
    }
};

Buffer.prototype.copy = function (target, targetStart, sourceStart, sourceEnd) {
    if (!(target instanceof Buffer)) {
        throw new TypeError('Target must be Buffer');
    }
    if (targetStart < 0 || sourceStart < 0 || sourceEnd < 0) {
        throw new RangeError('Start must be greater than 0');
    }

    targetStart = targetStart >>> 0;
    sourceStart = sourceStart >>> 0;
    if (typeof sourceEnd !== 'number' || sourceEnd > this.length) {
        sourceEnd = this.length;
    }

    var len = sourceEnd - sourceStart;
    if (targetStart + len > target.length) {
        len = target.length - targetStart;
        sourceEnd = sourceStart + len;
    }

    var _outbuf = target._ruffBuffer;
    var _inbuf = this._ruffBuffer;

    if (sourceEnd > sourceStart && targetStart < target.length) {
        return _inbuf.copy(_outbuf, targetStart, sourceStart, sourceEnd);
    } else {
        return 0;
    }
};

Buffer.prototype.compare = function (target, targetStart, targetEnd, sourceStart, sourceEnd) {
    if (!(target instanceof Buffer)) {
        throw new TypeError('Target must be Buffer');
    }
    targetStart = (targetStart >>> 0) + target._start;
    if (typeof targetEnd === 'number') {
        targetEnd += target._start;
    } else {
        targetEnd = target._start + target.length;
    }
    sourceStart = (sourceStart >>> 0) + this._start;
    if (typeof sourceEnd === 'number') {
        sourceEnd += this._start;
    } else {
        sourceEnd = this._start + this.length;
    }
    var _thisBuffer = this._ruffBuffer;
    var _targetBuffer = target._ruffBuffer;
    return _thisBuffer.compare(_targetBuffer, targetStart, targetEnd, sourceStart, sourceEnd);
};

Buffer.prototype.equals = function (otherBuffer) {
    return this.compare(otherBuffer) == 0;
};

Buffer.prototype.swap16 = function () {
    this._ruffBuffer.swap(2);
    return this;
};

Buffer.prototype.swap32 = function () {
    this._ruffBuffer.swap(4);
    return this;
};

Buffer.prototype.swap64 = function () {
    this._ruffBuffer.swap(8);
    return this;
};

function valueToBuffer(value) {
    if (value !== null && typeof value !== 'undefined') {
        switch (value.constructor) {
            case Buffer:
                return value;
            case Number:
            case Boolean:
                return Buffer.alloc(1, value);
            case String:
                return Buffer.from(value);
        }
    }
    return Buffer.alloc(0);
}

Buffer.prototype.fill = function (value, offset, end) {
    offset = offset >>> 0;
    if (typeof end !== 'number') {
        end = this.length;
    }
    var that = valueToBuffer(value);
    var _inbuf = that._ruffBuffer;
    var _outbuf = this._ruffBuffer;
    var step = that.length;
    if (step <= 0) {
        return this;
    }
    offset += this._start;
    end += this._start;
    for (; offset < end; offset += step) {
        _inbuf.copy(_outbuf, offset, 0, step);
    }
    return this;
};

Buffer.prototype.indexOf = function (value, byteOffset) {
    if (typeof byteOffset === 'string') {
        byteOffset = undefined;
    } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
        byteOffset = 0;
    }
    if (byteOffset < 0) {
        byteOffset = this.length + byteOffset;
        if (byteOffset < 0) {
            byteOffset = 0;
        }
    }
    byteOffset = byteOffset >>> 0;
    var that = valueToBuffer(value);
    for (var i = byteOffset; i < this.length - that.length + 1; ++i) {
        if (this.compare(that, 0, that.length, i, i + that.length) === 0) {
            return i;
        }
    }
    return -1;
};

Buffer.prototype.includes = function (value, byteOffset) {
    return this.indexOf(value, byteOffset) >= 0;
};

Buffer.prototype.lastIndexOf = function (value, byteOffset) {
    var that = valueToBuffer(value);
    if (typeof byteOffset === 'number') {
        byteOffset = byteOffset >>> 0;
    } else {
        byteOffset = this.length - that.length;
    }
    for (var i = byteOffset; i >= 0; --i) {
        if (this.compare(that, 0, that.length, i, i + that.length) === 0) {
            return i;
        }
    }
    return -1;
};

//-----------------------------------------------------------------------------

function checkOffset(offset, ext, length) {
    if (offset + ext > length) {
        throw new RangeError('Index out of range');
    }
}

Buffer.prototype.readUIntLE = function (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, byteLength, true, true);
};

Buffer.prototype.readUIntBE = function (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, byteLength, false, true);
};

Buffer.prototype.readUInt8 = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 1, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readByte(offset, true);
};

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 2, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 2, true, true);
};

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 2, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 2, false, true);
};

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 4, true, true);
};

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 4, false, true);
};

Buffer.prototype.readIntLE = function (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, byteLength, true, false);
};

Buffer.prototype.readIntBE = function (offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, byteLength, false, false);
};

Buffer.prototype.readInt8 = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 1, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readByte(offset, false);
};

Buffer.prototype.readInt16LE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 2, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 2, true, false);
};

Buffer.prototype.readInt16BE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 2, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 2, false, false);
};

Buffer.prototype.readInt32LE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 4, true, false);
};

Buffer.prototype.readInt32BE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readInteger(offset, 4, false, false);
};

Buffer.prototype.readFloatLE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readFloatLE(offset);
};

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 8, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readDoubleLE(offset);
};

Buffer.prototype.readFloatBE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readFloatBE(offset);
};

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 8, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.readDoubleBE(offset);
};

//-----------------------------------------------------------------------------

Buffer.prototype.write = function (string, offset, length) {
    offset = offset >>> 0;
    if (typeof length !== 'number') {
        length = string.length;
    }
    offset += this._start;
    return this._ruffBuffer.writeString(string, offset, length);
};

//-----------------------------------------------------------------------------

function checkInt(buffer, value, offset, ext, max, min) {
    if (!(buffer instanceof Buffer)) {
        throw new TypeError('"buffer" argument must be a Buffer instance');
    }
    if (value > max || value < min) {
        throw new TypeError('"value" argument is out of bounds');
    }
    if (offset + ext > buffer.length) {
        throw new RangeError('Index out of range');
    }
}

Buffer.prototype.writeUIntLE = function (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, byteLength, true, true);
};

Buffer.prototype.writeUIntBE = function (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, byteLength, false, true);
};

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 1, 0xff, 0);
    }
    offset += this._start;
    return this._ruffBuffer.writeByte(value, offset);
};

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 2, 0xffff, 0);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 2, true, true);
};

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 2, 0xffff, 0);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 2, false, true);
};

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 4, 0xffffffff, 0);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 4, true, true);
};

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 4, 0xffffffff, 0);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 4, false, true);
};

Buffer.prototype.writeIntLE = function (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this,
                value,
                offset,
                byteLength,
                Math.pow(2, 8 * byteLength - 1) - 1,
                -Math.pow(2, 8 * byteLength - 1));
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, byteLength, true, false);
};

Buffer.prototype.writeIntBE = function (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this,
                value,
                offset,
                byteLength,
                Math.pow(2, 8 * byteLength - 1) - 1,
                -Math.pow(2, 8 * byteLength - 1));
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, byteLength, false, false);
};

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
    value = +value;
    offset = offset >> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 1, 0x7f, -0x80);
    }
    offset += this._start;
    return this._ruffBuffer.writeByte(value, offset);
};

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 2, true, false);
};

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 2, false, false);
};

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 4, true, false);
};

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    }
    offset += this._start;
    return this._ruffBuffer.writeInteger(value, offset, 4, false, false);
};

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.writeFloatLE(value, offset);
};

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 8, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.writeDoubleLE(value, offset);
};

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 4, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.writeFloatBE(value, offset);
};

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkOffset(offset, 8, this.length);
    }
    offset += this._start;
    return this._ruffBuffer.writeDoubleBE(value, offset);
};

//-----------------------------------------------------------------------------

module.exports.Buffer = Buffer;
