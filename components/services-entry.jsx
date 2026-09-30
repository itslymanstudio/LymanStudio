import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import CircularCarousel from './CircularCarousel';
import { serviceItems } from '../services-carousel.mjs';

function Services({ assetBase }) {
  const [active, setActive] = useState(0);
  const [focusItem, setFocusItem] = useState(null);
  const service = serviceItems[active];
  const items = serviceItems.map(item => ({ ...item, src: `${assetBase}/services/${item.slug}.svg`, alt: item.title }));
  return <>
    <div className="ratio-services__stage">
      <CircularCarousel items={items} preset="cylinder" intro="rise" cardWidth={270} aspectRatio={.82} gap={24} speed={12} tilt={-8} perspective={2500} curve={1} depthFade={.42} fadeColor="#f3f0e9" innerShade={.78} cornerRadius={18} parallax={.18} stretch={.2} momentum={.35} onChange={setActive} focusItem={focusItem} ariaLabel="Explore Lyman Studio services. Drag or use the arrow keys to rotate." />
    </div>
    <div className="ratio-services__detail">
      <div className="ratio-services__selection">
        <p className="ratio-services__category">{String(active + 1).padStart(2,'0')} / 08 — {service.category}</p>
        <h3>{service.title}</h3><p className="ratio-services__description">{service.description}</p>
      </div>
      <p className="ratio-services__hint">Drag to explore · Hover to pause<br />Use ← / → when focused</p>
    </div>
    <ul className="ratio-services__picker" aria-label="Choose a service">
      {serviceItems.map((item,index) => <li key={item.slug}><button type="button" aria-pressed={active === index} onClick={() => setFocusItem({index})}>{item.title}</button></li>)}
    </ul>
  </>;
}

const mounted = new WeakSet();
function mount() {
  document.querySelectorAll('[data-services-carousel]').forEach(element => {
    if (mounted.has(element)) return;
    mounted.add(element);
    createRoot(element).render(<Services assetBase={element.dataset.assetBase} />);
  });
}
mount();
new MutationObserver(mount).observe(document.querySelector('#main') || document.body,{childList:true,subtree:true});
