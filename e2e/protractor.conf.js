<<<<<<< HEAD
// @ts-check
=======
>>>>>>> 3f865d70f6ebffbcc695030612f934eb72467029
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

<<<<<<< HEAD
/**
 * @type { import("protractor").Config }
 */
=======
>>>>>>> 3f865d70f6ebffbcc695030612f934eb72467029
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  capabilities: {
<<<<<<< HEAD
    browserName: 'chrome'
=======
    'browserName': 'chrome'
>>>>>>> 3f865d70f6ebffbcc695030612f934eb72467029
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
<<<<<<< HEAD
      project: require('path').join(__dirname, './tsconfig.json')
=======
      project: require('path').join(__dirname, './tsconfig.e2e.json')
>>>>>>> 3f865d70f6ebffbcc695030612f934eb72467029
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};