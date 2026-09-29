import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('qa/motion', {recursive:true});
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1440,height:900},recordVideo:{dir:'qa/motion',size:{width:1440,height:900}}});
const page=await context.newPage();
await page.goto('https://bungee.framer.website',{waitUntil:'networkidle'});
await page.waitForTimeout(2000);
const info=await page.evaluate(()=>({
 lists:[...document.querySelectorAll('ul')].map(e=>({html:e.outerHTML.slice(0,1200),parent:e.parentElement.outerHTML.slice(0,400)})),
 appearances:[...document.querySelectorAll('[data-framer-appear-id]')].slice(0,18).map(e=>({name:e.dataset.framerName,id:e.dataset.framerAppearId,style:e.getAttribute('style')})),
 faq:[...document.querySelectorAll('[data-framer-name="FAQ"]')].map(e=>e.outerHTML.slice(0,15000)),
}));
await writeFile('qa/motion/reference-dom.json',JSON.stringify(info,null,2));
await page.screenshot({path:'qa/motion/01-hero.png'});
await page.mouse.click(1392,40);await page.waitForTimeout(1000);await page.screenshot({path:'qa/motion/02-menu.png'});
await page.mouse.click(1392,40);await page.waitForTimeout(800);
for(const y of [750,1350,2000,3100,4000,4800,5800,6500,7500,8600,9200,10100]){
 await page.evaluate(y=>window.scrollTo({top:y,behavior:'smooth'}),y);await page.waitForTimeout(1100);
 if([1350,4000,5800,8600].includes(y))await page.screenshot({path:`qa/motion/scroll-${y}.png`});
}
await page.getByText('How long does a project usually take?',{exact:true}).filter({visible:true}).click();await page.waitForTimeout(900);
await page.screenshot({path:'qa/motion/03-faq.png'});
const video=page.video();await context.close();await video.saveAs('qa/motion/reference-desktop.webm');await browser.close();
console.log('Recording saved to qa/motion/reference-desktop.webm');
