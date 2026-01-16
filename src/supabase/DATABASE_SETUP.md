# Supabase Database Setup для TuranSound

## Быстрая установка

### Способ 1: Через Supabase Dashboard (рекомендуется)

1. Откройте ваш проект Supabase: https://supabase.com/dashboard/project/hpcwkbkglggimwcbxpoh
2. Перейдите в раздел **SQL Editor** (слева в меню)
3. Нажмите **New Query**
4. Скопируйте содержимое файла `/supabase/migrations/001_create_profiles.sql`
5. Вставьте в редактор SQL
6. Нажмите **Run** (или Ctrl+Enter)

### Способ 2: Через Supabase CLI

```bash
# Установите Supabase CLI (если ещё не установлен)
npm install -g supabase

# Логин в Supabase
supabase login

# Подключитесь к вашему проекту
supabase link --project-ref hpcwkbkglggimwcbxpoh

# Примените миграцию
supabase db push
```

## Что создаётся

### Таблицы

1. **artist_profiles** - Профили артистов
   - Основная информация (имя, био, аватар)
   - Жанры, языки, город
   - Ценообразование и услуги
   - Медиа-контент (аудио, видео, фото)
   - Доступность и регионы выезда

2. **customer_profiles** - Профили заказчиков
   - Контактная информация
   - Предпочтения по мероприятиям
   - Бюджетные диапазоны

### Безопасность (RLS)

- Все профили доступны для чтения всем пользователям
- Пользователи могут создавать и редактировать только свои профили
- Аутентификация через Supabase Auth

### Индексы

Оптимизированы запросы по:
- user_id
- city (для геофильтрации)
- genres (для поиска по жанрам)

## Проверка установки

После применения миграции выполните в SQL Editor:

```sql
-- Проверка создания таблиц
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('artist_profiles', 'customer_profiles');

-- Должно вернуть 2 строки
```

## Тестовые данные (опционально)

Вы можете добавить тестовые данные для проверки:

```sql
-- Создать тестовый профиль артиста
INSERT INTO public.artist_profiles (
  user_id,
  stage_name,
  real_name,
  city,
  genres,
  languages,
  bio,
  base_price,
  verified,
  experience
) VALUES (
  gen_random_uuid(), -- замените на реальный user_id после регистрации
  'Aigerim Soul',
  'Айгерім Касымова',
  'almaty',
  ARRAY['Джаз', 'Соул', 'Поп'],
  ARRAY['Казахский', 'Русский', 'Английский'],
  'Профессиональная певица с 8-летним опытом',
  250000,
  false,
  8
);
```

## Troubleshooting

### Ошибка: "relation already exists"
Это нормально - таблицы уже созданы. Миграция использует `IF NOT EXISTS`.

### Ошибка: "permission denied"
Убедитесь, что вы вошли как владелец проекта в Supabase Dashboard.

### Ошибка: "syntax error"
Убедитесь, что скопировали весь SQL-файл целиком, без обрезаний.

## Следующие шаги

После успешного применения миграции:

1. ✅ Таблицы созданы
2. ✅ Перезагрузите приложение TuranSound
3. ✅ Зайдите в настройки профиля
4. ✅ Данные должны сохраняться в Supabase

## Поддержка

Если возникли проблемы, проверьте:
- Логи в браузере (F12 → Console)
- Логи Supabase (Dashboard → Logs)
- Правильность PROJECT_ID в `/utils/supabase/info.tsx`
