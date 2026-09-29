import { mkdir, writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://bungee.framer.website';
const root = path.resolve('public');
const assets = new Map();
const pages = new Map();
const pending = [];
const failures = [];
const assetHosts = new Set(['framerusercontent.com', 'fonts.gstatic.com', 'fonts.googleapis.com']);
const local = u => '/_assets/' + u.hostname + u.pathname;
function queueAsset(raw, base) {
  if (raw === '/editor-disabled.mjs') return raw;
  let u;
  try { u = new URL(raw.replaceAll('&amp;', '&'), base); } catch { return raw; }
  if (!assetHosts.has(u.hostname)) return raw;
  if (u.pathname.includes('/node_modules/') || u.pathname.endsWith('/')) return raw;
  u.hash = ''; u.search = '';
  const key = u.href;
  if (!assets.has(key)) { assets.set(key, local(u)); pending.push(u); }
  return local(u);
}
function rewrite(text, base) {
  text = text.replace(/\/_assets\/(framerusercontent\.com|fonts\.gstatic\.com|fonts\.googleapis\.com)\//g, 'https://$1/');
  text = text.replace(/new URL\((["'`])([^"'`]+\.framercms)\1,\s*(["'`])(https:\/\/[^"'`]+)\3\)\.href\.replace\((["'`])\/modules\/\5,\s*(["'`])\/cms\/\6\)/g, (all, q, rel, q2, baseUrl) => `new URL(${JSON.stringify(queueAsset(new URL(rel, baseUrl).href.replace('/modules/', '/cms/'), base))},window.location.origin).href`);
  text = text.replaceAll('https://framer.com/edit/init.mjs', '/editor-disabled.mjs');
  text = text.replace(/https:\/\/(?:framerusercontent\.com|fonts\.gstatic\.com|fonts\.googleapis\.com)\/[^\s"'`<>\\)]+/g, raw => queueAsset(raw, base));
  // Published modules import adjacent chunks using relative specifiers.
  text = text.replace(/(["'`])([^"'`\s]+\.(?:mjs|js|css)(?:\?[^"'`]*)?)\1/g, (all, quote, raw) => raw.startsWith('/_assets/') || raw.includes('${') ? all : quote + queueAsset(raw, base) + quote);
  if (/\/(taxjXhS3T|WELClYl1W)\.[^/]+\.mjs$/.test(base)) {
    text = text.replace('return this.decoder.decode(t)', 'return this.decoder.decode(t).replaceAll("https://framerusercontent.com/","/_assets/framerusercontent.com/")');
  }
  return text;
}
async function get(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return response;
    } catch (error) { if (attempt === 2) throw error; }
  }
}
async function save(filename, data) {
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, data);
}
const routes = ['/'];
try {
  const sitemap = await (await get(origin + '/sitemap.xml')).text();
  for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
    const url = new URL(match[1]);
    if (url.origin === origin && !url.pathname.endsWith('.xml')) routes.push(url.pathname);
  }
} catch (error) { console.warn('Sitemap:', error.message); }
for (let i = 0; i < routes.length; i++) {
  const route = routes[i];
  if (pages.has(route)) continue;
  const html = route === '/' ? await readFile('reference.html', 'utf8') : await (await get(origin + route)).text();
  for (const match of html.matchAll(/href="(\/[^"]*|\.\/[^"#?]*)"/g)) {
    const url = new URL(match[1], origin + route);
    if (url.origin === origin && !path.extname(url.pathname) && !pages.has(url.pathname) && !routes.includes(url.pathname)) routes.push(url.pathname);
  }
  let output = rewrite(html, origin + route);
  output = output.replace(/<script\b[^>]*src="https:\/\/events\.framer\.com[^>]*><\/script>/g, '');
  const standalone = path.resolve(route === '/' ? 'index.html' : `preview${route}/index.html`);
  const fileTarget = path.relative(path.join(root, route), standalone).replaceAll('\\', '/');
  output = output.replace('<head>', `<head><script data-local-file-entry>if(location.protocol==='file:')location.replace(${JSON.stringify(fileTarget)}+location.search+location.hash);</script><script src="/local-preview.js"></script>`);
  await save(path.join(root, route, 'index.html'), output);
  pages.set(route, { bytes: Buffer.byteLength(output) });
  console.log('Page:', route);
}
let count = 0;
while (pending.length) {
  const batch = pending.splice(0, 10);
  await Promise.all(batch.map(async u => {
    try {
      const target = path.join(root, local(u));
      let cached;
      try { if (!/\.(mjs|framercms)$/.test(u.pathname)) cached = await readFile(target); } catch {}
      const response = cached ? null : await get(u.href);
      const contentType = response?.headers.get('content-type') || '';
      const isText = !u.pathname.endsWith('.framercms') && (/javascript|text\/|json|svg/.test(contentType) || /\.(mjs|js|css|json|svg)$/.test(u.pathname));
      const data = isText ? rewrite(cached ? cached.toString('utf8') : await response.text(), u.href) : cached || Buffer.from(await response.arrayBuffer());
      await save(path.join(root, local(u)), data);
      count++;
    } catch (error) { failures.push({ url: u.href, error: error.message }); }
  }));
  console.log(`Assets: ${count}, remaining: ${pending.length}`);
}
await save(path.resolve('mirror-manifest.json'), JSON.stringify({ source: origin, createdAt: new Date().toISOString(), routes: [...pages.keys()], assets: Object.fromEntries(assets), failures }, null, 2));
console.log(`Saved ${pages.size} pages and ${count} assets. Failures: ${failures.length}`);
if (failures.length) { console.error(failures); process.exitCode = 1; }
