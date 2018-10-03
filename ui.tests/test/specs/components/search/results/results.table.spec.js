import Urls from '../../../../util/Urls';
import Results, { Expected } from "./Results.component";
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the table view of the Results component', () => {
    let page = new SearchPage(),
        results = new Results();

    it('should have 2 results, with the first and last being well known', () => {
        browser.url(page.url);



        let expectedSize = 2;
        let actualResults = results.results;

        // Ensure the number of results are expected
        assert.equal(actualResults.length, expectedSize);

        // Ensure the first result is expected
        assert.equal(actualResults[0].title.getText(), Expected.lastModifiedDescending[0].title);

        // Ensure the last result is expected
        assert.equal(actualResults[expectedSize - 1].title.getText(), Expected.lastModifiedDescending[1].title);
    });

});