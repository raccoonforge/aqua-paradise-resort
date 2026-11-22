import { useState } from 'react';
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
      { id: 'deluxe-room', name: 'Deluxe Room', description: 'Улучшенная категория номера в Paradise Grand Hotel. Тёплый интерьер на иллюстрации передаёт атмосферу Grand Riviera.', facts: ['Улучшенная категория номера'],
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
  star: 'm16 3 3.4 8.5 9.1.7-7 5.8 2.3 8.9L16 22l-7.8 5 2.3-8.9-7-5.8 9.1-.7L16 3Z',
  palm: 'M2 27c7-4 20-4 28 0M13 23c.3-7 3.4-12 8-17M20 8c-2-5-7-6-11-3 4 0 7 1 10 4m2-2c3-5 7-4 10 0-4-1-7-1-10 1m-1 0c-6-1-10 2-11 7 3-3 6-4 11-6m1-1c5 1 7 5 6 8-2-3-4-5-6-7',
  hotel: 'M2 28h28M5 28V12h22v16M3 12l13-8 13 8M9 16v5m14-5v5m-9 7V16h4v12',
  bed: 'M3 26v-8m26 8v-8M3 22h26v-5H3v5Zm3-5V9h20v8M9 17v-4h6v4m2 0v-4h6v4',
  pin: 'M24 13c0 6-8 14-8 14S8 19 8 13a8 8 0 1 1 16 0Zm-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  chevron: 'm12 7 9 9-9 9',
  arrow: 'M3 16h25M21 9l7 7-7 7',
  waves: 'M2 10c4 0 4-3 8-3s5 3 10 3 6-3 10-3M2 18c4 0 4-3 8-3s5 3 10 3 6-3 10-3M2 26c4 0 4-3 8-3s5 3 10 3 6-3 10-3',
  kids: 'M10 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4 27v-7a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v7m0-7a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v7M8 24v3m16-3v3',
  lotus: 'M16 24c-6-6-6-14 0-21 6 7 6 15 0 21Zm0 0C8 24 4 18 4 11c5 0 7 3 8 4m4 9c8 0 12-6 12-13-5 0-7 3-8 4M9 18c-3 0-6 1-7 4 6 8 22 8 28 0-1-3-4-4-7-4',
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

function HotelHero() {
  return (
    <section id="hero" className="hotel-hero" tabIndex={-1} aria-labelledby="hotel-title">
      <img className="hotel-hero__art" src={illustration('hero')} alt="Гостиница на террасах уединённой бухты в золотой час"
        width="1920" height="640" fetchPriority="high" />
      <div className="hotel-layout hotel-hero__story">
        <p className="hotel-imprint">Отель курорта Aqua Paradise</p>
        <h1 id="hotel-title"><span>Paradise</span>{' '}<span>Grand Hotel</span>{' '}<span>&amp; Villas</span></h1>
        <p className="hotel-hero__subtitle">Искусство безупречного отдыха</p>
        <p className="hotel-hero__intro">Пятизвёздочный отель на северо-западном побережье острова. Тропические сады и террасы спускаются к уединённой бухте.</p>
        <div className="hotel-hero__actions">
          <a className="riv-button hotel-primary" href="#/hotel?section=hotel-rooms">Выбрать размещение <HotelIcon name="arrow" /></a>
          <a className="riv-button secondary hotel-secondary" href="#/hotel?section=hotel-experiences">Открыть впечатления</a>
        </div>
      </div>
    </section>
  );
}

function HotelAbout() {
  return (
    <section className="hotel-about" aria-labelledby="hotel-about-title">
      <img className="hotel-about__art" src={illustration('terrace')} alt="Вид на океан с арочной гостиничной террасы" width="1440" height="960" loading="lazy" />
      <div className="hotel-layout hotel-about__layout">
        <div className="hotel-about__copy">
          <h2 id="hotel-about-title">О Paradise Grand Hotel</h2>
          <p>Флагманский отель Aqua Paradise Resort расположен на террасированном склоне у уединённой бухты. Открытые галереи и тропические сады связывают главное здание, семейные сьюты и виллы.</p>
          <ul className="hotel-about__features">
            <li><span className="hotel-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <HotelIcon key={index} name="star" />)}</span>Пятизвёздочный курорт</li>
            <li><HotelIcon name="palm" />Уединённая гостиничная бухта</li>
            <li><HotelIcon name="hotel" />Номера, сьюты и приватные виллы</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function RoomPreview({ room }: { room: Room }) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const frames = room.frames.filter(frame => illustration(frame.asset));
  const frame = frames[frameIndex];
  const changeFrame = (delta: number) => setFrameIndex(index => (index + delta + frames.length) % frames.length);

  return (
    <>
      <div className="hotel-gallery" role="group" aria-label={`Галерея ${room.name}`}>
        {frame && <img key={frame.asset} className="hotel-gallery__main" src={illustration(frame.asset)}
          alt={`${room.name}. ${frame.label}`} width="1080" height="720" loading="lazy" />}
        {frames.length > 1 && (
          <>
            <button className="hotel-gallery__arrow hotel-gallery__arrow--previous" type="button"
              aria-label="Предыдущее изображение" onClick={() => changeFrame(-1)}><HotelIcon name="chevron" /></button>
            <button className="hotel-gallery__arrow hotel-gallery__arrow--next" type="button"
              aria-label="Следующее изображение" onClick={() => changeFrame(1)}><HotelIcon name="chevron" /></button>
          </>
        )}
      </div>
      {frames.length > 1 && (
        <div className="hotel-gallery__thumbnails" role="group" aria-label="Виды размещения">
          {frames.map((item, index) => (
            <button key={item.asset} type="button" aria-label={item.label} aria-pressed={index === frameIndex}
              onClick={() => setFrameIndex(index)}>
              <img src={illustration(`${item.asset}-thumb`) ?? illustration(item.asset)} alt="" width="240" height="160" loading="lazy" />
            </button>
          ))}
        </div>
      )}
      <div className="hotel-room__summary">
        <h3 id="hotel-room-name" aria-live="polite">{room.name}</h3>
        <p>{room.description}</p>
        <button className="riv-button hotel-primary hotel-room__amenities" type="button"
          aria-expanded={expanded} aria-controls="hotel-room-amenities" onClick={() => setExpanded(value => !value)}>
          {expanded ? 'Скрыть удобства' : 'Все удобства'} <HotelIcon name="chevron" />
        </button>
        <div className="hotel-room__details" id="hotel-room-amenities" hidden={!expanded}>
          <ul>{room.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
          <p>Точное оснащение и параметры проживания уточняются.</p>
        </div>
      </div>
    </>
  );
}

function Accommodation() {
  const [selection, setSelection] = useState<{ category: CategoryId; room: string }>({ category: 'rooms', room: 'deluxe-room' });
  const category = categories[selection.category];
  const room = category.rooms.find(item => item.id === selection.room) ?? category.rooms[0];
  const selectCategory = (id: CategoryId) => {
    if (id !== selection.category) setSelection({ category: id, room: categories[id].defaultRoom });
  };

  return (
    <section className="hotel-stay" id="hotel-rooms" tabIndex={-1} aria-labelledby="hotel-stay-title">
      <div className="hotel-layout">
        <header className="hotel-stay__head">
          <h2 className="hotel-section-title hotel-section-title--light" id="hotel-stay-title">Коллекция размещения</h2>
          <div className="hotel-stay__categories" role="group" aria-label="Категория размещения">
            {categoryIds.map(id => (
              <button key={id} className="riv-button" type="button" aria-pressed={id === selection.category}
                onClick={() => selectCategory(id)}>{categories[id].label}</button>
            ))}
          </div>
        </header>
        <div className="hotel-stay__layout">
          <div className="hotel-grounds">
            <img src={illustration('grounds')} alt="Панорама террас отеля, сьютов и вилл у гостиничного бассейна"
              width="1440" height="960" loading="lazy" />
            <div className="hotel-grounds__markers" role="group" aria-label="Размещение на панораме">
              {categoryIds.map(id => (
                <button key={id} className={`hotel-pin hotel-pin--${id}`} type="button"
                  aria-pressed={id === selection.category} onClick={() => selectCategory(id)}>
                  <HotelIcon name="pin" /> {categories[id].label}
                </button>
              ))}
            </div>
          </div>
          <article className="hotel-room" aria-labelledby="hotel-room-name">
            <label className="hotel-room__picker">Тип размещения
              <select value={room.id} onChange={event => setSelection({ category: selection.category, room: event.target.value })}>
                {category.rooms.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </label>
            <RoomPreview key={room.id} room={room} />
          </article>
        </div>
      </div>
    </section>
  );
}

const experiences = [
  { id: 'kids', title: 'Grand Kids Club', icon: 'kids', description: 'Детский клуб с организованным досугом на территории отеля.' },
  { id: 'pool', title: 'Grand Infinity Pool', icon: 'waves', description: 'Панорамный бассейн на прибрежной террасе с видом на гостиничную бухту.' },
  { id: 'wellness', title: 'Grand Wellness & Fitness', icon: 'lotus', description: 'Гостиничное пространство для фитнеса и спокойного отдыха.' },
] as const;

function Experiences() {
  const [active, setActive] = useState<(typeof experiences)[number]['id']>('pool');
  const selected = experiences.find(item => item.id === active) ?? experiences[1];
  return (
    <section className="hotel-experiences" id="hotel-experiences" tabIndex={-1} aria-labelledby="hotel-experiences-title">
      <img className="hotel-experiences__art" src={illustration('infinity')} alt="Бассейн, тропические сады и террасы у гостиничной бухты"
        width="1680" height="560" loading="lazy" />
      <div className="hotel-layout hotel-experiences__layout">
        <h2 className="hotel-section-title hotel-section-title--light" id="hotel-experiences-title">Отдых и впечатления</h2>
        <div className="hotel-experiences__places" role="group" aria-label="Гостиничные пространства">
          {experiences.map(item => (
            <button key={item.id} type="button" aria-pressed={item.id === active} aria-controls="hotel-experience-description"
              onClick={() => setActive(item.id)}>
              <span className="hotel-medallion"><HotelIcon name={item.icon} /></span><span>{item.title}</span>
            </button>
          ))}
        </div>
        <div className="hotel-experiences__detail" data-active={active} id="hotel-experience-description" aria-live="polite">
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
        </div>
      </div>
    </section>
  );
}

const services: { icon: IconName; title: string; copy: string; link?: string }[] = [
  { icon: 'bell', title: 'Консьерж', copy: 'Помощь гостям отеля' },
  { icon: 'clock', title: 'Регистрация', copy: 'Круглосуточная стойка' },
  { icon: 'luggage', title: 'Хранение багажа', copy: 'Гостиничный сервис' },
  { icon: 'kids', title: 'Grand Kids Club', copy: 'Организованный досуг' },
  { icon: 'lotus', title: 'Wellness & Fitness', copy: 'Отдых и тренировки' },
  { icon: 'bus', title: 'Транспорт', copy: 'Маршруты Paradise Loop', link: '#/visit?section=transport' },
];
const packages: { icon: IconName; title: string }[] = [
  { icon: 'bed', title: 'Room Only' },
  { icon: 'cup', title: 'Bed & Breakfast' },
  { icon: 'waves', title: 'Stay & Splash' },
  { icon: 'kids', title: 'Family Paradise Package' },
  { icon: 'crown', title: 'Premium Paradise Experience' },
];

function HotelConclusion() {
  return (
    <>
      <section className="hotel-dining" aria-labelledby="hotel-dining-title">
        <img className="hotel-dining__art" src={illustration('dining')} alt="Вечерняя ресторанная терраса с колоннами и видом на океан"
          width="1680" height="560" loading="lazy" />
        <div className="hotel-layout hotel-dining__story">
          <h2 className="hotel-section-title hotel-section-title--light" id="hotel-dining-title">Гастрономия</h2>
          <p className="hotel-imprint">Paradise Dining</p>
          <p>Рестораны и бары гостиничного комплекса, вечерние террасы с видом на океан и обслуживание номеров.</p>
        </div>
      </section>
      <div className="hotel-conclusion">
        <section className="hotel-services" aria-labelledby="hotel-services-title">
          <img className="hotel-services__art" src={illustration('lobby')} alt="Светлое гостиничное фойе с высокими арками и стойкой регистрации"
            width="1440" height="960" loading="lazy" />
          <div className="hotel-layout hotel-services__layout">
            <div className="hotel-services__info">
              <h2 id="hotel-services-title">Услуги и комфорт</h2>
              <ul className="hotel-service-list">
                {services.map(service => (
                  <li key={service.title}><HotelIcon name={service.icon} /><h3>{service.title}</h3>
                    {service.link ? <a href={service.link}>{service.copy}</a> : <p>{service.copy}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="hotel-layout hotel-packages" aria-labelledby="hotel-packages-title">
          <h2 className="hotel-section-title" id="hotel-packages-title">Пакеты проживания</h2>
          <ul>{packages.map(item => <li key={item.title}><HotelIcon name={item.icon} /><strong>{item.title}</strong></li>)}</ul>
          <p>Пакеты представлены как предварительные концепции. Онлайн-бронирование недоступно.</p>
        </section>
      </div>
    </>
  );
}

export default function HotelPage() {
  return (
    <div className="hotel-page">
      <HotelHero />
      <HotelAbout />
      <Accommodation />
      <Experiences />
      <HotelConclusion />
    </div>
  );
}
