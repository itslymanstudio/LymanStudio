export const meetDevsStyles = `
  .meet-devs{box-sizing:border-box;width:100%;padding:116px 32px 132px;background:#f3f0e9;color:#20252a;font-family:"Space Grotesk",sans-serif}
  .meet-devs *{box-sizing:border-box}
  .meet-devs__inner{max-width:1520px;margin:0 auto}
  .meet-devs__intro{max-width:760px;margin:0 auto 58px;text-align:center}
  .meet-devs__eyebrow{margin:0 0 26px;font-size:14px;font-weight:500;letter-spacing:.01em;line-height:1.4;text-transform:uppercase}
  .meet-devs h2{margin:0;font-size:clamp(48px,6.25vw,90px);font-weight:600;letter-spacing:-.065em;line-height:.98}
  .meet-devs__description{max-width:560px;margin:25px auto 0;color:#5a6271;font-size:18px;line-height:1.5}
  .meet-devs__grid{display:grid;grid-template-columns:repeat(2,minmax(0,450px));justify-content:center;gap:60px}
  .meet-devs__profile{min-width:0}
  .meet-devs__flip-card{--tilt-x:0deg;--tilt-y:0deg;--glare-x:50%;--glare-y:50%;--glare-opacity:0;display:block;width:100%;height:auto;aspect-ratio:3/4;padding:0;border:0;border-radius:22px;background:#27272a;color:#f5f5f5;cursor:pointer;text-align:left;touch-action:pan-y;transform:perspective(1100px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(var(--hover-scale,1));transition:transform .5s cubic-bezier(.22,1,.36,1),box-shadow .5s cubic-bezier(.22,1,.36,1);box-shadow:0 18px 36px rgba(0,0,0,.18)}
  .meet-devs__flip-card:hover{--hover-scale:1.03;box-shadow:0 24px 48px rgba(0,0,0,.32)}
  .meet-devs__flip-card:focus-visible{outline:3px solid #1f2528;outline-offset:6px}
  .meet-devs__flip-inner{position:relative;display:block;width:100%;height:100%;border-radius:inherit;transform-style:preserve-3d;transition:transform .75s cubic-bezier(.2,.8,.2,1)}
  .meet-devs__flip-card[data-flipped="true"] .meet-devs__flip-inner{transform:rotateY(180deg)}
  .meet-devs__face{position:absolute;inset:0;display:block;overflow:hidden;border-radius:inherit;backface-visibility:hidden;-webkit-backface-visibility:hidden}
  .meet-devs__face--front{background:#e8e9ea}
  .meet-devs__face--front img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 29%;filter:grayscale(1);transition:filter .6s cubic-bezier(.22,1,.36,1)}
  .meet-devs__flip-card:hover .meet-devs__face--front img{filter:grayscale(.65)}
  .meet-devs__face--back{display:flex;flex-direction:column;justify-content:space-between;padding:28px;background:#27272a;color:#f5f5f5;transform:rotateY(180deg)}
  .meet-devs__back-kicker,.meet-devs__back-action{display:block;font-family:"DM Mono",monospace;font-size:11px;line-height:1.5;letter-spacing:.04em;text-transform:uppercase}
  .meet-devs__back-kicker{color:#c8ff31}
  .meet-devs__back-content{display:block}
  .meet-devs__back-name{display:block;margin-bottom:16px;font-size:clamp(34px,3vw,42px);font-weight:600;letter-spacing:-.06em;line-height:1}
  .meet-devs__back-description{display:block;font-size:17px;line-height:1.45;letter-spacing:-.02em}
  .meet-devs__back-action{color:#c8ff31}
  .meet-devs__glare{position:absolute;inset:0;z-index:2;border-radius:inherit;background:radial-gradient(circle at var(--glare-x) var(--glare-y),rgba(255,255,255,.8),transparent 42%);opacity:var(--glare-opacity);pointer-events:none;backface-visibility:hidden}
  .meet-devs__caption{display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:20px 4px 0}
  .meet-devs__caption h3{margin:0;font-size:30px;font-weight:600;letter-spacing:-.045em;line-height:1.1}
  .meet-devs__caption p{margin:0;color:#5a6271;font-size:15px;line-height:1.4}
  @media(max-width:809px){.meet-devs{padding:84px 16px 100px}.meet-devs__intro{margin-bottom:38px}.meet-devs__eyebrow{margin-bottom:22px}.meet-devs__description{font-size:16px}.meet-devs__grid{grid-template-columns:minmax(0,450px);gap:48px}.meet-devs__caption{padding-top:17px}}
  @media(max-width:420px){.meet-devs__face--back{padding:20px}.meet-devs__back-name{margin-bottom:10px;font-size:30px}.meet-devs__back-description{font-size:15px;line-height:1.35}.meet-devs__caption{display:block}.meet-devs__caption p{margin-top:7px}}
  @media(prefers-reduced-motion:reduce){.meet-devs__flip-card,.meet-devs__flip-inner,.meet-devs__face--front img{transition:none}.meet-devs__flip-card:hover{--hover-scale:1}}
`;

export function meetDevsMarkup(assetBase) {
  const portrait = name => `${assetBase}/${name}.webp`;
  return `<section class="meet-devs" data-framer-name="Meet the Devs" aria-labelledby="meet-devs-title">
    <div class="meet-devs__inner">
      <header class="meet-devs__intro">
        <p class="meet-devs__eyebrow">( MEET THE DEVS )</p>
        <h2 id="meet-devs-title">The people behind the build.</h2>
        <p class="meet-devs__description">A small team bringing thoughtful design and smooth experiences to life.</p>
      </header>
      <div class="meet-devs__grid">
        <article class="meet-devs__profile" data-preview-reveal="30">
          <button class="meet-devs__flip-card" type="button" data-flipped="false" aria-pressed="false" aria-label="Read about Sujay Yadav">
            <span class="meet-devs__flip-inner">
              <span class="meet-devs__face meet-devs__face--front"><img src="${portrait('sujay-yadav')}" alt="Portrait of Sujay Yadav" width="900" height="1080" loading="lazy" draggable="false"></span>
              <span class="meet-devs__face meet-devs__face--back" aria-hidden="true"><span class="meet-devs__back-kicker">Developer</span><span class="meet-devs__back-content"><span class="meet-devs__back-name">Sujay Yadav</span><span class="meet-devs__back-description">Turns early ideas into clear, responsive interfaces, with careful attention to layout, motion, and the details people notice.</span></span><span class="meet-devs__back-action">Click to return</span></span>
            </span><span class="meet-devs__glare" aria-hidden="true"></span>
          </button>
          <div class="meet-devs__caption"><h3>Sujay Yadav</h3><p>Developer</p></div>
        </article>
        <article class="meet-devs__profile" data-preview-reveal="30">
          <button class="meet-devs__flip-card" type="button" data-flipped="false" aria-pressed="false" aria-label="Read about Rayan Ahmad">
            <span class="meet-devs__flip-inner">
              <span class="meet-devs__face meet-devs__face--front"><img src="${portrait('rayan-ahmad')}" alt="Portrait of Rayan Ahmad" width="900" height="1350" loading="lazy" draggable="false"></span>
              <span class="meet-devs__face meet-devs__face--back" aria-hidden="true"><span class="meet-devs__back-kicker">Developer</span><span class="meet-devs__back-content"><span class="meet-devs__back-name">Rayan Ahmad</span><span class="meet-devs__back-description">Focuses on the foundations behind each launch: performance, accessibility, and dependable deployment from build to handoff.</span></span><span class="meet-devs__back-action">Click to return</span></span>
            </span><span class="meet-devs__glare" aria-hidden="true"></span>
          </button>
          <div class="meet-devs__caption"><h3>Rayan Ahmad</h3><p>Developer</p></div>
        </article>
      </div>
    </div>
  </section>`;
}

export function replaceTestimonials(html, assetBase) {
  const start = html.indexOf('<section class="framer-1ju0swc" data-framer-name="Testimonials">');
  if (start < 0) return html;
  const tag = /<\/?section\b[^>]*>/gi;
  tag.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tag.exec(html))) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + meetDevsMarkup(assetBase) + html.slice(tag.lastIndex);
  }
  throw new Error('Unclosed Testimonials section');
}
