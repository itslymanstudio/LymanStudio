// Site-wide SEO helpers: canonical/OG/Twitter tags, absolute share images,
// JSON-LD structured data, robots.txt and sitemap.xml. All absolute URLs are
// built from a single siteUrl so switching domains later is one config change.

const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION || 'qD26VlhSVQabDNDkGPOI8yqy9vuyVBkSYZ2itu_lmN8';

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

export const PAGE_META = {
  '/': {
    title: 'Lyman Studio | Brand & Website Design Studio, Bengaluru',
    description: 'Lyman Studio is a creative studio in Bengaluru. We build brand identities, websites, and digital experiences that help businesses look good and get found.',
  },
  '/about': {
    title: 'About Lyman Studio | Brand & Web Designers in Bengaluru',
    description: "We're an independent creative studio in Bengaluru. We design brand identities and websites that are distinctive, useful, and built to last.",
  },
  '/blog': {
    title: 'Creative Dispatch | Branding & Design Notes | Lyman Studio',
    description: 'Short, practical notes from Lyman Studio on brand identity, visual design, and building websites that work for small businesses.',
  },
  '/privacy': {
    title: 'Privacy Policy | Lyman Studio',
    description: 'How Lyman Studio collects, uses, and protects the information you share with us.',
  },
  '/terms': {
    title: 'Terms & Conditions | Lyman Studio',
    description: 'The terms for using the Lyman Studio website and engaging our design services.',
  },
};

export function applySeo(html, { siteUrl, path, post } = {}) {
  const np = normalizePath(path);
  const override = PAGE_META[np];
  const existingTitle = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const existingDesc = firstMatch(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const title = override?.title || existingTitle || 'Lyman Studio';
  const description = override?.description || existingDesc || '';
  const canonical = absoluteUrl(siteUrl, np);

  html = html
    .replace(/<meta\s+name="framer-search-index[^"]*"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*name="google-site-verification"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*property="og:(?:url|title|description|type)"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*name="twitter:(?:title|description|card)"[^>]*>/gi, '');
  if (override?.title) html = html.replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeAttr(override.title)}</title>`);
  if (override?.description) html = html.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${escapeAttr(override.description)}$2`);

  let add = '';
  if (GOOGLE_SITE_VERIFICATION) add += `<meta name="google-site-verification" content="${escapeAttr(GOOGLE_SITE_VERIFICATION)}">`;
  add += `<link rel="canonical" href="${escapeAttr(canonical)}">`;
  add += `<meta property="og:url" content="${escapeAttr(canonical)}">`;
  add += `<meta property="og:site_name" content="Lyman Studio">`;
  add += `<meta property="og:locale" content="en_IN">`;
  add += `<meta property="og:type" content="${post ? 'article' : 'website'}">`;
  if (title) add += `<meta property="og:title" content="${escapeAttr(title)}">`;
  if (description) add += `<meta property="og:description" content="${escapeAttr(description)}">`;
  add += `<meta name="twitter:card" content="summary_large_image">`;
  if (title) add += `<meta name="twitter:title" content="${escapeAttr(title)}">`;
  if (description) add += `<meta name="twitter:description" content="${escapeAttr(description)}">`;
  if (post) add += blogPostingJsonLd(post, siteUrl, canonical);
  else if (np === '/') add += organizationJsonLd(siteUrl);

  html = html.replace('</head>', `${add}\n</head>`);

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
