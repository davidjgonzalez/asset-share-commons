import Bem from '../../../../util/Bem';

export default class Sort {

    constructor() {
        this.bem = new Bem('cmp-search-sort');
    }

    get component() {
        return $(this.bem.selector());
    }

    get sortByElement() {
        return this.component.element(this.bem.scope('selection', 'sort-by').selector());
    }

    get sortDirectionElement() {
        return this.component.element(this.bem.scope('selection', 'sort-direction').selector());
    }

    get sortByLabel() {
        return this.sortByElement.element(this.bem.element('selection-text'));
    }

    get sortByOptions() {
        return this.sortByElement.elements(this.bem.element('selection-item'));
    }

    get sortDirectionLabel() {
        return this.sortDirectionElement.element(this.bem.element('selection-text'));
    }

    get sortDirectionOptions() {
        return this.sortDirectionElement.elements(this.bem.element('selection-item'));
    }
}