// Editorial summaries; ride rules: docs/master/website-requirements.md §§7.7.4–7.7.6.
export const scene = (name: string) => `/media/${name}.webp`;
export const zones = [
  {
    slug: "paradise-boulevard",
    name: "Paradise Boulevard",
    description:
      "Первый шаг навстречу острову. Пальмовые аллеи, музыкальные фонтаны и предвкушение большого приключения.",
    facts: ["Прогулочная аллея", "Музыкальные фонтаны", "Paradise Loop"],
    accent: "#e6c58d",
  },
  {
    slug: "paradise-market",
    name: "Paradise Market",
    description:
      "Вкусы, ароматы и маленькие открытия. Торговые улочки и гастрономические впечатления в самом сердце отдыха.",
    facts: ["Рестораны", "Магазины", "Островная атмосфера"],
    accent: "#e9b17f",
  },
  {
    slug: "eden-gardens",
    name: "Eden Gardens",
    description:
      "Замедлиться. Прислушаться к воде. Открыть тропические сады, где за каждым поворотом начинается новая история.",
    facts: ["Ботанические сады", "Прогулочные дорожки", "Вечерняя подсветка"],
    accent: "#bacb9e",
  },
  {
    slug: "little-paradise",
    name: "Little Paradise",
    description:
      "Большие открытия для маленьких путешественников. Мир детских водных развлечений и семейных улыбок.",
    facts: ["Детская зона", "Водные развлечения", "Семейный отдых"],
    accent: "#f1ca83",
  },
  {
    slug: "serenity-spa",
    name: "Serenity Spa",
    description:
      "Тёплая вода, тихие водопады и время только для себя. Островное искусство ничего не спешить.",
    facts: ["Термальные бассейны", "Массажные павильоны", "Сад медитации"],
    accent: "#c8d8bd",
  },
  {
    slug: "pirates-cove",
    name: "Pirate's Cove",
    description:
      "Поднять паруса! Пиратский корабль, водные сражения и приключения для всей команды.",
    facts: ["Пиратский корабль", "Водяные пушки", "Семейные приключения"],
    accent: "#e1b780",
  },
  {
    slug: "atlantis-realm",
    name: "Atlantis Realm",
    description:
      "Легенда оживает среди древних колонн. Откройте затерянный мир, скоростные спуски и тайны подводного царства.",
    facts: ["Храм Посейдона", "Волновой бассейн", "Crystal Passage"],
    accent: "#95d6dc",
  },
  {
    slug: "adrenaline-peak",
    name: "Adrenaline Peak",
    description:
      "Выше ожиданий. Быстрее дыхания. Самые интенсивные водные приключения острова — на его зелёной вершине.",
    facts: ["Экстремальные горки", "Скоростные спуски", "Смотровая площадка"],
    accent: "#efbc91",
  },
  {
    slug: "ocean-bay",
    name: "Ocean Bay",
    description:
      "Там, где начинается рай. Мягкий песок, морская лагуна и бесконечный горизонт — ваше место у океана.",
    facts: ["Морская бухта", "Пляжный отдых", "Тропическое побережье"],
    accent: "#a5ddd6",
  },
];
export const rides = [
  {
    slug: "skyfall",
    name: "Skyfall",
    zone: "Adrenaline Peak",
    image: "adrenaline-peak",
    description:
      "Обратный отсчёт. Прозрачная капсула. Почти вертикальный спуск с высокой башни.",
    intensity: "Экстремальная",
    age: 16,
    height: 150,
    note: "Экстремальная интенсивность. Работает 10:00–19:00.",
  },
  {
    slug: "poseidons-descent",
    name: "Poseidon's Descent",
    zone: "Atlantis Realm",
    image: "atlantis-realm",
    description:
      "Стремительный спуск с храма Посейдона через закрытый тоннель и извилистые участки.",
    intensity: "Высокая",
    age: 14,
    height: 140,
    note: "Работает 10:00–19:00.",
  },
  {
    slug: "stormbreaker",
    name: "Stormbreaker",
    zone: "Pirate's Cove",
    image: "pirates-cove",
    description:
      "Многоуровневый корабль с мостиками, горками, водяными пушками и большой бочкой с водой.",
    intensity: "Умеренная",
    age: 6,
    height: 110,
    note: "До 10 лет — со взрослым. 10:00–20:00; после 19:00 только вечерние игровые участки.",
  },
  {
    slug: "crystal-passage",
    name: "Crystal Passage",
    zone: "Atlantis Realm",
    image: "crystal-passage",
    description:
      "Неспешное путешествие в двухместной капсуле через прозрачный тоннель мини-океанариума.",
    intensity: "Низкая",
    age: 4,
    height: 100,
    note: "До 10 лет — со взрослым. Работает 10:00–19:00.",
  },
];
export const interests = [
  {
    id: "adrenaline",
    label: "Адреналин",
    icon: "↗",
    image: "adrenaline-peak",
    stops: ["adrenaline-peak", "atlantis-realm", "ocean-bay"],
  },
  {
    id: "family",
    label: "Семейный отдых",
    icon: "☀",
    image: "little-paradise",
    stops: ["little-paradise", "pirates-cove", "paradise-boulevard"],
  },
  {
    id: "relax",
    label: "Релакс",
    icon: "≈",
    image: "serenity-spa",
    stops: ["eden-gardens", "serenity-spa", "ocean-bay"],
  },
  {
    id: "explore",
    label: "Исследования",
    icon: "✧",
    image: "eden-gardens",
    stops: ["paradise-boulevard", "atlantis-realm", "eden-gardens"],
  },
];
export function suggestDay(selected: string[]) {
  const chosen = interests.filter((i) => selected.includes(i.id));
  return [0, 1, 2].map((part) =>
    zones.find(
      (z) =>
        z.slug ===
        (chosen.length
          ? chosen[part % chosen.length].stops[part]
          : interests[2].stops[part]),
    )!,
  );
}
