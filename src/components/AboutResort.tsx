import { useEffect, useRef, useState } from 'react';
import terrace from '../assets/retro/golden-age-terrace.webp';
import aboutPalms from '../assets/retro/about-palms.svg';
import palm from '../assets/retro/apr-palm-logo.svg';
import './AboutEditorial.css';

const highlights = [
  { value: '9', unit: 'уникальных зон', icon: 'sun' },
  { value: '6 км²', unit: 'территория острова', icon: 'island' },
  { value: '09:00–22:00', unit: 'ежедневно', icon: 'clock' },
  { value: 'Для всей', unit: 'семьи', icon: 'family' },
] as const;

function HighlightIcon({ name }: { name: typeof highlights[number]['icon'] }) {
  const shared = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  // Single-colour 1970s travel-engraving motifs: bold outside strokes, finer etched details.
  if (name === 'sun') return (
    <svg {...shared}>
      <g strokeWidth="2.15">
        <path d="M7 55H57M9 51h45M17 51V38c0-3 2-5 5-5h15M17 43h14M24 33V20h22v31M28 20l8-8 12 8M35 12V6l11 3-11 3M30 51V33"/>
        <path d="M44 25c-5 7-13 9-24 10-7 1-13 4-13 9s5 7 11 7M44 33c-5 7-12 9-22 10-3 1-5 3-2 5 2 1 5 1 8 1"/>
        <path d="M11 46l-4-2M45 20h4"/>
      </g>
      <g strokeWidth=".85" opacity=".62"><path d="M26 23h16M27 26h14M36 14l7 4M15 53h26M19 39h8"/></g>
    </svg>
  );
  if (name === 'island') return (
    <svg {...shared}>
      <g strokeWidth="2">
        <path d="M5 50q12-5 25 0t29 0M8 56q13-5 25 0t23 0M14 44q18-7 38 0M18 42l17-19 16 19"/>
        <path d="M33 24C34 17 36 10 39 6M38 8c-6-3-12-2-16 3 7-2 12-1 16 1M39 8c5-6 12-7 17-3-8 0-13 4-17 7M39 9c6 0 11 4 13 10-6-5-10-6-15-6M36 11c-6 1-10 5-11 11 4-5 8-7 12-8"/>
      </g>
      <g strokeWidth="1" opacity=".7"><path d="M28 32l7-8 10 13M20 47l6-2M35 46l4 1M22 53l7-1M41 53l7-2"/></g>
      <path d="M38 22l-1 20" strokeWidth="1.7"/>
    </svg>
  );
  if (name === 'clock') return (
    <svg {...shared}>
      <g strokeWidth="2.4">
        <circle cx="32" cy="32" r="23"/>
        <path d="M32 16v17l11 8M32 5v6M32 53v6M5 32h6M53 32h6"/>
      </g>
      <g strokeWidth="1.25" opacity=".7">
        <path d="M19 10l3 5M45 10l-3 5M10 19l5 3M54 19l-5 3M10 45l5-3M54 45l-5-3M19 54l3-5M45 54l-3-5"/>
        <path d="M32 32l-1-10"/>
      </g>
      <circle cx="32" cy="32" r="2.3" fill="currentColor" stroke="none"/>
    </svg>
  );
  return (
    <svg {...shared}>
      <g strokeWidth="2.05">
        <circle cx="19" cy="16" r="6"/>
        <circle cx="47" cy="16" r="6"/>
        <circle cx="33" cy="29" r="4.5"/>
        <path d="M8 55V39c0-7 4-12 11-12s11 5 11 12M58 55V39c0-7-4-12-11-12-5 0-8 3-10 7"/>
        <path d="M24 57V46c0-6 3-10 9-10s9 4 9 10v11"/>
        <path d="M8 52H5M58 52h3"/>
      </g>
      <g strokeWidth=".9" opacity=".7"><path d="M13 32q6-4 12 0M42 32q5-4 10 0M28 40q5-2 10 0M12 41v10M52 41v10"/></g>
    </svg>
  );
}

export default function AboutResort() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target || typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} aria-labelledby="about-title"
      className={`apr-about ${visible ? 'apr-about--visible' : ''}`}>
      <div className="apr-about__layout">
        <figure className="apr-about__frame">
          <img src={terrace} width="1122" height="1402" loading="lazy" decoding="async"
            alt="Отдыхающая в соломенной шляпе на террасе с видом на лагуну и водопады на закате" />
        </figure>

        <div className="apr-about__paper-stack">
          <div className="apr-about__back-page" aria-hidden="true" />
          <article className="apr-about__paper">
          <p className="apr-about__label">О курорте</p>
          <div className="apr-about__seal" aria-hidden="true">
            <span>AQUA PARADISE</span><img src={palm} alt="" /><small>RESORT</small>
            <svg viewBox="0 0 120 48" fill="none"><path d="M0 8q15-8 30 0t30 0t30 0t30 0M0 18q15-8 30 0t30 0t30 0t30 0M0 28q15-8 30 0t30 0t30 0t30 0M0 38q15-8 30 0t30 0t30 0t30 0" stroke="currentColor" strokeWidth="2" /></svg>
          </div>
          <h2 id="about-title">Золотой век<br />тропического рая</h2>
          <svg className="apr-about__brush" viewBox="0 0 460 34" aria-hidden="true"><path d="M4 25C83 11 220 0 344 6C399 7 442 13 459 18C321 1 157 20 19 33C3 34-5 29 4 25Z" fill="currentColor" /></svg>

          <div className="apr-about__intro">
            <img className="apr-about__palm-engraving" src={aboutPalms} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            <p><strong>Aqua Paradise Resort</strong> — премиальный тропический остров‑аквапарк, где природа, развлечения и высокий уровень сервиса соединяются в одном месте. Вас ждут девять уникальных зон, отдых для всей семьи и тщательно продуманные впечатления: от активных приключений до полного расслабления в атмосфере курортной роскоши.</p>
          </div>

          <ul className="apr-about__stats" aria-label="Курорт в цифрах">
            {highlights.map(({ value, unit, icon }) => (
              <li key={icon}>
                <HighlightIcon name={icon} />
                <strong>{value}</strong>
                <span>{unit}</span>
              </li>
            ))}
          </ul>

          <blockquote className="apr-about__quote">
            <p>«Курорт, где каждый день становится особенным путешествием»</p>
            <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="apr-quote-flower-ink">
                  <path d="M46 51C22 46 14 34 19 21c4-10 16-12 27-2 10-19 22-21 31-11 10 12 4 24-9 34 20 3 27 16 20 28-7 12-21 13-34 1-7 18-22 24-33 15-11-10-6-24 7-35-15 1-28-5-28-18 1-14 17-18 31-10 8 5 12 15 15 28Z"/>
                </clipPath>
              </defs>
              {/* A few angular leaves peek out behind the blossom like vintage screenprinted foliage. */}
              <g stroke="#164d46" strokeWidth="1.7" strokeLinejoin="round">
                <path d="M49 62Q26 60 8 82Q29 87 49 62Z" fill="#557c55"/>
                <path d="M60 64Q73 68 89 91Q89 69 60 64Z" fill="#295c4e"/>
                <path d="M54 63Q47 79 46 99" stroke="#b58a46" strokeWidth="3.2"/>
                <path d="M49 62L14 80M60 64L86 87" stroke="#d0a75e" strokeWidth="1.3" opacity=".8"/>
              </g>
              {/* Asymmetrical coral petals, firm inky silhouettes, no airbrushed gradients. */}
              <g stroke="#823d30" strokeWidth="1.6" strokeLinejoin="round">
                <path d="M49 48C37 43 24 40 22 26c-2-13 8-19 18-14 9 2 17 19 17 34Z" fill="#ef8154"/>
                <path d="M52 48C53 32 61 17 74 17c16-2 22 13 10 23-7 7-20 10-32 8Z" fill="#e96743"/>
                <path d="M54 50C67 43 87 47 92 60c5 13-7 21-19 17-10-3-17-14-19-27Z" fill="#ee7950"/>
                <path d="M50 54C59 69 55 88 42 93c-14 5-22-7-18-20 2-9 12-16 26-19Z" fill="#d9533c"/>
                <path d="M47 52C33 65 14 64 7 51c-7-12 4-23 17-20 12 3 19 11 23 21Z" fill="#f18b59"/>
              </g>
              {/* Offset shadow ink and directional hatch lines emulate the resort's poster print. */}
              <g stroke="#a44034" strokeWidth="1.35" fill="none" opacity=".76" strokeLinecap="round">
                <path d="M46 45Q35 32 36 19M53 44Q64 31 75 28M60 52Q76 55 83 65M49 60Q45 76 36 84M41 52Q25 53 15 48"/>
                <path d="M35 25l-6-5M40 30l-7-7M68 32l8-6M72 36l8-4M69 58l11 4M65 63l10 5M39 72l-4 9M36 69l-5 7M23 48l-9 4M26 44l-10 2"/>
              </g>
              <g clipPath="url(#apr-quote-flower-ink)" stroke="#ffd39a" strokeWidth=".7" opacity=".55" strokeLinecap="round">
                <path d="M12 30l15-5M14 34l12-4M19 39l9-3M62 19l14-6M65 23l17-7M71 47l18 5M70 51l21 6M21 69l12-5M19 75l16-7M38 86l10-8"/>
              </g>
              <path d="M51 53C63 47 68 40 79 30" fill="none" stroke="#813c2d" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M51 51C64 46 70 39 78 29" fill="none" stroke="#efbd68" strokeWidth="2" strokeLinecap="round"/>
              <g fill="#f9d27c" stroke="#a65b30" strokeWidth=".65">
                <circle cx="79" cy="29" r="3.4"/><circle cx="76" cy="27" r="1.6"/>
                <circle cx="82" cy="27" r="1.6"/><circle cx="79" cy="32" r="1.5"/>
              </g>
              <circle cx="49" cy="52" r="6.5" fill="#b44d34"/>
              <circle cx="49" cy="52" r="3" fill="#eaaa5e"/>
            </svg>
          </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
}
