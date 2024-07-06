const toCamelCase = (string) => {
  return string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );
}

module.exports = toCamelCase;
