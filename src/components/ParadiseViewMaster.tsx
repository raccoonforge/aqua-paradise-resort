import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import logo from '../assets/retro/apr-palm-logo.svg';
import { zonesData as zones } from '../data/zones';
import './ParadiseViewMaster.css';

const ticketIcons = [
  'M3 21h26M6 21V9h6v12m0 0V4l4-2 4 2v17m0 0V9h6v12M16 6v12M9 12v6m14-6v6',
  'M3 10l3-6h20l3 6H3Zm2 1v10h22V11M9 10l2-6m6 0v6m6-6 2 6M10 21v-6h12v6',
  'M16 22C9 19 10 10 16 5c6 5 7 14 0 17Zm0 0C8 23 3 18 3 12c5 0 8 2 10 6m3 4c8 1 13-4 13-10-5 0-8 2-10 6',
  'M4 22V11h5v11m14 0V11h5v11M2 11l4-6 5 6m10 0 5-6 4 6M10 22V8h12v14M9 8l7-6 7 6M14 22v-5h4v5',
  'M5 18h22c-2 6-20 6-22 0Zm5-3q-4-3 0-6t0-5m6 11q-4-3 0-6t0-5m6 11q-4-3 0-6t0-5',
  'M16 3v16m0-15 10 11H16M4 18h24l-4 4H9l-5-4Zm10-12-7 9h7M3 24q4-3 8 0t8 0 9 0',
  'M2 8l14-5 14 5H2Zm3 3h22M4 21h24m-26 3h28M8 11v10m5-10v10m6-10v10m5-10v10',
  'M2 18c11 0 8-14 19-14 5 0 7 8 9 10M2 21h28M10 14v7m5-14v14m6-17v17m5-12v12',
  'M2 20C9 21 9 5 20 4c6-1 10 3 10 8-3-4-7-4-9-1-5 8 4 11 9 8M2 23q5-3 10 0t10 0 8 0',
];

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
        <h2 id="apr-worlds-title">9 миров <span>Aqua Paradise</span></h2>
        <p>Выберите мир и загляните внутрь</p>
      </header>

      <div className="apr-worlds__stage">
        <div className="apr-worlds__viewer">
          <div className="apr-worlds__stereo" aria-hidden="true"><span>Aqua Paradise</span><i /><i /></div>
          <button className="apr-worlds__arrow" type="button" aria-label="Предыдущий мир" onClick={() => setTurn(n => n - 1)}>‹</button>
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
                {zones.map(({ name }, index) => (
                  <button key={name} type="button" className="apr-worlds__slide"
                    aria-label={name} aria-pressed={selected === index}
                    style={{ transform: `rotate(${index * step}deg)` }} onClick={() => choose(index)}>
                    <span>{index + 1}</span>
                    <img loading="lazy" src={imageFor(index)} alt="" draggable={false} />
                  </button>
                ))}
              </div>
            </div>
            <div className="apr-worlds__hub" aria-hidden="true">
              <img src={logo} alt="" draggable={false} /><span>AQUA<br />PARADISE<small>RESORT</small></span>
            </div>
            <span className="apr-worlds__marker" aria-hidden="true" />
          </div>
          <button className="apr-worlds__arrow" type="button" aria-label="Следующий мир" onClick={() => setTurn(n => n + 1)}>›</button>
        </div>

        <article className="apr-worlds__card" aria-labelledby="apr-worlds-current">
          <div className="apr-worlds__photo">
            <img key={zone.name} loading="lazy" src={imageFor(selected)} alt={zone.name} />
          </div>
          <div className="apr-worlds__info" aria-live="polite" aria-atomic="true">
            <div key={zone.name} className="apr-worlds__caption">
              <h3 id="apr-worlds-current"><span aria-hidden="true">{selected + 1}</span>{zone.name}</h3>
              <p>{zone.desc}</p>
            </div>
          </div>
          <a className="apr-worlds__link" href={`#/zones?zone=${zone.id}`}>Подробнее о зоне <span aria-hidden="true">→</span></a>
        </article>
      </div>

      <div ref={ticketStrip} role="group" aria-label="Билеты в девять миров" className="apr-worlds__tickets">
        {zones.map(({ name }, index) => (
          <button key={name} type="button" aria-pressed={selected === index} onClick={() => choose(index)}>
            <svg aria-hidden="true" viewBox="0 0 32 26" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d={ticketIcons[index]} /></svg>
            {name}
          </button>
        ))}
      </div>
    </section>
  );
}
