# Storied Node Seed project

This project is a reference boilerplate for Storied Node.JS projects. When starting a new NodeJS microservice, simply clone this project.
This project should be kept up to date.

For existing node services, simply use this project as a reference on how to do things.

## High level project folder Structure

* `app` Contains the app source code.
* `test` Contains all of our tests.
* `dist` Contains the compiled source code.
* `node_modules` Contains 3rd party library code.

## Installation
1. Make sure you have `NodeJS` and `NPM` on your machine
2. Clone this repository to your machine.
3. Run `npm install` to install all the dependencies.

## Installing 3rd party Typescript Types
You'll often need 3rd party Typescript definitions. These can be prepackaged with the external module, if not, install them from Microsoft's @types npm repository.

1. Search microsoft's @types repository for the dependency.
2. Use `npm install @types/{your_library_name_here} --save`
3. Think about your fellow developers! Don't forget to add types to package.json.

## Local Development

The following scripts are available in package.json for local development.

* `npm start` - starts a local server, which restarts when any of your typescript files change.
* `npm run serve` - alias for npm start
* `npm build` - compiles all the Typescript and places it inside the `dist` folder.
* `npm run coverage` - testing code coverage and generates a coverage folder in the root folder.

## Environment variables

Environment variables and constants are set in the `env.json` file. Always set a default value. The environment specific variables can override the defaults.

To run an app against a different environment set the env node variable like this
`env=production npm start` where the environment name matches the key in the JSON file.

Then import the environment variables in code 
`import env from './config/env';`


## Routing and App code Structure

Todo: Someone add an example route and controller and document it.


## Tests

Todo: Someone add an example test and document it.

## Code coverage

Code coverage so we can see how much % of the code in our services is tested with the written mocha tests.

* Install istanbul: `npm install istanbul --save-dev`
* In the package.json add the following code to "scripts": `"coverage": "istanbul cover --report html node_modules/mocha/bin/_mocha -- --reporter spec --check-leaks ./dist/test/**/*.js"`
* Use `npm run coverage`
* The html file is generated inside the coverage folder.

## TravisCI Builds

* use `npm run build`
* copy both the node_modules and the `dist` folder to your webserver
* run the index.js process using `node` or a process mananger like PM2.

## CodeDeploy Deployments

See Appspec.yml and the deploy folder for deployment instructions.