(() => {
  const seen = new WeakSet();
  const timelines = new Set();
  const stagePops = new WeakMap();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let needsMeasure = true;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    : null;

  function update() {
    frame = 0;
    const measure = needsMeasure;
    needsMeasure = false;
    for (const timeline of timelines) {
      const { section, track, rows, button } = timeline;
      if (!section.isConnected) {
        timelines.delete(timeline);
        continue;
      }
      if (measure) {
        timeline.centers = rows.map(row => {
          const node = row.querySelector('.ratio-process__node, .ratio-process__cta-node');
          return row.offsetTop + node.offsetTop + node.offsetHeight / 2;
        });
        const first = timeline.centers[0];
        timeline.contacts = rows.map((row, index) => {
          const node = row.querySelector('.ratio-process__node, .ratio-process__cta-node');
          return Math.max(first, timeline.centers[index] - node.offsetHeight / 2);
        });
        timeline.length = timeline.centers.at(-1) - first;
        track.style.setProperty('--process-start', `${first}px`);
        track.style.setProperty('--process-length', `${timeline.length}px`);
      }
      const first = timeline.centers[0];
      const head = innerHeight * 0.6 - track.getBoundingClientRect().top;
      const fill = reduced.matches ? timeline.length : clamp(head - first, 0, timeline.length);
      track.style.setProperty('--process-fill', `${fill}px`);
      track.style.setProperty('--process-active', head >= first ? '1' : '0');
      rows.forEach((row, index) => {
        const complete = reduced.matches || head >= timeline.contacts[index];
        const reached = complete && !row.classList.contains('is-complete');
        row.classList.toggle('is-complete', complete);
        if (!reached || reduced.matches) return;
        const node = row.querySelector('.ratio-process__node');
        if (!node?.animate) return;
        // Start in this same frame, when the line reaches the circle's edge.
        stagePops.get(node)?.cancel();
        stagePops.set(node, node.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.22)', offset: 0.28 },
          { transform: 'scale(.96)', offset: 0.7 },
          { transform: 'scale(1)' },
        ], { duration: 380, delay: 0, easing: 'cubic-bezier(.22,1,.36,1)' }));
      });

      // Wait until the button itself is visible, even on a narrow mobile CTA.
      const rect = button.getBoundingClientRect();
      if (!timeline.popped && head >= timeline.centers.at(-1) && rect.top < innerHeight * 0.9 && rect.bottom > 0) {
        timeline.popped = true;
        if (!reduced.matches && button.animate) {
          button.animate([
            { transform: 'scale(1)', boxShadow: '0 0 0 0 #c8ff3100' },
            { transform: 'scale(1.08)', boxShadow: '0 0 0 12px #c8ff3126', offset: 0.45 },
            { transform: 'scale(.98)', boxShadow: '0 0 0 18px #c8ff3100', offset: 0.75 },
            { transform: 'scale(1)', boxShadow: '0 0 0 0 #c8ff3100' },
          ], { duration: 750, easing: 'cubic-bezier(.22,1,.36,1)' });
        }
      }
    }
  }

  function schedule(measure = false) {
    needsMeasure ||= measure;
    if (!frame) frame = requestAnimationFrame(update);
  }

  const resize = 'ResizeObserver' in window ? new ResizeObserver(() => schedule(true)) : null;
  function mount() {
    document.querySelectorAll('.ratio-process').forEach(section => {
      if (seen.has(section)) return;
      seen.add(section);
      const parts = section.querySelectorAll('.ratio-process__intro, .ratio-process__step, .ratio-process__cta-row');
      if (!observer || reduced.matches) parts.forEach(part => part.classList.add('is-visible'));
      else {
        section.classList.add('is-ready');
        parts.forEach(part => observer.observe(part));
      }
      const track = section.querySelector('.ratio-process__track');
      const rows = [...section.querySelectorAll('.ratio-process__step, .ratio-process__cta-row')];
      const button = section.querySelector('.ratio-process__primary');
      if (!track || !rows.length || !button) return;
      section.classList.add('has-progress');
      timelines.add({ section, track, rows, button, popped: false, centers: [], length: 0 });
      resize?.observe(track);
      schedule(true);
    });
  }

  window.addEventListener('scroll', () => schedule(), { passive: true });
  window.addEventListener('resize', () => schedule(true), { passive: true });
  reduced.addEventListener('change', () => {
    if (reduced.matches) timelines.forEach(({ section }) => section.querySelectorAll('.ratio-process__intro, .ratio-process__step, .ratio-process__cta-row').forEach(part => part.classList.add('is-visible')));
    schedule(true);
  });
  document.fonts?.ready.then(() => schedule(true));
  new MutationObserver(mount).observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
