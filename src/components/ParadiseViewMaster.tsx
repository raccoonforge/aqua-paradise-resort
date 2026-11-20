import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { zonesData as zones } from '../data/zones';
import palm from '../assets/retro/apr-palm-logo.svg';
import './ParadiseViewMaster.css';

const icons = import.meta.glob<string>('../assets/retro/viewmaster/icon-*.webp', {
  eager: true, import: 'default',
});

const frameSlots = [8, 33, 61, 99, 125, 155, 185, 215, 242, 274, 304, 334];
const art = import.meta.glob<string>('../assets/retro/worlds/*.avif', {
  eager: true, import: 'default',
});
const previews = import.meta.glob<string>('../assets/retro/worlds/previews/*.webp', {
  eager: true, import: 'default',
});
const fullImage = (id: string) => art[`../assets/retro/worlds/${id}.avif`];
const previewImage = (id: string) => previews[`../assets/retro/worlds/previews/${id}.webp`];
const count = zones.length;
const step = 360 / count;
const half = Math.floor(count / 2);
const wrap = (n: number) => ((n % count) + count) % count;
const angleDelta = (from: number, to: number) => ((to - from + 540) % 360) - 180;
const formatNumber = (index: number) => String(index + 1).padStart(2, '0');

type Gesture = {
  id: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
  lastAngle: number;
  delta: number;
  origin: number;
  moved: boolean;
};

export default function ParadiseViewMaster() {
  const [turn, setTurn] = useState(0);
  const [dragAngle, setDragAngle] = useState<number | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const selected = wrap(turn);
  const zone = zones[selected];

  function choose(index: number) {
    setTurn(previous => previous + wrap(index - wrap(previous) + half) - half);
  }

  function navigateWithKeys(event: KeyboardEvent<HTMLElement>) {
    let next: number;
    switch (event.key) {
      case 'ArrowLeft': next = wrap(selected - 1); break;
      case 'ArrowRight': next = wrap(selected + 1); break;
      case 'Home': next = 0; break;
      case 'End': next = count - 1; break;
      default: return;
    }
    event.preventDefault();
    choose(next);
    // Keep the focused control and the selected slide together without scrolling the page.
    event.currentTarget.querySelectorAll('button')[next]?.focus({ preventScroll: true });
  }

  function start(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick.current = false;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const x = event.clientX;
    const y = event.clientY;
    if (Math.hypot(x - cx, y - cy) < width * .12) return;
    // Starting again during a transition starts from the angle currently on screen.
    const reel = event.currentTarget.firstElementChild!;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(reel).transform);
    const screenAngle = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;
    const target = -turn * step;
    gesture.current = {
      id: event.pointerId, x, y, cx, cy,
      lastAngle: Math.atan2(y - cy, x - cx) * 180 / Math.PI,
      delta: 0, origin: target + angleDelta(target % 360, screenAngle), moved: false,
    };
  }

  function move(event: PointerEvent<HTMLDivElement>) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    if (!current.moved) {
      if (Math.hypot(event.clientX - current.x, event.clientY - current.y) < 8) return;
      current.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    const x = event.clientX - current.cx;
    const y = event.clientY - current.cy;
    if (Math.hypot(x, y) < 12) return;
    const angle = Math.atan2(y, x) * 180 / Math.PI;
    current.delta += angleDelta(current.lastAngle, angle);
    current.lastAngle = angle;
    setDragAngle(current.origin + current.delta);
  }

  function finish(event: PointerEvent<HTMLDivElement>, cancelled = false) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    if (!current.moved) return;
    suppressClick.current = true;
    if (!cancelled) setTurn(Math.round(-(current.origin + current.delta) / step));
    setDragAngle(null);
  }

  return (
    <section id="worlds" tabIndex={-1} className="apr-worlds" aria-labelledby="apr-worlds-title">
      <svg className="apr-worlds__geometry" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="apr-worlds-window" clipPathUnits="objectBoundingBox">
            <path d="M.121 .095C.28 -.017 .72 -.017 .879 .095Q.945 .133 .896 .27L.68 .909Q.659 .997 .611 .971Q.5 .93 .389 .971Q.341 .997 .32 .909L.104 .27Q.055 .133 .121 .095Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="apr-worlds__tear" aria-hidden="true" />
      <div className="apr-worlds__stage">
        <header className="apr-worlds__heading">
          <h2 id="apr-worlds-title">Девять миров</h2>
          <p className="apr-worlds__resort-name">Aqua Paradise</p>
          <p className="apr-worlds__invitation">Выберите мир и загляните внутрь</p>
        </header>

        <div className="apr-worlds__photo" style={{ backgroundImage: `url("${previewImage(zone.id)}")` }}>
          <img key={zone.id} src={fullImage(zone.id)} alt={zone.poster.imageAlt} loading="lazy" decoding="async" />
        </div>
        <div className="apr-worlds__viewer">
          <div className="apr-worlds__stereo" aria-hidden="true"><span>Aqua Paradise</span></div>
          <div className="apr-worlds__flowers" aria-hidden="true" />
          <button className="apr-worlds__arrow" type="button" aria-label="Предыдущий мир" onClick={() => setTurn(n => n - 1)}><svg aria-hidden="true" viewBox="0 0 32 32"><path d="m21 6-10 10 10 10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <div className="apr-worlds__wheel">
            <div role="group" aria-label="Диск миров Aqua Paradise" className="apr-worlds__surface"
              onPointerDown={start} onPointerMove={move}
              onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)}
              onLostPointerCapture={event => { if (event.target === event.currentTarget) finish(event, true); }}
              onPointerLeave={event => { if (!gesture.current?.moved) finish(event, true); }}
              onClickCapture={event => {
                if (suppressClick.current && event.detail > 0) event.stopPropagation();
                suppressClick.current = false;
              }}
              onKeyDown={navigateWithKeys}>
              <div className={`apr-worlds__reel${dragAngle === null ? '' : ' is-dragging'}`}
                style={{
                  '--rest-angle': `${-turn * step}deg`,
                  '--reel-angle': `${dragAngle ?? -turn * step}deg`,
                } as CSSProperties}>
                <svg className="apr-worlds__rim" viewBox="0 0 640 640" aria-hidden="true">
                  <circle cx="320" cy="320" r="307" fill="none" stroke="#9c532a" strokeWidth="1.5" strokeDasharray="20 2 6 9" />
                  <circle cx="320" cy="320" r="312" fill="none" stroke="#aa60322e" strokeWidth="6" strokeDasharray="4 14 9 4" />
                  {frameSlots.map(angle => (
                    <g key={angle} transform={`rotate(${angle} 320 320)`}>
                      <rect x="303" y="4" width="34" height="14" rx="1" fill="#5c422c" stroke="#9d612e" strokeWidth="2" />
                      <path d="M305 16V9h30v7" fill="#c08c54" stroke="#f9cc89" strokeWidth="1" />
                    </g>
                  ))}
                </svg>
                {zones.map(({ id, name }, index) => (
                  <button key={id} type="button" className="apr-worlds__slide"
                    aria-label={name} aria-pressed={selected === index} tabIndex={selected === index ? 0 : -1}
                    style={{ transform: `rotate(${index * step}deg)` }} onClick={() => choose(index)}>
                    <span className="apr-worlds__window">
                      <img loading="lazy" src={previewImage(id)} alt="" draggable={false}
                        style={{ '--upright': `${(turn - index) * step}deg` } as CSSProperties} />
                    </span>
                    <span className="apr-worlds__number" style={{ rotate: `${(turn - index) * step}deg` }} aria-hidden="true">
                      {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="apr-worlds__hub" aria-hidden="true">
              <img src={palm} alt="" width={76} height={69} loading="lazy" />
              <span>Aqua<br />Paradise<small>Resort</small></span>
            </div>
            <span className="apr-worlds__marker" aria-hidden="true" />
          </div>
          <button className="apr-worlds__arrow" type="button" aria-label="Следующий мир" onClick={() => setTurn(n => n + 1)}><svg aria-hidden="true" viewBox="0 0 32 32"><path d="m11 6 10 10-10 10" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        </div>

        <article className="apr-worlds__info" aria-labelledby="apr-worlds-current">
          <div className="apr-worlds__caption" aria-live="polite" aria-atomic="true">
            {zones.map((entry, index) => {
              const active = index === selected;
              return (
                <div key={entry.id} className="apr-worlds__caption-slot" aria-hidden={active ? undefined : true}>
                  <div className="apr-worlds__label">
                    <span className="apr-worlds__stamp" aria-hidden="true">{formatNumber(index)}</span>
                    <div>
                      <h3 id={active ? 'apr-worlds-current' : undefined}>{entry.name}</h3>
                      <p className="apr-worlds__subtitle">{entry.poster.tagline}</p>
                    </div>
                  </div>
                  <p className="apr-worlds__description">{entry.poster.summary}</p>
                </div>
              );
            })}
          </div>
          <a className="apr-worlds__link" href={`#/zones?zone=${zone.id}`}>Подробнее о зоне <span aria-hidden="true">→</span></a>
        </article>
      </div>

      <div role="group" aria-label="Билеты в девять миров" className="apr-worlds__tickets" onKeyDown={navigateWithKeys}>
        {zones.map(({ id, name }, index) => (
          <button key={id} type="button" aria-pressed={selected === index} onClick={() => choose(index)}>
            {index === 2 ? (
              <svg className="apr-worlds__garden-icon" viewBox="0 0 80 52" aria-hidden="true">
                <path d="M40 46V17M40 31C29 21 25 18 16 16M40 27c11-11 16-15 26-18M40 42C28 34 22 32 11 33M40 38c10-9 18-11 30-11" />
                <path d="M16 16C10 12 9 5 10 2c8 1 13 5 14 13M16 16C11 21 5 23 2 22c1-8 6-12 14-13M66 9C66 2 72 1 78 3c-1 8-6 13-15 14M11 33C5 29 3 24 4 20c10 0 15 5 18 12M70 27c6-3 8-8 7-13-10 1-15 6-18 14" />
                <path d="M40 18c-7-5-10-10-9-15 5 0 9 3 10 8 2-6 7-9 12-9 0 6-4 11-12 16" />
                <path d="M29 48q11-7 22 0" />
              </svg>
            ) : (
              <img src={icons[`../assets/retro/viewmaster/icon-${index + 1}.webp`]} alt="" loading="lazy" />
            )}
            <span>{name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
