(() => {
  const scriptUrl = document.currentScript?.src || location.href;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const logos = [
    { slug: 'react', title: 'React', href: 'https://react.dev' },
    { slug: 'nextdotjs', title: 'Next.js', href: 'https://nextjs.org' },
    { slug: 'typescript', title: 'TypeScript', href: 'https://www.typescriptlang.org' },
    { slug: 'tailwindcss', title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  ];
  const iconUrl = slug => new URL(`./_assets/tech-logos/${slug}.svg`, scriptUrl).href;
  const loops = new Set();

  function makeItem({ slug, title, href }, duplicate = false) {
    const link = document.createElement('a');
    link.className = 'ratio-logo-loop__item';
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = title;
    link.setAttribute('aria-label', title);
    if (duplicate) link.tabIndex = -1;
    const image = document.createElement('img');
    image.src = iconUrl(slug);
    image.alt = '';
    image.width = 60;
    image.height = 60;
    image.decoding = 'async';
    link.append(image);
    return link;
  }

  function mount(wrapper) {
    if (wrapper.querySelector('.ratio-logo-loop')) return;
    const original = wrapper.querySelector('ul:has(> .ticker-item [data-framer-name="Logo"])');
    if (!original) return;
    original._tickerAnimation?.cancel();
    const loop = document.createElement('div');
    loop.className = 'ratio-logo-loop';
    loop.setAttribute('role', 'region');
    loop.setAttribute('aria-label', 'Technology partners');
    const track = document.createElement('div');
    track.className = 'ratio-logo-loop__track';
    loop.append(track);
    original.replaceWith(loop);

    let animation;
    const rebuild = () => {
      animation?.cancel();
      if (animation) loops.delete(animation);
      track.replaceChildren();
      const size = innerWidth < 810 ? 46 : 60;
      const gap = size;
      const cycles = Math.max(1, Math.ceil((loop.clientWidth + size + gap) / (logos.length * (size + gap))));
      for (let groupIndex = 0; groupIndex < 2; groupIndex++) {
        const group = document.createElement('div');
        group.className = 'ratio-logo-loop__group';
        if (groupIndex) group.setAttribute('aria-hidden', 'true');
        for (let cycle = 0; cycle < cycles; cycle++) {
          for (const logo of logos) group.append(makeItem(logo, groupIndex > 0 || cycle > 0));
        }
        track.append(group);
      }
      if (reducedMotion.matches) return;
      const distance = track.firstElementChild.getBoundingClientRect().width;
      animation = track.animate([
        { transform: 'translateX(0)' },
        { transform: `translateX(-${distance}px)` },
      ], { duration: distance * 10, iterations: Infinity, easing: 'linear' });
      loops.add(animation);
    };
    let lastWidth = 0;
    new ResizeObserver(() => {
      if (Math.abs(loop.clientWidth - lastWidth) < 2) return;
      lastWidth = loop.clientWidth;
      rebuild();
    }).observe(loop);
    loop.addEventListener('pointerenter', () => animation?.pause());
    loop.addEventListener('pointerleave', () => { if (!reducedMotion.matches) animation?.play(); });
    loop.addEventListener('focusin', () => animation?.pause());
    loop.addEventListener('focusout', () => { if (!reducedMotion.matches) animation?.play(); });
    rebuild();
  }

  const mountAll = () => document.querySelectorAll('.framer-1r7bp32').forEach(mount);
  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; mountAll(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
  reducedMotion.addEventListener('change', () => {
    for (const animation of loops) reducedMotion.matches ? animation.pause() : animation.play();
  });
  mountAll();
})();
