import './hotel-obsidian.css';
import { useEffect, useRef, useState } from 'react';

type Category = 'rooms' | 'suites' | 'villas';
type RoomCategory = { id: string; name: string; desc: string; amenities: string[] };

const categories: Record<Category, { title: string; items: RoomCategory[] }> = {
  rooms: {
    title: 'Номера',
    items: [
      { id: 'standard-room', name: 'Standard Room', desc: 'Уютный номер с видом на тропические сады. Идеально для пар и индивидуальных путешественников.', amenities: ['Кондиционер', 'Wi-Fi', 'Мини-бар', 'Сейф', 'Терраса'] },
      { id: 'deluxe-room', name: 'Deluxe Room', desc: 'Номер повышенной комфортности с улучшенной отделкой и дополнительным пространством для отдыха.', amenities: ['Кондиционер', 'Wi-Fi', 'Мини-бар', 'Сейф', 'Терраса', 'Улучшенная отделка'] },
      { id: 'ocean-view-room', name: 'Ocean View Room', desc: 'Просторный номер с панорамным видом на океан и собственной террасой.', amenities: ['Кондиционер', 'Wi-Fi', 'Мини-бар', 'Сейф', 'Вид на океан', 'Терраса', 'Халаты и тапочки'] },
    ],
  },
  suites: {
    title: 'Сьюты',
    items: [
      { id: 'family-suite', name: 'Family Suite', desc: 'Просторный люкс для всей семьи с отдельной гостиной зоной и детскими удобствами.', amenities: ['2 спальни', 'Гостиная', 'Wi-Fi', 'Детская кроватка', 'Мини-кухня', 'Вид на сад'] },
      { id: 'premium-suite', name: 'Premium Suite', desc: 'Люкс повышенной комфортности с премиальной отделкой и захватывающими видами.', amenities: ['Панорамные окна', 'Гостиная', 'Wi-Fi', 'Кофемашина', 'Ванна с видом', 'Услуги консьержа'] },
    ],
  },
  villas: {
    title: 'Виллы',
    items: [
      { id: 'ocean-view-villa', name: 'Ocean View Villa', desc: 'Отдельная вилла с приватным бассейном и панорамным видом на океан.', amenities: ['Собственный бассейн', 'Терраса', '2 спальни', 'Wi-Fi', 'Обслуживание номеров 24/7', 'Приватный сад'] },
      { id: 'royal-paradise-villa', name: 'Royal Paradise Villa', desc: 'Наиболее приватная вилла с максимальным уровнем комфорта и эксклюзивными услугами.', amenities: ['Большой бассейн', 'Личный дворецкий', '3 спальни', 'Кинотеатр', 'Спа-зона', 'Трансфер'] },
    ],
  },
};

const experiences = [
  { id: 'pool', title: 'Grand Infinity Pool', subtitle: 'Панорамный бассейн с видом на океан', details: 'Пространство для отдыха у воды с панорамой океана. Дополнительные условия посещения уточняются.' },
  { id: 'kids', title: 'Grand Kids Club', subtitle: 'Детский клуб', details: 'Пространство для детского досуга на территории гостиничного комплекса. Возрастные условия и программа уточняются.' },
  { id: 'wellness', title: 'Grand Wellness', subtitle: 'Wellness и фитнес', details: 'Гостиничное пространство для спокойного отдыха и занятий фитнесом. Перечень процедур, часы работы и условия доступа ещё не утверждены.' },
] as const;

export default function HotelPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('rooms');
  const pageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-hotel-reveal]'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[number]['id']>('pool');

  const changeCategory = (category: Category) => {
    setActiveCategory(category);
    setExpandedItemId(null);
  };
  const currentExperience = experiences.find(item => item.id === selectedExperience) ?? experiences[0];

  return (
    <div ref={pageRef} className="apr-hotel min-h-screen">
      <section className="apr-hotel-opening relative isolate flex items-center justify-center overflow-hidden px-5 text-center">
        <div className="relative z-10 max-w-4xl apr-hotel-hero">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[.3em] apr-hotel-gold">Aqua Paradise · Paradise Grand Hotel &amp; Villas · 5★</p>
          <h1 className="apr-hotel-title font-serif leading-[.95] mb-8">Искусство <em className="font-normal apr-hotel-gold">безупречного</em> отдыха</h1>
          <p className="mx-auto max-w-xl text-base md:text-lg leading-relaxed text-white/75">Пятизвёздочный премиальный комплекс на уединённом северо-западном побережье острова.</p>
          <div className="mt-12 text-xs uppercase tracking-[.3em] text-white/60">Stay beyond the ordinary</div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <section aria-label="Каталог размещения" className="py-12 md:py-20">
          <div data-hotel-reveal className="text-center mb-12 apr-hotel-reveal">
            <p className="text-xs font-semibold tracking-[.3em] uppercase mb-4 apr-hotel-gold">Ваше пространство у океана</p>
            <h2 className="font-serif text-5xl md:text-7xl mb-5">Искусство проживания</h2>
            <p className="max-w-xl mx-auto leading-relaxed apr-hotel-muted">От уютных номеров до приватных вилл — выберите пространство для своего идеального отдыха.</p>
          </div>
          <div data-hotel-reveal className="flex flex-wrap justify-center gap-3 mb-14 apr-hotel-reveal" role="group" aria-label="Категория размещения">
            {(['rooms', 'suites', 'villas'] as const).map(cat => (
              <button key={cat} type="button" onClick={() => changeCategory(cat)} aria-pressed={activeCategory === cat}
                className="apr-hotel-category min-w-28 rounded-full px-7 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
                {categories[cat].title}
              </button>
            ))}
          </div>
          <div className="space-y-12 md:space-y-20">
            {categories[activeCategory].items.map((item, index) => {
              const expanded = expandedItemId === item.id;
              return (
                <article key={item.id} data-hotel-reveal className="grid lg:grid-cols-2 gap-8 md:gap-14 items-center apr-hotel-reveal">
                  <div role="img" aria-label={`Место для будущей фотографии: ${item.name}`} className={`apr-hotel-photo relative min-h-64 md:min-h-[420px] overflow-hidden flex items-center justify-center ${index % 2 ? 'lg:order-2' : ''}`}>
                    <div aria-hidden="true" className="absolute inset-4 border border-white/25" />
                    <span className="relative z-10 text-center px-6 text-xs uppercase tracking-[.22em] text-white/70">Место для фото<br /><strong className="block mt-3 text-lg font-serif normal-case tracking-normal text-white">{item.name}</strong></span>
                    <span className="absolute bottom-8 left-8 text-xs tracking-[.25em] text-white/45">PARADISE GRAND</span>
                  </div>
                  <div className={`apr-hotel-room-copy ${index % 2 ? 'lg:order-1' : ''}`}>
                    <p className="text-xs uppercase tracking-[.25em] mb-4 apr-hotel-gold">0{index + 1} / {categories[activeCategory].title}</p>
                    <h3 className="font-serif text-5xl md:text-6xl mb-5 leading-none">{item.name}</h3>
                    <div className="apr-hotel-rule w-16 h-px mb-7" />
                    <p className="leading-8 mb-7 apr-hotel-muted">{item.desc}</p>
                    <button type="button" aria-expanded={expanded} aria-controls={`amenities-${item.id}`} onClick={() => setExpandedItemId(prev => prev === item.id ? null : item.id)}
                      className="apr-hotel-amenity-toggle inline-flex items-center gap-3 text-sm font-semibold border-b pb-2 transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-4">
                      {expanded ? 'Скрыть удобства' : 'Все удобства'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
                    </button>
                    {expanded && <div id={`amenities-${item.id}`} className="apr-hotel-amenities mt-6 grid sm:grid-cols-2 gap-3 p-5">
                      {item.amenities.map(amenity => <div key={amenity} className="flex gap-3 text-sm"><span className="apr-hotel-gold" aria-hidden="true">✓</span>{amenity}</div>)}
                    </div>}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-16 text-center text-xs leading-6 apr-hotel-muted">Демонстрационная страница: бронирование номеров, проверка наличия и оплата в MVP не предусмотрены. Точные параметры размещения уточняются.</p>
        </section>
      </div>

      <section aria-labelledby="hotel-experiences" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div data-hotel-reveal className="mb-12 md:flex justify-between items-end gap-10 apr-hotel-reveal">
            <div><p className="text-xs uppercase tracking-[.3em] mb-4 apr-hotel-gold">Beyond the room</p><h2 id="hotel-experiences" className="font-serif text-5xl md:text-7xl">Отдых и впечатления</h2></div>
            <p className="mt-5 md:mt-0 max-w-sm text-white/65 leading-relaxed">Пространства, созданные для неспешного отдыха и ярких моментов.</p>
          </div>
          <div data-hotel-reveal className="grid md:grid-cols-2 gap-4 apr-hotel-reveal">
            <button type="button" aria-pressed={selectedExperience === 'pool'} onClick={() => setSelectedExperience('pool')} className="apr-hotel-experience relative min-h-80 md:min-h-[450px] p-8 text-left flex items-end transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4">
              <span><span className="block text-xs tracking-[.22em] uppercase mb-4 text-white/65">Место для фото</span><strong className="font-serif text-4xl block">{experiences[0].title}</strong><span className="text-sm text-white/75">{experiences[0].subtitle}</span></span>
            </button>
            <div className="grid grid-rows-2 gap-4">
              {experiences.slice(1).map(item => <button key={item.id} type="button" aria-pressed={selectedExperience === item.id} onClick={() => setSelectedExperience(item.id)}
                className="apr-hotel-experience min-h-48 p-7 text-left flex items-end transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4">
                <span><span className="block text-xs tracking-[.22em] uppercase mb-3 text-white/55">Место для фото</span><strong className="font-serif text-3xl block">{item.title}</strong><span className="text-sm text-white/75">{item.subtitle}</span></span>
              </button>)}
            </div>
          </div>
          <div key={selectedExperience} className="mt-7 border-t border-white/20 pt-7 apr-hotel-experience-detail" aria-live="polite"><h3 className="font-serif text-3xl mb-2 apr-hotel-gold">{currentExperience.title}</h3><p className="text-white/75 leading-relaxed">{currentExperience.details}</p></div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 md:px-8 py-20 md:py-28">
        <div data-hotel-reveal className="grid lg:grid-cols-2 gap-14 lg:gap-20 apr-hotel-reveal">
          <section aria-labelledby="hotel-dining">
            <p className="text-xs uppercase tracking-[.3em] mb-4 apr-hotel-gold">Taste of paradise</p>
            <h2 id="hotel-dining" className="font-serif text-5xl md:text-6xl mb-8">Гастрономия</h2>
            <div role="img" aria-label="Место для фотографии Paradise Dining" className="apr-hotel-photo h-64 flex items-center justify-center px-5 text-center text-white/75 text-xs uppercase tracking-[.25em]">Место для фото · Paradise Dining</div>
            <h3 className="font-serif text-3xl mt-7 mb-3">Paradise Dining</h3>
            <p className="leading-7 mb-4 apr-hotel-muted">Гостиничная гастрономия: рестораны и бары курортного комплекса, обслуживание номеров и возможность отдыха с видом на океан.</p>
            <p className="text-xs leading-6 apr-hotel-muted">Конкретные рестораны, меню, стоимость, часы работы и порядок заказа пока не утверждены. Рестораны гостиницы не следует путать с заведениями Paradise Market.</p>
          </section>
          <section aria-labelledby="hotel-services">
            <p className="text-xs uppercase tracking-[.3em] mb-4 apr-hotel-gold">The details matter</p>
            <h2 id="hotel-services" className="font-serif text-5xl md:text-6xl mb-8">Услуги и комфорт</h2>
            <div className="space-y-7">
              <div className="apr-hotel-service border-t pt-6"><h3 className="font-serif text-3xl mb-3">Сервис</h3><ul className="space-y-2 text-sm leading-7 apr-hotel-muted"><li>Круглосуточная стойка регистрации</li><li>Служба консьержа и хранение багажа</li><li>Безопасность и помощь гостям</li></ul></div>
              <div className="apr-hotel-service border-t pt-6"><h3 className="font-serif text-3xl mb-3">Отдых</h3><ul className="space-y-2 text-sm leading-7 apr-hotel-muted"><li>Grand Infinity Pool</li><li>Grand Kids Club</li><li>Grand Wellness и фитнес</li></ul><p className="text-xs mt-3 apr-hotel-muted">Условия доступа и перечень услуг отдельных пространств уточняются.</p></div>
              <div className="apr-hotel-service border-t pt-6"><h3 className="font-serif text-3xl mb-3">Как передвигаться по острову</h3><p className="text-sm leading-7 apr-hotel-muted">Отель находится на северо-западе острова. К другим зонам можно добраться пешком по предусмотренным дорожкам либо воспользоваться бесплатным Paradise Loop. Индивидуальный трансфер предусмотрен как концепция; детали доступа и стоимость уточняются.</p></div>
            </div>
          </section>
        </div>
        <section aria-labelledby="hotel-packages" data-hotel-reveal className="apr-hotel-packages mt-16 p-6 md:p-12 apr-hotel-reveal">
          <p className="text-xs uppercase tracking-[.3em] mb-4 apr-hotel-gold">Curated stays</p>
          <h2 id="hotel-packages" className="font-serif text-4xl md:text-5xl mb-4">Пакеты проживания</h2>
          <p className="text-sm leading-7 mb-7 max-w-3xl"><strong>Предварительная концепция, не действующие предложения.</strong> Цены, состав пакетов и условия проживания не утверждены. Проживание не предполагает автоматического доступа ко всем платным услугам аквапарка.</p>
          <ul className="grid md:grid-cols-2 gap-3 text-sm leading-7">
            <li>• Room Only — проживание без питания</li><li>• Bed &amp; Breakfast — проживание с завтраком</li><li>• Stay &amp; Splash — проживание с доступом в аквапарк</li><li>• Family Paradise Package — семейный пакет</li><li>• Premium Paradise Experience — расширенный пакет</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
