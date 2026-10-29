import { useState, useMemo, useEffect, useRef } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';
import QRCode from 'qrcode';

const BASE_PRICES = {
  day: { low: 65, high: 85 },
  premium: { low: 115, high: 145 },
  evening: { low: 40, high: 55 }
};

const AGE_DISCOUNTS = {
  infant: 1.0,
  child: 0.3,
  teen: 0.15,
  adult: 0.0,
  senior: 0.25
};

// Описание тарифов для карточек (APR-BUG-009)
// Источник: website-requirements.md §6.2, §6.6.1
const TARIFFS = [
  {
    id: 'day' as const,
    name: 'Paradise Day Pass',
    priceLow: 65,
    description: 'Стандартное дневное посещение курорта.',
    includes: [
      'Доступ к тематическим зонам',
      'Работающие аттракционы по правилам',
      'Бесплатный Paradise Loop',
    ],
    extras: ['Кабана за $75', 'Приоритетный доступ $25/чел.'],
  },
  {
    id: 'premium' as const,
    name: 'Paradise Premium Pass',
    priceLow: 115,
    description: 'Все возможности Day Pass и приоритетный доступ без доплаты.',
    includes: [
      'Все из Day Pass',
      'Приоритетный доступ включён',
      'Премиальная зона отдыха',
      'Скидка 10% на кабану',
    ],
    extras: ['Кабана за $67.50'],
  },
  {
    id: 'evening' as const,
    name: 'Paradise Evening Pass',
    priceLow: 40,
    description: 'Вечернее посещение с 17:00 до 22:00.',
    includes: [
      'Доступ к вечерним бассейнам',
      'Рестораны и прогулочные зоны',
      'Отдельные вечерние аттракционы',
    ],
    extras: ['Кабана и приоритет недоступны'],
  },
];

// URL для пасхалки (дословно из Master Blueprint §4.7)
const EASTER_EGG_URL = 'https://www.twitch.tv/bigrussianmum';

export default function TicketsPage() {
  const [visitDate, setVisitDate] = useState<string>('');
  const [ticketType, setTicketType] = useState<'day' | 'premium' | 'evening'>('day');

  const [guests, setGuests] = useState({
    infant: 0, child: 0, teen: 0, adult: 1, senior: 0
  });

  const [hasCabana, setHasCabana] = useState(false);
  const [hasPriority, setHasPriority] = useState(false);

  const isWeekend = useMemo(() => {
    if (!visitDate) return false;
    const date = new Date(visitDate);
    const day = date.getDay();
    return day === 0 || day === 6;
  }, [visitDate]);

  const isHighSeason = useMemo(() => {
    if (!visitDate) return false;
    const date = new Date(visitDate);
    const month = date.getMonth();
    return month >= 10 || month <= 3;
  }, [visitDate]);

  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0);

  const minorsCount = guests.child + guests.teen + guests.infant;
  const adultsCount = guests.adult + guests.senior;
  const isAdultRequired = minorsCount > 0 && adultsCount === 0;

  const ticketsCost = useMemo(() => {
    let total = 0;
    const basePrice = isHighSeason ? BASE_PRICES[ticketType].high : BASE_PRICES[ticketType].low;

    Object.entries(guests).forEach(([category, count]) => {
      if (count === 0) return;
      const discount = AGE_DISCOUNTS[category as keyof typeof AGE_DISCOUNTS];
      const pricePerPerson = basePrice * (1 - discount);
      let finalPrice = pricePerPerson;
      if (isWeekend && category !== 'infant') finalPrice = pricePerPerson * 1.15;
      total += finalPrice * count;
    });

    return Math.round(total * 100) / 100;
  }, [guests, ticketType, isHighSeason, isWeekend]);

  const extrasCost = useMemo(() => {
    let total = 0;
    if (hasCabana && ticketType !== 'evening') {
      if (ticketType === 'premium') total += 75 * 0.9;
      else total += 75;
    }
    if (hasPriority && ticketType === 'day') {
      const payingGuests = totalGuests - guests.infant;
      total += 25 * payingGuests;
    }
    return Math.round(total * 100) / 100;
  }, [hasCabana, hasPriority, ticketType, guests, totalGuests]);

  const totalCost = Math.round((ticketsCost + extrasCost) * 100) / 100;

  // Модалка
  const [showTicket, setShowTicket] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const ticketModalRef = useFocusTrap<HTMLDivElement>(showTicket);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTicket) setShowTicket(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showTicket]);

  // QR-пасхалка (APR-BUG-032)
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  useEffect(() => {
    if (!easterEggOpen || !qrCanvasRef.current) return;
    QRCode.toCanvas(qrCanvasRef.current, EASTER_EGG_URL, {
      width: 180,
      margin: 1,
      color: { dark: '#0a192f', light: '#ffffff' },
    }).catch(() => { /* игнорируем */ });
  }, [easterEggOpen]);

  const updateGuest = (type: keyof typeof guests, delta: number) => {
    setGuests(prev => {
      const newCount = prev[type] + delta;
      if (newCount < 0) return prev;
      if (totalGuests >= 10 && delta > 0) return prev;

      if (delta > 0 && (type === 'child' || type === 'teen' || type === 'infant') && prev.adult === 0 && prev.senior === 0) {
        alert('Для посещения несовершеннолетних необходим хотя бы один взрослый (18+)');
        return prev;
      }

      return { ...prev, [type]: newCount };
    });
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Билеты</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Спланируйте идеальный визит и рассчитайте стоимость заранее.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          <div className="w-full lg:w-2/3 space-y-6">

            {/* Шаг 1: Дата */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-gray-900 mb-4">1. Выберите дату</h2>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                aria-label="Дата посещения"
                className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              {visitDate && (
                <p className="text-xs text-teal-600 mt-2">
                  {isHighSeason ? 'Высокий сезон' : 'Низкий сезон'} • {isWeekend ? 'Выходной день (+15%)' : 'Будний день'}
                </p>
              )}
            </div>

            {/* Шаг 2: Тариф — карточки сравнения (APR-BUG-009) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-gray-900 mb-4">2. Выберите тариф</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TARIFFS.map(tariff => {
                  const isSelected = ticketType === tariff.id;
                  return (
                    <button
                      key={tariff.id}
                      onClick={() => {
                        setTicketType(tariff.id);
                        if (tariff.id === 'evening') { setHasCabana(false); setHasPriority(false); }
                        if (tariff.id === 'premium') { setHasPriority(false); }
                      }}
                      aria-pressed={isSelected}
                      className={`text-left p-4 rounded-2xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50 shadow-md'
                          : 'border-gray-200 hover:border-teal-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-serif text-lg text-gray-900 leading-tight">{tariff.name}</h3>
                        {isSelected && <span className="text-teal-600 text-xl" aria-hidden="true">✓</span>}
                      </div>
                      <p className="text-2xl font-serif text-teal-700 mb-3">
                        от ${tariff.priceLow}
                      </p>
                      <p className="text-xs text-gray-600 mb-3">{tariff.description}</p>
                      <ul className="space-y-1 text-xs text-gray-700">
                        {tariff.includes.map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-teal-500 flex-shrink-0" aria-hidden="true">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
                        {tariff.extras.map((ex, i) => <div key={i}>• {ex}</div>)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Шаг 3: Состав группы */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-gray-900 mb-4">3. Состав группы (макс. 10 человек)</h2>

              <div className="space-y-3">
                {Object.entries({
                  adult: 'Взрослые (18–59 лет)',
                  senior: 'Пожилые (60+ лет)',
                  teen: 'Подростки (13–17 лет)',
                  child: 'Дети (4–12 лет)',
                  infant: 'Младенцы (0–3 года)'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700 font-medium">{label}</span>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateGuest(key as any, -1)}
                        aria-label={`Уменьшить количество: ${label}`}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-gray-900">{guests[key as keyof typeof guests]}</span>
                      <button
                        onClick={() => updateGuest(key as any, 1)}
                        aria-label={`Увеличить количество: ${label}`}
                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Шаг 4: Доп. услуги */}
            {ticketType !== 'evening' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-serif text-gray-900 mb-4">4. Дополнительные услуги</h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={hasCabana}
                      onChange={(e) => setHasCabana(e.target.checked)}
                      className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                    />
                    <div className="flex-grow">
                      <span className="block font-medium text-gray-900">Приватная кабана</span>
                      <span className="text-sm text-gray-500">Аренда на весь день (Day и Premium)</span>
                    </div>
                    <span className="font-bold text-gray-900">{ticketType === 'premium' ? '$67.50' : '$75.00'}</span>
                  </label>

                  {ticketType === 'day' && (
                    <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={hasPriority}
                        onChange={(e) => setHasPriority(e.target.checked)}
                        className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                      />
                      <div className="flex-grow">
                        <span className="block font-medium text-gray-900">Приоритетный доступ</span>
                        <span className="text-sm text-gray-500">Быстрый проход на аттракционы</span>
                      </div>
                      <span className="font-bold text-gray-900">$25 / чел.</span>
                    </label>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Правая часть — сводка */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Итого</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Билеты ({totalGuests} чел.)</span>
                  <span>${ticketsCost.toFixed(2)}</span>
                </div>
                {extrasCost > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Доп. услуги</span>
                    <span>${extrasCost.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">К оплате</span>
                  <span className="text-3xl font-serif text-teal-700">${totalCost.toFixed(2)}</span>
                </div>
              </div>

              {isAdultRequired && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-200">
                  Для посещения курорта гостям младше 18 лет необходим сопровождающий от 18 лет.
                </div>
              )}

              <button
                onClick={() => {
                  const randomNum = Math.floor(100000 + Math.random() * 900000);
                  setOrderNumber(`APR-${randomNum}`);
                  setShowTicket(true);
                  setEasterEggOpen(false);
                }}
                disabled={totalGuests === 0 || !visitDate || isAdultRequired}
                className="w-full bg-teal-600 text-white py-4 rounded-xl font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              >
                Оформить билеты
              </button>

              <p className="text-xs text-center text-gray-400">
                Демонстрационный расчёт. Реальные платежи не проводятся.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Модалка билета */}
      {showTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowTicket(false)}
        >
          <div
            ref={ticketModalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
            tabIndex={-1}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative outline-none max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowTicket(false)}
              aria-label="Закрыть электронный билет"
              className="absolute top-4 right-4 z-10 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              ✕
            </button>

            <div className="bg-teal-800 p-6 text-white text-center">
              <h2 id="ticket-modal-title" className="text-2xl font-serif mb-1">Aqua Paradise</h2>
              <p className="text-teal-200 text-sm">Электронный демонстрационный билет</p>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-200 pb-4">
                <div>
                  <span className="block text-xs text-gray-500 uppercase">Номер заказа</span>
                  <span className="font-bold text-gray-900 text-lg">{orderNumber}</span>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-gray-500 uppercase">Дата</span>
                  <span className="font-bold text-gray-900">{visitDate}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700 mb-6">
                <div className="flex justify-between">
                  <span>Тариф:</span>
                  <span className="font-medium">
                    {ticketType === 'day' ? 'Day Pass' : ticketType === 'premium' ? 'Premium Pass' : 'Evening Pass'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Гостей:</span>
                  <span className="font-medium">{totalGuests} чел.</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-teal-700 pt-2 border-t border-gray-100">
                  <span>Оплачено:</span>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* QR-пасхалка (APR-BUG-032) */}
              {!easterEggOpen ? (
                <div className="text-center">
                  <button
                    onClick={() => setEasterEggOpen(true)}
                    aria-label="Добровольная пасхалка"
                    className="text-xs text-gray-400 hover:text-teal-600 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
                  >
                    [ Открыть маленький сюрприз ]
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center animate-fade-in">
                  <p className="font-serif text-lg text-gray-900 mb-1">Рай закончился. Начинается Хардкор!</p>
                  <p className="text-sm text-gray-600 mb-3">Познакомьтесь с королевой хардкора</p>
                  <canvas ref={qrCanvasRef} aria-label="QR-код пасхалки" className="mx-auto"></canvas>
                  <p className="text-[10px] text-gray-400 mt-2">
                    Это не пропуск. Просто маленький сюрприз.
                  </p>
                </div>
              )}

              <p className="text-[10px] text-center text-gray-400 mt-6">
                Это демонстрационный проект. Курорт, цены и услуги вымышлены. Реальные бронирования и платежи не осуществляются.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
