import PlannerPage from './PlannerPage';
import HotelPage from './HotelPage';
import VisitPage from './VisitPage';
import TicketsPage from './TicketsPage';
import AttractionsPage from './AttractionsPage';
import ZonesPage from './ZonesPage';
import { useState, useEffect, useRef, useMemo, type ReactNode, type CSSProperties } from 'react';
import { ZONE_SLUGS, ATTRACTIONS } from './data/attractions';

// TODO: Cinematic Intro — отложено (Visual Pending: нужны видео/3D-ассеты).
// В Master Blueprint §4.1 описан спуск по горке; без медиа делаем только Hero.

// Visual-only slot: replace its contents with a real asset in the final media phase.
type MediaPlaceholderProps = {
  mediaId: string;
  label: string;
  className?: string;
};

const MediaPlaceholder = ({ mediaId, label, className = '' }: MediaPlaceholderProps) => (
  <div className={`apr-media ${className}`} data-media-id={mediaId} aria-hidden="true">
    <div className="apr-media__mark">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
        <rect x="5" y="8" width="38" height="32" rx="3" />
        <circle cx="33" cy="18" r="4" />
        <path d="m8 36 12-14 9 10 5-6 7 10" />
      </svg>
      <span>МЕСТО ДЛЯ ФОТО</span>
      <strong>{label}</strong>
    </div>
    <span className="apr-media__id">{mediaId}</span>
  </div>
);

// APR-BUG-035: полароиды доступны с клавиатуры, можно вернуться назад и начать заново.
const AboutResort = () => {
  const photos = [
    { title: 'Ocean Bay', text: 'Там, где начинается рай', mediaId: 'home.polaroid.ocean-bay' },
    { title: 'Adrenaline Peak', text: 'Почувствуй силу приключений', mediaId: 'home.polaroid.adrenaline-peak' },
    { title: 'Eden Gardens', text: 'Найди гармонию с природой', mediaId: 'home.polaroid.eden-gardens' },
    { title: 'Paradise Grand Hotel', text: 'Искусство безупречного отдыха', mediaId: 'home.polaroid.hotel' },
  ];
  const [revealedCount, setRevealedCount] = useState(0);
  const revealNext = () => setRevealedCount(previous => Math.min(previous + 1, photos.length));
  const undoReveal = () => setRevealedCount(previous => Math.max(previous - 1, 0));

  return (
    <section id="about" className="apr-about" aria-label="О курорте">
      <div className="apr-about__frame">
        <div className="apr-about__scene">
          <div className="apr-about__copy" style={{ opacity: revealedCount / photos.length }}>
            <span className="apr-about__eyebrow">ABOUT THE RESORT</span>
            <h2 className="apr-about__heading">Не просто остров. <em>Целый мир открытий.</em></h2>
            <p className="apr-about__description">
              Девять уникальных миров, объединённых одним тропическим раем. Здесь приключения соседствуют с безмятежностью, а каждый уголок создан для незабываемых впечатлений.
            </p>
            <div className="apr-about__stats">
              <div><strong>9</strong><span>тематических зон</span></div>
              <div><strong>6 км²</strong><span>территория острова</span></div>
              <div><strong>09:00–22:00</strong><span>время работы</span></div>
            </div>
          </div>
          <div className="apr-about__photos">
            {photos.map((photo, index) => {
              const moved = index < revealedCount;
              const active = index === revealedCount;
              return (
                <button
                  type="button"
                  key={photo.mediaId}
                  className={`apr-about__polaroid apr-about__polaroid--${index + 1} ${moved ? 'is-moved' : 'is-stacked'}`}
                  style={{ zIndex: moved ? index + 1 : 10 + (photos.length - index) }}
                  onClick={active ? revealNext : undefined}
                  disabled={!active}
                  aria-label={`Открыть фотографию ${index + 1} из ${photos.length}: ${photo.title}`}
                >
                  <MediaPlaceholder mediaId={photo.mediaId} label={photo.title} className="apr-about__photo" />
                  <span className="apr-about__photo-title">{photo.title}</span>
                  <span className="apr-about__photo-caption">{photo.text}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="apr-about__controls">
          <span className="apr-about__progress" role="status" aria-live="polite">
            {revealedCount === 4 ? 'История острова открыта' : `Нажмите на верхнюю фотографию · ${revealedCount} / 4`}
          </span>
          {revealedCount > 0 && (
            <div className="apr-about__control-buttons">
              {revealedCount < 4 && <button type="button" onClick={undoReveal}>Назад</button>}
              <button type="button" onClick={() => setRevealedCount(0)}>Сначала</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const NineWorlds = () => {
  const zones = [
    { name: 'Atlantis Realm', tag: 'Исследования', desc: 'Затерянный мир древних руин, водных маршрутов и приключений среди морских легенд.', color: '#174c63' },
    { name: 'Eden Gardens', tag: 'Природа', desc: 'Тропические сады, тенистые тропы и водопады, где время словно замедляется.', color: '#285a49' },
    { name: 'Adrenaline Peak', tag: 'Экстрим', desc: 'Головокружительные спуски и захватывающие водные приключения для самых смелых.', color: '#704d3e' },
    { name: 'Ocean Bay', tag: 'Пляжный отдых', desc: 'Лазурная вода, белоснежный песок и безмятежный отдых у открытого моря.', color: '#176b76' },
    { name: 'Serenity Spa', tag: 'Релакс', desc: 'Уединённое пространство спокойствия, восстановления и премиального отдыха.', color: '#486c68' },
    { name: "Pirate's Cove", tag: 'Приключения', desc: 'Пиратские истории, спрятанные сокровища и весёлые открытия для всей семьи.', color: '#635344' },
    { name: 'Little Paradise', tag: 'Для детей', desc: 'Яркий и безопасный мир водных развлечений для самых маленьких гостей.', color: '#527f79' },
    { name: 'Paradise Market', tag: 'Гастрономия', desc: 'Ароматы островной кухни, уютные кафе и атмосферные торговые улочки.', color: '#846044' },
    { name: 'Paradise Boulevard', tag: 'Прогулки', desc: 'Праздничное сердце острова: площади, вечерние огни и незабываемые встречи.', color: '#375c61' },
  ];
  const [activeZone, setActiveZone] = useState(0);
  const zone = zones[activeZone];
  const changeZone = (index: number) => setActiveZone((index + zones.length) % zones.length);
  return (
    <section id="worlds" className="apr-worlds" aria-label="Девять миров Aqua Paradise">
      <div className="apr-worlds__frame" style={{ '--world-tone': zone.color } as CSSProperties}>
        <div className="apr-worlds__backdrops" aria-hidden="true">
          {zones.map((item, index) => (
            <div key={item.name} className={`apr-worlds__backdrop ${index === activeZone ? 'is-active' : ''}`}>
              <MediaPlaceholder mediaId={`home.zone.${ZONE_SLUGS[item.name]}`} label={item.name} className="apr-worlds__media" />
            </div>
          ))}
        </div>
        <div className="apr-worlds__shade" aria-hidden="true" />
        <div className="apr-worlds__content">
          <div className="apr-worlds__intro">
            <span className="apr-worlds__eyebrow">ТРОПИЧЕСКИЙ КУРОРТ</span>
            <h2 className="apr-worlds__heading">Девять миров.<br /><em>Aqua Paradise</em></h2>
            <p className="apr-worlds__lead">От тропических садов до затерянных цивилизаций — выбери свой мир приключений.</p>
          </div>
          <div className="apr-worlds__selected" key={zone.name}>
            <span className="apr-worlds__selected-kicker">СЕЙЧАС ВЫ В МИРЕ</span>
            <h3>{zone.name}</h3>
            <p>{zone.desc}</p>
            <div className="apr-worlds__actions">
              <button type="button" className="apr-button apr-button--sand" onClick={() => { const slug = ZONE_SLUGS[zone.name]; if (slug) window.location.hash = `#/zones?zone=${slug}`; }}>Подробнее о зоне <span aria-hidden="true">↗</span></button>
              <button type="button" className="apr-button apr-button--outline" onClick={() => window.location.hash = '#/tickets'}>Выбрать билет</button>
            </div>
          </div>
        </div>
        <div className="apr-worlds__dock">
          <span className="apr-worlds__dock-label">ДЕВЯТЬ МИРОВ AQUA PARADISE</span>
          <div className="apr-worlds__dock-row">
            <div className="apr-worlds__rail" role="group" aria-label="Выберите тематическую зону">
              {zones.map((item, index) => (
                <button key={item.name} type="button" aria-pressed={activeZone === index} onClick={() => changeZone(index)} className={`apr-worlds__tab ${activeZone === index ? 'is-active' : ''}`}>
                  <span className="apr-worlds__thumb" style={{ backgroundColor: item.color }}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></span>
                  <span className="apr-worlds__tab-copy"><strong>{item.name}</strong><small>{item.tag}</small></span>
                </button>
              ))}
            </div>
            <button type="button" className="apr-worlds__next" onClick={() => changeZone(activeZone + 1)} aria-label="Следующий мир">→</button>
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <div className="apr-home">
    <section className="apr-hero relative flex items-center justify-center overflow-hidden">
      <MediaPlaceholder mediaId="home.hero.ocean-bay" label="OCEAN BAY · ARRIVAL" className="absolute inset-0" />
      <div className="apr-hero__veil absolute inset-0 pointer-events-none" />
      <div className="apr-hero__content relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <span className="apr-eyebrow apr-hero__reveal apr-hero__reveal--eyebrow text-[#e7d7b3] mb-7">WELCOME TO AQUA PARADISE</span>
        <h1 className="apr-hero__title font-serif text-white mb-7 leading-[1.07]">
          <span className="block apr-hero__reveal apr-hero__reveal--title">Девять миров.</span> <span className="block italic font-normal apr-hero__accent apr-hero__reveal apr-hero__reveal--accent">Один рай.</span>
        </h1>
        <p className="apr-hero__description apr-hero__reveal apr-hero__reveal--description text-base sm:text-lg md:text-xl text-white/90 mb-11 max-w-2xl leading-relaxed font-light">
          От лазурных лагун и тропических садов до головокружительных водных приключений. Открой остров, где каждый момент становится особенным.
        </p>
        <div className="apr-hero__reveal apr-hero__reveal--buttons flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button type="button"
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            }}
            className="apr-button apr-button--sand">
            Исследовать остров <span aria-hidden="true">↗</span>
          </button>
          <button type="button"
            onClick={() => window.location.hash = '#/planner'}
            className="apr-button apr-button--outline">
            Спланировать отдых
          </button>
        </div>
        <div className="apr-hero__location apr-hero__reveal apr-hero__reveal--location mt-8 text-center text-[11px] sm:text-xs tracking-[0.27em] text-white/75 font-medium">
          OCEAN BAY · AQUA PARADISE
        </div>
      </div>
      <button
        type="button"
        className="apr-hero__scroll-cue"
        aria-label="Прокрутить к разделу «О курорте»"
        onClick={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }}
      >
        <svg viewBox="0 0 32 24" width="32" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 5 16 16 27 5" />
        </svg>
      </button>
    </section>
    <AboutResort />
    <NineWorlds />
    <AttractionsCarousel />
    <PlannerTeaser />
  </div>
);

const AttractionsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const rides = ['skyfall', 'poseidons-descent', 'stormbreaker', 'crystal-passage']
    .map(id => ATTRACTIONS.find(a => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const changeSlide = (step: number) => setActiveIndex(previous => (previous + step + rides.length) % rides.length);
  const activeRide = rides[activeIndex];

  return (
    <section id="attractions-showcase" className="apr-attractions" aria-label="Избранные аттракционы">
      <div className="apr-attractions__glow" aria-hidden="true" />
      <div className="apr-attractions__intro">
        <span className="apr-attractions__eyebrow">SIGNATURE EXPERIENCES</span>
        <h2>Выберите своё <em>приключение.</em></h2>
        <p>От головокружительных спусков до путешествий в затерянные миры. Найдите впечатление, которое запомнится надолго.</p>
      </div>
      <div className="apr-attractions__gallery" aria-label="Карусель аттракционов">
        <button type="button" className="apr-attractions__arrow apr-attractions__arrow--prev" onClick={() => changeSlide(-1)} aria-label="Предыдущий аттракцион">←</button>
        <div className="apr-attractions__stage">
          {rides.map((ride, index) => {
            let offset = (index - activeIndex + rides.length) % rides.length;
            if (offset > rides.length / 2) offset -= rides.length;
            const isActive = offset === 0;
            return (
              <button type="button" key={ride.id} className={`apr-attractions__card ${isActive ? 'is-active' : ''}`} style={{ '--card-offset': offset, '--card-depth': Math.abs(offset) } as CSSProperties} onClick={() => { if (!isActive) setActiveIndex(index); else window.location.hash = '#/attractions'; }} aria-label={`${ride.name}${isActive ? ', подробнее об аттракционах' : ', показать карточку'}`} aria-current={isActive ? 'true' : undefined} tabIndex={Math.abs(offset) > 1 ? -1 : 0}>
                <MediaPlaceholder mediaId={`home.ride.${ride.id}`} label={ride.name} className="apr-attractions__photo" />
                <span className="apr-attractions__card-caption"><small>{ride.zone}</small><strong>{ride.name}</strong></span>
              </button>
            );
          })}
        </div>
        <button type="button" className="apr-attractions__arrow apr-attractions__arrow--next" onClick={() => changeSlide(1)} aria-label="Следующий аттракцион">→</button>
      </div>
      <div className="apr-attractions__details" key={activeRide.id}>
        <span className="apr-attractions__counter">{String(activeIndex + 1).padStart(2, '0')} <span>/</span> {String(rides.length).padStart(2, '0')}</span>
        <h3>{activeRide.name}</h3>
        <p>{activeRide.desc}</p>
        <div className="apr-attractions__meta">
          <span>{activeRide.intensity}</span>
          {activeRide.minAge > 0 && <span>От {activeRide.minAge} лет</span>}
          {activeRide.minHeight !== null && <span>Рост от {activeRide.minHeight} см</span>}
        </div>
        <button type="button" className="apr-button apr-button--sand" onClick={() => window.location.hash = '#/attractions'}>Подробнее об аттракционе <span aria-hidden="true">↗</span></button>
      </div>
    </section>
  );
};

// Мини-планировщик: реальная рекомендация на основе интересов
const PlannerTeaser = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const interests = ["Адреналин", "Семейный отдых", "Релакс", "Исследования"];

  // Маппинг интересов → категории интенсивности
  const interestToIntensity: Record<string, string[]> = {
    'Адреналин': ['Экстрим', 'Высокая'],
    'Семейный отдых': ['Семейная', 'Спокойная'],
    'Релакс': ['Спокойная'],
    'Исследования': ['Спокойная', 'Средняя'],
  };

  const toggleInterest = (interest: string) => {
    setSelected(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  // 3 рекомендации: утро / день / вечер
  const recommendation = useMemo(() => {
    if (selected.length === 0) return null;

    // Собираем объекты, соответствующие хотя бы одному выбранному интересу
    const matchedIntensities = Array.from(new Set(
      selected.flatMap(interest => interestToIntensity[interest] || [])
    ));

    const matched = ATTRACTIONS.filter(attr => matchedIntensities.includes(attr.intensity));

    if (matched.length === 0) return null;

    // Утро: первый из matched
    const morning = matched[0];
    // День: второй (или первый, если только один)
    const afternoon = matched[1] || matched[0];
    // Вечер: приоритет спокойным / семейным
    const evening = matched.find(a => a.intensity === 'Спокойная' || a.intensity === 'Семейная') || matched[matched.length - 1];

    // Убираем дубли, если matched.length < 3
    const unique = [morning, afternoon, evening].filter((item, idx, arr) =>
      idx === 0 || item.id !== arr[idx - 1].id
    );

    return unique;
  }, [selected]);

  const handleOpenPlanner = () => {
    if (selected.length === 0) {
      window.location.hash = '#/planner';
    } else {
      const interestsParam = encodeURIComponent(selected.join(','));
      window.location.hash = `#/planner?interests=${interestsParam}`;
    }
  };

  return (
    <section id="mini-planner" className="apr-planner" aria-labelledby="mini-planner-title">
      <div className="apr-planner__layout">
        <div className="apr-planner__intro">
          <span className="apr-planner__eyebrow">YOUR PERFECT DAY · AQUA PARADISE</span>
          <h2 id="mini-planner-title">Ваш идеальный день <em>начинается здесь.</em></h2>
          <p className="apr-planner__lead">У каждого свой рай. Расскажите, что вам нравится, — и мы подберём впечатления для вашего путешествия.</p>
          <h3 className="apr-planner__select-title">Что вас вдохновляет?</h3>
          <div className="apr-planner__choices">
            {interests.map((interest, index) => (
              <button type="button" key={interest} className={`apr-planner__choice ${selected.includes(interest) ? 'is-selected' : ''}`} onClick={() => toggleInterest(interest)} aria-pressed={selected.includes(interest)}>
                <span className="apr-planner__choice-index">0{index + 1}</span>
                <span>{interest}</span>
                <span aria-hidden="true" className="apr-planner__choice-mark">{selected.includes(interest) ? '✓' : '+'}</span>
              </button>
            ))}
          </div>
          <button type="button" className="apr-planner__reset" onClick={() => setSelected([])} disabled={selected.length === 0}>Сбросить выбор ↺</button>
        </div>
        <div className="apr-planner__preview">
          <div className="apr-planner__preview-header">
            <span>ВАШ МАРШРУТ</span>
            <span className="apr-planner__preview-badge">ПРЕДВАРИТЕЛЬНЫЙ ПЛАН</span>
          </div>
          <h3>Один день. <em>Тысяча впечатлений.</em></h3>
          <p className="apr-planner__preview-lead">{selected.length ? 'Вдохновляющий маршрут по вашим интересам' : 'Выберите интересы слева, чтобы увидеть рекомендации'}</p>
          <div className="apr-planner__timeline" aria-live="polite">
            {['Утро', 'День', 'Вечер'].map((period, idx) => {
              const item = recommendation?.[idx];
              return (
                <div className="apr-planner__time" key={period}>
                  <div className="apr-planner__time-marker"><span>{idx + 1}</span></div>
                  <div className="apr-planner__time-body">
                    <span className="apr-planner__period">{period}</span>
                    <strong>{item?.name ?? (selected.length ? 'Свободное время' : ['Начните с открытий', 'Поймайте момент', 'Насладитесь вечером'][idx])}</strong>
                    <small>{item?.zone ?? (selected.length ? 'Добавьте интересы для новых идей' : 'Ваше приключение ждёт')}</small>
                  </div>
                  <div className="apr-planner__time-media">
                    <MediaPlaceholder mediaId={`home.planner.${['morning', 'afternoon', 'evening'][idx]}`} label={item?.name ?? period} />
                  </div>
                </div>
              );
            })}
          </div>
          {selected.length > 0 && !recommendation && <p className="apr-planner__notice">По выбранным интересам пока нет подходящих аттракционов.</p>}
          <p className="apr-planner__disclaimer">Это пример для вдохновения, а не гарантированное расписание.</p>
          <button type="button" className="apr-planner__cta" onClick={handleOpenPlanner}>Составить полный маршрут <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </section>
  );
};

type HeaderIconName = 'compass' | 'slide' | 'family' | 'route' | 'shuttle' | 'shield' | 'help';
const HeaderIcon = ({ name }: { name: HeaderIconName }) => {
  const paths: Record<HeaderIconName, ReactNode> = {
    compass: <><circle cx="12" cy="12" r="9"/><path d="M12 1.5v3m0 15v3M1.5 12h3m15 0h3"/><path d="m12 5.5 2.3 4.2 4.2 2.3-4.2 2.3-2.3 4.2-2.3-4.2-4.2-2.3 4.2-2.3z"/><circle cx="12" cy="12" r="1.4"/></>,
    slide: <><path d="M4 7h9l-4.5-3zM6 7v12M12 7v3"/><path d="M12 10c5 0 9 1.5 8 4s-5 3.1-9 4.1S5 20 4 21"/><path d="M12 12c4.3 0 6.7 1 6 2.1s-5.1 2.6-8.3 3.6S5.7 19.2 5 20"/><path d="M2 22c2-1 3-1 5 0s3 1 5 0"/></>,
    family: <><circle cx="8" cy="7" r="3"/><circle cx="17" cy="9" r="2.5"/><circle cx="12.5" cy="15" r="2"/><path d="M2.5 20v-3c0-3.4 2.1-5.2 5.5-5.2 2.2 0 3.6.7 4.5 2"/><path d="M17 14c3 0 4.5 1.7 4.5 5v1M8.5 22v-1.5c0-2.2 1.6-3.5 4-3.5s4 1.3 4 3.5V22"/></>,
    route: <><path d="M4 18c4-5 7-1 11-6 2-2.5 3-4.5 5-6" strokeDasharray="2 2"/><path d="M7 18c0 2-3 4-3 4s-3-2-3-4a3 3 0 0 1 6 0ZM23 5c0 2-3 4-3 4s-3-2-3-4a3 3 0 0 1 6 0Z" transform="translate(0 -1)"/></>,
    shuttle: <><path d="M3 14 6 7h12l3 7v5H3zM5 7c2-3 12-3 14 0"/><path d="M8 9v5m8-5v5M3 16h18M7 19v1m10-1v1"/><circle cx="7" cy="20" r="2"/><circle cx="17" cy="20" r="2"/><path d="M11 13h2m-10 1h3m12 0h3"/></>,
    shield: <><path d="M12 2 4 6v6c0 5 3 8 8 10 5-2 8-5 8-10V6z"/><path d="m8 12 3 3 5-6"/></>,
    help: <><path d="M5 18a9 9 0 1 1 4 3l-5 1z"/><path d="M9 9a3 3 0 0 1 6 1c0 2-3 2-3 5M12 18h.01"/></>,
  };
  return <svg aria-hidden="true" className="apr-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

// Original scalable emblem based on the approved palm-and-waves direction.
const ResortLogo = () => (
  <svg className="apr-brand__emblem" viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
    <g fill="#E9C58B">
      <path d="M50 39C43 24 31 17 13 23c15-1 25 7 33 20C31 35 17 39 9 53c14-10 26-11 40-5C38 53 33 61 31 70c11-8 18-17 21-29 4 13 7 21 4 32 11-12 10-25 0-35 15 0 24 7 32 18-1-18-14-27-32-23 10-10 19-13 32-9-12-12-25-10-36 6C55 15 52 9 43 5c5 12 7 20 7 34Z"/>
      <path d="M48 42C40 57 28 65 10 73c19-4 33-11 44-28Z"/>
      <path d="M6 82c17-15 29-17 45-8 13 7 23 7 43-6-15 19-31 23-47 15-14-7-25-7-41-1Z"/>
      <path d="M8 90c19-8 31-6 43 0 14 6 26 3 42-8-14 16-29 19-44 13-13-6-25-7-41-5Z"/>
    </g>
  </svg>
);

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(() => window.scrollY > 36);
  const [showBackToTop, setShowBackToTop] = useState(() => window.scrollY > 350);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(window.scrollY);
  useEffect(() => {
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      setHeaderScrolled(y > 36);
      setShowBackToTop(y > 350);
      const delta = y - lastScrollY.current;
      if (y < 110) setHeaderHidden(false);
      else if (delta > 5 && !document.querySelector('.apr-site-nav details[open]')) setHeaderHidden(true);
      else if (delta < -5) setHeaderHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isMobileMenuOpen]);

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        if (menuButtonRef.current) menuButtonRef.current.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Скролл вверх при смене страницы
  const basePath = currentPath.split('?')[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [basePath]);

  const renderPage = () => {
    const [base, queryString] = currentPath.split('?');

    switch (base) {
      case '#/zones': {
        const urlParams = new URLSearchParams(queryString);
        return <ZonesPage
          initialZone={urlParams.get('zone') || undefined}
          initialTab={(urlParams.get('tab') as 'overview' | 'attractions' | 'infrastructure' | 'rules') || undefined}
        />;
      }
      case '#/attractions': {
        const attrParams = new URLSearchParams(queryString);
        return <AttractionsPage initialRide={attrParams.get('ride') || undefined} />;
      }
      case '#/hotel': return <HotelPage />;
      case '#/visit': return <VisitPage />;
      case '#/tickets': return <TicketsPage />;
      case '#/planner': {
        const plannerParams = new URLSearchParams(queryString);
        return <PlannerPage initialInterests={plannerParams.get('interests') || undefined} />;
      }
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans">
      <header className={`apr-site-header ${basePath !== '#/' ? 'apr-site-header--light-page' : ''} ${basePath === '#/' && !headerScrolled ? 'apr-site-header--hero' : 'apr-site-header--solid'} ${headerHidden && !isMobileMenuOpen ? 'apr-site-header--hidden' : ''}`}>
        <div className="apr-site-header__inner">
          <button type="button" className="apr-brand" onClick={() => navigate('#/')} aria-label="Aqua Paradise — на главную">
            <ResortLogo />
            <span className="apr-brand__name">Aqua Paradise<small>ISLAND RESORT</small></span>
          </button>
          <nav className="apr-site-nav" aria-label="Основная навигация">
            <button type="button" className="apr-nav-link" onClick={() => { navigate('#/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 0); }}>О курорте</button>
            <details className="apr-nav-dropdown">
              <summary className="apr-nav-link">Развлечения <span className="apr-nav-chevron" aria-hidden="true" /></summary>
              <div className="apr-nav-dropdown__panel">
                <button onClick={() => navigate('#/zones')}><HeaderIcon name="compass" /><span><strong>Тематические зоны</strong><small>Девять миров острова</small></span></button>
                <button onClick={() => navigate('#/attractions')}><HeaderIcon name="slide" /><span><strong>Аттракционы</strong><small>От релакса до экстрима</small></span></button>
                <button onClick={() => navigate('#/attractions')}><HeaderIcon name="family" /><span><strong>Семейный отдых</strong><small>Развлечения для всей семьи</small></span></button>
              </div>
            </details>
            <button type="button" className="apr-nav-link" onClick={() => navigate('#/planner')}>Планировщик</button>
            <button type="button" className="apr-nav-link" onClick={() => navigate('#/hotel')}>Отель</button>
            <details className="apr-nav-dropdown">
              <summary className="apr-nav-link">Посещение <span className="apr-nav-chevron" aria-hidden="true" /></summary>
              <div className="apr-nav-dropdown__panel">
                <button onClick={() => navigate('#/visit')}><HeaderIcon name="route" /><span><strong>Как добраться</strong><small>Путь на остров</small></span></button>
                <button onClick={() => navigate('#/visit')}><HeaderIcon name="shuttle" /><span><strong>Транспорт</strong><small>Передвижение по курорту</small></span></button>
                <button onClick={() => navigate('#/visit')}><HeaderIcon name="shield" /><span><strong>Правила и безопасность</strong><small>Комфортный отдых</small></span></button>
                <button onClick={() => navigate('#/visit')}><HeaderIcon name="help" /><span><strong>FAQ</strong><small>Ответы на вопросы</small></span></button>
              </div>
            </details>
          </nav>
          <button type="button" className="apr-button apr-button--sand apr-header-tickets" onClick={() => navigate('#/tickets')}>Билеты <span aria-hidden="true">↗</span></button>
          <button ref={menuButtonRef} type="button" className="apr-menu-toggle" onClick={() => setIsMobileMenuOpen(true)} aria-label="Открыть меню" aria-expanded={isMobileMenuOpen} aria-controls="apr-mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <button
        type="button"
        className={`apr-header-quick-menu${headerHidden && !isMobileMenuOpen ? ' apr-header-quick-menu--visible' : ''}`}
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Открыть навигацию"
        aria-controls="apr-mobile-menu"
        aria-expanded={isMobileMenuOpen}
        aria-hidden={!headerHidden || isMobileMenuOpen}
        tabIndex={headerHidden && !isMobileMenuOpen ? 0 : -1}
      ><span /><span /><span /></button>

      {isMobileMenuOpen && (
        <div className="apr-mobile-overlay" id="apr-mobile-menu">
          <button type="button" className="apr-mobile-overlay__scrim" onClick={() => setIsMobileMenuOpen(false)} aria-label="Закрыть меню" />
          <aside className="apr-mobile-drawer" role="dialog" aria-modal="true" aria-label="Навигация по курорту">
            <div className="apr-mobile-drawer__top"><span className="apr-mobile-drawer__brand"><ResortLogo /><span className="apr-brand__name">Aqua Paradise<small>ISLAND RESORT</small></span></span><button type="button" onClick={() => { setIsMobileMenuOpen(false); menuButtonRef.current?.focus(); }} aria-label="Закрыть меню">✕</button></div>
            <nav aria-label="Мобильная навигация" className="apr-mobile-links">
              <button onClick={() => { navigate('#/'); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 0); }}>О курорте</button>
              <details><summary>Развлечения <span className="apr-mobile-chevron" aria-hidden="true" /></summary><div className="apr-mobile-submenu"><button onClick={() => navigate('#/zones')}><HeaderIcon name="compass" />Тематические зоны</button><button onClick={() => navigate('#/attractions')}><HeaderIcon name="slide" />Аттракционы</button><button onClick={() => navigate('#/attractions')}><HeaderIcon name="family" />Семейный отдых</button></div></details>
              <button onClick={() => navigate('#/planner')}>Планировщик</button>
              <button onClick={() => navigate('#/hotel')}>Отель</button>
              <details><summary>Посещение <span className="apr-mobile-chevron" aria-hidden="true" /></summary><div className="apr-mobile-submenu"><button onClick={() => navigate('#/visit')}><HeaderIcon name="route" />Как добраться</button><button onClick={() => navigate('#/visit')}><HeaderIcon name="shuttle" />Транспорт на острове</button><button onClick={() => navigate('#/visit')}><HeaderIcon name="shield" />Правила и безопасность</button><button onClick={() => navigate('#/visit')}><HeaderIcon name="help" />FAQ</button></div></details>
            </nav>
            <button type="button" className="apr-button apr-button--sand apr-mobile-tickets" onClick={() => navigate('#/tickets')}>Билеты ↗</button>
          </aside>
        </div>
      )}

      <main className={`flex-grow ${basePath === '#/' ? 'apr-main--home' : 'apr-main--inner'}`}>{renderPage()}</main>

      <button
        type="button"
        className={`apr-back-to-top${showBackToTop && !isMobileMenuOpen ? ' apr-back-to-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
        aria-label="Вернуться наверх страницы"
        title="Наверх"
        tabIndex={showBackToTop && !isMobileMenuOpen ? 0 : -1}
        aria-hidden={!showBackToTop || isMobileMenuOpen}
      >
        <span aria-hidden="true">↑</span>
      </button>

      <footer className="apr-footer" id="site-footer">
        <div className="apr-footer__inner">
          <div className="apr-footer__top">
            <div className="apr-footer__identity">
              <div className="apr-footer__brand"><ResortLogo /><span className="apr-footer__eyebrow">AQUA PARADISE · ISLAND RESORT</span></div>
              <h2>Девять миров.<br/><em>Один рай.</em></h2>
              <p>Остров, где приключения встречаются с безмятежностью.</p>
            </div>
            <nav className="apr-footer__nav" aria-label="Навигация в подвале">
              <div>
                <h3>Исследовать</h3>
                <button type="button" onClick={() => { navigate('#/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'}),0); }}>О курорте</button>
                <button type="button" onClick={() => navigate('#/zones')}>Девять миров</button>
                <button type="button" onClick={() => navigate('#/attractions')}>Аттракционы</button>
              </div>
              <div>
                <h3>Ваш отдых</h3>
                <button type="button" onClick={() => navigate('#/tickets')}>Билеты</button>
                <button type="button" onClick={() => navigate('#/planner')}>Планировщик</button>
                <button type="button" onClick={() => navigate('#/hotel')}>Отель</button>
                <button type="button" onClick={() => navigate('#/visit')}>Посещение</button>
              </div>
            </nav>
          </div>
          <div className="apr-footer__wordmark" aria-label="Aqua Paradise">AQUA <span>PARADISE</span></div>
          <div className="apr-footer__bottom">
            <span>© {new Date().getFullYear()} Aqua Paradise · Концептуальный проект</span>
            <p>Вымышленный курорт. Цены и услуги демонстрационные. Бронирования и платежи не осуществляются.</p>
            <button type="button" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>Наверх ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
