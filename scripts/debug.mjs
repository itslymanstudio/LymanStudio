import { chromium } from 'playwright';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900}});
page.on('console', m=> console.log('CONSOLE',m.type(),m.text()));
page.on('pageerror', e=>console.log('ERROR',e.message));
await page.goto('http://localhost:3000');
await page.waitForTimeout(12000);
console.log(await page.evaluate(()=>({mounted:window.MotionIsMounted, main:document.querySelector('#main').outerHTML.slice(0,600),scripts:[...document.scripts].filter(e=>e.src).map(e=>e.src), hidden:[...document.querySelectorAll('[style]')].filter(e=>getComputedStyle(e).opacity==='0').slice(0,10).map(e=>e.outerHTML.slice(0,500)),requests:performance.getEntriesByType('resource').filter(e=>e.name.includes('.mjs')).map(e=>e.name)})));
await browser.close();
