import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { serviceItems } from '../services-carousel.mjs';

export async function buildServicesCarousel() {
  await build({ entryPoints:['components/services-entry.jsx'], bundle:true, minify:true, format:'iife', jsx:'automatic', outfile:'public/services-carousel.js', define:{'process.env.NODE_ENV':'"production"'} });
  await mkdir('public/_assets/services',{recursive:true});
  const font = (await readFile('public/_assets/fonts/space-grotesk-latin-wght-normal.woff2')).toString('base64');
  const art = [
    ['#d4e883', '#172018', '<circle cx="260" cy="264" r="145" fill="none" stroke="currentColor" stroke-width="48"/><path d="M260 110v308M106 264h308" stroke="currentColor" stroke-width="16"/>', ['BRAND','IDENTITY']],
    ['#ded9ed', '#423755', '<rect x="100" y="116" width="320" height="286" rx="30" fill="none" stroke="currentColor" stroke-width="5"/><path d="M100 170h320M195 170v232" stroke="currentColor" stroke-width="5"/><rect x="220" y="207" width="155" height="88" rx="12" fill="currentColor"/><circle cx="142" cy="142" r="8" fill="currentColor"/><path d="M220 330h150m-150 28h92" stroke="currentColor" stroke-width="8"/>', ['UI / UX','DESIGN']],
    ['#bfcced', '#203764', '<rect x="80" y="132" width="360" height="244" rx="20" fill="none" stroke="currentColor" stroke-width="6"/><path d="M80 180h360" stroke="currentColor" stroke-width="6"/><path d="m210 223-45 45 45 45m100-90 45 45-45 45m-38-110-24 132" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/>', ['WEB','DEVELOPMENT']],
    ['#f0bc9b', '#653a28', '<rect x="156" y="92" width="208" height="340" rx="35" fill="none" stroke="currentColor" stroke-width="7"/><rect x="214" y="113" width="92" height="10" rx="5" fill="currentColor"/><circle cx="260" cy="242" r="57" fill="currentColor"/><path d="M190 336h140m-140 30h92" stroke="currentColor" stroke-width="9"/><path d="m239 243 16 16 31-35" fill="none" stroke="#f0bc9b" stroke-width="10"/>', ['APP','DEVELOPMENT']],
    ['#e3ded3', '#363b2e', '<path d="M124 190h272l-20 222H144z" fill="none" stroke="currentColor" stroke-width="7"/><path d="M196 208v-61a64 64 0 0 1 128 0v61" fill="none" stroke="currentColor" stroke-width="12"/><path d="m220 286 30 30 57-65" fill="none" stroke="currentColor" stroke-width="18"/>', ['E—','COMMERCE']],
    ['#cbdcc7', '#2d4837', '<path d="M104 397h320M124 355V266m85 89V220m86 135V167m85 188V108" stroke="currentColor" stroke-width="38"/><path d="m118 219 92-64 78-4 105-70" fill="none" stroke="currentColor" stroke-width="7"/>', ['SEO &','PERFORMANCE']],
    ['#e9aaa0', '#602f32', '<rect x="94" y="103" width="228" height="262" rx="23" fill="none" stroke="currentColor" stroke-width="6"/><rect x="195" y="207" width="228" height="200" rx="23" fill="currentColor"/><path d="m248 293 42-39 77 71" fill="none" stroke="#e9aaa0" stroke-width="8"/><circle cx="283" cy="266" r="17" fill="#e9aaa0"/><path d="M133 149h142m-142 30h94" stroke="currentColor" stroke-width="9"/>', ['SOCIAL','DESIGN']],
    ['#343b37', '#d4e883', '<path d="M156 306a67 67 0 0 1-5-134 109 109 0 0 1 216-4 72 72 0 0 1 1 143" fill="none" stroke="currentColor" stroke-width="8"/><path d="M260 394V234m-49 48 49-48 49 48" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round"/>', ['DEPLOY','& SUPPORT']],
  ];
  await Promise.all(serviceItems.map(async (item,index) => {
    const [background,ink,geometry,lines] = art[index];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="640" viewBox="0 0 520 640" role="img" aria-label="${item.title.replaceAll('&','&amp;')}"><style>@font-face{font-family:ServiceGrotesk;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:300 700}text{font-family:ServiceGrotesk,sans-serif}</style><rect width="520" height="640" fill="${background}"/><g color="${ink}">${geometry}</g><g fill="${ink}"><text x="38" y="48" font-size="16" letter-spacing="1">LYMAN STUDIO / ${String(index+1).padStart(2,'0')}</text><text x="34" y="524" font-size="45" font-weight="600" letter-spacing="-2">${lines[0].replaceAll('&','&amp;')}</text><text x="34" y="578" font-size="45" font-weight="600" letter-spacing="-2">${lines[1].replaceAll('&','&amp;')}</text></g></svg>`;
    await writeFile(`public/_assets/services/${item.slug}.svg`,svg);
  }));
}

if (process.argv[1]?.replaceAll('\\','/').endsWith('/build-services-carousel.mjs')) await buildServicesCarousel();
