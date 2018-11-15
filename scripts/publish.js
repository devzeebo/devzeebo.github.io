// eslint-disable-next-line
const git = require('simple-git')();
const rimraf = require('rimraf');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

git.status((err, status) => {
  if (status.modified.length) {
    throw new Error('Develop has uncommitted changes');
  }
});

readline.question('Commit message: ', (msg) => {
  git
    .stash('--include-untracked', (err, data) => { console.error(err); console.log(data); })
    .checkout('master', (err, data) => { console.error(err); console.log(data); })
    .merge('develop', '-Xtheirs', (err, data) => { console.error(err); console.log(data); });

  rimraf('dist');
  rimraf('index.html');

  git.stash('pop', (err, data) => { console.error(err); console.log(data); })
    .commit(msg, (err, data) => { console.error(err); console.log(data); })
    .push('origin', 'master', (err, data) => { console.error(err); console.log(data); })
    .checkout('develop', (err, data) => { console.error(err); console.log(data); });

  readline.close();
});
