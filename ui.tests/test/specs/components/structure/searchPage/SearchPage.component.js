export default class SearchPage {

    constructor() {
    }

    get path() {
        return '/content/asset-share-commons/en/test';
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

