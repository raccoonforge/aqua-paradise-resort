import { useFocusTrap } from "./hooks/useFocusTrap";
import PlannerPage from "./PlannerPage";
import MapPage from "./MapPage";
import HotelPage from "./HotelPage";
import VisitPage from "./VisitPage";
import TicketsPage from "./TicketsPage";
import AttractionsPage from "./AttractionsPage";
import ZonesPage from "./ZonesPage";
import { useState, useEffect, useRef } from "react";
import { ZONE_SLUGS, ATTRACTIONS } from "./data/attractions";

const worlds = [
  ["Ocean Bay", "Лагуна, пляж и медленная река"],
  ["Adrenaline Peak", "Скорость, высота и свободное падение"],
  ["Eden Gardens", "Тропические сады и водопады"],
  ["Atlantis Realm", "Водные маршруты затерянного города"],
  ["Pirate's Cove", "Семейные приключения в бухте"],
  ["Serenity Spa", "Термальные бассейны и тишина"],
  ["Little Paradise", "Водный мир для маленьких гостей"],
  ["Paradise Market", "Вкусы и находки острова"],
  ["Paradise Boulevard", "Площади, шоу и вечерние прогулки"],
];
const HomePage = () => (
  <div className="editorial-home">
    <section className="island-cover" aria-labelledby="cover-title">
      <div className="cover-kicker">
        <span>ОСТРОВНОЙ КУРОРТ · АКВАПАРК</span>
        <span>THE ART OF WATER / 01</span>
      </div>
      <div className="cover-heading">
        <h1 id="cover-title">
          Девять миров.
          <br />
          <em>Один рай.</em>
        </h1>
        <p>
          Целый остров водных приключений.
          <br />
          От первого всплеска до последнего
          <br />
          луча солнца — в вашем ритме.
        </p>
      </div>
      <div className="cover-body">
        <div className="cover-note">
          <span className="edition">A / P</span>
          <p>
            Горки над тропиками.
            <br />
            Лагуны среди садов.
            <br />
            Дни, которые хочется продлить.
          </p>
          <a className="primary-link" href="#/tickets">
            Выбрать билет <span>→</span>
          </a>
          <a className="text-link" href="#/planner">
            Спланировать день →
          </a>
          <small>
            09:00–22:00 · Время работы курорта
            <br />
            Ограничения указаны у аттракционов
          </small>
        </div>
        <figure className="cover-art">
          <img
            fetchPriority="high"
            src={`${import.meta.env.BASE_URL}art/water-atlas.webp`}
            alt="Печатная иллюстрация: бирюзовые водные горки, лагуна и гости на кругах среди пальм"
          />
          <figcaption>
            БОЛЬШЕ ВОДЫ. БОЛЬШЕ ЖИЗНИ.{" "}
            <span>ILLUSTRATED ISLAND SERIES — 01</span>
          </figcaption>
        </figure>
      </div>
    </section>
    <nav className="quick-index" aria-label="Быстрые переходы">
      {[
        ["Билеты", "Выберите свой формат", "tickets"],
        ["Девять миров", "Найдите свой остров", "zones"],
        ["Аттракционы", "От релакса до экстрима", "attractions"],
        ["Планировщик", "Соберите идеальный день", "planner"],
      ].map(([title, desc, url], i) => (
        <a key={url} href={"#/" + url}>
          <small>0{i + 1} /</small>
          <strong>{title} →</strong>
          <span>{desc}</span>
        </a>
      ))}
    </nav>
    <section className="world-index">
      <div className="section-heading">
        <span className="eyebrow">01 / АТЛАС ВПЕЧАТЛЕНИЙ</span>
        <h2>
          Для каждого настроения
          <br />
          <em>свой мир.</em>
        </h2>
        <p>
          Девять характеров одного острова.
          <br />
          Выберите, с чего начнётся ваш день.
        </p>
      </div>
      <div className="world-list">
        {worlds.map(([name, desc], i) => (
          <a key={name} href={"#/zones?zone=" + ZONE_SLUGS[name]}>
            <span className="world-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{name}</h3>
            <p>{desc}</p>
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
    <section className="ride-edit">
      <div className="section-heading">
        <span className="eyebrow">02 / ВОДА В ДВИЖЕНИИ</span>
        <h2>
          Ваш пульс.
          <br />
          <em>Ваша стихия.</em>
        </h2>
        <a className="text-link" href="#/attractions">
          Весь каталог и фильтры →
        </a>
      </div>
      <div className="ride-selection">
        {["skyfall", "stormbreaker", "crystal-passage"].map((id, i) => {
          const ride = ATTRACTIONS.find((r) => r.id === id)!;
          return (
            <a key={id} href={"#/attractions?ride=" + id}>
              <small>
                0{i + 1} / {ride.intensity}
              </small>
              <h3>{ride.name}</h3>
              <p>{ride.desc}</p>
              <span>
                {ride.minAge}+ лет · от {ride.minHeight} см <b>→</b>
              </span>
            </a>
          );
        })}
      </div>
    </section>
    <PlannerTeaser />
    <section className="stay-note">
      <span className="eyebrow">03 / ОСТАНЬТЕСЬ ПОДОЛЬШЕ</span>
      <h2>
        Рай не заканчивается
        <br />
        <em>на закате.</em>
      </h2>
      <div>
        <p>
          Paradise Grand Hotel & Villas
          <br />
          Номера, сьюты и приватные виллы на побережье.
        </p>
        <a className="primary-link" href="#/hotel">
          Открыть отель →
        </a>
      </div>
    </section>
  </div>
);

// Мини-планировщик: реальная рекомендация на основе интересов
const PlannerTeaser = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const interests = ["Адреналин", "Семейный отдых", "Релакс", "Исследования"];

  // Маппинг интересов → категории интенсивности
  const interestToIntensity: Record<string, string[]> = {
    Адреналин: ["Экстрим", "Высокая"],
    "Семейный отдых": ["Семейная", "Спокойная"],
    Релакс: ["Спокойная"],
    Исследования: ["Спокойная", "Средняя"],
  };

  const toggleInterest = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  // 3 рекомендации: утро / день / вечер
  const recommendation = (() => {
    if (selected.length === 0) return null;

    // Собираем объекты, соответствующие хотя бы одному выбранному интересу
    const matchedIntensities = Array.from(
      new Set(
        selected.flatMap((interest) => interestToIntensity[interest] || []),
      ),
    );

    const matched = ATTRACTIONS.filter((attr) =>
      matchedIntensities.includes(attr.intensity),
    );

    if (matched.length === 0) return null;

    // Утро: первый из matched
    const morning = matched[0];
    // День: второй (или первый, если только один)
    const afternoon = matched[1] || matched[0];
    // Вечер: приоритет спокойным / семейным
    const evening =
      matched.find(
        (a) => a.intensity === "Спокойная" || a.intensity === "Семейная",
      ) || matched[matched.length - 1];

    // Убираем дубли, если matched.length < 3
    const unique = [morning, afternoon, evening].filter(
      (item, idx, arr) => idx === 0 || item.id !== arr[idx - 1].id,
    );

    return unique;
  })();

  const handleOpenPlanner = () => {
    if (selected.length === 0) {
      window.location.hash = "#/planner";
    } else {
      const interestsParam = encodeURIComponent(selected.join(","));
      window.location.hash = `#/planner?interests=${interestsParam}`;
    }
  };

  return (
    <section className="py-24 bg-teal-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="tracking-widest text-teal-300 text-sm font-semibold uppercase mb-2 block">
          PLAN YOUR DAY
        </span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          Собери свой идеальный день.
        </h2>
        <p className="text-teal-100 mb-10 text-lg">
          Выберите то, что вам по душе, и мы покажем, каким может быть ваш
          отдых.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              aria-pressed={selected.includes(interest)}
              className={`px-6 py-3 rounded-full border-2 transition-all font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 ${
                selected.includes(interest)
                  ? "bg-teal-400 border-teal-400 text-teal-900"
                  : "border-teal-700 hover:border-teal-500 text-teal-100"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* Пример дня — 3 карточки */}
        {recommendation && recommendation.length > 0 && (
          <div className="mb-10 animate-fade-in">
            <p className="text-sm text-teal-200 mb-4 uppercase tracking-wider">
              Пример дня
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {["Утро", "День", "Вечер"].map((period, idx) => {
                const item = recommendation[idx];
                if (!item) return null;
                return (
                  <div
                    key={period}
                    className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10"
                  >
                    <span className="text-xs text-teal-300 font-bold uppercase tracking-wider">
                      {period}
                    </span>
                    <h3 className="font-serif text-xl text-white mt-1 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-teal-200 mb-2">{item.zone}</p>
                    <p className="text-sm text-gray-200 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-teal-300 mt-3">
              Это пример для вдохновения, а не гарантированное расписание.
              Полный план — в планировщике.
            </p>
          </div>
        )}

        {selected.length > 0 && !recommendation && (
          <p className="text-amber-200 text-sm mb-6">
            По выбранным интересам пока нет рекомендаций. Попробуйте другие или
            откройте полный планировщик.
          </p>
        )}

        <button
          onClick={handleOpenPlanner}
          className="bg-white text-teal-900 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {selected.length > 0
            ? "Открыть полный планировщик с этими интересами"
            : "Открыть полный планировщик"}
        </button>
      </div>
    </section>
  );
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || "#/");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useFocusTrap<HTMLDivElement>(isMobileMenuOpen);

  const navigate = (path: string) => {
    window.location.assign(path);
    setCurrentPath(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        if (menuButtonRef.current) menuButtonRef.current.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || "#/");
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Скролл вверх при смене страницы
  const basePath = currentPath.split("?")[0];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [basePath]);

  const renderPage = () => {
    const [base, queryString] = currentPath.split("?");

    switch (base) {
      case "#/zones": {
        const urlParams = new URLSearchParams(queryString);
        return (
          <ZonesPage
            initialZone={urlParams.get("zone") || undefined}
            initialTab={
              (urlParams.get("tab") as
                "overview" | "attractions" | "infrastructure" | "rules") ||
              undefined
            }
          />
        );
      }
      case "#/attractions": {
        const attrParams = new URLSearchParams(queryString);
        return (
          <AttractionsPage initialRide={attrParams.get("ride") || undefined} />
        );
      }
      case "#/map":
        return <MapPage />;
      case "#/hotel":
        return <HotelPage />;
      case "#/visit":
        return <VisitPage />;
      case "#/tickets":
        return <TicketsPage />;
      case "#/planner": {
        const plannerParams = new URLSearchParams(queryString);
        return (
          <PlannerPage
            initialInterests={plannerParams.get("interests") || undefined}
          />
        );
      }
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] font-sans">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        К содержанию
      </a>
      <header className="site-header bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a className="brand" href="#/">
            AQUA PARADISE<span>ISLAND RESORT & WATERPARK</span>
          </a>

          <nav
            aria-label="Основная навигация"
            className="hidden md:flex gap-6 text-sm font-medium text-gray-600"
          >
            {(
              [
                { path: "#/", label: "Главная" },
                { path: "#/zones", label: "Зоны" },
                { path: "#/attractions", label: "Аттракционы" },
                { path: "#/map", label: "Карта" },
                { path: "#/hotel", label: "Отель" },
                { path: "#/visit", label: "Посещение" },
                { path: "#/planner", label: "Планировщик" },
              ] as const
            ).map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                aria-current={basePath === item.path ? "page" : undefined}
                className={`rounded-sm border-b-2 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 ${basePath === item.path ? "border-teal-600 text-teal-700" : "border-transparent hover:border-teal-300 hover:text-teal-600"}`}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate("#/tickets")}
              aria-current={basePath === "#/tickets" ? "page" : undefined}
              className={`bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700 transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600 ${basePath === "#/tickets" ? "ring-2 ring-teal-800 ring-offset-2" : ""}`}
            >
              Билеты
            </button>
          </nav>

          <button
            ref={menuButtonRef}
            className="md:hidden p-2 text-gray-600 hover:text-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Меню сайта"
            className="absolute top-0 right-0 w-[80%] max-w-sm h-full bg-white shadow-2xl flex flex-col animate-slide-in"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <span className="font-bold text-teal-900">Меню</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded"
                aria-label="Закрыть меню"
              >
                ✕
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-2">
              {[
                { path: "#/", label: "Главная" },
                { path: "#/zones", label: "Зоны" },
                { path: "#/attractions", label: "Аттракционы" },
                { path: "#/map", label: "Карта" },
                { path: "#/hotel", label: "Отель" },
                { path: "#/visit", label: "Посещение" },
                { path: "#/planner", label: "Планировщик" },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  aria-current={basePath === item.path ? "page" : undefined}
                  className={`text-left py-3 px-4 rounded-xl font-medium transition focus-visible:outline-2 focus-visible:outline-teal-600 ${basePath === item.path ? "bg-teal-50 text-teal-800 border-l-4 border-teal-600" : "text-gray-800 hover:bg-teal-50 hover:text-teal-700 border-l-4 border-transparent"}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate("#/tickets")}
                  aria-current={basePath === "#/tickets" ? "page" : undefined}
                  className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition shadow-md"
                >
                  Купить билеты
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main id="main-content" tabIndex={-1} className="flex-grow">
        {renderPage()}
      </main>

      <footer className="bg-[#0a192f] text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-serif mb-2">Aqua Paradise</h2>
              <p className="text-teal-200 text-sm">
                Девять миров. Один остров. Тысячи впечатлений.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-3">
                Исследовать
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button
                    onClick={() => navigate("#/")}
                    className="hover:text-white"
                  >
                    О курорте
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("#/zones")}
                    className="hover:text-white"
                  >
                    Девять миров
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("#/attractions")}
                    className="hover:text-white"
                  >
                    Аттракционы
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("#/map")}
                    className="hover:text-white"
                  >
                    Карта острова
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-3">
                Спланировать
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button
                    onClick={() => navigate("#/tickets")}
                    className="hover:text-white"
                  >
                    Билеты
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("#/planner")}
                    className="hover:text-white"
                  >
                    Планировщик
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("#/hotel")}
                    className="hover:text-white"
                  >
                    Отель
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("#/visit")}
                    className="hover:text-white"
                  >
                    Посещение
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-sm text-gray-400">
              Демонстрационный проект. Курорт, цены и услуги вымышлены. Реальные
              бронирования и платежи не осуществляются.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
