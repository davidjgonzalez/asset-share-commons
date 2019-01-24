export default class SearchPage {

    constructor(relativePath) {
        this.relativePath = relativePath.indexOf('/') === 0 ? relativePath : '/' + relativePath;
    }

    get path() {
        return '/content/asset-share-commons/test' + this.relativePath;
    }

    get url() {
        return this.path + '.html';
    }

    withQueryString(params) {
        return this.url +
            "?" +
            Object.keys(params).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');
    }

    getQueryString(params) {
        return "?" +
            Object.keys(params).map(key => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');
    }
}

