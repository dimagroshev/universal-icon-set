const camelCaseSvgParams = (svg) => {
  const camelCaseSvg = svg.replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/fill-opacity/g, 'fillOpacity')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
    .replace(/stroke-opacity/g, 'strokeOpacity')
    .replace(/stroke-width/g, 'strokeWidth');
  return camelCaseSvg;
}

module.exports = camelCaseSvgParams;
