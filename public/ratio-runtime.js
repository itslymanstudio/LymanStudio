// Keep the brand visible when the mirrored Framer runtime hydrates or navigates.
(() => {
  const script = document.currentScript;
  const base = script?.dataset.assetBase || '/_assets';
  const contact = script?.dataset.contact || '/contact';
  const symbol = 'hcIRUi1qFh8aGDJENXamzOak3Z8.svg';
  const wordmark = 'MYaL4AWEDy6afpn3WmSVtWlXFjM.svg';
  const replaceText = value => value
    .replaceAll('Bungee - Creative Agency Framer Templte', 'Ratio Design - Creative Studio')
    .replaceAll(' - Knots Subscription Digital Agency Framer Template', ' | Ratio Design')
    .replaceAll('Striking, stylish, and made to stand out. Bungee is a sleek and contemporary template crafted for creative studios, freelancers, and agencies who know that powerful work needs powerful presentation.', 'Ratio Design is a creative studio building distinctive brands and digital experiences.')
    .replaceAll('Creative studio based in Gotham.', 'Creative studio based in Bangalore.')
    .replaceAll('Bungee', 'Ratio Design')
    .replaceAll('BUNGEE', 'RATIO DESIGN')
    .replaceAll('hi@bungee.io', 'xeo776@gmail.com')
    .replaceAll('©25 Ratio Design®', '©26 Ratio Design®');
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
        if (src.includes(symbol)) element.setAttribute('src', `${base}/ratio-symbol.svg`);
        else if (src.includes(wordmark)) element.setAttribute('src', `${base}/ratio-wordmark.svg`);
      }
      if (element.tagName === 'A' && /^mailto:hi@bunhee\.io$/i.test(element.getAttribute('href') || '')) element.setAttribute('href', 'mailto:xeo776@gmail.com');
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
// The contact form is a visual preview until Ratio Design connects a receiver.
document.addEventListener('submit', event => {
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
  status.textContent = 'This form is not connected yet. Please email xeo776@gmail.com to contact us.';
}, true);
