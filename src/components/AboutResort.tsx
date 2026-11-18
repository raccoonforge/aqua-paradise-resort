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
  // Solid coral silhouettes, like illustrations printed onto a 1970s travel brochure.
  const base = { viewBox: '0 0 64 64', fill: 'currentColor', 'aria-hidden': true as const };

  if (name === 'sun') return (
    <svg {...base}>
      {/* Pavilion with a little holiday pennant. */}
      <path d="M47 8V3h2v5l7 2-7 3v3h-2V8Z"/>
      <path d="M38 21 49 12l11 9H38ZM43 23h3v31h-3zM54 23h3v31h-3z"/>
      {/* A single thick waterslide winding towards the landing platform. */}
      <path d="M44 30h9v5c0 7-13 8-22 10-10 2-14 5-11 8 2 2 9 3 17 3h19v4H35C21 60 12 57 12 51c0-8 10-11 23-14 7-2 9-3 9-7Z"/>
      <path d="M37 37c-13 2-26 5-29 13-2 6 2 10 11 12H6c-4-4-5-10-2-15 5-8 18-11 33-14Z"/>
      <path d="M4 60h56v3H4z"/>
      <path d="M49 24h6v2h-6z"/>
    </svg>
  );
  if (name === 'island') return (
    <svg {...base}>
      {/* Overlapping volcanic hills, little island, and a windblown palm. */}
      <path d="M3 47q8-8 13-9 7-16 15-17 7 0 15 19l8 3 7 5-7 3-16-2-20 3Z"/>
      <path d="m13 40 6-4 6 3 7-11 6 11 4 3-9-2-7 5-9-2Z" fill="#f2d29e"/>
      <path d="M34 51q8-5 15-4t12 5q-9 3-27-1Z"/>
      <path d="M3 55q18-4 32-1t26 1l-5 3q-25-3-47 0Z"/>
      <path d="M8 60q23-3 45 0v2H8z"/>
      <path d="M46 17h3l-1 31h-4c2-10 3-20 2-31Z"/>
      <path d="M47 17C42 6 35 7 32 12c7-1 11 2 15 7Z"/>
      <path d="M47 17c0-12 8-14 13-10-6 2-9 5-13 12Z"/>
      <path d="M47 17c8-8 15-6 17 0-6-3-11-2-17 3Z"/>
      <path d="M47 17c11 1 15 8 14 15-3-7-8-10-14-12Z"/>
      <path d="M47 17c-5-9-12-6-15 0 5-2 10-1 15 3Z"/>
    </svg>
  );
  if (name === 'clock') return (
    <svg {...base}>
      <circle cx="32" cy="32" r="25"/>
      <circle cx="32" cy="32" r="20.7" fill="#f7e4b8"/>
      <rect x="31" y="10" width="2" height="8"/>
      <rect x="31" y="46" width="2" height="8"/>
      <rect x="46" y="31" width="8" height="2"/>
      <rect x="10" y="31" width="8" height="2"/>
      <path d="M30 18h4v15l12 10-3 4-13-12Z"/>
      <circle cx="32" cy="32" r="3.2"/>
    </svg>
  );
  return (
    <svg {...base}>
      {/* Three distinct people holding hands, with clear silhouettes at small sizes. */}
      <circle cx="14" cy="10" r="6"/>
      <circle cx="50" cy="10" r="6"/>
      <circle cx="32" cy="27" r="4.7"/>
      <path d="M8 19q6-4 12 0l5 15-4 3-3-7-1 13 4 15-5 2-6-16-3 16-5-2 4-22-1-10-5 11-4-2 6-14q2-5 6-6Z"/>
      <path d="M44 19q6-4 12 0 3 1 5 6l5 14-4 2-6-11 2 10 5 18-5 2-6-14-5 14-5-2 4-20-1-10-3 9-4-2 4-13q1-3 2-3Z"/>
      <path d="M27 35q5-2 10 0l3 13-4 2-2-7 2 17h-4l-2-11-2 11h-4l2-17-2 7-4-2 3-10q2-3 4-3Z"/>
      <path d="M21 33 28 37l-2 4-8-5ZM39 37l7-4 3 4-8 5Z"/>
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
