var fs = require('fs');
var path = require('path');

var targetFileName = process.argv[2];
var dataFileName   = process.argv[3];

if (!fs.existsSync(targetFileName)) {
    var tmpName = targetFileName;
    tmpName += '.exe';
    targetFileName = path.join('Release', tmpName);
    if (!fs.existsSync(targetFileName)) {
        targetFileName = path.join('Debug', tmpName);
    }
}

var bufferData = fs.readFileSync(dataFileName);

fs.appendFile(targetFileName, bufferData);
