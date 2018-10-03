import Urls from '../../../../util/Urls';
import Results, { Expected } from "./Results.component";
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the Results component', () => {
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

    it('the first result should have verified display attributes', () => {
        browser.url(page.url);

        let actual = results.results[0];
        let expected = Expected.lastModifiedDescending[0];

        // Title
        assert.equal(actual.title.getText(), expected.title);

        // Thumbnail image
        assert.equal(Urls.path(actual.image.getAttribute('src')), expected.image);

        // Asset Details path (link)
        assert.equal(Urls.path(actual.link.getAttribute('href')), expected.detailsPath);

        /** Result metadata **/

        let metadata = actual.metadataValues;

        // Size
        assert.equal(metadata[0].getText(), expected.size);

        // Asset Type
        assert.equal(metadata[1].getText().toLowerCase(), expected.type);

        // Resolution
        assert.equal(metadata[2].getText().toLowerCase(), expected.resolution);
    });

    it('the should have a Lore More button', () => {
        browser.url(page.url);

        // Load more button and title
        assert.equal(results.loadMore.getText(), "Load more");
    });
});