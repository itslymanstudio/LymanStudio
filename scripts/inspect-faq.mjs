import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.argv[2] || 917);
const url = process.argv[3] || 'file:///C:/Users/ADMIN/bungee-clone/index.html';
const variant = process.argv[4] || '';
const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: url.startsWith('http') ? 'domcontentloaded' : 'load' });
if (url.startsWith('http')) await page.waitForTimeout(2000);
await page.evaluate(() => document.fonts.ready);
if (variant === 'space') await page.addStyleTag({ content: '.ratio-faq__heading h2,.ratio-faq__heading h2 span{font-family:"Space Grotesk",sans-serif!important;letter-spacing:-.055em!important}' });
if (variant === 'inter-wide') await page.addStyleTag({ content: '.ratio-faq__heading h2{letter-spacing:0!important}' });
const faq = page.locator('.ratio-faq').first();
await faq.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
console.log(JSON.stringify(await faq.evaluate(section => {
  const info = node => {
    if (!node) return null;
    const rect = node.getBoundingClientRect(), style = getComputedStyle(node);
    return { text: node.innerText?.slice(0, 160), tag: node.tagName, className: node.className, name: node.getAttribute('data-framer-name'), x: rect.x, y: rect.y, width: rect.width, height: rect.height, font: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight, lineHeight: style.lineHeight, letterSpacing: style.letterSpacing, color: style.color, background: style.backgroundColor, padding: style.padding, gap: style.gap };
  };
  const items = [...section.querySelectorAll('details')];
  return { section: info(section), children: [...section.querySelector('.ratio-faq__inner').children].map(info), heading: info(section.querySelector('h2')), eyebrow: info(section.querySelector('.ratio-faq__eyebrow')), items: items.map(item => ({ item: info(item), question: info(item.querySelector('summary')), panel: info(item.querySelector('.ratio-faq__answer')) })), overflow: document.documentElement.scrollWidth > innerWidth };
}), null, 2));
await faq.screenshot({ path: `qa/faq-${url.startsWith('http') ? 'served-' : ''}${width}${variant ? '-' + variant : ''}.png` });
await browser.close();
