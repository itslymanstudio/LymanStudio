import { chromium } from 'playwright';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
const sent=[];
page.on('request',r=>{if(r.method()==='POST')sent.push(r.url());});
const results=[];
for(const route of ['/','/contact']){
 await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle'});
 await page.locator('form').first().evaluate(form=>form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
 const message=await page.locator('[data-local-message]').textContent();
 results.push({route,message});
}
await writeFile('qa/forms.json',JSON.stringify({results,sent},null,2));
console.log(JSON.stringify({results,sent}));
await browser.close();
if(sent.length)process.exitCode=1;
