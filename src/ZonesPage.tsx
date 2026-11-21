import { useEffect, useRef } from 'react';
import { ATTRACTIONS, ATTRACTION_IDS_BY_ZONE } from './data/attractions';
import { zonesData } from './data/zones';
import AtlasIcon, { type AtlasIconName } from './components/AtlasIcon';
import gardenIcon from './assets/retro/viewmaster/eden-gardens-vintage.svg';

type Zone = (typeof zonesData)[number];
const TABS = [
  { id: 'overview', label: 'Обзор' },
  { id: 'attractions', label: 'Развлечения' },
  { id: 'infrastructure', label: 'Инфраструктура' },
  { id: 'rules', label: 'Правила' },
] as const;
type Tab = (typeof TABS)[number]['id'];

const illustrations = import.meta.glob<string>('./assets/retro/atlas/*.avif', { eager: true, import: 'default' });
const ticketIcons = import.meta.glob<string>('./assets/retro/viewmaster/icon-*.webp', { eager: true, import: 'default' });
const scenes: Record<string, { title: string; alt: string; marks: [AtlasIconName, AtlasIconName, AtlasIconName] }> = {
  'paradise-boulevard': { title: 'Paradise Fountain Show', alt: 'Подсвеченные фонтаны на площади среди пальм в вечерних сумерках', marks: ['arch', 'palm', 'fountain'] },
  'paradise-market': { title: 'Tropical Bites Food Hall', alt: 'Прилавки фуд-холла и открытые террасы под полосатыми навесами', marks: ['market', 'dining', 'lantern'] },
  'eden-gardens': { title: 'Butterfly Haven', alt: 'Бабочки среди цветущих растений в тропической оранжерее', marks: ['leaf', 'butterfly', 'lantern'] },
  'little-paradise': { title: 'Rainbow Reef', alt: 'Невысокие детские горки и мелкий бассейн с коралловыми декорациями', marks: ['fountain', 'slide', 'waves'] },
  'serenity-spa': { title: 'Lotus Thermal Pools', alt: 'Каменные термальные бассейны с лотосами и тенистыми павильонами', marks: ['lotus', 'fountain', 'leaf'] },
  'pirates-cove': { title: 'Smuggler’s Passage', alt: 'Надувные круги в бирюзовом водном канале пиратской пещеры', marks: ['sail', 'slide', 'ring'] },
  'atlantis-realm': { title: 'Moonlit Ruins', alt: 'Вечерний бассейн среди подсвеченных античных колонн и руин', marks: ['arch', 'waves', 'moon'] },
  'adrenaline-peak': { title: 'Velocity Racers', alt: 'Параллельные дорожки водных гонок на тропическом склоне', marks: ['slide', 'flag', 'peak'] },
  'ocean-bay': { title: 'Sunset Lounge', alt: 'Закат над природной песчаной бухтой, вид с прибрежной террасы', marks: ['palm', 'waves', 'moon'] },
};

const zoneNumber = (index: number) => String(index + 1).padStart(2, '0');
const illustrationUrl = (id: string) => illustrations[`./assets/retro/atlas/${id}.avif`];

function atlasRoute(zoneId: string, tab: Tab = 'overview') {
  const query = new URLSearchParams({ zone: zoneId });
  if (tab !== 'overview') query.set('tab', tab);
  return `#/zones?${query}`;
}

function AtlasCover() {
  return (
    <header className="atlas-cover">
      <div className="atlas-cover__stock" aria-hidden="true">
        <img src={illustrationUrl('cover')} alt="" width="1500" height="500" fetchPriority="high" />
      </div>
      <div className="atlas-cover__title">
        <p className="atlas-cover__imprint"><AtlasIcon name="compass" /><span>The Grand<br />Paradise Atlas</span></p>
        <h1>Девять миров</h1>
        <p className="atlas-cover__edition">Атлас уникальных зон<br />Aqua Paradise Resort</p>
      </div>
      <p className="atlas-cover__intro">Девять удивительных миров, объединённых на одном тропическом острове. У каждого из них — свой характер, атмосфера и приключения.</p>
      <span className="atlas-cover__seal" aria-hidden="true"><AtlasIcon name="palm" />Aqua Paradise<br />Resort</span>
    </header>
  );
}

function ZoneTickets({ activeId }: { activeId: string }) {
  const strip = useRef<HTMLElement>(null);

  useEffect(() => {
    const rail = strip.current;
    const current = rail?.querySelector('[aria-current="true"]');
    if (!rail || !current) return;
    const left = rail.getBoundingClientRect().left + 8;
    const right = rail.getBoundingClientRect().right - 8;
    const item = current.getBoundingClientRect();
    if (item.right > right) rail.scrollLeft += item.right - right;
    else if (item.left < left) rail.scrollLeft -= left - item.left;
  }, [activeId]);

  return (
    <nav ref={strip} className="atlas-tickets" aria-label="Тематические зоны">
      {zonesData.map((zone, index) => (
        <a className="atlas-ticket" key={zone.id} href={atlasRoute(zone.id)}
          aria-current={activeId === zone.id ? 'true' : undefined} aria-label={`Открыть зону ${zone.name}`}>
          <small className="atlas-ticket__number" aria-hidden="true">{zoneNumber(index)}</small>
          <span className="atlas-ticket__art" aria-hidden="true">
            <img src={index === 2 ? gardenIcon : ticketIcons[`./assets/retro/viewmaster/icon-${index + 1}.webp`]} alt="" />
          </span>
          <span className="atlas-ticket__name">{zone.name}</span>
        </a>
      ))}
    </nav>
  );
}

function ZoneTabs({ zone, active, select }: { zone: Zone; active: Tab; select: (tab: Tab) => void }) {
  return (
    <div className="atlas-tabs" role="tablist" aria-label={`Сведения о зоне ${zone.name}`}>
      {TABS.map((tab, index) => (
        <button key={tab.id} type="button" role="tab" id={`zone-tab-${tab.id}`}
          aria-controls="zone-tab-panel" aria-selected={active === tab.id} tabIndex={active === tab.id ? 0 : -1}
          onClick={() => select(tab.id)}
          onKeyDown={event => {
            const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
            if (!delta && event.key !== 'Home' && event.key !== 'End') return;
            event.preventDefault();
            const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1
              : (index + delta + TABS.length) % TABS.length;
            const next = TABS[nextIndex].id;
            select(next);
            document.getElementById(`zone-tab-${next}`)?.focus({ preventScroll: true });
          }}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function ZonePanel({ zone, active, select }: { zone: Zone; active: Tab; select: (tab: Tab) => void }) {
  const scene = scenes[zone.id];
  const attractionIds = ATTRACTION_IDS_BY_ZONE[zone.name] ?? [];
  const attractions = attractionIds.flatMap(id => ATTRACTIONS.find(ride => ride.id === id) ?? []);
  const groups: { key: keyof Zone['infrastructure']; label: string; icon: AtlasIconName }[] = [
    { key: 'rest', label: 'Отдых', icon: 'palm' },
    { key: 'food', label: 'Питание', icon: 'dining' },
    { key: 'service', label: 'Сервис и транспорт', icon: 'compass' },
    { key: 'safety', label: 'Безопасность', icon: 'shield' },
  ];

  return (
    <div className="atlas-panel" id="zone-tab-panel" role="tabpanel" aria-labelledby={`zone-tab-${active}`} tabIndex={0}>
      {active === 'overview' && (
        <>
          <ul className="atlas-features" aria-label="Особенности зоны">
            {zone.features.map((feature, index) => (
              <li key={feature}><AtlasIcon name={scene.marks[index]} /><span>{feature}</span></li>
            ))}
          </ul>
          <p className="atlas-recommendation"><strong>Кому понравится</strong> {zone.likes}</p>
          <button type="button" className="atlas-action riv-button" onClick={() => {
            select('attractions');
            document.getElementById('zone-tab-attractions')?.focus({ preventScroll: true });
          }}>
            {attractions.length ? 'Посмотреть аттракционы' : 'Посмотреть развлечения'} <span aria-hidden="true">→</span>
          </button>
        </>
      )}
      {active === 'attractions' && (
        <>
          {attractions.length > 0 && <section>
            <h3>Аттракционы</h3>
            <ul className="atlas-rides">
              {attractions.map(ride => (
                <li key={ride.id}>
                  <a href={`#/attractions?ride=${ride.id}`}>
                    <strong>{ride.name}</strong>
                    <small>{ride.intensity} · {ride.minAge}+{ride.minHeight !== null && ` · от ${ride.minHeight} см`}</small>
                    <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>}
          <section>
            <h3>{attractions.length ? 'Что ещё посетить' : 'Чем заняться'}</h3>
            <ul className="atlas-list">{zone.activities.map(activity => <li key={activity}>{activity}</li>)}</ul>
          </section>
        </>
      )}
      {active === 'infrastructure' && (
        <div className="atlas-infrastructure">
          {groups.map(({ key, label, icon }) => {
            const items = zone.infrastructure[key];
            if (!items?.length) return null;
            return <section key={key}>
              <h3><AtlasIcon name={icon} />{label}</h3>
              <ul className="atlas-list">{items.map(item => <li key={item}>{item}</li>)}</ul>
            </section>;
          })}
        </div>
      )}
      {active === 'rules' && (
        <>
          <ul className="atlas-rules">
            {zone.rules.map(rule => <li key={rule}><AtlasIcon name="shield" /><span>{rule}</span></li>)}
          </ul>
          <p className="atlas-note">Подробные ограничения указаны в карточках аттракционов. Часы работы и условия относятся к демонстрационному курорту.</p>
        </>
      )}
    </div>
  );
}

export default function ZonesPage({ zoneId, tabId, navigate }: {
  zoneId: string | null;
  tabId: string | null;
  navigate: (path: string) => void;
}) {
  const zone = zonesData.find(item => item.id === zoneId) ?? zonesData[8];
  const index = zonesData.indexOf(zone);
  const active = TABS.find(tab => tab.id === tabId)?.id ?? 'overview';
  const scene = scenes[zone.id];

  return (
    <div className="atlas-page">
      <div className="atlas-layout">
        <AtlasCover />
        <ZoneTickets activeId={zone.id} />
        <article className="atlas-spread" aria-labelledby="atlas-zone-name">
          <figure className="atlas-picture">
            <img key={zone.id} src={illustrationUrl(zone.id)} alt={scene.alt} width="1320" height="880" />
            <figcaption>{scene.title}</figcaption>
          </figure>
          <div className="atlas-sheet">
            <div className="atlas-zone-title">
              <p className="atlas-zone-title__number">Мир №{zoneNumber(index)}</p>
              <h2 id="atlas-zone-name" aria-live="polite">{zone.name}</h2>
              <p className="atlas-zone-title__tagline">{zone.poster.tagline}</p>
              <p className="atlas-zone-title__description">{zone.desc}</p>
              <p className="atlas-hours"><AtlasIcon name="clock" /> Часы работы зоны {zone.hours}</p>
            </div>
            <ZoneTabs zone={zone} active={active} select={tab => navigate(atlasRoute(zone.id, tab))} />
            <ZonePanel zone={zone} active={active} select={tab => navigate(atlasRoute(zone.id, tab))} />
          </div>
        </article>
      </div>
    </div>
  );
}
