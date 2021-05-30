const getDigest = require("./getShaDigestInitials");

module.exports = function mergeSelectors(acc, currentSelectors) {
  currentSelectors.forEach((selector) => {
    const sortedClassName = selector
      .replace(/\s/g, " ")
      .split(" ")
      .sort()
      .join(" ");
    const cssClassName = getDigest(sortedClassName);
    if (!acc.has(cssClassName)) {
      acc.set(cssClassName, [selector]);
    } else {
      const oldValue = acc.get(cssClassName);
      acc.set(cssClassName, [...new Set([...oldValue, selector])]);
    }
  });
  return acc;
};
