import { useState } from 'react';

export default function HotelPage() {
  const [activeCategory, setActiveCategory] = useState<'rooms' | 'suites' | 'villas'>('rooms');
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Данные на основе Project Bible
  const categories = {
    rooms: {
      title: 'Номера',
      items: [
        { name: 'Standard Room', desc: 'Уютный номер с видом на тропические сады. Идеально для пар и индивидуальных путешественников.', amenities: ['Кондиционер', 'Wi-Fi', 'Мини-бар', 'Сейф', 'Терраса'] },
        { name: 'Ocean View Room', desc: 'Просторный номер с панорамным видом на океан и собственной террасой.', amenities: ['Кондиционер', 'Wi-Fi', 'Мини-бар', 'Сейф', 'Вид на океан', 'Терраса', 'Халаты и тапочки'] }
      ]
    },
    suites: {
      title: 'Сьюты',
      items: [
        { name: 'Family Suite', desc: 'Просторный люкс для всей семьи с отдельной гостиной зоной и детскими удобствами.', amenities: ['2 спальни', 'Гостиная', 'Wi-Fi', 'Детская кроватка', 'Мини-кухня', 'Вид на сад'] },
        { name: 'Premium Suite', desc: 'Люкс повышенной комфортности с премиальной отделкой и захватывающими видами.', amenities: ['Панорамные окна', 'Гостиная', 'Wi-Fi', 'Кофемашина', 'Ванна с видом', 'Услуги консьержа'] }
      ]
    },
    villas: {
      title: 'Виллы',
      items: [
        { name: 'Ocean View Villa', desc: 'Отдельная вилла с приватным бассейном и прямым доступом к пляжу.', amenities: ['Собственный бассейн', 'Терраса', '2 спальни', 'Wi-Fi', 'Обслуживание номеров 24/7', 'Приватный сад'] },
        { name: 'Royal Paradise Villa', desc: 'Наиболее приватная вилла с максимальным уровнем комфорта и эксклюзивными услугами.', amenities: ['Большой бассейн', 'Личный дворецкий', '3 спальни', 'Кинотеатр', 'Спа-зона', 'Трансфер'] }
      ]
    }
  };

  const currentItems = categories[activeCategory].items;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-gradient-to-br from-gray-900 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <span className="text-teal-300 tracking-widest text-sm font-semibold uppercase mb-4 block">Paradise Grand Hotel & Villas</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Искусство безупречного отдыха</h1>
          <p className="text-lg text-gray-300">Пятизвёздочный премиальный комплекс на уединённом северо-западном побережье.</p>
        </div>
      </div>

      {/* Интерактивный каталог */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 mb-12">
          
          <div className="flex justify-center gap-4 mb-10">
            {(['rooms', 'suites', 'villas'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setShowAllAmenities(false); }}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {categories[cat].title}
              </button>
            ))}
          </div>

          <div className="space-y-12">
            {currentItems.map((item, index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2 h-80 bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl flex items-center justify-center text-gray-500 shadow-inner">
                  [Фото: {item.name}]
                </div>
                
                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl font-serif text-gray-900 mb-4">{item.name}</h2>
                  <p className="text-gray-600 text-lg mb-6">{item.desc}</p>
                  
                  <button 
                    onClick={() => setShowAllAmenities(!showAllAmenities)}
                    className="text-teal-600 font-medium underline underline-offset-4 hover:text-teal-800 mb-4"
                  >
                    {showAllAmenities ? 'Скрыть удобства' : 'Все удобства'}
                  </button>

                  {showAllAmenities && (
                    <div className="grid grid-cols-2 gap-3 animate-fade-in bg-gray-50 p-4 rounded-xl">
                      {item.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="text-teal-500">✓</span> {amenity}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 p-4 bg-gray-100 rounded-xl text-center text-sm text-gray-500">
            На этапе MVP мы не осуществляем реальное бронирование и не показываем цены.
          </div>
        </div>

        {/* Галерея впечатлений */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 mb-12">
          <h2 className="text-3xl font-serif text-gray-900 mb-8 text-center">Отдых и впечатления</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
            <div className="bg-teal-100 rounded-2xl flex items-end p-6 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="relative z-20 text-white">
                <h3 className="font-serif text-2xl mb-1">Grand Infinity Pool</h3>
                <p className="text-sm text-gray-200">Панорамный бассейн с видом на океан</p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-teal-50 rounded-2xl flex items-end p-6 relative overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <div className="relative z-20 text-white">
                  <h3 className="font-serif text-xl mb-1">Grand Kids Club</h3>
                  <p className="text-xs text-gray-200">Детский клуб с развлечениями</p>
                </div>
              </div>
              <div className="bg-teal-50 rounded-2xl flex items-end p-6 relative overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                <div className="relative z-20 text-white">
                  <h3 className="font-serif text-xl mb-1">Grand Wellness</h3>
                  <p className="text-xs text-gray-200">Фитнес-центр и wellness-зона</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Рестораны и услуги */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Гастрономия</h2>
            <div className="h-48 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-400">[Фото: Paradise Dining]</div>
            <p className="text-gray-600">Рестораны с авторской кухней, обслуживание номеров и бары с видом на океан.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-serif text-gray-900 mb-4">Услуги и комфорт</h2>
            <ul className="space-y-3">
              {['Круглосуточная стойка регистрации', 'Служба консьержа', 'Хранение багажа', 'Транспортная связь с Paradise Loop', 'Службы безопасности и экстренной помощи'].map((s, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
