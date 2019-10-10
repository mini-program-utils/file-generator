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
  createDir(dir + '/' + name);

  const fileTypes = ['.js', '.wxss', '.wxml', '.json'];
  fileTypes.forEach(fileType => {
    fs.writeFileSync(dir + '/' + name + '/' + name + fileType, '');
  });
};

const writeToJSON = (name, dir) => {
  const text = fs.readFileSync('app.json', 'utf-8');
  let content = JSON.parse(text);
  if (dir === PAGE_DIR) {
    content = {
      ...content,
      pages: [...content.pages, `pages/${name}/${name}`]
    };
  }

  if (dir === COMPONENT_DIR) {
    content = {
      ...content,
      usingComponents: content.usingComponents
        ? {
            ...content.usingComponents,
            [name]: `./components/${name}/${name}`
          }
        : { [name]: `./components/${name}/${name}` }
    };
  }

  fs.writeFileSync('app.json', JSON.stringify(content, null, 2));
};

const createFactory = dir => name => {
  // Check if the directory is existed
  if (!checkDirExists(dir)) {
    createDir(dir);
  }

  // Check if the directory has that name
  checkRepeat(name, dir);

  createFiles(name, dir);

  // add path in app.json
  writeToJSON(name, dir);
};

const createPage = createFactory(PAGE_DIR);
const createComponent = createFactory(COMPONENT_DIR);

module.exports = {
  createPage,
  createComponent
};
