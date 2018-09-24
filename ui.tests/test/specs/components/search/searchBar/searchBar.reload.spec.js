import SearchBar from './SearchBar.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';

var assert = require('assert');

describe('on reload of search page, with fulltext query params', () => {
    let page = new SearchPage(),
        searchBar = new SearchBar();

    it('the search bar component input filed should reflect the fulltext query parameter', function () {
        browser.url(page.withQueryString({
            'fulltext': 'Hello World!'
        }));

        assert.equal(searchBar.input.getValue(), 'Hello World!');
    });
});