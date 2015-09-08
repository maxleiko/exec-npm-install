var spawn   = require('child_process').spawn,
    path    = require('path'),
    async   = require('async'),
    exists  = require('./lib/exists');

/**
 *
 * @param options
 * @param callback
 */
function execNpmInstall(options, callback) {
    var modules = [];
    var prefix = '';

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
                    if (options.prefix) {
                        prefix = '--prefix=' + path.resolve(options.prefix)+'';
                    }

                    var args = ['install'].concat(modules).concat(prefix);
                    var npm = spawn('npm', args, { env: process.env, stdio: 'inherit', detached: true });
                    npm.on('close', function (code) {
                      if (code !== 0) {
                        //console.log('FAIL: npm '+args.join(' '));
                        callback(new Error('npm '+args.join(' ')));
                      } else {
                        callback();
                        npm.unref();
                      }
                    });
                } else {
                    callback();
                }
            }
        });
}

module.exports = execNpmInstall;
