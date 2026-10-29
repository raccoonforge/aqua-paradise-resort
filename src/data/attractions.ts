/**
 * Единый справочник аттракционов.
 * Основан на данных из src/AttractionsPage.tsx (не выдумано).
 * Slug = id. Никогда не генерируем slug из name — только берём id.
 *
 * В Package 2 этот справочник будет расширен полями для PlannerPage.
 * Сейчас — только id, name, zone — чтобы не дублировать данные.
 */

export type AttractionRef = {
  id: string;       // стабильный slug, используется в URL ?ride=<id>
  name: string;     // отображаемое название
  zone: string;     // тематическая зона
};

export const ATTRACTIONS: readonly AttractionRef[] = [
  // Adrenaline Peak
  { id: 'skyfall', name: 'Skyfall', zone: 'Adrenaline Peak' },
  { id: 'velocity-racers', name: 'Velocity Racers', zone: 'Adrenaline Peak' },
  { id: 'cyclone-vortex', name: 'Cyclone Vortex', zone: 'Adrenaline Peak' },
  { id: 'thunder-rush', name: 'Thunder Rush', zone: 'Adrenaline Peak' },
  { id: 'eagles-lookout', name: "Eagle's Lookout", zone: 'Adrenaline Peak' },

  // Atlantis Realm
  { id: 'poseidons-descent', name: "Poseidon's Descent", zone: 'Atlantis Realm' },
  { id: 'tidal-kingdom', name: 'Tidal Kingdom', zone: 'Atlantis Realm' },
  { id: 'crystal-passage', name: 'Crystal Passage', zone: 'Atlantis Realm' },
  { id: 'moonlit-ruins', name: 'Moonlit Ruins', zone: 'Atlantis Realm' },

  // Pirate's Cove
  { id: 'stormbreaker', name: 'Stormbreaker', zone: "Pirate's Cove" },
  { id: 'blackbeards-run', name: "Blackbeard's Run", zone: "Pirate's Cove" },
  { id: 'smugglers-passage', name: "Smuggler's Passage", zone: "Pirate's Cove" },
  { id: 'cannonball-clash', name: 'Cannonball Clash', zone: "Pirate's Cove" },

  // Ocean Bay
  { id: 'ocean-rush', name: 'Ocean Rush', zone: 'Ocean Bay' },
  { id: 'blue-horizon', name: 'Blue Horizon', zone: 'Ocean Bay' },
  { id: 'tidal-drop', name: 'Tidal Drop', zone: 'Ocean Bay' },
  { id: 'aqua-challenge', name: 'Aqua Challenge', zone: 'Ocean Bay' },
  { id: 'coral-discovery', name: 'Coral Discovery', zone: 'Ocean Bay' },
  { id: 'ocean-explorer', name: 'Ocean Explorer', zone: 'Ocean Bay' },

  // Little Paradise
  { id: 'tiny-tides', name: 'Tiny Tides', zone: 'Little Paradise' },
  { id: 'rainbow-reef', name: 'Rainbow Reef', zone: 'Little Paradise' },
  { id: 'splash-explorers', name: 'Splash Explorers', zone: 'Little Paradise' },
];

/**
 * Связь зоны → id аттракционов.
 * Для зон без «горок» (Boulevard, Market, Eden Gardens, Serenity Spa)
 * массив ПУСТОЙ — там нет аттракционов из ATTRACTIONS, только инфраструктура.
 * Это НЕ баг: в требованиях у этих зон нет ride-аттракционов.
 */
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

/**
 * Slug-словарь для зон (соответствует ZonesPage.id).
 * Используется в NineWorlds, чтобы получить ?zone=<slug> без генерации.
 */
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

/** Утилита: получить id аттракциона по имени (для обратной совместимости). */
export function findAttractionIdByName(name: string): string | undefined {
  return ATTRACTIONS.find(a => a.name === name)?.id;
}
