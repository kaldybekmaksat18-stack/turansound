# Руководство по аутентификации TuranSound

## Обзор системы аутентификации

Платформа TuranSound использует полноценную систему аутентификации на базе Supabase Auth для обеспечения безопасного входа и регистрации пользователей.

## Архитектура

### Frontend → Backend → Database

```
┌─────────────┐      ┌──────────────┐      ┌────────────┐
│   Frontend  │ ───▶ │   Server     │ ───▶ │  Supabase  │
│  (React)    │      │  (Hono/Deno) │      │  Auth + KV │
└─────────────┘      └──────────────┘      └────────────┘
```

## Основные компоненты

### 1. Backend (Supabase Edge Function)
- **Путь**: `/supabase/functions/server/index.tsx`
- **Endpoints**:
  - `POST /make-server-fe68ae53/signup` - Регистрация нового пользователя
  - `GET /make-server-fe68ae53/session` - Проверка текущей сессии
  - `GET /make-server-fe68ae53/user/:userId` - Получение профиля пользователя

### 2. Frontend Utilities
- **Путь**: `/utils/supabase/client.tsx`
- **Функции**:
  - `authHelpers.signIn()` - Вход в систему
  - `authHelpers.signOut()` - Выход из системы
  - `authHelpers.getSession()` - Получение текущей сессии
  - `apiHelpers.signUp()` - Регистрация через API
  - `apiHelpers.checkSession()` - Проверка сессии

### 3. UI Components
- **LoginPage** (`/components/LoginPage.tsx`) - Страница входа
- **RegisterPage** (`/components/RegisterPage.tsx`) - 3-шаговая регистрация

## Процесс регистрации

### Шаг 1: Выбор роли
Пользователь выбирает тип аккаунта:
- **Артист** (musician, DJ, tamada, etc.)
- **Заказчик** (event organizer, restaurant, company)

### Шаг 2: Базовая информация
- Полное имя
- Email
- Телефон
- Регион (Алматы, Астана, Ташкент, Бишкек и др.)
- Пароль (минимум 8 символов)

### Шаг 3: Дополнительная информация (для артистов)
- Сценическое имя
- Опыт работы (лет)
- Жанры (можно выбрать несколько)

### Техническая реализация

```typescript
// 1. Отправка данных на сервер
const signUpData = await apiHelpers.signUp({
  email, password, name, phone, region, role,
  // Для артистов:
  stageName, genres, experience
});

// 2. Сервер создаёт пользователя в Supabase Auth
const { data: authData } = await supabase.auth.admin.createUser({
  email, password,
  user_metadata: { name, phone, region, role },
  email_confirm: true // Автоподтверждение email
});

// 3. Дополнительные данные сохраняются в KV Store
await kv.set(`user:${authData.user.id}`, userData);

// 4. Автоматический вход после регистрации
const { session } = await authHelpers.signIn(email, password);
```

## Процесс входа

```typescript
// 1. Ввод email и пароля
const { session } = await authHelpers.signIn(email, password);

// 2. Получение данных пользователя
const { user } = await apiHelpers.checkSession(session.access_token);

// 3. Сохранение в состояние приложения
setCurrentUser(user);
```

## Проверка сессии при загрузке

При запуске приложения автоматически проверяется наличие активной сессии:

```typescript
useEffect(() => {
  const session = await authHelpers.getSession();
  if (session?.access_token) {
    const { user } = await apiHelpers.checkSession(session.access_token);
    setCurrentUser(user);
  }
}, []);
```

## Выход из системы

```typescript
const handleLogout = async () => {
  await authHelpers.signOut();
  setCurrentUser(null);
  navigateTo('home');
};
```

## Хранение данных

### Supabase Auth
- ID пользователя
- Email
- Зашифрованный пароль
- User metadata (name, phone, region, role)

### KV Store
- Полный профиль пользователя
- Дополнительные поля для артистов
- Связь с бронированиями и другими данными

## Безопасность

### ✅ Реализовано
- Шифрование паролей через Supabase Auth
- JWT-токены для аутентификации
- Проверка токенов на сервере
- CORS настроен для безопасности
- SERVICE_ROLE_KEY остаётся на сервере (не утекает в frontend)

### ⚠️ Важные напоминания
- Email автоподтверждается (`email_confirm: true`), так как email-сервер не настроен
- Для продакшена требуется настройка SMTP для отправки писем подтверждения
- Рекомендуется добавить двухфакторную аутентификацию (2FA)

## OAuth Провайдеры (опционально)

В UI есть кнопки для Google и Facebook входа. Для активации:

1. Настройте провайдера в Supabase Dashboard
2. Следуйте инструкциям: https://supabase.com/docs/guides/auth/social-login
3. Обновите код в LoginPage.tsx:

```typescript
const { session } = await supabase.auth.signInWithOAuth({
  provider: 'google' // или 'facebook'
});
```

## Тестирование

### Создание тестового пользователя - Артист
1. Перейдите на страницу регистрации
2. Выберите "Я артист"
3. Введите данные:
   - Email: artist@test.com
   - Пароль: test12345
   - Имя: Тестовый Артист
   - Телефон: +7 777 123 4567
   - Регион: Алматы
   - Сценическое имя: Артист Тест
   - Опыт: 5 лет
   - Жанры: Поп, Джаз

### Создание тестового пользователя - Заказчик
1. Выберите "Я заказчик"
2. Введите данные без артист-специфичных полей

## Troubleshooting

### Ошибка: "User already registered"
- Попробуйте войти вместо регистрации
- Проверьте Supabase Dashboard на наличие пользователя

### Ошибка: "Invalid session"
- Токен истёк или неверный
- Выйдите и войдите снова
- Проверьте логи сервера в Supabase Dashboard

### Ошибка: "Failed to create user"
- Проверьте, что SERVICE_ROLE_KEY настроен
- Убедитесь, что сервер запущен
- Проверьте логи Edge Function

## Расширение функционала

### Добавление новых полей профиля
1. Обновите форму регистрации
2. Добавьте поля в `signUp` endpoint
3. Сохраните в KV Store

### Добавление сброса пароля
1. Используйте `supabase.auth.resetPasswordForEmail()`
2. Настройте email templates в Supabase Dashboard
3. Создайте страницу сброса пароля

### Добавление верификации email
1. Уберите `email_confirm: true`
2. Настройте SMTP в Supabase
3. Создайте endpoint для повторной отправки письма

## Заключение

Система аутентификации TuranSound обеспечивает безопасный вход и регистрацию с поддержкой двух типов ролей (артисты и заказчики), сохранением сессии и полной интеграцией с Supabase Auth и KV Store.
