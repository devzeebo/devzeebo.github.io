import SitemapPlugin from 'sitemap-webpack-plugin';
import { PluginConstructorArgs } from './_types';
import posts from '../../app/posts';

const paths = Object.keys(posts.posts.entities).map(it => `/post/${it}`);

const baseUrls = {
  development: 'http://localhost',
  production: 'https://devzeebo.github.io',
}

export default ({
  mode,
}: PluginConstructorArgs) => new SitemapPlugin({
  base: baseUrls[mode],
  paths,
});
