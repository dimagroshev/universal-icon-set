const toCamelCase = require('./toCamelCase');

const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);

  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

module.exports = toPascalCase;
