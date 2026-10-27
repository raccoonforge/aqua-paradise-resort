import TicketsPage from './TicketsPage';
import AttractionsPage from './AttractionsPage';
import ZonesPage from './ZonesPage';
import { useState } from 'react';

// Блок "О курорте"
const AboutResort = () => {
  // Состояние: сколько карточек мы уже смахнули (от 0 до 4)
  const [revealedCount, setRevealedCount] = useState(0);

  const photos = [
    { title: "Ocean Bay", text: "Там, где начинается рай", color: "bg-cyan-100", pos: "-translate-x-32 -translate-y-16 -rotate-12" },
    { title: "Adrenaline Peak", text: "Почувствуй силу приключений", color: "bg-orange-100", pos: "translate-x-32 -translate-y-8 rotate-12" },
    { title: "Eden Gardens", text: "Найди гармонию с природой", color: "bg-green-100", pos: "-translate-x-24 translate-y-24 -rotate-6" },
    { title: "Paradise Grand Hotel", text: "Искусство безупречного отдыха", color: "bg-amber-50", pos: "translate-x-24 translate-y-16 rotate-6" }
  ];

  const handleSwipe = () => {
    if (revealedCount < 4) {
      setRevealedCount(prev => prev + 1);
    }
  };

  return (
    <section id="about" className="py-24 bg-[#f8f9fa] overflow-hidden min-h-[700px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full relative">
        
        {/* Фоновый текст, который открывается */}
        <div className={`transition-opacity duration-1000 delay-300 max-w-2xl mx-auto text-center space-y-6 ${revealedCount === 4 ? 'opacity-100' : 'opacity-0'}`}>
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

        {/* Стопка полароидов */}
        <div 
          className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity duration-500 ${revealedCount === 4 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onClick={handleSwipe}
        >
          {photos.map((photo, index) => {
            // Карточка видна, если ее еще не смахнули
            const isRevealed = index < revealedCount;
            
            // Вычисляем z-index: верхняя карточка (индекс 0) имеет самый высокий z-index
            const zIndex = photos.length - index;

            return (
              <div 
                key={index} 
                className={`absolute bg-white p-3 pb-8 rounded-sm shadow-2xl transition-all duration-700 ease-out origin-center
                  ${isRevealed ? photo.pos + ' opacity-0 scale-90' : 'translate-y-0 rotate-0 scale-100 opacity-100'}
                `}
                style={{ zIndex }}
              >
                <div className={`w-64 h-64 sm:w-72 sm:h-72 ${photo.color} rounded-sm mb-4 flex items-center justify-center text-gray-400 text-sm`}>
                  [Фото]
                </div>
                <h3 className="font-serif text-lg text-gray-900 text-center">{photo.title}</h3>
                <p className="text-xs text-gray-500 text-center mt-1">{photo.text}</p>
              </div>
            );
          })}
        </div>

        {/* Подсказка */}
        <div className={`absolute bottom-10 left-0 right-0 text-center transition-opacity duration-300 ${revealedCount === 4 ? 'opacity-0' : 'opacity-100'}`}>
           <p className="text-teal-600 font-medium animate-pulse">Нажмите на карточку, чтобы смахнуть её</p>
        </div>

      </div>
    </section>
  );
};

const NineWorlds = () => {
  const zones = [
    { id: 'ocean-bay', name: 'Ocean Bay', desc: 'Сердце курорта. Белоснежный песок, лазурная лагуна и безмятежность.', color: 'from-cyan-400/40 to-blue-900/80' },
    { id: 'adrenaline-peak', name: 'Adrenaline Peak', desc: 'Вызов для смельчаков. Самые высокие и быстрые водные горки острова.', color: 'from-orange-500/40 to-red-900/80' },
    { id: 'eden-gardens', name: 'Eden Gardens', desc: 'Тропический рай. Редкие растения, водопады и невероятная тишина.', color: 'from-green-500/40 to-emerald-900/80' },
    { id: 'atlantis-realm', name: 'Atlantis Realm', desc: 'Затерянный город. Погружение в мифы и подводные приключения.', color: 'from-blue-600/40 to-indigo-900/80' },
    { id: 'pirates-cove', name: "Pirate's Cove", desc: 'Остров сокровищ. Приключения для всей семьи в декорациях пиратских историй.', color: 'from-amber-600/40 to-stone-900/80' },
    { id: 'serenity-spa', name: 'Serenity Spa', desc: 'Место силы. Премиальные спа-процедуры и абсолютный релакс.', color: 'from-purple-400/40 to-slate-900/80' },
    { id: 'little-paradise', name: 'Little Paradise', desc: 'Мир для самых маленьких. Безопасные горки и любимые герои.', color: 'from-pink-400/40 to-rose-900/80' },
    { id: 'paradise-market', name: 'Paradise Market', desc: 'Вкус острова. Рестораны, кафе и колоритные местные товары.', color: 'from-yellow-500/40 to-orange-900/80' },
    { id: 'paradise-boulevard', name: 'Paradise Boulevard', desc: 'Центральная артерия. Главные площади, шоу и вечерние прогулки.', color: 'from-teal-400/40 to-teal-900/80' },
  ];

  const [activeZone, setActiveZone] = useState(0);

  return (
    <section className="relative h-[80vh] min-h-[600px] flex flex-col justify-between overflow-hidden">
      {/* Динамический фон */}
      <div className={`absolute inset-0 bg-gradient-to-t ${zones[activeZone].color} transition-colors duration-1000 ease-in-out`}></div>
      
      {/* Контент зоны (слева) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full pt-20 flex-grow flex flex-col justify-center">
        <div className="max-w-xl text-white">
          <span className="tracking-widest text-sm font-semibold uppercase mb-4 block opacity-80">EXPLORE THE ISLAND</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-6 drop-shadow-lg transition-all duration-500">
            {zones[activeZone].name}
          </h2>
          <p className="text-lg md:text-xl text-gray-100 mb-8 font-light drop-shadow-md transition-all duration-500">
            {zones[activeZone].desc}
          </p>
          <button 
            onClick={() => window.location.hash = `#/zones?zone=${zones[activeZone].id}`}
            className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition shadow-lg"
          >
            Подробнее о зоне
          </button>
        </div>
      </div>

      {/* Лента миниатюр (снизу) */}
      <div className="relative z-10 w-full bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-hide">
            {zones.map((zone, index) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(index)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeZone === index 
                    ? 'bg-white text-gray-900 shadow-lg scale-105' 
                    : 'bg-white/10 text-white hover:bg-white/20'
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

// Главная страница (Hero + About)
const HomePage = () => (
  <>
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/20 via-cyan-600/40 to-[#f8f9fa] z-0"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-teal-800 tracking-[0.2em] font-semibold text-sm mb-6 uppercase">
          WELCOME TO AQUA PARADISE
        </span>
        
        <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-tight">
          Ты ещё не видел <br className="hidden md:block"/> рай таким.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl font-light">
          Девять уникальных миров. Один тропический остров. От безмятежных лагун до захватывающих приключений — здесь каждый найдёт свой рай.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => {
              const el = document.getElementById('about');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-teal-700 transition shadow-lg"
          >
            Исследовать остров
          </button>
          <button 
            onClick={() => window.location.hash = '#/planner'}
            className="bg-white/80 backdrop-blur text-teal-900 border border-teal-600/30 px-8 py-3 rounded-full text-lg font-medium hover:bg-white transition shadow-lg"
          >
            Спланировать отдых
          </button>
        </div>
        
        <div className="mt-20 text-sm tracking-[0.15em] text-teal-900/60 font-medium">
          OCEAN BAY · AQUA PARADISE
        </div>
      </div>
    </div>

        {/* Вот здесь мы выводим блок "О курорте" */}
    <AboutResort />

        {/* Блок "Девять миров" */}
    <NineWorlds />

        {/* Блок "Аттракционы" */}
    <AttractionsCarousel />

    {/* Блок "Планировщик" */}
    <PlannerTeaser />
  </>
);

const AttractionsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const rides = [
    { name: "Skyfall", zone: "Adrenaline Peak", intensity: "Экстрим", desc: "Свободное падение с высоты 40 метров.", age: "16+", height: "150 см", color: "bg-blue-200" },
    { name: "Poseidon's Descent", zone: "Atlantis Realm", intensity: "Высокая", desc: "Крутые виражи в недрах подводного города.", age: "14+", height: "140 см", color: "bg-teal-200" },
    { name: "Stormbreaker", zone: "Adrenaline Peak", intensity: "Средняя", desc: "Семейная горка с неожиданными поворотами.", age: "6+", height: "110 см", color: "bg-indigo-200" },
    { name: "Crystal Passage", zone: "Eden Gardens", intensity: "Спокойная", desc: "Плавное путешествие среди кристальных пещер.", age: "4+", height: "100 см", color: "bg-emerald-200" },
  ];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % rides.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + rides.length) % rides.length);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Выберите своё приключение</h2>
        <p className="text-gray-600">От захватывающих дух спусков до спокойных прогулок по воде.</p>
      </div>

      <div className="relative max-w-5xl mx-auto flex items-center justify-center h-[400px]">
        {/* Левая стрелка */}
        <button onClick={prevSlide} className="absolute left-4 z-20 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white text-gray-800 transition">
          ←
        </button>

        {/* Карточки */}
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
          {rides.map((ride, index) => {
            // Вычисляем позицию карточки относительно активной
            let offset = index - activeIndex;
            if (offset < -1) offset += rides.length;
            if (offset > 1) offset -= rides.length;

            // Показываем только 3 карточки: центральную и две по бокам
            if (Math.abs(offset) > 1) return null;

            const isActive = offset === 0;
            
            return (
              <div 
                key={index}
                className={`absolute w-[300px] md:w-[400px] bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out
                  ${isActive ? 'z-10 scale-100 opacity-100' : 'scale-90 opacity-50 blur-[1px]'}
                `}
                style={{
                  transform: `translateX(${offset * 60}%) scale(${isActive ? 1 : 0.85})`,
                  zIndex: isActive ? 10 : 5
                }}
              >
                <div className={`h-48 md:h-64 ${ride.color} flex items-center justify-center text-gray-500`}>
                  [Фото: {ride.name}]
                </div>
                <div className="p-6 text-left relative bg-white">
                  <span className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-2 block">{ride.zone}</span>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">{ride.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{ride.desc}</p>
                  
                  <div className="flex gap-4 text-xs font-medium text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <span className="flex items-center gap-1">🔥 {ride.intensity}</span>
                    <span className="flex items-center gap-1">👤 {ride.age}</span>
                    <span className="flex items-center gap-1">📏 {ride.height}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Правая стрелка */}
        <button onClick={nextSlide} className="absolute right-4 z-20 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white text-gray-800 transition">
          →
        </button>
      </div>
      
      <div className="text-center mt-8">
        <button onClick={() => window.location.hash = '#/attractions'} className="text-teal-600 font-medium hover:text-teal-800 underline underline-offset-4">
          Смотреть все аттракционы
        </button>
      </div>
    </section>
  );
};

const PlannerTeaser = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelected(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const interests = ["Адреналин", "Семейный отдых", "Релакс", "Исследования"];

  return (
    <section className="py-24 bg-teal-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="tracking-widest text-teal-300 text-sm font-semibold uppercase mb-2 block">PLAN YOUR DAY</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6">Собери свой идеальный день.</h2>
        <p className="text-teal-100 mb-10 text-lg">Выберите то, что вам по душе, и мы покажем, каким может быть ваш отдых.</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {interests.map(interest => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-6 py-3 rounded-full border-2 transition-all font-medium ${
                selected.includes(interest) 
                  ? 'bg-teal-400 border-teal-400 text-teal-900' 
                  : 'border-teal-700 hover:border-teal-500 text-teal-100'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        <button 
          onClick={() => window.location.hash = '#/planner'}
          className="bg-white text-teal-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition shadow-lg"
        >
          Открыть полный планировщик
        </button>
      </div>
    </section>
  );
};

// Заглушки для других страниц
const MapPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Карта острова (в разработке)</h1></div>;
const HotelPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Отель (в разработке)</h1></div>;
const VisitPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Посещение (в разработке)</h1></div>;
const PlannerPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Планировщик (в разработке)</h1></div>;

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '#/zones': 
  // Достаем параметр zone из хэша, если он есть
  const urlParams = new URLSearchParams(currentPath.split('?')[1]);
  return <ZonesPage initialZone={urlParams.get('zone') || undefined} />;
      case '#/attractions': 
  const attrParams = new URLSearchParams(currentPath.split('?')[1]);
  return <AttractionsPage initialRide={attrParams.get('ride') || undefined} />;
      case '#/map': return <MapPage />;
      case '#/hotel': return <HotelPage />;
      case '#/visit': return <VisitPage />;
      case '#/tickets': return <TicketsPage />;
      case '#/planner': return <PlannerPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-teal-900 cursor-pointer" onClick={() => navigate('#/')}>
            🌴 Aqua Paradise
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <button onClick={() => navigate('#/')} className="hover:text-teal-600">Главная</button>
            <button onClick={() => navigate('#/zones')} className="hover:text-teal-600">Зоны</button>
            <button onClick={() => navigate('#/attractions')} className="hover:text-teal-600">Аттракционы</button>
            <button onClick={() => navigate('#/map')} className="hover:text-teal-600">Карта</button>
            <button onClick={() => navigate('#/hotel')} className="hover:text-teal-600">Отель</button>
            <button onClick={() => navigate('#/visit')} className="hover:text-teal-600">Посещение</button>
            <button onClick={() => navigate('#/tickets')} className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition">Билеты</button>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {renderPage()}
      </main>

      <footer className="bg-[#0a192f] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif mb-4">Aqua Paradise</h2>
          <p className="text-teal-200 mb-8">Девять миров. Один остров. Тысячи впечатлений.</p>
          <p className="text-sm text-gray-400">
            Демонстрационный проект. Курорт, цены и услуги вымышлены. Реальные бронирования и платежи не осуществляются.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
