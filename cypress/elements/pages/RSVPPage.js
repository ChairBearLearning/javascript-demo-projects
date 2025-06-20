/* global cy  */
import Page from './Page';

class RSVPPage extends Page {
    static createInvitee(name) {
        this.getRSVPContainer().within(() => {
            this.getInviteeInput().type(name);
            this.getSubmitButton().click();
        });
    }

    static getRSVPContainer() {
        return cy.get('div.wrapper-rsvp');
    }

    static getInviteeInput() {
        return cy.get('input[name="name"]');
    }

    static getSubmitButton() {
        return cy.get('button[name="submit"]');
    }

    static getListContainer() {
        return cy.get('.main');
    }

    static getInviteeList() {
        return cy.get('ul#invitedList');
    }

    static getConfirmationFilter(filter) {
        return cy.get('label').contains(filter).parentsUntil('.main');
    }

    static getCheckbox() {
        return cy.get('input[type="checkbox"]');
    }
}

export default RSVPPage;
