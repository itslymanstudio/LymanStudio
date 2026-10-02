// Light motion for the existing hero; media sources are swapped separately.
export const heroEffectsStyles = `
  html[data-ratio-route="/"] header[data-framer-name="Header"] [data-framer-name="Timer"] { display: none !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] [data-framer-name="Horizontal"] { display: none !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] > [data-framer-name="Content"] { padding-top: clamp(20px, 6svh, 64px) !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] > [data-framer-name="Content"] > [data-framer-name="Header"] { padding-top: clamp(4px, 1.5svh, 12px) !important; margin-top: clamp(30px, 5svh, 40px) !important; }
  @media (max-height: 500px) and (orientation: portrait) { html[data-ratio-route="/"] header[data-framer-name="Header"] > [data-framer-name="Content"] > [data-framer-name="Header"] { margin-top: clamp(34px, 10vh, 44px) !important; } }
  html[data-ratio-route="/"] header[data-framer-name="Header"] div:has(> a[data-framer-name="Black Full"]) { container-type: inline-size; width: 100% !important; height: auto !important; max-width: none !important; min-width: 0 !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"] {
    display: flex !important;
    width: 100% !important;
    height: 1em !important;
    min-height: 0 !important;
    align-self: center !important;
    position: relative !important;
    z-index: 2;
    top: calc(-1 * clamp(0px, calc(6vh - 23px), 20px)) !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
    white-space: nowrap;
    color: #101010 !important;
    text-decoration: none !important;
    font-family: var(--font-main, "Space Grotesk", sans-serif) !important;
    font-size: min(152px, 13vw, 12vh) !important;
    font-weight: 500 !important;
    letter-spacing: -.085em !important;
    line-height: 1 !important;
  }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"] > [data-framer-name="Full"] { display: none !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"]::before { content: "Lyman Studio"; display: block; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"]::after { content: none; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] .framer-1dih5dt { display: none !important; }
  @supports (font-size: 1cqw) {
    html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"] { font-size: min(152px, 14cqw, 12svh) !important; }
  }
  @supports (top: 1svh) {
    html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"] { top: calc(-1 * clamp(0px, calc(6svh - 23px), 20px)) !important; }
  }
  html[data-ratio-route="/"] header[data-framer-name="Header"] { --hero-aurora-height: clamp(430px, 54vh, 620px); --hero-aurora-lift: 0px; }
  @supports (height: 1svh) { html[data-ratio-route="/"] header[data-framer-name="Header"] { --hero-aurora-height: clamp(430px, 54svh, 620px); } }
  @media (max-width: 600px), (max-width: 900px) and (max-height: 500px) { html[data-ratio-route="/"] header[data-framer-name="Header"] { --hero-aurora-lift: clamp(80px, 12vh, 120px); } }
  @supports (height: 1svh) { @media (max-width: 600px), (max-width: 900px) and (max-height: 500px) { html[data-ratio-route="/"] header[data-framer-name="Header"] { --hero-aurora-lift: clamp(80px, 12svh, 120px); } } }
  html[data-ratio-route="/"] header[data-framer-name="Header"].ratio-hero-aurora-host { position: relative; isolation: isolate; justify-content: flex-start !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"].ratio-hero-aurora-host > [data-framer-name="Content"] { position: static !important; flex: 0 0 auto !important; height: auto !important; min-height: 0 !important; gap: 0 !important; z-index: 1; }
  html[data-ratio-route="/"] body:not(.aurora-nav-scrolled) .staggered-menu-header { background: transparent; -webkit-backdrop-filter: none; backdrop-filter: none; }
  html[data-ratio-route="/"] body:not(.aurora-nav-scrolled) .staggered-menu-header::before { content: ""; position: absolute; inset: 0 0 -24px; z-index: -1; pointer-events: none; background: linear-gradient(to bottom, rgb(243 240 233 / 22%), rgb(243 240 233 / 8%) 62%, transparent); -webkit-backdrop-filter: blur(2px) saturate(110%); backdrop-filter: blur(2px) saturate(110%); -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent); mask-image: linear-gradient(to bottom, #000 55%, transparent); }
  .ratio-hero-aurora { position: absolute; inset: 0 0 auto; top: calc(-1 * var(--hero-aurora-lift)); height: var(--hero-aurora-height); z-index: 0; overflow: hidden; pointer-events: none; background: #f3f0e9; }
  .ratio-hero-aurora__bars { position: absolute; inset: 0; display: flex; align-items: flex-start; }
  .ratio-hero-aurora__slot { flex: 1 1 0; min-width: 0; height: 100%; display: flex; align-items: flex-start; padding: 0; }
  .ratio-hero-aurora__bar { width: 100%; height: var(--aurora-height); border-radius: 0 0 9999px 9999px; background: linear-gradient(to bottom, var(--aurora-color-0, #ebf7d3) 0%, var(--aurora-color-1, #d5f391) 25%, var(--aurora-color-2, #b9ef34) 50%, var(--aurora-color-3, #83b715) 75%, rgb(243 240 233 / 0%) 100%); opacity: .9; }
  .ratio-hero-aurora__shade { position: absolute; inset: 0; background: radial-gradient(ellipse 90% 80% at 50% 0%, transparent 40%, rgb(243 240 233 / 66%) 100%); }
  @media (prefers-reduced-motion: no-preference) {
    html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"]::before,
    html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"]::after {
      animation: ratio-hero-wordmark-in 1s cubic-bezier(.22,1,.36,1) both;
    }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item {
      animation: ratio-hero-card-in .85s cubic-bezier(.22,1,.36,1) both;
      animation-delay: var(--ratio-hero-delay, 0ms);
      transform-origin: center bottom;
    }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item:nth-child(8n + 2) { --ratio-hero-delay: 55ms; }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item:nth-child(8n + 3) { --ratio-hero-delay: 110ms; }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item:nth-child(8n + 4) { --ratio-hero-delay: 165ms; }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item:nth-child(8n + 5) { --ratio-hero-delay: 220ms; }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item:nth-child(8n + 6) { --ratio-hero-delay: 275ms; }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item:nth-child(8n + 7) { --ratio-hero-delay: 330ms; }
    html[data-ratio-route="/"] [data-framer-name="Header"] [data-framer-name="Carousel"] li.ticker-item:nth-child(8n + 8) { --ratio-hero-delay: 385ms; }
    @keyframes ratio-hero-wordmark-in {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ratio-hero-card-in {
      from { opacity: 0; transform: translateY(36px) rotate(2deg); }
      to { opacity: 1; transform: translateY(0) rotate(0); }
    }
  }
`;
