
import { useState } from 'react'
import aquaParadiseIcon from '../assets/aqua-paradise-icon.png'
import aquaParadiseLogo from '../assets/aqua-paradise-logo.png'

function Header() {
  const onMap = window.location.pathname.replace(/\/$/, '') === '/map'
  const homeAnchor = (anchor: string) => onMap ? '/' + anchor : anchor
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
<header className="absolute inset-x-0 top-0 z-20 border-b border-white/30 bg-white/40 px-6 py-4 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <a
  href="/"
  className="flex shrink-0 items-center gap-2 text-lg font-bold text-cyan-700 sm:text-xl"
>
  <img
    src={aquaParadiseIcon}
    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = aquaParadiseLogo }}
    alt=""
    className="h-12 w-12 scale-125 object-contain sm:h-14 sm:w-14"
  />
  <span>Aqua Paradise</span>
</a>

        <div className="hidden items-center gap-8 md:flex">
          <a href={homeAnchor('#attractions')} className="hover:text-cyan-700">
            Аттракционы
          </a>

          <a href={homeAnchor('#zones')} className="hover:text-cyan-700">
            Зоны острова
          </a>

          <a href="/map" className="hover:text-cyan-700">Карта острова</a>

          <a href={homeAnchor('#planner')} className="hover:text-cyan-700">
            Планировщик
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={homeAnchor('#tickets')}
            className="rounded-full bg-cyan-700 px-4 py-3 font-semibold text-white hover:bg-cyan-800 sm:px-5"
          >
            Билеты
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-2xl text-cyan-800 hover:bg-cyan-50 md:hidden"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
  <div
    id="mobile-navigation"
    className="absolute inset-x-0 top-full z-30 border-t border-white/30 bg-white/95 p-6 shadow-xl md:hidden"
  >
    <nav className="flex flex-col gap-5">
      <a
        href={homeAnchor('#attractions')}
        onClick={() => setIsMenuOpen(false)}
        className="text-base font-medium text-slate-800 hover:text-cyan-700"
      >
        Аттракционы
      </a>

      <a
        href={homeAnchor('#zones')}
        onClick={() => setIsMenuOpen(false)}
        className="text-base font-medium text-slate-800 hover:text-cyan-700"
      >
        Зоны острова
      </a>

      <a href="/map" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-slate-800 hover:text-cyan-700">Карта острова</a>

      <a
        href={homeAnchor('#planner')}
        onClick={() => setIsMenuOpen(false)}
        className="text-base font-medium text-slate-800 hover:text-cyan-700"
      >
        Планировщик
      </a>
    </nav>
  </div>
)}
    </header>
  )
}

export default Header

