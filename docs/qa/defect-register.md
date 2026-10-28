# Aqua Paradise — consolidated candidate defect register

Source: 11 manually reported QA checklists, revisions agreed 2026-10-28. Priority is a **preliminary remediation priority**, not a verified severity score. `New` means documented, not fixed. The candidates are grouped by symptoms; independent root causes may require splitting/merging after developer inspection. Related tests without explicit numbers are intentionally marked at checklist-level rather than fabricated.

| ID | Priority | Area | Observation | Linked checks | State |
|---|---|---|---|---|---|
| APR-BUG-001 | Critical | Tickets | Можно оформить билет без сопровождающего 18+ | TICK-028,029,030,042,056; DOC-029 | New |
| APR-BUG-002 | High | Navigation | Нет мобильной навигации на ширине <768px | RESP-013–020,040; NAV | New |
| APR-BUG-003 | High | Navigation | Внутренние CTA не всегда обновляют страницу | VISIT-024; PLAN-039; NAV | New |
| APR-BUG-004 | High | Navigation | Некорректны deep links и история Back/Forward | ATTR-035; NAV | New |
| APR-BUG-005 | High | Planner | Не пересчитывается расписание после перестановки | PLAN-016,027,035 | New |
| APR-BUG-006 | High | Planner | Не учитываются возраст, рост, сопровождающий | PLAN-021,022,023; PLAN-024(Blocked); DOC-048 | New |
| APR-BUG-007 | High | Planner | Evening Pass не включает допустимые вечерние активности | PLAN-017 | New |
| APR-BUG-008 | High | Accessibility | Карточку аттракциона нельзя открыть клавиатурой | RESP-033(Blocked) | New |
| APR-BUG-009 | Medium | Tickets | Отсутствуют карточки сравнения и описания тарифов | TICK-003,005,006,007; DOC-023,024,025,032 | New |
| APR-BUG-010 | Medium | Zones | Описания шести зон расходятся с требованиями | DOC-010–014,018; ZONE | New |
| APR-BUG-011 | Medium | Content | Аттракционы распределены между зонами противоречиво | HOME-024,034; DOC-019; ZONE,ATTR | New |
| APR-BUG-012 | Medium | Map | На карте отсутствуют важные транспортные объекты | MAP-005,011; DOC-037 | New |
| APR-BUG-013 | Medium | Map | Не работает построение/передача маршрута | MAP-029; VISIT-024; PLAN-039,040(Blocked) | New |
| APR-BUG-014 | Medium | Map | Некорректны zoom, слои и границы панорамирования | MAP-020,022,026 | New |
| APR-BUG-015 | Medium | Planner | Не работают экспорт и обмен маршрутом | PLAN-041–046 | New |
| APR-BUG-016 | Medium | Planner | Отсутствует замена остановки | PLAN-037 | New |
| APR-BUG-017 | Medium | Planner | Нет empty-state сообщений | PLAN-019,036 | New |
| APR-BUG-018 | Medium | Planner Mobile | Скрыты кнопки редактирования на мобильной ширине | PLAN-038; RESP-026 | New |
| APR-BUG-019 | Medium | Accessibility | Модальное окно не закрывается Escape | ATTR-028; RESP-034 | New |
| APR-BUG-020 | Medium | Accessibility | У кнопок-иконок непонятное доступное имя | RESP-037 | New |
| APR-BUG-021 | Medium | Accessibility | Повторяющиеся неоднозначные названия ссылок | RESP-046 | New |
| APR-BUG-022 | Medium | Hotel | Отсутствует Deluxe Room | HOTEL-007,009; DOC-043 | New |
| APR-BUG-023 | Medium | Hotel | «Все удобства» раскрывает сразу несколько карточек | HOTEL-019 | New |
| APR-BUG-024 | Medium | Hotel | Не раскрыта транспортная доступность отеля | HOTEL-029 | New |
| APR-BUG-025 | Medium | Hotel | Неутверждённые пакеты показаны как действующие | HOTEL-031; DOC-045 | New |
| APR-BUG-026 | Medium | Attractions | Недостают фильтры и быстрые категории | ATTR-014,017,018 | New |
| APR-BUG-027 | Low | Attractions | Нет счётчика результатов | ATTR-004,024 | New |
| APR-BUG-028 | Medium | Map | Не показано пустое состояние поиска | MAP-018 | New |
| APR-BUG-029 | Medium | Planner | Время переходов выводится без обоснования | PLAN-026,027 | New |
| APR-BUG-030 | Low | Visit | Указан неподтверждённый интервал шаттла | VISIT-023; DOC-040 | New |
| APR-BUG-031 | Low | Homepage | Блок главной растянут на 1440px | RESP-004 | New |
| APR-BUG-032 | Low | Tickets | Отсутствует QR-пасхалка | TICK-048 | New |
| APR-BUG-033 | Medium | Homepage | Не хватает содержания промоблоков и мини-планировщика | HOME-017,030; HOME-031(Blocked) | New |
| APR-BUG-034 | Medium | Content | Не указаны две ветки канатной дороги | DOC-034 | New |

## Not yet confirmed as implementation defects
- `APR-DOC-044`: villas specification incomplete; clarification needed. This remains **Failed** in the original run history and is not counted as a unique confirmed bug.
- Missing screenshots / exact release commit / device versions: collect during regression, not invent.
- `APR-DOC-004`: no capacity claim; agreed `Passed` under conditional wording.
- `APR-DOC-020`, `APR-PLAN-024/028/040/044–046`, `APR-RESP-045`: blocked for dependent/unavailable behavior; not independently established defects.
- Requirement conflict: DOB-driven age calculation in `docs/master/website-requirements.md` versus category counters in `docs/pages/tickets.md`. Requires decision on scope/source precedence.
- `APR-DOC-050` failed by agreed review due to substantial inconsistencies.

## Triage
Do not create 34 separate GitHub Issues automatically. This is a *candidate register* for human review, to avoid duplicate issue noise. Priority and boundaries should be confirmed during reproduction. Do not claim all 116 failed checks are represented as one-to-one defects. Missing detailed evidence does not prove absence of additional bugs.
