# Быстрые примеры замены текстов для завершения многоязычности

## 🚀 Готовые блоки кода для копирования

### ArtistProfileSettings.tsx

#### 1. Basic Tab - Селект городов
```typescript
<SelectContent>
  <SelectItem value="almaty">{t.cities.almaty}</SelectItem>
  <SelectItem value="astana">{t.cities.astana}</SelectItem>
  <SelectItem value="shymkent">{t.cities.shymkent}</SelectItem>
  <SelectItem value="karaganda">{t.cities.karaganda}</SelectItem>
  <SelectItem value="tashkent">{t.cities.tashkent}</SelectItem>
  <SelectItem value="bishkek">{t.cities.bishkek}</SelectItem>
</SelectContent>
```

#### 2. Basic Tab - Селект форматов
```typescript
<SelectContent>
  <SelectItem value="solo">{t.performanceFormats.solo}</SelectItem>
  <SelectItem value="duo">{t.performanceFormats.duo}</SelectItem>
  <SelectItem value="band">{t.performanceFormats.band}</SelectItem>
  <SelectItem value="ensemble">{t.performanceFormats.ensemble}</SelectItem>
  <SelectItem value="orchestra">{t.performanceFormats.orchestra}</SelectItem>
</SelectContent>
```

#### 3. Commercial Tab - Названия типов мероприятий
```typescript
<Label>{t.eventTypes.wedding}</Label>
<Label>{t.eventTypes.corporate}</Label>
<Label>{t.eventTypes.private}</Label>
```

#### 4. Toast сообщения при сохранении
```typescript
// Успех
toast.success(t.common.saved, {
  description: t.artistSettings.saved
});

// Ошибка
toast.error(t.common.saving, {
  description: dbError || 'Error saving changes'
});
```

#### 5. Labels для всех полей
```typescript
// Basic Tab
<Label>{t.artistSettings.basic.avatar}</Label>
<Label>{t.artistSettings.basic.coverVideo}</Label>
<Label>{t.artistSettings.basic.stageName} *</Label>
<Label>{t.artistSettings.basic.realName}</Label>
<Label>{t.artistSettings.basic.location} *</Label>
<Label>{t.artistSettings.basic.languages}</Label>
<Label>{t.artistSettings.basic.genres}</Label>
<Label>{t.artistSettings.basic.format}</Label>
<Label>{t.artistSettings.basic.bio}</Label>

// Commercial Tab
<Label>{t.artistSettings.commercial.pricing}</Label>
<Label>{t.artistSettings.commercial.basePrice}</Label>
<Label>{t.artistSettings.commercial.included}</Label>
<Label>{t.artistSettings.commercial.additionalServices}</Label>

// Media Tab
<Label>{t.artistSettings.media.portfolio}</Label>
<Label>{t.artistSettings.media.audioTracks}</Label>
<Label>{t.artistSettings.media.videos}</Label>
<Label>{t.artistSettings.media.photos}</Label>

// Security Tab
<Label>{t.artistSettings.security.accountSecurity}</Label>
<Label>{t.artistSettings.security.twoFactor}</Label>
<Label>{t.artistSettings.security.notifications}</Label>
```

### CustomerProfileSettings.tsx

#### 1. Селект типа заказчика
```typescript
<SelectContent>
  <SelectItem value="individual">{t.customerTypes.individual}</SelectItem>
  <SelectItem value="restaurant">{t.customerTypes.restaurant}</SelectItem>
  <SelectItem value="agency">{t.customerTypes.agency}</SelectItem>
  <SelectItem value="government">{t.customerTypes.government}</SelectItem>
  <SelectItem value="company">{t.customerTypes.company}</SelectItem>
</SelectContent>
```

#### 2. Селект городов (тот же что в Artist)
```typescript
<SelectContent>
  <SelectItem value="almaty">{t.cities.almaty}</SelectItem>
  <SelectItem value="astana">{t.cities.astana}</SelectItem>
  <SelectItem value="shymkent">{t.cities.shymkent}</SelectItem>
  <SelectItem value="karaganda">{t.cities.karaganda}</SelectItem>
  <SelectItem value="tashkent">{t.cities.tashkent}</SelectItem>
  <SelectItem value="bishkek">{t.cities.bishkek}</SelectItem>
</SelectContent>
```

#### 3. Team Tab - Роли
```typescript
<SelectContent>
  <SelectItem value="owner">{t.teamRoles.owner}</SelectItem>
  <SelectItem value="manager">{t.teamRoles.manager}</SelectItem>
  <SelectItem value="accountant">{t.teamRoles.accountant}</SelectItem>
</SelectContent>
```

### NotificationCenter.tsx

#### 1. Заголовок и кнопки
```typescript
<h3>{t.notifications.title}</h3>
<Button onClick={markAllAsRead}>{t.common.markAllRead}</Button>
<Button onClick={onClose}>{t.common.close}</Button>
```

#### 2. Табы
```typescript
<TabsTrigger value="all">{t.notifications.tabs.all}</TabsTrigger>
<TabsTrigger value="booking">{t.notifications.tabs.bookings}</TabsTrigger>
<TabsTrigger value="payment">{t.notifications.tabs.payments}</TabsTrigger>
<TabsTrigger value="review">{t.notifications.tabs.reviews}</TabsTrigger>
<TabsTrigger value="system">{t.notifications.tabs.system}</TabsTrigger>
```

#### 3. Типы уведомлений
```typescript
const getNotificationTitle = (type: string) => {
  const titles = {
    booking: t.notifications.types.newBooking,
    payment: t.notifications.types.paymentReceived,
    review: t.notifications.types.newReview,
    system: t.notifications.types.verificationComplete,
    message: t.notifications.types.newMessage
  };
  return titles[type] || type;
};
```

#### 4. Пустое состояние
```typescript
<div className="text-center py-8">
  <p>{t.notifications.empty}</p>
</div>
```

### ContractsLegal.tsx

#### 1. Статусы контрактов
```typescript
const getStatusBadge = (status: string) => {
  const statusLabels = {
    draft: t.statuses.draft,
    pending: t.statuses.pending,
    signed: t.statuses.signed,
    active: t.statuses.active,
    completed: t.statuses.completed
  };
  return statusLabels[status];
};
```

#### 2. Статусы эскроу
```typescript
const escrowStatusText = {
  none: t.contracts.escrow.none,
  locked: t.statuses.locked,
  released: t.statuses.released
};
```

#### 3. Типы контрактов (template names)
```typescript
const contractNames = {
  wedding: t.contracts.templates.wedding,
  corporate: t.contracts.templates.corporate,
  festival: t.contracts.templates.festival,
  government: t.contracts.templates.government,
  restaurant: t.contracts.templates.restaurant,
  private: t.contracts.templates.private
};
```

#### 4. Кнопки действий
```typescript
<Button>{t.common.view}</Button>
<Button>{t.common.download}</Button>
<Button>{t.contracts.actions.create}</Button>
<Button>{t.common.preview}</Button>
<Button>{t.contracts.actions.sign}</Button>
```

### ReputationSystem.tsx

#### 1. Метрики репутации
```typescript
const reputationMetrics = [
  {
    name: t.reputation.metrics.punctuality,
    score: 98,
    icon: Clock,
    color: 'text-green-600'
  },
  {
    name: t.reputation.metrics.quality,
    score: 95,
    icon: Music,
    color: 'text-purple-600'
  },
  {
    name: t.reputation.metrics.professionalism,
    score: 97,
    icon: Award,
    color: 'text-blue-600'
  },
  {
    name: t.reputation.metrics.audienceWork,
    score: 94,
    icon: Users,
    color: 'text-pink-600'
  },
  {
    name: t.reputation.metrics.technicalPrep,
    score: 96,
    icon: Zap,
    color: 'text-yellow-600'
  }
];
```

#### 2. Заголовки
```typescript
<h1>{t.reputation.title}</h1>
<p>{t.reputation.subtitle}</p>
<h3>{t.reputation.overallScore}</h3>
<h3>{t.reputation.achievements.title}</h3>
<h3>{t.reputation.reviews.title}</h3>
```

### FinancialProfile.tsx

#### 1. Названия месяцев (динамически)
```typescript
const { language } = useTranslation();

const getMonthName = (monthIndex: number) => {
  const months = {
    kk: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 
         'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
    ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
         'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  return months[language][monthIndex];
};

// Использование:
const monthlyData = [
  { month: getMonthName(0), earnings: 450000, bookings: 3 },
  { month: getMonthName(1), earnings: 380000, bookings: 2 },
  // ...
];
```

#### 2. Статусы транзакций
```typescript
const statusText = payment.status === 'released' 
  ? t.statuses.released 
  : t.statuses.locked;
```

#### 3. Кнопки и заголовки
```typescript
<Button>{t.common.export}</Button>
<Button>{t.common.download}</Button>
<Button>{t.financial.actions.downloadReport}</Button>
```

## 🔧 Универсальные паттерны

### 1. Замена кнопок
```typescript
// Старый код:
<Button>Сохранить</Button>
<Button>Отмена</Button>
<Button>Загрузить</Button>
<Button>Скачать</Button>
<Button>Просмотреть</Button>
<Button>Удалить</Button>
<Button>Добавить</Button>
<Button>Редактировать</Button>

// Новый код:
<Button>{t.common.save}</Button>
<Button>{t.common.cancel}</Button>
<Button>{t.common.upload}</Button>
<Button>{t.common.download}</Button>
<Button>{t.common.view}</Button>
<Button>{t.common.delete}</Button>
<Button>{t.common.add}</Button>
<Button>{t.common.edit}</Button>
```

### 2. Замена загрузки
```typescript
// Старый код:
{loading && <p>Загрузка...</p>}

// Новый код:
{loading && <p>{t.common.loading}</p>}
```

### 3. Замена пустого состояния
```typescript
// Старый код:
{items.length === 0 && <p>Нет данных</p>}

// Новый код:
{items.length === 0 && <p>{t.common.noData}</p>}
```

### 4. Замена статусов
```typescript
// Старый код:
const statusText = status === 'active' ? 'Активный' : 'Неактивный';

// Новый код:
const statusText = status === 'active' ? t.statuses.active : t.statuses.inactive;
```

### 5. Замена типов мероприятий
```typescript
// Старый код:
const eventName = type === 'wedding' ? 'Свадьба' : 'Корпоратив';

// Новый код:
const eventName = {
  wedding: t.eventTypes.wedding,
  corporate: t.eventTypes.corporate,
  private: t.eventTypes.private,
  festival: t.eventTypes.festival,
  government: t.eventTypes.government,
  restaurant: t.eventTypes.restaurant,
  birthday: t.eventTypes.birthday
}[type];
```

## ✅ Чек-лист для каждого компонента

При интеграции переводов в компонент, проверьте:

- [ ] Хук `useProfileTranslation` подключен
- [ ] Заголовки страницы переведены
- [ ] Подзаголовки переведены
- [ ] Все кнопки используют `t.common.*`
- [ ] Все labels используют переводы
- [ ] Все placeholders используют переводы
- [ ] Города используют `t.cities.*`
- [ ] Форматы используют `t.performanceFormats.*`
- [ ] Типы мероприятий используют `t.eventTypes.*`
- [ ] Типы заказчиков используют `t.customerTypes.*`
- [ ] Роли команды используют `t.teamRoles.*`
- [ ] Статусы используют `t.statuses.*`
- [ ] Toast сообщения переведены
- [ ] Сообщения об ошибках переведены
- [ ] Динамический контент (месяцы, даты) использует правильный язык
- [ ] Нет хардкод-текстов на русском/казахском

## 🎯 Приоритетность замены

### Высокий приоритет (видно пользователю):
1. Заголовки страниц
2. Кнопки действий
3. Labels полей ввода
4. Сообщения об ошибках/успехе
5. Названия вкладок

### Средний приоритет:
6. Placeholders
7. Подсказки (tooltips)
8. Статусы
9. Названия месяцев/дат

### Низкий приоритет:
10. Комментарии в коде
11. Console.log сообщения
12. Дебаг информация

## 🚀 Скрипт для быстрой проверки

Проверьте каждый компонент на наличие хардкод-текстов:

```bash
# Поиск русских текстов в компонентах
grep -r "Сохранить\|Отмена\|Загрузка\|Алматы\|Астана" components/

# Поиск казахских текстов
grep -r "Сақтау\|Болдырмау\|Алматы" components/

# Проверка использования переводов
grep -r "useProfileTranslation" components/
```

Каждый найденный хардкод-текст нужно заменить на перевод из модуля!
