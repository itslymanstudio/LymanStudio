import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
await mkdir('qa/rebrand',{recursive:true});
const browser=await chromium.launch({headless:true});
for(const [label,url,width] of [
  ['static-home','file:///C:/Users/ADMIN/bungee-clone/index.html',1440],
  ['static-mobile','file:///C:/Users/ADMIN/bungee-clone/index.html',390],
  ['static-about','file:///C:/Users/ADMIN/bungee-clone/preview/about/index.html',1440],
  ['served-home','http://localhost:3000/',1440],
  ['served-about','http://localhost:3000/about',1440],
]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(url,{waitUntil:label.startsWith('served')?'domcontentloaded':'load'});
  await page.waitForTimeout(label.startsWith('served')?2600:700);
  const result=await page.evaluate(()=>{
    const body=document.body.innerText;
    const logos=[...document.querySelectorAll('img')].filter(i=>/ratio-(symbol|wordmark)\.svg/.test(i.currentSrc));
    return {title:document.title,oldBrand:(body.match(/Bungee/gi)||[]).length,newBrand:(body.match(/Ratio Design/gi)||[]).length,logos:logos.slice(0,5).map(i=>({src:i.currentSrc.split('/').at(-1),loaded:i.complete&&i.naturalWidth>0,width:Math.round(i.getBoundingClientRect().width)})),oldEmail:body.includes('hi@bungee.io'),contactLinks:[...document.querySelectorAll('a')].filter(a=>a.textContent.trim()==='Contact us').slice(0,2).map(a=>a.getAttribute('href')),overflow:document.documentElement.scrollWidth>innerWidth};
  });
  if(label.includes('home')||label==='static-mobile') await page.screenshot({path:`qa/rebrand/${label}.png`});
  console.log(JSON.stringify({label,...result,errors}));
  await page.close();
}
await browser.close();
