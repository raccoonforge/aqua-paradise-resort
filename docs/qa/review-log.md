# Aqua Paradise — result review log and open questions

## Original first-run totals
466 checks — 325 Passed, 109 Failed, 32 Blocked.

## Agreed review #1
- TICK-056: Passed→Failed.
- RESP-026: Blocked→Failed.
- DOC-040: Blocked→Failed.
- DOC-050: Passed→Failed.
- DOC-021: Passed→Failed.
- DOC-004: Blocked→Passed.

After review #1: 323 Passed / 114 Failed / 29 Blocked.

## Agreed review #2
- DOC-032: Passed→Failed.
- PLAN-026: Passed→Failed.
- DOC-044: original Failed retained; requirement flagged Needs clarification.

After review #2: **321 Passed / 116 Failed / 29 Blocked**.

## Реакция на дефекты — Package 1–8 (2026-10-30)

### Что было исправлено
Реализовано 8 функциональных пакетов по реестру `defect-register.md`:

| Пакет | Ключевые изменения | Закрыто дефектов |
|---|---|---|
| 1A | Единый справочник `ATTRACTIONS`, aria-labels, reduced-motion, Footer, slug для Poseidon's Descent, scroll-to-top при смене страницы, `tab=...` в URL зон | 020, 021, часть 008, часть 011 |
| 1B | Focus trap в модалках, Escape, возврат фокуса | 008 (полностью), 019 |
| 2 | Stormbreaker в Pirate's Cove, две ветки Ocean Wings, единый источник | 011, 034 |
| 3 | Карта: pan/pinch/tap, zoom колесом, hub, фильтры, empty state | 012, 013, 014, 028 |
| 4 | Клавиатура на карточках, фильтры возраст/рост, быстрые категории, счётчик | 008 (финально), 026, 027 |
| 5 | Мини-планировщик, передача интересов, пропорции 1440px | 031, 033 |
| 6 | Deluxe Room, «Все удобства», транспорт отеля, пакеты как концепция, шаттл | 022, 023, 024, 025, 030 |
| 7 | Карточки тарифов, QR-пасхалка | 009, 032 |
| 8A | Evening Pass, время по §7.7.13, замена остановки, кнопки на мобильном, empty state, недоступные объекты | 005, 006, 007, 016, 017, 018, 029 |
| 8B | PDF/PNG/Ссылка + модалка ручного копирования | 015, 015-A |

**Итого исправлено:** 26 из 34 подтверждённых дефектов.

### Что осталось
- **APR-BUG-010 (Content Pending):** тексты 6 зон — ждут утверждённых формулировок.
- **NC-HOTEL-DELUXE, NC-SHUTTLE, NC-HOTEL-PACKAGES, NC-EXTREME, NC-OCEAN-WINGS, NC-ZONES-TEXTS** — открытые вопросы требований.

### Что ушло в Visual Pending
- Cinematic Intro (видео/3D).
- ResortScene v0.4 на карте.
- Точные координаты причала/канатки.
- Финальные фото.

### Не заявляем
- Не считаем все 116 дефектов «закрытыми» — исторические результаты первого прогона не переписаны.
- Не считаем сайт «готовым к релизу» — второй прогон обязателен.
- Не выдаём «smoke-test passed» за «полный QA passed».

## Следующий шаг
- Второй QA-прогон по `docs/qa/regression-plan.md`.
- По результатам — закрыть оставшиеся проверки или внести точечные правки.
- Разобрать NC-* с владельцем требований.

## Source-of-truth questions (retained from first review)
1. Age entry: DOB vs counters — reconciled (Packages 1–8 используют `age`/`height` группы в Planner, что допускает §7.2).
2. Hotel villas: описательные свойства не финализированы — `NC-HOTEL-DELUXE` остаётся.
3. Map routing: концептуальный граф ≠ геометрия. Не выдаём hops за время.
4. Additional activities: не добавляли новых объектов.
5. Map consistency: v0.1–v0.4 хранятся как историческое; runtime использует упрощённую схему.


## QA Run 2 — ручная регрессия (2026-10-30)

- Пройдено 466 **обновлённых** проверок: **413 Passed / 46 Failed / 7 Blocked**.
- Smoke-test отдельно: 12/12 Passed.
- Детали: [test-report-run-2.md](test-report-run-2.md); дедупликация и план целевых проверок: [run-2-follow-up.md](run-2-follow-up.md).
- Первый прогон и Package 1–8 остаются историческими; отдельные заявленные Fixed требуют повторной доработки.
- Вновь выявлены отсутствие полноценной валидации даты (APR-BUG-037), проблемы управления фокусом при замене остановки (APR-BUG-042), возврат старой проблемы настройки длительности (APR-BUG-041).
- Результаты требуют уточнения: DOC2-047 Passed vs PLAN2-029 Failed; MAP2-038/039 Failed vs RESP2-004/010 Passed (эргономика vs техническая доступность); TICK2-052 (ожидаемое поведение Back не утверждено); TICK2-057 (нужно проверить Space для checkbox).
- Предложенные дополнительные дефекты и их ID нельзя считать закрытыми до отдельной целевой регрессии.
