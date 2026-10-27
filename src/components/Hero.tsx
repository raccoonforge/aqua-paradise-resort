import { useState } from "react";

function shouldPlayIntro(video?: string) {
  try {
    return (
      Boolean(video) &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !(navigator as Navigator & { connection?: { saveData?: boolean } })
        .connection?.saveData &&
      !sessionStorage.getItem("aqua-intro-seen")
    );
  } catch {
    return false;
  }
}

/** Supply an approved video ending at the poster's viewpoint; static content always stays accessible. */
export default function Hero({ introVideo }: { introVideo?: string }) {
  const [play, setPlay] = useState(() => shouldPlayIntro(introVideo));
  const finish = () => {
    setPlay(false);
    try {
      sessionStorage.setItem("aqua-intro-seen", "1");
    } catch {
      /* Static Hero remains usable if storage is blocked. */
    }
  };
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <img
        className="hero-landscape"
        src="/media/ocean-hero.webp"
        alt="Пляж Ocean Bay, морская лагуна и тропический курорт"
        fetchPriority="high"
      />
      {play && introVideo && (
        <>
          <video
            className="hero-video"
            src={introVideo}
            autoPlay
            muted
            playsInline
            onEnded={finish}
            onError={finish}
          />
          <button className="skip-intro" onClick={finish}>
            Пропустить интро ↓
          </button>
        </>
      )}
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow">WELCOME TO AQUA PARADISE</p>
        <h1 id="hero-heading">
          Ты ещё не видел <br />
          <em>рай таким.</em>
        </h1>
        <p className="hero-description">
          Девять уникальных миров. Один тропический остров. От безмятежных лагун
          до захватывающих приключений — здесь каждый найдёт свой рай.
        </p>
        <div className="hero-actions">
          <a className="resort-button gold" href="#about">
            Исследовать остров <span aria-hidden="true">↓</span>
          </a>
          <a className="resort-button outline" href="/planner">
            Спланировать отдых <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <span>OCEAN BAY · AQUA PARADISE</span>
        <a href="#about" aria-label="Перейти к знакомству с курортом">
          Листайте к открытиям <span aria-hidden="true">↓</span>
        </a>
        <span>09:00 — 22:00</span>
      </div>
    </section>
  );
}
