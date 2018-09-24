export default class SearchPage {

    constructor() {
    }

    get path() {
        return "light.html";
    }

    withQueryString(params) {
        return this.path +
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

