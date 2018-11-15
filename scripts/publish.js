// eslint-disable-next-line
const git = require('simple-git/promise')();
// eslint-disable-next-line
const rimraf = require('rimraf');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

async function publishToMaster() {
  const status = await git.status();
  if (status.modified.length) {
    throw new Error('Develop has uncommitted changes');
  }

  readline.question('Commit message: ', (msg) => {
    await git.stash('--include-untracked');
    await git.checkout('master');
    await git.merge('develop', '-Xtheirs');

    await rimraf('dist');
    await rimraf('index.html');

    await git.stash('pop');
    await git.commit(msg);
    await git.push('origin', 'master');
    await git.checkout('develop');

    readline.close();
  });
}

publishToMaster();
