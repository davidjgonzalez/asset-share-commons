import Bem from '../../../../util/Bem';

const _bem = new Bem('cmp-search-property');

export default class MyComponent {
    constructor() {
        // Make sure NOT to get elements in the constructor!
    }

    get component() {
        return $(_bem.selector());
    }

    get title() {
        return this.component.element(_bem.selector('title-text'));
    }

    get options() {
        return this.component.elements(_bem.selector('option')).value.map((o) => new _Option(o));
    }
}


class _Option {
    constructor(webJsonObject) {
        this._option = webJsonObject;
    }

    get text() {
        return this._option.element(_bem.selector('option-text'));
    }

    get value() {
        return this._option.element(_bem.selector('option-value'));
    }

    get option() {
        return this._option;
    }
}