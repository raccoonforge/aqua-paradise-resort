import { useEffect, useRef, useState } from 'react';
import riviera from '../assets/retro/riviera.webp';
import './AboutEditorial.css';

const highlights = [
  { value: '9', unit: 'уникальных зон', icon: 'sun' },
  { value: '6 км²', unit: 'территория острова', icon: 'island' },
  { value: '09:00–22:00', unit: 'ежедневно', icon: 'clock' },
  { value: 'Для всей', unit: 'семьи', icon: 'family' },
] as const;

function HighlightIcon({ name }: { name: typeof highlights[number]['icon'] }) {
  if (name === 'sun') return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M8 36h32M13 35V20c0-6 5-11 11-11s11 5 11 11v15M13 23h22M20 9V4M28 9V4M24 23v13" /><path d="M20 15h8" /></svg>;
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
      <div className="apr-about__backdrop" aria-hidden="true" />
      <div className="apr-about__layout">
        <div className="apr-about__art-panel">
          <div className="apr-about__photo-border">
            <img className="apr-about__art" src={riviera}
              alt="Иллюстрация тропического курорта Aqua Paradise с лагуной, мостами, водопадами и пальмами"
              loading="lazy" />
            <div className="apr-about__art-wash" aria-hidden="true" />
          </div>
          <span className="apr-about__art-caption" aria-hidden="true">THE GOLDEN AGE OF PARADISE · EST. IN IMAGINATION</span>
          <div className="apr-about__postmark" aria-hidden="true"><span>✳</span> AQUA<br />PARADISE</div>
        </div>

        <div className="apr-about__paper">
          <div className="apr-about__section-label"><span>О КУРОРТЕ</span></div>
          <div className="apr-about__seal" aria-hidden="true"><span>AQUA PARADISE</span><strong>☼</strong><small>RESORT</small></div>
          <h2 id="about-title">Золотой век<br />тропического рая</h2>
          <div className="apr-about__brush" aria-hidden="true" />

          <div className="apr-about__intro">
            <div className="apr-about__palms" aria-hidden="true">✺</div>
            <p><strong>Aqua Paradise Resort</strong> — премиальный тропический остров-аквапарк, где природа, развлечения и высокий уровень сервиса соединяются в одном месте. Вас ждут девять уникальных зон, отдых для всей семьи и тщательно продуманные впечатления — от активных приключений до полного расслабления в атмосфере курортной роскоши.</p>
          </div>

          <div className="apr-about__stats" aria-label="Курорт в цифрах">
            {highlights.map((item) => (
              <div className="apr-about__stat" key={item.icon}>
                <HighlightIcon name={item.icon} />
                <strong>{item.value}</strong>
                <span>{item.unit}</span>
              </div>
            ))}
          </div>

          <div className="apr-about__quote">
            <span aria-hidden="true">✳</span>
            <p>«Курорт, где каждый день становится особенным путешествием»</p>
          </div>
        </div>
      </div>
      <span className="apr-about__flower apr-about__flower--left" aria-hidden="true">✿</span>
      <span className="apr-about__flower apr-about__flower--right" aria-hidden="true">✿</span>
    </section>
  );
}
