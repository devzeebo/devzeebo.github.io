/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const common = require('./webpack.common.js');

const htmlPlugin = new HtmlWebpackPlugin({
  title: 'devzeebo.com',
  filename: '../index.html',
  template: './app/index.html',
  baseUrl: '://devzeebo.github.io',
  inject: 'head',
});

module.exports = merge(common, {
  output: {
    path: path.resolve(__dirname, '.build/dist'),
  },
  mode: 'production',
  plugins: [
    htmlPlugin,
  ],
});
