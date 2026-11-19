import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import { PNG } from 'pngjs';
const url = 'http://127.0.0.1:4173/aqua-paradise-resort/riviera-polish/#/';
const dir = 'qa-output/riviera-polish';
await fs.mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const report = { viewports: [], transitions: [], errors: [] };
const ids = ['hero', 'about', 'worlds', 'attractions', 'planner'];
for (const width of [1440, 1280, 1024, 768, 375, 320]) {
  const page = await browser.newPage({ viewport: { width, height: width < 800 ? 812 : 900 } });
  page.on('pageerror', err => report.errors.push({ width, error: err.message }));
  const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  if (!response?.ok()) report.errors.push({ width, error: `HTTP status ${response?.status()}` });
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(ids => ({
    scrollWidth: document.documentElement.scrollWidth,
    hasHome: !!document.querySelector('#hero'),
    hasFooter: !!document.querySelector('.sunset-pier'),
    bodyStart: document.body.textContent?.slice(0,140),
    viewportWidth: window.innerWidth,
    headings: [...document.querySelectorAll('main h1, main h2')].map(e => ({ text: e.textContent?.trim(), hiddenVisually: e.classList.contains('sr-only') })),
    brokenImages: [...document.images].filter(e => e.complete && !e.naturalWidth).map(e => e.src),
    sections: ids.map(id => { const el = document.getElementById(id); const r = el?.getBoundingClientRect(); return { id, top: Math.round((r?.top ?? 0) + scrollY), bottom: Math.round((r?.bottom ?? 0) + scrollY) }; })
  }), ids);
  const fullScreenshot = await page.screenshot({ fullPage: true, animations: 'disabled' });
  await fs.writeFile(`${dir}/home-${width}.png`, fullScreenshot);
  if (width === 1440) {
    const png = PNG.sync.read(fullScreenshot);
    const points = result.sections;
    const footer = await page.locator('.sunset-pier').count() ? await page.locator('.sunset-pier').boundingBox() : null;
    if (footer) points.push({ id: 'footer', top: footer.y, bottom: footer.y + footer.height });
    for (let i=0; i<points.length-1; i++) {
      const prev=points[i], next=points[i+1], y=Math.max(0,Math.round((prev.bottom+next.top)/2-180));
      const height = Math.min(360,png.height);
      const clippedY = Math.max(0,Math.min(y,png.height-height));
      const target = new PNG({ width:Math.min(width,png.width), height });
      PNG.bitblt(png,target,0,clippedY,target.width,height,0,0);
      await fs.writeFile(`${dir}/transition-${prev.id}-${next.id}.png`,PNG.sync.write(target));
      report.transitions.push({ from:prev.id, to:next.id, gap:Math.round(next.top-prev.bottom) });
    }
  }
  report.viewports.push({ width, ...result, horizontalOverflow: result.scrollWidth > result.viewportWidth+1 });
  if (!result.hasHome || !result.hasFooter) report.errors.push({ width, error: `Expected home and footer; got home=${result.hasHome}, footer=${result.hasFooter}, body=${result.bodyStart}` });
  await page.close();
}
await browser.close();
await fs.writeFile(`${dir}/report.json`, JSON.stringify(report,null,2));
console.log(JSON.stringify({ viewports: report.viewports.map(x => ({width:x.width,horizontalOverflow:x.horizontalOverflow,brokenImages:x.brokenImages.length,hasHome:x.hasHome,hasFooter:x.hasFooter})), errors:report.errors, transitions:report.transitions },null,2));
if (report.errors.length || report.viewports.some(x => x.horizontalOverflow || x.brokenImages.length)) process.exitCode=1;
