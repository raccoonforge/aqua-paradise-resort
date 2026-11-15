# Aqua Paradise Resort — полный аудит фотографий

Дата: 2026-11-15. Репозиторий: raccoonforge/aqua-paradise-resort. Ветка: feat/premium-redesign. Снимок: dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

Аудит только для чтения. Никаких изображений не сгенерировано, дизайн/код/CSS/ассеты не менялись, сборка, commit, push, merge и создание веток не выполнялись. Результаты находятся вне репозитория: /workspace/work/photo-audit/. Анализ относится к локальному снимку ветки, не удостоверяет опубликованный GitHub Pages.

## Объём и метод подсчёта

Проинвентаризированы все 60 файлов docs/ (включая данные, SVG, архивы и лицензии), 42 исходных TS/TSX/CSS/JSON-файлов, 18 React-файлов и 42 графических ресурсов src/assets/ и public/. Полные перечни, размеры и хеши — evidence/. Визуально проверен прежний hero-waterpark.png: это не подтверждённая фотография реального геоплана. Существующие художественные фоны, карта, пиктограммы, логотипы и QR не входят в фотографический заказ.

Браузер Chromium:8 маршрутов ×5 экранов 375×812, 768×1024, 1366×768, 1920×1080, 2560×1440=40 замеров начальных состояний. Дополнительно 9 состояний зон, 22 deep-link модальных окон, 3 категории отеля и домашние фотоблоки на 3 экранах=105 замеров. 15 комбинаций интересов минипланировщика проверены по точному алгоритму исходного кода. Отдельный сценарий полного planner измеряет настоящие [Ф] миниатюры на 3 экранах. Это аудит медиаразмещений, не полная функциональная/безопасностная регрессия сайта.

«Место» — логическое размещение с конкретным объектом в шаблоне/состоянии, а не число одновременно видимых DOM-узлов или всех возможных маршрутов. Ограниченная версия карточки не второй фотослот; export PNG/print и повторные дни тоже не новые исходники. Для 3 динамических home-шаблонов сохраняются 3 строки, шесть возможных объектов перечислены отдельно; это намеренная единица учёта, не утверждение фиксированных фотографий.

| Раздел текущего сайта | Логических мест/состояний | Что посчитано |
|---|---:|---|
| Главная |21|Hero 1 скрыт, полароиды 4, worlds 9 прозрачны, карусель 4, мини-планировщик 3 шаблона|
| Тематические зоны |9|Одна панорама ×9 зон; tabs не дублируют панораму|
| Аттракционы |44|22 карточки +22 модальных заголовка, общий исходник на объект|
| Отель |11|7 типов размещения +3 впечатления +Dining|
| Полный планировщик |40|48×48 [Ф] для 40 объектов базы, не 40 одновременно|
| Посещение |0|Сейчас золотые иконки, текст/общий art, не фотокарточки|
| Билеты |0|Тарифы/калькулятор/QR/общий art; обязательного фото нет|
| Карта |0|#/map фактически открывает главную; актуальное направление документации SVG без фото|
| **Итого текущих** |**125**|Из них 10 состояний главной интеграционно остановлены; остальные 115 не требуют реактивации этих фоновых фотосцен|

Из 125 мест 52 уникальных сюжета покрывают все текущие состояния при успешном повторном кадрировании. Это рабочая оптимизированная оценка, не доказанная физическая нижняя граница. Высокий риск общих мастеров: Velocity/Peak, Tidal/Atlantis, Stormbreaker/Pirate, Rainbow/Little; если они не проходят проверку кадрирования, согласовать отдельный establishing-ракурс, максимум ещё 4 для этих пар. Полноэкранные mobile-фото тоже требуют проверки и отдельного решения о фоне.

| Дополнительно по документации (ещё не реализовано как фото) | Минимум мест | Новые уникальные сюжеты |
|---|---:|---|
| Dock9 зон главной |9|0, повторное использование панорам|
| Обзорные детали 2 на каждую зону |18|Новые Bamboo/Sunset/Fountain входят в 7 ниже; остальное reuse|
| Фотоактивности зон |43|22 rides +5 Eden +5 Spa +6 Market +3 Boulevard +2 Ocean; Info/Station не активности|
| Hotel Hero |1|0 при пригодном кадре 004|
| Visit Hero и 4 прибытия |5|4 транспортных сюжета; Hero повтор Ocean Wings|
| Полный канонический planner |4|Beach уже 001; новые Sunset/Bamboo/Fountain входят в 7|
| **Дополнительный документированный минимум** |**80**|**7 новых мастеров:039, 040, 050, 056–059**|

Документированный пакет:125+80=205 логических мест, 59 уникальных мастеров. Если у всех 9 зон будет третья деталь, ещё 9 мест (всего 214), но можно взять уже описанные исходники. Требования фото галерей rides/rooms не задают конечного числа кадров: каталог использует минимальный один кадр на объект, дополнительные ракурсы отдельное решение. Нет честного конечного «общего числа всех возможных слайдов» при незаданной длине галереи.

Необязательные 060–064:5 предложенных кадров, не включены в 59 обязательных/документированных. Итого каталог 64 ТЗ, матрица 210 строк (125 текущих+80 document+5 optional); это НЕ 210 существующих фотоблоков и НЕ заказ на генерацию 64 фото.

## Документация: что актуально

- docs/source-of-truth.md определяет тематическую иерархию; не заменяет поздние явные изменения. Имена/правила/часы — master/website-requirements.md, UX — pages/*.md, концептуальная география — island/masterplan и 10 site plans. Project Bible смешивает действующие и ранние решения; поздняя поправка местоположения отеля имеет приоритет по явному тексту.
- docs/data/*v0. 4 — актуальная концептуальная иллюстративная сетка и маркеры, не инженерная топография. 600. 04 га сетки — дискретизация проектных 600 га, не новый размер острова.
- docs/archive/data/*, access/geometry/landuse audits v0. 1–v0. 3, ранние runtime географические модули — история экспериментов. Из них нельзя извлекать точную фотогеографию/расстояния.
- docs/map/luxury-cartography.md, navigation revision 2026-11-11 — последняя художественная карта: нативный SVG без растра. Старые illustrated implementation, architectural/botanical density и premium production pack явно superseded. 10 фотоплиток карты из старого pack не входят в заказ.
- docs/design/premium-redesign-brief.md полезен mediaId и специальным Sunset Lounge; светлая палитра и старые пропорции не заменяют утверждённый Midnight. Текущий CSS и прямое ограничение пользователя сохраняют художественный фон.
- QA до 2026-11-06 — историческое свидетельство функциональных проверок/VisualPending; не доказательство нынешнего маршрута map или готовых фотографий. README содержат старые пути, это не потерянные новые источники. Лицензии относятся к шрифтам.

Полный статус каждого файла: evidence/documents.csv. Структура всех секций: evidence/document-sections.csv. Текстовые доказательства географии/медиа: evidence/documentation-evidence.txt. Перечень React-компонентов: evidence/react-components.csv; сырые совпадения медиа по всем исходникам: evidence/source-coverage.json.

## Фактические размеры и кадрирование

Измерения ниже — clientWidth/clientHeight, без CSS-поворота карточки и внешней рамки; начальные runtime-measurements отдельно содержат transformed bounding boxes. Их не надо смешивать. Существующие контейнеры менять не требуется для подготовки исходников.

| Блок |375×812|1366×768|2560×1440|Следствие|
|---|---|---|---|---|
| Полароид главной |159×124|294×301|380×370|Не всегда квадрат; оставить свободный край|
| Карусель главной |226×258|292×213|292×262|Не постоянные 3:4; нужны независимые кропы|
| Панорама Ocean Bay зоны |337×283|682×585|744×613|Высокая близкая к квадрату область, не широкий hero|
| Каталог ride (bounding box) |341×213. 1|397. 3×248. 3|397. 3×248. 3|8:5, один исходник с модальным|
| Фото modal ride |341×145|414×354|414×354|Phoneширокое, desktopвысокое; базовоеheight 270 не финальная геометрия|
| Фото номера (client box) |333×254|514×418|514×418|Около 4:3/1. 23:1, не горизонталь 16:9|
| Hotel Pool |333×318|534×448|534×448|Почти квадрат; общий вид корпуса нужен в том же кадре|
| Hotel Kids/Wellness |333×190|534×215|534×215|Широкая полоса, особенно desktop|
| Dining |333×254|502×254|502×254|Два существенно разных кропа|
| Миниплан главной |76×67|76×55|76×67|Мелкая полоса, не 4:5 изbrief|
| Planner [Ф] |48×48|48×48|48×48|144px derivative достаточно приDPR3|

Все 9 зон и 22 модальных объекта измерены в evidence/dynamic-states.json. Полный исходныйbrowser JSON включает 768/1920. Учёт состояний по исходникам не означает, что каждая потенциальная фотография уже вставлена: сейчас это заглушки. Zoom/DPR будущих ассетов входит в план приёмки; реальные генерируемые фото/их загрузку этот этап проверить не может.

## Критические наблюдения и запреты внедрения

1. Десять фоновыхсцен главной(Hero 1 + Worlds 9) есть в JSX, но не являются разрешением перекрыть Midnight. Сейчас Hero скрыт, Worlds прозрачны. Оставить утверждённый общий художественный фон. Фотомастера этих зон всё равно нужны полароидам/панорамам.
2. В#/zones отсутствует фото мини-галереи 2–3 и фоточасть activityкарточек. Правила/инфраструктура — иконки и текст, не фотозаказ. Переключатель 9 зон прямо без фото.
3. 22 карточки каталога и 22 модальных окна используют по одному и тому же объектному мастеру. Ограниченные варианты карточек не требуют нового изображения. Сейчас модальные окна не полноценная многокадровая галерея.
4. Отель имеет 7 фотосостояний категорий. Галереи вторых/третьих ракурсов не реализованы; не генерировать 7×3 автоматически. 004 связывает hoteloverview иInfinityPool при успешном кропе; Kids/Wellness/Dining отдельные предметы.
5. Visit arrival иллюстрируют 4 золотые PNG-пиктограммы; 14 использований иконок в nav/arrival/rules не 14 фото. Heroнефото. Документированный фото-план отмечен отдельно и требует решения по утверждённому дизайну.
6. Planner содержит 40 объектов и [Ф]48px — важный скрытый фотопотребитель. Центральная станция не новая активность. В базе отсутствуют 4 канонических состояния Beach/Sunset/Bamboo/Fountain; учтены только какdocument. Export/печать повторяютте же фото.
7. Header, dropdowns, footer, Tickets, правила/FAQ, иконки, QR, SVG-карта не требуют дополнительных обязательных фотографий. Сохранённые Hero/Header/IslandMap иmaplayers не подключены к текущемуApp. Старый hero-waterpark не корректный референс каждого района.
8. Точные конфликтыG01–G16 в разделеВ/отдельном 04. Ни один спор не разрешён произвольным изменением проекта. География локальных кадров сохранена, широкие спорные кадры остановлены.

## А. Полный фотокаталог

Каждая строка — один исходный сюжет; 64 ID не означают 64 обязательные генерации. ТЗ с 12 требуемыми полями, reuse, источниками и промптом — ниже и отдельно briefs/APR-PHOTO-XXX.md.

| ID | Уникальный сюжет | Зона | Класс | Приоритет |
|---|---|---|---|---|
| [APR-PHOTO-001](briefs/APR-PHOTO-001.md) | Ocean Bay / Paradise Beach | Ocean Bay | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-002](briefs/APR-PHOTO-002.md) | Adrenaline Peak / Velocity Racers | Adrenaline Peak | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-003](briefs/APR-PHOTO-003.md) | Eden Gardens / Emerald Walk | Eden Gardens | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-004](briefs/APR-PHOTO-004.md) | Paradise Grand Hotel / Grand Infinity Pool | Hotel | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-005](briefs/APR-PHOTO-005.md) | Atlantis Realm / Tidal Kingdom | Atlantis Realm | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-006](briefs/APR-PHOTO-006.md) | Pirate’s Cove / Stormbreaker | Pirate's Cove | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-007](briefs/APR-PHOTO-007.md) | Little Paradise / Rainbow Reef | Little Paradise | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-008](briefs/APR-PHOTO-008.md) | Serenity Spa / Lotus Thermal Pools | Serenity Spa | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-009](briefs/APR-PHOTO-009.md) | Paradise Market / Sunset Market Square | Paradise Market | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-010](briefs/APR-PHOTO-010.md) | Paradise Boulevard / Palm Avenue | Paradise Boulevard | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-011](briefs/APR-PHOTO-011.md) | Skyfall | Adrenaline Peak | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-012](briefs/APR-PHOTO-012.md) | Poseidon’s Descent | Atlantis Realm | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-013](briefs/APR-PHOTO-013.md) | Crystal Passage | Atlantis Realm | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-014](briefs/APR-PHOTO-014.md) | Cyclone Vortex | Adrenaline Peak | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-015](briefs/APR-PHOTO-015.md) | Thunder Rush | Adrenaline Peak | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-016](briefs/APR-PHOTO-016.md) | Eagle’s Lookout | Adrenaline Peak | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-017](briefs/APR-PHOTO-017.md) | Moonlit Ruins | Atlantis Realm | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-018](briefs/APR-PHOTO-018.md) | Blackbeard’s Run | Pirate's Cove | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-019](briefs/APR-PHOTO-019.md) | Smuggler’s Passage | Pirate's Cove | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-020](briefs/APR-PHOTO-020.md) | Cannonball Clash | Pirate's Cove | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-021](briefs/APR-PHOTO-021.md) | Ocean Rush | Ocean Bay | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-022](briefs/APR-PHOTO-022.md) | Blue Horizon | Ocean Bay | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-023](briefs/APR-PHOTO-023.md) | Tidal Drop | Ocean Bay | Обязательно для существующих медиасостояний | P0 — главная |
| [APR-PHOTO-024](briefs/APR-PHOTO-024.md) | Aqua Challenge | Ocean Bay | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-025](briefs/APR-PHOTO-025.md) | Coral Discovery | Ocean Bay | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-026](briefs/APR-PHOTO-026.md) | Ocean Explorer | Ocean Bay | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-027](briefs/APR-PHOTO-027.md) | Tiny Tides | Little Paradise | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-028](briefs/APR-PHOTO-028.md) | Splash Explorers | Little Paradise | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-029](briefs/APR-PHOTO-029.md) | Standard Room | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-030](briefs/APR-PHOTO-030.md) | Deluxe Room | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-031](briefs/APR-PHOTO-031.md) | Ocean View Room | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-032](briefs/APR-PHOTO-032.md) | Family Suite | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-033](briefs/APR-PHOTO-033.md) | Premium Suite | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-034](briefs/APR-PHOTO-034.md) | Ocean View Villa | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-035](briefs/APR-PHOTO-035.md) | Royal Paradise Villa | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-036](briefs/APR-PHOTO-036.md) | Grand Kids Club | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-037](briefs/APR-PHOTO-037.md) | Grand Wellness & Fitness | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-038](briefs/APR-PHOTO-038.md) | Paradise Dining | Hotel | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-039](briefs/APR-PHOTO-039.md) | Sunset Lounge | Ocean Bay | Документировано, UI не реализован/требует согласования | P2 — документированные расширения |
| [APR-PHOTO-040](briefs/APR-PHOTO-040.md) | Bamboo Harmony | Serenity Spa | Документировано, UI не реализован/требует согласования | P2 — документированные расширения |
| [APR-PHOTO-041](briefs/APR-PHOTO-041.md) | Mist Sanctuary | Serenity Spa | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-042](briefs/APR-PHOTO-042.md) | Whispering Falls | Serenity Spa | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-043](briefs/APR-PHOTO-043.md) | Zen Garden | Serenity Spa | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-044](briefs/APR-PHOTO-044.md) | Hidden Falls | Eden Gardens | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-045](briefs/APR-PHOTO-045.md) | Butterfly Haven | Eden Gardens | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-046](briefs/APR-PHOTO-046.md) | Orchid Pavilion | Eden Gardens | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-047](briefs/APR-PHOTO-047.md) | Starlight Trail | Eden Gardens | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-048](briefs/APR-PHOTO-048.md) | Paradise Gateway | Paradise Boulevard | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-049](briefs/APR-PHOTO-049.md) | Island Welcome Center | Paradise Boulevard | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-050](briefs/APR-PHOTO-050.md) | Paradise Fountain Show | Paradise Boulevard | Документировано, UI не реализован/требует согласования | P2 — документированные расширения |
| [APR-PHOTO-051](briefs/APR-PHOTO-051.md) | Tropical Bites Food Hall | Paradise Market | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-052](briefs/APR-PHOTO-052.md) | Azure Terrace Restaurant | Paradise Market | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-053](briefs/APR-PHOTO-053.md) | Coconut & Co. | Paradise Market | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-054](briefs/APR-PHOTO-054.md) | Island Treasures | Paradise Market | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-055](briefs/APR-PHOTO-055.md) | Splash Essentials | Paradise Market | Обязательно для существующих медиасостояний | P1 — внутренние страницы |
| [APR-PHOTO-056](briefs/APR-PHOTO-056.md) | Ocean Wings | Transport | Документировано, UI не реализован/требует согласования | P2 — документированные расширения |
| [APR-PHOTO-057](briefs/APR-PHOTO-057.md) | Паром / катамаран | Transport | Документировано, UI не реализован/требует согласования | P2 — документированные расширения |
| [APR-PHOTO-058](briefs/APR-PHOTO-058.md) | Скоростной катер | Transport | Документировано, UI не реализован/требует согласования | P2 — документированные расширения |
| [APR-PHOTO-059](briefs/APR-PHOTO-059.md) | Marina / прибытие на яхте | Transport | Документировано, UI не реализован/требует согласования | P2 — документированные расширения |
| [APR-PHOTO-060](briefs/APR-PHOTO-060.md) | Paradise Loop Central Station | Paradise Boulevard | Необязательно, предложение | P3 — опционально |
| [APR-PHOTO-061](briefs/APR-PHOTO-061.md) | Tidal Kingdom — спокойный вечер | Atlantis Realm | Необязательно, предложение | P3 — опционально |
| [APR-PHOTO-062](briefs/APR-PHOTO-062.md) | Общий аэрофотоснимок острова | Island | Необязательно, предложение | P3 — опционально |
| [APR-PHOTO-063](briefs/APR-PHOTO-063.md) | Приватная кабана | Ocean Bay | Необязательно, предложение | P3 — опционально |
| [APR-PHOTO-064](briefs/APR-PHOTO-064.md) | Ocean View Villa — дополнительный интерьер | Hotel | Необязательно, предложение | P3 — опционально |

## Б. Матрица размещения

Полная проверяемая таблица 210 строк: [03-placement-matrix.csv](placement-matrix.csv), JSON-аналог. Каждая строка содержит ID, страницу/блок/состояние, исходник, статусcurrent/document/optional, пропорции, разрешениепроизводной, источник и стопусловия. Три home mini-шаблона связаны с шестью динамическими объектами через evidence/mini-planner-scenarios.json; типовой ID в строке не закрепляет фото навсегда за временем суток. Внутри каждогоТЗ приведены все его размещения.


### Полная матрица всех размещений

Статусы: current — текущий кодовый слот/состояние; document — требование документации, ещё не реализованное как фото; optional — предложение аудита. Для трёх динамических шаблонов перечислены все возможные ID. Размеры производных, примечания и источники дополнительно сохранены в CSV/JSON.

| Место | Страница | Блок / состояние | ID исходника или допустимые ID | Статус | Пропорции |
|---|---|---|---|---|---|
| APR-SLOT-001 | home | Hero / home.hero.ocean-bay | APR-PHOTO-001 | current | Условно 16:9; mobile 9:16 |
| APR-SLOT-002 | home | О курорте — полароид / Ocean Bay | APR-PHOTO-001 | current | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. |
| APR-SLOT-003 | home | О курорте — полароид / Adrenaline Peak | APR-PHOTO-002 | current | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. |
| APR-SLOT-004 | home | О курорте — полароид / Eden Gardens | APR-PHOTO-003 | current | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. |
| APR-SLOT-005 | home | О курорте — полароид / Hotel | APR-PHOTO-004 | current | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. |
| APR-SLOT-006 | home | Девять миров — полноэкранная сцена / Ocean Bay | APR-PHOTO-001 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-007 | home | Девять миров — полноэкранная сцена / Adrenaline Peak | APR-PHOTO-002 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-008 | home | Девять миров — полноэкранная сцена / Eden Gardens | APR-PHOTO-003 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-009 | home | Девять миров — полноэкранная сцена / Pirate's Cove | APR-PHOTO-006 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-010 | home | Девять миров — полноэкранная сцена / Atlantis Realm | APR-PHOTO-005 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-011 | home | Девять миров — полноэкранная сцена / Little Paradise | APR-PHOTO-007 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-012 | home | Девять миров — полноэкранная сцена / Serenity Spa | APR-PHOTO-008 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-013 | home | Девять миров — полноэкранная сцена / Paradise Market | APR-PHOTO-009 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-014 | home | Девять миров — полноэкранная сцена / Paradise Boulevard | APR-PHOTO-010 | current | Переменный экранный формат; 9:16 phone / 16:9 wide |
| APR-SLOT-015 | home | Карусель аттракционов / skyfall | APR-PHOTO-011 | current | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. |
| APR-SLOT-016 | home | Карусель аттракционов / poseidons-descent | APR-PHOTO-012 | current | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. |
| APR-SLOT-017 | home | Карусель аттракционов / stormbreaker | APR-PHOTO-006 | current | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. |
| APR-SLOT-018 | home | Карусель аттракционов / crystal-passage | APR-PHOTO-013 | current | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. |
| APR-SLOT-019 | home | Мини-планировщик — шаблон / home.planner.morning | APR-PHOTO-011, APR-PHOTO-016 | current | Phone около 76×67; laptop76×55; wide76×67. Не портретный 4:5. |
| APR-SLOT-020 | home | Мини-планировщик — шаблон / home.planner.afternoon | APR-PHOTO-002, APR-PHOTO-005, APR-PHOTO-013 | current | Phone около 76×67; laptop76×55; wide76×67. Не портретный 4:5. |
| APR-SLOT-021 | home | Мини-планировщик — шаблон / home.planner.evening | APR-PHOTO-016, APR-PHOTO-023 | current | Phone около 76×67; laptop76×55; wide76×67. Не портретный 4:5. |
| APR-SLOT-022 | zones | Главная панорама зоны / Ocean Bay | APR-PHOTO-001 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-023 | zones | Главная панорама зоны / Adrenaline Peak | APR-PHOTO-002 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-024 | zones | Главная панорама зоны / Eden Gardens | APR-PHOTO-003 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-025 | zones | Главная панорама зоны / Pirate's Cove | APR-PHOTO-006 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-026 | zones | Главная панорама зоны / Atlantis Realm | APR-PHOTO-005 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-027 | zones | Главная панорама зоны / Little Paradise | APR-PHOTO-007 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-028 | zones | Главная панорама зоны / Serenity Spa | APR-PHOTO-008 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-029 | zones | Главная панорама зоны / Paradise Market | APR-PHOTO-009 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-030 | zones | Главная панорама зоны / Paradise Boulevard | APR-PHOTO-010 | current | Phone 339×285; wide около 746×615; не баннер 16:9 |
| APR-SLOT-031 | attractions | Карточка каталога / Skyfall | APR-PHOTO-011 | current | 8:5 / 16:10 |
| APR-SLOT-032 | attractions | Заголовок модального окна / Skyfall | APR-PHOTO-011 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-033 | attractions | Карточка каталога / Velocity Racers | APR-PHOTO-002 | current | 8:5 / 16:10 |
| APR-SLOT-034 | attractions | Заголовок модального окна / Velocity Racers | APR-PHOTO-002 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-035 | attractions | Карточка каталога / Cyclone Vortex | APR-PHOTO-014 | current | 8:5 / 16:10 |
| APR-SLOT-036 | attractions | Заголовок модального окна / Cyclone Vortex | APR-PHOTO-014 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-037 | attractions | Карточка каталога / Thunder Rush | APR-PHOTO-015 | current | 8:5 / 16:10 |
| APR-SLOT-038 | attractions | Заголовок модального окна / Thunder Rush | APR-PHOTO-015 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-039 | attractions | Карточка каталога / Eagle's Lookout | APR-PHOTO-016 | current | 8:5 / 16:10 |
| APR-SLOT-040 | attractions | Заголовок модального окна / Eagle's Lookout | APR-PHOTO-016 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-041 | attractions | Карточка каталога / Poseidon's Descent | APR-PHOTO-012 | current | 8:5 / 16:10 |
| APR-SLOT-042 | attractions | Заголовок модального окна / Poseidon's Descent | APR-PHOTO-012 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-043 | attractions | Карточка каталога / Tidal Kingdom | APR-PHOTO-005 | current | 8:5 / 16:10 |
| APR-SLOT-044 | attractions | Заголовок модального окна / Tidal Kingdom | APR-PHOTO-005 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-045 | attractions | Карточка каталога / Crystal Passage | APR-PHOTO-013 | current | 8:5 / 16:10 |
| APR-SLOT-046 | attractions | Заголовок модального окна / Crystal Passage | APR-PHOTO-013 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-047 | attractions | Карточка каталога / Moonlit Ruins | APR-PHOTO-017 | current | 8:5 / 16:10 |
| APR-SLOT-048 | attractions | Заголовок модального окна / Moonlit Ruins | APR-PHOTO-017 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-049 | attractions | Карточка каталога / Stormbreaker | APR-PHOTO-006 | current | 8:5 / 16:10 |
| APR-SLOT-050 | attractions | Заголовок модального окна / Stormbreaker | APR-PHOTO-006 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-051 | attractions | Карточка каталога / Blackbeard's Run | APR-PHOTO-018 | current | 8:5 / 16:10 |
| APR-SLOT-052 | attractions | Заголовок модального окна / Blackbeard's Run | APR-PHOTO-018 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-053 | attractions | Карточка каталога / Smuggler's Passage | APR-PHOTO-019 | current | 8:5 / 16:10 |
| APR-SLOT-054 | attractions | Заголовок модального окна / Smuggler's Passage | APR-PHOTO-019 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-055 | attractions | Карточка каталога / Cannonball Clash | APR-PHOTO-020 | current | 8:5 / 16:10 |
| APR-SLOT-056 | attractions | Заголовок модального окна / Cannonball Clash | APR-PHOTO-020 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-057 | attractions | Карточка каталога / Ocean Rush | APR-PHOTO-021 | current | 8:5 / 16:10 |
| APR-SLOT-058 | attractions | Заголовок модального окна / Ocean Rush | APR-PHOTO-021 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-059 | attractions | Карточка каталога / Blue Horizon | APR-PHOTO-022 | current | 8:5 / 16:10 |
| APR-SLOT-060 | attractions | Заголовок модального окна / Blue Horizon | APR-PHOTO-022 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-061 | attractions | Карточка каталога / Tidal Drop | APR-PHOTO-023 | current | 8:5 / 16:10 |
| APR-SLOT-062 | attractions | Заголовок модального окна / Tidal Drop | APR-PHOTO-023 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-063 | attractions | Карточка каталога / Aqua Challenge | APR-PHOTO-024 | current | 8:5 / 16:10 |
| APR-SLOT-064 | attractions | Заголовок модального окна / Aqua Challenge | APR-PHOTO-024 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-065 | attractions | Карточка каталога / Coral Discovery | APR-PHOTO-025 | current | 8:5 / 16:10 |
| APR-SLOT-066 | attractions | Заголовок модального окна / Coral Discovery | APR-PHOTO-025 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-067 | attractions | Карточка каталога / Ocean Explorer | APR-PHOTO-026 | current | 8:5 / 16:10 |
| APR-SLOT-068 | attractions | Заголовок модального окна / Ocean Explorer | APR-PHOTO-026 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-069 | attractions | Карточка каталога / Tiny Tides | APR-PHOTO-027 | current | 8:5 / 16:10 |
| APR-SLOT-070 | attractions | Заголовок модального окна / Tiny Tides | APR-PHOTO-027 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-071 | attractions | Карточка каталога / Rainbow Reef | APR-PHOTO-007 | current | 8:5 / 16:10 |
| APR-SLOT-072 | attractions | Заголовок модального окна / Rainbow Reef | APR-PHOTO-007 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-073 | attractions | Карточка каталога / Splash Explorers | APR-PHOTO-028 | current | 8:5 / 16:10 |
| APR-SLOT-074 | attractions | Заголовок модального окна / Splash Explorers | APR-PHOTO-028 | current | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. |
| APR-SLOT-075 | hotel | Каталог размещения / Standard Room | APR-PHOTO-029 | current | Desktop 516×420; phone 335×256 |
| APR-SLOT-076 | hotel | Каталог размещения / Deluxe Room | APR-PHOTO-030 | current | Desktop 516×420; phone 335×256 |
| APR-SLOT-077 | hotel | Каталог размещения / Ocean View Room | APR-PHOTO-031 | current | Desktop 516×420; phone 335×256 |
| APR-SLOT-078 | hotel | Каталог размещения / Family Suite | APR-PHOTO-032 | current | Desktop 516×420; phone 335×256 |
| APR-SLOT-079 | hotel | Каталог размещения / Premium Suite | APR-PHOTO-033 | current | Desktop 516×420; phone 335×256 |
| APR-SLOT-080 | hotel | Каталог размещения / Ocean View Villa | APR-PHOTO-034 | current | Desktop 516×420; phone 335×256 |
| APR-SLOT-081 | hotel | Каталог размещения / Royal Paradise Villa | APR-PHOTO-035 | current | Desktop 516×420; phone 335×256 |
| APR-SLOT-082 | hotel | Впечатления отеля / pool | APR-PHOTO-004 | current | По фактическому feature-контейнеру, см. dynamic-states.json |
| APR-SLOT-083 | hotel | Впечатления отеля / kids | APR-PHOTO-036 | current | По фактическому feature-контейнеру, см. dynamic-states.json |
| APR-SLOT-084 | hotel | Впечатления отеля / wellness | APR-PHOTO-037 | current | По фактическому feature-контейнеру, см. dynamic-states.json |
| APR-SLOT-085 | hotel | Paradise Dining / dining | APR-PHOTO-038 | current | Desktop 504×256; phone 335×256 |
| APR-SLOT-086 | planner | Маршрут — миниатюра остановки / Paradise Gateway | APR-PHOTO-048 | current | 1:1, 48×48 CSS px |
| APR-SLOT-087 | planner | Маршрут — миниатюра остановки / Palm Avenue (прогулка) | APR-PHOTO-010 | current | 1:1, 48×48 CSS px |
| APR-SLOT-088 | planner | Маршрут — миниатюра остановки / Island Welcome Center | APR-PHOTO-049 | current | 1:1, 48×48 CSS px |
| APR-SLOT-089 | planner | Маршрут — миниатюра остановки / Sunset Market Square | APR-PHOTO-009 | current | 1:1, 48×48 CSS px |
| APR-SLOT-090 | planner | Маршрут — миниатюра остановки / Tropical Bites Food Hall (питание оплачивается отдельно) | APR-PHOTO-051 | current | 1:1, 48×48 CSS px |
| APR-SLOT-091 | planner | Маршрут — миниатюра остановки / Azure Terrace Restaurant (оплачивается отдельно) | APR-PHOTO-052 | current | 1:1, 48×48 CSS px |
| APR-SLOT-092 | planner | Маршрут — миниатюра остановки / Coconut & Co. (питание оплачивается отдельно) | APR-PHOTO-053 | current | 1:1, 48×48 CSS px |
| APR-SLOT-093 | planner | Маршрут — миниатюра остановки / Island Treasures (покупки оплачиваются отдельно) | APR-PHOTO-054 | current | 1:1, 48×48 CSS px |
| APR-SLOT-094 | planner | Маршрут — миниатюра остановки / Splash Essentials (покупки оплачиваются отдельно) | APR-PHOTO-055 | current | 1:1, 48×48 CSS px |
| APR-SLOT-095 | planner | Маршрут — миниатюра остановки / Hidden Falls | APR-PHOTO-044 | current | 1:1, 48×48 CSS px |
| APR-SLOT-096 | planner | Маршрут — миниатюра остановки / Orchid Pavilion | APR-PHOTO-046 | current | 1:1, 48×48 CSS px |
| APR-SLOT-097 | planner | Маршрут — миниатюра остановки / Starlight Trail | APR-PHOTO-047 | current | 1:1, 48×48 CSS px |
| APR-SLOT-098 | planner | Маршрут — миниатюра остановки / Mist Sanctuary | APR-PHOTO-041 | current | 1:1, 48×48 CSS px |
| APR-SLOT-099 | planner | Маршрут — миниатюра остановки / Skyfall | APR-PHOTO-011 | current | 1:1, 48×48 CSS px |
| APR-SLOT-100 | planner | Маршрут — миниатюра остановки / Velocity Racers | APR-PHOTO-002 | current | 1:1, 48×48 CSS px |
| APR-SLOT-101 | planner | Маршрут — миниатюра остановки / Cyclone Vortex | APR-PHOTO-014 | current | 1:1, 48×48 CSS px |
| APR-SLOT-102 | planner | Маршрут — миниатюра остановки / Thunder Rush | APR-PHOTO-015 | current | 1:1, 48×48 CSS px |
| APR-SLOT-103 | planner | Маршрут — миниатюра остановки / Eagle's Lookout | APR-PHOTO-016 | current | 1:1, 48×48 CSS px |
| APR-SLOT-104 | planner | Маршрут — миниатюра остановки / Poseidon's Descent | APR-PHOTO-012 | current | 1:1, 48×48 CSS px |
| APR-SLOT-105 | planner | Маршрут — миниатюра остановки / Tidal Kingdom | APR-PHOTO-005 | current | 1:1, 48×48 CSS px |
| APR-SLOT-106 | planner | Маршрут — миниатюра остановки / Crystal Passage | APR-PHOTO-013 | current | 1:1, 48×48 CSS px |
| APR-SLOT-107 | planner | Маршрут — миниатюра остановки / Moonlit Ruins | APR-PHOTO-017 | current | 1:1, 48×48 CSS px |
| APR-SLOT-108 | planner | Маршрут — миниатюра остановки / Stormbreaker | APR-PHOTO-006 | current | 1:1, 48×48 CSS px |
| APR-SLOT-109 | planner | Маршрут — миниатюра остановки / Blackbeard's Run | APR-PHOTO-018 | current | 1:1, 48×48 CSS px |
| APR-SLOT-110 | planner | Маршрут — миниатюра остановки / Smuggler's Passage | APR-PHOTO-019 | current | 1:1, 48×48 CSS px |
| APR-SLOT-111 | planner | Маршрут — миниатюра остановки / Cannonball Clash | APR-PHOTO-020 | current | 1:1, 48×48 CSS px |
| APR-SLOT-112 | planner | Маршрут — миниатюра остановки / Ocean Rush | APR-PHOTO-021 | current | 1:1, 48×48 CSS px |
| APR-SLOT-113 | planner | Маршрут — миниатюра остановки / Blue Horizon | APR-PHOTO-022 | current | 1:1, 48×48 CSS px |
| APR-SLOT-114 | planner | Маршрут — миниатюра остановки / Tidal Drop | APR-PHOTO-023 | current | 1:1, 48×48 CSS px |
| APR-SLOT-115 | planner | Маршрут — миниатюра остановки / Aqua Challenge | APR-PHOTO-024 | current | 1:1, 48×48 CSS px |
| APR-SLOT-116 | planner | Маршрут — миниатюра остановки / Coral Discovery | APR-PHOTO-025 | current | 1:1, 48×48 CSS px |
| APR-SLOT-117 | planner | Маршрут — миниатюра остановки / Ocean Explorer | APR-PHOTO-026 | current | 1:1, 48×48 CSS px |
| APR-SLOT-118 | planner | Маршрут — миниатюра остановки / Tiny Tides | APR-PHOTO-027 | current | 1:1, 48×48 CSS px |
| APR-SLOT-119 | planner | Маршрут — миниатюра остановки / Rainbow Reef | APR-PHOTO-007 | current | 1:1, 48×48 CSS px |
| APR-SLOT-120 | planner | Маршрут — миниатюра остановки / Splash Explorers | APR-PHOTO-028 | current | 1:1, 48×48 CSS px |
| APR-SLOT-121 | planner | Маршрут — миниатюра остановки / Lotus Thermal Pools | APR-PHOTO-008 | current | 1:1, 48×48 CSS px |
| APR-SLOT-122 | planner | Маршрут — миниатюра остановки / Zen Garden | APR-PHOTO-043 | current | 1:1, 48×48 CSS px |
| APR-SLOT-123 | planner | Маршрут — миниатюра остановки / Whispering Falls | APR-PHOTO-042 | current | 1:1, 48×48 CSS px |
| APR-SLOT-124 | planner | Маршрут — миниатюра остановки / Butterfly Haven | APR-PHOTO-045 | current | 1:1, 48×48 CSS px |
| APR-SLOT-125 | planner | Маршрут — миниатюра остановки / Emerald Walk | APR-PHOTO-003 | current | 1:1, 48×48 CSS px |
| APR-SLOT-126 | home | Фото-миниатюра dock (документ) / Ocean Bay | APR-PHOTO-001 | document | 1:1 |
| APR-SLOT-127 | home | Фото-миниатюра dock (документ) / Adrenaline Peak | APR-PHOTO-002 | document | 1:1 |
| APR-SLOT-128 | home | Фото-миниатюра dock (документ) / Eden Gardens | APR-PHOTO-003 | document | 1:1 |
| APR-SLOT-129 | home | Фото-миниатюра dock (документ) / Pirate's Cove | APR-PHOTO-006 | document | 1:1 |
| APR-SLOT-130 | home | Фото-миниатюра dock (документ) / Atlantis Realm | APR-PHOTO-005 | document | 1:1 |
| APR-SLOT-131 | home | Фото-миниатюра dock (документ) / Little Paradise | APR-PHOTO-007 | document | 1:1 |
| APR-SLOT-132 | home | Фото-миниатюра dock (документ) / Serenity Spa | APR-PHOTO-008 | document | 1:1 |
| APR-SLOT-133 | home | Фото-миниатюра dock (документ) / Paradise Market | APR-PHOTO-009 | document | 1:1 |
| APR-SLOT-134 | home | Фото-миниатюра dock (документ) / Paradise Boulevard | APR-PHOTO-010 | document | 1:1 |
| APR-SLOT-135 | zones | Обзор — мини-галерея деталей / Paradise Boulevard | APR-PHOTO-048 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-136 | zones | Обзор — мини-галерея деталей / Paradise Boulevard | APR-PHOTO-050 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-137 | zones | Обзор — мини-галерея деталей / Paradise Market | APR-PHOTO-051 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-138 | zones | Обзор — мини-галерея деталей / Paradise Market | APR-PHOTO-052 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-139 | zones | Обзор — мини-галерея деталей / Eden Gardens | APR-PHOTO-044 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-140 | zones | Обзор — мини-галерея деталей / Eden Gardens | APR-PHOTO-045 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-141 | zones | Обзор — мини-галерея деталей / Little Paradise | APR-PHOTO-027 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-142 | zones | Обзор — мини-галерея деталей / Little Paradise | APR-PHOTO-028 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-143 | zones | Обзор — мини-галерея деталей / Serenity Spa | APR-PHOTO-040 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-144 | zones | Обзор — мини-галерея деталей / Serenity Spa | APR-PHOTO-042 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-145 | zones | Обзор — мини-галерея деталей / Pirate's Cove | APR-PHOTO-018 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-146 | zones | Обзор — мини-галерея деталей / Pirate's Cove | APR-PHOTO-019 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-147 | zones | Обзор — мини-галерея деталей / Atlantis Realm | APR-PHOTO-012 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-148 | zones | Обзор — мини-галерея деталей / Atlantis Realm | APR-PHOTO-013 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-149 | zones | Обзор — мини-галерея деталей / Adrenaline Peak | APR-PHOTO-011 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-150 | zones | Обзор — мини-галерея деталей / Adrenaline Peak | APR-PHOTO-014 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-151 | zones | Обзор — мини-галерея деталей / Ocean Bay | APR-PHOTO-021 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-152 | zones | Обзор — мини-галерея деталей / Ocean Bay | APR-PHOTO-039 | document | 3:2 или 4:3; окончательный контейнер не реализован |
| APR-SLOT-153 | zones | Развлечения — фотокарточка (документ) / Adrenaline Peak | APR-PHOTO-011 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-154 | zones | Развлечения — фотокарточка (документ) / Adrenaline Peak | APR-PHOTO-002 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-155 | zones | Развлечения — фотокарточка (документ) / Adrenaline Peak | APR-PHOTO-014 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-156 | zones | Развлечения — фотокарточка (документ) / Adrenaline Peak | APR-PHOTO-015 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-157 | zones | Развлечения — фотокарточка (документ) / Adrenaline Peak | APR-PHOTO-016 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-158 | zones | Развлечения — фотокарточка (документ) / Atlantis Realm | APR-PHOTO-012 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-159 | zones | Развлечения — фотокарточка (документ) / Atlantis Realm | APR-PHOTO-005 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-160 | zones | Развлечения — фотокарточка (документ) / Atlantis Realm | APR-PHOTO-013 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-161 | zones | Развлечения — фотокарточка (документ) / Atlantis Realm | APR-PHOTO-017 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-162 | zones | Развлечения — фотокарточка (документ) / Pirate's Cove | APR-PHOTO-006 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-163 | zones | Развлечения — фотокарточка (документ) / Pirate's Cove | APR-PHOTO-018 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-164 | zones | Развлечения — фотокарточка (документ) / Pirate's Cove | APR-PHOTO-019 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-165 | zones | Развлечения — фотокарточка (документ) / Pirate's Cove | APR-PHOTO-020 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-166 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-021 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-167 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-022 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-168 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-023 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-169 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-024 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-170 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-025 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-171 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-026 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-172 | zones | Развлечения — фотокарточка (документ) / Little Paradise | APR-PHOTO-027 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-173 | zones | Развлечения — фотокарточка (документ) / Little Paradise | APR-PHOTO-007 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-174 | zones | Развлечения — фотокарточка (документ) / Little Paradise | APR-PHOTO-028 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-175 | zones | Развлечения — фотокарточка (документ) / Eden Gardens | APR-PHOTO-003 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-176 | zones | Развлечения — фотокарточка (документ) / Eden Gardens | APR-PHOTO-044 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-177 | zones | Развлечения — фотокарточка (документ) / Eden Gardens | APR-PHOTO-045 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-178 | zones | Развлечения — фотокарточка (документ) / Eden Gardens | APR-PHOTO-046 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-179 | zones | Развлечения — фотокарточка (документ) / Eden Gardens | APR-PHOTO-047 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-180 | zones | Развлечения — фотокарточка (документ) / Serenity Spa | APR-PHOTO-008 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-181 | zones | Развлечения — фотокарточка (документ) / Serenity Spa | APR-PHOTO-040 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-182 | zones | Развлечения — фотокарточка (документ) / Serenity Spa | APR-PHOTO-041 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-183 | zones | Развлечения — фотокарточка (документ) / Serenity Spa | APR-PHOTO-042 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-184 | zones | Развлечения — фотокарточка (документ) / Serenity Spa | APR-PHOTO-043 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-185 | zones | Развлечения — фотокарточка (документ) / Paradise Market | APR-PHOTO-009 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-186 | zones | Развлечения — фотокарточка (документ) / Paradise Market | APR-PHOTO-051 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-187 | zones | Развлечения — фотокарточка (документ) / Paradise Market | APR-PHOTO-052 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-188 | zones | Развлечения — фотокарточка (документ) / Paradise Market | APR-PHOTO-053 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-189 | zones | Развлечения — фотокарточка (документ) / Paradise Market | APR-PHOTO-054 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-190 | zones | Развлечения — фотокарточка (документ) / Paradise Market | APR-PHOTO-055 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-191 | zones | Развлечения — фотокарточка (документ) / Paradise Boulevard | APR-PHOTO-048 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-192 | zones | Развлечения — фотокарточка (документ) / Paradise Boulevard | APR-PHOTO-010 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-193 | zones | Развлечения — фотокарточка (документ) / Paradise Boulevard | APR-PHOTO-050 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-194 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-001 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-195 | zones | Развлечения — фотокарточка (документ) / Ocean Bay | APR-PHOTO-039 | document | 3:2 / окончательные размеры не утверждены |
| APR-SLOT-196 | hotel | Hero (документ) / hotel overview | APR-PHOTO-004 | document | 16:9 / mobile 9:16 |
| APR-SLOT-197 | visit | Прибытие — фотокарточка (документ) / ocean-wings | APR-PHOTO-056 | document | 16:10 / по будущему контейнеру |
| APR-SLOT-198 | visit | Прибытие — фотокарточка (документ) / ferry | APR-PHOTO-057 | document | 16:10 / по будущему контейнеру |
| APR-SLOT-199 | visit | Прибытие — фотокарточка (документ) / speedboat | APR-PHOTO-058 | document | 16:10 / по будущему контейнеру |
| APR-SLOT-200 | visit | Прибытие — фотокарточка (документ) / marina | APR-PHOTO-059 | document | 16:10 / по будущему контейнеру |
| APR-SLOT-201 | visit | Hero (документ) / arrival hero | APR-PHOTO-056 | document | 16:9 / mobile 9:16 |
| APR-SLOT-202 | planner | Дополнение канонического каталога / paradise-beach | APR-PHOTO-001 | document | 1:1 |
| APR-SLOT-203 | planner | Дополнение канонического каталога / sunset-lounge | APR-PHOTO-039 | document | 1:1 |
| APR-SLOT-204 | planner | Дополнение канонического каталога / bamboo-harmony | APR-PHOTO-040 | document | 1:1 |
| APR-SLOT-205 | planner | Дополнение канонического каталога / paradise-fountain-show | APR-PHOTO-050 | document | 1:1 |
| APR-SLOT-206 | visit | Дополнительный транспортный кадр / central-station | APR-PHOTO-060 | optional | По отдельному согласованию |
| APR-SLOT-207 | attractions | Дополнительная фотография вечернего состояния / tidal-calm-evening | APR-PHOTO-061 | optional | По отдельному согласованию |
| APR-SLOT-208 | home | Необязательная островная панорама — блокировать / island-aerial | APR-PHOTO-062 | optional | По отдельному согласованию |
| APR-SLOT-209 | tickets | Необязательная иллюстрация кабаны / private-cabana | APR-PHOTO-063 | optional | По отдельному согласованию |
| APR-SLOT-210 | hotel | Дополнительный ракурс галереи / villa-interior-detail | APR-PHOTO-064 | optional | По отдельному согласованию |

## В. Географические требования и противоречия

# География и противоречия

## G01 — Skyfall / Adrenaline Peak

Предварительный major-attractions spatial plan: Skyfall верх/центр, Cyclone запад/центр, Thunder север. Site plan: Skyfall верх/запад, Velocity верх/восток, Cyclone середина/запад, Thunder середина/восток, Eagle север.

Решение аудита: Открыто. Не назначать точные взаимные позиции в фотографии без утверждённого аннотированного плана.

Источники: docs/aqua-paradise-major-attractions-spatial-plan.md §Adrenaline; docs/island/aqua-paradise-adrenaline-peak-site-plan.md

## G02 — Atlantis Realm

Предварительный план помещает Crystal западнее, Tidal в центре; district site plan Crystal восток, Tidal запад.

Решение аудита: Открыто. Объектные кадры без спорных соседей; общий план отложен.

Источники: docs/aqua-paradise-major-attractions-spatial-plan.md §Atlantis; docs/island/aqua-paradise-atlantis-realm-site-plan.md

## G03 — Отель

Старые упоминания первой половины острова против удалённого северо-западного побережья.

Решение аудита: Разрешено ЯВНОЙ поправкой site plan: северо-запад. Старый текст не применять; повторно вопрос о месте отеля не нужен.

Источники: docs/master/project-bible.md; docs/pages/hotel.md §7; docs/island/aqua-paradise-grand-hotel-site-plan.md §Location

## G04 — Paradise Loop

Концептуальный мастер-план/ранний граф: 9 кандидатных остановок, отель/Little; действующие требования и planner: 8, Eden присутствует, отеля/Little нет.

Решение аудита: Открыто для фото трассы/системы. Деталь остановки возможна после референса; не изображать кольцо и все остановки. Не считать старые графы строительными путями.

Источники: docs/island/aqua-paradise-island-masterplan.md; docs/island/aqua-paradise-geography-model.md; docs/master/website-requirements.md §7. 7. 12; src/PlannerPage.tsx

## G05 — Ocean Wings

Visit упоминает две ветки; Bible непрерывную связь с материком, конфигурация технически не закреплена.

Решение аудита: Нужен транспортный референс; число линий, опор, кабины/терминалы не домысливать.

Источники: src/VisitPage.tsx; docs/master/project-bible.md; docs/pages/visit.md

## G06 — Sunset Lounge

Особый brief требует террасу справа в кадре, слева на аннотированном геоплане; сам нужный аннотированный ракурс в изученных файлах не найден.

Решение аудита: Блокировать APR-PHOTO-039 до предоставления исходного плана с направлением камеры. Не зеркалить остров.

Источники: docs/design/premium-redesign-brief.md §4

## G07 — Карта

Документы заявляют готовую SVG /map, но App не импортирует IslandMap и не имеет case #/map. Браузер открывает HomePage.

Решение аудита: Факт текущей ветки; не новый запрос на исправление. Фотослотов карты 0. Последний navigation revision исключает растровые карты/фотоплитки.

Источники: src/App.tsx:renderPage; docs/map/luxury-cartography.md §Navigation revision

## G08 — Midnight Obsidian и ранние фотопланы

Ранний design brief светлый Tropical Luxury, Hero фото и полноэкранные world photos. Текущий утверждённый Midnight: Hero display:none, worlds transparent поверх единого художественный фон.

Решение аудита: Не считать старый brief разрешением перекрыть фон. 10 кодовых состояний интеграционно остановлены; ещё Hero hotel/Visit и иконки требуют решения.

Источники: src/midnight-obsidian.css:23, 45; docs/design/premium-redesign-brief.md

## G09 — Горки Ocean / Skyfall / Crystal

Старое intro уводит из горки в открытое море; UI Skyfall допускает двусмысленное «падение в капсуле»; Crystal легко перепутать с пешеходным океанариумом.

Решение аудита: Канонические ограничения фиксированы: только инженерные финиши, неподвижная стартовая капсула, двухместный водный канал внутри акрилового туннеля с отдельной аквариумной водой. Не иллюстрировать опасные/несуществующие трактовки.

Источники: docs/master/website-requirements.md §7. 7. 5–7; src/data/attractions.ts; docs/pages/homepage.md §4

## G10 — Отель: amenities и планировки

Runtime указывает 2/3 спальни, кинотеатр, дворецкого, бассейн OceanViewVilla; текст страницы признаёт точные параметры неутверждёнными, site plan подтверждает частные бассейны Royal.

Решение аудита: Категории 7 обязательны как медиасостояния. Точную планировку/спорные удобства не визуализировать до подтверждения. Нет оснований утверждать площадь номера.

Источники: src/HotelPage.tsx:categories; docs/pages/hotel.md; docs/island/aqua-paradise-grand-hotel-site-plan.md

## G11 — Azure / Marina / морская природа

Ocean view Azure заявлен, линия визирования неизвестна; Marina предварительно у отеля, точный причал не задан; Coral Discovery не утверждает видовой список и рифовый профиль.

Решение аудита: Не выдумывать морской вид через остров, пирс в произвольной бухте, коралловый биом/животных. Аквариум Crystal не заменять диким рифом.

Источники: docs/master/website-requirements.md §7. 7. 7, 11; docs/master/project-bible.md; district site plans

## G12 — Мини-планировщик главной

Сценарий только «Адреналин» даёт Tidal Drop в позиции «Вечер», хотя работает до 18; одинаковые объекты могут попадать в разные периоды.

Решение аудита: Не генерировать ночную работающую горку ради подписи. Периоды — шаблоны, фото привязать к объекту при будущем внедрении; исправление логики вне аудита.

Источники: src/App.tsx:285–310; docs/master/website-requirements.md §7. 7. 7

## G13 — Названия и старые объекты

Bible содержит ранние Vertical Rush/Aqua Racers/Twin Thunder, старые детские/пиратские названия, Whispering Falls в другом контексте.

Решение аудита: Канон названий/правил — website-requirements; не производить дополнительные объекты из старых имён. Paradise Dining отель не равен Food Hall/Azure Market.

Источники: docs/master/project-bible.md; docs/master/website-requirements.md §7. 7. 3–11

## G14 — Пропорции из раннего brief

Home ride3:4, миниплан 4:5 и широкий modal из базового CSS не соответствуют каскаду текущей реализации.

Решение аудита: Использовать фактические измерения: home ride меняет пропорции, mini почти квадрат, modal desktop вертикальная колонка слева. Ничего не исправлено в CSS.

Источники: src/index.css; src/midnight-obsidian.css; evidence/dynamic-states.json

## G15 — Геометрическая точность и разные версии

600 га — проектный бюджет; сеткаv0. 4 даёт 600. 04 га вследствие дискретизации. Архивные полигоны могут быть несвязными/непригодными; новые SVG координаты условные.

Решение аудита: Не выдавать растровые ячейки/старые точки/пиксели иллюстрации за топосъёмку, высоты и инженерные дистанции. Это не основание для фотореалистичной точной аэрофотографии.

Источники: docs/source-of-truth.md; docs/aqua-paradise-map-readiness-v0. 4.md; docs/archive/data/*

## G16 — Порядок главной / intro

В коде About→Attractions→Worlds, ранний blueprint About→Worlds→Attractions. Cinematic intro отложено; latest homepage прямо без intro.

Решение аудита: Зафиксировать, не переставлять блоки и не планировать видео в рамках фотокаталога.

Источники: src/App.tsx:HomePage; docs/pages/homepage.md §§2, 4; docs/master/aqua-paradise-master-blueprint.md

# Ограничения по территориям

## Ocean Bay

Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

## Adrenaline Peak

Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования.

## Eden Gardens

Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь.

## Hotel

Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

## Atlantis Realm

Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован.

## Pirate's Cove

Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров.

## Little Paradise

Юго-восточная внутренняя семейная зона 42 га. Разделённые возрастные площадки, мелководье, тень, безопасные дорожки. Не миниатюрная территория всего курорта.

## Serenity Spa

Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness.

## Paradise Market

25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования.

## Paradise Boulevard

35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока.

## Transport

Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены.

## Island

Один остров 600 га суши (6 км²), неправильная вытянутая капля, узкий юг; не архипелаг. Высоты, точные контуры сооружений, солнечная ориентация и морская батиметрия не утверждены.

Бюджет: Boulevard35+Market25+Eden60+Little42+Spa35+Pirate52+Atlantis60+Peak65+Ocean Bay52=426 га; Hotel52+общая инфраструктура 52+природные буферы 70=174 га; всего 600 га. Морская акватория не входит в 52 га суши Ocean Bay. Высоты, точный угол береговой линии/камеры, видимость между объектами, морские коридоры и солнечный азимут требуют референсов.

## Г. План генерации

# План производства и переиспользования

План ничего не запускает. Порядок основан на текущих фотоместах; технические и географические стопы из 04/07 действуют на любом этапе.

0. Утвердить визуальный паспорт единого острова, объектные референсы и решаемые противоречия. Зафиксировать master-reference каждого сооружения/номера; производные кадры не должны каждый раз заново выдумывать архитектуру. Сначала согласовать кадрировочный тест, затем серийное производство.
1. Главная, первая очередь:001 Ocean Bay/Beach, 002 Velocity/Peak, 003 Emerald/Eden, 004 Hotel/Infinity. Это четыре полароида; 001/002/003 повторятся как панорамы зон, 004 в отеле. Затем 011 Skyfall, 012 Poseidon, 006 Stormbreaker, 013 Crystal — четыре карточки карусели. Итого 8 уникальных первичных кадров. Они требуют объектных референсов, а не свободного изобретения конструкций.
2. Главная, мини-планировщик:005 Tidal Kingdom, 016 Eagle и 023 Tidal Drop дополняют эти 8 до 11. Skyfall/Velocity/Crystal уже есть. Не создавать три независимые фотографии «утро/день/вечер»: это динамические позиции шести объектов. Не генерировать ночной Tidal Drop.
3. Девять зон:007 Rainbow, 008 Lotus, 009 Square, 010 Palm плюс 001/002/003/005/006 дают 9 обзорных мастеров. Всего 15 уникальных для всех сюжетов главной включая скрытые/прозрачные сцены. Сами фоновые сцены Hero/Worlds не активировать без решения о совместимости с Midnight. Их сверхузкие mobile-кропы могут потребовать отдельного ракурса; это условие, не утверждённое увеличение бюджета.
4. Остальной каталог 22 аттракционов:014–015, 017–028 (кроме уже готовых 016/023). По одному объектному мастеру на карточку, модальное окно, будущую фотокарточку зоны и planner thumbnail. Сначала сравнить с уже утверждёнными соседями, затем кадрировать.
5. Отель 029–038:7 категорий и Kids/Wellness/Dining. Pool004 уже есть. Делать только после интерьерного паспорта; семь категорий должны различаться, а повторные виды одной категории совпадать. Не выдавать выдуманную планировку за утверждённую.
6. Остальные текущие маршрутные объекты 041–049, 051–055. Несмотря на маленькие 48px-миниатюры, те же мастера пригодятся для документированных мини-галерей и активностей зон. Нет необходимости отдельно генерировать каждый thumbnail. Текущее UI покрытие —52 исходника, если повторное кадрирование удаётся.
7. Документированные дополнения 039/040/050/056–059:7 новых сюжетов, только после соответствующих уточнений. Покрывают недостающие активности, мини-галереи и Visit. Итог документированного пакета 59 уникальных. Hero hotel использует 004; Hero Visit использует 056. Нужна проверка экстремального кадрирования, это не обещание автоматически сохранить любую композицию.
8. Опциональные 060–064 — за пределами обязательного бюджета. 062 не генерировать до географического паспорта; 063 не требует менять Tickets; 061 только отдельное тихое вечернее состояние тех же руин; 064 только если одобрена дополнительная галерея. Внедрение любых новых блоков отдельно.
9. Приёмка каждого мастера: география→конструкция/безопасность→фотореализм 100%→все целевые кропы→общий стиль серии. Сверять одинаковые объекты попарно. Для многополосных горок/корабля не резать узнаваемую конструкцию ради портрета. При неудаче переиспользования — согласовать дополнительный ракурс того же объекта; не outpainting, не зеркалирование и не удаление деталей.
10. Только следующий отдельно разрешённый этап: внедрение без изменения размеров и порядка блоков, responsive производные, проверка сайта и сборки. Этот аудит не выполняет ни генерацию, ни интеграцию.

Экономия:125 логических текущих мест→52 мастера, 73 повторных использования в принятой модели. 205 мест полного минимального документированного объёма→59 мастеров, 146 повторных использований. Это оценка при условии проверку кадрирования, не доказанная нижняя граница. Если общие establishing/crop-мастера Velocity/Tidal/Stormbreaker/Rainbow теряют смысл объекта, могут потребоваться до 4 дополнительных establishing-ракурсов. Скрытые полноэкранные mobile-сцены особенно рискованны; не расширять бюджет автоматически.


## Д. Универсальный фотографический стандарт

# Универсальный фотографический стандарт

Все будущие изображения — иллюзия профессиональной архитектурной и курортной фотографии реального единого острова. Не CGI, игровые сцены, концепт-арт или художественные фоны. Текущий аудит ничего не генерирует.

1. Перед серией утвердить единый визуальный паспорт: карта/локальные site plans, архитектурные референсы, материалы, растительность и конструкция каждого аттракциона. Из текста нельзя достоверно восстановить несуществующий рабочий проект. Известное фиксировать; неизвестное оставлять за кадром или блокировать.
2. Натуральный камень, дерево и правдоподобная курортная архитектура; тематические руины Atlantis и Pirate — построенные декорации с реальными опорами и проходами. Не превращать курорт в фантастические древние города/сверхвысокие башни. Остров 600 га, не компактный парк на скале.
3. Оптика: обычно 24–35 мм для архитектуры/пространства, 35–50 мм для деталей, горизонт ровный, вертикали исправлены. Избегать fisheye, ультрашироких деформаций, невозможных камер внутри стен. Вид с возвышения означает доступную площадку; аэроракурс требует отдельной проверки географии.
4. Единый естественный баланс белого и умеренный контраст. Глубокие зелёные/океанские оттенки и тёплые натуральные акценты сочетаются с Midnight Obsidian; не красить все фотографии в чёрный и золото. Не рисовать золотые прожилки фона в море/зданиях. Не менять семь утверждённых художественных фонов.
5. Живая вода с масштабными волнами и отражениями, без пластика, стеклянного океана, лишних лестниц/бортиков и невозможной гидравлики. Свет и тени едины в кадре. Никаких искусственных солнечных дисков, чрезмерного HDR, ореолов, кислотной бирюзы, неоновых растений. Не утверждать географический закат без положения камеры и солнца.
6. Люди — небольшие естественные группы для масштаба, корректная анатомия и безопасность. Не помещать маленьких детей на взрослые горки. Спасжилеты в морских активностях, инструкторы где нужны. Сопровождение/возраст/рост — из website-requirements §7. 7; не домысливать. Для интерьеров и общих видов допустим пустой кадр, если это не скрывает требуемую безопасность.
7. Базовый мастер 6144×4608, 4:3, sRGB — техническая цель. Если генератор даёт меньше пикселей, фиксировать настоящий размер, не обещать нативные 6K после обычного ресайза. Для ограниченных карточек реально достаточно 1600–2400 px. Прирост разрешения не создаёт инженерную достоверность.
8. Один мастер → самостоятельные кропы: catalog 1000×625 (8:5), polaroid до 1200×1200, home carousel до 900×800 с отдельным mobile-кропом ~680×780, modal desktop до 1242×1062 и mobile до 1023×435, zones до 1600×1400, hotel до 1600×1300, planner 144×144. Полноэкранные фото до 2560 px шириной требуют отдельного согласования из-за художественного фона и узких mobile-кропов.
9. Для мастера 4:3 при cover 16:9 остаётся 75% высоты; при 3:4 остаётся 56. 25% ширины; при 9:16 только 42. 19% ширины. Общее безопасное ядро 56%×75% годится для 16:9 и 3:4, но НЕ гарантирует 9:16. На мобильном подбирать индивидуальный focal point; не растягивать изображение неравномерно. Если корабль/шесть дорожек не помещаются, дополнительный ракурс согласовать отдельно; не удалять объекты и не достраивать их outpainting ради экономии.
10. Будущее внедрение: неизменные размеры существующих контейнеров, object-fit: cover, responsive srcset/sizes, width/height, eager только реальному LCP, lazy остальным, осмысленный alt или alt="" у декоративного дубля. Сейчас ничего из этого не меняется. Смысловые изображения нельзя навсегда скрыть aria-hidden как нынешние заглушки.
11. WebP/AVIF производные после визуального контроля; качество ориентировочно WebP 80–88, не фиксированное обещание веса. Малые карточки стремиться 60–180 КБ, крупные 150–400 КБ, полноэкранные 350–700 КБ при приемлемой детализации. Водная рябь/листва могут требовать больше. Мастера отдельно от web; EXIF/метаданные и происхождение учесть. Не использовать внешние стоковые зависимости.
12. Приёмка: сравнить все повторные виды одного объекта; проверка соседей/берега, шести и двух дорожек, вместимости плотов/капсул, двух водных сред Crystal, безопасных финишей Ocean; проверка лиц, рук, перил, ступеней, вывесок, отражений, швов текстур. Смотреть 100%, затем реальные контейнеры 375, 768, 1366, 1920, 2560 при DPR1/2/3 и zoom80/100/125/150. Этот аудит измерил текущие заглушки; качество будущих изображений ещё не проверено.

Шаблон промпта: «Профессиональная ультрафотореалистичная курортная фотография [ID/объект]. [Содержание]. [Камера/ракурс]. [Время/свет]. [Подтверждённая география и исключённые соседи]. Приложенные референсы обязательны; сохранить их геометрию и архитектуру. [Мастер/кропы]. Натуральные материалы, реалистичная вода/масштаб/безопасность. Без CGI, фантазийной перестройки, новых объектов, логотипов и текста». Специальные полные версии находятся в briefs/.


## Е. Неустранимые по документации вопросы

# Вопросы, которые не разрешаются имеющейся документацией

Вопросы ниже — входные данные для будущего производства, не запрос разрешения на уже выполненный аудит. Они сгруппированы по зависимости; не требуется заново утверждать известное северо-западное положение отеля или девять зон.

1. Какой единый аннотированный island/site plan считать визуальным референсом будущих фотографий при противоречиях G01/G02? Нужны финальные взаимные позиции Skyfall/Velocity/Cyclone/Thunder и Crystal/Tidal, рельеф, видовые направления, масштабы сооружений. До ответа — локальные кадры без спорных соседей; аэрофотография 062 заблокирована.
2. Где исходный аннотированный мастер-план Sunset Lounge с точкой/направлением камеры (терраса справа в снимке, слева на плане)? Какая линия берега видна? Это блокирует 039.
3. Какие референсы утверждают физический облик/цвета конструкций горок, высоты, опоры, водные каналы и финишные бассейны, точную форму двухместной капсулы Crystal? Без них есть сюжетное ТЗ, но нет честной гарантии точной конструкции. Нельзя заменять это свободным дизайнерским решением генератора.
4. Какие архитектурные/интерьерные референсы и планы семи категорий отеля утверждены? Подтверждены ли private pool Ocean View Villa, число спален Family/Royal, ванна с видом, кинотеатр и остальные удобства, перечисленные в коде? Как выглядят корпус, Kids Club, Wellness и Dining? 029–038 нуждаются в визуальном паспорте; не обязательно показывать все спорные удобства.
5. Какая конфигурация Ocean Wings утверждена (ветки, кабина, терминалы, коридор над морем), какие типы парома/катера/яхт и где именно Marina относительно северо-западной бухты? Есть ли подтверждённые типы шаттлов и остановок? Нужны референсы 056–060, не выдуманные технические характеристики.
6. Как согласовать концептуальный Loop 9 и текущий Loop 8, остановку отеля/Little и периферийный доступ Eden? Нужен ли вообще обзор трассы в фото? До решения — никаких маршрутных панорам.
7. Какой подтверждённый вид открывается с Azure Terrace и Eagle’s Lookout, какие вершины/бухты и сооружения допустимы в дальнем плане? Где биологически подтверждённая зона Coral Discovery и какие виды/риф допустимы? До ответа — ограниченная даль/локальный сюжет, без выдуманного рифа и панорамы через чужую зону.
8. Какая схема внедрения фотографий совместима с утверждённым Midnight Obsidian для скрытого Hero главной, прозрачных 9 worlds, будущих Hero hotel/Visit и заменяемых золотых иконок Visit? Сохранение текущего фона имеет приоритет; наличие старого фотобриф не считается разрешением на такую замену. Нужно ли реализовывать document-only галереи/фотокарточки или оставить нынешнюю структуру? Это вопрос следующего этапа, не повод менять сайт сейчас.

Дополнительные точные параметры требуются только если их планируется показывать: местная солнечная ориентация/дата для заката, планы кабин/причалов/кабаны 063. Общие дневные локальные кадры не требуют придумывать эти данные.


## Полные индивидуальные технические задания

### APR-PHOTO-001 — Ocean Bay / Paradise Beach

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Естественная дуга общественного пляжа, спокойная вода, растительный берег, небольшие группы людей; без гостиничных вилл.

**Камера и композиция:** С берега или невысокой общественной площадки вдоль дуги бухты, пляж центральный, море справа или слева только после проверки направления.

**Время и освещение:** 09–11, мягкий естественный свет.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии. Пляж 09–22, контролируемое купание 09–19; никаких купальщиков в море ночью.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Hero (home.hero.ocean-bay); home: О курорте — полароид (Ocean Bay); home: Девять миров — полноэкранная сцена (Ocean Bay); zones: Главная панорама зоны (Ocean Bay); home: Фото-миниатюра dock (документ) (Ocean Bay); zones: Развлечения — фотокарточка (документ) (Ocean Bay); planner: Дополнение канонического каталога (paradise-beach).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-001 | home / Hero | home.hero.ocean-bay | Условно 16:9; mobile 9:16 | current |
| APR-SLOT-002 | home / О курорте — полароид | Ocean Bay | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. | current |
| APR-SLOT-006 | home / Девять миров — полноэкранная сцена | Ocean Bay | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-022 | zones / Главная панорама зоны | Ocean Bay | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-126 | home / Фото-миниатюра dock (документ) | Ocean Bay | 1:1 | document |
| APR-SLOT-194 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |
| APR-SLOT-202 | planner / Дополнение канонического каталога | paradise-beach | 1:1 | document |

**Источники:** [docs/master/website-requirements.md:1091](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1091); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:11](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L11); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Ocean Bay / Paradise Beach. Сюжет: Естественная дуга общественного пляжа, спокойная вода, растительный берег, небольшие группы людей; без гостиничных вилл. Ракурс: С берега или невысокой общественной площадки вдоль дуги бухты, пляж центральный, море справа или слева только после проверки направления. Освещение: 09–11, мягкий естественный свет. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-002 — Adrenaline Peak / Velocity Racers

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Шесть параллельных гоночных дорожек, безопасные старты и финиши, растительный склон.

**Камера и композиция:** Умеренно приподнятый боковой 3/4, все шесть дорожек читаются; без соседних неподтверждённых горок.

**Время и освещение:** 10–12, ясный рассеянный свет.

**География:** Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования.

**Безопасность и режим:** Runtime: от 12 лет; рост 140 см; часы 10:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Все шесть дорожек должны оставаться различимыми. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: О курорте — полароид (Adrenaline Peak); home: Девять миров — полноэкранная сцена (Adrenaline Peak); home: Мини-планировщик — шаблон (home.planner.afternoon); zones: Главная панорама зоны (Adrenaline Peak); attractions: Карточка каталога (Velocity Racers); attractions: Заголовок модального окна (Velocity Racers); planner: Маршрут — миниатюра остановки (Velocity Racers); home: Фото-миниатюра dock (документ) (Adrenaline Peak); zones: Развлечения — фотокарточка (документ) (Adrenaline Peak); home: динамическая рекомендация мини-планировщика; шесть достижимых объектов, см. evidence/mini-planner-scenarios.json.

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-003 | home / О курорте — полароид | Adrenaline Peak | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. | current |
| APR-SLOT-007 | home / Девять миров — полноэкранная сцена | Adrenaline Peak | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-020 | home / Мини-планировщик — шаблон | home.planner.afternoon | Phone около 76×67; laptop76×55; wide76×67. Не портретный 4:5. | current |
| APR-SLOT-023 | zones / Главная панорама зоны | Adrenaline Peak | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-033 | attractions / Карточка каталога | Velocity Racers | 8:5 / 16:10 | current |
| APR-SLOT-034 | attractions / Заголовок модального окна | Velocity Racers | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-100 | planner / Маршрут — миниатюра остановки | Velocity Racers | 1:1, 48×48 CSS px | current |
| APR-SLOT-127 | home / Фото-миниатюра dock (документ) | Adrenaline Peak | 1:1 | document |
| APR-SLOT-154 | zones / Развлечения — фотокарточка (документ) | Adrenaline Peak | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1011](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1011); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-adrenaline-peak-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-adrenaline-peak-site-plan.md#L14); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Adrenaline Peak / Velocity Racers. Сюжет: Шесть параллельных гоночных дорожек, безопасные старты и финиши, растительный склон. Ракурс: Умеренно приподнятый боковой 3/4, все шесть дорожек читаются; без соседних неподтверждённых горок. Освещение: 10–12, ясный рассеянный свет. География: Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Все шесть дорожек должны оставаться различимыми. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-003 — Eden Gardens / Emerald Walk

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Широкая ботаническая прогулочная ось, естественные растения и натуральное мощение, люди для масштаба.

**Камера и композиция:** На уровне человека вдоль аллеи, центральная перспектива с запасом сверху и по бокам.

**Время и освещение:** 09–11, фильтрованный свет сквозь кроны.

**География:** Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–21:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: О курорте — полароид (Eden Gardens); home: Девять миров — полноэкранная сцена (Eden Gardens); zones: Главная панорама зоны (Eden Gardens); planner: Маршрут — миниатюра остановки (Emerald Walk); home: Фото-миниатюра dock (документ) (Eden Gardens); zones: Развлечения — фотокарточка (документ) (Eden Gardens).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-004 | home / О курорте — полароид | Eden Gardens | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. | current |
| APR-SLOT-008 | home / Девять миров — полноэкранная сцена | Eden Gardens | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-024 | zones / Главная панорама зоны | Eden Gardens | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-125 | planner / Маршрут — миниатюра остановки | Emerald Walk | 1:1, 48×48 CSS px | current |
| APR-SLOT-128 | home / Фото-миниатюра dock (документ) | Eden Gardens | 1:1 | document |
| APR-SLOT-175 | zones / Развлечения — фотокарточка (документ) | Eden Gardens | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1294](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1294); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-eden-gardens-site-plan.md:10](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-eden-gardens-site-plan.md#L10); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Eden Gardens / Emerald Walk. Сюжет: Широкая ботаническая прогулочная ось, естественные растения и натуральное мощение, люди для масштаба. Ракурс: На уровне человека вдоль аллеи, центральная перспектива с запасом сверху и по бокам. Освещение: 09–11, фильтрованный свет сквозь кроны. География: Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-004 — Paradise Grand Hotel / Grand Infinity Pool

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Infinity Pool на переднем плане, террасный гостиничный корпус и растительность позади, намёк на частную бухту.

**Камера и композиция:** С доступной гостиничной террасы, 3/4 через воду на корпус; не обзор всего острова.

**Время и освещение:** Поздний день, мягкий тёплый свет без выдуманного направления заката.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: О курорте — полароид (Hotel); hotel: Впечатления отеля (pool); hotel: Hero (документ) (hotel overview).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-005 | home / О курорте — полароид | Hotel | Client box phone159×124; laptop294×301; wide380×370; поворот карточки отдельно от кропа. | current |
| APR-SLOT-082 | hotel / Впечатления отеля | pool | По фактическому feature-контейнеру, см. dynamic-states.json | current |
| APR-SLOT-196 | hotel / Hero (документ) | hotel overview | 16:9 / mobile 9:16 | document |

**Источники:** [docs/master/website-requirements.md:1208](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1208); [docs/island/aqua-paradise-island-masterplan.md:40](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L40); [docs/island/aqua-paradise-grand-hotel-site-plan.md:15](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L15); [docs/pages/hotel.md:46](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L46). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Paradise Grand Hotel / Grand Infinity Pool. Сюжет: Infinity Pool на переднем плане, террасный гостиничный корпус и растительность позади, намёк на частную бухту. Ракурс: С доступной гостиничной террасы, 3/4 через воду на корпус; не обзор всего острова. Освещение: Поздний день, мягкий тёплый свет без выдуманного направления заката. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-005 — Atlantis Realm / Tidal Kingdom

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Волновой бассейн в окружении тематических каменных руин, широкие борта и контролируемая рекреация.

**Камера и композиция:** От борта по диагонали бассейна; не показывать спорное положение соседей.

**Время и освещение:** 11–15, дневной свет.

**География:** Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован.

**Безопасность и режим:** Runtime: от 6 лет; рост 110 см; часы 10:00–21:00. Сопровождение: True, порог 10. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки. Волны только до 19:00, после 19 вода спокойная.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Девять миров — полноэкранная сцена (Atlantis Realm); zones: Главная панорама зоны (Atlantis Realm); attractions: Карточка каталога (Tidal Kingdom); attractions: Заголовок модального окна (Tidal Kingdom); planner: Маршрут — миниатюра остановки (Tidal Kingdom); home: Фото-миниатюра dock (документ) (Atlantis Realm); zones: Развлечения — фотокарточка (документ) (Atlantis Realm); home: динамическая рекомендация мини-планировщика; шесть достижимых объектов, см. evidence/mini-planner-scenarios.json.

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-010 | home / Девять миров — полноэкранная сцена | Atlantis Realm | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-026 | zones / Главная панорама зоны | Atlantis Realm | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-043 | attractions / Карточка каталога | Tidal Kingdom | 8:5 / 16:10 | current |
| APR-SLOT-044 | attractions / Заголовок модального окна | Tidal Kingdom | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-105 | planner / Маршрут — миниатюра остановки | Tidal Kingdom | 1:1, 48×48 CSS px | current |
| APR-SLOT-130 | home / Фото-миниатюра dock (документ) | Atlantis Realm | 1:1 | document |
| APR-SLOT-159 | zones / Развлечения — фотокарточка (документ) | Atlantis Realm | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:939](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L939); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-atlantis-realm-site-plan.md:13](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-atlantis-realm-site-plan.md#L13); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Atlantis Realm / Tidal Kingdom. Сюжет: Волновой бассейн в окружении тематических каменных руин, широкие борта и контролируемая рекреация. Ракурс: От борта по диагонали бассейна; не показывать спорное положение соседей. Освещение: 11–15, дневной свет. География: Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-006 — Pirate’s Cove / Stormbreaker

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Многоуровневый игровой корабль, водомёты, мостики, горки и опрокидывающаяся бочка.

**Камера и композиция:** Наземный 3/4 с достаточным пространством вокруг корабля, корабль в центральном вертикальном ядре.

**Время и освещение:** 10–15, мягкий дневной свет.

**География:** Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров.

**Безопасность и режим:** Runtime: от 6 лет; рост 110 см; часы 10:00–20:00. Сопровождение: True, порог 10. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки. Основные горки до 19:00, вечер только назначенные игровые элементы.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить полный многоуровневый игровой силуэт корабля. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Девять миров — полноэкранная сцена (Pirate's Cove); home: Карусель аттракционов (stormbreaker); zones: Главная панорама зоны (Pirate's Cove); attractions: Карточка каталога (Stormbreaker); attractions: Заголовок модального окна (Stormbreaker); planner: Маршрут — миниатюра остановки (Stormbreaker); home: Фото-миниатюра dock (документ) (Pirate's Cove); zones: Развлечения — фотокарточка (документ) (Pirate's Cove).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-009 | home / Девять миров — полноэкранная сцена | Pirate's Cove | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-017 | home / Карусель аттракционов | stormbreaker | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. | current |
| APR-SLOT-025 | zones / Главная панорама зоны | Pirate's Cove | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-049 | attractions / Карточка каталога | Stormbreaker | 8:5 / 16:10 | current |
| APR-SLOT-050 | attractions / Заголовок модального окна | Stormbreaker | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-108 | planner / Маршрут — миниатюра остановки | Stormbreaker | 1:1, 48×48 CSS px | current |
| APR-SLOT-129 | home / Фото-миниатюра dock (документ) | Pirate's Cove | 1:1 | document |
| APR-SLOT-162 | zones / Развлечения — фотокарточка (документ) | Pirate's Cove | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:880](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L880); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-pirates-cove-site-plan.md:9](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-pirates-cove-site-plan.md#L9); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Pirate’s Cove / Stormbreaker. Сюжет: Многоуровневый игровой корабль, водомёты, мостики, горки и опрокидывающаяся бочка. Ракурс: Наземный 3/4 с достаточным пространством вокруг корабля, корабль в центральном вертикальном ядре. Освещение: 10–15, мягкий дневной свет. География: Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить полный многоуровневый игровой силуэт корабля. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-007 — Little Paradise / Rainbow Reef

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Невысокие детские горки и мелководные бассейны для 4–7 лет, сопровождающие взрослые.

**Камера и композиция:** На уровне взрослого с безопасного прохода, видны масштаб и контроль родителей.

**Время и освещение:** 10–12, мягкое солнце и тень.

**География:** Юго-восточная внутренняя семейная зона 42 га. Разделённые возрастные площадки, мелководье, тень, безопасные дорожки. Не миниатюрная территория всего курорта.

**Безопасность и режим:** Runtime: от 4 лет; рост 90 см; часы 10:00–19:00. Сопровождение: True, порог 6. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Девять миров — полноэкранная сцена (Little Paradise); zones: Главная панорама зоны (Little Paradise); attractions: Карточка каталога (Rainbow Reef); attractions: Заголовок модального окна (Rainbow Reef); planner: Маршрут — миниатюра остановки (Rainbow Reef); home: Фото-миниатюра dock (документ) (Little Paradise); zones: Развлечения — фотокарточка (документ) (Little Paradise).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-011 | home / Девять миров — полноэкранная сцена | Little Paradise | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-027 | zones / Главная панорама зоны | Little Paradise | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-071 | attractions / Карточка каталога | Rainbow Reef | 8:5 / 16:10 | current |
| APR-SLOT-072 | attractions / Заголовок модального окна | Rainbow Reef | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-119 | planner / Маршрут — миниатюра остановки | Rainbow Reef | 1:1, 48×48 CSS px | current |
| APR-SLOT-131 | home / Фото-миниатюра dock (документ) | Little Paradise | 1:1 | document |
| APR-SLOT-173 | zones / Развлечения — фотокарточка (документ) | Little Paradise | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:836](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L836); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-little-paradise-site-plan.md:11](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-little-paradise-site-plan.md#L11); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Little Paradise / Rainbow Reef. Сюжет: Невысокие детские горки и мелководные бассейны для 4–7 лет, сопровождающие взрослые. Ракурс: На уровне взрослого с безопасного прохода, видны масштаб и контроль родителей. Освещение: 10–12, мягкое солнце и тень. География: Юго-восточная внутренняя семейная зона 42 га. Разделённые возрастные площадки, мелководье, тень, безопасные дорожки. Не миниатюрная территория всего курорта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-008 — Serenity Spa / Lotus Thermal Pools

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Тёплые термальные бассейны, натуральный камень, бамбук и спокойные посетители допустимого возраста.

**Камера и композиция:** С края настила низкий 3/4 через бассейны, без соседних зон в фоне.

**Время и освещение:** 09–11, мягкая дымка без фантастического свечения.

**География:** Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness.

**Безопасность и режим:** Runtime: от 12 лет; рост не задан; часы 09:00–21:00. Сопровождение: True, порог 16. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Девять миров — полноэкранная сцена (Serenity Spa); zones: Главная панорама зоны (Serenity Spa); planner: Маршрут — миниатюра остановки (Lotus Thermal Pools); home: Фото-миниатюра dock (документ) (Serenity Spa); zones: Развлечения — фотокарточка (документ) (Serenity Spa).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-012 | home / Девять миров — полноэкранная сцена | Serenity Spa | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-028 | zones / Главная панорама зоны | Serenity Spa | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-121 | planner / Маршрут — миниатюра остановки | Lotus Thermal Pools | 1:1, 48×48 CSS px | current |
| APR-SLOT-132 | home / Фото-миниатюра dock (документ) | Serenity Spa | 1:1 | document |
| APR-SLOT-180 | zones / Развлечения — фотокарточка (документ) | Serenity Spa | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1208](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1208); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-serenity-spa-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-serenity-spa-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Serenity Spa / Lotus Thermal Pools. Сюжет: Тёплые термальные бассейны, натуральный камень, бамбук и спокойные посетители допустимого возраста. Ракурс: С края настила низкий 3/4 через бассейны, без соседних зон в фоне. Освещение: 09–11, мягкая дымка без фантастического свечения. География: Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-009 — Paradise Market / Sunset Market Square

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Открытая рыночная площадь, торговые фасады и тень, пешеходный центральный маршрут.

**Камера и композиция:** С уровня человека через площадь с естественным уходом к северной оси; не показывать неподтверждённые моря за фасадами.

**Время и освещение:** 16–18, тёплый дневной свет.

**География:** 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–22:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Девять миров — полноэкранная сцена (Paradise Market); zones: Главная панорама зоны (Paradise Market); planner: Маршрут — миниатюра остановки (Sunset Market Square); home: Фото-миниатюра dock (документ) (Paradise Market); zones: Развлечения — фотокарточка (документ) (Paradise Market).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-013 | home / Девять миров — полноэкранная сцена | Paradise Market | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-029 | zones / Главная панорама зоны | Paradise Market | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-089 | planner / Маршрут — миниатюра остановки | Sunset Market Square | 1:1, 48×48 CSS px | current |
| APR-SLOT-133 | home / Фото-миниатюра dock (документ) | Paradise Market | 1:1 | document |
| APR-SLOT-185 | zones / Развлечения — фотокарточка (документ) | Paradise Market | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1468](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1468); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-market-site-plan.md:9](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-market-site-plan.md#L9); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Paradise Market / Sunset Market Square. Сюжет: Открытая рыночная площадь, торговые фасады и тень, пешеходный центральный маршрут. Ракурс: С уровня человека через площадь с естественным уходом к северной оси; не показывать неподтверждённые моря за фасадами. Освещение: 16–18, тёплый дневной свет. География: 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-010 — Paradise Boulevard / Palm Avenue

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Пальмовая пешеходная ось прибытия, курортные фасады и навигационное пространство без читаемых надписей.

**Камера и композиция:** С южного участка вдоль оси в сторону Market; дальний фон скрыт зеленью, без гостиницы у входа.

**Время и освещение:** 09–11, утренний свет.

**География:** 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–22:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Девять миров — полноэкранная сцена (Paradise Boulevard); zones: Главная панорама зоны (Paradise Boulevard); planner: Маршрут — миниатюра остановки (Palm Avenue (прогулка)); home: Фото-миниатюра dock (документ) (Paradise Boulevard); zones: Развлечения — фотокарточка (документ) (Paradise Boulevard).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-014 | home / Девять миров — полноэкранная сцена | Paradise Boulevard | Переменный экранный формат; 9:16 phone / 16:9 wide | current |
| APR-SLOT-030 | zones / Главная панорама зоны | Paradise Boulevard | Phone 339×285; wide около 746×615; не баннер 16:9 | current |
| APR-SLOT-087 | planner / Маршрут — миниатюра остановки | Palm Avenue (прогулка) | 1:1, 48×48 CSS px | current |
| APR-SLOT-134 | home / Фото-миниатюра dock (документ) | Paradise Boulevard | 1:1 | document |
| APR-SLOT-192 | zones / Развлечения — фотокарточка (документ) | Paradise Boulevard | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1368](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1368); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-boulevard-site-plan.md:7](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-boulevard-site-plan.md#L7); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Paradise Boulevard / Palm Avenue. Сюжет: Пальмовая пешеходная ось прибытия, курортные фасады и навигационное пространство без читаемых надписей. Ракурс: С южного участка вдоль оси в сторону Market; дальний фон скрыт зеленью, без гостиницы у входа. Освещение: 09–11, утренний свет. География: 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-011 — Skyfall

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Неподвижная одноместная стартовая капсула с прозрачной дверью и начало почти вертикальной горки; человек спускается внутри горки.

**Камера и композиция:** Средний архитектурный 3/4 с безопасной площадки, вертикальный старт в центральном ядре.

**Время и освещение:** 10–15, дневной свет.

**География:** Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования.

**Безопасность и режим:** Runtime: от 16 лет; рост 150 см; часы 10:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Карусель аттракционов (skyfall); home: Мини-планировщик — шаблон (home.planner.morning); attractions: Карточка каталога (Skyfall); attractions: Заголовок модального окна (Skyfall); planner: Маршрут — миниатюра остановки (Skyfall); zones: Обзор — мини-галерея деталей (Adrenaline Peak); zones: Развлечения — фотокарточка (документ) (Adrenaline Peak); home: динамическая рекомендация мини-планировщика; шесть достижимых объектов, см. evidence/mini-planner-scenarios.json.

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-015 | home / Карусель аттракционов | skyfall | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. | current |
| APR-SLOT-019 | home / Мини-планировщик — шаблон | home.planner.morning | Phone около 76×67; laptop76×55; wide76×67. Не портретный 4:5. | current |
| APR-SLOT-031 | attractions / Карточка каталога | Skyfall | 8:5 / 16:10 | current |
| APR-SLOT-032 | attractions / Заголовок модального окна | Skyfall | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-099 | planner / Маршрут — миниатюра остановки | Skyfall | 1:1, 48×48 CSS px | current |
| APR-SLOT-149 | zones / Обзор — мини-галерея деталей | Adrenaline Peak | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-153 | zones / Развлечения — фотокарточка (документ) | Adrenaline Peak | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1011](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1011); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-adrenaline-peak-site-plan.md:13](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-adrenaline-peak-site-plan.md#L13); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:45](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L45); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Skyfall. Сюжет: Неподвижная одноместная стартовая капсула с прозрачной дверью и начало почти вертикальной горки; человек спускается внутри горки. Ракурс: Средний архитектурный 3/4 с безопасной площадки, вертикальный старт в центральном ядре. Освещение: 10–15, дневной свет. География: Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-012 — Poseidon’s Descent

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Высокий храмовый старт и вход в закрытую горку с поворотами; каменная тематическая архитектура.

**Камера и композиция:** Невысокий ракурс с площадки, центральный храм и начало трубы, без выдуманного полного маршрута.

**Время и освещение:** 10–15, дневной свет.

**География:** Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован.

**Безопасность и режим:** Runtime: от 14 лет; рост 140 см; часы 10:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Карусель аттракционов (poseidons-descent); attractions: Карточка каталога (Poseidon's Descent); attractions: Заголовок модального окна (Poseidon's Descent); planner: Маршрут — миниатюра остановки (Poseidon's Descent); zones: Обзор — мини-галерея деталей (Atlantis Realm); zones: Развлечения — фотокарточка (документ) (Atlantis Realm).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-016 | home / Карусель аттракционов | poseidons-descent | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. | current |
| APR-SLOT-041 | attractions / Карточка каталога | Poseidon's Descent | 8:5 / 16:10 | current |
| APR-SLOT-042 | attractions / Заголовок модального окна | Poseidon's Descent | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-104 | planner / Маршрут — миниатюра остановки | Poseidon's Descent | 1:1, 48×48 CSS px | current |
| APR-SLOT-147 | zones / Обзор — мини-галерея деталей | Atlantis Realm | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-158 | zones / Развлечения — фотокарточка (документ) | Atlantis Realm | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:939](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L939); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-atlantis-realm-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-atlantis-realm-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Poseidon’s Descent. Сюжет: Высокий храмовый старт и вход в закрытую горку с поворотами; каменная тематическая архитектура. Ракурс: Невысокий ракурс с площадки, центральный храм и начало трубы, без выдуманного полного маршрута. Освещение: 10–15, дневной свет. География: Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-013 — Crystal Passage

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Двухместная плавающая капсула в отдельном водном канале внутри прозрачного акрилового туннеля; за стенкой отдельная аквариумная вода и рыбы.

**Камера и композиция:** Перспектива с разрешённой технической/посадочной точки у входа, не из несуществующей прогулочной галереи.

**Время и освещение:** 10–17, естественно правдоподобный отражённый свет, без неоновой синевы.

**География:** Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован.

**Безопасность и режим:** Runtime: от 4 лет; рост 100 см; часы 10:00–19:00. Сопровождение: True, порог 10. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Не обрезать посадочную капсулу, канал и границу двух водных сред. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Карусель аттракционов (crystal-passage); attractions: Карточка каталога (Crystal Passage); attractions: Заголовок модального окна (Crystal Passage); planner: Маршрут — миниатюра остановки (Crystal Passage); zones: Обзор — мини-галерея деталей (Atlantis Realm); zones: Развлечения — фотокарточка (документ) (Atlantis Realm); home: динамическая рекомендация мини-планировщика; шесть достижимых объектов, см. evidence/mini-planner-scenarios.json.

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-018 | home / Карусель аттракционов | crystal-passage | Phone 226×258 (~0. 88:1); laptop 292×213 (~1. 37:1); wide 292×262 (~1. 11:1). НЕ постоянные 3:4. | current |
| APR-SLOT-045 | attractions / Карточка каталога | Crystal Passage | 8:5 / 16:10 | current |
| APR-SLOT-046 | attractions / Заголовок модального окна | Crystal Passage | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-106 | planner / Маршрут — миниатюра остановки | Crystal Passage | 1:1, 48×48 CSS px | current |
| APR-SLOT-148 | zones / Обзор — мини-галерея деталей | Atlantis Realm | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-160 | zones / Развлечения — фотокарточка (документ) | Atlantis Realm | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:939](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L939); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-atlantis-realm-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-atlantis-realm-site-plan.md#L14); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Crystal Passage. Сюжет: Двухместная плавающая капсула в отдельном водном канале внутри прозрачного акрилового туннеля; за стенкой отдельная аквариумная вода и рыбы. Ракурс: Перспектива с разрешённой технической/посадочной точки у входа, не из несуществующей прогулочной галереи. Освещение: 10–17, естественно правдоподобный отражённый свет, без неоновой синевы. География: Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Не обрезать посадочную капсулу, канал и границу двух водных сред. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-014 — Cyclone Vortex

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Крупная воронка и семейный плот максимум на четыре человека, инженерно правдоподобная вода.

**Камера и композиция:** Боковой 3/4 с акцентом на форму воронки и плот, не добавлять пятых пассажиров.

**Время и освещение:** 10–15, дневной свет.

**География:** Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования.

**Безопасность и режим:** Runtime: от 14 лет; рост 140 см; часы 10:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Cyclone Vortex); attractions: Заголовок модального окна (Cyclone Vortex); planner: Маршрут — миниатюра остановки (Cyclone Vortex); zones: Обзор — мини-галерея деталей (Adrenaline Peak); zones: Развлечения — фотокарточка (документ) (Adrenaline Peak).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-035 | attractions / Карточка каталога | Cyclone Vortex | 8:5 / 16:10 | current |
| APR-SLOT-036 | attractions / Заголовок модального окна | Cyclone Vortex | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-101 | planner / Маршрут — миниатюра остановки | Cyclone Vortex | 1:1, 48×48 CSS px | current |
| APR-SLOT-150 | zones / Обзор — мини-галерея деталей | Adrenaline Peak | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-155 | zones / Развлечения — фотокарточка (документ) | Adrenaline Peak | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1011](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1011); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-adrenaline-peak-site-plan.md:15](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-adrenaline-peak-site-plan.md#L15); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Cyclone Vortex. Сюжет: Крупная воронка и семейный плот максимум на четыре человека, инженерно правдоподобная вода. Ракурс: Боковой 3/4 с акцентом на форму воронки и плот, не добавлять пятых пассажиров. Освещение: 10–15, дневной свет. География: Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-015 — Thunder Rush

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Закрытая/открытая система водных спусков и подъёмов, двухместный плот, поддерживающая конструкция.

**Камера и композиция:** Боковой средне-широкий кадр одного участка с читаемым подъёмом, не рисовать трассу по всему острову.

**Время и освещение:** 10–15, дневной свет.

**География:** Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования.

**Безопасность и режим:** Runtime: от 14 лет; рост 145 см; часы 10:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Thunder Rush); attractions: Заголовок модального окна (Thunder Rush); planner: Маршрут — миниатюра остановки (Thunder Rush); zones: Развлечения — фотокарточка (документ) (Adrenaline Peak).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-037 | attractions / Карточка каталога | Thunder Rush | 8:5 / 16:10 | current |
| APR-SLOT-038 | attractions / Заголовок модального окна | Thunder Rush | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-102 | planner / Маршрут — миниатюра остановки | Thunder Rush | 1:1, 48×48 CSS px | current |
| APR-SLOT-156 | zones / Развлечения — фотокарточка (документ) | Adrenaline Peak | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1011](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1011); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-adrenaline-peak-site-plan.md:16](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-adrenaline-peak-site-plan.md#L16); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Thunder Rush. Сюжет: Закрытая/открытая система водных спусков и подъёмов, двухместный плот, поддерживающая конструкция. Ракурс: Боковой средне-широкий кадр одного участка с читаемым подъёмом, не рисовать трассу по всему острову. Освещение: 10–15, дневной свет. География: Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Техническая/географическая проверка: нет окончательных конструктивных чертежей; широкие взаимные позиции спорны. Нужен согласованный объектный референс.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-016 — Eagle’s Lookout

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Панорамная северная смотровая терраса с ограждениями и растительным рельефом, даль мягко закрыта атмосферой.

**Камера и композиция:** С уровня гостя за ограждением, ведущая линия настила; без точной панорамы соседей до согласования.

**Время и освещение:** 16–18, мягкий предвечерний свет.

**География:** Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–20:00. Сопровождение: True, порог 12. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Мини-планировщик — шаблон (home.planner.evening); attractions: Карточка каталога (Eagle's Lookout); attractions: Заголовок модального окна (Eagle's Lookout); planner: Маршрут — миниатюра остановки (Eagle's Lookout); zones: Развлечения — фотокарточка (документ) (Adrenaline Peak); home: динамическая рекомендация мини-планировщика; шесть достижимых объектов, см. evidence/mini-planner-scenarios.json.

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-021 | home / Мини-планировщик — шаблон | home.planner.evening | Phone около 76×67; laptop76×55; wide76×67. Не портретный 4:5. | current |
| APR-SLOT-039 | attractions / Карточка каталога | Eagle's Lookout | 8:5 / 16:10 | current |
| APR-SLOT-040 | attractions / Заголовок модального окна | Eagle's Lookout | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-103 | planner / Маршрут — миниатюра остановки | Eagle's Lookout | 1:1, 48×48 CSS px | current |
| APR-SLOT-157 | zones / Развлечения — фотокарточка (документ) | Adrenaline Peak | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1011](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1011); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-adrenaline-peak-site-plan.md:9](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-adrenaline-peak-site-plan.md#L9); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Eagle’s Lookout. Сюжет: Панорамная северная смотровая терраса с ограждениями и растительным рельефом, даль мягко закрыта атмосферой. Ракурс: С уровня гостя за ограждением, ведущая линия настила; без точной панорамы соседей до согласования. Освещение: 16–18, мягкий предвечерний свет. География: Северная внутренняя возвышенность, 65 га. Не берег у южного входа. Точные взаимные позиции горок спорны; широкий многообъектный кадр отложить до согласования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-017 — Moonlit Ruins

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Спокойный бассейн, колонны, локальные водопады, мягкая вечерняя подсветка.

**Камера и композиция:** От борта под углом к колоннам, без активного волнового бассейна в фоне.

**Время и освещение:** 19–21, сумерки и практическая подсветка.

**География:** Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован.

**Безопасность и режим:** Runtime: от 8 лет; рост 120 см; часы 10:00–21:00. Сопровождение: True, порог 10. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Moonlit Ruins); attractions: Заголовок модального окна (Moonlit Ruins); planner: Маршрут — миниатюра остановки (Moonlit Ruins); zones: Развлечения — фотокарточка (документ) (Atlantis Realm).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-047 | attractions / Карточка каталога | Moonlit Ruins | 8:5 / 16:10 | current |
| APR-SLOT-048 | attractions / Заголовок модального окна | Moonlit Ruins | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-107 | planner / Маршрут — миниатюра остановки | Moonlit Ruins | 1:1, 48×48 CSS px | current |
| APR-SLOT-161 | zones / Развлечения — фотокарточка (документ) | Atlantis Realm | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:939](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L939); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-atlantis-realm-site-plan.md:15](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-atlantis-realm-site-plan.md#L15); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Moonlit Ruins. Сюжет: Спокойный бассейн, колонны, локальные водопады, мягкая вечерняя подсветка. Ракурс: От борта под углом к колоннам, без активного волнового бассейна в фоне. Освещение: 19–21, сумерки и практическая подсветка. География: Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить границы бассейна и архитектурный контекст. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-018 — Blackbeard’s Run

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Закрытая скоростная труба среди пиратской каменно-деревянной архитектуры, безопасный контролируемый выход.

**Камера и композиция:** Боковой наземный 3/4, выразительный вход/часть трубы и инженерные опоры.

**Время и освещение:** 10–15, дневной свет.

**География:** Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров.

**Безопасность и режим:** Runtime: от 12 лет; рост 140 см; часы 10:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Blackbeard's Run); attractions: Заголовок модального окна (Blackbeard's Run); planner: Маршрут — миниатюра остановки (Blackbeard's Run); zones: Обзор — мини-галерея деталей (Pirate's Cove); zones: Развлечения — фотокарточка (документ) (Pirate's Cove).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-051 | attractions / Карточка каталога | Blackbeard's Run | 8:5 / 16:10 | current |
| APR-SLOT-052 | attractions / Заголовок модального окна | Blackbeard's Run | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-109 | planner / Маршрут — миниатюра остановки | Blackbeard's Run | 1:1, 48×48 CSS px | current |
| APR-SLOT-145 | zones / Обзор — мини-галерея деталей | Pirate's Cove | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-163 | zones / Развлечения — фотокарточка (документ) | Pirate's Cove | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:880](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L880); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-pirates-cove-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-pirates-cove-site-plan.md#L14); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Blackbeard’s Run. Сюжет: Закрытая скоростная труба среди пиратской каменно-деревянной архитектуры, безопасный контролируемый выход. Ракурс: Боковой наземный 3/4, выразительный вход/часть трубы и инженерные опоры. Освещение: 10–15, дневной свет. География: Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-019 — Smuggler’s Passage

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Спокойный канал для кругов, тематические пещеры и водопады, не реальная морская контрабандная гавань.

**Камера и композиция:** С берега у входа в пещеру, ведущая линия канала в глубину.

**Время и освещение:** 10–17, мягкий свет у входа в пещеру.

**География:** Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров.

**Безопасность и режим:** Runtime: от 5 лет; рост 100 см; часы 10:00–19:00. Сопровождение: True, порог 10. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Smuggler's Passage); attractions: Заголовок модального окна (Smuggler's Passage); planner: Маршрут — миниатюра остановки (Smuggler's Passage); zones: Обзор — мини-галерея деталей (Pirate's Cove); zones: Развлечения — фотокарточка (документ) (Pirate's Cove).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-053 | attractions / Карточка каталога | Smuggler's Passage | 8:5 / 16:10 | current |
| APR-SLOT-054 | attractions / Заголовок модального окна | Smuggler's Passage | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-110 | planner / Маршрут — миниатюра остановки | Smuggler's Passage | 1:1, 48×48 CSS px | current |
| APR-SLOT-146 | zones / Обзор — мини-галерея деталей | Pirate's Cove | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-164 | zones / Развлечения — фотокарточка (документ) | Pirate's Cove | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:880](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L880); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-pirates-cove-site-plan.md:15](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-pirates-cove-site-plan.md#L15); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Smuggler’s Passage. Сюжет: Спокойный канал для кругов, тематические пещеры и водопады, не реальная морская контрабандная гавань. Ракурс: С берега у входа в пещеру, ведущая линия канала в глубину. Освещение: 10–17, мягкий свет у входа в пещеру. География: Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-020 — Cannonball Clash

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Водная битва из стационарных водяных пушек с игровыми укреплениями, без огнестрельного оружия.

**Камера и композиция:** На уровне взрослого по диагонали игровой площадки, видны две безопасные стороны.

**Время и освещение:** 10–17, дневной свет.

**География:** Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров.

**Безопасность и режим:** Runtime: от 7 лет; рост 120 см; часы 10:00–20:00. Сопровождение: True, порог 10. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Cannonball Clash); attractions: Заголовок модального окна (Cannonball Clash); planner: Маршрут — миниатюра остановки (Cannonball Clash); zones: Развлечения — фотокарточка (документ) (Pirate's Cove).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-055 | attractions / Карточка каталога | Cannonball Clash | 8:5 / 16:10 | current |
| APR-SLOT-056 | attractions / Заголовок модального окна | Cannonball Clash | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-111 | planner / Маршрут — миниатюра остановки | Cannonball Clash | 1:1, 48×48 CSS px | current |
| APR-SLOT-165 | zones / Развлечения — фотокарточка (документ) | Pirate's Cove | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:880](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L880); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-pirates-cove-site-plan.md:16](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-pirates-cove-site-plan.md#L16); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Cannonball Clash. Сюжет: Водная битва из стационарных водяных пушек с игровыми укреплениями, без огнестрельного оружия. Ракурс: На уровне взрослого по диагонали игровой площадки, видны две безопасные стороны. Освещение: 10–17, дневной свет. География: Северо-восточная внутренняя зона. Stormbreaker центральный якорь; корабельная древесина, канаты, каменные укрепления. Не настоящий океанский порт и не отдельный остров. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-021 — Ocean Rush

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Извилистая панорамная горка, завершение в управляемом приёмном бассейне/канале отдельно от моря.

**Камера и композиция:** Боковой 3/4, море только дальним фоном, приёмная чаша явно видна.

**Время и освещение:** 10–16, дневной свет.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Runtime: от 10 лет; рост 120 см; часы 10:00–18:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить старт и безопасный инженерный финиш в доказуемой композиции. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Ocean Rush); attractions: Заголовок модального окна (Ocean Rush); planner: Маршрут — миниатюра остановки (Ocean Rush); zones: Обзор — мини-галерея деталей (Ocean Bay); zones: Развлечения — фотокарточка (документ) (Ocean Bay).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-057 | attractions / Карточка каталога | Ocean Rush | 8:5 / 16:10 | current |
| APR-SLOT-058 | attractions / Заголовок модального окна | Ocean Rush | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-112 | planner / Маршрут — миниатюра остановки | Ocean Rush | 1:1, 48×48 CSS px | current |
| APR-SLOT-151 | zones / Обзор — мини-галерея деталей | Ocean Bay | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-166 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1085](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1085); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Ocean Rush. Сюжет: Извилистая панорамная горка, завершение в управляемом приёмном бассейне/канале отдельно от моря. Ракурс: Боковой 3/4, море только дальним фоном, приёмная чаша явно видна. Освещение: 10–16, дневной свет. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить старт и безопасный инженерный финиш в доказуемой композиции. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-022 — Blue Horizon

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Ровно две параллельные гоночные водные дорожки и отдельные контролируемые финиши.

**Камера и композиция:** Сбоку от финишей в сторону стартов, море не является приёмным бассейном.

**Время и освещение:** 10–16, дневной свет.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Runtime: от 12 лет; рост 140 см; часы 10:00–18:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить старт и безопасный инженерный финиш в доказуемой композиции. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Blue Horizon); attractions: Заголовок модального окна (Blue Horizon); planner: Маршрут — миниатюра остановки (Blue Horizon); zones: Развлечения — фотокарточка (документ) (Ocean Bay).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-059 | attractions / Карточка каталога | Blue Horizon | 8:5 / 16:10 | current |
| APR-SLOT-060 | attractions / Заголовок модального окна | Blue Horizon | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-113 | planner / Маршрут — миниатюра остановки | Blue Horizon | 1:1, 48×48 CSS px | current |
| APR-SLOT-167 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1151](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1151); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Blue Horizon. Сюжет: Ровно две параллельные гоночные водные дорожки и отдельные контролируемые финиши. Ракурс: Сбоку от финишей в сторону стартов, море не является приёмным бассейном. Освещение: 10–16, дневной свет. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить старт и безопасный инженерный финиш в доказуемой композиции. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-023 — Tidal Drop

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P0 — главная.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Высокий старт экстремальной горки с безопасным инженерным приёмом, отдельный от морского купания.

**Камера и композиция:** С безопасной площадки на башню и часть трассы; не копировать Skyfall и не додумывать точные метры.

**Время и освещение:** 10–16, только рабочие часы.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Runtime: от 16 лет; рост 150 см; часы 10:00–18:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить старт и безопасный инженерный финиш в доказуемой композиции. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Tidal Drop); attractions: Заголовок модального окна (Tidal Drop); planner: Маршрут — миниатюра остановки (Tidal Drop); zones: Развлечения — фотокарточка (документ) (Ocean Bay); home: динамическая рекомендация мини-планировщика; шесть достижимых объектов, см. evidence/mini-planner-scenarios.json.

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-061 | attractions / Карточка каталога | Tidal Drop | 8:5 / 16:10 | current |
| APR-SLOT-062 | attractions / Заголовок модального окна | Tidal Drop | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-114 | planner / Маршрут — миниатюра остановки | Tidal Drop | 1:1, 48×48 CSS px | current |
| APR-SLOT-168 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1151](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1151); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Tidal Drop. Сюжет: Высокий старт экстремальной горки с безопасным инженерным приёмом, отдельный от морского купания. Ракурс: С безопасной площадки на башню и часть трассы; не копировать Skyfall и не додумывать точные метры. Освещение: 10–16, только рабочие часы. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить старт и безопасный инженерный финиш в доказуемой композиции. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-024 — Aqua Challenge

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Плавучая надувная полоса препятствий в выделенном морском секторе, спасательные жилеты, персонал.

**Камера и композиция:** С берега/низкого настила, видны раздельные границы купания и активности без выдуманной точной акватории.

**Время и освещение:** 10–16, дневной свет.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Runtime: от 8 лет; рост 120 см; часы 10:00–18:00. Сопровождение: True, порог 12. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Aqua Challenge); attractions: Заголовок модального окна (Aqua Challenge); planner: Маршрут — миниатюра остановки (Aqua Challenge); zones: Развлечения — фотокарточка (документ) (Ocean Bay).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-063 | attractions / Карточка каталога | Aqua Challenge | 8:5 / 16:10 | current |
| APR-SLOT-064 | attractions / Заголовок модального окна | Aqua Challenge | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-115 | planner / Маршрут — миниатюра остановки | Aqua Challenge | 1:1, 48×48 CSS px | current |
| APR-SLOT-169 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1092](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1092); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L14); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Aqua Challenge. Сюжет: Плавучая надувная полоса препятствий в выделенном морском секторе, спасательные жилеты, персонал. Ракурс: С берега/низкого настила, видны раздельные границы купания и активности без выдуманной точной акватории. Освещение: 10–16, дневной свет. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-025 — Coral Discovery

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Организованная группа снорклинга с инструктором, маски и безопасное поведение, не трогают морскую жизнь.

**Камера и композиция:** Полуповерхностный или береговой кадр группы; конкретные кораллы/виды не показывать до экоподтверждения.

**Время и освещение:** 10–15, естественный свет.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Runtime: от 10 лет; рост не задан; часы 10:00–17:00. Сопровождение: True, порог 16. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Coral Discovery); attractions: Заголовок модального окна (Coral Discovery); planner: Маршрут — миниатюра остановки (Coral Discovery); zones: Развлечения — фотокарточка (документ) (Ocean Bay).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-065 | attractions / Карточка каталога | Coral Discovery | 8:5 / 16:10 | current |
| APR-SLOT-066 | attractions / Заголовок модального окна | Coral Discovery | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-116 | planner / Маршрут — миниатюра остановки | Coral Discovery | 1:1, 48×48 CSS px | current |
| APR-SLOT-170 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1093](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1093); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:15](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L15); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Coral Discovery. Сюжет: Организованная группа снорклинга с инструктором, маски и безопасное поведение, не трогают морскую жизнь. Ракурс: Полуповерхностный или береговой кадр группы; конкретные кораллы/виды не показывать до экоподтверждения. Освещение: 10–15, естественный свет. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-026 — Ocean Explorer

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** SUP и каяки в выделенном безопасном коридоре, инструктор и спасательные жилеты.

**Камера и композиция:** Низкий береговой 3/4, небольшой масштаб группы, не среди купальщиков.

**Время и освещение:** 10–16, спокойная погода, дневной свет.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Runtime: от 12 лет; рост не задан; часы 10:00–18:00. Сопровождение: True, порог 16. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Ocean Explorer); attractions: Заголовок модального окна (Ocean Explorer); planner: Маршрут — миниатюра остановки (Ocean Explorer); zones: Развлечения — фотокарточка (документ) (Ocean Bay).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-067 | attractions / Карточка каталога | Ocean Explorer | 8:5 / 16:10 | current |
| APR-SLOT-068 | attractions / Заголовок модального окна | Ocean Explorer | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-117 | planner / Маршрут — миниатюра остановки | Ocean Explorer | 1:1, 48×48 CSS px | current |
| APR-SLOT-171 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1094](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1094); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:16](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L16); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Ocean Explorer. Сюжет: SUP и каяки в выделенном безопасном коридоре, инструктор и спасательные жилеты. Ракурс: Низкий береговой 3/4, небольшой масштаб группы, не среди купальщиков. Освещение: 10–16, спокойная погода, дневной свет. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-027 — Tiny Tides

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Очень мелкая детская вода, мягкие фонтанчики, дети 0–3 только со взрослыми рядом.

**Камера и композиция:** С уровня взрослого с края площадки, без индивидуальных крупных портретов детей.

**Время и освещение:** 10–12, мягкий дневной свет.

**География:** Юго-восточная внутренняя семейная зона 42 га. Разделённые возрастные площадки, мелководье, тень, безопасные дорожки. Не миниатюрная территория всего курорта.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 10:00–19:00. Сопровождение: True, порог 4. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Tiny Tides); attractions: Заголовок модального окна (Tiny Tides); planner: Маршрут — миниатюра остановки (Tiny Tides); zones: Обзор — мини-галерея деталей (Little Paradise); zones: Развлечения — фотокарточка (документ) (Little Paradise).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-069 | attractions / Карточка каталога | Tiny Tides | 8:5 / 16:10 | current |
| APR-SLOT-070 | attractions / Заголовок модального окна | Tiny Tides | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-118 | planner / Маршрут — миниатюра остановки | Tiny Tides | 1:1, 48×48 CSS px | current |
| APR-SLOT-141 | zones / Обзор — мини-галерея деталей | Little Paradise | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-172 | zones / Развлечения — фотокарточка (документ) | Little Paradise | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:836](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L836); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-little-paradise-site-plan.md:10](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-little-paradise-site-plan.md#L10); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Tiny Tides. Сюжет: Очень мелкая детская вода, мягкие фонтанчики, дети 0–3 только со взрослыми рядом. Ракурс: С уровня взрослого с края площадки, без индивидуальных крупных портретов детей. Освещение: 10–12, мягкий дневной свет. География: Юго-восточная внутренняя семейная зона 42 га. Разделённые возрастные площадки, мелководье, тень, безопасные дорожки. Не миниатюрная территория всего курорта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-028 — Splash Explorers

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Более активная водная площадка для 8–12 лет, безопасные элементы и наблюдение взрослых.

**Камера и композиция:** Средне-широкий 3/4 с дорожки, масштаб элементов соответствует детям.

**Время и освещение:** 10–15, дневной свет.

**География:** Юго-восточная внутренняя семейная зона 42 га. Разделённые возрастные площадки, мелководье, тень, безопасные дорожки. Не миниатюрная территория всего курорта.

**Безопасность и режим:** Runtime: от 8 лет; рост 110 см; часы 10:00–19:00. Сопровождение: True, порог 10. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Карточка каталога (Splash Explorers); attractions: Заголовок модального окна (Splash Explorers); planner: Маршрут — миниатюра остановки (Splash Explorers); zones: Обзор — мини-галерея деталей (Little Paradise); zones: Развлечения — фотокарточка (документ) (Little Paradise).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-073 | attractions / Карточка каталога | Splash Explorers | 8:5 / 16:10 | current |
| APR-SLOT-074 | attractions / Заголовок модального окна | Splash Explorers | Phone341×145 (~2. 35:1), desktop414×354 (~1. 17:1); модальное desktop двухколоночное. | current |
| APR-SLOT-120 | planner / Маршрут — миниатюра остановки | Splash Explorers | 1:1, 48×48 CSS px | current |
| APR-SLOT-142 | zones / Обзор — мини-галерея деталей | Little Paradise | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-174 | zones / Развлечения — фотокарточка (документ) | Little Paradise | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:836](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L836); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-little-paradise-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-little-paradise-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Splash Explorers. Сюжет: Более активная водная площадка для 8–12 лет, безопасные элементы и наблюдение взрослых. Ракурс: Средне-широкий 3/4 с дорожки, масштаб элементов соответствует детям. Освещение: 10–15, дневной свет. География: Юго-восточная внутренняя семейная зона 42 га. Разделённые возрастные площадки, мелководье, тень, безопасные дорожки. Не миниатюрная территория всего курорта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-029 — Standard Room

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Спальня базового номера, натуральная отделка, терраса и сад за окном; без бассейна и обещанных размеров.

**Камера и композиция:** От входного угла на кровать и выход к террасе, вертикали выровнены.

**Время и освещение:** Утро, оконный свет, мягкое интерьерное заполнение.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Каталог размещения (Standard Room).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-075 | hotel / Каталог размещения | Standard Room | Desktop 516×420; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:35](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L35); [docs/pages/hotel.md:41](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L41). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Standard Room. Сюжет: Спальня базового номера, натуральная отделка, терраса и сад за окном; без бассейна и обещанных размеров. Ракурс: От входного угла на кровать и выход к террасе, вертикали выровнены. Освещение: Утро, оконный свет, мягкое интерьерное заполнение. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-030 — Deluxe Room

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Более качественная отделка и комфортная зона отдыха, категория визуально отличается от Standard без выдуманных площадей.

**Камера и композиция:** Диагональный интерьер 28–35 мм, кровать и кресло в центральной зоне.

**Время и освещение:** День, натуральный оконный свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Каталог размещения (Deluxe Room).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-076 | hotel / Каталог размещения | Deluxe Room | Desktop 516×420; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:35](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L35); [docs/pages/hotel.md:41](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L41). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Deluxe Room. Сюжет: Более качественная отделка и комфортная зона отдыха, категория визуально отличается от Standard без выдуманных площадей. Ракурс: Диагональный интерьер 28–35 мм, кровать и кресло в центральной зоне. Освещение: День, натуральный оконный свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-031 — Ocean View Room

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Номер с собственной террасой и видом на северо-западную гостиничную бухту.

**Камера и композиция:** Из комнаты к террасе, сбалансировать экспозицию интерьера/моря, не показывать общественный Ocean Bay.

**Время и освещение:** День, мягкий оконный свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Каталог размещения (Ocean View Room).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-077 | hotel / Каталог размещения | Ocean View Room | Desktop 516×420; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:35](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L35); [docs/pages/hotel.md:41](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L41). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Ocean View Room. Сюжет: Номер с собственной террасой и видом на северо-западную гостиничную бухту. Ракурс: Из комнаты к террасе, сбалансировать экспозицию интерьера/моря, не показывать общественный Ocean Bay. Освещение: День, мягкий оконный свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-032 — Family Suite

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Семейный сьют с гостиной и детскими удобствами; не показывать неподтверждённую двухспальную планировку целиком.

**Камера и композиция:** Через гостиную к одной видимой спальне, без плана второго помещения.

**Время и освещение:** День, естественный свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Каталог размещения (Family Suite).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-078 | hotel / Каталог размещения | Family Suite | Desktop 516×420; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:13](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L13); [docs/pages/hotel.md:41](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L41). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Family Suite. Сюжет: Семейный сьют с гостиной и детскими удобствами; не показывать неподтверждённую двухспальную планировку целиком. Ракурс: Через гостиную к одной видимой спальне, без плана второго помещения. Освещение: День, естественный свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-033 — Premium Suite

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Сьют с премиальной отделкой и гостиной, панорамное окно; ванна и точный вид требуют подтверждения.

**Камера и композиция:** С угла гостиной к окнам, без демонстрации спорных удобств.

**Время и освещение:** День, управляемый контраст окна/помещения.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Каталог размещения (Premium Suite).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-079 | hotel / Каталог размещения | Premium Suite | Desktop 516×420; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:35](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L35); [docs/pages/hotel.md:41](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L41). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Premium Suite. Сюжет: Сьют с премиальной отделкой и гостиной, панорамное окно; ванна и точный вид требуют подтверждения. Ракурс: С угла гостиной к окнам, без демонстрации спорных удобств. Освещение: День, управляемый контраст окна/помещения. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-034 — Ocean View Villa

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Уединённая приморская вилла в саду и терраса; личный бассейн только после подтверждения amenities.

**Камера и композиция:** С приватной террасы на фасад/сад, не раскрывать неутверждённые соседние участки.

**Время и освещение:** Поздний день, мягкий тёплый свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Каталог размещения (Ocean View Villa).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-080 | hotel / Каталог размещения | Ocean View Villa | Desktop 516×420; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L14); [docs/pages/hotel.md:41](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L41). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Ocean View Villa. Сюжет: Уединённая приморская вилла в саду и терраса; личный бассейн только после подтверждения amenities. Ракурс: С приватной террасы на фасад/сад, не раскрывать неутверждённые соседние участки. Освещение: Поздний день, мягкий тёплый свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-035 — Royal Paradise Villa

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Отдельная премиальная вилла с утверждённым частным бассейном и зелёной приватностью.

**Камера и композиция:** С края бассейна к вилле, никакого выдуманного кинотеатра/трёхспального плана.

**Время и освещение:** Поздний день, естественный свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Каталог размещения (Royal Paradise Villa).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-081 | hotel / Каталог размещения | Royal Paradise Villa | Desktop 516×420; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:15](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L15); [docs/pages/hotel.md:41](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L41). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Royal Paradise Villa. Сюжет: Отдельная премиальная вилла с утверждённым частным бассейном и зелёной приватностью. Ракурс: С края бассейна к вилле, никакого выдуманного кинотеатра/трёхспального плана. Освещение: Поздний день, естественный свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-036 — Grand Kids Club

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Детское пространство гостиницы, натуральные материалы, нейтральные игровые зоны и сотрудник; возрастная программа не утверждена.

**Камера и композиция:** Из дверного проёма в основное пространство, без придуманного аквапарка.

**Время и освещение:** День, мягкий оконный свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Впечатления отеля (kids).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-083 | hotel / Впечатления отеля | kids | По фактическому feature-контейнеру, см. dynamic-states.json | current |

**Источники:** [docs/master/website-requirements.md:1491](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1491); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:17](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L17); [docs/pages/hotel.md:60](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L60). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Grand Kids Club. Сюжет: Детское пространство гостиницы, натуральные материалы, нейтральные игровые зоны и сотрудник; возрастная программа не утверждена. Ракурс: Из дверного проёма в основное пространство, без придуманного аквапарка. Освещение: День, мягкий оконный свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-037 — Grand Wellness & Fitness

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Гостиничное спокойное wellness/fitness пространство, нейтральная зона упражнений; процедуры и оборудование не обещать.

**Камера и композиция:** Интерьер 3/4 с окнами и общей зоной; не дублировать Lotus Spa.

**Время и освещение:** День, естественный свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Впечатления отеля (wellness).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-084 | hotel / Впечатления отеля | wellness | По фактическому feature-контейнеру, см. dynamic-states.json | current |

**Источники:** [docs/master/website-requirements.md:789](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L789); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:17](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L17); [docs/pages/hotel.md:60](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L60). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Grand Wellness & Fitness. Сюжет: Гостиничное спокойное wellness/fitness пространство, нейтральная зона упражнений; процедуры и оборудование не обещать. Ракурс: Интерьер 3/4 с окнами и общей зоной; не дублировать Lotus Spa. Освещение: День, естественный свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-038 — Paradise Dining

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Гостиничный ресторан с натуральной отделкой и сервировкой, без обещания конкретного меню/видов.

**Камера и композиция:** От входа к центральной группе столов, не заменять Azure или Food Hall.

**Время и освещение:** Ранний вечер, тёплый практический свет и остаточный дневной.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Paradise Dining (dining).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-085 | hotel / Paradise Dining | dining | Desktop 504×256; phone 335×256 | current |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:17](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L17); [docs/pages/hotel.md:55](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L55). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Paradise Dining. Сюжет: Гостиничный ресторан с натуральной отделкой и сервировкой, без обещания конкретного меню/видов. Ракурс: От входа к центральной группе столов, не заменять Azure или Food Hall. Освещение: Ранний вечер, тёплый практический свет и остаточный дневной. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-039 — Sunset Lounge

**Класс:** Документировано, UI не реализован/требует согласования. **Приоритет:** P2 — документированные расширения.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Терраса лаунжа у общественной бухты; терраса справа в фотографии, на исходном геоплане слева.

**Камера и композиция:** ТОЛЬКО по отсутствующему аннотированному мастер-плану; нельзя зеркалить берег ради композиции.

**Время и освещение:** 16–22, выбрать тёплый предвечерний свет после проверки направления солнца.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** zones: Обзор — мини-галерея деталей (Ocean Bay); zones: Развлечения — фотокарточка (документ) (Ocean Bay); planner: Дополнение канонического каталога (sunset-lounge).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-152 | zones / Обзор — мини-галерея деталей | Ocean Bay | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-195 | zones / Развлечения — фотокарточка (документ) | Ocean Bay | 3:2 / окончательные размеры не утверждены | document |
| APR-SLOT-203 | planner / Дополнение канонического каталога | sunset-lounge | 1:1 | document |

**Источники:** [docs/master/website-requirements.md:1095](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1095); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:13](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L13); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1); [docs/design/premium-redesign-brief.md:72](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/design/premium-redesign-brief.md#L72). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Sunset Lounge. Сюжет: Терраса лаунжа у общественной бухты; терраса справа в фотографии, на исходном геоплане слева. Ракурс: ТОЛЬКО по отсутствующему аннотированному мастер-плану; нельзя зеркалить берег ради композиции. Освещение: 16–22, выбрать тёплый предвечерний свет после проверки направления солнца. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-040 — Bamboo Harmony

**Класс:** Документировано, UI не реализован/требует согласования. **Приоритет:** P2 — документированные расширения.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Уединённые бамбуковые массажные павильоны западной части Spa, без обнажённых посетителей и неподтверждённых процедур.

**Камера и композиция:** С садовой дорожки через растения на павильон, локальный кадр.

**Время и освещение:** 10–17, мягкий естественный свет.

**География:** Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** zones: Обзор — мини-галерея деталей (Serenity Spa); zones: Развлечения — фотокарточка (документ) (Serenity Spa); planner: Дополнение канонического каталога (bamboo-harmony).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-143 | zones / Обзор — мини-галерея деталей | Serenity Spa | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-181 | zones / Развлечения — фотокарточка (документ) | Serenity Spa | 3:2 / окончательные размеры не утверждены | document |
| APR-SLOT-204 | planner / Дополнение канонического каталога | bamboo-harmony | 1:1 | document |

**Источники:** [docs/master/website-requirements.md:1208](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1208); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-serenity-spa-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-serenity-spa-site-plan.md#L14); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Bamboo Harmony. Сюжет: Уединённые бамбуковые массажные павильоны западной части Spa, без обнажённых посетителей и неподтверждённых процедур. Ракурс: С садовой дорожки через растения на павильон, локальный кадр. Освещение: 10–17, мягкий естественный свет. География: Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-041 — Mist Sanctuary

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Комплекс саун/пара в северо-восточной части Spa, натуральный камень и умеренный пар.

**Камера и композиция:** Из предбанника/общей разрешённой зоны, средний 3/4 без людей в приватных процедурах.

**Время и освещение:** 10–18, мягкий практический свет.

**География:** Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness.

**Безопасность и режим:** Runtime: от 16 лет; рост не задан; часы 10:00–20:00. Сопровождение: True, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Mist Sanctuary); zones: Развлечения — фотокарточка (документ) (Serenity Spa).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-098 | planner / Маршрут — миниатюра остановки | Mist Sanctuary | 1:1, 48×48 CSS px | current |
| APR-SLOT-182 | zones / Развлечения — фотокарточка (документ) | Serenity Spa | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1208](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1208); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-serenity-spa-site-plan.md:15](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-serenity-spa-site-plan.md#L15); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Mist Sanctuary. Сюжет: Комплекс саун/пара в северо-восточной части Spa, натуральный камень и умеренный пар. Ракурс: Из предбанника/общей разрешённой зоны, средний 3/4 без людей в приватных процедурах. Освещение: 10–18, мягкий практический свет. География: Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-042 — Whispering Falls

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Тёплый бассейн с мягким водопадом в восточной/юго-восточной Spa, разрешённый отдых в воде.

**Камера и композиция:** С настила к каскаду, без ботанического ограждения Hidden Falls.

**Время и освещение:** 09–17, мягкий дневной свет.

**География:** Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness.

**Безопасность и режим:** Runtime: от 12 лет; рост не задан; часы 09:00–21:00. Сопровождение: True, порог 16. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Whispering Falls); zones: Обзор — мини-галерея деталей (Serenity Spa); zones: Развлечения — фотокарточка (документ) (Serenity Spa).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-123 | planner / Маршрут — миниатюра остановки | Whispering Falls | 1:1, 48×48 CSS px | current |
| APR-SLOT-144 | zones / Обзор — мини-галерея деталей | Serenity Spa | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-183 | zones / Развлечения — фотокарточка (документ) | Serenity Spa | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1208](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1208); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-serenity-spa-site-plan.md:13](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-serenity-spa-site-plan.md#L13); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Whispering Falls. Сюжет: Тёплый бассейн с мягким водопадом в восточной/юго-восточной Spa, разрешённый отдых в воде. Ракурс: С настила к каскаду, без ботанического ограждения Hidden Falls. Освещение: 09–17, мягкий дневной свет. География: Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-043 — Zen Garden

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Тихие северные садовые пути, медитация/йога, камень и бамбук, без неподтверждённого храма.

**Камера и композиция:** С уровня человека по изогнутой дорожке, сдержанный простор.

**Время и освещение:** 09–11, мягкий утренний свет.

**География:** Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–21:00. Сопровождение: True, порог 12. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Zen Garden); zones: Развлечения — фотокарточка (документ) (Serenity Spa).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-122 | planner / Маршрут — миниатюра остановки | Zen Garden | 1:1, 48×48 CSS px | current |
| APR-SLOT-184 | zones / Развлечения — фотокарточка (документ) | Serenity Spa | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1208](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1208); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-serenity-spa-site-plan.md:16](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-serenity-spa-site-plan.md#L16); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Zen Garden. Сюжет: Тихие северные садовые пути, медитация/йога, камень и бамбук, без неподтверждённого храма. Ракурс: С уровня человека по изогнутой дорожке, сдержанный простор. Освещение: 09–11, мягкий утренний свет. География: Западная/юго-западная внутренняя зона 35 га. Lotus центр, Bamboo запад, Mist северо-восток, Whispering восток/юго-восток, Zen север. Натуральный камень, дерево, бамбук; не отельный wellness. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-044 — Hidden Falls

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Ботанический водопад, смотровая площадка с ограждением, НИКТО не купается.

**Камера и композиция:** С разрешённой площадки на северный каскад, виден безопасный край.

**Время и освещение:** 09–17, рассеянный свет.

**География:** Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Hidden Falls); zones: Обзор — мини-галерея деталей (Eden Gardens); zones: Развлечения — фотокарточка (документ) (Eden Gardens).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-095 | planner / Маршрут — миниатюра остановки | Hidden Falls | 1:1, 48×48 CSS px | current |
| APR-SLOT-139 | zones / Обзор — мини-галерея деталей | Eden Gardens | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-176 | zones / Развлечения — фотокарточка (документ) | Eden Gardens | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1294](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1294); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-eden-gardens-site-plan.md:11](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-eden-gardens-site-plan.md#L11); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Hidden Falls. Сюжет: Ботанический водопад, смотровая площадка с ограждением, НИКТО не купается. Ракурс: С разрешённой площадки на северный каскад, виден безопасный край. Освещение: 09–17, рассеянный свет. География: Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-045 — Butterfly Haven

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Закрытый ботанический павильон с бабочками и растениями, без касания/кормления; виды пока не фиксировать.

**Камера и композиция:** С уровня посетителя вдоль дорожки павильона; без вспышки.

**Время и освещение:** 10–16, мягкий фильтрованный свет.

**География:** Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 10:00–18:00. Сопровождение: True, порог 12. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Butterfly Haven); zones: Обзор — мини-галерея деталей (Eden Gardens); zones: Развлечения — фотокарточка (документ) (Eden Gardens).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-124 | planner / Маршрут — миниатюра остановки | Butterfly Haven | 1:1, 48×48 CSS px | current |
| APR-SLOT-140 | zones / Обзор — мини-галерея деталей | Eden Gardens | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-177 | zones / Развлечения — фотокарточка (документ) | Eden Gardens | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1294](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1294); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-eden-gardens-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-eden-gardens-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Butterfly Haven. Сюжет: Закрытый ботанический павильон с бабочками и растениями, без касания/кормления; виды пока не фиксировать. Ракурс: С уровня посетителя вдоль дорожки павильона; без вспышки. Освещение: 10–16, мягкий фильтрованный свет. География: Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-046 — Orchid Pavilion

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Орхидеи в восточном садовом павильоне, натуральный каркас, ботанические дорожки.

**Камера и композиция:** Диагональ через растения к конструкции, не фантастические гигантские цветы.

**Время и освещение:** 09–17, рассеянный свет.

**География:** Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–19:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Orchid Pavilion); zones: Развлечения — фотокарточка (документ) (Eden Gardens).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-096 | planner / Маршрут — миниатюра остановки | Orchid Pavilion | 1:1, 48×48 CSS px | current |
| APR-SLOT-178 | zones / Развлечения — фотокарточка (документ) | Eden Gardens | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1294](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1294); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-eden-gardens-site-plan.md:13](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-eden-gardens-site-plan.md#L13); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Orchid Pavilion. Сюжет: Орхидеи в восточном садовом павильоне, натуральный каркас, ботанические дорожки. Ракурс: Диагональ через растения к конструкции, не фантастические гигантские цветы. Освещение: 09–17, рассеянный свет. География: Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-047 — Starlight Trail

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Южный вечерний ботанический маршрут с деликатной практической подсветкой, без неоновой фантастики.

**Камера и композиция:** С уровня пешехода вдоль освещённой тропы, слабый естественный свет неба.

**Время и освещение:** 17–21, сумерки.

**География:** Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 17:00–21:00. Сопровождение: True, порог 12. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Starlight Trail); zones: Развлечения — фотокарточка (документ) (Eden Gardens).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-097 | planner / Маршрут — миниатюра остановки | Starlight Trail | 1:1, 48×48 CSS px | current |
| APR-SLOT-179 | zones / Развлечения — фотокарточка (документ) | Eden Gardens | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1294](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1294); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-eden-gardens-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-eden-gardens-site-plan.md#L14); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Starlight Trail. Сюжет: Южный вечерний ботанический маршрут с деликатной практической подсветкой, без неоновой фантастики. Ракурс: С уровня пешехода вдоль освещённой тропы, слабый естественный свет неба. Освещение: 17–21, сумерки. География: Центральное зелёное ядро 60 га. Emerald ось; Hidden Falls север; Butterfly запад; Orchid восток; Starlight юг. Не транзитная автомобильная площадь. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-048 — Paradise Gateway

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Южная входная арка/входной ансамбль и простор подхода с общественного прибытия.

**Камера и композиция:** С южной стороны в сторону Boulevard, без точной канатной трассы в фоне.

**Время и освещение:** 09–11, естественный утренний свет.

**География:** 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–22:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Paradise Gateway); zones: Обзор — мини-галерея деталей (Paradise Boulevard); zones: Развлечения — фотокарточка (документ) (Paradise Boulevard).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-086 | planner / Маршрут — миниатюра остановки | Paradise Gateway | 1:1, 48×48 CSS px | current |
| APR-SLOT-135 | zones / Обзор — мини-галерея деталей | Paradise Boulevard | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-191 | zones / Развлечения — фотокарточка (документ) | Paradise Boulevard | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1368](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1368); [docs/island/aqua-paradise-island-masterplan.md:31](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L31); [docs/island/aqua-paradise-paradise-boulevard-site-plan.md:7](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-boulevard-site-plan.md#L7); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Paradise Gateway. Сюжет: Южная входная арка/входной ансамбль и простор подхода с общественного прибытия. Ракурс: С южной стороны в сторону Boulevard, без точной канатной трассы в фоне. Освещение: 09–11, естественный утренний свет. География: 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-049 — Island Welcome Center

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Западный информационный центр с доступным входом, стойкой и пространством ориентации.

**Камера и композиция:** Наземный 3/4 от площади к фасаду, без читаемых выдуманных карт и надписей.

**Время и освещение:** 09–17, дневной свет.

**География:** 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–22:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Island Welcome Center).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-088 | planner / Маршрут — миниатюра остановки | Island Welcome Center | 1:1, 48×48 CSS px | current |

**Источники:** [docs/master/website-requirements.md:1368](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1368); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-boulevard-site-plan.md:7](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-boulevard-site-plan.md#L7); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Island Welcome Center. Сюжет: Западный информационный центр с доступным входом, стойкой и пространством ориентации. Ракурс: Наземный 3/4 от площади к фасаду, без читаемых выдуманных карт и надписей. Освещение: 09–17, дневной свет. География: 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-050 — Paradise Fountain Show

**Класс:** Документировано, UI не реализован/требует согласования. **Приоритет:** P2 — документированные расширения.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Световодное фонтанное шоу на боковой площади, пешеходная ось свободна; без пиротехники.

**Камера и композиция:** С доступного края площади, струи в центральной безопасной области.

**Время и освещение:** 19:30 либо 21:00, шоу 15 минут; выбрать 19:30.

**География:** 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** zones: Обзор — мини-галерея деталей (Paradise Boulevard); zones: Развлечения — фотокарточка (документ) (Paradise Boulevard); planner: Дополнение канонического каталога (paradise-fountain-show).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-136 | zones / Обзор — мини-галерея деталей | Paradise Boulevard | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-193 | zones / Развлечения — фотокарточка (документ) | Paradise Boulevard | 3:2 / окончательные размеры не утверждены | document |
| APR-SLOT-205 | planner / Дополнение канонического каталога | paradise-fountain-show | 1:1 | document |

**Источники:** [docs/master/website-requirements.md:1368](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1368); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-boulevard-site-plan.md:7](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-boulevard-site-plan.md#L7); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Paradise Fountain Show. Сюжет: Световодное фонтанное шоу на боковой площади, пешеходная ось свободна; без пиротехники. Ракурс: С доступного края площади, струи в центральной безопасной области. Освещение: 19:30 либо 21:00, шоу 15 минут; выбрать 19:30. География: 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-051 — Tropical Bites Food Hall

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Юго-западный фуд-холл, несколько стоек и общая посадка, натуральные материалы.

**Камера и композиция:** Из общего зала через центральные столы на стойки; не гостиничный ресторан.

**Время и освещение:** 11–14, дневной и тёплый внутренний свет.

**География:** 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–22:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Tropical Bites Food Hall (питание оплачивается отдельно)); zones: Обзор — мини-галерея деталей (Paradise Market); zones: Развлечения — фотокарточка (документ) (Paradise Market).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-090 | planner / Маршрут — миниатюра остановки | Tropical Bites Food Hall (питание оплачивается отдельно) | 1:1, 48×48 CSS px | current |
| APR-SLOT-137 | zones / Обзор — мини-галерея деталей | Paradise Market | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-186 | zones / Развлечения — фотокарточка (документ) | Paradise Market | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1463](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1463); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-market-site-plan.md:12](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-market-site-plan.md#L12); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Tropical Bites Food Hall. Сюжет: Юго-западный фуд-холл, несколько стоек и общая посадка, натуральные материалы. Ракурс: Из общего зала через центральные столы на стойки; не гостиничный ресторан. Освещение: 11–14, дневной и тёплый внутренний свет. География: 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-052 — Azure Terrace Restaurant

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Приподнятая северо-западная терраса ресторана, спокойная премиальная сервировка; вид моря отложен до проверки.

**Камера и композиция:** С уровня террасы вдоль столов, зелень перекрывает неподтверждённую даль.

**Время и освещение:** 16–18, мягкий тёплый свет.

**География:** 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 12:00–22:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Не изображать океанскую панораму до подтверждения линии визирования; локальная терраса возможна после референса. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Azure Terrace Restaurant (оплачивается отдельно)); zones: Обзор — мини-галерея деталей (Paradise Market); zones: Развлечения — фотокарточка (документ) (Paradise Market).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-091 | planner / Маршрут — миниатюра остановки | Azure Terrace Restaurant (оплачивается отдельно) | 1:1, 48×48 CSS px | current |
| APR-SLOT-138 | zones / Обзор — мини-галерея деталей | Paradise Market | 3:2 или 4:3; окончательный контейнер не реализован | document |
| APR-SLOT-187 | zones / Развлечения — фотокарточка (документ) | Paradise Market | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1464](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1464); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-market-site-plan.md:10](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-market-site-plan.md#L10); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Azure Terrace Restaurant. Сюжет: Приподнятая северо-западная терраса ресторана, спокойная премиальная сервировка; вид моря отложен до проверки. Ракурс: С уровня террасы вдоль столов, зелень перекрывает неподтверждённую даль. Освещение: 16–18, мягкий тёплый свет. География: 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Не изображать океанскую панораму до подтверждения линии визирования; локальная терраса возможна после референса.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-053 — Coconut & Co.

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Южная кафе-точка у оси, напитки и тень, без отдельной выдуманной пляжной бухты.

**Камера и композиция:** Фасад/стойка со столиками под углом 3/4, центральная зона узнаваема в миниатюре.

**Время и освещение:** 10–16, естественный свет.

**География:** 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–21:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Coconut & Co. (питание оплачивается отдельно)); zones: Развлечения — фотокарточка (документ) (Paradise Market).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-092 | planner / Маршрут — миниатюра остановки | Coconut & Co. (питание оплачивается отдельно) | 1:1, 48×48 CSS px | current |
| APR-SLOT-188 | zones / Развлечения — фотокарточка (документ) | Paradise Market | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1465](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1465); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-market-site-plan.md:14](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-market-site-plan.md#L14); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Coconut & Co.. Сюжет: Южная кафе-точка у оси, напитки и тень, без отдельной выдуманной пляжной бухты. Ракурс: Фасад/стойка со столиками под углом 3/4, центральная зона узнаваема в миниатюре. Освещение: 10–16, естественный свет. География: 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-054 — Island Treasures

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Северо-восточный сувенирный магазин, натуральные витрины и нейтральные изделия без сторонних брендов.

**Камера и композиция:** С входа на общую интерьерную композицию, не каталог товаров.

**Время и освещение:** 10–17, тёплый внутренний свет.

**География:** 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 10:00–22:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Island Treasures (покупки оплачиваются отдельно)); zones: Развлечения — фотокарточка (документ) (Paradise Market).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-093 | planner / Маршрут — миниатюра остановки | Island Treasures (покупки оплачиваются отдельно) | 1:1, 48×48 CSS px | current |
| APR-SLOT-189 | zones / Развлечения — фотокарточка (документ) | Paradise Market | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1466](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1466); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-market-site-plan.md:11](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-market-site-plan.md#L11); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Island Treasures. Сюжет: Северо-восточный сувенирный магазин, натуральные витрины и нейтральные изделия без сторонних брендов. Ракурс: С входа на общую интерьерную композицию, не каталог товаров. Освещение: 10–17, тёплый внутренний свет. География: 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-055 — Splash Essentials

**Класс:** Обязательно для существующих медиасостояний. **Приоритет:** P1 — внутренние страницы.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Юго-восточный магазин необходимых принадлежностей для водного отдыха, аккуратные витрины.

**Камера и композиция:** С входа на стойку и ассортимент без цен и неутверждённых логотипов.

**Время и освещение:** 09–17, дневной и мягкий интерьерный свет.

**География:** 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования.

**Безопасность и режим:** Runtime: от 0 лет; рост не задан; часы 09:00–20:00. Сопровождение: False, порог 18. Канон website-requirements имеет приоритет при несовпадении; фотосюжет не должен обещать допуск без проверки.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** planner: Маршрут — миниатюра остановки (Splash Essentials (покупки оплачиваются отдельно)); zones: Развлечения — фотокарточка (документ) (Paradise Market).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-094 | planner / Маршрут — миниатюра остановки | Splash Essentials (покупки оплачиваются отдельно) | 1:1, 48×48 CSS px | current |
| APR-SLOT-190 | zones / Развлечения — фотокарточка (документ) | Paradise Market | 3:2 / окончательные размеры не утверждены | document |

**Источники:** [docs/master/website-requirements.md:1467](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1467); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-market-site-plan.md:13](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-market-site-plan.md#L13); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Splash Essentials. Сюжет: Юго-восточный магазин необходимых принадлежностей для водного отдыха, аккуратные витрины. Ракурс: С входа на стойку и ассортимент без цен и неутверждённых логотипов. Освещение: 09–17, дневной и мягкий интерьерный свет. География: 25 га между Boulevard на юге и Eden на севере. Центральная площадь; Food Hall юго-запад, Azure северо-запад, Coconut юг, Treasures северо-восток, Splash юго-восток. Вид Azure на океан не доказан линией визирования. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-056 — Ocean Wings

**Класс:** Документировано, UI не реализован/требует согласования. **Приоритет:** P2 — документированные расширения.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Кабина канатной дороги над морем на подходе к острову; тип, число веток, опоры и терминал требуют подтверждения.

**Камера и композиция:** Средний кадр кабины с водой; только после референса реальной системы, без произвольной географии трассы.

**Время и освещение:** 09–11, ясная спокойная погода.

**География:** Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** visit: Прибытие — фотокарточка (документ) (ocean-wings); visit: Hero (документ) (arrival hero).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-197 | visit / Прибытие — фотокарточка (документ) | ocean-wings | 16:10 / по будущему контейнеру | document |
| APR-SLOT-201 | visit / Hero (документ) | arrival hero | 16:9 / mobile 9:16 | document |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:30](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L30); [docs/pages/visit.md:10](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/visit.md#L10). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Ocean Wings. Сюжет: Кабина канатной дороги над морем на подходе к острову; тип, число веток, опоры и терминал требуют подтверждения. Ракурс: Средний кадр кабины с водой; только после референса реальной системы, без произвольной географии трассы. Освещение: 09–11, ясная спокойная погода. География: Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-057 — Паром / катамаран

**Класс:** Документировано, UI не реализован/требует согласования. **Приоритет:** P2 — документированные расширения.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Официальное массовое морское прибытие к южному общественному причалу, не гостиничная Marina.

**Камера и композиция:** С берега на подходящее судно и безопасный причал; класс/вместимость судна подтвердить.

**Время и освещение:** 09–11, мягкий дневной свет.

**География:** Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** visit: Прибытие — фотокарточка (документ) (ferry).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-198 | visit / Прибытие — фотокарточка (документ) | ferry | 16:10 / по будущему контейнеру | document |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:30](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L30); [docs/pages/visit.md:19](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/visit.md#L19). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Паром / катамаран. Сюжет: Официальное массовое морское прибытие к южному общественному причалу, не гостиничная Marina. Ракурс: С берега на подходящее судно и безопасный причал; класс/вместимость судна подтвердить. Освещение: 09–11, мягкий дневной свет. География: Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-058 — Скоростной катер

**Класс:** Документировано, UI не реализован/требует согласования. **Приоритет:** P2 — документированные расширения.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Малый пассажирский трансфер к южному общественному узлу, правильная посадка и безопасность.

**Камера и композиция:** С причала 3/4 на катер, без выдуманной марки и вместимости.

**Время и освещение:** 09–16, спокойная погода.

**География:** Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** visit: Прибытие — фотокарточка (документ) (speedboat).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-199 | visit / Прибытие — фотокарточка (документ) | speedboat | 16:10 / по будущему контейнеру | document |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/pages/visit.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/visit.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Скоростной катер. Сюжет: Малый пассажирский трансфер к южному общественному узлу, правильная посадка и безопасность. Ракурс: С причала 3/4 на катер, без выдуманной марки и вместимости. Освещение: 09–16, спокойная погода. География: Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-059 — Marina / прибытие на яхте

**Класс:** Документировано, UI не реализован/требует согласования. **Приоритет:** P2 — документированные расширения.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Гостевой яхтенный причал, предварительно связанный с гостиницей; отделить от южного общего парома.

**Камера и композиция:** Локальный вид понтона и яхты, без полного берегового плана до утверждения точки.

**Время и освещение:** День, мягкий свет.

**География:** Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** visit: Прибытие — фотокарточка (документ) (marina).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-200 | visit / Прибытие — фотокарточка (документ) | marina | 16:10 / по будущему контейнеру | document |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/pages/visit.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/visit.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Marina / прибытие на яхте. Сюжет: Гостевой яхтенный причал, предварительно связанный с гостиницей; отделить от южного общего парома. Ракурс: Локальный вид понтона и яхты, без полного берегового плана до утверждения точки. Освещение: День, мягкий свет. География: Южный общественный узел прибытия обращён к материку примерно в 6 км. Гостевая Marina предварительно у гостиницы на северо-западе; точный причал и морские/канатные трассы не утверждены. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-060 — Paradise Loop Central Station

**Класс:** Необязательно, предложение. **Приоритет:** P3 — опционально.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Восточная остановка у входной зоны и курортный шаттл, без демонстрации спорного числа остановок.

**Камера и композиция:** Наземный средний 3/4 остановки, точный тип транспорта пока уточнить.

**Время и освещение:** 09–17, дневной свет.

**География:** 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** visit: Дополнительный транспортный кадр (central-station).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-206 | visit / Дополнительный транспортный кадр | central-station | По отдельному согласованию | optional |

**Источники:** [docs/master/website-requirements.md:1368](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1368); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-paradise-boulevard-site-plan.md:7](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-paradise-boulevard-site-plan.md#L7); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Paradise Loop Central Station. Сюжет: Восточная остановка у входной зоны и курортный шаттл, без демонстрации спорного числа остановок. Ракурс: Наземный средний 3/4 остановки, точный тип транспорта пока уточнить. Освещение: 09–17, дневной свет. География: 35 га, южная ось прибытия. Gateway юг; Welcome Center запад; Central Station восток; Palm Avenue к Market; фонтан сбоку от основного потока. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-061 — Tidal Kingdom — спокойный вечер

**Класс:** Необязательно, предложение. **Приоритет:** P3 — опционально.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Тот же бассейн и те же руины, что APR-PHOTO-005, после остановки волн; отдельное состояние.

**Камера и композиция:** Точно повторить утверждённую геометрию дневного кадра, вода спокойная.

**Время и освещение:** 19–21, практическая вечерняя подсветка.

**География:** Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** attractions: Дополнительная фотография вечернего состояния (tidal-calm-evening).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-207 | attractions / Дополнительная фотография вечернего состояния | tidal-calm-evening | По отдельному согласованию | optional |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-atlantis-realm-site-plan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-atlantis-realm-site-plan.md#L1); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Tidal Kingdom — спокойный вечер. Сюжет: Тот же бассейн и те же руины, что APR-PHOTO-005, после остановки волн; отдельное состояние. Ракурс: Точно повторить утверждённую геометрию дневного кадра, вода спокойная. Освещение: 19–21, практическая вечерняя подсветка. География: Северо-западная внутренняя зона. Тематическая каменная архитектура затерянного города. Site plan: Poseidon дальняя высокая часть, Tidal запад, Crystal восток, Moonlit юг. Предварительный spatial plan противоречит: общий вид заблокирован. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Локальный кадр допустим по концепции; перед финальной генерацией согласовать архитектурный референс. Широкие соседства не выдумывать.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-062 — Общий аэрофотоснимок острова

**Класс:** Необязательно, предложение. **Приоритет:** P3 — опционально.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Весь единый остров 600 га с правильными двумя бухтами и южным входом, без неутверждённых дорог/горок.

**Камера и композиция:** ВЫСОКИЙ риск: только после единого аннотированного 3D/топоплана; не свободная генерация из текста.

**Время и освещение:** Дневной свет, направление солнца требует географического референса.

**География:** Один остров 600 га суши (6 км²), неправильная вытянутая капля, узкий юг; не архипелаг. Высоты, точные контуры сооружений, солнечная ориентация и морская батиметрия не утверждены.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** home: Необязательная островная панорама — блокировать (island-aerial).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-208 | home / Необязательная островная панорама — блокировать | island-aerial | По отдельному согласованию | optional |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Общий аэрофотоснимок острова. Сюжет: Весь единый остров 600 га с правильными двумя бухтами и южным входом, без неутверждённых дорог/горок. Ракурс: ВЫСОКИЙ риск: только после единого аннотированного 3D/топоплана; не свободная генерация из текста. Освещение: Дневной свет, направление солнца требует географического референса. География: Один остров 600 га суши (6 км²), неправильная вытянутая капля, узкий юг; не архипелаг. Высоты, точные контуры сооружений, солнечная ориентация и морская батиметрия не утверждены. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-063 — Приватная кабана

**Класс:** Необязательно, предложение. **Приоритет:** P3 — опционально.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Локальный вид подтверждённой платной кабаны; место и внешний вид пока не утверждены.

**Камера и композиция:** С уровня дорожки на кабану, без утверждения тарифных преимуществ через картинку.

**Время и освещение:** День, мягкая тень.

**География:** Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** tickets: Необязательная иллюстрация кабаны (private-cabana).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-209 | tickets / Необязательная иллюстрация кабаны | private-cabana | По отдельному согласованию | optional |

**Источники:** [docs/master/website-requirements.md:181](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L181); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-ocean-bay-site-plan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-ocean-bay-site-plan.md#L1); [docs/pages/zones.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/zones.md#L1); [docs/pages/attractions.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/attractions.md#L1); [docs/pages/planner.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/planner.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Приватная кабана. Сюжет: Локальный вид подтверждённой платной кабаны; место и внешний вид пока не утверждены. Ракурс: С уровня дорожки на кабану, без утверждения тарифных преимуществ через картинку. Освещение: День, мягкая тень. География: Северо-восточная естественная защищённая морская бухта, открытая горловина в море. Пляж и морские активности отделены от горок и их управляемых финишей. Не гостиничная бухта. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: БЛОКИРУЮЩЕЕ уточнение перед генерацией: аннотированный план/тип сооружения/транспортный референс; см. вопросы.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---

### APR-PHOTO-064 — Ocean View Villa — дополнительный интерьер

**Класс:** Необязательно, предложение. **Приоритет:** P3 — опционально.

**Назначение:** Узнаваемое документально достоверное представление объекта; повторное использование в размещениях матрицы.

**Содержание:** Второй ракурс той же утверждённой виллы APR-PHOTO-034; не новая категория и не новая планировка.

**Камера и композиция:** Интерьер к террасе по подтверждённому плану, тот же материал/мебель/окна.

**Время и освещение:** День, естественный свет.

**География:** Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс.

**Безопасность и режим:** Люди и безопасность только по канонической спецификации; конкретные возрастные ограничения не утверждать по виду фотографии.

**Размер и формат исходника:** 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Это рекомендация будущему производству; готового файла сейчас нет.

**Пропорции:** Основной мастер 4:3; целевые форматы каждого размещения — в матрице. Старые пропорции brief не переносить автоматически: carousel и modal изменяются по breakpoint.

**Кадрирование:** Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты.

**Условия до генерации:** Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена. Формулировка ниже — ТЗ, а не подтверждение, что недостающие исходные сведения уже существуют.

**Повторное использование:** hotel: Дополнительный ракурс галереи (villa-interior-detail).

| Место | Страница / блок | Состояние | Пропорции | Статус |
|---|---|---|---|---|
| APR-SLOT-210 | hotel / Дополнительный ракурс галереи | villa-interior-detail | По отдельному согласованию | optional |

**Источники:** [docs/master/website-requirements.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/master/website-requirements.md#L1); [docs/island/aqua-paradise-island-masterplan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-island-masterplan.md#L1); [docs/island/aqua-paradise-grand-hotel-site-plan.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/island/aqua-paradise-grand-hotel-site-plan.md#L1); [docs/pages/hotel.md:1](https://github.com/raccoonforge/aqua-paradise-resort/blob/dd072b7440819280df8ba8d04f3d6ba8a9351bc6/docs/pages/hotel.md#L1). Секции всех документов дополнительно в evidence/document-sections.csv. Текущий код зафиксирован на SHA dd072b7440819280df8ba8d04f3d6ba8a9351bc6.

#### Промпт для последующего производства

Создай одну ультрафотореалистичную профессиональную архитектурную/курортную фотографию Aqua Paradise Resort. Объект: Ocean View Villa — дополнительный интерьер. Сюжет: Второй ракурс той же утверждённой виллы APR-PHOTO-034; не новая категория и не новая планировка. Ракурс: Интерьер к террасе по подтверждённому плану, тот же материал/мебель/окна. Освещение: День, естественный свет. География: Удалённая северо-западная защищённая гостиничная бухта, 52 га. Верхняя терраса главный корпус; семейные корпуса рядом; виллы обособлены. От Ocean Bay отделяет скалистый озеленённый мыс. Сохрани утверждённые материалы и архитектуру по приложенному объектному референсу; если обязательного референса нет, не подменяй его фантазией. Формат мастер-кадра: 6144 × 4608 px, 4:3, sRGB; реальная исходная детализация, не фиктивное увеличение. Мастер 4:3; для совместимых 3:4 и 16:9 кропов смысловой центр держать в центральных 56% ширины и 75% высоты. Сохранить главный объект, его опоры/ограждения и узнаваемое окружение. Для 9:16 доступно лишь 42% ширины, поэтому такой кроп не гарантирован. Использовать независимые точки кадрирования для phone/laptop/wide по размерам матрицы. Если объект теряет смысл, согласовать дополнительный ракурс; не растягивать, не зеркалить и не достраивать объекты. Натуральная вода, растительность, физически правдоподобный масштаб и оптика, ровные архитектурные вертикали; профессиональная съёмка, без CGI/3D/game look, неона, HDR-ореолов, выдуманных зданий, островов, трасс, логотипов и надписей. Учитывай возраст и сопровождение из канонических правил. Не переносить золотые декоративные рисунки Midnight Obsidian в физическую архитектуру; фон сайта остаётся отдельным ресурсом. Условие запуска: Утвердить архитектуру/интерьер и перечень видимых удобств. Категория существует, финальная планировка не утверждена.

Специальные правила объекта и безопасности из данного ТЗ обязательны. Общий стандарт: [06-photo-standard.md](#универсальный-фотографический-стандарт). Перед запуском приложить визуальный паспорт и необходимые референсы, затем проверить все целевые кропы; неизвестные соседства не восстанавливать по воображению.


---



## Точные связи мини-планировщика

См. [evidence/mini-planner-bindings.csv](README.md#дополнительные-материалы-аудита): сценарий, интересы, конкретная morning/afternoon/evening позиция, ID и объект. Поле allowed_photo_ids в матрице перечисляет все допустимые исходники для каждой позиции; типовой photo_id не единственный.
