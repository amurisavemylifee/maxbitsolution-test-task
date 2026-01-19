# Cinema Online Booking (Frontend)

## Требования

- Node.js 22+
- npm 11+

## Быстрый старт

```bash
npm install
npm run generate:api
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`.

## Скрипты

| Команда                 | Назначение                              |
| ----------------------- | --------------------------------------- |
| `npm run dev`           | локальная разработка                    |
| `npm run dev:frontend`  | локальная разработка фронтенда          |
| `npm run dev:backend`   | локальная разработка бэкенда            |
| `npm run build`         | типизация + production сборка           |
| `npm run preview`       | предпросмотр собранного приложения      |
| `npm run test`          | запуск юнит-тестов                      |
| `npm run test:watch`    | тесты в watch-режиме                    |
| `npm run test:coverage` | тесты с покрытием                       |
| `npm run generate:api`  | генерация typed-клиента из swagger JSON |

## Генерация API-клиента

1. Выполните `npm run generate:api` — сгенерированные типы и клиент появятся в `src/shared/api/generated`.

## Структура проекта

Проект организован по FSD:

- `app/` — корневые провайдеры (роутер, store, layout)
- `pages/` — конечные страницы (композиция виджетов и фич)
- `widgets/` — крупные блоки страницы
- `features/` — завершённые пользовательские сценарии (логин, выбор мест, оплата)
- `entities/` — модели и UI вокруг доменных сущностей (фильм, кинотеатр, бронирование)
- `shared/` — UI атомы, утилиты, API, стили

## Тестирование

```bash
npm run test
```
