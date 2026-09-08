# Digital Business Card API

Backend-приложение в формате **цифровой визитки специалиста**.

Приложение предоставляет информацию о специалисте, его профессиональных навыках, опыте работы и реализованных проектах через **GraphQL API**.

При запуске приложения база данных автоматически подготавливается и заполняется необходимыми данными.

---

## 🚀 Стек технологий

В проекте используются:

* **TypeScript** — основной язык разработки;
* **Node.js** — runtime environment;
* **NestJS** — backend framework;
* **GraphQL** — API для получения данных;
* **Apollo Server / Apollo Sandbox** — интерфейс для работы с GraphQL API;
* **Prisma** — ORM для работы с базой данных;
* **Docker / Docker Compose** — контейнеризация приложения и базы данных;
* **Git** — система контроля версий.

---

## 📋 Функциональность

Приложение позволяет получить через GraphQL API:

* 👤 информацию о профиле;
* 🛠️ список профессиональных навыков;
* 💼 опыт работы;
* 🚀 список реализованных проектов.

Все данные хранятся в базе данных и доступны через GraphQL API.

---

# 👤 Профиль

Профиль специалиста содержит:

* имя;
* краткое описание;
* ссылки на GitHub и другие профессиональные ресурсы.

### Пример GraphQL-запроса

```graphql
query {
  profile {
    name
    description
    links {
      title
      url
    }
  }
}
```

---

# 🛠️ Навыки

API предоставляет список профессиональных навыков специалиста.

### Пример запроса

```graphql
query {
  skills {
    id
    name
  }
}
```

### Пример ответа

```json
{
  "data": {
    "skills": [
      {
        "id": "1",
        "name": "TypeScript"
      },
      {
        "id": "2",
        "name": "Node.js"
      },
      {
        "id": "3",
        "name": "NestJS"
      }
    ]
  }
}
```

---

# 💼 Опыт работы

Для каждой позиции хранится:

* компания;
* должность;
* период работы;
* достижения.

### Пример GraphQL-запроса

```graphql
query {
  experiences {
    company
    position
    startDate
    endDate
    achievements
  }
}
```

---

# 🚀 Проекты

Каждый проект содержит:

* название;
* ссылку на проект или репозиторий.

### Пример GraphQL-запроса

```graphql
query {
  projects {
    name
    url
  }
}
```

---

# 🏗️ Архитектура

Приложение построено на базе **NestJS** и использует модульную архитектуру.

Примерная структура проекта:

```text
.
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── profile/
│   │   ├── profile.module.ts
│   │   ├── profile.resolver.ts
│   │   └── profile.service.ts
│   │
│   ├── skills/
│   │   ├── skills.module.ts
│   │   ├── skills.resolver.ts
│   │   └── skills.service.ts
│   │
│   ├── experience/
│   │   ├── experience.module.ts
│   │   ├── experience.resolver.ts
│   │   └── experience.service.ts
│   │
│   ├── projects/
│   │   ├── projects.module.ts
│   │   ├── projects.resolver.ts
│   │   └── projects.service.ts
│   │
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🗄️ База данных

Для работы с базой данных используется **Prisma ORM**.

Основная схема базы данных находится в:

```text
prisma/schema.prisma
```

Миграции находятся в:

```text
prisma/migrations/
```

Seed-скрипт:

```text
prisma/seed.ts
```

---

## 🔄 Автоматическая подготовка базы данных

При запуске приложения база данных автоматически:

1. запускается;
2. подготавливается;
3. получает необходимые миграции;
4. заполняется начальными данными;
5. становится доступной для приложения.

Seed содержит данные:

* профиля;
* профессиональных навыков;
* опыта работы;
* проектов.

Повторный запуск seed не должен приводить к появлению дубликатов.

---

# 🐳 Docker

Проект содержит Docker-конфигурацию для запуска backend-приложения и базы данных.

Основные файлы:

```text
Dockerfile
docker-compose.yml
```

## Запуск

```bash
docker compose up --build
```

После запуска приложение будет доступно по адресу:

```text
http://localhost:3000
```

GraphQL API:

```text
http://localhost:3000/graphql
```

---

## Остановка

Остановить контейнеры:

```bash
docker compose down
```

Остановить контейнеры и удалить volumes:

```bash
docker compose down -v
```

> ⚠️ Команда `docker compose down -v` удаляет данные локальной базы данных.

---

# 💻 Локальный запуск

Для запуска без Docker необходимо предварительно запустить PostgreSQL и указать корректный `DATABASE_URL`.

## 1. Клонирование репозитория

```bash
git clone <repository-url>
```

Перейдите в директорию проекта:

```bash
cd <project-directory>
```

## 2. Установка зависимостей

```bash
npm install
```

## 3. Настройка переменных окружения

Создайте файл `.env`:

```bash
touch .env
```

Добавьте подключение к базе данных:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/digital_card"
```

## 4. Prisma

Сгенерировать Prisma Client:

```bash
npx prisma generate
```

Применить миграции:

```bash
npx prisma migrate deploy
```

Заполнить базу данными:

```bash
npm run seed
```

## 5. Запуск приложения

Для development-режима:

```bash
npm run start:dev
```

Для production:

```bash
npm run build
npm run start:prod
```

---

# 🎮 Apollo Sandbox

После запуска приложения GraphQL API доступен по адресу:

```text
http://localhost:3000/graphql
```

Откройте этот URL в браузере, чтобы получить доступ к **Apollo Sandbox** и выполнять GraphQL-запросы.

---

# 🔎 Пример комплексного запроса

Можно получить всю информацию о специалисте одним GraphQL-запросом:

```graphql
query {
  profile {
    name
    description
    links {
      title
      url
    }
  }

  skills {
    id
    name
  }

  experiences {
    company
    position
    startDate
    endDate
    achievements
  }

  projects {
    name
    url
  }
}
```

Такой подход позволяет клиенту самостоятельно определить, какие данные ему необходимы, используя возможности GraphQL.

---

# 🧪 Проверка API

После запуска приложения откройте:

```text
http://localhost:3000/graphql
```

В Apollo Sandbox выполните:

```graphql
query {
  profile {
    name
    description
  }
}
```

Если приложение настроено корректно, API вернёт данные профиля.

Также можно проверить остальные разделы:

```graphql
query {
  skills {
    name
  }

  experiences {
    company
    position
  }

  projects {
    name
    url
  }
}
```

---

# 🧰 Prisma Studio

Для просмотра содержимого базы данных можно использовать Prisma Studio:

```bash
npx prisma studio
```

После запуска Prisma Studio будет доступна в браузере.

---

# 📦 Основные команды

| Команда                     | Описание                         |
| --------------------------- | -------------------------------- |
| `npm install`               | Установка зависимостей           |
| `npm run start:dev`         | Запуск в development mode        |
| `npm run build`             | Сборка проекта                   |
| `npm run start:prod`        | Запуск production версии         |
| `npm run seed`              | Заполнение базы данных           |
| `npx prisma generate`       | Генерация Prisma Client          |
| `npx prisma migrate dev`    | Создание и применение миграции   |
| `npx prisma migrate deploy` | Применение существующих миграций |
| `npx prisma studio`         | Запуск Prisma Studio             |
| `docker compose up --build` | Запуск проекта через Docker      |
| `docker compose down`       | Остановка Docker-контейнеров     |

---

# 📊 Требования тестового задания

| Требование                   | Реализация              |
| ---------------------------- | ----------------------- |
| Git                          | ✅ Git repository        |
| TypeScript                   | ✅ Основной язык проекта |
| Node.js                      | ✅ Runtime               |
| NestJS                       | ✅ Backend framework     |
| Prisma                       | ✅ ORM                   |
| GraphQL                      | ✅ API                   |
| Apollo Sandbox               | ✅ GraphQL Playground    |
| Docker                       | ✅ Контейнеризация       |
| Профиль                      | ✅                       |
| Навыки                       | ✅                       |
| Опыт работы                  | ✅                       |
| Проекты                      | ✅                       |
| Автоматическая подготовка БД | ✅                       |
| Автоматическое заполнение БД | ✅                       |
