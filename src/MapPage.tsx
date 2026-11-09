import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

type TravelMode = 'walk' | 'shuttle';
type Category = 'all' | 'zones' | 'transport';
type Node = { id: string; name: string; x: number; y: number; color: string; desc: string };
type Segment = { from: string; to: string; mode: TravelMode; minutes: number; distance?: number; direction?: string; wait?: number };
type Route = { segments: Segment[]; minutes: number; walkMetres: number; explanation?: string };

// Позиции меток пересчитаны из docs/data/island-map-markers-v0.4.json в процентные координаты временного полотна. Не GPS.
const ZONES: readonly Node[] = [
  { id: 'paradise-boulevard', name: 'Paradise Boulevard', x: 48.5, y: 80.2, color: '#14b8a6', desc: 'Входная зона и главная аллея' },
  { id: 'paradise-market', name: 'Paradise Market', x: 47.8, y: 73.0, color: '#f59e0b', desc: 'Торгово-ресторанный квартал' },
  { id: 'eden-gardens', name: 'Eden Gardens', x: 49.0, y: 52.0, color: '#22c55e', desc: 'Ботанический сад и зона отдыха' },
  { id: 'little-paradise', name: 'Little Paradise', x: 68.2, y: 64.2, color: '#f472b6', desc: 'Детская зона' },
  { id: 'serenity-spa', name: 'Serenity Spa', x: 31.2, y: 64.7, color: '#a855f7', desc: 'Зона спокойного отдыха' },
  { id: 'adrenaline-peak', name: 'Adrenaline Peak', x: 49.7, y: 30.1, color: '#ef4444', desc: 'Экстремальные аттракционы' },
  { id: 'atlantis-realm', name: 'Atlantis Realm', x: 28.8, y: 45.1, color: '#3b82f6', desc: 'Затерянный город' },
  { id: 'pirates-cove', name: "Pirate's Cove", x: 70.0, y: 44.6, color: '#854d0e', desc: 'Пиратские приключения' },
  { id: 'ocean-bay', name: 'Ocean Bay', x: 68.2, y: 25.0, color: '#0ea5e9', desc: 'Пляж и морские развлечения' },
  { id: 'grand-hotel', name: 'Paradise Grand Hotel', x: 33.1, y: 27.0, color: '#64748b', desc: 'Гостиничный комплекс; маршрут к отелю уточняется' },
];
const ENTRY = { id: 'gateway', name: 'Транспортный узел / Главный вход', x: 48.5, y: 82.0, color: '#0f766e' };
const ENTRY_OBJECTS = [
  { name: 'Канатная дорога Ocean Wings', desc: 'Положение отдельной станции на финальной карте уточняется.' },
  { name: 'Морской причал', desc: 'Положение отдельного причала на финальной карте уточняется.' },
  { name: 'Главный вход', desc: 'Точка входа в Paradise Boulevard.' },
];
// Утверждённые demo-переходы: docs/master/website-requirements.md §7.7.13.
const WALK: readonly [string, string, number][] = [
  ['paradise-boulevard', 'paradise-market', 350],
  ['paradise-market', 'eden-gardens', 500],
  ['eden-gardens', 'serenity-spa', 600],
  ['serenity-spa', 'ocean-bay', 450],
  ['ocean-bay', 'adrenaline-peak', 700],
  ['adrenaline-peak', 'atlantis-realm', 550],
  ['atlantis-realm', 'pirates-cove', 450],
  ['pirates-cove', 'paradise-boulevard', 600],
  ['eden-gardens', 'little-paradise', 450],
];
// Порядок восьми станций Paradise Loop §7.7.12. Little Paradise — пешком от Eden Gardens.
const LOOP = ['paradise-boulevard', 'paradise-market', 'eden-gardens', 'serenity-spa', 'ocean-bay', 'adrenaline-peak', 'atlantis-realm', 'pirates-cove'] as const;
const nodeById = (id: string) => ZONES.find(n => n.id === id);
const minutesWalk = (metres: number, slow: boolean) => Math.ceil(metres * 60 / (slow ? 3000 : 4000));

function shortestWalk(from: string, to: string, slow: boolean): Route | null {
  if (from === to) return { segments: [], minutes: 0, walkMetres: 0 };
  const dist = new Map<string, number>([[from, 0]]);
  const previous = new Map<string, string>();
  const used = new Set<string>();
  while (true) {
    const next = Array.from(dist.entries()).filter(([id]) => !used.has(id)).sort((a, b) => a[1] - b[1])[0];
    if (!next) return null;
    const [current, weight] = next;
    if (current === to) break;
    used.add(current);
    for (const [a, b, metres] of WALK) {
      const adjacent = a === current ? b : b === current ? a : null;
      if (!adjacent || weight + metres >= (dist.get(adjacent) ?? Infinity)) continue;
      dist.set(adjacent, weight + metres);
      previous.set(adjacent, current);
    }
  }
  const ids = [to];
  while (ids[0] !== from) {
    const prior = previous.get(ids[0]);
    if (!prior) return null;
    ids.unshift(prior);
  }
  const metres = dist.get(to) ?? 0;
  // Итог округляется после суммирования расстояний, а не по участкам.
  const minutes = minutesWalk(metres, slow);
  const segments = ids.slice(0, -1).map((id, i) => {
    const next = ids[i + 1];
    const part = WALK.find(([a, b]) => (a === id && b === next) || (a === next && b === id));
    return { from: id, to: next, mode: 'walk' as const, minutes: minutesWalk(part?.[2] ?? 0, slow), distance: part?.[2] ?? 0 };
  });
  return { segments, minutes, walkMetres: metres };
}

function loopRoute(from: string, to: string, slow: boolean): Route | null {
  if (from === to) return { segments: [], minutes: 0, walkMetres: 0 };
  const boarding = from === 'little-paradise' ? 'eden-gardens' : from;
  const exiting = to === 'little-paradise' ? 'eden-gardens' : to;
  const fromIndex = LOOP.indexOf(boarding as typeof LOOP[number]);
  const toIndex = LOOP.indexOf(exiting as typeof LOOP[number]);
  if (fromIndex < 0 || toIndex < 0) return null;
  const segments: Segment[] = [];
  let walking = 0;
  if (from === 'little-paradise') {
    walking += 450;
    segments.push({ from, to: boarding, mode: 'walk', distance: 450, minutes: minutesWalk(450, slow) });
  }
  if (boarding !== exiting) {
    const clockwise = (toIndex - fromIndex + LOOP.length) % LOOP.length;
    const counter = (fromIndex - toIndex + LOOP.length) % LOOP.length;
    const steps = Math.min(clockwise, counter);
    const dir = clockwise <= counter ? 1 : -1;
    const direction = dir === 1 ? 'по часовой стрелке' : 'против часовой стрелки';
    const ids: string[] = [boarding];
    for (let i = 1; i <= steps; i++) ids.push(LOOP[(fromIndex + dir * i + LOOP.length * 2) % LOOP.length]);
    ids.slice(0, -1).forEach((id, i) => segments.push({ from: id, to: ids[i + 1], mode: 'shuttle', minutes: 5, direction, wait: i === 0 ? 5 : 0 }));
  }
  if (to === 'little-paradise') {
    walking += 450;
    segments.push({ from: exiting, to, mode: 'walk', distance: 450, minutes: minutesWalk(450, slow) });
  }
  const minutes = (boarding === exiting ? 0 : 5) + segments.reduce((sum, s) => sum + s.minutes, 0);
  return { segments, minutes, walkMetres: walking, explanation: 'Ожидание шаттла ~5 минут — предварительная демонстрационная оценка. Точное время зависит от остановки и расписания.' };
}

function ZoneDropdown({ id, value, onChange }: { id: string; value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const options = ZONES.filter(z => z.id !== 'grand-hotel');
  const selected = options.find(z => z.id === value);
  useEffect(() => {
    if (!open) return;
    const outside = (event: globalThis.PointerEvent) => {
      if (!root.current?.contains(event.target as globalThis.Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  const choose = (next: string) => {
    onChange(next);
    setOpen(false);
    root.current?.querySelector<HTMLButtonElement>('[data-zone-trigger]')?.focus();
  };
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
      root.current?.querySelector<HTMLButtonElement>('[data-zone-trigger]')?.focus();
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) { setOpen(true); return; }
      const buttons = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[data-zone-option]') ?? []);
      const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
      buttons[(index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length]?.focus();
    }
    if (event.key === 'Home' && open) { event.preventDefault(); root.current?.querySelector<HTMLButtonElement>('[data-zone-option]')?.focus(); }
    if (event.key === 'End' && open) {
      event.preventDefault();
      const buttons = root.current?.querySelectorAll<HTMLButtonElement>('[data-zone-option]');
      buttons?.[buttons.length - 1]?.focus();
    }
  };
  return <div ref={root} onKeyDown={onKeyDown} style={{position:'relative',width:'100%',marginBottom:15,fontFamily:'Manrope, sans-serif'}}>
    <button id={id} data-zone-trigger type="button" aria-expanded={open} aria-controls={id+'-options'} aria-haspopup="true" onClick={()=>setOpen(v=>!v)}
      style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,width:'100%',minHeight:46,padding:'10px 15px',border:'1px solid '+(open?'#b99564':'#dcd4c5'),borderRadius:4,background:'#fffdf9',color:'#1b454c',fontSize:14,textAlign:'left',cursor:'pointer'}}>
      <span>{selected?.name ?? 'Выберите зону'}</span><span aria-hidden="true" style={{fontSize:22,lineHeight:1,color:'#37616a'}}>⌄</span>
    </button>
    {open && <div id={id+'-options'} role="group" aria-label="Выбор зоны"
      style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,zIndex:100,maxHeight:'min(310px, 45dvh)',overflowY:'auto',padding:6,border:'1px solid #d8c9af',borderRadius:5,background:'#fffcf7',boxShadow:'0 12px 28px rgba(18,55,60,.18)'}}>
      <button data-zone-option type="button" onClick={()=>choose('')} style={{display:'block',width:'100%',minHeight:39,padding:'9px 11px',border:0,borderRadius:3,background:!value?'#f2e9d9':'transparent',color:'#214a51',fontSize:14,textAlign:'left',cursor:'pointer'}}>Выберите зону</button>
      {options.map(z=><button data-zone-option key={z.id} type="button" aria-current={value===z.id?'true':undefined} onClick={()=>choose(z.id)}
        style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:8,width:'100%',minHeight:39,padding:'9px 11px',border:0,borderRadius:3,background:value===z.id?'#f2e9d9':'transparent',color:value===z.id?'#79572e':'#214a51',fontSize:14,textAlign:'left',cursor:'pointer'}}>
        <span>{z.name}</span>{value===z.id&&<span aria-hidden="true" style={{color:'#ad8552'}}>✓</span>}
      </button>)}
    </div>}
  </div>;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
export default function MapPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [mode, setMode] = useState<TravelMode>('walk');
  const [slow, setSlow] = useState(false);
  const [route, setRoute] = useState<Route | null>(null);
  const [error, setError] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const gestures = useRef(new Map<number, { x: number; y: number }>());
  const moving = useRef<{ x: number; y: number; originX: number; originY: number } | null>(null);
  const pinching = useRef<{ distance: number; zoom: number } | null>(null);

  const filtered = useMemo(() => ZONES.filter(z => (category !== 'transport') && z.name.toLowerCase().includes(search.trim().toLowerCase())), [search, category]);
  const showEntry = category !== 'zones' && (search.trim() === '' || `${ENTRY.name} ${ENTRY_OBJECTS.map(o => o.name).join(' ')}`.toLowerCase().includes(search.trim().toLowerCase()));
  const selectedNode = nodeById(selected ?? '');
  const label = (id: string) => nodeById(id)?.name ?? id;
  const resetRoute = () => { setFrom(''); setTo(''); setRoute(null); setError(''); };
  const resetAll = () => { setSearch(''); setCategory('all'); setSelected(null); setPanelOpen(false); resetRoute(); };
  const buildRoute = () => {
    setRoute(null);
    if (!from || !to) { setError('Выберите обе точки маршрута.'); return; }
    if (from === to) { setError('Начальная и конечная точки совпадают.'); return; }
    const result = mode === 'walk' ? shortestWalk(from, to, slow) : loopRoute(from, to, slow);
    if (!result) { setError('Для выбранных точек нет подтверждённого демонстрационного перехода. Выберите другие точки или способ передвижения.'); return; }
    setError(''); setRoute(result); setPanelOpen(true);
  };
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button, input, select')) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    gestures.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gestures.current.size === 1) moving.current = { x: e.clientX, y: e.clientY, originX: pan.x, originY: pan.y };
    if (gestures.current.size === 2) {
      const [a, b] = [...gestures.current.values()];
      pinching.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom };
      moving.current = null;
    }
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!gestures.current.has(e.pointerId)) return;
    gestures.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (gestures.current.size === 2 && pinching.current) {
      const [a, b] = [...gestures.current.values()];
      setZoom(clamp(pinching.current.zoom * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, pinching.current.distance), 0.6, 1.8));
    } else if (moving.current) {
      setPan({ x: clamp(moving.current.originX + e.clientX - moving.current.x, -300, 300), y: clamp(moving.current.originY + e.clientY - moving.current.y, -200, 200) });
    }
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => { gestures.current.delete(e.pointerId); if (gestures.current.size < 2) pinching.current = null; moving.current = null; };
useEffect(() => {
  const element = mapRef.current;
  if (!element) return;

  const handleWheel = (event: globalThis.WheelEvent) => {
    if (event.ctrlKey) return;

    event.preventDefault();

    setZoom(current =>
      clamp(
        current + (event.deltaY < 0 ? 0.1 : -0.1),
        0.6,
        1.8
      )
    );
  };

  element.addEventListener('wheel', handleWheel, {
    passive: false
  });

  return () => {
    element.removeEventListener('wheel', handleWheel);
  };
}, []);
  // Маршрутные линии — только иллюстративное отображение сегментов на старых якорях карты.
  const drawSegments = route?.segments.filter(s => nodeById(s.from) && nodeById(s.to)) ?? [];
  return (
    <main className="apr-map-page h-[calc(100dvh-64px)] min-h-[520px] flex flex-col md:flex-row bg-slate-100 overflow-hidden">
      <section ref={mapRef} aria-label="Схематическая карта острова" className="apr-map-stage relative flex-1 min-h-0 md:w-[70%] overflow-hidden touch-none" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
        <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`, transformOrigin: 'center' }}>
          {/* Temporary coast silhouette: broad northern crown, tapered southern arrival. Not surveyed geography. */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="apr-island-land" x1="0" y1="0" x2="0.8" y2="1"><stop stopColor="#82b18d"/><stop offset=".55" stopColor="#6b9e79"/><stop offset="1" stopColor="#477d66"/></linearGradient>
              <linearGradient id="apr-island-water" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#bce4d6"/><stop offset="1" stopColor="#76bdba"/></linearGradient>
              <filter id="apr-island-shadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#1c5a5d" floodOpacity=".28"/></filter>
              <clipPath id="apr-island-clip"><path d="M49 9 C33 7 18 12 14 26 C9 39 14 52 22 61 C30 71 41 76 45 89 Q49 97 53 89 C58 77 70 68 79 56 C90 42 90 29 82 18 C74 9 60 7 49 9Z"/></clipPath>
            </defs>
            <path d="M49 9 C33 7 18 12 14 26 C9 39 14 52 22 61 C30 71 41 76 45 89 Q49 97 53 89 C58 77 70 68 79 56 C90 42 90 29 82 18 C74 9 60 7 49 9Z" fill="none" stroke="url(#apr-island-water)" strokeWidth="7" opacity=".5"/>
            <path d="M49 9 C33 7 18 12 14 26 C9 39 14 52 22 61 C30 71 41 76 45 89 Q49 97 53 89 C58 77 70 68 79 56 C90 42 90 29 82 18 C74 9 60 7 49 9Z" fill="url(#apr-island-land)" stroke="#ebd7a7" strokeWidth="1.8" filter="url(#apr-island-shadow)"/>
            <g clipPath="url(#apr-island-clip)" opacity=".38">
              <path d="M10 44Q36 30 61 43T93 40M13 60Q42 50 62 64T90 61" fill="none" stroke="#d6e6bb" strokeWidth="2.3" strokeDasharray="2 2"/>
              <ellipse cx="49" cy="52" rx="13" ry="15" fill="#377456" opacity=".65"/>
              <ellipse cx="50" cy="29" rx="12" ry="8" fill="#477b62" opacity=".75"/>
              <ellipse cx="69" cy="24" rx="12" ry="8" fill="#d9c99b" opacity=".8"/>
              <ellipse cx="30" cy="27" rx="11" ry="7" fill="#d6cda8" opacity=".7"/>
              <ellipse cx="70" cy="46" rx="8" ry="10" fill="#73b5a2" opacity=".75"/>
              <ellipse cx="31" cy="46" rx="8" ry="10" fill="#72a5a0" opacity=".7"/>
            </g>
          </svg>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {/* Дорожная сеть ещё не утверждена: не изображаем прямые линии как реальные дорожки. */}
            {drawSegments.map((s,i) => { const a=nodeById(s.from)!; const b=nodeById(s.to)!; return <line key={`${i}-${s.from}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={s.mode === 'shuttle' ? '#d97706' : '#0d9488'} strokeWidth="0.9" strokeDasharray={s.mode === 'shuttle' ? '1.5 1' : undefined} />; })}
          </svg>
          {ZONES.filter(() => category !== 'transport').map(z => <button key={z.id} type="button" onClick={() => {setSelected(z.id); setPanelOpen(true);}} aria-pressed={selected===z.id} aria-label={`Показать ${z.name}`} className={`apr-map-pin absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full focus-visible:outline-4 focus-visible:outline-teal-600 ${selected===z.id ? 'z-30' : 'z-20'}`} style={{left:`${z.x}%`,top:`${z.y}%`}}><span className="apr-map-pin__dot" /><span className="sr-only">{z.name}</span></button>)}
          {showEntry && <button type="button" aria-label="Главный вход и транспортный узел" onClick={()=>{setSelected('gateway');setPanelOpen(true);}} className="apr-map-gateway absolute -translate-x-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-teal-800 text-white border-2 border-white shadow-lg focus-visible:outline-4 focus-visible:outline-teal-400" style={{left:`${ENTRY.x}%`,top:`${ENTRY.y}%`}}>⇅</button>}
        </div>
        <div className="apr-map-notice absolute top-3 left-3 max-w-[70%] pointer-events-none rounded-lg px-3 py-2 text-xs shadow-sm">Эскиз острова · метки по геоплану v0.4</div>
        <div className="absolute top-3 right-3 flex gap-2 z-40">
          <button type="button" aria-label="Открыть панель поиска и маршрутов" className="md:hidden w-11 h-11 rounded-xl bg-white text-teal-800 shadow-lg font-bold focus-visible:outline-2 focus-visible:outline-teal-500" onClick={()=>setPanelOpen(v=>!v)}>☰</button>
          <button type="button" aria-label="Показать управление картой" aria-expanded={controlsOpen} className="md:hidden w-11 h-11 rounded-xl bg-white text-slate-700 shadow-lg focus-visible:outline-2 focus-visible:outline-teal-500" onClick={()=>setControlsOpen(v=>!v)}>⚙</button>
        </div>
        <div className={`absolute bottom-3 right-3 z-30 flex flex-col gap-2 ${controlsOpen ? '' : 'hidden md:flex'}`}>
          <div className="flex flex-row md:flex-col rounded-xl overflow-hidden bg-white shadow-lg">
            <button type="button" aria-label="Приблизить" disabled={zoom>=1.8} onClick={()=>setZoom(v=>clamp(v+0.2,0.6,1.8))} className="w-11 h-11 font-bold text-xl disabled:opacity-40 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal-500">+</button>
            <button type="button" aria-label="Отдалить" disabled={zoom<=0.6} onClick={()=>setZoom(v=>clamp(v-0.2,0.6,1.8))} className="w-11 h-11 font-bold text-xl disabled:opacity-40 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-teal-500">−</button>
          </div>
          <button type="button" onClick={resetView} className="rounded-xl bg-white px-3 py-2 min-h-11 text-xs font-semibold shadow-lg focus-visible:outline-2 focus-visible:outline-teal-500">Весь остров</button>
          {route && <button type="button" onClick={resetRoute} className="rounded-xl bg-red-600 text-white px-3 py-2 min-h-11 text-xs font-semibold shadow-lg focus-visible:outline-2 focus-visible:outline-teal-500">Сброс маршрута</button>}
        </div>
        {route && <div className="absolute left-3 bottom-3 z-20 bg-white/95 shadow-sm rounded-lg px-3 py-2 text-xs text-slate-700 max-w-[64%]">Маршрут: <span className="text-teal-700">━ пешком</span> · <span className="text-amber-700">┄ Paradise Loop</span></div>}
      </section>

      <aside className={`apr-map-panel z-40 shadow-xl flex flex-col md:w-[30%] md:h-full min-w-0 ${panelOpen ? 'absolute inset-x-0 bottom-0 h-[55dvh] rounded-t-2xl md:static md:rounded-none' : 'hidden md:flex'}`} aria-label="Каталог и маршруты острова">
        <div className="p-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-3"><h1 className="text-xl font-serif text-slate-900">Карта острова</h1><button type="button" className="md:hidden p-2 text-teal-700 underline" onClick={()=>setPanelOpen(false)}>Закрыть</button></div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Поиск объекта..." aria-label="Поиск объектов" className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm focus-visible:outline-2 focus-visible:outline-teal-500" />
          <div role="group" aria-label="Фильтр категорий" className="flex gap-2 flex-wrap mt-3">{(['all','zones','transport'] as const).map((cat)=><button key={cat} type="button" aria-pressed={category===cat} onClick={()=>setCategory(cat)} className={`px-3 py-1.5 rounded-full border text-xs ${category===cat?'bg-teal-700 text-white':'bg-white text-slate-700'}`}>{cat==='all'?'Все':cat==='zones'?'Зоны':'Транспорт'}</button>)}<button type="button" onClick={resetAll} className="px-3 py-1.5 text-xs underline text-teal-700">Сбросить фильтры</button></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selected && <section className="apr-map-detail border-b border-slate-100 pb-5">
            <button type="button" onClick={()=>setSelected(null)} className="apr-map-back text-sm text-teal-700 mb-3">← Назад к объектам</button>
            <div className="apr-map-detail__photo" aria-hidden="true"><span>МЕСТО ДЛЯ ФОТОГРАФИИ</span></div>
            {selected==='gateway' ? <>
              <span className="apr-map-detail__eyebrow">ТРАНСПОРТ И ПРИБЫТИЕ</span>
              <h2>{ENTRY.name}</h2>
              {ENTRY_OBJECTS.map(o=><div key={o.name} className="apr-map-detail__subitem"><strong>{o.name}</strong><p>{o.desc}</p></div>)}
            </> : selectedNode ? <>
              <span className="apr-map-detail__eyebrow">{selectedNode.id==='grand-hotel'?'ОТЕЛЬ':'ТЕМАТИЧЕСКАЯ ЗОНА'}</span>
              <h2>{selectedNode.name}</h2>
              <p className="apr-map-detail__desc">{selectedNode.desc}</p>
              <div className="apr-map-detail__actions">
                <button type="button" className="apr-map-detail__primary" onClick={()=>{window.location.hash=selectedNode.id==='grand-hotel'?'#/hotel':`#/zones?zone=${selectedNode.id}`;}}>Подробнее <span aria-hidden="true">↗</span></button>
                {selectedNode.id!=='grand-hotel' && <button type="button" className="apr-map-detail__secondary" onClick={()=>{setFrom(selectedNode.id);setSelected(null);}}>Маршрут отсюда</button>}
              </div>
            </> : null}
          </section>}
          {!selected && <section><h2 className="font-semibold text-sm text-slate-700 mb-3">Объекты ({filtered.length + (showEntry?1:0)})</h2>{showEntry && <button type="button" onClick={()=>setSelected('gateway')} className="w-full text-left p-3 rounded-lg border mb-2 hover:bg-slate-50 text-sm">⇅ {ENTRY.name}</button>}{filtered.map(z=><button type="button" key={z.id} onClick={()=>setSelected(z.id)} className="w-full text-left p-3 rounded-lg border mb-2 hover:bg-slate-50"><span className="font-medium text-sm">{z.name}</span><span className="block text-xs text-slate-500">{z.desc}</span></button>)}{filtered.length===0 && !showEntry && <p className="text-sm text-slate-500">Объекты не найдены.</p>}</section>}
          <section className="apr-map-route border-t border-slate-200 pt-4" aria-label="Построение маршрута"><h2 className="font-semibold text-slate-900 mb-1">Маршрут по острову</h2><p className="apr-map-route__note text-xs text-slate-500 mb-3">Время и расстояния демонстрационные. Линии на карте схематичны; маршрут до отеля пока не утверждён.</p>
            <label className="block text-sm mb-1" htmlFor="route-from">Откуда</label>
            <ZoneDropdown id="route-from" value={from} onChange={value=>{setFrom(value);setRoute(null);}} />
            <label className="block text-sm mb-1" htmlFor="route-to">Куда</label>
            <ZoneDropdown id="route-to" value={to} onChange={value=>{setTo(value);setRoute(null);}} />
            <fieldset className="mb-3"><legend className="text-sm mb-1">Способ передвижения</legend><div className="flex gap-3 flex-wrap"><label className="text-sm"><input type="radio" name="map-mode" checked={mode==='walk'} onChange={()=>{setMode('walk');setRoute(null);}} /> Пешком</label><label className="text-sm"><input type="radio" name="map-mode" checked={mode==='shuttle'} onChange={()=>{setMode('shuttle');setRoute(null);}} /> Paradise Loop</label></div></fieldset>
            <label className="text-sm flex items-center gap-2 mb-3"><input type="checkbox" checked={slow} onChange={e=>{setSlow(e.target.checked);setRoute(null);}} /> Медленный темп (3 км/ч)</label>
            <button type="button" disabled={!from||!to} onClick={buildRoute} className="apr-map-route__submit w-full text-white py-3 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-teal-500">Построить маршрут</button>
            {error && <p role="alert" className="mt-3 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</p>}
            {route && <div className="apr-map-route__result mt-3 p-3 border text-sm"><p className="apr-map-route__summary font-semibold">Ориентировочно {route.minutes} мин · пешком {route.walkMetres} м</p><ol className="mt-2 space-y-2 list-decimal list-inside">{route.segments.map((s,i)=><li key={i}><span className="font-medium">{s.mode==='walk'?'Пешком':'Paradise Loop'}:</span> {label(s.from)} → {label(s.to)}{s.mode==='walk'?` (${s.distance} м)`:` (${s.direction})`}</li>)}</ol>{route.explanation && <p className="text-xs mt-3 text-slate-600">{route.explanation}</p>}<button type="button" className="apr-map-route__reset mt-3 underline" onClick={resetRoute}>Сбросить маршрут</button></div>}
          </section>
        </div>
      </aside>
    </main>
  );
}
