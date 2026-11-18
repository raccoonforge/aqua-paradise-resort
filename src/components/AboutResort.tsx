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
              <path fill="#697842" d="M35 46Q11 35 5 59q19 0 30-13m2 0q21 2 17 23Q38 63 37 46"/>
              <path fill="#b94028" d="M34 39C5 41 6 16 26 22C16-1 45-3 43 21C58 4 76 24 55 34C78 43 57 62 44 47C36 68 16 52 34 39Z"/>
              <path d="M39 39q9-14 18-19" fill="none" stroke="#ffcf77" strokeWidth="2"/><circle cx="57" cy="20" r="3" fill="#ffcf77"/>
            </svg>
          </blockquote>
        </article>
      </div>
    </section>
  );
}
