import { useId } from 'react';

type FilmFrame = { src: string; label: string };

const wave = (x: number) => 0.112 - 0.091 * Math.sin(2.73 * Math.PI * x + 0.39);
const filmDepth = 0.78;
const railDepth = 0.106;
const steps = 64;

function contour(offset: number, backwards = false) {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const x = (backwards ? steps - i : i) / steps;
    return `${x.toFixed(4)},${(wave(x) + offset).toFixed(4)}`;
  }).join(' L ');
}

const strip = (top: number, bottom: number) => `M ${contour(top)} L ${contour(bottom, true)} Z`;
const outline = strip(0, filmDepth);
const rails = strip(0, railDepth) + ' ' + strip(filmDepth - railDepth, filmDepth);
const tracks = `M ${contour(.003)} M ${contour(railDepth)} M ${contour(filmDepth - railDepth)} M ${contour(filmDepth - .003)}`;
const sprockets = Array.from({ length: 63 }, (_, i) => (i + .5) / 63);

type HotelFilmProps = {
  frames: FilmFrame[];
  label: string;
  selectedIndex?: number;
  onSelect?: (index: number) => void;
};

export function HotelFilm({ frames, label, selectedIndex, onSelect }: HotelFilmProps) {
  const clip = useId();
  return (
    <div className={onSelect ? 'hotel-film hotel-film--gallery' : 'hotel-film hotel-film--opening'}
      role={onSelect ? 'group' : undefined} aria-label={onSelect ? label : undefined}>
      <svg className="hotel-film__defs" width="0" height="0" aria-hidden="true">
        <defs><clipPath id={clip} clipPathUnits="objectBoundingBox"><path d={outline} /></clipPath></defs>
      </svg>
      <div className="hotel-film__body" style={{ clipPath: `url(#${clip})` }}>
        <div className="hotel-film__frames" style={{ gridTemplateColumns: `repeat(${frames.length}, minmax(0, 1fr))` }}>
          {frames.map((frame, index) => {
            const image = <img src={frame.src} alt="" width="480" height="260" loading="lazy" />;
            return onSelect ? (
              <button key={frame.src} className="hotel-film__frame" type="button" aria-pressed={index === selectedIndex}
                onClick={() => onSelect(index)}>
                {image}<span>{frame.label}</span>
              </button>
            ) : (
              <figure key={frame.src} className="hotel-film__frame">
                {image}<figcaption>{frame.label}</figcaption>
              </figure>
            );
          })}
        </div>
        <svg className="hotel-film__rails" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
          <path d={rails} fill="#2d1e15" />
          <path d={tracks} fill="none" stroke="#b27842" strokeWidth=".007" />
          {sprockets.map(x => (
            <g key={x} transform={`translate(${x} ${wave(x + .004)})`}>
              <rect x="0" y=".025" width=".0085" height=".053" rx=".0012" />
              <rect x="0" y={filmDepth - .078} width=".0085" height=".053" rx=".0012" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
