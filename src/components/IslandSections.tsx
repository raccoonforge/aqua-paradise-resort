import { useState } from "react";
import heroWaterpark from "../assets/hero-waterpark.png";
import { attractions, zones, type RestType } from "../data/island";

const filters: { value: RestType | "all"; label: string }[] = [
  { value: "all", label: "Все зоны" },
  { value: "family", label: "С семьёй" },
  { value: "adventure", label: "За приключениями" },
  { value: "relax", label: "Для спокойного отдыха" },
];
export function IslandIntro() {
  return (
    <>
      <div className="island-facts">
        <div className="container facts-row">
          <p>
            <strong>09:00–22:00</strong>
            <span>время работы курорта</span>
          </p>
          <p>
            <strong>9 тематических зон</strong>
            <span>у каждого дня свой маршрут</span>
          </p>
          <p>
            <strong>Paradise Loop</strong>
            <span>бесплатные электрошаттлы</span>
          </p>
        </div>
      </div>
      <section
        id="island"
        className="section container intro"
        aria-labelledby="island-title"
      >
        <div className="intro-photo">
          <img
            src={heroWaterpark}
            alt="Водопады и тропическая зелень вокруг бассейна Aqua Paradise"
            loading="lazy"
            width="1672"
            height="941"
          />
          <span className="photo-caption">
            A different kind of island escape
          </span>
        </div>
        <div className="intro-copy">
          <p className="eyebrow">01 / Добро пожаловать на остров</p>
          <h2 id="island-title">
            Найдите свой
            <br />
            <em>ритм рая.</em>
          </h2>
          <p className="lead">
            Утром — навстречу приключениям.
            <br />
            Днём — в прохладу тропических садов.
            <br />
            Вечером — к океану на закат.
          </p>
          <p>
            На Aqua Paradise не нужно выбирать между яркими эмоциями и спокойным
            отдыхом. Здесь пиратские бухты соседствуют с ботаническими садами, а
            водные спуски сменяются прогулками у моря.
          </p>
          <a className="text-link" href="#zones">
            Выбрать свою часть острова <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="arrival container" aria-labelledby="arrival-title">
        <div>
          <p className="eyebrow">Путешествие начинается ещё до прибытия</p>
          <h3 id="arrival-title">По воздуху. По морю. В рай.</h3>
        </div>
        <p>
          Панорамная канатная дорога Ocean Wings или морской маршрут на пароме и
          скоростном катере. На острове вас встретит Paradise Boulevard, а между
          зонами помогут перемещаться бесплатные шаттлы Paradise Loop.
        </p>
      </section>
    </>
  );
}

export function ZoneOverview() {
  const [filter, setFilter] = useState<RestType | "all">("all");
  const visible = zones.filter(
    (zone) => filter === "all" || zone.types.includes(filter),
  );
  return (
    <section
      id="zones"
      className="section zones-section"
      aria-labelledby="zones-title"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / Девять миров одного острова</p>
            <h2 id="zones-title">
              Какой сегодня
              <br />
              <em>ваш Paradise?</em>
            </h2>
          </div>
          <p>
            Выбирайте атмосферу под настроение:
            <br />
            от первого детского всплеска до спуска,
            <br />
            от которого захватывает дух.
          </p>
        </div>
        <div className="filters" role="group" aria-label="Тип отдыха">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="result-count" role="status">
          Показано зон: {visible.length} из {zones.length}
        </p>
        <div className="zone-grid">
          {visible.map((zone) => (
            <article className={`zone-card zone-${zone.id}`} key={zone.id}>
              <div className="zone-top">
                <span className="zone-index" aria-hidden="true">
                  {String(zones.indexOf(zone) + 1).padStart(2, "0")}
                </span>
                <span className="zone-hours">{zone.hours}</span>
              </div>
              <p className="zone-subtitle">{zone.subtitle}</p>
              <h3>{zone.name}</h3>
              <p>{zone.description}</p>
              <details>
                <summary aria-label={`Подробнее о зоне ${zone.name}`}>
                  Об этой зоне <span aria-hidden="true">+</span>
                </summary>
                <p>{zone.detail}</p>
              </details>
            </article>
          ))}
        </div>
        <p className="section-note">
          Указано время работы зон. Расписание и правила отдельных аттракционов
          могут отличаться.
        </p>
      </div>
    </section>
  );
}

export function AttractionHighlights() {
  return (
    <section
      id="attractions"
      className="section container"
      aria-labelledby="attractions-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / Моменты, которые останутся с вами</p>
          <h2 id="attractions-title">
            За эмоциями —<br />
            <em>сюда.</em>
          </h2>
        </div>
        <p>
          Четыре способа почувствовать остров.
          <br />И множество причин вернуться.
        </p>
      </div>
      <div className="attraction-grid">
        {attractions.map((item, index) => (
          <article className="attraction-card" key={item.name}>
            <div className={`attraction-banner attraction-banner-${index}`}>
              <span aria-hidden="true">0{index + 1} /</span>
              <span className="intensity">{item.intensity}</span>
              <span className="banner-word" aria-hidden="true">
                {["THE DROP", "DISCOVER", "SET SAIL", "THE RACE"][index]}
              </span>
            </div>
            <div className="attraction-body">
              <p className="eyebrow">{item.zone}</p>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <ul className="attraction-meta">
                <li>{item.age}</li>
                <li>{item.height}</li>
                <li>{item.hours}</li>
              </ul>
              <p className="attraction-note">{item.note}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="section-note">
        Возраст и рост — обязательные условия допуска. Все характеристики
        относятся к демонстрационной модели вымышленного курорта.
      </p>
    </section>
  );
}

export function VisitPreview() {
  return (
    <>
      <section className="hotel-strip container" aria-labelledby="hotel-title">
        <div>
          <p className="eyebrow">Остаться чуть дольше</p>
          <h2 id="hotel-title">
            Paradise Grand
            <br />
            <em>Hotel & Villas</em>
          </h2>
        </div>
        <div>
          <p>
            Островной отдых не заканчивается с закатом. Гостиничный комплекс на
            возвышенности — отдельная часть курорта для тех, кто хочет продлить
            путешествие.
          </p>
          <p className="section-note">
            Подробная информация об отеле появится на следующем этапе.
            Бронирование проживания пока недоступно.
          </p>
        </div>
      </section>
      <section className="visit-preview section" aria-labelledby="visit-title">
        <div className="container">
          <p className="eyebrow light">Ваш следующий островной день</p>
          <h2 id="visit-title">
            Сначала мечта.
            <br />
            <em>Затем — ваш маршрут.</em>
          </h2>
          <div className="visit-grid">
            <article id="tickets">
              <span className="coming-soon">Следующий этап</span>
              <h3>Билеты на остров</h3>
              <p>
                Day Pass, Premium Pass и Evening Pass. Калькулятор стоимости и
                демонстрационное оформление появятся позже.
              </p>
            </article>
            <article id="planner">
              <span className="coming-soon">В разработке</span>
              <h3>Личный план приключений</h3>
              <p>
                Маршрут с учётом интересов, состава группы, ограничений
                аттракционов и времени на отдых — в будущем планировщике.
              </p>
            </article>
          </div>
          <a className="button button-sand" href="#zones">
            Пока исследуем остров <span aria-hidden="true">↑</span>
          </a>
        </div>
      </section>
    </>
  );
}
