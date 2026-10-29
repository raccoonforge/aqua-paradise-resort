# Aqua Paradise — Consolidated candidate defect register

**Статус:** обновлено после Package 1–8 (2026-10-30).
**Основание:** QA-прогон 2026-10-28 (466 проверок: 321 Passed / 116 Failed / 29 Blocked), затем серия функциональных пакетов 1–8.

> **Важно.** Статус `Fixed` в этом документе означает «исправление внедрено в код и подтверждено smoke-test на стороне разработки». Он **не заменяет** повторный QA-прогон. Финальное подтверждение — только по итогам второго прогона. Исторические результаты первого прогона не переписаны.

## Расшифровка статусов
- **Fixed** — код изменён, smoke-test пройден.
- **Fixed (Visual Pending)** — функция работает, визуал ожидает утверждённых ассетов.
- **Content Pending** — код готов, ждёт утверждённых текстов.
- **Needs Clarification** — требуется решение по требованиям, без него исправление спорно.
- **Open** — не исправлено.

## Таблица

| ID | Priority | Area | Observation | Linked checks | State | Fixed in | Заметка |
|---|---|---|---|---|---|---|---|
| APR-BUG-001 | Critical | Tickets | Можно оформить билет без сопровождающего 18+ | TICK-028..030,042,056; DOC-029 | **Fixed** | 1A | Проверка `isAdultRequired` блокирует оформление; сообщение выводится |
| APR-BUG-002 | High | Navigation | Нет мобильной навигации < 768px | RESP-013–020,040; NAV | **Fixed** | 1A + 1B | Бургер, выезжающая панель, Escape, focus return |
| APR-BUG-003 | High | Navigation | Внутренние CTA не обновляют страницу | VISIT-024; PLAN-039; NAV | **Fixed** | 1A | Слушатель `hashchange` + разделение base/query |
| APR-BUG-004 | High | Navigation | Некорректны deep links и Back/Forward | ATTR-035; NAV | **Fixed** | 1A | Scroll restoration manual + `tab=...` в URL для зон |
| APR-BUG-005 | High | Planner | Не пересчитывается расписание при перестановке | PLAN-016,027,035 | **Fixed** | 8A | `recalculateTimes` пересчитывает при любом изменении |
| APR-BUG-006 | High | Planner | Не учитываются возраст, рост, сопровождающий | PLAN-021..024; DOC-048 | **Fixed** | 8A | Массив гостей; причины видны в плане и в пикере |
| APR-BUG-007 | High | Planner | Evening Pass не включает допустимые вечерние активности | PLAN-017 | **Fixed** | 8A | Фильтр по `hours.close >= 21` вместо `duration <= 60` |
| APR-BUG-008 | High | Accessibility | Карточку аттракциона нельзя открыть клавиатурой | RESP-033 | **Fixed** | 4 | Карточка — `<button>`, Tab/Enter/Space работают |
| APR-BUG-009 | Medium | Tickets | Нет карточек сравнения тарифов | TICK-003,005–007; DOC-023..025,032 | **Fixed** | 7 | 3 карточки с описанием, ценой «от», включёнными опциями |
| APR-BUG-010 | Medium | Zones | Описания шести зон расходятся с требованиями | DOC-010–014,018; ZONE | **Content Pending** | — | Нужны утверждённые тексты (см. Needs Clarification) |
| APR-BUG-011 | Medium | Content | Аттракционы распределены между зонами противоречиво | HOME-024,034; DOC-019; ZONE,ATTR | **Fixed** | 2 | Stormbreaker теперь в Pirate's Cove во всех местах |
| APR-BUG-012 | Medium | Map | Отсутствуют важные транспортные объекты | MAP-005,011; DOC-037 | **Fixed (Visual Pending)** | 3 | Групповой маркер «Транспортный узел / Главный вход»; точные позиции — Visual Pending |
| APR-BUG-013 | Medium | Map | Не работает построение/передача маршрута | MAP-029; VISIT-024; PLAN-039,040 | **Fixed** | 3 | `conceptualRoute` (без времени и расстояний); явно подписано |
| APR-BUG-014 | Medium | Map | Некорректны zoom, слои, границы pan | MAP-020,022,026 | **Fixed** | 3 | + / −, ограничение pan, «Показать весь остров», pinch |
| APR-BUG-015 | Medium | Planner | Не работают экспорт и обмен маршрутом | PLAN-041–046 | **Fixed** | 8B | PDF (`window.print`), PNG (`html-to-image`), Ссылка (base64 URL + модалка ручного копирования) |
| APR-BUG-015-A | Minor | Planner | Ложное «✓ Скопировано» при отказе Clipboard API (`execCommand` возвращал `true`) | (обнаружено при retest 8B) | **Fixed** | 8B | Убран `document.execCommand`; только `navigator.clipboard` + модалка |
| APR-BUG-016 | Medium | Planner | Отсутствует замена остановки | PLAN-037 | **Fixed** | 8A | Кнопка `↻`, пикер альтернатив, пересчёт |
| APR-BUG-017 | Medium | Planner | Нет empty-state | PLAN-019,036 | **Fixed** | 8A | Сообщение + кнопка «Изменить параметры» |
| APR-BUG-018 | Medium | Planner Mobile | Скрыты кнопки редактирования на мобильном | PLAN-038; RESP-026 | **Fixed** | 8A | Кнопки `↑ ↓ ↻ ✕` всегда видимы |
| APR-BUG-019 | Medium | Accessibility | Модальное окно не закрывается Escape | ATTR-028; RESP-034 | **Fixed** | 1B | Escape в модалке аттракциона и билета |
| APR-BUG-020 | Medium | Accessibility | У icon-кнопок непонятное доступное имя | RESP-037 | **Fixed** | 1A | `aria-label` на иконках, стрелках, бургере |
| APR-BUG-021 | Medium | Accessibility | Повторяющиеся неоднозначные названия ссылок | RESP-046 | **Fixed** | 1A | «Подробнее: <имя>» в зонах |
| APR-BUG-022 | Medium | Hotel | Отсутствует Deluxe Room | HOTEL-007,009; DOC-043 | **Fixed (Needs Clarification)** | 6 | Добавлен; точные характеристики ждут уточнения (NC-HOTEL-DELUXE) |
| APR-BUG-023 | Medium | Hotel | «Все удобства» раскрывает несколько карточек | HOTEL-019 | **Fixed** | 6 | Состояние `expandedItemId` |
| APR-BUG-024 | Medium | Hotel | Не раскрыта транспортная доступность | HOTEL-029 | **Fixed** | 6 | Упоминание Paradise Loop / пешком / трансфера |
| APR-BUG-025 | Medium | Hotel | Неутверждённые пакеты показаны как действующие | HOTEL-031; DOC-045 | **Fixed** | 6 | Блок «Концепция. Не активные предложения» |
| APR-BUG-026 | Medium | Attractions | Нет фильтров по возрасту/росту и быстрых категорий | ATTR-014,017,018 | **Fixed** | 4 | Поля возраст/рост + категории «Все / Спокойные / Семейные / Экстрим и высокие» |
| APR-BUG-027 | Low | Attractions | Нет счётчика результатов | ATTR-004,024 | **Fixed** | 4 | «Найдено: N • показано M» |
| APR-BUG-028 | Medium | Map | Нет пустого состояния поиска | MAP-018 | **Fixed** | 3 | Сообщение + «Сбросить поиск и фильтры» |
| APR-BUG-029 | Medium | Planner | Время переходов без обоснования | PLAN-026,027 | **Fixed** | 8A | Используется §7.7.13 (4 км/ч, медленный 3 км/ч, округление вверх) |
| APR-BUG-030 | Low | Visit | Неподтверждённый интервал шаттла | VISIT-023; DOC-040 | **Fixed (Needs Clarification)** | 6 | «Ориентировочный ~10 минут (демонстрационные данные)» (NC-SHUTTLE) |
| APR-BUG-031 | Low | Homepage | Пропорции на 1440px | RESP-004 | **Fixed** | 5 | max-w-5xl/6xl вместо 7xl на секциях |
| APR-BUG-032 | Low | Tickets | Отсутствует QR-пасхалка | TICK-048 | **Fixed** | 7 | Реальный QR через `qrcode`, ведёт на `https://www.twitch.tv/bigrussianmum`; тексты дословно |
| APR-BUG-033 | Medium | Homepage | Не хватает промоблоков и мини-планировщика | HOME-017,030,031 | **Fixed** | 5 | Мини-планировщик с 3 рекомендациями; передача интересов в /planner |
| APR-BUG-034 | Medium | Content | Не указаны две ветки канатной дороги | DOC-034 | **Fixed (Needs Clarification)** | 2 | Добавлено «две ветки» в VisitPage; источник — см. NC-OCEAN-WINGS |

## Needs Clarification (открытые вопросы требований)

| ID | Вопрос | Где | Влияние |
|---|---|---|---|
| **NC-HOTEL-DELUXE** | Площадь/вместимость/оснащение Deluxe Room не утверждены | Project Bible — только имя категории | Среднее (описание приблизительное) |
| **NC-SHUTTLE** | `island-transport.ts` (без расписания) vs `website-requirements.md` §7.7.12 (10 мин) | Противоречие источников | Низкое (текст смягчён) |
| **NC-HOTEL-PACKAGES** | Формат отображения пакетов проживания | `hotel.md` §7 запрещает «действующие», `project-bible.md` — «предварительно» | Среднее |
| **NC-EXTREME** | «Высокая» — это экстрим-категория для фильтра или просто технический уровень | `attractions.md` §3 — открытый пункт | Низкое (название «Экстрим и высокие» честно отражает объединение) |
| **NC-OCEAN-WINGS** | «Две ветки» Ocean Wings — подтвердить источник | `project-bible.md` — прямого упоминания нет | Низкое |
| **NC-ZONES-TEXTS** | Финальные тексты 6 зон | `website-requirements.md` / `project-bible.md` — не финализированы | Среднее (APR-BUG-010) |

## Visual Pending

- Кинематографичное intro главной (видео/3D-ассеты).
- ResortScene v0.4 на `/map` (интеграция премиум-визуала).
- Точные координаты причала / канатной дороги на карте.
- Финальные ассеты для всех страниц (фото, иллюстрации).

## Не считается дефектом
- `APR-DOC-044` (villas): уточнение спецификации, не дефект реализации.
- `APR-DOC-004`: capacity — согласовано «Passed» под условной формулировкой.
- Блокированные проверки (29) не подтверждены как дефекты.

## Triage
Не создавать 34 отдельных GitHub Issue. Этот реестр — источник для второго прогона. Все правки внесены пакетами 1–8 в ветку `main`. Повторный прогон запускается по `docs/qa/regression-plan.md`.
