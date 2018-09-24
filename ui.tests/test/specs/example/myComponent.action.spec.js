import MyComponent from './myComponent.component';
import SearchPage from './components/structure/searchPage/SearchPage.component';

let assert = require('assert');;

describe('upon interacting with the My Component component', () => {
    let page = SearchPage, // This would really import the appropriate structure/xxxPage.component.js.
        myComponent = new MyComponent(); // This would instantiate the ComponentModel(s) required for this test.

    it('the Halloween button should turn orange when clicked', function () {
        browser.url(page.path);

        myComponent.halloweenButton.click();

        assert.equal(myComponent.halloweenButton.getCssProperty('background-color').value, 'orange');
    });
});