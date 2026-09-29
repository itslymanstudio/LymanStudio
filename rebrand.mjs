const oldSymbol = 'hcIRUi1qFh8aGDJENXamzOak3Z8.svg';
const oldWordmark = 'MYaL4AWEDy6afpn3WmSVtWlXFjM.svg';
const description = 'Ratio Design is a creative studio building distinctive brands and digital experiences.';

export function rebrandHtml(html, { assetBase, contactHref }) {
  return html
    .replaceAll(oldSymbol, 'ratio-symbol.svg')
    .replaceAll(oldWordmark, 'ratio-wordmark.svg')
    .replace(/src="[^"]*ratio-symbol\.svg"/g, `src="${assetBase}/ratio-symbol.svg"`)
    .replace(/src="[^"]*ratio-wordmark\.svg"/g, `src="${assetBase}/ratio-wordmark.svg"`)
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*property="og:url"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="icon"[^>]*media="\(prefers-color-scheme: light\)"[^>]*>/gi, `<link rel="icon" type="image/svg+xml" href="${assetBase}/ratio-symbol.svg" media="(prefers-color-scheme: light)">`)
    .replace(/<link\b[^>]*rel="icon"[^>]*media="\(prefers-color-scheme: dark\)"[^>]*>/gi, `<link rel="icon" type="image/svg+xml" href="${assetBase}/ratio-symbol-light.svg" media="(prefers-color-scheme: dark)">`)
    .replace(/<link\b[^>]*rel="apple-touch-icon"[^>]*>/gi, '')
    .replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*(")/gi, `$1${assetBase}/ratio-social.png$2`)
    .replace(/Bungee - Creative Agency Framer Templte/g, 'Ratio Design - Creative Studio')
    .replace(/ - Knots Subscription Digital Agency Framer Template/g, ' | Ratio Design')
    .replace(/Striking, stylish, and made to stand out\. Bungee is a sleek and contemporary template crafted for creative studios, freelancers, and agencies who know that powerful work needs powerful presentation\./g, description)
    .replace(/Creative studio based in Gotham\./g, 'Creative studio based in Bangalore.')
    .replace(/mailto:hi@bunhee\.io/gi, 'mailto:xeo776@gmail.com')
    .replace(/hi@bungee\.io/gi, 'xeo776@gmail.com')
    .replace(/Bungee/g, 'Ratio Design')
    .replace(/BUNGEE/g, 'RATIO DESIGN')
    .replace(/©25 Ratio Design®/g, '©26 Ratio Design®');
}
