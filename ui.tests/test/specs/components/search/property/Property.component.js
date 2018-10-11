import Bem from '../../../../util/Bem';

const _bem = new Bem('cmp-search-property');

export default class Property {
    constructor() {
        // Make sure NOT to get elements in the constructor!
    }

    get component() {
        return $(_bem.selector());
    }

    get title() {
        return this.component.element(_bem.selector('title-text'));
    }

    get fields() {
        return this.component.element(_bem.selector('fields'));
    }


    get options() {
        var _options = [];

        this.fields.elements(_bem.selector('option')).value.forEach((option) => {
            _options.push(new _Option(option));
        });

        return _options;

    }
}

class _Option {
    constructor(webJsonObject) {
        this._option = webJsonObject;
    }

    get label() {
        return this._option.element(_bem.selector('option-text'));
    }

    get value() {
        return this._option.element(_bem.selector('option-input'));
    }

    get option() {
        return this._option;
    }
}