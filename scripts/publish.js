// eslint-disable-next-line
const git = require('simple-git')();

git.status((err, status) => {
  if (status.modified) {
    throw new Error('Develop has uncommitted changes');
  }
});
