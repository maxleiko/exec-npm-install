var npmInstall = require('../npm-install');

describe('Dummy test', function () {
    this.timeout(10000);

    var options = {
        modules: [
            'kevoree-node-javascript',
            'kevoree-comp-ticker',
            'kevoree-group-ws'
        ],
        prefix: '.deploy_units'
    };

    it('should install 3 modules', function (done) {
        npmInstall(options, function (err) {
            if (err) {
                console.log('Error: '+err.message);
            } else {
                console.log('All set');
            }
            done(err);
        });
    });
});