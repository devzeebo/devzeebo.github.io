// eslint-disable-next-line
const git = require('simple-git/promise')();
// eslint-disable-next-line
const rimraf = require('rimraf');
const fs = require('fs');
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

  await git.checkout('master');
  await git.pull('origin', 'master', { '-XTheirs': null });

  // keeping node_modules because we don't want to reinstall every time
  // keeping .git so we don't blow away the repo
  rimraf.sync('!(node_modules*|.git*|.build*)', { glob: { dot: true, nosort: true, silent: true } });
  fs.renameSync('.build/dist', 'dist');
  fs.renameSync('.build/index.html', 'index.html');
  rimraf.sync('.build', { glob: { dot: true, silent: true } });

  await git.add('./*');
  const commitMessage = await Prompt('Commit message: ');
  await git.commit(commitMessage);
  await git.push('origin', 'master');
  await git.checkout('develop');

  readline.close();
}

publishToMaster();
