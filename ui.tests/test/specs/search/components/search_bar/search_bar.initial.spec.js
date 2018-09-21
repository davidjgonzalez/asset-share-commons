import SearchBar from './SearchBar.component';
import Page from '../../page/Page.component';

var assert = require('assert');

describe('the initial load of the search bar component', () => {
    let page = new Page(),
        searchBar = new SearchBar();

    it('should have a placeholder and no input field value', function () {
        browser.url(page.path);

        assert.equal(searchBar.input.getValue(), '');
        assert.equal(searchBar.input.getAttribute('placeholder'), 'What are you looking for?');
    });
});