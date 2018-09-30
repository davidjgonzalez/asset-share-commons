import Bem from '../../../../util/Bem';
import AssetsData from '../../../data/Assets.data'

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
        return this.component.elements(this.bem.selector('result')).value.map((webJsonObject )=> {
           return new Results(webJsonObject);
        });
    }
}

class Result {
    constructor(webJsonObject) {
        this.result = webJsonObject;
        console.log(this.result);
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


class ExpectedResults {
    get initialFirstResult() {
        return AssetsData.imageA();
    }

    get initialLastResult() {
        return AssetsData.imageB();
    }
}
export let Expected = new ExpectedResults();