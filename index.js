// TODO: Include packages needed for this application
const inquirer = require(`inquirer`);
const fs = require(`fs`);

// TODO: Create an array of questions for user input
const questions = [
  {
    name: `title`,
    type: `input`,
    message: `What is the title of your project?`,
  },
  {
    name: `description`,
    type: `inpupt`,
    message: `Give a brief description of your project.`,
  },
  {
    name: `motivation`,
    type: `input`,
    message: `What was your motivation?`,
  },
  {
    name: `build`,
    type: `input`,
    message: `Why did you build this project?`,
  },
  {
    name: `problem`,
    type: `input`,
    message: `What problem does it solve?`,
  },
  {
    name: `learn`,
    type: `input`,
    message: `What did you learn?`,
  },
  {
    name: `installation`,
    type: `input`,
    message: `How does someone install this project?`,
    default: `N/A`,
  },
  {
    name: `usage`,
    type: `input`,
    message: `Give some instructions for use.`,
  },
  {
    name: `screenshot`,
    type: `confirm`,
    message: `Would you like to include a screenshot?`,
  },
  {
    name: `contributeYN`,
    type: `confirm`,
    message: `Did anyone else contribute to this project?`,
  },
  {
    name: `contributers`,
    type: `input`,
    message: `Type their name followed by a comma and their GitHub username. Separate any other people with a colon.\nExample: Joshua Tuinder, TuinderJ: Cassidy Younggreen, cyounggreen`,
    when: answers => answers.contributeYN,
    // default: `Joshua Tuinder, TuinderJ: Cassidy Younggreen, cyounggreen`,
  },
  {
    name: `tests`,
    type: `input`,
    message: `Describe how someone can test this application.`,
    default: `N/A`,
  },
  {
    name: `license`,
    type: `list`,
    message: `Which license are you using?`,
    choices: [
      `N/A`,
      `Apache License 2.0`,
      `GNU General Public License v3.2`,
      `MIT License`,
      `BSD 2-Clause "Simplified" License`,
      `BSD 3-Clause "New" or "Revised" License`,
      `Boost Software License 1.0`,
      `Creative Commons Zero v1.0 Universal`,
      `Eclipse Public License 2.0`,
      `GNU Affero General Public License v3.0`,
      `GNU Lesser General Public License v2.1`,
      `Mozilla Public License 2.0`,
      `The Unlicense`,
    ],
  },
  {
    name: `username`,
    type: `input`,
    message: `What is your GitHub username`,
    validate: answer => (answer !== `` ? true : `This can't be left blank`),
  },
  {
    name: `email`,
    type: `input`,
    message: `What is your email address?`,
    validate: answer => (answer !== `` ? true : `This can't be left blank`),
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, error => (error ? console.error(error) : console.log(`Success`)));
}

// TODO: Create a function to initialize app
async function init() {
  inquirer.prompt(questions).then(answers => {
    let contributers;
    if (answers.contributeYN) {
      contributers = answers.contributers.split(`:`);
    }

    let license;
    switch (answers.license) {
      case `N/A`:
        break;
      case `Apache License 2.0`:
        license = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        break;
      case `GNU General Public License v3.0`:
        license = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        break;
      case `MIT License`:
        license = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
        break;
      case `BSD 2-Clause "Simplified" License`:
        license = `[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`;
        break;
      case `BSD 3-Clause "New" or "Revised" License`:
        license = `[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
        break;
      case `Boost Software License 1.0`:
        license = `[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
        break;
      case `Creative Commons Zero v1.0 Universal`:
        license = `[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)`;
        break;
      case `Eclipse Public License 2.0`:
        license = `[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)`;
        break;
      case `GNU Affero General Public License v3.0`:
        license = `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
        break;
      case `GNU Lesser General Public License v2.1`:
        license = `[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`;
        break;
      case `Mozilla Public License 2.0`:
        license = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        break;
      case `The Unlicense`:
        license = `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`;
        break;
      default:
    }

    let readmeText = `# ${answers.title ? answers.title : `Title`}
## Description
${license ? `\n${license}\n` : ``}
${answers.description ? answers.description : `Please provide a short description explaining the what, why and how of your project.`}

- ${answers.motivation ? answers.motivation : `What was your motivation?`}
- ${answers.build ? answers.build : `Why did you build this project?`}
- ${answers.problem ? answers.problem : `What problem does it solve?`}
- ${answers.learn ? answers.learn : `What did you learn?`}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage ? answers.usage : `Provide instructions and examples for use. Include screenshots as needed.`}
${answers.screenshot ? `\n![screenshot](assets/images/screenshot.png)\n` : ``}
## Credits

`;

    if (answers.contributeYN) {
      contributers.forEach(contributer => {
        const currentContributer = contributer.split(`,`);
        readmeText += `- [${currentContributer[0].trim()}](https://github.com/${currentContributer[1].trim()}/)\n`;
      });
    } else {
      readmeText += `\nN/A\n`;
    }

    readmeText += `## License

${answers.license}

## Tests

${answers.tests ? answers.tests : `N/A`}

## Questions

If you have any questions about this project, [visit my GitHub Profile](https://github.com/${answers.username}/) or [Email Me](mailto:${answers.email})`;

    writeToFile(`README.md`, readmeText);
  });
}

// Function call to initialize app
init();
