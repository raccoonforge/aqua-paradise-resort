import { useState, useRef } from 'react';

// Данные о зонах (координаты X, Y для расстановки на карте)
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
  { id: 'hotel', name: 'Paradise Grand Hotel', x: 15, y: 10, color: '#64748b', desc: 'Гостиничный комплекс' },
];

export default function MapPage() {
  const [selectedZone, setSelectedZone] = useState<typeof zonesData[0] | null>(null);
  const [search, setSearch] = useState('');
  
  // Состояние для панорамирования (перетаскивания карты)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  
  // Состояние для маршрута
  const [routeFrom, setRouteFrom] = useState('');
  const [routeTo, setRouteTo] = useState('');
  const [showRoute, setShowRoute] = useState(false);

  // Фильтрация каталога
  const filteredZones = zonesData.filter(z => 
    z.name.toLowerCase().includes(search.toLowerCase())
  );

  // Логика перетаскивания карты
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  // Построение маршрута
  const handleBuildRoute = () => {
    if (routeFrom && routeTo && routeFrom !== routeTo) {
      setShowRoute(true);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden bg-[#e5e7eb]">
      
      {/* ЛЕВАЯ ЧАСТЬ: Карта (70%) */}
      <div 
        className="relative flex-grow md:w-[70%] h-[50vh] md:h-full overflow-hidden cursor-grab active:cursor-grabbing bg-[#d1d5db]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Сетка карты (для стиля) */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#6b7280 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Контейнер с зонами (сдвигается при перетаскивании) */}
        <div 
          className="absolute inset-0 transition-transform duration-75 ease-out"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          {/* Рисуем связи (линии между зонами) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <path d="M 15 10 L 25 25 L 45 15" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            <path d="M 85 10 L 75 25 L 65 55 L 50 45 L 40 65 L 50 85" stroke="#6b7280" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          </svg>

          {/* Метки зон */}
          {zonesData.map((zone) => (
            <button
              key={zone.id}
              onClick={(e) => { e.stopPropagation(); setSelectedZone(zone); }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all ${
                selectedZone?.id === zone.id ? 'z-30 scale-110' : 'z-20 hover:scale-105'
              }`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            >
              <div 
                className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-colors ${
                  selectedZone?.id === zone.id ? 'ring-4 ring-white/50' : ''
                }`}
                style={{ backgroundColor: zone.color }}
              ></div>
              <span className={`mt-2 text-xs font-bold px-2 py-1 rounded-md bg-white/90 shadow-sm whitespace-nowrap transition-opacity ${
                selectedZone?.id === zone.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {zone.name}
              </span>
            </button>
          ))}

          {/* Линия маршрута (если построен) */}
          {showRoute && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <path 
                d={`M ${zonesData.find(z => z.id === routeFrom)?.x}% ${zonesData.find(z => z.id === routeFrom)?.y}% L ${zonesData.find(z => z.id === routeTo)?.x}% ${zonesData.find(z => z.id === routeTo)?.y}%`} 
                stroke="#14b8a6" strokeWidth="4" fill="none" strokeLinecap="round" className="animate-pulse"
              />
            </svg>
          )}
        </div>

        {/* Кнопки управления картой */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
          <button onClick={() => setPosition({ x: 0, y: 0 })} className="bg-white p-3 rounded-xl shadow-lg hover:bg-gray-50 text-gray-700 font-bold text-sm">
            Показать весь остров
          </button>
          {showRoute && (
            <button onClick={() => setShowRoute(false)} className="bg-red-500 text-white p-3 rounded-xl shadow-lg hover:bg-red-600 font-bold text-sm">
              Сбросить маршрут
            </button>
          )}
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Панель (30%) */}
      <div className="w-full md:w-[30%] h-[50vh] md:h-full bg-white shadow-xl flex flex-col z-40">
        
        {/* Заголовок панели */}
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-2xl font-serif text-gray-900 mb-4">Карта острова</h1>
          <input 
            type="text" 
            placeholder="Поиск объекта..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-sm"
          />
        </div>

        {/* Контент панели (скроллится) */}
        <div className="flex-grow overflow-y-auto p-4">
          
          {/* Если выбрана зона — показываем карточку */}
          {selectedZone ? (
            <div className="animate-fade-in">
              <button onClick={() => setSelectedZone(null)} className="text-sm text-teal-600 mb-4 hover:underline">
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
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition mb-6"
              >
                Подробнее о зоне
              </button>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Построить маршрут</h3>
                <select 
                  value={routeFrom} 
                  onChange={(e) => setRouteFrom(e.target.value)}
                  className="w-full mb-2 p-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="">Откуда...</option>
                  {zonesData.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                </select>
                <select 
                  value={routeTo} 
                  onChange={(e) => setRouteTo(e.target.value)}
                  className="w-full mb-4 p-2 rounded-lg border border-gray-200 text-sm"
                >
                  <option value="">Куда...</option>
                  {zonesData.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
                </select>
                <button 
                  onClick={handleBuildRoute}
                  disabled={!routeFrom || !routeTo || routeFrom === routeTo}
                  className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 text-sm"
                >
                  Проложить маршрут
                </button>
              </div>
            </div>
          ) : (
            /* Если зона не выбрана — показываем каталог */
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Объекты на карте</h2>
              {filteredZones.map(zone => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-left border border-transparent hover:border-gray-100"
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
      </div>
    </div>
  );
}
