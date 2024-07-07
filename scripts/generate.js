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

const iconsTree = path.join(__dirname, '../icons/icons-tree.json');
const iconsDir = path.join(__dirname, '../icons');
const iconsProDir = path.join(__dirname, '../icons-pro');
const outputDir = path.join(__dirname, `../packages/${package}/lib/icons`);
const templateFile = path.join(__dirname, `../packages/${package}/lib/Template.${fileExtension}`);
const mainFilePath = path.join(outputDir, 'main.js');

const TEMPLATE_NAME = '{NAME}';
const TEMPLATE_SVG = '{SVG}';
const TEMPLATE_SVG_SHARP = '{SVG_SHARP}';

const formattedSvg = (svg) => {
  let optimizedSvg;
  optimizedSvg = optimizeSVG(svg);
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

  return optimizedSvg;
};

// Read all SVG files from the JSON file
fs.readFile(iconsTree, 'utf8', (err, iconsData) => {
  if (err) {
    console.error('Error reading icons tree:', err);
    return;
  }

  // Filter out non-SVG files
  const svgList = []
  Object.values(JSON.parse(iconsData)).forEach(category => {
    Object.values(category).forEach(icons => {
      icons.forEach(icon => {
        if(icon.isFree) {
          svgList.push({
            ...icon,
            path: path.join(iconsDir, `${icon.type}/${icon.category}/${icon.fileName}.svg`)
          });
        } else {
          svgList.push({
            ...icon,
            path: path.join(iconsProDir, `${icon.type}/${icon.category}/${icon.fileName}.svg`)
          });
        }
      });
    });
  });

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
  function generateComponent(icon) {
    return new Promise((resolve, reject) => {
      const componentName = toPascalCase(`${icon.name}-${icon.type}`);
      const componentPath = path.join(outputDir, `${componentName}.${fileExtension}`);

      fs.readFile(path.join(icon.path), 'utf8', async (err, data) => {
        if (err) {
          console.error(`Error reading SVG file ${icon.path}:`, err);
          return;
        }
  
        // Optimize the SVG
        const optimizedSvg = formattedSvg(data);

        // Check if the SVG has a Sharp variant
        let optimizedSharpSvg;
        if (icon.hasSharp) {
          try {
            const sharpData = await fs.readFileSync(path.join(icon.path.replace('.svg', ' Sharp.svg')), 'utf8');
            // Optimize the Sharp SVG
            optimizedSharpSvg = formattedSvg(sharpData);
          } catch (err) {
            console.error(`Error reading SVG file ${icon.path.replace('.svg', ' Sharp.svg')}:`, err);
          }
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
            .replace(new RegExp(TEMPLATE_SVG, 'g'), optimizedSvg)
            .replace(new RegExp(TEMPLATE_SVG_SHARP, 'g'), optimizedSharpSvg || null);
  
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
  const generationPromises = svgList.map(icon => generateComponent(icon));

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
