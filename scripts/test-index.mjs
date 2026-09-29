import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({headless:true});
const results=[];
for(const width of [1440,390]) {
 const page=await browser.newPage({viewport:{width,height:900}});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route(/^https?:/,route=>route.abort());
 await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html');
 await page.waitForTimeout(1500);
 if(width===1440)console.log(await page.locator('[data-framer-name="NavBar"]').evaluate(e=>[e,...e.querySelectorAll('*')].slice(0,16).map(n=>({tag:n.tagName,cls:n.className,name:n.getAttribute('data-framer-name'),display:getComputedStyle(n).display,opacity:getComputedStyle(n).opacity,rect:JSON.stringify(n.getBoundingClientRect())}))));
 await page.screenshot({path:`qa/index-offline-${width}-hero.png`});
 await page.locator('[data-framer-name="Portfolio"]').scrollIntoViewIfNeeded();
 await page.waitForTimeout(500);
 await page.screenshot({path:`qa/index-offline-${width}-cards.png`});
 const images=await page.locator('img').evaluateAll(es=>({total:es.length,loaded:es.filter(e=>e.naturalWidth>0).length,broken:es.filter(e=>!e.naturalWidth).map(e=>e.src)}));
 results.push({width,errors,images});
 await page.close();
}
console.log(JSON.stringify(results));await writeFile('qa/index-offline.json',JSON.stringify(results,null,2));await browser.close();
if(results.some(r=>r.errors.length||r.images.broken.length))process.exitCode=1;
