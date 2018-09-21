import Sort from './Sort.component';
import Page from '../../page/Page.component';

var assert = require('assert');

describe('the initial load of the search sort component', () => {
    let page = new Page(),
        sort = new Sort();

    it('should have the correct default sort by settings', function () {
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

        browser.url(page.path);

        assert.equal(sort.sortByLabel.getText(), expected[0].text);
        assert.equal(sort.sortByOptions.value.length, 4);

        sort.sortByOptions.value.forEach((actual, index) => {
            assert.equal(actual.getHTML(false), expected[index].text);
            assert.equal(actual.getAttribute('data-value'), expected[index].value);
        });
    });


    it('should have the correct default sort direction settings', function () {
        let expected = [{
                text: "ASC",
                value: "asc"
            }, {
                text: "DESC",
                value: "desc"
            }];

        browser.url(page.path);

        assert.equal(sort.sortDirectionLabel.getText(), expected[1].text);
        assert.equal(sort.sortDirectionOptions.value.length, 2);

        sort.sortDirectionOptions.value.forEach((actual, index) => {
            assert.equal(actual.getHTML(false), expected[index].text);
            assert.equal(actual.getAttribute('data-value'), expected[index].value);
        });
    });
});