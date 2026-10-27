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
  </>
);

// Заглушки для других страниц
const ZonesPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Девять миров (в разработке)</h1></div>;
const AttractionsPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Аттракционы (в разработке)</h1></div>;
const MapPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Карта острова (в разработке)</h1></div>;
const HotelPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Отель (в разработке)</h1></div>;
const VisitPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Посещение (в разработке)</h1></div>;
const TicketsPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Билеты (в разработке)</h1></div>;
const PlannerPage = () => <div className="p-8 text-center min-h-[60vh]"><h1 className="text-4xl text-teal-800">Планировщик (в разработке)</h1></div>;

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '#/zones': return <ZonesPage />;
      case '#/attractions': return <AttractionsPage />;
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
