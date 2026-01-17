-- ========================================
-- ЧАСТЬ 1: ПРОФИЛИ (из 001_create_profiles.sql)
-- ========================================

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

-- ========================================
-- ЧАСТЬ 2: КАТАЛОГ И БРОНИРОВАНИЯ (из 002_artists_catalog_and_bookings.sql)
-- ========================================

-- Таблица каталога артистов
CREATE TABLE IF NOT EXISTS public.artists_catalog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Базовая информация
  name TEXT NOT NULL,
  stage_name TEXT NOT NULL,
  avatar TEXT,
  city TEXT NOT NULL,
  region TEXT NOT NULL,
  
  -- Трехслойная архитектура
  section TEXT NOT NULL CHECK (section IN ('stage_artists', 'hosts_and_shows', 'creative_production')),
  roles TEXT[] NOT NULL DEFAULT '{}',
  genres TEXT[] DEFAULT '{}',
  national_styles TEXT[] DEFAULT '{}',
  event_formats TEXT[] NOT NULL DEFAULT '{}',
  
  -- Портфолио
  bio TEXT,
  experience INTEGER DEFAULT 0,
  videos TEXT[] DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  audio TEXT[] DEFAULT '{}',
  
  -- Финансы
  price_from NUMERIC NOT NULL,
  price_to NUMERIC,
  currency TEXT NOT NULL DEFAULT 'KZT' CHECK (currency IN ('KZT', 'USD')),
  
  -- Репутация
  rating NUMERIC DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  booking_count INTEGER DEFAULT 0,
  
  -- Статусы
  is_verified BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  
  -- Даты
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_artists_section ON public.artists_catalog(section);
CREATE INDEX IF NOT EXISTS idx_artists_city ON public.artists_catalog(city);
CREATE INDEX IF NOT EXISTS idx_artists_rating ON public.artists_catalog(rating DESC);
CREATE INDEX IF NOT EXISTS idx_artists_price ON public.artists_catalog(price_from);
CREATE INDEX IF NOT EXISTS idx_artists_roles ON public.artists_catalog USING GIN(roles);
CREATE INDEX IF NOT EXISTS idx_artists_genres ON public.artists_catalog USING GIN(genres);
CREATE INDEX IF NOT EXISTS idx_artists_event_formats ON public.artists_catalog USING GIN(event_formats);

-- Таблица бронирований
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Участники
  customer_id UUID NOT NULL,
  artist_id UUID NOT NULL REFERENCES public.artists_catalog(id) ON DELETE CASCADE,
  
  -- Детали мероприяти
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME,
  event_duration INTEGER, -- минуты
  event_location TEXT,
  event_city TEXT,
  guest_count INTEGER,
  special_requests TEXT,
  
  -- Финансы
  total_price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'KZT' CHECK (currency IN ('KZT', 'USD')),
  escrow_amount NUMERIC DEFAULT 0,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'escrow', 'released', 'refunded')),
  
  -- Статусы
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'disputed')),
  
  -- Контракт
  contract_signed BOOLEAN DEFAULT false,
  contract_url TEXT,
  
  -- Даты
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Индексы для бронирований
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_artist ON public.bookings(artist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(event_date);

-- Таблица сообщений чата
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Участники
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  
  -- Сообщение
  message TEXT NOT NULL,
  
  -- Метаданные
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Даты
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для сообщений
CREATE INDEX IF NOT EXISTS idx_messages_booking ON public.messages(booking_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Таблица отзывов
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Участники
  artist_id UUID NOT NULL REFERENCES public.artists_catalog(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  
  -- Отзыв
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Метаданные
  event_type TEXT,
  event_date DATE,
  
  -- Даты
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ограничение: один отзыв на бронирование
  UNIQUE(booking_id)
);

-- Индексы для отзывов
CREATE INDEX IF NOT EXISTS idx_reviews_artist ON public.reviews(artist_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer ON public.reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Триггеры для обновления updated_at
DROP TRIGGER IF EXISTS update_artists_catalog_updated_at ON public.artists_catalog;
CREATE TRIGGER update_artists_catalog_updated_at
  BEFORE UPDATE ON public.artists_catalog
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON public.bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Функция для обновления рейтинга артиста
CREATE OR REPLACE FUNCTION update_artist_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Обновляем средний рейтинг и количество отзывов
  UPDATE public.artists_catalog
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM public.reviews
      WHERE artist_id = COALESCE(NEW.artist_id, OLD.artist_id)
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE artist_id = COALESCE(NEW.artist_id, OLD.artist_id)
    )
  WHERE id = COALESCE(NEW.artist_id, OLD.artist_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматического обновления рейтинга
DROP TRIGGER IF EXISTS trigger_update_artist_rating ON public.reviews;
CREATE TRIGGER trigger_update_artist_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_artist_rating();

-- Row Level Security (RLS) политики
ALTER TABLE public.artists_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Политики для artists_catalog
DROP POLICY IF EXISTS "Artists catalog is viewable by everyone" ON public.artists_catalog;
CREATE POLICY "Artists catalog is viewable by everyone"
  ON public.artists_catalog FOR SELECT
  USING (true);

-- Политики для bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = customer_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.artist_profiles 
      WHERE artist_profiles.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create bookings" ON public.bookings;
CREATE POLICY "Users can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (
    auth.uid() = customer_id 
    OR 
    EXISTS (
      SELECT 1 FROM public.artist_profiles 
      WHERE artist_profiles.user_id = auth.uid()
    )
  );

-- Политики для messages
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
CREATE POLICY "Users can view their own messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can update their own messages" ON public.messages;
CREATE POLICY "Users can update their own messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- Политики для reviews
DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can create reviews for their bookings" ON public.reviews;
CREATE POLICY "Users can create reviews for their bookings"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
CREATE POLICY "Users can update their own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;
CREATE POLICY "Users can delete their own reviews"
  ON public.reviews FOR DELETE
  USING (auth.uid() = customer_id);

-- ========================================
-- КОММЕНТАРИИ К ТАБЛИЦАМ
-- ========================================

COMMENT ON TABLE public.artist_profiles IS 'Профили артистов платформы TuranSound';
COMMENT ON TABLE public.customer_profiles IS 'Профили заказчиков платформы TuranSound';
COMMENT ON TABLE public.artists_catalog IS 'Каталог артистов с трехслойной архитектурой';
COMMENT ON TABLE public.bookings IS 'Бронирования с системой эскроу и смарт-контрактов';
COMMENT ON TABLE public.messages IS 'Чат между артистами и заказчиками';
COMMENT ON TABLE public.reviews IS 'О��зывы о работе артистов';

-- ========================================
-- УСПЕШНОЕ ЗАВЕРШЕНИЕ
-- ========================================

DO $$
BEGIN
  RAISE NOTICE '✅ TuranSound database setup completed successfully!';
  RAISE NOTICE '📊 Created tables:';
  RAISE NOTICE '   - artist_profiles';
  RAISE NOTICE '   - customer_profiles';
  RAISE NOTICE '   - artists_catalog';
  RAISE NOTICE '   - bookings';
  RAISE NOTICE '   - messages';
  RAISE NOTICE '   - reviews';
  RAISE NOTICE '🔐 RLS policies enabled for all tables';
  RAISE NOTICE '🎯 Next step: Load artists data via Admin Panel';
END $$;