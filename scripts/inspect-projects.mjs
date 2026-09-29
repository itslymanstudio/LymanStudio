import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const width = Number(process.argv[2] || 1440);
try {
  const pages = [
    ['live-home', 'http://localhost:3007/'],
    ['live-projects', 'http://localhost:3007/projects'],
    ['static-home', new URL('../index.html', import.meta.url).href],
    ['static-projects', new URL('../preview/projects/index.html', import.meta.url).href],
  ];
  for (const [name, url] of pages) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url);
    await page.waitForTimeout(2200);
    const result = await page.evaluate(() => {
      const links = [...document.querySelectorAll('[data-framer-name="Portfolio"] .framer-15je2ue-container > a[href], [data-framer-name="Works"] .framer-1halgdj-container > a[href]')];
      return links.map(link => ({ href: link.getAttribute('href'), visible: !!link.getClientRects().length }));
    });
    console.log(name, width, JSON.stringify({ visible: result.filter(item => item.visible).map(item => item.href), hidden: result.filter(item => !item.visible).map(item => item.href) }));
    if (name === 'live-projects') console.log('projectGroups', JSON.stringify(await page.evaluate(() => {
      const root = document.querySelector('section[data-framer-name="Works"] > [data-framer-name="Container"]');
      const detail = node => ({ tag: node.tagName, className: node.className, height: Math.round(node.getBoundingClientRect().height), display: getComputedStyle(node).display,
        slugs: [...node.querySelectorAll('a[href*="/projects/"]')].map(a => a.getAttribute('href').split('/').at(-1)) });
      return [...root.children].map(node => ({ ...detail(node), children: [...node.children].map(detail) }));
    })));
    if (name === 'live-projects') console.log('allWorksLinks', JSON.stringify(await page.locator('section[data-framer-name="Works"]').evaluate(root => [...root.querySelectorAll('a[href]')].map(a => ({ href: a.getAttribute('href'), text: a.innerText.slice(0, 45), visible: !!a.getClientRects().length, parent: a.parentElement?.className })))));
    if (name === 'live-projects') console.log('worksChildren', JSON.stringify(await page.locator('section[data-framer-name="Works"]').evaluate(root => [...root.children].map(node => ({ tag: node.tagName, className: node.className, name: node.dataset.framerName, height: Math.round(node.getBoundingClientRect().height), text: node.innerText.slice(-100) })))));
    if (name === 'live-projects') console.log('extraLabels', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('*')].filter(el => /CLONIFY|BLOB/i.test(el.textContent || '') && el.textContent.length < 50).slice(0, 12).map(el => ({ text: el.textContent, chain: [...function* () { for (let node = el, depth = 0; node && depth < 7; node = node.parentElement, depth++) yield `${node.tagName}.${node.className}[${node.dataset.framerName || ''}]`; }()] })))));
    const section = page.locator('[data-framer-name="Portfolio"], [data-framer-name="Works"]').first();
    if (await section.count()) {
      for (const slug of ['things', 'lunar', 'kroma', 'asterisk']) {
        const card = section.locator(`a[href*="${slug}"]`).first();
        if (await card.count()) await card.scrollIntoViewIfNeeded();
      }
      await page.waitForTimeout(600);
      await section.screenshot({ path: `qa/${name}-${width}-four-projects.png` });
    }
    await page.close();
  }
} finally { await browser.close(); }
