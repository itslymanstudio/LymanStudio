// Browser-native motion for the portable file:// build. No CDN or server required.
(() => {
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const ease = 'cubic-bezier(.22,1,.36,1)';
const loops = new Set();
const animate = (node, frames, options = {}) => reduced.matches ? null : node.animate(frames, { duration: 700, easing: ease, ...options });

const reveal = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting || !entry.target.getClientRects().length) continue;
    const node = entry.target, y = Number(node.dataset.previewReveal || 24);
    const isWord = node.tagName === 'SPAN';
    const index = isWord ? [...node.parentElement.children].indexOf(node) : 0;
    animate(node, [{opacity:0,transform:`translateY(${y}px)`},{opacity:1,transform:'none'}], {delay:Math.min(index*30,420),duration:isWord?650:850});
    reveal.unobserve(node);
  }
}, {threshold:.05});
document.querySelectorAll('[data-preview-reveal]').forEach(node=>{if(!node.closest('[data-framer-name="NavBar"],h1,h2,h3'))reveal.observe(node);});

// Seamless hero media and client-logo strips, paced from the reference recording.
const tickerVisibility=new IntersectionObserver(entries=>{
  for(const entry of entries){const animation=entry.target._tickerAnimation;if(animation)entry.isIntersecting&&!reduced.matches?animation.play():animation.pause();}
});
for(const list of document.querySelectorAll('ul:has(> .ticker-item)')){
  if(list.querySelector('[data-framer-name="Logo"]')||list.closest('header[data-framer-name="Header"]'))continue;
  const originals=[...list.children];
  for(const item of originals){const copy=item.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.querySelectorAll('a,button,[tabindex]').forEach(e=>e.tabIndex=-1);list.append(copy);}
  const start=()=>{
    if(list._tickerAnimation){loops.delete(list._tickerAnimation);list._tickerAnimation.cancel();}
    list.style.transform='none';
    const distance=list.children[originals.length].offsetLeft-list.children[0].offsetLeft;
    if(!distance||reduced.matches)return;
    const animation=list.animate([{transform:'translateX(0px)'},{transform:`translateX(-${distance}px)`}],{duration:distance/(list.querySelector('video,img')?24:40)*1000,iterations:Infinity,easing:'linear'});
    list._tickerAnimation=animation;loops.add(animation);
  };
  new ResizeObserver(start).observe(list);tickerVisibility.observe(list);start();
}

// Expandable FAQ answers preserve the reference content and rotating indicators.
for(const faq of document.querySelectorAll('[data-framer-name="FAQ"]')){
  const items=[...faq.querySelectorAll('[class*="-item-"]')].filter(e=>e.children.length===2&&e.firstElementChild.querySelector('img'));
  for(const [index,item] of items.entries()){
    const [button,panel]=item.children,icon=button.querySelector('img');
    panel.id=`answer-${index}`;button.setAttribute('role','button');button.tabIndex=0;button.setAttribute('aria-controls',panel.id);
    let open=/-item-0$/.test(item.className);
    const sync=()=>{panel.style.height=open?'auto':'0px';panel.style.overflow='hidden';panel.inert=!open;button.setAttribute('aria-expanded',String(open));if(icon)icon.style.transform=open?'rotate(180deg)':'rotate(0deg)';};
    sync();
    const toggle=()=>{
      if(!open)items.forEach(other=>{if(other!==item&&other.firstElementChild.getAttribute('aria-expanded')==='true')other._toggleAnswer?.();});
      const from=panel.getBoundingClientRect().height;
      open=!open;panel.inert=!open;button.setAttribute('aria-expanded',String(open));
      const to=open?panel.scrollHeight:0;panel.style.height=to+'px';panel.getAnimations().forEach(a=>a.cancel());
      const animation=animate(panel,[{height:from+'px',opacity:open?0:1},{height:to+'px',opacity:open?1:0}],{duration:420});
      if(icon){icon.style.transition=reduced.matches?'none':`transform 420ms ${ease}`;icon.style.transform=open?'rotate(180deg)':'rotate(0deg)';}
      animation?.finished.then(()=>{if(open)panel.style.height='auto';}).catch(()=>{});if(!animation)sync();
    };
    item._toggleAnswer=toggle;
    button.addEventListener('click',toggle);button.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
  }
}

for(const track of document.querySelectorAll('.framer--carousel')){
  const section=track.closest('section');
  const move=direction=>track.scrollBy({left:direction*((track.firstElementChild?.getBoundingClientRect().width||300)+12),behavior:reduced.matches?'instant':'smooth'});
  section?.querySelector('[aria-label="Previous"]')?.addEventListener('click',()=>move(-1));
  section?.querySelector('[aria-label="Next"]')?.addEventListener('click',()=>move(1));
  track.tabIndex=0;track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});
}

// Upward page wipe for local document navigation.
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||link.target==='_blank'||link.hasAttribute('download'))return;
  const url=new URL(link.href,location.href);
  if(url.pathname===location.pathname&&url.search===location.search&&url.hash)return;
  if(!url.pathname.endsWith('.html')||url.protocol!==location.protocol||url.hostname!==location.hostname||url.href===location.href||reduced.matches)return;
  event.preventDefault();
  const curtain=document.createElement('div');curtain.dataset.pageCurtain='';curtain.style.cssText='position:fixed;inset:0;background:#f3f0e9;z-index:20000;pointer-events:all';document.body.append(curtain);
  animate(curtain,[{transform:'translateY(100%)'},{transform:'translateY(0)'}],{duration:400})?.finished.then(()=>location.assign(url.href));
});
addEventListener('pageshow',()=>{document.querySelectorAll('[data-page-curtain]').forEach(e=>e.remove());});
document.addEventListener('submit',event=>{
  if(event.target.matches('.ratio-footer__form'))return;
  event.preventDefault();let message=event.target.querySelector('[role="status"]');
  if(!message){message=document.createElement('p');message.setAttribute('role','status');event.target.append(message);}
  message.textContent='Preview only. Connect your own form service to receive submissions.';
},true);
for(const image of document.images)image.loading='eager';
for(const video of document.querySelectorAll('video:not([data-ratio-hero-motion])')){video.muted=true;video.preload='auto';video.autoplay=!reduced.matches;if(!reduced.matches)video.play().catch(()=>{});}
const clockNodes=[...document.querySelectorAll('div,p,span')].filter(e=>e.childElementCount===0&&/^\d{2}:\d{2}(?::\d{2})?$/.test(e.textContent.trim()));
const updateClock=()=>{const time=new Intl.DateTimeFormat('en-GB',{timeZone:'America/New_York',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());clockNodes.forEach(e=>e.textContent=time);};
updateClock();setInterval(updateClock,1000);
reduced.addEventListener('change',()=>{for(const animation of loops)reduced.matches?animation.pause():animation.play();document.querySelectorAll('video:not([data-ratio-hero-motion])').forEach(v=>reduced.matches?v.pause():v.play().catch(()=>{}));});
})();
