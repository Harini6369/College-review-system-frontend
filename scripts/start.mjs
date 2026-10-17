import { access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

const hasDist = await access('dist/index.html')
  .then(() => true)
  .catch(() => false);

if (!hasDist) {
  console.log('[start] dist/ missing — running production build...');
  run('npm', ['run', 'render-build']);
}

const port = process.env.PORT || '4173';
run('npx', ['serve', 'dist', '-s', '-l', `tcp://0.0.0.0:${port}`]);
