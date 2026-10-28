# Aqua Paradise — bug reports / reproduction sheets

These reports describe tester-observed outcomes. For most items, a precise cross-browser reproduction transcript was not recorded; guidance is intentionally generic rather than fabricated. Complete the steps and attach captures during retest.

## APR-BUG-001 — exact observed reproduction

**Critical / Tickets / New**

**Precondition:** published `#/tickets`, select valid visit date.

1. Keep/add 1 Adult.
2. Add 1 Child (or Teen).
3. Decrease Adults to 0.
4. Proceed to checkout.
5. Create demo electronic ticket.

**Expected:** disallow confirmation and display requirement for accompanying Adult (18+). **Actual:** ticket is generated for minors without adult. **Linked:** TICK-028/029/030/042/056, DOC-029. **Environment:** browser-based manual test; exact browser/build not recorded. **Evidence:** description from tester, screenshot pending. **Repeat count:** not recorded.

---

## APR-BUG-002 — Нет мобильной навигации на ширине <768px

- **Priority:** High (provisional); **Area:** Navigation; **Status:** New.
- **Linked checks:** RESP-013–020,040; NAV.
- **Observed:** При ширине 320/375/767 px нет меню и CTA; при зуме 200% навигация пропадает.
- **Expected:** Доступно мобильное меню и переходы во все основные разделы.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-003 — Внутренние CTA не всегда обновляют страницу

- **Priority:** High (provisional); **Area:** Navigation; **Status:** New.
- **Linked checks:** VISIT-024; PLAN-039; NAV.
- **Observed:** Кнопки перехода к карте не выполняют ожидаемую навигацию.
- **Expected:** Нажатие CTA открывает целевой экран.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-004 — Некорректны deep links и история Back/Forward

- **Priority:** High (provisional); **Area:** Navigation; **Status:** New.
- **Linked checks:** ATTR-035; NAV.
- **Observed:** Переходы назад/вперёд и ссылки с параметрами не восстанавливают корректный экран.
- **Expected:** URL, выбранная страница и состояние согласованы.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-005 — Не пересчитывается расписание после перестановки

- **Priority:** High (provisional); **Area:** Planner; **Status:** New.
- **Linked checks:** PLAN-016,027,035.
- **Observed:** Порядок остановок меняется, исходное время сохраняется и конфликты не проверяются.
- **Expected:** После перестановки обновляются время и проверки конфликтов.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-006 — Не учитываются возраст, рост, сопровождающий

- **Priority:** High (provisional); **Area:** Planner; **Status:** New.
- **Linked checks:** PLAN-021,022,023; PLAN-024(Blocked); DOC-048.
- **Observed:** Настройки/ограничения участников отсутствуют.
- **Expected:** Недопустимые активности исключаются или поясняются.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-007 — Evening Pass не включает допустимые вечерние активности

- **Priority:** High (provisional); **Area:** Planner; **Status:** New.
- **Linked checks:** PLAN-017.
- **Observed:** Для Evening Pass виден только Zen Garden при наличии других допустимых активностей в документации.
- **Expected:** План содержит все подходящие варианты с учётом доступности.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-008 — Карточку аттракциона нельзя открыть клавиатурой

- **Priority:** High (provisional); **Area:** Accessibility; **Status:** New.
- **Linked checks:** RESP-033(Blocked).
- **Observed:** При Tab/Enter открытие карточки аттракциона не удаётся.
- **Expected:** Карточка имеет клавиатурно доступное управление.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-009 — Отсутствуют карточки сравнения и описания тарифов

- **Priority:** Medium (provisional); **Area:** Tickets; **Status:** New.
- **Linked checks:** TICK-003,005,006,007; DOC-023,024,025,032.
- **Observed:** Три тарифа выбираются, но их условия и различия не раскрыты.
- **Expected:** Сравнимые варианты Day/Premium/Evening с условиями.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-010 — Описания шести зон расходятся с требованиями

- **Priority:** Medium (provisional); **Area:** Zones; **Status:** New.
- **Linked checks:** DOC-010–014,018; ZONE.
- **Observed:** Недостаточно раскрыты Boulevard, Market, Eden Gardens, Little Paradise, Spa и Ocean Bay.
- **Expected:** Описания соответствуют утверждённым характеристикам.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-011 — Аттракционы распределены между зонами противоречиво

- **Priority:** Medium (provisional); **Area:** Content; **Status:** New.
- **Linked checks:** HOME-024,034; DOC-019; ZONE,ATTR.
- **Observed:** Stormbreaker и Crystal Passage отнесены на отдельных экранах не к тем зонам.
- **Expected:** Единая достоверная принадлежность по источнику требований.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-012 — На карте отсутствуют важные транспортные объекты

- **Priority:** Medium (provisional); **Area:** Map; **Status:** New.
- **Linked checks:** MAP-005,011; DOC-037.
- **Observed:** Нет полноценного отображения входа, причала, канатной дороги и категорий.
- **Expected:** Карта показывает предусмотренные транспортные точки.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-013 — Не работает построение/передача маршрута

- **Priority:** Medium (provisional); **Area:** Map; **Status:** New.
- **Linked checks:** MAP-029; VISIT-024; PLAN-039,040(Blocked).
- **Observed:** Кнопка построения маршрута не выполняет заявленное действие.
- **Expected:** Путь или корректный переход на карту и соответствующее состояние.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-014 — Некорректны zoom, слои и границы панорамирования

- **Priority:** Medium (provisional); **Area:** Map; **Status:** New.
- **Linked checks:** MAP-020,022,026.
- **Observed:** Зум не работает; нет слоёв; схему можно увести за экран.
- **Expected:** Управление масштабом, слоями и границами функционирует.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-015 — Не работают экспорт и обмен маршрутом

- **Priority:** Medium (provisional); **Area:** Planner; **Status:** New.
- **Linked checks:** PLAN-041–046.
- **Observed:** PDF и ссылка не создаются; сохранение изображения отсутствует.
- **Expected:** PDF, изображение, ссылка и восстановление работают.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-016 — Отсутствует замена остановки

- **Priority:** Medium (provisional); **Area:** Planner; **Status:** New.
- **Linked checks:** PLAN-037.
- **Observed:** Нет функции замены отдельной активности альтернативой.
- **Expected:** Остановка заменяется подходящим объектом.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-017 — Нет empty-state сообщений

- **Priority:** Medium (provisional); **Area:** Planner; **Status:** New.
- **Linked checks:** PLAN-019,036.
- **Observed:** После пустого подбора и удаления всех остановок пояснение отсутствует.
- **Expected:** Показано понятное пустое состояние.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-018 — Скрыты кнопки редактирования на мобильной ширине

- **Priority:** Medium (provisional); **Area:** Planner Mobile; **Status:** New.
- **Linked checks:** PLAN-038; RESP-026.
- **Observed:** Стрелки и удаление присутствуют, но не отображаются.
- **Expected:** Элементы редактирования видны и нажимаются.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-019 — Модальное окно не закрывается Escape

- **Priority:** Medium (provisional); **Area:** Accessibility; **Status:** New.
- **Linked checks:** ATTR-028; RESP-034.
- **Observed:** Нажатие Escape не закрывает окно аттракциона.
- **Expected:** Escape закрывает модальное окно и восстанавливает фокус.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-020 — У кнопок-иконок непонятное доступное имя

- **Priority:** Medium (provisional); **Area:** Accessibility; **Status:** New.
- **Linked checks:** RESP-037.
- **Observed:** В Accessibility Name видны лишь ×, + и −.
- **Expected:** Осмысленные имена действий для скринридеров.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-021 — Повторяющиеся неоднозначные названия ссылок

- **Priority:** Medium (provisional); **Area:** Accessibility; **Status:** New.
- **Linked checks:** RESP-046.
- **Observed:** На вкладке «Развлечения» страницы зон ссылки имеют одинаковое имя.
- **Expected:** Названия уточняют целевой аттракцион.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-022 — Отсутствует Deluxe Room

- **Priority:** Medium (provisional); **Area:** Hotel; **Status:** New.
- **Linked checks:** HOTEL-007,009; DOC-043.
- **Observed:** Категория Deluxe Room не представлена.
- **Expected:** Полный утверждённый набор категорий.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-023 — «Все удобства» раскрывает сразу несколько карточек

- **Priority:** Medium (provisional); **Area:** Hotel; **Status:** New.
- **Linked checks:** HOTEL-019.
- **Observed:** Раскрытие удобств одного номера влияет на остальные.
- **Expected:** Раскрывается только выбранный номер.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-024 — Не раскрыта транспортная доступность отеля

- **Priority:** Medium (provisional); **Area:** Hotel; **Status:** New.
- **Linked checks:** HOTEL-029.
- **Observed:** Способы добраться до гостиничного комплекса не объяснены.
- **Expected:** Согласованное с требованиями описание Paradise Loop и пеших связей.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-025 — Неутверждённые пакеты показаны как действующие

- **Priority:** Medium (provisional); **Area:** Hotel; **Status:** New.
- **Linked checks:** HOTEL-031; DOC-045.
- **Observed:** Предварительные пакеты проживания выглядят доступными к покупке.
- **Expected:** Пакеты явно помечены как концепция/неактивные.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-026 — Недостают фильтры и быстрые категории

- **Priority:** Medium (provisional); **Area:** Attractions; **Status:** New.
- **Linked checks:** ATTR-014,017,018.
- **Observed:** Нет фильтров по возрасту и росту и быстрых категорий интересов.
- **Expected:** Предусмотренные фильтры работают.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-027 — Нет счётчика результатов

- **Priority:** Low (provisional); **Area:** Attractions; **Status:** New.
- **Linked checks:** ATTR-004,024.
- **Observed:** После фильтрации не указан размер выборки.
- **Expected:** Показано число найденных аттракционов.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-028 — Не показано пустое состояние поиска

- **Priority:** Medium (provisional); **Area:** Map; **Status:** New.
- **Linked checks:** MAP-018.
- **Observed:** При отсутствии результатов поиска нет сообщения.
- **Expected:** Показано объяснение отсутствия совпадений.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-029 — Время переходов выводится без обоснования

- **Priority:** Medium (provisional); **Area:** Planner; **Status:** New.
- **Linked checks:** PLAN-026,027.
- **Observed:** Указаны оценки времени без подтверждённых данных/расчёта.
- **Expected:** Время обосновано либо обозначено как недоступное.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-030 — Указан неподтверждённый интервал шаттла

- **Priority:** Low (provisional); **Area:** Visit; **Status:** New.
- **Linked checks:** VISIT-023; DOC-040.
- **Observed:** Paradise Loop описан с интервалом «10 минут».
- **Expected:** Неутверждённая цифра удалена/помечена предварительной.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-031 — Блок главной растянут на 1440px

- **Priority:** Low (provisional); **Area:** Homepage; **Status:** New.
- **Linked checks:** RESP-004.
- **Observed:** Второй блок имеет неудачные пропорции на широком экране.
- **Expected:** Компоновка пропорциональна контенту.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-032 — Отсутствует QR-пасхалка

- **Priority:** Low (provisional); **Area:** Tickets; **Status:** New.
- **Linked checks:** TICK-048.
- **Observed:** Нет утверждённой подписи «Познакомьтесь с королевой хардкора».
- **Expected:** Предусмотренный текст и переход присутствуют.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-033 — Не хватает содержания промоблоков и мини-планировщика

- **Priority:** Medium (provisional); **Area:** Homepage; **Status:** New.
- **Linked checks:** HOME-017,030; HOME-031(Blocked).
- **Observed:** Недостают акценты зон и три рекомендации мини-планировщика.
- **Expected:** Требуемые блоки и рекомендации присутствуют.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.

## APR-BUG-034 — Не указаны две ветки канатной дороги

- **Priority:** Medium (provisional); **Area:** Content; **Status:** New.
- **Linked checks:** DOC-034.
- **Observed:** На странице не уточнено число веток.
- **Expected:** Указаны две ветки согласно концепции.
- **Reproduction:** open the corresponding area in the published site, apply the scenario from linked checklist, and record exact actions and URL. Those exact steps and screenshots were not preserved in available notes.
- **Evidence:** tester's manual finding (2026-10-28); reproduction confirmation, screenshot, browser version, and release SHA pending.
