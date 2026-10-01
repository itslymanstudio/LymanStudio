(() => {
  const wrapper = document.querySelector('[data-staggered-menu]');
  if (!wrapper) return;

  const gsap = window.gsap;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const panel = wrapper.querySelector('.staggered-menu-panel');
  const layers = [...wrapper.querySelectorAll('.sm-prelayer')];
  const scrim = wrapper.querySelector('.sm-scrim');
  const toggle = wrapper.querySelector('.sm-toggle');
  const icon = wrapper.querySelector('.sm-icon');
  const textInner = wrapper.querySelector('.sm-toggle-textInner');
  const itemLabels = [...panel.querySelectorAll('.sm-panel-itemLabel')];
  const numberedItems = [...panel.querySelectorAll('.sm-panel-item')];
  const socialTitle = panel.querySelector('.sm-socials-title');
  const socialLinks = [...panel.querySelectorAll('.sm-socials-link')];
  let open = false;
  let openTimeline;
  let closeTween;
  let textTween;
  let iconTween;
  let colorTween;

  const setOffscreen = value => {
    if (gsap) gsap.set([panel, ...layers], { xPercent: value, opacity: 1 });
    else for (const element of [panel, ...layers]) {
      element.style.transform = `translateX(${value}%)`;
      element.style.opacity = '1';
    }
  };
  setOffscreen(100);
  if (gsap) gsap.set(scrim, { opacity: 0 });

  const animateText = opening => {
    if (textTween) textTween.kill();
    const current = opening ? 'Menu' : 'Close';
    const target = opening ? 'Close' : 'Menu';
    const sequence = [current];
    let last = current;
    for (let i = 0; i < 3; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      sequence.push(last);
    }
    if (last !== target) sequence.push(target);
    sequence.push(target);
    textInner.replaceChildren(...sequence.map(label => {
      const span = document.createElement('span');
      span.className = 'sm-toggle-line';
      span.textContent = label;
      return span;
    }));
    if (!gsap || reduced.matches) {
      textInner.style.transform = `translateY(-${((sequence.length - 1) / sequence.length) * 100}%)`;
      return;
    }
    gsap.set(textInner, { yPercent: 0 });
    textTween = gsap.to(textInner, {
      yPercent: -((sequence.length - 1) / sequence.length) * 100,
      duration: 0.5 + sequence.length * 0.07,
      ease: 'power4.out',
      overwrite: 'auto'
    });
  };

  const animateToggle = opening => {
    if (iconTween) iconTween.kill();
    if (colorTween) colorTween.kill();
    if (!gsap || reduced.matches) {
      icon.style.transform = `rotate(${opening ? 225 : 0}deg)`;
      toggle.style.color = opening ? '#6d871a' : '#101010';
      return;
    }
    iconTween = gsap.to(icon, { rotation: opening ? 225 : 0, duration: opening ? 0.8 : 0.35, ease: opening ? 'power4.out' : 'power3.inOut', overwrite: 'auto' });
    colorTween = gsap.to(toggle, { color: opening ? '#6d871a' : '#101010', delay: 0.18, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
  };

  const finishClose = () => {
    if (open) return;
    panel.inert = true;
    panel.setAttribute('aria-hidden', 'true');
    wrapper.removeAttribute('data-open');
    document.body.classList.remove('sm-menu-locked');
  };

  const openMenu = keyboard => {
    if (open) return;
    open = true;
    openTimeline?.kill();
    closeTween?.kill();
    panel.inert = false;
    panel.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    wrapper.setAttribute('data-open', '');
    document.body.classList.add('sm-menu-locked');
    animateText(true);
    animateToggle(true);
    window.dispatchEvent(new CustomEvent('ratio:menu-open'));

    if (!gsap || reduced.matches) {
      setOffscreen(0);
      layers.forEach(layer => { layer.style.opacity = '0'; });
      scrim.style.opacity = '1';
      itemLabels.forEach(label => { label.style.transform = 'none'; });
      numberedItems.forEach(item => { item.style.setProperty('--sm-num-opacity', '1'); });
      if (keyboard) panel.querySelector('.sm-panel-item')?.focus();
      return;
    }

    gsap.set(layers, { opacity: 1 });
    gsap.set(itemLabels, { yPercent: 140, rotation: 10 });
    gsap.set(numberedItems, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    gsap.set(socialLinks, { y: 25, opacity: 0 });
    const timeline = gsap.timeline({ onComplete: () => { if (open && keyboard) panel.querySelector('.sm-panel-item')?.focus(); } });
    timeline.to(scrim, { opacity: 1, duration: 0.38, ease: 'power2.out' }, 0);
    layers.forEach((layer, index) => timeline.to(layer, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, index * 0.07));
    const panelStart = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;
    timeline.to(panel, { xPercent: 0, duration: 0.65, ease: 'power4.out' }, panelStart);
    timeline.to(layers, { opacity: 0, duration: 0.35, ease: 'power2.out' }, panelStart + 0.35);
    const itemStart = panelStart + 0.65 * 0.15;
    timeline.to(itemLabels, { yPercent: 0, rotation: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, itemStart);
    timeline.to(numberedItems, { '--sm-num-opacity': 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, itemStart + 0.1);
    if (socialTitle) timeline.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, panelStart + 0.26);
    timeline.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }, panelStart + 0.3);
    openTimeline = timeline;
  };

  const closeMenu = returnFocus => {
    if (!open) return;
    open = false;
    openTimeline?.kill();
    closeTween?.kill();
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    animateText(false);
    animateToggle(false);
    window.dispatchEvent(new CustomEvent('ratio:menu-close'));
    if (returnFocus) toggle.focus();

    if (!gsap || reduced.matches) {
      setOffscreen(100);
      scrim.style.opacity = '0';
      finishClose();
      return;
    }
    gsap.to(scrim, { opacity: 0, duration: 0.25, ease: 'power2.in', overwrite: 'auto' });
    closeTween = gsap.to([panel, ...layers], { xPercent: 100, duration: 0.32, ease: 'power3.in', overwrite: 'auto', onComplete: finishClose });
  };

  toggle.addEventListener('click', event => open ? closeMenu(false) : openMenu(event.detail === 0));
  scrim.addEventListener('click', () => closeMenu(false));
  panel.addEventListener('click', event => {
    if (open && !event.target.closest('a, button')) closeMenu(false);
  });
  panel.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || !panel.contains(link)) return;
    event.preventDefault();
    const id = decodeURIComponent(link.getAttribute('href').slice(1));
    closeMenu(false);
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + id);
    };
    setTimeout(scrollToTarget, reduced.matches ? 0 : 420);
  });
  document.addEventListener('pointerdown', event => {
    if (open && !panel.contains(event.target) && !toggle.contains(event.target) && !wrapper.querySelector('.sm-logo').contains(event.target)) closeMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key !== 'Tab') return;
    const links = [...panel.querySelectorAll('a[href]')];
    if (!links.length) return;
    const first = links[0];
    const last = links.at(-1);
    if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });
  window.addEventListener('pagehide', () => document.body.classList.remove('sm-menu-locked'));
})();
