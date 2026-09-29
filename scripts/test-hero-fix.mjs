import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
for (const width of [390, 809, 883, 1199, 1200, 1280, 1440, 1920]) {
  for (const height of [700, 900, 1080]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html', { waitUntil: 'load' });
    const result = await page.evaluate(() => {
      const hero = document.querySelector('header[data-framer-name="Header"]');
      const carousel = hero.querySelector('[data-framer-name="Carousel"]');
      const intro = document.querySelector('section[data-framer-name="Intro"]');
      const style = getComputedStyle(hero);
      return { heroEnd: Math.round(hero.getBoundingClientRect().bottom), carouselEnd: Math.round(carousel.getBoundingClientRect().bottom), introStart: Math.round(intro.getBoundingClientRect().top), heroHeightStyle: style.height, heroMinHeightStyle: style.minHeight, heroPadding: style.padding, carouselStart: Math.round(carousel.getBoundingClientRect().top) };
    });
    console.log(JSON.stringify({ width, height, ...result, covered: result.carouselEnd > result.introStart }));
    await page.close();
  }
}
await browser.close();
