import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
const manifest = JSON.parse(await readFile('mirror-manifest.json', 'utf8'));
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const external = new Set();
await context.route('**/*', route => {
  const url = new URL(route.request().url());
  if (url.hostname === 'localhost' || ['data:', 'blob:'].includes(url.protocol)) return route.continue();
  external.add(url.href); return route.continue();
});
const page = await context.newPage();
const errors = [], badResponses = [], results = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('response', response => { if (response.status() >= 400) badResponses.push(response.url()); });
for (const route of manifest.routes) {
  await page.goto('http://localhost:3000' + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  results.push({ route, title: await page.title(), main: await page.locator('#main').count() });
}
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
console.log('INTERACTION TARGETS', await page.locator('[data-framer-name]').evaluateAll(es => es.filter(e => /menu|toggle|faq|question|nav/i.test(e.getAttribute('data-framer-name'))).map(e => ({name:e.getAttribute('data-framer-name'), tag:e.tagName, text:e.textContent.slice(0,80)})).slice(0,45)));
const question = page.getByText('How long does a project usually take?', { exact: true }).filter({ visible: true });
const beforeHeight = await page.locator('[data-framer-name="FAQ"]').evaluate(e => e.getBoundingClientRect().height);
await question.click();
await page.waitForTimeout(700);
const answer = page.getByText('Timelines depend on the scope', { exact: false }).filter({ visible: true });
const afterHeight = await page.locator('[data-framer-name="FAQ"]').evaluate(e => e.getBoundingClientRect().height);
const faqExpanded = afterHeight !== beforeHeight;
await page.screenshot({ path: 'qa/local-faq.png' });
const report = { results, errors, badResponses, external:[...external], faqExpanded };
await writeFile('qa/verification.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
await browser.close();
if (errors.length || badResponses.length || !faqExpanded) process.exitCode = 1;
