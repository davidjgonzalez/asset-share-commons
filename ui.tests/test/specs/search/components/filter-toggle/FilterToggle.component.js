import Bem from '../../../../util/Bem';

export default class FilterToggle {

    constructor() {
        this.bem = new Bem('cmp-search-filter-toggle');
    }

    get component() {
        return $(this.bem.selector());
    }

    get applyElement() {
        return this.component.element(this.bem.scope('toggle', 'apply').selector());
    }

    get resetElement() {
        return this.component.element(this.bem.scope('toggle', 'reset').selector());
    }

    get applyButton() {
        return this.applyElement.element(this.bem.element('button'));
    }

    get applyIcon() {
        return this.applyElement.element(this.bem.element('icon'));
    }

    get applyLabel() {
        return this.applyElement.element(this.bem.element('text'));
    }

    get resetButton() {
        return this.resetElement.element(this.bem.element('button'));
    }

    get resetIcon() {
        return this.resetElement.element(this.bem.element('icon'));
    }

    get resetLabel() {
        return this.resetElement.element(this.bem.element('text'));
    }
}