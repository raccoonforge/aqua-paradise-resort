import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import island from '../data/island-map-v0.4.json'
import { details } from './map/destinations'
import { WIDTH, HEIGHT, project, contourPath } from './map/geometry'
import { ResortScene, type SceneKind } from './map/ResortArtwork'
import './map/island-map.css'

type Category = 'all' | 'adventure' | 'relax' | 'family'
type View = { x:number; y:number; scale:number }
const LABELS:Record<Category,string>={all:'Все места',adventure:'Приключения',relax:'Отдых',family:'Для семьи'}
const kinds:SceneKind[]=['gateway','market','gardens','family','spa','pirates','atlantis','slides','beach','hotel']
const colors=['#b9c590','#d7c69a','#7aa47c','#a4c5a1','#a8c2a7','#b3bd8b','#91b3a7','#8eaa83','#edd5a2','#bcc3a1','#c8c5a0','#608f70']
const coast=contourPath()
const regions=island.classes.map((c,i)=>({id:c.id,path:contourPath(i),color:colors[i]}))
const pins=island.pins.map(p=>({...p,...project(p.point),index:island.classes.findIndex(c=>c.id===p.id)}))
const link=(id:string)=>id==='grand-hotel-villas'?'/hotel':'/zones?zone='+id.replace('-onshore','')
const clamp=(v:number,min:number,max:number)=>Math.min(max,Math.max(min,v))
const bounded=(v:View):View=>({...v,x:clamp(v.x,-WIDTH*v.scale*.65,WIDTH*v.scale*.65),y:clamp(v.y,-HEIGHT*v.scale*.65,HEIGHT*v.scale*.65)})
const trees=island.runs.flatMap(([x,y,t,n],i)=>{
 if(i%5!==0||n<4)return []
 return [0,1].map(k=>{const p=project([x+20+((i*37+k*113)%(n*20-20)),y+10]);return {...p,t,key:`${i}-${k}`}})
})

export default function IslandMap() {
 const [selected,setSelected]=useState<number|null>(null)
 const [search,setSearch]=useState('')
 const [category,setCategory]=useState<Category>('all')
 const [view,setView]=useState<View>({x:0,y:0,scale:1})
 const [layer,setLayer]=useState(false)
 const [expanded,setExpanded]=useState(false)
 const [routeInfo,setRouteInfo]=useState(false)
 const [dragging,setDragging]=useState(false)
 const [displayRatio,setDisplayRatio]=useState(1)
 const [mobile,setMobile]=useState(false)
 const viewport=useRef<HTMLDivElement>(null)
 const heading=useRef<HTMLHeadingElement>(null)
 const points=useRef(new Map<number,{x:number;y:number}>())
 const gesture=useRef<{view:View;center:{x:number;y:number};distance:number;count:number}|null>(null)
 const moved=useRef(false)
 const current=useRef(view)
 const drawerOffset=useRef(0)
 useEffect(()=>{drawerOffset.current=mobile&&expanded?120/displayRatio:0},[mobile,expanded,displayRatio])
 useEffect(()=>{
   const el=viewport.current!
   const update=()=>{setDisplayRatio(Math.min(el.clientWidth/WIDTH,el.clientHeight/HEIGHT));setMobile(window.matchMedia('(max-width: 760px)').matches)}
   update()
   const observer=new ResizeObserver(update);observer.observe(el)
   return ()=>observer.disconnect()
 },[])
 useEffect(()=>{current.current=view},[view])
 const matches=useMemo(()=>details.map((d,i)=>({d,i})).filter(({d})=>(category==='all'||d.category===category)&&`${d.name} ${d.caption} ${d.description}`.toLocaleLowerCase('ru').includes(search.toLocaleLowerCase('ru').trim())),[search,category])
 const visible=new Set(matches.map(m=>m.i))
 const picked=selected===null?null:details[selected]
 const toSvg=(x:number,y:number)=>{
   const rect=viewport.current!.getBoundingClientRect(),ratio=Math.min(rect.width/WIDTH,rect.height/HEIGHT)
   return {x:(x-rect.left-(rect.width-WIDTH*ratio)/2)/ratio,y:(y-rect.top-(rect.height-HEIGHT*ratio)/2)/ratio+(mobile&&expanded?120/ratio:0)}
 }
 const zoomAt=(factor:number,point={x:WIDTH/2,y:HEIGHT/2})=>setView(v=>{
   const scale=clamp(v.scale*factor,.8,3.5),ratio=scale/v.scale
   return bounded({scale,x:(point.x-WIDTH/2)*(1-ratio)+v.x*ratio,y:(point.y-HEIGHT/2)*(1-ratio)+v.y*ratio})
 })
 // A native non-passive handler prevents Ctrl-wheel browser zoom only inside this canvas.
 useEffect(()=>{
   const el=viewport.current!
   const wheel=(event:WheelEvent)=>{
     if(!event.ctrlKey&&!event.metaKey)return
     event.preventDefault()
     const rect=el.getBoundingClientRect(),ratio=Math.min(rect.width/WIDTH,rect.height/HEIGHT)
     const p={x:(event.clientX-rect.left-(rect.width-WIDTH*ratio)/2)/ratio,y:(event.clientY-rect.top-(rect.height-HEIGHT*ratio)/2)/ratio+drawerOffset.current}
     const factor=Math.exp(-event.deltaY*.004)
     setView(v=>{const scale=clamp(v.scale*factor,.8,3.5),r=scale/v.scale;return bounded({scale,x:(p.x-WIDTH/2)*(1-r)+v.x*r,y:(p.y-HEIGHT/2)*(1-r)+v.y*r})})
   }
   el.addEventListener('wheel',wheel,{passive:false})
   return ()=>el.removeEventListener('wheel',wheel)
 },[])
 const begin=()=>{
   const p=[...points.current.values()]
   if(!p.length){gesture.current=null;setDragging(false);return}
   gesture.current={view:current.current,center:p.length>1?{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2}:p[0],distance:p.length>1?Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y):0,count:p.length}
 }
 const down=(e:PointerEvent<HTMLDivElement>)=>{
   if(e.button!==0)return
   if(points.current.size===0)moved.current=false
   points.current.set(e.pointerId,toSvg(e.clientX,e.clientY))
   // Capture on the target preserves marker clicks while keeping off-canvas drags.
   ;(e.target as Element).setPointerCapture(e.pointerId)
   begin()
 }
 const move=(e:PointerEvent<HTMLDivElement>)=>{
   if(!points.current.has(e.pointerId)||!gesture.current)return
   points.current.set(e.pointerId,toSvg(e.clientX,e.clientY))
   const p=[...points.current.values()],g=gesture.current
   const center=p.length>1?{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2}:p[0]
   const dx=center.x-g.center.x,dy=center.y-g.center.y
   if(Math.hypot(dx,dy)>4||p.length>1){moved.current=true;setDragging(true)}
   if(!moved.current)return
   const scale=p.length>1&&g.distance?clamp(g.view.scale*Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)/g.distance,.8,3.5):g.view.scale
   const r=scale/g.view.scale
   const next=bounded({scale,x:dx+(g.center.x-WIDTH/2)*(1-r)+g.view.x*r,y:dy+(g.center.y-HEIGHT/2)*(1-r)+g.view.y*r})
   current.current=next;setView(next)
 }
 const end=(e:PointerEvent<HTMLDivElement>)=>{points.current.delete(e.pointerId);begin()}
 const choose=(index:number,keyboard=false)=>{
   if(!keyboard&&moved.current)return
   setSelected(index);setExpanded(true);setRouteInfo(false)
   const pin=pins.find(p=>p.index===index)!,scale=1.65
   setView(bounded({scale,x:(WIDTH/2-pin.x)*scale,y:(HEIGHT/2-pin.y)*scale}))
   requestAnimationFrame(()=>heading.current?.focus({preventScroll:true}))
 }
 const back=()=>{setSelected(null);setRouteInfo(false);requestAnimationFrame(()=>document.getElementById('island-search')?.focus({preventScroll:true}))}
 return <main className="island-page">
  <div className="map-intro"><div><p className="map-eyebrow">AQUA PARADISE · ISLAND GUIDE</p><h1>Ваш остров открытий<span>.</span></h1><p>От первого всплеска до заката у моря — найдите своё место в раю.</p></div><div className="map-intro-note"><span>09:00 — 22:00</span><small>9 тематических зон · 1 остров</small></div></div>
  <div className="map-layout">
   <section className="map-canvas" aria-label="Интерактивная карта острова">
    <div className="map-canvas-title"><span className="map-dot"/> AQUA PARADISE <span className="map-canvas-subtitle">Остров впечатлений</span></div>
    <div ref={viewport} className={`map-viewport ${dragging?'is-dragging':''}`} tabIndex={0} role="group" aria-label="Карта. Стрелки — перемещение, плюс и минус — масштаб, Home — весь остров" onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={e=>{if(points.current.has(e.pointerId))end(e)}} onClickCapture={e=>{if(e.detail>0&&moved.current){e.stopPropagation();moved.current=false}}} onKeyDown={e=>{
      if(e.target!==e.currentTarget)return
      if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))e.preventDefault()
      if(e.key==='+'||e.key==='=')zoomAt(1.2)
      if(e.key==='-')zoomAt(1/1.2)
      if(e.key==='Home')setView({x:0,y:0,scale:1})
      if(e.key.startsWith('Arrow'))setView(v=>bounded({...v,x:v.x+(e.key==='ArrowLeft'?40:e.key==='ArrowRight'?-40:0),y:v.y+(e.key==='ArrowUp'?40:e.key==='ArrowDown'?-40:0)}))
    }}>
     <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className={`island-svg ${view.scale<1.5?'map-overview':''}`} aria-label="Объёмная иллюстративная карта девяти зон и отеля">
      <defs>
       <radialGradient id="map-sea"><stop stopColor="#a1ddd5"/><stop offset=".6" stopColor="#64c2c4"/><stop offset="1" stopColor="#399ba9"/></radialGradient>
       <pattern id="map-waves" width="83" height="67" patternUnits="userSpaceOnUse"><path d="M5 23q13 6 27 0M45 51q10 5 20 0" stroke="#e6ffff" strokeWidth="1" opacity=".23" fill="none"/></pattern>
       <filter id="map-shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="2" dy="18" stdDeviation="14" floodColor="#15555c" floodOpacity=".3"/></filter>
       <filter id="scene-shadow" x="-30%" y="-70%" width="170%" height="220%"><feDropShadow dx="4" dy="6" stdDeviation="3" floodColor="#244b3c" floodOpacity=".18"/></filter>
       <clipPath id="map-land"><path d={coast}/></clipPath>
       <g id="map-tree"><ellipse cy="5" rx="8" ry="3" fill="#244d3d" opacity=".13"/><path d="M0 0v-13" stroke="#827550" strokeWidth="2"/><ellipse cy="-15" rx="8" ry="11" fill="#42775a"/><ellipse cx="-2" cy="-18" rx="5" ry="7" fill="#72a274"/></g>
      </defs>
      <rect width={WIDTH} height={HEIGHT} fill="transparent"/><rect width={WIDTH} height={HEIGHT} fill="url(#map-waves)"/>
      <g className={`map-world ${dragging?'no-transition':''}`} transform={`translate(${WIDTH/2+view.x} ${HEIGHT/2+view.y-(mobile&&expanded?120/displayRatio:0)}) scale(${view.scale}) translate(${-WIDTH/2} ${-HEIGHT/2})`}>
       <path d={coast} fill="none" stroke="#b5e4d7" strokeWidth="59" opacity=".2"/>
       <path d={coast} fill="none" stroke="#c5ede1" strokeWidth="32" opacity=".5"/>
       <path d={coast} fill="#9f9970" stroke="#65978a" strokeWidth="10" transform="translate(0 13)" filter="url(#map-shadow)"/>
       <path d={coast} fill="#f0ddb1" stroke="#f8ebc9" strokeWidth="14"/>
       <g clipPath="url(#map-land)">{regions.map((r,i)=><path key={r.id} d={r.path} fill={r.color} fillRule="evenodd" stroke={r.color} strokeWidth=".5" opacity={i<10&&!visible.has(i)?.35:1}/>)}
       <g pointerEvents="none">{trees.map(t=><use key={t.key} href="#map-tree" x={t.x} y={t.y} opacity={t.t===10?.35:.8}/>)}</g></g>
       {layer&&regions.slice(0,10).map((r,i)=><path key={r.id} d={r.path} fill="none" stroke={selected===i?'#fff7d8':'#2c665b'} strokeWidth={selected===i?3:1.2} strokeDasharray="5 4" opacity=".75" pointerEvents="none"/>)}
       <g pointerEvents="none" filter="url(#scene-shadow)">{[...pins].sort((a,b)=>a.y-b.y).map(p=><g key={p.id} transform={`translate(${p.x} ${p.y-8}) scale(.67)`} opacity={visible.has(p.index)?1:.3}><ResortScene kind={kinds[p.index]}/></g>)}</g>
       {/* Arrival illustrations stay attached to the gateway district, not old graph coordinates. */}
       <g aria-hidden="true" pointerEvents="none" transform={`translate(${pins[0].x} ${pins[0].y})`}><path d="M-20 35-68 105" stroke="#716f5a" strokeWidth="2"/><path d="M-15 38-63 108" stroke="#d1d7bf" strokeWidth="1"/><g transform="translate(-48 78)"><rect x="-7" y="-4" width="16" height="12" rx="3" fill="#f2d0a0"/><rect x="-5" y="-2" width="12" height="6" rx="1" fill="#4b8184"/></g><path d="m56 35 40 32-9 11-40-33Z" fill="#b89e73"/><path d="m94 77 23 4 15-6-22-5Z" fill="#fff0ce"/><path d="m105 72 4-7 12 3 4 6Z" fill="#bfdad1"/></g>
       {pins.map(p=>{const d=details[p.index],active=selected===p.index,v=visible.has(p.index);return <g key={p.id} transform={`translate(${p.x} ${p.y+35}) scale(${Math.max(1,.85/displayRatio)/view.scale})`} className={`map-pin ${active?'is-selected':''}`} role="button" tabIndex={v?0:-1} aria-hidden={!v} aria-label={`Выбрать зону ${d.name}`} aria-pressed={active} opacity={v?1:0} pointerEvents={v?'auto':'none'} onClick={()=>choose(p.index)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(p.index,true)}}}>
        <title>{d.name} — {d.caption}</title><rect x="-18" y="-18" width="36" height="36" rx="18" fill={active?'#143f39':'#fffcf1'} stroke={active?'#f4d599':'#fff'} strokeWidth="2"/><text textAnchor="middle" y="5" fontSize="13" fontWeight="700" fill={active?'#fff1c6':'#245d51'}>{String(p.index+1).padStart(2,'0')}</text>
        <text className="map-pin-label" textAnchor="middle" y="33" fill="#183e36" stroke="#f8f3dd" strokeWidth="5" paintOrder="stroke" fontSize="13" fontWeight="700">{d.name}</text>
       </g>})}
      </g>
     </svg>
    </div>
    <div className="map-compass" aria-hidden="true"><span>N</span><svg width="32" height="40" viewBox="0 0 32 40"><path d="m22 4-18 27 14-7 8 9Z" fill="#32675d"/><path d="m22 4-4 20 8 9Z" fill="#a8c8b5"/></svg></div>
    <div className="map-legend"><span><i style={{background:'#719775'}}/>Сады и природа</span><span><i style={{background:'#70c6cf'}}/>Водные развлечения</span><span><i style={{background:'#eed5a1'}}/>Побережье</span></div>
    <div className="map-controls" onPointerDown={e=>e.stopPropagation()}><button aria-label="Приблизить карту" onClick={()=>zoomAt(1.25)} disabled={view.scale>=3.5}>+</button><output aria-live="polite">{Math.round(view.scale*100)}%</output><button aria-label="Отдалить карту" onClick={()=>zoomAt(.8)} disabled={view.scale<=.8}>−</button><span/><button aria-label="Показать весь остров" onClick={()=>setView({x:0,y:0,scale:1})}>⌖</button><button aria-label="Показать границы зон" aria-pressed={layer} onClick={()=>setLayer(!layer)}>▱</button></div>
    <div className="map-canvas-footer"><span>КОНЦЕПТУАЛЬНЫЙ ПЛАН · V0.4</span><span className="desktop-map-hint">Перетаскивайте · Ctrl + колесо для масштаба</span><span className="mobile-map-hint">Два пальца — масштаб</span></div>
   </section>
   <aside className={`map-panel ${expanded?'is-expanded':''}`} aria-label="Путеводитель по острову" onKeyDown={e=>{if(e.key==='Escape'){if(picked)back();else setExpanded(false)}}}>
    <button className="map-sheet-toggle" aria-expanded={expanded} aria-controls="map-panel-content" onClick={()=>setExpanded(!expanded)}><span/>{expanded?'Свернуть путеводитель':'Открыть путеводитель'}<b>{picked?picked.name:`${matches.length} мест`}</b></button>
    <div id="map-panel-content" className="map-panel-content">
    {picked&&selected!==null?<>
     <button className="map-back" onClick={back}>← Назад к объектам</button>
     <div className="map-detail-art"><svg viewBox="-125 -115 250 235" aria-hidden="true"><ResortScene kind={kinds[selected]}/></svg><span>{String(selected+1).padStart(2,'0')} / ISLAND COLLECTION</span></div>
     <p className="map-eyebrow">{picked.caption}</p><h2 ref={heading} tabIndex={-1} className="map-detail-title">{picked.name}</h2>
     <div className="map-detail-tags"><span>{selected===9?'Отель · 5★':LABELS[picked.category]}</span><span>{island.classes[selected].areaHa.toLocaleString('ru-RU')} га</span></div>
     <p className="map-description">{picked.description}</p>
     {selected===9&&<p className="map-private-note">Территория для гостей отеля. Общественный транзит через виллы не предусмотрен.</p>}
     <button className="map-route-button" aria-expanded={routeInfo} onClick={()=>setRouteInfo(!routeInfo)}>↗ Маршрут к месту</button>
     {routeInfo&&<div className="map-route-note" role="status"><strong>Навигация готовится</strong><p>Пешеходные дорожки и схема Paradise Loop ещё не проверены. Построение маршрута, расстояние и время в пути появятся после проверки сети.</p></div>}
     <a className="map-detail-link" href={link(island.classes[selected].id)}>Подробнее {selected===9?'об отеле':'о зоне'} ↗</a>
     <p className="map-unavailable-note">Разделы зон и отеля ещё в разработке.</p>
    </>:<>
     <div className="map-panel-heading"><div><p className="map-eyebrow">НАЙДИТЕ СВОЙ РАЙ</p><h2>Исследуйте остров</h2></div><span>10</span></div>
     <label className="map-search" htmlFor="island-search"><span aria-hidden="true">⌕</span><input id="island-search" type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Название или впечатление"/><span className="sr-only">Найти место на острове</span></label>
     <div className="map-filters" aria-label="Категории мест">{(Object.keys(LABELS) as Category[]).map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{LABELS[c]}</button>)}</div>
     <p className="map-results" role="status">{matches.length?`Найдено мест: ${matches.length}`:'Ничего не найдено'}</p>
     <div className="map-destinations">{matches.map(({d,i})=><button className="map-destination" key={d.name} onClick={()=>{moved.current=false;choose(i)}}><span className="map-list-number">{String(i+1).padStart(2,'0')}</span><span><strong>{d.name}</strong><small>{d.caption}</small></span><span className="map-list-arrow">↗</span></button>)}</div>
     {!matches.length&&<div className="map-empty"><p>Попробуйте «пляж», «сады» или «Atlantis».</p><button onClick={()=>{setCategory('all');setSearch('')}}>Сбросить поиск и фильтры</button></div>}
     <div className="map-panel-note"><span>✧</span><p>Начните с любопытства.<br/>Выберите место — остальное подождёт.</p></div>
    </>}
    </div>
   </aside>
  </div>
  <p className="map-disclaimer">Вымышленный курорт · Иллюстрации объектов условны и не в масштабе. Положение зон соответствует модели v0.4. Дорожная сеть, отдельные аттракционы и остановки ещё не привязаны к проверенным координатам.</p>
 </main>
}
