const fs = require('fs');
const path = require('path');
const toPascalCase = require('../tools/toPascalCase');

const iconFolderPath = path.join(__dirname, '../icons');
const iconProFolderPath = path.join(__dirname, '../icons-pro');

function createIconsTree(folderPath, isFree = true) {
  const folders = fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  folders.forEach(folder => {
    const type = folder.name;
    const typePath = path.join(folderPath, type);

    const categories = fs.readdirSync(typePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    categories.forEach(category => {
      const categoryName = category.name;
      const categoryPath = path.join(typePath, categoryName);

      const files = fs.readdirSync(categoryPath)
        .filter(file => !file.includes('Sharp'));

      files.forEach(file => {
        const iconName = path.parse(file).name;
        const componentName = toPascalCase(iconName);
        const hasSharp = fs.existsSync(path.join(categoryPath, `${iconName} Sharp.svg`));
        const result = {
          fileName: iconName,
          name: componentName,
          type,
          category: categoryName,
          hasSharp,
          isFree,
        };

        iconsTree[categoryName] = iconsTree[categoryName] || {};
        iconsTree[categoryName][result.name] = iconsTree[categoryName][result.name] || [];
        iconsTree[categoryName][result.name].push(result);
      });
    });
  });
}

const iconsTree = {};
createIconsTree(iconFolderPath);

// Generate icons tree for pro icons
if (fs.existsSync(iconProFolderPath) && fs.readdirSync(iconProFolderPath).length) {
  createIconsTree(iconProFolderPath, false);
}

const iconsTreeJson = JSON.stringify(iconsTree, null, 2);

// Create json file with icons tree
fs.writeFileSync(path.join(__dirname, '../icons/icons-tree.json'), iconsTreeJson);
