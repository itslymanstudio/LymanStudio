import { showProjects } from './site-features.mjs';

const contactEmail = 'itslymanstudio@gmail.com';

export function closingFooterMarkup({ homeHref, projectsHref, aboutHref, blogHref, contactHref, privacyHref, termsHref, footerEffectsSrc = '/footer-magnet-lines.js' }) {
  return `<footer class="ratio-footer" aria-labelledby="ratio-footer-title">
    <div class="ratio-footer__contact">
      <div class="ratio-footer__pitch">
        <div class="ratio-footer__magnet" data-footer-magnet-lines aria-hidden="true"></div>
        <p class="ratio-footer__eyebrow">Have a project in mind?</p>
        <h2 class="ratio-footer__headline" id="ratio-footer-title"><span>Let's make</span><span>something.</span></h2>
        <div class="ratio-footer__contact-line">
          <a class="ratio-footer__email" href="mailto:${contactEmail}">${contactEmail}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div class="ratio-footer__form-column">
        <h3 id="ratio-contact-form-title">Contact us</h3>
        <form class="ratio-footer__form" data-framer-name="Contact Form" aria-labelledby="ratio-contact-form-title">
          <div class="ratio-footer__honeypot" aria-hidden="true"><label for="ratio-contact-website">Leave this field empty</label><input id="ratio-contact-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
          <div class="ratio-footer__field">
            <label for="ratio-contact-name">Full name</label>
            <input id="ratio-contact-name" name="full_name" type="text" autocomplete="name" placeholder="Your name" required>
          </div>
          <div class="ratio-footer__field">
            <label for="ratio-contact-email">Official email address</label>
            <input id="ratio-contact-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required>
          </div>
          <div class="ratio-footer__field">
            <label for="ratio-contact-phone">Phone number</label>
            <input id="ratio-contact-phone" name="phone" type="tel" autocomplete="tel" placeholder="Optional">
          </div>
          <div class="ratio-footer__field">
            <label for="ratio-contact-region">Your region</label>
            <select id="ratio-contact-region" name="region">
              <option value="">Select your region</option>
              <option>India</option><option>Asia-Pacific</option><option>Europe</option>
              <option>North America</option><option>South America</option>
              <option>Middle East</option><option>Africa</option><option>Other</option>
            </select>
          </div>
          <div class="ratio-footer__field">
            <label for="ratio-contact-company">Company type</label>
            <select id="ratio-contact-company" name="company_type">
              <option value="">Select company type</option>
              <option>Startup</option><option>Established company</option>
              <option>Nonprofit</option><option>Individual</option><option>Other</option>
            </select>
          </div>
          <div class="ratio-footer__field">
            <label for="ratio-contact-brief">Tell us about your company and project</label>
            <textarea id="ratio-contact-brief" name="project_brief" rows="4" placeholder="What would you like us to design or build?" required></textarea>
          </div>
          <button type="submit">Submit <span aria-hidden="true">↗</span></button>
        </form>
      </div>
    </div>
    <div class="ratio-footer__bottom">
      <a class="ratio-footer__brand" href="${homeHref}">Lyman Studio</a>
      <nav aria-label="Footer navigation">
        ${showProjects ? `<a href="${projectsHref}">Projects</a>` : ''}
        <a href="${aboutHref}">About</a>
        <a href="${blogHref}">Blog</a>
        <a href="${contactHref}">Contact</a>
      </nav>
      <div class="ratio-footer__legal"><a href="${privacyHref}">Privacy Policy</a><a href="${termsHref}">Terms &amp; Conditions</a><span>© 2026 Lyman Studio</span></div>
    </div>
  </footer><script>(()=>{
    const host=document.querySelector('[data-footer-magnet-lines]');
    if(!host)return;
    const load=()=>{if(document.querySelector('script[data-footer-effects]'))return;const css=document.createElement('link');css.rel='stylesheet';css.href=${JSON.stringify(footerEffectsSrc.replace(/\.js$/, '.css'))};document.head.append(css);const script=document.createElement('script');script.src=${JSON.stringify(footerEffectsSrc)};script.dataset.footerEffects='';document.body.append(script)};
    if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){observer.disconnect();load()}},{rootMargin:'250px'});observer.observe(host)}else load();
  })()</script>`;
}

export const closingFooterStyles = `
  #main .framer-199pwpa-container { display: none !important; }
  .ratio-footer, .ratio-footer * { box-sizing: border-box; }
  .ratio-footer {
    --footer-bg: #101010;
    --footer-ink: #f3f0e9;
    --footer-lime: #c8ff31;
    /* The original fixed nav and bottom blur use lower layers. */
    position: relative;
    z-index: 1001;
    width: 100%;
    padding: 0 clamp(20px, 2.85vw, 48px);
    background: var(--footer-bg);
    color: var(--footer-ink);
  }
  .ratio-footer__contact {
    min-height: max(800px, 100dvh);
    padding: clamp(74px, 8vh, 108px) 0 clamp(32px, 4vh, 48px);
    display: grid;
    grid-template-columns: minmax(0, .9fr) minmax(0, 1fr);
    gap: clamp(32px, 5vw, 96px);
    align-items: stretch;
  }
  .ratio-footer__pitch {
    position: relative;
    isolation: isolate;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .ratio-footer__magnet { position: absolute; inset: 36px -8px 46px; z-index: 0; opacity: .2; pointer-events: none; overflow: hidden; }
  .ratio-footer__magnet .magnetLines-container { width: 100%; height: 100%; }
  .ratio-footer__eyebrow, .ratio-footer__headline, .ratio-footer__contact-line { position: relative; z-index: 1; }
  .ratio-footer__eyebrow {
    margin: 0;
    color: var(--footer-lime);
    font: 500 12px/1.2 var(--font-mono) !important;
    letter-spacing: .02em !important;
    text-transform: uppercase;
  }
  .ratio-footer .ratio-footer__headline {
    margin: 36px 0;
    color: var(--footer-ink);
    font-family: var(--font-main) !important;
    font-size: clamp(62px, 7.6vw, 120px) !important;
    font-weight: 700 !important;
    letter-spacing: -.105em !important;
    line-height: .84 !important;
  }
  .ratio-footer__headline > span { display: block; white-space: nowrap; font: inherit !important; letter-spacing: inherit !important; line-height: inherit !important; }
  .ratio-footer__headline > span:last-child { color: var(--footer-lime); }
  .ratio-footer__contact-line {
    width: 100%;
    padding: 0;
  }
  .ratio-footer__email {
    display: inline-flex;
    align-items: baseline;
    gap: .35em;
    color: var(--footer-lime);
    font: 400 clamp(18px, 1.95vw, 24px)/1.2 var(--font-mono) !important;
    letter-spacing: -.055em !important;
    text-decoration: none;
    overflow-wrap: anywhere;
  }
  .ratio-footer__email span { display: inline-block; font: inherit !important; transition: transform .3s ease; }
  .ratio-footer__email:hover span { transform: translate(3px, -3px); }
  .ratio-footer a:focus-visible, .ratio-footer button:focus-visible,
  .ratio-footer input:focus-visible, .ratio-footer select:focus-visible,
  .ratio-footer textarea:focus-visible {
    outline: 2px solid var(--footer-lime);
    outline-offset: 2px;
  }
  .ratio-footer__form-column { min-width: 0; padding-top: clamp(40px, 8vw, 120px); }
  .ratio-footer__form-column h3 {
    margin: 0;
    color: var(--footer-ink);
    font: 600 clamp(38px, 3.6vw, 56px)/.95 var(--font-main) !important;
    letter-spacing: -.08em !important;
  }
  .ratio-footer__form {
    display: grid;
    gap: 11px;
    margin-top: 27px;
    min-width: 0;
  }
  .ratio-footer__honeypot { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .ratio-footer__field { display: flex; flex-direction: column; min-width: 0; gap: 6px; }
  .ratio-footer__field label {
    color: #c3c1bb;
    font: 400 11px/1.2 var(--font-mono) !important;
    letter-spacing: .02em !important;
    text-transform: uppercase;
  }
  .ratio-footer__field :is(input, select, textarea) {
    width: 100%;
    min-height: 44px;
    margin: 0;
    padding: 10px 14px;
    color: var(--footer-ink);
    background: #1d1d1d;
    border: 1px solid #595959;
    border-radius: 10px;
    color-scheme: dark;
    font: 400 15px/1.3 var(--font-main) !important;
    letter-spacing: -.02em;
  }
  .ratio-footer__field :is(input, textarea)::placeholder { color: #aaa9a5; opacity: 1; }
  .ratio-footer__field textarea { min-height: 98px; resize: vertical; }
  .ratio-footer__field select { cursor: pointer; }
  .ratio-footer__field option { background: #1d1d1d; color: var(--footer-ink); }
  .ratio-footer__form [role="status"] {
    margin: 2px 0 0;
    color: var(--footer-ink);
    font: 400 14px/1.4 var(--font-main) !important;
  }
  .ratio-footer__form button {
    position: relative;
    width: 100%;
    min-height: 54px;
    margin-top: 5px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #101010;
    background: var(--footer-lime);
    border: 0;
    border-radius: 999px;
    cursor: pointer;
    font: 500 14px/1.2 var(--font-mono) !important;
    letter-spacing: .02em !important;
    text-transform: uppercase;
    transition: background .25s ease, transform .25s ease;
  }
  .ratio-footer__form button span { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font: inherit !important; }
  .ratio-footer__form button:hover { background: var(--footer-ink); transform: translateY(-2px); }
  .ratio-footer__form button:active { transform: translateY(0); }
  .ratio-footer__bottom {
    min-height: 84px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    border-top: 1px solid #555;
    font: 400 12px/1.4 var(--font-mono) !important;
    letter-spacing: .02em !important;
    text-transform: uppercase;
  }
  .ratio-footer__bottom nav { display: flex; flex-wrap: wrap; gap: clamp(16px, 2vw, 32px); }
  .ratio-footer__bottom a { color: var(--footer-ink); text-decoration: none; font: inherit !important; }
  .ratio-footer__bottom a:hover { color: var(--footer-lime); }
  .ratio-footer__legal { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 12px 20px; color: #aaa9a5; }
  .ratio-footer__legal a { white-space: nowrap; }
  .ratio-footer__legal span { white-space: nowrap; }
  @media (max-width: 800px) {
    .ratio-footer__contact { min-height: 0; grid-template-columns: 1fr; gap: 72px; padding: 104px 0 60px; }
    .ratio-footer__pitch { min-height: 420px; }
    .ratio-footer__form-column { padding-top: 0; }
    .ratio-footer .ratio-footer__headline { font-size: clamp(52px, 11.5vw, 86px) !important; }
    .ratio-footer__form-column h3 { font-size: clamp(40px, 8vw, 54px) !important; }
    .ratio-footer__email { font-size: clamp(18px, 4.6vw, 23px) !important; }
  }
  @media (max-width: 700px) {
    .ratio-footer__pitch { min-height: 390px; }
    .ratio-footer .ratio-footer__headline { font-size: clamp(52px, 14vw, 72px) !important; }
    .ratio-footer__bottom { align-items: flex-start; flex-direction: column; gap: 24px; padding: 30px 0 38px; }
    .ratio-footer__legal { justify-content: flex-start; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ratio-footer__email span, .ratio-footer__form button { transition: none; }
  }
`;
