(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const initialized = new WeakSet();

  function setup(card) {
    if (initialized.has(card)) return;
    initialized.add(card);
    const front = card.querySelector('.meet-devs__face--front');
    const back = card.querySelector('.meet-devs__face--back');
    let down = null;
    let suppressClick = false;

    const flip = () => {
      const flipped = card.dataset.flipped !== 'true';
      card.dataset.flipped = String(flipped);
      card.setAttribute('aria-pressed', String(flipped));
      card.setAttribute('aria-label', `${flipped ? 'Show portrait of' : 'Read about'} ${card.closest('.meet-devs__profile').querySelector('h3').textContent}`);
      front.setAttribute('aria-hidden', String(flipped));
      back.setAttribute('aria-hidden', String(!flipped));
      card.dispatchEvent(new CustomEvent('flipchange', { detail: { flipped } }));
    };

    card.addEventListener('click', () => {
      if (suppressClick) { suppressClick = false; return; }
      flip();
    });
    card.addEventListener('dragstart', event => event.preventDefault());
    card.addEventListener('pointerdown', event => {
      down = { x: event.clientX, y: event.clientY };
      card.setPointerCapture(event.pointerId);
    });
    card.addEventListener('pointerup', event => {
      if (!down) return;
      const dx = event.clientX - down.x;
      const dy = event.clientY - down.y;
      down = null;
      if (card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
      if (Math.abs(dx) > 35 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        suppressClick = true;
        flip();
        setTimeout(() => { suppressClick = false; }, 0);
      }
    });
    card.addEventListener('pointercancel', () => { down = null; });
    card.addEventListener('pointermove', event => {
      if (reducedMotion.matches || event.pointerType === 'touch') return;
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty('--tilt-x', `${((.5 - y) * 24).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${((x - .5) * 24).toFixed(2)}deg`);
      card.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
      card.style.setProperty('--glare-opacity', '.22');
    });
    card.addEventListener('pointerleave', () => {
      down = null;
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--glare-opacity', '0');
    });
  }

  const mount = () => document.querySelectorAll('.meet-devs__flip-card').forEach(setup);
  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => { scheduled = false; mount(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
