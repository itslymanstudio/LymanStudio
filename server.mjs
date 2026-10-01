import http from 'node:http';
import { showProjects } from './site-features.mjs';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompress, brotliDecompress, gzip } from 'node:zlib';
import { promisify } from 'node:util';
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
import { servicesCarouselStyles, servicesCarouselMarkup } from './services-carousel.mjs';
import { heroMediaStyles, heroMediaRuntime, replaceHeroMedia } from './hero-media.mjs';
import { injectStaggeredMenu } from './staggered-menu.mjs';
import { renderLegalPage } from './legal-pages.mjs';
import { dispatchPosts, dispatchRuntime, dispatchCardStyles, onlinePresenceRoute, renderOnlinePresenceArticle, replaceBlogCovers } from './blog-dispatch.mjs';
const root = fileURLToPath(new URL('./public/', import.meta.url)).replace(/[\\/]$/, '');
const production = process.env.NODE_ENV === 'production';
const assetAliases = await readFile(path.join(root, 'deployment-assets.json'), 'utf8').then(JSON.parse).catch(() => ({}));
const compressBrotli = promisify(brotliCompress);
const decompressBrotli = promisify(brotliDecompress);
const compressGzip = promisify(gzip);
// Production text assets may be stored only as lossless Brotli files.
async function readAsset(file) {
  try { return await readFile(file); }
  catch (error) {
    if (!production || error.code !== 'ENOENT') throw error;
    return decompressBrotli(await readFile(`${file}.br`));
  }
}
function acceptedEncoding(req) {
  const encodings = (req.headers['accept-encoding'] || '').split(',').map(value => {
    const [name, ...params] = value.trim().split(';');
    const quality = params.find(value => value.trim().startsWith('q='));
    return { name, quality: quality ? Number(quality.trim().slice(2)) : 1 };
  }).filter(value => value.quality > 0).sort((a,b) => b.quality-a.quality);
  return encodings.find(value => ['br','gzip'].includes(value.name))?.name;
}
async function send(req, res, data, headers, file) {
  const compressible = /text\/|javascript|json|image\/svg/.test(headers['Content-Type']);
  const encoding = production && compressible && data.length > 1024 ? acceptedEncoding(req) : null;
  if (encoding) {
    const prepared = file && !file.endsWith('.html') ? await readFile(`${file}.${encoding === 'br' ? 'br' : 'gz'}`).catch(() => null) : null;
    data = prepared || await (encoding === 'br' ? compressBrotli(data) : compressGzip(data));
    headers = { ...headers, 'Content-Encoding': encoding, Vary: 'Accept-Encoding' };
    delete headers['Accept-Ranges'];
  } else if (compressible) headers = { ...headers, Vary: 'Accept-Encoding' };
  res.writeHead(200, { ...headers, 'Content-Length': data.length });
  res.end(req.method === 'HEAD' ? undefined : data);
}
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.ico': 'image/x-icon' };
const siteLinks = { homeHref: '/', projectsHref: '/projects', aboutHref: '/about', blogHref: '/blog', contactHref: '/contact', privacyHref: '/privacy', termsHref: '/terms' };
const menuOptions = currentRoute => ({ links: siteLinks, assetBase: '/_assets', gsapSrc: '/gsap.min.js', menuSrc: '/staggered-menu.js', currentRoute });
const contactRecipient = 'itslymanstudio@gmail.com';
const contactRateLimit = new Map();

function sendJson(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload));
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': body.length });
  res.end(body);
}

async function handleContact(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Use POST to send an enquiry.' });
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !sender) return sendJson(res, 503, { error: 'Email delivery is not configured yet.' });

  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').toString().split(',')[0].trim();
  const now = Date.now();
  const recent = (contactRateLimit.get(ip) || []).filter(timestamp => now - timestamp < 10 * 60_000);
  if (recent.length >= 5) return sendJson(res, 429, { error: 'Too many enquiries. Please try again in a few minutes.' });

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 12_000) return sendJson(res, 413, { error: 'Your enquiry is too long.' });
  }

  let input;
  try { input = JSON.parse(raw); }
  catch { return sendJson(res, 400, { error: 'Please check the form and try again.' }); }

  // Quietly accept automated submissions caught by the hidden honeypot.
  if (typeof input.website === 'string' && input.website.trim()) return sendJson(res, 200, { ok: true });

  const field = (name, max) => typeof input[name] === 'string' ? input[name].trim().slice(0, max) : '';
  const name = field('full_name', 120);
  const email = field('email', 254);
  const phone = field('phone', 60);
  const region = field('region', 80);
  const companyType = field('company_type', 100);
  const brief = field('project_brief', 4_000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !brief) {
    return sendJson(res, 400, { error: 'Please enter your name, a valid email address, and a project brief.' });
  }

  const subjectName = name.replace(/[\r\n]+/g, ' ');
  const text = [
    'New project enquiry from the Lyman Studio website',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Region: ${region || 'Not provided'}`,
    `Company type: ${companyType || 'Not provided'}`,
    '',
    'Project brief:',
    brief
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [contactRecipient],
        reply_to: email,
        subject: `New project enquiry from ${subjectName}`,
        text
      })
    });
    if (!response.ok) return sendJson(res, 502, { error: 'The email service could not accept your enquiry. Please try again or email us directly.' });
    contactRateLimit.set(ip, [...recent, now]);
    return sendJson(res, 200, { ok: true });
  } catch {
    return sendJson(res, 502, { error: 'The email service is temporarily unavailable. Please try again or email us directly.' });
  }
}

export async function requestHandler(req, res) {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname === '/api/contact') return await handleContact(req, res);
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); return res.end('Preview only'); }
    if (!showProjects && /^\/projects(?:\/|$)/.test(url.pathname)) {
      res.writeHead(302, { Location: '/', 'Cache-Control': 'no-cache' });
      return res.end();
    }
    const requestedBlogSlug = url.pathname.match(/^\/blog\/([^/]+)(?:\/index\.html)?\/?$/)?.[1];
    if (requestedBlogSlug && !dispatchPosts.some(post => post.slug === requestedBlogSlug)) {
      res.writeHead(302, { Location: '/blog', 'Cache-Control': 'no-cache' });
      return res.end();
    }
    if (url.pathname.replace(/\/$/, '') === onlinePresenceRoute) {
      const article = injectStaggeredMenu(renderOnlinePresenceArticle('/_assets').replace('</head>', `<style>${spaceGroteskStyles('/_assets')}${closingFooterStyles}</style></head>`)
        .replace('</body>', `${closingFooterMarkup(siteLinks)}<script src="/scroll-motion.js"></script><script src="/ratio-runtime.js" data-asset-base="/_assets" data-contact="/contact"></script></body>`), menuOptions(onlinePresenceRoute));
      const body = Buffer.from(article);
      return send(req, res, body, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    }
    if (/^\/projects\/(?:zypher|grotesks|clonify|polltree)(?:\/|\/index\.html)?$/.test(url.pathname)) {
      res.writeHead(302, { Location: '/projects', 'Cache-Control': 'no-cache' });
      return res.end();
    }
    const legalKind = url.pathname.match(/^\/(privacy|terms)\/?$/)?.[1];
    if (legalKind) {
      const body = Buffer.from(injectStaggeredMenu(renderLegalPage(legalKind, siteLinks, '/_assets', '/scroll-motion.js'), menuOptions(`/${legalKind}`)));
      return send(req, res, body, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    }
    let file = path.resolve(root, '.' + decodeURIComponent(url.pathname));
    if (assetAliases[url.pathname]) file = path.resolve(root, '.' + assetAliases[url.pathname]);
    const coverPost = dispatchPosts.find(post => url.pathname.endsWith('/'+post.originalCover));
    if (coverPost) {
      const requested = Number(url.searchParams.get('scale-down-to'));
      const width = requested > 0 && requested <= 640 ? 640 : requested > 0 && requested <= 960 ? 960 : 1440;
      file = path.join(root,'_assets','blog-covers',`${coverPost.cover}-${width}.webp`);
    }
    if (url.pathname.endsWith('/hcIRUi1qFh8aGDJENXamzOak3Z8.svg')) file = path.join(root, '_assets', 'lymen-symbol.svg');
    if (url.pathname.endsWith('/MYaL4AWEDy6afpn3WmSVtWlXFjM.svg')) file = path.join(root, '_assets', 'lymen-wordmark.svg');
    const brandAsset = url.pathname.match(/\/(lymen-(?:symbol(?:-light)?|wordmark)\.svg)$/)?.[1];
    if (brandAsset) file = path.join(root, '_assets', brandAsset);
    if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403); return res.end(); }
    const fileInfo = await stat(file).catch(error => {
      if (!production || error.code !== 'ENOENT') throw error;
      return stat(`${file}.br`);
    });
    if (fileInfo.isDirectory()) file = path.join(file, 'index.html');
    let data = await readAsset(file);
    if (path.extname(file) === '.html') {
      let html = data.toString();
      const home = url.pathname === '/' || url.pathname === '/index.html';
      const blogListing = url.pathname.replace(/\/$/, '') === '/blog';
      const processArticle = url.pathname.replace(/\/$/, '') === processArticleRoute;
      html = rebrandHtml(html, { assetBase: '/_assets', contactHref: '/contact' });
      html = replaceBlogCovers(html, '/_assets', home ? '/' : url.pathname.replace(/\/$/,''));
      html = html.replace(/<html\b/i, `<html data-ratio-route="${home ? '/' : url.pathname.replace(/\/$/, '')}"`);
      const referenceCtaStyles = processArticle ? '' : '#main footer[data-framer-name="CTA+Newsletter"]{display:none!important}';
      const styles = `${spaceGroteskStyles('/_assets')}${closingFooterStyles}.framer-chdyiw-container{display:none!important}#__framer-badge-container,.__framer-badge{display:none!important}${referenceCtaStyles}${home ? `${introReferenceStyles}${studioMetricsStyles}${faqStyles}.framer-1ju0swc[data-framer-name="Testimonials"]{display:none!important}${meetDevsStyles}${logoLoopStyles}${heroEffectsStyles}${servicesCarouselStyles}` : ''}${processArticle ? processArticleStyles : ''}${siteCanvasStyles}`;
      html = html.replace('</head>', `<style>${styles}${dispatchCardStyles}</style></head>`);
      if (home) {
        html = replaceHeroMedia(html, '/_assets');
        html = html.replace('</head>', `<style>${heroMediaStyles}</style></head>`);
        html = html.replace('</body>', `${heroMediaRuntime('/_assets')}</body>`);
      }
      html = html.replace('</body>', `${closingFooterMarkup(siteLinks)}</body>`);
      if (home) {
        html = html.replace('</head>', '<link rel="stylesheet" href="/services-carousel.css"></head>');
        const services = JSON.stringify(servicesCarouselMarkup('/_assets'));
        html = html.replace('</body>', `<script>(()=>{const markup=${services};const mount=()=>{const old=document.querySelector('section.framer-jx0221[data-framer-name="Main"]');if(old&&!document.querySelector('.ratio-services'))old.insertAdjacentHTML('afterend',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script><script src="/services-carousel.js"></script></body>`);
        const metrics = JSON.stringify(studioMetricsMarkup);
        html = html.replace('</body>', `<script>(()=>{const markup=${metrics};const mount=()=>{const old=document.querySelector('.framer-1pp2tz1[data-framer-name="Metrics"]');if(old&&!document.querySelector('.ratio-studio-metrics'))old.insertAdjacentHTML('afterend',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script></body>`);
        const markup = JSON.stringify(meetDevsMarkup('/_assets/devs'));
        html = html.replace('</body>', `<script>(()=>{const markup=${markup};const mount=()=>{const old=document.querySelector('[data-framer-name="Testimonials"]');if(old&&!document.querySelector('.meet-devs'))old.insertAdjacentHTML('afterend',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script></body>`);
        const faq = JSON.stringify(faqMarkup);
        html = html.replace('</body>', `<script>(()=>{const markup=${faq};const mount=()=>{const old=document.querySelector('[data-framer-name="FAQ"]');if(old&&!document.querySelector('.ratio-faq'))old.insertAdjacentHTML('afterend',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script></body>`);
        html = html.replace('</body>', '<script src="/studio-metrics.js"></script></body>');
        html = html.replace('</body>', '<script src="/dev-flip.js"></script></body>');
        html = html.replace('</body>', '<script src="/logo-loop.js"></script></body>');
        html = html.replace('</body>', '<script src="/hero-aurora-bars.js"></script></body>');
      }
      if (processArticle) {
        const processMarkup = JSON.stringify(processArticleMarkup);
        html = html.replace('</body>', `<script>(()=>{const markup=${processMarkup};const mount=()=>{const pagination=document.querySelector('article[data-framer-name="Article"] [data-framer-name="Pagination"]');if(pagination&&!document.querySelector('.ratio-process'))pagination.insertAdjacentHTML('beforebegin',markup)};new MutationObserver(mount).observe(document.documentElement,{childList:true,subtree:true});mount()})()</script><script src="/process-article.js"></script></body>`);
      }
      html = html.replace('</body>', '<script src="/scroll-motion.js"></script></body>');
      html = html.replace('</body>', `<script>${dispatchRuntime()}</script></body>`);
      html = html.replace('</body>', '<script src="/ratio-runtime.js" data-asset-base="/_assets" data-contact="/contact"></script></body>');
      html = injectStaggeredMenu(html, menuOptions(home ? '/' : url.pathname.replace(/\/$/, '')));
      data = Buffer.from(html);
    }
    const headers = { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': production && path.extname(file) !== '.html' ? 'public, max-age=86400' : 'no-cache', 'Accept-Ranges': 'bytes' };
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
    await send(req, res, data, headers, file);
  } catch { res.writeHead(404); res.end('Not found'); }
}
export default requestHandler;
if (process.env.LYMAN_SERVERLESS !== '1') {
  http.createServer(requestHandler).listen(Number(process.env.PORT || 3000), process.env.HOST || (production ? '0.0.0.0' : '127.0.0.1'), () => console.log('Lyman Studio preview: http://localhost:' + (process.env.PORT || 3000)));
}
