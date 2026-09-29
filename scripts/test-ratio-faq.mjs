import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
for (const [name, url, width] of [
  ['static-desktop', 'file:///C:/Users/ADMIN/bungee-clone/index.html', 917],
  ['static-mobile', 'file:///C:/Users/ADMIN/bungee-clone/index.html', 390],
  ['served-desktop', 'http://localhost:3001/', 917],
  ['served-mobile', 'http://localhost:3001/', 390],
]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(url, { waitUntil: url.startsWith('http') ? 'domcontentloaded' : 'load' });
  if (url.startsWith('http')) await page.waitForTimeout(2000);
  await page.evaluate(() => document.fonts.ready);
  const faq = page.locator('.ratio-faq');
  await faq.scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  const initial = await page.evaluate(() => ({
    count: document.querySelectorAll('.ratio-faq').length,
    oldHidden: getComputedStyle(document.querySelector('[data-framer-name="FAQ"]')).display === 'none',
    questions: [...document.querySelectorAll('.ratio-faq summary')].map(node => node.innerText.trim()),
    headingFont: getComputedStyle(document.querySelector('.ratio-faq h2')).fontFamily,
    headingSize: getComputedStyle(document.querySelector('.ratio-faq h2')).fontSize,
    questionFont: getComputedStyle(document.querySelector('.ratio-faq summary')).fontFamily,
    background: getComputedStyle(document.querySelector('.ratio-faq')).backgroundColor,
    overflow: document.documentElement.scrollWidth > innerWidth,
  }));
  await faq.screenshot({ path: `qa/faq-final-${name}.png` });
  const rows = faq.locator('details');
  await rows.nth(0).locator('summary').click();
  const firstOpen = await rows.nth(0).evaluate(node => node.open && node.innerText.includes('Bangalore-based'));
  await rows.nth(1).locator('summary').click();
  const singleOpen = await faq.locator('details[open]').count() === 1;
  const locationAnswer = await rows.nth(1).innerText();
  console.log(JSON.stringify({ name, ...initial, firstOpen, singleOpen, locationAnswer: locationAnswer.includes('Bangalore, India'), errors }));
  await page.close();
}
await browser.close();
