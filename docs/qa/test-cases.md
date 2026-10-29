# Aqua Paradise — reusable manual regression cases

Cases below are test designs, **not evidence of successful execution**.

## Общие (из первого прогона)
| ID | Priority | Precondition / steps | Expected | Linked finding |
|---|---|---|---|---|
| APR-TC-001 | P0 | Tickets: date, 1 adult + 1 child, remove adult, confirm | Confirmation blocked; 18+ explanation | BUG-001 |
| APR-TC-002 | P1 | Tickets: try to add child with 0 adults | Clear rule; no invalid checkout | BUG-001 |
| APR-TC-003 | P1 | Tickets: 10 guests incl. infants; attempt 11th | 10 permitted, 11 denied | TICK-026/027 |
| APR-TC-004 | P1 | Tickets: test Apr 30/May 1 and Oct 31/Nov 1 | Correct season boundary | TICK-009–015 |
| APR-TC-005 | P1 | Tickets: switch Day→Premium→Evening with cabana and priority | Ineligible extras disabled/reset | TICK-031–039 |
| APR-TC-006 | P1 | Tickets: inspect three tariff options | Side-by-side comparison | BUG-009 |
| APR-TC-007 | P1 | Navigation: widths 320/375/767/768/1440 | Mobile menu below breakpoint | BUG-002 |
| APR-TC-008 | P1 | Navigation: zoom 200% | All main sections reachable | BUG-002 |
| APR-TC-009 | P1 | Open #/zones?zone=... and #/attractions?ride=... | Correct deep-linked state | BUG-004 |
| APR-TC-010 | P1 | Navigate pages, use Back/Forward | URL and visible page agree | BUG-004 |
| APR-TC-011 | P1 | Click map-related CTAs from Visit and Planner | Correct map page | BUG-003/013 |
| APR-TC-012 | P1 | Planner: 3-stop Day, move middle stop up/down | Times recalculated | BUG-005 |
| APR-TC-013 | P1 | Planner: Evening Pass, multiple interests | Only valid 17:00–22:00 activities | BUG-007 |
| APR-TC-014 | P1 | Planner: add underage/short visitor | Ineligible rides excluded with feedback | BUG-006 |
| APR-TC-015 | P1 | Planner: generate no-match plan | Empty-state text and next action | BUG-017 |
| APR-TC-016 | P1 | Planner: viewport 375, reorder and delete | All action buttons visible | BUG-018 |
| APR-TC-017 | P2 | Planner: export PDF/image/share link | Files produced; state restored | BUG-015 |
| APR-TC-018 | P1 | Attractions: Tab to open card, Tab inside modal, Escape | Keyboard-only accessible | BUG-008/019 |
| APR-TC-019 | P2 | Tickets: icon-only buttons in a11y tree | Descriptive accessible names | BUG-020 |
| APR-TC-020 | P2 | Zones: accessible names for «Подробнее» | Distinct destination-specific names | BUG-021 |
| APR-TC-021 | P1 | Map: zoom in/out, pan to boundary | Controls work; map recoverable | BUG-014 |
| APR-TC-022 | P2 | Map: search nonexisting place | Clear no-results state | BUG-028 |
| APR-TC-023 | P2 | Hotel: select category, open «Все удобства» | Only selected item expands | BUG-023 |
| APR-TC-024 | P2 | Hotel: inspect category list | Deluxe Room exists | BUG-022 |
| APR-TC-025 | P2 | Content: Stormbreaker/Crystal Passage across pages | Same designated zone | BUG-011 |
| APR-TC-026 | P2 | Visit: Paradise Loop description | Unapproved 10-min frequency not asserted as fact | BUG-030 |
| APR-TC-027 | P2 | Tickets: generate demo QR, inspect subtitle | Approved Easter egg visible | BUG-032 |
| APR-TC-028 | P2 | Review age entry vs UI blueprint | Pending product decision | REQUIREMENTS |

## Новые (по итогам Packages 1–8)

### Навигация и общее
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-NAV-01 | P1 | Перейти с /hotel → /planner → «Назад» | Страница /hotel **сверху** (scroll restoration manual) |
| TC-NAV-02 | P1 | Открыть /zones?zone=adrenaline-peak&tab=attractions | Активна вкладка «Развлечения» |
| TC-NAV-03 | P1 | В зонах переключить на другую зону | Вкладка сбрасывается на «Обзор», URL обновляется |
| TC-NAV-04 | P1 | Мобильная навигация: открыть, Escape | Меню закрывается, фокус возвращается на бургер |
| TC-NAV-05 | P1 | prefers-reduced-motion: reduce | Анимации `slide-in`, `fade-in`, `pulse` не проигрываются |

### Главная
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-HOME-01 | P1 | PlannerTeaser: выбрать «Адреналин» | Появляются 3 карточки «Утро / День / Вечер» из ATTRACTIONS |
| TC-HOME-02 | P1 | Нажать «Открыть полный планировщик с этими интересами» | /planner?interests=... — интересы предзаполнены |
| TC-HOME-03 | P1 | Ширина 1440px | Секции центрированы, не растянуты |

### Зоны
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-ZONE-01 | P1 | Вкладка «Развлечения» у Atlantis Realm → клик «Подробнее» у Poseidon's Descent | URL `#/attractions?ride=poseidons-descent`, модалка открылась |
| TC-ZONE-02 | P1 | «Подробнее» у Blackbeard's Run | URL `#/attractions?ride=blackbeards-run` (без апострофа) |
| TC-ZONE-03 | P1 | Serenity Spa, Eden Gardens, Market, Boulevard | Вкладка «Развлечения» — пустой список с пояснением (нет ride-аттракционов) |

### Аттракционы
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-ATTR-01 | P1 | Tab до первой карточки, Enter | Модалка открылась |
| TC-ATTR-02 | P1 | Внутри модалки Tab/Shift+Tab | Фокус не выходит за пределы |
| TC-ATTR-03 | P1 | Escape внутри модалки | Закрывается, фокус возвращается на карточку |
| TC-ATTR-04 | P1 | «Экстрим и высокие» | 9 объектов (3 Экстрим + 6 Высокая) |
| TC-ATTR-05 | P1 | Возраст 8 → Skyfall | Skyfall скрыт, «N скрыто — показать» |
| TC-ATTR-06 | P1 | Нажать «показать» | Skyfall с оранжевой рамкой и причиной |
| TC-ATTR-07 | P1 | Копировать URL с фильтрами, открыть в новой вкладке | Фильтры применяются |

### Карта
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-MAP-01 | P1 | Pan одним пальцем (тач) | Карта двигается, страница не скроллится |
| TC-MAP-02 | P1 | Pinch двумя пальцами | Zoom меняется |
| TC-MAP-03 | P1 | Тап по пину | Открывается карточка, не pan |
| TC-MAP-04 | P1 | Drag мышью без предварительного клика | Карта двигается, без значка ⛔ |
| TC-MAP-05 | P1 | Wheel над картой | Zoom меняется, страница не скроллится |
| TC-MAP-06 | P1 | Фильтр «Транспорт» | Зоны скрыты, hub виден и подписан |
| TC-MAP-07 | P1 | Клик по hub | 3 описания (Ocean Wings, Причал, Главный вход) с пометкой «позиция уточняется» |
| TC-MAP-08 | P1 | Выбрать зону → «Концептуальный маршрут» | Путь подсвечен, в панели последовательность, без времени |
| TC-MAP-09 | P2 | Поиск «абракадабра» | Empty state + «Сбросить» |

### Отель
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-HOTEL-01 | P1 | Вкладка «Номера» | Standard, Deluxe, Ocean View |
| TC-HOTEL-02 | P1 | «Все удобства» у Standard | Раскрывается только Standard |
| TC-HOTEL-03 | P1 | Смена категории | Раскрытая карточка закрывается |
| TC-HOTEL-04 | P1 | Блок «Услуги и комфорт» | Есть пункт «Транспорт: Paradise Loop…» |
| TC-HOTEL-05 | P1 | Блок «Пакеты проживания» | 5 пакетов с пометкой «Концепция. Не активные предложения» |

### Посещение
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-VISIT-01 | P1 | Ocean Wings → открыть детали | Упоминаются «две ветки» |
| TC-VISIT-02 | P1 | Paradise Loop → открыть детали | «Ориентировочный интервал — около 10 минут (демонстрационные данные)» |
| TC-VISIT-03 | P1 | Кнопки якорей (4 карточки) | Плавный скролл к разделам |

### Билеты
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-TICKET-01 | P1 | 3 карточки тарифов | Day / Premium / Evening с «от $65 / $115 / $40» |
| TC-TICKET-02 | P1 | Выбрать Premium | Блок допуслуг: только «Кабана $67.50» |
| TC-TICKET-03 | P1 | Выбрать Evening | Блок допуслуг скрыт полностью |
| TC-TICKET-04 | P1 | 1 adult + 1 child, выходной | ≈ $127.08 (24.10.2026) |
| TC-TICKET-05 | P1 | Оформить билеты | Модалка с номером APR-XXXXXX |
| TC-TICKET-06 | P1 | Нажать «[ Открыть маленький сюрприз ]» | Тексты «Рай закончился…», QR виден |
| TC-TICKET-07 | P1 | Сканировать QR телефоном | Открывается `https://www.twitch.tv/bigrussianmum` |
| TC-TICKET-08 | P1 | Escape в модалке | Закрывается |

### Планировщик
| ID | Priority | Steps | Expected |
|---|---|---|---|
| TC-PLAN-01 | P1 | Evening Pass + интересы | Только объекты с `hours.close >= 21` |
| TC-PLAN-02 | P1 | Pace = «Спокойный» | Время перехода увеличивается (3 км/ч vs 4 км/ч) |
| TC-PLAN-03 | P1 | Кнопка ↻ у объекта | Модалка «Заменить на...» с альтернативами |
| TC-PLAN-04 | P1 | Добавить недоступный объект | В плане красная рамка, ⛔, причина; время не назначается |
| TC-PLAN-05 | P1 | Заменить на недоступный | Аналогично: красная рамка, причина |
| TC-PLAN-06 | P1 | Мобильная ширина < 768px | Кнопки ↑ ↓ ↻ ✕ всегда видны |
| TC-PLAN-07 | P1 | Нет подходящих объектов | Empty state + «Изменить параметры» |
| TC-PLAN-08 | P1 | PDF | Открывается диалог печати, в превью только план с заголовком |
| TC-PLAN-09 | P1 | PNG | Скачивается файл, цвета корректные (не серые) |
| TC-PLAN-10 | P1 | Ссылка (автокопирование) | «✓ Скопировано», модалка не появляется |
| TC-PLAN-11 | P1 | Ссылка (без Clipboard API) | Открывается кастомная модалка «Скопируйте ссылку вручную» |
| TC-PLAN-12 | P1 | Открыть восстановленную ссылку | План восстанавливается |
| TC-PLAN-13 | P2 | Битый `?state=...` | Планировщик не падает, форма пустая |

## Execution template
`Case ID | build/commit | date | browser/version | viewport/device | result(Passed/Failed/Blocked/Not Run) | observed output | evidence link | defect ID`.

## Regression note
Перепрогон — по `docs/qa/regression-plan.md`. Не изменять исторические результаты первого прогона.
