/* global cy, describe, beforeEach, it, expect */
import { RSVPPage } from '../elements/pages/index';

describe('RSVP Application @javascript', () => {
    const navTitles = ['Home', 'RSVP Application', 'RPG Creature Search'];
    const navLinks = ['https://chairbearlearning.github.io', '#rsvp', '#fcc-rpg-creature'];
    const name = 'Jason';
    const nameTwo = 'Marquee';

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

    it('Can edit invitee', () => {
        RSVPPage.createInvitee(name);
        cy.get('div.wrapper-rsvp').within(() => {
            cy.get('.main').within(() => {
                cy.get('ul#invitedList').find('li').contains(name).parentsUntil('ul#invitedList').find('button').contains('Edit').click();

                cy.get('ul#invitedList').find('input[type="text"]').type('Amended');
                cy.get('ul#invitedList').find('button').contains('Save');
                cy.get('ul#invitedList').find('input[type="text"]').invoke('val')
                    .then((element) => {
                        expect(element).to.be.equal(`${name}Amended`);
                    });
            });
        });
    });

    it('Can delete invitee', () => {
        RSVPPage.createInvitee(name);
        cy.get('div.wrapper-rsvp').within(() => {
            cy.get('.main').within(() => {
                cy.get('ul#invitedList').find('li').should('contain', name);
                cy.get('ul#invitedList').find('li').contains(name).parentsUntil('ul#invitedList').find('button').contains('Remove').click();
                cy.get('ul#invitedList').find('li').should('not.exist');
            });
        });
    });

    it('Can confirm invitees and filter for confirmed', () => {
        RSVPPage.createInvitee(name);
        RSVPPage.createInvitee(nameTwo);

        cy.get('div.wrapper-rsvp').within(() => {
            cy.get('.main').within(() => {
                cy.get('ul#invitedList').find('li').contains(name).parentsUntil('ul#invitedList').within(() => {
                    cy.get('input[type="checkbox"]').check();
                });
            });

            cy.get('label').contains('Hide Unresponded').parentsUntil('.main').within(() => {
                cy.get('input[type="checkbox"]').check();
            });

            cy.get('ul#invitedList').find('li').contains(nameTwo).parentsUntil('ul#invitedList').should('have.css', 'display', 'none');
            cy.get('ul#invitedList').find('li.responded').should('exist')
                .and('have.css', 'display', 'list-item')
                .and('contain', name);

            cy.get('label').contains('Hide Unresponded').parentsUntil('.main').within(() => {
                cy.get('input[type="checkbox"]').uncheck();
            });

            cy.get('ul#invitedList').find('li').contains(nameTwo).parentsUntil('ul#invitedList').should('have.css', 'display', 'list-item');
        });
    });

    it('Can confirm invitees and filter for unconfirmed', () => {
        RSVPPage.createInvitee(name);
        RSVPPage.createInvitee(nameTwo);

        cy.get('div.wrapper-rsvp').within(() => {
            cy.get('.main').within(() => {
                cy.get('ul#invitedList').find('li').contains(name).parentsUntil('ul#invitedList').within(() => {
                    cy.get('input[type="checkbox"]').check();
                });
            });

            cy.get('label').contains('Show Unresponded Only').parentsUntil('.main').within(() => {
                cy.get('input[type="checkbox"]').check();
            });

            cy.get('ul#invitedList').find('li').contains(name).parentsUntil('ul#invitedList').should('have.css', 'display', 'none')
                .and('have.class', 'responded');
            cy.get('ul#invitedList').find('li').not('.responded').should('exist')
                .and('have.css', 'display', 'list-item')
                .and('contain', nameTwo);

            cy.get('label').contains('Show Unresponded Only').parentsUntil('.main').within(() => {
                cy.get('input[type="checkbox"]').uncheck();
            });

            cy.get('ul#invitedList').find('li').contains(name).parentsUntil('ul#invitedList').should('have.css', 'display', 'list-item');
        });
    });

    it('Has no invalid html @html-validation', () => {
        cy.validateHtml();
    });
});
