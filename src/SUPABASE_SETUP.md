# Настройка Supabase для TuranSound

## 🚀 Быстрая установка (3 минуты)

### Шаг 1: Подключение Supabase

Supabase уже подключен к проекту:
- **Project ID**: `hpcwkbkglggimwcbxpoh`
- **URL**: `https://hpcwkbkglggimwcbxpoh.supabase.co`

### Шаг 2: Создание таблиц базы данных

1. Откройте ваш проект Supabase: https://supabase.com/dashboard/project/hpcwkbkglggimwcbxpoh
2. Перейдите в **SQL Editor** (левое меню)
3. Нажмите **New Query**
4. Скопируйте весь SQL из файла `/supabase/migrations/001_create_profiles.sql`
5. Вставьте и нажмите **Run** (Ctrl+Enter)

### Шаг 3: Проверка

После выполнения SQL выполните проверку:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('artist_profiles', 'customer_profiles');
```

Должно вернуть 2 строки ✅

## Что создается

### Таблицы

#### 1. Таблица профилей артистов

```sql
-- Создание таблицы artist_profiles
CREATE TABLE artist_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  stage_name TEXT,
  real_name TEXT,
  avatar TEXT,
  cover_video TEXT,
  city TEXT,
  languages TEXT[],
  genres TEXT[],
  bio TEXT,
  verified BOOLEAN DEFAULT FALSE,
  experience INTEGER DEFAULT 0,
  total_performances INTEGER DEFAULT 0,
  base_price INTEGER DEFAULT 0,
  price_ranges JSONB DEFAULT '{}'::jsonb,
  included_services TEXT[],
  additional_services JSONB DEFAULT '[]'::jsonb,
  availability JSONB DEFAULT '{"weekdays": true, "weekends": true, "holidays": true}'::jsonb,
  willing_to_travel BOOLEAN DEFAULT FALSE,
  travel_regions TEXT[],
  audio_tracks JSONB DEFAULT '[]'::jsonb,
  videos JSONB DEFAULT '[]'::jsonb,
  photos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX idx_artist_profiles_user_id ON artist_profiles(user_id);
CREATE INDEX idx_artist_profiles_city ON artist_profiles(city);
CREATE INDEX idx_artist_profiles_verified ON artist_profiles(verified);

-- RLS (Row Level Security)
ALTER TABLE artist_profiles ENABLE ROW LEVEL SECURITY;

-- Политика: пользователь может читать все профили
CREATE POLICY "Все могут просматривать профили артистов"
  ON artist_profiles FOR SELECT
  USING (true);

-- Политика: пользователь может редактировать только свой профиль
CREATE POLICY "Артисты могут редактировать свой профиль"
  ON artist_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Политика: пользователь может создавать свой профиль
CREATE POLICY "Артисты могут создавать свой профиль"
  ON artist_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### 2. Таблица профилей заказчиков

```sql
-- Создание таблицы customer_profiles
CREATE TABLE customer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  avatar TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  event_preferences TEXT[],
  budget_range JSONB DEFAULT '{"min": 0, "max": 0}'::jsonb,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы
CREATE INDEX idx_customer_profiles_user_id ON customer_profiles(user_id);
CREATE INDEX idx_customer_profiles_city ON customer_profiles(city);

-- RLS
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;

-- Политики
CREATE POLICY "Пользо��атели могут просматривать свой профиль"
  ON customer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Пользователи могут редактировать свой профиль"
  ON customer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Пользователи могут создавать свой профиль"
  ON customer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

#### 3. Триггер для автоматического обновления updated_at

```sql
-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для artist_profiles
CREATE TRIGGER update_artist_profiles_updated_at
  BEFORE UPDATE ON artist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Триггер для customer_profiles
CREATE TRIGGER update_customer_profiles_updated_at
  BEFORE UPDATE ON customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Шаг 4: Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=ваш_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_supabase_anon_key
```

## Шаг 5: Тестирование

1. Войдите в приложение как артист
2. Перейдите в "Настройки профиля"
3. Заполните данные и нажмите "Сохранить"
4. Проверьте в Supabase Dashboard, что данные сохранились

## Примечания

- Все профили по умолчанию публичные (для артистов)
- Профили заказчиков видны только самому пользователю
- Используется Row Level Security для безопасности данных
- Автоматическое обновление поля `updated_at` при любых изменениях