/* global cy, describe, beforeEach, it, expect */
import { ChairBearIoPage } from '../elements/pages/index';

describe('Chairbear Site @github', () => {
    const jobTitles =  ['Test Engineering', 'Software Engineering', 'SEO Technician', 'Full Stack Developer'];

    beforeEach(() => {
        ChairBearIoPage.visit();
    });

    it('Page headings are as expected', () => {
        cy.get('h3').should('contain', 'About')
            .and('contain', 'Companies Worked With')
            .and('contain', 'Coding Experience')
            .and('contain', 'Project Demos')
            .and('contain', 'Skills by Experience (Years)');
    });

    it('Project Demos section has expected format', () => {
       cy.get('div#prod-demo').within(() => {
          cy.get('div#dot-container').find('span.dot').its('length').should('eq', 6);
          cy.get('div.slideshow-container').find('div.my-project-demo-slides').its('length').should('eq', 6);

           cy.get('div.slideshow-container').find('div.my-project-demo-slides').first().within(() =>{
                cy.get('.numbertext').should('contain', '1 / 6');
                cy.get('ul.ul-css').find('li').first().should('contain', 'PHP');
               cy.get('ul.ul-css').find('li:nth-child(2)').should('contain', 'Symfony Word Checker');
               cy.get('ul.ul-css').find('li').last().within(() => {
                   cy.get('a.basic-btn')
                       .should('have.attr', 'href').and('include', 'https://github.com/ChairBearLearning/SymfonyConsoleApp');
               });
           });

           cy.get('div.slideshow-container').find('div.my-project-demo-slides').last().within(() =>{
               cy.get('.numbertext').should('contain', '6 / 6');
               cy.get('ul.ul-css').find('li').first().should('contain', 'C#');
               cy.get('ul.ul-css').find('li:nth-child(2)').should('contain', 'GoDot Pong');
               cy.get('ul.ul-css').find('li').last().within(() => {
                   cy.get('a.basic-btn')
                       .should('have.attr', 'href').and('include', 'https://github.com/ChairBearLearning/godot-demo-projects');
               });
           });
       });
    });

    it('Project Demos link goes to expected location', () => {
        cy.get('div#prod-demo').within(() => {
            cy.get('div.slideshow-container').find('div.my-project-demo-slides').first().within(() =>{
                cy.get('.numbertext').should('contain', '1 / 6');
                cy.get('ul.ul-css').find('li').last().click();
            });
        });

        cy
            .url()
            .should('include','/ChairBearLearning/SymfonyConsoleApp');
    });

    it('Accordian is closed as default on page load', () => {
        cy.get('div#skills').within(() => {
            cy.get('div.panel').its('length').should('eq', 4);
            cy.get('div.panel').should('have.css', 'display', 'none');
        });
    });

    it('Accordian has expected tabs', () => {
        cy.get('div#skills').within(() => {
            cy.get('button.accordion').its('length').should('eq', 4);

            jobTitles.forEach(($i) => {
                cy.get('button.accordion').should('contain', $i);
            });
        });
    });

    it('Accordian tabs can be opened', () => {
        cy.get('div#skills').within(() => {
            cy.get('button.accordion').contains('Software Engineering').click();
            cy.wait(3000);
            cy.get('div.panel.panelTwo').should('exist')
                .and('have.css', 'display', 'block');
        });
    });
});
