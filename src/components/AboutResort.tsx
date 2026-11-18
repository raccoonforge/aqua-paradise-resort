import { useEffect, useRef, useState } from 'react';
import terrace from '../assets/retro/golden-age-terrace.webp';
import palm from '../assets/retro/apr-palm-logo.svg';
import './AboutEditorial.css';

const highlights = [
  { value: '9', unit: 'уникальных зон', icon: 'sun' },
  { value: '6 км²', unit: 'территория острова', icon: 'island' },
  { value: '09:00–22:00', unit: 'ежедневно', icon: 'clock' },
  { value: 'Для всей', unit: 'семьи', icon: 'family' },
] as const;

function HighlightIcon({ name }: { name: typeof highlights[number]['icon'] }) {
  if (name === 'sun') return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M3 41h42M38 40V14H24v7M20 14l11-8 11 8M31 6V2l7 2-7 2M38 20C34 32 8 23 7 34c0 5 6 7 13 7M37 26C31 36 14 29 13 35c0 3 6 4 10 4M28 30v11" /></svg>;
  if (name === 'island') return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 37c8-5 28-5 38 0M8 42c8-4 24-4 32 0M11 30l13-17 11 17H11Z" /><path d="M24 13c1-5 6-7 10-5M24 13c-5-5-10-4-12-1M24 13l-3 19" /></svg>;
  if (name === 'clock') return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="24" cy="24" r="17" /><path d="M24 12v13l8 5M24 4v4M24 40v4M4 24h4M40 24h4" /></svg>;
  return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="18" cy="14" r="5" /><circle cx="33" cy="17" r="4" /><circle cx="26" cy="27" r="3.5" /><path d="M7 39v-7c0-6 5-10 11-10 4 0 7 1 9 4M32 24c5 1 8 4 8 9v6M18 39v-3c0-5 3-8 8-8s8 3 8 8v3" /></svg>;
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
            <svg className="apr-about__palm-engraving" viewBox="0 0 140 150" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="apr-about-palm-silhouette">
                  <path d="M3 140Q43 123 82 131Q112 132 138 143L138 146H3Z"/>
                  <path d="M54 134Q62 83 92 33L98 36Q75 91 72 136Z"/>
                  <path d="M31 136Q37 104 31 83L37 82Q49 105 44 136Z"/>
                  <path d="M95 34Q80 11 56 18Q74 20 90 38Q63 25 38 40Q68 35 91 43Q65 45 58 70Q79 51 97 46Q92 66 108 78Q105 58 104 45Q127 49 137 71Q135 45 109 36Q126 24 139 29Q121 15 100 29Q105 14 93 2Q97 22 95 34Z"/>
                  <path d="M34 86Q20 64 5 74Q23 73 32 90Q15 84 1 101Q18 92 35 96Q27 108 27 119Q35 107 39 97Q52 106 57 115Q56 97 41 91Q54 84 67 91Q55 78 39 86Q43 74 34 66Q38 78 34 86Z"/>
                </clipPath>
              </defs>
              <g fill="#a87330" stroke="#865827" strokeWidth=".9" strokeLinejoin="round">
                <path d="M3 140Q43 123 82 131Q112 132 138 143L138 146H3Z"/>
                <path d="M54 134Q62 83 92 33L98 36Q75 91 72 136Z"/>
                <path d="M31 136Q37 104 31 83L37 82Q49 105 44 136Z"/>
                <path d="M95 34Q80 11 56 18Q74 20 90 38Q63 25 38 40Q68 35 91 43Q65 45 58 70Q79 51 97 46Q92 66 108 78Q105 58 104 45Q127 49 137 71Q135 45 109 36Q126 24 139 29Q121 15 100 29Q105 14 93 2Q97 22 95 34Z"/>
                <path d="M34 86Q20 64 5 74Q23 73 32 90Q15 84 1 101Q18 92 35 96Q27 108 27 119Q35 107 39 97Q52 106 57 115Q56 97 41 91Q54 84 67 91Q55 78 39 86Q43 74 34 66Q38 78 34 86Z"/>
              </g>
              <g clipPath="url(#apr-about-palm-silhouette)" stroke="#f4d399" fill="none" strokeLinecap="round">
                <path d="M2 25L138 55M4 39L136 69M-4 60L135 92M-3 83L139 116M-4 112L139 138" strokeWidth="1.3" strokeDasharray="12 9 3 13" opacity=".48"/>
                <path d="M22 13L121 149M36 9L136 147M8 56L72 149" strokeWidth=".7" strokeDasharray="3 10" opacity=".42"/>
              </g>
              <g stroke="#d4a05b" fill="none" strokeLinecap="round" opacity=".8">
                <path d="M67 129Q72 80 95 37M38 129Q43 102 34 86" strokeWidth="1.6"/>
                <path d="M95 38Q73 27 56 20M96 39Q68 36 44 41M100 40Q121 45 134 62M35 90Q18 83 6 98" strokeWidth=".9"/>
              </g>
            </svg>
            <p><strong>Aqua Paradise Resort</strong> — премиальный тропический остров-аквапарк, где природа, развлечения и высокий уровень сервиса соединяются в одном месте. Вас ждут девять уникальных зон, отдых для всей семьи и тщательно продуманные впечатления — от активных приключений до полного расслабления в атмосфере курортной роскоши.</p>
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
