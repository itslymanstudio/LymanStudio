(() => {
  const seen = new WeakSet();
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const duration = 1800;

  function finish(value) {
    value.textContent = `${value.dataset.target}${value.dataset.suffix || ''}`;
  }

  function animate(value) {
    if (value.dataset.counted === 'true') return;
    value.dataset.counted = 'true';
    if (reducedMotion.matches) return finish(value);
    value.animate([
      { opacity: .35, transform: 'translateY(15px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ], { duration: 850, easing: 'cubic-bezier(.22,1,.36,1)' });
    const target = Number(value.dataset.target);
    const suffix = value.dataset.suffix || '';
    const start = performance.now();
    const frame = now => {
      if (!value.isConnected) return;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      value.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
      else finish(value);
    };
    requestAnimationFrame(frame);
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          animate(entry.target);
        }
      }, { threshold: .45, rootMargin: '0px 0px -5% 0px' })
    : null;

  function mount() {
    document.querySelectorAll('.ratio-studio-metrics__value[data-target]').forEach(value => {
      if (seen.has(value)) return;
      seen.add(value);
      if (!observer || reducedMotion.matches) return finish(value);
      value.textContent = `0${value.dataset.suffix || ''}`;
      observer.observe(value);
    });
  }

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      observer?.disconnect();
      document.querySelectorAll('.ratio-studio-metrics__value[data-target]').forEach(finish);
    }
  });
  new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes].some(node => node.nodeType === 1))) mount();
  }).observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
