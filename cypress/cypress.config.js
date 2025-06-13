/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require('cypress');
const mochawesomeReporter = require('cypress-mochawesome-reporter/plugin');
const cypressGrep = require('@cypress/grep/src/plugin');

module.exports = defineConfig({
    env: {
        WCAG_RULES: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
        grepOmitFiltered: true,
        grepIntegrationFolder: '../../',
    },
    browser: 'chrome',
    pageLoadTimeout: 120000,
    chromeWebSecurity: false,
    video: false,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        charts: true,
        reportPageTitle: 'Stellar Automation Report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
    },
    e2e: {
        setupNodeEvents(on, config) {
            const baseUrl = config.env.BASE_URL || null;
            if (baseUrl) {
                config.baseUrl = baseUrl;
            }
            (cypressGrep)(config);
            (mochawesomeReporter)(on);
            return config;
        },
        supportFile: 'cypress/support/e2e.js',
        specPattern: 'cypress/e2e/*.spec.js',
        excludeSpecPattern: ['*.md'],
        baseUrl: 'https://example.com',
    },

});
