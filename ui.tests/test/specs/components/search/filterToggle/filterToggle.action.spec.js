import FilterToggle from './FilterToggle.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('upon interacting with the filter toggle component', () => {
    let page = new SearchPage(),
        filterToggle = new FilterToggle();

    it('should search the page with the selected presets when apply is clicked', function () {
        //browser.url(page.path);
    });

    it('should reset the search state when apply is clicked', function () {
        browser.url(page.path);
        filterToggle.resetButton.click();

        assert.equal(browser.getUrl().endsWith(page.path), true,
            "Upon reset, the browser location should be reset to the default state without any query parameters.");
    });
});