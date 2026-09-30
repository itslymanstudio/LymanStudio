import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

export async function buildBlogCovers() {
  const { covers } = JSON.parse(await readFile('assets/blog-source/prompts.json','utf8'));
  await mkdir('public/_assets/blog-covers',{recursive:true});
  const report = [];
  for (const { name } of covers) {
    for (const width of [640,960,1440]) {
      const bytes = await sharp(`assets/blog-source/${name}.png`).resize({width,withoutEnlargement:true}).webp({quality:84,effort:6}).toBuffer();
      const file = `public/_assets/blog-covers/${name}-${width}.webp`;
      await writeFile(file,bytes);
      report.push({file,width,kb:+(bytes.length/1024).toFixed(1)});
    }
  }
  console.log(JSON.stringify(report));
}
if (process.argv[1]?.replaceAll('\\','/').endsWith('/build-blog-covers.mjs')) await buildBlogCovers();
