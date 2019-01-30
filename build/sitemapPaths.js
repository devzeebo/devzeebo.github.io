const posts = require('../app/posts');

module.exports = () => (
  Object.keys(posts.postLookup).map(it => `/post/${it}`)
);
