import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { meetDevsStyles, replaceTestimonials } from '../meet-devs.mjs';
import { rebrandHtml } from '../rebrand.mjs';
import { spaceGroteskStyles } from '../typography.mjs';
import { introReferenceStyles } from '../intro-reference.mjs';
import { faqStyles, injectFaqMarkup } from '../faq-section.mjs';
import { closingFooterMarkup, closingFooterStyles } from '../closing-footer.mjs';
import { studioMetricsStyles, replaceMetricsSection } from '../studio-metrics.mjs';
import { siteCanvasStyles } from '../site-canvas.mjs';
import { processArticleRoute, processArticleStyles, injectProcessArticle } from '../process-article.mjs';
import { logoLoopStyles } from '../logo-loop.mjs';
import { heroEffectsStyles } from '../hero-effects.mjs';
import { heroMediaStyles, heroMediaRuntime, replaceHeroMedia } from '../hero-media.mjs';
import { navigationStyles } from '../navigation.mjs';
import { renderLegalPage } from '../legal-pages.mjs';
const manifest = JSON.parse(await readFile('mirror-manifest.json', 'utf8'));
await mkdir('public/_assets/tech-logos', { recursive: true });
for (const icon of ['react', 'nextdotjs', 'typescript', 'tailwindcss']) {
  await copyFile(`node_modules/simple-icons/icons/${icon}.svg`, `public/_assets/tech-logos/${icon}.svg`);
}
const routeFile = route => route === '/' ? 'index.html' : `preview${route}/index.html`;
const excludedProjects = new Set(['/projects/zypher', '/projects/grotesks', '/projects/clonify', '/projects/polltree']);
for (const route of manifest.routes) {
  const output = routeFile(route);
  const directory = path.dirname(output);
  const relative = target => path.relative(directory, target).replaceAll('\\', '/') || './';
  if (excludedProjects.has(route)) {
    const projectsHref = relative(routeFile('/projects'));
    await mkdir(directory, { recursive: true });
    await writeFile(output, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${projectsHref}"><title>Projects | Ratio Design</title></head><body><a href="${projectsHref}">View projects</a></body></html>`);
    continue;
  }
  let html = await readFile(path.join('public', route, 'index.html'), 'utf8');
  // A file:// document cannot import the published ES modules. This visual
  // fallback keeps the original server-rendered content and local media.
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="(?:modulepreload|preconnect|dns-prefetch)"[^>]*>/gi, '')
    .replaceAll('/_assets/', relative('public/_assets') + '/');
  if (route === '/') html = replaceTestimonials(html, relative('public/_assets/devs'));
  html = html.replace(/href="(\.\/[^"#?]*|\/[^"#?]*)"/g, (all, raw) => {
    const targetRoute = new URL(raw, 'https://bungee.framer.website' + route).pathname.replace(/\/$/, '') || '/';
    return manifest.routes.includes(targetRoute) ? `href="${relative(routeFile(targetRoute))}"` : all;
  });
  html = rebrandHtml(html, { assetBase: relative('public/_assets'), contactHref: relative(routeFile('/contact')) });
  html = html.replace(/<html\b/i, `<html data-ratio-route="${route}"`);
  if (route === '/') html = replaceMetricsSection(html);
  if (route === '/') html = replaceHeroMedia(html, relative('public/_assets'));
  if (route === '/') html = injectFaqMarkup(html);
  if (route === processArticleRoute) html = injectProcessArticle(html);
  html = html.replace(/<([a-z][\w-]*)([^>]*?)style="([^"]*)"([^>]*)>/gi, (tag, name, before, style, after) => {
    if (!/opacity:\s*0(?:\.001)?(?:;|$)/.test(style)) return tag;
    const y = style.match(/translateY\((-?[\d.]+)px\)/)?.[1];
    const reveal = y !== undefined || /data-framer-appear-id/.test(tag);
    const next = style.replace(/opacity:\s*0(?:\.001)?(?=;|$)/g, 'opacity:1');
    return `<${name}${before}style="${reveal ? next.replace(/transform:[^;]+/, 'transform:none') : next}"${after}${reveal ? ` data-preview-reveal="${y || 24}"` : ''}>`;
  });
  const styles = `<style data-static-preview>
    ${spaceGroteskStyles(relative('public/_assets'))}
    ${route === '/' ? introReferenceStyles : ''}
    ${route === '/' ? studioMetricsStyles : ''}
    ${route === '/' ? faqStyles : ''}
    ${route === '/' ? meetDevsStyles : ''}
    ${route === '/' ? logoLoopStyles : ''}
    ${route === '/' ? heroEffectsStyles : ''}
    ${route === '/' ? heroMediaStyles : ''}
    ${route === processArticleRoute ? processArticleStyles : ''}
    ${closingFooterStyles}
    ${siteCanvasStyles}
    ${navigationStyles}
    .framer-chdyiw-container{display:none!important}
    [data-framer-appear-id]{opacity:1;transform:none}
    [data-framer-component-type="RichTextContainer"] span{opacity:1;transform:none}
    #main [style*="blur("]{filter:none!important}
    [data-framer-name="NavBar"]{position:fixed!important;top:0!important;left:0!important;transform:none!important;width:100%!important;z-index:1000!important}
    [data-framer-name="NavBar"] [style*="transform"]{transform:none}
    #main [data-framer-name="NavBar"].preview-menu-open nav{height:auto!important;overflow:hidden!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important}
    #main [data-framer-name="NavBar"].preview-menu-open nav > [data-framer-name="Menu"]{height:80px!important;min-height:80px!important;width:100%!important;flex:none!important;align-items:center!important}
    [data-framer-name="Portfolio"] [data-framer-name="Logo"]{opacity:0!important;transition:opacity .2s}
    [data-framer-name="Portfolio"] a:hover [data-framer-name="Logo"]{opacity:1!important}
    [data-framer-name="NavBar"] [data-framer-name="Open"]{display:none!important}
    #main [data-framer-name="NavBar"].preview-menu-open [data-framer-name="Open"]{display:flex!important;position:relative!important;inset:auto!important;height:auto!important;max-height:calc(100dvh - 80px)!important;background:transparent!important;z-index:100!important;opacity:1;transform:none!important;overflow-y:auto!important}
    @media(max-width:809.98px){#main [data-framer-name="NavBar"].preview-menu-open [data-framer-name="Open"]{padding:16px!important}}
    [data-framer-name="Portfolio"] a .framer-1n7o0vy{transition:filter .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1);transform-origin:center}
    #main [data-framer-name="Portfolio"] a:is(:hover,:focus-visible) .framer-1n7o0vy{filter:blur(4px)!important;transform:scale(1.1)}
    .framer--carousel{scroll-behavior:smooth;scrollbar-width:none;cursor:grab}
    .framer--carousel::-webkit-scrollbar{display:none}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important}}
    #preview-help{position:fixed;bottom:12px;left:12px;z-index:10000;background:#fff;color:#222;border:1px solid #ddd;border-radius:8px;padding:9px 12px;font:12px/1.5 "Space Grotesk",sans-serif;max-width:280px;box-shadow:0 2px 10px #0001}
    #preview-help a{color:inherit;text-decoration:underline}
  </style>`;
  const launcher = relative('Start Preview.cmd');
  const footer = closingFooterMarkup({
    homeHref: relative(routeFile('/')),
    projectsHref: relative(routeFile('/projects')),
    aboutHref: relative(routeFile('/about')),
    blogHref: relative(routeFile('/blog')),
    contactHref: relative(routeFile('/contact')),
    privacyHref: relative('preview/privacy/index.html'),
    termsHref: relative('preview/terms/index.html'),
  });
  html = html.replace('</head>', styles + '</head>').replace('</body>', `${footer}
    <script src="${relative('static-preview.js')}"></script>
    ${route === '/' ? heroMediaRuntime(relative('public/_assets')) : ''}
    ${route === '/' ? `<script src="${relative('public/dev-flip.js')}"></script>` : ''}
    ${route === '/' ? `<script src="${relative('public/logo-loop.js')}"></script>` : ''}
    ${route === '/' ? `<script src="${relative('public/studio-metrics.js')}"></script>` : ''}
    <script src="${relative('public/scroll-motion.js')}"></script>
    ${route === processArticleRoute ? `<script src="${relative('public/process-article.js')}"></script>` : ''}
    <script src="${relative('public/ratio-runtime.js')}" data-asset-base="${relative('public/_assets')}" data-contact="${relative(routeFile('/contact'))}"></script></body>`);
  await mkdir(directory, { recursive: true });
  await writeFile(output, html);
}
for (const kind of ['privacy', 'terms']) {
  const output = `preview/${kind}/index.html`;
  const directory = path.dirname(output);
  const relative = target => path.relative(directory, target).replaceAll('\\', '/') || './';
  const links = {
    homeHref: relative(routeFile('/')),
    projectsHref: relative(routeFile('/projects')),
    aboutHref: relative(routeFile('/about')),
    blogHref: relative(routeFile('/blog')),
    contactHref: relative(routeFile('/contact')),
    privacyHref: relative('preview/privacy/index.html'),
    termsHref: relative('preview/terms/index.html'),
  };
  await mkdir(directory, { recursive: true });
  await writeFile(output, renderLegalPage(kind, links, relative('public/_assets'), relative('public/scroll-motion.js')));
}
console.log('Built ' + (manifest.routes.length + 2 - excludedProjects.size) + ' standalone visual previews and ' + excludedProjects.size + ' project redirects.');
