# 🚀 Многоязычность - Быстрый старт

## ✅ Что уже сделано

1. ✅ Система i18n реализована
2. ✅ 3 языка: Казахский, Русский, Английский
3. ✅ 450+ переводов готовы
4. ✅ Переключатель языка в Header
5. ✅ Автоопределение языка браузера

---

## 🎯 Как использовать в компоненте

### Шаг 1: Импортировать хук

```tsx
import { useTranslation } from '../lib/i18n/LanguageContext';
```

### Шаг 2: Получить переводы

```tsx
function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t.header.home}</h1>;
}
```

### Шаг 3: Использовать

```tsx
// Навигация
{t.header.home}
{t.header.catalog}
{t.header.aiAssistant}

// Кнопки
{t.common.save}
{t.common.cancel}
{t.common.search}

// Каталог
{t.catalog.title}
{t.catalog.filters}
{t.catalog.searchPlaceholder}

// Бронирование
{t.booking.confirmBooking}
{t.booking.selectDate}
```

---

## 📖 Доступные категории

```tsx
t.common.*          // Общие: save, cancel, loading...
t.header.*          // Header: home, catalog, login...
t.home.*            // Главная: heroTitle, features...
t.catalog.*         // Каталог: filters, search...
t.artist.*          // Артист: about, portfolio...
t.booking.*         // Бронирование: confirm, date...
t.footer.*          // Footer: contacts, links...
t.languages.*       // Языки: kazakh, russian, english
t.roles.*           // Роли: singer, dj, mc...
t.genres.*          // Жанры: pop, jazz, rock...
```

---

## 🌍 Переключение языка

### В коде:
```tsx
const { setLanguage } = useTranslation();

setLanguage('kk');  // Казахский
setLanguage('ru');  // Русский
setLanguage('en');  // Английский
```

### В UI:
Переключатель уже добавлен в Header (правый верхний угол)

---

## 📝 Добавить новые переводы

### 1. Открыть `/lib/i18n/translations.ts`

### 2. Добавить в интерфейс:
```typescript
export interface Translations {
  mySection: {
    myKey: string;
  };
}
```

### 3. Добавить переводы:
```typescript
kk: { mySection: { myKey: 'Қазақша' } },
ru: { mySection: { myKey: 'Русский' } },
en: { mySection: { myKey: 'English' } },
```

### 4. Использовать:
```tsx
{t.mySection.myKey}
```

---

## 🎨 Переключатель языка

### Где находится:
Header → правый верхний угол

### Внешний вид:
🇰🇿 Қазақша | 🇷🇺 Русский | 🇬🇧 English

---

## 📚 Полная документация

Смотри [I18N_MULTILANGUAGE.md](./I18N_MULTILANGUAGE.md)

---

**Система готова! Начинайте переводить компоненты! 🎉**
