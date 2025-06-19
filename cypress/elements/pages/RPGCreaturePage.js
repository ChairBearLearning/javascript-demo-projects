/* global cy  */
import Page from './Page';

class RPGCreaturePage extends Page {

    static getTopContainer(){
        return cy.get('div.top-rpg-container');
    }

    static getBtmContainer(){
        return cy.get('div.bottom-rpg-container');
    }

    static getCreatureInput(){
        return cy.get('input[name="creature"]');
    }

    static getSubmitBtn(){
        return cy.get('button#search-button');
    }
}

export default RPGCreaturePage;
