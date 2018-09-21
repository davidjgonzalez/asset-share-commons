var merge = require('deepmerge');
var wdioConf = require('../wdio.conf.js');

// have main config file as default but overwrite environment specific information
exports.config = merge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    baseUrl: 'http://localhost:4503/content/asset-share-commons/en/',


    services: ['selenium-standalone']
}, { clone: false });
