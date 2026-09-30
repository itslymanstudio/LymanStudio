import React from 'react';
import { createRoot } from 'react-dom/client';
import MagnetLines from './MagnetLines';

document.querySelectorAll('[data-footer-magnet-lines]').forEach(element => {
  createRoot(element).render(<MagnetLines rows={9} columns={9} containerSize="100%"
    lineColor="var(--footer-lime)" lineWidth="2px" lineHeight="clamp(18px, 2.2vw, 32px)"
    baseAngle={-10} style={{ height: '100%' }} />);
});
