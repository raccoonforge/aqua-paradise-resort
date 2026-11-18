import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { zonesData as zones } from '../data/zones';
import './ParadiseViewMaster.css';

const icons = import.meta.glob<string>('../assets/retro/viewmaster/icon-*.webp', {
  eager: true, import: 'default',
});

const zoneSubtitles = [
  'Сердце курорта', 'Вкусы острова', 'Ботанические сады', 'Детская зона',
  'Термальные бассейны', 'Бухта сокровищ', 'Затерянный город', 'Скоростные спуски', 'Морская бухта',
];

const frameSlots = [8, 33, 61, 99, 125, 155, 185, 215, 242, 274, 304, 334];

const art = import.meta.glob<string>('../assets/retro/worlds/*.webp', {
  eager: true, import: 'default',
});
const count = zones.length;
const step = 360 / count;
const wrap = (n: number) => ((n % count) + count) % count;
const angleDelta = (from: number, to: number) => ((to - from + 540) % 360) - 180;
const imageFor = (index: number) => art[`../assets/retro/worlds/${index + 1}.webp`];

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
  const ticketStrip = useRef<HTMLDivElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const selected = wrap(turn);
  const zone = zones[selected];

  useEffect(() => {
    const strip = ticketStrip.current;
    const ticket = strip?.children[selected];
    if (!strip || !ticket || strip.scrollWidth <= strip.clientWidth) return;
    const stripBox = strip.getBoundingClientRect();
    const ticketBox = ticket.getBoundingClientRect();
    if (ticketBox.left >= stripBox.left && ticketBox.right <= stripBox.right) return;
    strip.scrollLeft += ticketBox.left - stripBox.left - (strip.clientWidth - ticketBox.width) / 2;
  }, [selected]);

  function choose(index: number) {
    setTurn(previous => previous + wrap(index - wrap(previous) + 4) - 4);
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
    <section id="worlds" className="apr-worlds" aria-labelledby="apr-worlds-title">
      <header className="apr-worlds__heading">
        <h2 id="apr-worlds-title"><span className="apr-worlds__headline-art" aria-hidden="true" /><span className="apr-worlds__accessible">9 миров Aqua Paradise</span></h2>
        <p><span className="apr-worlds__invitation-art" aria-hidden="true" /><span className="apr-worlds__accessible">Выберите мир и загляните внутрь</span></p>
      </header>

      <svg className="apr-worlds__geometry" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="apr-worlds-window" clipPathUnits="objectBoundingBox">
            <path d="M.121 .095C.28 -.017 .72 -.017 .879 .095Q.945 .133 .896 .27L.68 .909Q.659 .997 .611 .971Q.5 .93 .389 .971Q.341 .997 .32 .909L.104 .27Q.055 .133 .121 .095Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="apr-worlds__stage">
        <div className="apr-worlds__viewer">
          <div className="apr-worlds__stereo" aria-hidden="true" />
          <div className="apr-worlds__flowers" aria-hidden="true" />
          <div className="apr-worlds__hinge" aria-hidden="true" />
          <button className="apr-worlds__arrow" type="button" aria-label="Предыдущий мир" onClick={() => setTurn(n => n - 1)}><svg aria-hidden="true" viewBox="0 0 32 32"><path d="M22 3 8 16l14 13" fill="none" stroke="currentColor" strokeWidth="4" /></svg></button>
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
              onKeyDown={event => {
                if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
                event.preventDefault();
                setTurn(n => n + (event.key === 'ArrowRight' ? 1 : -1));
              }}>
              <div className={`apr-worlds__reel${dragAngle === null ? '' : ' is-dragging'}`}
                style={{ transform: `rotate(${dragAngle ?? -turn * step}deg)` }}>
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
                {zones.map(({ name }, index) => (
                  <button key={name} type="button" className="apr-worlds__slide"
                    aria-label={name} aria-pressed={selected === index}
                    style={{ transform: `rotate(${index * step}deg)` }} onClick={() => choose(index)}>
                    <span className="apr-worlds__window">
                      <img loading="lazy" src={imageFor(index)} alt="" draggable={false}
                        style={{ '--upright': `${(turn - index) * step}deg` } as CSSProperties} />
                    </span>
                    <span className="apr-worlds__number" style={{ rotate: `${(turn - index) * step}deg` }} aria-hidden="true">
                      {index + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <div className="apr-worlds__hub" aria-hidden="true" />
            <span className="apr-worlds__marker" aria-hidden="true" />
          </div>
          <button className="apr-worlds__arrow" type="button" aria-label="Следующий мир" onClick={() => setTurn(n => n + 1)}><svg aria-hidden="true" viewBox="0 0 32 32"><path d="m10 3 14 13-14 13" fill="none" stroke="currentColor" strokeWidth="4" /></svg></button>
        </div>

        <article className="apr-worlds__card" aria-labelledby="apr-worlds-current">
          <div className="apr-worlds__photo">
            <img key={zone.name} loading="lazy" src={imageFor(selected)} alt={zone.name} />
          </div>
          <div className="apr-worlds__info" aria-live="polite" aria-atomic="true">
            <div key={zone.name} className="apr-worlds__caption">
              <span className="apr-worlds__stamp" aria-hidden="true">{selected + 1}</span>
              <h3 id="apr-worlds-current">{zone.name}</h3>
              <p className="apr-worlds__subtitle">{zoneSubtitles[selected]}</p>
              <p className="apr-worlds__description">{zone.desc}</p>
            </div>
            <a className="apr-worlds__link" href={`#/zones?zone=${zone.id}`}>Подробнее о зоне <span aria-hidden="true">→</span></a>
          </div>
        </article>
      </div>

      <div ref={ticketStrip} role="group" aria-label="Билеты в девять миров" className="apr-worlds__tickets">
        {zones.map(({ name }, index) => (
          <button key={name} type="button" aria-pressed={selected === index} onClick={() => choose(index)}>
            <img src={icons[`../assets/retro/viewmaster/icon-${index + 1}.webp`]} alt="" loading="lazy" />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
