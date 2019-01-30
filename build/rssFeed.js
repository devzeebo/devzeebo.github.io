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
  webMaster: 'Eric Siebeneich',
  copyright: `${new Date().getFullYear()} Eric Siebeneich`,
  language: 'en',
  categories: ['Software', 'Development', 'Programming'],
  pubDate: new Date().toISOString(),
  ttl: '60',
});

forEach(posts.postLookup, (it) => {
  feed.item({
    description: it,
  });
});

module.exports.build = () => {
  fs.writeFile(
    path.resolve(__dirname, 'build', 'rss.xml'),
    feed.xml(),
  );
};
