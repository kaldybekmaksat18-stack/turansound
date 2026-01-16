# 🚀 TuranSound - Быстрый старт

## 🎯 Что нового?

Реализована **трехслойная архитектура каталога** с расширенной системой фильтрации!

---

## 🗺️ Навигация по проекту

### 📂 Основные файлы

```
/types/artist.ts           👈 Вся трехслойная типизация здесь!
/components/
  CatalogFilters.tsx       👈 Расширенные фильтры
  QuickSearchBar.tsx       👈 Быстрый поиск
  FilterStats.tsx          👈 Статистика
  SectionSelector.tsx      👈 Выбор раздела
  ArtistOnboarding.tsx     👈 Onboarding для артистов
/pages/
  CatalogPage.tsx          👈 Страница каталога
  HomePage.tsx             👈 Главная
```

---

## 🎨 Как использовать компоненты?

### 1️⃣ SectionSelector (Главная страница)

```typescript
import { SectionSelector } from './components/SectionSelector';

<SectionSelector 
  onSelectSection={(section) => {
    // section будет: 'stage_artists' | 'hosts_and_shows' | 'creative_production'
    onNavigate('catalog', { section });
  }}
/>
```

**Результат:**
- 🎤 Артисты сцены
- 🎭 Ведущие и шоу
- 🎬 Креатив и продакшн

---

### 2️⃣ CatalogFilters (Фильтры)

```typescript
import { CatalogFilters } from './components/CatalogFilters';

const [filters, setFilters] = useState({
  section: 'all',
  roles: [],
  genres: [],
  nationalStyles: [],
  eventFormats: [],
  region: 'all',
  priceRange: [0, 3000],
  rating: 0,
  search: ''
});

<CatalogFilters
  filters={filters}
  onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
  onReset={() => setFilters(initialState)}
/>
```

**Что включено:**
- ✅ Выбор раздела (радио-кнопки с иконками)
- ✅ Роли (чекбоксы, множественный выбор)
- ✅ Жанры (цветные badges)
- ✅ Национальные стили (badges)
- ✅ Форматы мероприятий (badges)
- ✅ Регион (dropdown)
- ✅ Цена (слайдер)
- ✅ Рейтинг (слайдер)

---

### 3️⃣ QuickSearchBar (Быстрый поиск)

```typescript
import { QuickSearchBar } from './components/QuickSearchBar';

<QuickSearchBar
  onSearch={(query) => setFilters({ ...filters, search: query })}
  onQuickFilter={(type, value) => {
    // type: 'section' | 'genre' | 'format'
    // Обработка быстрых фильтров
  }}
/>
```

**Возможности:**
- 🔍 Текстовый поиск
- 🔥 Популярные разделы
- 🎵 Популярные жанры
- 🎊 Популярные форматы

---

### 4️⃣ FilterStats (Статистика)

```typescript
import { FilterStats } from './components/FilterStats';

<FilterStats
  totalArtists={mockArtists.length}
  filteredArtists={filteredArtists.length}
  averageRating={4.8}
  topGenre="Поп"
/>
```

**Показывает:**
- 👥 Количество найденных
- ⭐ Средний рейтинг
- 🎵 Популярный жанр
- ✅ Верифицировано

---

### 5️⃣ ArtistOnboarding (Для артистов)

```typescript
import { ArtistOnboarding } from './components/ArtistOnboarding';

<ArtistOnboarding
  onComplete={(data) => {
    // data содержит:
    // - section: ArtistSection
    // - roles: ArtistRole[]
    // - genres: MusicGenre[]
    // - nationalStyles: NationalStyle[]
    // - eventFormats: EventFormat[]
    // - stageName, bio, experience, priceFrom, priceTo
  }}
  onBack={() => {}}
/>
```

**5 шагов:**
1. Выбор раздела
2. Выбор ролей
3. Жанры и форматы
4. Портфолио
5. Цены

---

## 🧱 Трехслойная архитектура

### Импорт типов:

```typescript
import {
  // СЛОЙ 1: Разделы
  ArtistSection,
  SECTION_LABELS,
  SECTION_DESCRIPTIONS,
  
  // СЛОЙ 2: Роли
  ArtistRole,
  ROLE_LABELS,
  ROLES_BY_SECTION,
  
  // СЛОЙ 3: Стили и форматы
  MusicGenre,
  NationalStyle,
  EventFormat,
  GENRE_LABELS,
  NATIONAL_STYLE_LABELS,
  EVENT_FORMAT_LABELS,
  
  // Интерфейс артиста
  Artist
} from './types/artist';
```

---

## 🎯 Типичные сценарии

### Сценарий 1: Фильтрация по разделу

```typescript
// Пользователь выбирает "Артисты сцены"
setFilters({
  ...filters,
  section: 'stage_artists',
  roles: [] // Сбрасываем роли при смене раздела
});

// Доступные роли обновятся автоматически:
const availableRoles = ROLES_BY_SECTION['stage_artists'];
// ['musician', 'dj', 'ensemble', 'orchestra', 'folk_artist', 'karaoke_host']
```

---

### Сценарий 2: Множественный выбор ролей

```typescript
// Пользователь выбирает "Музыкант" + "Композитор"
setFilters({
  ...filters,
  roles: ['musician', 'composer']
});

// Отображаемые лейблы:
filters.roles.map(role => ROLE_LABELS[role])
// ['Музыкант', 'Композитор']
```

---

### Сценарий 3: Добавление жанра

```typescript
// Пользователь кликает на бейдж "Pop"
const genre: MusicGenre = 'pop';

setFilters({
  ...filters,
  genres: filters.genres.includes(genre)
    ? filters.genres.filter(g => g !== genre) // Убрать
    : [...filters.genres, genre]               // Добавить
});
```

---

### Сценарий 4: Быстрый фильтр

```typescript
const handleQuickFilter = (type: 'section' | 'genre' | 'format', value: string) => {
  if (type === 'section') {
    setFilters({ 
      ...filters, 
      section: value as ArtistSection,
      roles: []
    });
  } else if (type === 'genre') {
    const genre = value as MusicGenre;
    if (!filters.genres.includes(genre)) {
      setFilters({ ...filters, genres: [...filters.genres, genre] });
    }
  } else if (type === 'format') {
    const format = value as EventFormat;
    if (!filters.eventFormats.includes(format)) {
      setFilters({ ...filters, eventFormats: [...filters.eventFormats, format] });
    }
  }
};
```

---

## 🎨 Стилизация

### Градиенты для разделов:

```typescript
const sectionGradients = {
  stage_artists: 'from-purple-500 to-pink-500',
  hosts_and_shows: 'from-pink-500 to-rose-500',
  creative_production: 'from-violet-500 to-purple-500'
};
```

### Градиенты для тегов:

```typescript
const tagGradients = {
  genres: 'from-purple-600 to-pink-600',
  nationalStyles: 'from-violet-600 to-purple-600',
  eventFormats: 'from-pink-600 to-rose-600'
};
```

---

## 📋 Константы для UI

### Получить название раздела:

```typescript
import { SECTION_LABELS } from './types/artist';

const sectionName = SECTION_LABELS['stage_artists'];
// → "Артисты сцены"
```

### Получить название роли:

```typescript
import { ROLE_LABELS } from './types/artist';

const roleName = ROLE_LABELS['musician'];
// → "Музыкант"
```

### Получить роли для раздела:

```typescript
import { ROLES_BY_SECTION } from './types/artist';

const roles = ROLES_BY_SECTION['stage_artists'];
// → ['musician', 'dj', 'ensemble', 'orchestra', 'folk_artist', 'karaoke_host']
```

---

## 🔍 Фильтрация артистов

```typescript
const filteredArtists = mockArtists.filter((artist) => {
  // СЛОЙ 1: Раздел
  if (filters.section !== 'all' && artist.section !== filters.section) {
    return false;
  }
  
  // СЛОЙ 2: Роли (хотя бы одна роль совпадает)
  if (filters.roles.length > 0) {
    const hasMatchingRole = artist.roles.some(role => 
      filters.roles.includes(role)
    );
    if (!hasMatchingRole) return false;
  }
  
  // СЛОЙ 3: Жанры (хотя бы один жанр совпадает)
  if (filters.genres.length > 0) {
    const hasMatchingGenre = artist.genres.some(genre => 
      filters.genres.includes(genre)
    );
    if (!hasMatchingGenre) return false;
  }
  
  // И так далее...
  
  return true;
});
```

---

## 🐛 Часто встречающиеся ошибки

### ❌ Забыли сбросить роли при смене раздела

```typescript
// НЕПРАВИЛЬНО
setFilters({ ...filters, section: newSection });

// ПРАВИЛЬНО
setFilters({ 
  ...filters, 
  section: newSection,
  roles: [] // Сбрасываем роли!
});
```

### ❌ Неверный тип при добавлении жанра

```typescript
// НЕПРАВИЛЬНО
setFilters({ ...filters, genres: [...filters.genres, 'pop'] });

// ПРАВИЛЬНО
const genre: MusicGenre = 'pop';
setFilters({ ...filters, genres: [...filters.genres, genre] });
```

### ❌ Не используем константы для лейблов

```typescript
// НЕПРАВИЛЬНО
<span>Артисты сцены</span>

// ПРАВИЛЬНО
import { SECTION_LABELS } from './types/artist';
<span>{SECTION_LABELS['stage_artists']}</span>
```

---

## 📱 Адаптивность

### Desktop (lg+):
```typescript
<div className="grid lg:grid-cols-4 gap-6">
  <div className="lg:col-span-1">
    {/* Фильтры слева */}
  </div>
  <div className="lg:col-span-3">
    {/* Результаты справа */}
  </div>
</div>
```

### Mobile:
- Фильтры сверху
- Результаты снизу
- Стек вертикально

---

## ✅ Чеклист для интеграции

Перед внедрением в production:

- [ ] Обновить mockData для использования новых типов
- [ ] Добавить реальную фильтрацию по section/roles
- [ ] Протестировать все сценарии фильтрации
- [ ] Проверить адаптивность на всех устройствах
- [ ] Интегрировать с Supabase
- [ ] Добавить сохранение фильтров в URL
- [ ] Оптимизировать производительность
- [ ] Добавить аналитику (какие фильтры используют)

---

## 🚀 Следующие шаги

1. **Обновите mockData:**
   - Добавьте `section`, `roles`, `nationalStyles`, `eventFormats`
   - Удалите старые поля

2. **Добавьте фильтрацию:**
   - По разделам
   - По ролям
   - По национальным стилям
   - По форматам

3. **Интегрируйте с Supabase:**
   - Сохранение профилей артистов
   - Загрузка с фильтрацией
   - RLS политики

4. **AI-подбор:**
   - Используйте трехслойную архитектуру
   - Умные рекомендации

---

## 📚 Дополнительная документация

- 📖 [ARCHITECTURE.md](./ARCHITECTURE.md) - Полная архитектура
- 📖 [README.md](./README.md) - Обзор проекта
- 📖 [CHANGELOG.md](./CHANGELOG.md) - История изменений
- 📖 [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) - Визуальный обзор

---

## 💡 Подсказки

### Debounce для поиска:
```typescript
import { useMemo } from 'react';
import debounce from 'lodash/debounce';

const debouncedSearch = useMemo(
  () => debounce((value: string) => {
    onFilterChange({ search: value });
  }, 300),
  [onFilterChange]
);
```

### Сохранение в URL:
```typescript
// Сохранить
const params = new URLSearchParams();
if (filters.section !== 'all') params.set('section', filters.section);
if (filters.genres.length > 0) params.set('genres', filters.genres.join(','));
window.history.pushState({}, '', `?${params.toString()}`);

// Загрузить
const params = new URLSearchParams(window.location.search);
const section = params.get('section') as ArtistSection || 'all';
const genres = params.get('genres')?.split(',') as MusicGenre[] || [];
```

---

*Удачи в разработке! 🚀*

*Обновлено: 14 января 2026*
