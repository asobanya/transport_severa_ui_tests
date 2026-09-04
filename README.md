# 🚌 UI-тесты для портала "Транспорт Севера"

Набор автоматизированных E2E (end-to-end) тестов для веб-портала "Транспорт Севера".
Проект реализован на **TypeScript** + **Playwright** с использованием паттернов **Page Object Model (POM)** и **Test-as-Code** (синхронизация с Testy TMS).

---

## 🚀 Быстрый старт

### 1. Клонирование репозитория и установка зависимостей

```bash
git clone <URL_вашего_репозитория>
cd transport-severa-ui-tests
npm ci
```

### 2. Настройка окружения (`.env`)

Создайте файл `.env` в корне проекта на основе преднастроенного шаблона:

```bash
cp .env.example .env
```

Заполните `.env` актуальными кредами и настройками:

```dotenv
# URL тестового стенда
BASE_URL='https://pub-dev.transflow.ru/#/'

# Учетные данные пользователей
USER1_LOGIN=your_user1_login
USER1_PASSWORD=your_user1_password

USER2_LOGIN=your_user2_login
USER2_PASSWORD=your_user2_password

# Интеграция с Testy TMS
TESTY_API_URL=https://testy.altech.local/api/v1/
TESTY_USERNAME=your_tms_login
TESTY_PASSWORD=your_tms_password
TESTY_PROJECT_ID=2
```

> **Важно:** Файл `.env` и папка `.auth/` находятся в `.gitignore` и не должны попадать в Git!

---

## ⌨️ Команды и NPM-скрипты

Все ключевые команды вынесены в `package.json`.

| Команда                | Описание                                                               |
| :--------------------- | :--------------------------------------------------------------------- |
| `npm run test`         | Запуск **всех** тестов локально (без отправки результатов в TMS).      |
| `npm run test:no-auth` | Запуск **только публичных** тестов без авторизации (`@no-auth`).       |
| `npm run test:auth`    | Запуск **только авторизованных** тестов (`@auth`).                     |
| `npm run test:tms`     | Запуск тестов с отправкой результатов и логов в Testy TMS.             |
| `npm run tms-sync`     | Синхронизация тест-кейсов из TMS в локальные Markdown-файлы (`docs/`). |
| `npm run lint`         | Проверка кода через ESLint.                                            |
| `npm run format`       | Автоматическое форматирование кода через Prettier.                     |

---

## 🛠️ Различные сценарии запуска

### 1. Запуск по типам тестов (Гость vs Авторизованный)

Чтобы избежать падений тестов из-за несоответствия сессии (гость / залогинен), используйте фильтрацию по тегам:

```bash
# Запуск гостевых сценариев (без авторизации)
npm run test:no-auth

# Запуск авторизованных сценариев
npm run test:auth
```

### 2. Запуск по конкретным проектам (Браузерам / Контекстам)

Если нужно запустить тесты под конкретным проектом из `playwright.config.ts`:

```bash
# Гостевой прогон (без сессии)
npx playwright test --project=chromium-no-auth --grep @no-auth

# Прогон под основным пользователем User 1
npx playwright test --project=chromium-user1

# Прогон под пользователем User 2
npx playwright test --project=chromium-user2
```

### 3. Интерактивная отладка (UI Mode & Trace Viewer)

```bash
# Открыть интерактивный UI-режим Playwright
npx playwright test --ui

# Посмотреть детальный HTML-отчет после прогона
npx playwright show-report
```

### 4. Регрессионный прогон с отправкой результатов в TMS

```bash
# Прогон с привязкой к конкретному тест-плану в Testy (например, ID 430)
TESTY_PLAN_ID=430 npm run test:tms
```

---

## 🏷 Система тегов (Tagging Rules)

В проекте используется синтаксис объектов конфигурации `{ tag: '...' }` или `{ tag: ['...'] }`:

```typescript
// 1. Гостевые тесты (выполняются в chromium-no-auth)
test('Проверка карты [TESTY-102]', { tag: '@no-auth' }, async ({ page }) => { ... });

// 2. Тесты для авторизованных пользователей (User 1 / User 2)
test('Успешный выход из системы [TESTY-1139]', { tag: '@auth' }, async ({ loginPage }) => { ... });

// 3. Тесты только для второго пользователя
test('Проверка чужих данных [TESTY-1150]', { tag: '@user2' }, async ({ page }) => { ... });

// 4. Мульти-тегирование
test('Проверка роли [TESTY-1200]', { tag: ['@auth', '@user2'] }, async ({ page }) => { ... });
```

---

## 📂 Структура проекта

```text
├── docs/                 # Сгенерированные Markdown-файлы с тест-кейсами из TMS
├── scripts/              # Интеграционные скрипты (tms-sync.ts, tms-reporter.ts)
├── setup/                # Auth-сетапы для сохранения storageState (.auth/*.json)
├── tests/
│   ├── data/             # Тестовые данные (пользователи, константы, сообщения ошибок)
│   ├── fixtures/         # Кастомные фикстуры Playwright (авто-инициализация POM-страниц)
│   ├── pages/            # Page Object Model классы страниц
│   └── tests/            # Файлы автотестов (*.test.ts)
├── .env.example          # Шаблон переменных окружения
├── playwright.config.ts  # Конфигурация Playwright (Проекты, TMS-репортер, BaseURL)
└── package.json          # Зависимости и скрипты запуска
```

---

## 🔄 Интеграция с Testy TMS

### 📥 Выгрузка тест-кейсов из TMS в `.md`

Для обновления документации и передачи контекста в AI-ассистенты:

```bash
# Обновить весь проект (ID из .env)
npm run tms-sync

# Обновить конкретную suite (например, ID 173)
npx ts-node scripts/tms-sync.ts -s 173

# Вытянуть конкретный кейс (например, ID 562)
npx ts-node scripts/tms-sync.ts -c 562
```

### 📤 Автоматическая отправка статусов

При запуске `npm run test:tms` кастомный репортер ищет ID вида `[TESTY-123]` в названии теста и проставляет статусы (`Passed`, `Failed`, `Skipped`) прямо в Testy TMS.
