import PlannerPage from './PlannerPage';
import MapPage from './MapPage';
import HotelPage from './HotelPage';
import VisitPage from './VisitPage';
import TicketsPage from './TicketsPage';
import AttractionsPage from './AttractionsPage';
import ZonesPage from './ZonesPage';
import { useState, useEffect, useRef, useMemo, type ReactNode } from 'react';
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
    { title: 'Ocean Bay', text: 'Там, где начинается рай', mediaId: 'home.polaroid.ocean-bay', pos: '-translate-x-32 -translate-y-16 -rotate-12' },
    { title: 'Adrenaline Peak', text: 'Почувствуй силу приключений', mediaId: 'home.polaroid.adrenaline-peak', pos: 'translate-x-32 -translate-y-8 rotate-12' },
    { title: 'Eden Gardens', text: 'Найди гармонию с природой', mediaId: 'home.polaroid.eden-gardens', pos: '-translate-x-24 translate-y-24 -rotate-6' },
    { title: 'Paradise Grand Hotel', text: 'Искусство безупречного отдыха', mediaId: 'home.polaroid.hotel', pos: 'translate-x-24 translate-y-16 rotate-6' },
  ];

  const [revealedCount, setRevealedCount] = useState(0);
  const allRevealed = revealedCount === photos.length;

  const revealNext = () => {
    setRevealedCount(previous => Math.min(previous + 1, photos.length));
  };
  const undoReveal = () => {
    setRevealedCount(previous => Math.max(previous - 1, 0));
  };

  return (
    <section id="about" className="apr-about py-20 sm:py-28 min-h-[720px] flex items-center">
      <div className="max-w-5xl mx-auto px-4 w-full">
        {/* Карточки и текст находятся в одной области, но кнопки всегда доступны. */}
        <div className="relative min-h-[400px] sm:min-h-[500px] flex items-center justify-center">
          <div
            className={`max-w-3xl mx-auto text-center space-y-6 transition-opacity duration-500 ${allRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden={!allRevealed}
          >
            <span className="text-teal-700 tracking-widest text-sm font-semibold uppercase block">ABOUT THE RESORT</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Один остров. Девять миров впечатлений.</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Aqua Paradise — это место, где мечты об идеальном отдыхе становятся реальностью. Крупный тропический курорт, где захватывающие приключения гармонично сочетаются с белоснежным пляжем и премиальным комфортом.
            </p>
            <div className="flex justify-center gap-8 pt-6">
              <div className="text-center"><span className="block text-3xl font-serif text-teal-600">9</span><span className="text-sm text-gray-500">зон</span></div>
              <div className="text-center"><span className="block text-3xl font-serif text-teal-600">6 км²</span><span className="text-sm text-gray-500">площадь</span></div>
              <div className="text-center"><span className="block text-3xl font-serif text-teal-600">09–22</span><span className="text-sm text-gray-500">часы</span></div>
            </div>
          </div>

          {!allRevealed && (
            <button
              type="button"
              onClick={revealNext}
              aria-label={`Открыть полароид ${revealedCount + 1} из ${photos.length}: ${photos[revealedCount].title}`}
              className="absolute inset-0 w-full flex items-center justify-center cursor-pointer rounded-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-600 focus-visible:ring-offset-4"
            >
              {photos.map((photo, index) => {
                const isRevealed = index < revealedCount;
                const zIndex = photos.length - index;
                return (
                  <div
                    key={photo.title}
                    aria-hidden="true"
                    className={`absolute bg-white p-3 pb-8 rounded-sm shadow-2xl transition-transform duration-700 ease-out motion-reduce:transition-none origin-center ${isRevealed ? `${photo.pos} opacity-0 scale-90` : 'translate-y-0 rotate-0 scale-100 opacity-100'}`}
                    style={{ zIndex, pointerEvents: 'none' }}
                  >
                    <MediaPlaceholder mediaId={photo.mediaId} label={photo.title} className="w-56 h-56 sm:w-72 sm:h-72 rounded-sm mb-4" />
                    <h3 className="font-serif text-lg text-gray-900 text-center">{photo.title}</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">{photo.text}</p>
                  </div>
                );
              })}
            </button>
          )}
        </div>

        <div className="relative z-10 mt-5 flex flex-col sm:flex-row gap-3 items-center justify-center print:hidden">
          <p className="sr-only" role="status" aria-live="polite">
            {allRevealed ? 'Все четыре полароида открыты.' : `Открыто полароидов: ${revealedCount} из ${photos.length}.`}
          </p>
          {!allRevealed && <p className="text-sm text-teal-700 font-medium">Нажмите на карточку или используйте Enter / пробел · {revealedCount} из {photos.length}</p>}
          {revealedCount > 0 && !allRevealed && (
            <button type="button" onClick={undoReveal} className="px-5 py-2 border border-teal-500 text-teal-800 bg-white rounded-full font-medium hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
              Назад к полароиду
            </button>
          )}
          {revealedCount > 0 && (
            <button type="button" onClick={() => setRevealedCount(0)} className="px-5 py-2 bg-teal-700 text-white rounded-full font-medium hover:bg-teal-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2">
              Посмотреть ещё раз
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

const NineWorlds = () => {
  const zones = [
    { name: 'Ocean Bay', desc: 'Сердце курорта. Белоснежный песок, лазурная лагуна и безмятежность.', color: 'from-cyan-400/40 to-blue-900/80' },
    { name: 'Adrenaline Peak', desc: 'Вызов для смельчаков. Самые высокие и быстрые водные горки острова.', color: 'from-orange-500/40 to-red-900/80' },
    { name: 'Eden Gardens', desc: 'Тропический рай. Редкие растения, водопады и невероятная тишина.', color: 'from-green-500/40 to-emerald-900/80' },
    { name: 'Atlantis Realm', desc: 'Затерянный город. Погружение в мифы и подводные приключения.', color: 'from-blue-600/40 to-indigo-900/80' },
    { name: "Pirate's Cove", desc: 'Остров сокровищ. Приключения для всей семьи в декорациях пиратских историй.', color: 'from-amber-600/40 to-stone-900/80' },
    { name: 'Serenity Spa', desc: 'Место силы. Премиальные спа-процедуры и абсолютный релакс.', color: 'from-purple-400/40 to-slate-900/80' },
    { name: 'Little Paradise', desc: 'Мир для самых маленьких. Безопасные горки и любимые герои.', color: 'from-pink-400/40 to-rose-900/80' },
    { name: 'Paradise Market', desc: 'Вкус острова. Рестораны, кафе и колоритные местные товары.', color: 'from-yellow-500/40 to-orange-900/80' },
    { name: 'Paradise Boulevard', desc: 'Центральная артерия. Главные площади, шоу и вечерние прогулки.', color: 'from-teal-400/40 to-teal-900/80' },
  ];

  const [activeZone, setActiveZone] = useState(0);

  return (
    <section className="apr-worlds relative min-h-[720px] h-[90vh] max-h-[1050px] flex flex-col justify-between overflow-hidden">
      <MediaPlaceholder mediaId={`home.zone.${ZONE_SLUGS[zones[activeZone].name]}`} label={zones[activeZone].name} className="absolute inset-0" />
      <div className={`absolute inset-0 bg-gradient-to-r from-[#082e37]/95 via-[#0b3741]/65 to-[#124c52]/15 ${zones[activeZone].color} pointer-events-none`}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 w-full pt-16 flex-grow flex flex-col justify-center">
        <div className="max-w-xl text-white">
          <span className="tracking-widest text-sm font-semibold uppercase mb-4 block opacity-80">EXPLORE THE ISLAND</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 drop-shadow-lg transition-all duration-500">{zones[activeZone].name}</h2>
          <p className="text-lg md:text-xl text-gray-100 mb-8 font-light drop-shadow-md transition-all duration-500">{zones[activeZone].desc}</p>
          <button
            onClick={() => {
              const slug = ZONE_SLUGS[zones[activeZone].name];
              if (slug) window.location.hash = `#/zones?zone=${slug}`;
            }}
            className="apr-button apr-button--light"
          >
            Подробнее о зоне
          </button>
        </div>
      </div>
      <div className="relative z-10 w-full bg-[#062c35]/70 backdrop-blur-xl border-t border-white/15">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
            {zones.map((zone, index) => (
              <button
                key={zone.name}
                onClick={() => setActiveZone(index)}
                aria-label={`Показать зону ${zone.name}`}
                className={`flex-shrink-0 px-5 py-3 rounded-full text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  activeZone === index ? 'bg-white text-gray-900 shadow-lg scale-105' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {zone.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => (
  <div className="apr-home">
    <section className="apr-hero relative min-h-[760px] h-[100svh] flex items-center justify-center overflow-hidden">
      <MediaPlaceholder mediaId="home.hero.ocean-bay" label="OCEAN BAY · ARRIVAL" className="absolute inset-0" />
      <div className="apr-hero__veil absolute inset-0 pointer-events-none" />
      <div className="apr-hero__content relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <span className="apr-eyebrow text-[#e7d7b3] mb-7">WELCOME TO AQUA PARADISE</span>
        <h1 className="apr-hero__title font-serif text-white mb-7 leading-[1.07]">
          Девять миров. <span className="block italic font-normal apr-hero__accent">Один рай.</span>
        </h1>
        <p className="apr-hero__description text-base sm:text-lg md:text-xl text-white/90 mb-11 max-w-2xl leading-relaxed font-light">
          От лазурных лагун и тропических садов до головокружительных водных приключений. Открой остров, где каждый момент становится особенным.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
      </div>
      <div className="absolute bottom-9 left-0 right-0 z-10 text-center text-[11px] sm:text-xs tracking-[0.27em] text-white/75 font-medium">
        OCEAN BAY · AQUA PARADISE
      </div>
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

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % rides.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + rides.length) % rides.length);

  return (
    <section className="apr-attractions py-24 sm:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-serif text-[#19313a] mb-4">Выберите своё приключение</h2>
        <p className="text-gray-600">От захватывающих дух спусков до спокойных прогулок по воде.</p>
      </div>
      <div className="relative max-w-4xl mx-auto flex items-center justify-center h-[400px]">
        <button onClick={prevSlide} aria-label="Предыдущий аттракцион" className="absolute left-4 z-20 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white text-gray-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">←</button>
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {rides.map((ride, index) => {
            let offset = index - activeIndex;
            if (offset < -1) offset += rides.length;
            if (offset > 1) offset -= rides.length;
            if (Math.abs(offset) > 1) return null;
            const isActive = offset === 0;
            const mediaId = `home.ride.${ride.id}`;
            return (
              <div
                key={index}
                className={`absolute w-[280px] sm:w-[320px] md:w-[380px] bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out
                  ${isActive ? 'z-10 scale-100 opacity-100' : 'scale-90 opacity-50 blur-[1px]'}
                `}
                style={{ transform: `translateX(${offset * 60}%) scale(${isActive ? 1 : 0.85})`, zIndex: isActive ? 10 : 5 }}
              >
                <MediaPlaceholder mediaId={mediaId} label={ride.name} className="h-48 md:h-56" />
                <div className="p-6 text-left relative bg-white">
                  <span className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-2 block">{ride.zone}</span>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">{ride.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ride.desc}</p>
                  <div className="flex gap-4 text-xs font-medium text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <span className="flex items-center gap-1">🔥 {ride.intensity}</span>
                    {ride.minAge > 0 && <span className="flex items-center gap-1">👤 {ride.minAge}+</span>}
                    {ride.minHeight !== null && <span className="flex items-center gap-1">📏 {ride.minHeight} см</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={nextSlide} aria-label="Следующий аттракцион" className="absolute right-4 z-20 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white text-gray-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">→</button>
      </div>
      <div className="text-center mt-8">
        <button onClick={() => window.location.hash = '#/attractions'} className="text-teal-600 font-medium hover:text-teal-800 underline underline-offset-4">
          Смотреть все аттракционы
        </button>
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
    <section className="apr-planner py-24 sm:py-32 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="tracking-widest text-teal-300 text-sm font-semibold uppercase mb-2 block">PLAN YOUR DAY</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6">Собери свой идеальный день.</h2>
        <p className="text-teal-100 mb-10 text-lg">Выберите то, что вам по душе, и мы покажем, каким может быть ваш отдых.</p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {interests.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              aria-pressed={selected.includes(interest)}
              className={`px-6 py-3 rounded-full border-2 transition-all font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${
                selected.includes(interest) ? 'bg-teal-400 border-teal-400 text-teal-900' : 'border-teal-700 hover:border-teal-500 text-teal-100'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Пример дня — 3 карточки */}
        {recommendation && recommendation.length > 0 && (
          <div className="mb-10 animate-fade-in">
            <p className="text-sm text-teal-200 mb-4 uppercase tracking-wider">Пример дня</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {['Утро', 'День', 'Вечер'].map((period, idx) => {
                const item = recommendation[idx];
                if (!item) return null;
                return (
                  <div key={period} className="apr-planner__card bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15 overflow-hidden">
                    <MediaPlaceholder mediaId={`home.planner.${['morning', 'afternoon', 'evening'][idx]}`} label={item.name} className="h-36 mb-4 rounded-xl" />
                     <span className="text-xs text-teal-300 font-bold uppercase tracking-wider">{period}</span>
                    <h3 className="font-serif text-xl text-white mt-1 mb-1">{item.name}</h3>
                    <p className="text-xs text-teal-200 mb-2">{item.zone}</p>
                    <p className="text-sm text-gray-200 line-clamp-2">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-teal-300 mt-3">
              Это пример для вдохновения, а не гарантированное расписание. Полный план — в планировщике.
            </p>
          </div>
        )}

        {selected.length > 0 && !recommendation && (
          <p className="text-amber-200 text-sm mb-6">
            По выбранным интересам пока нет рекомендаций. Попробуйте другие или откройте полный планировщик.
          </p>
        )}

        <button
          onClick={handleOpenPlanner}
          className="apr-button apr-button--sand focus-visible:ring-2 focus-visible:ring-white"
        >
          {selected.length > 0 ? 'Открыть полный планировщик с этими интересами' : 'Открыть полный планировщик'}
        </button>
      </div>
    </section>
  );
};

type HeaderIconName = 'compass' | 'slide' | 'family' | 'route' | 'shuttle' | 'shield' | 'help';
const HeaderIcon = ({ name }: { name: HeaderIconName }) => {
  const paths: Record<HeaderIconName, ReactNode> = {
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/></>,
    slide: <><path d="M5 4h5v5c0 2.3 1.2 3.3 3.4 3.3H16c2.4 0 3.8 1.4 3.8 3.6V18"/><path d="M3.5 18c2.4-1.7 4.3-1.7 6.6 0s4.3 1.7 6.6 0 3.3-1.7 4.8-.8"/><path d="M5 4v10"/></>,
    family: <><circle cx="8" cy="7.5" r="2.4"/><circle cx="17" cy="9" r="2"/><path d="M3 19v-2.2c0-3 2.1-4.9 5-4.9s5 1.9 5 4.9V19"/><path d="M14 14c2.6-1.2 6 .4 6 3.7V19"/></>,
    route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8"/></>,
    shuttle: <><path d="M4 15V8.5C4 6 6 4 8.5 4h7C18 4 20 6 20 8.5V15c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2Z"/><path d="M4 10h16M8 17v2m8-2v2M7.5 13.5h1m7 0h1"/><path d="M8 4v6m8-6v6"/></>,
    shield: <><path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 0 1 5.2 1c0 1.8-2.7 2.1-2.7 4M12 17.5h.01"/></>,
  };
  return <svg aria-hidden="true" className="apr-menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(() => window.scrollY > 36);
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 36);
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
      case '#/map': return <MapPage />;
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
      <header className={`apr-site-header ${basePath === '#/' && !headerScrolled ? 'apr-site-header--hero' : 'apr-site-header--solid'}`}>
        <div className="apr-site-header__inner">
          <button type="button" className="apr-brand" onClick={() => navigate('#/')} aria-label="Aqua Paradise — на главную">
            <span className="apr-brand__symbol" aria-hidden="true">🌴</span>
            <span className="apr-brand__name">Aqua Paradise<small>ISLAND RESORT</small></span>
          </button>
          <nav className="apr-site-nav" aria-label="Основная навигация">
            <button type="button" className="apr-nav-link" onClick={() => { navigate('#/'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 0); }}>О курорте</button>
            <details className="apr-nav-dropdown">
              <summary className="apr-nav-link">Развлечения <span aria-hidden="true">⌄</span></summary>
              <div className="apr-nav-dropdown__panel">
                <button onClick={() => navigate('#/zones')}><HeaderIcon name="compass" /><span><strong>Тематические зоны</strong><small>Девять миров острова</small></span></button>
                <button onClick={() => navigate('#/attractions')}><HeaderIcon name="slide" /><span><strong>Аттракционы</strong><small>От релакса до экстрима</small></span></button>
                <button onClick={() => navigate('#/attractions')}><HeaderIcon name="family" /><span><strong>Семейный отдых</strong><small>Развлечения для всей семьи</small></span></button>
              </div>
            </details>
            <button type="button" className="apr-nav-link" onClick={() => navigate('#/map')}>Карта острова</button>
            <button type="button" className="apr-nav-link" onClick={() => navigate('#/hotel')}>Отель</button>
            <details className="apr-nav-dropdown">
              <summary className="apr-nav-link">Посещение <span aria-hidden="true">⌄</span></summary>
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

      {isMobileMenuOpen && (
        <div className="apr-mobile-overlay" id="apr-mobile-menu">
          <button type="button" className="apr-mobile-overlay__scrim" onClick={() => setIsMobileMenuOpen(false)} aria-label="Закрыть меню" />
          <aside className="apr-mobile-drawer" role="dialog" aria-modal="true" aria-label="Навигация по курорту">
            <div className="apr-mobile-drawer__top"><span className="apr-brand__name">Aqua Paradise<small>ISLAND RESORT</small></span><button type="button" onClick={() => { setIsMobileMenuOpen(false); menuButtonRef.current?.focus(); }} aria-label="Закрыть меню">✕</button></div>
            <nav aria-label="Мобильная навигация" className="apr-mobile-links">
              <button onClick={() => { navigate('#/'); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 0); }}>О курорте</button>
              <details><summary>Развлечения <span aria-hidden="true">⌄</span></summary><div className="apr-mobile-submenu"><button onClick={() => navigate('#/zones')}>Тематические зоны</button><button onClick={() => navigate('#/attractions')}>Аттракционы</button><button onClick={() => navigate('#/attractions')}>Семейный отдых</button></div></details>
              <button onClick={() => navigate('#/map')}>Карта острова</button>
              <button onClick={() => navigate('#/hotel')}>Отель</button>
              <details><summary>Посещение <span aria-hidden="true">⌄</span></summary><div className="apr-mobile-submenu"><button onClick={() => navigate('#/visit')}>Как добраться</button><button onClick={() => navigate('#/visit')}>Транспорт на острове</button><button onClick={() => navigate('#/visit')}>Правила и безопасность</button><button onClick={() => navigate('#/visit')}>FAQ</button></div></details>
            </nav>
            <button type="button" className="apr-button apr-button--sand apr-mobile-tickets" onClick={() => navigate('#/tickets')}>Билеты ↗</button>
          </aside>
        </div>
      )}

      <main className={`flex-grow ${basePath === '#/' ? 'apr-main--home' : 'apr-main--inner'}`}>{renderPage()}</main>

      <footer className="apr-footer bg-[#102f39] text-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-serif mb-2">Aqua Paradise</h2>
              <p className="text-teal-200 text-sm">Девять миров. Один остров. Тысячи впечатлений.</p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-3">Исследовать</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => navigate('#/')} className="hover:text-white">О курорте</button></li>
                <li><button onClick={() => navigate('#/zones')} className="hover:text-white">Девять миров</button></li>
                <li><button onClick={() => navigate('#/attractions')} className="hover:text-white">Аттракционы</button></li>
                <li><button onClick={() => navigate('#/map')} className="hover:text-white">Карта острова</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-3">Спланировать</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => navigate('#/tickets')} className="hover:text-white">Билеты</button></li>
                <li><button onClick={() => navigate('#/planner')} className="hover:text-white">Планировщик</button></li>
                <li><button onClick={() => navigate('#/hotel')} className="hover:text-white">Отель</button></li>
                <li><button onClick={() => navigate('#/visit')} className="hover:text-white">Посещение</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-sm text-gray-400">
              Демонстрационный проект. Курорт, цены и услуги вымышлены. Реальные бронирования и платежи не осуществляются.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
