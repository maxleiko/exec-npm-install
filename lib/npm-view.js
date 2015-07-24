var path = require('path');
var exec = require('child_process').exec;

/**
 *
 * @param options
 * @param callback
 */
function npmView(options, callback) {
  var cmd = 'node '+path.resolve(__dirname, '..', 'node_modules/npm/cli.js')+' view';

  if (options.module) {
    cmd += ' ' + options.module;
  }

  if (options.fields) {
    cmd += ' ' + options.fields.join(' ');
  }

  exec(cmd, function (err, stdout) {
    if (err) {
      callback(err);
    } else {
      callback(null, stdout.trim());
    }
  });
}

module.exports = npmView;
