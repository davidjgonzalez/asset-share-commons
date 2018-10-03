import LayoutToggle from './LayoutToggle.component';
import SearchPage from '../../structure/searchPage/SearchPage.component';

let assert = require('assert');

describe('the initial load of the Layout Toggle component', () => {
    let page = new SearchPage(),
        layoutToggle = new LayoutToggle();

    it('should have toggles for Card and List views', () => {
        browser.url(page.url);

        // Check the Card toggle
        assert.equal(layoutToggle.cardToggle.button.isVisible(), true);
        assert.equal(layoutToggle.cardToggle.icon.getAttribute("title"), "Card view");
        assert.equal(layoutToggle.cardToggle.text.getText(), "Card view");

        // Check the List toggle
        assert.equal(layoutToggle.listToggle.button.isVisible(), true);
        assert.equal(layoutToggle.listToggle.icon.getAttribute("title"), "List view");
        assert.equal(layoutToggle.listToggle.text.getText(), "List view");
    });
});