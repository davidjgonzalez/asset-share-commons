import Component from "../../../../util/Component";

export default class FilterToggle extends Component {

    constructor(testId) {
        super('cmp-search-filter-toggle', testId);
    }

    get applySection() {
        return this.el('toggle', 'apply');
    }

    get resetSection() {
        return this.el('toggle', 'reset');
    }

    get applyButton() {
        return this.el(this.applySection, 'button');
    }

    get applyIcon() {
        return this.el(this.applySection, 'icon');
    }

    get applyLabel() {
        return this.el(this.applySection, 'text');
    }

    get resetButton() {
        return this.el(this.resetSection, 'button');
    }

    get resetIcon() {
        return this.el(this.resetSection, 'icon');
    }

    get resetLabel() {
        return this.el(this.resetSection, 'text');
    }
}