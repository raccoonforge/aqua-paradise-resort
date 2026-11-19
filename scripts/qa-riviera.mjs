import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const url = 'http://127.0.0.1:4173/aqua-paradise-resort/riviera-polish/#/';
const dir = 'qa-output/riviera-polish';
await fs.mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const report = { viewports: [], transitions: [], errors: [] };
const ids = ['hero', 'about', 'worlds', 'attractions', 'planner'];
for (const width of [1440, 1280, 1024, 768, 375, 320]) {
  const page = await browser.newPage({ viewport: { width, height: width < 800 ? 812 : 900 } });
  page.on('pageerror', err => report.errors.push({ width, error: err.message }));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(ids => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    headings: [...document.querySelectorAll('main h1, main h2')].map(e => ({ text: e.textContent?.trim(), hiddenVisually: e.classList.contains('sr-only') })),
    brokenImages: [...document.images].filter(e => e.complete && !e.naturalWidth).map(e => e.src),
    sections: ids.map(id => { const el = document.getElementById(id); const r = el?.getBoundingClientRect(); return { id, top: Math.round((r?.top ?? 0) + scrollY), bottom: Math.round((r?.bottom ?? 0) + scrollY) }; })
  }), ids);
  await page.screenshot({ path: `${dir}/home-${width}.png`, fullPage: true, animations: 'disabled' });
  if (width === 1440) {
    const points = result.sections;
    const footer = await page.locator('.sunset-pier').boundingBox();
    if (footer) points.push({ id: 'footer', top: footer.y, bottom: footer.y + footer.height });
    for (let i=0; i<points.length-1; i++) {
      const prev=points[i], next=points[i+1], y=Math.max(0,Math.round((prev.bottom+next.top)/2-180));
      await page.screenshot({ path: `${dir}/transition-${prev.id}-${next.id}.png`, clip: { x:0, y, width, height:360 }, animations:'disabled' });
      report.transitions.push({ from:prev.id, to:next.id, gap:Math.round(next.top-prev.bottom) });
    }
  }
  report.viewports.push({ width, ...result, horizontalOverflow: result.scrollWidth > result.viewportWidth+1 });
  await page.close();
}
await browser.close();
await fs.writeFile(`${dir}/report.json`, JSON.stringify(report,null,2));
console.log(JSON.stringify({ viewports: report.viewports.map(x => ({width:x.width,horizontalOverflow:x.horizontalOverflow,brokenImages:x.brokenImages.length})), errors:report.errors, transitions:report.transitions },null,2));
if (report.errors.length || report.viewports.some(x => x.horizontalOverflow || x.brokenImages.length)) process.exitCode=1;
