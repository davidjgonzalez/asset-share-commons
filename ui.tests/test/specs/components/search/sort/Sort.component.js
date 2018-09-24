import Bem from '../../../../util/Bem';

export default class Sort {

    constructor() {
        this.bem = new Bem('cmp-search-sort');
    }

    get component() {
        return $(this.bem.selector());
    }

    get _sortBySection() {
        return this.component.element(this.bem.scope('selection', 'sort-by').selector());
    }

    get _sortDirectionSection() {
        return this.component.element(this.bem.scope('selection', 'sort-direction').selector());
    }

    get sortByLabel() {
        return this._sortBySection.element(this.bem.element('selection-text'));
    }

    get sortByOptions() {
        return this._sortBySection.elements(this.bem.element('selection-item'));
    }

    get sortDirectionLabel() {
        return this._sortDirectionSection.element(this.bem.element('selection-text'));
    }

    get sortDirectionOptions() {
        return this._sortDirectionSection.elements(this.bem.element('selection-item'));
    }
}