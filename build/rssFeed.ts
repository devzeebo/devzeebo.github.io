import RSS from 'rss';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import forEach from 'lodash/forEach';

import posts from '../app/posts';

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
  ttl: 60,
});

forEach(posts.posts.entities, (it: any, key: string) => {
  const file = path.resolve(__dirname, '..', 'posts', it.filename);

  const datePublished = execSync(`git log -1 --pretty="format:%ci" ${file}`).toString();

  feed.item({
    date: datePublished,
    title: it.title,
    url: `https://devzeebo.github.io/post/${key}`,
    description: it.description,
  });
});

const dist = path.resolve(__dirname, '..', 'dist');
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist);
}
fs.writeFileSync(
  path.resolve(__dirname, '..', 'dist', 'rss.xml'),
  feed.xml(),
);
