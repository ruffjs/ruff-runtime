var fs = require("fs");

var fileName = process.argv[2];
var label    = process.argv[3];

var fsBuffer = fs.readFileSync(fileName);

var pos = 0;

var labelFileName = 'ruff_' + label;
print('#ifndef ' + labelFileName + '\n');

print('#define ' + labelFileName + '\n');

print("const unsigned char " + label + "[] = {\n");

while (pos < fsBuffer.length) {
    print(
        (pos % 12 === 0 ? ' ' : '')
        + ' 0x'
        + (fsBuffer[pos].toString(16).length == 1 ? '0' : '')
        + fsBuffer[pos].toString(16)
        + (pos < fsBuffer.length - 1 ? ',' : '')
    );
    pos++;
    if (pos % 12 == 0) {
        print("\n");
    }
}

print("\n};\n");

print("unsigned int " + label + "_len = " + fsBuffer.length + ";\n");

print('#endif\n');

function print(s) {
    process.stdout.write(s);
}
