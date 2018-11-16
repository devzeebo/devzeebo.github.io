/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'app/index'),
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'blog.[contenthash].js',
    publicPath: '.build/dist',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        enforce: 'pre',
        use: {
          loader: require.resolve('eslint-loader'),
          options: {
            eslintPath: require.resolve('eslint'),
          },
        },
      },
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'app'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
