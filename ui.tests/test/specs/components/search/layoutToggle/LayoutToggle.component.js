import Bem from '../../../../util/Bem';

const _bem = new Bem('cmp-search-layout-toggle');

export default class LayoutToggle {
    get component() {
        return $(_bem.selector());
    }

    get cardToggle() {
        return new _Toggle(this.component.element(_bem.selector('toggle', 'card')));
    }

    get listToggle() {
        return new _Toggle(this.component.element(_bem.selector('toggle', 'list')));
    }
}
class _Toggle {
    constructor(webJsonObject) {
        this.toggle = webJsonObject;
    }

    get button() {
        return this.toggle;
    }

    get icon() {
        return this.toggle.element(_bem.selector('toggle-icon'));
    }

    get text() {
        return this.toggle.element(_bem.selector('toggle-text'));
    }
}
