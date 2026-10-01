// Keep the brand visible when the mirrored page runtime hydrates or navigates.
(() => {
  const script = document.currentScript;
  const base = script?.dataset.assetBase || '/_assets';
  const contact = script?.dataset.contact || '/contact';
  const symbol = 'hcIRUi1qFh8aGDJENXamzOak3Z8.svg';
  const wordmark = 'MYaL4AWEDy6afpn3WmSVtWlXFjM.svg';
  const replaceText = value => value
    .replace(/Bungee - Creative Agency [^"<]*/g, 'Lyman Studio - Creative Studio')
    .replace(/ - Knots Subscription Digital Agency [^"<]*/g, ' | Lyman Studio')
    .replaceAll('Striking, stylish, and made to stand out. Bungee is a sleek and contemporary template crafted for creative studios, freelancers, and agencies who know that powerful work needs powerful presentation.', 'Lyman Studio is a creative studio building distinctive brands and digital experiences.')
    .replaceAll('Creative studio based in Gotham.', 'Creative studio based in Bangalore.')
    .replaceAll('Bungee', 'Lyman Studio')
    .replaceAll('BUNGEE', 'LYMAN STUDIO')
    .replaceAll('hi@bungee.io', 'itslymanstudio@gmail.com')
    .replaceAll('©25 Lyman Studio', '©26 Lyman Studio')
    .replaceAll('Lyman Studio®', 'Lyman Studio');
  const update = root => {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      if (/Bungee|Gotham|hi@bungee\.io/i.test(root.nodeValue || '')) root.nodeValue = replaceText(root.nodeValue);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    const elements = root.nodeType === Node.DOCUMENT_NODE ? [root.documentElement, ...root.querySelectorAll('*')] : [root, ...root.querySelectorAll('*')];
    for (const element of elements) {
      if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') continue;
      if (element.tagName === 'IMG') {
        const src = element.getAttribute('src') || '';
        if (src.includes(symbol)) element.setAttribute('src', `${base}/lymen-symbol.svg`);
        else if (src.includes(wordmark)) element.setAttribute('src', `${base}/lymen-wordmark.svg`);
      }
      if (element.tagName === 'A' && /^mailto:hi@bunhee\.io$/i.test(element.getAttribute('href') || '')) element.setAttribute('href', 'mailto:itslymanstudio@gmail.com');
      for (const name of ['aria-label', 'title', 'alt']) {
        const value = element.getAttribute(name);
        if (value && /Bungee|Gotham|hi@bungee\.io/i.test(value)) element.setAttribute(name, replaceText(value));
      }
      if (element.tagName === 'META' && ['description', 'og:title', 'twitter:title', 'og:description', 'twitter:description'].includes(element.getAttribute('name') || element.getAttribute('property'))) {
        const value = element.getAttribute('content') || '';
        if (/Bungee/i.test(value)) element.setAttribute('content', replaceText(value));
      }
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement?.tagName)) continue;
      if (/Bungee|Gotham|hi@bungee\.io/i.test(node.nodeValue)) node.nodeValue = replaceText(node.nodeValue);
    }
  };
  update(document);
  if (/Bungee/.test(document.title)) document.title = replaceText(document.title);
  const observer = new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') {
        const node = record.target;
        if (/Bungee|Gotham|hi@bungee\.io/i.test(node.nodeValue || '')) node.nodeValue = replaceText(node.nodeValue);
      } else if (record.type === 'attributes') update(record.target);
      else for (const node of record.addedNodes) update(node);
    }
    if (/Bungee/.test(document.title)) document.title = replaceText(document.title);
  });
  observer.observe(document.documentElement, { childList: true, characterData: true, attributes: true, attributeFilter: ['src', 'href', 'alt', 'title', 'aria-label'], subtree: true });
})();

// Web3Forms public access key (safe for client-side use). Submissions are emailed
// to the address configured in the Web3Forms dashboard.
const WEB3FORMS_ACCESS_KEY = 'd192bf8e-509e-4fa7-a63c-3093da5150a5';

// Use a window-capture listener: the mirrored Framer runtime binds its own submit
// handler on document (capture) and stops propagation, so a document listener here
// would never run. window capture fires first and lets us take over the submit.
window.addEventListener('submit', async event => {
  const form = event.target;
  if (!form.matches?.('.ratio-footer__form')) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  let status = form.querySelector('[role="status"]');
  if (!status) {
    status = document.createElement('p');
    status.setAttribute('role', 'status');
    form.append(status);
  }
  const fields = Object.fromEntries(new FormData(form));
  if (fields.website) return;

  const subject = `Project enquiry from ${fields.full_name || 'website visitor'}`;
  const body = [
    `Name: ${fields.full_name || ''}`,
    `Email: ${fields.email || ''}`,
    `Phone: ${fields.phone || ''}`,
    `Region: ${fields.region || ''}`,
    `Company type: ${fields.company_type || ''}`,
    '',
    fields.project_brief || ''
  ].join('\n');
  if (location.protocol === 'file:') {
    status.textContent = 'Your email app is opening with the enquiry. Press Send there to deliver it.';
    location.href = `mailto:itslymanstudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const originalButtonText = button?.innerHTML;
  if (button) {
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.textContent = 'Sending…';
  }
  status.textContent = 'Sending your enquiry…';
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: 'Lyman Studio website',
        name: fields.full_name || '',
        email: fields.email || '',
        phone: fields.phone || 'Not provided',
        region: fields.region || 'Not provided',
        company_type: fields.company_type || 'Not provided',
        project_brief: fields.project_brief || ''
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) throw new Error(result.message || 'Your enquiry could not be sent right now.');
    form.reset();
    status.textContent = 'Thanks, your enquiry has been sent. We’ll be in touch soon.';
  } catch (error) {
    status.textContent = `${error.message} You can email us directly at itslymanstudio@gmail.com.`;
  } finally {
    if (button) {
      button.disabled = false;
      button.removeAttribute('aria-busy');
      button.innerHTML = originalButtonText;
    }
  }
}, true);

// Keep the small hero location clock local to the studio in Bengaluru.
(() => {
  const updateBengaluruClock = () => {
    const timer = document.querySelector('header[data-framer-name="Header"] [data-framer-name="Timer"]');
    if (!timer) return;

    const time = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).format(new Date());

    for (const element of timer.querySelectorAll('*')) {
      if (element.children.length) continue;
      const label = element.textContent.trim();
      if (/^\d{1,2}:\d{2}$/.test(label) && label !== time) element.textContent = time;
      else if (/\bNY\b/.test(label)) element.textContent = element.textContent.replace(/\bNY\b/g, 'BLR');
    }
  };

  updateBengaluruClock();
  const header = document.querySelector('header[data-framer-name="Header"]');
  if (header) new MutationObserver(updateBengaluruClock).observe(header, { childList: true, characterData: true, subtree: true });
  window.setInterval(updateBengaluruClock, 30_000);
})();
