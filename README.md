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
  profiles {
    id
    name
    description
    githubLink
    hhLink
    experience {
      company
      position
      description
      startDate
      endDate
    }
    skills {
      name
    }
    projects {
      name
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
  skills (profileId: "<ID>") {
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
        "name": "TypeScript"
      },
      {
        "name": "Node.js"
      },
      {
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
  experiences (profileId: "<ID>") {
    company
    position
    description
    startDate
    endDate
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
  projects (profileId: "<ID>") {
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
│   ├── database/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   ├── generated/
│   │
│   ├── modules/
│   │   ├── experiences/
│   │   │   ├── experiences.model.ts
│   │   │   ├── experiences.module.ts
│   │   │   ├── experiences.resolver.ts
│   │   │   └── experiences.service.ts
│   │   │
│   │   ├── profiles/
│   │   │   ├── profiles.model.ts
│   │   │   ├── profiles.module.ts
│   │   │   ├── profiles.resolver.ts
│   │   │   └── profiles.service.ts
│   │   │
│   │   ├── projects/
│   │   │   ├── projects.model.ts
│   │   │   ├── projects.module.ts
│   │   │   ├── projects.resolver.ts
│   │   │   └── projects.service.ts
│   │   │
│   │   └── skills/
│   │       ├── skills.model.ts
│   │       ├── skills.module.ts
│   │       ├── skills.resolver.ts
│   │       └── skills.service.ts
│   │
│   ├── app.module.ts
│   └── main.ts
│
└── test/
    └── app.e2e-spec.ts
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

При запуске приложения через Docker база данных автоматически:

* подготавливается с помощью Prisma migrations;
* заполняется начальными данными через seed-скрипт;
* данные для заполнения берутся из переменной окружения SEED_INITIAL_DATA_JSON.

```bash
SEED_INITIAL_DATA_JSON='{"profile":{...},"skills":[...],"experiences":[...],"projects":[...]}'
```

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
yarn install
```

## 3. Настройка переменных окружения

Создайте файл `.env`:

```bash
touch .env
```

Добавьте подключение к базе данных и seed данные:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/graphql-cv-db"
SEED_INITIAL_DATA_JSON='{...}'
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
npx prisma db seed
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

Можно получить всю информацию по каждому резюме одним GraphQL-запросом:

```graphql
query {
  profiles {
    id
    name
    description
    githubLink
    hhLink
    experience {
      company
      position
      description
      startDate
      endDate
    }
    skills {
      name
    }
    projects {
      name
      url
    }
  }
}
```

Такой подход позволяет клиенту самостоятельно определить, какие данные ему необходимы, используя возможности GraphQL.

---
