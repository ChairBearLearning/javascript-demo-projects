/* global cy */

class Page {
    static visit(page = null) {
        (page !== null) ? cy.visit(`${Cypress.config('baseUrl')}/${page}`) : cy.visit(`${Cypress.config('baseUrl')}`);
    }
}
export default Page;
