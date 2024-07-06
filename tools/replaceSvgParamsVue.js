const replaceSvgParamsVue = (svg) => {
  const replacedSvg = svg
    .replace(/width="(\d+)"/g, () => {
      return `:width="size"`;
    })
    .replace(/height="(\d+)"/g, () => {
      return `:height="size"`;
    })
    .replace(/fill="#000"/g, () => {
      return `:fill="color"`;
    })
    .replace(/stroke="#000"/g, () => {
      return `:stroke="color"`;
    })
    .replace(/strokeWidth="(\d*\.\d+)"/g, () => {
      return `:strokeWidth="strokeWidth"`;
    });
  return replacedSvg;
}

module.exports = replaceSvgParamsVue;