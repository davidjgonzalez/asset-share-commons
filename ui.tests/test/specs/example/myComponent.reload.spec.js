import MyComponent from './myComponent.component';
import SearchPage from './components/structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('on reload of the page, with holiday-related query params, the My Component component', () => {
    let page = new SearchPage(),
        myComponent = new MyComponent();

    it('should update the value of the Halloween button, if its known that Halloween is liked', function () {
        browser.url(page.withQueryString({
            'like': 'halloween'
        }));

        assert.equal(myComponent.halloweenButton.getText(), 'You know I like Halloween!');
    });
});