import SearchBar from './SearchBar.component';
import Page from '../page/Page.component';

var assert = require('assert');

describe('on reload of search page, with fulltext query params', () => {
    let page = new Page(),
        searchBar = new SearchBar();

    it('the search bar component input filed should reflect the fulltext query parameter', function () {
        browser.url(page.withQueryString({
            'fulltext': 'Hello World!'
        }));

        assert.equal(searchBar.input.getValue(), 'Hello World!');
    });
});