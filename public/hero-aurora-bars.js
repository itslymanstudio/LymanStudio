(() => {
  const barCount = 16;
  const minHeightRatio = 0.18;
  const maxHeightRatio = 0.92;
  const speed = 1.1;
  const paletteDuration = 6;
  const palettes = [
    [[235, 247, 211], [213, 243, 145], [185, 239, 52], [131, 183, 21]],
    [[250, 236, 215], [249, 206, 156], [244, 162, 81], [220, 123, 47]],
    [[250, 229, 219], [247, 189, 168], [239, 139, 112], [215, 103, 85]],
    [[242, 233, 250], [222, 199, 244], [188, 154, 230], [155, 113, 203]],
    [[231, 239, 252], [192, 213, 249], [127, 163, 235], [79, 121, 201]],
  ];
  const updateNav = () => document.body.classList.toggle('aurora-nav-scrolled', window.scrollY > 80);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  const barHeight = (index, total, time) => {
    const norm = index / (total - 1);
    const arch = Math.sin(norm * Math.PI);
    const phase1 = (index / total) * Math.PI * 2;
    const phase2 = (index / total) * Math.PI * 5.3;
    const wave = 0.5 + 0.25 * Math.sin(time * 1.1 + phase1) + 0.25 * Math.sin(time * 0.7 + phase2);
    return minHeightRatio + (arch * 0.65 + wave * 0.35) * (maxHeightRatio - minHeightRatio);
  };

  const mount = () => {
    const hero = document.querySelector('html[data-ratio-route="/"] header[data-framer-name="Header"]');
    if (!hero || hero.querySelector('.ratio-hero-aurora')) return;

    hero.classList.add('ratio-hero-aurora-host');
    const aurora = document.createElement('div');
    aurora.className = 'ratio-hero-aurora';
    aurora.setAttribute('aria-hidden', 'true');
    const bars = document.createElement('div');
    bars.className = 'ratio-hero-aurora__bars';
    const barElements = Array.from({ length: barCount }, (_, index) => {
      const slot = document.createElement('div');
      slot.className = 'ratio-hero-aurora__slot';
      const bar = document.createElement('div');
      bar.className = 'ratio-hero-aurora__bar';
      bar.style.setProperty('--aurora-height', `${barHeight(index, barCount, 0) * 100}%`);
      slot.append(bar);
      bars.append(slot);
      return bar;
    });
    const shade = document.createElement('div');
    shade.className = 'ratio-hero-aurora__shade';
    aurora.append(bars, shade);
    hero.prepend(aurora);

    const updateColors = elapsed => {
      const position = elapsed / paletteDuration;
      const current = Math.floor(position) % palettes.length;
      const next = (current + 1) % palettes.length;
      const fraction = position - Math.floor(position);
      const blend = fraction * fraction * (3 - 2 * fraction);
      palettes[current].forEach((stop, index) => {
        const channels = stop.map((channel, axis) => Math.round(channel + (palettes[next][index][axis] - channel) * blend));
        aurora.style.setProperty(`--aurora-color-${index}`, `rgb(${channels.join(' ')})`);
      });
    };
    updateColors(0);

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let lastColorUpdate = 0;
    const started = performance.now();
    const animate = () => {
      if (!aurora.isConnected) return;
      const now = performance.now();
      const elapsed = (now - started) / 1000;
      const time = elapsed * speed;
      if (now - lastColorUpdate >= 50) {
        updateColors(elapsed);
        lastColorUpdate = now;
      }
      barElements.forEach((bar, index) => {
        bar.style.setProperty('--aurora-height', `${barHeight(index, barCount, time) * 100}%`);
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  mount();
  new MutationObserver(mount).observe(document.querySelector('#main') || document.documentElement, { childList: true, subtree: true });
})();
