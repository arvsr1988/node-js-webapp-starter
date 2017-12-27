var shell = require('shelljs');
var configs = require('./configs.js');
const NodeModuleCopier = require('./node_module_copier')
var artifactDir = configs.artifactDir;
shell.mkdir('-p', artifactDir + "node_modules");
NodeModuleCopier.copy('dist');

['public','views'].forEach(function(directory){
   shell.cp('-rf', directory, artifactDir + directory);
});

shell.cp('app.js', artifactDir);
