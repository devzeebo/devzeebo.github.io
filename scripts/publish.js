// eslint-disable-next-line
const git = require('simple-git')();

git.status((err, status) => {
  console.log(status);
  if (status.modified.length) {
    throw new Error('Develop has uncommitted changes');
  }
});
