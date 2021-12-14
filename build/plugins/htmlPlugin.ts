import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { PluginConstructorArgs } from './_types';

export default ({
  srcRoot,
}: PluginConstructorArgs) => new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(srcRoot, 'index.html'),
  inject: 'head',
});
