import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 700, 809, 810, 907, 1440, 1850]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(new URL('../index.html', import.meta.url).href, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const result = await page.evaluate(() => {
      const read = selector => {
        const element = [...document.querySelectorAll(selector)].find(node => node.getBoundingClientRect().width > 0);
        if (!element) return null;
        const box = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return { x: box.x, width: box.width, fontSize: style.fontSize, lineHeight: style.lineHeight, letterSpacing: style.letterSpacing, fontFamily: style.fontFamily };
      };
      return { dispatch: read('[data-framer-name="Creative dispatch"] h1'), faq: read('.ratio-faq__heading h2') };
    });
    console.log(width, JSON.stringify(result));
    await page.close();
  }
} finally { await browser.close(); }
