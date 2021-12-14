import Webpack from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import htmlPlugin from './htmlPlugin';
import { PluginConstructorArgs } from './_types';
import eslintPlugin from './eslintPlugin';
import copyPlugin from './copyPlugin';

export default (args: PluginConstructorArgs) => [
  htmlPlugin(args),
  new NodePolyfillPlugin(),
  eslintPlugin(),
  copyPlugin(),
] as Array<Webpack.WebpackPluginInstance>;

