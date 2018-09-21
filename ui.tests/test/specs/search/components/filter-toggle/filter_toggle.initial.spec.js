import FilterToggle from './FilterToggle.component';
import Page from '../../page/Page.component';

var assert = require('assert');

describe('the initial load of the filter toggle component', () => {
    let page = new Page(),
        filterToggle = new FilterToggle();

    it('should have the apply and reset button with labels', function () {
        browser.url(page.path);

        assert.equal(filterToggle.applyLabel.getText(), 'Apply');
        assert.equal(filterToggle.resetLabel.getText(), 'Reset');
    });
});