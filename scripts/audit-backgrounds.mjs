import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  for (const route of ['index.html', 'preview/about/index.html', 'preview/projects/index.html', 'preview/contact/index.html']) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(new URL(`../${route}`, import.meta.url).href, { waitUntil: 'load' });
    const rows = await page.evaluate(() => [...document.querySelectorAll('body *')]
      .filter(el => { const r = el.getBoundingClientRect(); return r.width * r.height > 100000 && r.height > 100; })
      .map(el => ({ tag: el.tagName.toLowerCase(), name: el.getAttribute('data-framer-name') || el.className?.split?.(' ')[0] || '', background: getComputedStyle(el).backgroundColor }))
      .filter(row => row.background !== 'rgba(0, 0, 0, 0)').slice(0, 60));
    console.log(route, JSON.stringify(rows));
    await page.close();
  }
} finally {
  await browser.close();
}
