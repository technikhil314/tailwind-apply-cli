const globby = require("globby");
const path = require("path");
const fsPromises = require("fs").promises;
const htmlParser = require("./extractors/html-extractor");
const jsParser = require("./extractors/js-extractor");
const { extensions } = require("./constants");
const mergeSelectors = require("./mergeSelectors");
const finalSelectors = new Map();
module.exports = async function main(input, flags) {
  const paths = await globby([input, ...flags.exclude.map((x) => `!${x}`)]);
  await fsPromises.writeFile(
    process.cwd() + "/tailwind.css",
    `
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
    `
  );
  await Promise.all(
    paths.map(async (filePath) => {
      const absfilePath = path.resolve(process.cwd(), filePath);
      const fileContent = await fsPromises.readFile(absfilePath);
      const fileTextContent = fileContent.toString();
      if (filePath.match(extensions.html)) {
        return htmlParser(fileTextContent).then((currentSelectors) =>
          mergeSelectors(finalSelectors, currentSelectors)
        );
      }
      if (filePath.match(extensions.jsx)) {
        return jsParser(fileTextContent).then((currentSelectors) =>
          mergeSelectors(finalSelectors, currentSelectors)
        );
      }
    })
  );
  await Promise.all(
    paths.map(async (filePath) => {
      const absfilePath = path.resolve(process.cwd(), filePath);
      const fileContent = await fsPromises.readFile(absfilePath);
      let fileTextContent = fileContent.toString();
      finalSelectors.forEach(async (value, key) => {
        fileTextContent = fileTextContent.replace(
          new RegExp(`${value.join("|")}`, "g"),
          key
        );
        await fsPromises.truncate(absfilePath);
        await fsPromises.writeFile(absfilePath, fileTextContent);
      });
    })
  );
  finalSelectors.forEach(async (value, key) => {
    console.log(key, value);
    await fsPromises.appendFile(
      process.cwd() + "/tailwind.css",
      `
            ._${key} {
                @apply ${value[0]}
            }
        `
    );
  });
};
