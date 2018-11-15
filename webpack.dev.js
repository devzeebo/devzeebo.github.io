/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'devzeebo.com',
  filename: '../index.html',
  template: './app/index.html',
  inject: 'head',
});

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    htmlPlugin,
  ],
});
