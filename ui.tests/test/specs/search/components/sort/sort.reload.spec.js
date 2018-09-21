import Page from '../page/Page.component'
import Sort from './Sort.component';

let assert = require('assert');

describe('on reload of search page, with sort related query params, the search sort component', () => {
    let page = new Page(),
        sort = new Sort();

    it('should set the sort by to the matching request value', function () {
        browser.url(page.withQueryString({
            'orderby': '@jcr:content/metadata/dam:size'
        }));

        assert.equal(sort.sortByLabel.getText(), 'Size');
        assert.equal(sort.sortDirectionLabel.getText(), 'DESC');
    });

    it('should set the sort direction to the matching request value', function () {
        browser.url(page.withQueryString({
            'orderby.sort': 'asc'
        }));

        assert.equal(sort.sortByLabel.getText(), 'Last Modified');
        assert.equal(sort.sortDirectionLabel.getText(), 'ASC');
    });

    it('should set both the sort by and sort direction to the matching request value', function () {
        browser.url(page.withQueryString({
            'orderby': '@jcr:content/metadata/dam:size',
            'orderby.sort': 'asc'
        }));

        assert.equal(sort.sortByLabel.getText(), 'Size');
        assert.equal(sort.sortDirectionLabel.getText(), 'ASC');
    });

    it('should set the sort by label and sort direction appropriately when mis-match request parameters are passed', function () {
        browser.url(page.withQueryString({
            'orderby': 'invalid',
            'orderby.sort': 'invalid'
        }));

        assert.equal(sort.sortByLabel.getText() , 'Unknown');
        assert.equal(sort.sortDirectionLabel.getText() , 'DESC', "The default sort order should be used.");
    });
});