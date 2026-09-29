import { chromium } from 'playwright';
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1440,height:900}});
await page.goto('file:///C:/Users/ADMIN/bungee-clone/index.html');
const info = await page.evaluate(() => {
  const nodes = [...document.querySelectorAll('[data-framer-name],section')]
    .filter(e => /testimonial|client|review/i.test(e.getAttribute('data-framer-name') || '') || /testimonial/i.test(e.textContent || '') && e.textContent.length < 150);
  return nodes.slice(0,25).map(e => ({tag:e.tagName,name:e.getAttribute('data-framer-name'),className:e.className,text:e.textContent.trim().slice(0,350),parent:e.parentElement?.outerHTML.slice(0,500),rect:{y:e.getBoundingClientRect().y,height:e.getBoundingClientRect().height}}));
});
console.log(JSON.stringify(info,null,2));
await browser.close();
