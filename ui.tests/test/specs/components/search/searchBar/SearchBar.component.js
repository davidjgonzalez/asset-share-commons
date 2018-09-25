import Bem from '../../../../util/Bem';

export default class SearchBar {

    constructor() {
        this.bem = new Bem('cmp-search-search-bar');
    }

    get component() {
        return $(this.bem.selector());
    }

    get input() {
        return this.component.element(this.bem.selector('input'));
    }

    get icon() {
        return this.component.element(this.bem.selector('icon'));
    }

    get button() {
        return this.component.element(this.bem.selector('button'));
    }
}