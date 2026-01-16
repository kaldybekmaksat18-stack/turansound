-- ========================================
-- МИГРАЦИЯ #2: Каталог артистов, Бронирования, Чат, Рейтинги
-- ========================================

-- ========================================
-- 1. ТАБЛИЦА АРТИСТОВ (КАТАЛОГ)
-- ========================================

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

-- ========================================
-- 2. ТАБЛИЦА БРОНИРОВАНИЙ
-- ========================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Участники
  customer_id UUID NOT NULL,
  artist_id UUID NOT NULL REFERENCES public.artists_catalog(id) ON DELETE CASCADE,
  
  -- Детали мероприятия
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
  currency TEXT NOT NULL DEFAULT 'KZT',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'escrow', 'released', 'refunded')),
  escrow_amount NUMERIC DEFAULT 0,
  
  -- Статусы бронирования
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

-- Индексы
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON public.bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_artist ON public.bookings(artist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON public.bookings(event_date);

-- ========================================
-- 3. ТАБЛИЦА ЧАТА
-- ========================================

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Участники
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  
  -- Сообщение
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'audio', 'system')),
  attachment_url TEXT,
  
  -- Статусы
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  
  -- Даты
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_chat_booking ON public.chat_messages(booking_id);
CREATE INDEX IF NOT EXISTS idx_chat_sender ON public.chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_recipient ON public.chat_messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON public.chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_unread ON public.chat_messages(recipient_id, is_read) WHERE is_read = false;

-- ========================================
-- 4. ТАБЛИЦА ОТЗЫВОВ И РЕЙТИНГОВ
-- ========================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Связи
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  artist_id UUID NOT NULL REFERENCES public.artists_catalog(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL,
  
  -- Рейтинг (1-5 звёзд)
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  
  -- Детальные оценки
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
  
  -- Отзыв
  review_text TEXT,
  pros TEXT,
  cons TEXT,
  
  -- Рекомендация
  would_recommend BOOLEAN DEFAULT true,
  
  -- Ответ артиста
  artist_response TEXT,
  artist_responded_at TIMESTAMP WITH TIME ZONE,
  
  -- Модерация
  is_verified BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  
  -- Даты
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы
CREATE INDEX IF NOT EXISTS idx_reviews_artist ON public.reviews(artist_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer ON public.reviews(customer_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking ON public.reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON public.reviews(created_at DESC);

-- Уникальность: один отзыв на бронирование
CREATE UNIQUE INDEX IF NOT EXISTS idx_reviews_unique_booking ON public.reviews(booking_id);

-- ========================================
-- 5. ТРИГГЕРЫ ДЛЯ АВТОМАТИЧЕСКОГО ОБНОВЛЕНИЯ
-- ========================================

-- Функция обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для updated_at
DROP TRIGGER IF EXISTS update_artists_updated_at ON public.artists_catalog;
CREATE TRIGGER update_artists_updated_at
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

-- Функция пересчёта рейтинга артиста
CREATE OR REPLACE FUNCTION update_artist_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.artists_catalog
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM public.reviews
      WHERE artist_id = NEW.artist_id AND is_visible = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE artist_id = NEW.artist_id AND is_visible = true
    )
  WHERE id = NEW.artist_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер пересчёта рейтинга при добавлении/изменении отзыва
DROP TRIGGER IF EXISTS update_artist_rating_on_review ON public.reviews;
CREATE TRIGGER update_artist_rating_on_review
  AFTER INSERT OR UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_artist_rating();

-- Функция увеличения счётчика бронирований
CREATE OR REPLACE FUNCTION increment_booking_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND (OLD IS NULL OR OLD.status != 'confirmed') THEN
    UPDATE public.artists_catalog
    SET booking_count = booking_count + 1
    WHERE id = NEW.artist_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер увеличения счётчика при подтверждении бронирования
DROP TRIGGER IF EXISTS increment_booking_count_on_confirm ON public.bookings;
CREATE TRIGGER increment_booking_count_on_confirm
  AFTER INSERT OR UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION increment_booking_count();

-- ========================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ========================================

-- Каталог артистов (публичный просмотр)
ALTER TABLE public.artists_catalog ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Artists catalog is viewable by everyone" ON public.artists_catalog;
CREATE POLICY "Artists catalog is viewable by everyone"
  ON public.artists_catalog FOR SELECT USING (true);

-- Бронирования (видны только участникам)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = customer_id OR 
    auth.uid() IN (
      SELECT user_id FROM public.artist_profiles WHERE id = artist_id
    )
  );

DROP POLICY IF EXISTS "Customers can create bookings" ON public.bookings;
CREATE POLICY "Customers can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;
CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (
    auth.uid() = customer_id OR 
    auth.uid() IN (
      SELECT user_id FROM public.artist_profiles WHERE id = artist_id
    )
  );

-- Чат (видят только отправитель и получатель)
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own messages" ON public.chat_messages;
CREATE POLICY "Users can view their own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

DROP POLICY IF EXISTS "Users can send messages" ON public.chat_messages;
CREATE POLICY "Users can send messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can update their received messages" ON public.chat_messages;
CREATE POLICY "Users can update their received messages"
  ON public.chat_messages FOR UPDATE
  USING (auth.uid() = recipient_id);

-- Отзывы (публичный просмотр, создание только для завершённых бронирований)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (is_visible = true);

DROP POLICY IF EXISTS "Customers can create reviews for completed bookings" ON public.reviews;
CREATE POLICY "Customers can create reviews for completed bookings"
  ON public.reviews FOR INSERT
  WITH CHECK (
    auth.uid() = customer_id AND
    EXISTS (
      SELECT 1 FROM public.bookings
      WHERE id = booking_id AND status = 'completed'
    )
  );

DROP POLICY IF EXISTS "Artists can respond to reviews" ON public.reviews;
CREATE POLICY "Artists can respond to reviews"
  ON public.reviews FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.artist_profiles
      WHERE id = artist_id
    )
  );

-- ========================================
-- 7. ФУНКЦИИ ДЛЯ API
-- ========================================

-- Функция поиска артистов с фильтрацией
CREATE OR REPLACE FUNCTION search_artists(
  p_section TEXT DEFAULT NULL,
  p_roles TEXT[] DEFAULT NULL,
  p_genres TEXT[] DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_min_price NUMERIC DEFAULT NULL,
  p_max_price NUMERIC DEFAULT NULL,
  p_min_rating NUMERIC DEFAULT NULL,
  p_event_format TEXT DEFAULT NULL,
  p_search_query TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  stage_name TEXT,
  avatar TEXT,
  city TEXT,
  section TEXT,
  roles TEXT[],
  genres TEXT[],
  event_formats TEXT[],
  price_from NUMERIC,
  price_to NUMERIC,
  currency TEXT,
  rating NUMERIC,
  review_count INTEGER,
  booking_count INTEGER,
  is_verified BOOLEAN,
  is_available BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id, a.name, a.stage_name, a.avatar, a.city,
    a.section, a.roles, a.genres, a.event_formats,
    a.price_from, a.price_to, a.currency,
    a.rating, a.review_count, a.booking_count,
    a.is_verified, a.is_available
  FROM public.artists_catalog a
  WHERE 
    (p_section IS NULL OR a.section = p_section) AND
    (p_roles IS NULL OR a.roles && p_roles) AND
    (p_genres IS NULL OR a.genres && p_genres) AND
    (p_city IS NULL OR a.city = p_city) AND
    (p_min_price IS NULL OR a.price_from >= p_min_price) AND
    (p_max_price IS NULL OR a.price_from <= p_max_price) AND
    (p_min_rating IS NULL OR a.rating >= p_min_rating) AND
    (p_event_format IS NULL OR p_event_format = ANY(a.event_formats)) AND
    (p_search_query IS NULL OR 
      a.stage_name ILIKE '%' || p_search_query || '%' OR
      a.name ILIKE '%' || p_search_query || '%' OR
      a.bio ILIKE '%' || p_search_query || '%'
    ) AND
    a.is_available = true
  ORDER BY a.rating DESC, a.review_count DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- ГОТОВО! 🎉
-- ========================================
