import { useState } from 'react';

const visitIconFiles: Record<string, string> = {
  compass: 'arrival',
  shuttle: 'shuttle',
  clipboard: 'rules',
  help: 'faq',
  cable: 'cable',
  ferry: 'ferry',
  boat: 'speedboat',
  yacht: 'yacht',
  ticket: 'tickets',
  family: 'family',
  shield: 'safety',
  bag: 'lockers',
  weather: 'weather',
  access: 'access',
};

function VisitIcon({ name, size = 32 }: { name: string; size?: number }) {
  const file = visitIconFiles[name] ?? 'arrival';
  const base = import.meta.env.BASE_URL;
  return (
    <img
      className="apr-visit-gold-icon"
      src={`${base}visit-icons/${file}.png`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  );
}

const arrivals = [
  { id: 'ocean-wings', title: 'Ocean Wings', icon: 'cable', desc: 'Панорамная канатная дорога', details: 'Самый живописный способ прибытия. Две ветки канатной дороги с панорамными кабинами, вид на океан и остров. Поездка зависит от погодных условий.' },
  { id: 'ferry', title: 'Паромы и катамараны', icon: 'ferry', desc: 'Морской пассажирский транспорт', details: 'Пассажирский транспорт с материка. Условия доступности и расписание конкретных рейсов требуют уточнения.' },
  { id: 'speedboat', title: 'Скоростные катера', icon: 'boat', desc: 'Групповой и индивидуальный трансфер', details: 'Быстрый способ добраться до острова небольшими группами. Доступность зависит от погодных и морских условий.' },
  { id: 'marina', title: 'Яхтенная марина', icon: 'yacht', desc: 'Прибытие на частных яхтах', details: 'Марина предназначена для прибытия частных судов. Условия швартовки уточняются.' },
];

const transports = [
  { id: 'loop', title: 'Paradise Loop', status: 'Бесплатно', desc: 'Кольцевые электрошаттлы', details: 'Движение в обоих направлениях. Демонстрационное расписание: 08:30–22:30, интервал отправления — 10 минут в каждом направлении. Один участок между соседними остановками — 5 минут. Все рейсы заканчиваются не позднее 22:30.' },
  { id: 'express', title: 'Экспресс-шаттлы', status: 'Платно', desc: 'Ускоренное перемещение', details: 'Сокращённые маршруты с меньшим количеством остановок. Тарифы и расписание уточняются.' },
  { id: 'buggy', title: 'Электробагги', status: 'По запросу', desc: 'Индивидуальный трансфер до 4 человек', details: 'Электрокар вместимостью до 4 человек для перемещения по острову. Условия заказа, стоимость и расписание уточняются.' },
  { id: 'accessible', title: 'Доступный трансфер', status: 'Бесплатно', desc: 'Помощь гостям с ограниченной мобильностью', details: 'Специальный транспорт для гостей, которым необходима помощь с передвижением.' },
  { id: 'walk', title: 'Пешеходные маршруты', status: 'Бесплатно', desc: 'Благоустроенные дорожки', details: 'Затенённые прогулочные участки и зоны отдыха. Доступность отдельных участков для инвалидных колясок различается; подходящие переходы можно уточнить у персонала курорта.' },
];

const faqs = [
  { q: 'Нужен ли отдельный билет для входа в Paradise Market?', a: 'Нет, Paradise Market находится внутри территории курорта. Вход возможен по действующему билету Aqua Paradise.' },
  { q: 'Как добраться до отеля Paradise Grand?', a: 'Отель расположен на северо-западном побережье. Доступные способы перемещения описаны в разделе транспорта.' },
  { q: 'Могут ли аттракционы закрываться из-за погоды?', a: 'Да, при сильном ветре, грозе или опасных морских условиях отдельные аттракционы и пляжные зоны могут временно закрываться.' },
  { q: 'Как работает Paradise Loop?', a: 'Бесплатные кольцевые электрошаттлы движутся в двух направлениях. Демонстрационный интервал отправления — 10 минут; поездки завершаются до 22:30.' },
  { q: 'Нужно ли сопровождение несовершеннолетним?', a: 'Да. Посетителям младше 18 лет необходим сопровождающий от 18 лет. Правило действует для всех билетов.' },
];

const navigation = [
  { id: 'arrival', title: 'Как добраться', icon: 'compass' },
  { id: 'transport', title: 'Транспорт', icon: 'shuttle' },
  { id: 'rules', title: 'Правила', icon: 'clipboard' },
  { id: 'faq', title: 'Частые вопросы', icon: 'help' },
];

const rules = [
  { icon: 'ticket', title: 'Билеты и вход', text: 'Вход на территорию курорта осуществляется по действующему билету. Сохраняйте билет до конца посещения.' },
  { icon: 'family', title: 'Дети и сопровождение', text: 'Гости младше 18 лет должны находиться в группе хотя бы с одним сопровождающим от 18 лет.' },
  { icon: 'shield', title: 'Безопасность', text: 'Соблюдайте инструкции персонала и правила аттракционов. Спасатели не заменяют родительский присмотр.' },
  { icon: 'bag', title: 'Личные вещи', text: 'Для хранения вещей предусмотрены камеры хранения. Не оставляйте ценные вещи без присмотра.' },
  { icon: 'weather', title: 'Погодные ограничения', text: 'При неблагоприятных погодных условиях отдельные аттракционы и пляжные зоны могут быть временно закрыты.' },
  { icon: 'access', title: 'Доступность', text: 'На острове предусмотрены доступные маршруты и помощь гостям с ограниченной мобильностью. Условия отдельных дорожек различаются.' },
];

export default function VisitPage() {
  const [activeArrival, setActiveArrival] = useState<string | null>(null);
  const [activeTransport, setActiveTransport] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth', block: 'start' });
  };

  return (
    <div className="apr-visit min-h-screen">
      <div className="apr-visit-hero relative min-h-[520px] flex items-center justify-center overflow-hidden px-5 py-28">
        <div className="apr-visit-hero-frame" aria-hidden="true" />
        <div className="apr-visit-hero-copy relative z-10 text-center px-4 max-w-4xl">
          <p className="apr-visit-kicker mb-6">THE JOURNEY · AQUA PARADISE</p><h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Ваше путешествие начинается здесь</h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto">Всё, что нужно знать для комфортного и безопасного отдыха на острове.</p>
        </div>
      </div>

      <nav aria-label="Разделы страницы посещения" className="apr-visit-nav max-w-6xl mx-auto px-5 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {navigation.map(card => (
            <button key={card.id} type="button" onClick={() => scrollToSection(card.id)} className="apr-visit-nav-card p-6 text-center group focus-visible:outline-2 focus-visible:outline-offset-2">
              <span className="flex justify-center items-center mb-3 min-h-[76px]" aria-hidden="true"><VisitIcon name={card.icon} size={70} /></span>
              <span className="font-semibold text-sm">{card.title}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="apr-visit-content max-w-6xl mx-auto px-5 pb-24 space-y-24">
        <section id="arrival" className="apr-visit-section scroll-mt-24">
          <h2 className="apr-visit-heading font-serif text-5xl md:text-6xl mb-8">Как добраться</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arrivals.map(arr => {
              const expanded = activeArrival === arr.id;
              return (
                <div key={arr.id} className="apr-visit-arrival overflow-hidden">
                  <button type="button" aria-expanded={expanded} aria-controls={`arrival-details-${arr.id}`} onClick={() => setActiveArrival(expanded ? null : arr.id)} className="w-full text-left focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-teal-600 rounded-2xl">
                    <span className="apr-visit-arrival-visual h-48 flex items-center justify-center text-5xl" aria-hidden="true"><VisitIcon name={arr.icon} size={150} /></span>
                    <span className="p-5 flex justify-between items-center gap-3">
                      <span>
                        <span className="font-serif text-3xl block mb-1">{arr.title}</span>
                        <span className="text-sm text-gray-500 block">{arr.desc}</span>
                      </span>
                      <span className="text-teal-700 font-bold text-xl" aria-hidden="true">{expanded ? '−' : '+'}</span>
                    </span>
                  </button>
                  <div id={`arrival-details-${arr.id}`} hidden={!expanded} className="px-5 pb-5 text-sm text-gray-600">
                    <div className="pt-4 border-t border-gray-100">{arr.details}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="transport" className="apr-visit-section scroll-mt-24">
          <h2 className="apr-visit-heading font-serif text-5xl md:text-6xl mb-8">Транспорт на острове</h2>
          <div className="apr-visit-accordion overflow-hidden">
            {transports.map((tr, index) => {
              const expanded = activeTransport === tr.id;
              return (
                <div key={tr.id} className={index !== transports.length - 1 ? 'border-b border-gray-100' : ''}>
                  <button type="button" aria-expanded={expanded} aria-controls={`transport-details-${tr.id}`} onClick={() => setActiveTransport(expanded ? null : tr.id)} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left focus-visible:outline-2 focus-visible:outline-teal-600">
                    <span>
                      <span className="block font-bold text-gray-900">{tr.title}</span>
                      <span className="block text-sm text-gray-500">{tr.desc}</span>
                    </span>
                    <span className="flex items-center gap-3 ml-3">
                      <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${tr.status === 'Бесплатно' ? 'bg-teal-100 text-teal-800' : tr.status === 'Платно' ? 'bg-gray-100 text-gray-800' : 'bg-amber-100 text-amber-800'}`}>{tr.status}</span>
                      <span className="text-teal-600 font-bold" aria-hidden="true">{expanded ? '−' : '+'}</span>
                    </span>
                  </button>
                  <div id={`transport-details-${tr.id}`} hidden={!expanded} className="px-5 pb-5 text-sm text-gray-600">{tr.details}</div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="rules" className="apr-visit-section scroll-mt-24">
          <h2 className="apr-visit-heading font-serif text-5xl md:text-6xl mb-8">Правила посещения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rules.map(rule => (
              <div key={rule.title} className="apr-visit-rule p-7 flex gap-4">
                <span className="text-2xl" aria-hidden="true"><VisitIcon name={rule.icon} size={56} /></span>
                <div>
                  <h3 className="font-serif text-2xl mb-2">{rule.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{rule.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">Подробные ограничения по возрасту и росту для конкретных аттракционов смотрите в каталоге «Аттракционы».</p>
        </section>

        <section id="faq" className="apr-visit-section scroll-mt-24">
          <h2 className="apr-visit-heading font-serif text-5xl md:text-6xl mb-8">Частые вопросы</h2>
          <div className="apr-visit-accordion overflow-hidden">
            {faqs.map((faq, index) => {
              const expanded = activeFaq === index;
              return (
                <div key={faq.q} className={index !== faqs.length - 1 ? 'border-b border-gray-100' : ''}>
                  <button type="button" aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setActiveFaq(expanded ? null : index)} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left focus-visible:outline-2 focus-visible:outline-teal-600">
                    <span className="font-medium text-gray-900">{faq.q}</span>
                    <span className="text-teal-600 font-bold text-xl ml-4" aria-hidden="true">{expanded ? '−' : '+'}</span>
                  </button>
                  <div id={`faq-answer-${index}`} hidden={!expanded} className="px-5 pb-5 text-sm text-gray-600">{faq.a}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
