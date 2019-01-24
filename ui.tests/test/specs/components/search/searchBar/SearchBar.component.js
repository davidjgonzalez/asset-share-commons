import Component from "../../../../util/Component";

export default class SearchBar extends Component{

    constructor(testId) {
        super('cmp-search-search-bar', testId);
    }

    get input() {
        return this.el('input');
    }

    get icon() {
        return this.el('icon');
    }

    get button() {
        return this.el('button');
    }
}