import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';
import { ATTRACTIONS } from '../src/data/attractions.ts';

const site = new URL(process.env.RIVIERA_QA_URL || 'http://127.0.0.1:4173/aqua-paradise-resort/riviera-polish/');
const output = 'qa-output/riviera-polish';
const report = { layouts: [], rides: [], externalNetwork: [], errors: [] };
const executablePath = process.env.RIVIERA_CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : { channel: 'chrome' });

function route(query = '') {
  const url = new URL(site);
  url.hash = '/attractions' + query;
  return url.toString();
}

function watchErrors(page) {
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && !message.text().startsWith('Failed to load resource:')) report.errors.push(message.text());
  });
  page.on('requestfailed', request => {
    const error = request.failure()?.errorText;
    if (error === 'net::ERR_ABORTED') return;
    const resource = new URL(request.url());
    if (resource.origin === site.origin) report.errors.push(`${error} ${resource}`);
    else if (!report.externalNetwork.includes(resource.origin)) report.externalNetwork.push(resource.origin);
  });
  page.on('response', response => {
    if (new URL(response.url()).origin === site.origin && response.status() >= 400) {
      report.errors.push(`${response.status()} ${response.url()}`);
    }
  });
}

async function waitForCount(page, count, displayed = Math.min(count, 12)) {
  await page.waitForFunction(({ count, displayed }) => {
    const found = document.querySelector('.catalogue-results__summary strong');
    return Number(found?.textContent) === count && document.querySelectorAll('.catalogue-ticket').length === displayed;
  }, { count, displayed });
}

async function checkLayout(page, width) {
  await page.setViewportSize({ width, height: width < 600 ? 812 : 900 });
  await page.goto('about:blank');
  await page.goto(route());
  await waitForCount(page, ATTRACTIONS.length);
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const image of document.images) image.loading = 'eager';
    await Promise.all([...document.images].map(image => image.decode()));
  });
  const layout = await page.evaluate(() => {
    const header = document.querySelector('.riv-mast');
    const page = document.querySelector('.catalogue-page');
    const footer = document.querySelector('.sunset-pier');
    const ticket = document.querySelector('.riv-mast .ticket-cta');
    const action = document.querySelector('.catalogue-more .catalogue-cta');
    const card = document.querySelector('.catalogue-ticket');
    const title = document.querySelector('.catalogue-hero h1');
    const bounds = node => node.getBoundingClientRect();
    const context = document.createElement('canvas').getContext('2d');
    const restrictionLabelsFit = [...document.querySelectorAll('.catalogue-restrictions input')].every(input => {
      const style = getComputedStyle(input);
      context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const available = input.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 18;
      return context.measureText(input.placeholder).width <= available;
    });
    return {
      viewport: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
      heroTitleVisible: title.scrollWidth <= title.clientWidth + 1 && bounds(title).right <= innerWidth,
      restrictionLabelsFit,
      footerAdjacent: Math.abs(bounds(page).bottom - bounds(footer).top) < 1,
      footerArt: getComputedStyle(footer.querySelector('.pier-sunset')).backgroundImage,
      mask: getComputedStyle(page, '::before').maskImage,
      fibres: getComputedStyle(footer, '::after').backgroundImage,
      mastBackground: getComputedStyle(header).backgroundColor,
      columns: getComputedStyle(document.querySelector('.catalogue-grid')).gridTemplateColumns.split(' ').length,
      pageTypography: getComputedStyle(title).fontFamily,
      cardMotion: getComputedStyle(card).transitionProperty,
      actionStyle: ['backgroundColor', 'borderRadius', 'filter', 'boxShadow'].every(key => getComputedStyle(ticket)[key] === getComputedStyle(action)[key]),
      actionSheen: getComputedStyle(action, '::after').backgroundImage === getComputedStyle(ticket, '::after').backgroundImage,
      clipping: [...document.querySelectorAll('.catalogue-ticket h2, .catalogue-ticket__caption p, .catalogue-ticket__facts')]
        .some(node => node.scrollWidth > node.clientWidth + 1 || bounds(node).right > innerWidth + 1),
    };
  });
  assert.equal(layout.pageWidth, width);
  assert(layout.heroTitleVisible && layout.restrictionLabelsFit && !layout.clipping && layout.footerAdjacent);
  assert.equal(layout.columns, width > 1200 ? 4 : width > 515 ? 2 : 1);
  assert.match(layout.pageTypography, /APR Poster/);
  assert.equal(layout.cardMotion, 'none');
  assert.equal(layout.mastBackground, 'rgba(0, 0, 0, 0)');
  assert.match(layout.footerArt, /sunset-scene/);
  assert.match(layout.mask, /poster-tear-mask/);
  assert.match(layout.fibres, /poster-tear-fibres/);
  assert(layout.actionStyle && layout.actionSheen);
  report.layouts.push({ width, columns: layout.columns, overflow: layout.pageWidth - width });
  await page.screenshot({ path: `${output}/catalogue-page-${width}.png`, fullPage: true, animations: 'disabled', timeout: 25000 });

  if (width === 390 || width === 1440) {
    await page.getByRole('button', { name: 'Открыть подробности: Skyfall', exact: true }).click();
    await page.getByRole('dialog', { name: 'Skyfall', exact: true }).waitFor();
    await page.locator('.catalogue-dialog img').evaluate(image => image.decode());
    await page.screenshot({ path: `${output}/catalogue-dialog-${width}.png`, animations: 'disabled' });
    await page.keyboard.press('Escape');
    await page.getByRole('dialog', { name: 'Skyfall', exact: true }).waitFor({ state: 'hidden' });
  }
}

async function checkFilters(page) {
  const search = page.getByRole('searchbox', { name: 'Поиск по названию' });
  const zone = page.getByRole('combobox', { name: 'Фильтр по зоне' });
  const intensity = page.getByRole('combobox', { name: 'Фильтр по интенсивности' });
  const age = page.getByRole('spinbutton', { name: 'Ваш возраст' });
  const height = page.getByRole('spinbutton', { name: 'Ваш рост' });
  const categories = page.getByRole('group', { name: 'Быстрые категории' });
  const reset = page.locator('.catalogue-reset');
  assert.deepEqual(await categories.getByRole('button').allTextContents(), ['Все', 'Спокойные', 'Семейные', 'Экстрим и высокие']);
  assert.deepEqual(await page.locator('.catalogue-filter-row input, .catalogue-filter-row select, .catalogue-filter-row button')
    .evaluateAll(elements => elements.map(element => element.getAttribute('aria-label'))),
  ['Поиск по названию', 'Фильтр по зоне', 'Фильтр по интенсивности', 'Сбросить фильтры']);

  await search.fill('   CRYSTAL   PASSAGE  ');
  await zone.selectOption('Atlantis Realm');
  await intensity.selectOption('Спокойная');
  await waitForCount(page, 1);
  assert.equal(await page.locator('.catalogue-ticket').getAttribute('data-ride'), 'crystal-passage');
  await intensity.selectOption('Экстрим');
  await waitForCount(page, 0);
  await page.getByText('Ничего не найдено по вашему запросу.').waitFor();
  await page.locator('.catalogue-empty button').click();
  await waitForCount(page, 22);
  assert.equal(await search.inputValue(), '');
  assert.equal(await zone.inputValue(), 'Все');
  assert.equal(await intensity.inputValue(), 'Все');

  for (const value of await zone.locator('option').evaluateAll(options => options.map(item => item.value).slice(1))) {
    await zone.selectOption(value);
    await waitForCount(page, ATTRACTIONS.filter(ride => ride.zone === value).length);
  }
  await reset.click();
  for (const value of await intensity.locator('option').evaluateAll(options => options.map(item => item.value).slice(1))) {
    await intensity.selectOption(value);
    await waitForCount(page, ATTRACTIONS.filter(ride => ride.intensity === value).length);
  }
  await reset.click();
  const categoryCounts = [
    ['Спокойные', ATTRACTIONS.filter(ride => ride.intensity === 'Спокойная').length],
    ['Семейные', ATTRACTIONS.filter(ride => ride.intensity === 'Семейная' || (ride.minAge > 0 && ride.minAge < 10)).length],
    ['Экстрим и высокие', ATTRACTIONS.filter(ride => ['Экстрим', 'Высокая'].includes(ride.intensity)).length],
    ['Все', ATTRACTIONS.length],
  ];
  for (const [label, count] of categoryCounts) {
    const category = categories.getByRole('button', { name: label, exact: true });
    await category.click();
    await waitForCount(page, count);
    assert.equal(await category.getAttribute('aria-pressed'), 'true');
  }
  await zone.selectOption('Atlantis Realm');
  await intensity.selectOption('Высокая');
  await categories.getByRole('button', { name: 'Экстрим и высокие', exact: true }).click();
  await age.fill('14');
  await height.fill('140');
  await waitForCount(page, 1);
  assert.equal(await page.locator('.catalogue-ticket').getAttribute('data-ride'), 'poseidons-descent');
  await height.fill('139');
  await waitForCount(page, 0);
  await reset.click();

  await search.fill('Velocity Racers');
  await age.fill('12');
  await height.fill('139');
  await waitForCount(page, 0);
  await page.getByRole('button', { name: 'Показать 1 скрытых по ограничениям' }).click();
  await waitForCount(page, 1);
  assert.equal(await page.locator('.catalogue-ticket__restriction').innerText(), 'рост < 140 см');
  await height.fill('140');
  await waitForCount(page, 1);
  assert.equal(await page.locator('.catalogue-ticket__restriction').count(), 0);
  await age.fill('11');
  await waitForCount(page, 0);

  await search.fill('Eagle');
  await age.fill('1');
  await height.fill('1');
  await waitForCount(page, 1);
  assert.deepEqual(await page.locator('.catalogue-ticket__facts > span').allTextContents(), ['Спокойная']);
  await reset.click();
  await waitForCount(page, 22);
  assert.equal(await age.inputValue(), '');
  assert.equal(await height.inputValue(), '');

  const more = page.getByRole('button', { name: 'Показать ещё' });
  await more.click();
  await waitForCount(page, 22, 22);
  await more.waitFor({ state: 'hidden' });
  await reset.click();
  await waitForCount(page, 22);
  await more.click();
  await search.fill('R');
  await waitForCount(page, ATTRACTIONS.filter(ride => ride.name.toLowerCase().includes('r')).length);
  await reset.click();

  await zone.selectOption('Atlantis Realm');
  await search.fill('passage');
  await waitForCount(page, 1);
  const card = page.locator('.catalogue-ticket');
  await card.scrollIntoViewIfNeeded();
  const scroll = await page.evaluate(() => scrollY);
  await card.press('Enter');
  await page.waitForURL('**/#/attractions?ride=crystal-passage&*');
  const dialog = page.getByRole('dialog', { name: 'Crystal Passage', exact: true });
  await dialog.waitFor();
  const close = dialog.getByRole('button', { name: 'Закрыть окно аттракциона' });
  assert(await close.evaluate(element => document.activeElement === element));
  await page.keyboard.press('Tab');
  assert(await close.evaluate(element => document.activeElement === element));
  await page.goBack();
  await dialog.waitFor({ state: 'hidden' });
  assert.equal(await page.evaluate(() => scrollY), scroll);
  assert(await card.evaluate(element => document.activeElement === element));
  assert.equal(await search.inputValue(), 'passage');
  assert.equal(await zone.inputValue(), 'Atlantis Realm');
  await page.goForward();
  await dialog.waitFor();
  await close.click();
  await dialog.waitFor({ state: 'hidden' });
  assert.equal(await search.inputValue(), 'passage');
  assert.equal(await zone.inputValue(), 'Atlantis Realm');
  assert.equal(new URL(page.url()).hash.includes('ride='), false);
}

async function checkAllRides(page) {
  await page.goto(route());
  await waitForCount(page, 22);
  await page.getByRole('button', { name: 'Показать ещё' }).click();
  await waitForCount(page, 22, 22);
  await page.evaluate(async () => {
    scrollTo(0, 0);
    for (const image of document.querySelectorAll('.catalogue-ticket img')) image.loading = 'eager';
    await Promise.all([...document.querySelectorAll('.catalogue-ticket img')].map(image => image.decode()));
  });
  await page.screenshot({ path: `${output}/catalogue-all-22-1440.png`, fullPage: true, animations: 'disabled', timeout: 25000 });
  const sources = new Set();
  for (const ride of ATTRACTIONS) {
    const ticket = page.locator(`.catalogue-ticket[data-ride="${ride.id}"]`);
    assert.equal(await ticket.locator('h2').innerText(), ride.name);
    assert.equal(await ticket.locator('.catalogue-ticket__caption p').innerText(), ride.zone);
    const facts = [ride.intensity];
    if (ride.minAge > 0) facts.push(`от ${ride.minAge} лет`);
    if (ride.minHeight !== null) facts.push(`от ${ride.minHeight} см`);
    assert.deepEqual(await ticket.locator('.catalogue-ticket__facts > span').allTextContents(), facts);
    const image = ticket.locator('img');
    if (await image.count()) {
      const src = await image.evaluate(async item => {
        item.loading = 'eager';
        await item.decode();
        return item.currentSrc;
      });
      assert(!sources.has(src), 'Each illustration is tied to one attraction');
      sources.add(src);
    } else {
      await ticket.getByText('Иллюстрация готовится').waitFor();
    }
    await ticket.click();
    await page.waitForURL(`**/#/attractions?ride=${ride.id}`);
    const dialog = page.getByRole('dialog', { name: ride.name, exact: true });
    await dialog.waitFor();
    assert.equal(await dialog.locator('.catalogue-dialog__copy > p').nth(1).innerText(), ride.desc);
    assert((await dialog.locator('.catalogue-dialog__safety').innerText()).endsWith(ride.safety));
    assert.deepEqual(await dialog.locator('dd').allTextContents(), facts);
    await page.keyboard.press('Escape');
    await dialog.waitFor({ state: 'hidden' });
    await waitForCount(page, 22, 22);
    report.rides.push({ id: ride.id, artwork: await image.count() === 1 });
  }

  const direct = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 390, height: 812 } });
  watchErrors(direct);
  await direct.goto(route('?ride=skyfall&search=SKYFALL&zone=Adrenaline+Peak'));
  await direct.getByRole('dialog', { name: 'Skyfall', exact: true }).getByRole('button', { name: 'Закрыть окно аттракциона' }).click();
  await waitForCount(direct, 1);
  assert.equal(await direct.getByRole('searchbox').inputValue(), 'SKYFALL');
  assert.equal(new URL(direct.url()).hash.includes('ride='), false);
  await direct.goto(route('?ride=unknown&age=invalid&quick=unknown'));
  await waitForCount(direct, 22);
  assert.equal(await direct.getByRole('dialog', { name: 'Skyfall' }).count(), 0);
  await direct.close();
}

async function checkMasthead(page) {
  await page.goto(route());
  await page.locator('.catalogue-grid').evaluate(grid => grid.scrollIntoView());
  const burger = page.getByRole('button', { name: 'Открыть меню' });
  await burger.waitFor();
  assert.equal(await page.locator('.riv-mast .mast-inner').evaluate(el => el.classList.contains('compact')), true);
  await burger.click();
  const menu = page.getByRole('dialog', { name: 'Меню курорта' });
  await menu.waitFor();
  assert.equal(await menu.getByRole('link', { name: 'Билеты' }).getAttribute('href'), '#/tickets');
  await page.keyboard.press('Escape');
  await menu.waitFor({ state: 'hidden' });
  await page.getByRole('button', { name: 'Наверх', exact: true }).click();
  await page.waitForFunction(() => scrollY === 0 && document.activeElement?.id === 'hero');
}

try {
  await fs.mkdir(output, { recursive: true });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  watchErrors(page);
  for (const width of [1440, 1280, 768, 390, 375]) await checkLayout(page, width);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(route());
  await checkFilters(page);
  await checkAllRides(page);
  await checkMasthead(page);
} catch (error) {
  report.errors.push(error.stack ?? error.message);
} finally {
  await browser.close();
  await fs.writeFile(`${output}/catalogue-report.json`, JSON.stringify(report, null, 2));
}
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
