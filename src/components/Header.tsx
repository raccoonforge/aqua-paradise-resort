import { useEffect, useRef, useState } from 'react';
import Brand from './Brand';
import { useFocusTrap } from '../hooks/useFocusTrap';
import HeaderLineIcon, { type HeaderIconName } from './HeaderLineIcon';

type MenuItem = { title: string; hint: string; href: string; icon: HeaderIconName };
type MenuGroup = { label: string; code: string; foot: string; items: MenuItem[] };
const entertainment: MenuGroup = {
  label: 'Развлечения', code: 'EXPLORE · 01', foot: 'DISCOVER THE ISLAND',
  items: [
    { title: 'Тематические зоны', hint: 'Девять миров острова', href: '#/zones', icon: 'compass' },
    { title: 'Аттракционы', hint: 'От релакса до экстрима', href: '#/attractions', icon: 'waves' },
    { title: 'Семейный отдых', hint: 'Развлечения для всей семьи', href: '#/zones?zone=little-paradise', icon: 'family' },
  ],
};
const visit: MenuGroup = {
  label: 'Посещение', code: 'GUEST PASS · 02', foot: 'WELCOME TO PARADISE',
  items: [
    { title: 'Как добраться', hint: 'Путь на остров', href: '#/visit?section=arrival', icon: 'cable-car' },
    { title: 'Транспорт', hint: 'Передвижение по курорту', href: '#/visit?section=transport', icon: 'bus' },
    { title: 'Правила и безопасность', hint: 'Комфортный отдых', href: '#/visit?section=rules', icon: 'shield-check' },
    { title: 'FAQ', hint: 'Ответы на вопросы', href: '#/visit?section=faq', icon: 'faq' },
  ],
};

function MenuLinks({ group }: { group: MenuGroup }) {
  return group.items.map(item => <a key={item.href} className="apr-header__dropdown-item" href={item.href}>
    <span className="apr-header__menu-icon"><HeaderLineIcon name={item.icon} /></span>
    <span><strong>{item.title}</strong><small>{item.hint}</small></span>
  </a>);
}

function TicketMenu({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const panelId = 'menu-' + group.items[0].icon;
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (!container.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  return <div ref={container} className="apr-header__menu"
    onPointerEnter={e => { if (e.pointerType === 'mouse') setOpen(true); }}
    onPointerLeave={e => { if (e.pointerType === 'mouse' && !container.current?.contains(document.activeElement)) setOpen(false); }}
    onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }}
    onKeyDown={e => { if (e.key === 'Escape') { setOpen(false); trigger.current?.focus(); } }}>
    <button ref={trigger} type="button" className="apr-header__navlink apr-header__trigger" aria-expanded={open}
      aria-controls={panelId} onClick={e => setOpen(e.detail > 0 && matchMedia('(hover: hover)').matches ? true : !open)}>
      {group.label}<svg aria-hidden="true" className="apr-header__chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 9 7 7 7-7" /></svg>
    </button>
    {open && <div id={panelId} className="apr-header__dropdown">
      <div className="apr-header__ticket-head" aria-hidden="true"><span>AQUA PARADISE</span><span>{group.code}</span></div>
      <div className="apr-header__ticket-body"><MenuLinks group={group} /></div>
      <div className="apr-header__ticket-foot" aria-hidden="true"><span>{group.foot}</span><span>✳</span></div>
    </div>}
  </div>;
}

function Accordion({group}: { group: MenuGroup }) {
  return <details><summary>{group.label}</summary><MenuLinks group={group} /></details>;
}

function TicketLink() {
  return <a className="riv-button ticket-cta" href="#/tickets"><HeaderLineIcon name="ticket" /> Билеты</a>;
}

export default function Header({ home }: {home: boolean}) {
  const [compact, setCompact] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dialog = useFocusTrap<HTMLDialogElement>(drawerOpen);
  useEffect(() => {
    if (!home) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    // Switch to the compact menu before the masthead crosses the artwork.
    const observer = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting), {
      rootMargin: '-64px 0px 0px',
    });
    observer.observe(hero);
    const scroll = () => setScrolled(window.scrollY > 20);
    scroll();
    window.addEventListener('scroll', scroll, {passive: true});
    return () => { observer.disconnect(); window.removeEventListener('scroll', scroll); };
  }, [home]);
  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [drawerOpen]);

  return <>
    <header className={home ? 'apr-header riv-mast' : 'inner-mast sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm'}>
      <div className={'mast-inner' + (home && compact ? ' compact' : '')}>
        {home ? <Brand /> : <a href="#/" className="text-xl font-bold text-teal-900">🌴 Aqua Paradise</a>}
        <nav className="apr-header__navigation" aria-label="Основная навигация">
          <div className="apr-header__links">
            <a className="apr-header__navlink" href="#/?section=about">О курорте</a>
            <TicketMenu group={entertainment} />
            <a className="apr-header__navlink" href="#/planner">Планировщик</a>
            <a className="apr-header__navlink" href="#/hotel">Отель</a>
            <TicketMenu group={visit} />
          </div>
          <TicketLink />
        </nav>
      </div>
    </header>
    <button type="button" ref={burger} className={'riv-button secondary nav-burger' + (compact ? ' visible-compact' : '')}
      aria-label="Открыть меню" aria-haspopup="dialog" aria-controls="resort-menu" aria-expanded={drawerOpen}
      onClick={() => { dialog.current?.showModal(); setDrawerOpen(true); }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2 5h20M2 12h20M2 19h20" /></svg>
    </button>
    <dialog ref={dialog} id="resort-menu" className="riv-drawer" aria-label="Меню курорта"
      onClose={() => { setDrawerOpen(false); burger.current?.focus(); }}
      onClick={e => { if (e.target === e.currentTarget || (e.target as Element).closest('a')) dialog.current?.close(); }}>
      <div className="drawer-body">
        <div className="drawer-head"><Brand /><button className="riv-button secondary" type="button" aria-label="Закрыть меню" onClick={() => dialog.current?.close()}>×</button></div>
        <nav aria-label="Навигация по курорту">
          <a href="#/?section=about">О курорте</a><Accordion group={entertainment} />
          <a href="#/map">Карта острова</a><a href="#/hotel">Отель</a>
          <Accordion group={visit} /><a href="#/planner">Планировщик</a><TicketLink />
        </nav>
      </div>
    </dialog>
    {home && scrolled && <button className="riv-button secondary back-top" aria-label="Наверх" onClick={() => {
      document.getElementById('hero')?.focus({preventScroll:true});
      window.scrollTo({top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    }}>↑</button>}
  </>;
}
