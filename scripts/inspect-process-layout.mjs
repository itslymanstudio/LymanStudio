import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(new URL('../preview/blog/inside-the-studio-our-process-for-crafting-a-standout-identity/index.html', import.meta.url).href, { waitUntil: 'load' });
    const result = await page.evaluate(() => {
      const target = document.querySelector('.ratio-process');
      return [target, target.parentElement, target.parentElement.parentElement, target.querySelector('.ratio-process__intro'), target.querySelector('.ratio-process__track')].map(element => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return { name: element.getAttribute('data-framer-name') || element.className, x: rect.x, width: rect.width, overflow: style.overflow, display: style.display, marginLeft: style.marginLeft };
      });
    });
    console.log(width, JSON.stringify(result));
    await page.close();
  }
} finally { await browser.close(); }
