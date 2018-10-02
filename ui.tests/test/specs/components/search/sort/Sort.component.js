import Bem from '../../../../util/Bem';

export default class Sort {

    constructor() {
        this.bem = new Bem('cmp-search-sort');
    }

    get component() {
        return $(this.bem.selector());
    }

    get _sortBySection() {
        return this.component.element(this.bem.selector('selection', 'sort-by'));
    }

    get _sortDirectionSection() {
        return this.component.element(this.bem.selector('selection', 'sort-direction'));
    }

    get sortByLabel() {
        return this._sortBySection.element(this.bem.selector('selection-text'));
    }

    get sortByOptions() {
        return this._sortBySection.elements(this.bem.selector('selection-item')).value;
    }

    get sortDirectionLabel() {
        return this._sortDirectionSection.element(this.bem.selector('selection-text'));
    }

    get sortDirectionOptions() {
        return this._sortDirectionSection.elements(this.bem.selector('selection-item')).value;
    }
}