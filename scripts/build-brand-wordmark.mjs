import { readFile, writeFile } from 'node:fs/promises';

const font = await readFile('public/_assets/fonts/space-grotesk-latin-wght-normal.woff2');
const embeddedFont = `data:font/woff2;base64,${font.toString('base64')}`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 76" role="img" aria-label="Ratio Design">
  <style>@font-face{font-family:SpaceGroteskLogo;src:url("${embeddedFont}") format("woff2");font-weight:300 700;font-style:normal}</style>
  <text x="0" y="59" fill="#1E1E1E" font-family="SpaceGroteskLogo" font-size="74" font-weight="700" letter-spacing="-3.5">RATIO</text>
  <text x="252" y="55" fill="#1E1E1E" font-family="SpaceGroteskLogo" font-size="18" font-weight="700" letter-spacing="1.1">DESIGN</text>
</svg>`;
await writeFile('public/_assets/ratio-wordmark.svg', svg);
