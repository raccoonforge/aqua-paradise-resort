import { useEffect, useRef, useState } from "react";
import logo from "../assets/aqua-paradise-logo.png";

const links = [
  ["#island", "Об острове"],
  ["#zones", "Зоны острова"],
  ["#attractions", "Аттракционы"],
  ["#planner", "Планировщик"],
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        toggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="container header-row">
        <a
          href="#home"
          className="brand"
          aria-label="Aqua Paradise Island Resort — начало страницы"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={logo}
            alt="Aqua Paradise Island Resort"
            width="2172"
            height="724"
          />
        </a>
        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map(([href, text]) => (
            <a key={href} href={href}>
              {text}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            href="#tickets"
            className="button button-primary header-ticket"
            onClick={() => setIsMenuOpen(false)}
          >
            Билеты <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span
              className={isMenuOpen ? "menu-icon is-open" : "menu-icon"}
              aria-hidden="true"
            >
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav container"
        aria-label="Мобильная навигация"
        hidden={!isMenuOpen}
      >
        {links.map(([href, text], index) => (
          <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>
            <span className="nav-number" aria-hidden="true">
              0{index + 1}
            </span>
            {text}
            <span aria-hidden="true">↗</span>
          </a>
        ))}
        <p>Ваше путешествие начинается здесь.</p>
      </nav>
    </header>
  );
}
export default Header;
