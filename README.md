# Aqua Paradise Island Resort 🌴

[Русский](#русский) · [English](#english)

## Русский

**Aqua Paradise** — портфолио-проект адаптивного сайта вымышленного тропического острова с аквапарком. Стек: React, TypeScript, Vite, Tailwind CSS. Проект включает тематические зоны, билеты, планировщик и интерактивную карту (разработка ведётся поэтапно).

**Начать работу с документацией:** [docs/README.md](./docs/README.md).  
**Источники истины и история моделей:** [docs/source-of-truth.md](./docs/source-of-truth.md).

### Карта острова
- [Каноническая иллюстративная модель суши v0.4](./docs/data/island-map-landuse-v0.4.json)
- [Предпросмотр схемы](./docs/data/island-map-landuse-v0.4.svg)
- [Метки районов](./docs/data/island-map-markers-v0.4.json)
- [Ограничения реализации](./docs/aqua-paradise-map-readiness-v0.4.md)

География вымышленная. Сетка v0.4 пригодна для прототипирования визуальной карты, но **не** подтверждает реальные дороги, расстояния, расписание шаттлов и время в пути.

### Локальный запуск
```bash
npm install
npm run dev
```
Для проверки геометрии: `node scripts/validate-island-map-v0.4.mjs`.

## English

**Aqua Paradise** is a portfolio web project for a fictional tropical island waterpark resort, built with React, TypeScript, Vite and Tailwind CSS. The experience is developed incrementally.

- [English documentation guide](./docs/README.en.md)
- [Canonical source registry](./docs/source-of-truth.md)
- [Conceptual island land-use data](./docs/data/island-map-landuse-v0.4.json)
- [Map preview](./docs/data/island-map-landuse-v0.4.svg)

The local-coordinate illustration is **not** surveyed geography, and routing/travel times are not yet validated. No real ticket purchase or payment is performed by this demonstration.
