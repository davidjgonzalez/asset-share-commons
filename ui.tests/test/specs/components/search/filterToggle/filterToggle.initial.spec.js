import SearchPage from '../../structure/searchPage/SearchPage.component';
import FilterToggle from "./FilterToggle.component";

let assert = require('assert');

describe('the initial load of the filter toggle component with labels', () => {
    let page = new SearchPage("/search/filter-toggle"),
        filterToggle = new FilterToggle();

    it('should have the apply and reset button with labels', function () {
        filterToggle.id('filter-toggle--with-labels');

        browser.url(page.url);

        assert.equal(filterToggle.applyLabel.getText(), 'Apply');
        assert.equal(filterToggle.applyIcon.isVisible(), true);

        assert.equal(filterToggle.resetLabel.getText(), 'Reset');
        assert.equal(filterToggle.resetIcon.isVisible(), true);
    });

    it('should have the apply and reset buttons with icons but without labels', function () {
        filterToggle.id('filter-toggle--hide-labels');

        browser.url(page.url);

        assert.equal(filterToggle.applyLabel.isExisting(), false);
        assert.equal(filterToggle.applyIcon.isVisible(), true);

        assert.equal(filterToggle.resetLabel.isExisting(), false);
        assert.equal(filterToggle.resetIcon.isVisible(), true);
    });

    it('should have reset but not apply', function () {
        filterToggle.id('filter-toggle--hide-apply-toggle');
        browser.url(page.url);

        assert.equal(filterToggle.applySection.isVisible(), false);
        assert.equal(filterToggle.resetSection.isVisible(), true);
    });
});