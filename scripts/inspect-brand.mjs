import { chromium } from 'playwright';
import { readdir, readFile } from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html');
console.log(JSON.stringify(await page.evaluate(()=>({
  namedLogos:[...document.querySelectorAll('[data-framer-name*=Logo], [aria-label*=Bungee]')].slice(0,25).map(e=>({tag:e.tagName,name:e.getAttribute('data-framer-name'),className:e.className,html:e.outerHTML.slice(0,650),rect:{width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}})),
  topImages:[...document.querySelectorAll('header img,nav img')].slice(0,12).map(e=>({src:e.getAttribute('src'),alt:e.alt,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),
  brandImages:[...document.querySelectorAll('img')].filter(e=>/\.svg(?:$|\?)/.test(e.getAttribute('src')||'')&&e.closest('[data-framer-name="Black Icon"],[data-framer-name="White Icon"],[data-framer-name="Black Full"],[data-framer-name="White Full"]')).slice(0,24).map(e=>({name:e.closest('[data-framer-name="Black Icon"],[data-framer-name="White Icon"],[data-framer-name="Black Full"],[data-framer-name="White Full"]')?.getAttribute('data-framer-name'),src:e.getAttribute('src'),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),
})),null,2));
const routes=JSON.parse(await readFile('mirror-manifest.json','utf8')).routes;
for(const route of routes){const p=`public${route==='/'?'':route}/index.html`;const s=await readFile(p,'utf8');console.log(route,(s.match(/Bungee/gi)||[]).length,(s.match(/bungee\.framer\.website/gi)||[]).length)}
await browser.close();
