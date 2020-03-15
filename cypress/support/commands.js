// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add("mockAndVisit", () => {
    cy.server()

        cy.route('GET', 'https://api.jsonbin.io/b/5e6be60fdf26b84aac0eb316', 'fixture:events.json').as('getEvents')
        cy.route('GET', 'https://api.jsonbin.io/b/5e6be5d707f1954acedf7f20', 'fixture:cities.json').as('getCities')

        cy.visit('http://localhost:3000/');
})

Cypress.Commands.add("getEventByName", (name) => {
    return cy.contains(name)
            .parents('.cypress-event-container')
});
Cypress.Commands.add("confirmDialog", (label = 'Yes') => {
    return cy.focused().contains(label).click();
});