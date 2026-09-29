import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { meetDevsStyles, meetDevsMarkup } from './meet-devs.mjs';
import { rebrandHtml } from './rebrand.mjs';
import { spaceGroteskStyles } from './typography.mjs';
import { introReferenceStyles } from './intro-reference.mjs';
import { faqStyles, faqMarkup } from './faq-section.mjs';
import { closingFooterMarkup, closingFooterStyles } from './closing-footer.mjs';
import { studioMetricsStyles, studioMetricsMarkup } from './studio-metrics.mjs';
import { siteCanvasStyles } from './site-canvas.mjs';
import { processArticleRoute, processArticleStyles, processArticleMarkup } from './process-article.mjs';
import { logoLoopStyles } from './logo-loop.mjs';
import { heroEffectsStyles } from './hero-effects.mjs';
import { heroMediaStyles, heroMediaRuntime, replaceHeroMedia } from './hero-media.mjs';
import { navigationStyles } from './navigation.mjs';
import { renderLegalPage } from './legal-pages.mjs';
const root = fileURLToPath(new URL('./public/', import.meta.url)).replace(/[\\/]$/, '');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
http.createServer(async (req, res) => {
  try {
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); return res.end('Preview only'); }
    const url = new URL(req.url, 'http://localhost');
    if (/^\/projects\/(?:zypher|grotesks|clonify|polltree)(?:\/|\/index\.html)?$/.test(url.pathname)) {
      res.writeHead(302, { Location: '/projects', 'Cache-Control': 'no-cache' });
      return res.end();
    }
    const legalKind = url.pathname.match(/^\/(privacy|terms)\/?$/)?.[1];
    if (legalKind) {
      const links = { homeHref: '/', projectsHref: '/projects', aboutHref: '/about', blogHref: '/blog', contactHref: '/contact', privacyHref: '/privacy', termsHref: '/terms' };
      const body = Buffer.from(renderLegalPage(legalKind, links, '/_assets', '/scroll-motion.js'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': body.length, 'Cache-Control': 'no-cache' });
      return res.end(req.method === 'HEAD' ? undefined : body);
    }
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/hcIRUi1qFh8aGDJENXamzOak3Z8.svg')) file = path.join(root, '_assets', 'ratio-symbol.svg');
    if (url.pathname.endsWith('/MYaL4AWEDy6afpn3WmSVtWlXFjM.svg')) file = path.join(root, '_assets', 'ratio-wordmark.svg');
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); return res.end(); }
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    let data = await readFile(file);
    if (path.extname(file) === '.html') {
      let html = data.toString();
      const home = url.pathname === '/' || url.pathname === '/index.html';
      const processArticle = url.pathname.replace(/\/$/, '') === processArticleRoute;
      html = rebrandHtml(html, { assetBase: '/_assets', contactHref: '/contact' });
      html = html.replace(/<html\b/i, `<html data-ratio-route="${home ? '/' : url.pathname.replace(/\/$/, '')}"`);
      const styles = `${spaceGroteskStyles('/_assets')}${closingFooterStyles}.framer-chdyiw-container{display:none!important}${home ? `${introReferenceStyles}${studioMetricsStyles}${faqStyles}.framer-1ju0swc[data-framer-name="Testimonials"]{display:none!important}${meetDevsStyles}${logoLoopStyles}${heroEffectsStyles}` : ''}${processArticle ? processArticleStyles : ''}${siteCanvasStyles}${navigationStyles}`;
      html = html.replace('</head>', `<style>${styles}</style></head>`);
      if (home) {
        html = replaceHeroMedia(html, '/_assets');
        html = html.replace('</head>', `<style>${heroMediaStyles}</style></head>`);
        html = html.replace('</body>', `${heroMediaRuntime('/_assets')}</body>`);
      }
      html = html.replace('</body>', `${closingFooterMarkup({ homeHref: '/', projectsHref: '/projects', aboutHref: '/about', blogHref: '/blog', contactHref: '/contact', privacyHref: '/privacy', termsHref: '/terms' })}</body>`);
      if (home) {
        const metrics = JSON.stringify(studioMetricsMarkup);
        html = html.replace('</body>', `<script>(()=>{const markup=${metrics};const mount=()=>{const old=document.querySelector('.framer-1pp2tz1[data-framer-name="Metrics"]');if(old&&!document.querySelector('.ratio-studio-metrics'))old.insertAdjacentHTML('afterend',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script></body>`);
        const markup = JSON.stringify(meetDevsMarkup('/_assets/devs'));
        html = html.replace('</body>', `<script>(()=>{const markup=${markup};const mount=()=>{const old=document.querySelector('[data-framer-name="Testimonials"]');if(old&&!document.querySelector('.meet-devs'))old.insertAdjacentHTML('afterend',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script></body>`);
        const faq = JSON.stringify(faqMarkup);
        html = html.replace('</body>', `<script>(()=>{const markup=${faq};const mount=()=>{const old=document.querySelector('[data-framer-name="FAQ"]');if(old&&!document.querySelector('.ratio-faq'))old.insertAdjacentHTML('afterend',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script></body>`);
        html = html.replace('</body>', '<script src="/studio-metrics.js"></script></body>');
        html = html.replace('</body>', '<script src="/dev-flip.js"></script></body>');
        html = html.replace('</body>', '<script src="/logo-loop.js"></script></body>');
      }
      if (processArticle) {
        const processMarkup = JSON.stringify(processArticleMarkup);
        html = html.replace('</body>', `<script>(()=>{const markup=${processMarkup};const mount=()=>{const pagination=document.querySelector('article[data-framer-name="Article"] [data-framer-name="Pagination"]');if(pagination&&!document.querySelector('.ratio-process'))pagination.insertAdjacentHTML('beforebegin',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script><script src="/process-article.js"></script></body>`);
      }
      html = html.replace('</body>', '<script src="/scroll-motion.js"></script></body>');
      html = html.replace('</body>', '<script src="/ratio-runtime.js" data-asset-base="/_assets" data-contact="/contact"></script></body>');
      data = Buffer.from(html);
    }
    const headers = { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'Accept-Ranges': 'bytes' };
    const cmsRange = url.searchParams.get('range');
    if (file.endsWith('.framercms') && cmsRange) {
      if (!/^\d+-\d+(,\d+-\d+)*$/.test(cmsRange)) { res.writeHead(400); return res.end(); }
      const chunks = cmsRange.split(',').map(pair => {
        const [start, end] = pair.split('-').map(Number);
        return data.subarray(start, end + 1);
      });
      const body = Buffer.concat(chunks);
      res.writeHead(200, { ...headers, 'Content-Length': body.length });
      return res.end(req.method === 'HEAD' ? undefined : body);
    }
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    if (range) {
      const start = Number(range[1]), end = Math.min(range[2] ? Number(range[2]) : data.length - 1, data.length - 1);
      if (start > end || start >= data.length) { res.writeHead(416, { 'Content-Range': `bytes */${data.length}` }); return res.end(); }
      res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${data.length}`, 'Content-Length': end - start + 1 });
      return res.end(req.method === 'HEAD' ? undefined : data.subarray(start, end + 1));
    }
    res.writeHead(200, { ...headers, 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log('Ratio Design preview: http://localhost:' + (process.env.PORT || 3000)));
