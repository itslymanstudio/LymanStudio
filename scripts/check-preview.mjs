import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({headless:true});
const results=[];
for(const [name,url] of [['server','http://127.0.0.1:3000/index.html'],['file','file:///C:/Users/ADMIN/bungee-clone/public/index.html']]) {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 const errors=[];
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'load'});
 await page.waitForTimeout(4000);
 await page.screenshot({path:`qa/preview-${name}-hero.png`});
 await page.evaluate(()=>window.scrollTo(0,1600));
 await page.waitForTimeout(2500);
 await page.screenshot({path:`qa/preview-${name}-cards.png`});
 results.push({name,url,errors,images:await page.locator('img').evaluateAll(es=>({total:es.length,loaded:es.filter(e=>e.naturalWidth>0).length,failed:es.filter(e=>e.complete&&!e.naturalWidth).slice(0,5).map(e=>e.src)}))});
 await page.close();
}
console.log(JSON.stringify(results,null,2));await writeFile('qa/preview-diagnosis.json',JSON.stringify(results,null,2));await browser.close();
