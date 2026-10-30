# QA — Aqua Paradise

## Отчёты по тестовым прогонам

| Файл | Назначение |
|---|---|
| [test-report.md](test-report.md) | **Исторический Run 1 (2026-10-28)** — 466 проверок; 321 Passed / 116 Failed / 29 Blocked. Не переписывается. |
| [test-report-run-2.md](test-report-run-2.md) | **Run 2 (2026-10-30)** — 466 обновлённых проверок; **413 Passed / 46 Failed / 7 Blocked**. Отдельный smoke-test: 12/12 Passed. |
| [run-2-follow-up.md](run-2-follow-up.md) | Дедупликация замечаний Run 2, приоритеты, Needs Clarification и матрица целевой регрессии после исправлений. |
| [defect-register.md](defect-register.md) | Реестр находок; статусы Packages 1–8 — **до независимого подтверждения**, новые проблемы Run 2 указаны отдельно. |
| [bug-reports.md](bug-reports.md) | Исторические баг-репорты первого прогона. |
| [test-cases.md](test-cases.md) | Переиспользуемые проверки и кейсы после Packages 1–8. |
| [review-log.md](review-log.md) | Решения и результаты пересмотров. |
| [regression-plan.md](regression-plan.md) | План второго прогона, подготовленный до Run 2. Выполнен; дальнейшие проверки — целевые по `run-2-follow-up.md`. |

## Обязательные оговорки

- Второй прогон содержит **обновлённые сценарии** с ID NAV2/HOME2/ZONE2/ATTR2/MAP2/HOTEL2/VISIT2/TICK2/PLAN2/RESP2/DOC2. Агрегатное сравнение с Run 1 не равно покейсовому сравнению идентичных сценариев.
- Статус `Fixed` из Packages 1–8 отражает действия разработки; Run 2 показал повторно открытые и новые проблемы. Не считать старые `Fixed` автоматически QA Verified.
- Изображения, финальная карта, неутверждённые характеристики и другие `Visual Pending / Needs Clarification` остаются отдельно.
- Ссылка на `quick-categories-decision.md` удалена: файл не обнаружен в ветке `main` на дату подготовки. Решение «Экстрим и высокие» задокументировано в существующем реестре.

## Основные источники

- `docs/source-of-truth.md`
- `docs/master/website-requirements.md`
- `docs/pages/*.md`

Отдельно фиксировать конкретную проверенную сборку, browser/version, viewport, устройство и evidence для дальнейших прогонов.
