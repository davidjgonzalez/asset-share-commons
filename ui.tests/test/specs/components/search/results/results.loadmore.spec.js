import Results, { Expected } from "./Results.component";
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('after clicking the Load More button', () => {
    let page = new SearchPage(),
        results = new Results();

    it('should have 4 results, with the 3rd and 4th being well known', function () {
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

        assert.equal(results.loadMore.isVisible(), true);
    });


    it('should have 5 total results, with the 5th being well known', function () {
        browser.url(page.url);

        results.loadMore.click();

        browser.waitUntil(function () {
            return results.results.length > 2;
        }, 5000, 'expected to load the 2nd set of results within 5s');

        results.loadMore.click();

        browser.waitUntil(function () {
            return results.results.length > 4;
        }, 5000, 'expected to load the 3rd set of results within 5s');

        let expectedSize = 5;
        let actualResults = results.results;

        assert.equal(actualResults.length, expectedSize);

        // Check the 5th load more asset
        assert.equal(actualResults[4].title.getText(), Expected.lastModifiedDescending[4].title);

        assert.equal(results.loadMore.isVisible(), false);
    });
});