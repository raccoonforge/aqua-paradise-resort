import Header from "./components/Header";
import Hero from "./components/Hero";
import {
  AttractionHighlights,
  IslandIntro,
  VisitPreview,
  ZoneOverview,
} from "./components/IslandSections";

function App() {
  return (
    <div id="home">
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <IslandIntro />
        <ZoneOverview />
        <AttractionHighlights />
        <VisitPreview />
      </main>
      <footer className="site-footer container">
        <div>
          <a href="#home" className="footer-brand">
            Aqua Paradise <span>Island Resort</span>
          </a>
          <p>Тропический остров. Ваше приключение.</p>
        </div>
        <p className="demo-note">
          Вымышленный курорт · Портфолио-проект
          <br />
          Все сведения демонстрационные.
          <br />
          Реальные продажи и бронирования не выполняются.
        </p>
        <a className="text-link" href="#home">
          Наверх ↑
        </a>
      </footer>
    </div>
  );
}
export default App;
