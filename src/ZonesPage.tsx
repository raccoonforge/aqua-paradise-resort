import { useEffect, useState } from 'react';
import { ATTRACTIONS, ATTRACTION_IDS_BY_ZONE } from './data/attractions';

type Tab = 'overview' | 'attractions' | 'infrastructure' | 'rules';
type Zone = {
  id: string;
  name: string;
  icon: string;
  hours: string;
  desc: string;
  features: string[];
  likes: string;
  activities: string[];
  infrastructure: { rest?: string[]; food?: string[]; service?: string[]; safety?: string[] };
  rules: string[];
};

// Сведения о зонах взяты из docs/master/website-requirements.md,
// разделов 7.7.2–7.7.11. Отдельные часы объектов не означают часы всей зоны.
const zonesData: Zone[] = [
  {
    id: 'paradise-boulevard', name: 'Paradise Boulevard', icon: '🌴', hours: '09:00–22:00',
    desc: 'Главная входная и прогулочная зона курорта. Здесь начинается знакомство с островом: центральная площадь, пальмовая аллея, информационный центр и музыкальные фонтаны.',
    features: ['Paradise Gateway — входная площадь', 'Palm Avenue — прогулочная аллея', 'Вечернее Paradise Fountain Show'],
    likes: 'Гостям, которые хотят познакомиться с островом, прогуляться и посмотреть шоу фонтанов.',
    activities: [
      'Paradise Gateway — входная площадь с фотозоной; 09:00–22:00.',
      'Palm Avenue — прогулка среди пальм, 09:00–22:00.',
      'Paradise Fountain Show — два вечерних представления: 19:30–19:45 и 21:00–21:15.',
    ],
    infrastructure: {
      rest: ['Скамейки и зоны отдыха вдоль Palm Avenue', 'Доступные пешеходные дорожки'],
      service: ['Island Welcome Center — карты острова и справочная информация', 'Paradise Loop Central Station — бесплатный транспорт в обоих направлениях'],
    },
    rules: [
      'Доступ в зону — с 09:00 до 22:00; у отдельных объектов собственное расписание.',
      'Просмотр шоу фонтанов включён в билет; предварительное бронирование не требуется.',
      'Paradise Loop — транспорт, а не отдельное развлечение; рейсы выполняются по демонстрационному расписанию.',
    ],
  },
  {
    id: 'paradise-market', name: 'Paradise Market', icon: '🛍️', hours: '09:00–22:00',
    desc: 'Гастрономический и торговый центр курорта с фуд-холлом, рестораном с видом на океан, кафе, магазинами и прогулочной площадью.',
    features: ['Tropical Bites Food Hall', 'Azure Terrace Restaurant', 'Sunset Market Square'],
    likes: 'Любителям гастрономии, неспешных прогулок и покупок сувениров.',
    activities: [
      'Tropical Bites Food Hall — разнообразные кухни и семейные зоны, 09:00–22:00.',
      'Azure Terrace Restaurant — ресторан с открытой террасой, 12:00–22:00.',
      'Coconut & Co. — кафе со смузи и прохладительными напитками, 09:00–21:00.',
      'Island Treasures — сувениры, 10:00–22:00; Splash Essentials — пляжные принадлежности, 09:00–20:00.',
      'Sunset Market Square — прогулочная и торговая площадь, 09:00–22:00.',
    ],
    infrastructure: {
      food: ['Tropical Bites Food Hall', 'Azure Terrace Restaurant', 'Coconut & Co.'],
      service: ['Island Treasures — сувенирный магазин', 'Splash Essentials — пляжные принадлежности'],
      rest: ['Sunset Market Square — пространство для прогулок'],
    },
    rules: [
      'Посещение Paradise Market доступно только гостям с действующим входным билетом курорта.',
      'Еда, напитки и покупки оплачиваются отдельно от входного билета.',
      'Магазины и заведения работают по собственному расписанию; бронирование столиков в MVP не предусмотрено.',
    ],
  },
  {
    id: 'eden-gardens', name: 'Eden Gardens', icon: '🌸', hours: '09:00–21:00',
    desc: 'Ботанические сады с прогулочными маршрутами, водопадом, павильоном бабочек, экспозицией орхидей и вечерней подсветкой дорожек.',
    features: ['Emerald Walk — ботанический маршрут', 'Butterfly Haven — павильон бабочек', 'Starlight Trail — вечерняя прогулка'],
    likes: 'Любителям природы, спокойного отдыха, ботаники и фотографии.',
    activities: [
      'Emerald Walk — ботанический маршрут, 09:00–21:00.',
      'Hidden Falls — водопад и обзорная площадка, 09:00–19:00.',
      'Butterfly Haven — павильон живых бабочек, 10:00–18:00.',
      'Orchid Pavilion — экспозиция орхидей, 09:00–19:00.',
      'Starlight Trail — вечерняя прогулка с подсветкой, 17:00–21:00.',
    ],
    infrastructure: {
      rest: ['Места отдыха на Emerald Walk', 'Места отдыха в Orchid Pavilion', 'Подсветка дорожек Starlight Trail'],
      service: ['Доступные дорожки Emerald Walk и Orchid Pavilion'],
    },
    rules: [
      'Не срывайте и не повреждайте растения.',
      'Купание у Hidden Falls запрещено.',
      'В Butterfly Haven нельзя трогать или кормить бабочек и фотографировать со вспышкой; дети младше 12 лет — со взрослым.',
      'Для детей младше 12 лет на Starlight Trail необходимо сопровождение взрослого.',
    ],
  },
  {
    id: 'little-paradise', name: 'Little Paradise', icon: '🧸', hours: '09:00–19:00',
    desc: 'Детская тематическая зона для гостей 0–12 лет с отдельными пространствами для разных возрастов и водными развлечениями.',
    features: ['Tiny Tides — для малышей 0–3 лет', 'Rainbow Reef — для детей 4–7 лет', 'Splash Explorers — для детей 8–12 лет'],
    likes: 'Семьям с детьми, которым важны развлечения по возрасту.',
    activities: [
      'Tiny Tides — мелкий бассейн и фонтанчики для малышей.',
      'Rainbow Reef — небольшие горки и мелкие бассейны.',
      'Splash Explorers — водные развлечения для детей постарше.',
    ],
    infrastructure: { rest: ['Отдельные пространства по возрастным группам'], safety: ['Правила сопровождения действуют для каждого детского объекта'] },
    rules: [
      'Зона работает до 19:00; водные аттракционы — с 10:00 до 19:00.',
      'Несовершеннолетние посещают курорт только с сопровождающим старше 18 лет.',
      'Возрастные и ростовые ограничения различаются по аттракционам — проверяйте карточку конкретного объекта.',
    ],
  },
  {
    id: 'serenity-spa', name: 'Serenity Spa', icon: '🧘', hours: '09:00–21:00',
    desc: 'Спокойная wellness-зона с термальными бассейнами, массажными павильонами, саунами, водопадами и садом медитации.',
    features: ['Lotus Thermal Pools — тёплые бассейны', 'Whispering Falls — бассейн с водопадами', 'Zen Garden — сад медитации'],
    likes: 'Тем, кто предпочитает отдых, прогулки и спокойные wellness-практики.',
    activities: [
      'Lotus Thermal Pools — термальные бассейны, 09:00–21:00, с 12 лет.',
      'Bamboo Harmony — массажные павильоны, 10:00–20:00, с 16 лет; процедуры платные ($45 за 30 минут или $80 за 60 минут).',
      'Mist Sanctuary — сауны и паровые комнаты, 10:00–20:00, с 16 лет.',
      'Whispering Falls — спокойный бассейн, 09:00–21:00, с 12 лет.',
      'Zen Garden — сад медитации и прогулки, 09:00–21:00, без возрастного минимума.',
    ],
    infrastructure: { rest: ['Зоны отдыха Lotus Thermal Pools', 'Зоны отдыха Mist Sanctuary', 'Прогулочные дорожки и места для отдыха Zen Garden'], service: ['Bamboo Harmony — отдельные платные массажные процедуры'] },
    rules: [
      'Общие зоны, включённые в билет, доступны с учётом возрастных ограничений каждого объекта.',
      'Bamboo Harmony оплачивается отдельно; добавление процедуры в план не является записью.',
      'Для гостей 12–15 лет в Lotus Thermal Pools и Whispering Falls требуется взрослый; у других объектов свои правила сопровождения.',
      'При посещении термальных бассейнов и саун соблюдайте предупреждения о температуре.',
    ],
  },
  {
    id: 'pirates-cove', name: "Pirate's Cove", icon: '🏴‍☠️', hours: '09:00–20:00',
    desc: 'Пиратская тематическая зона с семейными водными приключениями, спусками и маршрутами в декорациях бухты сокровищ.',
    features: ['Stormbreaker', "Blackbeard's Run", "Smuggler's Passage"],
    likes: 'Семьям и любителям пиратских приключений.',
    activities: ['Водные развлечения: Stormbreaker, Blackbeard’s Run, Smuggler’s Passage и Cannonball Clash.'],
    infrastructure: {},
    rules: [
      'Основные водные горки работают с 10:00 до 19:00; отдельные вечерние развлечения — до 20:00.',
      'Соблюдайте возрастные и ростовые ограничения конкретных аттракционов.',
    ],
  },
  {
    id: 'atlantis-realm', name: 'Atlantis Realm', icon: '🔱', hours: '09:00–21:00',
    desc: 'Мир затерянного города с храмами, руинами, водными маршрутами и тематическими бассейнами.',
    features: ["Poseidon's Descent — спуск сквозь храм", 'Crystal Passage — туннель с аквариумом', 'Moonlit Ruins — вечерний бассейн'],
    likes: 'Любителям легенд, исследований и водных приключений.',
    activities: ["Poseidon’s Descent, Tidal Kingdom, Crystal Passage и Moonlit Ruins — развлечения с разной интенсивностью."],
    infrastructure: {},
    rules: [
      'Основные водные горки работают с 10:00 до 19:00; отдельные вечерние бассейны и водные развлечения — до 21:00.',
      'Для каждого аттракциона действуют собственные ограничения по возрасту и росту.',
    ],
  },
  {
    id: 'adrenaline-peak', name: 'Adrenaline Peak', icon: '⚡', hours: '09:00–20:00',
    desc: 'Зона высокоскоростных и соревновательных водных аттракционов с обзорной площадкой над островом.',
    features: ['Skyfall — свободное падение', 'Velocity Racers — водные гонки', "Eagle's Lookout — смотровая площадка"],
    likes: 'Любителям экстремальных горок и ярких впечатлений.',
    activities: ['Skyfall, Velocity Racers, Cyclone Vortex и Thunder Rush — экстремальные и скоростные аттракционы.', "Eagle's Lookout — смотровая площадка."],
    infrastructure: { rest: ["Eagle's Lookout — смотровая площадка"] },
    rules: [
      'Экстремальные горки работают с 10:00 до 19:00.',
      'С 19:00 до 20:00 остаются доступны смотровые площадки и прогулочные участки, но не экстремальные спуски.',
      'Ограничения по возрасту и росту указаны отдельно для каждого аттракциона.',
    ],
  },
  {
    id: 'ocean-bay', name: 'Ocean Bay', icon: '🌊', hours: '09:00–22:00',
    desc: 'Природная морская бухта с песчаным пляжем, прогулочной береговой линией и водными активностями в специально отведённых местах.',
    features: ['Естественный морской пляж', 'Купание в обозначенной зоне до 19:00', 'Прогулки по берегу вечером'],
    likes: 'Любителям пляжного отдыха, моря и спокойных вечерних прогулок.',
    activities: ['Отдых на природном пляже и купание в разрешённой зоне под наблюдением спасателей.', 'Водные развлечения Ocean Rush, Blue Horizon, Tidal Drop, Aqua Challenge, Coral Discovery и Ocean Explorer — по индивидуальному расписанию и правилам.'],
    infrastructure: { rest: ['Пляжная зона отдыха'], safety: ['Наблюдение спасателей в часы разрешённого купания'] },
    rules: [
      'Купание разрешено только в обозначенной зоне с 09:00 до 19:00 под наблюдением спасателей.',
      'После 19:00 купание запрещено; прогулки и отдых на берегу возможны до закрытия зоны.',
      'Водные активности имеют собственные возрастные, ростовые и другие ограничения.',
    ],
  },
];

const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Обзор' },
  { id: 'attractions', label: 'Развлечения' },
  { id: 'infrastructure', label: 'Инфраструктура' },
  { id: 'rules', label: 'Правила' },
];
const isTab = (value: string | null): value is Tab => TABS.some(tab => tab.id === value);
const isZone = (id: string | null): id is string => zonesData.some(zone => zone.id === id);

export default function ZonesPage({ initialZone, initialTab }: { initialZone?: string; initialTab?: Tab }) {
  const [activeZoneId, setActiveZoneId] = useState(isZone(initialZone ?? null) ? initialZone! : 'ocean-bay');
  const [activeTab, setActiveTab] = useState<Tab>(initialTab && isTab(initialTab) ? initialTab : 'overview');

  useEffect(() => {
    const syncFromHash = () => {
      const [route, query] = window.location.hash.split('?');
      if (route !== '#/zones') return;
      const params = new URLSearchParams(query ?? '');
      const zone = params.get('zone');
      const tab = params.get('tab');
      setActiveZoneId(isZone(zone) ? zone : 'ocean-bay');
      setActiveTab(isTab(tab) ? tab : 'overview');
    };
    window.addEventListener('hashchange', syncFromHash);
    syncFromHash();
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const setSelection = (zoneId: string, tab: Tab) => {
    setActiveZoneId(zoneId);
    setActiveTab(tab);
    const params = new URLSearchParams({ zone: zoneId });
    if (tab !== 'overview') params.set('tab', tab);
    const nextHash = `#/zones?${params.toString()}`;
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
  };

  const activeZone = zonesData.find(zone => zone.id === activeZoneId) ?? zonesData[8];
  const attractionIds = ATTRACTION_IDS_BY_ZONE[activeZone.name] ?? [];
  const zoneAttractions = attractionIds
    .map(id => ATTRACTIONS.find(attraction => attraction.id === id))
    .filter((attraction): attraction is (typeof ATTRACTIONS)[number] => Boolean(attraction));
  const infrastructureGroups = [
    { key: 'rest', label: 'Отдых', items: activeZone.infrastructure.rest },
    { key: 'food', label: 'Питание', items: activeZone.infrastructure.food },
    { key: 'service', label: 'Сервис и транспорт', items: activeZone.infrastructure.service },
    { key: 'safety', label: 'Безопасность', items: activeZone.infrastructure.safety },
  ].filter(group => group.items && group.items.length > 0);

  return (
    <div className="apr-zones-page min-h-screen pb-20">
      <div className="apr-zones-switcher">
        <nav aria-label="Тематические зоны" className="apr-zones-switcher__inner">
          <div className="apr-zones-switcher__track">
            {zonesData.map(zone => (
              <button
                type="button" key={zone.id}
                onClick={() => setSelection(zone.id, 'overview')}
                aria-label={`Открыть зону ${zone.name}`}
                aria-current={activeZoneId === zone.id ? 'page' : undefined}
                className={`apr-zones-switcher__item ${activeZoneId === zone.id ? 'is-active' : ''}`}
              >
                <span className="apr-zones-switcher__icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">zone.id === 'paradise-boulevard' ? <><path d="M15 28V12c-5-1-8-3-11-1 2-6 7-8 12-5 4-5 10-4 13 1-5-1-9 1-12 5 5-1 9 2 11 7-5-3-9-3-13-1"/><path d="M8 28h15"/></> : zone.id === 'paradise-market' ? <><path d="M5 12h22l-3-7H8zM7 14v13h18V14H7zm6 13v-9h7v9"/><path d="M5 12c0 5 6 5 6 0 0 5 5 5 5 0 0 5 5 5 5 0 0 5 6 5 6 0"/></> : zone.id === 'eden-gardens' ? <><path d="M16 28V16C9 16 6 11 7 5c7 0 12 4 9 12 2-9 6-12 12-11 0 8-4 13-12 14"/><path d="M16 24c-6-1-10-5-12-10 6-1 10 2 12 10"/></> : zone.id === 'little-paradise' ? <><path d="M5 27V13l6-5 5 5 5-5 6 5v14H5zM11 8V4m10 4V4M9 18h4v4H9zm10 0h4v4h-4zM14 27v-8h4v8M3 13h26"/></> : zone.id === 'serenity-spa' ? <><path d="M16 25C9 20 9 13 16 5c7 8 7 15 0 20M16 25C9 27 4 23 3 15c7-1 12 3 13 10m0 0c7 2 12-2 13-10-7-1-12 3-13 10M8 28h16"/></> : zone.id === 'pirates-cove' ? <><path d="M6 13 4 25h24l-2-12-10-8zM10 14l6-9 6 9M11 25v-7h10v7M15 18v7"/><circle cx="16" cy="13" r="2"/><path d="M3 28c4-2 6-2 10 0s7 2 10 0 5-2 7 0"/></> : zone.id === 'atlantis-realm' ? <><path d="M4 27h24M6 25V12h20v13M4 12h24L16 4zM10 16v9m6-9v9m6-9v9M8 9h16"/></> : zone.id === 'adrenaline-peak' ? <><path d="M5 26h22M8 25V9h16v16M8 9l8-6 8 6M12 15h8v4h-8zM6 26c2-4 5-5 10-5s8 1 10 5"/><path d="M24 10c4 2 5 6 2 10"/></> : <><path d="M3 20c5-6 9-6 14 0 4 5 8 5 12 0M3 26c5-6 9-6 14 0 4 4 8 4 12 0M6 15c2-7 7-11 12-11 5 0 9 4 10 10-4-2-8-2-11 0-4 2-7 2-11 1"/></></svg></span><span className="apr-zones-switcher__copy"><span className="apr-zones-switcher__number" aria-hidden="true">{String(zonesData.indexOf(zone) + 1).padStart(2, '0')}</span>
                <span className="apr-zones-switcher__name">{zone.name}</span></span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <main className="apr-zones-main">
        <div className="apr-zones-layout">
          <div className="apr-zones-visual">
            <div className="apr-zones-panorama" role="img" aria-label={`Место для будущей панорамной фотографии ${activeZone.name}`}><span className="apr-zones-panorama__eyebrow">AQUA PARADISE · THE NINE WORLDS</span><span className="apr-zones-panorama__mark">◇</span><span className="apr-zones-panorama__label">МЕСТО ДЛЯ ПАНОРАМЫ</span><strong>{activeZone.name}</strong><span className="apr-zones-panorama__index">{String(zonesData.findIndex(zone => zone.id === activeZoneId) + 1).padStart(2, '0')} / 09</span></div>

          </div>

          <div className="apr-zones-details">
            <div className="apr-zones-intro">
              <span className="apr-zones-eyebrow">ZONE {String(zonesData.findIndex(zone => zone.id === activeZoneId) + 1).padStart(2, '0')} · DISCOVER YOUR PARADISE</span><h1>{activeZone.name}</h1>
              <p className="text-xs text-teal-700 font-semibold mb-3">Часы работы зоны: {activeZone.hours}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{activeZone.desc}</p>
            </div>
            <div className="apr-zones-detail-card">
              <div role="tablist" aria-label={`Сведения о зоне ${activeZone.name}`} className="apr-zones-tabs">
                {TABS.map((tab, index) => (
                  <button
                    id={`zone-tab-${tab.id}`} key={tab.id} type="button" role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls="zone-tab-panel"
                    tabIndex={activeTab === tab.id ? 0 : -1}
                    onClick={() => setSelection(activeZone.id, tab.id)}
                    onKeyDown={(event) => {
                      const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
                      if (delta !== 0 || event.key === 'Home' || event.key === 'End') {
                        event.preventDefault();
                        const next = event.key === 'Home' ? 0 : event.key === 'End' ? TABS.length - 1 : (index + delta + TABS.length) % TABS.length;
                        setSelection(activeZone.id, TABS[next].id);
                        document.getElementById(`zone-tab-${TABS[next].id}`)?.focus();
                      }
                    }}
                      className={`apr-zones-tab ${activeTab === tab.id ? 'is-active' : ''}`}
                  >{tab.label}</button>
                ))}
              </div>

              <div id="zone-tab-panel" role="tabpanel" aria-labelledby={`zone-tab-${activeTab}`} tabIndex={0} className="p-6 flex-grow focus-visible:outline-2 focus-visible:outline-teal-600">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Особенности</h2>
                      <ul className="space-y-2">
                        {activeZone.features.map(feature => <li key={feature} className="bg-teal-50 text-teal-800 px-4 py-3 rounded-xl text-sm border border-teal-100">{feature}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Кому понравится</h2>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{activeZone.likes}</p>
                    </div>
                    <p className="text-xs text-gray-500">Иллюстрации зоны будут добавлены после утверждения визуальных материалов.</p>
                  </div>
                )}
                {activeTab === 'attractions' && (
                  <div className="space-y-5">
                    {zoneAttractions.length > 0 && (
                      <div>
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Аттракционы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {zoneAttractions.map(attraction => (
                            <div key={attraction.id} className="p-3 border border-gray-100 rounded-xl bg-gray-50/40">
                              <p className="font-medium text-gray-900">{attraction.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{attraction.intensity} · от {attraction.minAge} лет{attraction.minHeight !== null ? ` · рост от ${attraction.minHeight} см` : ''}</p>
                              <button type="button" onClick={() => { window.location.hash = `#/attractions?ride=${attraction.id}`; }} className="text-teal-700 hover:underline mt-2 text-sm focus-visible:outline-2 focus-visible:outline-teal-600">Подробнее</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Что ещё посетить</h2>
                      <ul className="space-y-2 list-disc pl-5 text-sm text-gray-700">
                        {activeZone.activities.map(activity => <li key={activity}>{activity}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === 'infrastructure' && (
                  <div className="space-y-6">
                    {infrastructureGroups.length === 0 ? (
                      <p className="text-gray-600 text-sm">Отдельный перечень инфраструктуры этой зоны в утверждённой документации пока не установлен. Информация об основных объектах доступна во вкладке «Развлечения».</p>
                    ) : infrastructureGroups.map(group => (
                      <section key={group.key}>
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">{group.label}</h2>
                        <ul className="space-y-2">{group.items?.map(item => <li key={item} className="flex gap-2 text-gray-700 text-sm"><span aria-hidden="true" className="text-teal-500">•</span>{item}</li>)}</ul>
                      </section>
                    ))}
                  </div>
                )}
                {activeTab === 'rules' && (
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {activeZone.rules.map(rule => <li key={rule} className="flex items-start gap-3 p-3 bg-amber-50 text-amber-950 rounded-xl text-sm border border-amber-100"><span aria-hidden="true">ℹ️</span>{rule}</li>)}
                    </ul>
                    <p className="text-xs text-gray-500">Подробные правила отдельных аттракционов приведены в их карточках и каталоге. Время работы и условия — демонстрационные данные вымышленного курорта.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
