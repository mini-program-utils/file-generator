const fs = require('fs');

const PAGE_DIR = `pages`;
const COMPONENT_DIR = `components`;

const checkDirExists = dir => fs.existsSync(dir);

const createDir = dir => {
  fs.mkdirSync(dir);
};

const checkRepeat = (name, dir) => {
  fs.readdirSync(dir).forEach(dirInner => {
    if (dirInner === name) {
      throw new Error(`${name} Component or Page is existed`);
    }
  });
};

const createFiles = (name, dir) => {
  checkRepeat(name, dir);
  createDir(dir + '/' + name);

  const fileTypes = ['.js', '.wxss', '.wxml', '.json'];
  fileTypes.forEach(fileType => {
    fs.writeFileSync(dir + '/' + name + '/' + name + fileType);
  });
};

const writeToJSON = () => {};

const createLogic = dir => name => {
  if (!checkDirExists(dir)) {
    createDir(dir);
  }
  createFiles(name, dir);
};

const createPage = createLogic(PAGE_DIR);
const createComponent = createLogic(COMPONENT_DIR);

module.exports = {
  createPage,
  createComponent
};
