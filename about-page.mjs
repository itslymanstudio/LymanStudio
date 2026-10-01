import { spaceGroteskStyles } from './typography.mjs';
import { closingFooterMarkup, closingFooterStyles } from './closing-footer.mjs';

export const aboutCapabilities = [
  { title: 'Branding', description: 'Give your business a clear identity and a voice people remember.', services: [
    ['Naming', 'A name that fits your business, your audience, and where you want to go.'],
    ['Brand Strategy', 'Positioning, purpose, and a clear direction for how your brand shows up.'],
    ['Brand Communication', 'Messaging and tone of voice that make your story easy to understand.'],
    ['Logo/Identity Design', 'A distinctive logo and visual identity that work across digital and print.'],
    ['Brand Rollout', 'Bring your new identity to your website, social channels, and business materials.'],
    ['Brand Guidelines', 'Practical rules for using your logo, typography, colours, and voice consistently.'],
  ] },
  { title: 'UX/UI', description: 'Make every screen feel clear, useful, and easy to navigate.', services: [
    ['UX Research', 'Understand your users, their needs, and the obstacles they face.'],
    ['Information Architecture', 'Organise content and navigation so people can find what they need.'],
    ['UX Design', 'Shape user journeys and interactions around real tasks and business goals.'],
    ['UI Design', 'Create responsive interfaces with thoughtful typography, colour, and interaction.'],
    ['Design Systems', 'Reusable components and shared rules that keep your product consistent as it grows.'],
    ['Product Prototype', 'An interactive preview to test the experience before development begins.'],
  ] },
  { title: 'Development', description: 'Turn the design into reliable software, ready for the real world.', services: [
    ['Solution Architecture Design', 'Plan the structure, integrations, and technology around your product’s needs.'],
    ['SaaS Application Development', 'Design, build, and deploy web applications for your customers and team.'],
    ['AI Automation', 'Connect useful AI tools to the tasks and workflows that take up your time.'],
    ['Multi-tenant Systems', 'Build applications that serve multiple organisations with separate accounts and data.'],
    ['Data Security & Compliance', 'Access controls, secure data handling, and support for your project’s compliance requirements.'],
    ['Custom Workflow Automation', 'Connect your tools and automate repetitive processes with purpose-built integrations.'],
  ] },
];

const aboutStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; background: #f3f0e9; }
  body { margin: 0; color: #101010; background: #f3f0e9; }
  a { color: inherit; }
  .lyman-about { --about-muted: #77746e; --about-rule: #c5c3bd; padding-top: 82px; }
  .lyman-about :is(h1,h2,h3,p,figure) { margin: 0; }
  .lyman-about__section { max-width: 1520px; margin: 0 auto; padding: 76px 32px; }
  .lyman-about__hero { display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(40px,6vw,100px); align-items: center; padding-top: 64px; padding-bottom: 80px; }
  .lyman-about__eyebrow { margin-bottom: 34px !important; font: 400 11px/1.4 var(--font-mono) !important; letter-spacing: .025em; text-transform: uppercase; }
  .lyman-about h1 { font-size: clamp(64px,6.8vw,108px); }
  .lyman-about :is(h1,h2) > span:not(.ratio-motion-word) { color: #85827b; }
  .lyman-about__deck { max-width: 37ch; margin-top: 30px !important; color: #55534e; font-size: 20px; line-height: 1.5; }
  .lyman-about__link { display: inline-flex; align-items: center; gap: 26px; margin-top: 30px; padding: 13px 0; text-decoration: none; border-bottom: 1px solid #101010; font-size: 15px; font-weight: 500; }
  .lyman-about__link span { display: inline-block; transition: transform .25s ease; }
  .lyman-about__link:hover span { transform: translate(3px,-3px); }
  .lyman-about__visual { position: relative; padding: 0 30px 30px 0; max-width: 470px; width: 100%; justify-self: end; }
  .lyman-about__art { display: block; width: 100%; height: auto; aspect-ratio: 1; object-fit: cover; border-radius: 22px; }
  .lyman-about__detail { position: absolute; width: 38%; height: auto; right: 0; bottom: 0; border: 8px solid #f3f0e9; border-radius: 22px; aspect-ratio: 1; object-fit: cover; }
  #capabilities { scroll-margin-top: 100px; }
  .lyman-about__story { border-top: 1px solid var(--about-rule); }
  .lyman-about h2 { max-width: 1050px; font-size: clamp(48px,5.4vw,82px); }
  .lyman-about__story-copy { max-width: 68ch; margin-top: 30px !important; color: #55534e; font-size: 20px; line-height: 1.55; }
  .lyman-about__principles { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 42px; margin-top: 54px; }
  .lyman-about__principle { border-top: 1px solid var(--about-rule); padding-top: 22px; }
  .lyman-about__principle h3 { font-size: 29px; }
  .lyman-about__principle p { max-width: 37ch; margin-top: 16px; color: #55534e; font-size: 16px; line-height: 1.5; }
  .lyman-about__capabilities { border-top: 1px solid var(--about-rule); padding-bottom: 80px; }
  .lyman-about__capability-deck { max-width: 54ch; margin-top: 24px !important; font-size: 18px; color: #55534e; line-height: 1.5; }
  .lyman-about__groups { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: clamp(30px,4vw,64px); margin-top: 56px; }
  .lyman-about__group h3 { font-size: 38px; margin-bottom: 18px; }
  .lyman-about__group > p { min-height: 54px; margin-bottom: 26px; max-width: 34ch; color: #55534e; font-size: 16px; line-height: 1.5; }
  .lyman-about__service { border-bottom: 1px solid var(--about-rule); }
  .lyman-about__service summary { list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 16px; min-height: 57px; padding: 14px 0; font-size: 17px; line-height: 1.35; cursor: pointer; }
  .lyman-about__service summary::-webkit-details-marker { display: none; }
  .lyman-about__service summary::after { content: '↗'; flex: none; transition: transform .25s ease; }
  .lyman-about__service summary:hover { color: #55534e; }
  .lyman-about__service[open] summary::after { transform: rotate(90deg); }
  .lyman-about__service[open] summary { font-weight: 500; }
  .lyman-about__service p { padding: 0 24px 20px 0; color: #55534e; font-size: 15px; line-height: 1.5; }
  .lyman-about__service[open] { box-shadow: inset 3px 0 #c8ff31; padding-left: 14px; }
  .lyman-about :is(a,summary):focus-visible { outline: 2px solid #101010; outline-offset: 5px; }
  @media (max-width: 1024px) {
    .lyman-about__hero { grid-template-columns: 1.15fr 1fr; gap: 32px; }
    .lyman-about h1 { font-size: clamp(60px,7.5vw,82px); }
    .lyman-about__principles { gap: 28px; }
  }
  @media (max-width: 767px) {
    .lyman-about { padding-top: 72px; }
    .lyman-about__section { padding: 56px 20px; }
    .lyman-about__hero { grid-template-columns: 1fr; gap: 38px; padding-top: 42px; }
    .lyman-about__eyebrow { margin-bottom: 26px !important; }
    .lyman-about h1 { font-size: clamp(58px,10vw,78px); }
    .lyman-about__deck, .lyman-about__story-copy { font-size: 18px; }
    .lyman-about__visual { max-width: 460px; justify-self: start; }
    .lyman-about h2 { font-size: clamp(44px,8vw,64px); }
    .lyman-about__principles, .lyman-about__groups { grid-template-columns: 1fr; gap: 36px; margin-top: 38px; }
    .lyman-about__group > p { min-height: 0; margin-bottom: 18px; max-width: 46ch; }
    .lyman-about__service summary { min-height: 54px; }
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    .lyman-about__link span, .lyman-about__service summary::after { transition: none; }
  }
`;

export function renderAboutPage(links, assetBase = '/_assets', scriptBase = '') {
  const description = 'Lyman Studio is a Bengaluru-based design and development studio. We build brands, websites, and apps, from strategy and UX/UI to deployment and automation.';
  return `<!doctype html><html lang="en" data-ratio-route="/about"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>About us | Lyman Studio</title><meta name="description" content="${description}">
    <meta property="og:title" content="About us | Lyman Studio"><meta property="og:description" content="${description}"><meta property="og:type" content="website"><meta property="og:image" content="${assetBase}/hero/chrome-loop.webp">
    <link rel="icon" href="${assetBase}/lymen-symbol.svg">
    <link rel="preload" href="${assetBase}/fonts/space-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
    <style>${spaceGroteskStyles(assetBase)}${closingFooterStyles}${aboutStyles}</style>
  </head><body><main id="main" class="lyman-about">
    <header class="lyman-about__section lyman-about__hero">
      <div><p class="lyman-about__eyebrow">About Lyman Studio</p>
        <h1>Good design.<br><span>Built to work.</span></h1>
        <p class="lyman-about__deck" data-about-reveal>We’re a Bengaluru-based studio designing, building, and deploying brands, websites, and apps for businesses of every size.</p>
        <a class="lyman-about__link" href="#capabilities">Explore our capabilities <span aria-hidden="true">↗</span></a>
      </div>
      <figure class="lyman-about__visual" data-about-reveal>
        <img class="lyman-about__art" src="${assetBase}/hero/chrome-loop.webp" alt="Sculptural chrome loop on a lime-green backdrop" width="1080" height="1080" fetchpriority="high">
        <img class="lyman-about__detail" src="${assetBase}/hero/paper-arch.webp" alt="Folded ivory paper sculpture against warm orange" width="1080" height="1080" decoding="async">
      </figure>
    </header>
    <section class="lyman-about__section lyman-about__story" aria-labelledby="about-story-title">
      <h2 id="about-story-title">Small team.<br><span>Full picture.</span></h2>
      <p class="lyman-about__story-copy" data-about-reveal>We connect the way your business looks with the way it works. From your first brand idea to a live digital product, design and development happen together. You work directly with the people making it.</p>
      <div class="lyman-about__principles">
        <article class="lyman-about__principle" data-about-reveal><h3>Design with intent.</h3><p>We start with your business and your audience. Every visual choice has a job to do.</p></article>
        <article class="lyman-about__principle" data-about-reveal><h3>Build for real life.</h3><p>Fast, responsive websites and apps that are useful today and ready to grow with you.</p></article>
        <article class="lyman-about__principle" data-about-reveal><h3>Stay close.</h3><p>Clear conversations, regular feedback, and support from the first sketch through deployment.</p></article>
      </div>
      <a class="lyman-about__link" href="${links.homeHref}#ratio-process-title">See how we work <span aria-hidden="true">↗</span></a>
    </section>
    <section class="lyman-about__section lyman-about__capabilities" id="capabilities" aria-labelledby="about-capabilities-title">
      <h2 id="about-capabilities-title">Everything your<br><span>idea needs.</span></h2>
      <p class="lyman-about__capability-deck" data-about-reveal>A complete build or one focused brief. Bring us in wherever your business needs a hand.</p>
      <div class="lyman-about__groups">${aboutCapabilities.map(group => `<section class="lyman-about__group" aria-label="${group.title}" data-about-reveal>
        <h3>${group.title}</h3><p>${group.description}</p>
        ${group.services.map(([title,copy]) => `<details class="lyman-about__service"><summary>${title}</summary><p>${copy}</p></details>`).join('')}
      </section>`).join('')}</div>
    </section>
  </main>${closingFooterMarkup(links)}
    <script src="${scriptBase}/scroll-motion.js"></script><script src="${scriptBase}/about-page.js?v=1"></script>
    <script src="${scriptBase}/ratio-runtime.js?v=2" data-asset-base="${assetBase}" data-contact="#contact"></script>
  </body></html>`;
}
