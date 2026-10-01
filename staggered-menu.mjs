import { showProjects } from './site-features.mjs';

const socialItems = [
  { label: 'GitHub', href: 'https://github.com/SujayYadav776' },
  { label: 'WhatsApp', href: 'https://wa.me/917370969624' },
  { label: 'Email', href: 'mailto:xeo776@gmail.com' },
];

export const staggeredMenuStyles = `
  #main [data-framer-name="NavBar"], .ratio-legal__nav, .ratio-article-nav { display: none !important; }
  .ratio-legal__main { padding-top: clamp(150px, 13vw, 215px) !important; }
  body.sm-menu-locked { overflow: hidden !important; }
  .staggered-menu-wrapper, .staggered-menu-wrapper * { box-sizing: border-box; }
  .staggered-menu-wrapper { position: fixed; inset: 0; z-index: 20000; pointer-events: none; color: #101010; }
  .staggered-menu-header { position: absolute; inset: 0 0 auto; height: 82px; padding: 0 clamp(18px, 3vw, 52px); display: flex; justify-content: space-between; align-items: center; z-index: 5; background: rgb(243 240 233 / 68%); -webkit-backdrop-filter: blur(24px) saturate(115%); backdrop-filter: blur(24px) saturate(115%); border-bottom: 0; pointer-events: none; }
  .staggered-menu-header > * { pointer-events: auto; }
  .sm-logo { display: inline-flex; align-items: center; min-width: 0; text-decoration: none; }
  .sm-logo-text { display: block; color: #101010; font-family: var(--font-main, "Space Grotesk", sans-serif); font-size: clamp(22px, 2.2vw, 30px); font-weight: 500; letter-spacing: -.085em; line-height: 1; white-space: nowrap; }
  .sm-toggle { appearance: none; border: 0; background: transparent; color: #101010; padding: 14px 0 14px 16px; display: inline-flex; align-items: center; gap: 15px; cursor: pointer; font: 400 12px/1 var(--font-mono, "DM Mono", monospace) !important; letter-spacing: .025em; text-transform: uppercase; }
  .sm-toggle:focus-visible, .sm-logo:focus-visible, .sm-panel-item:focus-visible, .sm-socials-link:focus-visible { outline: 2px solid #101010; outline-offset: 5px; }
  .sm-toggle-textWrap { display: inline-block; height: 1em; width: 5.2ch; overflow: hidden; white-space: nowrap; }
  .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; will-change: transform; }
  .sm-toggle-line { display: block; height: 1em; line-height: 1; }
  .sm-icon { position: relative; display: block; width: 18px; height: 18px; flex: 0 0 18px; will-change: transform; }
  .sm-icon-line { position: absolute; top: 50%; left: 50%; width: 18px; height: 2px; border-radius: 2px; background: currentColor; transform: translate(-50%, -50%); }
  .sm-icon-line-v { transform: translate(-50%, -50%) rotate(90deg); }
  .sm-scrim { position: absolute; inset: 0; z-index: 1; background: rgb(0 0 0 / 8%); opacity: 0; pointer-events: none; }
  .staggered-menu-wrapper[data-open] .sm-scrim { pointer-events: auto; }
  .sm-prelayers, .staggered-menu-panel { position: absolute; inset: 0; width: 100%; height: 100%; height: 100dvh; }
  .sm-prelayers { z-index: 2; pointer-events: none; overflow: hidden; }
  .sm-prelayer { position: absolute; inset: 0; opacity: 0; will-change: transform; }
  .staggered-menu-panel { z-index: 3; top: 82px; height: calc(100dvh - 82px); background: rgb(243 240 233 / 68%); -webkit-backdrop-filter: blur(24px) saturate(115%); backdrop-filter: blur(24px) saturate(115%); padding: 36px clamp(28px, 4vw, 72px) 36px; overflow-y: auto; overscroll-behavior: contain; pointer-events: none; opacity: 0; will-change: transform; }
  .staggered-menu-wrapper[data-open] .staggered-menu-panel { pointer-events: auto; }
  .sm-panel-inner { min-height: 100%; display: flex; flex-direction: column; gap: 38px; }
  .sm-panel-list, .sm-socials-list { padding: 0; margin: 0; list-style: none; }
  .sm-panel-list { display: flex; flex-direction: column; gap: 6px; max-width: min(86vw, 1140px); }
  .sm-panel-itemWrap { overflow: hidden; }
  .sm-panel-item { position: relative; display: block; padding: 5px 54px 8px 0; color: #101010; text-decoration: none; font: 600 clamp(64px, 7vw, 104px)/.94 var(--font-main, "Space Grotesk", sans-serif) !important; letter-spacing: -.075em !important; text-transform: uppercase; transition: color .25s ease; }
  .sm-panel-item:hover, .sm-panel-item:focus-visible { color: #8e8b84; }
  .sm-panel-itemLabel { display: inline-block; transform-origin: 50% 100%; will-change: transform; }
  .sm-panel-list[data-numbering] .sm-panel-item::after { content: attr(data-index); position: absolute; top: 6px; right: 0; color: #6d871a; opacity: var(--sm-num-opacity, 0); font: 400 12px/1 var(--font-mono, "DM Mono", monospace) !important; letter-spacing: 0; }
  .sm-socials { margin-top: auto; padding-top: 30px; border-top: 1px solid #bdbbb3; }
  .sm-socials-title { margin: 0 0 16px; color: #77736c; font: 400 11px/1 var(--font-mono, "DM Mono", monospace) !important; letter-spacing: .04em; text-transform: uppercase; }
  .sm-socials-list { display: flex; flex-wrap: wrap; gap: 10px 18px; }
  .sm-socials-link { display: inline-block; color: #101010; text-decoration: none; font: 500 14px/1.2 var(--font-main, "Space Grotesk", sans-serif) !important; transition: color .25s ease, opacity .25s ease; }
  .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: .35; }
  .sm-socials-link:hover, .sm-socials-link:focus-visible { color: #8e8b84; }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    .staggered-menu-header, .staggered-menu-panel { background: rgb(243 240 233 / 96%); }
  }
  @media (prefers-reduced-transparency: reduce) {
    .staggered-menu-header, .staggered-menu-panel { background: #f3f0e9; -webkit-backdrop-filter: none; backdrop-filter: none; }
  }
  @media (max-width: 760px) {
    .staggered-menu-header { height: 72px; padding: 0 20px; }
    .sm-logo-img { width: 150px; }
    .staggered-menu-panel { top: 72px; height: calc(100dvh - 72px); padding: 40px 24px 32px; }
    .sm-panel-list { max-width: none; }
    .sm-panel-item { font-size: clamp(43px, 11vw, 68px) !important; }
    .ratio-legal__main { padding-top: 142px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sm-panel-item, .sm-socials-link { transition: none; }
  }
`;

export function staggeredMenuMarkup({ links, assetBase, currentRoute = '/' }) {
  const items = [
    { label: 'Home', ariaLabel: 'Go to the home page', href: links.homeHref, route: '/' },
    { label: 'Work', ariaLabel: 'View our projects', href: links.projectsHref, route: '/projects' },
    { label: 'About', ariaLabel: 'Learn about Lyman Studio', href: links.aboutHref, route: '/about' },
    { label: 'Blog', ariaLabel: 'Read Creative Dispatch', href: links.blogHref, route: '/blog' },
    { label: 'Contact', ariaLabel: 'Get in touch', href: links.contactHref, route: '/contact' },
  ].filter(item => showProjects || item.route !== '/projects');
  return `<div class="staggered-menu-wrapper" data-position="right" data-staggered-menu>
    <div class="sm-scrim" aria-hidden="true"></div>
    <div class="sm-prelayers" aria-hidden="true"><div class="sm-prelayer" style="background:rgb(200 255 49 / 18%)"></div><div class="sm-prelayer" style="background:rgb(243 240 233 / 55%)"></div></div>
    <header class="staggered-menu-header" aria-label="Main navigation header">
      <a class="sm-logo" href="${links.homeHref}" aria-label="Lyman Studio home"><span class="sm-logo-text">Lyman Studio</span></a>
      <button class="sm-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="staggered-menu-panel"><span class="sm-toggle-textWrap" aria-hidden="true"><span class="sm-toggle-textInner"><span class="sm-toggle-line">Menu</span></span></span><span class="sm-icon" aria-hidden="true"><span class="sm-icon-line"></span><span class="sm-icon-line sm-icon-line-v"></span></span></button>
    </header>
    <aside class="staggered-menu-panel" id="staggered-menu-panel" aria-label="Navigation menu" aria-hidden="true" inert>
      <div class="sm-panel-inner"><nav aria-label="Site pages"><ul class="sm-panel-list" role="list" data-numbering>
        ${items.map((item, index) => `<li class="sm-panel-itemWrap"><a class="sm-panel-item" href="${item.href}" aria-label="${item.ariaLabel}" data-index="${String(index + 1).padStart(2, '0')}"${currentRoute === item.route || (item.route !== '/' && currentRoute.startsWith(`${item.route}/`)) ? ' aria-current="page"' : ''}><span class="sm-panel-itemLabel">${item.label}</span></a></li>`).join('')}
      </ul></nav><div class="sm-socials" aria-label="Connect with Lyman Studio"><p class="sm-socials-title">Connect</p><ul class="sm-socials-list" role="list">${socialItems.map(item => `<li><a class="sm-socials-link" href="${item.href}"${item.href.startsWith('https://') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${item.label}</a></li>`).join('')}</ul></div></div>
    </aside>
  </div>`;
}

export function injectStaggeredMenu(html, { links, assetBase, gsapSrc, menuSrc, currentRoute = '/' }) {
  return html.replace('</head>', `<style>${staggeredMenuStyles}</style></head>`)
    .replace('</body>', `${staggeredMenuMarkup({ links, assetBase, currentRoute })}<script src="${gsapSrc}"></script><script src="${menuSrc}"></script></body>`);
}
