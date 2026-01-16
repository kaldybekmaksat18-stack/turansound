# ⚡ Быстрое исправление: "Could not find the table 'artist_profiles'"

## Проблема
База данных Supabase подключена, но таблицы ещё не созданы.

## Решение (2 минуты)

### 1. Откройте Supabase Dashboard
👉 https://supabase.com/dashboard/project/hpcwkbkglggimwcbxpoh

### 2. Перейдите в SQL Editor
В левом меню нажмите **SQL Editor**

### 3. Выполните SQL-скрипт
Нажмите **New Query** и вставьте этот SQL:

```sql
-- Таблица профилей артистов
CREATE TABLE IF NOT EXISTS public.artist_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  stage_name TEXT,
  real_name TEXT,
  avatar TEXT,
  cover_video TEXT,
  city TEXT,
  languages TEXT[] DEFAULT '{}',
  genres TEXT[] DEFAULT '{}',
  bio TEXT,
  verified BOOLEAN DEFAULT false,
  experience INTEGER DEFAULT 0,
  total_performances INTEGER DEFAULT 0,
  base_price NUMERIC DEFAULT 0,
  price_ranges JSONB DEFAULT '{}',
  included_services TEXT[] DEFAULT '{}',
  additional_services JSONB DEFAULT '[]',
  availability JSONB DEFAULT '{"weekdays": true, "weekends": true, "holidays": true}',
  willing_to_travel BOOLEAN DEFAULT false,
  travel_regions TEXT[] DEFAULT '{}',
  audio_tracks JSONB DEFAULT '[]',
  videos JSONB DEFAULT '[]',
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица профилей заказчиков
CREATE TABLE IF NOT EXISTS public.customer_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  avatar TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  event_preferences TEXT[] DEFAULT '{}',
  budget_range JSONB DEFAULT '{"min": 0, "max": 0}',
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_artist_profiles_user_id ON public.artist_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_profiles_user_id ON public.customer_profiles(user_id);

-- RLS
ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- Политики для artist_profiles
DROP POLICY IF EXISTS "Artist profiles are viewable by everyone" ON public.artist_profiles;
CREATE POLICY "Artist profiles are viewable by everyone"
  ON public.artist_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create their own artist profile" ON public.artist_profiles;
CREATE POLICY "Users can create their own artist profile"
  ON public.artist_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own artist profile" ON public.artist_profiles;
CREATE POLICY "Users can update their own artist profile"
  ON public.artist_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Политики для customer_profiles
DROP POLICY IF EXISTS "Customer profiles are viewable by everyone" ON public.customer_profiles;
CREATE POLICY "Customer profiles are viewable by everyone"
  ON public.customer_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create their own customer profile" ON public.customer_profiles;
CREATE POLICY "Users can create their own customer profile"
  ON public.customer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own customer profile" ON public.customer_profiles;
CREATE POLICY "Users can update their own customer profile"
  ON public.customer_profiles FOR UPDATE USING (auth.uid() = user_id);
```

### 4. Нажмите RUN
Кнопка **Run** внизу справа или нажмите `Ctrl+Enter`

### 5. Готово! ✅
Перезагрузите приложение TuranSound - ошибка исчезнет.

## Проверка
Выполните в SQL Editor:
```sql
SELECT COUNT(*) FROM public.artist_profiles;
```

Если запрос выполнился без ошибки - всё работает! 🎉

---

**Подробная документация**: `/supabase/DATABASE_SETUP.md`
