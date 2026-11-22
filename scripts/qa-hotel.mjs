import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const site = new URL(process.env.RIVIERA_QA_URL || 'http://127.0.0.1:4173/aqua-paradise-resort/riviera-polish/');
const out = 'qa-output/riviera-polish';
const executablePath = process.env.RIVIERA_CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : { channel: 'chrome' });
const report = { widths: [], rooms: [], experiences: [], externalNetwork: [], errors: [] };

function route(section) {
  const url = new URL(site);
  url.hash = section ? `/hotel?section=${section}` : '/hotel';
  return url.toString();
}

function watchErrors(page) {
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().startsWith('Failed to load resource:')) report.errors.push(message.text());
  });
  page.on('requestfailed', request => {
    const failure = request.failure()?.errorText;
    if (failure === 'net::ERR_ABORTED') return;
    const { origin } = new URL(request.url());
    if (origin === site.origin) report.errors.push(`${failure} ${request.url()}`);
    else if (!report.externalNetwork.includes(origin)) report.externalNetwork.push(origin);
  });
  page.on('response', response => {
    if (response.status() >= 400 && new URL(response.url()).origin === site.origin) {
      report.errors.push(`${response.status()} ${response.url()}`);
    }
  });
}

async function openHotel(page, section) {
  await page.goto('about:blank');
  await page.goto(route(section));
  await page.locator('#hotel-title').waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const image of document.images) image.loading = 'eager';
    await Promise.all([...document.images].map(image => image.decode()));
  });
}

async function sectionFocus(page, id) {
  await page.waitForFunction(id => {
    const section = document.getElementById(id);
    const { top } = section.getBoundingClientRect();
    return document.activeElement === section && top >= 0 && top < 140;
  }, id);
}

async function checkLayout(page, width) {
  await page.setViewportSize({ width, height: width < 600 ? 844 : 950 });
  await openHotel(page);
  const visible = await page.evaluate(() => {
    const title = document.querySelector('#hotel-title');
    const header = document.querySelector('.riv-mast');
    const footer = document.querySelector('.sunset-pier');
    const panel = document.querySelector('.hotel-room');
    const titleRange = new Range();
    titleRange.selectNodeContents(title);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(titleRange);
    const titleSelection = selection.toString().replace(/\s+/g, ' ');
    const boxes = [...titleRange.getClientRects()];
    selection.removeAllRanges();
    return {
      titleSelection,
      exactWidth: document.documentElement.scrollWidth === innerWidth,
      oneMain: document.querySelectorAll('main').length === 1,
      titleFits: boxes.every(box => box.left >= 0 && box.right <= innerWidth),
      titleSelectable: getComputedStyle(title).userSelect !== 'none',
      sharedNav: header.querySelector('.ticket-cta').getAttribute('href') === '#/tickets',
      footerNav: footer.querySelector('nav').getAttribute('aria-label'),
      sunsetArt: getComputedStyle(footer.querySelector('.pier-sunset')).backgroundImage.includes('sunset-scene'),
      noTornEdge: getComputedStyle(footer, '::after').content === 'none',
      galleryFits: panel.getBoundingClientRect().right <= innerWidth && panel.getBoundingClientRect().left >= 0,
      allArtLoaded: [...document.querySelectorAll('.hotel-page img')].every(image => image.complete && image.naturalWidth > 0),
      minimumTarget: Math.min(...[...document.querySelectorAll('.hotel-hero__actions a, .hotel-stay button, .hotel-stay select, .hotel-experiences button')]
        .map(control => control.getBoundingClientRect().height)),
    };
  });
  assert.equal(visible.titleSelection, 'Paradise Grand Hotel & Villas');
  for (const key of ['exactWidth', 'oneMain', 'titleFits', 'titleSelectable', 'sharedNav', 'sunsetArt', 'noTornEdge', 'galleryFits', 'allArtLoaded']) {
    assert(visible[key], `${key} at ${width}px`);
  }
  assert.equal(visible.footerNav, 'Навигация в подвале');
  assert(visible.minimumTarget >= 40, `Touchable controls at ${width}px: ${visible.minimumTarget}px`);
  await page.screenshot({ path: `${out}/hotel-page-${width}.png`, fullPage: true, animations: 'disabled' });
  report.widths.push(width);
}

async function checkAccommodation(page) {
  const picker = page.getByLabel('Тип размещения');
  const frame = page.locator('.hotel-gallery__main');
  const category = page.getByRole('group', { name: 'Категория размещения' });
  const markers = page.getByRole('group', { name: 'Размещение на панораме' });
  const amenities = page.locator('.hotel-room__amenities');
  assert.equal(await picker.inputValue(), 'deluxe-room');
  assert.equal(await page.locator('.hotel-gallery__thumbnails button').count(), 3);
  const defaultFrame = await frame.getAttribute('src');
  await amenities.click();
  assert.equal(await amenities.getAttribute('aria-expanded'), 'true');
  await page.getByRole('button', { name: 'Следующее изображение' }).press('Enter');
  const nextFrame = await frame.getAttribute('src');
  assert.notEqual(nextFrame, defaultFrame);
  assert.equal(await picker.inputValue(), 'deluxe-room');
  assert.equal(await amenities.getAttribute('aria-expanded'), 'true');
  await page.getByRole('button', { name: 'Предыдущее изображение' }).click();
  assert.equal(await frame.getAttribute('src'), defaultFrame);
  await page.getByRole('button', { name: 'Детали интерьера' }).click();
  assert.equal(new Set([defaultFrame, nextFrame, await frame.getAttribute('src')]).size, 3);
  await page.getByRole('button', { name: 'Следующее изображение' }).click();
  assert.equal(await frame.getAttribute('src'), defaultFrame);

  const roomNames = {
    Номера: { 'standard-room': 'Standard Room', 'deluxe-room': 'Deluxe Room', 'ocean-view-room': 'Ocean View Room' },
    Сьюты: { 'premium-suite': 'Premium Suite', 'family-suite': 'Family Suite' },
    Виллы: { 'royal-paradise-villa': 'Royal Paradise Villa', 'ocean-view-villa': 'Ocean View Villa' },
  };
  const frameSources = new Set();
  for (const [categoryName, rooms] of Object.entries(roomNames)) {
    await category.getByRole('button', { name: categoryName }).click();
    assert.equal(await markers.getByRole('button', { name: categoryName }).getAttribute('aria-pressed'), 'true');
    for (const [id, title] of Object.entries(rooms)) {
      await picker.selectOption(id);
      assert.equal(await page.locator('#hotel-room-name').textContent(), title);
      assert.equal(await amenities.getAttribute('aria-expanded'), 'false');
      await frame.evaluate(image => image.decode());
      frameSources.add(await frame.getAttribute('src'));
      await amenities.click();
      assert(await page.locator('#hotel-room-amenities li').first().isVisible());
      if (id === 'royal-paradise-villa') assert(await page.getByText('Собственный бассейн').isVisible());
      report.rooms.push(title);
    }
  }
  assert.equal(frameSources.size, 7);
  await markers.getByRole('button', { name: 'Номера' }).click();
  assert.equal(await category.getByRole('button', { name: 'Номера' }).getAttribute('aria-pressed'), 'true');
  assert.equal(await picker.inputValue(), 'deluxe-room');
  assert.equal(await amenities.getAttribute('aria-expanded'), 'false');
  assert.equal(await frame.getAttribute('src'), defaultFrame);
  await page.locator('#hotel-rooms').screenshot({ path: `${out}/hotel-rooms-desktop.png`, animations: 'disabled' });
}

try {
  await fs.mkdir(out, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
  watchErrors(page);
  for (const width of [1440, 1024, 768, 390, 375]) await checkLayout(page, width);
  await page.setViewportSize({ width: 1440, height: 950 });
  await openHotel(page);
  await page.getByRole('link', { name: 'Выбрать размещение' }).click();
  await sectionFocus(page, 'hotel-rooms');
  assert.equal(page.url(), route('hotel-rooms'));
  await page.goBack();
  await page.waitForFunction(() => scrollY === 0);
  await page.goForward();
  await sectionFocus(page, 'hotel-rooms');
  await checkAccommodation(page);
  await page.goto(route());
  await page.getByRole('link', { name: 'Открыть впечатления' }).click();
  await sectionFocus(page, 'hotel-experiences');
  assert.equal(page.url(), route('hotel-experiences'));
  const choices = page.getByRole('group', { name: 'Гостиничные пространства' });
  for (const title of ['Grand Kids Club', 'Grand Wellness & Fitness', 'Grand Infinity Pool']) {
    const button = choices.getByRole('button', { name: title, exact: true });
    await button.press('Enter');
    assert.equal(await button.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#hotel-experience-description h3').textContent(), title);
    report.experiences.push(title);
  }
  await page.waitForSelector('.mast-inner.compact', { state: 'attached' });
  await page.getByRole('button', { name: 'Наверх' }).click();
  await page.waitForFunction(() => scrollY === 0 && document.activeElement.id === 'hero');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openHotel(page, 'hotel-rooms');
  await sectionFocus(page, 'hotel-rooms');
  assert.equal(await page.locator('.hotel-gallery__main').evaluate(image => getComputedStyle(image).animationName), 'none');
  await page.addStyleTag({ content: '.hotel-page img { visibility: hidden !important; } .hotel-page, .hotel-page * { background-image: none !important; }' });
  assert.equal(await page.locator('.hotel-page h1, .hotel-page section h2').count(), 7);
  assert(await page.getByRole('heading', { name: 'Paradise Grand Hotel & Villas' }).isVisible());
  assert(await page.getByRole('button', { name: 'Все удобства' }).isVisible());
  assert(await page.getByText('Искусство безупречного отдыха').isVisible());
  assert(await page.getByText('Пакеты представлены как предварительные концепции.', { exact: false }).isVisible());
  assert.equal(await page.getByRole('link', { name: 'Маршруты Paradise Loop' }).getAttribute('href'), '#/visit?section=transport');

  const handset = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  watchErrors(handset);
  await openHotel(handset);
  const burger = handset.getByRole('button', { name: 'Открыть меню' });
  await burger.tap();
  const drawer = handset.getByRole('dialog', { name: 'Меню курорта' });
  assert(await drawer.isVisible());
  await handset.keyboard.press('Escape');
  await drawer.waitFor({ state: 'hidden' });
  assert(await burger.evaluate(button => document.activeElement === button));
  await handset.getByRole('link', { name: 'Выбрать размещение' }).tap();
  await sectionFocus(handset, 'hotel-rooms');
  const handsetFrame = handset.locator('.hotel-gallery__main');
  const firstImage = await handsetFrame.getAttribute('src');
  await handset.getByRole('button', { name: 'Следующее изображение' }).tap();
  assert.notEqual(await handsetFrame.getAttribute('src'), firstImage);
  await handset.getByRole('button', { name: 'Все удобства' }).tap();
  assert(await handset.locator('#hotel-room-amenities').isVisible());
  await handset.locator('.hotel-room').screenshot({ path: `${out}/hotel-room-mobile.png`, animations: 'disabled' });
  assert.deepEqual(report.errors, [], 'Local resources and browser console');
  report.result = 'passed';
} catch (error) {
  report.result = error.message;
  throw error;
} finally {
  await fs.writeFile(`${out}/hotel-qa.json`, JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
console.log(`Hotel browser QA passed: ${report.widths.join(', ')}px, ${report.rooms.length} rooms, ${report.experiences.length} experiences.`);
