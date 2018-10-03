import MyComponent from './MyComponent.component';
import SearchPage from './components/structure/searchPage/SearchPage.component';

let assert = require('assert');;

describe('upon interacting with the My Component component', () => {
    let page = new SearchPage(), // This would really import the appropriate structure/xxxPage.component.js.
        myComponent = new MyComponent(); // This would instantiate the ComponentModel(s) required for this test.

    it('the Halloween button should turn orange when clicked', () => {
        browser.url(page.url);

        myComponent.halloweenButton.click();

        assert.equal(myComponent.halloweenButton.getCssProperty('background-color').value, 'orange');
    });
});