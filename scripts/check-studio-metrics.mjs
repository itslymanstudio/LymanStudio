import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const port = 3187;
const server = spawn(process.execPath, ['server.mjs'], { cwd: new URL('..', import.meta.url), env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
let browser;
try {
  for (let attempt = 0; attempt < 40; attempt++) {
    try { const response = await fetch(`http://127.0.0.1:${port}/`); if (response.ok) break; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  browser = await chromium.launch({ headless: true });
  for (const width of [390, 1850]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await page.locator('.ratio-studio-metrics').waitFor();
    await page.waitForTimeout(1200);
    const navColor = await page.locator('[data-framer-name="NavBar"] nav:visible').first().evaluate(el => getComputedStyle(el).backgroundColor);
    assert.equal(navColor, 'rgb(243, 240, 233)');
    assert.equal(await page.locator('.ratio-studio-metrics').count(), 1);
    assert.equal(await page.locator('.ratio-studio-metrics__value').count(), 4);
    assert.equal(await page.locator('.framer-1pp2tz1[data-framer-name="Metrics"]:visible').count(), 0);
    assert.equal(await page.locator('.ratio-studio-metrics video').count(), 0);
    await page.locator('.ratio-studio-metrics').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1750);
    assert.deepEqual(await page.locator('.ratio-studio-metrics__value').allTextContents(), ['12+', '8+', '20+', '94%']);
    const noteInside = await page.locator('.ratio-studio-metrics__note').evaluate(note => {
      const section = note.closest('.ratio-studio-metrics').getBoundingClientRect();
      const bounds = note.getBoundingClientRect();
      return bounds.bottom <= section.bottom && bounds.top >= section.top;
    });
    assert.equal(noteInside, true);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    console.log(`Live preview metrics verified at ${width}px`);
    await page.close();
  }
  const reduced = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  await reduced.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
  await reduced.locator('.ratio-studio-metrics').scrollIntoViewIfNeeded();
  await reduced.waitForFunction(() => document.querySelector('.ratio-studio-metrics__value')?.textContent === '12+');
  assert.deepEqual(await reduced.locator('.ratio-studio-metrics__value').allTextContents(), ['12+', '8+', '20+', '94%']);
  await reduced.close();
} finally {
  await browser?.close();
  server.kill();
}
