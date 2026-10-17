import { access } from 'node:fs/promises';

try {
  await access(new URL('../dist/index.html', import.meta.url));
} catch {
  console.error(
    'dist/index.html is missing. On Render, set Build Command to: npm run build',
  );
  process.exit(1);
}
