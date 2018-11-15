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
    .merge('develop', (err, data) => { console.error(err); console.log(data); })
    .add('./*', (err, data) => { console.error(err); console.log(data); })
    .commit(msg, (err, data) => { console.error(err); console.log(data); })
    .push('origin', 'master', (err, data) => { console.error(err); console.log(data); })
    .checkout('develop', (err, data) => { console.error(err); console.log(data); });

  readline.close();
});
