import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
const results=[];
for(const host of ['https://bungee.framer.website','http://localhost:3000']) {
 const p=await browser.newPage({viewport:{width:1440,height:900}});
 await p.goto(host,{waitUntil:'networkidle'}); await p.waitForTimeout(2000);
 results.push({host,sections:await p.locator('section').evaluateAll(es=>es.map(e=>({name:e.getAttribute('data-framer-name'),height:e.getBoundingClientRect().height,top:e.getBoundingClientRect().top}))),clock:await p.getByText(/NY/).allTextContents()});
 if(host.includes('localhost')) {
  await p.mouse.move(1392,40); await p.waitForTimeout(1500);
  await p.mouse.click(1392,40);
  await p.waitForTimeout(1200);await p.screenshot({path:'qa/local-menu.png'});
  await p.locator('[data-framer-name="NavBar"] a[href="./projects"]').filter({visible:true}).click();
  await p.waitForTimeout(1600);
  console.log('Navigation result',p.url());
  await p.screenshot({path:'qa/local-projects.png'});
 }
 await p.close();
}
console.log(JSON.stringify(results)); await writeFile('qa/layout-comparison.json',JSON.stringify(results,null,2));await browser.close();
