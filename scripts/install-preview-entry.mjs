import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const manifest = JSON.parse(await readFile('mirror-manifest.json', 'utf8'));
for (const route of manifest.routes) {
  const file = path.join('public', route, 'index.html');
  let html = await readFile(file, 'utf8');
  html = html.replace(/<script data-local-file-entry>[\s\S]*?<\/script>/, '');
  const standalone = route === '/' ? 'index.html' : `preview${route}/index.html`;
  const target = path.relative(path.dirname(file), standalone).replaceAll('\\', '/');
  const entry = `<script data-local-file-entry>if(location.protocol==='file:')location.replace(${JSON.stringify(target)}+location.search+location.hash);</script>`;
  html = html.replace('<head>', '<head>' + entry);
  await writeFile(file, html);
}
console.log('Installed direct-file preview forwarding on all ' + manifest.routes.length + ' pages.');
