import PlannerPage from './PlannerPage';
import MapPage from './MapPage';
import HotelPage from './HotelPage';
import VisitPage from './VisitPage';
import TicketsPage from './TicketsPage';
import AttractionsPage, { type CatalogueNavigation } from './AttractionsPage';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './retro-hero.css';
import './riviera.css';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutResort from './components/AboutResort';
import ParadiseViewMaster from './components/ParadiseViewMaster';
import GoldenTickets from './components/GoldenTickets';
import DepartureBoard from './components/DepartureBoard';
import SunsetPier from './components/SunsetPier';
import './HomeFidelity.css';
import './hero-reference.css';
import './home-design-system.css';
import './ZonesPage.css';
import './AttractionsPage.css';

const ZonesPage = lazy(() => import('./ZonesPage'));

function scrollToSection(section: string) {
  const target = document.getElementById(section);
  if (!target) return;
  target.focus({ preventScroll: true });
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  });
}

function HomePage() {
  return <><Hero /><AboutResort /><ParadiseViewMaster /><GoldenTickets /><DepartureBoard /></>;
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const basePath = currentPath.split('?')[0];
  const home = basePath === '#/';
  const atlas = basePath === '#/zones';
  const catalogue = basePath === '#/attractions';
  const hotel = basePath === '#/hotel';
  const editorial = atlas || catalogue;
  const previousBasePath = useRef<string | null>(null);
  const navigate = (path: string) => { window.location.hash = path; };
  const navigateCatalogue: CatalogueNavigation = (path, mode) => {
    if (path === window.location.hash) return;
    if (mode === 'open-ride') window.history.pushState({ attractionModal: true }, '', path);
    else window.history.replaceState(null, '', path);
    setCurrentPath(path);
  };
  useEffect(() => {
    const update = () => setCurrentPath(window.location.hash || '#/');
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);
  useEffect(() => {
    const previous = previousBasePath.current;
    previousBasePath.current = basePath;
    if (editorial && previous === basePath) return;
    const section = new URLSearchParams(currentPath.split('?')[1]).get('section');
    if ((home || hotel) && section) {
      const frame = requestAnimationFrame(() => scrollToSection(section));
      return () => cancelAnimationFrame(frame);
    }
    if (!(basePath === '#/visit' && section)) window.scrollTo({top: 0, behavior: 'instant'});
  }, [home, hotel, editorial, basePath, currentPath]);

  const renderPage = () => {
    const [base, queryString] = currentPath.split('?');

    switch (base) {
      case '#/zones': {
        const urlParams = new URLSearchParams(queryString);
        return <Suspense fallback={<p className="atlas-loading" role="status">Загрузка атласа…</p>}>
          <ZonesPage zoneId={urlParams.get('zone')} tabId={urlParams.get('tab')} navigate={navigate} />
        </Suspense>;
      }
      case '#/attractions': return <AttractionsPage query={queryString ?? ''} navigate={navigateCatalogue} />;
      case '#/map': return <MapPage />;
      case '#/hotel': return <HotelPage />;
      case '#/visit': return <VisitPage key={currentPath} />;
      case '#/tickets': return <TicketsPage />;
      case '#/planner': {
        const plannerParams = new URLSearchParams(queryString);
        return <PlannerPage key={currentPath} initialDate={plannerParams.get('date')} initialParty={plannerParams.get('party')} initialInterests={plannerParams.get('interests') || undefined} />;
      }
      default: return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#f8f9fa] font-sans${atlas ? ' atlas-shell' : catalogue ? ' catalogue-shell' : hotel ? ' hotel-shell' : ''}`} onClick={event => {
      if ((!home && !hotel) || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (link?.hash === currentPath) {
        const section = new URLSearchParams(currentPath.split('?')[1]).get('section');
        scrollToSection(section ?? 'hero');
      }
    }}>
      <a href="#main-content" className="apr-skip-link" onClick={event => {
        event.preventDefault();
        document.getElementById('main-content')?.focus();
      }}>Перейти к основному содержимому</a>
      <Header key={editorial || hotel ? basePath : currentPath} home={home || editorial || hotel} />
      <main id="main-content" tabIndex={-1} className={home ? 'riv-home' : atlas ? 'atlas-main flex-grow' : catalogue ? 'catalogue-main flex-grow' : hotel ? 'hotel-main flex-grow' : 'riv-interior flex-grow'}>{renderPage()}</main>
      {home || editorial || hotel ? <SunsetPier /> : (
      <footer className="bg-[#0a192f] text-white py-12 mt-auto">
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
      )}
    </div>
  );
}
export default App;
