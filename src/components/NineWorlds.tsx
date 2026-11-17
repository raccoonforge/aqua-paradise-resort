import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';
import { ZONE_SLUGS } from '../data/attractions';
import '../worlds-immersive.css';
import '../worlds-reference.css';

const panoramas = import.meta.glob('../assets/worlds-photo-final/*-panorama.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const sceneUrl = (slug: string) => panoramas[`../assets/worlds-photo-final/${slug}-panorama.webp`];
const sceneArt: Record<string, { desktop: string; mobile: string; shade: string; mobileShade: string }> = {
  'atlantis-realm': { desktop: '52% 48%', mobile: '70% center', shade: 'linear-gradient(92deg, #03131edf, #03131e8c 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #03131e8c 39%, #03131edf 66%, #03131b66 89%, #03131b80)' },
  'eden-gardens': { desktop: '54% 48%', mobile: '60% center', shade: 'linear-gradient(105deg, #031a19e0, #06211b8f 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #06211b8f 39%, #031a19e0 66%, #03131b66 89%, #03131b80)' },
  'adrenaline-peak': { desktop: '58% 46%', mobile: '76% center', shade: 'linear-gradient(82deg, #050f1ae6, #0c172c99 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #0c172c99 39%, #050f1ae6 66%, #03131b66 89%, #03131b80)' },
  'ocean-bay': { desktop: '55% 50%', mobile: '42% center', shade: 'linear-gradient(100deg, #061925e0, #07323b9e 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #07323b9e 39%, #061925e0 66%, #03131b66 89%, #03131b80)' },
  'serenity-spa': { desktop: '48% 48%', mobile: '60% center', shade: 'linear-gradient(96deg, #03131be0, #031b28c2 42%, #031b2840 68%, transparent 92%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #061723cf 39%, #051622d6 66%, #03131b66 89%, #03131b80)' },
  'pirates-cove': { desktop: '48% 48%', mobile: '63% center', shade: 'linear-gradient(86deg, #11191de0, #132a3099 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #132a3099 39%, #11191de0 66%, #03131b66 89%, #03131b80)' },
  'little-paradise': { desktop: '55% 48%', mobile: '62% center', shade: 'linear-gradient(102deg, #0b2032e8, #1839429e 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #1839429e 39%, #0b2032e8 66%, #03131b66 89%, #03131b80)' },
  'paradise-market': { desktop: '50% 48%', mobile: '56% center', shade: 'linear-gradient(90deg, #1a1519eb, #352423ad 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #352423ad 39%, #1a1519eb 66%, #03131b66 89%, #03131b80)' },
  'paradise-boulevard': { desktop: '50% 48%', mobile: '84% center', shade: 'linear-gradient(98deg, #051529e0, #19243899 37%, #03131b26 65%, transparent 86%)', mobileShade: 'linear-gradient(180deg, #03131b14, #03131b14 22%, #19243899 39%, #051529e0 66%, #03131b66 89%, #03131b80)' },
};
const sceneStyle = (slug: string): CSSProperties => ({
  '--world-desktop-position': sceneArt[slug].desktop,
  '--world-mobile-position': sceneArt[slug].mobile,
  '--world-scene-shade': sceneArt[slug].shade,
  '--world-scene-mobile-shade': sceneArt[slug].mobileShade,
} as CSSProperties);
const decoded = new Map<string, Promise<void>>();
function decodeScene(src: string): Promise<void> {
  if (!src) return Promise.reject(new Error('Missing world panorama'));
  const cached = decoded.get(src);
  if (cached) return cached;
  const image = new Image();
  image.src = src;
  const promise = image.decode().catch((error: unknown) => {
    decoded.delete(src);
    throw error;
  });
  decoded.set(src, promise);
  return promise;
}

export default function NineWorlds() {
  const zones = [
    { name: 'Atlantis Realm', tag: 'Исследования', desc: 'Затерянный мир древних руин, водных маршрутов и приключений среди морских легенд.', color: '#174c63' },
    { name: 'Eden Gardens', tag: 'Природа', desc: 'Тропические сады, тенистые тропы и водопады, где время словно замедляется.', color: '#285a49' },
    { name: 'Adrenaline Peak', tag: 'Экстрим', desc: 'Головокружительные спуски и захватывающие водные приключения для самых смелых.', color: '#704d3e' },
    { name: 'Ocean Bay', tag: 'Пляжный отдых', desc: 'Лазурная вода, белоснежный песок и безмятежный отдых у открытого моря.', color: '#176b76' },
    { name: 'Serenity Spa', tag: 'Релакс', desc: 'Уединённое пространство спокойствия, восстановления и премиального отдыха.', color: '#486c68' },
    { name: "Pirate's Cove", tag: 'Приключения', desc: 'Пиратские истории, спрятанные сокровища и весёлые открытия для всей семьи.', color: '#635344' },
    { name: 'Little Paradise', tag: 'Для детей', desc: 'Яркий и безопасный мир водных развлечений для самых маленьких гостей.', color: '#527f79' },
    { name: 'Paradise Market', tag: 'Гастрономия', desc: 'Ароматы островной кухни, уютные кафе и атмосферные торговые улочки.', color: '#846044' },
    { name: 'Paradise Boulevard', tag: 'Прогулки', desc: 'Праздничное сердце острова: площади, вечерние огни и незабываемые встречи.', color: '#375c61' },
  ];
  const [activeZone, setActiveZone] = useState(0);
  const [error, setError] = useState(false);
  const requestedZone = useRef(0);
  const requestVersion = useRef(0);
  const rail = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const zone = zones[activeZone];
  const slug = ZONE_SLUGS[zone.name];

  useEffect(() => () => { requestVersion.current += 1; }, []);
  useEffect(() => {
    const list = rail.current;
    const tab = list?.querySelector<HTMLButtonElement>(`[data-world-index="${activeZone}"]`);
    if (!list || !tab) return;
    const bounds = list.getBoundingClientRect();
    const item = tab.getBoundingClientRect();
    const offset = item.left < bounds.left ? item.left - bounds.left : item.right > bounds.right ? item.right - bounds.right : 0;
    if (offset) list.scrollBy({ left: offset, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }, [activeZone]);

  const changeZone = async (index: number) => {
    const target = (index + zones.length) % zones.length;
    requestedZone.current = target;
    const version = ++requestVersion.current;
    setError(false);
    try {
      await decodeScene(sceneUrl(ZONE_SLUGS[zones[target].name]));
      if (version === requestVersion.current) setActiveZone(target);
    } catch {
      if (version === requestVersion.current) {
        requestedZone.current = activeZone;
        setError(true);
      }
    }
  };
  const onKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = Number((event.target as HTMLElement).closest<HTMLButtonElement>('[data-world-index]')?.dataset.worldIndex ?? activeZone);
    const next = event.key === 'ArrowRight' ? (index + 1) % zones.length
      : event.key === 'ArrowLeft' ? (index + zones.length - 1) % zones.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? zones.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    rail.current?.querySelector<HTMLButtonElement>(`[data-world-index="${next}"]`)?.focus({ preventScroll: true });
    void changeZone(next);
  };
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const origin = touchStart.current;
    touchStart.current = null;
    const touch = event.changedTouches[0];
    if (!origin || !touch) return;
    const dx = touch.clientX - origin.x;
    const dy = touch.clientY - origin.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) void changeZone(requestedZone.current + (dx < 0 ? 1 : -1));
  };

  return (
    <section id="worlds" className="apr-worlds apr-worlds--immersive" aria-label="Девять миров Aqua Paradise">
      <div className="apr-worlds__frame" style={{ '--world-tone': zone.color } as CSSProperties}>
        <div className="apr-worlds__backdrops" aria-hidden="true">
          {zones.map((item, index) => (
            <div key={item.name} className={`apr-worlds__backdrop ${activeZone === index ? 'is-active' : ''}`} data-world-scene={ZONE_SLUGS[item.name]} style={sceneStyle(ZONE_SLUGS[item.name])}>
              <img className="apr-worlds__panorama" src={sceneUrl(ZONE_SLUGS[item.name])} alt="" width="1672" height="941" decoding="async" />
            </div>
          ))}
        </div>
        <div className="apr-worlds__shade" aria-hidden="true" />
        <div className="apr-worlds__content" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
          <div className="apr-worlds__intro">
            <span className="apr-worlds__eyebrow">ТРОПИЧЕСКИЙ КУРОРТ</span>
            <h2 className="apr-worlds__heading">Девять миров.<br /><em>Aqua Paradise</em></h2>
            <p className="apr-worlds__lead">От тропических садов до затерянных цивилизаций — выбери свой мир приключений.</p>
          </div>
          <div id="worlds-panel" role="tabpanel" aria-labelledby={`world-tab-${slug}`} className="apr-worlds__selected">
            <div className="apr-worlds__selected-copy" key={zone.name} aria-live="polite" aria-atomic="true">
              <span className="apr-worlds__selected-kicker">СЕЙЧАС ВЫ В МИРЕ</span>
              <div className="apr-worlds__zone-heading">
                <svg className="apr-worlds__zone-mark" viewBox="0 0 40 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M3 9c6 0 6-6 12-6s6 6 12 6 6-3 10-3M3 18c6 0 6-6 12-6s6 6 12 6 6-3 10-3M3 27c6 0 6-6 12-6s6 6 12 6 6-3 10-3" /></svg>
                <h3>{zone.name}</h3>
              </div>
              <p>{zone.desc}</p>
            </div>
            <div className="apr-worlds__actions">
              <button type="button" className="apr-button apr-button--sand" onClick={() => { window.location.hash = `#/zones?zone=${slug}`; }}>Подробнее о зоне <span aria-hidden="true">→</span></button>
              <button type="button" className="apr-button apr-button--outline" onClick={() => { window.location.hash = '#/tickets'; }}><svg className="apr-worlds__ticket-mark" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M3 3h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4z" /><path d="M15 4v2m0 3v2m0 3v2" /></svg>Выбрать билет</button>
            </div>
            {error && <p role="alert" className="apr-worlds__error">Не удалось открыть этот мир. Попробуйте ещё раз.</p>}
          </div>
        </div>
        <div className="apr-worlds__dock">
          <span className="apr-worlds__dock-label">ДЕВЯТЬ МИРОВ AQUA PARADISE</span>
          <div className="apr-worlds__dock-row">
            <button type="button" className="apr-worlds__next apr-worlds__prev" onClick={() => { void changeZone(requestedZone.current - 1); }} aria-label="Предыдущий мир">←</button>
            <div className="apr-worlds__rail" ref={rail} role="tablist" aria-label="Выберите тематическую зону" onKeyDown={onKeys}>
              {zones.map((item, index) => {
                const itemSlug = ZONE_SLUGS[item.name];
                return (
                  <button key={item.name} id={`world-tab-${itemSlug}`} type="button" role="tab" aria-selected={activeZone === index} aria-controls="worlds-panel" tabIndex={activeZone === index ? 0 : -1} data-world-index={index} onClick={() => { void changeZone(index); }} className={`apr-worlds__tab ${activeZone === index ? 'is-active' : ''}`}>
                    <span className="apr-worlds__thumb" style={{ backgroundColor: item.color, ...sceneStyle(itemSlug) }}><img src={sceneUrl(itemSlug)} alt="" width="1672" height="941" decoding="async" /></span>
                    <span className="apr-worlds__tab-copy"><strong>{item.name}</strong><small>{item.tag}</small></span>
                  </button>
                );
              })}
            </div>
            <button type="button" className="apr-worlds__next" onClick={() => { void changeZone(requestedZone.current + 1); }} aria-label="Следующий мир">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
