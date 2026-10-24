import heroWaterpark from "../assets/hero-waterpark.png";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero-image"
        src={heroWaterpark}
        alt="Бирюзовый бассейн, тропические водопады и яркие водные горки островного курорта"
        fetchPriority="high"
        width="1672"
        height="941"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <p className="eyebrow light">
          <span className="small-line" />
          Tropical luxury · Island adventure
        </p>
        <h1 id="hero-title">
          Целый остров.
          <br />
          Бесконечное <em>лето.</em>
        </h1>
        <p className="hero-description">
          Aqua Paradise Island Resort — место, где яркие приключения встречаются
          с искусством отдыхать.
        </p>
        <div className="hero-actions">
          <a href="#zones" className="button button-sand">
            Исследовать остров <span aria-hidden="true">↗</span>
          </a>
          <a href="#tickets" className="hero-secondary">
            Выбрать билет <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>Приключение в вашем ритме</span>
        <a href="#island">
          Познакомиться с островом <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
export default Hero;
