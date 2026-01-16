# Исправление ошибки связи между bookings и artists_catalog

## Проблема

При попытке загрузить бронирования с данными артистов возникала ошибка:

```
Error fetching bookings: {
  "code": "PGRST200",
  "details": "Searched for a foreign key relationship between 'bookings' and 'artists_catalog' using the hint 'artist_id' in the schema 'public', but no matches were found.",
  "hint": null,
  "message": "Could not find a relationship between 'bookings' and 'artists_catalog' in the schema cache"
}
```

## Причина

Ошибка возникала в хуке `useBookingsWithArtists.ts` при попытке использовать JOIN через специальный синтаксис Supabase:

```typescript
// Старый код (НЕ работал)
.select(`
  *,
  artist:artists_catalog!artist_id (...)
`)
```

Supabase не мог автоматически определить связь между таблицами, даже несмотря на то, что внешний ключ был правильно настроен в миграции:

```sql
artist_id UUID NOT NULL REFERENCES public.artists_catalog(id) ON DELETE CASCADE
```

## Решение

Изменен подход в `useBookingsWithArtists.ts` - вместо использования JOIN теперь выполняются два отдельных запроса:

### 1. Получение бронирований

```typescript
const { data: bookingsData, error: queryError } = await supabase
  .from('bookings')
  .select('*')
  .eq('customer_id', userId)
  .order('created_at', { ascending: false });
```

### 2. Получение данных артистов

```typescript
// Извлекаем уникальные ID артистов из бронирований
const artistIds = [...new Set(bookingsData.map(b => b.artist_id))];

// Загружаем данные всех артистов одним запросом
const { data: artistsData, error: artistsError } = await supabase
  .from('artists_catalog')
  .select('id, stage_name, avatar, rating, city, genres')
  .in('id', artistIds);
```

### 3. Объединение данных

```typescript
// Создаем маппинг артистов по ID для быстрого доступа
const artistsMap = new Map(
  (artistsData || []).map(artist => [artist.id, artist])
);

// Объединяем данные бронирований с данными артистов
const mappedBookings = bookingsData.map((dbBooking) => {
  const artistData = artistsMap.get(dbBooking.artist_id);
  
  return {
    ...dbBooking,
    artist: artistData ? {
      id: artistData.id,
      stageName: artistData.stage_name,
      avatar: artistData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${artistData.stage_name}`,
      rating: Number(artistData.rating),
      city: artistData.city,
      genres: artistData.genres || []
    } : undefined
  };
});
```

## Преимущества нового подхода

1. **Надежность** - не зависит от кэша схемы Supabase и автоопределения связей
2. **Производительность** - использует `.in()` для загрузки всех артистов одним запросом вместо N+1 запросов
3. **Устойчивость к ошибкам** - если данные артиста не найдены, бронирование все равно отображается
4. **Простота отладки** - легче понять, что именно идет не так

## Измененные файлы

- `/hooks/useBookingsWithArtists.ts` - изменен метод `fetchBookings()`

## Проверка

После исправления:

1. ✅ Бронирования загружаются без ошибок
2. ✅ Данные артистов корректно присоединяются к бронированиям
3. ✅ Статистика вычисляется правильно
4. ✅ Если артист удален из каталога, бронирование все равно отображается (без данных артиста)

## Альтернативные решения (не выбраны)

### Вариант 1: Использование имени внешнего ключа

```typescript
// Требует знания точного имени constraint
artist:artists_catalog!bookings_artist_id_fkey (...)
```

**Минусы:** Хрупкое решение, зависит от автоматически сгенерированного имени

### Вариант 2: Обновление кэша схемы

```sql
-- В Supabase Dashboard
NOTIFY pgrst, 'reload schema';
```

**Минусы:** Временное решение, проблема может вернуться

## Заключение

Текущее решение является наиболее надежным и производительным способом загрузки бронирований с данными артистов. Оно не зависит от особенностей кэша схемы Supabase и гарантирует стабильную работу.
