module.exports = {
    // default working directory (can be changed per 'cwd' in every asset option)
    context: __dirname,

    // path to the clientlib root folder (output)
    clientLibRoot: "./../ui.apps.spectrum/src/main/content/jcr_root/apps/asset-share-commons/clientlibs",

    libs: [
        {
            name: "clientlib-spectrum",
            allowProxy: true,
            categories: ["asset-share-commons.ui.apps.spectrum"],
            embed: [""],
            dependencies: ["asset-share-commons.base"],
            serializationFormat: "xml",
            cssProcessor : ["default:none", "min:none"],
            jsProcessor: ["default:none", "min:none"],
            assets: {
                js: [
                    "dist/js/*.js",
                ],
                css: [
                    "dist/css/*.css",
                ],
                resources: {
                    cwd: "./resources",
                    flatten: false,
                    files: ["**/*.*"]
                }
            }
        }
    ]
};
