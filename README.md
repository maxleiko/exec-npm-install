# exec-npm-install
Calls npm install in a child_process to prevent npm to take too much memory

### Usage
```js
var execNpmInstall = require('exec-npm-install');

var options = {
  // modules to install
  modules: [
    'kevoree-node-javascript',
    'kevoree-comp-ticker',
    'kevoree-group-ws'
  ],
  // install path (nb. '/path/to/somewhere' => '/path/to/somewhere/node_modules')
  prefix: '/path/to/somewhere'
};

execNpmInstall(options, function (err) {
  if (err) {
    console.log('Error: '+err.message);
  } else {
    console.log('Install sucess');
  }
});
```
> **NB.** When you specify a `prefix`, `npm` will always append to it the `node_modules` folder.
