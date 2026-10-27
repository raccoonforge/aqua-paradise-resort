import { useState, useMemo, useEffect } from 'react';

// Данные об аттракционах (пока рабочие)
const allAttractions = [
  { id: 'skyfall', name: 'Skyfall', zone: 'Adrenaline Peak', intensity: 'Экстрим', minAge: 16, minHeight: 150, desc: 'Свободное падение с высоты 40 метров.', safety: 'Строго соблюдать ограничения по росту и весу. Беременным и людям с сердечными заболеваниями нельзя.' },
  { id: 'poseidons-descent', name: "Poseidon's Descent", zone: 'Atlantis Realm', intensity: 'Высокая', minAge: 14, minHeight: 140, desc: 'Крутые виражи в недрах подводного города.', safety: 'Не нырять в необорудованных местах. Дети до 14 лет только со взрослыми.' },
  { id: 'stormbreaker', name: 'Stormbreaker', zone: 'Adrenaline Peak', intensity: 'Средняя', minAge: 6, minHeight: 110, desc: 'Семейная горка с неожиданными поворотами.', safety: 'Дети до 6 лет только в сопровождении взрослых.' },
  { id: 'crystal-passage', name: 'Crystal Passage', zone: 'Eden Gardens', intensity: 'Спокойная', minAge: 4, minHeight: 100, desc: 'Плавное путешествие среди кристальных пещер.', safety: 'Безопасно для детей от 4 лет.' },
  { id: 'pirate-quest', name: 'Квест "Сокровища"', zone: "Pirate's Cove", intensity: 'Семейная', minAge: 5, minHeight: null, desc: 'Интерактивное приключение по поиску пиратского клада.', safety: 'Проходить всей командой. Дети до 12 лет со взрослыми.' },
  { id: 'aqua-show', name: 'Вечернее шоу', zone: 'Paradise Boulevard', intensity: 'Спокойная', minAge: 0, minHeight: null, desc: 'Красочное шоу фонтанов и света.', safety: 'Безопасно для всех возрастов.' },
  { id: 'lazy-river', name: 'Ленивая река', zone: 'Ocean Bay', intensity: 'Спокойная', minAge: 0, minHeight: null, desc: 'Медленное плавание по кольцевому маршруту на кругах.', safety: 'Дети до 8 лет в спасательных жилетах.' },
  { id: 'spa-ritual', name: 'Термальный ритуал', zone: 'Serenity Spa', intensity: 'Релакс', minAge: 14, minHeight: null, desc: 'Комплекс процедур для восстановления сил.', safety: 'Детям до 14 лет вход ограничен.' },
  { id: 'kids-slides', name: 'Детские горки', zone: 'Little Paradise', intensity: 'Семейная', minAge: 2, minHeight: 80, desc: 'Мини-горки и безопасные бассейны для малышей.', safety: 'Только в сопровождении взрослых.' },
  { id: 'market-tour', name: 'Гастротур', zone: 'Paradise Market', intensity: 'Спокойная', minAge: 0, minHeight: null, desc: 'Дегустация местных блюд и напитков.', safety: 'Сообщите о аллергиях заранее.' },
];

const INTENSITIES = ['Все', 'Спокойная', 'Семейная', 'Средняя', 'Высокая', 'Экстрим', 'Релакс'];
const ZONES = ['Все', 'Adrenaline Peak', 'Atlantis Realm', 'Eden Gardens', "Pirate's Cove", 'Paradise Boulevard', 'Ocean Bay', 'Serenity Spa', 'Little Paradise', 'Paradise Market'];

export default function AttractionsPage({ initialRide }: { initialRide?: string }) {
  const [search, setSearch] = useState('');
  const [zoneFilter, setZoneFilter] = useState('Все');
  const [intensityFilter, setIntensityFilter] = useState('Все');
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Состояние для модального окна
  const [selectedRideId, setSelectedRideId] = useState<string | null>(initialRide || null);

  // Синхронизация с URL при открытии/закрытии модалки
  useEffect(() => {
    if (selectedRideId) {
      window.location.hash = `#/attractions?ride=${selectedRideId}`;
    } else {
      window.location.hash = `#/attractions`;
    }
  }, [selectedRideId]);

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
                onClick={() => setSelectedRideId(ride.id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setSelectedRideId(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-gray-100 transition"
            >
              ✕
            </button>
            
            <div className="h-64 bg-gradient-to-br from-teal-200 to-cyan-400 flex items-center justify-center text-white text-2xl font-serif">
              [Большое фото: {activeRide.name}]
            </div>
            
            <div className="p-8">
              <span className="text-sm font-bold text-teal-600 tracking-wider uppercase mb-2 block">{activeRide.zone}</span>
              <h2 className="text-3xl font-serif text-gray-900 mb-4">{activeRide.name}</h2>
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
