// eslint-disable-next-line
const git = require('simple-git/promise')();
// eslint-disable-next-line
const rimraf = require('rimraf');
const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });

function Prompt(prompt) {
  return new Promise((resolve) => {
    readline.resume();
    readline.question(prompt, (msg) => {
      readline.pause();
      resolve(msg);
    });
  });
}

async function publishToMaster() {
  const status = await git.status();
  if (status.modified.length) {
    throw new Error('Develop has uncommitted changes');
  }

  await git.stash({ '--include-untracked': null });
  // await Prompt('Post stash/Pre checkout master');
  await git.checkout('master');
  // await Prompt('Post checkout master/pre pull o m');
  await git.pull('origin', 'master', { '-XTheirs': null });
  // await Prompt('Post checkout master/pre rimraf');

  // keeping node_modules because we don't want to reinstall every time
  // keeping .git so we don't blow away the repo
  rimraf.sync('!(node_modules*|.git*)', { glob: { dot: true, nosort: true, silent: true } });

  // await Prompt('post rimraf/pre pop');
  await git.stash('pop');
  // await Prompt('post pop/pre add');
  await git.add('./*');
  const commitMessage = await Prompt('Commit message: ');
  await git.commit(commitMessage);
  // await Prompt('post commit/pre push');
  await git.push('origin', 'master');
  // await Prompt('post push/pre checkout develop');
  await git.checkout('develop');

  readline.close();
}

publishToMaster();
