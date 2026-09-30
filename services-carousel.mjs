export const serviceItems = [
  { slug: 'brand-identity', title: 'Brand identity', category: 'Strategy & identity', description: 'Distinctive logos, visual systems, and guidelines that give your business a recognizable voice.' },
  { slug: 'ui-ux-design', title: 'UI / UX design', category: 'Digital experiences', description: 'Clear user journeys and thoughtful interfaces, shaped around the people who use your product.' },
  { slug: 'website-development', title: 'Website development', category: 'Design to development', description: 'Fast, responsive websites built to tell your story and turn interest into enquiries.' },
  { slug: 'app-development', title: 'App development', category: 'Web & mobile products', description: 'Useful apps with considered interfaces and dependable foundations, from first prototype to launch.' },
  { slug: 'ecommerce', title: 'E-commerce', category: 'Stores that work', description: 'Online shops that make browsing, buying, and managing your products feel straightforward.' },
  { slug: 'seo-performance', title: 'SEO & performance', category: 'Findability & speed', description: 'Technical SEO, accessible layouts, and performance improvements that help your site reach more people.' },
  { slug: 'social-design', title: 'Social media design', category: 'Consistent brand presence', description: 'Branded templates, campaign graphics, and content systems that keep your channels looking consistent.' },
  { slug: 'deployment-support', title: 'Deployment & support', category: 'Launch & beyond', description: 'Deployment, updates, and ongoing care to keep your website or app running smoothly after launch.' },
];

export function servicesCarouselMarkup(assetBase = '/_assets') {
  return `<section class="ratio-services" id="services" aria-labelledby="ratio-services-title">
    <div class="ratio-services__header"><div><p class="ratio-services__eyebrow">( WHAT WE DO )</p><h2 id="ratio-services-title">Services.</h2></div><a href="#ratio-contact-form-title">Get in touch <span aria-hidden="true">↗</span></a></div>
    <div data-services-carousel data-asset-base="${assetBase}"><ul class="ratio-services__fallback">${serviceItems.map(item => `<li><h3>${item.title}</h3><p>${item.description}</p></li>`).join('')}</ul></div>
  </section>`;
}

export const servicesCarouselStyles = `
  html[data-ratio-route="/"] .framer-jx0221[data-framer-name="Main"] { display: none !important; }
  .ratio-services, .ratio-services * { box-sizing: border-box; }
  .ratio-services { width:100%; background:#f3f0e9; color:#101010; padding:90px 3.05vw 76px; overflow:hidden; }
  .ratio-services__header { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; }
  .ratio-services__eyebrow { margin:0 0 28px; color:#8e8b84; font:400 11px/1.2 var(--font-mono) !important; letter-spacing:.02em !important; }
  .ratio-services h2 { margin:0; font:600 clamp(48px,5.25vw,80px)/.94 var(--font-main) !important; letter-spacing:-.075em !important; }
  .ratio-services__header>a { color:inherit; text-decoration:none; font:400 13px/1.2 var(--font-main) !important; padding:10px 0; }
  .ratio-services__header>a:hover { color:#8e8b84; }
  .ratio-services__header>a span { margin-left:18px; }
  .ratio-services__stage { height:480px; margin:30px -2vw 0; }
  .ratio-services .circular-carousel { color:#101010; }
  .ratio-services__detail { display:flex; justify-content:space-between; gap:30px; align-items:flex-start; padding-top:20px; }
  .ratio-services__selection { max-width:650px; min-height:122px; }
  .ratio-services__category { margin:0 0 12px; color:#8e8b84; font:400 10px/1.3 var(--font-mono) !important; text-transform:uppercase; letter-spacing:.025em !important; }
  .ratio-services__selection h3 { margin:0 0 16px; font:500 clamp(36px,4vw,60px)/1.03 var(--font-main) !important; letter-spacing:-.055em !important; }
  .ratio-services__description { margin:0; max-width:590px; font:400 16px/1.55 var(--font-main) !important; letter-spacing:-.02em !important; color:#67655f; }
  .ratio-services__hint { margin:2px 0 0; text-align:right; color:#8e8b84; font:400 10px/1.65 var(--font-mono) !important; letter-spacing:.02em !important; white-space:nowrap; text-transform:uppercase; }
  .ratio-services__picker { display:flex; flex-wrap:wrap; gap:10px 24px; margin:28px 0 0; padding:0; list-style:none; }
  .ratio-services__picker button { appearance:none; background:none; border:0; border-bottom:1px solid transparent; padding:7px 0; color:#8e8b84; cursor:pointer; font:400 clamp(16px,1.4vw,20px)/1.3 var(--font-main) !important; letter-spacing:-.02em !important; transition:color .2s,border-color .2s; }
  .ratio-services__picker button[aria-pressed="true"] { color:#101010; border-color:#101010; }
  .ratio-services__picker button:hover { color:#101010; }
  .ratio-services__picker button:focus-visible { outline:2px solid #8e8b84; outline-offset:5px; }
  .ratio-services__fallback { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:28px; padding:50px 0 0; list-style:none; }
  .ratio-services__fallback h3 { font:500 24px/1.1 var(--font-main) !important; }
  .ratio-services__fallback p { font:400 15px/1.5 var(--font-main) !important; }
  @media(max-width:809px) {
    .ratio-services { padding:70px 20px 55px; }
    .ratio-services__eyebrow { margin-bottom:22px; }
    .ratio-services__stage { height:330px; margin:16px -20px 0; }
    .ratio-services__detail { gap:20px; flex-direction:column; padding-top:20px; }
    .ratio-services__selection { min-height:145px; }
    .ratio-services__description { font-size:15px !important; }
    .ratio-services__hint { text-align:left; white-space:normal; }
    .ratio-services__picker { gap:6px 20px; margin-top:20px; }
    .ratio-services__fallback { grid-template-columns:repeat(2,minmax(0,1fr)); }
  }
`;

export function injectServicesCarousel(html, assetBase) {
  const marker = html.indexOf('class="framer-jx0221"');
  if (marker < 0) throw new Error('Homepage services section not found');
  const start = html.lastIndexOf('<section', marker);
  const tags = /<\/?section\b[^>]*>/gi;
  tags.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tags.exec(html))) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (!depth) return html.slice(0,start) + servicesCarouselMarkup(assetBase) + html.slice(tags.lastIndex);
  }
  throw new Error('Homepage services closing tag not found');
}
