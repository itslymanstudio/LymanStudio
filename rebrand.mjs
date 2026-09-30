const oldSymbol = 'hcIRUi1qFh8aGDJENXamzOak3Z8.svg';
const oldWordmark = 'MYaL4AWEDy6afpn3WmSVtWlXFjM.svg';
const description = 'Lyman Studio is a creative studio building distinctive brands and digital experiences.';

export function rebrandHtml(html, { assetBase, contactHref }) {
  return html
    .replace(/(<a\b[^>]*data-framer-name="Black Full"[^>]*)(>)/g, '$1 aria-label="Lyman Studio home"$2')
    .replaceAll(oldSymbol, 'lymen-symbol.svg')
    .replaceAll(oldWordmark, 'lymen-wordmark.svg')
    .replace(/src="[^"]*ratio-symbol\.svg"/g, `src="${assetBase}/lymen-symbol.svg"`)
    .replace(/src="[^"]*ratio-wordmark\.svg"/g, `src="${assetBase}/lymen-wordmark.svg"`)
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*property="og:url"[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel="icon"[^>]*media="\(prefers-color-scheme: light\)"[^>]*>/gi, `<link rel="icon" type="image/svg+xml" href="${assetBase}/lymen-symbol.svg" media="(prefers-color-scheme: light)">`)
    .replace(/<link\b[^>]*rel="icon"[^>]*media="\(prefers-color-scheme: dark\)"[^>]*>/gi, `<link rel="icon" type="image/svg+xml" href="${assetBase}/lymen-symbol-light.svg" media="(prefers-color-scheme: dark)">`)
    .replace(/<link\b[^>]*rel="apple-touch-icon"[^>]*>/gi, '')
    .replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*(")/gi, `$1${assetBase}/lymen-social.png$2`)
    .replace(/Bungee - Creative Agency Framer Templte/g, 'Lyman Studio - Creative Studio')
    .replace(/ - Knots Subscription Digital Agency Framer Template/g, ' | Lyman Studio')
    .replace(/Striking, stylish, and made to stand out\. Bungee is a sleek and contemporary template crafted for creative studios, freelancers, and agencies who know that powerful work needs powerful presentation\./g, description)
    .replace(/Creative studio based in Gotham\./g, 'Creative studio based in Bangalore.')
    .replace(/mailto:hi@bunhee\.io/gi, 'mailto:xeo776@gmail.com')
    .replace(/hi@bungee\.io/gi, 'xeo776@gmail.com')
    .replace(/Bungee/g, 'Lyman Studio')
    .replace(/BUNGEE/g, 'LYMAN STUDIO')
    .replace(/©25 Lyman Studio/g, '©26 Lyman Studio')
    .replace(/Lyman Studio®/g, 'Lyman Studio');
}
