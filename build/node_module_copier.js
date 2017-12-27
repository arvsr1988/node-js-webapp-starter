let shell = require('shelljs');
const path = require('path');
const rootDir = path.resolve('./');

const alreadyCopied = (module, deployDir) => {
  return shell.test('-d', deployDir + '/node_modules/' + module);
}

function copyDeps(packageFile, deployDir){
  let moduleDeps = require(packageFile).dependencies;
  if(!moduleDeps){
    return;
  }
  for(let dep in moduleDeps){
    if(alreadyCopied(dep, deployDir)){
      continue;
    }
    const moduleDirectory = `${rootDir}/node_modules/${dep}`;
    const deployDirectory = `${deployDir}/node_modules/`;
    shell.mkdir('-p', deployDirectory);
    shell.cp('-rf', moduleDirectory, deployDirectory);
    console.log("copied and processing deps for ", dep);
    copyDeps(`${moduleDirectory}/package.json`, deployDir);
  }
}

class NodeModuleCopier {
  static copy(deployDir){
    shell.mkdir('-p', deployDir + '/node_modules');
    copyDeps(`${rootDir}/package.json`, 'dist/');
  }
}

module.exports = NodeModuleCopier;
