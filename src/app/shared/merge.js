const fs = require('fs');

const localPackageJson = require('../../../package.json');
const sharedPackageJson = require('./package.json');

Object.assign(localPackageJson.dependencies, sharedPackageJson.dependencies);
Object.assign(localPackageJson.devDependencies, sharedPackageJson.devDependencies);

try {
  fs.writeFileSync('package.json', JSON.stringify(localPackageJson, null, 2), 'utf8');
} catch (e) {
  console.log(e);
}
