var debug = require('debug')('uh:tests:test_require');
var path = require('path');
var pathParse = require('path-parse');
var rootRequire = require('root-require');

module.exports = function (file) {
    if (process.env.COVERAGE) {
        var format = pathParse(file);
        if (format.ext === '.jsx') {
            file = path.join(format.root, format.dir, format.name + '.js');
        }
        file = path.join(process.env.COVERAGE_DIR_INSTRUMENT, file);
    }
    else {
        file = file;
    }
    debug('file: ', file);
    return rootRequire(file);
};
