
function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-400 flex items-center justify-center p-6">
      <section className="max-w-3xl text-center">
        <p className="mb-4 text-lg font-semibold text-cyan-800">
          🌴 Welcome to Paradise
        </p>

        <h1 className="mb-6 text-5xl font-bold text-slate-900 md:text-7xl">
          Aqua Paradise
          <span className="block text-cyan-700">
            Island Resort
          </span>
        </h1>

        <p className="mb-8 text-lg text-slate-700 md:text-xl">
          Откройте для себя тропический остров,
          захватывающие водные аттракционы
          и незабываемые приключения!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#attractions"
            className="rounded-full bg-cyan-700 px-8 py-4 font-semibold text-white transition hover:bg-cyan-800"
          >
            Исследовать остров
          </a>

          <a
            href="#tickets"
            className="rounded-full border-2 border-cyan-700 px-8 py-4 font-semibold text-cyan-900 transition hover:bg-white/50"
          >
            Выбрать билет
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
