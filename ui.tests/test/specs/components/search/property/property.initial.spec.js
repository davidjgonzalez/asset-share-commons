import Property from './Property.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the Property component', () => {
    let page = new SearchPage(),
        property = new Property();

    it('should have a title and 2 options', () => {
        browser.url(page.url);

        let options = property.options;

        assert.equal(property.title.getText(), 'Property - Checkbox');
        assert.equal(options.length, 2);
        
        assert.equal(options[0].title.getText(), 'JPEG');
        assert.equal(options[0].value.getValue(), 'image/jpeg');

        assert.equal(options[1].title.getText(), 'PNG / GIF');
        assert.equal(options[1].value.getValue(), 'image/png,image/gif');
    });
});