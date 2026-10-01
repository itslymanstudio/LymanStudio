const steps = [
  { title: "Let's talk", description: 'We start with a conversation to understand your business, goals, and exactly what you need.' },
  { title: 'Plan & prototype', description: 'Before writing code, we map the site and show you a visual direction.' },
  { title: 'Confirm the project', description: 'We agree on the scope, price, deadline, and payment milestones.', note: '50% UPFRONT TO BEGIN' },
  { title: 'Development', description: 'We build the responsive site, functionality, integrations, and performance around the approved plan.' },
  { title: 'Review & feedback', description: 'You review the working site. We gather feedback and make the agreed changes.' },
  { title: 'Launch', description: 'After approval, we configure hosting, connect the domain where needed, run final checks, and go live.' },
  { title: 'Handover', description: 'Your website is live. We transfer access and handover details after approved delivery.', note: 'FINAL 50% AFTER APPROVED DELIVERY' },
];

export const processArticleMarkup = `<section class="ratio-process" aria-labelledby="ratio-process-title">
  <div class="ratio-process__inner">
    <header class="ratio-process__intro">
      <p class="ratio-process__eyebrow">OUR PROCESS</p>
      <h2 id="ratio-process-title">How we<br><span class="ratio-process__muted">work.</span></h2>
      <p class="ratio-process__lead">Seven clear steps, from the first conversation to a website ready for the world.</p>
    </header>
    <div class="ratio-process__track">
      <ol class="ratio-process__steps">
        ${steps.map(({ title, description, note }, index) => `<li class="ratio-process__step">
          <span class="ratio-process__node" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
          <div class="ratio-process__step-content">
            <h3>${title}</h3>
            <p>${description}</p>
            ${note ? `<p class="ratio-process__note">${note}</p>` : ''}
          </div>
        </li>`).join('')}
      </ol>
      <div class="ratio-process__cta-row">
        <span class="ratio-process__cta-node" aria-hidden="true">↗</span>
        <div class="ratio-process__cta">
          <p class="ratio-process__cta-eyebrow">YOUR NEXT STEP</p>
          <h3>Have a project in mind?<br>Let's build it.</h3>
          <p class="ratio-process__cta-copy">Tell us what you need, and we'll help turn your idea into a fast, modern website built for your business.</p>
          <div class="ratio-process__actions">
            <a class="ratio-process__primary" href="#ratio-contact-form-title">Start Your Project <span aria-hidden="true">→</span></a>
            <a class="ratio-process__secondary" href="https://wa.me/917370969624" target="_blank" rel="noopener noreferrer">Talk to us on WhatsApp <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

export const processArticleStyles = `
  #ratio-contact-form-title { scroll-margin-top: 100px; }
  .ratio-process, .ratio-process * { box-sizing: border-box; }
  .ratio-process { width: 100vw; max-width: none; align-self: flex-start; margin-left: calc(50% - 50vw); padding: 116px max(32px, calc((100vw - 1520px) / 2)) 136px; border-top: 1px solid #c5c3bd; background: #f3f0e9; color: #101010; }
  .ratio-process__inner { display: grid; grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); gap: clamp(48px, 7vw, 120px); }
  .ratio-process__intro { position: sticky; top: 112px; align-self: start; }
  .ratio-process__eyebrow, .ratio-process__cta-eyebrow, .ratio-process__note { font: 400 11px/1.3 var(--font-mono) !important; letter-spacing: .025em !important; }
  .ratio-process__eyebrow { margin: 0 0 68px; }
  .ratio-process__intro h2 { margin: 0; font: 600 clamp(64px, 6vw, 100px)/.9 var(--font-main) !important; letter-spacing: -.08em !important; }
  .ratio-process__intro h2 .ratio-process__muted { color: #8e8b84; font: inherit !important; }
  .ratio-process__lead { max-width: 31ch; margin: 30px 0 0; color: #5a5955; font: 400 18px/1.45 var(--font-main) !important; letter-spacing: -.02em !important; }
  .ratio-process__steps { margin: 0; padding: 0; list-style: none; }
  .ratio-process__step, .ratio-process__cta-row { display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 22px; position: relative; }
  .ratio-process__step { min-height: 166px; padding: 0 0 50px; }
  .ratio-process__step::before { content: ""; position: absolute; left: 21px; top: 44px; bottom: 0; width: 1px; background: #aaa7a0; transform-origin: top; }
  .ratio-process__node, .ratio-process__cta-node { width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid #101010; border-radius: 50%; font: 400 11px/1 var(--font-mono) !important; flex: none; }
  .ratio-process__step-content { padding: 3px 0 0; min-width: 0; }
  .ratio-process__step h3 { margin: 0 0 13px; font: 600 clamp(27px, 2.2vw, 34px)/1 var(--font-main) !important; letter-spacing: -.055em !important; }
  .ratio-process__step-content > p:not(.ratio-process__note) { max-width: 48ch; margin: 0; color: #5a5955; font: 400 16px/1.5 var(--font-main) !important; letter-spacing: -.02em !important; }
  .ratio-process__note { display: inline-block; margin: 18px 0 0; padding: 8px 0; border-top: 1px solid #c5c3bd; color: #5a5955; }
  .ratio-process__cta-row { padding-top: 0; }
  .ratio-process__cta-node { position: relative; z-index: 1; background: #c8ff31; border-color: #c8ff31; color: #101010; font-size: 20px !important; }
  .ratio-process__cta { min-width: 0; padding: clamp(32px, 3.8vw, 62px); border-radius: 18px; background: #101010; color: #f3f0e9; }
  .ratio-process__cta-eyebrow { margin: 0 0 34px; color: #c8ff31; }
  .ratio-process__cta h3 { margin: 0; font: 600 clamp(36px, 3.75vw, 62px)/.94 var(--font-main) !important; letter-spacing: -.075em !important; }
  .ratio-process__cta-copy { max-width: 49ch; margin: 24px 0 0; color: #c3c1bb; font: 400 16px/1.5 var(--font-main) !important; letter-spacing: -.02em !important; }
  .ratio-process__actions { display: flex; flex-wrap: wrap; align-items: center; gap: 18px 28px; margin-top: 42px; }
  .ratio-process__actions a { text-decoration: none; transition: transform .3s ease, background .3s ease, color .3s ease; }
  .ratio-process__primary { display: inline-flex; justify-content: center; align-items: center; gap: 28px; min-height: 54px; padding: 14px 23px; border-radius: 999px; background: #c8ff31; color: #101010; font: 500 13px/1.2 var(--font-mono) !important; white-space: nowrap; }
  .ratio-process__primary:hover { background: #f3f0e9; transform: translateY(-2px); }
  .ratio-process__secondary { display: inline-flex; align-items: center; gap: 8px; padding: 9px 0; border-bottom: 1px solid #c8ff31; color: #f3f0e9; font: 400 13px/1.25 var(--font-mono) !important; }
  .ratio-process__secondary:hover { color: #c8ff31; transform: translateY(-2px); }
  .ratio-process__actions a:focus-visible { outline: 2px solid #c8ff31; outline-offset: 4px; }
  .ratio-process.is-ready .ratio-process__intro, .ratio-process.is-ready .ratio-process__step, .ratio-process.is-ready .ratio-process__cta-row { opacity: 0; transform: translateY(20px); }
  .ratio-process.is-ready .ratio-process__step::before { transform: scaleY(0); }
  .ratio-process.is-ready :is(.ratio-process__intro, .ratio-process__step, .ratio-process__cta-row) { transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
  .ratio-process.is-ready .ratio-process__step::before { transition: transform .85s cubic-bezier(.22,1,.36,1) .15s; }
  .ratio-process.is-ready :is(.ratio-process__intro, .ratio-process__step, .ratio-process__cta-row).is-visible { opacity: 1; transform: none; }
  .ratio-process.is-ready .ratio-process__step.is-visible::before { transform: scaleY(1); }
  @media (max-width: 900px) {
    .ratio-process__inner { grid-template-columns: 1fr; gap: 84px; }
    .ratio-process__intro { position: static; }
    .ratio-process__eyebrow { margin-bottom: 34px; }
    .ratio-process__lead { max-width: 48ch; }
  }
  @media (max-width: 809px) {
    .ratio-process { padding: 88px 16px 100px; }
    .ratio-process__intro h2 { font-size: clamp(54px, 10vw, 76px) !important; }
    .ratio-process__inner { gap: 64px; }
    .ratio-process__step { min-height: 0; padding-bottom: 48px; }
    .ratio-process__cta { padding: 30px 24px 34px; }
    .ratio-process__cta h3 { font-size: clamp(34px, 7vw, 52px) !important; }
  }
  @media (max-width: 520px) {
    .ratio-process__step, .ratio-process__cta-row { grid-template-columns: 36px minmax(0, 1fr); gap: 14px; }
    .ratio-process__node, .ratio-process__cta-node { width: 36px; height: 36px; }
    .ratio-process__step::before { left: 17px; top: 36px; }
    .ratio-process__step h3 { font-size: 26px !important; }
    .ratio-process__step-content > p:not(.ratio-process__note) { font-size: 15px !important; }
    .ratio-process__cta { padding: 27px 20px 30px; border-radius: 14px; }
    .ratio-process__cta h3 { font-size: clamp(32px, 8vw, 42px) !important; }
    .ratio-process__cta-copy { font-size: 15px !important; }
    .ratio-process__actions { align-items: stretch; flex-direction: column; margin-top: 32px; }
    .ratio-process__primary { width: 100%; padding: 14px 12px; gap: 10px; font-size: 11px !important; }
    .ratio-process__secondary { align-self: flex-start; font-size: 11px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ratio-process.is-ready :is(.ratio-process__intro, .ratio-process__step, .ratio-process__cta-row) { opacity: 1; transform: none; transition: none; }
    .ratio-process.is-ready .ratio-process__step::before { transform: none; transition: none; }
    .ratio-process__actions a { transition: none; }
  }
`;

export function injectProcessBeforeBlog(html) {
  const start = html.search(/<section\b(?=[^>]*\bdata-framer-name="Blog")/i);
  if (start < 0) throw new Error('Homepage Creative Dispatch section not found');
  return html.slice(0, start) + processArticleMarkup + html.slice(start);
}
