import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(process.cwd(), 'dist');
const index = resolve(dist, 'index.html');
const fallback = resolve(dist, '404.html');

if (!existsSync(dist)) {
  console.error('dist folder not found. Run build first.');
  process.exit(1);
}

try {
  cpSync(index, fallback);
  console.log('Copied index.html -> 404.html');
} catch (err) {
  console.error('Failed to copy index -> 404:', err);
  process.exit(1);
}