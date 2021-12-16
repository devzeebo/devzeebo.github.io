import Webpack from 'webpack';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import htmlPlugin from './htmlPlugin';
import { PluginConstructorArgs } from './_types';
import eslintPlugin from './eslintPlugin';
import copyPlugin from './copyPlugin';
import sitemapPlugin from './sitemapPlugin';

export default (args: PluginConstructorArgs) => [
  htmlPlugin(args),
  new NodePolyfillPlugin(),
  eslintPlugin(),
  copyPlugin(),
  sitemapPlugin(args),
] as Array<Webpack.WebpackPluginInstance>;

