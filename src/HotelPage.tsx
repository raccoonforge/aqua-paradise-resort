import { useState } from 'react';
import { HotelFilm, HotelFilmDivider } from './components/HotelFilm';
import './HotelPage.css';

type CategoryId = 'rooms' | 'suites' | 'villas';
type Room = {
  id: string;
  name: string;
  description: string;
  facts: string[];
  frames: { asset: string; label: string }[];
};

const categories: Record<CategoryId, { label: string; defaultRoom: string; rooms: Room[] }> = {
  rooms: {
    label: 'Номера',
    defaultRoom: 'deluxe-room',
    rooms: [
      { id: 'standard-room', name: 'Standard Room', description: 'Стандартная категория Paradise Grand Hotel для знакомства с отдыхом в уединённой бухте.', facts: ['Стандартный номер'],
        frames: [{ asset: 'standard-room', label: 'Интерьер номера' }] },
      { id: 'deluxe-room', name: 'Deluxe Room', description: 'Улучшенный номер в Paradise Grand Hotel & Villas, курортном комплексе на берегу уединённой бухты.', facts: ['Улучшенная категория номера'],
        frames: [
          { asset: 'deluxe-room', label: 'Общий вид номера' },
          { asset: 'deluxe-window', label: 'Вид со стороны окна' },
          { asset: 'deluxe-lounge', label: 'Детали интерьера' },
        ] },
      { id: 'ocean-view-room', name: 'Ocean View Room', description: 'Номер, в котором морской горизонт становится частью отдыха.', facts: ['Вид на океан'],
        frames: [{ asset: 'ocean-view-room', label: 'Интерьер с видом на океан' }] },
    ],
  },
  suites: {
    label: 'Сьюты',
    defaultRoom: 'family-suite',
    rooms: [
      { id: 'family-suite', name: 'Family Suite', description: 'Семейный люкс в гостиничном комплексе. Категория рассчитана на формат отдыха всей семьёй.', facts: ['Семейная категория'],
        frames: [{ asset: 'family-suite', label: 'Интерьер семейного сьюта' }] },
      { id: 'premium-suite', name: 'Premium Suite', description: 'Люкс повышенной комфортности в коллекции Paradise Grand Hotel.', facts: ['Категория повышенной комфортности'],
        frames: [{ asset: 'premium-suite', label: 'Интерьер премиального сьюта' }] },
    ],
  },
  villas: {
    label: 'Виллы',
    defaultRoom: 'ocean-view-villa',
    rooms: [
      { id: 'ocean-view-villa', name: 'Ocean View Villa', description: 'Отдельная вилла в прибрежных садах с панорамой океана.', facts: ['Отдельная вилла', 'Панорамный вид на океан'],
        frames: [{ asset: 'ocean-view-villa', label: 'Вилла у океана' }] },
      { id: 'royal-paradise-villa', name: 'Royal Paradise Villa', description: 'Самая приватная категория вилл. Индивидуальный бассейн дополняет уединённую обстановку.', facts: ['Приватная вилла', 'Собственный бассейн'],
        frames: [{ asset: 'royal-paradise-villa', label: 'Терраса виллы с бассейном' }] },
    ],
  },
};

const categoryIds = Object.keys(categories) as CategoryId[];
const art = import.meta.glob<string>('./assets/retro/hotel/*.avif', { eager: true, import: 'default' });
const illustration = (id: string) => art[`./assets/retro/hotel/${id}.avif`];

const marks = {
  weights: 'M6 10v12m4-15v18m12-18v18m4-15v12M10 16h12M3 16h3m20 0h3',
  star: 'm16 3 3.4 8.5 9.1.7-7 5.8 2.3 8.9L16 22l-7.8 5 2.3-8.9-7-5.8 9.1-.7L16 3Z',
  palm: 'M2 27c7-4 20-4 28 0M13 23c.3-7 3.4-12 8-17M20 8c-2-5-7-6-11-3 4 0 7 1 10 4m2-2c3-5 7-4 10 0-4-1-7-1-10 1m-1 0c-6-1-10 2-11 7 3-3 6-4 11-6m1-1c5 1 7 5 6 8-2-3-4-5-6-7',
  cocktail: 'M3 5h26L16 18 3 5Zm13 13v10m-6 0h12M8 10h16m-2-5 5-3',
  bed: 'M3 26v-8m26 8v-8M3 22h26v-5H3v5Zm3-5V9h20v8M9 17v-4h6v4m2 0v-4h6v4',
  pin: 'M24 13c0 6-8 14-8 14S8 19 8 13a8 8 0 1 1 16 0Zm-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  chevron: 'm12 7 9 9-9 9',
  arrow: 'M3 16h25M21 9l7 7-7 7',
  waves: 'M2 10c4 0 4-3 8-3s5 3 10 3 6-3 10-3M2 18c4 0 4-3 8-3s5 3 10 3 6-3 10-3M2 26c4 0 4-3 8-3s5 3 10 3 6-3 10-3',
  kids: 'M10 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4 27v-7a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v7m0-7a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v7M8 24v3m16-3v3',
  bell: 'M3 24h26M6 24v-2a10 10 0 0 1 20 0v2M16 12V8m-4 0h8',
  clock: 'M16 3a13 13 0 1 0 0 26 13 13 0 0 0 0-26Zm0 6v7l5 3',
  luggage: 'M6 10h20a2 2 0 0 1 2 2v14H4V12a2 2 0 0 1 2-2Zm6 0V5h8v5M9 10v16m14-16v16',
  bus: 'M8 5h16a4 4 0 0 1 4 4v15H4V9a4 4 0 0 1 4-4ZM4 16h24M9 24v4m14-4v4M9 20h2m10 0h2',
  cup: 'M6 11h18v6a7 7 0 0 1-7 7h-4a7 7 0 0 1-7-7v-6Zm18 1h5v4a4 4 0 0 1-4 4h-2M3 28h24M10 3v4m5-4v4m5-4v4',
  crown: 'm3 8 7 6 6-10 6 10 7-6-4 16H7L3 8Zm5 20h16',
} as const;
type IconName = keyof typeof marks;

function HotelIcon({ name }: { name: IconName }) {
  return <svg className="hotel-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden="true"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"><path d={marks[name]} /></svg>;
}

const attractions = [
  { id: 'pool', art: 'film-pool', title: 'Grand Infinity Pool', description: 'Панорамный бассейн на прибрежной террасе. Отсюда открывается вид на уединённую гостиничную бухту.' },
  { id: 'kids', art: 'film-kids', title: 'Grand Kids Club', description: 'Детский клуб на территории отеля. Здесь предусмотрен организованный досуг для юных гостей.' },
  { id: 'wellness', art: 'film-wellness', title: 'Grand Wellness & Fitness', description: 'Фитнес-центр и wellness-пространство гостиничного комплекса для тренировок и спокойного отдыха.' },
] as const;

function HotelHero() {
  return (
    <section id="hero" className="hotel-hero" tabIndex={-1} aria-labelledby="hotel-title">
      <img className="hotel-hero__art" src={illustration('film-hero')} alt="Кинокамера на берегу и Paradise Grand Hotel над каскадами уединённой бухты"
        width="1920" height="640" fetchPriority="high" />
      <div className="hotel-layout">
        <div className="hotel-hero__story">
          <h1 id="hotel-title" aria-label="Paradise Grand Hotel & Villas">
            <span className="hotel-title__main"><span>Paradise</span>{' '}<span>Grand</span></span>{' '}
            <span className="hotel-title__script">Hotel &amp; Villas</span>
          </h1>
          <p className="hotel-hero__subtitle">Искусство безупречного отдыха</p>
          <div className="hotel-hero__actions">
            <a className="riv-button hotel-primary" href="#/hotel?section=hotel-rooms">Выбрать размещение <HotelIcon name="arrow" /></a>
            <a className="riv-button secondary hotel-secondary" href="#/hotel?section=hotel-experiences">Открыть впечатления</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const openingFrames = [
  { src: illustration('deluxe-room'), label: 'Размещение' },
  { src: illustration('film-pool'), label: 'Впечатления' },
  { src: illustration('film-dining'), label: 'Гастрономия' },
];
const benefits: { icon: IconName; title: string }[] = [
  { icon: 'star', title: 'Пятизвёздочный курорт' },
  { icon: 'waves', title: 'Уединённая гостиничная бухта' },
  { icon: 'palm', title: 'Номера, сьюты и приватные виллы' },
  { icon: 'cocktail', title: 'Впечатления на любой вкус' },
];

function HotelAbout() {
  return (
    <div className="hotel-opening">
      <HotelFilm frames={openingFrames} label="Кадры отеля" />
      <section className="hotel-about hotel-paper" aria-labelledby="hotel-about-title">
        <div className="hotel-layout">
          <h2 className="hotel-section-title" id="hotel-about-title">В главных ролях — ваш отдых</h2>
          <ul className="hotel-about__features">
            {benefits.map(({ icon, title }) => <li key={title}><HotelIcon name={icon} /><span>{title}</span></li>)}
          </ul>
          <p>На северо-западном побережье Aqua Paradise сады и террасы отеля спускаются к собственной бухте.</p>
        </div>
      </section>
    </div>
  );
}

function Accommodation() {
  const [selection, setSelection] = useState({ category: 'rooms' as CategoryId, room: 'deluxe-room', frame: 0, expanded: false });
  const category = categories[selection.category];
  const room = category.rooms.find(item => item.id === selection.room) ?? category.rooms[0];
  const additional = { asset: `${room.id}-detail`, label: 'Другой ракурс' };
  const frames = illustration(additional.asset) ? [...room.frames, additional] : room.frames;
  const frame = frames[selection.frame];

  function selectRoom(category: CategoryId, room: string) {
    setSelection({ category, room, frame: 0, expanded: false });
  }

  function selectCategory(id: CategoryId) {
    if (id !== selection.category) selectRoom(id, categories[id].defaultRoom);
  }

  function changeFrame(delta: number) {
    setSelection(value => ({ ...value, frame: (value.frame + delta + frames.length) % frames.length }));
  }

  return (
    <section className="hotel-stay" id="hotel-rooms" tabIndex={-1} aria-labelledby="hotel-stay-title">
      <div className="hotel-layout hotel-stay__head">
        <h2 className="hotel-section-title" id="hotel-stay-title">Коллекция<br /> размещения</h2>
        <div className="hotel-stay__categories" role="group" aria-label="Категория размещения">
          {categoryIds.map(id => (
            <button key={id} type="button" aria-pressed={id === selection.category} onClick={() => selectCategory(id)}>
              {categories[id].label}
            </button>
          ))}
        </div>
      </div>
      <article className="hotel-room" aria-labelledby="hotel-room-name">
        <div className="hotel-gallery" role="group" aria-label={`Галерея ${room.name}`}>
          <img key={frame.asset} className="hotel-gallery__main" src={illustration(frame.asset)}
            alt={`${room.name}. ${frame.label}`} width="1080" height="720" loading="lazy" />
          {frames.length > 1 && (
            <>
              <button className="hotel-gallery__arrow hotel-gallery__arrow--previous" type="button"
                aria-label="Предыдущее изображение" onClick={() => changeFrame(-1)}><HotelIcon name="chevron" /></button>
              <button className="hotel-gallery__arrow hotel-gallery__arrow--next" type="button"
                aria-label="Следующее изображение" onClick={() => changeFrame(1)}><HotelIcon name="chevron" /></button>
            </>
          )}
        </div>
        <div className="hotel-room__summary hotel-paper">
          <h3 id="hotel-room-name" aria-live="polite">{room.name}</h3>
          <p>{room.description}</p>
          <label className="hotel-room__picker">Тип размещения
            <select value={room.id} onChange={event => selectRoom(selection.category, event.target.value)}>
              {category.rooms.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select>
          </label>
          <button className="riv-button hotel-primary hotel-room__amenities" type="button"
            aria-expanded={selection.expanded} aria-controls="hotel-room-amenities"
            onClick={() => setSelection(value => ({ ...value, expanded: !value.expanded }))}>
            {selection.expanded ? 'Скрыть удобства' : 'Все удобства'} <HotelIcon name="arrow" />
          </button>
          <div className="hotel-room__details" id="hotel-room-amenities" hidden={!selection.expanded}>
            <ul>{room.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
            <p>Точное оснащение и параметры проживания уточняются.</p>
          </div>
        </div>
      </article>
      {frames.length > 1 && (
        <HotelFilm label="Виды размещения" selectedIndex={selection.frame}
          onSelect={frame => setSelection(value => ({ ...value, frame }))}
          frames={frames.map(({ asset, label }) => ({ src: illustration(`${asset}-thumb`) ?? illustration(asset), label }))} />
      )}
      <details className="hotel-grounds">
        <summary>Расположение на территории</summary>
        <div className="hotel-grounds__panorama" role="group" aria-label="Размещение на панораме">
          <img src={illustration('grounds')} alt="Террасы отеля, сьютов и вилл у гостиничного бассейна" width="1440" height="960" loading="lazy" />
          {categoryIds.map(id => (
            <button key={id} className={`hotel-pin hotel-pin--${id}`} type="button"
              aria-pressed={id === selection.category} onClick={() => selectCategory(id)}>
              <HotelIcon name="pin" /> {categories[id].label}
            </button>
          ))}
        </div>
      </details>
    </section>
  );
}

function Experiences() {
  const [active, setActive] = useState<(typeof attractions)[number]['id']>('pool');
  const selectedIndex = attractions.findIndex(item => item.id === active);
  const selected = attractions[selectedIndex];
  return (
    <section className="hotel-experiences" id="hotel-experiences" tabIndex={-1} aria-labelledby="hotel-experiences-title">
      <header className="hotel-layout">
        <h2 className="hotel-section-title" id="hotel-experiences-title">Отдых и впечатления</h2>
      </header>
      <div className="hotel-experiences__sequence" role="group" aria-label="Гостиничные пространства">
        <div className="hotel-experiences__places">
          {attractions.map(item => (
            <button key={item.id} type="button" aria-pressed={item.id === active} aria-controls="hotel-experience-description"
              onClick={() => setActive(item.id)}>
              <img src={illustration(item.art)} alt="" width="1120" height="560" loading="lazy" />
              <span className="hotel-experiences__label"><span>{item.title}</span><HotelIcon name="arrow" /></span>
            </button>
          ))}
        </div>
        <div className="hotel-layout hotel-experiences__info" style={{ gridRow: selectedIndex + 2 }}>
          <div id="hotel-experience-description" aria-live="polite" aria-atomic="true">
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const services: { icon: IconName; title: string; copy: string; link?: string }[] = [
  { icon: 'bell', title: 'Консьерж', copy: 'Помощь гостям' },
  { icon: 'clock', title: 'Регистрация', copy: 'Круглосуточная стойка' },
  { icon: 'luggage', title: 'Хранение багажа', copy: 'Гостиничный сервис' },
  { icon: 'kids', title: 'Grand Kids Club', copy: 'Организованный досуг' },
  { icon: 'weights', title: 'Wellness & Fitness', copy: 'Отдых и тренировки' },
  { icon: 'bus', title: 'Транспортная связь с курортом', copy: 'Маршруты Paradise Loop', link: '#/visit?section=transport' },
];
const packages: { icon: IconName; title: string }[] = [
  { icon: 'bed', title: 'Room Only' },
  { icon: 'cup', title: 'Bed & Breakfast' },
  { icon: 'waves', title: 'Stay & Splash' },
  { icon: 'kids', title: 'Family Paradise Package' },
  { icon: 'crown', title: 'Premium Paradise Experience' },
];

function Dining({ showDetails }: { showDetails: boolean }) {
  return (
    <section id="hotel-dining" className="hotel-dining" tabIndex={-1} aria-labelledby="hotel-dining-title">
      <img className="hotel-dining__art" src={illustration('film-dining')} alt="Вечерняя ресторанная терраса отеля с видом на океан"
        width="1680" height="560" loading="lazy" />
      <div className="hotel-layout hotel-dining__layout">
        <div className="hotel-dining__story">
          <h2 id="hotel-dining-title">Paradise Dining</h2>
          <p>Гастрономия Paradise Grand Hotel. Рестораны, бары и вечерние террасы с видом на уединённую бухту.</p>
          <a className="riv-button hotel-primary" href="#/hotel?section=hotel-dining-details" aria-expanded={showDetails}
            aria-controls="hotel-dining-details">Узнать больше <HotelIcon name="arrow" /></a>
          <div className="hotel-dining__details" id="hotel-dining-details" hidden={!showDetails} tabIndex={-1}>
            <h3>Гастрономия в отеле</h3>
            <p>Paradise Dining объединяет рестораны и бары гостиничного комплекса. В отеле предусмотрено обслуживание номеров.</p>
            <a href="#/hotel?section=hotel-dining">Свернуть описание</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HotelConclusion() {
  return (
    <>
      <section className="hotel-services hotel-paper" aria-labelledby="hotel-services-title">
        <div className="hotel-layout">
          <h2 className="hotel-section-title" id="hotel-services-title">Услуги и комфорт</h2>
          <ul className="hotel-service-list">
            {services.map(service => (
              <li key={service.title}>
                <HotelIcon name={service.icon} /><h3>{service.title}</h3>
                {service.link ? <a href={service.link}>{service.copy}</a> : <p>{service.copy}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="hotel-packages" aria-labelledby="hotel-packages-title">
        <img className="hotel-packages__art" src={illustration('film-night')} alt="" width="1680" height="560" loading="lazy" />
        <div className="hotel-layout">
          <h2 className="hotel-section-title" id="hotel-packages-title">Пакеты проживания</h2>
          <p className="hotel-packages__status">Предварительные концепции пакетов</p>
          <ul>
            {packages.map(item => (
              <li key={item.title} className="hotel-package">
                <div className="hotel-package__label">
                  <HotelIcon name={item.icon} />
                  <h3>{item.title}</h3>
                </div>
              </li>
            ))}
          </ul>
          <p className="hotel-packages__note">Информация о пакетах носит ознакомительный характер. Онлайн-бронирование недоступно.</p>
        </div>
      </section>
    </>
  );
}

export default function HotelPage({ showDiningDetails }: { showDiningDetails: boolean }) {
  return (
    <div className="hotel-page">
      <HotelHero />
      <HotelAbout />
      <Accommodation />
      <Experiences />
      <Dining showDetails={showDiningDetails} />
      <HotelConclusion />
      <HotelFilmDivider />
    </div>
  );
}
