'use strict';

const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'production',
   devtool: 'nosources-source-map',
   optimization: {
      minimize: false,
      minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'all'
      },
      usedExports: true,
   },
   performance: {
      hints: false
   }
});





