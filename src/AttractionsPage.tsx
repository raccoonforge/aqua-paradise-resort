import { useEffect, useRef, useState } from 'react';
import { ATTRACTIONS, findAttractionById, type Attraction } from './data/attractions';

const INTENSITIES = ['Все', 'Спокойная', 'Семейная', 'Средняя', 'Высокая', 'Экстрим', 'Релакс'];
const ZONES = ['Все', 'Adrenaline Peak', 'Atlantis Realm', 'Eden Gardens', "Pirate's Cove", 'Paradise Boulevard', 'Ocean Bay', 'Serenity Spa', 'Little Paradise', 'Paradise Market'];
const QUICK_CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'calm', label: 'Спокойные' },
  { id: 'family', label: 'Семейные' },
  { id: 'extreme', label: 'Экстрим и высокие' },
] as const;
type QuickCategory = typeof QUICK_CATEGORIES[number]['id'];
type Filters = { search: string; zone: string; intensity: string; quick: QuickCategory; age: number | ''; height: number | '' };
type RideResult = { ride: Attraction; restriction?: string };
export type CatalogueNavigation = (path: string, mode: 'filter' | 'open-ride') => void;

const pageSize = 12;
const emptyFilters: Filters = { search: '', zone: 'Все', intensity: 'Все', quick: 'all', age: '', height: '' };
const featured = ['skyfall', 'poseidons-descent', 'stormbreaker', 'crystal-passage'];
const catalogue = [
  ...featured.flatMap(id => findAttractionById(id) ?? []),
  ...ATTRACTIONS.filter(ride => !featured.includes(ride.id)),
];
const originalArt = import.meta.glob<string>('./assets/retro/rides/*.avif', { eager: true, import: 'default' });
const catalogueArt = import.meta.glob<string>('./assets/retro/catalogue/*.avif', { eager: true, import: 'default' });
const atlasArt = import.meta.glob<string>('./assets/retro/atlas/*.avif', { eager: true, import: 'default' });
const atlasScenes: Record<string, string> = {
  'velocity-racers': 'adrenaline-peak',
  'moonlit-ruins': 'atlantis-realm',
  'smugglers-passage': 'pirates-cove',
  'rainbow-reef': 'little-paradise',
};

function numeric(value: string | null): number | '' {
  const result = Number.parseInt(value ?? '', 10);
  return Number.isFinite(result) ? result : '';
}

function readFilters(params: URLSearchParams): Filters {
  const zone = params.get('zone');
  const intensity = params.get('intensity');
  return {
    search: params.get('search') ?? '',
    zone: ZONES.find(item => item === zone) ?? emptyFilters.zone,
    intensity: INTENSITIES.find(item => item === intensity) ?? emptyFilters.intensity,
    quick: QUICK_CATEGORIES.find(item => item.id === params.get('quick'))?.id ?? emptyFilters.quick,
    age: numeric(params.get('age')),
    height: numeric(params.get('height')),
  };
}

function catalogueRoute(filters: Filters, rideId?: string) {
  const params = new URLSearchParams();
  if (rideId) params.set('ride', rideId);
  if (filters.search) params.set('search', filters.search);
  if (filters.zone !== 'Все') params.set('zone', filters.zone);
  if (filters.intensity !== 'Все') params.set('intensity', filters.intensity);
  if (filters.quick !== 'all') params.set('quick', filters.quick);
  if (filters.age !== '') params.set('age', String(filters.age));
  if (filters.height !== '') params.set('height', String(filters.height));
  return `#/attractions${params.size ? `?${params}` : ''}`;
}

function matchesQuickCategory(ride: Attraction, category: QuickCategory) {
  if (category === 'calm') return ride.intensity === 'Спокойная';
  if (category === 'family') return ride.intensity === 'Семейная' || (ride.minAge > 0 && ride.minAge < 10);
  if (category === 'extreme') return ride.intensity === 'Экстрим' || ride.intensity === 'Высокая';
  return true;
}

function groupResults(filters: Filters) {
  const visible: RideResult[] = [];
  const hidden: RideResult[] = [];
  const search = filters.search.trim().replace(/\s+/g, ' ').toLowerCase();
  for (const ride of catalogue) {
    if (!ride.name.toLowerCase().includes(search)
      || (filters.zone !== 'Все' && ride.zone !== filters.zone)
      || (filters.intensity !== 'Все' && ride.intensity !== filters.intensity)
      || !matchesQuickCategory(ride, filters.quick)) continue;
    if (filters.age !== '' && ride.minAge > 0 && filters.age < ride.minAge) {
      hidden.push({ ride, restriction: `возраст < ${ride.minAge}` });
    } else if (filters.height !== '' && ride.minHeight !== null && filters.height < ride.minHeight) {
      hidden.push({ ride, restriction: `рост < ${ride.minHeight} см` });
    } else {
      visible.push({ ride });
    }
  }
  return { visible, hidden };
}

const marks = {
  search: 'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5.5 12.5L22 22',
  pin: 'M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Zm-7-3a2.6 2.6 0 1 0 0 5.2A2.6 2.6 0 0 0 12 7Z',
  speed: 'm13 2-9 12h7l-1 8 10-12h-7l1-8Z',
  age: 'M12 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM5 21v-2a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v2',
  height: 'M11 3v18M7 7l4-4 4 4m-8 10 4 4 4-4m4-14h3m-3 9h3m-3 9h3',
  compass: 'm12 1 2 9 9 2-9 2-2 9-2-9-9-2 9-2 2-9ZM5 5l4 4m6 6 4 4m0-14-4 4m-6 6-4 4',
  down: 'm5 9 7 7 7-7',
  close: 'm6 6 12 12M18 6 6 18',
} as const;

function CatalogueIcon({ name }: { name: keyof typeof marks }) {
  return <svg className="catalogue-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={marks[name]} /></svg>;
}

function CatalogueCover() {
  return (
    <section id="hero" className="catalogue-hero" tabIndex={-1} aria-labelledby="catalogue-title">
      <img src={catalogueArt['./assets/retro/catalogue/cover.avif']} alt="" width="1680" height="560" fetchPriority="high" />
      <div className="catalogue-layout catalogue-hero__copy">
        <p className="catalogue-hero__imprint"><CatalogueIcon name="compass" /> The Paradise Adventure Collection</p>
        <h1 id="catalogue-title">Аттракционы <span>и развлечения</span></h1>
        <p>Захватывающие аттракционы, водные приключения и развлечения для всей семьи — откройте коллекцию ярких впечатлений Aqua Paradise Resort.</p>
      </div>
    </section>
  );
}

function CatalogueFilters({ filters, change, reset }: { filters: Filters; change: (filters: Filters) => void; reset: () => void }) {
  return (
    <section className="catalogue-filters catalogue-paper" aria-label="Поиск и фильтры">
      <div className="catalogue-filter-row">
        <label className="catalogue-search">
          <CatalogueIcon name="search" />
          <input type="search" placeholder="Поиск по названию…" aria-label="Поиск по названию"
            value={filters.search} onChange={event => change({ ...filters, search: event.target.value })} />
        </label>
        <select value={filters.zone} aria-label="Фильтр по зоне" onChange={event => change({ ...filters, zone: event.target.value })}>
          {ZONES.map(zone => <option key={zone} value={zone}>{zone === 'Все' ? 'Все зоны' : zone}</option>)}
        </select>
        <select value={filters.intensity} aria-label="Фильтр по интенсивности" onChange={event => change({ ...filters, intensity: event.target.value })}>
          {INTENSITIES.map(intensity => <option key={intensity} value={intensity}>{intensity === 'Все' ? 'Любая интенсивность' : intensity}</option>)}
        </select>
        <button className="catalogue-reset" type="button" aria-label="Сбросить фильтры" onClick={reset}>Сбросить</button>
      </div>
      <div className="catalogue-categories" role="group" aria-label="Быстрые категории">
        {QUICK_CATEGORIES.map(category => (
          <button key={category.id} type="button" aria-pressed={filters.quick === category.id}
            onClick={() => change({ ...filters, quick: category.id })}>{category.label}</button>
        ))}
      </div>
      <div className="catalogue-restrictions">
        <label>Возраст: <input type="number" min="0" max="120" value={filters.age} placeholder="лет" aria-label="Ваш возраст"
          onChange={event => change({ ...filters, age: numeric(event.target.value) })} /></label>
        <label>Рост: <input type="number" min="0" max="250" value={filters.height} placeholder="см" aria-label="Ваш рост"
          onChange={event => change({ ...filters, height: numeric(event.target.value) })} /></label>
        {(filters.age !== '' || filters.height !== '') && <p>Предварительная подсказка. Допуск зависит от сопровождения и соблюдения правил безопасности.</p>}
      </div>
    </section>
  );
}

function RideArt({ ride, eager = false }: { ride: Attraction; eager?: boolean }) {
  const source = originalArt[`./assets/retro/rides/${ride.id}.avif`]
    ?? catalogueArt[`./assets/retro/catalogue/${ride.id}.avif`]
    ?? atlasArt[`./assets/retro/atlas/${atlasScenes[ride.id]}.avif`];
  return source
    ? <img className="catalogue-ride-image" src={source} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />
    : <div className="catalogue-ride-placeholder"><CatalogueIcon name="compass" /><span>Иллюстрация готовится</span></div>;
}

function RideTicket({ result, open }: { result: RideResult; open: (ride: Attraction) => void }) {
  const { ride, restriction } = result;
  return (
    <button className="catalogue-ticket" type="button" data-ride={ride.id}
      aria-label={`Открыть подробности: ${ride.name}${restriction ? ` (скрыто по ограничениям: ${restriction})` : ''}`}
      onClick={event => {
        event.currentTarget.focus({ preventScroll: true });
        open(ride);
      }}>
      <div className="catalogue-ticket__image"><RideArt ride={ride} /></div>
      <div className="catalogue-ticket__caption">
        <h2>{ride.name}</h2>
        <p><CatalogueIcon name="pin" />{ride.zone}</p>
        {restriction && <span className="catalogue-ticket__restriction">{restriction}</span>}
      </div>
      <div className="catalogue-ticket__facts">
        <span><CatalogueIcon name="speed" />{ride.intensity}</span>
        {ride.minAge > 0 && <span><CatalogueIcon name="age" />от {ride.minAge} лет</span>}
        {ride.minHeight !== null && <span><CatalogueIcon name="height" />от {ride.minHeight} см</span>}
      </div>
    </button>
  );
}

function CatalogueResults({ filters, open, reset }: { filters: Filters; open: (ride: Attraction) => void; reset: () => void }) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [showHidden, setShowHidden] = useState(false);
  const resultGrid = useRef<HTMLDivElement>(null);
  const { visible, hidden } = groupResults(filters);
  const results = showHidden ? [...visible, ...hidden] : visible;
  const displayed = results.slice(0, visibleCount);

  return (
    <div className="catalogue-results">
      <div className="catalogue-results__summary">
        <p role="status">Найдено: <strong>{results.length}</strong>{results.length > 0 && <span> · показано {displayed.length}</span>}</p>
        {hidden.length > 0 && !showHidden && <button className="catalogue-results__reveal" type="button"
          aria-label={`Показать ${hidden.length} скрытых по ограничениям`} onClick={() => setShowHidden(true)}>
          {hidden.length} скрыто по ограничениям — показать
        </button>}
      </div>
      {displayed.length > 0 ? (
        <div className="catalogue-grid" ref={resultGrid}>
          {displayed.map(result => <RideTicket key={result.ride.id} result={result} open={open} />)}
        </div>
      ) : (
        <div className="catalogue-empty catalogue-paper">
          <p>Ничего не найдено по вашему запросу.</p>
          <button className="catalogue-cta riv-button" type="button" onClick={reset}>Сбросить фильтры</button>
        </div>
      )}
      {results.length > visibleCount && (
        <div className="catalogue-more">
          <button className="catalogue-cta riv-button" type="button" onClick={() => {
            setVisibleCount(visibleCount + pageSize);
            requestAnimationFrame(() => resultGrid.current?.querySelectorAll('button')[visibleCount]?.focus({ preventScroll: true }));
          }}>Показать ещё <CatalogueIcon name="down" /></button>
        </div>
      )}
    </div>
  );
}

function RideDialog({ ride, close }: { ride: Attraction; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const panel = dialog.current;
    const origin = document.activeElement;
    const overflow = document.body.style.overflow;
    panel?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      panel?.close();
      document.body.style.overflow = overflow;
      if (origin instanceof HTMLElement && origin.isConnected && origin !== document.body) {
        origin.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog className="catalogue-dialog" ref={dialog} aria-labelledby="attraction-modal-title"
      onCancel={event => { event.preventDefault(); close(); }}
      onKeyDown={event => {
        if (event.key !== 'Tab') return;
        event.preventDefault();
        closeButton.current?.focus({ preventScroll: true });
      }}
      onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="catalogue-dialog__page">
        <div className="catalogue-dialog__toolbar">
          <button className="catalogue-dialog__close riv-button catalogue-cta" ref={closeButton} type="button" aria-label="Закрыть окно аттракциона" onClick={close}>
            <CatalogueIcon name="close" />
          </button>
        </div>
        <div className="catalogue-dialog__art" data-ride={ride.id}><RideArt ride={ride} eager /></div>
        <div className="catalogue-dialog__copy">
          <p className="catalogue-dialog__zone"><CatalogueIcon name="pin" />{ride.zone}</p>
          <h2 id="attraction-modal-title">{ride.name}</h2>
          <p>{ride.desc}</p>
          <dl className="catalogue-dialog__facts">
            <div><dt>Интенсивность</dt><dd>{ride.intensity}</dd></div>
            {ride.minAge > 0 && <div><dt>Возраст</dt><dd>от {ride.minAge} лет</dd></div>}
            {ride.minHeight !== null && <div><dt>Рост</dt><dd>от {ride.minHeight} см</dd></div>}
          </dl>
          <p className="catalogue-dialog__safety"><strong>Безопасность</strong>{ride.safety}</p>
        </div>
      </div>
    </dialog>
  );
}

export default function AttractionsPage({ query, navigate }: { query: string; navigate: CatalogueNavigation }) {
  const [resetCount, setResetCount] = useState(0);
  const params = new URLSearchParams(query);
  const filters = readFilters(params);
  const selectedRide = findAttractionById(params.get('ride') ?? '');
  const filterRoute = catalogueRoute(filters);
  const changeFilters = (next: Filters) => navigate(catalogueRoute(next), 'filter');
  const reset = () => {
    setResetCount(count => count + 1);
    changeFilters(emptyFilters);
  };

  return (
    <div className="catalogue-page">
      <CatalogueCover />
      <div className="catalogue-layout catalogue-content">
        <CatalogueFilters filters={filters} change={changeFilters} reset={reset} />
        <CatalogueResults key={`${filterRoute}:${resetCount}`} filters={filters}
          open={ride => navigate(catalogueRoute(filters, ride.id), 'open-ride')} reset={reset} />
      </div>
      {selectedRide && <RideDialog key={selectedRide.id} ride={selectedRide} close={() => {
        if (window.history.state?.attractionModal) window.history.back();
        else navigate(filterRoute, 'filter');
      }} />}
    </div>
  );
}
