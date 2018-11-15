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
  await git.pull('origin', 'master', { '-XTheirs': null });
  try {
    await git.merge(['develop', '-Xtheirs', '-m', commitMessage]);
    // eslint-disable-next-line
  } finally { }

  // keeping dist and index because we need them
  // keeping node_modules because we don't want to reinstall every time
  // keeping .git so we don't blow away the repo
  rimraf.sync('!(dist*|index.html|node_modules*|.git*)');

  await git.stash('pop');
  await git.add('./*');
  await git.commit(commitMessage, [], { '--amend': null });
  await git.push('origin', 'master');
  await git.checkout('develop');
}

publishToMaster();
