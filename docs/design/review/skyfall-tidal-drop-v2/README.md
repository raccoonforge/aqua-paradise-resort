# ART-11 и ART-15 — новые кандидаты v2

**Статус: повторная художественная приёмка, без интеграции.** Ветка `feat/premium-redesign`. Основание — замечания пользователя к конструктивным ошибкам Skyfall и сходству Tidal Drop с Velocity Racers.

Приёмка остальных кадров зафиксирована: **ART-05–10 и ART-12–14 утверждены без изменений**. ART-11 v1 отклонён, ART-15 v1 отправлен на доработку. Все файлы первой серии, включая отклонённые оригиналы, сохранены без изменений.

## Результаты

- [Сравнение оригиналов v1 и кандидатов v2](ART-11-15-v1-v2-comparison.jpg): слева исходные отклонённые кадры, справа новые; верхний ряд Skyfall, нижний Tidal Drop. Полные кадры без кропа и коррекции.
- [ART-11 Skyfall v2](ART-11-skyfall-v2.png), нативный PNG 1448×1086, 4:3.
- [ART-15 Tidal Drop v2](ART-15-tidal-drop-v2.png), нативный PNG 1448×1086, 4:3.

## ART-11: что изменено и проверено

Полностью новая генерация. Фиксированная закрытая капсула с прозрачной дверью; посетитель стоит внутри перед запуском, сотрудник снаружи у пульта. Пол закрыт в показанный момент, видны его контур и элементы механизма. Под ним по одной вертикальной оси проходит непрерывная круглая закрытая труба, уходящая сквозь проём площадки вниз. Открытый жёлоб исключён. В кадре читаются соединительные фланцы, крепления трубы, металлические колонны, диагональные связи, ограждённая техническая площадка и лестница.

Ракурс выбран так, чтобы видеть одновременно капсулу и закрытую трубу под площадкой. Открывание пола задано промптом как механизм старта; сам момент движения створок на статичном кадре не демонстрируется. Конструктивная достоверность оценивается по видимым связям, без заявления об инженерной сертификации.

География сохранена: северная внутренняя возвышенность Adrenaline Peak, тропический склон без моря и соседних аттракционов.

## ART-15: что изменено и проверено

Полностью новая композиция: низкий ракурс на высокую узкую башню, один длинный почти вертикальный спуск, небольшие фигуры наверху и пальмы для масштаба. Вместо широкой пологой горки — одна закрытая труба с плавным нижним переходом в отдельный горизонтальный приёмный канал. Приём расположен на суше, ограничен стенками; рядом есть сухая площадка и доступ персонала. В кадре нет моря, открытого морского финиша, параллельных дорожек или стартовой капсулы Skyfall.

Высота и крутизна переданы перспективой и вертикальной композицией, без выдуманных числовых размеров. География — локальный склон Ocean Rush Complex в северо-восточной Ocean Bay. Новая конструкция является художественным кандидатом по текстовому канону и уточнениям пользователя.

## Стиль и сохранность оригиналов

Luxury Cinematic: натуральные материалы, физически правдоподобный дневной свет, тропическая зелень, бирюзовые элементы и обсидиановые опоры с мягкими тёплыми акцентами. Приложенные Ocean Bay Hero и сравнительный лист утверждённых ART-01–04 использованы только как ориентиры палитры и качества материалов. Ошибочные кадры v1 не подавались генератору как конструктивный референс.

Нативные PNG скопированы из результатов генерации байт в байт; совпадение проверено SHA-256. Дополнительная необратимая цветокоррекция, ретушь, апскейл и фильтры не применялись. На сравнительном листе выполнены только уменьшение изображений и размещение подписей вне кадров. Существующая CSS-коррекция сайта не менялась и к новым кандидатам не подключалась.

## Полные производственные промпты

### Skyfall v2

```text
Create a NEW standalone ART-11 Skyfall candidate v2 for the fictional premium Aqua Paradise Resort. Landscape 4:3. Photographically credible Luxury Cinematic architectural image, extraordinarily believable water-slide launch mechanism, not a blueprint, cutaway, illustration, CGI/game render. Existing attached Ocean Bay Hero and approved four-image reference sheet are only references for materials, tropical atmosphere and palette. Do NOT copy their buildings, foreground flowers or layouts.

SUBJECT: Skyfall at the elevated northern INLAND Adrenaline Peak. A FIXED vertical single-person trapdoor launch capsule on a realistic dry technical platform, one adult visitor standing INSIDE behind a closed transparent front door and one uniformed employee OUTSIDE beside the capsule control station. Natural human proportions and size.

CRITICAL PHYSICAL GEOMETRY, highest priority: The capsule is a sealed, enclosed launch chamber with a transparent curved safety door, sturdy continuous frame, a top enclosure and an interlocked hinged horizontal trapdoor FLOOR under the standing rider. Capture the BEFORE-LAUNCH moment, trapdoor CLOSED and rider's feet resting on it, crossed arms. Through clear lower door show the trapdoor seam and hinge without any labels. When this floor opens the rider would fall VERTICALLY straight down into a fully enclosed water-slide pipe. Therefore a continuous ROUND CLOSED TUBE must connect DIRECTLY to the BOTTOM of the capsule, perfectly aligned beneath the trapdoor. The capsule bottom collar joins the closed cylindrical pipe seamlessly with a visible robust bolted flange. The pipe extends down through the floor opening of the platform. Show a generous vertical length of this CLOSED circular pipe below the platform so its uninterrupted connection is unmistakable. No open trough, no exposed flume, no open slide mouth, no gap, no disconnected pipe, no horizontal exit in front of the capsule, no rider falling through open air. This is a real trapdoor waterslide launch, not a lift, spaceship or open seated chute.

COMPOSITION: medium-wide architectural three-quarter SIDE view from a nearby protected observation/service position slightly below launch-deck height, showing the FULL capsule, employee, visitor and the closed pipe below. Capsule centrally located, dry deck wrapping around its REAR/SIDE only, transparent front and tube connection unobscured by rails. Stout graphite steel columns and diagonal bracing support the deck; pipe has mounting collars to the structural tower, service access and practical guardrails. Small refined cedar shade roof high over the platform, sandstone/bronze accents secondary to accurate engineering. No other slides, no sea or hotel, no readable signage or numbers. Local photographic scene, no claimed precise engineering dimensions.

LIGHT AND COLOUR: soft expressive daylight during operating hours, deep natural tropical green canopy, turquoise composite capsule housing and continuous enclosed pipe, dark obsidian structural steel, subtle warm bronze light accents. Photographic material roughness, realistic transparent door reflections, calm natural water flow internal to closed pipe. Preserve native ungraded colour with shadow detail, no baked dark teal overlay, no artificial LUT or desaturation, no crushed blacks; future CSS provides grading. Master 4:3, native resolution, no borders/text/watermarks, no collage.
```

### Tidal Drop v2

```text
Create a completely NEW standalone ART-15 Tidal Drop candidate v2, NOT a modification of the earlier low sweeping slide composition. Landscape 4:3. Premium Luxury Cinematic, photographically credible architectural visualization with natural materials, optics and scale, absolutely no obvious CGI/video game rendering. Attached Hero and approved ART-01–04 sheet are ONLY colour/material/world references. Do NOT copy the multi-lane Velocity Racers composition, broad diagonal racing ramp, repeated parallel slides or pagoda resort scene.

GEOGRAPHY: Tidal Drop is ONE extreme tower-drop water slide in Ocean Rush Complex on the coastal hillside of northeastern Ocean Bay on the SAME fictional Aqua Paradise island. This local view is on LAND; EXCLUDE the sea completely to make land-only safe runout unmistakable. No neighboring attractions, no hotel, no islands or made-up mountain panorama. A vegetated sloping tropical site, not an ocean cliff.

COMPOSITION AND EXPERIENCE: dramatic LOW three-quarter view from a dry landscaped viewpoint near the bottom looking UP at a very tall, narrow start tower, its launch platform rising well ABOVE the palms. Tall tower in centre-right vertical third, SINGLE slender steep drop beside it. Emphasize the large vertical height difference, long near-vertical main plunge, sudden sense of falling. A small guarded start platform at the very top, compact refined cedar sun canopy, a visible staircase with landings and structurally plausible graphite steel bracing. A few tiny staff/visitor silhouettes behind top safety rails make the scale convincing. No Skyfall launch capsule: Tidal Drop remains a distinct high-tower body slide with controlled entry.

SLIDE PHYSICS: one continuous closed turquoise composite water-slide tube with circular cross section, plausibly jointed sections and support collars; a single long STEEP NEAR-VERTICAL drop, not a gentle multi-wave hill or racing ramp, not a corkscrew/loop or multiple lanes. At the bottom, a generous smooth large-radius transition gradually reduces the downward slope and directs the tube exit into a LONG engineered horizontal braking/runout lane on land, contained by raised walls, with a controlled shallow receiving basin beyond and an exit stair/platform. Show the whole relationship from the high start to the enclosed drop to the bottom curve and contained runout. No sharp right-angle elbow at the bottom, no sudden dead-end pool, no jump through open air. Long runout may recede across the lower foreground, physically and visually separate from decorative garden water. Dry service path, railings and rescue/staff access flank the runout, no swimmers in the deceleration lane. Tower columns founded on substantial bases, tube support brackets and structural bracing logically connected. Do not add an open flume immediately under a launch capsule (there is NO capsule). No person actually descending is necessary.

ART DIRECTION: dramatic high vertical silhouette with ample sky behind, detailed deep tropical greens on lower hillside, graphite/obsidian supports, rich teal tube, warm sandstone, restrained bronze highlights. Bright natural late-morning daylight with expressive dimensional shadows, photographic texture and restrained reflections, real human proportions and scale. Sense of vertigo through camera height and composition, not impossible proportions. Keep native ungraded colour and shadow detail: no baked CSS filter, teal overlay, heavy dark grading, fake gold architecture or fantasy lighting. Later CSS does grading. Native 4:3 master, no upscale, no text, logos, borders or collage. This is an artistic review candidate consistent with canonical named elements, not an assertion of engineering certification.
```


## Проверки и границы

Визуально проверены оба нативных кадра и лист сравнения. Проверены декодирование PNG/JPEG, размеры, пропорции, идентичность копий оригинальным генерациям, ссылки и `git diff --check`. Файлы предыдущих серий и весь `src/`/`public/` сверены с исходным коммитом `8ff3176b94987056176da81876f66adf71b12eab`: изменений нет. Новые файлы находятся только в документации и не импортируются приложением. Сборка и тесты приложения не запускались, поскольку код не менялся. Новые изображения не интегрированы; публикация и merge в `main` не выполнялись.
