import { access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

if (process.env.RENDER !== 'true') {
  process.exit(0);
}

if (process.env.SKIP_RENDER_POSTINSTALL === '1') {
  process.exit(0);
}

const hasDist = await access('dist/index.html')
  .then(() => true)
  .catch(() => false);

if (hasDist) {
  process.exit(0);
}

console.log('[render] postinstall: building dist/ for deploy...');
const result = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, SKIP_RENDER_POSTINSTALL: '1' },
});

process.exit(result.status ?? 0);
