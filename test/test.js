var npmInstall = require('../npm-install');

var options = {
    modules: [
        'kevoree-node-javascript',
        'kevoree-comp-ticker',
        'kevoree-group-ws'
    ],
    prefix: '.deploy_units'
};

npmInstall(options, function (err) {
    if (err) {
        console.log('Error: '+err.message);
    } else {
        console.log('All set');
    }
});