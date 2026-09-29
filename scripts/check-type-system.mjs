import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const routes = ['index.html', 'preview/about/index.html', 'preview/projects/index.html', 'preview/blog/index.html', 'preview/contact/index.html'];

try {
  for (const width of [390, 1440, 1850]) {
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(new URL(`../${route}`, import.meta.url).href, { waitUntil: 'load' });
      await page.evaluate(() => Promise.all([
        document.fonts.load('400 16px "Space Grotesk"'),
        document.fonts.load('400 16px "DM Mono"'),
        document.fonts.load('600 32px "Space Grotesk"'),
      ]));
      const state = await page.evaluate(() => {
        const font = selector => {
          const element = document.querySelector(selector);
          return element ? getComputedStyle(element).fontFamily : null;
        };
        const heading = [...document.querySelectorAll('h1, h2, h3, h4')].find(element => !element.closest('[data-framer-name="NavBar"]'));
        const header = document.querySelector('header[data-framer-name="Header"]');
        const carousel = header?.querySelector('[data-framer-name="Carousel"]');
        const intro = document.querySelector('section[data-framer-name="Intro"]');
        return {
          body: font('body'),
          heading: getComputedStyle(heading).fontFamily,
          headingWeight: getComputedStyle(heading).fontWeight,
          nav: font('[data-framer-name="NavBar"] a'),
          date: font('[data-framer-name="Date"]'),
          intro: font('section[data-framer-name="Intro"] h3'),
          faqLabel: font('.ratio-faq__eyebrow'),
          monoLoaded: document.fonts.check('400 16px "DM Mono"'),
          mainLoaded: document.fonts.check('600 32px "Space Grotesk"'),
          overflow: document.documentElement.scrollWidth > innerWidth,
          carouselCovered: !!(carousel && intro && carousel.getBoundingClientRect().bottom > intro.getBoundingClientRect().top + 1),
        };
      });
      console.log(JSON.stringify({ route, width, ...state }));
      assert.match(state.body, /Space Grotesk/);
      assert.match(state.heading, /Space Grotesk/);
      assert.equal(state.headingWeight, '600');
      assert.match(state.nav, /DM Mono/);
      assert.equal(state.monoLoaded, true);
      assert.equal(state.mainLoaded, true);
      assert.equal(state.carouselCovered, false);
      assert.equal(state.overflow, false);
      if (route === 'index.html') {
        assert.match(state.intro, /Space Grotesk/);
        assert.match(state.faqLabel, /DM Mono/);
        assert.equal(await page.locator('.ratio-studio-metrics').count(), 1);
        assert.equal(await page.locator('.ratio-studio-metrics__stat').count(), 4);
        assert.equal(await page.locator('.ratio-studio-metrics video:visible').count(), 0);
        assert.match(await page.locator('.ratio-studio-metrics__value').first().evaluate(el => getComputedStyle(el).fontFamily), /Space Grotesk/);
        await page.screenshot({ path: `qa/type-home-${width}.png` });
        await page.locator('section[data-framer-name="Intro"]').scrollIntoViewIfNeeded();
        await page.waitForTimeout(850);
        await page.locator('section[data-framer-name="Intro"]').screenshot({ path: `qa/type-intro-${width}.png` });
        await page.locator('.ratio-studio-metrics').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1750);
        await page.locator('.ratio-studio-metrics').screenshot({ path: `qa/type-metrics-${width}.png` });
        await page.locator('.ratio-faq').scrollIntoViewIfNeeded();
        await page.waitForTimeout(850);
        await page.locator('.ratio-faq').screenshot({ path: `qa/type-faq-${width}.png` });
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
}
