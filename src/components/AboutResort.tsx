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
  // Vector silhouettes extracted from the approved four-icon travel poster.
  if (name === 'sun') return (    <svg viewBox="105 22 382 300" fill="currentColor" aria-hidden="true" focusable="false"><path d="M396 33L375 36L361 32L347 32L345 27L339 27L338 80L291 108L283 116L300 118L300 150L313 148L314 117L341 117L342 144L355 142L356 117L406 117L407 136L405 138L369 148L233 170L193 182L165 195L152 206L148 213L147 241L154 257L169 268L169 301L134 306L111 314L213 307L410 304L388 288L351 272L314 262L191 239L173 233L156 222L155 211L164 202L169 202L166 215L171 219L171 211L177 204L201 191L204 194L190 203L184 211L186 221L196 228L231 237L222 230L222 223L230 217L252 208L299 199L299 245L242 239L317 252L362 264L394 278L429 304L479 304L470 294L453 282L422 269L422 118L437 116L438 113L367 71L346 72L347 58L384 50L392 42Z M221 285L266 292L281 296L282 299L223 300Z M183 275L207 280L208 299L184 301Z M356 213L389 214L389 235L387 237L366 238L377 241L387 240L389 242L388 260L355 255Z M316 195L339 192L341 195L341 249L339 252L313 248L313 197Z M404 172L407 173L406 264L397 262L397 185L389 188L389 207L387 209L355 208L356 189L390 181Z" fillRule="evenodd"/></svg>);
  if (name === 'island') return (    <svg viewBox="49 23 450 292" fill="currentColor" aria-hidden="true" focusable="false"><path d="M233 306L300 311L352 307L322 305Z M116 287L144 292L188 295L243 295L259 292L293 297L382 296L436 289Z M57 266L73 270L114 274L177 275L176 278L169 279L252 282L425 277L490 268L290 271L290 267L302 265L266 263Z M314 200L286 174L275 167L268 167L258 172L260 176L264 177L263 182L260 183L228 147L214 138L207 137L184 151L162 181L150 204L171 188L170 196L161 204L125 228L124 225L141 206L150 190L134 188L121 198L97 230L84 233L57 255L195 251L231 223L239 220L250 220L267 209L284 204L301 206L315 211Z M200 149L201 153L194 164L187 163L187 156Z M235 81L230 92L259 78L262 79L259 87L282 79L281 86L303 81L304 84L301 87L316 88L326 92L325 95L306 93L291 96L271 107L256 128L252 142L252 155L272 128L275 129L276 139L289 121L292 122L293 129L304 115L307 116L308 123L322 111L335 107L336 110L324 139L319 170L320 196L327 223L324 224L296 212L285 212L253 230L253 232L260 231L260 235L243 240L242 237L246 233L243 231L229 242L210 252L266 251L322 257L466 257L422 243L409 242L391 228L374 219L347 223L337 199L332 161L339 127L346 111L349 111L356 119L363 138L368 132L371 133L376 153L380 146L383 147L386 168L390 161L393 162L397 194L404 179L406 158L402 139L392 122L379 111L367 106L367 102L381 105L390 110L394 108L406 118L407 114L410 113L424 129L425 123L428 122L447 152L447 135L444 123L438 111L426 98L402 87L387 86L364 89L366 85L379 80L380 76L392 75L393 71L405 73L404 69L407 68L424 73L416 63L400 55L380 55L365 63L351 79L347 56L336 40L319 30L299 29L283 34L312 42L313 45L306 48L324 57L320 61L329 66L337 80L336 83L313 65L300 59L287 57L272 58L250 67Z" fillRule="evenodd"/></svg>);
  if (name === 'clock') return (    <svg viewBox="146 52 242 244" fill="currentColor" aria-hidden="true" focusable="false"><path d="M253 56L223 64L206 73L190 85L175 101L156 136L151 158L151 190L154 205L165 232L177 250L198 270L233 288L258 293L280 293L300 289L326 278L343 266L359 250L371 232L380 210L384 193L385 163L380 138L370 115L355 94L339 79L327 71L299 59L271 55Z M262 70L284 71L306 77L327 89L340 100L354 118L363 135L370 171L369 189L363 212L345 242L318 265L294 275L276 278L253 277L231 271L214 262L199 250L183 231L174 214L166 179L168 154L174 134L183 117L195 102L210 89L227 79Z M268 253L265 256L266 269L270 270L272 268L272 255Z M209 230L205 230L199 238L203 240L210 233Z M329 229L328 234L336 240L338 236Z M345 171L347 176L360 176L362 174L361 170Z M174 172L176 176L190 176L192 174L190 170L176 170Z M338 109L334 107L328 115L332 116Z M201 107L200 111L209 116L210 113Z M268 99L264 102L264 162L258 168L258 177L266 184L274 183L309 216L315 219L319 216L319 211L280 175L280 168L274 162L274 102Z M268 77L265 91L267 94L271 94L273 80Z" fillRule="evenodd"/></svg>);
  return (    <svg viewBox="91 34 303 277" fill="currentColor" aria-hidden="true" focusable="false"><path d="M152 44L145 55L145 66L153 84L133 89L123 98L106 135L98 173L98 185L102 191L107 191L107 186L112 183L111 168L121 140L125 132L128 131L129 141L122 206L122 290L117 296L116 302L134 304L140 300L145 226L152 189L155 190L157 208L156 298L176 303L187 300L174 286L181 214L181 138L185 136L190 150L202 170L202 178L208 185L213 203L216 206L232 205L225 254L232 256L233 292L225 300L226 303L235 304L243 300L246 256L250 256L252 259L253 300L261 304L271 302L263 293L265 256L272 254L266 210L269 209L277 214L285 211L292 198L298 193L298 184L314 147L318 149L319 162L297 234L321 241L325 289L315 302L327 304L335 299L336 245L338 241L343 241L348 279L348 300L355 304L366 303L366 299L357 288L360 241L385 232L357 162L358 145L361 146L377 180L378 193L383 194L383 200L388 197L388 187L367 124L359 114L353 111L355 107L364 103L365 98L357 90L347 64L340 59L330 58L319 66L315 88L309 96L308 102L315 107L326 106L327 110L312 115L306 123L300 154L292 181L288 187L288 194L278 202L268 191L254 186L264 174L265 161L258 152L251 150L242 152L236 158L234 165L236 176L245 186L234 188L223 194L218 192L214 184L214 173L210 168L199 133L192 100L184 91L168 85L181 68L183 51L179 45L169 40L159 40Z" fillRule="evenodd"/></svg>);
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
