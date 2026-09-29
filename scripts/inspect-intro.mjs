import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.argv[2] || 1440);
const url = process.argv[3] || 'file:///C:/Users/ADMIN/bungee-clone/index.html';
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: url.startsWith('http') ? 'domcontentloaded' : 'load' });
if (url.startsWith('http')) await page.waitForTimeout(2000);
await page.evaluate(() => document.fonts.ready);
const intro = page.locator('[data-framer-name="Intro"]');
await intro.scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
const details = await intro.evaluate(section => {
  const heading = section.querySelector('h3');
  const word = heading.querySelector('span');
  const h = getComputedStyle(heading);
  const ancestors = [];
  for (let node = heading; node && node !== document.body; node = node.parentElement) {
    const r = node.getBoundingClientRect();
    const s = getComputedStyle(node);
    ancestors.push({ tag: node.tagName, className: node.className, name: node.getAttribute('data-framer-name'), x: r.x, width: r.width, height: r.height, maxWidth: s.maxWidth, padding: s.padding, display: s.display });
    if (node === section) break;
  }
  return {
    text: heading.innerText,
    font: h.fontFamily,
    size: h.fontSize,
    weight: h.fontWeight,
    lineHeight: h.lineHeight,
    letterSpacing: h.letterSpacing,
    color: h.color,
    wordColor: getComputedStyle(word).color,
    emphasizedColor: getComputedStyle(heading.querySelector('span:nth-of-type(8)')).color,
    background: getComputedStyle(section).backgroundColor,
    overflow: document.documentElement.scrollWidth > innerWidth,
    rect: heading.getBoundingClientRect().toJSON(),
    ancestors,
  };
});
console.log(JSON.stringify(details));
await intro.screenshot({ path: `qa/intro-${url.startsWith('http') ? 'served-' : ''}${width}.png` });
await browser.close();
