'use strict';

const path                    = require('path');
const webpack                 = require('webpack');
const MiniCssExtractPlugin    = require("mini-css-extract-plugin");
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');

module.exports = {
        resolve: {
             alias: {
                  "@spectrum-css": path.resolve(__dirname, 'node_modules/@spectrum-css/'),
             },
        },
        entry: {
            site: __dirname + '/src/index.js'
        },
        output: {
            filename: 'js/asc-spectrum.bundle.js',
            path: path.resolve(__dirname, 'dist')
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
                //filename: 'css/[name].bundle.css'
                filename: 'css/asc-spectrum.bundle.css'
            })
        ],

};
