class _Urls {
    constructor() {}

    path(urlString) {
        let url = new URL(urlString);
        return url.href.substring(url.origin.length);
    }
}

let Urls = new _Urls();

export default Urls;