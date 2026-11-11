import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import {
  categories,
  findRoute,
  junctionNodes,
  places,
  type Mode,
  type Place,
  type Route,
} from "./data/map-network";
import "./components/map/premium-map.css";
import MapArtwork from "./components/map/MapArtwork";
import MapRouteLayer from "./components/map/MapRouteLayer";
import MapObjectsLayer, { AtlasGlyph } from "./components/map/MapObjectsLayer";

type View = { x: number; y: number; scale: number };
const initial: View = { x: 0, y: 0, scale: 1 };
const limit = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));
const getPlace = (id: string) =>
  [...places, ...junctionNodes].find((p) => p.id === id)!;
function Endpoint({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="pm-endpoint">
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Выберите место</option>
        {places.map((p) => (
          <option value={p.id} key={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </label>
  );
}
function PlaceDetails({
  place,
  onBack,
  onRoute,
}: {
  place: Place;
  onBack: () => void;
  onRoute: (id: string) => void;
}) {
  return (
    <section className="pm-details">
      <button className="pm-back" onClick={onBack}>
        ← Назад к объектам
      </button>
      <div className="pm-detail-image">
        <MapArtwork focus={place.point} selected={place.id} />
      </div>
      <p className="pm-eyebrow">{categories[place.category]}</p>
      <h2>{place.name}</h2>
      <p>{place.description}</p>
      <button className="pm-primary" onClick={() => onRoute(place.id)}>
        Маршрут сюда
      </button>
      {place.link && <a href={place.link}>Подробнее</a>}
    </section>
  );
}
export default function MapPage() {
  const [selected, setSelected] = useState<string | null>(null),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("all");
  const [view, setView] = useState<View>(initial),
    [expanded, setExpanded] = useState(false),
    [tab, setTab] = useState<"places" | "route">("places");
  const [from, setFrom] = useState("gateway"),
    [to, setTo] = useState(""),
    [mode, setMode] = useState<Mode>("walk"),
    [route, setRoute] = useState<Route | null>(null),
    [message, setMessage] = useState("");
  const [stops, setStops] = useState(true);
  const viewport = useRef<HTMLDivElement>(null),
    world = useRef<HTMLDivElement>(null),
    panelBody = useRef<HTMLDivElement>(null),
    current = useRef(view);
  useEffect(() => {
    if (panelBody.current) panelBody.current.scrollTop = 0;
  }, [tab, selected]);
  const pointers = useRef(new Map<number, { x: number; y: number }>()),
    dragged = useRef(false);
  const gesture = useRef<{
    center: { x: number; y: number };
    distance: number;
    view: View;
  } | null>(null);
  const matched = useMemo(
    () =>
      places.filter(
        (p) =>
          (category === "all" || p.category === category) &&
          `${p.name} ${p.description} ${categories[p.category]}`
            .toLocaleLowerCase("ru")
            .includes(query.trim().toLocaleLowerCase("ru")),
      ),
    [query, category],
  );
  const matching = new Set(matched.map((p) => p.id));
  // At overview scale, label boarding/exit only; intermediate stops remain
  // available in instructions, the catalogue, the stop layer and detail zoom.
  const boarding = new Set<string>(),
    alighting = new Set<string>();
  const routePins = new Set(route ? [from, to] : []);
  route?.edges.forEach((edge, index, all) => {
    if (edge.mode !== "shuttle") return;
    if (all[index - 1]?.mode !== "shuttle") {
      routePins.add(edge.from);
      boarding.add(edge.from);
    }
    if (all[index + 1]?.mode !== "shuttle") {
      routePins.add(edge.to);
      alighting.add(edge.to);
    }
    if (stops || view.scale > 1.8) {
      routePins.add(edge.from);
      routePins.add(edge.to);
    }
  });
  const apply = (v: View) => {
    const rect = viewport.current?.getBoundingClientRect();
    const w = world.current;
    const maxX =
        ((w?.offsetWidth ?? 800) * v.scale + (rect?.width ?? 800)) / 2 - 70,
      maxY =
        ((w?.offsetHeight ?? 600) * v.scale + (rect?.height ?? 600)) / 2 - 70;
    const bounded = {
      ...v,
      x: limit(v.x, -maxX, maxX),
      y: limit(v.y, -maxY, maxY),
    };
    current.current = bounded;
    setView(bounded);
  };
  const zoom = (factor: number, anchor = { x: 0, y: 0 }) => {
    const v = current.current,
      s = limit(v.scale * factor, 1, 4),
      r = s / v.scale;
    apply({
      scale: s,
      x: anchor.x - (anchor.x - v.x) * r,
      y: anchor.y - (anchor.y - v.y) * r,
    });
  };
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const wheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = element.getBoundingClientRect();
      const v = current.current,
        s = limit(v.scale * Math.exp(-e.deltaY * 0.005), 1, 4),
        r = s / v.scale;
      const x = e.clientX - rect.left - rect.width / 2,
        y = e.clientY - rect.top - rect.height / 2;
      const next = { scale: s, x: x - (x - v.x) * r, y: y - (y - v.y) * r };
      current.current = next;
      setView(next);
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, []);
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    let width = world.current?.offsetWidth ?? 0;
    const observer = new ResizeObserver(() => {
      const nextWidth = world.current?.offsetWidth ?? 0;
      if (width && nextWidth && Math.abs(width - nextWidth) > 1) {
        const ratio = nextWidth / width;
        const next = {
          ...current.current,
          x: current.current.x * ratio,
          y: current.current.y * ratio,
        };
        current.current = next;
        setView(next);
      }
      width = nextWidth;
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const begin = () => {
    const p = [...pointers.current.values()];
    gesture.current = p.length
      ? {
          view: current.current,
          center:
            p.length > 1
              ? { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 }
              : p[0],
          distance:
            p.length > 1 ? Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) : 0,
        }
      : null;
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    (e.target as Element).setPointerCapture(e.pointerId);
    begin();
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(e.pointerId) || !gesture.current) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const p = [...pointers.current.values()],
      g = gesture.current;
    const c =
      p.length > 1
        ? { x: (p[0].x + p[1].x) / 2, y: (p[0].y + p[1].y) / 2 }
        : p[0];
    const dx = c.x - g.center.x,
      dy = c.y - g.center.y;
    if (Math.hypot(dx, dy) > 4 || p.length > 1) dragged.current = true;
    if (!dragged.current) return;
    const scale =
      p.length > 1 && g.distance
        ? limit(
            (g.view.scale * Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y)) /
              g.distance,
            1,
            4,
          )
        : g.view.scale;
    const rect = viewport.current!.getBoundingClientRect(),
      r = scale / g.view.scale,
      cx = g.center.x - rect.left - rect.width / 2,
      cy = g.center.y - rect.top - rect.height / 2;
    apply({
      scale,
      x: dx + cx - (cx - g.view.x) * r,
      y: dy + cy - (cy - g.view.y) * r,
    });
  };
  const end = (e: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    begin();
  };
  const choose = (id: string) => {
    setSelected(id);
    setTab("places");
    setExpanded(true);
    const p = getPlace(id);
    const width = world.current?.offsetWidth ?? 0,
      height = world.current?.offsetHeight ?? 0;
    apply({
      scale: 1.65,
      x: (50 - p.point[0]) * width * 0.0165,
      y: (50 - p.point[1]) * height * 0.0165,
    });
  };
  const clear = () => {
    setRoute(null);
    setMessage("");
  };
  const build = () => {
    if (!from || !to) {
      setMessage("Выберите обе точки.");
      return;
    }
    const result = findRoute(from, to, mode);
    setRoute(result);
    setMessage(
      !result
        ? "Связь между точками недоступна."
        : from === to
          ? "Вы уже в выбранном месте."
          : result.fallback
            ? "Связь Paradise Loop недоступна. Показан пешеходный путь."
            : "",
    );
    apply(initial);
  };
  return (
    <main className={`pm-page ${expanded ? "pm-page--sheet-open" : ""}`}>
      <section
        className="pm-map"
        aria-label="Интерактивная карта Aqua Paradise"
      >
        <div className="pm-brand">
          <span>AQUA PARADISE</span>
          <small>ISLAND NAVIGATION</small>
        </div>
        <div
          ref={viewport}
          className="pm-viewport"
          tabIndex={0}
          role="group"
          aria-label="Карта: стрелки — перемещение; плюс и минус — масштаб; Home — весь остров"
          onClick={(e) => {
            const territory = (e.target as Element).closest("[data-territory]");
            if (territory) choose(territory.getAttribute("data-territory")!);
          }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={end}
          onPointerCancel={end}
          onLostPointerCapture={(e) => {
            if (pointers.current.has(e.pointerId)) end(e);
          }}
          onClickCapture={(e) => {
            if (e.detail > 0 && dragged.current) {
              e.stopPropagation();
              dragged.current = false;
            }
          }}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (
              [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "+",
                "=",
                "-",
                "Home",
              ].includes(e.key)
            )
              e.preventDefault();
            if (e.key === "+" || e.key === "=") zoom(1.25);
            if (e.key === "-") zoom(0.8);
            if (e.key === "Home") apply(initial);
            if (e.key.startsWith("Arrow"))
              apply({
                ...current.current,
                x:
                  current.current.x +
                  (e.key === "ArrowLeft"
                    ? 50
                    : e.key === "ArrowRight"
                      ? -50
                      : 0),
                y:
                  current.current.y +
                  (e.key === "ArrowUp" ? 50 : e.key === "ArrowDown" ? -50 : 0),
              });
          }}
        >
          <div
            ref={world}
            className="pm-world"
            data-detail={view.scale > 1.4 ? "close" : "overview"}
            style={{
              transform: `translate(calc(-50% + ${view.x}px),calc(-50% + ${view.y}px)) scale(${view.scale})`,
            }}
          >
            <MapArtwork selected={selected} />
            <MapRouteLayer route={route} stops={stops} />
            <MapObjectsLayer
              places={places.filter(
                (p) =>
                  (tab === "route" ||
                    matching.has(p.id) ||
                    routePins.has(p.id)) &&
                  (!p.id.startsWith("stop:") ||
                    stops ||
                    category === "transport" ||
                    !!query ||
                    view.scale > 1.8 ||
                    routePins.has(p.id)),
              )}
              selected={selected}
              scale={view.scale}
              onChoose={choose}
              from={route?.edges.length ? from : undefined}
              to={route?.edges.length ? to : undefined}
              boarding={boarding}
              alighting={alighting}
            />
          </div>
        </div>
        <svg
          className="pm-orientation"
          viewBox="0 0 24 42"
          role="img"
          aria-label="Север вверху"
        >
          <text
            x="12"
            y="8"
            textAnchor="middle"
            fill="currentColor"
            fontSize="7"
            fontFamily="Manrope,sans-serif"
          >
            N
          </text>
          <path
            d="M12 35V16M8 23L12 16L16 23"
            fill="none"
            stroke="currentColor"
            strokeWidth=".8"
          />
        </svg>
        <div className="pm-controls">
          <button
            aria-label="Приблизить"
            disabled={view.scale >= 4}
            onClick={() => zoom(1.25)}
          >
            +
          </button>
          <output>{Math.round(view.scale * 100)}%</output>
          <button
            aria-label="Отдалить"
            disabled={view.scale <= 1}
            onClick={() => zoom(0.8)}
          >
            −
          </button>
          <button
            aria-label="Показать весь остров"
            onClick={() => apply(initial)}
          >
            ⌖
          </button>
          <button
            aria-label="Линия и остановки Paradise Loop"
            aria-pressed={stops}
            onClick={() => setStops(!stops)}
          >
            <AtlasGlyph id="stop:legend" />
          </button>
        </div>
        <div className="pm-legend">
          <span>
            <i className="pm-key-walk" />
            Пешком
          </span>
          <span>
            <i className="pm-key-loop" />
            Paradise Loop · бесплатно
          </span>
          {route && <button onClick={clear}>Сбросить маршрут ×</button>}
        </div>
        <p className="pm-map-note">
          9 зон · отель · 8 остановок
          <span>Перетаскивайте · Ctrl + колесо — масштаб</span>
        </p>
      </section>
      <aside
        className={`pm-panel ${expanded ? "is-expanded" : ""}`}
        aria-label="Путеводитель и маршруты"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setExpanded(false);
            setSelected(null);
          }
        }}
      >
        <button
          className="pm-sheet-toggle"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls="pm-panel-body"
        >
          <i />
          {expanded ? "Свернуть путеводитель" : "Места и маршруты"}
          <span>
            {selected ? getPlace(selected).name : `${matched.length} мест`}
          </span>
        </button>
        <div ref={panelBody} id="pm-panel-body" className="pm-panel-body">
          <header>
            <p className="pm-eyebrow">ISLAND CONCIERGE</p>
            <h1>
              Карта острова<span>.</span>
            </h1>
            <p>Выберите место или постройте маршрут.</p>
          </header>
          <nav className="pm-tabs" aria-label="Режим путеводителя">
            <button
              aria-pressed={tab === "places"}
              onClick={() => setTab("places")}
            >
              Места
            </button>
            <button
              aria-pressed={tab === "route"}
              onClick={() => setTab("route")}
            >
              Маршрут
            </button>
          </nav>
          {tab === "places" ? (
            selected ? (
              <PlaceDetails
                place={getPlace(selected)}
                onBack={() => setSelected(null)}
                onRoute={(id) => {
                  setTo(id);
                  setSelected(null);
                  clear();
                  setTab("route");
                }}
              />
            ) : (
              <>
                <label className="pm-search">
                  <span className="sr-only">Поиск объектов и категорий</span>
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Название, пляж, транспорт…"
                  />
                </label>
                <div className="pm-filters" aria-label="Категории">
                  {Object.entries(categories).map(([id, label]) => (
                    <button
                      key={id}
                      aria-pressed={category === id}
                      onClick={() => setCategory(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="pm-count" role="status">
                  Найдено мест: {matched.length}
                </p>
                <div className="pm-catalog">
                  {matched.map((p) => (
                    <button key={p.id} onClick={() => choose(p.id)}>
                      <span className="pm-list-icon">
                        {p.category === "transport"
                          ? "S"
                          : String(places.indexOf(p) + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <strong>{p.name}</strong>
                        <small>{categories[p.category]}</small>
                      </span>
                      <b aria-hidden="true">›</b>
                    </button>
                  ))}
                </div>
                {(!matched.length || query || category !== "all") && (
                  <button
                    className="pm-back"
                    onClick={() => {
                      setQuery("");
                      setCategory("all");
                    }}
                  >
                    Сбросить поиск и фильтры
                  </button>
                )}
              </>
            )
          ) : (
            <section className="pm-routing">
              <h2>Ваш путь по острову</h2>
              <Endpoint
                label="Откуда"
                value={from}
                onChange={(v) => {
                  setFrom(v);
                  clear();
                }}
              />
              <button
                className="pm-swap"
                aria-label="Поменять точки местами"
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                  clear();
                }}
              >
                ⇅
              </button>
              <Endpoint
                label="Куда"
                value={to}
                onChange={(v) => {
                  setTo(v);
                  clear();
                }}
              />
              <fieldset>
                <legend>Способ передвижения</legend>
                {(["walk", "shuttle"] as const).map((m) => (
                  <label key={m}>
                    <input
                      type="radio"
                      name="travel"
                      checked={mode === m}
                      onChange={() => {
                        setMode(m);
                        clear();
                      }}
                    />
                    {m === "walk" ? "Пешком" : "Paradise Loop"}
                  </label>
                ))}
              </fieldset>
              <button
                className="pm-primary"
                disabled={!from || !to}
                onClick={build}
              >
                Построить маршрут
              </button>
              {message && (
                <p role="status" className="pm-result">
                  {message}
                </p>
              )}
              {route && route.edges.length > 0 && (
                <div className="pm-result" role="status">
                  <strong>
                    {route.edges.some((e) => e.mode === "shuttle")
                      ? route.edges.some((e) => e.mode === "walk")
                        ? "Paradise Loop + пешком"
                        : "Paradise Loop"
                      : "Пешеходный маршрут"}
                  </strong>
                  <p>
                    Пересадки: {route.transfers}. Посадка и выход указаны ниже.
                  </p>
                  <ol>
                    {route.edges.map((e, i) => (
                      <li key={i}>
                        <span>
                          {e.mode === "walk" ? "Пешком" : "На шаттле"}
                        </span>
                        <br />
                        {getPlace(e.from).name} → {getPlace(e.to).name}
                        {e.mode === "shuttle" &&
                          route.edges[i - 1]?.mode !== "shuttle" && (
                            <em>Посадка</em>
                          )}
                        {e.mode === "shuttle" &&
                          route.edges[i + 1]?.mode !== "shuttle" && (
                            <em>
                              Высадка
                              {route.edges[i + 1]?.mode === "walk"
                                ? " · далее пешком"
                                : ""}
                            </em>
                          )}
                      </li>
                    ))}
                  </ol>
                  <button className="pm-back" onClick={clear}>
                    Сбросить маршрут
                  </button>
                </div>
              )}
              <p className="pm-disclaimer">
                Маршрут проходит по обозначенным дорожкам. Paradise Loop —
                бесплатный электрошаттл; на карте отмечены остановки посадки и
                высадки.
              </p>
            </section>
          )}
          <footer className="pm-panel-footer">
            AQUA PARADISE · THE ISLAND COLLECTION
          </footer>
        </div>
      </aside>
    </main>
  );
}
