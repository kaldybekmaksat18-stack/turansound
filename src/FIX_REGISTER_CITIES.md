# ✅ ИСПРАВЛЕНО: Ошибка cities в RegisterPage

## Проблема
```
TypeError: Cannot read properties of undefined (reading 'almaty')
at RegisterPage (RegisterPage.tsx:302)
```

## Причина
RegisterPage использовал хук `useTranslation()`, но обращался к полю `t.cities`, которое есть только в расширенных переводах `useProfileTranslation()`.

### Было:
```typescript
// RegisterPage.tsx
import { useTranslation } from '../lib/i18n/LanguageContext';

export function RegisterPage({ onNavigate, onRegister }: RegisterPageProps) {
  const { t } = useTranslation();  // ❌ Здесь нет поля cities
  
  // ...
  
  <SelectItem value="almaty">{t.cities.almaty}</SelectItem>  // ❌ ОШИБКА!
```

### Стало:
```typescript
// RegisterPage.tsx
import { useTranslation } from '../lib/i18n/LanguageContext';
import { useProfileTranslation } from '../lib/i18n/useProfileTranslation';

export function RegisterPage({ onNavigate, onRegister }: RegisterPageProps) {
  const { t } = useTranslation();
  const tp = useProfileTranslation();  // ✅ Здесь ЕСТЬ cities
  
  // ...
  
  <SelectItem value="almaty">{tp.cities.almaty}</SelectItem>  // ✅ РАБОТАЕТ!
```

## Решение

### Шаг 1: Добавлен импорт
```typescript
import { useProfileTranslation } from '../lib/i18n/useProfileTranslation';
```

### Шаг 2: Добавлен хук
```typescript
const tp = useProfileTranslation(); // tp = translation profile (расширенные переводы)
```

### Шаг 3: Заменены обращения к cities
```typescript
<SelectContent>
  <SelectItem value="almaty">{tp.cities.almaty}</SelectItem>
  <SelectItem value="astana">{tp.cities.astana}</SelectItem>
  <SelectItem value="shymkent">{tp.cities.shymkent}</SelectItem>
  <SelectItem value="karaganda">{tp.cities.karaganda}</SelectItem>
  <SelectItem value="tashkent">{tp.cities.tashkent}</SelectItem>
  <SelectItem value="bishkek">{tp.cities.bishkek}</SelectItem>
</SelectContent>
```

## Архитектура переводов

### 1. useTranslation() - базовые переводы
Файл: `/lib/i18n/translations.ts`
```typescript
const { t } = useTranslation();
// Доступно:
t.header.*       // навигация
t.hero.*         // главная страница
t.catalog.*      // каталог
t.footer.*       // футер
t.common.*       // общие элементы
```

### 2. useProfileTranslation() - расширенные переводы
Файлы: 
- `/lib/i18n/profileTexts.ts`
- `/lib/i18n/profileTexts-complete.ts`

```typescript
const tp = useProfileTranslation();
// Доступно ВСЁ из useTranslation() ПЛЮС:
tp.cities.*              // города ✅
tp.statuses.*            // статусы
tp.eventTypes.*          // типы мероприятий
tp.performanceFormats.*  // форматы выступлений
tp.customerTypes.*       // типы заказчиков
tp.artistProfile.*       // профиль артиста
tp.artistDashboard.*     // дашборд
tp.financialProfile.*    // финансы
tp.aiAssistant.*         // AI-помощник
tp.notifications.*       // уведомления
```

## Где используется каждый хук

### useTranslation() - простые компоненты:
- Header
- Hero
- Footer
- LoginPage (частично)
- QuickSearchBar

### useProfileTranslation() - сложные компоненты:
- ✅ RegisterPage (ИСПРАВЛЕНО)
- ✅ ArtistProfileSettings
- ✅ CustomerProfileSettings
- ✅ ArtistProfile
- ✅ ArtistDashboard
- ✅ FinancialProfile
- ✅ ContractsLegal
- ✅ ReputationSystem
- ✅ NotificationCenter
- ✅ AIAssistant

## Проверка

1. Откройте страницу регистрации
2. Дойдите до Шага 2 (Basic Info)
3. Откройте выпадающий список "Регион"
4. Переключите язык:
   - **Русский (RU)**: Алматы, Астана, Шымкент...
   - **Қазақша (KK)**: Алматы, Астана, Шымкент...
   - **English (EN)**: Almaty, Astana, Shymkent...

Если названия городов меняются - **ИСПРАВЛЕНО!** ✅

---

**Статус:** ✅ ИСПРАВЛЕНО  
**Файл:** `/components/RegisterPage.tsx`  
**Изменения:** Добавлен `useProfileTranslation()`, заменены `t.cities` на `tp.cities`
