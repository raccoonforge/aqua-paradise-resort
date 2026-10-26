import { useMemo, useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import island from '../data/island-map-v0.4.json'

type Category = 'all' | 'adventure' | 'relax' | 'family'
const details = [
  { name: 'Paradise Boulevard', icon: '🌴', category: 'relax', caption: 'Ворота острова', description: 'Главный променад, встреча гостей и начало путешествия по Aqua Paradise.' },
  { name: 'Paradise Market', icon: '🍍', category: 'relax', caption: 'Вкусы тропиков', description: 'Тропический рынок с ресторанами, кафе и сувенирами для гостей острова.' },
  { name: 'Eden Gardens', icon: '🌿', category: 'relax', caption: 'Зелёное сердце', description: 'Ботанические прогулки, тенистые дорожки и тихий отдых среди тропических растений.' },
  { name: 'Little Paradise', icon: '🐠', category: 'family', caption: 'Для юных гостей', description: 'Семейное водное пространство с развлечениями для детей разных возрастов.' },
  { name: 'Serenity Spa', icon: '🪷', category: 'relax', caption: 'Спокойствие и восстановление', description: 'Место для неспешного отдыха и оздоровительных процедур.' },
  { name: 'Pirate’s Cove', icon: '🏴‍☠️', category: 'adventure', caption: 'Навстречу приключениям', description: 'Пиратские истории, семейные водные аттракционы и морская атмосфера.' },
  { name: 'Atlantis Realm', icon: '🔱', category: 'adventure', caption: 'Тайны Атлантиды', description: 'Легенды затерянного города, исследовательские маршруты и водные развлечения.' },
  { name: 'Adrenaline Peak', icon: '⚡', category: 'adventure', caption: 'Покори вершину', description: 'Самые динамичные и экстремальные водные приключения острова.' },
  { name: 'Ocean Bay', icon: '🏖️', category: 'family', caption: 'Море рядом', description: 'Естественный морской пляж с обустроенными зонами отдыха и купания.' },
  { name: 'Paradise Grand Hotel', icon: '🏨', category: 'relax', caption: 'Курортный комфорт', description: 'Премиальный отель и виллы на отдельном участке северо-западного побережья.' },
] as const
const palette = ['#eaa26f','#f2c582','#71bf9b','#f0ac86','#93c7c5','#cc967b','#77b4bf','#aa9bd0','#73cad5','#e5a7b8','#c7d3ce','#85aa80']
const LABELS: Record<Category,string> = {all:'Все зоны',adventure:'Приключения',relax:'Отдых',family:'Для семьи'}
const SW = 720, SH = 840
const sx = (x:number) => (x + 1300) * .24 + 48
const sy = (y:number) => (1560-y) * .24 + 40
const indexById = new Map(island.classes.map((c,i)=>[c.id,i]))
const pth = (id:string) => id === 'grand-hotel-villas' ? '/hotel' : '/zones?zone='+id.replace('-onshore','')
export default function IslandMap() {
  const [selected,setSelected] = useState<number|null>(2)
  const [search,setSearch] = useState('')
  const [category,setCategory] = useState<Category>('all')
  const [scale,setScale] = useState(1)
  const [pan,setPan] = useState({x:0,y:0})
  const drag = useRef<{x:number;y:number;px:number;py:number;active:boolean}|null>(null)
  const region = useMemo(()=>island.runs.map(([x,y,t,n],i)=><rect key={i} x={sx(x)} y={sy(y)-4.8} width={n*4.8+.12} height={4.92} fill={palette[t]}/>),[])
  const matches = useMemo(()=>details.map((d,i)=>({d,i})).filter(({d})=>(category==='all'||d.category===category)&&[d.name,d.caption,d.description].join(' ').toLocaleLowerCase('ru').includes(search.toLocaleLowerCase('ru').trim())),[category,search])
  const visible = new Set(matches.map(x=>x.i))
  const picked = selected===null?null:details[selected]
  const zoom = (factor:number) => setScale(s=>Math.min(3,Math.max(.8,Math.round(s*factor*100)/100)))
  const wheel = (event:WheelEvent<HTMLDivElement>) => {if(event.ctrlKey||event.metaKey){event.preventDefault();zoom(event.deltaY<0?1.1:.9)}}
  const down = (event:PointerEvent<HTMLDivElement>) => {if(event.button!==0)return;drag.current={x:event.clientX,y:event.clientY,px:pan.x,py:pan.y,active:false};event.currentTarget.setPointerCapture(event.pointerId)}
  const move = (event:PointerEvent<HTMLDivElement>) => {if(!drag.current)return;const d=drag.current,dx=event.clientX-d.x,dy=event.clientY-d.y;if(Math.hypot(dx,dy)>5)d.active=true;if(d.active)setPan({x:d.px+dx,y:d.py+dy})}
  const end = () => {drag.current=null}
  const choose = (index:number) => {if(drag.current?.active)return;setSelected(index)}
  return <main className="min-h-screen bg-[#eef8f5] pt-28 text-slate-900">
    <section className="mx-auto max-w-[1480px] px-4 pb-12 sm:px-6">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 text-xs font-bold uppercase tracking-[.25em] text-cyan-700">Aqua Paradise · Исследуйте остров</p><h1 className="text-4xl font-black tracking-tight sm:text-5xl">Карта острова</h1><p className="mt-3 max-w-2xl text-slate-600">Девять миров, один тропический рай. Выберите зону на карте или найдите её по названию.</p></div>
        <a href="/" className="rounded-full border border-cyan-800/20 bg-white px-5 py-3 font-semibold text-cyan-800 hover:bg-cyan-50">← На главную</a>
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
        <section aria-label="Интерактивная карта острова" className="overflow-hidden rounded-[2rem] border border-white bg-gradient-to-b from-[#bcecf1] to-[#74d1d9] shadow-xl shadow-cyan-950/10">
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4 sm:px-6"><span className="rounded-full bg-white/85 px-4 py-2 text-xs font-semibold text-cyan-950">🌊 Aqua Paradise · остров 6 км²</span><span className="rounded-full bg-white/85 px-3 py-2 text-xs text-slate-600">Иллюстративная карта</span></div>
          <div className="relative h-[530px] touch-none overflow-hidden sm:h-[650px]" onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onWheel={wheel} style={{cursor:'grab'}}>
            <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label="Цветная план-схема тематических зон острова" className="h-full w-full select-none" preserveAspectRatio="xMidYMid meet">
              <g transform={`translate(${pan.x} ${pan.y}) translate(${SW/2} ${SH/2}) scale(${scale}) translate(${-SW/2} ${-SH/2})`}>
                <g stroke="#f2f9ef" strokeWidth=".28">{region}</g>
                {island.pins.map((p)=>{const i=indexById.get(p.id);if(i===undefined)return null;const d=details[i],v=visible.has(i),active=i===selected;return <g key={p.id} transform={`translate(${sx(p.point[0])} ${sy(p.point[1])})`} opacity={v?1:.25} role="button" tabIndex={0} aria-label={`Выбрать зону ${d.name}`} onClick={()=>{if(v) choose(i)}} onKeyDown={e=>{if(v&&(e.key==='Enter'||e.key===' ')){e.preventDefault();choose(i)}}} style={{cursor:'pointer'}}>
                  <circle r={active?26:21} fill={active?'#083c45':'#fff'} stroke="#fff" strokeWidth="3" opacity=".96"/>
                  <text y="7" textAnchor="middle" fontSize="23" pointerEvents="none">{d.icon}</text>
                  <text y="40" textAnchor="middle" fontSize="12" fontWeight="800" paintOrder="stroke" stroke="#fff" strokeWidth="3" fill="#073f45" pointerEvents="none">{d.name}</text>
                </g>})}
              </g>
            </svg>
            <div className="absolute bottom-5 right-4 flex flex-col gap-2"><button onClick={()=>zoom(1.2)} className="h-11 w-11 rounded-xl bg-white text-2xl font-semibold shadow-md" aria-label="Приблизить карту">+</button><button onClick={()=>zoom(1/1.2)} className="h-11 w-11 rounded-xl bg-white text-2xl font-semibold shadow-md" aria-label="Отдалить карту">−</button><button onClick={()=>{setPan({x:0,y:0});setScale(1)}} className="h-11 w-11 rounded-xl bg-white text-sm font-bold shadow-md" aria-label="Сбросить масштаб и позицию">⟲</button></div>
            <p className="absolute bottom-3 left-4 max-w-[65%] rounded-lg bg-white/80 px-3 py-2 text-[11px] text-slate-600">Перетаскивайте карту • Ctrl + колесо для масштаба</p>
          </div>
        </section>
        <aside className="flex min-w-0 flex-col gap-4" aria-label="Поиск и информация о зонах">
          <div className="rounded-3xl bg-white p-5 shadow-sm"><label htmlFor="island-search" className="mb-2 block text-sm font-bold">Найти место</label><input id="island-search" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Например, Atlantis..." className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-cyan-700"/><div className="mt-4 flex flex-wrap gap-2">{(Object.keys(LABELS) as Category[]).map(id=><button key={id} type="button" aria-pressed={category===id} onClick={()=>setCategory(id)} className={`rounded-full px-3 py-2 text-xs font-bold transition ${category===id?'bg-cyan-800 text-white':'bg-slate-100 text-slate-600 hover:bg-cyan-50'}`}>{LABELS[id]}</button>)}</div></div>
          <div className="max-h-60 overflow-auto rounded-3xl bg-white p-3 shadow-sm" aria-label="Список районов">{matches.length?matches.map(({d,i})=><button key={d.name} type="button" onClick={()=>choose(i)} aria-pressed={selected===i} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-cyan-50 ${selected===i?'bg-cyan-50':''}`}><span className="text-2xl">{d.icon}</span><span className="flex-1 text-sm font-semibold">{d.name}</span><span className="text-cyan-700">›</span></button>):<p className="px-3 py-8 text-center text-sm text-slate-500">Ничего не найдено. Попробуйте другой запрос.</p>}</div>
          {picked&&<article aria-live="polite" className="rounded-3xl bg-[#073c47] p-6 text-white shadow-lg"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-200">{picked.caption}</p><div className="mt-3 flex items-center gap-3"><span className="text-4xl">{picked.icon}</span><h2 className="text-2xl font-extrabold">{picked.name}</h2></div><p className="mt-4 text-sm leading-6 text-cyan-50/90">{picked.description}</p><p className="mt-4 text-xs text-cyan-200">Площадь на острове: {island.classes[selected!].areaHa.toLocaleString('ru-RU')} га</p><a href={pth(island.classes[selected!].id)} className="mt-6 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-cyan-900 hover:bg-cyan-100">Подробнее о зоне ↗</a></article>}
        </aside>
      </div>
      <p className="mt-6 max-w-3xl text-xs leading-5 text-slate-500">Это демонстрационная карта вымышленного курорта. Контуры зон приблизительные; пешеходные маршруты и время поездок пока не рассчитываются.</p>
    </section>
  </main>
}
