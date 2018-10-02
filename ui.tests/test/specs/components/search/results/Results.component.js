import Bem from '../../../../util/Bem';
import Assets from '../../../data/Assets.data'

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

    get results() {
        return this.component.elements(this.bem.selector('result')).value.map((webJsonObject) => {
            return new _Result(this.bem, webJsonObject);
        });
    }

    get loadMore() {
        return this.component.element(this.bem.selector('load-more'));
    }
}

class _Result {
    constructor(bem, webJsonObject) {
        this.bem = bem;
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

    get metadataValues() {
        return this.result.elements(this.bem.selector('result-metadata-value')).value;
    }
}

class _Expected {
    get lastModifiedDescending() {
        return [ Assets.images['5'],  Assets.images['4'], Assets.images['3'], Assets.images['2'], Assets.images['1'] ];
    }

    get sizeAscending() {
        return [ Assets.images['3'],  Assets.images['2'], Assets.images['4'], Assets.images['5'], Assets.images['1'] ];
    }
}
export let Expected = new _Expected();