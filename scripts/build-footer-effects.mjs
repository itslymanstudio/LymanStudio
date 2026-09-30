import { build } from 'esbuild';

export async function buildFooterEffects() {
  await build({ entryPoints: ['components/footer-entry.jsx'], bundle: true, minify: true,
    format: 'iife', jsx: 'automatic', outfile: 'public/footer-magnet-lines.js',
    define: { 'process.env.NODE_ENV': '"production"' } });
}

if (process.argv[1]?.replaceAll('\\', '/').endsWith('/build-footer-effects.mjs')) await buildFooterEffects();
