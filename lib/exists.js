var path    = require('path'),
    fs      = require('fs'),
    npmView = require('./npm-view');

/**
 *
 * @param module
 * @param prefix
 * @param callback
 */
function exists(module, prefix, callback) {
    fs.readFile(path.resolve(prefix, 'node_modules', module.split('@')[0], 'package.json'), 'utf8', function (err, data) {
        if (err) {
            if (err.code === 'ENOENT') {
                callback(null, false);
            } else {
                callback(err);
            }
        } else {
            var pkg = JSON.parse(data);

            var m = module.split('@');
            if (m.length === 2) {
              if (m[1] === 'latest') {
                npmView({ module: module, fields: ['version'] }, function (err, data) {
                  if (err) {
                    callback(err);
                  } else {
                    if (data === pkg.version) {
                      callback(null, true);
                    } else {
                      callback(null, false);
                    }
                  }
                });
              } else {
                if (pkg.version === m[1]) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
              }
            } else {
                npmView({ module: module, fields: ['version'] }, function (err, data) {
                    if (err) {
                        callback(err);
                    } else {
                        if (pkg.version === data) {
                            callback(null, true);
                        } else {
                            callback(null, false);
                        }
                    }
                });
            }
        }
    });
}

module.exports = exists;
