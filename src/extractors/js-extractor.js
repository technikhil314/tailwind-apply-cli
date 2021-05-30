const jsTokens = require("js-tokens");

module.exports = function extractCssClassesFromJSX(content) {
  return new Promise((resolve) => {
    let result = [];
    const tokens = Array.from(jsTokens(content, { jsx: true }));
    const isJSX = tokens.find((x) => x.type === "JSXIdentifier");
    if (!isJSX) {
      return [];
    }
    tokens.forEach((token, index) => {
      if (token.type === "JSXIdentifier" && token.value === "className") {
        tokens[index + 2].type === "JSXString" &&
          result.push(tokens[index + 2].value.replace(/["']/g, ""));
      }
    });
    resolve(result);
  });
};
