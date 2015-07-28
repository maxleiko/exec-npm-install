var exec    = require('child_process').exec,
    path    = require('path'),
    async   = require('async'),
    exists  = require('./lib/exists');

/**
 *
 * @param options
 * @param callback
 */
function execNpmInstall(options, callback) {
    var cmd = 'npm install';
    var modules = [];

    async.each(
        options.modules,
        function (module, done) {
            exists(module, options.prefix, function (err, exists) {
                if (err) {
                    done(err);
                } else {
                    if (!exists) {
                        modules.push(module);
                    }
                    done();
                }
            });
        },
        function (err) {
            if (err) {
                callback(err);
            } else {
                if (modules.length > 0) {
                    cmd += ' ' + modules.join(' ');

                    if (options.prefix) {
                        cmd += ' --prefix=' + path.resolve(options.prefix)
                    }

                    exec(cmd, callback);
                } else {
                    callback();
                }
            }
        });
}

module.exports = execNpmInstall;
