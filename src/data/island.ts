export type RestType = "family" | "adventure" | "relax";
export type Zone = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  hours: string;
  types: RestType[];
  detail: string;
};
export const zones: Zone[] = [
  {
    id: "paradise-boulevard",
    name: "Paradise Boulevard",
    subtitle: "Начало путешествия",
    description:
      "Пальмовые аллеи, водные композиции и первое знакомство с островом.",
    hours: "09:00–22:00",
    types: ["family", "relax"],
    detail:
      "Главный вход, Guest Services и пересадочный узел Paradise Loop помогают спокойно начать день.",
  },
  {
    id: "paradise-market",
    name: "Paradise Market",
    subtitle: "Вкус островной жизни",
    description:
      "Тропический квартал ресторанов, магазинов и вечерних прогулок.",
    hours: "09:00–22:00",
    types: ["family", "relax"],
    detail:
      "Зона расположена внутри курорта и доступна только с действующим билетом или соответствующим пропуском. Питание и покупки оплачиваются отдельно.",
  },
  {
    id: "eden-gardens",
    name: "Eden Gardens",
    subtitle: "Вдохнуть тропики",
    description: "Тенистые ботанические маршруты, орхидеи и тихие водопады.",
    hours: "09:00–21:00",
    types: ["relax"],
    detail:
      "Место для неспешных прогулок и отдыха среди растений. Здесь нет шумных экстремальных горок.",
  },
  {
    id: "little-paradise",
    name: "Little Paradise",
    subtitle: "Большое счастье маленьких",
    description: "Три водных игровых пространства для детей от 0 до 12 лет.",
    hours: "09:00–19:00",
    types: ["family"],
    detail:
      "Tiny Tides — 0–3 года, Rainbow Reef — 4–7 лет, Splash Explorers — 8–12 лет. Игровые площадки работают с 10:00; допуск зависит от возраста, роста и сопровождения.",
  },
  {
    id: "serenity-spa",
    name: "Serenity Spa",
    subtitle: "Искусство замедляться",
    description: "Спокойные бассейны и wellness-пространства для перезагрузки.",
    hours: "09:00–21:00",
    types: ["relax"],
    detail:
      "Общие зоны входят в соответствующий билет. Премиальные процедуры и услуги оплачиваются дополнительно; действуют правила отдельных объектов.",
  },
  {
    id: "pirates-cove",
    name: "Pirate’s Cove",
    subtitle: "На поиски приключений",
    description: "Пиратский корабль, водные сражения и тайные маршруты.",
    hours: "09:00–20:00",
    types: ["family", "adventure"],
    detail:
      "Stormbreaker, Blackbeard’s Run, Smuggler’s Passage и Cannonball Clash. У каждого аттракциона собственные ограничения и часы работы.",
  },
  {
    id: "atlantis-realm",
    name: "Atlantis Realm",
    subtitle: "Легенда оживает",
    description:
      "Затерянный город, храм Посейдона и водный тоннель-океанариум.",
    hours: "09:00–21:00",
    types: ["family", "adventure"],
    detail:
      "Crystal Passage проходит в двухместных капсулах через акриловый тоннель среди тропических рыб. Общедоступной смотровой галереи нет.",
  },
  {
    id: "adrenaline-peak",
    name: "Adrenaline Peak",
    subtitle: "Выше. Быстрее. Ярче.",
    description: "Скоростные спуски, гигантские воронки и панорама острова.",
    hours: "09:00–20:00",
    types: ["adventure"],
    detail:
      "Skyfall, Velocity Racers, Cyclone Vortex и Thunder Rush работают с 10:00 до 19:00. Смотровая площадка Eagle’s Lookout — с 09:00 до 20:00.",
  },
  {
    id: "ocean-bay",
    name: "Ocean Bay",
    subtitle: "Навстречу горизонту",
    description: "Морской пляж, активный отдых на воде и закаты у океана.",
    hours: "09:00–22:00",
    types: ["family", "adventure", "relax"],
    detail:
      "Paradise Beach открыт до 22:00. Морские активности имеют отдельное расписание и зависят от погоды и состояния моря.",
  },
];
export const attractions = [
  {
    name: "Skyfall",
    zone: "Adrenaline Peak",
    intensity: "Экстремальный",
    age: "От 16 лет",
    height: "От 150 см",
    hours: "10:00–19:00",
    description:
      "Стартовая капсула, обратный отсчёт — и почти вертикальный спуск с высокой башни.",
    note: "Экстремальная интенсивность. Сопровождение на аттракционе не требуется.",
  },
  {
    name: "Crystal Passage",
    zone: "Atlantis Realm",
    intensity: "Спокойный",
    age: "От 4 лет",
    height: "От 100 см",
    hours: "10:00–19:00",
    description:
      "Путешествие в двухместной капсуле через прозрачный тоннель среди тропических рыб.",
    note: "Для детей младше 10 лет обязательно сопровождение взрослого.",
  },
  {
    name: "Stormbreaker",
    zone: "Pirate’s Cove",
    intensity: "Семейный",
    age: "От 6 лет",
    height: "От 110 см",
    hours: "10:00–20:00",
    description:
      "Многоуровневый пиратский корабль с мостиками, водяными пушками и опрокидывающейся бочкой.",
    note: "До 10 лет — со взрослым. С 19:00 доступны только вечерние игровые участки; основные горки закрыты.",
  },
  {
    name: "Velocity Racers",
    zone: "Adrenaline Peak",
    intensity: "Высокая скорость",
    age: "От 12 лет",
    height: "От 140 см",
    hours: "10:00–19:00",
    description:
      "Шесть параллельных водных дорожек. Выберите свою и устройте дружескую гонку.",
    note: "Высокая интенсивность. Сопровождение на аттракционе не требуется.",
  },
];
