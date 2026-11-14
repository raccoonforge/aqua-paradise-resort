import './zones-obsidian.css';
import { useEffect, useRef, useState } from 'react';
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

  const zoneTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = zoneTrack.current;
    const selected = track?.querySelector('[aria-current="page"]');
    if (!track || !selected || track.scrollWidth <= track.clientWidth) return;

    const trackBounds = track.getBoundingClientRect();
    const buttonBounds = selected.getBoundingClientRect();
    if (buttonBounds.left < trackBounds.left || buttonBounds.right > trackBounds.right) {
      track.scrollLeft += buttonBounds.left - trackBounds.left
        - (track.clientWidth - buttonBounds.width) / 2;
    }
  }, [activeZoneId]);

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
    <div className="apr-zones-page">
      <div className="apr-zones-switcher">
        <nav aria-label="Тематические зоны" className="apr-zones-switcher__inner">
          <div className="apr-zones-switcher__track" ref={zoneTrack}>
            {zonesData.map(zone => (
              <button
                type="button" key={zone.id}
                onClick={() => setSelection(zone.id, 'overview')}
                aria-label={`Открыть зону ${zone.name}`}
                aria-current={activeZoneId === zone.id ? 'page' : undefined}
                className={`apr-zones-switcher__item ${activeZoneId === zone.id ? 'is-active' : ''}`}
              >
                <span className="apr-zones-switcher__icon" aria-hidden="true"><svg viewBox={({
  'paradise-boulevard': '3 2 73 73',
  'paradise-market': '2 4 73 73',
  'eden-gardens': '2 6 73 73',
  'little-paradise': '3 4 73 73',
  'serenity-spa': '2 4 73 73',
  'pirates-cove': '3 5 73 73',
  'atlantis-realm': '5 4 73 73',
  'adrenaline-peak': '-1 1 73 73',
  'ocean-bay': '7 6 73 73',
} as Record<string,string>)[zone.id] ?? '0 0 73 73'} fill="white" stroke="none"><g fillRule="evenodd">{zone.id === 'paradise-boulevard' ? <path d="M23,16 29,18 34,23 33,24 30,23 24,23 21,24 15,30 15,35 16,33 20,30 22,30 25,28 32,27 33,29 30,31 28,31 24,36 24,43 25,43 27,39 35,31 37,30 38,31 36,37 36,42 35,43 35,59 34,60 29,60 28,61 22,62 17,65 13,66 13,67 14,66 62,66 60,66 50,61 40,61 38,56 37,44 38,43 39,31 40,30 46,36 50,44 52,38 51,35 48,32 44,30 45,28 48,28 53,30 55,32 58,33 61,37 60,30 56,26 54,25 50,25 49,24 44,26 43,25 45,22 48,21 52,18 55,18 56,19 56,18 52,16 48,16 43,18 39,23 37,19 32,15 25,15Z M35,12 33,10 32,11 30,10 27,12 26,11 26,12 24,13 27,12 33,13Z"/> : zone.id === 'paradise-market' ? <path d="M34,15 29,21 28,28 27,29 20,29 19,30 18,46 17,47 17,54 16,55 16,62 15,64 19,67 59,67 62,65 62,56 61,55 61,50 60,49 59,30 58,29 51,29 50,28 49,21 44,15 41,14Z M25,33 27,32 28,35 29,35 29,33 31,32 32,33 32,36 30,38 27,38 25,36Z M46,32 47,31 49,33 49,35 50,35 50,33 52,32 53,33 53,36 51,38 48,38 46,36Z M29,27 30,26 30,22 31,20 36,16 42,16 44,17 48,23 48,28 47,29 31,29Z"/> : zone.id === 'eden-gardens' ? <path d="M67,29 63,32 56,33 48,37 42,43 40,47 39,59 38,60 38,67 39,67 39,60 42,54 51,44 59,38 60,40 48,52 43,59 42,62 53,61 60,56 66,45Z M10,29 11,30 11,41 12,42 12,46 16,54 20,58 28,62 35,62 28,50 19,41 19,40 21,39 32,50 36,57 37,47 34,41 30,37 22,33Z M49,17 48,17 39,27 38,29 38,37 39,35 39,28 42,27 43,24 46,21 47,23 49,24 49,22 51,19Z"/> : zone.id === 'little-paradise' ? <path d="M29,31 22,32 19,36 20,37 24,36 24,35 28,33Z M69,25 63,25 61,23 59,18 55,15 48,14 43,16 39,21 38,27 40,32 47,38 47,40 46,41 43,41 39,39 32,38 21,43 18,42 14,36 12,37 10,40 12,42 12,53 14,58 20,64 29,67 53,67 59,65 65,60 68,53 68,48 66,43 61,38 57,36 56,34 58,33 61,29 62,30 67,30 66,28 69,26Z M61,26 62,25 64,28 63,29Z M53,21 56,23 54,26 51,24Z"/> : zone.id === 'serenity-spa' ? <path d="M43,57 45,60 50,62 57,62 64,59 62,57 57,57 56,58Z M17,60 20,60 24,62 32,62 37,60 39,57 34,57 33,58 21,57 18,58Z M69,37 65,37 64,38 64,42 61,47 55,53 52,54 59,54 65,51 69,47Z M9,37 12,46 17,51 23,54 32,55 32,54 28,53 22,48 19,43 18,37Z M62,24 59,24 51,29 53,34 53,45 49,52 52,51 60,42 62,36Z M21,24 20,34 21,35 22,42 29,50 33,52 29,46 29,41 28,40 31,28Z M41,18 36,25 32,36 33,47 38,53 44,53 47,50 50,43 50,36 48,30Z"/> : zone.id === 'pirates-cove' ? <path d="M32,57 29,57 23,60 16,59 16,62 19,65 19,67 22,68 23,67 23,64 25,62 29,61 33,59Z M50,59 56,62 58,62 59,63 59,66 61,68 64,66 64,64 67,61 66,59 64,58 61,60 60,59 57,59 51,56Z M66,40 63,40 62,43 60,45 53,48 52,51 53,52 62,47 64,48 68,48 69,46 66,44Z M13,46 15,48 20,47 30,52 30,49 24,46 19,40 17,40 16,41 17,43Z M37,15 32,17 27,22 26,24 26,33 27,34 27,39 30,43 33,43 34,44 33,46 33,54 34,56 40,59 42,59 46,57 50,52 50,47 48,44 49,43 52,43 55,40 55,35 57,31 57,26 55,21 52,18 46,15Z M33,47 35,46 36,47 39,47 42,49 44,47 48,46 49,49 48,51 45,53 38,53 36,51 37,49 36,51Z M41,37 44,39 44,42 43,43 40,43 38,41Z M45,29 50,29 53,31 54,34 51,38 48,38 47,39 43,36 43,31Z M32,29 37,29 40,32 40,35 35,39 32,38 29,35 29,32Z"/> : zone.id === 'atlantis-realm' ? <path d="M13,64 13,66 69,66 69,64Z M17,59 17,61 66,61 65,59Z M58,35 58,56 57,57 63,57 62,56 62,35Z M46,35 46,57 47,56 51,57 50,55 50,36 51,35Z M33,35 33,55 32,57 34,56 37,57 37,35Z M20,35 21,37 20,40 20,57 21,56 22,57 23,56 26,57 25,55 25,35Z M18,30 18,33 26,33 27,32 30,33 33,32 36,33 65,33 65,30Z M68,27 41,14 23,23 21,25 14,27 14,28 51,28 52,27 67,27 68,28Z"/> : zone.id === 'adrenaline-peak' ? <path d="M69,36 64,30 61,34 59,39 43,15 32,31 31,34 27,38 21,31 3,53 15,43 16,43 17,45 18,45 19,43 21,43 23,45 14,59 35,33 37,33 38,30 40,29 41,30 41,36 48,46 49,46 48,45 48,42 50,38 52,37 56,41 61,49 68,56 69,56 62,44 65,42 67,42 69,44Z M59,39 60,38 62,41 61,42Z"/> : <path d="M21,29 17,38 17,49 19,55 23,60 32,65 35,65 36,66 40,66 41,65 32,61 29,58 30,56 39,60 51,60 56,62 55,63 44,63 47,64 57,64 58,63 61,63 66,60 64,61 52,61 51,60 48,60 45,58 41,57 34,50 36,49 45,55 53,56 54,57 63,57 69,55 69,53 63,55 52,54 45,50 41,46 39,42 39,37 41,33 44,30 48,28 53,28 58,32 57,35 54,33 52,33 50,35 50,38 51,39 56,39 61,36 60,28 56,23 48,19 36,19 29,22Z"/>}</g></svg></span><span className="apr-zones-switcher__copy"><span className="apr-zones-switcher__number" aria-hidden="true">{String(zonesData.indexOf(zone) + 1).padStart(2, '0')}</span>
                <span className="apr-zones-switcher__name">{zone.name}</span></span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="apr-zones-main">
        <div className="apr-zones-layout">
          <div className="apr-zones-visual">
            <div className="apr-zones-panorama" role="img" aria-label={`Место для будущей панорамной фотографии ${activeZone.name}`}><span className="apr-zones-panorama__eyebrow">AQUA PARADISE · THE NINE WORLDS</span><span className="apr-zones-panorama__placeholder"><span className="apr-zones-panorama__label">ПАНОРАМНАЯ ФОТОГРАФИЯ · СКОРО</span><strong>{activeZone.name}</strong><span className="apr-zones-panorama__caption">Место для фотографии тематической зоны</span></span><span className="apr-zones-panorama__index">{String(zonesData.findIndex(zone => zone.id === activeZoneId) + 1).padStart(2, '0')} / 09</span></div>

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

              <div id="zone-tab-panel" role="tabpanel" aria-labelledby={`zone-tab-${activeTab}`} tabIndex={0} className="apr-zone-panel flex-grow focus-visible:outline-2 focus-visible:outline-teal-600">
                {activeTab === 'overview' && (
                  <div className="apr-zone-panel-content space-y-6">
                    <div>
                      <h2 className="apr-zone-section-heading mb-4">Особенности</h2>
                      <ul className="space-y-2">
                        {activeZone.features.map(feature => <li key={feature} className="apr-zone-feature">{feature}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h2 className="apr-zone-section-heading mb-3">Кому понравится</h2>
                      <p className="apr-zone-audience">{activeZone.likes}</p>
                    </div>
                    <p className="text-xs text-gray-500">Иллюстрации зоны будут добавлены после утверждения визуальных материалов.</p>
                  </div>
                )}
                {activeTab === 'attractions' && (
                  <div className="apr-zone-panel-content space-y-5">
                    {zoneAttractions.length > 0 && (
                      <div>
                        <h2 className="apr-zone-section-heading mb-3">Аттракционы</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {zoneAttractions.map(attraction => (
                            <div key={attraction.id} className="apr-zone-attraction">
                              <p className="font-medium text-gray-900">{attraction.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{attraction.intensity} · от {attraction.minAge} лет{attraction.minHeight !== null ? ` · рост от ${attraction.minHeight} см` : ''}</p>
                              <button type="button" onClick={() => { window.location.hash = `#/attractions?ride=${attraction.id}`; }} className="text-teal-700 hover:underline mt-2 text-sm focus-visible:outline-2 focus-visible:outline-teal-600">Подробнее</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <h2 className="apr-zone-section-heading mb-3">Что ещё посетить</h2>
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
                        <h2 className="apr-zone-section-heading mb-3">{group.label}</h2>
                        <ul className="space-y-2">{group.items?.map(item => <li key={item} className="flex gap-2 text-gray-700 text-sm"><span aria-hidden="true" className="text-teal-500">•</span>{item}</li>)}</ul>
                      </section>
                    ))}
                  </div>
                )}
                {activeTab === 'rules' && (
                  <div className="apr-zone-panel-content space-y-4">
                    <ul className="space-y-3">
                      {activeZone.rules.map(rule => <li key={rule} className="apr-zone-rule"><span aria-hidden="true" className="apr-zone-rule-mark">i</span>{rule}</li>)}
                    </ul>
                    <p className="text-xs text-gray-500">Подробные правила отдельных аттракционов приведены в их карточках и каталоге. Время работы и условия — демонстрационные данные вымышленного курорта.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
