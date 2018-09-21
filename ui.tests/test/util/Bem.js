export default class Bem {

    constructor(initialScope) {
        this.bemScope = [];
        if (initialScope) {
            if (Array.isArray(initialScope)) {
                initialScope.forEach((item) => {
                    this.bemScope.push(item);
                });
            } else if (initialScope) {
                this.bemScope.push(initialScope);
            }
        }
    };

    scope(arg1, arg2) {
        var tmp = [];

        if (!arg2) {
            // this means this is a modifier on the BLOCK --> cmp-search-sort.cmp-search-sort--<arg1>
            tmp.push(this.bemScope[0] + '.' + this.bemScope[0] + '--' + arg1);
        } else {
            // this means this is an element's modifier on the BLOCK --> cmp-search-sort cmp-search-sort__<arg1>--<arg2>
            this.bemScope.forEach((item) => { tmp.push(item); });

            tmp.push(this.bemScope[0] + '__' + arg1 + '--' + arg2);
        }

        return new Bem(tmp);
    }


    element(elementName, modifierName) {
        let result = '',
            fullElementName = this.bemScope[0] + "__" + elementName;

        if (modifierName) {
            fullElementName +=  '--' + modifierName;
        }

        result = '.' + fullElementName;
        return result;
    }

    selector(elementName, modifierName) {
        let result;

        if (!elementName) {
            result = '.' + this.bemScope.join(' .');
        } else {
            let cssClasses = [],
                fullName = this.bemScope[0] + "__" + elementName;

            if (modifierName) {
                fullName = blockElement + '--' + modifierName;
            }

            this.bemScope.forEach((item) => {
                cssClasses.push(item);
            });

            cssClasses.push(tmp);

            result = '.' + cssClasses.join(' .');
        }

        return result;
    }
}
