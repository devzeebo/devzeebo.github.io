/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const htmlPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './app/index.html',
  baseUrl: '//devzeebo.github.io',
  inject: 'head',
});

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    htmlPlugin,
  ],
});
