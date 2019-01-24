import Bem from '../../../../util/Bem';
import Component from "../../../../util/Component";

const _bem = new Bem();

export default class LayoutToggle extends Component {
    constructor(testId) {
        super('cmp-search-layout-toggle', testId);
    }

    get cardToggle() {
        return new _Toggle(this, this.el('toggle', 'card'));
    }

    get listToggle() {
        return new _Toggle(this, this.el('toggle', 'list'));
    }
}
class _Toggle {
    constructor(component, webJsonObject) {
        this.component = component;
        this.toggle = webJsonObject;
    }

    get button() {
        return this.toggle;
    }

    get icon() {
        return this.component.el(this.toggle, 'toggle-icon');
    }

    get text() {
        return this.component.el(this.toggle, 'toggle-text');
    }
}
