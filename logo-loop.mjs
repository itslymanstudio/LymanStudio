export const logoLoopStyles = `
  .framer-1r7bp32 > ul:has(.ticker-item [data-framer-name="Logo"]){visibility:hidden!important}
  .framer-2gd83s .framer-1r7bp32{margin-top:96px!important}
  .ratio-logo-loop{--ratio-logo-size:60px;--ratio-logo-gap:60px;position:relative;display:flex;align-items:center;width:100%;height:90px;overflow:hidden;isolation:isolate;mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
  .ratio-logo-loop__track,.ratio-logo-loop__group{display:flex;align-items:center;width:max-content;flex:none}
  .ratio-logo-loop__group{gap:var(--ratio-logo-gap);padding-right:var(--ratio-logo-gap)}
  .ratio-logo-loop__item{display:grid;place-items:center;flex:none;width:var(--ratio-logo-size);height:72px;color:#171717;transition:transform .35s cubic-bezier(.22,1,.36,1),color .35s}
  .ratio-logo-loop__item img{display:block;width:var(--ratio-logo-size);height:var(--ratio-logo-size);object-fit:contain}
  .ratio-logo-loop__item:hover,.ratio-logo-loop__item:focus-visible{transform:scale(1.16)}
  .ratio-logo-loop__item:focus-visible{outline:2px solid #171717;outline-offset:4px}
  @media(max-width:809px){.framer-2gd83s .framer-1r7bp32{margin-top:68px!important}.ratio-logo-loop{--ratio-logo-size:46px;--ratio-logo-gap:46px;height:76px}.ratio-logo-loop__item{height:64px}}
  @media(prefers-reduced-motion:reduce){.ratio-logo-loop{overflow-x:auto;mask-image:none;-webkit-mask-image:none;scrollbar-width:none}.ratio-logo-loop::-webkit-scrollbar{display:none}.ratio-logo-loop__item{transition:none}}
`;
