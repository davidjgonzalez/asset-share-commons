import Results, { Expected } from "./Results.component";
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('after loading more results in the Results component', () => {
    let page = new SearchPage(),
        results = new Results();

    it('should have 4 results, with the 3rd and th being well known', function () {
        browser.url(page.url);
        results.loadMore.click();

        browser.waitUntil(function () {
            return results.results.length > 2;
        }, 5000, 'expected to load new results within 5s');

        let expectedSize = 4;
        let actualResults = results.results;

        assert.equal(actualResults.length, expectedSize);

        // Check the 1st load more asset
        assert.equal(actualResults[2].title.getText(), Expected.lastModifiedDescending[2].title);

        // Check the last load more asset
        assert.equal(actualResults[3].title.getText(), Expected.lastModifiedDescending[3].title);
    });
});