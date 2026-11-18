export default function Hero() {
  return (
    <section id="hero" tabIndex={-1} className="apr-hero" aria-labelledby="hero-title">
      {/* The illustration still includes the decorative lettering; keep exactly one accessible title. */}
      <h1 id="hero-title" className="sr-only">Aqua Paradise Resort</h1>
      <div className="apr-hero__plate" aria-hidden="true" />
      <div className="apr-hero__mobile-lettering" aria-hidden="true" />
      <div className="water-spray" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="apr-hero__content">
        <p className="apr-hero__tagline">Остров бесконечного лета</p>
        <div className="apr-hero__actions">
          <a className="riv-button apr-hero__explore" href="#/?section=about">Исследовать остров <span aria-hidden="true">→</span></a>
          <a className="riv-button secondary apr-hero__plan" href="#/planner">Спланировать отдых <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
