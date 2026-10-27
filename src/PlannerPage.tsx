import { useState } from 'react';

const ALL_INTERESTS = ['Адреналин', 'Семейный отдых', 'Релакс', 'Исследования'];

// База знаний для генерации (упрощенная)
const ATTRACTIONS_DB = [
  { id: 'skyfall', name: 'Skyfall', zone: 'Adrenaline Peak', interests: ['Адреналин'], time: '10:00' },
  { id: 'poseidon', name: "Poseidon's Descent", zone: 'Atlantis Realm', interests: ['Адреналин', 'Исследования'], time: '12:00' },
  { id: 'tidal', name: 'Tidal Kingdom', zone: 'Atlantis Realm', interests: ['Семейный отдых', 'Исследования'], time: '14:00' },
  { id: 'crystal', name: 'Crystal Passage', zone: 'Atlantis Realm', interests: ['Исследования', 'Семейный отдых'], time: '15:30' },
  { id: 'storm', name: 'Stormbreaker', zone: "Pirate's Cove", interests: ['Семейный отдых'], time: '11:00' },
  { id: 'lotus', name: 'Lotus Thermal Pools', zone: 'Serenity Spa', interests: ['Релакс'], time: '16:00' },
  { id: 'zen', name: 'Zen Garden', zone: 'Serenity Spa', interests: ['Релакс'], time: '18:00' },
  { id: 'butterfly', name: 'Butterfly Haven', zone: 'Eden Gardens', interests: ['Исследования', 'Релакс'], time: '13:00' },
  { id: 'ocean-rush', name: 'Ocean Rush', zone: 'Ocean Bay', interests: ['Адреналин'], time: '11:30' },
  { id: 'beach', name: 'Paradise Beach', zone: 'Ocean Bay', interests: ['Релакс', 'Семейный отдых'], time: '14:30' },
];

export default function PlannerPage() {
  const [date, setDate] = useState('');
  const [ticketType, setTicketType] = useState('day');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Расширенные настройки
  const [pace, setPace] = useState('balanced');
  const [transport, setTransport] = useState('auto');
  
  // Сгенерированный план
  const [plan, setPlan] = useState<any[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const generatePlan = () => {
    if (!date || selectedInterests.length === 0) {
      alert('Пожалуйста, выберите дату и хотя бы один интерес.');
      return;
    }

    // Фильтруем аттракционы по интересам
    let filtered = ATTRACTIONS_DB.filter(a => 
      a.interests.some(i => selectedInterests.includes(i))
    );

    // Если Evening Pass — оставляем только то, что работает после 17:00 (упрощенно)
    if (ticketType === 'evening') {
      filtered = filtered.filter(a => parseInt(a.time) >= 17);
    }

    // Сортируем по времени
    filtered.sort((a, b) => a.time.localeCompare(b.time));

    // Распределяем по блокам
    const morning = filtered.filter(a => parseInt(a.time) < 12);
    const afternoon = filtered.filter(a => parseInt(a.time) >= 12 && parseInt(a.time) < 17);
    const evening = filtered.filter(a => parseInt(a.time) >= 17);

    setPlan([
      { period: 'morning', title: 'Утро', items: morning },
      { period: 'afternoon', title: 'День', items: afternoon },
      { period: 'evening', title: 'Вечер', items: evening },
    ].filter(p => p.items.length > 0));

    setIsGenerated(true);
  };

  // Функции редактирования
  const moveItem = (periodIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    const newPlan = [...plan];
    const items = newPlan[periodIndex].items;
    const newIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    
    if (newIndex >= 0 && newIndex < items.length) {
      [items[itemIndex], items[newIndex]] = [items[newIndex], items[itemIndex]];
      setPlan(newPlan);
    }
  };

  const removeItem = (periodIndex: number, itemIndex: number) => {
    const newPlan = [...plan];
    newPlan[periodIndex].items.splice(itemIndex, 1);
    // Удаляем пустые блоки
    setPlan(newPlan.filter(p => p.items.length > 0));
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <span className="text-teal-700 tracking-widest text-sm font-semibold uppercase mb-2 block">PLAN YOUR DAY</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Планировщик посещения</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Составьте персональный маршрут, который подходит именно вам.</p>
        </div>

        {/* ПАНЕЛЬ НАСТРОЕК (Всегда доступна, но сворачивается) */}
        <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 overflow-hidden ${isGenerated ? 'max-h-20 opacity-50 hover:opacity-100 mb-6' : 'p-8 mb-8'}`}>
          {isGenerated ? (
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-500 text-sm">Параметры скрыты для удобства просмотра</span>
              <button onClick={() => setIsGenerated(false)} className="text-teal-600 font-medium text-sm hover:underline">Изменить параметры</button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Дата посещения</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Тип билета</label>
                  <select value={ticketType} onChange={(e) => setTicketType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-white">
                    <option value="day">Paradise Day Pass (10:00–22:00)</option>
                    <option value="premium">Paradise Premium Pass (10:00–22:00)</option>
                    <option value="evening">Paradise Evening Pass (17:00–22:00)</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">Интересы</label>
                <div className="flex flex-wrap gap-3">
                  {ALL_INTERESTS.map(interest => (
                    <button key={interest} onClick={() => toggleInterest(interest)} className={`px-6 py-2 rounded-full border-2 transition-all font-medium text-sm ${selectedInterests.includes(interest) ? 'bg-teal-600 border-teal-600 text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-teal-300'}`}>
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Расширенные настройки */}
              <div className="mb-6 border-t border-gray-100 pt-4">
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-sm text-teal-600 font-medium hover:underline flex items-center gap-2">
                  {showAdvanced ? 'Скрыть дополнительные настройки' : 'Дополнительные настройки (темп, транспорт)'}
                </button>
                
                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-fade-in">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Темп отдыха</label>
                      <select value={pace} onChange={(e) => setPace(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                        <option value="calm">Спокойный</option>
                        <option value="balanced">Сбалансированный</option>
                        <option value="active">Активный</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Передвижение</label>
                      <select value={transport} onChange={(e) => setTransport(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                        <option value="auto">Автоматически (оптимально)</option>
                        <option value="walk">Пешком</option>
                        <option value="loop">Paradise Loop</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center">
                <button onClick={generatePlan} className="bg-teal-600 text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-teal-700 transition shadow-lg">
                  Сгенерировать маршрут
                </button>
              </div>
            </div>
          )}
        </div>

        {/* РЕЗУЛЬТАТ (МАРШРУТ) */}
        {isGenerated && (
          <div className="animate-fade-in">
            <div className="bg-teal-900 text-white p-6 rounded-3xl mb-8 flex justify-between items-center shadow-lg">
              <div>
                <h2 className="text-2xl font-serif mb-1">Ваш персональный маршрут</h2>
                <p className="text-teal-200 text-sm">Дата: {date} • {ticketType === 'day' ? 'Day Pass' : ticketType === 'premium' ? 'Premium Pass' : 'Evening Pass'}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => alert('PDF будет доступен в финальной версии')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">PDF</button>
                <button onClick={() => alert('Ссылка будет доступна в финальной версии')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">Ссылка</button>
              </div>
            </div>

            <div className="space-y-8 relative">
              {/* Вертикальная линия */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0 hidden md:block"></div>

              {plan.map((period, pIndex) => (
                <div key={period.period} className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                      period.period === 'morning' ? 'bg-amber-400' : period.period === 'afternoon' ? 'bg-teal-500' : 'bg-indigo-500'
                    }`}>
                      {period.title[0]}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{period.title}</h3>
                  </div>

                  <div className="space-y-4 md:ml-16">
                    {period.items.map((item: any, iIndex: number) => (
                      <div key={item.id}>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
                          <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">[Ф]</div>
                            <div>
                              <h4 className="font-serif text-lg text-gray-900">{item.name}</h4>
                              <p className="text-xs text-gray-500">{item.zone} • {item.time}</p>
                            </div>
                          </div>
                          
                          {/* Кнопки управления (появляются при наведении) */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => moveItem(pIndex, iIndex, 'up')} disabled={iIndex === 0} className="p-2 text-gray-400 hover:text-teal-600 disabled:opacity-30" title="Раньше">↑</button>
                            <button onClick={() => moveItem(pIndex, iIndex, 'down')} disabled={iIndex === period.items.length - 1} className="p-2 text-gray-400 hover:text-teal-600 disabled:opacity-30" title="Позже">↓</button>
                            <button onClick={() => removeItem(pIndex, iIndex)} className="p-2 text-gray-400 hover:text-red-500" title="Удалить">✕</button>
                          </div>
                        </div>
                        
                        {/* Переход к следующему */}
                        {iIndex < period.items.length - 1 && (
                          <div className="flex items-center gap-2 ml-6 my-2 text-xs text-gray-400">
                            <span>↓</span>
                            <span>Переход: {transport === 'walk' ? 'пешком ~10 мин' : 'Paradise Loop ~5 мин'}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button onClick={() => window.location.hash = '#/map'} className="bg-white border border-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition shadow-sm">
                Посмотреть маршрут на карте
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
