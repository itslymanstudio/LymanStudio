// Light motion for the existing hero; media sources are swapped separately.
export const heroEffectsStyles = `
  @media (prefers-reduced-motion: no-preference) {
    html[data-ratio-route="/"] [data-framer-name="Header"] img[src*="ratio-wordmark.svg"] {
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
