# КРИТИЧНО: Финальные шаги для полной многоязычности

## ✅ Что УЖЕ РАБОТАЕТ (100%)

### Компоненты с полной интеграцией:
1. ✅ **Header.tsx** - навигация, меню
2. ✅ **Hero.tsx** - главная страница
3. ✅ **ArtistCard.tsx** - карточки артистов
4. ✅ **CatalogFilters.tsx** - фильтры
5. ✅ **ArtistProfile.tsx** - профили артистов
6. ✅ **BookingModal.tsx** - бронирование
7. ✅ **EnhancedBookingModal.tsx** - расширенное бронирование
8. ✅ **BookingsPage.tsx** - страница бронирований
9. ✅ **RegisterPage.tsx** - регистрация
10. ✅ **QuickSearchBar.tsx** - поиск
11. ✅ **Footer.tsx** - футер
12. ✅ **AIAssistant.tsx** - AI-помощник
13. ✅ **ArtistDashboard.tsx** - дашборд артиста
14. ✅ **FinancialProfile.tsx** - финансовый профиль
15. ✅ **NotificationCenter.tsx** - уведомления (ОБНОВЛЕНО СЕЙЧАС!)

## ⚠️ ЧТО ТРЕБУЕТ СРОЧНОГО ВНИМАНИЯ

### 1. ArtistProfileSettings.tsx (КРИТИЧНО!)

**Текущая проблема:** Хук подключен, но 80% текстов еще на русском

**Что нужно заменить (найти и заменить):**

```typescript
// НАЙТИ → ЗАМЕНИТЬ НА

// Basic Tab
"Базовая информация" → {t.artistSettings.basic.mainInfo}
"Фото профиля" → {t.artistSettings.basic.avatar}
"Изменить фото" → {t.artistSettings.basic.uploadAvatar}
"Видео-обложка (опционально)" → {t.artistSettings.basic.coverVideo}
"Загрузить видео" → {t.common.upload}
"Видео не загружено" → {t.common.noData}
"Сценическое имя *" → {t.artistSettings.basic.stageName} *
placeholder="" → placeholder={t.artistSettings.basic.stageNamePlaceholder}
"Реальное ФИО (скрыто)" → {t.artistSettings.basic.realName}
"Используется только для контрактов" → // убрать или перевести
"Город / Регион *" → {t.artistSettings.basic.location} *

// В SelectContent:
<SelectItem value="almaty">Алматы</SelectItem> → <SelectItem value="almaty">{t.cities.almaty}</SelectItem>
<SelectItem value="astana">Астана</SelectItem> → <SelectItem value="astana">{t.cities.astana}</SelectItem>
<SelectItem value="shymkent">Шымкент</SelectItem> → <SelectItem value="shymkent">{t.cities.shymkent}</SelectItem>
<SelectItem value="karaganda">Караганда</SelectItem> → <SelectItem value="karaganda">{t.cities.karaganda}</SelectItem>
<SelectItem value="tashkent">Ташкент</SelectItem> → <SelectItem value="tashkent">{t.cities.tashkent}</SelectItem>
<SelectItem value="bishkek">Бишкек</SelectItem> → <SelectItem value="bishkek">{t.cities.bishkek}</SelectItem>

"Языки исполнения" → {t.artistSettings.basic.languages}
placeholder="Новый язык" → placeholder={t.artistSettings.basic.languagePlaceholder}
"Добавить" → {t.common.add}

"Жанры" → {t.artistSettings.basic.genres}
placeholder="Новый жанр" → placeholder={t.artistSettings.basic.genrePlaceholder}

"Формат выступления" → {t.artistSettings.basic.format}
<SelectItem value="solo">Соло</SelectItem> → <SelectItem value="solo">{t.performanceFormats.solo}</SelectItem>
<SelectItem value="duo">Дуэт</SelectItem> → <SelectItem value="duo">{t.performanceFormats.duo}</SelectItem>
<SelectItem value="band">Группа</SelectItem> → <SelectItem value="band">{t.performanceFormats.band}</SelectItem>
<SelectItem value="orchestra">Оркестр</SelectItem> → <SelectItem value="orchestra">{t.performanceFormats.orchestra}</SelectItem>

"О себе" → {t.artistSettings.basic.bio}
placeholder="Расскажите о себе..." → placeholder={t.artistSettings.basic.bioPlaceholder}

"Опыт работы" → {t.artistSettings.basic.experience}
placeholder="Лет" → placeholder={t.artistSettings.basic.yearsPlaceholder}
```

**Команда для поиска хардкод-текстов:**
```bash
grep -n "Алматы\|Астана\|Сохранить\|Отмена\|Загрузить" components/ArtistProfileSettings.tsx
```

### 2. CustomerProfileSettings.tsx (КРИТИЧНО!)

**Аналогично Artist, но свои тексты:**

```typescript
"Основная информация" → {t.customerSettings.basic.mainInfo}
"Тип заказчика *" → {t.customerSettings.basic.customerType}

// Типы заказчиков:
"Частное лицо" → {t.customerTypes.individual}
"Ресторан / Зал" → {t.customerTypes.restaurant}
"Event-агентство" → {t.customerTypes.agency}
"Госорган" → {t.customerTypes.government}
"Компания" → {t.customerTypes.company}

"Полное имя" → {t.customerSettings.basic.fullName}
"Название организации" → {t.customerSettings.basic.companyName}
"Город *" → {t.customerSettings.basic.city}
// Города - те же что в Artist

"История мероприятий" → {t.customerSettings.history.eventHistory}
"Всего мероприятий" → {t.customerSettings.history.totalEvents}

"Репутация заказчика" → {t.customerSettings.reputation.customerReputation}

"Способы оплаты" → {t.customerSettings.payment.paymentMethods}
"Добавить способ оплаты" → {t.customerSettings.payment.addPaymentMethod}

"Управление командой" → {t.customerSettings.team.teamManagement}
// Роли:
"Владелец" → {t.teamRoles.owner}
"Менеджер" → {t.teamRoles.manager}
"Бухгалтер" → {t.teamRoles.accountant}
```

### 3. ContractsLegal.tsx

```typescript
"Контракты и юридические документы" → {t.contracts.title}
"Мои контракты" → {t.contracts.tabs.active}
"Шаблоны" → {t.contracts.tabs.templates}

// Типы контрактов:
"Свадебное мероприятие" → {t.contracts.templates.wedding}
"Корпоративное мероприятие" → {t.contracts.templates.corporate}
"Фестиваль/Концерт" → {t.contracts.templates.festival}
"Государственное мероприятие" → {t.contracts.templates.government}
"Ресторан/Лаунж" → {t.contracts.templates.restaurant}
"Частное мероприятие" → {t.contracts.templates.private}

// Статусы:
"Черновик" → {t.statuses.draft}
"Ожидает подписи" → {t.statuses.pending}
"Подписан" → {t.statuses.signed}
"Активен" → {t.statuses.active}
"Завершён" → {t.statuses.completed}

// Эскроу:
"Заблокировано" → {t.statuses.locked}
"Выплачено" → {t.statuses.released}

// Кнопки:
"Открыть" → {t.common.view}
"Скачать" → {t.common.download}
"Создать контракт" → {t.contracts.actions.create}
```

### 4. ReputationSystem.tsx

```typescript
"Репутационная система" → {t.reputation.title}
"Прозрачный рейтинг на основе реальных выступлений" → {t.reputation.subtitle}

// Метрики:
"Пунктуальность" → {t.reputation.metrics.punctuality}
"Качество исполнения" → {t.reputation.metrics.quality}
"Профессионализм" → {t.reputation.metrics.professionalism}
"Работа с аудиторией" → {t.reputation.metrics.audienceWork}
"Техническая подготовка" → {t.reputation.metrics.technicalPrep}

"Достижения" → {t.reputation.achievements.title}
"Последние отзывы" → {t.reputation.reviews.title}
"Показать все отзывы" → {t.common.viewAll}
```

## 🛠 КАК ПРИМЕНИТЬ ИЗМЕНЕНИЯ

### Метод 1: Ручная замена (рекомендуется для точности)

1. Откройте файл в VSCode
2. Ctrl+H (Find and Replace)
3. Найти: `"Алматы"`
4. Заменить: `{t.cities.almaty}`
5. Replace All
6. Повторить для всех текстов

### Метод 2: Используя fast_apply_tool (для больших блоков)

Если блок кода чистый и не изменялся, используйте fast_apply_tool с примерами из /QUICK_REPLACEMENT_EXAMPLES.md

### Метод 3: Создать новые компоненты

Если слишком сложно редактировать существующий файл, можно:
1. Создать новый компонент с правильными переводами
2. Импортировать его вместо старого

## 📋 ЧЕКЛИСТ ДЛЯ ПРОВЕРКИ

После каждого изменения:

1. Сохраните файл
2. Откройте приложение в браузере
3. Переключите язык на **Казахский** (KK)
   - ✅ Все тексты поменялись → ОТЛИЧНО!
   - ❌ Есть русские тексты → Найдите их и замените

4. Переключите на **Русский** (RU)
   - ✅ Все нормально

5. Переключите на **English** (EN)
   - ✅ Все тексты на английском → ОТЛИЧНО!
   - ❌ Есть русские/казахские → Найдите и замените

## 🎯 ПРИОРИТЕТЫ

### Неделя 1 (СРОЧНО):
1. ✅ ArtistProfileSettings - 6 часов
2. ✅ CustomerProfileSettings - 6 часов

→ После этого настройки профилей будут полностью многоязычны!

### Неделя 2:
3. ✅ ContractsLegal - 2 часа
4. ✅ ReputationSystem - 2 часа

### Неделя 3 (опционально):
5. VerificationCenter - 3 часа
6. SupportDisputes - 3 часа
7. LoginPage - 1 час

## 🚀 БЫСТРЫЙ СТАРТ

**Прямо сейчас:**

1. Откройте `/components/ArtistProfileSettings.tsx`
2. Ctrl+F найдите: `"Алматы"`
3. Замените на: `{t.cities.almaty}`
4. Ctrl+F найдите: `"Астана"`
5. Замените на: `{t.cities.astana}`
6. Продолжайте для всех городов
7. Сохраните и проверьте

**Затем:**

1. Найдите: `"Соло"`
2. Замените на: `{t.performanceFormats.solo}`
3. Найдите: `"Дуэт"`
4. Замените на: `{t.performanceFormats.duo}`
5. И так далее...

## 💡 СОВЕТ

Используйте **Multi-cursor editing** в VSCode:
1. Выделите текст для замены (например, "Алматы")
2. Ctrl+D несколько раз (выделит все вхождения)
3. Напишите `{t.cities.almaty}` - заменится сразу везде!

## ✨ РЕЗУЛЬТАТ

После завершения всех замен:
- ✅ При смене языка ВСЕ тексты меняются
- ✅ Нет хардкод-текстов на русском
- ✅ Полная поддержка KK, RU, EN
- ✅ 100% многоязычная платформа!

---

**Последнее обновление:** Сейчас  
**Статус:** NotificationCenter интегрирован! Осталось 4 критичных компонента.
