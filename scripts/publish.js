// eslint-disable-next-line
const git = require('simple-git')();
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

git.status((err, status) => {
  if (status.modified.length) {
    throw new Error('Develop has uncommitted changes');
  }
});

readline.question('Commit message: ', (msg) => {
  git.checkout('master')
    .merge('develop')
    .add('./*')
    .commit(msg)
    .push('origin', 'master')
    .checkout('develop');

  readline.close();
});
