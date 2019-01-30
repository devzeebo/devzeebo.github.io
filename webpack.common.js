/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sitemapPaths = require('./build/sitemapPaths');

module.exports = {
  entry: path.resolve(__dirname, 'app/index'),
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'blog.[hash].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/404.html' },
      { from: 'posts/*' },
      { from: 'app/robots.txt' },
    ]),
    new SitemapPlugin(
      'https://devzeebo.github.io',
      sitemapPaths(),
      {
        lastMod: true,
      },
    ),
  ],
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
