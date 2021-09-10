# AngularCodeCoverage

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


## Instrument Application Code - 
* Install ngx-build-plus to extends the Angular CLI's build process and instrument the code
`npm i -D ngx-build-plus`

* Add webpack coverage config file coverage.webpack.js to cypress folder
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        options: { esModules: true },
        enforce: 'post',
        include: require('path').join(__dirname, '..', 'src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/,
          /(ngfactory|ngstyle)\.js/
        ]
      }
    ]
  }
};
```
* Update serve object inside angular.json to use ngx-build with extra config

`"builder": "ngx-build-plus:dev-server",`

* Instrument JS files with istanbul-lib-instrument for subsequent code coverage reporting

`npm i -D istanbul-instrumenter-loader --legacy-peer-deps`

###### --legacy-peer-deps: ignore all peerDependencies when installing, In the new version of npm (v7), by default, npm install will fail when it encounters conflicting peerDependencies. 

When the app starts with yarn start, you should see the coverage information under window.__coverage__ information.

* Exclude files
If you want to exclude files from coverage, for example src/serviceWorker.js, add an object named nyc to package.json following the nyc CLI configuration.

```
"nyc": {
    "exclude": [
      "src/main.ts"
    ]
  }
```

### `exclude files from coverage using nyc setup not working - please comment if I'm missing something`

[instrument-cra-known-issue](https://github.com/cypress-io/instrument-cra/issues/188)

So, meanwhile please use the following command in the terminal of your project: - 

`npx nyc report --reporter=lcov`

## Save the code coverage collected during Cypress tests - [code-coverage](https://www.npmjs.com/package/@cypress/code-coverage)

`npm install -D @cypress/code-coverage`

Add to your cypress/support/index.js file
`import '@cypress/code-coverage/support'`

Register tasks in your cypress/plugins/index.js file
```
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)

  // add other tasks to be registered here

  // IMPORTANT to return the config object
  // with the any changed environment variables
  return config
}
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running E2E tests in headed mode

Run `ng test` to execute the E2E tests via [Cypress](https://www.cypress.io/).

## Running E2E tests in headless mode

Run `ng run cy:run` to execute the E2E tests via [Cypress](https://www.cypress.io/).
