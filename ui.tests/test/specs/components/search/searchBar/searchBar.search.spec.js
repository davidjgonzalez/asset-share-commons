import SearchBar from './SearchBar.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';
import Results from '../results/Results.component';
import Assets from '../../../data/Assets.data';

let assert = require('assert');

describe('when using the Search Bar component', () => {
    let page = new SearchPage(),
        results = new Results(),
        searchBar = new SearchBar();

    it('a search via clicking the search button for `plant` should return one well-known result', function () {
        browser.url(page.url);
        searchBar.input.setValue('plant');
        searchBar.button.click();

        browser.waitUntil(function () {
            return results.results.length == 1;
        }, 5000, 'expected to load results within 5s');


        assert.equal(results.results.length, 1);

        let actual = results.results[0];

        assert.equal(actual.title.getText(), Assets.images[4].title);
    });


    it('a search via pressing enter on the search button for `building` should return two well-known results', function () {
        browser.url(page.url);

        searchBar.input.setValue('building');
        searchBar.input.click();

        // Enter key press
        browser.keys("\uE007");

        browser.waitUntil(function () {
            return results.results.length == 2;
        }, 5000, 'expected to load results within 5s');

        assert.equal(results.results.length, 2);
        assert.equal(results.results[0].title.getText(), Assets.images[5].title);
        assert.equal(results.results[1].title.getText(), Assets.images[1].title);
    });
});