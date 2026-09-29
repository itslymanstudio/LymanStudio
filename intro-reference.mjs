// Typography and color treatment sampled from the supplied Intro screenshot.
export const introReferenceStyles = `
  /* Keep the entire fixed-height desktop carousel above the opaque Intro. */
  @media (min-width: 1200px) {
    header[data-framer-name="Header"] {
      min-height: max(100dvh, 1005px) !important;
    }
  }
  section[data-framer-name="Intro"] {
    background: #f3f0e9 !important;
    padding: 54px max(27px, 3.5vw) 104px !important;
  }
  section[data-framer-name="Intro"] > [data-framer-name="Container"] {
    width: 100% !important;
    max-width: none !important;
  }
  section[data-framer-name="Intro"] [data-framer-name="Selected Works"] {
    width: 100% !important;
    max-width: none !important;
  }
  section[data-framer-name="Intro"] [data-framer-name="Selected Works"]::before {
    content: "( 001 ) ABOUT";
    display: block;
    margin: 0 0 82px;
    color: #101010;
    font: 400 11px/1.2 var(--font-mono) !important;
    letter-spacing: .02em;
  }
  section[data-framer-name="Intro"] h3 {
    --framer-text-alignment: left !important;
    width: min(100%, 62.2vw) !important;
    max-width: 1150px !important;
    margin: 0 !important;
    font-family: var(--font-main) !important;
    font-size: clamp(52px, 5.65vw, 108px) !important;
    font-weight: 600 !important;
    line-height: .96 !important;
    letter-spacing: -.075em !important;
    text-align: left !important;
    color: #101010 !important;
  }
  section[data-framer-name="Intro"] h3 span {
    font-family: var(--font-main) !important;
    color: #101010 !important;
  }
  section[data-framer-name="Intro"] h3 span:nth-of-type(8),
  section[data-framer-name="Intro"] h3 span:nth-of-type(9),
  section[data-framer-name="Intro"] h3 span:nth-of-type(10),
  section[data-framer-name="Intro"] h3 span:nth-of-type(11) {
    color: #8e8b84 !important;
  }
  @media (max-width: 809px) {
    section[data-framer-name="Intro"] { padding: 48px 20px 72px !important; }
    section[data-framer-name="Intro"] [data-framer-name="Selected Works"]::before { margin-bottom: 54px; }
    section[data-framer-name="Intro"] h3 {
      width: 100% !important;
      font-size: clamp(34px, 8.2vw, 58px) !important;
      letter-spacing: -.08em !important;
      line-height: .9 !important;
    }
  }
`;
