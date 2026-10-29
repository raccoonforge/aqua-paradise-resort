import { useState } from 'react';

export default function VisitPage() {
  const [activeArrival, setActiveArrival] = useState<string | null>(null);
  const [activeTransport, setActiveTransport] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // Отступ для фиксированной шапки
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Данные для карточек прибытия
  const arrivals = [
    { id: 'ocean-wings', title: 'Ocean Wings', icon: '🚠', desc: 'Панорамная канатная дорога', details: 'Самый живописный способ прибытия. Две ветки канатной дороги с панорамными кабинами, вид на океан и остров. Зависит от погодных условий.' },
    { id: 'ferry', title: 'Паромы и катамараны', icon: '⛴️', desc: 'Морской пассажирский транспорт', details: 'Массовая перевозка посетителей. Регулярные рейсы с материка. Доступны для маломобильных гостей.' },
    { id: 'speedboat', title: 'Скоростные катера', icon: '🚤', desc: 'Групповой и индивидуальный трансфер', details: 'Быстрый способ добраться до острова. Подходит для небольших групп и VIP-гостей.' },
    { id: 'marina', title: 'Яхтенная марина', icon: '🛥️', desc: 'Прибытие на частных яхтах', details: 'Специализированная марина для частных судов. Расположена вблизи гостиничного комплекса.' },
  ];

  // Данные для транспорта
  const transports = [
    { id: 'loop', title: 'Paradise Loop', status: 'Бесплатно', desc: 'Кольцевые электрошаттлы', details: 'Движение в обоих направлениях. Остановки у основных зон, входа и отеля. Интервал движения — 10 минут.' },
    { id: 'express', title: 'Экспресс-шаттлы', status: 'Платно', desc: 'Ускоренное перемещение', details: 'Сокращённые маршруты с меньшим количеством остановок. Тарифы уточняются.' },
    { id: 'buggy', title: 'Электробагги', status: 'По запросу', desc: 'Индивидуальный трансфер', details: 'Персональный транспорт для комфортного передвижения по острову. Условия уточняются.' },
    { id: 'accessible', title: 'Доступный трансфер', status: 'Бесплатно', desc: 'Помощь гостям с ограниченной мобильностью', details: 'Специальный транспорт для гостей, которым необходима помощь с передвижением.' },
    { id: 'walk', title: 'Пешеходные маршруты', status: 'Бесплатно', desc: 'Благоустроенные дорожки', details: 'Затенённые пространства, места отдыха и питьевая вода. Доступные маршруты для колясок.' },
  ];

  // Данные для FAQ
  const faqs = [
    { q: 'Нужен ли отдельный билет для входа в Paradise Market?', a: 'Нет, Paradise Market находится внутри контролируемой территории аквапарка. Доступ открыт для всех гостей с действующим билетом.' },
    { q: 'Как добраться до отеля Paradise Grand?', a: 'Отель расположен на северо-западном побережье. Добраться можно на шаттлах Paradise Loop или на индивидуальном трансфере.' },
    { q: 'Могут ли аттракционы закрываться из-за погоды?', a: 'Да, при сильном ветре, грозе или опасных морских условиях отдельные аттракционы и пляжные зоны могут временно закрываться в целях безопасности.' },
    { q: 'Как работает Paradise Loop?', a: 'Это бесплатные кольцевые шаттлы, которые курсируют в двух направлениях с интервалом около 10 минут. Остановки расположены у всех основных зон.' },
    { q: 'Нужно ли сопровождение несовершеннолетним?', a: 'Да, гости младше 18 лет должны находиться в группе хотя бы с одним сопровождающим от 18 лет. Это правило действует для всех типов билетов.' },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      
      {/* 1. Hero (Вариант В) */}
      <div className="relative h-[50vh] min-h-[350px] flex items-center justify-center bg-gradient-to-br from-teal-600 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Ваше путешествие начинается здесь</h1>
          <p className="text-lg text-teal-100">Всё, что нужно знать для комфортного и безопасного отдыха на острове.</p>
        </div>
      </div>

      {/* 2. Навигационные карточки */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'arrival', title: 'Как добраться', icon: '✈️' },
            { id: 'transport', title: 'Транспорт', icon: '🚌' },
            { id: 'rules', title: 'Правила', icon: '📋' },
            { id: 'faq', title: 'Частые вопросы', icon: '❓' },
          ].map((card) => (
            <button 
              key={card.id}
              onClick={() => scrollToSection(card.id)}
              className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-center group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{card.icon}</div>
              <div className="font-medium text-gray-900 text-sm">{card.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-20 space-y-16">
        
        {/* 3. Как добраться (Фотокарточки) */}
        <section id="arrival" className="scroll-mt-24">
          <h2 className="text-3xl font-serif text-gray-900 mb-6">Как добраться</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {arrivals.map((arr) => (
              <div 
                key={arr.id} 
                onClick={() => setActiveArrival(activeArrival === arr.id ? null : arr.id)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
              >
                <div className="h-40 bg-gradient-to-br from-teal-100 to-cyan-200 flex items-center justify-center text-5xl">
                  {arr.icon}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-gray-900 mb-1">{arr.title}</h3>
                  <p className="text-sm text-gray-500">{arr.desc}</p>
                  
                  {activeArrival === arr.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 animate-fade-in">
                      {arr.details}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Транспорт (Справочник) */}
        <section id="transport" className="scroll-mt-24">
          <h2 className="text-3xl font-serif text-gray-900 mb-6">Транспорт на острове</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {transports.map((tr, index) => (
              <div key={tr.id} className={index !== transports.length - 1 ? 'border-b border-gray-100' : ''}>
                <button 
                  onClick={() => setActiveTransport(activeTransport === tr.id ? null : tr.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left"
                >
                  <div>
                    <h3 className="font-bold text-gray-900">{tr.title}</h3>
                    <p className="text-sm text-gray-500">{tr.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      tr.status === 'Бесплатно' ? 'bg-teal-100 text-teal-800' : 
                      tr.status === 'Платно' ? 'bg-gray-100 text-gray-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tr.status}
                    </span>
                    <span className="text-teal-600 font-bold">{activeTransport === tr.id ? '−' : '+'}</span>
                  </div>
                </button>
                {activeTransport === tr.id && (
                  <div className="px-5 pb-5 text-sm text-gray-600 animate-fade-in">
                    {tr.details}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => window.location.hash = '#/map'}
              className="bg-teal-600 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition shadow-md"
            >
              Построить маршрут на карте
            </button>
          </div>
        </section>

        {/* 5. Правила (Памятка) */}
        <section id="rules" className="scroll-mt-24">
          <h2 className="text-3xl font-serif text-gray-900 mb-6">Правила посещения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: '🎟️', title: 'Билеты и вход', text: 'Вход на территорию курорта осуществляется по действующему билету. Обязательно сохраняйте билет до конца посещения.' },
              { icon: '👨‍👩‍👧', title: 'Дети и сопровождение', text: 'Гости младше 18 лет должны находиться в группе хотя бы с одним сопровождающим от 18 лет.' },
              { icon: '🛡️', title: 'Безопасность', text: 'Соблюдайте инструкции персонала и правила, указанные на аттракционах. Спасатели не заменяют родительский присмотр.' },
              { icon: '🎒', title: 'Личные вещи', text: 'Для хранения личных вещей предусмотрены камеры хранения. Администрация не несёт ответственности за оставленные без присмотра вещи.' },
              { icon: '⛅', title: 'Погодные ограничения', text: 'При неблагоприятных погодных условиях отдельные аттракционы и пляжные зоны могут быть временно закрыты.' },
              { icon: '♿', title: 'Доступность', text: 'На территории предусмотрены доступные маршруты и специальный транспорт для гостей с ограниченной мобильностью.' },
            ].map((rule, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                <div className="text-2xl">{rule.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{rule.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{rule.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Подробные ограничения по возрасту и росту для конкретных аттракционов смотрите в каталоге «Аттракционы».
          </p>
        </section>

        {/* 6. FAQ (Аккордеон) */}
        <section id="faq" className="scroll-mt-24">
          <h2 className="text-3xl font-serif text-gray-900 mb-6">Частые вопросы</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {faqs.map((faq, index) => (
              <div key={index} className={index !== faqs.length - 1 ? 'border-b border-gray-100' : ''}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <span className="text-teal-600 font-bold text-xl">{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className="px-5 pb-5 text-sm text-gray-600 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
