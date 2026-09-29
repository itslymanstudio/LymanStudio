(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new WeakSet();
  const pending = new Set();
  const easing = 'cubic-bezier(.22,1,.36,1)';
  const selectors = [
    'section[data-framer-name="Intro"] h3',
    '#main h1',
    '#main h2',
    'html[data-ratio-route="/about"] #main h3',
    '.ratio-process__cta h3',
    '.ratio-footer__headline',
    '.ratio-footer__form-column h3',
  ];

  function wrapWords(node) {
    const textNodes = [];
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    const words = [];
    for (const textNode of textNodes) {
      if (!textNode.textContent.trim()) continue;
      const fragment = document.createDocumentFragment();
      for (const token of textNode.textContent.match(/\s+|[^\s]+/g) || []) {
        if (/^\s+$/.test(token)) {
          fragment.append(document.createTextNode(token));
          continue;
        }
        const word = document.createElement('span');
        word.className = 'ratio-motion-word';
        word.style.display = 'inline-block';
        word.style.whiteSpace = 'nowrap';
        word.textContent = token;
        fragment.append(word);
        words.push(word);
      }
      textNode.replaceWith(fragment);
    }
    return words;
  }

  function parts(node) {
    if (node.matches('.ratio-studio-metrics h2')) {
      return [...node.querySelectorAll('.ratio-motion-word')];
    }
    if (node.closest('section[data-framer-name="Intro"]')) {
      const words = [...node.children].filter(child => child.tagName === 'SPAN');
      if (words.length) return words;
    }
    return wrapWords(node);
  }

  function timing(node, count) {
    if (node.matches('.meet-devs__intro h2')) return { stagger: 115, duration: 850, rise: '.5em' };
    if (node.matches('.ratio-footer__headline')) return { stagger: 82, duration: 820, rise: '.42em' };
    if (node.matches('.ratio-studio-metrics h2, section[data-framer-name="Intro"] h3')) {
      return { stagger: 52, duration: 720, rise: '.38em' };
    }
    if (node.matches('.ratio-faq__heading h2, .ratio-process__intro h2')) {
      return { stagger: 86, duration: 760, rise: '.42em' };
    }
    if (count <= 3) return { stagger: 90, duration: 730, rise: '.32em' };
    return { stagger: 62, duration: 690, rise: '.3em' };
  }

  function show(node) {
    node.style.opacity = '1';
    node.style.transform = 'none';
    node.style.willChange = '';
    pending.delete(node);
  }

  function reveal(entries, activeObserver) {
        for (const entry of entries) {
          if (!entry.isIntersecting || !entry.target.getClientRects().length) continue;
          activeObserver.unobserve(entry.target);
          const words = [...entry.target._ratioMotionWords];
          const { stagger, duration, rise } = timing(entry.target, words.length);
          words.forEach((part, index) => {
            if (reducedMotion.matches) return show(part);
            const delay = Math.min(index * stagger, 900);
            part.animate([
              { opacity: 0, transform: `translateY(${rise})` },
              { opacity: 1, transform: 'translateY(0)' },
            ], { duration, delay, easing, fill: 'both' })
              .finished.then(() => show(part)).catch(() => show(part));
          });
        }
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(reveal, { threshold: .16, rootMargin: '0px 0px -8% 0px' })
    : null;
  const devObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(reveal, { threshold: .35, rootMargin: '0px 0px -30% 0px' })
    : null;

  function mount() {
    for (const node of document.querySelectorAll(selectors.join(','))) {
      if (seen.has(node)) continue;
      seen.add(node);
      if (reducedMotion.matches || !observer) continue;
      const words = parts(node);
      if (!words.length) continue;
      node._ratioMotionWords = words;
      const { rise } = timing(node, words.length);
      for (const part of words) {
        part.style.opacity = '0';
        part.style.transform = `translateY(${rise})`;
        pending.add(part);
      }
      (node.matches('.meet-devs__intro h2') ? devObserver : observer).observe(node);
    }
  }

  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    observer?.disconnect();
    devObserver?.disconnect();
    for (const part of pending) show(part);
  });
  let scheduled = false;
  new MutationObserver(records => {
    if (!records.some(record => [...record.addedNodes].some(node => node.nodeType === 1))) return;
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; mount(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
