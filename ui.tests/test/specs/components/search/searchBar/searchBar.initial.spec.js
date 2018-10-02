import SearchBar from './SearchBar.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the search bar component', () => {
    let page = new SearchPage(),
        searchBar = new SearchBar();

    it('should have a placeholder and no input field value', function () {
        browser.url(page.url);

        assert.equal(searchBar.input.getValue(), '');
        assert.equal(searchBar.input.getAttribute('placeholder'), 'What are you looking for?');
    });
});