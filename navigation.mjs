export const navigationStyles = `
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] [data-framer-name="Number"],
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] [data-framer-name="Number"] * {
    font-family: var(--font-mono) !important;
    font-size: 11px !important;
    font-weight: 400 !important;
    letter-spacing: .01em !important;
    line-height: 1.2 !important;
    text-transform: uppercase !important;
  }
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] :is(h2, h3),
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] :is(h2, h3) * {
    margin: 0 !important;
    color: #101010 !important;
    font-family: var(--font-main) !important;
    font-size: clamp(44px, 4.45vw, 64px) !important;
    font-weight: 500 !important;
    letter-spacing: -.075em !important;
    line-height: 1 !important;
    text-transform: none !important;
  }
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] a:is(:hover, :focus-visible) :is(h2, h3) {
    color: #6f716b !important;
  }
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] a:focus-visible,
  #main [data-framer-name="NavBar"] [data-framer-name="Hamburger"]:focus-visible {
    outline: 2px solid #101010 !important;
    outline-offset: 4px !important;
  }
  #main [data-framer-name="NavBar"] [data-framer-name="Open"] [data-framer-name="Bottom"] h4 {
    font-family: var(--font-main) !important;
    font-size: 32px !important;
    font-weight: 500 !important;
    letter-spacing: -.045em !important;
    line-height: 1.15 !important;
    text-transform: none !important;
  }
  @media (max-width: 809.98px) {
    #main [data-framer-name="NavBar"] [data-framer-name="Open"] :is(h2, h3),
    #main [data-framer-name="NavBar"] [data-framer-name="Open"] :is(h2, h3) * {
      font-size: clamp(40px, 10.5vw, 60px) !important;
    }
  }
`;
