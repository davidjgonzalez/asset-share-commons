var merge = require('deepmerge');
var wdioConf = require('../wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    capabilities: [{
        maxInstances: 2,
        browserName: 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=1280,800'],
            binary: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
        }
    }],

    baseUrl: 'http://localhost:4503/content/asset-share-commons/en/',

    services: ['selenium-standalone']
}, { clone: false });
