import { showProjects } from './site-features.mjs';

// One warm-neutral canvas across the site; media and artwork retain their own colors.
export const siteCanvasStyles = `
  ${showProjects ? '' : '#main [data-framer-name="Portfolio"], #main [data-framer-name="Works"], #main a[href*="projects"] { display: none !important; }'}
  :root { --ratio-paper: #f3f0e9; --ratio-section-space: clamp(36px, 4vw, 56px); --ratio-content-gap: clamp(28px, 3vw, 44px); }
  html, body, #main, #main .framer-JN024 { background-color: var(--ratio-paper) !important; }
  /* Content determines section height; shared spacing keeps adjacent sections compact. */
  #main .framer-2gd83s { padding-top: var(--ratio-section-space) !important; padding-bottom: var(--ratio-section-space) !important; }
  #main .framer-2gd83s [data-framer-name="Selected Works"]::before { margin-bottom: var(--ratio-content-gap) !important; }
  #main .framer-2gd83s .framer-1r7bp32 { margin-top: clamp(36px, 4vw, 56px) !important; }
  #main .framer-jx0221, #main .framer-1ju0swc { padding-bottom: var(--ratio-section-space) !important; }
  #main .framer-l2smid { padding-top: clamp(24px, 3vw, 32px) !important; padding-bottom: 36px !important; }
  #main :is(.ratio-services, .meet-devs, .ratio-process) { padding-top: var(--ratio-section-space) !important; padding-bottom: var(--ratio-section-space) !important; }
  #main .meet-devs__intro { margin-bottom: 36px; }
  #main .ratio-faq { padding-top: 32px; padding-bottom: 36px; }
  #main .ratio-faq__eyebrow { margin-bottom: 40px; }
  #main .ratio-process__eyebrow { margin-bottom: 36px; }
  #main .ratio-studio-metrics { min-height: 0 !important; }
  #main .ratio-studio-metrics__inner { min-height: 0 !important; justify-content: flex-start; padding-top: var(--ratio-section-space) !important; padding-bottom: 56px !important; gap: clamp(36px, 4vw, 56px) !important; }
  html[data-ratio-route="/"] .ratio-footer__contact { min-height: 0; padding: var(--ratio-section-space) 0 36px; }
  html[data-ratio-route="/"] .ratio-footer__pitch { min-height: 0; }
  html[data-ratio-route="/"] .ratio-footer__form-column { padding-top: 32px; }
  @media (max-width: 900px) {
    #main .ratio-process__inner { gap: 44px; }
  }
  @media (max-width: 809px) {
    #main .framer-2gd83s { padding-top: 32px !important; padding-bottom: 36px !important; }
    #main .framer-2gd83s .framer-1r7bp32 { margin-top: 40px !important; }
    #main .framer-jx0221, #main .framer-1ju0swc { padding-bottom: 40px !important; }
    #main :is(.ratio-services, .meet-devs, .ratio-process) { padding-top: 36px !important; padding-bottom: 40px !important; }
    #main .meet-devs__intro { margin-bottom: 28px; }
    #main .ratio-faq__eyebrow { margin-bottom: 28px; }
    #main .ratio-faq__list { margin-top: 32px; }
    #main .ratio-process__inner { gap: 36px; }
    #main .ratio-process__eyebrow { margin-bottom: 28px; }
    #main .ratio-studio-metrics__inner { padding-top: 36px !important; padding-bottom: 48px !important; gap: 36px !important; }
  }
  @media (max-width: 800px) {
    html[data-ratio-route="/"] .ratio-footer__contact { padding-top: 40px; padding-bottom: 32px; gap: 36px; }
    html[data-ratio-route="/"] .ratio-footer__form-column { padding-top: 0; }
    html[data-ratio-route="/"] .ratio-footer__pitch { justify-content: flex-start; }
    html[data-ratio-route="/"] .ratio-footer__headline { margin-top: 28px; margin-bottom: 28px; }
  }
  #main [data-framer-name="Meet the Devs"],
  #main [data-framer-name="Blog Home Desktop"] { background-color: var(--ratio-paper) !important; }
  #main [data-framer-name="NavBar"] {
    background-color: transparent !important;
  }
  #main [data-framer-name="NavBar"] nav {
    background-color: rgb(243 240 233 / 70%) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    backdrop-filter: blur(10px) !important;
  }
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] {
    background-color: transparent !important;
  }
  #main [data-framer-name="Portfolio"] .framer-15je2ue-container:has(> a:is([href*="zypher"], [href*="grotesks"], [href*="clonify"], [href*="polltree"])),
  #main [data-framer-name="Works"] .framer-1halgdj-container:has(> a:is([href*="zypher"], [href*="grotesks"], [href*="clonify"], [href*="polltree"])) {
    display: none !important;
  }
  html[data-ratio-route="/about"] #main :is([data-framer-name="Section"], [data-framer-name="Left"], [data-framer-name="Content"], [data-framer-name="Desktop"]) { background-color: var(--ratio-paper) !important; }
  html[data-ratio-route="/contact"] #main :is([data-framer-name="Header"], [data-framer-name="Form"], [data-framer-name="Wrapper"]) { background-color: var(--ratio-paper) !important; }
`;
