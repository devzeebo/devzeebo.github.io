const { spawnSync } = require('child_process');

spawnSync('git', ['checkout', 'master']);

spawnSync('git', ['add', '-A']);
spawnSync('git', ['commit', '-m', '']);
spawnSync('git', ['push', 'origin', 'master']);
spawnSync('git', ['checkout', 'develop']);
