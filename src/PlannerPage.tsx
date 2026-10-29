import { useState, useMemo } from 'react';

const ALL_INTERESTS = ['Адреналин', 'Семейный отдых', 'Релакс', 'Исследования'];

type Attraction = {
  id: string;
  name: string;
  zone: string;
  interests: string[];
  duration: [number, number];
  minAge: number;
  minHeight: number | null;
  requiresAdult: boolean;
  adultAgeThreshold: number;
};

const ATTRACTIONS_DB: Attraction[] = [
  { id: 'skyfall', name: 'Skyfall', zone: 'Adrenaline Peak', interests: ['Адреналин'], duration: [10, 15], minAge: 16, minHeight: 150, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'poseidon', name: "Poseidon's Descent", zone: 'Atlantis Realm', interests: ['Адреналин', 'Исследования'], duration: [10, 15], minAge: 14, minHeight: 140, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'tidal', name: 'Tidal Kingdom', zone: 'Atlantis Realm', interests: ['Семейный отдых', 'Исследования'], duration: [30, 45], minAge: 6, minHeight: 110, requiresAdult: true, adultAgeThreshold: 10 },
  { id: 'crystal', name: 'Crystal Passage', zone: 'Atlantis Realm', interests: ['Исследования', 'Семейный отдых'], duration: [15, 20], minAge: 4, minHeight: 100, requiresAdult: true, adultAgeThreshold: 10 },
  { id: 'storm', name: 'Stormbreaker', zone: "Pirate's Cove", interests: ['Семейный отдых'], duration: [30, 45], minAge: 6, minHeight: 110, requiresAdult: true, adultAgeThreshold: 10 },
  { id: 'lotus', name: 'Lotus Thermal Pools', zone: 'Serenity Spa', interests: ['Релакс'], duration: [30, 60], minAge: 12, minHeight: null, requiresAdult: true, adultAgeThreshold: 16 },
  { id: 'zen', name: 'Zen Garden', zone: 'Serenity Spa', interests: ['Релакс'], duration: [20, 40], minAge: 0, minHeight: null, requiresAdult: true, adultAgeThreshold: 12 },
  { id: 'butterfly', name: 'Butterfly Haven', zone: 'Eden Gardens', interests: ['Исследования', 'Релакс'], duration: [20, 30], minAge: 0, minHeight: null, requiresAdult: true, adultAgeThreshold: 12 },
  { id: 'ocean-rush', name: 'Ocean Rush', zone: 'Ocean Bay', interests: ['Адреналин'], duration: [10, 15], minAge: 10, minHeight: 120, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'beach', name: 'Paradise Beach', zone: 'Ocean Bay', interests: ['Релакс', 'Семейный отдых'], duration: [60, 120], minAge: 0, minHeight: null, requiresAdult: true, adultAgeThreshold: 12 },
];

const midDuration = (d: [number, number]) => Math.round((d[0] + d[1]) / 2);

const formatTime = (minutesFromStart: number, startHour: number): string | null => {
  const totalMinutes = startHour * 60 + minutesFromStart;
  if (totalMinutes >= 24 * 60) return null;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

// Тип гостя
type Guest = {
  id: string;
  age: number;
  height: number;
};

// Плановая остановка (только для доступных)
type ScheduledItem = Attraction & {
  chosenDuration: number;
  startMinutes: number; // от начала дня
  startTime: string;
  endTime: string;
};

// Недоступная остановка
type InaccessibleItem = Attraction & {
  reasons: string[];
};

type PlanPeriod = { period: string; title: string; items: ScheduledItem[] };

export default function PlannerPage() {
  const [date, setDate] = useState('');
  const [ticketType, setTicketType] = useState('day');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [guests, setGuests] = useState<Guest[]>([
    { id: 'g1', age: 30, height: 175 },
    { id: 'g2', age: 8, height: 120 },
  ]);

  const [pace, setPace] = useState('balanced');
  const [transport, setTransport] = useState('auto');

  // План: доступные остановки по периодам
  const [plan, setPlan] = useState<PlanPeriod[]>([]);
  // Недоступные (без времени)
  const [inaccessible, setInaccessible] = useState<InaccessibleItem[]>([]);
  // Флаг переполнения
  const [hasConflicts, setHasConflicts] = useState(false);

  const [showAddPicker, setShowAddPicker] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const addGuest = (type: 'adult' | 'child') => {
    if (guests.length >= 10) {
      alert('Максимальное количество посетителей — 10.');
      return;
    }
    setGuests([...guests, {
      id: `g${Date.now()}`,
      age: type === 'adult' ? 30 : 8,
      height: type === 'adult' ? 175 : 120,
    }]);
  };

  const updateGuest = (id: string, field: 'age' | 'height', value: number) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const removeGuest = (id: string) => {
    if (guests.length <= 1) {
      alert('В группе должен быть хотя бы один человек.');
      return;
    }
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const checkAccessibility = (attr: Attraction): string[] => {
    const reasons: string[] = [];
    guests.forEach((g, i) => {
      const label = `Гость ${i + 1}`;
      if (attr.minAge > 0 && g.age < attr.minAge) {
        reasons.push(`${label}: возраст ${g.age} < ${attr.minAge}`);
      }
      if (attr.minHeight !== null && g.height < attr.minHeight) {
        reasons.push(`${label}: рост ${g.height} < ${attr.minHeight} см`);
      }
    });
    const hasAdult = guests.some(g => g.age >= 18);
    if (attr.requiresAdult && !hasAdult) {
      reasons.push('Нужен сопровождающий 18+');
    }
    return reasons;
  };

  /**
   * Раскладывает доступные объекты по времени, начиная с dayStart.
   * Недоступные — сразу отсеивает.
   */
  const buildSchedule = (
    availableItems: Attraction[],
    inaccessibleItems: InaccessibleItem[]
  ) => {
    const dayStart = ticketType === 'evening' ? 17 : 10;
    const dayEnd = 22;
    let currentMinutes = 0;
    let over = false;

    const scheduled: ScheduledItem[] = [];
    const overflowed: InaccessibleItem[] = [];

    for (const item of availableItems) {
      const mid = midDuration(item.duration);
      const startAbs = dayStart * 60 + currentMinutes;
      const endAbs = startAbs + mid;
      if (endAbs > dayEnd * 60) {
        over = true;
        overflowed.push({
          ...item,
          reasons: ['Не помещается в часы работы курорта'],
        });
        continue;
      }
      const startTime = formatTime(currentMinutes, dayStart)!;
      const endTime = formatTime(currentMinutes + mid, dayStart)!;
      scheduled.push({
        ...item,
        chosenDuration: mid,
        startMinutes: currentMinutes,
        startTime,
        endTime,
      });
      currentMinutes += mid + 15; // переход
    }

    return { scheduled, overflowed, hasConflicts: over };
  };

  /**
   * Распределение по периодам на основе startTime.
   * Утро: < 13:00, День: 13:00–16:59, Вечер: >= 17:00.
   * Для Evening — только Вечер.
   */
  const groupByPeriod = (items: ScheduledItem[]): PlanPeriod[] => {
    const morning: ScheduledItem[] = [];
    const afternoon: ScheduledItem[] = [];
    const evening: ScheduledItem[] = [];

    items.forEach(item => {
      const startHour = parseInt(item.startTime.split(':')[0]);
      if (startHour < 13) morning.push(item);
      else if (startHour < 17) afternoon.push(item);
      else evening.push(item);
    });

    const periods: PlanPeriod[] = [];
    if (ticketType !== 'evening' && morning.length > 0) {
      periods.push({ period: 'morning', title: 'Утро', items: morning });
    }
    if (ticketType !== 'evening' && afternoon.length > 0) {
      periods.push({ period: 'afternoon', title: 'День', items: afternoon });
    }
    if (evening.length > 0) {
      periods.push({ period: 'evening', title: 'Вечер', items: evening });
    }
    return periods;
  };

  const rebuildPlan = (availableItems: Attraction[], inaccessibleItems: InaccessibleItem[]) => {
    const { scheduled, overflowed, hasConflicts } = buildSchedule(availableItems, inaccessibleItems);
    setPlan(groupByPeriod(scheduled));
    setInaccessible([...inaccessibleItems, ...overflowed]);
    setHasConflicts(hasConflicts);
  };

  const generatePlan = () => {
    if (!date || selectedInterests.length === 0) {
      alert('Пожалуйста, выберите дату и хотя бы один интерес.');
      return;
    }

    const hasMinor = guests.some(g => g.age < 18);
    const hasAdult = guests.some(g => g.age >= 18);
    if (hasMinor && !hasAdult) {
      alert('Для посещения курорта гостям младше 18 лет необходим сопровождающий от 18 лет.');
      return;
    }

    let filtered = ATTRACTIONS_DB.filter(a =>
      a.interests.some(i => selectedInterests.includes(i))
    );
    if (ticketType === 'evening') {
      filtered = filtered.filter(a => midDuration(a.duration) <= 60);
    }

    const available: Attraction[] = [];
    const inacc: InaccessibleItem[] = [];
    filtered.forEach(a => {
      const reasons = checkAccessibility(a);
      if (reasons.length === 0) available.push(a);
      else inacc.push({ ...a, reasons });
    });

    setIsGenerated(true);
    rebuildPlan(available, inacc);
  };

  // Ручное редактирование: работаем с плоским списком доступных, затем пересобираем
  const flattenAvailable = (): Attraction[] => {
    return plan.flatMap(p => p.items.map(i => {
      const base = ATTRACTIONS_DB.find(a => a.id === i.id)!;
      return base;
    }));
  };

  const applyEdit = (newAvailable: Attraction[]) => {
    rebuildPlan(newAvailable, inaccessible);
  };

  const moveItem = (periodIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    const all = flattenAvailable();
    const items = plan[periodIndex].items;
    const moving = items[itemIndex];
    const currentIdx = all.findIndex(a => a.id === moving.id);
    const targetIdx = direction === 'up' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= all.length) return;
    [all[currentIdx], all[targetIdx]] = [all[targetIdx], all[currentIdx]];
    applyEdit(all);
  };

  const removeItem = (periodIndex: number, itemIndex: number) => {
    const all = flattenAvailable();
    const id = plan[periodIndex].items[itemIndex].id;
    const removed = all.find(a => a.id === id);
    const rest = all.filter(a => a.id !== id);
    // Удалённый доступный объект уходит "за пределы" — просто не возвращаем его
    rebuildPlan(rest, inaccessible);
    void removed;
  };

  const changeDuration = (periodIndex: number, itemIndex: number, delta: number) => {
    // Для простоты пересобираем: длительность меняется только у выбранного,
    // но так как мы всегда берём midDuration, ручное изменение временно не влияет.
    // Оставим управление для будущего шага; сейчас — без изменений.
    const all = flattenAvailable();
    applyEdit(all);
  };

  const addItem = (attractionId: string) => {
    const attr = ATTRACTIONS_DB.find(a => a.id === attractionId);
    if (!attr) return;
    const all = flattenAvailable();
    all.push(attr);
    applyEdit(all);
    setShowAddPicker(false);
  };

  const availableForAdd = useMemo(() => {
    const usedIds = new Set([
      ...plan.flatMap(p => p.items.map(i => i.id)),
      ...inaccessible.map(i => i.id),
    ]);
    return ATTRACTIONS_DB.filter(a => !usedIds.has(a.id));
  }, [plan, inaccessible]);

  const dayStart = ticketType === 'evening' ? 17 : 10;
  const dayEnd = 22;

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">

        <div className="text-center mb-10">
          <span className="text-teal-700 tracking-widest text-sm font-semibold uppercase mb-2 block">PLAN YOUR DAY</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Планировщик посещения</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Составьте персональный маршрут, который подходит именно вам.</p>
        </div>

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

              <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Состав группы ({guests.length}/10)</h3>
                  <div className="flex gap-2">
                    <button onClick={() => addGuest('adult')} className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700 transition">+ Взрослый (18+)</button>
                    <button onClick={() => addGuest('child')} className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600 transition">+ Ребёнок</button>
                  </div>
                </div>
                <div className="space-y-2">
                  {guests.map((g, idx) => (
                    <div key={g.id} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-100">
                      <span className="text-xs font-medium text-gray-500 w-16">Гость {idx + 1}</span>
                      <label className="flex items-center gap-1 text-xs text-gray-600">
                        Возраст:
                        <input type="number" min="0" max="120" value={g.age} onChange={(e) => updateGuest(g.id, 'age', parseInt(e.target.value) || 0)} className="w-16 px-2 py-1 border border-gray-200 rounded text-sm" />
                      </label>
                      <label className="flex items-center gap-1 text-xs text-gray-600">
                        Рост (см):
                        <input type="number" min="0" max="250" value={g.height} onChange={(e) => updateGuest(g.id, 'height', parseInt(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-200 rounded text-sm" />
                      </label>
                      <span className="text-xs text-gray-400 ml-auto">{g.age >= 18 ? '👤 Взрослый' : '👶 Ребёнок'}</span>
                      <button onClick={() => removeGuest(g.id)} className="text-red-400 hover:text-red-600 p-1" title="Удалить">✕</button>
                    </div>
                  ))}
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

        {isGenerated && (
          <div className="animate-fade-in">
            <div className="bg-teal-900 text-white p-5 md:p-6 rounded-3xl mb-6 shadow-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-serif mb-1">Ваш персональный маршрут</h2>
                <p className="text-teal-200 text-sm">
                  Дата: {date} • {ticketType === 'day' ? 'Day Pass' : ticketType === 'premium' ? 'Premium Pass' : 'Evening Pass'}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => alert('PDF будет доступен в финальной версии')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">PDF</button>
                <button onClick={() => alert('Ссылка будет доступна в финальной версии')} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">Ссылка</button>
              </div>
            </div>

            <div className="mb-6">
              {!showAddPicker ? (
                <button onClick={() => setShowAddPicker(true)} className="w-full bg-white border-2 border-dashed border-teal-300 text-teal-700 py-3 rounded-2xl font-medium hover:bg-teal-50 transition">
                  + Добавить остановку
                </button>
              ) : (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-800 text-sm">Выберите аттракцион</span>
                    <button onClick={() => setShowAddPicker(false)} className="text-gray-400 hover:text-gray-700 text-sm">Отмена</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {availableForAdd.length === 0 && (
                      <p className="text-sm text-gray-500">Все доступные аттракционы уже в маршруте.</p>
                    )}
                    {availableForAdd.map(a => {
                      const reasons = checkAccessibility(a);
                      const ok = reasons.length === 0;
                      return (
                        <button key={a.id} onClick={() => addItem(a.id)} className={`text-left p-3 rounded-xl border transition ${ok ? 'border-gray-100 hover:border-teal-300 hover:bg-teal-50' : 'border-red-100 bg-red-50/30 opacity-70'}`}>
                          <div className="font-medium text-gray-900 text-sm">{a.name}</div>
                          <div className="text-xs text-gray-500">{a.zone} • {a.duration[0]}–{a.duration[1]} мин</div>
                          {!ok && (
                            <div className="text-xs text-red-600 font-medium mt-1">⛔ {reasons.join('; ')}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {hasConflicts && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6 flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-bold">Маршрут требует редактирования</p>
                  <p className="text-sm">Часть остановок не помещается в часы работы курорта ({dayStart}:00–{dayEnd}:00). Они перенесены в раздел «Недоступные».</p>
                </div>
              </div>
            )}

            {/* ДОСТУПНЫЙ МАРШРУТ */}
            {plan.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 mb-6">
                <p className="text-gray-500">Нет доступных остановок для вашей группы. Измените интересы или параметры группы.</p>
              </div>
            ) : (
              <div className="space-y-8 relative mb-8">
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
                      {period.items.map((item, iIndex) => (
                        <div key={item.id}>
                          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition">
                            <div className="flex gap-4 items-center">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">[Ф]</div>
                              <div>
                                <h4 className="font-serif text-lg text-gray-900">{item.name}</h4>
                                <p className="text-xs text-gray-500">{item.zone} • {item.startTime} – {item.endTime}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{item.chosenDuration} мин</p>
                              </div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex-shrink-0">
                              <button onClick={() => moveItem(pIndex, iIndex, 'up')} className="p-2 text-gray-400 hover:text-teal-600" title="Раньше">↑</button>
                              <button onClick={() => moveItem(pIndex, iIndex, 'down')} className="p-2 text-gray-400 hover:text-teal-600" title="Позже">↓</button>
                              <button onClick={() => removeItem(pIndex, iIndex)} className="p-2 text-gray-400 hover:text-red-500" title="Удалить">✕</button>
                            </div>
                          </div>
                          {iIndex < period.items.length - 1 && (
                            <div className="flex items-center gap-2 ml-6 my-2 text-xs text-gray-400">
                              <span>↓</span>
                              <span>Переход: {transport === 'walk' ? 'пешком ~15 мин' : 'Paradise Loop ~15 мин'}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* НЕДОСТУПНЫЕ */}
            {inaccessible.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <span>⛔</span>
                  Недоступные для вашей группы ({inaccessible.length})
                </h3>
                <p className="text-xs text-amber-800 mb-3">Эти объекты не включены в маршрут и не занимают время.</p>
                <div className="space-y-2">
                  {inaccessible.map(item => (
                    <div key={item.id} className="bg-white rounded-xl p-3 border border-amber-100">
                      <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500 mb-1">{item.zone}</div>
                      <ul className="text-xs text-red-700 list-disc list-inside">
                        {item.reasons.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
