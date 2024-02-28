const { defineConfig } = require("cypress");
const {addCucumberPreprocessorPlugin,} = require("@badeball/cypress-cucumber-preprocessor");
const {preprocessor,} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}


module.exports = defineConfig({
  defaultCommandTimeout: 6000,

  env:{
    url: "https://rahulshettyacademy.com"
  },

  retries: {
    runMode: 1,
    },
    
  projectId: "fhutnm",
  
  e2e: {
    
    //specPattern: 'cypress/integration/examples/*.js',
    //Need this to use feature files instead of .js test spec files
    specPattern: 'cypress/integration/examples/BDD/*.feature',
    screenshotsFolder: 'cypress/failures/screenshots',
    setupNodeEvents
  },
});
