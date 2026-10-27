import { useState } from 'react';

// Заглушки для страниц (пока просто текст)
const HomePage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Главная страница (в разработке)</h1></div>;
const ZonesPage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Девять миров (в разработке)</h1></div>;
const AttractionsPage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Аттракционы (в разработке)</h1></div>;
const MapPage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Карта острова (в разработке)</h1></div>;
const HotelPage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Отель (в разработке)</h1></div>;
const VisitPage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Посещение (в разработке)</h1></div>;
const TicketsPage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Билеты (в разработке)</h1></div>;
const PlannerPage = () => <div className="p-8 text-center"><h1 className="text-4xl text-teal-800">Планировщик (в разработке)</h1></div>;

function App() {
  // Простейший роутинг на основе хэша в URL (например, #/tickets)
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
      {/* Шапка сайта */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
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

      {/* Контент страницы */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Подвал сайта */}
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
