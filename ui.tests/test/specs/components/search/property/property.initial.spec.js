import Property from './Property.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the Property component', () => {
    let page = new SearchPage(),
        property = new Property();

    it('should have a visible title but invisible options', () => {
        browser.url(page.url);

        assert.equal(property.title.getText(), 'Property - Checkbox');

        assert.equal(property.fields.isVisible(), false);

        assert.equal(property.options[0].label.getText(), '');
        assert.equal(property.options[1].label.getText(), '');
    });


    it('should have a title and 2 options when the title is clicked (expanded)', () => {
        browser.url(page.url);
        
        property.title.click();

        browser.waitUntil(() => {
            return property.fields.isVisible();
        }, 100, 'expected to open the filter fields within .1s');


        assert.equal(property.title.getText(), 'Property - Checkbox');

        assert.equal(property.fields.isVisible(), true);
        assert.equal(property.options.length, 2);

        assert.equal(property.options[0].label.getText(), 'JPEG');
        assert.equal(property.options[0].value.getValue(), 'image/jpeg');

        assert.equal(property.options[1].label.getText(), 'PNG / GIF');
        assert.equal(property.options[1].value.getValue(), 'image/png,image/gif');
    });
});