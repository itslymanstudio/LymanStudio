import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(process.argv[2] || new URL('../index.html', import.meta.url).href);
  await page.waitForTimeout(2500);
  const media = await page.locator('header[data-framer-name="Header"]').evaluate(header => {
    const carousel = header.querySelector('[data-framer-name="Carousel"]');
    return [...carousel.querySelectorAll('img, video')].map(element => ({
      tag: element.tagName.toLowerCase(),
      src: element.getAttribute('src'),
      poster: element.getAttribute('poster'),
      sources: [...element.querySelectorAll('source')].map(source => source.getAttribute('src')),
      width: Math.round(element.getBoundingClientRect().width),
      height: Math.round(element.getBoundingClientRect().height),
      loaded: element.tagName === 'IMG' ? element.complete && element.naturalWidth > 0 : null,
    }));
  });
  const motion = page.locator('[data-ratio-hero-motion]').first();
  const before = await motion.evaluate(node => getComputedStyle(node).transform);
  await page.waitForTimeout(500);
  const after = await motion.evaluate(node => getComputedStyle(node).transform);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const reduced = await motion.evaluate(node => getComputedStyle(node).animationName);
  console.log(JSON.stringify({ total: media.length, unique: [...new Map(media.map(item => [item.src || item.poster || item.sources.join(','), item])).values()], motionChanges: before !== after, reducedMotionAnimation: reduced, errors }, null, 2));
} finally {
  await browser.close();
}
