import Urls from '../../../../util/Urls';
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

    it('the first result should have verified display attributes', function () {
        browser.url(page.path);

        let actualResult = results.results[0];

        assert.equal(actualResult.title.getText(), Expected.initialFirstResult.title);
        assert.equal(Urls.path(actualResult.image.getAttribute('src')), Expected.initialFirstResult.image);
        assert.equal(Urls.path(actualResult.link.getAttribute('href')), Expected.initialFirstResult.detailsPath);

        let metadata = actualResult.metadataValues;

        assert.equal(metadata[0].getText(), Expected.initialFirstResult.size);
        assert.equal(metadata[1].getText(), Expected.initialFirstResult.type);
        assert.equal(metadata[2].getText(), Expected.initialFirstResult.resolution);
    });
});