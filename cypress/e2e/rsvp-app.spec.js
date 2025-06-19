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

    it('Has no invalid html @html-validation', () => {
        cy.validateHtml();
    });
});
