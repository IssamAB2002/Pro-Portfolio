import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const frontendRoot = resolve(__dirname, '..');
const projectRoot = resolve(frontendRoot, '..');
const distDir = resolve(frontendRoot, 'dist');
const djangoTemplateDir = resolve(projectRoot, 'backend', 'templates', 'react');
const djangoStaticDir = resolve(projectRoot, 'backend', 'static', 'react');

if (!existsSync(distDir)) {
  throw new Error('frontend/dist not found. Run `npm run build` first.');
}

mkdirSync(djangoTemplateDir, { recursive: true });
mkdirSync(djangoStaticDir, { recursive: true });

rmSync(resolve(djangoStaticDir, 'assets'), { recursive: true, force: true });

cpSync(resolve(distDir, 'assets'), resolve(djangoStaticDir, 'assets'), {
  recursive: true,
});

if (existsSync(resolve(distDir, 'vite.svg'))) {
  cpSync(resolve(distDir, 'vite.svg'), resolve(djangoStaticDir, 'vite.svg'));
}

cpSync(resolve(distDir, 'index.html'), resolve(djangoTemplateDir, 'index.html'));

console.log('Synced React build to backend/templates/react and backend/static/react');
