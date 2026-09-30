// Replaces the homepage's video-led metrics block with an editorial studio statement.
// The figures are illustrative until Lyman Studio supplies verified results.
export const studioMetricsMarkup = `<section class="ratio-studio-metrics" aria-labelledby="ratio-studio-metrics-title">
  <div class="ratio-studio-metrics__inner">
    <h2 id="ratio-studio-metrics-title"><span class="ratio-motion-word">Lyman</span> <span class="ratio-motion-word">Studio</span> <span class="ratio-motion-word">is</span> <span class="ratio-motion-word">a</span> <span class="ratio-motion-word">creative</span><br class="ratio-studio-metrics__desktop-break"> <span class="ratio-motion-word">studio</span> <span class="ratio-motion-word">shaping</span> <span class="ratio-studio-metrics__muted"><span class="ratio-motion-word">bold</span> <span class="ratio-motion-word">brands</span></span> <span class="ratio-motion-word">and</span> <span class="ratio-motion-word">daring</span> <span class="ratio-motion-word">ideas.</span></h2>
    <div class="ratio-studio-metrics__grid" aria-label="Illustrative studio figures">
      <div class="ratio-studio-metrics__stat"><p class="ratio-studio-metrics__value" data-target="12" data-suffix="+">12+</p><p class="ratio-studio-metrics__caption">APPS &amp; WEBSITES<br>LAUNCHED</p></div>
      <div class="ratio-studio-metrics__stat"><p class="ratio-studio-metrics__value" data-target="8" data-suffix="+">8+</p><p class="ratio-studio-metrics__caption">BRANDS &amp; TEAMS<br>PARTNERED WITH</p></div>
      <div class="ratio-studio-metrics__stat"><p class="ratio-studio-metrics__value" data-target="20" data-suffix="+">20+</p><p class="ratio-studio-metrics__caption">PROJECTS DESIGNED,<br>BUILT &amp; DEPLOYED</p></div>
      <div class="ratio-studio-metrics__stat"><p class="ratio-studio-metrics__value" data-target="94" data-suffix="%">94%</p><p class="ratio-studio-metrics__caption">CLIENT SATISFACTION<br>RATE</p></div>
    </div>
    <p class="ratio-studio-metrics__note">ILLUSTRATIVE FIGURES · REPLACE WITH VERIFIED RESULTS</p>
  </div>
</section>`;

export const studioMetricsStyles = `
  .framer-1pp2tz1[data-framer-name="Metrics"] { display: none !important; }
  .ratio-studio-metrics, .ratio-studio-metrics * { box-sizing: border-box; }
  .ratio-studio-metrics { width: 100%; min-height: min(900px, 100svh); position: relative; background: #f3f0e9; color: #101010; }
  .ratio-studio-metrics__inner { min-height: inherit; padding: clamp(110px, 22vh, 215px) 3.05vw 90px; display: flex; flex-direction: column; justify-content: space-between; gap: 120px; }
  .ratio-studio-metrics h2 { max-width: 1150px; margin: 0; font: 600 clamp(60px, 5.85vw, 110px)/.94 var(--font-main) !important; letter-spacing: -.08em !important; }
  .ratio-studio-metrics h2 sup { display: inline-block; font: inherit; font-size: .47em; line-height: 0; letter-spacing: -.05em; vertical-align: super; }
  .ratio-studio-metrics h2 .ratio-studio-metrics__muted { color: #8e8b84; font-family: var(--font-main) !important; }
  .ratio-studio-metrics .ratio-motion-word { display: inline-block; white-space: nowrap; }
  .ratio-studio-metrics__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 4.1vw; }
  .ratio-studio-metrics__stat { border-top: 1px solid #c7c4bd; padding-top: 13px; min-width: 0; }
  .ratio-studio-metrics__value { margin: 0 0 10px; font: 500 clamp(52px, 4.75vw, 88px)/.95 var(--font-main) !important; letter-spacing: -.085em !important; font-variant-numeric: tabular-nums; }
  .ratio-studio-metrics__caption { margin: 0; color: #8e8b84; font: 400 11px/1.25 var(--font-mono) !important; letter-spacing: .015em !important; }
  .ratio-studio-metrics__note { position: absolute; right: 3.05vw; bottom: 24px; margin: 0; color: #77746e; font: 400 10px/1.3 var(--font-mono) !important; letter-spacing: .015em !important; text-align: right; }
  @media (max-width: 809px) {
    .ratio-studio-metrics { min-height: auto; }
    .ratio-studio-metrics__inner { min-height: 0; padding: 100px 20px 70px; gap: 105px; }
    .ratio-studio-metrics h2 { font-size: clamp(45px, 8.5vw, 70px) !important; line-height: .96 !important; }
    .ratio-studio-metrics__desktop-break { display: none; }
    .ratio-studio-metrics__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 22px; row-gap: 52px; }
    .ratio-studio-metrics__value { font-size: clamp(48px, 12vw, 74px) !important; }
    .ratio-studio-metrics__note { right: 20px; bottom: 22px; font-size: 9px !important; }
  }
  @media (max-width: 420px) {
    .ratio-studio-metrics__inner { padding-top: 88px; }
    .ratio-studio-metrics h2 { font-size: 11.2vw !important; }
    .ratio-studio-metrics__caption { font-size: 9px !important; }
  }
`;

export function replaceMetricsSection(html) {
  const marker = html.indexOf('data-framer-name="Metrics"');
  if (marker < 0) throw new Error('Homepage Metrics section not found');
  const start = html.lastIndexOf('<section', marker);
  const sectionTag = /<\/?section\b[^>]*>/gi;
  sectionTag.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = sectionTag.exec(html))) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) return html.slice(0, start) + studioMetricsMarkup + html.slice(sectionTag.lastIndex);
  }
  throw new Error('Homepage Metrics section closing tag not found');
}
