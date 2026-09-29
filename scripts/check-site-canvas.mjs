import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const { routes } = JSON.parse(await readFile(new URL('../mirror-manifest.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ headless: true });
const paper = 'rgb(243, 240, 233)';
try {
  for (const route of routes) {
    const output = route === '/' ? 'index.html' : `preview${route}/index.html`;
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(new URL(`../${output}`, import.meta.url).href, { waitUntil: 'load' });
    const state = await page.evaluate(() => {
      const color = selector => {
        const element = document.querySelector(selector);
        return element ? getComputedStyle(element).backgroundColor : null;
      };
      return {
        route: document.documentElement.dataset.ratioRoute,
        body: color('body'),
        page: color('#main .framer-JN024'),
        footer: color('.ratio-footer'),
        intro: color('section[data-framer-name="Intro"]'),
        devs: color('.meet-devs'),
        faq: color('.ratio-faq'),
        about: color('section[data-framer-name="Section"]'),
        contact: color('#main [data-framer-name="Form"]'),
      };
    });
    assert.equal(state.route, route);
    for (const [name, color] of Object.entries(state)) {
      if (name === 'footer') assert.equal(color, 'rgb(16, 16, 16)', `${route}: footer`);
      else if (name !== 'route' && color !== null) assert.equal(color, paper, `${route}: ${name}`);
    }
    await page.close();
  }
  console.log(`Verified the cream canvas across ${routes.length} routes.`);
} finally {
  await browser.close();
}
