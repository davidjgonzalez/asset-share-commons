import Bem from '../../../../util/Bem';

export default class FilterToggle {

    constructor() {
        this.bem = new Bem('cmp-search-filter-toggle');
    }

    get component() {
        return $(this.bem.selector());
    }

    get _applySection() {
        return this.component.element(this.bem.selector('toggle', 'apply'));
    }

    get _resetSection() {
        return this.component.element(this.bem.selector('toggle', 'reset'));
    }

    get applyButton() {
        return this._applySection.element(this.bem.selector('button'));
    }

    get applyIcon() {
        return this._applySection.element(this.bem.selector('icon'));
    }

    get applyLabel() {
        return this._applySection.element(this.bem.selector('text'));
    }

    get resetButton() {
        return this._resetSection.element(this.bem.selector('button'));
    }

    get resetIcon() {
        return this._resetSection.element(this.bem.selector('icon'));
    }

    get resetLabel() {
        return this._resetSection.element(this.bem.selector('text'));
    }
}