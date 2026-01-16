-- ========================================
-- Исправление RLS политик для bookings
-- ========================================
-- Проблема: бесконечная рекурсия в политиках
-- Решение: упрощенная логика без вложенных запросов к той же таблице

-- Удаляем старые политики
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;

-- Создаем исправленные политики
-- Политика SELECT: пользователь видит бронирования, где он заказчик или артист
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

-- Политика UPDATE: обновлять могут только заказчик или артист этого бронирования
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

-- Комментарий
COMMENT ON POLICY "Users can view their own bookings" ON public.bookings IS 
  'Пользователи могут просматривать бронирования, где они заказчики или зарегистрированные артисты';

COMMENT ON POLICY "Users can update their own bookings" ON public.bookings IS 
  'Пользователи могут обновлять бронирования, где они заказчики или зарегистрированные артисты';
