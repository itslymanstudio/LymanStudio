import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(new URL('../preview/blog/inside-the-studio-our-process-for-crafting-a-standout-identity/index.html', import.meta.url).href, { waitUntil: 'load' });
  const state = await page.evaluate(() => ({
    articleText: document.querySelector('[data-framer-name="Article"]')?.innerText.slice(0, 7500),
    articleBoxes: (() => { const article = document.querySelector('[data-framer-name="Article"]'); return [article, article?.parentElement, article?.parentElement?.parentElement].filter(Boolean).map(element => { const box = element.getBoundingClientRect(); return { tag: element.tagName, name: element.getAttribute('data-framer-name'), className: element.className, x: box.x, width: box.width }; }); })(),
    sections: [...document.querySelectorAll('#main section, #main [data-framer-name="Article"], #main [data-framer-name="Pagination"]')].map(element => ({ name: element.getAttribute('data-framer-name'), tag: element.tagName.toLowerCase(), className: element.className, text: element.innerText.slice(0, 150) })),
    whatsapp: [...document.querySelectorAll('a[href]')].filter(a => /wa\.me|whatsapp/i.test(a.href)).map(a => a.href),
  }));
  console.log(JSON.stringify(state, null, 2));
  await page.close();
} finally { await browser.close(); }
