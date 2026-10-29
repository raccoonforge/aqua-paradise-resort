import { useState, useMemo, useEffect } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';
import { ATTRACTIONS, type Attraction } from './data/attractions';

const INTENSITIES = ['Все', 'Спокойная', 'Семейная', 'Средняя', 'Высокая', 'Экстрим', 'Релакс'];
const ZONES = ['Все', 'Adrenaline Peak', 'Atlantis Realm', 'Eden Gardens', "Pirate's Cove", 'Paradise Boulevard', 'Ocean Bay', 'Serenity Spa', 'Little Paradise', 'Paradise Market'];

// Быстрые категории — настроение, а не строгий технический уровень.
// «Экстрим и высокие» объединяет intensity 'Экстрим' и 'Высокая'
// согласно решению от 2026-10-30 (см. docs/qa/defect-register.md).
const QUICK_CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'calm', label: 'Спокойные' },
  { id: 'family', label: 'Семейные' },
  { id: 'extreme', label: 'Экстрим и высокие' },
] as const;

type QuickCategory = typeof QUICK_CATEGORIES[number]['id'];

function matchesQuickCategory(attr: Attraction, cat: QuickCategory): boolean {
  if (cat === 'all') return true;
  if (cat === 'calm') return attr.intensity === 'Спокойная';
  if (cat === 'family') return attr.intensity === 'Семейная' || (attr.minAge > 0 && attr.minAge < 10);
  // «Экстрим и высокие» — объединение двух явно заданных в данных уровней.
  // Не интерпретируем «Средняя» и не угадываем по названию/фото/характеристикам.
  if (cat === 'extreme') return attr.intensity === 'Экстрим' || attr.intensity === 'Высокая';
  return true;
}

// Проверка возрастных/ростовых ограничений
function isHiddenByRestrictions(attr: Attraction, age: number | '', height: number | ''): { hidden: boolean; reason: string } {
  if (age !== '' && attr.minAge > 0 && age < attr.minAge) {
    return { hidden: true, reason: `возраст < ${attr.minAge}` };
  }
  if (height !== '' && attr.minHeight !== null && height < attr.minHeight) {
    return { hidden: true, reason: `рост < ${attr.minHeight} см` };
  }
  return { hidden: false, reason: '' };
}

export default function AttractionsPage({ initialRide }: { initialRide?: string }) {
  // Инициализация из URL
  const getInitialParams = () => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    return {
      search: params.get('search') || '',
      zone: params.get('zone') || 'Все',
      intensity: params.get('intensity') || 'Все',
      ride: params.get('ride') || initialRide || null,
      quick: (params.get('quick') as QuickCategory) || 'all',
      age: params.get('age') ? parseInt(params.get('age')!) : '' as number | '',
      height: params.get('height') ? parseInt(params.get('height')!) : '' as number | '',
    };
  };

  const initialParams = getInitialParams();

  const [search, setSearch] = useState(initialParams.search);
  const [zoneFilter, setZoneFilter] = useState(initialParams.zone);
  const [intensityFilter, setIntensityFilter] = useState(initialParams.intensity);
  const [quickCategory, setQuickCategory] = useState<QuickCategory>(initialParams.quick);
  const [ageFilter, setAgeFilter] = useState<number | ''>(initialParams.age);
  const [heightFilter, setHeightFilter] = useState<number | ''>(initialParams.height);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showHiddenAnyway, setShowHiddenAnyway] = useState(false);

  const [selectedRideId, setSelectedRideId] = useState<string | null>(initialParams.ride);

  const modalRef = useFocusTrap<HTMLDivElement>(!!selectedRideId);

  // Синхронизация с URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedRideId) params.set('ride', selectedRideId);
    if (search) params.set('search', search);
    if (zoneFilter !== 'Все') params.set('zone', zoneFilter);
    if (intensityFilter !== 'Все') params.set('intensity', intensityFilter);
    if (quickCategory !== 'all') params.set('quick', quickCategory);
    if (ageFilter !== '') params.set('age', String(ageFilter));
    if (heightFilter !== '') params.set('height', String(heightFilter));

    const newQuery = params.toString();
    const newHash = `#/attractions${newQuery ? `?${newQuery}` : ''}`;
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
  }, [search, zoneFilter, intensityFilter, quickCategory, ageFilter, heightFilter, selectedRideId]);

  // Слушатель hashchange
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
        setQuickCategory((params.get('quick') as QuickCategory) || 'all');
        setAgeFilter(params.get('age') ? parseInt(params.get('age')!) : '');
        setHeightFilter(params.get('height') ? parseInt(params.get('height')!) : '');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedRideId) {
        setSelectedRideId(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedRideId]);

  const handleOpenRide = (rideId: string) => setSelectedRideId(rideId);
  const handleCloseRide = () => setSelectedRideId(null);

  // Фильтрация с разделением на видимые / скрытые по ограничениям
  const { visible, hiddenByRestrictions } = useMemo(() => {
    const passing: Attraction[] = [];
    const hidden: (Attraction & { reason: string })[] = [];

    ATTRACTIONS.forEach(attr => {
      const matchSearch = attr.name.toLowerCase().includes(search.toLowerCase().trim());
      const matchZone = zoneFilter === 'Все' || attr.zone === zoneFilter;
      const matchIntensity = intensityFilter === 'Все' || attr.intensity === intensityFilter;
      const matchQuick = matchesQuickCategory(attr, quickCategory);
      if (!matchSearch || !matchZone || !matchIntensity || !matchQuick) return;

      const { hidden: isHidden, reason } = isHiddenByRestrictions(attr, ageFilter, heightFilter);
      if (isHidden) hidden.push({ ...attr, reason });
      else passing.push(attr);
    });

    return { visible: passing, hiddenByRestrictions: hidden };
  }, [search, zoneFilter, intensityFilter, quickCategory, ageFilter, heightFilter]);

  const displayedAttractions = visible.slice(0, visibleCount);
  const totalShown = visible.length + (showHiddenAnyway ? hiddenByRestrictions.length : 0);

  const resetFilters = () => {
    setSearch('');
    setZoneFilter('Все');
    setIntensityFilter('Все');
    setQuickCategory('all');
    setAgeFilter('');
    setHeightFilter('');
    setVisibleCount(12);
    setShowHiddenAnyway(false);
  };

  const activeRide = ATTRACTIONS.find(r => r.id === selectedRideId);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Аттракционы и развлечения</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Найдите идеальное приключение для себя и своей семьи.</p>
        </div>

        {/* Поиск и фильтры */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-3">
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Поиск по названию"
              className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              aria-label="Фильтр по зоне"
              className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-white"
            >
              {ZONES.map(z => <option key={z} value={z}>{z === 'Все' ? 'Все зоны' : z}</option>)}
            </select>
            <select
              value={intensityFilter}
              onChange={(e) => setIntensityFilter(e.target.value)}
              aria-label="Фильтр по интенсивности"
              className="w-full md:w-1/4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-white"
            >
              {INTENSITIES.map(i => <option key={i} value={i}>{i === 'Все' ? 'Любая интенсивность' : i}</option>)}
            </select>
            <button
              onClick={resetFilters}
              aria-label="Сбросить фильтры"
              className="text-sm text-teal-600 font-medium hover:underline whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded px-2 py-1"
            >
              Сбросить
            </button>
          </div>

          {/* Быстрые категории */}
          <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Быстрые категории">
            {QUICK_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setQuickCategory(cat.id)}
                aria-pressed={quickCategory === cat.id}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  quickCategory === cat.id
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Возраст/рост */}
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <label className="flex items-center gap-2 text-gray-700">
              <span className="whitespace-nowrap">Возраст:</span>
              <input
                type="number"
                min="0"
                max="120"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value === '' ? '' : parseInt(e.target.value))}
                placeholder="лет"
                aria-label="Ваш возраст"
                className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </label>
            <label className="flex items-center gap-2 text-gray-700">
              <span className="whitespace-nowrap">Рост:</span>
              <input
                type="number"
                min="0"
                max="250"
                value={heightFilter}
                onChange={(e) => setHeightFilter(e.target.value === '' ? '' : parseInt(e.target.value))}
                placeholder="см"
                aria-label="Ваш рост"
                className="w-24 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </label>
            {(ageFilter !== '' || heightFilter !== '') && (
              <p className="text-xs text-gray-500 self-center">
                Подсказка по ограничениям. Не гарантирует допуск — сопровождающий и правила безопасности проверяются отдельно.
              </p>
            )}
          </div>
        </div>

        {/* Счётчик результатов */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-sm text-gray-600">
            Найдено: <strong>{totalShown}</strong>
            {visible.length > 0 && <span className="text-gray-400"> • показано {displayedAttractions.length}</span>}
          </p>
          {hiddenByRestrictions.length > 0 && !showHiddenAnyway && (
            <button
              onClick={() => setShowHiddenAnyway(true)}
              aria-label={`Показать ${hiddenByRestrictions.length} скрытых по ограничениям`}
              className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full hover:bg-amber-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {hiddenByRestrictions.length} скрыто по ограничениям — показать
            </button>
          )}
        </div>

        {/* Сетка */}
        {displayedAttractions.length === 0 && !showHiddenAnyway ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg mb-4">Ничего не найдено по вашему запросу.</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-teal-600 font-medium underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedAttractions.map((ride) => (
              <button
                key={ride.id}
                onClick={() => handleOpenRide(ride.id)}
                aria-label={`Открыть подробности: ${ride.name}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300"
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
                    {ride.minHeight !== null && <span className="bg-gray-100 px-2 py-1 rounded">📏 {ride.minHeight} см</span>}
                  </div>
                </div>
              </button>
            ))}

            {/* Показать скрытые (если пользователь нажал) */}
            {showHiddenAnyway && hiddenByRestrictions.map((ride) => (
              <button
                key={`hidden-${ride.id}`}
                onClick={() => handleOpenRide(ride.id)}
                aria-label={`Открыть подробности: ${ride.name} (скрыто по ограничениям: ${ride.reason})`}
                className="bg-amber-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-amber-200 group text-left opacity-80 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
              >
                <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center text-amber-800/50 font-serif text-lg">
                  [Фото: {ride.name}]
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-amber-700 tracking-wider uppercase mb-1 block">{ride.zone}</span>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">{ride.name}</h3>
                  <p className="text-xs text-amber-800 bg-amber-100 rounded px-2 py-1 mb-2 inline-block">
                    ⚠️ {ride.reason}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">{ride.desc}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Показать ещё */}
        {visible.length > visibleCount && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount(prev => prev + 12)}
              className="bg-white border border-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Показать ещё
            </button>
          </div>
        )}

      </div>

      {/* Модалка */}
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
                    {activeRide.minAge > 0 || activeRide.minHeight !== null ? (
                      <>
                        {activeRide.minAge > 0 && `${activeRide.minAge}+ лет`}
                        {activeRide.minAge > 0 && activeRide.minHeight !== null && ' / '}
                        {activeRide.minHeight !== null && `${activeRide.minHeight} см`}
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
