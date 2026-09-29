import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import { processArticleRoute } from '../process-article.mjs';

const browser = await chromium.launch({ headless: true });
const staticUrl = new URL(`../preview${processArticleRoute}/index.html`, import.meta.url).href;
const expectedWhatsApp = 'https://wa.me/917370969624';
try {
  for (const width of [320, 390, 810, 1440, 1850]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(staticUrl, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const process = page.locator('.ratio-process');
    assert.equal(await process.count(), 1);
    assert.equal(await process.locator('.ratio-process__step').count(), 7);
    assert.ok(await process.evaluate(section => section.parentElement?.matches('article[data-framer-name="Article"]') && section.nextElementSibling?.matches('[data-framer-name="Pagination"]')));
    assert.equal(await process.locator('.ratio-process__primary').getAttribute('href'), '#ratio-contact-form-title');
    assert.equal(await process.locator('.ratio-process__secondary').getAttribute('href'), expectedWhatsApp);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await process.evaluate(section => window.scrollTo(0, section.getBoundingClientRect().top + scrollY - 90));
    await page.waitForTimeout(850);
    if (width === 390 || width === 1440) await page.screenshot({ path: `qa/process-top-${width}.png` });
    await process.locator('.ratio-process__cta').evaluate(cta => window.scrollTo(0, cta.getBoundingClientRect().top + scrollY - Math.max(100, (innerHeight - cta.getBoundingClientRect().height) / 2)));
    await page.waitForTimeout(850);
    if (width === 390 || width === 1440) await process.locator('.ratio-process__cta-row').screenshot({ path: `qa/process-cta-${width}.png` });
    await process.locator('.ratio-process__primary').click();
    assert.equal(await page.evaluate(() => location.hash), '#ratio-contact-form-title');
    await page.close();
  }

  const reduced = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
  await reduced.goto(staticUrl, { waitUntil: 'load' });
  assert.equal(await reduced.locator('.ratio-process__step').first().evaluate(el => getComputedStyle(el).opacity), '1');
  await reduced.close();

  const port = 3191;
  const server = spawn(process.execPath, ['server.mjs'], { cwd: new URL('..', import.meta.url), env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
  try {
    for (let attempt = 0; attempt < 40; attempt++) {
      try { const response = await fetch(`http://127.0.0.1:${port}${processArticleRoute}`); if (response.ok) break; } catch {}
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`http://127.0.0.1:${port}${processArticleRoute}`, { waitUntil: 'domcontentloaded' });
    await page.locator('.ratio-process').waitFor();
    await page.waitForTimeout(1200);
    assert.equal(await page.locator('.ratio-process').count(), 1);
    assert.equal(await page.locator('.ratio-process__step').count(), 7);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.locator('.ratio-process__primary').click();
    assert.equal(await page.evaluate(() => location.hash), '#ratio-contact-form-title');
    await page.close();
  } finally { server.kill(); }
  console.log('Timeline, connected CTA, links, responsiveness, and live preview verified.');
} finally { await browser.close(); }
