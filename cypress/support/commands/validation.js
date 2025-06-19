/* global Cypress, cy, assert */
import axios from 'axios';

Cypress.Commands.add('validateHtml', () => {
    cy
        .document()
        .then((document) => {
            let html = new XMLSerializer().serializeToString(document);
            const cyScriptStart = '<script type="text/javascript"> document.domain';
            const cyScriptEnd = '{e.exports=n("./injection/main.js")}}); </script>';
            const cyScriptStartIndex = html.indexOf(cyScriptStart);
            const cyScriptEndIndex = html.indexOf(cyScriptEnd) + cyScriptEnd.length;
            html = html.slice(0, cyScriptStartIndex) + html.slice(cyScriptEndIndex);
            return axios.post(
                'https://validator.w3.org/nu/?out=json',
                html,
                {
                    headers: {
                        'content-type': 'text/html; charset=utf-8',
                    },
                },
            )
                .then((response) => {
                    const errors = [];
                    const { messages } = response.data;
                    messages.forEach((message) => {
                        if (message.type !== 'error') {
                            return;
                        }

                        Cypress.log({
                            name: 'Validation error',
                            message: `${message.message} [${message.extract}]`,
                            consoleProps() {
                                return message;
                            },
                        });

                        errors.push(message);
                    });

                    return cy.wrap(errors, { log: false });
                })
                .catch((error) => {
                    cy.log(error);

                    return cy.wrap([], { log: false });
                });
        })
        .then((errors) => {
            assert.equal(
                errors.length,
                0,
                `${errors.length} html validation error(s) detected`,
            );
        });
});
