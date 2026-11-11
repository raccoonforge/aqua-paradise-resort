import { useState } from 'react';

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
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<(typeof experiences)[number]['id']>('pool');

  const changeCategory = (category: Category) => {
    setActiveCategory(category);
    setExpandedItemId(null);
  };
  const currentExperience = experiences.find(item => item.id === selectedExperience) ?? experiences[0];

  return (
    <main className="bg-[#f8f9fa] min-h-screen pb-20">
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" aria-hidden="true" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-teal-300 tracking-widest text-sm font-semibold uppercase mb-4 block">Paradise Grand Hotel &amp; Villas · 5★</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Искусство безупречного отдыха</h1>
          <p className="text-lg text-gray-300">Пятизвёздочный премиальный комплекс на уединённом северо-западном побережье острова.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <section aria-label="Каталог размещения" className="bg-white p-6 md:p-12 rounded-3xl shadow-xl border border-gray-100 mb-12">
          <div className="flex justify-center gap-3 mb-10 flex-wrap" role="group" aria-label="Категория размещения">
            {(['rooms', 'suites', 'villas'] as const).map(cat => (
              <button key={cat} type="button" onClick={() => changeCategory(cat)} aria-pressed={activeCategory === cat}
                className={`px-6 md:px-8 py-3 rounded-full font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 ${activeCategory === cat ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {categories[cat].title}
              </button>
            ))}
          </div>
          <div className="space-y-12">
            {categories[activeCategory].items.map(item => {
              const expanded = expandedItemId === item.id;
              return (
                <article key={item.id} className="flex flex-col lg:flex-row gap-8 items-center">
                  <div role="img" aria-label={`Будущая фотография: ${item.name}`} className="w-full lg:w-1/2 h-64 md:h-80 bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl flex items-center justify-center text-gray-600 shadow-inner">[Фото: {item.name}]</div>
                  <div className="w-full lg:w-1/2 min-w-0">
                    <h2 className="text-3xl font-serif text-gray-900 mb-4">{item.name}</h2>
                    <p className="text-gray-600 text-lg mb-6">{item.desc}</p>
                    <button type="button" aria-expanded={expanded} aria-controls={`amenities-${item.id}`}
                      onClick={() => setExpandedItemId(prev => prev === item.id ? null : item.id)}
                      className="text-teal-700 font-medium underline underline-offset-4 hover:text-teal-900 mb-4 focus-visible:outline-2 focus-visible:outline-teal-600 rounded">
                      {expanded ? 'Скрыть удобства' : 'Все удобства'}
                    </button>
                    {expanded && <div id={`amenities-${item.id}`} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl">
                      {item.amenities.map(amenity => <div key={amenity} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-teal-600" aria-hidden="true">✓</span>{amenity}</div>)}
                    </div>}
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-10 p-4 bg-gray-100 rounded-xl text-center text-sm text-gray-600">Демонстрационная страница: бронирование номеров, проверка наличия и оплата в MVP не предусмотрены. Точные параметры размещения уточняются.</p>
        </section>

        <section aria-labelledby="hotel-experiences" className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <h2 id="hotel-experiences" className="text-3xl font-serif text-gray-900 mb-7 text-center">Отдых и впечатления</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button type="button" aria-pressed={selectedExperience === 'pool'} onClick={() => setSelectedExperience('pool')} className={`relative min-h-60 md:min-h-80 rounded-2xl flex items-end p-6 text-left bg-gradient-to-br from-teal-500 to-cyan-800 text-white focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${selectedExperience === 'pool' ? 'ring-4 ring-teal-500/50' : ''}`}>
              <span><strong className="font-serif text-2xl block mb-1">Grand Infinity Pool</strong><span className="text-sm text-teal-50">Панорамный бассейн с видом на океан</span></span>
            </button>
            <div className="grid grid-rows-2 gap-4">
              {experiences.slice(1).map(item => <button key={item.id} type="button" aria-pressed={selectedExperience === item.id} onClick={() => setSelectedExperience(item.id)} className={`min-h-36 rounded-2xl flex items-end p-6 text-left bg-gradient-to-br from-teal-700 to-slate-800 text-white focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${selectedExperience === item.id ? 'ring-4 ring-teal-500/50' : ''}`}>
                <span><strong className="font-serif text-xl block mb-1">{item.title}</strong><span className="text-sm text-teal-50">{item.subtitle}</span></span>
              </button>)}
            </div>
          </div>
          <div className="mt-5 bg-teal-50 border border-teal-100 rounded-xl p-5" aria-live="polite">
            <h3 className="font-serif text-xl text-teal-950 mb-2">{currentExperience.title}</h3>
            <p className="text-sm text-teal-900">{currentExperience.details}</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <section aria-labelledby="hotel-dining" className="bg-white p-7 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 id="hotel-dining" className="text-2xl font-serif text-gray-900 mb-4">Гастрономия</h2>
            <div role="img" aria-label="Место для фотографии Paradise Dining" className="h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">[Фото: Paradise Dining]</div>
            <h3 className="font-semibold text-gray-900 mb-2">Paradise Dining</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">Гостиничная гастрономия: рестораны и бары курортного комплекса, обслуживание номеров и возможность отдыха с видом на океан.</p>
            <p className="text-gray-500 text-xs leading-relaxed">Конкретные рестораны, меню, стоимость, часы работы и порядок заказа пока не утверждены. Рестораны гостиницы не следует путать с заведениями Paradise Market.</p>
          </section>
          <section aria-labelledby="hotel-services" className="bg-white p-7 md:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 id="hotel-services" className="text-2xl font-serif text-gray-900 mb-4">Услуги и комфорт</h2>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Сервис</h3>
                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5"><li>Круглосуточная стойка регистрации</li><li>Служба консьержа и хранение багажа</li><li>Безопасность и помощь гостям</li></ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Отдых</h3>
                <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5"><li>Grand Infinity Pool</li><li>Grand Kids Club</li><li>Grand Wellness и фитнес</li></ul>
                <p className="text-xs text-gray-500 mt-2">Условия доступа и перечень услуг отдельных пространств уточняются.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Как передвигаться по острову</h3>
                <p className="text-sm text-gray-700 mb-3">Отель находится на северо-западе острова. К другим зонам можно добраться пешком по предусмотренным дорожкам либо воспользоваться бесплатным Paradise Loop. Индивидуальный трансфер предусмотрен как концепция; детали доступа и стоимость уточняются.</p>
              </div>
            </div>
          </section>
        </div>

        <section aria-labelledby="hotel-packages" className="bg-amber-50 border border-amber-200 p-6 rounded-3xl">
          <h2 id="hotel-packages" className="text-xl font-serif text-amber-950 mb-3">Пакеты проживания</h2>
          <p className="text-sm text-amber-900 mb-4"><strong>Предварительная концепция, не действующие предложения.</strong> Цены, состав пакетов и условия проживания не утверждены. Проживание не предполагает автоматического доступа ко всем платным услугам аквапарка.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-amber-950">
            <li>• Room Only — проживание без питания</li><li>• Bed &amp; Breakfast — проживание с завтраком</li><li>• Stay &amp; Splash — проживание с доступом в аквапарк</li><li>• Family Paradise Package — семейный пакет</li><li>• Premium Paradise Experience — расширенный пакет</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
