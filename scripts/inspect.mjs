import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('qa', { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
for (const [label, url, width] of [
  ['reference-desktop', 'https://bungee.framer.website', 1440],
  ['local-desktop', 'http://localhost:3000', 1440],
  ['reference-mobile', 'https://bungee.framer.website', 390],
  ['local-mobile', 'http://localhost:3000', 390],
]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const errors = [], failed = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => failed.push({ url: request.url(), error: request.failure()?.errorText }));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(error => errors.push(error.message));
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `qa/${label}.png` });
  const details = await page.evaluate(() => ({
    title: document.title,
    height: document.documentElement.scrollHeight,
    width: document.documentElement.scrollWidth,
    font: getComputedStyle(document.querySelector('h3') || document.body).fontFamily,
    background: getComputedStyle(document.body).backgroundColor,
    headings: [...document.querySelectorAll('h1,h2,h3')].map(e => e.textContent),
    brokenImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
    buttons: [...document.querySelectorAll('button,[role=button]')].map(e => ({text:e.textContent, label:e.getAttribute('aria-label')})),
  }));
  results.push({ label, ...details, errors, failed });
  console.log(JSON.stringify(results.at(-1)));
  await page.close();
}
await writeFile('qa/inspection.json', JSON.stringify(results, null, 2));
await browser.close();
