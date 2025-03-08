# API документация

## Основные возможности

- Управление пользователями (CRUD)
- Связь пользователей с задачами
- Каскадное удаление задач при удалении пользователя
- Валидация входных данных
- Централизованная обработка ошибок

## Технологии

- Node.js
- Express.js
- Встроенное хранилище данных (in-memory)

## Структура проекта

```
src/
├── app.js          # Инициализация приложения
├── server.js       # Запуск сервера
├── routes/         # Маршруты API
│   ├── users.js    # Маршруты для пользователей
│   ├── tasks.js    # Маршруты для задач
├── controllers/    # Логика обработки запросов
│   ├── user.js # Контроллер пользователей
│   ├── tasks.js # Контроллер задач
├── models/         # Работа с данными
│   ├── User.js # Модель пользователя
│   ├── Task.js # Модель задачи
├── middleware/     # Промежуточное ПО
├── config/         # Конфигурация
```

## Новая функциональность

- Добавлены CRUD-операции для пользователей (реализованы в `routes/users.js` и `controllers/user.js`)
- Реализована связь пользователей с задачами через поле `userId` (реализовано в `models/Task.js` и `controllers/tasks.js`)
- Каскадное удаление задач при удалении пользователя (логика в `controllers/user.js`)
- Валидация входных данных при создании и обновлении пользователя (реализовано в `middleware/validation.js`)

## Примеры API-запросов

### 1. Получение всех пользователей (GET)
**URL:** `GET http://localhost:3000/users`

**Пример ответа (200 OK):**
```json
[
  { "id": 1, "fullName": "Аскар Демир", "job": "Backend Developer", "age": 32, "city": "Алматы" },
  { "id": 2, "fullName": "Алина Салимова", "job": "Frontend Developer", "age": 28, "city": "Астана" },
  { "id": 3, "fullName": "Иван Петров", "job": "DevOps Engineer", "age": 35, "city": "Санкт-Петербург" },
  { "id": 4, "fullName": "Дмитрий Иванов", "job": "Full Stack Developer", "age": 30, "city": "Казань" },
  { "id": 5, "fullName": "Мария Корапин", "job": "Mobile Developer", "age": 27, "city": "Актау" }
]
```

---

### 2. Получение пользователя по ID (GET)
**URL:** `GET http://localhost:3000/users/1`

**Пример ответа (200 OK):**
```json
{
  "id": 1,
  "fullName": "Аскар Демир",
  "job": "Backend Developer",
  "age": 32,
  "city": "Алматы"
}
```

**Ошибка (404 Not Found):**
```json
{
  "error": "Пользователь не найден"
}
```

---

### 3. Создание пользователя (POST)
**URL:** `POST http://localhost:3000/users`

**Headers:**
```
Content-Type: application/json
```

**Тело запроса:**
```json
{
  "fullName": "Асхат",
  "job": "Full Stack Developer",
  "age": 20,
  "city": "Павлодар"
}
```

**Успешный ответ (201 Created):**
```json
{
  "id": 6,
  "fullName": "Асхат",
  "job": "Full Stack Developer",
  "age": 20,
  "city": "Павлодар"
}
```

**Ошибка (400 Bad Request) - отсутствуют обязательные поля:**
```json
{
  "error": "Все поля (fullName, job, age, city) обязательны"
}
```

---

### 4. Обновление пользователя (PUT)
**URL:** `PUT http://localhost:3000/users/1`

**Headers:**
```
Content-Type: application/json
```

**Тело запроса:**
```json

{
  "fullName": "Асхат",
  "job": "Backend Developer",
  "age": 20,
  "city": "Павлодар"
}
```

**Успешный ответ (200 OK):**
```json
{
  "id": 6,
  "fullName": "Асхат",
  "job": "Backend Developer",
  "age": 20,
  "city": "Павлодар"
}
```

**Ошибка (404 Not Found):**
```json
{
  "error": "Пользователь не найден"
}
```

---

### 5. Удаление пользователя (DELETE)
**URL:** `DELETE http://localhost:3000/users/1`

**Успешный ответ:**  
Статус 204 No Content (тело ответа пустое)

**Ошибка (404 Not Found):**
```json
{
  "error": "Пользователь не найден"
}
```

---

### 6. Получение задач пользователя (GET)
**URL:** `GET http://localhost:3000/tasks?userId=1`

**Пример ответа (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Изучить Express 1",
    "completed": false,
    "userId": 1
  }
]
```

**Ошибка (404 Not Found) - если у пользователя нет задач:**
```json
{
  "error": "Задачи не найдены для данного пользователя"
}
```

