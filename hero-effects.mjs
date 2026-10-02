// Light motion for the existing hero; media sources are swapped separately.
export const heroEffectsStyles = `
  html[data-ratio-route="/"] header[data-framer-name="Header"] [data-framer-name="Timer"] { display: none !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] [data-framer-name="Horizontal"] { display: none !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"] {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
    white-space: nowrap;
    color: #101010 !important;
    text-decoration: none !important;
    font-family: var(--font-main, "Space Grotesk", sans-serif) !important;
    font-size: clamp(58px, 9.2vw, 136px) !important;
    font-weight: 500 !important;
    letter-spacing: -.085em !important;
    line-height: 1 !important;
  }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"] > [data-framer-name="Full"] { display: none !important; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"]::before { content: "Lyman Studio"; display: block; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"]::after { content: none; }
  html[data-ratio-route="/"] header[data-framer-name="Header"] .framer-1dih5dt { display: none !important; }
  @media (max-width: 809.98px) {
    html[data-ratio-route="/"] header[data-framer-name="Header"] a[data-framer-name="Black Full"] { font-size: clamp(48px, 14.76vw, 58px) !important; letter-spacing: -.09em !important; }
  }
  html[data-ratio-route="/"] header[data-framer-name="Header"].ratio-hero-aurora-host { position: relative; isolation: isolate; }
  html[data-ratio-route="/"] header[data-framer-name="Header"].ratio-hero-aurora-host > [data-framer-name="Content"] { position: relative; z-index: 1; }
  html[data-ratio-route="/"] body:not(.aurora-nav-scrolled) .staggered-menu-header { background: transparent; -webkit-backdrop-filter: none; backdrop-filter: none; }
  html[data-ratio-route="/"] body:not(.aurora-nav-scrolled) .staggered-menu-header::before { content: ""; position: absolute; inset: 0 0 -24px; z-index: -1; pointer-events: none; background: linear-gradient(to bottom, rgb(243 240 233 / 22%), rgb(243 240 233 / 8%) 62%, transparent); -webkit-backdrop-filter: blur(2px) saturate(110%); backdrop-filter: blur(2px) saturate(110%); -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent); mask-image: linear-gradient(to bottom, #000 55%, transparent); }
  .ratio-hero-aurora { position: absolute; inset: 0 0 auto; height: clamp(430px, 54vh, 620px); z-index: 0; overflow: hidden; pointer-events: none; background: #f3f0e9; }
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
