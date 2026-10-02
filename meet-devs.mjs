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
  .meet-devs__flip-card:focus-within,.meet-devs__flip-card:active{outline:none}
  .meet-devs__flip-inner{position:relative;display:block;width:100%;height:100%;border-radius:inherit;transform-style:preserve-3d;transition:transform .75s cubic-bezier(.2,.8,.2,1)}
  .meet-devs__flip-card[data-flipped="true"] .meet-devs__flip-inner{transform:rotateY(180deg)}
  .meet-devs__face{position:absolute;inset:0;display:block;overflow:hidden;border-radius:inherit;backface-visibility:hidden;-webkit-backface-visibility:hidden}
  .meet-devs__face--front{background:#e8e9ea}
  .meet-devs__front-toggle{position:absolute;inset:0;width:100%;height:100%;border:0;background:transparent;cursor:pointer}
  .meet-devs__front-toggle:focus-visible{outline:none}
  .meet-devs__flip-hint{position:absolute;right:18px;bottom:18px;z-index:1;padding:9px 13px;border:0;border-radius:999px;background:rgba(16,16,16,.7);color:#f3f0e9;font:400 11px/1 "DM Mono",monospace;letter-spacing:.04em;text-transform:uppercase;opacity:0;transform:translateY(5px);transition:opacity .22s ease,transform .22s ease;pointer-events:none;backdrop-filter:blur(8px)}
  .meet-devs__flip-card:hover .meet-devs__flip-hint,.meet-devs__front-toggle:focus-visible~.meet-devs__flip-hint{opacity:1;transform:translateY(0)}
  @media(hover:none){.meet-devs__flip-hint{opacity:1;transform:none}}
  .meet-devs__face--front img{display:block;width:100%;height:100%;object-fit:cover;object-position:center 29%;filter:grayscale(1);transition:filter .6s cubic-bezier(.22,1,.36,1)}
  .meet-devs__flip-card:hover .meet-devs__face--front img{filter:grayscale(.65)}
  .meet-devs__face--back{display:flex;flex-direction:column;justify-content:space-between;padding:28px;background:#27272a;color:#f5f5f5;transform:rotateY(180deg)}
  .meet-devs__back-kicker,.meet-devs__back-action{display:block;font-family:"DM Mono",monospace;font-size:11px;line-height:1.5;letter-spacing:.04em;text-transform:uppercase}
  .meet-devs__back-kicker{color:#c8ff31}
  .meet-devs__back-content{display:block}
  .meet-devs__back-name{display:block;margin-bottom:16px;font-size:clamp(34px,3vw,42px);font-weight:600;letter-spacing:-.06em;line-height:1}
  .meet-devs__back-description{display:block;font-size:17px;line-height:1.45;letter-spacing:-.02em}
  .meet-devs__back-action{align-self:flex-start;padding:0;border:0;background:transparent;color:#c8ff31;cursor:pointer}
  .meet-devs__back-action:hover{text-decoration:underline;text-underline-offset:5px}
  .meet-devs__skills{display:flex;flex-wrap:wrap;gap:10px;margin:24px 0 0}
  .meet-devs__skill{display:inline-block;padding:9px 13px;border-radius:999px;background:#d7eda4;color:#242822;font:500 14px/1.1 "Space Grotesk",sans-serif;letter-spacing:-.02em;transform:rotate(-3deg);transition:transform .2s ease}
  .meet-devs__skill:nth-child(2){background:#ebc8e5;transform:rotate(3deg)}
  .meet-devs__skill:nth-child(3){background:#b8dfe8;transform:rotate(-1deg)}
  .meet-devs__skill:hover{transform:translateY(-3px) rotate(0deg)}
  .meet-devs__links{display:flex;flex-direction:column;align-items:flex-start;gap:14px;margin-top:26px}
  .meet-devs__links a{color:#f3f0e9;text-decoration:none;font:400 15px/1.3 "Space Grotesk",sans-serif;letter-spacing:-.02em}
  .meet-devs__links a:hover{color:#c8ff31}
  .meet-devs__links a:focus-visible,.meet-devs__back-action:focus-visible{outline:2px solid #c8ff31;outline-offset:5px}
  .meet-devs__github{display:inline-flex;align-items:center;gap:9px}
  .meet-devs__github svg{width:23px;height:23px;fill:currentColor}
  @media(max-width:420px){.meet-devs__skills{margin-top:18px;gap:8px}.meet-devs__skill{padding:8px 11px;font-size:12px}.meet-devs__links{margin-top:18px;gap:10px}.meet-devs__links a{font-size:14px}}
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
  const githubIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.52 11.52 0 0 1 12 6.098c1.02.005 2.047.138 3.005.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.595 24 12.297c0-6.627-5.373-12-12-12"/></svg>';
  const back = (name, description, skills, github) => `<span class="meet-devs__face meet-devs__face--back" aria-hidden="true" inert><span class="meet-devs__back-kicker">Developer / Lyman Studio</span><span class="meet-devs__back-content"><span class="meet-devs__back-name">${name}</span><span class="meet-devs__back-description">${description}</span><span class="meet-devs__skills" aria-label="Skills">${skills.map(skill => `<span class="meet-devs__skill">${skill}</span>`).join('')}</span><span class="meet-devs__links"><a href="mailto:itslymanstudio@gmail.com">itslymanstudio@gmail.com ↗</a><a class="meet-devs__github" href="https://github.com/${github}" target="_blank" rel="noopener noreferrer" aria-label="${name} on GitHub (opens in a new tab)">${githubIcon}<span>GitHub ↗</span></a></span></span><button class="meet-devs__back-action" type="button">Back to portrait ↩</button></span>`;
  return `<section class="meet-devs" data-framer-name="Meet the Devs" aria-labelledby="meet-devs-title">
    <div class="meet-devs__inner">
      <header class="meet-devs__intro">
        <p class="meet-devs__eyebrow">( MEET THE DEVS )</p>
        <h2 id="meet-devs-title">The people behind the build.</h2>
        <p class="meet-devs__description">A small team bringing thoughtful design and smooth experiences to life.</p>
      </header>
      <div class="meet-devs__grid">
        <article class="meet-devs__profile" data-preview-reveal="30">
          <div class="meet-devs__flip-card" data-flipped="false" role="group" aria-label="Sujay Yadav profile">
            <span class="meet-devs__flip-inner">
              <span class="meet-devs__face meet-devs__face--front"><img src="${portrait('sujay-yadav')}" alt="Portrait of Sujay Yadav" width="900" height="1080" loading="lazy" draggable="false"><button class="meet-devs__front-toggle" type="button" aria-label="Read about Sujay Yadav"></button><span class="meet-devs__flip-hint" aria-hidden="true">Click here ↗</span></span>
              ${back('Sujay Yadav', 'Thoughtful interfaces, playful motion, and solid foundations.', ['UI/UX', 'Frontend', 'System architecture'], 'SujayYadav776')}
            </span><span class="meet-devs__glare" aria-hidden="true"></span>
          </div>
          <div class="meet-devs__caption"><h3>Sujay Yadav</h3><p>Developer</p></div>
        </article>
        <article class="meet-devs__profile" data-preview-reveal="30">
          <div class="meet-devs__flip-card" data-flipped="false" role="group" aria-label="Rayan Ahmad profile">
            <span class="meet-devs__flip-inner">
              <span class="meet-devs__face meet-devs__face--front"><img src="${portrait('rayan-ahmad')}" alt="Portrait of Rayan Ahmad" width="900" height="1350" loading="lazy" draggable="false"><button class="meet-devs__front-toggle" type="button" aria-label="Read about Rayan Ahmad"></button><span class="meet-devs__flip-hint" aria-hidden="true">Click here ↗</span></span>
              ${back('Rayan Ahmad', 'Reliable backends, secure sign-ins, and apps built to last.', ['Backend', 'Auth', 'App development'], 'rayanahmax')}
            </span><span class="meet-devs__glare" aria-hidden="true"></span>
          </div>
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
