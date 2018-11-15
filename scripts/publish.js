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

  const commitMessage = await Prompt('Commit message: ');
  await git.stash({ '--include-untracked': null });
  await Prompt('Press Enter');
  await git.checkout('master');
  await Prompt('Press Enter');
  await git.pull('origin', 'master', { '-XTheirs': null });
  await Prompt('Press Enter');
  try {
    await git.merge(['develop', '-Xtheirs', '-m', commitMessage]);
    // eslint-disable-next-line
  } finally { }
  await Prompt('Press Enter');

  // keeping dist and index because we need them
  // keeping node_modules because we don't want to reinstall every time
  // keeping .git so we don't blow away the repo
  rimraf.sync('!(dist*|index.html|node_modules*|.git*)');

  await Prompt('Press Enter');
  await git.stash('pop');
  await Prompt('Press Enter');
  await git.add('./*');
  await Prompt('Press Enter');
  await git.commit(commitMessage, [], { '--amend': null });
  await Prompt('Press Enter');
  await git.push('origin', 'master');
  await Prompt('Press Enter');
  await git.checkout('develop');

  readline.close();
}

publishToMaster();
