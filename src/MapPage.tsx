import { useState, useRef, useMemo, useEffect } from 'react';
import { conceptualRoute, isConceptuallyReachable, type RouteNodeId } from './data/island-transport';

// Данные о зонах (сохранены из исходной версии; координаты — иллюстративные)
const zonesData = [
  { id: 'paradise-boulevard', name: 'Paradise Boulevard', x: 50, y: 85, color: '#14b8a6', desc: 'Входная зона и главная аллея' },
  { id: 'paradise-market', name: 'Paradise Market', x: 40, y: 65, color: '#f59e0b', desc: 'Торгово-ресторанный квартал' },
  { id: 'eden-gardens', name: 'Eden Gardens', x: 50, y: 45, color: '#22c55e', desc: 'Ботанический сад и зона отдыха' },
  { id: 'little-paradise', name: 'Little Paradise', x: 65, y: 55, color: '#f472b6', desc: 'Детская зона' },
  { id: 'serenity-spa', name: 'Serenity Spa', x: 30, y: 45, color: '#a855f7', desc: 'Спа и велнес-центр' },
  { id: 'adrenaline-peak', name: 'Adrenaline Peak', x: 45, y: 15, color: '#ef4444', desc: 'Экстремальные аттракционы' },
  { id: 'atlantis-realm', name: 'Atlantis Realm', x: 25, y: 25, color: '#3b82f6', desc: 'Подводный город и аквариум' },
  { id: 'pirates-cove', name: "Pirate's Cove", x: 75, y: 25, color: '#854d0e', desc: 'Пиратские приключения' },
  { id: 'ocean-bay', name: 'Ocean Bay', x: 85, y: 10, color: '#0ea5e9', desc: 'Пляж и морские развлечения' },
  { id: 'grand-hotel', name: 'Paradise Grand Hotel', x: 15, y: 10, color: '#64748b', desc: 'Гостиничный комплекс' },
] as const;

// Групповой маркер «Транспортный узел / Главный вход».
// Привязан к концептуальной точке gateway; три внутренних объекта
// не имеют собственных координат — позиция уточняется (Visual Pending).
const transportHub = {
  id: 'gateway',
  name: 'Транспортный узел / Главный вход',
  x: 50, y: 92,
  color: '#0f766e',
  subObjects: [
    { id: 'ocean-wings', name: 'Канатная дорога Ocean Wings', desc: 'Позиция станции на схеме уточняется.' },
    { id: 'ferry-terminal', name: 'Морской причал', desc: 'Позиция причала на схеме уточняется.' },
    { id: 'main-gateway', name: 'Главный вход', desc: 'Единая точка входа для гостей курорта.' },
  ],
};

// Фильтры категорий (по документации: зоны + транспорт)
const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'zones', label: 'Зоны' },
  { id: 'transport', label: 'Транспорт' },
];

// Ограничения панорамирования
const PAN_LIMIT = { x: 300, y: 200 };
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 1.8;
const clampZoom = (z: number) => Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));

export default function MapPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedHub, setExpandedHub] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'zones' | 'transport'>('all');

  // Панорамирование и масштаб
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Маршрут (концептуальный, без времени/расстояний)
  const [routeFrom, setRouteFrom] = useState<RouteNodeId | ''>('');
  const [routeTo, setRouteTo] = useState<RouteNodeId | ''>('');
  const [routePath, setRoutePath] = useState<RouteNodeId[] | null>(null);
  const [routeError, setRouteError] = useState<string | null>(null);

  // Поиск
  const query = search.trim().toLowerCase();
  const filteredZones = useMemo(() => {
    return zonesData.filter(z =>
      (category === 'all' || category === 'zones') &&
      (query === '' || z.name.toLowerCase().includes(query))
    );
  }, [query, category]);

  const showHub = useMemo(() => {
    return (category === 'all' || category === 'transport') &&
      (query === '' || transportHub.name.toLowerCase().includes(query) || transportHub.subObjects.some(o => o.name.toLowerCase().includes(query)));
  }, [query, category]);

  // ============ Жесты: pan (1 палец / мышь) и pinch (2 пальца) ============
  // Активные касания/курсоры: id → { x, y }
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  // Для pinch — начальное расстояние и стартовый zoom
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);

  const distanceBetween = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Не начинаем перетаскивание при клике по кнопке-пину
    if ((e.target as HTMLElement).closest('button')) return;

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    } else if (pointers.current.size === 2) {
      // Начинаем pinch
      const [p1, p2] = Array.from(pointers.current.values());
      pinchRef.current = {
        distance: distanceBetween(p1, p2),
        zoom,
      };
    }

    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // Pinch
    if (pointers.current.size === 2 && pinchRef.current) {
      const [p1, p2] = Array.from(pointers.current.values());
      const currentDistance = distanceBetween(p1, p2);
      if (pinchRef.current.distance > 0) {
        const ratio = currentDistance / pinchRef.current.distance;
        const newZoom = clampZoom(pinchRef.current.zoom * ratio);
        setZoom(newZoom);
      }
      return;
    }

    // Pan (1 касание)
    if (pointers.current.size === 1 && isDragging) {
      const nx = e.clientX - dragStart.current.x;
      const ny = e.clientY - dragStart.current.y;
      setPosition({
        x: Math.max(-PAN_LIMIT.x, Math.min(PAN_LIMIT.x, nx)),
        y: Math.max(-PAN_LIMIT.y, Math.min(PAN_LIMIT.y, ny)),
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinchRef.current = null;
    if (pointers.current.size === 0) setIsDragging(false);
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Wheel через нативный listener с passive: false (иначе preventDefault не сработает)
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(z => clampZoom(z + delta));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const zoomIn = () => setZoom(z => clampZoom(z + 0.2));
  const zoomOut = () => setZoom(z => clampZoom(z - 0.2));
  const resetView = () => { setZoom(1); setPosition({ x: 0, y: 0 }); };

  const handleBuildRoute = () => {
    setRouteError(null);
    setRoutePath(null);
    if (!routeFrom || !routeTo) return;
    if (routeFrom === routeTo) {
      setRouteError('Начальная и конечная точки совпадают.');
      return;
    }
    if (!isConceptuallyReachable(routeFrom, routeTo)) {
      setRouteError('Нет доступной связи по концептуальному графу. Попробуйте другую пару.');
      return;
    }
    const path = conceptualRoute(routeFrom, routeTo);
    if (!path) {
      setRouteError('Не удалось построить концептуальный маршрут.');
      return;
    }
    setRoutePath(path);
  };

  const resetRoute = () => {
    setRouteFrom('');
    setRouteTo('');
    setRoutePath(null);
    setRouteError(null);
  };

  // Подписи узлов для селектов маршрута
  const routeNodes: { id: RouteNodeId; label: string }[] = [
    ...zonesData.map(z => ({ id: z.id as RouteNodeId, label: z.name })),
    ...transportHub.subObjects.map(o => ({
      // Для маршрута используем зону Paradise Boulevard как вход
      id: 'paradise-boulevard' as RouteNodeId,
      label: `Вход (${o.name})`,
    })),
  ];

  // Уникальные узлы для селекта (по id)
  const uniqueRouteNodes = Array.from(new Map(routeNodes.map(n => [n.id, n])).values());

  const selectedZone = selectedId ? zonesData.find(z => z.id === selectedId) : null;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-[#e5e7eb]">

      {/* ЛЕВАЯ ЧАСТЬ: Карта */}
      <div
        ref={mapRef}
        className={`relative flex-grow md:w-[70%] h-[50vh] md:h-full overflow-hidden bg-[#d1d5db] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        aria-label="Интерактивная карта острова"
      >
        {/* Сетка */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(#6b7280 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          aria-hidden="true"
        ></div>

        {/* Мир (сдвиг + масштаб) */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          {/* Связи (декоративные, концептуальные) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" aria-hidden="true">
            <path d="M 15 10 L 25 25 L 45 15" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            <path d="M 85 10 L 75 25 L 65 55 L 50 45 L 40 65 L 50 85" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>

          {/* Метки зон (скрываем, если выбран фильтр «Транспорт») */}
          {category !== 'transport' && zonesData.map((zone) => {
            const isSelected = selectedId === zone.id;
            const isOnRoute = routePath?.includes(zone.id as RouteNodeId) ?? false;
            return (
              <button
                key={zone.id}
                onClick={(e) => { e.stopPropagation(); setSelectedId(zone.id); setExpandedHub(false); }}
                aria-label={`Зона ${zone.name}`}
                aria-pressed={isSelected}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 rounded-full ${
                  isSelected ? 'z-30 scale-110' : 'z-20 hover:scale-105'
                }`}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  // увеличенный hitbox для тача, визуально не двигает
                  padding: '12px',
                  marginLeft: '-12px',
                  marginTop: '-12px',
                }}
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  padding: '12px',
                  marginLeft: '-12px',
                  marginTop: '-12px',
                }}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-lg transition-colors ${
                    isSelected ? 'ring-4 ring-white/50' : ''
                  } ${isOnRoute ? 'ring-4 ring-teal-400' : ''}`}
                  style={{ backgroundColor: zone.color }}
                ></div>
                <span className={`mt-2 text-xs font-bold px-2 py-1 rounded-md bg-white/90 shadow-sm whitespace-nowrap transition-opacity ${
                  isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  {zone.name}
                </span>
              </button>
            );
          })}

          {/* Групповой маркер транспортного узла (скрываем, если выбран фильтр «Зоны») */}
          {showHub && category !== 'zones' && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedId(null); setExpandedHub(true); }}
              aria-label="Транспортный узел / Главный вход"
              aria-pressed={expandedHub}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all z-20 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 rounded-full ${
                expandedHub ? 'scale-110 z-30' : ''
              }`}
              style={{
                left: `${transportHub.x}%`,
                top: `${transportHub.y}%`,
                padding: '12px',
                marginLeft: '-12px',
                marginTop: '-12px',
              }}
            >
              <div
                className={`w-8 h-8 rounded-md border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                  expandedHub ? 'ring-4 ring-white/50' : ''
                }`}
                style={{ backgroundColor: transportHub.color }}
              >
                ⇅
              </div>
              <span className={`mt-2 text-xs font-bold px-2 py-1 rounded-md bg-white/90 shadow-sm whitespace-nowrap transition-opacity ${
                expandedHub || category === 'transport' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {transportHub.name}
              </span>
            </button>
          )}

          {/* Линия маршрута (концептуальная, по пинам) */}
          {routePath && routePath.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden="true">
              {routePath.slice(0, -1).map((fromId, i) => {
                const toId = routePath[i + 1];
                const a = zonesData.find(z => z.id === fromId);
                const b = zonesData.find(z => z.id === toId);
                if (!a || !b) return null;
                return (
                  <line
                    key={`${fromId}-${toId}`}
                    x1={`${a.x}%`} y1={`${a.y}%`}
                    x2={`${b.x}%`} y2={`${b.y}%`}
                    stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,4"
                  />
                );
              })}
            </svg>
          )}
        </div>

        {/* Управление картой */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <div className="bg-white rounded-xl shadow-lg flex flex-col">
            <button
              onClick={zoomIn}
              aria-label="Приблизить"
              disabled={zoom >= ZOOM_MAX}
              className="w-10 h-10 text-xl font-bold text-gray-700 hover:bg-gray-50 rounded-t-xl disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              +
            </button>
            <div className="h-px bg-gray-200" />
            <button
              onClick={zoomOut}
              aria-label="Отдалить"
              disabled={zoom <= ZOOM_MIN}
              className="w-10 h-10 text-xl font-bold text-gray-700 hover:bg-gray-50 rounded-b-xl disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              −
            </button>
          </div>
          <button
            onClick={resetView}
            aria-label="Показать весь остров"
            className="bg-white px-3 py-2 rounded-xl shadow-lg hover:bg-gray-50 text-gray-700 font-bold text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Показать весь остров
          </button>
          {routePath && (
            <button
              onClick={resetRoute}
              aria-label="Сбросить маршрут"
              className="bg-red-500 text-white px-3 py-2 rounded-xl shadow-lg hover:bg-red-600 font-bold text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
            >
              Сбросить маршрут
            </button>
          )}
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Панель */}
      <div className="w-full md:w-[30%] h-[50vh] md:h-full bg-white shadow-xl flex flex-col z-40">

        <div className="p-4 border-b border-gray-100">
          <h1 className="text-2xl font-serif text-gray-900 mb-3">Карта острова</h1>
          <input
            type="text"
            placeholder="Поиск объекта..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Поиск объектов на карте"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
          />
          <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label="Фильтр категорий">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as any)}
                aria-pressed={category === cat.id}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                  category === cat.id
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">

          {/* Групповой маркер транспортного узла */}
          {expandedHub && !selectedZone ? (
            <div className="animate-fade-in">
              <button
                onClick={() => setExpandedHub(false)}
                className="text-sm text-teal-600 mb-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                ← Назад к каталогу
              </button>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Транспорт</span>
              <h2 className="text-2xl font-serif text-gray-900 mb-2">{transportHub.name}</h2>
              <p className="text-xs text-gray-500 mb-4">Групповой объект. Точные позиции отдельных станций уточняются.</p>

              <div className="space-y-3">
                {transportHub.subObjects.map(obj => (
                  <div key={obj.id} className="border border-gray-100 rounded-xl p-3">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{obj.name}</h3>
                    <p className="text-xs text-gray-500">{obj.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedZone ? (
            /* Карточка выбранной зоны */
            <div className="animate-fade-in">
              <button
                onClick={() => setSelectedId(null)}
                className="text-sm text-teal-600 mb-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                ← Назад к каталогу
              </button>

              <div className="h-40 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400">
                [Фото: {selectedZone.name}]
              </div>

              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Тематическая зона</span>
              <h2 className="text-2xl font-serif text-gray-900 mb-2">{selectedZone.name}</h2>
              <p className="text-gray-600 text-sm mb-6">{selectedZone.desc}</p>

              <button
                onClick={() => window.location.hash = `#/zones?zone=${selectedZone.id}`}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              >
                Подробнее о зоне
              </button>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Концептуальный маршрут</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Без времени и расстояний. Использует концептуальный граф переходов.
                </p>
                <label className="block text-xs text-gray-600 mb-1" htmlFor="route-from">Откуда</label>
                <select
                  id="route-from"
                  value={routeFrom}
                  onChange={(e) => setRouteFrom(e.target.value as RouteNodeId | '')}
                  className="w-full mb-2 p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                >
                  <option value="">Выберите точку</option>
                  {uniqueRouteNodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                </select>
                <label className="block text-xs text-gray-600 mb-1" htmlFor="route-to">Куда</label>
                <select
                  id="route-to"
                  value={routeTo}
                  onChange={(e) => setRouteTo(e.target.value as RouteNodeId | '')}
                  className="w-full mb-3 p-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                >
                  <option value="">Выберите точку</option>
                  {uniqueRouteNodes.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                </select>
                <button
                  onClick={handleBuildRoute}
                  disabled={!routeFrom || !routeTo}
                  className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                >
                  Построить концептуальный маршрут
                </button>

                {routeError && (
                  <div className="mt-3 text-xs text-red-700 bg-red-50 border border-red-100 rounded-lg p-2">
                    {routeError}
                  </div>
                )}

                {routePath && (
                  <div className="mt-3 text-xs text-teal-800 bg-teal-50 border border-teal-100 rounded-lg p-2">
                    <div className="font-medium mb-1">Концептуальный маршрут:</div>
                    <div className="leading-relaxed">{routePath.join(' → ')}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Каталог */
            <div>
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                Объекты {filteredZones.length + (showHub ? 1 : 0)}
              </h2>

              {filteredZones.length === 0 && !showHub ? (
                <div className="text-center py-8">
                  <p className="text-sm text-gray-500 mb-3">Ничего не найдено.</p>
                  <button
                    onClick={() => { setSearch(''); setCategory('all'); }}
                    className="text-teal-600 text-sm font-medium underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                  >
                    Сбросить поиск и фильтры
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {showHub && (
                    <button
                      onClick={() => { setSelectedId(null); setExpandedHub(true); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-left border border-transparent hover:border-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                      <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: transportHub.color }}></div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{transportHub.name}</div>
                        <div className="text-xs text-gray-500">Канатная дорога, причал, главный вход</div>
                      </div>
                    </button>
                  )}
                  {filteredZones.map(zone => (
                    <button
                      key={zone.id}
                      onClick={() => { setSelectedId(zone.id); setExpandedHub(false); }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-left border border-transparent hover:border-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: zone.color }}></div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{zone.name}</div>
                        <div className="text-xs text-gray-500">{zone.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
