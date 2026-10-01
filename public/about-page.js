(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const nodes = [...document.querySelectorAll('[data-about-reveal]')];
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const animations = new Set();
  const show = node => { node.style.opacity = ''; node.style.transform = ''; };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      observer.unobserve(node);
      if (reduced.matches) return show(node);
      const animation = node.animate([
        { opacity: 0, transform: 'translateY(22px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' });
      animations.add(animation);
      animation.finished.then(() => { show(node); animation.cancel(); animations.delete(animation); }).catch(() => show(node));
    });
  }, { threshold: 0.08 });
  nodes.forEach(node => { node.style.opacity = '0'; node.style.transform = 'translateY(22px)'; observer.observe(node); });
  reduced.addEventListener('change', () => {
    if (!reduced.matches) return;
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    animations.clear();
    nodes.forEach(show);
  });
})();
