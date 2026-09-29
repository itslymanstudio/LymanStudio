import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
for (const width of [1440, 883, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const info = await page.evaluate(() => {
    const describe = node => {
      if (!node) return null;
      const r = node.getBoundingClientRect(), s = getComputedStyle(node);
      return { cls: node.className, name: node.getAttribute('data-framer-name'), x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom + scrollY), overflow: s.overflow, overflowY: s.overflowY, position: s.position, background: s.backgroundColor };
    };
    const carousel = document.querySelector('[data-framer-name="Carousel"]');
    const list = carousel?.querySelector('ul');
    const item = list?.querySelector('li');
    const image = item?.querySelector('img');
    return { header: describe(document.querySelector('header')), carousel: describe(carousel), carouselParent: describe(carousel?.parentElement), list: describe(list), item: describe(item), image: describe(image), intro: describe(document.querySelector('section[data-framer-name="Intro"]')), introParent: describe(document.querySelector('section[data-framer-name="Intro"]')?.parentElement), overflow: document.documentElement.scrollWidth > innerWidth };
  });
  console.log(JSON.stringify({ width, ...info }));
  await page.screenshot({ path: `qa/hero-crop-${width}.png` });
  await page.evaluate(() => window.scrollTo(0, Math.max(0, document.querySelector('section[data-framer-name="Intro"]').offsetTop - 550)));
  await page.waitForTimeout(250);
  await page.screenshot({ path: `qa/hero-boundary-${width}.png` });
  await page.close();
}
await browser.close();
