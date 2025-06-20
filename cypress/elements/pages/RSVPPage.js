/* global cy  */
import Page from './Page';

class RSVPPage extends Page {
    static createInvitee(name) {
        cy.get('div.wrapper-rsvp').within(() => {
            cy.get('input[name="name"]').type(name);
            cy.get('button[name="submit"]').click();
        });
    }
}

export default RSVPPage;
