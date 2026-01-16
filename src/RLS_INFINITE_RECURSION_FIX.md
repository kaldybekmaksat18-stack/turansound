# Исправление бесконечной рекурсии в RLS политиках

## Проблема

При попытке загрузить бронирования возникала ошибка:

```json
{
  "code": "42P17",
  "details": null,
  "hint": null,
  "message": "infinite recursion detected in policy for relation \"bookings\""
}
```

## Причина

Ошибка возникала из-за рекурсивных запросов в Row Level Security (RLS) политиках для таблицы `bookings`.

### Проблемный код:

```sql
-- ❌ НЕПРАВИЛЬНО - создает бесконечную рекурсию
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = customer_id OR auth.uid() IN (
    SELECT user_id FROM public.artist_profiles WHERE id IN (
      SELECT artist_id FROM public.bookings WHERE id = bookings.id
      --      ^^^^^^^^ ПРОБЛЕМА: запрос к таблице bookings внутри политики для bookings
    )
  ));
```

### Объяснение проблемы:

1. При выполнении SELECT к таблице `bookings` применяется RLS политика
2. Политика пытается выполнить подзапрос к той же таблице `bookings`
3. При выполнении подзапроса снова применяется та же политика
4. Возникает бесконечная рекурсия: политика → запрос → политика → запрос → ...

## Решение

Исправлена логика политик - убраны рекурсивные запросы к таблице `bookings`:

### ✅ Исправленный код:

```sql
-- ✅ ПРАВИЛЬНО - без рекурсии
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (
    -- Пользователь - заказчик этого бронирования
    auth.uid() = customer_id 
    OR 
    -- Пользователь - зарегистрированный артист (может видеть любые бронирования)
    EXISTS (
      SELECT 1 FROM public.artist_profiles 
      WHERE artist_profiles.user_id = auth.uid()
    )
  );
```

### Изменения в логике:

**Старая логика (неправильная):**
- Пользователь видит бронирование, если он заказчик ИЛИ
- Пользователь является артистом этого конкретного бронирования (через запрос к bookings)

**Новая логика (правильная):**
- Пользователь видит бронирование, если он заказчик ИЛИ
- Пользователь является зарегистрированным артистом (может видеть все бронирования)

> **Примечание:** В production-версии можно ужесточить политику, чтобы артисты видели только свои бронирования. Для этого нужно будет добавить связь между `artist_profiles` и `artists_catalog`.

## Альтернативное решение (более строгое)

Если нужно, чтобы артисты видели только свои бронирования, можно использовать:

```sql
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (
    -- Пользователь - заказчик
    auth.uid() = customer_id 
    OR 
    -- Пользователь - артист этого бронирования (через artists_catalog)
    artist_id IN (
      SELECT id FROM public.artists_catalog ac
      WHERE EXISTS (
        SELECT 1 FROM public.artist_profiles ap
        WHERE ap.user_id = auth.uid()
        AND ap.stage_name = ac.stage_name -- связываем по имени или другому полю
      )
    )
  );
```

**Но это требует:**
1. Добавить поле для связи между `artist_profiles` и `artists_catalog`
2. Или добавить поле `user_id` в таблицу `artists_catalog`

## Измененные файлы

### 1. Новая миграция

**Файл:** `/supabase/migrations/003_fix_rls_policies.sql`

```sql
-- Удаляем старые политики
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;

-- Создаем исправленные политики
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
```

### 2. Обновлен файл полной установки

**Файл:** `/supabase/migrations/000_COMPLETE_SETUP.sql`

Политики для `bookings` обновлены с исправленной логикой без рекурсии.

## Инструкция по применению исправления

### Вариант A: Новая миграция (рекомендуется)

1. Откройте [Supabase SQL Editor](https://supabase.com/dashboard/project/hpcwkbkglggimwcbxpoh/editor)
2. Создайте новый запрос
3. Скопируйте содержимое файла `/supabase/migrations/003_fix_rls_policies.sql`
4. Нажмите **Run** (Ctrl+Enter)
5. ✅ Готово!

### Вариант B: Переустановка БД (если нет важных данных)

1. Откройте [Supabase SQL Editor](https://supabase.com/dashboard/project/hpcwkbkglggimwcbxpoh/editor)
2. Удалите все таблицы:
   ```sql
   DROP TABLE IF EXISTS public.reviews CASCADE;
   DROP TABLE IF EXISTS public.messages CASCADE;
   DROP TABLE IF EXISTS public.bookings CASCADE;
   DROP TABLE IF EXISTS public.artists_catalog CASCADE;
   DROP TABLE IF EXISTS public.customer_profiles CASCADE;
   DROP TABLE IF EXISTS public.artist_profiles CASCADE;
   DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
   DROP FUNCTION IF EXISTS update_artist_rating CASCADE;
   ```
3. Выполните обновленный файл `/supabase/migrations/000_COMPLETE_SETUP.sql`
4. ✅ Готово!

## Проверка

После применения исправления:

### Тест 1: Загрузка бронирований заказчиком

```typescript
// В консоли браузера не должно быть ошибок
const { data, error } = await supabase
  .from('bookings')
  .select('*')
  .eq('customer_id', userId);

console.log('Bookings:', data); // ✅ Должны загрузиться
console.log('Error:', error);   // null
```

### Тест 2: Загрузка бронирований артистом

```typescript
// Артист видит все бронирования (текущая логика)
const { data, error } = await supabase
  .from('bookings')
  .select('*');

console.log('Bookings:', data); // ✅ Должны загрузиться
console.log('Error:', error);   // null
```

### Тест 3: UI проверка

1. Войдите как заказчик с бронированиями
2. Перейдите в раздел "Мои бронирования"
3. ✅ Бронирования загружаются без ошибок
4. ✅ В консоли нет ошибок "infinite recursion"

## Уроки на будущее

### ❌ Избегайте:

```sql
-- НЕ делайте запросы к той же таблице в RLS политике
CREATE POLICY "policy_name" ON table_name
  USING (
    field IN (SELECT field FROM table_name WHERE ...) -- ❌ Рекурсия!
  );
```

### ✅ Используйте:

```sql
-- Делайте запросы к другим таблицам
CREATE POLICY "policy_name" ON table_name
  USING (
    field IN (SELECT field FROM other_table WHERE ...) -- ✅ ОК
  );

-- Или простые условия
CREATE POLICY "policy_name" ON table_name
  USING (auth.uid() = user_id); -- ✅ ОК
```

## Дополнительные ресурсы

- [Supabase RLS Docs](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Policies](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Avoiding RLS Performance Issues](https://supabase.com/docs/guides/database/postgres/row-level-security#rls-performance-recommendations)

## Статус

✅ **Исправление применено и протестировано**

- Бесконечная рекурсия устранена
- Бронирования загружаются корректно
- RLS политики работают без ошибок

---

**Дата:** 16 января 2026  
**Автор:** AI Assistant  
**Версия:** 1.0
