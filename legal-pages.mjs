import { closingFooterMarkup, closingFooterStyles } from './closing-footer.mjs';
import { spaceGroteskStyles } from './typography.mjs';

const updated = '27 September 2026';
const email = 'itslymanstudio@gmail.com';

const policies = {
  privacy: {
    title: 'Privacy Policy',
    lead: 'A clear account of what this website receives, how we use it, and how to contact us about your information.',
    sections: [
      ['Who we are', `Lyman Studio is a design agency based in Bengaluru, India. For questions about this policy or your personal information, email <a href="mailto:${email}">${email}</a>.`],
      ['Information you share', `If you email us or contact us through WhatsApp, we receive the details you choose to provide, such as your name, contact information, company, and project brief. The contact form shown on this website is currently a preview: submitting it displays a message in your browser and does not send the entries to Lyman Studio. Please use email for an enquiry.`],
      ['Technical information', `When this site is hosted, the hosting service may process ordinary request information such as an IP address, browser type, requested pages, and access time to deliver and protect the site. This website does not currently offer user accounts. Before adding analytics, advertising tools, or a connected form, we will update this policy to describe them.`],
      ['How we use information', `We use information you send us to respond to enquiries, discuss and plan potential projects, provide agreed services, maintain the security of our communications, and meet applicable legal obligations. We do not use enquiry details to send a newsletter unless you separately ask for one.`],
      ['Sharing and external services', `We do not sell your personal information. We may use providers needed for email, messaging, hosting, or project delivery, and disclose information when required by law. If you choose to use an external link, including WhatsApp, that service handles your information under its own privacy terms.`],
      ['Retention', `We keep enquiry and project correspondence only for as long as reasonably needed for the conversation, an agreed project, record-keeping, or applicable legal requirements. You can ask us to review or delete information we hold by emailing us.`],
      ['Your choices', `You may contact us to ask what personal information we hold about you, request a correction or deletion, or raise a privacy concern. We will respond in line with applicable law. You can also choose not to send optional information in an enquiry.`],
      ['Security and children', `We take reasonable steps to protect information we receive, but no internet transmission or storage method is completely secure. This site is intended for business and project enquiries, not for children.`],
      ['Changes to this policy', `If our website or data practices change, we will update this page and its last-updated date. Material changes should be reviewed before a new form, analytics service, or other data-collecting tool goes live.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    lead: 'The basic terms for using the Lyman Studio website and contacting us about a project.',
    sections: [
      ['Using this website', `By using this website, you agree to use it lawfully and not interfere with its operation, security, or other visitors. If you do not agree with these terms, please stop using the site.`],
      ['About our services', `Lyman Studio designs, builds, and deploys digital products, including websites and apps. Information on this site is general and is not an offer, fixed quote, or guarantee of a particular result. Scope, timeline, payment, ownership, support, and other project terms will be set out in a separate written agreement before work begins.`],
      ['Website content', `The design, text, images, and other materials on this website belong to Lyman Studio or their respective owners and are protected by applicable intellectual-property law. You may view the site for personal or business evaluation, but may not copy, republish, or commercially use its content without permission.`],
      ['Enquiries', `Sending an enquiry does not create a client relationship or require us to accept a project. Please do not send confidential or sensitive information through the preview contact form. For an actual enquiry, email <a href="mailto:${email}">${email}</a>.`],
      ['External links', `This site may link to services or websites we do not control. Those destinations have their own terms and policies. A link does not mean we endorse or guarantee their content.`],
      ['Availability and accuracy', `We aim to keep the site useful and accurate, but its content may change and the site may occasionally be unavailable. To the extent permitted by law, the website and its general information are provided without warranties. This does not affect rights that cannot lawfully be excluded.`],
      ['Liability', `To the extent permitted by applicable law, Lyman Studio is not responsible for losses arising solely from reliance on general website content or from temporary site unavailability. Any liability relating to paid project work will be addressed in the separate agreement for that project.`],
      ['Privacy', `Our <a href="{{privacyHref}}">Privacy Policy</a> explains how this website handles personal information. Please read it before contacting us.`],
      ['Changes and contact', `We may update these terms by posting a revised version here with a new last-updated date. These website terms are intended to be governed by the laws of India, subject to any mandatory rules that apply. Questions can be sent to <a href="mailto:${email}">${email}</a>.`],
    ],
  },
};

const legalStyles = `
  *,*::before,*::after{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;background:#f3f0e9;color:#171717}
  .ratio-legal__nav{position:relative;display:flex;align-items:center;justify-content:space-between;gap:24px;min-height:78px;padding:0 clamp(20px,3vw,48px);border-bottom:1px solid #cbc8c1;background:#f3f0e9}
  .ratio-legal__brand{color:#171717;text-decoration:none;font-size:27px;font-weight:700;letter-spacing:-.08em}
  .ratio-legal__nav-links{display:flex;align-items:center;gap:clamp(18px,3vw,42px)}
  .ratio-legal__nav-links a{color:#171717;text-decoration:none;font-family:var(--font-mono)!important;font-size:12px;letter-spacing:.02em;text-transform:uppercase}
  .ratio-legal__nav-links a:hover{text-decoration:underline;text-underline-offset:5px}
  .ratio-legal__main{max-width:1540px;margin:auto;padding:clamp(76px,8vw,130px) clamp(20px,3vw,48px) 150px}
  .ratio-legal__meta{margin:0 0 34px;font-family:var(--font-mono)!important;font-size:12px;letter-spacing:.025em;text-transform:uppercase}
  .ratio-legal__main h1{max-width:1100px;margin:0;font-family:var(--font-main)!important;font-size:clamp(64px,10vw,160px)!important;font-weight:600!important;letter-spacing:-.09em!important;line-height:.9!important}
  .ratio-legal__lead{max-width:770px;margin:42px 0 0;color:#777670;font-size:clamp(21px,2.5vw,34px);line-height:1.17;letter-spacing:-.045em}
  .ratio-legal__rule{height:1px;margin:clamp(70px,9vw,130px) 0 55px;background:#c9c6bf}
  .ratio-legal__layout{display:grid;grid-template-columns:minmax(180px,240px) minmax(0,790px);gap:clamp(42px,8vw,150px);align-items:start}
  .ratio-legal__toc{position:sticky;top:28px;display:grid;gap:13px}
  .ratio-legal__toc-label{margin:0 0 12px;font-family:var(--font-mono)!important;font-size:12px;text-transform:uppercase}
  .ratio-legal__toc a{color:#777670;text-decoration:none;font-size:14px;line-height:1.3}
  .ratio-legal__toc a:hover{color:#171717;text-decoration:underline;text-underline-offset:4px}
  .ratio-legal__content{min-width:0}
  .ratio-legal__section{scroll-margin-top:32px;padding:0 0 46px;margin:0 0 46px;border-bottom:1px solid #c9c6bf}
  .ratio-legal__section:last-child{border:0;margin-bottom:0;padding-bottom:0}
  .ratio-legal__main h2{margin:0 0 20px;font-family:var(--font-main)!important;font-size:clamp(30px,3vw,44px)!important;font-weight:600!important;letter-spacing:-.06em!important;line-height:1.02!important}
  .ratio-legal__section p{max-width:70ch;margin:0;font-size:17px;line-height:1.58;letter-spacing:-.015em}
  .ratio-legal__section a{color:#171717;text-decoration-thickness:1px;text-underline-offset:3px;overflow-wrap:anywhere}
  .ratio-legal__nav a:focus-visible,.ratio-legal__main a:focus-visible{outline:2px solid #171717;outline-offset:4px}
  @media(max-width:800px){.ratio-legal__nav{min-height:70px}.ratio-legal__nav-links{gap:16px}.ratio-legal__nav-links a{font-size:11px}.ratio-legal__layout{grid-template-columns:1fr;gap:50px}.ratio-legal__toc{position:static;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 22px}.ratio-legal__toc-label{grid-column:1/-1}.ratio-legal__main{padding-bottom:110px}}
  @media(max-width:480px){.ratio-legal__nav-links a:nth-child(2){display:none}.ratio-legal__lead{margin-top:30px}.ratio-legal__rule{margin:65px 0 38px}.ratio-legal__toc{grid-template-columns:1fr 1fr}.ratio-legal__section{padding-bottom:36px;margin-bottom:36px}.ratio-legal__section p{font-size:16px}}
  @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
`;

export function renderLegalPage(kind, links, assetBase, motionSrc) {
  const policy = policies[kind];
  if (!policy) throw new Error(`Unknown legal page: ${kind}`);
  const sections = policy.sections.map(([heading, body], index) => ({ id: `section-${index + 1}`, heading, body: body.replaceAll('{{privacyHref}}', links.privacyHref) }));
  const footer = closingFooterMarkup(links);
  return `<!doctype html><html lang="en" data-ratio-route="/${kind}"><head>
    <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${policy.title} | Lyman Studio</title>
    <meta name="description" content="${policy.lead}">
    <style>${spaceGroteskStyles(assetBase)}${closingFooterStyles}${legalStyles}</style>
  </head><body>
    <header class="ratio-legal__nav"><a class="ratio-legal__brand" href="${links.homeHref}">Lyman Studio</a><nav class="ratio-legal__nav-links" aria-label="Main navigation"><a href="${links.projectsHref}">Projects</a><a href="${links.aboutHref}">About</a><a href="${links.contactHref}">Contact</a></nav></header>
    <main class="ratio-legal__main" id="main">
      <p class="ratio-legal__meta">Lyman Studio / Last updated ${updated}</p>
      <h1>${policy.title}</h1><p class="ratio-legal__lead">${policy.lead}</p>
      <div class="ratio-legal__rule" aria-hidden="true"></div>
      <div class="ratio-legal__layout"><nav class="ratio-legal__toc" aria-label="On this page"><p class="ratio-legal__toc-label">On this page</p>${sections.map(section => `<a href="#${section.id}">${section.heading}</a>`).join('')}</nav>
      <div class="ratio-legal__content">${sections.map(section => `<section class="ratio-legal__section" id="${section.id}"><h2>${section.heading}</h2><p>${section.body}</p></section>`).join('')}</div></div>
    </main>${footer}<script src="${motionSrc}"></script><script src="${assetBase === '/_assets' ? '/ratio-runtime.js?v=2' : '../../public/ratio-runtime.js'}" data-asset-base="${assetBase}" data-contact="${links.contactHref}"></script>
  </body></html>`;
}
