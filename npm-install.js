var exec    = require('child_process').exec,
    path    = require('path'),
    async   = require('async'),
    exists  = require('./lib/exists');

/**
 *
 * @param options
 * @param callback
 */
function npmInstall(options, callback) {
    var cmd = 'node node_modules/npm/cli.js install';
    var modules = [];

    async.each(
        options.modules,
        function (module, done) {
            exists(module, options.prefix, function (err, exist) {
                if (err) {
                    done(err);
                } else {
                    if (!exist) {
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

                    console.log('=============');
                    console.log(modules);
                    console.log(options.prefix);
                    console.log('=============');
                    exec(cmd, callback);
                } else {
                    callback();
                }
            }
        });
}

module.exports = npmInstall;
