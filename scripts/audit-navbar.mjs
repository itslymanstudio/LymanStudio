import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(new URL('../index.html', import.meta.url).href, { waitUntil: 'load' });
    const rows = await page.evaluate(() => {
      const nav = document.querySelector('[data-framer-name="NavBar"]');
      return [...nav.querySelectorAll('*'), nav]
        .map(el => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return { tag: el.tagName.toLowerCase(), name: el.getAttribute('data-framer-name') || el.className?.split?.(' ')[0] || '', x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height), background: style.backgroundColor, backdrop: style.backdropFilter };
        })
        .filter(row => row.width > 100 && row.height > 20 && row.background !== 'rgba(0, 0, 0, 0)')
        .slice(0, 30);
    });
    console.log(width, JSON.stringify(rows));
    assert.equal(rows.find(row => row.tag === 'nav')?.background, 'rgb(243, 240, 233)');
    assert.equal(rows.find(row => row.tag === 'nav')?.backdrop, 'none');
    if (width === 390) {
      await page.locator('[data-framer-name="Hamburger"]:visible').first().click();
      await page.locator('[data-framer-name="NavBar"].preview-menu-open').waitFor();
      const menuColor = await page.evaluate(() => {
        const element = [...document.body.children].find(node => node.style.zIndex === '999' && node.style.top === '72px');
        return element ? getComputedStyle(element).backgroundColor : null;
      });
      assert.equal(menuColor, 'rgb(243, 240, 233)');
    }
    if (width === 1440) await page.locator('[data-framer-name="Hamburger"]:visible').first().click();
    const menu = page.locator('[data-framer-name="Open"]:visible').first();
    const layout = await menu.evaluate(el => {
      const panel = el.getBoundingClientRect();
      const heading = el.querySelector('h2, h3');
      const titleStyle = getComputedStyle(heading);
      return { panelTop: Math.round(panel.top), panelBottom: Math.round(panel.bottom), font: titleStyle.fontFamily, transform: titleStyle.textTransform };
    });
    assert.equal(layout.panelTop, 72);
    assert.equal(layout.panelBottom, 900);
    assert.match(layout.font, /Space Grotesk/);
    assert.equal(layout.transform, 'none');
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `qa/nav-after-${width}.png` });
    await page.close();
  }
} finally { await browser.close(); }
