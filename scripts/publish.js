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

  const commitMessage = await new Promise((resolve) => {
    readline.question('Commit message: ', (msg) => {
      readline.close();
      resolve(msg);
    });
  });
  await git.stash({ '--include-untracked': null });
  await git.checkout('master');
  await git.merge('develop', '-Xtheirs');

  await rimraf('dist');
  await rimraf('index.html');

  await git.stash('pop');
  await git.commit(commitMessage);
  await git.push('origin', 'master');
  await git.checkout('develop');
}

publishToMaster();
