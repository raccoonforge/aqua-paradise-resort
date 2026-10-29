import { useState, useMemo } from 'react';

const ALL_INTERESTS = ['Адреналин', 'Семейный отдых', 'Релакс', 'Исследования'];

type Attraction = {
  id: string;
  name: string;
  zone: string;
  interests: string[];
  duration: [number, number];
  minAge: number;        // 0 = без ограничений
  minHeight: number | null; // null = без ограничений
  requiresAdult: boolean; // требуется сопровождающий 18+ (для детей младше X)
  adultAgeThreshold: number; // до какого возраста нужен взрослый
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

type PlanItem = Attraction & {
  chosenDuration: number;
  startTime: string | null;
  endTime: string | null;
  isOverLimit: boolean;
  limitMessage: string | null;
  isInaccessible: boolean;
  inaccessibleReason: string | null;
};

type PlanPeriod = { period: string; title: string; items: PlanItem[] };

export default function PlannerPage() {
  const [date, setDate] = useState('');
  const [ticketType, setTicketType] = useState('day');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // НОВОЕ: параметры группы (APR-BUG-006)
  const [groupMinAge, setGroupMinAge] = useState<number | ''>('');
  const [groupMinHeight, setGroupMinHeight] = useState<number | ''>('');
  const [hasAdult, setHasAdult] = useState(true);

  const [pace, setPace] = useState('balanced');
  const [transport, setTransport] = useState('auto');

  const [plan, setPlan] = useState<PlanPeriod[]>([]);
  const [showAddPicker, setShowAddPicker] = useState(false);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const dayStart = ticketType === 'evening' ? 17 : 10;
  const dayEnd = 22;

  // Проверка доступности аттракциона для группы
  const checkAccessibility = (attr: Attraction): { ok: boolean; reason: string | null } => {
    const age = typeof groupMinAge === 'number' ? groupMinAge : null;
    const height = typeof groupMinHeight === 'number' ? groupMinHeight : null;

    if (age !== null && attr.minAge > 0 && age < attr.minAge) {
      return { ok: false, reason: `Минимальный возраст: ${attr.minAge}+` };
    }
    if (height !== null && attr.minHeight !== null && height < attr.minHeight) {
      return { ok: false, reason: `Минимальный рост: ${attr.minHeight} см` };
    }
    if (attr.requiresAdult && age !== null && age < attr.adultAgeThreshold && !hasAdult) {
      return { ok: false, reason: `До ${attr.adultAgeThreshold} лет нужен сопровождающий 18+` };
    }
    return { ok: true, reason: null };
  };

  const recalculateTimes = (inputPlan: PlanPeriod[]): PlanPeriod[] => {
    let currentMinutes = 0;
    const limitMinutes = (dayEnd - dayStart) * 60;
    let overLimitReached = false;

    return inputPlan.map(period => ({
      ...period,
      items: period.items.map(item => {
        if (overLimitReached || item.isInaccessible) {
          return {
            ...item,
            startTime: null,
            endTime: null,
            isOverLimit: overLimitReached && !item.isInaccessible,
            limitMessage: overLimitReached ? 'Не помещается в часы работы' : null,
          };
        }
        const startAbs = dayStart * 60 + currentMinutes;
        const endAbs = startAbs + item.chosenDuration;
        if (endAbs > dayEnd * 60) {
          overLimitReached = true;
          return {
            ...item,
            startTime: null,
            endTime: null,
            isOverLimit: true,
            limitMessage: 'Не помещается в часы работы — удалите или перенесите',
          };
        }
        const startTime = formatTime(currentMinutes, dayStart);
        const endTime = formatTime(currentMinutes + item.chosenDuration, dayStart);
        currentMinutes += item.chosenDuration + 15;
        return { ...item, startTime, endTime, isOverLimit: false, limitMessage: null };
      }),
    }));
  };

  const generatePlan = () => {
    if (!date || selectedInterests.length === 0) {
      alert('Пожалуйста, выберите дату и хотя бы один интерес.');
      return;
    }

    let filtered = ATTRACTIONS_DB.filter(a =>
      a.interests.some(i => selectedInterests.includes(i))
    );

    if (ticketType === 'evening') {
      filtered = filtered.filter(a => midDuration(a.duration) <= 60);
    }

    const toItem = (a: Attraction): PlanItem => {
      const access = checkAccessibility(a);
      return {
        ...a,
        chosenDuration: midDuration(a.duration),
        startTime: null,
        endTime: null,
        isOverLimit: false,
        limitMessage: null,
        isInaccessible: !access.ok,
        inaccessibleReason: access.reason,
      };
    };

    const morning = filtered.slice(0, 2).map(toItem);
    const afternoon = filtered.slice(2, 4).map(toItem);
    const evening = filtered.slice(4).map(toItem);

    const rawPlan = [
      { period: 'morning', title: 'Утро', items: morning },
      { period: 'afternoon', title: 'День', items: afternoon },
      { period: 'evening', title: 'Вечер', items: evening },
    ].filter(p => p.items.length > 0);

    setPlan(recalculateTimes(rawPlan));
    setIsGenerated(true);
  };

  const moveItem = (periodIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    const newPlan = plan.map(p => ({ ...p, items: [...p.items] }));
    const items = newPlan[periodIndex].items;
    const newIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
    if (newIndex >= 0 && newIndex < items.length) {
      [items[itemIndex], items[newIndex]] = [items[newIndex], items[itemIndex]];
      setPlan(recalculateTimes(newPlan));
    }
  };

  const removeItem = (periodIndex: number, itemIndex: number) => {
    const newPlan = plan.map(p => ({ ...p, items: [...p.items] }));
    newPlan[periodIndex].items.splice(itemIndex, 1);
    const filtered = newPlan.filter(p => p.items.length > 0);
    setPlan(recalculateTimes(filtered));
  };

  const changeDuration = (periodIndex: number, itemIndex: number, delta: number) => {
    const newPlan = plan.map(p => ({ ...p, items: [...p.items] }));
    const item = newPlan[periodIndex].items[itemIndex];
    item.chosenDuration = Math.max(item.duration[0], Math.min(item.duration[1], item.chosenDuration + delta));
    setPlan(recalculateTimes(newPlan));
  };

  const addItem = (attractionId: string) => {
    const attr = ATTRACTIONS_DB.find(a => a.id === attractionId);
    if (!attr) return;
    const access = checkAccessibility(attr);
    const newItem: PlanItem = {
      ...attr,
      chosenDuration: midDuration(attr.duration),
      startTime: null,
      endTime: null,
      isOverLimit: false,
      limitMessage: null,
      isInaccessible: !access.ok,
      inaccessibleReason: access.reason,
    };
    const newPlan = plan.length > 0
      ? plan.map(p => ({ ...p, items: [...p.items] }))
      : [{ period: 'morning', title: 'Утро', items: [] }];
    newPlan[newPlan.length - 1].items.push(newItem);
    setPlan(recalculateTimes(newPlan));
    setShowAddPicker(false);
  };

  const hasConflicts = useMemo(() => plan.some(p => p.items.some(i => i.isOverLimit)), [plan]);
  const hasInaccessible = useMemo(() => plan.some(p => p.items.some(i => i.isInaccessible)), [plan]);

  const availableForAdd = useMemo(() => {
    const usedIds = new Set(plan.flatMap(p => p.items.map(i => i.id)));
    return ATTRACTIONS_DB.filter(a => !usedIds.has(a.id));
  }, [plan]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">

        <div className="text-center mb-10">
          <span className="text-teal-700 tracking-widest text-sm font-semibold uppercase mb-2 block">PLAN YOUR DAY</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Планировщик посещения</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Составьте персональный маршрут, который подходит именно вам.</p>
        </div>

        {/* ПАНЕЛЬ НАСТРОЕК */}
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

              {/* НОВОЕ: Параметры группы (APR-BUG-006) */}
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">Состав группы</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Возраст младшего участника</label>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      placeholder="Например, 8"
                      value={groupMinAge}
                      onChange={(e) => setGroupMinAge(e.target.value === '' ? '' : parseInt(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Рост самого низкого (см)</label>
                    <input
                      type="number"
                      min="0"
                      max="250"
                      placeholder="Например, 120"
                      value={groupMinHeight}
                      onChange={(e) => setGroupMinHeight(e.target.value === '' ? '' : parseInt(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasAdult}
                        onChange={(e) => setHasAdult(e.target.checked)}
                        className="w-4 h-4 text-teal-600 rounded"
                      />
                      Есть сопровождающий 18+
                    </label>
                  </div>
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

        {/* РЕЗУЛЬТАТ */}
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
                <button
                  onClick={() => setShowAddPicker(true)}
                  className="w-full bg-white border-2 border-dashed border-teal-300 text-teal-700 py-3 rounded-2xl font-medium hover:bg-teal-50 transition"
                >
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
                      const access = checkAccessibility(a);
                      return (
                        <button
                          key={a.id}
                          onClick={() => addItem(a.id)}
                          className={`text-left p-3 rounded-xl border transition ${access.ok ? 'border-gray-100 hover:border-teal-300 hover:bg-teal-50' : 'border-red-100 bg-red-50/30 opacity-70'}`}
                        >
                          <div className="font-medium text-gray-900 text-sm">{a.name}</div>
                          <div className="text-xs text-gray-500">{a.zone} • {a.duration[0]}–{a.duration[1]} мин</div>
                          {!access.ok && (
                            <div className="text-xs text-red-600 font-medium mt-1">⛔ {access.reason}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {hasInaccessible && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl mb-4 flex items-start gap-3">
                <span className="text-xl">⛔</span>
                <div>
                  <p className="font-bold">Некоторые остановки недоступны для вашей группы</p>
                  <p className="text-sm">Удалите их или измените параметры группы.</p>
                </div>
              </div>
            )}

            {hasConflicts && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6 flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-bold">Маршрут требует редактирования</p>
                  <p className="text-sm">Часть остановок не помещается в часы работы курорта ({dayStart}:00–{dayEnd}:00). Удалите или перенесите их.</p>
                </div>
              </div>
            )}

            <div className="space-y-8 relative">
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
                        <div className={`bg-white p-4 rounded-2xl shadow-sm border transition group hover:shadow-md ${
                          item.isInaccessible ? 'border-red-300 bg-red-50/30' :
                          item.isOverLimit ? 'border-orange-300 bg-orange-50/30' :
                          'border-gray-100'
                        }`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-4 items-start">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">[Ф]</div>
                              <div>
                                <h4 className="font-serif text-lg text-gray-900">{item.name}</h4>
                                <p className="text-xs text-gray-500">{item.zone}</p>

                                {item.isInaccessible && (
                                  <p className="text-xs text-red-600 font-medium mt-1">⛔ {item.inaccessibleReason}</p>
                                )}

                                {!item.isInaccessible && item.isOverLimit && (
                                  <p className="text-xs text-orange-600 font-medium mt-1">{item.limitMessage}</p>
                                )}

                                {!item.isInaccessible && !item.isOverLimit && (
                                  <>
                                    <p className="text-xs text-gray-500 mt-1">{item.startTime} – {item.endTime}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                      <span>Длительность:</span>
                                      <button
                                        onClick={() => changeDuration(pIndex, iIndex, -5)}
                                        disabled={item.chosenDuration <= item.duration[0]}
                                        className="w-5 h-5 rounded-full border border-gray-300 disabled:opacity-30 hover:bg-gray-100"
                                      >−</button>
                                      <span className="font-medium text-gray-800">{item.chosenDuration} мин</span>
                                      <button
                                        onClick={() => changeDuration(pIndex, iIndex, 5)}
                                        disabled={item.chosenDuration >= item.duration[1]}
                                        className="w-5 h-5 rounded-full border border-gray-300 disabled:opacity-30 hover:bg-gray-100"
                                      >+</button>
                                      <span className="text-gray-400">({item.duration[0]}–{item.duration[1]})</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex-shrink-0">
                              <button onClick={() => moveItem(pIndex, iIndex, 'up')} disabled={iIndex === 0} className="p-2 text-gray-400 hover:text-teal-600 disabled:opacity-30" title="Раньше">↑</button>
                              <button onClick={() => moveItem(pIndex, iIndex, 'down')} disabled={iIndex === period.items.length - 1} className="p-2 text-gray-400 hover:text-teal-600 disabled:opacity-30" title="Позже">↓</button>
                              <button onClick={() => removeItem(pIndex, iIndex)} className="p-2 text-gray-400 hover:text-red-500" title="Удалить">✕</button>
                            </div>
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
