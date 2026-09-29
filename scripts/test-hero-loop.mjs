import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const browser = await chromium.launch({ headless: true });
const url = process.argv[2] || 'http://localhost:3007/';
await mkdir('qa/hero-loop', { recursive: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 950 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    await page.waitForTimeout(3500);
    const viewport = page.locator('.ratio-hero-viewport').first();
    const track = page.locator('.ratio-hero-track').first();
    await viewport.waitFor();
    await viewport.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(2500);
    const snapshot = () => track.evaluate(node => ({
      time: node._ratioHeroAnimation.currentTime,
      state: node._ratioHeroAnimation.playState,
      translate: getComputedStyle(node).translate,
      videos: [...node.querySelectorAll('video')].map(video => ({ time: video.currentTime, paused: video.paused, ready: video.readyState, error: video.error?.message })),
      count: node.children.length,
    }));
    const before = await snapshot();
    await page.waitForTimeout(400);
    const moving = await snapshot();
    console.log('Playback', JSON.stringify(moving));
    assert(moving.time > before.time + 200, 'Strip must scroll');
    assert(moving.videos.every(video => video.ready >= 2 && !video.paused && !video.error), 'Videos must decode and play');
    assert(moving.videos[0].time !== before.videos[0].time, 'Video frames must advance');
    await viewport.hover({ position: { x: 30, y: 60 } });
    await page.waitForTimeout(150);
    const paused = await snapshot();
    await page.waitForTimeout(450);
    const still = await snapshot();
    assert.equal(still.time, paused.time, 'Hover must freeze the entire strip');
    assert(still.videos.every((video, i) => video.paused && Math.abs(video.time - paused.videos[i].time) < .05), 'Hover must freeze every video');
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);
    const resumed = await snapshot();
    assert(resumed.time > still.time + 200, 'Pointer exit must resume scrolling');
    const seam = await track.evaluate(node => {
      const first = node.children[0].getBoundingClientRect();
      const copy = node.children[8].getBoundingClientRect();
      const animatedDistance = -parseFloat(node._ratioHeroAnimation.effect.getKeyframes().at(-1).translate);
      return { layoutDistance: copy.left - first.left, animatedDistance };
    });
    assert(Math.abs(seam.layoutDistance - seam.animatedDistance) < .5, 'Loop seam must align');
    await page.screenshot({ path: `qa/hero-loop/${width}.png` });
    await viewport.focus();
    await page.waitForTimeout(100);
    assert.equal((await snapshot()).state, 'paused', 'Keyboard focus must pause');
    await viewport.evaluate(node => node.blur());
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => [...document.querySelectorAll('.ratio-hero-track')].every(node => node._ratioHeroAnimation?.playState === 'paused'));
    const reduced = await snapshot();
    assert.equal(reduced.state, 'paused');
    assert(reduced.videos.every(video => video.paused));
    assert.equal(await track.evaluate(node => getComputedStyle(node).translate), 'none');
    console.log(JSON.stringify({ url, width, seam, count: moving.count, videos: moving.videos.length, hover: 'passed', resume: 'passed', focus: 'passed', reducedMotion: 'passed', errors }));
    assert.deepEqual(errors, []);
    await page.close();
  }
} finally {
  await browser.close();
}
