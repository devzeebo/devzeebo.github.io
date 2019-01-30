const posts = require('../app/posts');

module.exports = () => (
  Object.keys(posts.posts).map(it => `/post/${it}`)
);
