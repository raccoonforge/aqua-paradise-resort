/**
 * Единый справочник аттракционов.
 * Данные взяты из src/AttractionsPage.tsx (не выдуманы).
 *
 * Используется:
 * - AttractionsPage.tsx (полный каталог, фильтры, модалка)
 * - App.tsx → AttractionsCarousel (4 карточки на главной)
 * - ZonesPage.tsx (вкладка «Развлечения»)
 *
 * НЕ используется:
 * - PlannerPage.tsx (там своя логика duration/minAge/requiresAdult —
 *   это будет унифицировано в Package 8).
 */

export type Intensity = 'Экстрим' | 'Высокая' | 'Средняя' | 'Спокойная' | 'Семейная';

export type Attraction = {
  id: string;
  name: string;
  zone: string;
  intensity: Intensity;
  minAge: number;
  minHeight: number | null;
  desc: string;
  safety: string;
};

export const ATTRACTIONS: readonly Attraction[] = [
  // Adrenaline Peak
  { id: 'skyfall', name: 'Skyfall', zone: 'Adrenaline Peak', intensity: 'Экстрим', minAge: 16, minHeight: 150, desc: 'Свободное падение с высоты в прозрачной капсуле.', safety: 'Строго соблюдать ограничения по росту и весу.' },
  { id: 'velocity-racers', name: 'Velocity Racers', zone: 'Adrenaline Peak', intensity: 'Высокая', minAge: 12, minHeight: 140, desc: 'Шесть параллельных дорожек для водных гонок.', safety: 'Соблюдать дистанцию. Дети до 12 лет со взрослыми.' },
  { id: 'cyclone-vortex', name: 'Cyclone Vortex', zone: 'Adrenaline Peak', intensity: 'Высокая', minAge: 14, minHeight: 140, desc: 'Групповой сплав на плоту с крутыми виражами.', safety: 'Максимум 4 человека на плот.' },
  { id: 'thunder-rush', name: 'Thunder Rush', zone: 'Adrenaline Peak', intensity: 'Экстрим', minAge: 14, minHeight: 145, desc: 'Спуски и подъемы на двухместных плотах.', safety: 'Не гарантируется парное катание.' },
  { id: 'eagles-lookout', name: "Eagle's Lookout", zone: 'Adrenaline Peak', intensity: 'Спокойная', minAge: 0, minHeight: null, desc: 'Смотровая площадка с панорамным видом на остров.', safety: 'Детям до 12 лет рекомендуется со взрослыми.' },

  // Atlantis Realm
  { id: 'poseidons-descent', name: "Poseidon's Descent", zone: 'Atlantis Realm', intensity: 'Высокая', minAge: 14, minHeight: 140, desc: 'Стремительный запуск из храма Посейдона сквозь туннели.', safety: 'Дети до 10 лет только со взрослыми.' },
  { id: 'tidal-kingdom', name: 'Tidal Kingdom', zone: 'Atlantis Realm', intensity: 'Средняя', minAge: 6, minHeight: 110, desc: 'Огромный волновой бассейн. Волны останавливаются в 19:00.', safety: 'Дети до 10 лет только со взрослыми.' },
  { id: 'crystal-passage', name: 'Crystal Passage', zone: 'Atlantis Realm', intensity: 'Спокойная', minAge: 4, minHeight: 100, desc: 'Двухместные капсулы плывут через туннель с аквариумом.', safety: 'Дети до 10 лет только со взрослыми.' },
  { id: 'moonlit-ruins', name: 'Moonlit Ruins', zone: 'Atlantis Realm', intensity: 'Спокойная', minAge: 8, minHeight: 120, desc: 'Тихий бассейн среди колонн с вечерней подсветкой.', safety: 'Дети до 10 лет только со взрослыми.' },

  // Pirate's Cove
  { id: 'stormbreaker', name: 'Stormbreaker', zone: "Pirate's Cove", intensity: 'Семейная', minAge: 6, minHeight: 110, desc: 'Многопалубный пиратский корабль с водными горками.', safety: 'Дети до 10 лет только со взрослыми.' },
  { id: 'blackbeards-run', name: "Blackbeard's Run", zone: "Pirate's Cove", intensity: 'Высокая', minAge: 12, minHeight: 140, desc: 'Скоростная горка с закрытыми участками и поворотами.', safety: 'Соблюдать правила безопасного спуска.' },
  { id: 'smugglers-passage', name: "Smuggler's Passage", zone: "Pirate's Cove", intensity: 'Спокойная', minAge: 5, minHeight: 100, desc: 'Сплав на кругах через пещеры контрабандистов.', safety: 'Дети до 10 лет только со взрослыми.' },
  { id: 'cannonball-clash', name: 'Cannonball Clash', zone: "Pirate's Cove", intensity: 'Семейная', minAge: 7, minHeight: 120, desc: 'Интерактивная водная битва с пушками.', safety: 'Дети до 10 лет только со взрослыми.' },

  // Ocean Bay
  { id: 'ocean-rush', name: 'Ocean Rush', zone: 'Ocean Bay', intensity: 'Высокая', minAge: 10, minHeight: 120, desc: 'Панорамная извилистая горка у побережья.', safety: 'Спуск в специально оборудованные безопасные зоны.' },
  { id: 'blue-horizon', name: 'Blue Horizon', zone: 'Ocean Bay', intensity: 'Высокая', minAge: 12, minHeight: 140, desc: 'Две параллельные гоночные горки.', safety: 'Спуск в специально оборудованные безопасные зоны.' },
  { id: 'tidal-drop', name: 'Tidal Drop', zone: 'Ocean Bay', intensity: 'Экстрим', minAge: 16, minHeight: 150, desc: 'Экстремальное падение с высокой башни.', safety: 'Спуск в специально оборудованные безопасные зоны.' },
  { id: 'aqua-challenge', name: 'Aqua Challenge', zone: 'Ocean Bay', intensity: 'Средняя', minAge: 8, minHeight: 120, desc: 'Плавательная полоса препятствий на воде.', safety: 'Обязателен спасательный жилет. Дети до 12 лет со взрослыми.' },
  { id: 'coral-discovery', name: 'Coral Discovery', zone: 'Ocean Bay', intensity: 'Спокойная', minAge: 10, minHeight: null, desc: 'Снорклинг в спокойной зоне под присмотром инструктора.', safety: 'Базовые навыки плавания. Дети до 16 лет со взрослыми.' },
  { id: 'ocean-explorer', name: 'Ocean Explorer', zone: 'Ocean Bay', intensity: 'Средняя', minAge: 12, minHeight: null, desc: 'Маршрут на SUP или каяках по бухте.', safety: 'Спасательный жилет обязателен. Дети до 16 лет со взрослыми.' },

  // Little Paradise
  { id: 'tiny-tides', name: 'Tiny Tides', zone: 'Little Paradise', intensity: 'Спокойная', minAge: 0, minHeight: null, desc: 'Мелкий бассейн с фонтанчиками для малышей (0-3 года).', safety: 'Взрослые обязаны сопровождать.' },
  { id: 'rainbow-reef', name: 'Rainbow Reef', zone: 'Little Paradise', intensity: 'Спокойная', minAge: 4, minHeight: 90, desc: 'Красочные маленькие горки и мелкие бассейны (4-7 лет).', safety: 'Дети до 6 лет со взрослыми.' },
  { id: 'splash-explorers', name: 'Splash Explorers', zone: 'Little Paradise', intensity: 'Средняя', minAge: 8, minHeight: 110, desc: 'Динамичные горки для детей постарше (8-12 лет).', safety: 'Дети до 10 лет со взрослыми.' },
];

export const ATTRACTION_IDS_BY_ZONE: Readonly<Record<string, readonly string[]>> = {
  'Adrenaline Peak': ['skyfall', 'velocity-racers', 'cyclone-vortex', 'thunder-rush', 'eagles-lookout'],
  'Atlantis Realm': ['poseidons-descent', 'tidal-kingdom', 'crystal-passage', 'moonlit-ruins'],
  "Pirate's Cove": ['stormbreaker', 'blackbeards-run', 'smugglers-passage', 'cannonball-clash'],
  'Ocean Bay': ['ocean-rush', 'blue-horizon', 'tidal-drop', 'aqua-challenge', 'coral-discovery', 'ocean-explorer'],
  'Little Paradise': ['tiny-tides', 'rainbow-reef', 'splash-explorers'],
  'Eden Gardens': [],
  'Paradise Boulevard': [],
  'Paradise Market': [],
  'Serenity Spa': [],
};

export const ZONE_SLUGS: Readonly<Record<string, string>> = {
  'Paradise Boulevard': 'paradise-boulevard',
  'Paradise Market': 'paradise-market',
  'Eden Gardens': 'eden-gardens',
  'Little Paradise': 'little-paradise',
  'Serenity Spa': 'serenity-spa',
  "Pirate's Cove": 'pirates-cove',
  'Atlantis Realm': 'atlantis-realm',
  'Adrenaline Peak': 'adrenaline-peak',
  'Ocean Bay': 'ocean-bay',
};

export function findAttractionById(id: string): Attraction | undefined {
  return ATTRACTIONS.find(a => a.id === id);
}
