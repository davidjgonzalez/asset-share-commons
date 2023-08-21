'use strict';

const path                    = require('path');
const webpack                 = require('webpack');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
        entry: {
            "asset-share-commons_spectrum": __dirname + '/src/index.js'
        },
        output: {
            filename: 'js/[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
          externals: {
            // Mark the `window` variable as provided by window
            'window': 'window',
          },
        optimization: {
            splitChunks: {
                   chunks: 'all'
                 }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                      {
                        loader: MiniCssExtractPlugin.loader
                      },
                      'css-loader',
                    ]
                },
                // this rule handles images
                {
                    test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                    use: 'file-loader?name=../resources/images/[name].[ext]?[hash]'
                },
                // the following 3 rules handle font extraction
                /*
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=../resources/fonts/[name].[ext]&mimetype=application/font-woff'
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=../resources/fonts/[name].[ext]'
                },
                {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=../resources/fonts/[name].[ext]&mimetype=application/font-otf'
                }
                */
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].bundle.css'
            })
        ],

};
