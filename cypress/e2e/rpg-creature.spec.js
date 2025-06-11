/* global cy, describe, beforeEach, it, expect */
import { RPGCreaturePage } from '../elements/pages/index';

describe('RPG Creature @javascript @fcc', () => {

    beforeEach(() => {
        // update for your path localhost path
        RPGCreaturePage.visit('fccRPGCreatureSearch/index.html');
    });

    it('Has the expected form elements', () => {
        cy.get('form#search-form').within(() => {
            cy.get('label[for="search-input"]').should('exist').and('contain', 'Search for Creature Name or ID:');
            cy.get('input[name="creature"]').should('exist');
            cy.get('button#search-button').should('exist');
        });
    });

    it('Has results section and expected format', () => {
        cy.get('div.output').within(() => {
            cy.get('div.top-container').should('exist')
                .and('have.css', 'background-color', 'rgb(245,222,179)');

            cy.get('div.bottom-container').should('contain', 'Base')
                .and('contain', 'Stats')
                .and('contain', 'HP:')
                .and('contain', 'Attack:')
                .and('contain', 'Defense:')
                .and('contain', 'Sp. Attack:')
                .and('contain', 'Sp. Defense:')
                .and('contain', 'Speed:');

            cy.get('div.bottom-container > table').should('have.css', 'background-color', 'rgb(34, 51, 204)');
        });
    });

    it('Can search for creature and see results update', () => {
        cy.get('input[name="creature"]').type('PYROLYNX');
        cy.get('button#search-button').click();

        cy.get('div.top-container').within(() => {
            cy.get('.name-and-id').should('contain', 'PYROLYNX').and('contain', '#1');
            cy.get('.size').should('contain', 'Weight: 42').and('contain', 'Height: 32');

            cy.get('#types').find('.fire').should('contain', 'FIRE')
                .and('have.css', 'background-color', 'rgb(139, 0, 0)');
        });

        cy.get('div.bottom-container').within(() => {
            cy.get('#hp').should('contain', '65');
            cy.get('#attack').should('contain', '80');
            cy.get('#defense').should('contain', '50');
            cy.get('#special-attack').should('contain', '90');
            cy.get('#special-defense').should('contain', '55');
            cy.get('#speed').should('contain', '100');
        });
    });
});
