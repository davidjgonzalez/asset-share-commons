import MyComponent from './MyComponent.component';
import SearchPage from './components/structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the My Component component', () => {
    let page = new SearchPage(), // This would really import the appropriate structure/xxxPage.component.js.
        myComponent = new MyComponent(); // This would instantiate the ComponentModel(s) required for this test.

    it('should have buttons for liking Halloween and Thankgiving', () => {
        // Navigate to the correct page...
        browser.url(page.url);

        // Make the test assertions...
        assert.equal(myComponent.halloweenButton.getText(), 'I like Halloween!');
        assert.equal(myComponent.halloweenButton.getText(), 'I like Thanksgiving!');
    });
});