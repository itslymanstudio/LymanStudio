import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const width = Number(process.argv[2] || 1440);
await mkdir('qa/navigation', { recursive: true });
try {
  const targets = [['reference', 'https://bungee.framer.website/'], ['ratio', 'http://localhost:3007/'], ['static', new URL('../index.html', import.meta.url).href]];
  for (const [name, url] of targets.filter(([name]) => !process.argv[3] || name === process.argv[3])) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2500);
      const report = async () => page.evaluate(() => {
        const bar = document.querySelector('#main [data-framer-name="NavBar"]');
        const nav = [...(bar?.querySelectorAll('nav') || [])].find(node => node.getBoundingClientRect().width > 0);
        const open = nav?.querySelector('[data-framer-name="Open"]');
        const hamburger = nav?.querySelector('[data-framer-name="Hamburger"]');
        const details = node => {
          if (!node) return null;
          const css = getComputedStyle(node), rect = node.getBoundingClientRect();
          return { tag: node.tagName, className: node.className, display: css.display, position: css.position,
            background: css.backgroundColor, backdrop: css.backdropFilter, webkitBackdrop: css.webkitBackdropFilter,
            filter: css.filter, opacity: css.opacity, transform: css.transform, zIndex: css.zIndex,
            height: rect.height, top: rect.top, width: rect.width, padding: css.padding, overflow: css.overflow, pointerEvents: css.pointerEvents };
        };
        return { wrapper: details(bar), nav: details(nav), open: details(open), hamburger: details(hamburger),
          links: [...(open?.querySelectorAll('a') || [])].slice(0, 5).map(a => ({ text: a.innerText, ...details(a) })),
          bottomText: [...(open?.querySelector('[data-framer-name="Bottom"]')?.querySelectorAll('p,h1,h2,h3,h4') || [])].map(node => ({ text: node.innerText, href: node.closest('a')?.getAttribute('href'), size: getComputedStyle(node).fontSize, tag: node.tagName, className: node.className })),
          openChildren: [...(open?.children || [])].map(child => ({ name: child.dataset.framerName, ...details(child) })) };
      });
      console.log(name, width, 'closed', JSON.stringify(await report()));
      await page.screenshot({ path: `qa/navigation/${name}-${width}-closed.png` });
      await page.locator('#main [data-framer-name="NavBar"] [data-framer-name="Hamburger"]:visible').first().click();
      await page.waitForTimeout(900);
      console.log(name, width, 'open', JSON.stringify(await report()));
      await page.screenshot({ path: `qa/navigation/${name}-${width}-open.png` });
      await page.locator('#main [data-framer-name="NavBar"] [data-framer-name="Hamburger"]:visible').first().click();
      await page.waitForTimeout(2000);
      const closedAgain = await report();
      console.log(name, width, 'closedAgain', JSON.stringify({ navHeight: closedAgain.nav?.height, openTop: closedAgain.open?.top, openDisplay: closedAgain.open?.display,
        expanded: await page.locator('#main [data-framer-name="NavBar"] [data-framer-name="Hamburger"]:visible').first().getAttribute('aria-expanded') }));
    } catch (error) {
      console.log(name, 'error', error.message);
    } finally { await page.close(); }
  }
} finally { await browser.close(); }
