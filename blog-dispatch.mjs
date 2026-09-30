export const onlinePresenceSlug = 'why-every-small-business-needs-an-online-presence';
export const onlinePresenceRoute = `/blog/${onlinePresenceSlug}`;

export const dispatchPosts = [
  {
    slug: 'inside-the-studio-our-process-for-crafting-a-standout-identity',
    title: 'Inside the Studio: Our Process for Crafting a Standout Identity',
    date: 'Sep 15, 2026',
    iso: '2026-09-15',
    cover: 'inside-the-studio',
    originalCover: 'IdUxpWYbkXu6ud9ebMdtIIizs.png',
    coverAlt: 'Design sketches, tactile paper, and color swatches on a studio workbench',
  },
  {
    slug: 'why-every-brand-needs-a-signature-visual-language',
    title: 'Why Every Brand Needs a Signature Visual Language',
    date: 'Sep 22, 2026',
    iso: '2026-09-22',
    cover: 'signature-visual-language',
    originalCover: 'LWFDO42tuu3vRgllxVsPbZC5SMM.png',
    coverAlt: 'A coordinated visual identity across cream stationery and charcoal packaging',
  },
  {
    slug: onlinePresenceSlug,
    title: 'Why Every Business, Even a Small Business, Needs an Online Presence',
    date: 'Sep 29, 2026',
    iso: '2026-09-29',
    cover: 'small-business-online-presence',
    originalCover: '54E8E8YQySPyeiKzWn8fj88Vhtg.png',
    coverAlt: 'A local shop alongside its coordinated tablet and mobile storefront',
  },
];

const sketchSlug = 'from-sketch-to-screen-how-ideas-evolve-into-impactful-designs';

export const dispatchCardStyles = `
  [data-framer-name="Blog"] a.framer-tdTsn {
    transition: translate .32s cubic-bezier(.2,.75,.25,1), scale .32s cubic-bezier(.2,.75,.25,1), box-shadow .32s ease;
  }
  [data-framer-name="Blog"] a.framer-tdTsn [data-framer-name="Image"] img,
  [data-framer-name="Blog"] a.framer-tdTsn .framer-fprpz7 {
    transform: none !important;
    scale: none !important;
    filter: none !important;
    -webkit-filter: none !important;
  }
  @media (hover: hover) and (pointer: fine) {
    [data-framer-name="Blog"] a.framer-tdTsn:is(:hover, :focus-visible) {
      translate: 0 -10px;
      scale: 1.025;
      z-index: 2;
      box-shadow: 0 20px 40px rgba(20,20,20,.14);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-framer-name="Blog"] a.framer-tdTsn {
      transition: none;
      translate: none !important;
      scale: none !important;
    }
  }
`;

function coverAttributes(post, assetBase, article) {
  const prefix = `${assetBase}/blog-covers/${post.cover}`;
  return `src="${prefix}-1440.webp" srcset="${[640,960,1440].map(width => `${prefix}-${width}.webp ${width}w`).join(', ')}" sizes="${article ? '(max-width: 1040px) 100vw, 1440px' : '(max-width: 809px) calc(100vw - 64px), 480px'}" alt="${post.coverAlt}" width="1440" height="900"`;
}

function blogCoverMarkup(post,assetBase) {
  return `<figure class="ratio-article-cover"><img ${coverAttributes(post,assetBase,true)} decoding="async" fetchpriority="high"></figure>`;
}

export function replaceBlogCovers(html,assetBase,route) {
  const articlePost = dispatchPosts.find(post => '/blog/'+post.slug === route);
  html = html.replace(/<img\b[^>]*>/gi,tag => {
    const post = dispatchPosts.find(post => tag.includes(post.originalCover));
    if (!post) return tag;
    const cleaned = tag.replace(/\s(?:src|srcset|sizes|alt|width|height)="[^"]*"/gi,'');
    return cleaned.replace(/>$/,` ${coverAttributes(post,assetBase,!!articlePost)}>`);
  });
  if (articlePost) html = html.replace(/(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*(")/gi,`$1${assetBase}/blog-covers/${articlePost.cover}-1440.webp$2`);
  return html;
}

export function dispatchRuntime(assetBase = '/_assets') {
  const posts = JSON.stringify(dispatchPosts);
  return `(()=>{
    const posts=${posts};
    const assetBase=${JSON.stringify(assetBase)};
    const setCover=(image,post,article=false)=>{
      if(!image) return;
      const prefix=assetBase+'/blog-covers/'+post.cover;
      const attributes={src:prefix+'-1440.webp',srcset:[640,960,1440].map(width=>prefix+'-'+width+'.webp '+width+'w').join(', '),sizes:article?'(max-width: 1040px) 100vw, 1440px':'(max-width: 809px) calc(100vw - 64px), 480px',alt:post.coverAlt,width:'1440',height:'900'};
      for(const [key,value] of Object.entries(attributes)) if(image.getAttribute(key)!==value) image.setAttribute(key,value);
    };
    const bySlug=new Map(posts.map(post=>[post.slug,post]));
    const sketch=${JSON.stringify(sketchSlug)};
    const page=document.documentElement.getAttribute('data-ratio-route')||location.pathname.replace(/\\/$/, '')||'/';
    const blogRoutes=new Set(['/','/blog']);
    const dateForPath=new Map(posts.map(post=>['/blog/'+post.slug,post.iso]));
    const formatCard=(card,post)=>{
      const targetHref=location.protocol==='file:'?(page==='/'?'preview/blog/'+post.slug+'/index.html':post.slug+'/index.html'):'./blog/'+post.slug;
      if(card.getAttribute('href')!==targetHref && card.getAttribute('href')!=='/blog/'+post.slug) card.setAttribute('href',targetHref);
      const date=card.querySelector('[data-framer-name="Date"] p, .framer-ibkx9w p');
      if(date && date.textContent.trim()!==post.date) date.textContent=post.date;
      const title=card.querySelector('[data-framer-name="Title"] h1,[data-framer-name="Title"] h2,[data-framer-name="Title"] h3,[data-framer-name="Title"] h4,[data-framer-name="Title"] h5,[data-framer-name="Title"] h6,[data-framer-name="Title"] p,.framer-j6xzjt h6');
      if(title && title.textContent.trim()!==post.title) title.textContent=post.title;
      card.dataset.ratioDispatchPost=post.slug;
      setCover(card.querySelector('[data-framer-name="Image"] img'),post);
      const wrapper=card.parentElement;
      if(wrapper){
        const order=posts.findIndex(item=>item.slug===post.slug);
        wrapper.style.order=String(order);
        wrapper.style.removeProperty('display');
        wrapper.removeAttribute('data-ratio-dispatch-hidden');
      }
    };
    const hideCard=card=>{
      const wrapper=card.parentElement||card;
      if(wrapper.isConnected) wrapper.remove();
    };
    const removeUnapprovedLinks=()=>{
      for(const card of document.querySelectorAll('a[href]')){
        const href=card.getAttribute('href')||'';
        let pathname;
        try{pathname=new URL(href,location.href).pathname}catch{continue}
        let slug=pathname.match(/^\\/blog\\/([^/]+)\\/?$/)?.[1];
        if(!slug&&location.protocol==='file:'){
          const match=pathname.match(/(?:^|\\/)blog\\/([^/]+)(?:\\/index\\.html)?\\/?$/);
          if(match&&match[1]!=='index.html') slug=match[1];
          else if(card.classList.contains('framer-tdTsn')){
            const parts=pathname.replace(/\\/$/,'').split('/').filter(Boolean);
            if(parts.at(-1)==='index.html') slug=parts.at(-2);
          }
        }
        if(!slug||bySlug.has(slug)) continue;
        const listingSketch=blogRoutes.has(page)&&slug===sketch&&card.classList.contains('framer-tdTsn');
        if(!listingSketch) hideCard(card);
      }
    };
    const updateCards=()=>{
      if(!blogRoutes.has(page)) return;
      const section=page==='/'?document.querySelector('[data-framer-name="Blog"]'):document.querySelector('#main');
      if(!section) return;
      const cards=[...section.querySelectorAll('a[href]')].filter(card=>{
        const href=card.getAttribute('href')||'';
        const postRoute=/(?:^|\\/)blog\\/[^/?#]+/.test(href);
        const localPreview=location.protocol==='file:'&&card.classList.contains('framer-tdTsn')&&/^[^?#]+\\/index\\.html$/.test(href);
        return postRoute||localPreview;
      });
      for(const card of cards){
        const href=card.getAttribute('href')||'';
        let slug;
        try{const parts=new URL(href,location.href).pathname.replace(/\\/$/,'').split('/').filter(Boolean);slug=parts.at(-1)==='index.html'?parts.at(-2):parts.at(-1)}catch{continue}
        const post=bySlug.get(slug)||(slug===sketch?bySlug.get(posts[2].slug):null);
        if(post) formatCard(card,post); else hideCard(card);
      }
    };
    const updateArticleDate=()=>{
      const published=dateForPath.get(page);
      if(!published) return;
      const postDate=posts.find(item=>'/blog/'+item.slug===page)?.date;
      const articlePost=posts.find(item=>'/blog/'+item.slug===page);
      if(articlePost) setCover(document.querySelector('.framer-dd3r7e img'),articlePost,true);
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())) if(/^\\s*(?:May|Jun|Jul|Aug|Sep)\\s+\\d{1,2},\\s+2025\\s*$/.test(node.nodeValue||'')) node.nodeValue=node.nodeValue.replace(/(?:May|Jun|Jul|Aug|Sep)\\s+\\d{1,2},\\s+2025/,postDate);
      document.querySelectorAll('meta[property="article:published_time"],meta[name="datePublished"]').forEach(meta=>{if(meta.content!==published)meta.content=published});
    };
    const update=()=>{removeUnapprovedLinks();updateCards();updateArticleDate()};
    update();
    new MutationObserver(update).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['src','srcset']});
  })();`;
}

export const onlinePresenceArticleStyles = `
  .ratio-article-page{min-height:100vh;background:#f3f0e9;color:#101010;padding:0 5vw 100px;font-family:var(--font-main, "Space Grotesk", sans-serif)}
  .ratio-article-nav{height:86px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #c5c3bd;font:400 11px/1.2 var(--font-mono, "DM Mono", monospace);letter-spacing:.03em;text-transform:uppercase}
  .ratio-article-nav a{color:inherit;text-decoration:none}.ratio-article-brand{font:600 21px/1 var(--font-main, "Space Grotesk",sans-serif);letter-spacing:-.08em}
  .ratio-article-content{max-width:1040px;margin:0 auto;padding:clamp(90px,13vw,180px) 0 90px}
  .ratio-article-eyebrow{font:400 11px/1.3 var(--font-mono,"DM Mono",monospace);letter-spacing:.04em;text-transform:uppercase;color:#6b6963}
  .ratio-article-content h1{max-width:1000px;margin:28px 0 30px;font:600 clamp(48px,8vw,108px)/.92 var(--font-main,"Space Grotesk",sans-serif);letter-spacing:-.085em}
  .ratio-article-deck{max-width:730px;margin:0;color:#62605a;font:400 clamp(19px,2.3vw,27px)/1.4 var(--font-main,"Space Grotesk",sans-serif);letter-spacing:-.035em}
  .ratio-article-cover{margin:48px 0 0;overflow:hidden;border-radius:18px;aspect-ratio:8/5;background:#e9e4da}
  .ratio-article-cover img{display:block;width:100%;height:100%;object-fit:cover}
  .ratio-article-body{max-width:700px;margin:clamp(72px,10vw,130px) 0 0 auto}
  .ratio-article-body h2{margin:58px 0 16px;font:600 clamp(30px,4vw,46px)/.98 var(--font-main,"Space Grotesk",sans-serif);letter-spacing:-.065em}
  .ratio-article-body p{margin:0 0 22px;color:#4f4d48;font:400 18px/1.65 var(--font-main,"Space Grotesk",sans-serif);letter-spacing:-.018em}
  @media(max-width:650px){.ratio-article-page{padding:0 20px 64px}.ratio-article-nav{height:72px}.ratio-article-nav>span{display:none}.ratio-article-content{padding:90px 0 55px}.ratio-article-content h1{font-size:clamp(46px,13vw,72px)}.ratio-article-body{margin-top:64px}.ratio-article-body p{font-size:16px}}
`;

export function renderOnlinePresenceArticle(assetBase = '/_assets') {
  const post = dispatchPosts[2];
  return `<!doctype html><html lang="en" data-ratio-route="${onlinePresenceRoute}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="A practical guide to why every small business needs a useful, trustworthy online presence."><meta property="og:image" content="${assetBase}/blog-covers/${post.cover}-1440.webp"><meta property="article:published_time" content="${post.iso}"><title>${post.title} | Lyman Studio</title><link rel="icon" href="${assetBase}/lymen-symbol.svg"><style>${onlinePresenceArticleStyles}</style></head><body><main class="ratio-article-page"><nav class="ratio-article-nav" aria-label="Main navigation"><a class="ratio-article-brand" href="/">LYMAN STUDIO</a><span>Independent creative studio · Bengaluru, India</span><div><a href="/projects">Projects</a> &nbsp; <a href="/about">About</a> &nbsp; <a href="/blog">Dispatch</a></div></nav><article class="ratio-article-content"><p class="ratio-article-eyebrow">Creative Dispatch &nbsp; / &nbsp; ${post.date}</p><h1>${post.title}</h1><p class="ratio-article-deck">Your next customer is already looking online. A clear, credible presence helps them find you, understand what you do, and feel confident getting in touch.</p>${blogCoverMarkup(post,assetBase)}<div class="ratio-article-body"><p>A small business does not need to be everywhere on the internet. It does need a dependable place where people can find the right information, see the quality of its work, and take the next step. A thoughtfully designed website can do that around the clock, even when you are busy running the business.</p><h2>Be easy to find</h2><p>People often search before they call, visit, or ask for a recommendation. A website with clear service details, location information, and useful answers gives search engines and potential customers a better picture of your business. For a Bengaluru business, that could mean making your neighbourhood, service area, and contact options obvious from the start.</p><h2>Build trust before the first conversation</h2><p>A polished online presence gives your business room to show what makes it worth choosing: real work, honest details, customer feedback, and a consistent visual identity. It answers the questions a new customer may be hesitant to ask and helps your business feel established, even if your team is small.</p><h2>Turn interest into action</h2><p>Your site can guide visitors toward one clear next step, whether that is booking a consultation, requesting a quote, placing an order, or sending a WhatsApp message. Clear writing and a simple mobile experience make that step easier to take.</p><h2>Start with what your business needs</h2><p>You do not need a complicated platform or a huge budget to begin. Start with a fast, mobile-friendly website that explains what you offer, who you serve, and how to reach you. Add features as the business grows. The right online presence is one that makes your day-to-day work easier and gives customers a clear reason to choose you.</p><p>At Lyman Studio, we help businesses shape, build, and launch useful digital experiences. If you are ready to make your business easier to find online, tell us what you have in mind.</p></div></article></main></body></html>`;
}
