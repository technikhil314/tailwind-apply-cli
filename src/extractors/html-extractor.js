const parse5 = require("parse5");
const htmlparser = require("parse5-htmlparser2-tree-adapter");

function getSelectorsInElement(element) {
  const result = [];
  for (const [name, value] of Object.entries(element.attribs)) {
    if (name === "class") {
      result.push(value);
    }
  }
  return [...getSelectorsInNodes(element), ...result];
}
function getSelectorsInNodes(node) {
  let result = [];
  for (const childNode of node.children) {
    const element = childNode;
    switch (element.type) {
      case "tag":
        result = [...result, ...getSelectorsInElement(element)];
        break;
      case "root":
        result = [...result, ...getSelectorsInElement(element)];
        break;
      default:
        break;
    }
  }
  return result;
}
function extractCssClassesFromHTML(content) {
  return new Promise((resolve) => {
    const tree = parse5.parse(content, {
      treeAdapter: htmlparser,
    });
    resolve(getSelectorsInNodes(tree));
  });
}
module.exports = extractCssClassesFromHTML;
