import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

// Web asset encoding only. Keep the generated PNG masters unchanged.
const { assets } = JSON.parse(await readFile('assets/hero-source/prompts.json', 'utf8'));
await mkdir('public/_assets/hero', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  for (const { name, webAsset } of assets) {
    const source = await readFile(`assets/hero-source/${name}.png`);
    const encoded = await page.evaluate(async data => {
      const image = new Image();
      image.src = data;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      return canvas.toDataURL('image/webp', .88).split(',')[1];
    }, `data:image/png;base64,${source.toString('base64')}`);
    const output = Buffer.from(encoded, 'base64');
    await writeFile(webAsset, output);
    console.log(`${name}: ${Math.round(output.length / 1024)} KB`);
  }
} finally {
  await browser.close();
}
