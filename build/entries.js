const path = require('path');
const glob = require('glob');

const projectJs = path.resolve(__dirname,'../src/modules/');
const globalPath = projectJs+'/**/*.js';

let entries = ((globalPath)=>{

  let entries = {},
    entryName;

  glob.sync(globalPath).forEach((entryPath)=>{
    entryName = path.basename(entryPath, path.extname(entryPath));
    entries[entryName] = entryPath;
  });

  return entries;

})(globalPath);

module.exports = entries;
