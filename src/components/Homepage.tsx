import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import Hero from "./Hero";
import { interests, rides, scene, suggestDay, zones } from "../data/homepage";
const logo = "/media/brand.webp";
import "./homepage.css";

const photos = [
  ["ocean-bay", "Ocean Bay", "Там, где начинается рай"],
  ["adrenaline-peak", "Adrenaline Peak", "Почувствуй силу приключений"],
  ["eden-gardens", "Eden Gardens", "Найди гармонию с природой"],
  ["grand-hotel", "Paradise Grand Hotel", "Искусство безупречного отдыха"],
];
function About() {
  const [spread, setSpread] = useState<number[]>([]);
  const start = useRef({ x: 0, y: 0 });
  const [drag, setDrag] = useState({ x: 0, y: 0 });
  const active = photos.findIndex((_, i) => !spread.includes(i));
  const move = (i: number) => {
    setSpread((s) => (s.includes(i) ? s : [...s, i]));
    setDrag({ x: 0, y: 0 });
  };
  function release(e: PointerEvent<HTMLButtonElement>, i: number) {
    if (
      Math.abs(e.clientX - start.current.x) > 45 ||
      Math.abs(e.clientY - start.current.y) > 65
    )
      move(i);
    setDrag({ x: 0, y: 0 });
  }
  return (
    <section
      id="about"
      className={`about-section ${spread.length === 4 ? "is-revealed" : ""}`}
      aria-labelledby="about-heading"
    >
      <div className="section-top reveal">
        <span className="eyebrow">A LITTLE CLOSER TO PARADISE</span>
        <span className="section-index">01 / ЗНАКОМСТВО</span>
      </div>
      <div className="polaroid-stage">
        <div
          className={`about-copy ${spread.length === 4 ? "shown" : ""}`}
          aria-hidden={spread.length !== 4}
        >
          <p className="eyebrow">ABOUT THE RESORT</p>
          <h2 id="about-heading">
            Один остров.
            <br />
            <em>Девять миров</em>
            <br />
            впечатлений.
          </h2>
          <p>
            Aqua Paradise — тропический остров, где приключения встречаются с
            безмятежным пляжем, живой природой и искусством безупречного отдыха.
          </p>
          <div className="resort-stats">
            <div>
              <strong>9</strong>
              <span>тематических зон</span>
            </div>
            <div>
              <strong>
                600 <small>га</small>
              </strong>
              <span>суши острова · 6 км²</span>
            </div>
            <div>
              <strong>09–22</strong>
              <span>часы работы курорта</span>
            </div>
          </div>
        </div>
        {photos.map(([image, name, caption], i) => (
          <button
            key={name}
            className={`polaroid photo-${i} ${spread.includes(i) ? "is-spread" : ""}`}
            style={
              {
                "--order": i,
                zIndex: spread.includes(i) ? 1 : 6 - i,
                ...(i === active
                  ? { "--drag-x": `${drag.x}px`, "--drag-y": `${drag.y}px` }
                  : {}),
              } as CSSProperties
            }
            onClick={() => move(i)}
            onPointerDown={(e) => {
              if (i !== active) return;
              start.current = { x: e.clientX, y: e.clientY };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (
                i === active &&
                e.currentTarget.hasPointerCapture(e.pointerId) &&
                Math.abs(e.clientX - start.current.x) > 12
              )
                setDrag({ x: e.clientX - start.current.x, y: 0 });
            }}
            onPointerUp={(e) => release(e, i)}
            onPointerCancel={() => setDrag({ x: 0, y: 0 })}
            aria-label={`${name} — ${caption}. ${spread.includes(i) ? "Снимок раскрыт" : "Разложить снимок"}`}
          >
            <img loading="lazy" src={scene(image)} alt="" draggable="false" />
            <span>{name}</span>
            <small>{caption}</small>
            <i aria-hidden="true">0{i + 1}</i>
          </button>
        ))}
      </div>
      <div className="photo-instructions">
        <p>
          {spread.length === 4
            ? "Каждому — свой уголок рая."
            : `Смахните снимок — откройте остров · ${spread.length} / 4`}
        </p>
        <button
          onClick={() =>
            spread.length === 4 ? setSpread([]) : setSpread([0, 1, 2, 3])
          }
        >
          {spread.length === 4 ? "Собрать снимки" : "Раскрыть всё"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}
function ZoneShowcase() {
  const [index, setIndex] = useState(8);
  const zone = zones[index];
  const x = useRef(0);
  const selected = useRef<HTMLButtonElement>(null);
  const change = (n: number) => setIndex((n + zones.length) % zones.length);
  useEffect(() => {
    const button = selected.current;
    if (button) {
      const parent = button.parentElement!;
      parent.scrollTo({
        left:
          button.offsetLeft -
          parent.offsetLeft -
          parent.clientWidth / 2 +
          button.clientWidth / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }, [index]);
  return (
    <section
      id="zones"
      className="zones-section"
      style={{ "--zone-accent": zone.accent } as CSSProperties}
      aria-labelledby="zones-heading"
    >
      <div
        className="zone-backdrop"
        key={zone.slug}
        style={{ backgroundImage: `url(${scene(zone.slug)})` }}
      />
      <div className="zone-shade" />
      <div className="zone-light" aria-hidden="true" />
      <div
        className="zone-main"
        onTouchStart={(e) => {
          x.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - x.current;
          if (Math.abs(delta) > 60) change(index + (delta < 0 ? 1 : -1));
        }}
      >
        <div className="section-top">
          <span className="eyebrow">EXPLORE THE ISLAND</span>
          <span className="section-index">02 / ДЕВЯТЬ МИРОВ</span>
        </div>
        <p className="zone-intro" id="zones-heading">
          Девять миров. Тысячи впечатлений.
        </p>
        <div
          className="zone-copy"
          key={zone.name}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="zone-number">
            {String(index + 1).padStart(2, "0")} <i>/ 09</i>
          </span>
          <h2>{zone.name}</h2>
          <p>{zone.description}</p>
          <ul>
            {zone.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a
            href={`/zones?zone=${zone.slug}`}
            className="resort-button outline"
          >
            Подробнее о зоне <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="zone-controls">
          <button
            className="circle-button"
            aria-label="Предыдущая зона"
            onClick={() => change(index - 1)}
          >
            ←
          </button>
          <button
            className="circle-button"
            aria-label="Следующая зона"
            onClick={() => change(index + 1)}
          >
            →
          </button>
        </div>
      </div>
      <div
        className="zone-strip"
        role="group"
        aria-label="Выберите тематическую зону"
      >
        {zones.map((z, i) => (
          <button
            key={z.slug}
            ref={i === index ? selected : undefined}
            className={i === index ? "selected" : ""}
            aria-pressed={i === index}
            onClick={() => change(i)}
          >
            <img src={scene(z.slug)} alt="" loading="lazy" />
            <span>
              <small>0{i + 1}</small>
              {z.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
function Attractions() {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const move = (i: number) => {
    const n = (i + rides.length) % rides.length;
    const card = cards.current[n];
    if (card && track.current) {
      track.current.scrollTo({
        left:
          card.offsetLeft -
          track.current.offsetLeft -
          (track.current.clientWidth - card.clientWidth) / 2,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  };
  return (
    <section
      id="attractions"
      className="attractions-section"
      aria-labelledby="rides-heading"
    >
      <div className="section-top reveal">
        <span className="eyebrow">FIND YOUR ADVENTURE</span>
        <span className="section-index">03 / АТТРАКЦИОНЫ</span>
      </div>
      <div className="section-heading reveal">
        <div>
          <h2 id="rides-heading">
            Впечатления,
            <br />
            <em>от которых захватывает дух.</em>
          </h2>
          <p>
            От первого всплеска до большой смелости. Какое приключение выберете
            вы?
          </p>
        </div>
        <div className="carousel-arrows">
          <button
            className="circle-button"
            aria-label="Предыдущий аттракцион"
            onClick={() => move(index - 1)}
          >
            ←
          </button>
          <button
            className="circle-button"
            aria-label="Следующий аттракцион"
            onClick={() => move(index + 1)}
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="ride-track"
        role="region"
        aria-roledescription="карусель"
        aria-label="Аттракционы"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(index + (e.key === "ArrowRight" ? 1 : -1));
          }
        }}
        onScroll={() => {
          if (!track.current) return;
          const middle =
            track.current.scrollLeft + track.current.clientWidth / 2;
          let nearest = 0;
          cards.current.forEach((card, i) => {
            if (
              card &&
              Math.abs(
                card.offsetLeft -
                  track.current!.offsetLeft +
                  card.clientWidth / 2 -
                  middle,
              ) <
                Math.abs(
                  (cards.current[nearest]?.offsetLeft ?? 0) -
                    track.current!.offsetLeft +
                    (cards.current[nearest]?.clientWidth ?? 0) / 2 -
                    middle,
                )
            )
              nearest = i;
          });
          setIndex(nearest);
        }}
      >
        {rides.map((ride, i) => (
          <article
            key={ride.slug}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className={`ride-card ${index === i ? "active" : ""}`}
            aria-label={`${i + 1} из ${rides.length}: ${ride.name}`}
          >
            <div className="ride-photo">
              <img
                src={scene(ride.image)}
                alt={ride.description}
                loading="lazy"
              />
              <span className={`intensity intensity-${i}`}>
                {ride.intensity}
              </span>
              <span className="ride-photo-number">0{i + 1}</span>
            </div>
            <div className="ride-info">
              <p className="eyebrow">{ride.zone}</p>
              <h3>{ride.name}</h3>
              <p>{ride.description}</p>
              <div className="ride-limits">
                <span>От {ride.age} лет</span>
                <span>От {ride.height} см</span>
                <a
                  href={`/attractions?ride=${ride.slug}`}
                  aria-label={`Подробнее: ${ride.name}`}
                >
                  ↗
                </a>
              </div>
              <small>{ride.note}</small>
            </div>
          </article>
        ))}
      </div>
      <div className="carousel-status" aria-live="polite">
        <span>0{index + 1} / 04</span>
        <div>
          {rides.map((ride, i) => (
            <button
              aria-label={`Показать ${ride.name}`}
              aria-pressed={i === index}
              key={ride.slug}
              onClick={() => move(i)}
            />
          ))}
        </div>
        <span>ЛИСТАЙТЕ К ПРИКЛЮЧЕНИЯМ →</span>
      </div>
    </section>
  );
}
function Planner() {
  const [selected, setSelected] = useState<string[]>([]);
  const plan = suggestDay(selected);
  return (
    <section
      id="planner"
      className="planner-section"
      aria-labelledby="planner-heading"
    >
      <div className="section-top reveal">
        <span className="eyebrow">PLAN YOUR DAY</span>
        <span className="section-index">04 / ВАШ ДЕНЬ</span>
      </div>
      <div className="planner-heading reveal">
        <span className="small-sun" aria-hidden="true">
          ✷
        </span>
        <h2 id="planner-heading">
          Собери свой
          <br />
          <em>идеальный день.</em>
        </h2>
        <p>
          Сегодня хочется всего? Так и задумано.
          <br />
          Выберите одно или несколько настроений.
        </p>
      </div>
      <div className="interest-choices" role="group" aria-label="Ваши интересы">
        {interests.map((i) => (
          <button
            key={i.id}
            aria-pressed={selected.includes(i.id)}
            onClick={() =>
              setSelected((s) =>
                s.includes(i.id) ? s.filter((v) => v !== i.id) : [...s, i.id],
              )
            }
          >
            <img loading="lazy" src={scene(i.image)} alt="" />
            <span className="interest-icon" aria-hidden="true">
              {i.icon}
            </span>
            <span>{i.label}</span>
            <i aria-hidden="true">{selected.includes(i.id) ? "✓" : "+"}</i>
          </button>
        ))}
      </div>
      <div className="plan-caption">
        <p>
          {selected.length
            ? "Ваше настроение — ваши впечатления"
            : "Немного вдохновения для первого визита"}
        </p>
        <button disabled={!selected.length} onClick={() => setSelected([])}>
          Сбросить выбор ↺
        </button>
      </div>
      <div className="day-plan" aria-live="polite" aria-atomic="true">
        {plan.map((z, i) => (
          <article
            className="day-card"
            key={`${selected.join("-")}-${i}`}
            style={{ "--order": i } as CSSProperties}
          >
            <img src={scene(z.slug)} alt="" loading="lazy" />
            <div>
              <span>{["01 / УТРО", "02 / ДЕНЬ", "03 / ВЕЧЕР"][i]}</span>
              <h3>{z.name}</h3>
              <p>
                {
                  [
                    "Начните с открытия",
                    "Погрузитесь в впечатления",
                    "Поймайте настроение острова",
                  ][i]
                }
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className="plan-bottom">
        <p>
          Пример дня для вдохновения, а не проверенный маршрут. Допуски по
          возрасту и росту, часы работы и доступность нужно учитывать отдельно.
          Время ожидания не рассчитывается.
        </p>
        <a
          className="resort-button dark"
          href={`/planner${selected.length ? "?interests=" + selected.join(",") : ""}`}
        >
          Открыть полный планировщик <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="resort-footer">
      <div className="footer-water" aria-hidden="true" />
      <div className="footer-main reveal">
        <div className="footer-brand">
          <a href="/" className="resort-brand">
            <img src={logo} alt="" />
            <span>
              Aqua Paradise<small>ISLAND RESORT</small>
            </span>
          </a>
          <h2>
            Девять миров. Один остров.
            <br />
            <em>Тысячи впечатлений.</em>
          </h2>
        </div>
        <nav aria-label="Исследовать">
          <h3>Исследовать</h3>
          <a href="#about">О курорте</a>
          <a href="#zones">Девять миров</a>
          <a href="#attractions">Аттракционы</a>
          <a href="/map">Карта острова</a>
        </nav>
        <nav aria-label="Спланировать">
          <h3>Спланировать</h3>
          <a href="/tickets">Билеты</a>
          <a href="/planner">Планировщик</a>
          <a href="/hotel">Отель</a>
          <a href="/visit#arrival">Как добраться</a>
          <a href="/visit#rules">Правила и FAQ</a>
        </nav>
        <a
          href="#main-content"
          className="footer-up"
          aria-label="Вернуться наверх"
        >
          ↑
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AQUA PARADISE</span>
        <p>
          Демонстрационный проект. Курорт, цены и услуги вымышлены. Реальные
          бронирования и платежи не осуществляются.
        </p>
        <span>MADE FOR WONDER</span>
      </div>
    </footer>
  );
}
export default function Homepage() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    root.current
      ?.querySelectorAll(".reveal,.polaroid-stage")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="homepage" ref={root}>
      <main id="main-content">
        <Hero />
        <About />
        <ZoneShowcase />
        <Attractions />
        <Planner />
      </main>
      <Footer />
    </div>
  );
}
