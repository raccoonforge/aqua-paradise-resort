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
            <svg viewBox="0 0 120 126" aria-hidden="true" fill="currentColor">
              <path d="M9 117q48-22 104 0zM36 113q4-54 35-91l6 5q-22 38-24 85zM69 26Q52 6 36 14q12 1 22 14Q26 18 15 42q20-12 46-7Q37 43 34 65q12-19 34-28Q60 57 70 73q0-21 8-35 20 6 30 23Q105 36 83 30q20-8 33 1Q103 9 78 23 77 7 60 3q8 9 9 23zM19 112q5-27-1-42l5-1q10 19 9 42zM21 69Q8 50 0 69q11-5 17 3Q1 73 3 87q7-11 17-11 14-3 23 11-1-16-18-16 11-9 21-5-13-12-25 3z"/>
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
            <svg viewBox="0 0 72 72" aria-hidden="true">
              <defs>
                <radialGradient id="apr-hibiscus-petal" cx="51%" cy="45%" r="58%">
                  <stop stopColor="#702721" />
                  <stop offset=".43" stopColor="#ba4130" />
                  <stop offset=".81" stopColor="#df674d" />
                  <stop offset="1" stopColor="#ec8c68" />
                </radialGradient>
                <linearGradient id="apr-hibiscus-leaf" x2=".8" y2="1">
                  <stop stopColor="#9b9c5d" />
                  <stop offset="1" stopColor="#465838" />
                </linearGradient>
                <filter id="apr-hibiscus-grain">
                  <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                  <feComponentTransfer><feFuncA type="linear" slope=".23" /></feComponentTransfer>
                  <feComposite in2="SourceGraphic" operator="in" />
                  <feBlend in2="SourceGraphic" mode="multiply" />
                </filter>
              </defs>
              <g filter="url(#apr-hibiscus-grain)">
                <g fill="url(#apr-hibiscus-leaf)">
                  <path d="M37 42C23 35 9 40 3 53c12-3 17 7 34-11Z" />
                  <path d="M34 46C18 49 15 58 16 69c10-6 21-8 18-23Z" />
                  <path d="M41 44c16 1 25 11 26 20-12-2-22-7-26-20Z" />
                </g>
                <path d="M8 51q14-6 29-9M18 65l16-18m11 0 18 14" fill="none" stroke="#d6cb82" strokeWidth=".7" opacity=".65" />
                <g fill="url(#apr-hibiscus-petal)" stroke="#9d362a" strokeWidth=".55">
                  <path d="M37 35C27 32 19 23 20 15c-1-6 7-9 11-8 4-4 10-2 12 1 7 1 9 7 6 12-1 7-7 13-12 15Z" />
                  <path d="M38 35C42 24 51 15 60 17c6-1 11 5 8 9 4 5 1 10-3 12-6 6-20 3-27-3Z" />
                  <path d="M37 36c11-3 24 3 26 10 6 5 1 12-4 12-3 6-11 5-15 1-7-4-9-15-7-23Z" />
                  <path d="M36 35c5 10 5 23-2 27-3 5-11 5-13 1-7-1-10-7-7-13 2-8 13-14 22-15Z" />
                  <path d="M36 36C25 41 10 39 6 32c-5-3-5-10 0-13 0-5 7-8 12-5 8 1 16 12 18 22Z" />
                </g>
                <path d="M36 34q-4-9-4-20m6 20q8-10 21-13M40 38q11 3 17 12M34 39q-3 12-11 17m10-21Q20 32 11 24" fill="none" stroke="#f7a281" strokeWidth=".8" opacity=".55" />
                <path d="M35 37c5-8 9-12 15-15" fill="none" stroke="#efb15e" strokeWidth="1.6" strokeLinecap="round" />
                <g fill="#ffd586">
                  <circle cx="50" cy="21" r="1.7" /><circle cx="47" cy="22" r="1.2" />
                  <circle cx="51" cy="24" r="1.1" /><circle cx="49" cy="19" r="1" />
                </g>
              </g>
            </svg>
          </blockquote>
          </article>
        </div>
      </div>
    </section>
  );
}
