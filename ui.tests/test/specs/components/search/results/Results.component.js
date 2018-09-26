import Bem from '../../../../util/Bem';

export default class Results {

    constructor() {
        this.bem = new Bem('cmp-search-results');
    }

    get component() {
        return $(this.bem.selector());
    }

    get _cardsSection() {
        return this.component.element(this.bem.selector('results', 'cards'));
    }

    get cards() {
        return this._cardsSection.element(this.bem.selector('item', 'card'));
    }
}


export class Result {
    constructor(webJsonObject) {
        this.result = webJsonObject;
    }

    get title() {
        return this.result.element(this.bem.selector('result-title'));
    }

    get image() {
        return this.result.element(this.bem.selector('result-image'));
    }

    get link() {
        return this.result.element(this.bem.selector('result-link'));
    }

    get metadata() {
        return this.result.element(this.bem.selector('result-metadata'));
    }
}