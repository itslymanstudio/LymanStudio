import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const previewUrl = process.env.FOOTER_URL || new URL('../index.html', import.meta.url).href;
const screenshotVariant = process.env.FOOTER_URL ? '-served' : '';
try {
  for (const width of [390, 907, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: width === 907 ? 670 : 900 } });
    await page.goto(previewUrl, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    if (process.env.FOOTER_URL) await page.waitForTimeout(800);
    const footer = page.locator('.ratio-footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    const state = await page.evaluate(() => {
      const footer = document.querySelector('.ratio-footer');
      const title = footer.querySelector('.ratio-footer__headline');
      const contact = footer.querySelector('.ratio-footer__contact');
      const pitch = footer.querySelector('.ratio-footer__pitch');
      const formColumn = footer.querySelector('.ratio-footer__form-column');
      const oldFooter = document.querySelector('#main .framer-199pwpa-container');
      const rect = node => {
        const { x, y, width, height } = node.getBoundingClientRect();
        return { x: Math.round(x), y: Math.round(y + scrollY), width: Math.round(width), height: Math.round(height) };
      };
      return {
        footer: rect(footer),
        contact: rect(contact),
        title: rect(title),
        pitch: rect(pitch),
        formColumn: rect(formColumn),
        fieldCount: footer.querySelectorAll('.ratio-footer__field').length,
        referralVisible: !!footer.querySelector('#ratio-contact-source'),
        emailRule: getComputedStyle(footer.querySelector('.ratio-footer__contact-line')).borderBottomWidth,
        emailUnderline: getComputedStyle(footer.querySelector('.ratio-footer__email')).borderBottomWidth,
        newsletterVisible: footer.innerText.includes('Join our newsletter'),
        oldFooterDisplay: getComputedStyle(oldFooter).display,
        emailHref: footer.querySelector('.ratio-footer__email').getAttribute('href'),
        background: getComputedStyle(footer).backgroundColor,
        accent: getComputedStyle(title.lastElementChild).color,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    console.log(JSON.stringify({ width, ...state }));
    assert.equal(state.oldFooterDisplay, 'none');
    assert.equal(state.emailHref, 'mailto:xeo776@gmail.com');
    assert.equal(state.background, 'rgb(16, 16, 16)');
    assert.equal(state.accent, 'rgb(200, 255, 49)');
    assert.equal(state.overflow, false);
    assert.equal(state.fieldCount, 6);
    assert.equal(state.referralVisible, false);
    assert.equal(state.emailRule, '0px');
    assert.equal(state.emailUnderline, '0px');
    assert.equal(state.newsletterVisible, false);
    if (width > 800) assert.ok(state.formColumn.x > state.pitch.x + state.pitch.width);
    else assert.ok(state.formColumn.y > state.pitch.y + state.pitch.height);
    await page.locator('.ratio-footer__contact').screenshot({ path: `qa/footer-contact-${width}${screenshotVariant}.png` });
    await page.locator('.ratio-footer').screenshot({ path: `qa/footer-full-${width}${screenshotVariant}.png` });
    await page.locator('#ratio-contact-name').fill('Test Visitor');
    await page.locator('#ratio-contact-email').fill('visitor@example.com');
    await page.locator('#ratio-contact-brief').fill('A sample website project.');
    await page.locator('.ratio-footer__form button').click();
    await assert.doesNotReject(() => page.locator('.ratio-footer__form [role="status"]').waitFor());
    await page.close();
  }
} finally {
  await browser.close();
}
