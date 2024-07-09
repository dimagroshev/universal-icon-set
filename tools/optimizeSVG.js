const svgo = require('svgo');

const optimizeSVG = svgFile => {
  // Optimize the SVG
  const optimizedSvg = svgo.optimize(svgFile, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  }).data;

  return optimizedSvg;
}

module.exports = optimizeSVG;
