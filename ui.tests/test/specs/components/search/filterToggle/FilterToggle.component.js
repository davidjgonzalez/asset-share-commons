import Bem from '../../../../util/Bem';

export default class FilterToggle {

    constructor() {
        this.bem = new Bem('cmp-search-filter-toggle');
    }

    get component() {
        return $(this.bem.selector());
    }

    get _applySection() {
        return this.component.element(this.bem.scope('toggle', 'apply').selector());
    }

    get _resetSection() {
        return this.component.element(this.bem.scope('toggle', 'reset').selector());
    }

    get applyButton() {
        return this._applySection.element(this.bem.element('button'));
    }

    get applyIcon() {
        return this._applySection.element(this.bem.element('icon'));
    }

    get applyLabel() {
        return this._applySection.element(this.bem.element('text'));
    }

    get resetButton() {
        return this._resetSection.element(this.bem.element('button'));
    }

    get resetIcon() {
        return this._resetSection.element(this.bem.element('icon'));
    }

    get resetLabel() {
        return this._resetSection.element(this.bem.element('text'));
    }
}