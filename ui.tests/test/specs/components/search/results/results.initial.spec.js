import Results, { Expected } from "./Results.component";
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the Results component', () => {
    let page = new SearchPage(),
        results = new Results();

    it('should have 24 results, with the first and last being well known', function () {
        browser.url(page.path);

        let expectedSize = 24;
        let actualResults = results.results;
        assert.equal(actualResults.length, expectedSize);
        assert.equal(actualResults[0].title.getText(), Expected.initialFirstResult.title);
        assert.equal(actualResults[expectedSize - 1].title.getText(), Expected.initialLastResult.title);

    });
});