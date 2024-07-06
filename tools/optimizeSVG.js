const svgo = require('svgo');

const optimizeSVG = svgFile => {
  // Optimize the SVG
  const optimizedSvg = svgo.optimize(svgFile).data;

  return optimizedSvg;
}

module.exports = optimizeSVG;
