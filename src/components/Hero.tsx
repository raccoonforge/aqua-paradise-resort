import riviera from '../assets/retro/riviera.webp';

export default function Hero() {
  return (
    <section id="hero" tabIndex={-1} className="apr-hero" aria-labelledby="hero-title">
      <svg className="apr-hero__filters" aria-hidden="true" width="0" height="0">
        <defs>
          <filter id="apr-print-wear" x="-12%" y="-18%" width="124%" height="136%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".032 .42" numOctaves="2" seed="13" result="scratchNoise" />
            <feColorMatrix in="scratchNoise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  8 0 0 0 -4.95" result="scratchMask" />
            <feTurbulence type="fractalNoise" baseFrequency=".58 .68" numOctaves="2" seed="8" result="speckleNoise" />
            <feColorMatrix in="speckleNoise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  10 0 0 0 -6.5" result="speckleMask" />
            <feComposite in="scratchMask" in2="speckleMask" operator="arithmetic" k1="0" k2="1" k3=".35" k4="0" result="wearMask" />
            <feComponentTransfer in="wearMask" result="softWear"><feFuncA type="linear" slope=".46" /></feComponentTransfer>
            <feComposite in="SourceGraphic" in2="softWear" operator="out" />
          </filter>
        </defs>
      </svg>
      <img className="apr-hero__art" src={riviera} alt="" fetchPriority="high" />
      <svg className="apr-hero__palm-foreground" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="apr-palm-foreground-region"><path d="M0 0 H620 L604 150 L490 225 L245 280 L0 310 Z" /></clipPath>
          <filter id="apr-palm-leaf-matte" x="0" y="0" width="1672" height="941" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" in="SourceGraphic" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1.45 1.35 -2.8 0 -.66" result="warmLeaves" />
            <feComposite in="SourceGraphic" in2="warmLeaves" operator="in" />
          </filter>
        </defs>
        <image href={riviera} x="0" y="0" width="1672" height="941" preserveAspectRatio="none" clipPath="url(#apr-palm-foreground-region)" filter="url(#apr-palm-leaf-matte)" />
      </svg>
      <div className="apr-hero__content">
        <div className="apr-hero__lettering">
          <h1 id="hero-title" className="apr-hero__title" aria-label="Aqua Paradise">
            <span className="apr-hero__aqua">AQUA</span>
            <span className="apr-hero__paradise">PARADISE</span>
          </h1>
          <div className="apr-hero__resort" aria-hidden="true">Resort</div>
        </div>
        <p className="apr-hero__tagline">Остров бесконечного лета</p>
        <div className="apr-hero__actions">
          <a className="apr-hero__button apr-hero__button--primary" href="#/?section=about">Исследовать остров <span aria-hidden="true">→</span></a>
          <a className="apr-hero__button" href="#/planner">Спланировать отдых <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
