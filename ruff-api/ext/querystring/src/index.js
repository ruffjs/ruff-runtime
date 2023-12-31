/*jshint bitwise: false*/
'use strict';

var QueryString = {};

function charCode(c) {
    return c.charCodeAt(0);
}

// a safe fast alternative to decodeURIComponent
QueryString.unescapeBuffer = function(s, decodeSpaces) {
    var out = new Array(s.length);
    var state = 'CHAR'; // states: CHAR, HEX0, HEX1
    var n, m, hexchar;

    for (var inIndex = 0, outIndex = 0; inIndex <= s.length; inIndex++) {
        var c = s.charCodeAt(inIndex);
        switch (state) {
            case 'CHAR':
                switch (c) {
                    case charCode('%'):
                        n = 0;
                        m = 0;
                        state = 'HEX0';
                        break;
                    case charCode('+'):
                        if (decodeSpaces) {
                            c = charCode(' ');
                        }
                        break;
                    // falls through
                    default:
                        out[outIndex++] = c;
                        break;
                }
                break;

            case 'HEX0':
                state = 'HEX1';
                hexchar = c;
                if (charCode('0') <= c && c <= charCode('9')) {
                    n = c - charCode('0');
                } else if (charCode('a') <= c && c <= charCode('f')) {
                    n = c - charCode('a') + 10;
                } else if (charCode('A') <= c && c <= charCode('F')) {
                    n = c - charCode('A') + 10;
                } else {
                    out[outIndex++] = charCode('%');
                    out[outIndex++] = c;
                    state = 'CHAR';
                    break;
                }
                break;

            case 'HEX1':
                state = 'CHAR';
                if (charCode('0') <= c && c <= charCode('9')) {
                    m = c - charCode('0');
                } else if (charCode('a') <= c && c <= charCode('f')) {
                    m = c - charCode('a') + 10;
                } else if (charCode('A') <= c && c <= charCode('F')) {
                    m = c - charCode('A') + 10;
                } else {
                    out[outIndex++] = charCode('%');
                    out[outIndex++] = hexchar;
                    out[outIndex++] = c;
                    break;
                }
                out[outIndex++] = 16 * n + m;
                break;
        }
    }

    // TODO support returning arbitrary buffers.

    return out.slice(0, outIndex - 1);
};


var qsUnescape = QueryString.unescape = function(s, decodeSpaces) {
    try {
        return decodeURIComponent(s);
    } catch (e) {
        return QueryString.unescapeBuffer(s, decodeSpaces).toString();
    }
};


var hexTable = new Array(256);
for (var i = 0; i < 256; ++i) {
    hexTable[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();
}

QueryString.escape = function(str) {
    // replaces encodeURIComponent
    // http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3.4
    str = '' + str;
    var len = str.length;
    var out = '';
    var i, c;

    if (len === 0) {
        return str;
    }

    for (i = 0; i < len; ++i) {
        c = str.charCodeAt(i);

        // These characters do not need escaping (in order):
        // ! - . _ ~
        // ' ( ) *
        // digits
        // alpha (uppercase)
        // alpha (lowercase)
        if (c === 0x21 || c === 0x2D || c === 0x2E || c === 0x5F || c === 0x7E ||
            (c >= 0x27 && c <= 0x2A) ||
            (c >= 0x30 && c <= 0x39) ||
            (c >= 0x41 && c <= 0x5A) ||
            (c >= 0x61 && c <= 0x7A)) {
            out += str[i];
            continue;
        }

        // Other ASCII characters
        if (c < 0x80) {
            out += hexTable[c];
            continue;
        }

        // Multi-byte characters ...
        if (c < 0x800) {
            out += hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)];
            continue;
        }
        if (c < 0xD800 || c >= 0xE000) {
            out += hexTable[0xE0 | (c >> 12)] +
                hexTable[0x80 | ((c >> 6) & 0x3F)] +
                hexTable[0x80 | (c & 0x3F)];
            continue;
        }
        // Surrogate pair
        ++i;
        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] +
            hexTable[0x80 | ((c >> 12) & 0x3F)] +
            hexTable[0x80 | ((c >> 6) & 0x3F)] +
            hexTable[0x80 | (c & 0x3F)];
    }
    return out;
};

var stringifyPrimitive = function(v) {
    if (typeof v === 'string') {
        return v;
    }
    if (typeof v === 'number' && isFinite(v)) {
        return '' + v;
    }
    if (typeof v === 'boolean') {
        return v ? 'true' : 'false';
    }
    return '';
};


QueryString.stringify = function(obj, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';

    var encode = QueryString.escape;
    if (options && typeof options.encodeURIComponent === 'function') {
        encode = options.encodeURIComponent;
    }

    if (obj !== null && typeof obj === 'object') {
        var keys = Object.keys(obj);
        var len = keys.length;
        var flast = len - 1;
        var fields = '';
        for (var i = 0; i < len; ++i) {
            var k = keys[i];
            var v = obj[k];
            var ks = encode(stringifyPrimitive(k)) + eq;

            if (Array.isArray(v)) {
                var vlen = v.length;
                var vlast = vlen - 1;
                for (var j = 0; j < vlen; ++j) {
                    fields += ks + encode(stringifyPrimitive(v[j]));
                    if (j < vlast) {
                        fields += sep;
                    }
                }
                if (vlen && i < flast) {
                    fields += sep;
                }
            } else {
                fields += ks + encode(stringifyPrimitive(v));
                if (i < flast) {
                    fields += sep;
                }
            }
        }
        return fields;
    }
    return '';
};

function decodeStr(s, decoder) {
    try {
        return decoder(s);
    } catch (e) {
        return QueryString.unescape(s, true);
    }
}


// Parse a key=val string.
// Parse a key/val string.
QueryString.parse = QueryString.decode = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';

    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
        return obj;
    }

    if (typeof sep !== 'string') {
        sep += '';
    }

    var eqLen = eq.length;
    var sepLen = sep.length;

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
        maxKeys = options.maxKeys;
    }

    var pairs = Infinity;
    if (maxKeys > 0) {
        pairs = maxKeys;
    }

    var decode = QueryString.unescape;
    if (options && typeof options.decodeURIComponent === 'function') {
        decode = options.decodeURIComponent;
    }
    var customDecode = (decode !== qsUnescape);

    var keys = [];
    var lastPos = 0;
    var sepIdx = 0;
    var eqIdx = 0;
    var key = '';
    var value = '';
    var keyEncoded = customDecode;
    var valEncoded = customDecode;
    var encodeCheck = 0;
    var end, curValue;
    for (var i = 0; i < qs.length; ++i) {
        var code = qs.charCodeAt(i);

        // Try matching key/value pair separator (e.g. '&')
        if (code === sep.charCodeAt(sepIdx)) {
            if (++sepIdx === sepLen) {
                // Key/value pair separator match!
                end = i - sepIdx + 1;
                if (eqIdx < eqLen) {
                    // If we didn't find the key/value separator, treat the substring as
                    // part of the key instead of the value
                    if (lastPos < end) {
                        key += qs.slice(lastPos, end);
                    }
                } else if (lastPos < end) {
                    value += qs.slice(lastPos, end);
                }
                if (keyEncoded) {
                    key = decodeStr(key, decode);
                }
                if (valEncoded) {
                    value = decodeStr(value, decode);
                }
                // Use a key array lookup instead of using hasOwnProperty(), which is
                // slower
                if (keys.indexOf(key) === -1) {
                    obj[key] = value;
                    keys[keys.length] = key;
                } else {
                    curValue = obj[key];
                    // `instanceof Array` is used instead of Array.isArray() because it
                    // is ~15-20% faster with v8 4.7 and is safe to use because we are
                    // using it with values being created within this function
                    if (curValue instanceof Array) {
                        curValue[curValue.length] = value;
                    }
                    else {
                        obj[key] = [curValue, value];
                    }
                }
                if (--pairs === 0) {
                    break;
                }
                keyEncoded = valEncoded = customDecode;
                encodeCheck = 0;
                key = value = '';
                lastPos = i + 1;
                sepIdx = eqIdx = 0;
            }
            continue;
        } else {
            sepIdx = 0;
            if (!valEncoded) {
                // Try to match an (valid) encoded byte (once) to minimize unnecessary
                // calls to string decoding functions
                if (code === 37/*%*/) {
                    encodeCheck = 1;
                } else if (encodeCheck > 0 &&
                    ((code >= 48/*0*/ && code <= 57/*9*/) ||
                        (code >= 65/*A*/ && code <= 70/*Z*/) ||
                        (code >= 97/*a*/ && code <= 102/*z*/))) {
                    if (++encodeCheck === 3) {
                        valEncoded = true;
                    }
                } else {
                    encodeCheck = 0;
                }
            }
        }

        // Try matching key/value separator (e.g. '=') if we haven't already
        if (eqIdx < eqLen) {
            if (code === eq.charCodeAt(eqIdx)) {
                if (++eqIdx === eqLen) {
                    // Key/value separator match!
                    end = i - eqIdx + 1;
                    if (lastPos < end) {
                        key += qs.slice(lastPos, end);
                    }
                    encodeCheck = 0;
                    lastPos = i + 1;
                }
                continue;
            } else {
                eqIdx = 0;
                if (!keyEncoded) {
                    // Try to match an (valid) encoded byte once to minimize unnecessary
                    // calls to string decoding functions
                    if (code === 37/*%*/) {
                        encodeCheck = 1;
                    } else if (encodeCheck > 0 &&
                        ((code >= 48/*0*/ && code <= 57/*9*/) ||
                            (code >= 65/*A*/ && code <= 70/*Z*/) ||
                            (code >= 97/*a*/ && code <= 102/*z*/))) {
                        if (++encodeCheck === 3) {
                            keyEncoded = true;
                        }
                    } else {
                        encodeCheck = 0;
                    }
                }
            }
        }

        if (code === 43/*+*/) {
            if (eqIdx < eqLen) {
                if (i - lastPos > 0) {
                    key += qs.slice(lastPos, i);
                }
                key += '%20';
                keyEncoded = true;
            } else {
                if (i - lastPos > 0) {
                    value += qs.slice(lastPos, i);
                }
                value += '%20';
                valEncoded = true;
            }
            lastPos = i + 1;
        }
    }

    // Check if we have leftover key or value data
    if (pairs > 0 && (lastPos < qs.length || eqIdx > 0)) {
        if (lastPos < qs.length) {
            if (eqIdx < eqLen) {
                key += qs.slice(lastPos);
            }
            else if (sepIdx < sepLen) {
                value += qs.slice(lastPos);
            }
        }
        if (keyEncoded) {
            key = decodeStr(key, decode);
        }
        if (valEncoded) {
            value = decodeStr(value, decode);
        }
        // Use a key array lookup instead of using hasOwnProperty(), which is
        // slower
        if (keys.indexOf(key) === -1) {
            obj[key] = value;
            keys[keys.length] = key;
        } else {
            curValue = obj[key];
            // `instanceof Array` is used instead of Array.isArray() because it
            // is ~15-20% faster with v8 4.7 and is safe to use because we are
            // using it with values being created within this function
            if (curValue instanceof Array) {
                curValue[curValue.length] = value;
            }
            else {
                obj[key] = [curValue, value];
            }
        }
    }

    return obj;
};

module.exports = QueryString;
