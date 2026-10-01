import { showProjects } from './site-features.mjs';

// One warm-neutral canvas across the site; media and artwork retain their own colors.
export const siteCanvasStyles = `
  ${showProjects ? '' : '#main [data-framer-name="Portfolio"], #main [data-framer-name="Works"], #main a[href*="projects"] { display: none !important; }'}
  :root { --ratio-paper: #f3f0e9; }
  html, body, #main, #main .framer-JN024 { background-color: var(--ratio-paper) !important; }
  /* Trim oversized vertical padding from the original page sections while
     preserving the layout and internal spacing of their content. */
  #main .framer-2gd83s { padding-top: clamp(72px, 8vw, 96px) !important; padding-bottom: clamp(64px, 7vw, 88px) !important; }
  #main .framer-jx0221, #main .framer-1ju0swc { padding-bottom: clamp(72px, 7vw, 96px) !important; }
  #main .framer-l2smid { padding-top: clamp(24px, 3vw, 36px) !important; padding-bottom: clamp(32px, 4vw, 42px) !important; }
  #main .ratio-studio-metrics { min-height: min(760px, 86svh) !important; }
  #main .ratio-studio-metrics__inner { padding-top: clamp(82px, 14vh, 145px) !important; padding-bottom: 64px !important; gap: 82px !important; }
  @media (max-width: 809px) {
    #main .framer-2gd83s { padding-top: 72px !important; padding-bottom: 64px !important; }
    #main .framer-jx0221, #main .framer-1ju0swc { padding-bottom: 68px !important; }
    #main .ratio-studio-metrics { min-height: 0 !important; }
    #main .ratio-studio-metrics__inner { padding-top: 72px !important; padding-bottom: 52px !important; gap: 64px !important; }
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
