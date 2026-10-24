
import { useState } from 'react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-20 bg-white/90 px-6 py-4 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <a href="/" className="text-lg font-bold text-cyan-700 sm:text-xl">
          🌴 Aqua Paradise
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#attractions" className="hover:text-cyan-700">
            Аттракционы
          </a>

          <a href="#zones" className="hover:text-cyan-700">
            Зоны острова
          </a>

          <a href="#planner" className="hover:text-cyan-700">
            Планировщик
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#tickets"
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
          className="absolute left-0 right-0 top-full border-t border-slate-100 bg-white p-6 shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-5">
            <a href="#attractions" onClick={() => setIsMenuOpen(false)}>
              Аттракционы
            </a>

            <a href="#zones" onClick={() => setIsMenuOpen(false)}>
              Зоны острова
            </a>

            <a href="#planner" onClick={() => setIsMenuOpen(false)}>
              Планировщик
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
