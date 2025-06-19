/* global cy, describe, beforeEach, it, expect */
import { RSVPPage } from '../elements/pages/index';

describe('RSVP Application @javascript', () => {
    const navTitles = ['Home', 'RSVP Application', 'RPG Creature Search'];
    const navLinks = ['https://chairbearlearning.github.io', '#rsvp', '#fcc-rpg-creature'];


    beforeEach(() => {
        // update for your path localhost path
        // https://chairbearlearning.github.io/projects/live-demos
        RSVPPage.visit('projects/live-demos');
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

    it('Check contains expected help text', () => {
        cy.get('div#rsvp').within(() => {
            cy.get('span').should('contain', 'What is this project?')
                .and('contain','How to use?');

            cy.get('p').should('contain', 'Features:')
                .and('contain', 'Type an invitee name in the input and submit for it to be showed in the invitee list. ')
                .and('contain', 'Use the provided buttons to edit, delete and download the invitees.')
                .and('contain', 'Use the \'Responded\' checkboxes to filter the invitee list.');
        });
    });

    it('Form has expected fields', () => {
        cy.get('div.wrapper-rsvp').within(() => {
            cy.get('input[name="name"]').should('exist');
            cy.get('button[name="submit"]').should('exist');
            cy.get('button[type="button"]').should('contain', 'Download CSV')
                .and('contain', 'Download Text File');
        });
    });

    it('Can submit invitee and see it in list', () => {
        const name = 'Jason';
        cy.get('div.wrapper-rsvp').within(() => {
            cy.get('input[name="name"]').type(name);
            cy.get('button[name="submit"]').click();

            cy.get('.main').within(() => {
                cy.get('ul#invitedList').find('li').should('contain', name)
                    .and('contain', 'Edit')
                    .and('contain', 'Remove');
            });
        });
    });

    it('Has no invalid html @html-validation', () => {
        cy.validateHtml();
    });
});
