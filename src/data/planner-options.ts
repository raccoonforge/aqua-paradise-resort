export const ALL_INTERESTS = ['Адреналин', 'Семейный отдых', 'Релакс', 'Исследования'];

// Локальная календарная дата без преобразования через UTC.
export const todayLocal = (): string => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const isValidVisitDate = (value: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(year, month - 1, day);
  return parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day;
};

export const parties = [
  { id: 'solo', label: 'Один гость', adults: 1, children: 0 },
  { id: 'couple', label: 'Пара', adults: 2, children: 0 },
  { id: 'family', label: 'Семья', adults: 2, children: 1 },
  { id: 'friends', label: 'Друзья', adults: 4, children: 0 },
];

export function guestsFor(partyId: string | null) {
  const party = parties.find(p => p.id === partyId) ?? { adults: 1, children: 1 };
  return Array.from({ length: party.adults + party.children }, (_, i) => ({
    id: 'g' + (i + 1), age: i < party.adults ? 30 : 8, height: i < party.adults ? 175 : 120,
  }));
}
