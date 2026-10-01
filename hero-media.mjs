// Generated artwork paired with locally rendered, seamless motion films.
export const heroMedia = [
  { original: 'y2VIDcwXz3puEBTpkCi51q9buBs.mp4', name: 'chrome-loop', alt: 'Rotating chrome sculpture against an acid-lime backdrop', video: 'chrome-motion.mp4' },
  { original: 'ui0xiw6ho8t85E3453z1YpP1M.png', name: 'paper-arch', alt: 'Ivory paper architecture against burnt orange' },
  { original: 'o6ocbBu8Ta7VUr372p01yKOGtY.mp4', name: 'glass-fold', alt: 'Flowing translucent glass panels with lavender reflections', video: 'glass-motion.mp4' },
  { original: 'mGQ8JCIsW2AAEHxOugX4Lrge2s.png', name: 'cobalt-fabric', alt: 'Sculptural waves of cobalt-blue woven fabric' },
  { original: 'HfoXDGQsWsPpJU5TGy2N63TFYnc.png', name: 'orange-bloom', alt: 'An abstract close-up of orange dahlia petals' },
  { original: 'Fih75Xv1jAnsMiQgavGmyB6AgI.png', name: 'lime-totem', alt: 'A charcoal sphere balanced on ribbed lime ceramic' },
  { original: 'GGQuG2gM9TePsmC84XEwEaDl3g.png', name: 'peach-ribbon', alt: 'Tactile peach paper curled into flowing folds' },
  { original: 'LOSSn1XuJFxdkQeIdkzwe48fY.png', name: 'acrylic-stack', alt: 'Stacked transparent acrylic forms in orange and cobalt' },
];

export function replaceHeroMedia(html, assetBase) {
  return html.replace(/<header\b[\s\S]*?<\/header>/gi, header => header.replace(/<(?:img|video)\b[^>]*>/gi, tag => {
    const art = heroMedia.find(item => tag.includes(item.original));
    if (!art) return tag;
    const video = /^<video\b/i.test(tag);
    const cleaned = tag.replace(/\s(?:src|srcset|sizes|alt|poster|preload|autoplay|muted|loop|playsinline|role|aria-label)(?:="[^"]*")?(?=\s|\/?>)/gi, '');
    const source = `${assetBase}/hero/${art.name}.webp`;
    const attributes = video
      ? `src="${assetBase}/hero/${art.video}" poster="${source}" preload="metadata" autoplay muted loop playsinline aria-label="${art.alt}" data-ratio-hero-motion`
      : `src="${source}" alt="${art.alt}"`;
    return cleaned.replace(/>$/, ` data-ratio-hero-art="${art.name}" ${attributes}>`);
  }));
}

function mountHeroMedia(media, assetBase) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const controllers = new Map();
  const set = (node, key, value) => {
    if (node.getAttribute(key) !== value) node.setAttribute(key, value);
  };
  const connect = (track, viewport) => {
    let animation, distance = 0, visible = true;
    let hovered = matchMedia('(hover: hover)').matches && viewport.matches(':hover');
    let focused = viewport.contains(document.activeElement);
    const videos = new Set();
    const shouldPause = () => hovered || focused || !visible || document.hidden || reduced.matches;
    const guardPlayback = event => { if (shouldPause()) event.target.pause(); };
    // Keep playback governed by the whole strip, including originals just outside its crop.
    const guardPause = event => {
      if (!shouldPause() && event.target.isConnected) event.target.play().catch(() => {});
    };
    const sync = () => {
      const paused = shouldPause();
      viewport.toggleAttribute('data-ratio-strip-paused', paused);
      if (animation) paused ? animation.pause() : animation.play();
      for (const video of videos) {
        if (!video.isConnected) { video.removeEventListener('play', guardPlayback); video.removeEventListener('pause', guardPause); videos.delete(video); continue; }
        if (paused) video.pause();
        else if (video.paused) video.play().catch(() => {});
      }
    };
    const refresh = () => {
      const originals = [...track.children].slice(0, media.length);
      if (originals.length !== media.length) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 10;
      // Keep fractional layout pixels so every repeat lands exactly on its copy.
      const nextDistance = originals.reduce((sum, item) => sum + parseFloat(getComputedStyle(item).width) + gap, 0);
      if (!nextDistance) return;
      const copies = Math.max(2, Math.ceil(viewport.clientWidth / nextDistance) + 1);
      while (track.children.length < media.length * copies) {
        for (const item of originals) {
          const clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          clone.dataset.ratioHeroCopy = '';
          clone.querySelectorAll('a,button,[tabindex]').forEach(node => node.tabIndex = -1);
          track.append(clone);
        }
      }
      for (const video of track.querySelectorAll('video[data-ratio-hero-motion]')) {
        if (!videos.has(video)) { videos.add(video); video.addEventListener('play', guardPlayback); video.addEventListener('pause', guardPause); }
      }
      if (!animation || Math.abs(nextDistance - distance) > .5) {
        const elapsed = Number(animation?.currentTime || 0);
        animation?.cancel();
        distance = nextDistance;
        animation = track.animate([{ translate: '0px 0px' }, { translate: `${-distance}px 0px` }], {
          duration: distance / 36 * 1000, iterations: Infinity, easing: 'linear',
        });
        animation.currentTime = elapsed % (distance / 36 * 1000);
        track._ratioHeroAnimation = animation;
      }
      sync();
    };
    const enter = event => { if (event.pointerType !== 'touch') { hovered = true; sync(); } };
    const leave = () => { hovered = false; sync(); };
    const focus = () => { focused = true; sync(); };
    const blur = event => { if (!viewport.contains(event.relatedTarget)) { focused = false; sync(); } };
    const key = event => {
      if (reduced.matches && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        viewport.scrollBy({ left: event.key === 'ArrowRight' ? 192 : -192, behavior: 'instant' });
      }
    };
    track.classList.add('ratio-hero-track');
    viewport.classList.add('ratio-hero-viewport');
    viewport.tabIndex = 0;
    viewport.setAttribute('role', 'region');
    viewport.setAttribute('aria-label', 'Studio artwork carousel');
    viewport.addEventListener('pointerenter', enter);
    viewport.addEventListener('pointerleave', leave);
    viewport.addEventListener('focusin', focus);
    viewport.addEventListener('focusout', blur);
    viewport.addEventListener('keydown', key);
    const resize = new ResizeObserver(refresh);
    resize.observe(viewport);
    const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    visibility.observe(viewport);
    refresh();
    return { refresh, sync, destroy() {
      animation?.cancel(); resize.disconnect(); visibility.disconnect();
      viewport.removeEventListener('pointerenter', enter);
      viewport.removeEventListener('pointerleave', leave);
      viewport.removeEventListener('focusin', focus);
      viewport.removeEventListener('focusout', blur);
      viewport.removeEventListener('keydown', key);
      for (const video of videos) { video.removeEventListener('pause', guardPause); video.removeEventListener('play', guardPlayback); video.pause(); }
    } };
  };
  const update = () => {
    for (const [track, controller] of controllers) {
      if (!track.isConnected) { controller.destroy(); controllers.delete(track); }
    }
    for (const header of document.querySelectorAll('header[data-framer-name="Header"]')) {
      const carousel = header.querySelector('[data-framer-name="Carousel"]');
      if (!carousel) continue;
      for (const node of carousel.querySelectorAll('img, video')) {
        const original = node.getAttribute('src') || '';
        const art = media.find(item => original.includes(item.original) || node.dataset.ratioHeroArt === item.name);
        if (!art) continue;
        const source = `${assetBase}/hero/${art.name}.webp`;
        set(node, 'data-ratio-hero-art', art.name);
        if (node.tagName === 'VIDEO') {
          node.muted = true;
          node.defaultMuted = true;
          node.loop = true;
          node.playsInline = true;
          node.autoplay = !reduced.matches;
          node.preload = 'metadata';
          set(node, 'src', `${assetBase}/hero/${art.video}`);
          set(node, 'poster', source);
          node.removeAttribute('role');
          set(node, 'aria-label', art.alt);
          set(node, 'data-ratio-hero-motion', '');
        } else {
          node.removeAttribute('srcset');
          node.removeAttribute('sizes');
          set(node, 'src', source);
          set(node, 'alt', art.alt);
        }
      }
      const track = carousel.querySelector('ul:has(> .ticker-item)');
      if (track) {
        if (!controllers.has(track)) controllers.set(track, connect(track, track.parentElement));
        else controllers.get(track).refresh();
      }
    }
  };
  let scheduled = false;
  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { scheduled = false; update(); });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'srcset', 'poster'] });
  const syncAll = () => { for (const controller of controllers.values()) controller.sync(); };
  document.addEventListener('visibilitychange', syncAll);
  reduced.addEventListener('change', syncAll);
  update();
}

export function heroMediaRuntime(assetBase) {
  return `<script>(${mountHeroMedia.toString()})(${JSON.stringify(heroMedia)},${JSON.stringify(assetBase)})</script>`;
}

export const heroMediaStyles = `
  header[data-framer-name="Header"] [data-framer-name="Carousel"] [data-framer-name="Item"] {
    isolation: isolate;
  }
  header[data-framer-name="Header"] [data-framer-name="Carousel"] [data-framer-name="Item"] > div {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    transform: none !important;
  }
  header[data-framer-name="Header"] [data-ratio-hero-art] {
    width: 100% !important;
    height: 100% !important;
    display: block !important;
    object-fit: cover !important;
    object-position: 50% 50% !important;
  }
  .ratio-hero-track {
    /* The shared controller owns translate. */
    transform: none !important;
    opacity: 1 !important;
    will-change: translate;
  }
  .ratio-hero-viewport:focus-visible { outline: 2px solid #101010; outline-offset: 5px; }
  .ratio-hero-viewport[data-ratio-strip-paused] .ticker-item { animation-play-state: paused !important; }
  @media (prefers-reduced-motion: reduce) {
    .ratio-hero-viewport { overflow-x: auto !important; scrollbar-width: none; }
    .ratio-hero-track { translate: none !important; will-change: auto; }
    .ratio-hero-track [aria-hidden="true"] { display: none !important; }
  }
`;
