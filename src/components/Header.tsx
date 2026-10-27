import { useEffect, useRef, useState } from "react";
const logo = "/media/brand.webp";
import "./header.css";

const entertainment = [
  ["◈", "Тематические зоны", "/#zones", "Девять характеров одного острова"],
  ["↗", "Аттракционы", "/#attractions", "От спокойствия до адреналина"],
  ["☀", "Семейный отдых", "/#planner", "Выберите интересы всей семьи"],
];
const visiting = [
  ["↗", "Как добраться", "/visit#arrival", "Ваш путь в Aqua Paradise"],
  ["◌", "Транспорт на острове", "/visit#transport", "Paradise Loop и прогулки"],
  ["◇", "Правила и безопасность", "/visit#rules", "Подготовьтесь к отдыху"],
  ["?", "FAQ", "/visit#faq", "Ответы на частые вопросы"],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const onMap = window.location.pathname === "/map";
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown("");
    };
    const outside = (e: PointerEvent) => {
      if (!header.current?.contains(e.target as Node)) setDropdown("");
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const element = dialog.current,
      button = trigger.current;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      document.body.style.overflow = previous;
      element?.close();
      button?.focus();
    };
  }, [open]);
  const menu = (label: string, items: string[][], mobile = false) => (
    <div className="nav-group">
      <button
        aria-expanded={dropdown === label}
        aria-controls={`${mobile ? "mobile" : "desktop"}-${label}`}
        onClick={() => setDropdown(dropdown === label ? "" : label)}
      >
        {label} <span aria-hidden="true">⌄</span>
      </button>
      {dropdown === label && (
        <div
          className="nav-dropdown"
          id={`${mobile ? "mobile" : "desktop"}-${label}`}
        >
          {items.map(([icon, title, href, description]) => (
            <a
              key={title}
              href={href}
              onClick={() => {
                setOpen(false);
                setDropdown("");
              }}
            >
              <span aria-hidden="true">{icon}</span>
              <span>
                {title}
                <small>{description}</small>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
  const links = (mobile = false) => (
    <>
      <a href="/#about" onClick={() => setOpen(false)}>
        О курорте
      </a>
      {menu("Развлечения", entertainment, mobile)}
      <a href="/map">Карта острова</a>
      <a href="/hotel">Отель</a>
      {menu("Посещение", visiting, mobile)}
    </>
  );
  return (
    <header
      ref={header}
      className={`resort-header ${scrolled || onMap || window.location.pathname !== "/" ? "is-glass" : ""}`}
    >
      <a className="skip-link" href="#main-content">
        К содержимому
      </a>
      <nav className="header-inner" aria-label="Основная навигация">
        <a
          className="resort-brand"
          href="/"
          aria-label="Aqua Paradise — главная"
        >
          <img src={logo} alt="" />
          <span>
            Aqua Paradise<small>ISLAND RESORT</small>
          </span>
        </a>
        <div className="desktop-nav">{links()}</div>
        <a className="ticket-button" href="/tickets">
          Билеты <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-label="Открыть меню"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => {
            setDropdown("");
            setOpen(true);
          }}
        >
          ☰
        </button>
      </nav>
      <dialog
        ref={dialog}
        className="mobile-drawer"
        id="mobile-navigation"
        aria-label="Навигация"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="drawer-content">
          <button
            className="drawer-close"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <a className="resort-brand" href="/">
            <img src={logo} alt="" />
            <span>
              Aqua Paradise<small>ISLAND RESORT</small>
            </span>
          </a>
          <nav aria-label="Мобильная навигация">
            {links(true)}
            <a className="ticket-button" href="/tickets">
              Билеты ↗
            </a>
          </nav>
          <p>Девять миров. Один остров.</p>
        </div>
      </dialog>
    </header>
  );
}
