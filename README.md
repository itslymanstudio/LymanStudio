# Bungee local clone

A local reproduction of https://bungee.framer.website, rebranded as Ratio Design with Space Grotesk display/body type and DM Mono navigation/metadata across all 24 public pages, responsive styles, images, videos, animation runtime, and CMS snapshots.

## Run

On Windows, double-click `Start Preview.cmd` for the full animated site. This starts the background server if needed and opens the working preview in your browser.

You can also open the root `index.html` directly, with no server or internet needed for its cards, images, fonts, local videos, and recreated motion. The portable version includes continuous hero/client-logo strips, staggered scroll reveals, an animated blur-backed menu, project hover effects, carousel controls, single-open FAQ transitions, and upward page wipes. It uses browser-native animations rather than the compiled Framer runtime, so exact spring/scroll timing may differ. It respects reduced-motion preferences. Other pages have matching file previews under `preview/`. Opening `public/index.html` as a file forwards to the root preview. Run `npm run build:preview` to regenerate these from `public/`.

Every page ends with a custom contact panel and project enquiry form, styled from the supplied references. The contact link uses `xeo776@gmail.com`. Form submissions remain local-preview only until a form service is connected.

The original Framer runtime requires HTTP and the custom CMS range protocol. For its original motion implementation, use `Start Preview.cmd` rather than an editor's generic HTML preview.

Requires Node.js 22 or later. No dependency installation is needed to serve the included site.

```powershell
cd C:\Users\ADMIN\bungee-clone
npm start
```

Open http://localhost:3000. Use `$env:PORT = 3001` before launching to choose another port.

## Contents

- `public/`: website pages and locally downloaded assets.
- `public/_assets/fonts/`: self-hosted Space Grotesk and DM Mono font files and their SIL Open Font Licenses.
- `server.mjs`: local server, including the byte-range protocol required by the published CMS and videos.
- `public/local-preview.js`: prevents contact/newsletter submissions from going to the original site's owner.
- `scripts/mirror.mjs`: reproducible downloader and local URL conversion.
- `mirror-manifest.json`: source URL, page routes, asset inventory, and download failures.
- `qa/`: browser screenshots and verification reports.

## Scope and limitations

This is a mirror of the published website with its compiled Framer runtime, not an editable Framer project or a hand-authored React component library. The supplied HTML, CSS, scripts, and assets can be edited locally, but compiled components are harder to maintain than original source components.

Navigation, hover effects, reveals, carousels, accordions, page transitions, and responsive behavior use the original runtime. Source branding, outbound links, and template badges are preserved. Original tracking and the remote editor integration are disabled. Forms display a local-preview message; connect your own service before using them to collect submissions. YouTube embeds and some dynamically requested Framer icon modules still require internet access.

## Refresh and verify

`npm run build` refreshes the published pages and downloads dependencies. It requires internet access and overwrites generated files in `public/`; keep custom edits separately. The homepage snapshot is stored in `reference.html`.

Browser checks require `npm install` and the Playwright Chromium browser (`npx playwright install chromium` if not already installed).

```powershell
node scripts/inspect.mjs
node scripts/compare.mjs
node scripts/verify.mjs
```

`inspect` captures desktop/mobile comparisons; `compare` measures homepage sections and tests menu navigation; `verify` visits all routes and tests the FAQ toggle. Animated screenshots naturally differ by capture time.

## Validation results

Motion references and comparisons are saved in `qa/motion/`: `reference-desktop.webm` records the source website's menu, scrolling, and FAQ; `local-1440.webm`, `local-390.webm`, and `local-390-reduced.webm` record the portable version. `checks.json` contains offline interaction checks. Run `node scripts/test-motion.mjs` to repeat them.

- All 24 routes loaded with no JavaScript console errors or HTTP failures in the completed route test.
- Animated menu navigation to Works and FAQ state changes passed.
- Homepage heights match the reference: 11,035 px at 1440 px wide and 12,353 px at 390 px wide. Every measured desktop section matched its reference position and height.
- Both tested forms display the preview message and send no POST requests.
- Lighthouse's throttled mobile audit: performance 27/100, accessibility 93/100, CLS 0.016, LCP 24.3 seconds. Performance needs optimization before production, particularly the full-resolution media and compiled runtime. Fidelity checks do not imply production performance readiness.
- The Lighthouse report was saved successfully; its CLI subsequently encountered a Windows temporary-directory cleanup permission error.

The frontend design skill guided the reference audit and visual checks. Its general redesign preferences were overridden where necessary to preserve the user's requested reference exactly.
