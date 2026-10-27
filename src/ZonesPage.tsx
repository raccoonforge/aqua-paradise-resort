import { useState, useEffect } from 'react';

const zonesData = [
  {
    id: 'paradise-boulevard',
    name: 'Paradise Boulevard',
    icon: '🌴',
    desc: 'Центральная артерия острова, где кипит жизнь. Главные площади, вечерние шоу и прогулки.',
    features: ['Вечерние шоу', 'Главная площадь', 'Бульвар для прогулок'],
    likes: 'Любителям шоу и активного отдыха',
    attractions: ['Уличные перфомансы', 'Светомузыкальный фонтан', 'Главная сцена'],
    infrastructure: { rest: ['Лавочки', 'Зоны отдыха'], food: ['Рестораны', 'Кафе', 'Бары'], safety: ['Пункт первой помощи'] },
    rules: ['Курение запрещено', 'С домашними животными нельзя']
  },
  {
    id: 'paradise-market',
    name: 'Paradise Market',
    icon: '🛍️',
    desc: 'Вкус острова. Колоритные местные товары, сувениры и лучшие рестораны.',
    features: ['Местные товары', 'Сувениры', 'Гастрономия'],
    likes: 'Шопоголикам и гурманам',
    attractions: ['Рынок сувениров', 'Дегустации', 'Кулинарные мастер-классы'],
    infrastructure: { food: ['Фуд-корт', 'Кофейни'], service: ['Банкоматы', 'Туалеты'] },
    rules: ['Торг уместен на рынке', 'Оплата картой и наличными']
  },
  {
    id: 'eden-gardens',
    name: 'Eden Gardens',
    icon: '🌸',
    desc: 'Тропический рай. Редкие растения, водопады и невероятная тишина.',
    features: ['Редкие растения', 'Водопады', 'Тихие тропы'],
    likes: 'Любителям природы и спокойствия',
    attractions: ['Сад бабочек', 'Оранжерея', 'Тропа водопадов'],
    infrastructure: { rest: ['Беседки', 'Тихие зоны'], service: ['Экскурсии'] },
    rules: ['Не срывать растения', 'Не кормить животных']
  },
  {
    id: 'little-paradise',
    name: 'Little Paradise',
    icon: '🧸',
    desc: 'Мир для самых маленьких. Безопасные горки и любимые герои.',
    features: ['Безопасные горки', 'Детские площадки', 'Анимация'],
    likes: 'Семьям с детьми',
    attractions: ['Tiny Tides', 'Rainbow Reef', 'Splash Explorers'],
    infrastructure: { food: ['Детское меню'], service: ['Прокат колясок'], safety: ['Везде сопровождающие'] },
    rules: ['Дети до 12 лет только со взрослыми', 'Рост не выше 120 см для горок']
  },
  {
    id: 'serenity-spa',
    name: 'Serenity Spa',
    icon: '🧘',
    desc: 'Место силы. Премиальные спа-процедуры и абсолютный релакс.',
    features: ['Спа-процедуры', 'Термальные бассейны', 'Массаж'],
    likes: 'Тем, кто ищет покой и восстановление',
    attractions: ['Lotus Thermal Pools', 'Bamboo Harmony', 'Mist Sanctuary', 'Whispering Falls', 'Zen Garden'],
    infrastructure: { rest: ['Лаунж-зоны', 'Тишина'], service: ['Полотенца', 'Халаты'] },
    rules: ['Тишина', 'Детям до 14 лет вход ограничен']
  },
  {
    id: 'pirates-cove',
    name: "Pirate's Cove",
    icon: '🏴‍☠️',
    desc: 'Остров сокровищ. Приключения для всей семьи в декорациях пиратских историй.',
    features: ['Пиратские квесты', 'Семейные горки', 'Шоу'],
    likes: 'Семьям с детьми и любителям приключений',
    attractions: ['Stormbreaker', "Blackbeard's Run", "Smuggler's Passage", 'Cannonball Clash'],
    infrastructure: { food: ['Таверна'], service: ['Прокат костюмов'] },
    rules: ['Соблюдать правила квестов', 'Не заплывать за буйки']
  },
  {
    id: 'atlantis-realm',
    name: 'Atlantis Realm',
    icon: '🔱',
    desc: 'Затерянный город. Погружение в мифы и подводные приключения.',
    features: ['Подводные руины', 'Храмы', 'Водные маршруты'],
    likes: 'Любителям мистики и водных приключений',
    attractions: ["Poseidon's Descent", 'Tidal Kingdom', 'Crystal Passage', 'Moonlit Ruins'],
    infrastructure: { rest: ['Смотровые площадки'], food: ['Подводное кафе'] },
    rules: ['Запрещено нырять в необорудованных местах', 'Соблюдать возрастные ограничения']
  },
  {
    id: 'adrenaline-peak',
    name: 'Adrenaline Peak',
    icon: '⚡',
    desc: 'Вызов для смельчаков. Самые высокие и быстрые водные горки острова.',
    features: ['Экстремальные горки', 'Высокая скорость', 'Свободное падение'],
    likes: 'Экстремалам и любителям адреналина',
    attractions: ['Skyfall', 'Velocity Racers', 'Cyclone Vortex', 'Thunder Rush', "Eagle's Lookout"],
    infrastructure: { service: ['Камеры хранения', 'Душевые'], safety: ['Медпункт'] },
    rules: ['Строго соблюдать ограничения по росту и весу', 'Беременным нельзя']
  },
  {
    id: 'ocean-bay',
    name: 'Ocean Bay',
    icon: '🌊',
    desc: 'Сердце курорта. Белоснежный песок, лазурная лагуна и безмятежность.',
    features: ['Белоснежный пляж', 'Лагуна', 'Водные виды спорта'],
    likes: 'Всем, кто хочет расслабиться у воды',
    attractions: ['Ocean Rush', 'Blue Horizon', 'Tidal Drop', 'Aqua Challenge', 'Coral Discovery', 'Ocean Explorer'],
    infrastructure: { rest: ['Лежаки', 'Зонты'], food: ['Пляжный бар'], safety: ['Спасатели'] },
    rules: ['Купаться только в разрешенных зонах', 'Не оставлять детей без присмотра']
  }
];

export default function ZonesPage({ initialZone }: { initialZone?: string }) {
  const [activeZoneId, setActiveZoneId] = useState(initialZone || 'ocean-bay');
  const [activeTab, setActiveTab] = useState<'overview' | 'attractions' | 'infrastructure' | 'rules'>('overview');

  // Синхронизация с URL (при переключении зоны)
  useEffect(() => {
    window.location.hash = `#/zones?zone=${activeZoneId}`;
  }, [activeZoneId]);

  const activeZone = zonesData.find(z => z.id === activeZoneId) || zonesData[8];

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      
      {/* Переключатель зон */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {zonesData.map(zone => (
              <button
                key={zone.id}
                onClick={() => { setActiveZoneId(zone.id); setActiveTab('overview'); }}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  activeZoneId === zone.id 
                    ? 'border-teal-500 bg-teal-50 text-teal-800 shadow-sm' 
                    : 'border-gray-200 hover:border-teal-300 text-gray-600 bg-white'
                }`}
              >
                <span className="text-xl">{zone.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{zone.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Основной контент зоны */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Левая часть - Панорама (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <div className="w-full aspect-video bg-gradient-to-br from-teal-300 to-cyan-600 rounded-2xl shadow-lg flex items-center justify-center text-white text-xl font-serif">
              [Панорама: {activeZone.name}]
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h1 className="text-4xl font-serif text-gray-900 mb-3">{activeZone.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{activeZone.desc}</p>
            </div>
          </div>

          {/* Правая часть - Вкладки (45%) */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
              
              {/* Кнопки вкладок */}
              <div className="flex border-b border-gray-100 bg-gray-50/50">
                {[
                  { id: 'overview', label: 'Обзор' },
                  { id: 'attractions', label: 'Развлечения' },
                  { id: 'infrastructure', label: 'Инфраструктура' },
                  { id: 'rules', label: 'Правила' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id ? 'text-teal-600 border-b-2 border-teal-600 bg-white' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Контент вкладок */}
              <div className="p-6 flex-grow">
                
                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Особенности</h3>
                      <div className="flex flex-wrap gap-3">
                        {activeZone.features.map(f => (
                          <span key={f} className="bg-teal-50 text-teal-800 px-4 py-2 rounded-full text-sm font-medium border border-teal-100">{f}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Кому понравится</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">{activeZone.likes}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Детали</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-gray-400 text-xs">[Фото 1]</div>
                        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center text-gray-400 text-xs">[Фото 2]</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'attractions' && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-sm text-gray-500 mb-4">Развлечения в этой зоне:</p>
                    {activeZone.attractions.map(attr => (
                      <div key={attr} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                        <span className="font-medium text-gray-800">{attr}</span>
                        <button onClick={() => window.location.hash = `#/attractions?ride=${attr.toLowerCase().replace(/\s+/g, '-')}`} className="text-teal-600 text-sm hover:underline">Подробнее</button>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'infrastructure' && (
                  <div className="space-y-6 animate-fade-in">
                    {Object.entries(activeZone.infrastructure).map(([key, items]) => (
                      <div key={key}>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 capitalize">{key === 'rest' ? 'Отдых' : key === 'food' ? 'Питание' : key === 'service' ? 'Сервис' : 'Безопасность'}</h3>
                        <ul className="space-y-2">
                         {(items as string[]).map((item: string) => (
                            <li key={item} className="flex items-center gap-2 text-gray-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'rules' && (
                  <div className="space-y-4 animate-fade-in">
                    <ul className="space-y-3">
                      {activeZone.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-red-50 text-red-900 rounded-xl text-sm border border-red-100">
                          <span className="text-red-500">⚠️</span> {rule}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-400 mt-4">Подробные ограничения по конкретным аттракционам смотрите в каталоге.</p>
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
