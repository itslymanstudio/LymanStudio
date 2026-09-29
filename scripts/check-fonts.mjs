import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('qa/fonts', { recursive: true });
const browser = await chromium.launch({ headless: true });
const cases = [
  ['static-home', 'file:///C:/Users/ADMIN/bungee-clone/index.html', 1440],
  ['static-mobile', 'file:///C:/Users/ADMIN/bungee-clone/index.html', 390],
  ['static-about', 'file:///C:/Users/ADMIN/bungee-clone/preview/about/index.html', 1440],
  ['served-home', 'http://localhost:3001/', 1440],
  ['served-about', 'http://localhost:3001/about', 1440],
];
for (const [label, url, width] of cases) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url, { waitUntil: label.startsWith('served') ? 'domcontentloaded' : 'load' });
  await page.waitForTimeout(label.startsWith('served') ? 2400 : 400);
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => {
    const family = selector => {
      const node = document.querySelector(selector);
      return node ? getComputedStyle(node).fontFamily : null;
    };
    return {
      loaded: document.fonts.check('16px "Space Grotesk"'),
      body: family('body'),
      heading: family('h1, h2'),
      nav: family('[data-framer-name="NavBar"] a'),
      devs: family('.meet-devs h2'),
      overflow: document.documentElement.scrollWidth > innerWidth,
      logoLoaded: [...document.querySelectorAll('img')].filter(img => img.currentSrc.includes('ratio-wordmark.svg')).every(img => img.complete && img.naturalWidth > 0),
    };
  });
  if (label === 'static-home' || label === 'static-mobile' || label === 'served-home') await page.screenshot({ path: `qa/fonts/${label}.png` });
  console.log(JSON.stringify({ label, ...result, errors }));
  await page.close();
}
await browser.close();
