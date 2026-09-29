import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3007/projects');
  await page.waitForTimeout(1800);
  const info = await page.evaluate(() => {
    const section = document.querySelector('section[data-framer-name="Works"]');
    const rect = section.getBoundingClientRect();
    return { height: rect.height, top: rect.top, scrollY: scrollY, bodyHasClonify: document.body.innerText.includes('CLONIFY') };
  });
  await page.evaluate(() => {
    const section = document.querySelector('section[data-framer-name="Works"]');
    window.scrollTo(0, section.offsetTop + section.offsetHeight - 300);
  });
  await page.waitForTimeout(1000);
  const hit = await page.evaluate(() => {
    const hits = [360, 1080].map(x => {
      const node = document.elementFromPoint(x, 500);
      return [...function* () { for (let parent = node, i = 0; parent && i < 8; parent = parent.parentElement, i++) yield { tag: parent.tagName, className: parent.className, name: parent.dataset.framerName, href: parent.getAttribute('href'), text: parent.innerText?.slice(0, 60) }; }()];
    });
    return { scrollY, hits, cards: [...document.querySelectorAll('section[data-framer-name="Works"] .framer-1halgdj-container > a[href]')].map(a => a.getAttribute('href')) };
  });
  await page.screenshot({ path: 'qa/projects-bottom-viewport.png' });
  console.log(JSON.stringify({ info, hit }));
} finally { await browser.close(); }
