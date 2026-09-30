'use client';

import { useEffect, useRef } from 'react';
import './MagnetLines.css';

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = [...container.querySelectorAll('span')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let frame = 0;
    let pointer;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(container);

    const update = () => {
      frame = 0;
      if (!visible || reducedMotion.matches || !pointer) return;
      // Grid-cell centres stay fixed as the bars rotate. Read layout once.
      const rect = container.getBoundingClientRect();
      items.forEach((item, index) => {
        const centerX = rect.left + ((index % columns) + .5) * rect.width / columns;
        const centerY = rect.top + (Math.floor(index / columns) + .5) * rect.height / rows;
        const angle = Math.atan2(pointer.y - centerY, pointer.x - centerX) * 180 / Math.PI;
        item.style.setProperty('--rotate', `${angle}deg`);
      });
    };
    const onPointerMove = event => {
      if (!visible || reducedMotion.matches || event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reset = () => {
      if (reducedMotion.matches) items.forEach(item => item.style.setProperty('--rotate', `${baseAngle}deg`));
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    reducedMotion.addEventListener('change', reset);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      reducedMotion.removeEventListener('change', reset);
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [rows, columns, baseAngle]);

  return <div ref={containerRef} aria-hidden="true" className={`magnetLines-container ${className}`}
    style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`, width: containerSize, height: containerSize, ...style }}>
    {Array.from({ length: rows * columns }, (_, index) => <span key={index}
      style={{ '--rotate': `${baseAngle}deg`, backgroundColor: lineColor, width: lineWidth, height: lineHeight }} />)}
  </div>;
}
