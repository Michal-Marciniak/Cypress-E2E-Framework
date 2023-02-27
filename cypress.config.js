const { defineConfig } = require('cypress');

// ------------ Switching between multiple config files ------------
const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress', 'config', `env.${file}.json`)
  return fs.readJson(pathToConfigFile)
}
// ------------ Switching between multiple config files ------------

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',     // for HTML reports
  reporterOptions: {                            // for HTML reports
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    //"baseUrl": "https://opensource-demo.orangehrmlive.com/web/index.php/auth",
    "includeShadowDom": true,
    "video": false,
    setupNodeEvents(on, config) {
      // for HTML reports
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // accept a configFile value or use dev by default
      const file = config.env.configFile || 'dev'
      return getConfigurationByFile(file)
    },
  },
});
