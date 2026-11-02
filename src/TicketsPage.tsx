import { useState, useMemo, useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useFocusTrap } from './hooks/useFocusTrap';
import QRCode from 'qrcode';

const BASE_PRICES = {
  day: { low: 65, high: 85 },
  premium: { low: 115, high: 145 },
  evening: { low: 40, high: 55 },
};

const AGE_DISCOUNTS = {
  infant: 1.0,
  child: 0.3,
  teen: 0.15,
  adult: 0.0,
  senior: 0.25,
};

type GuestCategory = keyof typeof AGE_DISCOUNTS;
type TicketType = keyof typeof BASE_PRICES;

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

const EASTER_EGG_URL = 'https://www.twitch.tv/bigrussianmum';

// Локальная календарная дата: UTC-строка здесь дала бы ошибку на границе суток.
function localToday(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseCalendarDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const result = new Date(0);
  result.setFullYear(year, month - 1, day);
  result.setHours(12, 0, 0, 0);
  if (
    result.getFullYear() !== year ||
    result.getMonth() !== month - 1 ||
    result.getDate() !== day
  ) return null;
  return result;
}

export default function TicketsPage() {
  const [visitDate, setVisitDate] = useState('');
  const [ticketType, setTicketType] = useState<TicketType>('day');
  const [guests, setGuests] = useState<Record<GuestCategory, number>>({
    infant: 0, child: 0, teen: 0, adult: 1, senior: 0,
  });
  const [hasCabana, setHasCabana] = useState(false);
  const [hasPriority, setHasPriority] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showTicket, setShowTicket] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const checkoutButtonRef = useRef<HTMLButtonElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const ticketModalRef = useFocusTrap<HTMLDivElement>(showTicket);

  const parsedDate = useMemo(() => parseCalendarDate(visitDate), [visitDate]);
  const isWeekend = parsedDate ? [0, 6].includes(parsedDate.getDay()) : false;
  const isHighSeason = parsedDate
    ? parsedDate.getMonth() >= 10 || parsedDate.getMonth() <= 3
    : false;
  const totalGuests = Object.values(guests).reduce((a, b) => a + b, 0);
  const minorsCount = guests.child + guests.teen + guests.infant;
  const adultsCount = guests.adult + guests.senior;
  const isAdultRequired = minorsCount > 0 && adultsCount === 0;

  const ticketsCost = useMemo(() => {
    let total = 0;
    const basePrice = isHighSeason ? BASE_PRICES[ticketType].high : BASE_PRICES[ticketType].low;
    Object.entries(guests).forEach(([category, count]) => {
      if (count === 0) return;
      const discount = AGE_DISCOUNTS[category as GuestCategory];
      const pricePerPerson = basePrice * (1 - discount);
      const finalPrice = isWeekend && category !== 'infant' ? pricePerPerson * 1.15 : pricePerPerson;
      total += finalPrice * count;
    });
    return Math.round(total * 100) / 100;
  }, [guests, ticketType, isHighSeason, isWeekend]);

  const extrasCost = useMemo(() => {
    let total = 0;
    if (hasCabana && ticketType !== 'evening') {
      total += ticketType === 'premium' ? 75 * 0.9 : 75;
    }
    if (hasPriority && ticketType === 'day') {
      total += 25 * (totalGuests - guests.infant);
    }
    return Math.round(total * 100) / 100;
  }, [hasCabana, hasPriority, ticketType, guests.infant, totalGuests]);
  const totalCost = Math.round((ticketsCost + extrasCost) * 100) / 100;

  useEffect(() => {
    if (!showTicket) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowTicket(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showTicket]);

  useEffect(() => {
    if (!showTicket && orderNumber) checkoutButtonRef.current?.focus();
  }, [showTicket, orderNumber]);

  useEffect(() => { setCheckoutError(null); }, [visitDate, guests, ticketType]);

  useEffect(() => {
    if (!easterEggOpen || !qrCanvasRef.current) return;
    QRCode.toCanvas(qrCanvasRef.current, EASTER_EGG_URL, {
      width: 180,
      margin: 1,
      color: { dark: '#0a192f', light: '#ffffff' },
    }).catch(() => { /* Пасхалка не блокирует оформление билета. */ });
  }, [easterEggOpen]);

  const updateGuest = (type: GuestCategory, delta: number) => {
    setGuests(prev => {
      const newCount = prev[type] + delta;
      if (newCount < 0) return prev;
      const currentTotal = Object.values(prev).reduce((sum, count) => sum + count, 0);
      if (currentTotal >= 10 && delta > 0) return prev;
      if (
        delta > 0 &&
        (type === 'child' || type === 'teen' || type === 'infant') &&
        prev.adult === 0 && prev.senior === 0
      ) {
        window.alert('Для посещения несовершеннолетних необходим хотя бы один взрослый (18+)');
        return prev;
      }
      return { ...prev, [type]: newCount };
    });
  };

  const handleCheckout = () => {
    if (!visitDate) {
      setCheckoutError('Выберите дату посещения.');
      dateInputRef.current?.focus();
      return;
    }
    if (!parsedDate) {
      setCheckoutError('Укажите корректную календарную дату посещения.');
      dateInputRef.current?.focus();
      return;
    }
    // Пересчёт на момент подтверждения защищает от открытой через полночь вкладки.
    if (visitDate < localToday()) {
      setCheckoutError('Дата посещения не может быть в прошлом.');
      dateInputRef.current?.focus();
      return;
    }
    if (isAdultRequired) {
      setCheckoutError('Для посещения несовершеннолетних необходим сопровождающий 18+.');
      return;
    }
    if (totalGuests === 0 || totalGuests > 10) {
      setCheckoutError('Укажите от 1 до 10 посетителей.');
      return;
    }
    setCheckoutError(null);
    setOrderNumber(`APR-${Math.floor(100000 + Math.random() * 900000)}`);
    setShowTicket(true);
    setEasterEggOpen(false);
  };

  // Нативный checkbox уже поддерживает Space. Добавляем Enter для ожидаемого
  // в QA взаимодействия, не ломая стандартное поведение по пробелу.
  const checkboxEnter = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.click();
    }
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
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-gray-900 mb-4">1. Выберите дату</h2>
              <input
                ref={dateInputRef}
                type="date"
                value={visitDate}
                min={localToday()}
                onChange={event => setVisitDate(event.target.value)}
                aria-label="Дата посещения"
                aria-invalid={Boolean(checkoutError && (!parsedDate || visitDate < localToday()))}
                aria-describedby="date-help"
                className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
              <p id="date-help" className="text-xs text-gray-500 mt-2">Прошедшие даты недоступны.</p>
              {visitDate && parsedDate && (
                <p className="text-xs text-teal-600 mt-1">
                  {isHighSeason ? 'Высокий сезон' : 'Низкий сезон'} • {isWeekend ? 'Выходной день (+15%)' : 'Будний день'}
                </p>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-gray-900 mb-4">2. Выберите тариф</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TARIFFS.map(tariff => {
                  const isSelected = ticketType === tariff.id;
                  return (
                    <button
                      key={tariff.id}
                      type="button"
                      onClick={() => {
                        setTicketType(tariff.id);
                        if (tariff.id === 'evening') { setHasCabana(false); setHasPriority(false); }
                        if (tariff.id === 'premium') setHasPriority(false);
                      }}
                      aria-pressed={isSelected}
                      className={`text-left p-4 rounded-2xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${isSelected ? 'border-teal-600 bg-teal-50 shadow-md' : 'border-gray-200 hover:border-teal-300 bg-white'}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-serif text-lg text-gray-900 leading-tight">{tariff.name}</h3>
                        {isSelected && <span className="text-teal-600 text-xl" aria-hidden="true">✓</span>}
                      </div>
                      <p className="text-2xl font-serif text-teal-700 mb-3">от ${tariff.priceLow}</p>
                      <p className="text-xs text-gray-600 mb-3">{tariff.description}</p>
                      <ul className="space-y-1 text-xs text-gray-700">
                        {tariff.includes.map((inc, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-teal-500 flex-shrink-0" aria-hidden="true">✓</span><span>{inc}</span>
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

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-serif text-gray-900 mb-4">3. Состав группы (макс. 10 человек)</h2>
              <div className="space-y-3">
                {([
                  ['adult', 'Взрослые (18–59 лет)'],
                  ['senior', 'Пожилые (60+ лет)'],
                  ['teen', 'Подростки (13–17 лет)'],
                  ['child', 'Дети (4–12 лет)'],
                  ['infant', 'Младенцы (0–3 года)'],
                ] as const).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-700 font-medium">{label}</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => updateGuest(key, -1)} aria-label={`Уменьшить количество: ${label}`} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">−</button>
                      <span className="w-6 text-center font-bold text-gray-900">{guests[key]}</span>
                      <button type="button" onClick={() => updateGuest(key, 1)} aria-label={`Увеличить количество: ${label}`} className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {ticketType !== 'evening' && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-serif text-gray-900 mb-4">4. Дополнительные услуги</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-teal-500">
                    <input type="checkbox" checked={hasCabana} onChange={event => setHasCabana(event.target.checked)} onKeyDown={checkboxEnter} aria-describedby="cabana-hint" className="w-5 h-5 text-teal-600 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" />
                    <div className="flex-grow">
                      <span className="block font-medium text-gray-900">Приватная кабана</span>
                      <span id="cabana-hint" className="text-sm text-gray-500">Аренда на весь день (Day и Premium). Выберите пробелом или Enter.</span>
                    </div>
                    <span className="font-bold text-gray-900">{ticketType === 'premium' ? '$67.50' : '$75.00'}</span>
                  </label>
                  {ticketType === 'day' && (
                    <label className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-teal-500">
                      <input type="checkbox" checked={hasPriority} onChange={event => setHasPriority(event.target.checked)} onKeyDown={checkboxEnter} aria-describedby="priority-hint" className="w-5 h-5 text-teal-600 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500" />
                      <div className="flex-grow">
                        <span className="block font-medium text-gray-900">Приоритетный доступ</span>
                        <span id="priority-hint" className="text-sm text-gray-500">Быстрый проход на аттракционы. Выберите пробелом или Enter.</span>
                      </div>
                      <span className="font-bold text-gray-900">$25 / чел.</span>
                    </label>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-serif text-gray-900 mb-6">Итого</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between text-gray-600"><span>Билеты ({totalGuests} чел.)</span><span>${ticketsCost.toFixed(2)}</span></div>
                {extrasCost > 0 && <div className="flex justify-between text-gray-600"><span>Доп. услуги</span><span>${extrasCost.toFixed(2)}</span></div>}
              </div>
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center"><span className="text-lg font-medium text-gray-900">Итого</span><span className="text-3xl font-serif text-teal-700">${totalCost.toFixed(2)}</span></div>
              </div>
              {checkoutError && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-200" role="alert">{checkoutError}</div>}
              {isAdultRequired && !checkoutError && <div className="bg-amber-50 text-amber-800 p-3 rounded-lg text-sm mb-4 border border-amber-200">Для посещения курорта гостям младше 18 лет необходим сопровождающий от 18 лет.</div>}
              <button ref={checkoutButtonRef} type="button" onClick={handleCheckout} disabled={totalGuests === 0 || isAdultRequired} className="w-full bg-teal-600 text-white py-4 rounded-xl font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300">Оформить билеты</button>
              <p className="text-xs text-center text-gray-400">Демонстрационный расчёт. Реальные платежи не проводятся.</p>
            </div>
          </div>
        </div>
      </div>

      {showTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowTicket(false)}>
          <div ref={ticketModalRef} role="dialog" aria-modal="true" aria-labelledby="ticket-modal-title" tabIndex={-1} className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative outline-none max-h-[90vh] overflow-y-auto" onClick={event => event.stopPropagation()}>
            <button type="button" onClick={() => setShowTicket(false)} aria-label="Закрыть электронный билет" className="absolute top-4 right-4 z-10 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500">✕</button>
            <div className="bg-teal-800 p-6 text-white text-center">
              <h2 id="ticket-modal-title" className="text-2xl font-serif mb-1">Aqua Paradise</h2>
              <p className="text-teal-200 text-sm">Электронный демонстрационный билет</p>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b border-dashed border-gray-200 pb-4">
                <div><span className="block text-xs text-gray-500 uppercase">Номер заказа</span><span className="font-bold text-gray-900 text-lg">{orderNumber}</span></div>
                <div className="text-right"><span className="block text-xs text-gray-500 uppercase">Дата</span><span className="font-bold text-gray-900">{visitDate}</span></div>
              </div>
              <div className="space-y-2 text-sm text-gray-700 mb-6">
                <div className="flex justify-between"><span>Тариф:</span><span className="font-medium">{ticketType === 'day' ? 'Day Pass' : ticketType === 'premium' ? 'Premium Pass' : 'Evening Pass'}</span></div>
                <div className="flex justify-between"><span>Гостей:</span><span className="font-medium">{totalGuests} чел.</span></div>
                <div className="flex justify-between text-lg font-bold text-teal-700 pt-2 border-t border-gray-100"><span>Стоимость (демо):</span><span>${totalCost.toFixed(2)}</span></div>
              </div>
              {!easterEggOpen ? (
                <div className="text-center"><button type="button" onClick={() => setEasterEggOpen(true)} aria-label="Добровольная пасхалка" className="text-xs text-gray-400 hover:text-teal-600 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded">[ Открыть маленький сюрприз ]</button></div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center animate-fade-in">
                  <p className="font-serif text-lg text-gray-900 mb-1">Рай закончился. Начинается Хардкор!</p>
                  <p className="text-sm text-gray-600 mb-3">Познакомьтесь с королевой хардкора</p>
                  <canvas ref={qrCanvasRef} aria-label="QR-код пасхалки" className="mx-auto"></canvas>
                  <p className="text-[10px] text-gray-400 mt-2">Это не пропуск. Просто маленький сюрприз.</p>
                </div>
              )}
              <p className="text-[10px] text-center text-gray-400 mt-6">Это демонстрационный проект. Курорт, цены и услуги вымышлены. Реальные бронирования и платежи не осуществляются.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
