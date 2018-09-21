import Page from './Page.component';
var assert = require('assert');

describe('the initial load of the search page', () => {
    let page = new Page();

    it('should have the right browser title', function () {
        browser.url(page.path);

        assert.equal(browser.getTitle(), 'Home');
    });

});