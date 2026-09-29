(() => {
  const seen = new WeakSet();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    : null;

  function mount() {
    document.querySelectorAll('.ratio-process').forEach(section => {
      if (seen.has(section)) return;
      seen.add(section);
      const parts = section.querySelectorAll('.ratio-process__intro, .ratio-process__step, .ratio-process__cta-row');
      if (!observer || reduced.matches) return parts.forEach(part => part.classList.add('is-visible'));
      section.classList.add('is-ready');
      parts.forEach(part => observer.observe(part));
    });
  }

  new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
