const RSS = require('rss');
const fs = require('fs');
const path = require('path');
const forEach = require('lodash/forEach');

const posts = require('../app/posts');

const feed = new RSS({
  title: 'devzeebo.github.io',
  description: '',
  feed_url: 'https://devzeebo.github.io/rss.xml',
  site_url: 'https://devzeebo.github.io',
  managingEditor: 'Eric Siebeneich',
  copyright: `${new Date().getFullYear()} Eric Siebeneich`,
  language: 'en',
  categories: ['Software', 'Development', 'Programming'],
  pubDate: new Date().toISOString(),
  ttl: '60',
});

forEach(posts.posts, (it, key) => {
  feed.item({
    title: it.title,
    url: `https://devzeebo.github.io/post/${key}`,
    description: it.description,
  });
});

module.exports.build = () => {
  fs.mkdirSync(path.resolve(__dirname, '..', 'dist'));
  fs.writeFileSync(
    path.resolve(__dirname, '..', 'dist', 'rss.xml'),
    feed.xml(),
  );
};
