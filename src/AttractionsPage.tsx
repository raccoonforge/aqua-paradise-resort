import { useState, useMemo, useEffect, useRef } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';

// Данные об аттракционах (пока рабочие)
const allAttractions = [
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

  // Little Paradise (семейные зоны)
  { id: 'tiny-tides', name: 'Tiny Tides', zone: 'Little Paradise', intensity: 'Спокойная', minAge: 0, minHeight: null, desc: 'Мелкий бассейн с фонтанчиками для малышей (0-3 года).', safety: 'Взрослые обязаны сопровождать.' },
  { id: 'rainbow-reef', name: 'Rainbow Reef', zone: 'Little Paradise', intensity: 'Спокойная', minAge: 4, minHeight: 90, desc: 'Красочные маленькие горки и мелкие бассейны (4-7 лет).', safety: 'Дети до 6 лет со взрослыми.' },
  { id: 'splash-explorers', name: 'Splash Explorers', zone: 'Little Paradise', intensity: 'Средняя', minAge: 8, minHeight: 110, desc: 'Динамичные горки для детей постарше (8-12 лет).', safety: 'Дети до 10 лет со взрослыми.' }
];

const INTENSITIES = ['Все', 'Спокойная', 'Семейная', 'Средняя', 'Высокая', 'Экстрим', 'Релакс'];
const ZONES = ['Все', 'Adrenaline Peak', 'Atlantis Realm', 'Eden Gardens', "Pirate's Cove", 'Paradise Boulevard', 'Ocean Bay', 'Serenity Spa', 'Little Paradise', 'Paradise Market'];

export default function AttractionsPage({ initialRide }: { initialRide?: string }) {
    // Инициализируем состояния из URL при первом рендере
  const getInitialParams = () => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    return {
      search: params.get('search') || '',
      zone: params.get('zone') || 'Все',
      intensity: params.get('intensity') || 'Все',
      ride: params.get('ride') || initialRide || null,
    };
  };

  const initialParams = getInitialParams();

  const [search, setSearch] = useState(initialParams.search);
  const [zoneFilter, setZoneFilter] = useState(initialParams.zone);
  const [intensityFilter, setIntensityFilter] = useState(initialParams.intensity);
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Состояние для модального окна
    const [selectedRideId, setSelectedRideId] = useState<string | null>(initialParams.ride);
    const modalRef = useFocusTrap<HTMLDivElement>(!!selectedRideId);

  // Обновление URL при изменении фильтров или выбранной карточки (URL-009)
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedRideId) params.set('ride', selectedRideId);
    if (search) params.set('search', search);
    if (zoneFilter !== 'Все') params.set('zone', zoneFilter);
    if (intensityFilter !== 'Все') params.set('intensity', intensityFilter);

    const newQuery = params.toString();
    const newHash = `#/attractions${newQuery ? `?${newQuery}` : ''}`;
    
    // Проверяем, чтобы не вызывать зацикливание
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }, [search, zoneFilter, intensityFilter, selectedRideId]);

  // Синхронизация с URL при навигации браузера (Назад/Вперед)
    useEffect(() => {
      const handleHashChange = () => {
      const hash = window.location.hash;
      const [basePath, queryString] = hash.split('?');
      
      if (basePath === '#/attractions') {
        const params = new URLSearchParams(queryString);
        setSelectedRideId(params.get('ride') || null);
        setSearch(params.get('search') || '');
        setZoneFilter(params.get('zone') || 'Все');
        setIntensityFilter(params.get('intensity') || 'Все');
      }
    };

    // Слушаем изменения хэша (кнопки Назад/Вперед)
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Обработка Escape для закрытия модалки (APR-BUG-019)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedRideId) {
        setSelectedRideId(null);
      }
          };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedRideId]);

  const handleOpenRide = (rideId: string) => {
    setSelectedRideId(rideId);
  };

  const handleCloseRide = () => {
    setSelectedRideId(null);
  };
  
  // Фильтрация
  const filteredAttractions = useMemo(() => {
    return allAttractions.filter(attr => {
      const matchSearch = attr.name.toLowerCase().includes(search.toLowerCase().trim());
      const matchZone = zoneFilter === 'Все' || attr.zone === zoneFilter;
      const matchIntensity = intensityFilter === 'Все' || attr.intensity === intensityFilter;
      return matchSearch && matchZone && matchIntensity;
    });
  }, [search, zoneFilter, intensityFilter]);

  const displayedAttractions = filteredAttractions.slice(0, visibleCount);

  const resetFilters = () => {
    setSearch('');
    setZoneFilter('Все');
    setIntensityFilter('Все');
    setVisibleCount(12);
  };

  const activeRide = allAttractions.find(r => r.id === selectedRideId);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Аттракционы и развлечения</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Найдите идеальное приключение для себя и своей семьи.</p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <input 
            type="text" 
            placeholder="Поиск по названию..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
          <select 
            value={zoneFilter} 
            onChange={(e) => setZoneFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-white"
          >
            {ZONES.map(z => <option key={z} value={z}>{z === 'Все' ? 'Все зоны' : z}</option>)}
          </select>
          <select 
            value={intensityFilter} 
            onChange={(e) => setIntensityFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-white"
          >
            {INTENSITIES.map(i => <option key={i} value={i}>{i === 'Все' ? 'Любая интенсивность' : i}</option>)}
          </select>
          <button onClick={resetFilters} className="text-sm text-teal-600 font-medium hover:underline whitespace-nowrap">
            Сбросить
          </button>
        </div>

        {/* Сетка карточек */}
        {displayedAttractions.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">Ничего не найдено по вашему запросу.</p>
            <button onClick={resetFilters} className="mt-4 text-teal-600 font-medium underline">Сбросить фильтры</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedAttractions.map((ride) => (
              <div 
                key={ride.id} 
                onClick={() => handleOpenRide(ride.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group"
              >
                <div className="h-48 bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center text-teal-800/50 font-serif text-lg group-hover:scale-105 transition-transform">
                  [Фото: {ride.name}]
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-1 block">{ride.zone}</span>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">{ride.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{ride.desc}</p>
                  
                  <div className="flex gap-3 text-xs font-medium text-gray-500 mt-4">
                    <span className="bg-gray-100 px-2 py-1 rounded">🔥 {ride.intensity}</span>
                    {ride.minAge > 0 && <span className="bg-gray-100 px-2 py-1 rounded">👤 {ride.minAge}+</span>}
                    {ride.minHeight && <span className="bg-gray-100 px-2 py-1 rounded">📏 {ride.minHeight} см</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Кнопка "Показать еще" */}
        {filteredAttractions.length > visibleCount && (
          <div className="text-center mt-10">
            <button 
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="bg-white border border-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition shadow-sm"
            >
              Показать ещё
            </button>
          </div>
        )}

      </div>

      {/* Модальное окно */}
      {activeRide && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseRide}
        >
          <div 
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="attraction-modal-title"
            tabIndex={-1}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCloseRide}
              aria-label="Закрыть окно аттракциона"
              className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              ✕
            </button>
            
            <div className="h-64 bg-gradient-to-br from-teal-200 to-cyan-400 flex items-center justify-center text-white text-2xl font-serif">
              [Большое фото: {activeRide.name}]
            </div>
            
            <div className="p-8">
              <span className="text-sm font-bold text-teal-600 tracking-wider uppercase mb-2 block">{activeRide.zone}</span>
              <h2 id="attraction-modal-title" className="text-3xl font-serif text-gray-900 mb-4">{activeRide.name}</h2>
              <p className="text-gray-700 text-lg mb-6">{activeRide.desc}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Интенсивность</span>
                  <span className="font-medium text-gray-900">{activeRide.intensity}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Ограничения</span>
                  <span className="font-medium text-gray-900">
                    {activeRide.minAge > 0 || activeRide.minHeight ? (
                      <>
                        {activeRide.minAge > 0 && `${activeRide.minAge}+ лет`}
                        {activeRide.minAge > 0 && activeRide.minHeight && ' / '}
                        {activeRide.minHeight && `${activeRide.minHeight} см`}
                      </>
                    ) : 'Нет'}
                  </span>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-900 text-sm">
                <span className="font-bold block mb-1">Безопасность:</span>
                {activeRide.safety}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
