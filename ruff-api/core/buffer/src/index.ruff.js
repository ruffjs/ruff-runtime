'use strict';
var NativeBuffer = global._NativeBuffer || (global._NativeBuffer = Buffer);
var nativeBufferToString = NativeBuffer.prototype.toString;
var nativeBufferWrite = NativeBuffer.prototype.write;
var nativeBufferFill = NativeBuffer.prototype.fill;
var nativeBufferSlice = NativeBuffer.prototype.slice;

var RuffBuffer = function (arg, encoding) {
    var buffer;

    if (typeof encoding === 'string') {
        if (typeof arg !== 'string') {
            throw new Error('If encoding is specified then the first argument must be a string');
        }

        switch (encoding) {
            case 'utf8':
            case 'utf-8':
                buffer = new NativeBuffer(arg);
                break;
            case 'hex':
            case 'base64':
                buffer = new NativeBuffer(Duktape.dec(encoding, arg));
                break;
            default:
                var length = RuffBuffer.byteLength(arg, encoding);
                buffer = new NativeBuffer(length);
                bufferWrite.call(buffer, arg, 0, encoding);
                break;
        }
    } else {
        buffer = new NativeBuffer(arg);
    }

    Object.setPrototypeOf(buffer, RuffBuffer.prototype);
    return buffer;
};

RuffBuffer.concat = function concat(list, length) {
    var buffer = NativeBuffer.concat(list, length);
    Object.setPrototypeOf(buffer, RuffBuffer.prototype);
    return buffer;
};

RuffBuffer.isEncoding = function isEncoding(encoding) {
    switch (encoding && encoding.toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return true;

        default:
            return false;
    }
};

RuffBuffer.isBuffer = function isBuffer(object) {
    return object instanceof RuffBuffer;
};

function base64ByteLength(str, bytes) {
    // Handle padding
    if (str.charCodeAt(bytes - 1) === 0x3D) {
        bytes--;
    }

    if (bytes > 1 && str.charCodeAt(bytes - 1) === 0x3D) {
        bytes--;
    }

    // Base64 ratio: 3/4
    return (bytes * 3) >>> 2;
}

RuffBuffer.byteLength = function byteLength(str, encoding) {
    if (str instanceof RuffBuffer) {
        return str.length;
    }

    if (typeof str !== 'string') {
        str = '' + str;
    }

    var len = str.length;

    if (len === 0) {
        return 0;
    }

    switch (encoding && encoding.toLowerCase()) {
        case 'ascii':
        case 'binary':
            return len;

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return len * 2;

        case 'hex':
            return len >>> 1;

        case 'base64':
            return base64ByteLength(str, len);

        // case 'utf8':
        // case 'utf-8':
        default:
            return NativeBuffer.byteLength(str);
    }
};

RuffBuffer.compare = function compare(a, b) {
    if (!(a instanceof RuffBuffer) ||
        !(b instanceof RuffBuffer)) {
        throw new TypeError('Arguments must be Buffers');
    }

    return NativeBuffer.compare(a, b);
};

RuffBuffer.alloc = function alloc(size, fill, encoding) {
    assertSize(size);

    if (size <= 0) {
        return new Buffer(size);
    }

    if (fill !== undefined) {
        // Since we are filling anyway, don't zero fill initially.
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpretted as a start offset.
        return typeof encoding === 'string' ?
            new Buffer(size).fill(fill, encoding) :
            new Buffer(size).fill(fill);
    }

    return new Buffer(size);
};

RuffBuffer.allocUnsafe = function allocUnsafe(size) {
    assertSize(size);
    return new Buffer(size);
};

RuffBuffer.allocUnsafeSlow = function allocUnsafeSlow(size) {
    assertSize(size);
    return new Buffer(size);
};

RuffBuffer.from = function from(value, encoding) {
    if (typeof value === 'number') {
        throw new TypeError('"value" argument must not be a number');
    }

    if (typeof value === 'string') {
        return new Buffer(value, encoding);
    }

    return new Buffer(value);
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
RuffBuffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
        if (typeof start === 'string') {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === 'string') {
            encoding = end;
            end = this.length;
        }

        if (encoding) {
            encoding = encoding.toLowerCase();
        } else {
            encoding = 'utf8';
        }

        switch (encoding) {
            case 'utf8':
            case 'utf-8':
                break;
            default:
                var buffer = new RuffBuffer(val, encoding);
                val = buffer;
                break;
        }

    } else if (typeof val === 'number') {
        val = val & 255;
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || end > this.length) {
        throw new RangeError('Out of range index');
    }

    if (end <= start) {
        return this;
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    nativeBufferFill.call(this, val, start, end);

    return this;
};

RuffBuffer.prototype.slice = function slice(start, end) {
    var buffer = nativeBufferSlice.call(this, start, end);
    Object.setPrototypeOf(buffer, RuffBuffer.prototype);
//    buffer.toString = RuffBuffer.prototype.toString;
    return buffer;
};

function assertSize(size) {
    if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be a number');
    }
}

function bufferToString(encoding, start, end) {
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
        start = 0;
    }

    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
        return '';
    }

    if (end === undefined || end > this.length) {
        end = this.length;
    }

    if (end <= 0) {
        return '';
    }

    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
        return '';
    }

    if (encoding) {
        encoding = encoding.toLowerCase();
    } else {
        encoding = 'utf8';
    }

    switch (encoding) {
        case 'hex':
            return hexSlice(this, start, end);

        case 'utf8':
        case 'utf-8':
            return utf8Slice(this, start, end);

        case 'ascii':
            return asciiSlice(this, start, end);

        case 'binary':
            return binarySlice(this, start, end);

        case 'base64':
            return base64Slice(this, start, end);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return ucs2Slice(this, start, end);

        default:
            throw new TypeError('Unknown encoding: ' + encoding);
    }
}

RuffBuffer.prototype.toString = function toString() {
    var result;

    if (arguments.length === 0) {
        result = bufferToString.call(this, 'utf8');
    } else {
        result = bufferToString.apply(this, arguments);
    }

    if (result === undefined) {
        throw new Error('"toString()" failed');
    }

    return result;
};

function bufferWrite(str, offset, length, encoding) {
    if (offset === undefined) {
        // Buffer#write(string);
        encoding = 'utf8';
        length = this.length;
        offset = 0;
    } else if (length === undefined && typeof offset === 'string') {
        // Buffer#write(string, encoding)
        encoding = offset;
        length = this.length;
        offset = 0;
    } else if (isFinite(offset)) {
        // Buffer#write(string, offset[, length][, encoding])
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) {
                encoding = 'utf8';
            }
        } else {
            encoding = length;
            length = undefined;
        }
    } else {
        // if someone is still calling the obsolete form of write(), tell them.
        // we don't want eg buf.write("foo", "utf8", 10) to silently turn into
        // buf.write("foo", "utf8"), so we can't ignore extra args
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
    }

    var remaining = this.length - offset;

    if (length === undefined || length > remaining) {
        length = remaining;
    }

    if (str.length > 0 && (length < 0 || offset < 0)) {
        throw new RangeError('Attempt to write outside buffer bounds');
    }

    if (encoding) {
        encoding = encoding.toLowerCase();
    } else {
        encoding = 'utf8';
    }

    switch (encoding) {
        case 'hex':
            return hexWrite(this, str, offset, length);

        case 'utf8':
        case 'utf-8':
            return utf8Write(this, str, offset, length);

        case 'ascii':
            return asciiWrite(this, str, offset, length);

        case 'binary':
            return binaryWrite(this, str, offset, length);

        case 'base64':
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, str, offset, length);

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return ucs2Write(this, str, offset, length);

        default:
            throw new TypeError('Unknown encoding: ' + encoding);
    }
}

RuffBuffer.prototype.write = bufferWrite;

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
}

RuffBuffer.prototype.indexOf = function(value, byteOffset, encoding)
{
    var target;

    if (typeof byteOffset === 'string') {
        encoding = byteOffset;
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

    if (typeof value === 'number') {
        target = new RuffBuffer(hex2a(value.toString(16)));
    } else if (!(value instanceof Buffer)) {
        target = new RuffBuffer(value, encoding);
    } else {
        target = value;
    }

    /* fast indexof */
    return uv.fast_buffer_indexof(this, target, byteOffset);
    /*
    if (byteOffset < 0) {
        byteOffset = this.length + byteOffset;
        if (byteOffset < 0) {
            byteOffset = 0;
        }
    }
    for (var i = byteOffset; i < this.length - target.length + 1; ++i) {
        var tmpBuf = this.slice(i, i + target.length);
        if (tmpBuf.compare(target) === 0) {
            return i;
        }
    }

    return -1;
    */
};

var nativeBufferPrototype = NativeBuffer.prototype;
var ruffBufferPrototype = RuffBuffer.prototype;

Object
    .getOwnPropertyNames(nativeBufferPrototype)
    .forEach(function (name) {
        if (!ruffBufferPrototype.hasOwnProperty(name)) {
            ruffBufferPrototype[name] = nativeBufferPrototype[name];
        }
    });

/////////////////////
// Slice Functions //
/////////////////////

function hexSlice(buffer, start, end) {
    var str = '';

    for (var i = start; i < end; i++) {
         str += ('0' + buffer[i].toString(16)).substr(-2);
    }

    return str;
}

function utf8Slice(buffer, start, end) {
    // Encoding 'utf8' here does not actually make a difference.
    return nativeBufferToString.call(buffer, 'utf8', start, end);
}

function asciiSlice(buffer, start, end) {
    var str = '';

    for (var i = start; i < end; i++) {
        str += String.fromCharCode(buffer[i] & 127);
    }

    return str;
}

function binarySlice(buffer, start, end) {
    var str = '';

    for (var i = start; i < end; i++) {
        str += String.fromCharCode(buffer[i]);
    }

    return str;
}

function base64Slice(buffer, start, end) {
    return Duktape.enc('base64', buffer.slice(start, end));
}

function ucs2Slice(buffer, start, end) {
    var str = '';

    if ((end - start) % 2) {
        end -= 1;
    }

    for (var i = start; i < end; i += 2) {
        str += String.fromCharCode(buffer.readUInt16LE(i));
    }

    return str;
}

/////////////////////
// Write Functions //
/////////////////////

function hexWrite(buffer, str, offset, length) {
    var end = Math.min(str.length / 2, length, buffer.length - offset);
    var index = 0;

    for (index; index < end; index++) {
        var char = str.substr(index * 2, 2);
        var byte = parseInt(char, 16);

        if (isNaN(byte)) {
            break;
        }

        buffer.writeUInt8(byte, offset + index);
    }

    return index - offset;
}

function utf8Write(buffer, str, offset, length) {
    return nativeBufferWrite.call(buffer, str, offset, length);
}

function asciiWrite(buffer, str, offset, length) {
    var end = Math.min(str.length, length, buffer.length - offset);
    var index = 0;

    for (index; index < end; index++) {
        buffer.writeUInt8(str.charCodeAt(index), offset + index);
    }

    return index;
}

function binaryWrite() {
    return asciiWrite.apply(this, arguments);
}

function base64Write(buffer, str, offset, length) {
    try {
        var encoded = new NativeBuffer(Duktape.dec('base64', str));

        return encoded
            .slice(0, length)
            .copy(buffer, offset);
    } catch (e){
        // Conform the behaviour of Node.js.
        return Math.min(buffer.length - offset, length);
    }
}

function ucs2Write(buffer, str, offset, length) {
    var end = Math.min(str.length, length / 2, (buffer.length - offset) / 2);
    var index = 0;

    for (index; index < end; index++) {
        buffer.writeUInt16LE(str.charCodeAt(index), offset + index * 2);
    }

    return index * 2;
}

exports.Buffer = RuffBuffer;
exports.SlowBuffer = RuffBuffer;
