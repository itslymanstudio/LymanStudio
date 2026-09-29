import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('qa/hover', { recursive: true });
const browser = await chromium.launch({ headless: true });
for (const [label, url] of [
  ['reference', 'https://bungee.framer.website/'],
  ['local', 'file:///C:/Users/ADMIN/bungee-clone/index.html'],
]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: label === 'reference' ? 'networkidle' : 'load' });
  const portfolio = page.locator('[data-framer-name="Portfolio"]').first();
  const links = portfolio.locator('a').filter({ visible: true });
  const card = links.first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const probe = async () => card.evaluate(anchor => {
    const one = node => {
      const c = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      return { tag: node.tagName, name: node.getAttribute('data-framer-name'), className: String(node.className).slice(0, 100), inline: node.getAttribute('style')?.slice(0, 300), filter: c.filter, backdropFilter: c.backdropFilter, opacity: c.opacity, transform: c.transform, transition: c.transition, width: Math.round(rect.width), height: Math.round(rect.height) };
    };
    return [anchor, ...anchor.querySelectorAll('*')].map(one).filter(x => x.width > 80 && x.height > 50).slice(0, 35);
  });
  const before = await probe();
  await page.screenshot({ path: `qa/hover/${label}-before.png` });
  await card.hover();
  const states = [];
  for (const delay of [0, 150, 400, 900]) {
    if (delay) await page.waitForTimeout(delay === 150 ? 150 : delay === 400 ? 250 : 500);
    states.push({ time: delay, nodes: await probe() });
  }
  await page.screenshot({ path: `qa/hover/${label}-hover.png` });
  await writeFile(`qa/hover/${label}.json`, JSON.stringify({ cards: await links.count(), before, states }, null, 2));
  console.log(label, JSON.stringify({ cards: await links.count(), before, after: states.at(-1).nodes }));
  await page.close();
}
await browser.close();
