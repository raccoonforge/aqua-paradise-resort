import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const url = process.env.RIVIERA_QA_URL || 'http://127.0.0.1:4173/aqua-paradise-resort/riviera-polish/#/';
const dir = 'qa-output/riviera-polish';
const sections = ['hero', 'about', 'worlds', 'attractions', 'planner', 'footer'];
const widths = [1440, 1280, 1024, 768, 375, 320];
const report = { viewports: [], transitions: [], errors: [] };
const executablePath = process.env.RIVIERA_CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : { channel: 'chrome' });

async function checkLayout(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const img of document.images) img.loading = 'eager';
    await Promise.allSettled([...document.images].map(img => img.decode()));
  });
  const geometry = await page.evaluate(ids => {
    const horizontalOverflow = document.documentElement.scrollWidth > window.innerWidth;
    const content = [...document.querySelectorAll('main :is(h1,h2,h3), main .apr-hero__actions a, footer nav a')];
    const unreadableText = content.filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width < 2 || rect.height < 2 || rect.left < -1 || rect.right > window.innerWidth + 1
        || getComputedStyle(el).clipPath !== 'none';
    }).map(el => el.textContent.trim());
    const brokenImages = [...document.images].filter(img => !img.naturalWidth).map(img => img.currentSrc);
    const bounds = ids.map(id => {
      const el = document.querySelector(id === 'footer' ? '.sunset-pier' : '#' + id);
      const { top, height } = el.getBoundingClientRect();
      return { id, top: Math.round(top + scrollY), bottom: Math.round(top + scrollY + height) };
    });
    return { horizontalOverflow, unreadableText, brokenImages, bounds };
  }, sections);

  return geometry;
}

async function checkMenu(page, width) {
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Перейти к основному содержимому' });
  assert(await skip.evaluate(el => el === document.activeElement), 'Skip link is the first Tab stop');
  await page.keyboard.press('Enter');
  assert(await page.locator('main').evaluate(el => el === document.activeElement), 'Skip link focuses main');
  assert.equal(new URL(page.url()).hash, '#/', 'Skip link leaves the router in the home state');

  const burger = page.getByRole('button', { name: 'Открыть меню' });
  if (width <= 950) {
    await burger.press('Enter');
    const drawer = page.getByRole('dialog', { name: 'Меню курорта' });
    await drawer.waitFor();
    await drawer.getByText('Развлечения', { exact: true }).click();
    await drawer.getByRole('link', { name: /Тематические зоны/ }).waitFor();
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.activeElement?.classList.contains('nav-burger'));
    await burger.click();
    await drawer.getByRole('link', { name: 'О курорте', exact: true }).click();
  } else {
    const nav = page.getByRole('navigation', { name: 'Основная навигация' });
    const dropdown = nav.getByRole('button', { name: 'Развлечения' });
    await dropdown.press('Enter');
    await nav.getByRole('link', { name: /Тематические зоны/ }).waitFor();
    await dropdown.press('Escape');
    assert.equal(await dropdown.getAttribute('aria-expanded'), 'false');
    await nav.getByRole('link', { name: 'О курорте', exact: true }).click();
  }
  await page.waitForURL('**/#/?section=about');
  await page.waitForFunction(() => document.activeElement?.id === 'about');
  const backTop = page.getByRole('button', { name: 'Наверх' });
  await backTop.press('Enter');
  await page.waitForFunction(() => window.scrollY === 0 && document.activeElement?.id === 'hero');
}

async function checkWorlds(page) {
  const wheel = page.getByRole('group', { name: 'Диск миров Aqua Paradise' });
  const current = page.locator('#apr-worlds-current');
  const strip = page.getByRole('group', { name: 'Билеты в девять миров' });
  const tickets = strip.getByRole('button');
  const expected = await tickets.allTextContents();
  assert.equal(expected.length, 9);

  await page.getByRole('button', { name: 'Предыдущий мир' }).click();
  assert.equal(await current.innerText(), expected[8]);
  await page.getByRole('button', { name: 'Следующий мир' }).click();
  assert.equal(await current.innerText(), expected[0]);
  for (let index = 0; index < expected.length; index++) {
    const ticket = tickets.nth(index);
    await ticket.click();
    assert.equal(await current.innerText(), expected[index]);
    assert.equal(await ticket.getAttribute('aria-pressed'), 'true');
    assert.equal(await wheel.getByRole('button', { name: expected[index], exact: true }).getAttribute('aria-pressed'), 'true');
    const descriptionBottom = await page.locator('.apr-worlds__description').evaluate(el => el.getBoundingClientRect().bottom);
    assert((await page.getByRole('link', { name: 'Подробнее о зоне' }).boundingBox()).y >= descriptionBottom, 'Zone link is below its description');
  }
  await wheel.getByRole('button', { name: expected[8], exact: true }).press('ArrowRight');
  assert.equal(await current.innerText(), expected[0]);
  await wheel.getByRole('button', { name: expected[1], exact: true }).press('Enter');
  assert.equal(await current.innerText(), expected[1]);

  await page.getByRole('link', { name: 'Подробнее о зоне' }).click();
  await page.waitForURL('**/#/zones?zone=paradise-market');
  await page.getByRole('tablist', { name: 'Сведения о зоне Paradise Market' }).waitFor();
}

async function checkDrag(page) {
  const wheel = page.getByRole('group', { name: 'Диск миров Aqua Paradise' });
  await wheel.scrollIntoViewIfNeeded();
  const { x, y, width, height } = await wheel.boundingBox();
  const cx = x + width / 2;
  const cy = y + height / 2;
  const radius = width * .4;
  await page.mouse.move(cx, cy - radius);
  await page.mouse.down();
  for (let angle = 5; angle <= 40; angle += 5) {
    const radians = angle * Math.PI / 180;
    await page.mouse.move(cx + radius * Math.sin(radians), cy - radius * Math.cos(radians));
  }
  await page.mouse.up();
  assert.equal(await page.locator('#apr-worlds-current').innerText(), 'Ocean Bay', 'Dragging by one segment selects the previous zone');
}

async function checkTickets(page, all) {
  const tickets = page.locator('.golden-ticket');
  assert.equal(await tickets.count(), 4);
  const rides = await tickets.evaluateAll(links => links.map(link => ({
    name: link.querySelector('h3').textContent,
    href: link.getAttribute('href'),
  })));
  for (const ride of (all ? rides : rides.slice(0, 1))) {
    await page.locator('.golden-ticket').filter({ hasText: ride.name }).click();
    await page.waitForURL('**/' + ride.href);
    await page.getByRole('dialog', { name: ride.name, exact: true }).waitFor();
    await page.goBack();
    await page.locator('.golden-tickets').waitFor();
  }
  await page.getByRole('link', { name: 'Все аттракционы' }).click();
  await page.getByRole('heading', { name: 'Аттракционы и развлечения' }).waitFor();
  await page.goBack();
  await page.locator('.golden-tickets').waitFor();
}

async function checkPlanner(page) {
  const planner = page.locator('#planner');
  await planner.getByRole('button', { name: 'Следующая дата' }).click();
  const date = await planner.locator('#board-date').inputValue();
  assert(date > await planner.locator('#board-date').getAttribute('min'));
  await planner.getByRole('button', { name: 'Следующая компания' }).click();
  assert.equal(await planner.locator('#board-party').inputValue(), 'family');
  await planner.getByRole('button', { name: 'Релакс', exact: true }).click();
  await planner.getByRole('button', { name: 'Составить мой маршрут' }).click();
  assert.equal(await planner.getByRole('alert').innerText(), 'Выберите хотя бы один интерес.');
  await planner.getByRole('button', { name: 'Семейный отдых' }).click();
  await planner.getByRole('button', { name: 'Составить мой маршрут' }).click();
  await page.getByRole('heading', { name: 'Планировщик посещения' }).waitFor();
  const [path, query] = new URL(page.url()).hash.split('?');
  assert.equal(path, '#/planner');
  const params = new URLSearchParams(query);
  assert.equal(params.get('date'), date);
  assert.equal(params.get('party'), 'family');
  assert.equal(params.get('interests'), 'Семейный отдых');
  assert.equal(await page.locator('#planner-date').inputValue(), date);
  assert.equal(await page.getByRole('button', { name: 'Удалить гостя', exact: false }).count(), 3);
  assert.equal(await page.getByRole('button', { name: 'Семейный отдых', exact: true }).getAttribute('aria-pressed'), 'true');
}

async function checkResortPages(page) {
  const destinations = [
    ['Карта острова', '#/map', page.getByRole('region', { name: 'Схематическая карта острова' })],
    ['Отель', '#/hotel', page.getByRole('heading', { name: 'Искусство безупречного отдыха' })],
    ['Посещение', '#/visit', page.getByRole('heading', { name: 'Ваше путешествие начинается здесь' })],
    ['Билеты', '#/tickets', page.getByRole('heading', { name: 'Билеты', exact: true })],
  ];
  for (const [name, route, landmark] of destinations) {
    await page.goto(url);
    await page.locator('.sunset-pier').getByRole('link', { name, exact: true }).click();
    await page.waitForURL('**/' + route);
    await landmark.waitFor();
  }
}

try {
  await fs.mkdir(dir, { recursive: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.setDefaultTimeout(10000);
  let width;
  const baseOrigin = new URL(url).origin;
  const entry = (error, resource) => report.errors.push({ width, error, resource });
  page.on('pageerror', error => entry(error.message));
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource:')) entry(msg.text());
  });
  page.on('response', response => {
    if (response.status() >= 400 && new URL(response.url()).origin === baseOrigin) entry('HTTP ' + response.status(), response.url());
  });
  page.on('requestfailed', request => {
    const error = request.failure()?.errorText;
    if (error !== 'net::ERR_ABORTED' && new URL(request.url()).origin === baseOrigin) entry(error, request.url());
  });

  for (width of widths) {
    try {
      const height = width < 800 ? 812 : 900;
      await page.setViewportSize({ width, height });
      await page.goto('about:blank');
      await page.goto(url, { waitUntil: 'load' });
      await page.locator('#hero-title').waitFor();
      const { bounds, ...layout } = await checkLayout(page);
      report.viewports.push({ width, ...layout });
      assert(!layout.horizontalOverflow, 'Document exceeds the viewport');
      assert.deepEqual(layout.brokenImages, []);
      assert.deepEqual(layout.unreadableText, []);

      await page.screenshot({ path: `${dir}/home-${width}.png`, fullPage: true, animations: 'disabled' });

      if ([1440, 768, 375].includes(width)) {
        const { top, bottom } = bounds.find(section => section.id === 'about');
        const aboutViews = [
          { name: 'full', y: top, height: bottom - top + 24 },
          { name: 'top', y: top - 56, height: 350 },
          { name: 'bottom', y: bottom - 300, height: 364 },
        ];
        for (const { name, y, height } of aboutViews) {
          await page.screenshot({
            path: `${dir}/about-${width}-${name}.png`,
            fullPage: true,
            clip: { x: 0, y, width, height },
            animations: 'disabled',
          });
        }
      }
      for (let index = 1; index < bounds.length; index++) {
        const prev = bounds[index - 1];
        const next = bounds[index];
        const heroToAbout = prev.id === 'hero' && next.id === 'about';
        const tablet = width === 1024 || width === 768;
        if (width !== 1440 && width !== 375 && !(heroToAbout && tablet)) continue;

        const y = Math.max(0, Math.round((prev.bottom + next.top) / 2 - (heroToAbout ? 78 : 180)));
        const clipHeight = heroToAbout && width <= 800 ? 700 : 360;
        await page.screenshot({
          path: `${dir}/transition-${width}-${prev.id}-${next.id}.png`,
          fullPage: true,
          clip: { x: 0, y, width, height: clipHeight },
          animations: 'disabled',
        });
        report.transitions.push({ width, from: prev.id, to: next.id, gap: next.top - prev.bottom });
      }

      await checkMenu(page, width);
      if (width === 1440) {
        await checkDrag(page);
        await page.getByRole('button', { name: 'Следующий мир' }).click();
      }
      assert(await page.locator('.apr-worlds__reel').evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) < .001));
      await checkWorlds(page);
      await page.goto(url);
      await checkTickets(page, width === 1440);
      await checkPlanner(page);
      if (width === 1440 || width === 375) await checkResortPages(page);
    } catch (error) {
      entry(error.message);
    }
  }
} finally {
  await browser.close();
  await fs.writeFile(`${dir}/report.json`, JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
