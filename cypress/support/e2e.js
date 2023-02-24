// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

Cypress.config('baseUrl', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth')

/// <refrence types="Cypress" />
import './commands'
import 'cypress-iframe'
import 'cypress-xpath'
import 'cypress-file-upload'
import 'cypress-mochawesome-reporter/register'
