import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html');await page.waitForTimeout(1200);await page.getByRole('button',{name:'Toggle navigation'}).filter({visible:true}).first().click();await page.waitForTimeout(900);
console.log(await page.locator('[data-framer-name="Open"]').first().evaluate(e=>{const result=[];for(let p=e;p;p=p.parentElement){let s=getComputedStyle(p);result.push({tag:p.tagName,cls:p.className,name:p.dataset.framerName,rect:p.getBoundingClientRect().toJSON(),display:s.display,overflow:s.overflow,transform:s.transform,clip:s.clipPath,opacity:s.opacity,visibility:s.visibility,filter:s.filter,contain:s.contain});}return result;}));
console.log(await page.locator('[data-framer-name="Hamburger"]').first().innerHTML());
await browser.close();
