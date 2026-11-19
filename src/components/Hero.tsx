export default function Hero() {
  return (
    <section id="hero" tabIndex={-1} className="apr-hero" aria-labelledby="hero-title">
      <div className="apr-hero__plate" aria-hidden="true" />
      <div className="apr-hero__palm-overlap" aria-hidden="true" />
      <div className="water-spray" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="apr-hero__content">
        <h1 id="hero-title" className="apr-hero__title">
          <span>Aqua <br />Paradise</span>{' '}
          <em>Resort</em>
        </h1>
        <p className="apr-hero__tagline"><span>Остров бесконечного лета</span></p>
        <div className="apr-hero__actions">
          <a className="riv-button" href="#/?section=about">Исследовать остров <span aria-hidden="true">→</span></a>
          <a className="riv-button secondary" href="#/planner">Спланировать отдых <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
