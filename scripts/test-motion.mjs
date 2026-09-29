import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({headless:true});const reports=[];
for(const [width,reduced] of [[1440,false],[390,false],[390,true]]){
 const label=`${width}${reduced?'-reduced':''}`;
 const context=await browser.newContext({viewport:{width,height:900},reducedMotion:reduced?'reduce':'no-preference',recordVideo:{dir:'qa/motion',size:{width,height:900}}});
 await context.route(/^https?:/,route=>route.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html');await page.waitForTimeout(1500);
 const ticker=page.locator('ul:has(> .ticker-item)').first();
 const before=await ticker.evaluate(e=>getComputedStyle(e).transform);await page.waitForTimeout(600);const after=await ticker.evaluate(e=>getComputedStyle(e).transform);
 await page.screenshot({path:`qa/motion/local-${label}-hero.png`});
 const menu=page.getByRole('button',{name:'Toggle navigation'}).filter({visible:true}).first();await menu.click();await page.waitForTimeout(1000);
 const menuOpen=await menu.getAttribute('aria-expanded')==='true';
 const menuLink=page.locator('[data-framer-name="Open"] a').filter({visible:true}).first();
 await menuLink.click({trial:true});
 await page.screenshot({path:`qa/motion/local-${label}-menu.png`});
 await page.keyboard.press('Escape');await page.waitForTimeout(450);
 const track=page.locator('.framer--carousel').filter({visible:true}).first();await track.scrollIntoViewIfNeeded();await page.waitForTimeout(900);
 if(width>800)await page.getByRole('button',{name:'Next',exact:true}).filter({visible:true}).first().click();
 else {await track.focus();await page.keyboard.press('ArrowRight');}
 await page.waitForTimeout(700);
 const carouselMoved=await track.evaluate(e=>e.scrollLeft>0);
 const question=page.getByRole('button',{name:'How long does a project usually take?'}).filter({visible:true});
 await question.scrollIntoViewIfNeeded();await page.waitForTimeout(900);await question.click();await page.waitForTimeout(600);
 const faqOpen=await question.getAttribute('aria-expanded')==='true' && await page.locator('[data-framer-name="FAQ"] [aria-expanded="true"]').filter({visible:true}).count()===1;await page.screenshot({path:`qa/motion/local-${label}-faq.png`});
 const broken=await page.locator('img').evaluateAll(es=>es.filter(e=>e.complete&&!e.naturalWidth).length);
 const running=await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length);
 reports.push({width,reduced,tickerMoves:before!==after,menuOpen,carouselMoved,faqOpen,broken,errors,running});
 console.log(JSON.stringify(reports.at(-1)));
 const video=page.video();await context.close();await video.saveAs(`qa/motion/local-${label}.webm`);
}
await browser.close();console.log(JSON.stringify(reports,null,2));await writeFile('qa/motion/checks.json',JSON.stringify(reports,null,2));
if(reports.some(r=>r.errors.length||r.broken||!r.menuOpen||!r.carouselMoved||!r.faqOpen||r.tickerMoves===r.reduced))process.exitCode=1;
