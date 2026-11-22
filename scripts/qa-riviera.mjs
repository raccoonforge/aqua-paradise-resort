import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { zonesData } from '../src/data/zones.ts';
import { ATTRACTIONS, ATTRACTION_IDS_BY_ZONE } from '../src/data/attractions.ts';

const url = process.env.RIVIERA_QA_URL || 'http://127.0.0.1:4173/aqua-paradise-resort/riviera-polish/#/';
const dir = 'qa-output/riviera-polish';
const sections = ['hero', 'about', 'worlds', 'attractions', 'planner', 'footer'];
const widths = [1920, 1440, 1280, 1024, 768, 390, 375, 320];
const screenshotWidths = [1920, 1440, 768, 390, 375];
const report = { viewports: [], transitions: [], atlas: [], errors: [] };
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

async function checkHomeDesignSystem(page) {
  const style = await page.evaluate(() => {
    const css = selector => {
      const node = document.querySelector(selector);
      if (!node) throw Error('Missing design element: ' + selector);
      return getComputedStyle(node);
    };
    const headings = ['.apr-about h2','.apr-worlds__heading h2','.tickets-title h2','.departure-copy h2']
      .map(sel => parseFloat(css(sel).fontSize));
    const actions = ['.riv-mast .ticket-cta','.apr-hero__button--primary','.apr-worlds__link',
      '.ticket-all .riv-button','.board-submit'].map(sel => css(sel).backgroundColor);
    const routes = [...document.querySelectorAll('.riv-mast a[href], .riv-drawer a[href], .riv-home a[href], .sunset-pier a[href]')]
      .map(a => a.getAttribute('href'))
      .filter(href => href.startsWith('#/'))
      .map(href => href.slice(2).split('?')[0]);
    return {
      headings, actions, hub: css('.apr-worlds__hub').backgroundColor,
      stamp: css('.apr-worlds__stamp').backgroundColor,
      headerFont: css('.riv-mast').fontFamily,
      headlineFont: css('.apr-about h2').fontFamily,
      scriptFont: css('.pier-brand .apr-brand__name').fontFamily,
      routes,
      hasMapLinks: !!document.querySelector('.riv-drawer a[href="#/map"],.sunset-pier a[href="#/map"]'),
    };
  });
  assert(style.headings.every(size => Math.abs(size - style.headings[0]) < .2), 'Same main-section title size');
  assert(style.actions.every(color => color === 'rgb(243, 93, 55)'), 'Same coral as header Tickets');
  assert.equal(style.hub, 'rgb(243, 93, 55)');
  assert.equal(style.stamp, 'rgb(243, 93, 55)');
  assert(style.routes.every(path => ['', 'zones','attractions','hotel','visit','planner','tickets'].includes(path)), 'All home links lead to known pages');
  assert.equal(style.hasMapLinks, false);
  assert.match(style.headerFont, /Inter/);
  assert.match(style.headlineFont, /APR Poster/);
  assert.match(style.scriptFont, /APR Script/);
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

async function checkWorlds(page, width) {
  const wheel = page.getByRole('group', { name: 'Диск миров Aqua Paradise' });
  const current = page.locator('#apr-worlds-current');
  const strip = page.getByRole('group', { name: 'Билеты в девять миров' });
  const tickets = strip.getByRole('button');
  const expected = zonesData.map(zone => zone.name);
  assert.deepEqual(await tickets.allTextContents(), expected);
  const photo = page.locator('.apr-worlds__photo img');
  const link = page.getByRole('link', { name: 'Подробнее о зоне' });
  const seenPhotos = new Set();
  if (width <= 950) {
    const order = ['.apr-worlds__heading', '.apr-worlds__photo', '.apr-worlds__viewer', '.apr-worlds__info', '.apr-worlds__tickets'];
    let previousBottom = -Infinity;
    for (const selector of order) {
      const { y, height } = await page.locator(selector).boundingBox();
      assert(y >= previousBottom, `${selector} follows the previous block`);
      previousBottom = y + height;
    }
  }

  await page.getByRole('button', { name: 'Предыдущий мир' }).click();
  assert.equal(await current.innerText(), expected[8]);
  await page.getByRole('button', { name: 'Следующий мир' }).click();
  assert.equal(await current.innerText(), expected[0]);
  for (let index = 0; index < expected.length; index++) {
    const ticket = tickets.nth(index);
    if (width === 375 || width === 390) {
      await ticket.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    }
    const scrollBefore = await page.evaluate(() => scrollY);
    await ticket.click();
    assert.equal(await current.innerText(), expected[index]);
    assert.equal(await ticket.getAttribute('aria-pressed'), 'true');
    assert.equal(await wheel.getByRole('button', { name: expected[index], exact: true }).getAttribute('aria-pressed'), 'true');
    assert.equal(await link.getAttribute('href'), `#/zones?zone=${zonesData[index].id}`);
    assert.equal(await photo.getAttribute('alt'), zonesData[index].poster.imageAlt);
    const source = await photo.evaluate(async img => {
      img.loading = 'eager';
      await img.decode();
      return { src: img.currentSrc, width: img.naturalWidth };
    });
    assert(source.width >= 1000, 'The selected scene uses the large artwork');
    seenPhotos.add(source.src);
    const aboveAction = await page.locator('.apr-worlds__caption-slot:not([aria-hidden]) .apr-worlds__description').evaluate((el, desktop) => {
      const bounds = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return desktop ? bounds.right - parseFloat(style.paddingInlineEnd) : bounds.bottom;
    }, width >= 1180);
    const action = await link.boundingBox();
    const actionStart = width >= 1180 ? action.x : action.y;
    assert(actionStart >= aboveAction - 1, 'Zone link leaves its description readable');
    if (width === 375 || width === 390) {
      assert.equal(await page.evaluate(() => scrollY), scrollBefore, `Selecting ${expected[index]} keeps the mobile scroll position`);
    }
    if (width === 1440) {
      const picture = await page.locator('.apr-worlds__photo').boundingBox();
      const info = await page.locator('.apr-worlds__info').boundingBox();
      const scroll = await page.evaluate(() => scrollY);
      const left = Math.floor(Math.min(picture.x, info.x));
      const top = Math.floor(picture.y + scroll);
      await page.screenshot({
        path: `${dir}/worlds-slide-${String(index + 1).padStart(2, '0')}.png`, fullPage: true,
        clip: {
          x: left, y: top,
          width: Math.ceil(Math.max(picture.x + picture.width, info.x + info.width)) - left,
          height: Math.ceil(info.y + info.height + scroll) - top,
        },
        animations: 'disabled',
      });
    }
  }
  assert.equal(seenPhotos.size, expected.length);
  await wheel.getByRole('button', { name: expected[8], exact: true }).press('ArrowRight');
  assert.equal(await current.innerText(), expected[0]);
  assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')), expected[0]);
  await wheel.getByRole('button', { name: expected[0], exact: true }).press('End');
  assert.equal(await current.innerText(), expected[8]);
  await wheel.getByRole('button', { name: expected[8], exact: true }).press('Home');
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

async function checkWorldsMotion(page) {
  const reel = page.locator('.apr-worlds__reel');
  const next = page.getByRole('button', { name: 'Следующий мир' });
  const previous = page.getByRole('button', { name: 'Предыдущий мир' });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  try {
    const duration = await reel.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration));
    assert(duration >= .5 && duration <= .8, 'Mechanical travel takes half to four-fifths of a second');
    await next.click();
    await page.waitForFunction(() => {
      const reel = document.querySelector('.apr-worlds__reel');
      const scene = document.querySelector('.apr-worlds__photo img');
      return reel.getAnimations().length > 0 && scene.getAnimations().length > 0;
    });
    await Promise.all([
      reel.evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished))),
      page.locator('.apr-worlds__photo img').evaluate(el => Promise.all(el.getAnimations().map(animation => animation.finished))),
    ]);
  } finally {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.apr-worlds__reel')).transitionProperty === 'none');
    await previous.click();
  }
  assert.equal(await reel.evaluate(el => el.getAnimations().length), 0);
  assert.equal(await page.locator('.apr-worlds__photo img').evaluate(el => getComputedStyle(el).animationName), 'none');
}

async function checkTicketLayout(page) {
  const layout = await page.locator('#attractions').evaluate(section => {
    const bounds = el => el.getBoundingClientRect().toJSON();
    const clipped = el => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
    const scenery = section.querySelector('.tickets-scenery');
    const sceneryStyle = getComputedStyle(scenery);
    return {
      viewport: innerWidth,
      action: bounds(section.querySelector('.ticket-all a')),
      tear: getComputedStyle(section.querySelector('.golden-tickets__tear'), '::before').maskImage,
      scenery: {
        rect: bounds(scenery),
        inert: scenery.getAttribute('aria-hidden') === 'true' && sceneryStyle.pointerEvents === 'none' && Number(sceneryStyle.zIndex) < 0,
        paperMask: sceneryStyle.maskImage,
        bay: sceneryStyle.backgroundImage,
        upper: getComputedStyle(scenery, '::before').backgroundImage,
        lower: getComputedStyle(scenery, '::after').backgroundImage,
      },
      cards: [...section.querySelectorAll('.golden-ticket')].map(link => {
        const stock = link.querySelector('.ticket-stock');
        const styles = getComputedStyle(stock);
        const image = link.querySelector('.ticket-picture img');
        const name = link.querySelector('h3');
        const range = document.createRange();
        range.selectNodeContents(name);
        return {
          id: new URL(link.href).hash.split('ride=')[1],
          rect: bounds(link),
          title: name.textContent,
          titleLines: range.getClientRects().length,
          zone: link.querySelector('.ticket-lettering p').textContent,
          limits: link.querySelector('.ticket-stub span:last-child').textContent,
          clipped: [...link.querySelectorAll('.ticket-lettering, h3, .ticket-stub')].some(clipped),
          overflowNodes: [...link.querySelectorAll('.ticket-lettering, h3, .ticket-stub')].map(el => ({
            element: el.tagName.toLowerCase() + '.' + el.className,
            scrollW: el.scrollWidth, clientW: el.clientWidth,
            scrollH: el.scrollHeight, clientH: el.clientHeight,
          })).filter(el => el.scrollW > el.clientW + 1 || el.scrollH > el.clientH + 1),
          frame: styles.maskImage === 'none' && ['Top','Right','Bottom','Left'].every(side => parseFloat(styles[`border${side}Width`]) >= 1),
          artwork: image.naturalWidth >= 900 && image.currentSrc.endsWith('.avif'),
        };
      }),
    };
  });
  const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const inViewport = rect => rect.left >= 0 && rect.right <= layout.viewport;
  assert.equal(layout.cards.length, 4);
  assert.match(layout.tear, /poster-tear-mask/);
  assert(layout.scenery.inert && inViewport(layout.action), 'Framing sits behind the interactive content');
  assert.equal(layout.scenery.rect.width, layout.viewport);
  assert.match(layout.scenery.paperMask, /poster-tear-mask/);
  assert.match(layout.scenery.bay, /folio-bay/);
  if (layout.viewport < 1100) {
    assert.match(layout.scenery.upper, /folio-canopy/);
    assert.match(layout.scenery.lower, /folio-garden/);
  } else {
    assert.match(layout.scenery.upper, /folio-left/);
    assert.match(layout.scenery.upper, /folio-right/);
  }
  for (const [index, card] of layout.cards.entries()) {
    const ride = ATTRACTIONS.find(attraction => attraction.id === card.id);
    assert(ride && card.title === ride.name && card.zone === ride.zone);
    assert.equal(card.limits, `${ride.minAge}+ · от ${ride.minHeight} см`);
    assert(card.frame && card.artwork && !card.clipped && inViewport(card.rect), `${card.title} fits its complete frame: ${JSON.stringify(card)}`);
    if (card.id === 'stormbreaker') assert.equal(card.titleLines, 1, 'Stormbreaker fits on one line');
    assert(layout.cards.slice(index + 1).every(next => !intersects(card.rect, next.rect)), `${card.title} has room around its edges`);
  }
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
  // The island map link was intentionally removed from the footer.
  await page.goto(url);
  const footer = page.locator('.sunset-pier');
  assert.equal(await footer.getByRole('link', { name: 'Карта острова', exact: true }).count(), 0);
  assert.equal(await footer.getByRole('link', { name: 'Девять миров', exact: true }).count(), 1);
  const destinations = [
    ['Отель', '#/hotel', page.getByRole('heading', { name: 'Paradise Grand Hotel & Villas' })],
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

async function captureFooter(page, width, { top, bottom }) {
  const footer = page.locator('.sunset-pier');
  const scene = footer.locator('.pier-sunset');
  assert.equal(await scene.count(), 1);
  assert.equal(await footer.locator('.pier-palm-extension').count(), 0);
  const artwork = await scene.evaluate(async el => {
    const style = getComputedStyle(el);
    const source = style.backgroundImage.match(/^url\("(.*)"\)$/)?.[1];
    if (!source) return null;
    const image = new Image();
    image.src = source;
    await image.decode();
    return { width: image.naturalWidth, height: image.naturalHeight, mask: style.maskImage };
  });
  assert(artwork && artwork.width === 2172 && artwork.height === 868, 'The footer loads one restored sunset illustration');
  assert.match(artwork.mask, /poster-tear-mask/);

  const y = top - 45;
  const height = bottom - y;
  const detailWidth = Math.min(width, 500);
  await page.screenshot({
    path: `${dir}/footer-full-${width}.png`, fullPage: true,
    clip: { x: 0, y, width, height }, animations: 'disabled', timeout: 25000,
  });
  await page.screenshot({
    path: `${dir}/footer-palm-${width}.png`, fullPage: true,
    clip: { x: width - detailWidth, y, width: detailWidth, height: Math.min(370, height) },
    animations: 'disabled', timeout: 25000,
  });
}

async function checkAtlas(page, width) {
  await page.setViewportSize({ width, height: width < 800 ? 812 : 900 });
  const target = new URL(url);
  target.hash = '/zones?zone=ocean-bay';
  await page.goto(target.toString());
  await page.evaluate(() => document.fonts.ready);

  const atlas = page.locator('.atlas-page');
  const strip = atlas.getByRole('navigation', { name: 'Тематические зоны' });
  const panorama = atlas.locator('.atlas-picture img');
  const panel = atlas.getByRole('tabpanel');
  const title = atlas.locator('#atlas-zone-name');
  const tabs = ['Обзор', 'Развлечения', 'Инфраструктура', 'Правила'];
  await title.waitFor();
  const atlasStyle = await atlas.evaluate(root => {
    const style = selector => {
      const el = document.querySelector(selector);
      if (!el) throw Error('Atlas selector missing: ' + selector);
      return getComputedStyle(el);
    };
    const headingSize = selector => parseFloat(style(selector).fontSize);
    const coral = selector => style(selector).backgroundColor;
    return {
      titles: [headingSize('.atlas-cover h1'), headingSize('.atlas-zone-title h2')],
      colors: ['.riv-mast .ticket-cta', '.atlas-tabs button[aria-selected="true"]',
        '.atlas-ticket[aria-current="true"]', '.atlas-action'].map(coral),
      fonts: ['.atlas-cover h1', '.atlas-zone-title h2', '.atlas-cover__intro',
        '.atlas-zone-title__description', '.atlas-tabs button'].map(s => style(s).fontFamily),
      headingLineHeight: style('.atlas-zone-title h2').lineHeight,
    };
  });
  assert(atlasStyle.titles.every(size => Math.abs(size - atlasStyle.titles[0]) < .2),
    'Atlas cover and selected zone have the same display heading size');
  assert(atlasStyle.colors.every(color => color === 'rgb(243, 93, 55)'),
    'Atlas coral controls use the Header Tickets color');
  assert(atlasStyle.fonts.every(font => /APR Poster|Inter/.test(font)),
    'Atlas text uses only approved typographic families');
  assert.equal(await strip.getByRole('link').count(), 9);
  assert.equal(await page.locator('.riv-mast .apr-brand').count(), 1);
  assert.equal(await page.locator('.sunset-pier .pier-sunset').count(), 1);
  assert.match(await atlas.evaluate(el => getComputedStyle(el, '::before').maskImage), /poster-tear-mask/);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
  await atlas.locator('.atlas-cover img').evaluate(img => img.decode());
  await panorama.evaluate(img => img.decode());
  await page.screenshot({ path: `${dir}/atlas-page-${width}.png`, fullPage: true, animations: 'disabled', timeout: 25000 });

  if (width < 800) {
    assert(await strip.evaluate(el => el.scrollWidth > el.clientWidth));
    await strip.evaluate(el => { el.scrollLeft = 0; });
    await page.waitForFunction(() => document.querySelector('.atlas-tickets').scrollLeft === 0);
    const picture = await atlas.locator('.atlas-picture').boundingBox();
    const sheet = await atlas.locator('.atlas-sheet').boundingBox();
    assert(picture.y + picture.height <= sheet.y + 2, 'The illustration sits above its text on narrow screens');
  }

  const zones = width === 1440 ? zonesData : zonesData.filter(zone => ['paradise-boulevard', 'atlantis-realm'].includes(zone.id));
  const sources = new Set();
  for (const zone of zones) {
    const ticket = strip.getByRole('link', { name: `Открыть зону ${zone.name}` });
    await ticket.click();
    await page.waitForURL(`**/#/zones?zone=${zone.id}`);
    await page.waitForFunction(name => document.querySelector('#atlas-zone-name').textContent === name, zone.name);
    assert.equal(await ticket.getAttribute('aria-current'), 'true');
    assert.equal(await title.innerText(), zone.name);
    const source = await panorama.evaluate(async img => {
      await img.decode();
      return { url: img.currentSrc, width: img.naturalWidth, animation: getComputedStyle(img).animationName };
    });
    assert(source.width >= 1200 && source.url.includes(zone.id));
    assert.equal(source.animation, 'none', 'Reduced motion disables the picture transition');
    sources.add(source.url);
    assert.deepEqual(await panel.locator('.atlas-features li').allTextContents(), zone.features);
    if (width === 1440) {
      const spread = atlas.locator('.atlas-spread');
      const { x, y, width: w, height: h } = await spread.boundingBox();
      const scroll = await page.evaluate(() => scrollY);
      await page.screenshot({
        path: `${dir}/atlas-zone-${zone.id}.png`, fullPage: true, animations: 'disabled',
        clip: { x: Math.floor(x) - 12, y: Math.floor(y + scroll) - 8, width: Math.ceil(w) + 24, height: Math.ceil(h) + 26 },
      });
    }
    for (const label of tabs.slice(1)) {
      const tab = atlas.getByRole('tab', { name: label, exact: true });
      await tab.click();
      await page.waitForFunction(text => [...document.querySelectorAll('.atlas-tabs button')].some(
        item => item.textContent.trim() === text && item.getAttribute('aria-selected') === 'true'), label);
      assert.equal(await panel.getAttribute('aria-labelledby'), await tab.getAttribute('id'));
      assert.equal(await panorama.evaluate(img => img.currentSrc), source.url);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      if (label === 'Развлечения') {
        const rides = await panel.locator('.atlas-rides a').evaluateAll(links => links.map(link => new URL(link.href).hash));
        assert.deepEqual(rides, (ATTRACTION_IDS_BY_ZONE[zone.name] ?? []).map(id => `#/attractions?ride=${id}`));
        assert.deepEqual(await panel.locator('.atlas-list li').allTextContents(), zone.activities);
      }
      if (label === 'Инфраструктура') {
        assert.equal(await panel.locator('.atlas-list li').count(), Object.values(zone.infrastructure).flat().length);
      }
      if (label === 'Правила') assert.deepEqual(await panel.locator('.atlas-rules li span').allTextContents(), zone.rules);
    }
  }
  assert.equal(sources.size, zones.length);

  target.hash = '/zones?zone=atlantis-realm';
  await page.goto(target.toString());
  await page.waitForFunction(() => document.querySelector('#atlas-zone-name').textContent === 'Atlantis Realm');
  const overview = atlas.getByRole('tab', { name: 'Обзор' });
  const rules = atlas.getByRole('tab', { name: 'Правила' });
  const attractions = atlas.getByRole('tab', { name: 'Развлечения' });
  await overview.scrollIntoViewIfNeeded();
  const initialY = await page.evaluate(() => scrollY);
  await overview.press('ArrowRight');
  await page.waitForURL('**/#/zones?zone=atlantis-realm&tab=attractions');
  assert(await attractions.evaluate(el => el === document.activeElement && el.matches(':focus-visible')));
  assert.equal(await page.evaluate(() => scrollY), initialY, 'A tab change keeps the page scroll position');
  await attractions.press('End');
  await page.waitForURL('**/#/zones?zone=atlantis-realm&tab=rules');
  assert(await rules.evaluate(el => el === document.activeElement));
  await page.goBack();
  await attractions.waitFor();
  await page.waitForFunction(() => document.querySelector('#zone-tab-attractions').getAttribute('aria-selected') === 'true');
  await page.goForward();
  await page.waitForFunction(() => document.querySelector('#zone-tab-rules').getAttribute('aria-selected') === 'true');
  await rules.press('Home');
  await page.waitForURL('**/#/zones?zone=atlantis-realm');
  await atlas.getByRole('button', { name: 'Посмотреть аттракционы' }).click();
  await panel.getByRole('link', { name: /Crystal Passage/ }).click();
  await page.waitForURL('**/#/attractions?ride=crystal-passage');
  await page.getByRole('dialog', { name: 'Crystal Passage', exact: true }).waitFor();
  await page.goBack();
  await page.waitForFunction(() => document.querySelector('#zone-tab-attractions')?.getAttribute('aria-selected') === 'true');
  const market = strip.getByRole('link', { name: 'Открыть зону Paradise Market' });
  await market.click();
  await page.waitForURL('**/#/zones?zone=paradise-market');
  await page.goBack();
  await page.waitForFunction(() => document.querySelector('#atlas-zone-name')?.textContent === 'Atlantis Realm');
  await page.goForward();
  await page.waitForFunction(() => document.querySelector('#atlas-zone-name')?.textContent === 'Paradise Market');
  const fallback = new URL(url);
  fallback.hash = '/zones?zone=unknown&tab=unknown';
  await page.goto(fallback.toString());
  await page.waitForFunction(() => document.querySelector('#atlas-zone-name')?.textContent === 'Ocean Bay');
  assert.equal(await overview.getAttribute('aria-selected'), 'true');
  report.atlas.push({ width, zones: zones.length, tabs: tabs.length });
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
      await checkHomeDesignSystem(page);

      await page.screenshot({ path: `${dir}/home-${width}.png`, fullPage: true, animations: 'disabled', timeout: 25000 });

      await checkTicketLayout(page);
      if (screenshotWidths.includes(width)) {
        const { top, bottom } = bounds.find(section => section.id === 'attractions');
        await page.screenshot({
          path: `${dir}/rides-${width}.png`, fullPage: true,
          clip: { x: 0, y: top - 32, width, height: bottom - top + 60 },
          animations: 'disabled', timeout: 25000,
        });
      }
      if (width === 1440) {
        const { x, y, width: cardWidth, height } = await page.locator('.ride-stormbreaker').boundingBox();
        const dy = await page.evaluate(() => scrollY);
        await page.screenshot({
          path: `${dir}/rides-stormbreaker-1440.png`, fullPage: true,
          clip: { x: Math.floor(x) - 10, y: Math.floor(y + dy) - 10, width: Math.ceil(cardWidth) + 20, height: Math.ceil(height) + 20 },
          animations: 'disabled',
        });
      }

      if (screenshotWidths.includes(width)) {
        const { top, bottom } = bounds.find(section => section.id === 'worlds');
        await page.screenshot({
          path: `${dir}/worlds-${width}.png`, fullPage: true,
          clip: { x: 0, y: top - 35, width, height: bottom - top + 65 },
          animations: 'disabled',
        });
        await captureFooter(page, width, bounds.find(section => section.id === 'footer'));
      }

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
        await checkWorldsMotion(page);
      }
      assert(await page.locator('.apr-worlds__reel').evaluate(el => parseFloat(getComputedStyle(el).transitionDuration) < .001));
      await checkWorlds(page, width);
      await page.goto(url);
      await checkTickets(page, width === 1440);
      await checkPlanner(page);
      if (width === 1440 || width === 375) await checkResortPages(page);
    } catch (error) {
      entry(error.message);
    }
  }
  for (width of [1440, 768, 390]) {
    try {
      await checkAtlas(page, width);
    } catch (error) {
      entry(`Atlas: ${error.message}`);
    }
  }
} finally {
  await browser.close();
  await fs.writeFile(`${dir}/report.json`, JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
