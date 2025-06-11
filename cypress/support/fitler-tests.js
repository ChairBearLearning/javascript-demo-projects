/* global Cypress, before */
import { TagExpressionParser } from 'cucumber-tag-expressions';

const tagParser = new TagExpressionParser();

const shouldSkip = (test) => {
    const tags = Cypress.env('TAGS');
    if (!tags) {
        return false;
    }

    const tagger = tagParser.parse(tags);
    return !tagger.evaluate(test.fullTitle());
};

const checkSuite = (suite) => {
    if (suite.pending) {
        return;
    }

    let hasTaggedTests = false;
    (suite.tests || []).forEach((test) => {
        if (shouldSkip(test)) {
            test.pending = true;
            return;
        }

        hasTaggedTests = true;
    });

    if (!hasTaggedTests && shouldSkip(suite)) {
        suite.pending = true;
        return;
    }

    (suite.suites || []).forEach(checkSuite);
};

before(function () {
    this.test.parent.suites.forEach(checkSuite);
});
