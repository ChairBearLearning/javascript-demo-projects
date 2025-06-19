import 'cypress-axe';
import './fitler-tests';
import './commands';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-mochawesome-reporter/register';

const registerCypressGrep = require('@cypress/grep');

registerCypressGrep();
