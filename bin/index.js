#! /usr/bin/env node

const meow = require("meow");
const tailwindAutoApplier = require("../index.js");

const cli = meow(
  `
    Usage
      $ twapply <your-glob-pattern>
 
    Examples
      $ twapply 

    Types of badges
    Badge Name                      | Purpose of the badge
    ----------------------------------------------------------------------------------------
    build                           | Badge related to ci/cd pipeline status
    coverage                        | Test coverage percentage
    dependancies                    | Current status of all dependancy updates
    downloads                       | Count of downloads per month
    ghFork                          | Github fork repo
    ghStar                          | Github start repo
    allContributers                 | all contributers count
    codeOfConduct                   | code of conduct of github repo
    license                         | license of package from package.json
    size                            | size of npm package
    version                         | version of npm package
    ----------------------------------------------------------------------------------------
`,
  {
    flags: {
      exclude: {
        type: "string",
        alias: "e",
        isMultiple: true,
        default: ["node_modules/**/*"],
      },
    },
  }
);

tailwindAutoApplier(cli.input[0], cli.flags);
