// eslint-disable-next-line
const git = require('simple-git')();
// eslint-disable-next-line
const rimraf = require('rimraf');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

git.status((err, status) => {
  if (status.modified.length) {
    throw new Error('Develop has uncommitted changes');
  }
});

readline.question('Commit message: ', (msg) => {
  git.stash('--include-untracked', (err, data) => { console.error(err); console.log(data); });
  git.checkout('master', (err, data) => { console.error(err); console.log(data); });
  git.merge('develop', '-Xtheirs', (err, data) => { console.error(err); console.log(data); });

  rimraf.sync('dist');
  rimraf.sync('index.html');

  git.stash('pop', (err, data) => { console.error(err); console.log(data); });
  git.commit(msg, (err, data) => { console.error(err); console.log(data); });
  git.push('origin', 'master', (err, data) => { console.error(err); console.log(data); });
  git.checkout('develop', (err, data) => { console.error(err); console.log(data); });

  readline.close();
});
