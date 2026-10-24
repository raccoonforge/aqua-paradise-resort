import heroWaterpark from '../assets/hero-waterpark.png'

function Hero() {
  return (
<main
  className="relative flex min-h-screen items-center bg-cover bg-center px-6 py-20 sm:px-12 lg:px-20"
  style={{ backgroundImage: `url(${heroWaterpark})` }}
>
<div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/50 to-slate-950/35 md:bg-gradient-to-r md:from-slate-950/85 md:via-slate-950/45 md:to-transparent"></div>
<section className="relative z-10 w-full max-w-2xl text-left">    
    <p className="mb-4 text-lg font-semibold text-cyan-200">
          🌴 Welcome to Paradise
        </p>

        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
          Aqua Paradise
          <span className="block text-cyan-200">
            Island Resort
          </span>
        </h1>

        <p className="mb-8 text-lg text-white md:text-xl">
          Откройте для себя тропический остров,
          захватывающие водные аттракционы
          и незабываемые приключения!
        </p>

<div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center">          
    <a
            href="#attractions"
            className="rounded-full bg-cyan-700 px-8 py-4 font-semibold text-white transition hover:bg-cyan-800"
          >
            Исследовать остров
          </a>

          <a
            href="#tickets"
className="rounded-full border-2 border-white/80 px-8 py-4 font-semibold text-white transition hover:bg-white/20"          >
            Выбрать билет
          </a>
        </div>
      </section>
    </main>
  )
}

export default Hero
