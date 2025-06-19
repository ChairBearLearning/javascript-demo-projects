/* global cy, describe, beforeEach, it, expect */
import { RPGCreaturePage } from '../elements/pages/index';

describe('RPG Creature @javascript @fcc', () => {
    const navTitles = ['Home', 'RSVP Application', 'RPG Creature Search'];
    const navLinks = ['https://chairbearlearning.github.io', '#rsvp', '#fcc-rpg-creature'];


    beforeEach(() => {
        // update for your path localhost path
        // https://chairbearlearning.github.io/projects/live-demos
        RPGCreaturePage.visit('projects/live-demos');
    });

    it('Has the expected form elements', () => {
        cy.get('form#search-form').within(() => {
            cy.get('label[for="search-input"]').should('exist').and('contain', 'Search for Creature Name or ID:');
            RPGCreaturePage.getCreatureInput().should('exist');
            RPGCreaturePage.getSubmitBtn().should('exist');
        });
    });

    it('Navigation panel is as expected', () => {
        cy.get('nav#the-side-bar-menu')
            .find('.the-bar-block > a')
            .should('have.length', navTitles.length)
            .each(($el, index) => {
                cy.wrap($el)
                    .should('contain', navTitles[index])
                    .and('have.attr', 'href', navLinks[index]);
            });
    });

    it('Has results section and expected format', () => {
        cy.get('div.output-rpg').within(() => {
            RPGCreaturePage.getTopContainer().should('exist')
                .and('have.css', 'background-color', 'rgb(245, 222, 179)');

            RPGCreaturePage.getBtmContainer().should('contain', 'Base')
                .and('contain', 'Stats')
                .and('contain', 'HP:')
                .and('contain', 'Attack:')
                .and('contain', 'Defense:')
                .and('contain', 'Sp. Attack:')
                .and('contain', 'Sp. Defense:')
                .and('contain', 'Speed:');

            cy.get('div.bottom-rpg-container > table').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
        });
    });

    it('Can search for creature and see results update', () => {
        RPGCreaturePage.getCreatureInput().type('PYROLYNX');
        RPGCreaturePage.getSubmitBtn().click();

        RPGCreaturePage.getTopContainer().within(() => {
            cy.get('.name-and-id').should('contain', 'PYROLYNX').and('contain', '#1');
            cy.get('.size').should('contain', 'Weight: 42').and('contain', 'Height: 32');

            cy.get('#types').find('.fire').should('contain', 'FIRE')
                .and('have.css', 'background-color', 'rgb(139, 0, 0)');
        });

        RPGCreaturePage.getBtmContainer().within(() => {
            cy.get('#hp').should('contain', '65');
            cy.get('#attack').should('contain', '80');
            cy.get('#defense').should('contain', '50');
            cy.get('#special-attack').should('contain', '90');
            cy.get('#special-defense').should('contain', '55');
            cy.get('#speed').should('contain', '100');
        });
    });

    it('Creature types are coloured based on type', () => {
        RPGCreaturePage.getCreatureInput().type('Aquoroc');
        RPGCreaturePage.getSubmitBtn().click();

        RPGCreaturePage.getTopContainer().within(() => {
            cy.get('.name-and-id').should('contain', 'AQUOROC').and('contain', '#2');
            cy.get('.size').should('contain', 'Weight: 220').and('contain', 'Height: 53');

            cy.get('#types').find('.water').should('contain', 'WATER')
                .and('have.css', 'background-color', 'rgb(0, 206, 209)');

            cy.get('#types').find('.rock').should('contain', 'ROCK')
                .and('have.css', 'background-color', 'rgb(244, 164, 96)');
        });

        RPGCreaturePage.getBtmContainer().within(() => {
            cy.get('#hp').should('contain', '85');
            cy.get('#attack').should('contain', '90');
            cy.get('#defense').should('contain', '120');
            cy.get('#special-attack').should('contain', '60');
            cy.get('#special-defense').should('contain', '75');
            cy.get('#speed').should('contain', '40');
        });
    });

    it('Check no results return an alert', () => {
        const stub = cy.stub()
        cy.on('window:alert', stub);

        RPGCreaturePage.getCreatureInput().type('chairbear');
        RPGCreaturePage.getSubmitBtn().click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Creature not found');
        });
    });

    it('Has no invalid html @html-validation', () => {
        cy.validateHtml();
    });
});
