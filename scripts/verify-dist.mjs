import { access } from 'node:fs/promises';

try {
  await access(new URL('../dist/index.html', import.meta.url));
} catch {
  console.error(
    'dist/index.html is missing. On Render, Build Command must be: npm run render-build',
  );
  console.error(
    '(installs devDependencies — vite/typescript — then npm run build). Start Command: npm start only for Web Service.',
  );
  process.exit(1);
}
