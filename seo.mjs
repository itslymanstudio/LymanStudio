// Site-wide SEO helpers: canonical/OG/Twitter tags, absolute share images,
// JSON-LD structured data, robots.txt and sitemap.xml. All absolute URLs are
// built from a single siteUrl so switching domains later is one config change.

export function normalizePath(path) {
  const s = String(path || '/').replace(/\/index\.html$/i, '').replace(/\/{2,}/g, '/').replace(/\/+$/, '');
  return s === '' ? '/' : s;
}

export function absoluteUrl(siteUrl, path) {
  const base = String(siteUrl).replace(/\/+$/, '');
  const np = normalizePath(path);
  return np === '/' ? base + '/' : base + np;
}

function escapeAttr(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function firstMatch(html, pattern) {
  const m = html.match(pattern);
  return m ? m[1] : '';
}

function organizationJsonLd(siteUrl) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lyman Studio',
    url: absoluteUrl(siteUrl, '/'),
    logo: absoluteUrl(siteUrl, '/_assets/lymen-symbol.svg'),
    description: 'Lyman Studio is a creative studio building distinctive brands and digital experiences.',
    address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', addressCountry: 'IN' },
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function blogPostingJsonLd(post, siteUrl, canonical) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.deck || '',
    image: absoluteUrl(siteUrl, `/_assets/blog-covers/${post.cover}-1440.webp`),
    datePublished: post.iso,
    dateModified: post.iso,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: 'Lyman Studio', url: absoluteUrl(siteUrl, '/') },
    publisher: { '@type': 'Organization', name: 'Lyman Studio', logo: { '@type': 'ImageObject', url: absoluteUrl(siteUrl, '/_assets/lymen-symbol.svg') } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function applySeo(html, { siteUrl, path, post } = {}) {
  const canonical = absoluteUrl(siteUrl, path);
  const title = firstMatch(html, /<title>([^<]*)<\/title>/i);
  const description = firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i);

  let add = '';
  add += `<link rel="canonical" href="${escapeAttr(canonical)}">`;
  add += `<meta property="og:url" content="${escapeAttr(canonical)}">`;
  add += `<meta property="og:site_name" content="Lyman Studio">`;
  add += `<meta property="og:locale" content="en_IN">`;
  if (!/property="og:type"/i.test(html)) add += `<meta property="og:type" content="${post ? 'article' : 'website'}">`;
  if (!/property="og:title"/i.test(html) && title) add += `<meta property="og:title" content="${escapeAttr(title)}">`;
  if (!/property="og:description"/i.test(html) && description) add += `<meta property="og:description" content="${escapeAttr(description)}">`;
  if (!/name="twitter:card"/i.test(html)) add += `<meta name="twitter:card" content="summary_large_image">`;
  if (!/name="twitter:title"/i.test(html) && title) add += `<meta name="twitter:title" content="${escapeAttr(title)}">`;
  if (!/name="twitter:description"/i.test(html) && description) add += `<meta name="twitter:description" content="${escapeAttr(description)}">`;
  if (post) add += blogPostingJsonLd(post, siteUrl, canonical);
  else if (normalizePath(path) === '/') add += organizationJsonLd(siteUrl);

  html = html
    .replace(/<meta\s+name="framer-search-index[^"]*"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*property="og:url"[^>]*>/gi, '')
    .replace('</head>', `${add}\n</head>`);

  // Open Graph and Twitter images must be absolute URLs for social previews.
  html = html.replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")([^"]*)(")/gi,
    (match, prefix, url, suffix) => `${prefix}${absoluteUrl(siteUrl, url)}${suffix}`);

  return html;
}

export function robotsTxt(siteUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(siteUrl, '/sitemap.xml')}\n`;
}

export function sitemapXml(siteUrl, entries) {
  const urls = entries.map(entry => {
    const loc = escapeAttr(absoluteUrl(siteUrl, entry.path));
    const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '';
    return `<url><loc>${loc}</loc>${lastmod}</url>`;
  }).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}
