# Cypress-E2E-Framework

This is a test automation framework written in cypress, for both UI testing and REST API testing.

## Installation

Install the dependencies and devDependencies required to execute tests.

```sh
cd {path_to_your_installation_directory}
npm i
```

## Features

- Implementing POM pattern
- UI & API test cases
- Data Driven Testing using fixtures
- Mochawesome-reporter added to generate HTML reports of test execution
- Ability to run tests on various environments, e.g. dev, qa or prod.
- Custom commands added in commands.js file

## Running tests

- To run all tests under the e2e folder, execute the following command:
```sh
npx cypress run
```
- To run specific tests, add **--spec** flag:
```sh
npx cypress run --spec path_to_folder_with_specific_tests

For example, if you want to run all the tests, which are under the UI folder, you can execute following command:

npx cypress run --spec cypress/e2e/UI/*.cy.js
```
- To run tests in specific browser, add **--browser** flag:
```sh
npx cypress run --spec path_to_folder_with_specific_tests --browser your_browser

For example, if you want to run all the tests, which are under the UI folder in chrome browser, you can execute following command:

npx cypress run --spec cypress/e2e/UI/*.cy.js --browser chrome
```
- By default, cypress runs tests in headless mode. To run tests in not headless mode, add **--headed** flag:
```sh
npx cypress run --spec path_to_folder_with_specific_tests --browser your_browser --headed
```

## Running tests in different environments

To run tests in different environments, add the **--env** flag:

- QA environment
```sh
npx cypress run --spec path_to_folder_with_specific_tests --browser your_browser --env configFile=qa
```
- DEV environment
```sh
npx cypress run --spec path_to_folder_with_specific_tests --browser your_browser --env configFile=dev
```
- PRODUCTION environment
```sh
npx cypress run --spec path_to_folder_with_specific_tests --browser your_browser --env configFile=prod
```

## HTML Reports

HTML reports are generated under the reports folder
