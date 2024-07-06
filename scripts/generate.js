const fs = require('fs');
const path = require('path');
const toPascalCase = require('../tools/toPascalCase');
const optimizeSVG = require('../tools/optimizeSVG');
const camelCaseSvgParams = require('../tools/camelCaseSvgParams');
const replaceSvgParamsReact = require('../tools/replaceSvgParamsReact');
const replaceSvgParamsVue = require('../tools/replaceSvgParamsVue');
const package = process.env.PACKAGE;
let fileExtension;

switch (package) {
  case 'react':
    fileExtension = 'jsx';
    break;
  case 'vue':
  case 'vue2':
    fileExtension = 'vue';
    break;
  default:
    fileExtension = 'jsx';
    break;
}

const iconsDir = path.join(__dirname, '../icons');
const outputDir = path.join(__dirname, `../packages/${package}/lib/icons`);
const templateFile = path.join(__dirname, `../packages/${package}/lib/Template.${fileExtension}`);
const mainFilePath = path.join(outputDir, 'main.js');

const TEMPLATE_NAME = '{NAME}';
const TEMPLATE_SVG = '{SVG}';

// Read all SVG files from the icons directory
fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error('Error reading icons directory:', err);
    return;
  }

  // Filter out non-SVG files
  const svgFiles = files.filter(file => path.extname(file) === '.svg');

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Clear the output directory
  fs.readdir(outputDir, (err, files) => {
    if (err) {
      console.error('Error reading output directory:', err);
      return;
    }

    files.forEach(file => {
      fs.unlink(path.join(outputDir, file), err => {
        if (err) {
          console.error(`Error deleting file ${file}:`, err);
          return;
        }
      });
    });
  });

  // Generate JSX components for each SVG file
  function generateComponent(file) {
    return new Promise((resolve, reject) => {
      const componentName = toPascalCase(path.basename(file, '.svg'));
      const componentPath = path.join(outputDir, `${componentName}.${fileExtension}`);

      fs.readFile(path.join(iconsDir, file), 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading SVG file ${file}:`, err);
          return;
        }
  
        // Optimize the SVG
        let optimizedSvg;
        optimizedSvg = optimizeSVG(data);
        optimizedSvg = camelCaseSvgParams(optimizedSvg);
        switch (package) {
          case 'react':
            optimizedSvg = replaceSvgParamsReact(optimizedSvg);
            break;
          case 'vue':
          case 'vue2':
            optimizedSvg = replaceSvgParamsVue(optimizedSvg);
            break;
          default:
            optimizedSvg = replaceSvgParamsReact(optimizedSvg);
            break;
        }
  
        // Generate the component code
        fs.readFile(templateFile, 'utf8', (err, templateContent) => {
          if (err) {
            console.error(`Error reading template file:`, err);
            reject(err);
            return;
          }
  
          // Replace anchor tags with SVG tags
          const componentContent = templateContent
            .replace(new RegExp(TEMPLATE_NAME, 'g'), componentName)
            .replace(new RegExp(TEMPLATE_SVG, 'g'), optimizedSvg);
  
          // Write the component to the output directory
          fs.writeFile(componentPath, componentContent, err => {
            if (err) {
              console.error(`${package}: Error writing component ${componentName}:`, err);
              reject(err);
              return;
            }
  
            console.log(`${package}: Successfully generated ${componentName}.${fileExtension}`);
  
            resolve(componentName);
          });
        });
      });
    });
  }

  // Generate components for each SVG file
  const generationPromises = svgFiles.map(file => generateComponent(file));

  Promise.all(generationPromises).then(listOfSuccess => {
    // Generate the main.js file
    fs.readdir(outputDir, (err, files) => {
      if (err) {
        console.error('Error reading output directory:', err);
        return;
      }
  
      const importsExports = listOfSuccess
        .filter(componentName => files.includes(`${componentName}.${fileExtension}`))
        .map(componentName => {
          return `export { default as ${componentName} } from './${componentName}.${fileExtension}';`
        })
        .join('\n');
  
      fs.writeFile(mainFilePath, importsExports, err => {
        if (err) {
          console.error(`${package}: Error writing main file:`, err);
          return;
        }
  
        console.log(`${package}: Successfully generated main file`);
      });
    });
  }).catch(error => {
    console.error('Error during component generation:', error);
  });
});
