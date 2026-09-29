import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';
const font = await readFile('public/_assets/fonts/space-grotesk-latin-wght-normal.woff2');
const embeddedFont = `data:font/woff2;base64,${font.toString('base64')}`;
const symbol = await readFile('public/_assets/ratio-symbol.svg','utf8');
const wordmark = await readFile('public/_assets/ratio-wordmark.svg','utf8');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1200,height:630},deviceScaleFactor:1});
await page.setContent(`<!doctype html><html><head><style>
@font-face{font-family:SpaceGroteskBrand;src:url("${embeddedFont}") format("woff2");font-weight:300 700;font-display:swap}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#f0f2f7;color:#1e1e1e;font-family:SpaceGroteskBrand,sans-serif}.frame{height:100%;padding:54px 62px;display:flex;flex-direction:column;justify-content:space-between}.symbol{width:43px;height:62px}.wordmark{width:790px;height:auto;max-height:190px}.bottom{font-size:25px;font-weight:500;letter-spacing:-.02em}
</style></head><body><div class="frame"><div class="symbol">${symbol}</div><div class="wordmark">${wordmark}</div><div class="bottom">Independent creative studio for bold ideas.</div></div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({path:'public/_assets/ratio-social.png'});
await browser.close();
