import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { PluginConstructorArgs } from './_types';

const baseUrls = {
  development: '/',
  production: '//devzeebo.github.io',
}

export default ({
  srcRoot,
  mode,
}: PluginConstructorArgs) => new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(srcRoot, 'index.html'),
  baseUrl: baseUrls[mode],
  inject: 'head',
});
