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
    .replace(/fill="#BABDCC"/g, () => {
      return `:fill="secondColor"`;
    })
    .replace(/stroke="#BABDCC"/g, () => {
      return `:stroke="secondColor"`;
    })
    .replace(/stroke-width="(\d*\.\d+)"/g, () => {
      return `:stroke-width="strokeWidth"`;
    });
  return replacedSvg;
}

module.exports = replaceSvgParamsVue;
