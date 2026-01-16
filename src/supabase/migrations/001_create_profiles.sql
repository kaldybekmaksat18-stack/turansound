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

-- Индексы для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_artist_profiles_user_id ON public.artist_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_artist_profiles_city ON public.artist_profiles(city);
CREATE INDEX IF NOT EXISTS idx_artist_profiles_genres ON public.artist_profiles USING GIN(genres);
CREATE INDEX IF NOT EXISTS idx_customer_profiles_user_id ON public.customer_profiles(user_id);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_artist_profiles_updated_at ON public.artist_profiles;
CREATE TRIGGER update_artist_profiles_updated_at
  BEFORE UPDATE ON public.artist_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customer_profiles_updated_at ON public.customer_profiles;
CREATE TRIGGER update_customer_profiles_updated_at
  BEFORE UPDATE ON public.customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) политики
ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

-- Политика: все могут читать профили артистов
DROP POLICY IF EXISTS "Artist profiles are viewable by everyone" ON public.artist_profiles;
CREATE POLICY "Artist profiles are viewable by everyone"
  ON public.artist_profiles FOR SELECT
  USING (true);

-- Политика: пользователи могут создавать свой профиль артиста
DROP POLICY IF EXISTS "Users can create their own artist profile" ON public.artist_profiles;
CREATE POLICY "Users can create their own artist profile"
  ON public.artist_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Политика: пользователи могут обновлять свой профиль артиста
DROP POLICY IF EXISTS "Users can update their own artist profile" ON public.artist_profiles;
CREATE POLICY "Users can update their own artist profile"
  ON public.artist_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Политика: все могут читать профили заказчиков
DROP POLICY IF EXISTS "Customer profiles are viewable by everyone" ON public.customer_profiles;
CREATE POLICY "Customer profiles are viewable by everyone"
  ON public.customer_profiles FOR SELECT
  USING (true);

-- Политика: пользователи могут создавать свой профиль заказчика
DROP POLICY IF EXISTS "Users can create their own customer profile" ON public.customer_profiles;
CREATE POLICY "Users can create their own customer profile"
  ON public.customer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Политика: пользователи могут обновлять свой профиль заказчика
DROP POLICY IF EXISTS "Users can update their own customer profile" ON public.customer_profiles;
CREATE POLICY "Users can update their own customer profile"
  ON public.customer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Комментарии к таблицам
COMMENT ON TABLE public.artist_profiles IS 'Профили артистов платформы TuranSound';
COMMENT ON TABLE public.customer_profiles IS 'Профили заказчиков платформы TuranSound';
