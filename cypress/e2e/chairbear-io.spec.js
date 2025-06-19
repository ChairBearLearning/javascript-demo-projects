/* global cy, describe, beforeEach, it, expect */
import { ChairBearIoPage } from '../elements/pages/index';

describe('Chairbear Site @github', () => {
    const jobTitles =  ['Test Engineering', 'Software Engineering', 'SEO Technician', 'Full Stack Developer'];
    const navTitles = ['Home', 'Project Demo', 'About', 'Companies Worked With', 'Code Experience', 'Skills Breakdown'];
    const navLinks = ['#', '#prod-demo', '#hello', '#companies', '#skills', '#skills-chart'];

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

    it('Project Demos section has expected format', () => {
       ChairBearIoPage.getDemoSection().within(() => {
          cy.get('div#dot-container').find('span.dot').its('length').should('eq', 6);
          ChairBearIoPage.getSlideshow().its('length').should('eq', 6);

           ChairBearIoPage.getSlideshow().first().within(() =>{
                cy.get('.numbertext').should('contain', '1 / 6');
               ChairBearIoPage.getUlElement('li').first().should('contain', 'PHP');
               ChairBearIoPage.getUlElement('li:nth-child(2)').should('contain', 'Symfony Word Checker');
               ChairBearIoPage.getUlElement('li').last().within(() => {
                   cy.get('a.basic-btn')
                       .should('have.attr', 'href').and('include', 'https://github.com/ChairBearLearning/SymfonyConsoleApp');
               });
           });

           ChairBearIoPage.getSlideshow().last().within(() =>{
               cy.get('.numbertext').should('contain', '6 / 6');
               ChairBearIoPage.getUlElement('li').first().should('contain', 'C#');
               ChairBearIoPage.getUlElement('li:nth-child(2)').should('contain', 'GoDot Pong');
               ChairBearIoPage.getUlElement('li').last().within(() => {
                   cy.get('a.basic-btn')
                       .should('have.attr', 'href').and('include', 'https://github.com/ChairBearLearning/godot-demo-projects');
               });
           });
       });
    });

    it('Project Demos link goes to expected location', () => {
        ChairBearIoPage.getDemoSection().within(() => {
            ChairBearIoPage.getSlideshow().first().within(() =>{
                cy.get('.numbertext').should('contain', '1 / 6');
                ChairBearIoPage.getUlElement('li').last().click();
            });
        });

        cy
            .url()
            .should('include','/ChairBearLearning/SymfonyConsoleApp');
    });

    it('Accordian is closed as default on page load', () => {
        ChairBearIoPage.getSkillsSection().within(() => {
            cy.get('div.panel').its('length').should('eq', 4);
            cy.get('div.panel').should('have.css', 'display', 'none');
        });
    });

    it('Accordian has expected tabs', () => {
        ChairBearIoPage.getSkillsSection().within(() => {
            ChairBearIoPage.getAccordianBtn().its('length').should('eq', 4);

            jobTitles.forEach(($i) => {
                ChairBearIoPage.getAccordianBtn().should('contain', $i);
            });
        });
    });

    it('Accordian tabs can be opened', () => {
        ChairBearIoPage.getSkillsSection().within(() => {
            ChairBearIoPage.getAccordianBtn().contains('Software Engineering').click();
            cy.wait(3000);
            cy.get('div.panel.panelTwo').should('exist')
                .and('have.css', 'display', 'block');
        });
    });

    it('Should have links to test engineering examples', () => {
        ChairBearIoPage.getDemoSection().within(() => {
            cy.get('a').contains('Cypress').should('exist').should('have.attr', 'href').and('include', 'javascript-demo-projects/tree/main/cypress');
            cy.get('a').contains('Playwright').should('exist').should('have.attr', 'href').and('include', 'javascript-demo-projects/tree/main/playwright');
        });
    });

    it('Has no invalid html @html-validation', () => {
        cy.validateHtml();
    });

});
