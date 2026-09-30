import { readFile, writeFile, readdir, mkdir, stat, rm } from 'node:fs/promises';
import path from 'node:path';
import { brotliDecompressSync } from 'node:zlib';

// Adapt the existing lossless production build to Vercel's Build Output API.
// Large media belongs on the CDN, not in a function response or bundle.
const project = path.resolve('.');
const source = path.join(project, 'dist');
const output = path.join(project, '.vercel', 'output');
const markerName = 'lyman-build.json';
if (await stat(output).then(() => true).catch(() => false)) {
  const marker = await readFile(path.join(output, markerName), 'utf8').then(JSON.parse).catch(() => null);
  if (marker?.generatedBy !== 'lyman-vercel-builder') throw new Error('Refusing to replace unrecognized Vercel output');
  await rm(output, { recursive: true });
}
const functionDir = path.join(output, 'functions', 'site.func');
const staticDir = path.join(output, 'static');
async function emit(base, relative, bytes) {
  const destination = path.join(base, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
}
async function* files(dir, prefix = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) yield* files(path.join(dir, entry.name), relative);
    else yield relative;
  }
}
let staticBytes = 0, functionBytes = 0;
for await (const relative of files(path.join(source, 'public'))) {
  const bytes = await readFile(path.join(source, 'public', relative));
  const rawName = relative.replace(/\.br$/, '');
  if (rawName.endsWith('.html') || rawName.endsWith('.framercms') || rawName === 'deployment-assets.json') {
    await emit(functionDir, 'public/' + relative, bytes);
    functionBytes += bytes.length;
  } else {
    const decoded = relative.endsWith('.br') ? brotliDecompressSync(bytes) : bytes;
    await emit(staticDir, rawName, decoded);
    staticBytes += decoded.length;
  }
}
const server = await readFile(path.join(source, 'server.mjs'));
await emit(functionDir, 'server.mjs', server);
functionBytes += server.length;
await emit(functionDir, 'index.mjs', `process.env.NODE_ENV = 'production';
process.env.LYMAN_SERVERLESS = '1';
const { requestHandler } = await import('./server.mjs');
export default function handler(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const requestedPath = url.searchParams.get('__lyman_path');
  if (requestedPath !== null) {
    url.searchParams.delete('__lyman_path');
    req.url = '/' + requestedPath + (url.search ? url.search : '');
  }
  return requestHandler(req, res);
}
`);
await emit(functionDir, 'package.json', JSON.stringify({ type: 'module' }));
await emit(functionDir, '.vc-config.json', JSON.stringify({
  runtime: 'nodejs22.x', handler: 'index.mjs', launcherType: 'Nodejs',
  maxDuration: 30, supportsResponseStreaming: true
}, null, 2));
const aliases = JSON.parse(await readFile(path.join(source, 'public', 'deployment-assets.json'), 'utf8'));
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const routes = Object.entries(aliases).map(([from, to]) => ({ src: '^' + escapeRegex(from) + '$', dest: to }));
routes.push(
  { src: '^/(.*\\.framercms)$', dest: '/site?__lyman_path=$1' },
  { handle: 'filesystem' },
  { src: '^/(.*)$', dest: '/site?__lyman_path=$1' }
);
await emit(output, 'config.json', JSON.stringify({ version: 3, routes }, null, 2));
await emit(output, markerName, JSON.stringify({ generatedBy: 'lyman-vercel-builder', staticBytes, functionBytes }));
console.log(`Vercel output ready: CDN ${(staticBytes / 1048576).toFixed(2)} MiB; function ${(functionBytes / 1048576).toFixed(2)} MiB`);
