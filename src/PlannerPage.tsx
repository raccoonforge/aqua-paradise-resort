import { useState, useMemo, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';

const ALL_INTERESTS = ['Адреналин', 'Семейный отдых', 'Релакс', 'Исследования'];

type Attraction = {
  id: string;
  name: string;
  zone: string;
  interests: string[];
  duration: [number, number];
  hours: { open: number; close: number };
  minAge: number;
  minHeight: number | null;
  requiresAdult: boolean;
  adultAgeThreshold: number;
};

const ATTRACTIONS_DB: Attraction[] = [
  // Adrenaline Peak
  { id: 'skyfall', name: 'Skyfall', zone: 'Adrenaline Peak', interests: ['Адреналин'], duration: [10, 15], hours: { open: 10, close: 19 }, minAge: 16, minHeight: 150, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'velocity-racers', name: 'Velocity Racers', zone: 'Adrenaline Peak', interests: ['Адреналин'], duration: [15, 20], hours: { open: 10, close: 19 }, minAge: 12, minHeight: 140, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'cyclone-vortex', name: 'Cyclone Vortex', zone: 'Adrenaline Peak', interests: ['Адреналин'], duration: [20, 25], hours: { open: 10, close: 19 }, minAge: 14, minHeight: 140, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'thunder-rush', name: 'Thunder Rush', zone: 'Adrenaline Peak', interests: ['Адреналин'], duration: [15, 20], hours: { open: 10, close: 19 }, minAge: 14, minHeight: 145, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'eagles-lookout', name: "Eagle's Lookout", zone: 'Adrenaline Peak', interests: ['Релакс', 'Исследования'], duration: [15, 30], hours: { open: 9, close: 20 }, minAge: 0, minHeight: null, requiresAdult: true, adultAgeThreshold: 12 },

  // Atlantis Realm
  { id: 'poseidons-descent', name: "Poseidon's Descent", zone: 'Atlantis Realm', interests: ['Адреналин', 'Исследования'], duration: [10, 15], hours: { open: 10, close: 19 }, minAge: 14, minHeight: 140, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'tidal-kingdom', name: 'Tidal Kingdom', zone: 'Atlantis Realm', interests: ['Семейный отдых', 'Исследования'], duration: [30, 45], hours: { open: 10, close: 21 }, minAge: 6, minHeight: 110, requiresAdult: true, adultAgeThreshold: 10 },
  { id: 'crystal-passage', name: 'Crystal Passage', zone: 'Atlantis Realm', interests: ['Исследования', 'Семейный отдых'], duration: [15, 20], hours: { open: 10, close: 19 }, minAge: 4, minHeight: 100, requiresAdult: true, adultAgeThreshold: 10 },
  { id: 'moonlit-ruins', name: 'Moonlit Ruins', zone: 'Atlantis Realm', interests: ['Релакс', 'Исследования'], duration: [20, 30], hours: { open: 10, close: 21 }, minAge: 8, minHeight: 120, requiresAdult: true, adultAgeThreshold: 10 },

  // Pirate's Cove
  { id: 'stormbreaker', name: 'Stormbreaker', zone: "Pirate's Cove", interests: ['Семейный отдых'], duration: [30, 45], hours: { open: 10, close: 20 }, minAge: 6, minHeight: 110, requiresAdult: true, adultAgeThreshold: 10 },
  { id: 'blackbeards-run', name: "Blackbeard's Run", zone: "Pirate's Cove", interests: ['Адреналин', 'Исследования'], duration: [10, 15], hours: { open: 10, close: 19 }, minAge: 12, minHeight: 140, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'smugglers-passage', name: "Smuggler's Passage", zone: "Pirate's Cove", interests: ['Семейный отдых'], duration: [20, 30], hours: { open: 10, close: 19 }, minAge: 5, minHeight: 100, requiresAdult: true, adultAgeThreshold: 10 },
  { id: 'cannonball-clash', name: 'Cannonball Clash', zone: "Pirate's Cove", interests: ['Семейный отдых'], duration: [20, 30], hours: { open: 10, close: 20 }, minAge: 7, minHeight: 120, requiresAdult: true, adultAgeThreshold: 10 },

  // Ocean Bay
  { id: 'ocean-rush', name: 'Ocean Rush', zone: 'Ocean Bay', interests: ['Адреналин'], duration: [10, 15], hours: { open: 10, close: 18 }, minAge: 10, minHeight: 120, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'blue-horizon', name: 'Blue Horizon', zone: 'Ocean Bay', interests: ['Адреналин'], duration: [10, 15], hours: { open: 10, close: 18 }, minAge: 12, minHeight: 140, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'tidal-drop', name: 'Tidal Drop', zone: 'Ocean Bay', interests: ['Адреналин'], duration: [10, 15], hours: { open: 10, close: 18 }, minAge: 16, minHeight: 150, requiresAdult: false, adultAgeThreshold: 18 },
  { id: 'aqua-challenge', name: 'Aqua Challenge', zone: 'Ocean Bay', interests: ['Семейный отдых'], duration: [30, 45], hours: { open: 10, close: 18 }, minAge: 8, minHeight: 120, requiresAdult: true, adultAgeThreshold: 12 },
  { id: 'coral-discovery', name: 'Coral Discovery', zone: 'Ocean Bay', interests: ['Исследования'], duration: [30, 40], hours: { open: 10, close: 17 }, minAge: 10, minHeight: null, requiresAdult: true, adultAgeThreshold: 16 },
  { id: 'ocean-explorer', name: 'Ocean Explorer', zone: 'Ocean Bay', interests: ['Исследования'], duration: [30, 60], hours: { open: 10, close: 18 }, minAge: 12, minHeight: null, requiresAdult: true, adultAgeThreshold: 16 },

  // Little Paradise
  { id: 'tiny-tides', name: 'Tiny Tides', zone: 'Little Paradise', interests: ['Семейный отдых'], duration: [20, 30], hours: { open: 10, close: 19 }, minAge: 0, minHeight: null, requiresAdult: true, adultAgeThreshold: 4 },
  { id: 'rainbow-reef', name: 'Rainbow Reef', zone: 'Little Paradise', interests: ['Семейный отдых'], duration: [30, 45], hours: { open: 10, close: 19 }, minAge: 4, minHeight: 90, requiresAdult: true, adultAgeThreshold: 6 },
  { id: 'splash-explorers', name: 'Splash Explorers', zone: 'Little Paradise', interests: ['Семейный отдых'], duration: [45, 60], hours: { open: 10, close: 19 }, minAge: 8, minHeight: 110, requiresAdult: true, adultAgeThreshold: 10 },

  // Serenity Spa
  { id: 'lotus-pools', name: 'Lotus Thermal Pools', zone: 'Serenity Spa', interests: ['Релакс'], duration: [30, 60], hours: { open: 9, close: 21 }, minAge: 12, minHeight: null, requiresAdult: true, adultAgeThreshold: 16 },
  { id: 'zen-garden', name: 'Zen Garden', zone: 'Serenity Spa', interests: ['Релакс'], duration: [20, 40], hours: { open: 9, close: 21 }, minAge: 0, minHeight: null, requiresAdult: true, adultAgeThreshold: 12 },
  { id: 'whispering-falls', name: 'Whispering Falls', zone: 'Serenity Spa', interests: ['Релакс'], duration: [30, 45], hours: { open: 9, close: 21 }, minAge: 12, minHeight: null, requiresAdult: true, adultAgeThreshold: 16 },

  // Eden Gardens
  { id: 'butterfly-haven', name: 'Butterfly Haven', zone: 'Eden Gardens', interests: ['Исследования', 'Релакс'], duration: [20, 30], hours: { open: 10, close: 18 }, minAge: 0, minHeight: null, requiresAdult: true, adultAgeThreshold: 12 },
  { id: 'emerald-walk', name: 'Emerald Walk', zone: 'Eden Gardens', interests: ['Релакс', 'Исследования'], duration: [30, 45], hours: { open: 9, close: 21 }, minAge: 0, minHeight: null, requiresAdult: false, adultAgeThreshold: 18 },
];

const WALKING_DISTANCES: Record<string, number> = {
  'Paradise Boulevard-Paradise Market': 350,
  'Paradise Market-Eden Gardens': 500,
  'Eden Gardens-Serenity Spa': 600,
  'Serenity Spa-Ocean Bay': 450,
  'Ocean Bay-Adrenaline Peak': 700,
  'Adrenaline Peak-Atlantis Realm': 550,
  'Atlantis Realm-Pirate\'s Cove': 450,
  'Pirate\'s Cove-Paradise Boulevard': 600,
  'Eden Gardens-Little Paradise': 450,
};

function getWalkDistance(from: string, to: string): number | null {
  if (from === to) return 0;
  return WALKING_DISTANCES[`${from}-${to}`] ?? WALKING_DISTANCES[`${to}-${from}`] ?? null;
}

function getWalkMinutes(from: string, to: string, pace: string): number | null {
  const distance = getWalkDistance(from, to);
  if (distance === null) return null;
  if (distance === 0) return 0;
  const speedKmH = pace === 'calm' ? 3 : 4;
  return Math.ceil((distance / 1000) / speedKmH * 60);
}

const midDuration = (d: [number, number]) => Math.round((d[0] + d[1]) / 2);

const formatTime = (minutesFromStart: number, startHour: number): string | null => {
  const totalMinutes = startHour * 60 + minutesFromStart;
  if (totalMinutes >= 24 * 60) return null;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

type Guest = { id: string; age: number; height: number };

// ScheduledItem может быть доступным или недоступным (inaccessibleReasons).
// Недоступный НЕ получает время (startTime = null), чтобы не сдвигать расписание.
type ScheduledItem = Attraction & {
  chosenDuration: number;
  startMinutes: number | null;
  startTime: string | null;
  endTime: string | null;
  inaccessibleReasons: string[];
};

type InaccessibleItem = Attraction & { reasons: string[] };
type PlanPeriod = { period: string; title: string; items: ScheduledItem[] };

export default function PlannerPage({ initialInterests }: { initialInterests?: string }) {
  const [date, setDate] = useState('');
  const [ticketType, setTicketType] = useState('day');
  const parsedInitialInterests = useMemo(() => {
    if (!initialInterests) return [];
    const valid = ['Адреналин', 'Семейный отдых', 'Релакс', 'Исследования'];
    return initialInterests.split(',').map(s => s.trim()).filter(s => valid.includes(s));
  }, [initialInterests]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(parsedInitialInterests);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [guests, setGuests] = useState<Guest[]>([
    { id: 'g1', age: 30, height: 175 },
    { id: 'g2', age: 8, height: 120 },
  ]);

  const [pace, setPace] = useState('balanced');
  const [transport, setTransport] = useState('auto');

  const [plan, setPlan] = useState<PlanPeriod[]>([]);
  const [inaccessible, setInaccessible] = useState<InaccessibleItem[]>([]);
  const [hasConflicts, setHasConflicts] = useState(false);

  const [showAddPicker, setShowAddPicker] = useState(false);
  const [replaceTarget, setReplaceTarget] = useState<{ pIndex: number; iIndex: number } | null>(null);
    // Экспорт (APR-BUG-015)
  const printRef = useRef<HTMLDivElement>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  const [imageGenerating, setImageGenerating] = useState(false);

  // Чтение состояния из URL (APR-BUG-015 — share link)
  useEffect(() => {
    const hash = window.location.hash;
    const qs = hash.split('?')[1] || '';
    const params = new URLSearchParams(qs);
    const stateParam = params.get('state');
    if (!stateParam) return;
    try {
      const decoded = JSON.parse(base64DecodeUnicode(stateParam));
      if (decoded.date) setDate(decoded.date);
      if (decoded.ticketType) setTicketType(decoded.ticketType);
      if (Array.isArray(decoded.interests)) setSelectedInterests(decoded.interests);
      if (Array.isArray(decoded.guests)) setGuests(decoded.guests.map((g: any, i: number) => ({ id: `g${i}`, age: g.age, height: g.height })));
      if (decoded.pace) setPace(decoded.pace);
      // План восстановим после короткой задержки — после установки всех параметров
      if (Array.isArray(decoded.planIds) && decoded.planIds.length > 0) {
        setTimeout(() => {
          const attrs = decoded.planIds
            .map((id: string) => ATTRACTIONS_DB.find(a => a.id === id))
            .filter(Boolean) as Attraction[];
          setIsGenerated(true);
          rebuildPlan(attrs, []);
        }, 50);
      }
    } catch {
      // поврежлённая ссылка — игнорируем
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Безопасное base64-кодирование Unicode-строки
  const base64EncodeUnicode = (str: string): string => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    bytes.forEach(b => { binary += String.fromCharCode(b); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };

  const base64DecodeUnicode = (str: string): string => {
    // Восстанавливаем стандартный base64
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
    const binary = atob(b64 + pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  };

  const buildShareLink = (): string => {
    const planIds = plan.flatMap(p => p.items.map(i => i.id));
    const state = {
      date,
      ticketType,
      interests: selectedInterests,
      guests: guests.map(g => ({ age: g.age, height: g.height })),
      pace,
      planIds,
    };
    const encoded = base64EncodeUnicode(JSON.stringify(state));
    return `${window.location.origin}${window.location.pathname}#/planner?state=${encoded}`;
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallthrough
    }
    // Fallback
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  };

  const handleShareLink = async () => {
    const link = buildShareLink();
    const ok = await copyToClipboard(link);
    if (ok) {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } else {
      window.prompt('Скопируйте ссылку вручную:', link);
    }
  };

  const handleExportImage = async () => {
    if (!printRef.current) return;
    setImageGenerating(true);
    try {
      const dataUrl = await toPng(printRef.current, {
        backgroundColor: '#f8f9fa',
        pixelRatio: 2,
        cacheBust: true,
        // Пропускаем элементы, которые нельзя рендерить
        filter: (node) => {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('print:hidden')) return false;
          }
          return true;
        },
      });
      const link = document.createElement('a');
      link.download = `aqua-paradise-${date || 'route'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('Не удалось создать изображение. Попробуйте PDF.');
    } finally {
      setImageGenerating(false);
    }
  };

  const handleExportPdf = () => {
    window.print();
  };
  
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  const addGuest = (type: 'adult' | 'child') => {
    if (guests.length >= 10) { alert('Максимальное количество посетителей — 10.'); return; }
    setGuests([...guests, { id: `g${Date.now()}`, age: type === 'adult' ? 30 : 8, height: type === 'adult' ? 175 : 120 }]);
  };

  const updateGuest = (id: string, field: 'age' | 'height', value: number) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g));
  };

  const removeGuest = (id: string) => {
    if (guests.length <= 1) { alert('В группе должен быть хотя бы один человек.'); return; }
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const checkAccessibility = (attr: Attraction): string[] => {
    const reasons: string[] = [];
    guests.forEach((g, i) => {
      const label = `Гость ${i + 1}`;
      if (attr.minAge > 0 && g.age < attr.minAge) reasons.push(`${label}: возраст ${g.age} < ${attr.minAge}`);
      if (attr.minHeight !== null && g.height < attr.minHeight) reasons.push(`${label}: рост ${g.height} < ${attr.minHeight} см`);
    });
    const hasAdult = guests.some(g => g.age >= 18);
    if (attr.requiresAdult && !hasAdult) reasons.push('Нужен сопровождающий 18+');
    return reasons;
  };

  const buildSchedule = (availableItems: { attr: Attraction; inaccessibleReasons: string[] }[]) => {
    const dayStart = ticketType === 'evening' ? 17 : 10;
    const dayEnd = 22;
    let currentMinutes = 0;
    let over = false;
    let lastZone: string | null = null;

    const scheduled: ScheduledItem[] = [];
    const overflowed: InaccessibleItem[] = [];

    for (const { attr: item, inaccessibleReasons } of availableItems) {
      // Недоступный объект — попадает в план без времени (визуально помечен)
      if (inaccessibleReasons.length > 0) {
        scheduled.push({
          ...item,
          chosenDuration: midDuration(item.duration),
          startMinutes: null,
          startTime: null,
          endTime: null,
          inaccessibleReasons,
        });
        continue;
      }

      const mid = midDuration(item.duration);
      const startAbs = dayStart * 60 + currentMinutes;
      const itemOpenAbs = item.hours.open * 60;
      const itemCloseAbs = item.hours.close * 60;
      if (startAbs < itemOpenAbs) {
        overflowed.push({ ...item, reasons: [`Открывается в ${item.hours.open}:00`] });
        continue;
      }
      const endAbs = startAbs + mid;
      const effectiveClose = Math.min(itemCloseAbs, dayEnd * 60);
      if (endAbs > effectiveClose) {
        over = true;
        overflowed.push({ ...item, reasons: [`Не помещается до закрытия (${item.hours.close}:00)`] });
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
        inaccessibleReasons: [],
      });

      currentMinutes += mid;
      if (lastZone !== null && lastZone !== item.zone) {
        const walkMin = getWalkMinutes(lastZone, item.zone, pace);
        currentMinutes += walkMin ?? 15;
      } else if (lastZone === item.zone) {
        currentMinutes += 5;
      }
      lastZone = item.zone;
    }

    return { scheduled, overflowed, hasConflicts: over };
  };

  const groupByPeriod = (items: ScheduledItem[]): PlanPeriod[] => {
    const morning: ScheduledItem[] = [];
    const afternoon: ScheduledItem[] = [];
    const evening: ScheduledItem[] = [];
    items.forEach(item => {
      // Недоступные — отправляем в «Вечер» чтобы они не «съедали» время (startHour = null)
      if (item.startTime === null) { evening.push(item); return; }
      const startHour = parseInt(item.startTime.split(':')[0]);
      if (startHour < 13) morning.push(item);
      else if (startHour < 17) afternoon.push(item);
      else evening.push(item);
    });
    const periods: PlanPeriod[] = [];
    if (ticketType !== 'evening' && morning.length > 0) periods.push({ period: 'morning', title: 'Утро', items: morning });
    if (ticketType !== 'evening' && afternoon.length > 0) periods.push({ period: 'afternoon', title: 'День', items: afternoon });
    if (evening.length > 0) periods.push({ period: 'evening', title: 'Вечер', items: evening });
    return periods;
  };

  const rebuildPlan = (availableItems: Attraction[], inaccessibleList: InaccessibleItem[]) => {
    // Для каждого объекта заранее считаем причины недоступности
    const itemsWithReasons = availableItems.map(attr => ({
      attr,
      inaccessibleReasons: checkAccessibility(attr),
    }));
    const { scheduled, overflowed, hasConflicts } = buildSchedule(itemsWithReasons);
    setPlan(groupByPeriod(scheduled));
    setInaccessible([...inaccessibleList, ...overflowed]);
    setHasConflicts(hasConflicts);
  };

  const generatePlan = () => {
    if (!date || selectedInterests.length === 0) { alert('Пожалуйста, выберите дату и хотя бы один интерес.'); return; }
    const hasMinor = guests.some(g => g.age < 18);
    const hasAdult = guests.some(g => g.age >= 18);
    if (hasMinor && !hasAdult) { alert('Для посещения курорта гостям младше 18 лет необходим сопровождающий от 18 лет.'); return; }

    let filtered = ATTRACTIONS_DB.filter(a => a.interests.some(i => selectedInterests.includes(i)));
    if (ticketType === 'evening') filtered = filtered.filter(a => a.hours.close >= 21);

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

  const flattenAvailable = (): Attraction[] =>
    plan.flatMap(p => p.items.map(i => ATTRACTIONS_DB.find(a => a.id === i.id)!));

  const applyEdit = (newAvailable: Attraction[]) => rebuildPlan(newAvailable, inaccessible);

  const moveItem = (periodIndex: number, itemIndex: number, direction: 'up' | 'down') => {
    const all = flattenAvailable();
    const moving = plan[periodIndex].items[itemIndex];
    const currentIdx = all.findIndex(a => a.id === moving.id);
    const targetIdx = direction === 'up' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= all.length) return;
    [all[currentIdx], all[targetIdx]] = [all[targetIdx], all[currentIdx]];
    applyEdit(all);
  };

  const removeItem = (periodIndex: number, itemIndex: number) => {
    const all = flattenAvailable();
    const id = plan[periodIndex].items[itemIndex].id;
    rebuildPlan(all.filter(a => a.id !== id), inaccessible);
  };

  const openReplace = (pIndex: number, iIndex: number) => setReplaceTarget({ pIndex, iIndex });

  const performReplace = (newId: string) => {
    if (!replaceTarget) return;
    const { pIndex, iIndex } = replaceTarget;
    const currentId = plan[pIndex].items[iIndex].id;
    const all = flattenAvailable();
    const idx = all.findIndex(a => a.id === currentId);
    if (idx === -1) return;
    const newAttr = ATTRACTIONS_DB.find(a => a.id === newId);
    if (!newAttr) return;
    all[idx] = newAttr;
    applyEdit(all);
    setReplaceTarget(null);
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
    const usedIds = new Set([...plan.flatMap(p => p.items.map(i => i.id)), ...inaccessible.map(i => i.id)]);
    return ATTRACTIONS_DB.filter(a => !usedIds.has(a.id));
  }, [plan, inaccessible]);

  const availableForReplace = useMemo(() => {
    const usedIds = new Set([...plan.flatMap(p => p.items.map(i => i.id))]);
    return ATTRACTIONS_DB.filter(a => !usedIds.has(a.id));
  }, [plan]);

  const dayStart = ticketType === 'evening' ? 17 : 10;
  const dayEnd = 22;

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12 print:py-0 print:min-h-0">
      <div className="max-w-5xl mx-auto px-4">

        <div className="text-center mb-10">
          <span className="text-teal-700 tracking-widest text-sm font-semibold uppercase mb-2 block">PLAN YOUR DAY</span>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Планировщик посещения</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Составьте персональный маршрут, который подходит именно вам.</p>
        </div>

        <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 transition-all duration-500 overflow-hidden ${isGenerated ? 'max-h-20 opacity-50 hover:opacity-100 mb-6' : 'p-8 mb-8'}`}>
          {isGenerated ? (
            <div className="p-4 flex justify-between items-center print:hidden">
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
                <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Состав группы ({guests.length}/10)</h3>
                  <div className="flex gap-2">
                    <button onClick={() => addGuest('adult')} className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700 transition">+ Взрослый (18+)</button>
                    <button onClick={() => addGuest('child')} className="text-xs bg-amber-500 text-white px-3 py-1.5 rounded-lg hover:bg-amber-600 transition">+ Ребёнок</button>
                  </div>
                </div>
                <div className="space-y-2">
                  {guests.map((g, idx) => (
                    <div key={g.id} className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-lg border border-gray-100">
                      <span className="text-xs font-medium text-gray-500 w-16">Гость {idx + 1}</span>
                      <label className="flex items-center gap-1 text-xs text-gray-600">
                        Возраст:
                        <input type="number" min="0" max="120" value={g.age} onChange={(e) => updateGuest(g.id, 'age', parseInt(e.target.value) || 0)} className="w-16 px-2 py-1 border border-gray-200 rounded text-sm" />
                      </label>
                      <label className="flex items-center gap-1 text-xs text-gray-600">
                        Рост (см):
                        <input type="number" min="0" max="250" value={g.height} onChange={(e) => updateGuest(g.id, 'height', parseInt(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-200 rounded text-sm" />
                      </label>
                      <span className="text-xs text-gray-400 ml-auto">{g.age >= 18 ? '👤' : '👶'}</span>
                      <button onClick={() => removeGuest(g.id)} className="text-red-400 hover:text-red-600 p-1" title="Удалить">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">Интересы</label>
                <div className="flex flex-wrap gap-3">
                  {ALL_INTERESTS.map(interest => (
                    <button key={interest} onClick={() => toggleInterest(interest)} aria-pressed={selectedInterests.includes(interest)} className={`px-6 py-2 rounded-full border-2 transition-all font-medium text-sm ${selectedInterests.includes(interest) ? 'bg-teal-600 border-teal-600 text-white shadow-md' : 'border-gray-200 text-gray-600 hover:border-teal-300'}`}>
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
                        <option value="balanced">Сбалансированный (4 км/ч)</option>
                        <option value="calm">Спокойный (3 км/ч)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2">Передвижение</label>
                      <select value={transport} onChange={(e) => setTransport(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm">
                        <option value="auto">Пешком (по расстояниям §7.7.13)</option>
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
            {/* Шапка — экранная, не в печати */}
            <div className="bg-teal-900 text-white p-5 md:p-6 rounded-3xl mb-6 shadow-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4 print:hidden">
              <div>
                <h2 className="text-xl md:text-2xl font-serif mb-1">Ваш персональный маршрут</h2>
                <p className="text-teal-200 text-sm">
                  Дата: {date} • {ticketType === 'day' ? 'Day Pass' : ticketType === 'premium' ? 'Premium Pass' : 'Evening Pass'}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 flex-shrink-0">
                <button
                  onClick={handleExportPdf}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                  aria-label="Скачать PDF"
                >
                  PDF
                </button>
                <button
                  onClick={handleExportImage}
                  disabled={imageGenerating}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                  aria-label="Скачать изображение"
                >
                  {imageGenerating ? 'Готовим...' : 'PNG'}
                </button>
                <button
                  onClick={handleShareLink}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
                  aria-label="Скопировать ссылку на маршрут"
                >
                  {linkCopied ? '✓ Скопировано' : 'Ссылка'}
                </button>
              </div>
            </div>

            {/* Кнопка «Добавить» — только на экране, не в печати */}
            <div className="mb-6 print:hidden">
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
                    {availableForAdd.length === 0 && <p className="text-sm text-gray-500">Все доступные аттракционы уже в маршруте.</p>}
                    {availableForAdd.map(a => {
                      const reasons = checkAccessibility(a);
                      const ok = reasons.length === 0;
                      return (
                        <button key={a.id} onClick={() => addItem(a.id)} className={`text-left p-3 rounded-xl border transition ${ok ? 'border-gray-100 hover:border-teal-300 hover:bg-teal-50' : 'border-red-100 bg-red-50/30 hover:bg-red-50'}`}>
                          <div className="font-medium text-gray-900 text-sm">{a.name}</div>
                          <div className="text-xs text-gray-500">{a.zone} • {a.duration[0]}–{a.duration[1]} мин</div>
                          {!ok && (
                            <div className="text-xs text-red-600 font-medium mt-1">
                              ⛔ {reasons.join('; ')} — будет помечен как недоступный
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div ref={printRef} className="print-ref bg-[#f8f9fa]">
              {/* Заголовок для печати — виден только в print */}
              <div className="hidden print:block mb-4">
                <h1 className="text-2xl font-serif text-gray-900">Aqua Paradise — Персональный маршрут</h1>
                <p className="text-sm text-gray-600">
                  Дата: {date} • {ticketType === 'day' ? 'Day Pass' : ticketType === 'premium' ? 'Premium Pass' : 'Evening Pass'}
                </p>
              </div>
            
            {hasConflicts && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6 flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-bold">Маршрут требует редактирования</p>
                  <p className="text-sm">Часть остановок не помещается в часы работы ({dayStart}:00–{dayEnd}:00) или в часы объекта.</p>
                </div>
              </div>
            )}

            {plan.length === 0 && inaccessible.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mb-6">
                <p className="text-lg text-gray-700 mb-2">Не удалось составить маршрут.</p>
                <p className="text-sm text-gray-500 mb-6">По выбранным интересам нет подходящих объектов для вашей группы.</p>
                <button onClick={() => setIsGenerated(false)} className="bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition">
                  Изменить параметры
                </button>
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
                      {period.items.map((item, iIndex) => {
                        const prev = iIndex > 0 ? period.items[iIndex - 1] : null;
                        const walkMin = (prev && prev.startTime !== null && item.startTime !== null)
                          ? getWalkMinutes(prev.zone, item.zone, pace)
                          : null;
                        const isInaccessible = item.inaccessibleReasons.length > 0;
                        return (
                          <div key={`${item.id}-${iIndex}`}>
                            {prev && prev.startTime !== null && item.startTime !== null && (
                              <div className="flex items-center gap-2 ml-6 mb-2 text-xs text-gray-500">
                                <span>↓</span>
                                <span>Переход: {walkMin !== null ? `пешком ~${walkMin} мин` : 'пешком (расстояние уточняется)'}</span>
                              </div>
                            )}
                            <div className={`p-4 rounded-2xl shadow-sm border flex flex-wrap items-center justify-between gap-2 transition ${
                              isInaccessible ? 'bg-red-50/50 border-red-300' : 'bg-white border-gray-100 hover:shadow-md'
                            }`}>
                              <div className="flex gap-4 items-center">
                                <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-xs ${
                                  isInaccessible ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400'
                                }`}>
                                  {isInaccessible ? '⛔' : '[Ф]'}
                                </div>
                                <div>
                                  <h4 className="font-serif text-lg text-gray-900">{item.name}</h4>
                                  <p className="text-xs text-gray-500">
                                    {item.zone}
                                    {!isInaccessible && item.startTime && ` • ${item.startTime} – ${item.endTime} • ${item.chosenDuration} мин`}
                                  </p>
                                  {isInaccessible && (
                                    <p className="text-xs text-red-700 font-medium mt-1">
                                      Недоступен: {item.inaccessibleReasons.join('; ')}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <button onClick={() => moveItem(pIndex, iIndex, 'up')} aria-label="Раньше" className="p-2 text-gray-500 hover:text-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded">↑</button>
                                <button onClick={() => moveItem(pIndex, iIndex, 'down')} aria-label="Позже" className="p-2 text-gray-500 hover:text-teal-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded">↓</button>
                                <button onClick={() => openReplace(pIndex, iIndex)} aria-label={`Заменить ${item.name}`} className="p-2 text-gray-500 hover:text-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded" title="Заменить">↻</button>
                                <button onClick={() => removeItem(pIndex, iIndex)} aria-label="Удалить" className="p-2 text-gray-500 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded">✕</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

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

            </div>{/* ← КОНЕЦ printRef */}
              
            <div className="mt-12 text-center print:hidden">
              <button onClick={() => window.location.hash = '#/map'} className="bg-white border border-gray-200 text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition shadow-sm">
                Посмотреть маршрут на карте
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Пикер замены */}
      {replaceTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setReplaceTarget(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="font-medium text-gray-900">Заменить на...</span>
              <button onClick={() => setReplaceTarget(null)} aria-label="Закрыть" className="text-gray-400 hover:text-gray-700 p-1">✕</button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh] grid grid-cols-1 gap-2">
              {availableForReplace.length === 0 && <p className="text-sm text-gray-500">Нет доступных альтернатив.</p>}
              {availableForReplace.map(a => {
                const reasons = checkAccessibility(a);
                const ok = reasons.length === 0;
                return (
                  <button key={a.id} onClick={() => performReplace(a.id)} className={`text-left p-3 rounded-xl border transition ${ok ? 'border-gray-100 hover:border-teal-300 hover:bg-teal-50' : 'border-red-100 bg-red-50/30 hover:bg-red-50'}`}>
                    <div className="font-medium text-gray-900 text-sm">{a.name}</div>
                    <div className="text-xs text-gray-500">{a.zone} • {a.duration[0]}–{a.duration[1]} мин</div>
                    {!ok && <div className="text-xs text-red-600 font-medium mt-1">⛔ {reasons.join('; ')}</div>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
