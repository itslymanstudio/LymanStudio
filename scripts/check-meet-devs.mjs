import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
await mkdir('qa/meet-devs', {recursive:true});
const browser=await chromium.launch({headless:true});
for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html');
  const section=page.locator('[data-framer-name="Meet the Devs"]');
  await section.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
  await section.screenshot({path:`qa/meet-devs/static-${width}.png`});
  const result=await page.evaluate(()=>({old:document.querySelectorAll('[data-framer-name="Testimonials"]').length,profiles:document.querySelectorAll('.meet-devs__profile').length,images:[...document.querySelectorAll('.meet-devs__image img')].map(i=>({complete:i.complete,width:i.naturalWidth})),pageWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
  console.log(JSON.stringify({width,...result,errors}));
  await page.close();
}
const served=await browser.newPage({viewport:{width:1440,height:900}});
const serverErrors=[];served.on('pageerror',error=>serverErrors.push(error.message));
await served.goto('http://localhost:3000',{waitUntil:'networkidle'});await served.waitForTimeout(2500);
console.log(JSON.stringify({served:true,old:await served.locator('[data-framer-name="Testimonials"]').count(),profiles:await served.locator('.meet-devs__profile').count(),errors:serverErrors}));
await served.locator('.meet-devs').scrollIntoViewIfNeeded();await served.waitForTimeout(900);
console.log(JSON.stringify({servedImages:await served.locator('.meet-devs__image img').evaluateAll(images=>images.map(i=>({complete:i.complete,width:i.naturalWidth,src:i.currentSrc})))}));
await served.screenshot({path:'qa/meet-devs/server-1440.png'});
await served.close();
await browser.close();
