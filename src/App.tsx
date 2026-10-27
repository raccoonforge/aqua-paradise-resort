import { useState } from 'react';

// Блок "О курорте"
const AboutResort = () => {
  const photos = [
    { title: "Ocean Bay", text: "Там, где начинается рай", color: "bg-cyan-100", rotate: "-rotate-3" },
    { title: "Adrenaline Peak", text: "Почувствуй силу приключений", color: "bg-orange-100", rotate: "rotate-2" },
    { title: "Eden Gardens", text: "Найди гармонию с природой", color: "bg-green-100", rotate: "-rotate-1" },
    { title: "Paradise Grand Hotel", text: "Искусство безупречного отдыха", color: "bg-amber-50", rotate: "rotate-3" }
  ];

  return (
    <section id="about" className="py-24 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-teal-700 tracking-widest text-sm font-semibold uppercase mb-2 block">ABOUT THE RESORT</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Один остров. Девять миров впечатлений.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-6 p-4">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className={`bg-white p-3 pb-8 rounded-sm shadow-xl transform transition-transform hover:scale-105 hover:rotate-0 cursor-pointer ${photo.rotate}`}
              >
                <div className={`w-full aspect-square ${photo.color} rounded-sm mb-4 flex items-center justify-center text-gray-500 text-sm`}>
                  [Фото]
                </div>
                <h3 className="font-serif text-lg text-gray-900 text-center">{photo.title}</h3>
                <p className="text-xs text-gray-500 text-center mt-1">{photo.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-serif text-gray-800">Aqua Paradise — это место, где мечты об идеальном отдыхе становятся реальностью.</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Крупный тропический курорт, где захватывающие приключения гармонично сочетаются с белоснежным пляжем, нетронутой природой и премиальным комфортом.
            </p>
            <ul className="space-y-4 mt-8">
              <li className="flex items-center gap-4">
                <span className="text-3xl font-serif text-teal-600">9</span>
                <span className="text-gray-700 font-medium">тематических зон</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-3xl font-serif text-teal-600">09:00–22:00</span>
                <span className="text-gray-700 font-medium">ежедневные часы работы</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="text-3xl font-serif text-teal-600">6 км²</span>
                <span className="text-gray-700 font-medium">площадь суши острова</span>
              </li>
            </ul>
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
