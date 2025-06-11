/* global cy  */
import Page from './Page';

class ChairBearIoPage extends Page {

     static getDemoSection(){
         return cy.get('div#prod-demo');
     }

     static getSkillsSection(){
         return cy.get('div#skills');
     }

     static getSlideshow(){
         return cy.get('div.slideshow-container').find('div.my-project-demo-slides');
     }

     static getAccordianBtn(){
         return cy.get('button.accordion');
     }

     static getUlElement(el){
         return cy.get('ul.ul-css').find(el);
     }
}

export default ChairBearIoPage;
