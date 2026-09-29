const questions = [
  {
    question: 'What does Ratio Design do?',
    answer: 'We are a Bangalore-based design agency that designs, builds, and deploys apps, websites, and other digital experiences.',
  },
  {
    question: 'Where are you based?',
    answer: 'Ratio Design is based in Bangalore, India.',
  },
  {
    question: 'Can you take a project to launch?',
    answer: 'Yes. We can take a project from design through development and deployment, so the finished experience is ready to use.',
  },
  {
    question: 'Do you build apps and websites?',
    answer: 'Yes. We design and build both apps and websites, shaping the work around what your project needs.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Timing depends on the scope. Once we understand what you want to build, we can map out the work and a realistic launch plan.',
  },
  {
    question: 'Do you offer support after launch?',
    answer: 'If you need updates or ongoing help after deployment, we can discuss that as part of the project scope.',
  },
  {
    question: 'How do we get started?',
    answer: 'Tell us about your idea, what you need designed or built, and where you are in the process. We can take it from there.',
  },
];

export const faqMarkup = `<section class="ratio-faq" data-framer-name="Ratio FAQ" aria-labelledby="ratio-faq-title">
  <div class="ratio-faq__inner">
    <header class="ratio-faq__heading">
      <p class="ratio-faq__eyebrow">FAQ.</p>
      <h2 id="ratio-faq-title">Good<br>questions<br><span class="ratio-faq__muted">deserve<br>clarity.</span></h2>
    </header>
    <div class="ratio-faq__list">
      ${questions.map(({ question, answer }) => `<details class="ratio-faq__item" name="ratio-faq">
        <summary><span>${question}</span><span class="ratio-faq__plus" aria-hidden="true"></span></summary>
        <div class="ratio-faq__answer"><p>${answer}</p></div>
      </details>`).join('')}
    </div>
  </div>
</section>`;

export const faqStyles = `
  section[data-framer-name="FAQ"] { display: none !important; }
  .ratio-faq, .ratio-faq * { box-sizing: border-box; }
  .ratio-faq { width: 100%; padding: 42px max(32px, calc((100vw - 1520px) / 2)) 52px; background: #f3f0e9; color: #101010; }
  .ratio-faq__inner { width: 100%; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; }
  .ratio-faq__eyebrow { margin: 1px 0 78px; color: #101010; font: 400 11px/1.2 "DM Mono", monospace !important; letter-spacing: .02em !important; text-transform: uppercase; }
  .ratio-faq__heading h2 { margin: 0; color: #101010; font: 600 70.08px/.9 "Space Grotesk", sans-serif !important; letter-spacing: -.08em !important; }
  .ratio-faq__heading h2 .ratio-faq__muted { color: #8e8b84; font-family: "Space Grotesk", sans-serif !important; }
  .ratio-faq__list { min-width: 0; }
  .ratio-faq__item { margin: 0; border-top: 1px solid #c5c3bd; }
  .ratio-faq__item:last-child { border-bottom: 1px solid #c5c3bd; }
  .ratio-faq__item summary { min-height: 68px; padding: 0; display: flex; align-items: center; justify-content: space-between; gap: 12px; list-style: none; cursor: pointer; color: #101010; font: 400 18px/1.25 "Space Grotesk", sans-serif !important; letter-spacing: -.025em; }
  .ratio-faq__item summary span { font-family: "Space Grotesk", sans-serif !important; }
  .ratio-faq__item summary::-webkit-details-marker { display: none; }
  .ratio-faq__item summary:focus-visible { outline: 2px solid #101010; outline-offset: -3px; }
  .ratio-faq__plus { flex: none; width: 20px; height: 20px; position: relative; }
  .ratio-faq__plus::before, .ratio-faq__plus::after { content: ""; position: absolute; background: #101010; }
  .ratio-faq__plus::before { width: 14px; height: 2px; left: 3px; top: 9px; }
  .ratio-faq__plus::after { width: 2px; height: 14px; left: 9px; top: 3px; transition: transform .3s ease; }
  .ratio-faq__item[open] .ratio-faq__plus::after { transform: scaleY(0); }
  .ratio-faq__answer { padding: 0 34px 20px 0; color: #5a5955; font: 400 16px/1.5 "Space Grotesk", sans-serif !important; }
  .ratio-faq__answer p { margin: 0; font-family: "Space Grotesk", sans-serif !important; }
  @media (prefers-reduced-motion: no-preference) { .ratio-faq__item[open] .ratio-faq__answer { animation: ratio-faq-reveal .32s ease both; } }
  @keyframes ratio-faq-reveal { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
  @media (max-width: 809px) {
    .ratio-faq { padding-left: 16px; padding-right: 16px; }
    .ratio-faq__heading h2 { font-size: 48px !important; }
  }
  @media (max-width: 700px) {
    .ratio-faq { padding: 36px 16px 64px; }
    .ratio-faq__inner { display: block; }
    .ratio-faq__eyebrow { margin-bottom: 42px; }
    .ratio-faq__list { margin-top: 54px; }
    .ratio-faq__item summary { min-height: 68px; font-size: 16px !important; }
  }
`;

export function injectFaqMarkup(html) {
  const marker = html.indexOf('data-framer-name="FAQ"');
  if (marker < 0) throw new Error('FAQ section not found in homepage HTML');
  const start = html.lastIndexOf('<section', marker);
  const sectionTag = /<\/?section\b[^>]*>/gi;
  sectionTag.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = sectionTag.exec(html))) {
    depth += match[0].startsWith('</') ? -1 : 1;
    if (depth === 0) {
      const end = sectionTag.lastIndex;
      return html.slice(0, end) + faqMarkup + html.slice(end);
    }
  }
  throw new Error('FAQ section closing tag not found');
}
