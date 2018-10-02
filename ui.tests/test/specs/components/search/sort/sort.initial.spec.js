import Sort from './Sort.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the search sort component', () => {
    let page = new SearchPage(),
        sort = new Sort();

    it('should have the correct default Sort By settings', function () {
            let expected = [{
                text: "Last Modified",
                value: "@jcr:content/jcr:lastModified"
            }, {
                text: "Size",
                value: "@jcr:content/metadata/dam:size"
            }, {
                text: "Width",
                value: "@jcr:content/metadata/tiff:ImageWidth"
            }, {
                text: "Length",
                value: "@jcr:content/metadata/tiff:ImageLength"
            },
            ];

        browser.url(page.url);

        // Last Modified the default sort
        assert.equal(sort.sortByLabel.getText(), expected[0].text);
        assert.equal(sort.sortByOptions.length, 4);

        sort.sortByOptions.forEach((actual, index) => {
            assert.equal(actual.getHTML(false), expected[index].text);
            assert.equal(actual.getAttribute('data-value'), expected[index].value);
        });
    });


    it('should have the correct default Sort Direction settings', function () {
        let expected = [{
                text: "ASC",
                value: "asc"
            }, {
                text: "DESC",
                value: "desc"
            }];

        browser.url(page.url);

        assert.equal(sort.sortDirectionLabel.getText(), expected[1].text);
        assert.equal(sort.sortDirectionOptions.length, 2);

        sort.sortDirectionOptions.forEach((actual, index) => {
            assert.equal(actual.getHTML(false), expected[index].text);
            assert.equal(actual.getAttribute('data-value'), expected[index].value);
        });

    });
});