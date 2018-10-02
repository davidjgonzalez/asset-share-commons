import Results, { Expected } from "./Results.component";
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('after loading more results in the Results component', () => {
    let page = new SearchPage(),
        results = new Results();

    it('should have 48 results, with the first and last of the last 24 being well known', function () {
        browser.url(page.path);
        results.loadMore.click();

        let expectedSize = 24 * 2;
        let actualResults = results.results;

        assert.equal(actualResults.length, expectedSize);
        // Double-check the very first asset for sanity
        assert.equal(actualResults[0].title.getText(), Expected.initialFirstResult.title);
        // Check the 1st load more asset
        assert.equal(actualResults[(expectedSize / 2) - 1].title.getText(), Expected.loadMoreFirstResult.title);
        // Check the last load more asset
        assert.equal(actualResults[expectedSize - 1].title.getText(), Expected.loadMoreLastResult.title);
    });
});