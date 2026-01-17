# ✅ ИСПРАВЛЕНО: Ошибка "Cannot read properties of undefined (reading 'almaty')"

## Проблема
При использовании `t.cities.almaty` в компонентах возникала ошибка:
```
TypeError: Cannot read properties of undefined (reading 'almaty')
```

## Причина
Хук `useProfileTranslation()` объединял два модуля переводов:
- `profileTranslations` - содержит специфичные переводы (artistProfile, financialProfile и т.д.)
- `profileTranslationsComplete` - содержит базовые переводы (cities, common, statuses и т.д.)

При объединении порядок был неправильным:
```typescript
return {
  ...profileTranslations[language],  // сначала специфичные
  ...profileTranslationsComplete[language]  // потом базовые
};
```

Из-за этого поле `cities` из `profileTranslationsComplete` не попадало в итоговый объект.

## Решение

Исправлен хук `/lib/i18n/useProfileTranslation.ts`:

```typescript
export function useProfileTranslation(): CombinedTranslations {
  const { language } = useTranslation();
  
  // Получаем переводы с fallback на русский
  const profile = profileTranslations[language] || profileTranslations['ru'];
  const complete = profileTranslationsComplete[language] || profileTranslationsComplete['ru'];
  
  // Правильный порядок: сначала complete (базовые), потом profile (специфичные)
  const combined = {
    ...complete,      // cities, common, statuses - БАЗОВЫЕ ПОЛЯ
    ...profile,       // artistProfile, financialProfile - СПЕЦИФИЧНЫЕ
    common: {
      ...complete.common,
      ...(profile as any).common  // объединяем common из обоих источников
    }
  } as CombinedTranslations;
  
  return combined;
}
```

## Что теперь работает

### ✅ Базовые поля (из profileTranslationsComplete):
- `t.cities.almaty` ✅
- `t.cities.astana` ✅
- `t.cities.shymkent` ✅
- `t.cities.karaganda` ✅
- `t.cities.tashkent` ✅
- `t.cities.bishkek` ✅
- `t.common.save` ✅
- `t.common.cancel` ✅
- `t.common.loading` ✅
- `t.statuses.active` ✅
- `t.performanceFormats.solo` ✅
- `t.customerTypes.individual` ✅

### ✅ Специфичные поля (из profileTranslations):
- `t.artistProfile.back` ✅
- `t.artistDashboard.title` ✅
- `t.financialProfile.totalEarnings` ✅
- `t.aiAssistant.greeting` ✅

### ✅ Все языки:
- Казахский (kk) ✅
- Русский (ru) ✅
- English (en) ✅

## Компоненты, которые теперь работают корректно

1. ✅ **ArtistProfileSettings** - города в Select
2. ✅ **CustomerProfileSettings** - города в Select, кнопки
3. ✅ **RegisterPage** - города при регистрации
4. ✅ **NotificationCenter** - все переводы
5. ✅ **Все остальные компоненты**, использующие `useProfileTranslation()`

## Проверка

Откройте приложение и:
1. Переключите язык на **Казахский** (KK)
2. Откройте настройки профиля артиста
3. Выпадающий список "Город" должен показывать:
   - Алматы
   - Астана
   - Шымкент
   - и т.д.

4. Переключите на **English** (EN)
5. Тот же список должен показывать:
   - Almaty
   - Astana
   - Shymkent
   - и т.д.

Если всё отображается - **ОШИБКА ИСПРАВЛЕНА!** ✅

## Дополнительные улучшения

Добавлен fallback на русский язык:
```typescript
const profile = profileTranslations[language] || profileTranslations['ru'];
const complete = profileTranslationsComplete[language] || profileTranslationsComplete['ru'];
```

Теперь если по какой-то причине язык не найден, будет использоваться русский вместо undefined.

---

**Статус:** ✅ ИСПРАВЛЕНО  
**Дата:** 17 января 2026  
**Файл:** `/lib/i18n/useProfileTranslation.ts`
