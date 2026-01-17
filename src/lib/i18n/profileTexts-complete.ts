import { Language } from './translations';

// Полный набор переводов для всех компонентов платформы
export interface ProfileTranslationsComplete {
  // Общие элементы
  common: {
    preview: string;
    cancel: string;
    save: string;
    saving: string;
    saved: string;
    edit: string;
    delete: string;
    add: string;
    upload: string;
    download: string;
    view: string;
    viewAll: string;
    close: string;
    loading: string;
    noData: string;
    search: string;
    filter: string;
    sort: string;
    export: string;
    import: string;
    back: string;
    next: string;
    previous: string;
    confirm: string;
    markAllRead: string;
    clear: string;
    apply: string;
    reset: string;
  };

  // Статусы
  statuses: {
    active: string;
    inactive: string;
    pending: string;
    completed: string;
    cancelled: string;
    draft: string;
    verified: string;
    notVerified: string;
    locked: string;
    released: string;
    signed: string;
  };

  // Города
  cities: {
    almaty: string;
    astana: string;
    shymkent: string;
    karaganda: string;
    tashkent: string;
    bishkek: string;
  };

  // Типы мероприятий
  eventTypes: {
    wedding: string;
    corporate: string;
    private: string;
    festival: string;
    government: string;
    restaurant: string;
    birthday: string;
  };

  // Форматы выступлений
  performanceFormats: {
    solo: string;
    duo: string;
    band: string;
    ensemble: string;
    orchestra: string;
  };

  // Типы заказчиков
  customerTypes: {
    individual: string;
    restaurant: string;
    agency: string;
    government: string;
    company: string;
  };

  // Роли в команде
  teamRoles: {
    owner: string;
    manager: string;
    accountant: string;
  };
}

export const profileTranslationsComplete: Record<Language, ProfileTranslationsComplete> = {
  kk: {
    common: {
      preview: 'Алдын ала қарау',
      cancel: 'Болдырмау',
      save: 'Сақтау',
      saving: 'Сақтау...',
      saved: 'Сәтті сақталды!',
      edit: 'Өңдеу',
      delete: 'Жою',
      add: 'Қосу',
      upload: 'Жүктеу',
      download: 'Жүктеп алу',
      view: 'Көру',
      viewAll: 'Барлығын көру',
      close: 'Жабу',
      loading: 'Жүктелуде...',
      noData: 'Деректер жоқ',
      search: 'Іздеу',
      filter: 'Сүзу',
      sort: 'Сұрыптау',
      export: 'Экспорттау',
      import: 'Импорттау',
      back: 'Артқа',
      next: 'Келесі',
      previous: 'Алдыңғы',
      confirm: 'Растау',
      markAllRead: 'Барлығын оқылған деп белгілеу',
      clear: 'Тазалау',
      apply: 'Қолдану',
      reset: 'Қалпына келтіру',
    },
    statuses: {
      active: 'Белсенді',
      inactive: 'Белсенді емес',
      pending: 'Күтілуде',
      completed: 'Аяқталған',
      cancelled: 'Болдырылған',
      draft: 'Жоба',
      verified: 'Расталған',
      notVerified: 'Расталмаған',
      locked: 'Блокталған',
      released: 'Босатылған',
      signed: 'Қол қойылған',
    },
    cities: {
      almaty: 'Алматы',
      astana: 'Астана',
      shymkent: 'Шымкент',
      karaganda: 'Қараганды',
      tashkent: 'Ташкент',
      bishkek: 'Бішкек',
    },
    eventTypes: {
      wedding: 'Той',
      corporate: 'Корпоративтік',
      private: 'Жеке',
      festival: 'Фестиваль',
      government: 'Мемлекеттік',
      restaurant: 'Мейрамхана',
      birthday: 'Туған күн',
    },
    performanceFormats: {
      solo: 'Жеке',
      duo: 'Дуэт',
      band: 'Топ',
      ensemble: 'Ансамбль',
      orchestra: 'Оркестр',
    },
    customerTypes: {
      individual: 'Жеке тұлға',
      restaurant: 'Мейрамхана / Зал',
      agency: 'Event-агенттік',
      government: 'Мемлекеттік орган',
      company: 'Компания',
    },
    teamRoles: {
      owner: 'Иесі',
      manager: 'Менеджер',
      accountant: 'Бухгалтер',
    },
  },
  ru: {
    common: {
      preview: 'Предпросмотр',
      cancel: 'Отмена',
      save: 'Сохранить',
      saving: 'Сохранение...',
      saved: 'Успешно сохранено!',
      edit: 'Редактировать',
      delete: 'Удалить',
      add: 'Добавить',
      upload: 'Загрузить',
      download: 'Скачать',
      view: 'Просмотреть',
      viewAll: 'Смотреть все',
      close: 'Закрыть',
      loading: 'Загрузка...',
      noData: 'Нет данных',
      search: 'Поиск',
      filter: 'Фильтр',
      sort: 'Сортировка',
      export: 'Экспорт',
      import: 'Импорт',
      back: 'Назад',
      next: 'Далее',
      previous: 'Назад',
      confirm: 'Подтвердить',
      markAllRead: 'Отметить все как прочитанное',
      clear: 'Очистить',
      apply: 'Применить',
      reset: 'Сбросить',
    },
    statuses: {
      active: 'Активный',
      inactive: 'Неактивный',
      pending: 'Ожидает',
      completed: 'Завершён',
      cancelled: 'Отменён',
      draft: 'Черновик',
      verified: 'Верифицирован',
      notVerified: 'Не верифицирован',
      locked: 'Заблокирован',
      released: 'Выпущен',
      signed: 'Подписан',
    },
    cities: {
      almaty: 'Алматы',
      astana: 'Астана',
      shymkent: 'Шымкент',
      karaganda: 'Караганда',
      tashkent: 'Ташкент',
      bishkek: 'Бишкек',
    },
    eventTypes: {
      wedding: 'Свадьба',
      corporate: 'Корпоратив',
      private: 'Частное',
      festival: 'Фестиваль',
      government: 'Государственное',
      restaurant: 'Ресторан',
      birthday: 'День рождения',
    },
    performanceFormats: {
      solo: 'Соло',
      duo: 'Дуэт',
      band: 'Группа',
      ensemble: 'Ансамбль',
      orchestra: 'Оркестр',
    },
    customerTypes: {
      individual: 'Частное лицо',
      restaurant: 'Ресторан / Зал',
      agency: 'Event-агентство',
      government: 'Госорган',
      company: 'Компания',
    },
    teamRoles: {
      owner: 'Владелец',
      manager: 'Менеджер',
      accountant: 'Бухгалтер',
    },
  },
  en: {
    common: {
      preview: 'Preview',
      cancel: 'Cancel',
      save: 'Save',
      saving: 'Saving...',
      saved: 'Successfully saved!',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add',
      upload: 'Upload',
      download: 'Download',
      view: 'View',
      viewAll: 'View All',
      close: 'Close',
      loading: 'Loading...',
      noData: 'No data',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      export: 'Export',
      import: 'Import',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      confirm: 'Confirm',
      markAllRead: 'Mark all as read',
      clear: 'Clear',
      apply: 'Apply',
      reset: 'Reset',
    },
    statuses: {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      completed: 'Completed',
      cancelled: 'Cancelled',
      draft: 'Draft',
      verified: 'Verified',
      notVerified: 'Not Verified',
      locked: 'Locked',
      released: 'Released',
      signed: 'Signed',
    },
    cities: {
      almaty: 'Almaty',
      astana: 'Astana',
      shymkent: 'Shymkent',
      karaganda: 'Karaganda',
      tashkent: 'Tashkent',
      bishkek: 'Bishkek',
    },
    eventTypes: {
      wedding: 'Wedding',
      corporate: 'Corporate',
      private: 'Private',
      festival: 'Festival',
      government: 'Government',
      restaurant: 'Restaurant',
      birthday: 'Birthday',
    },
    performanceFormats: {
      solo: 'Solo',
      duo: 'Duo',
      band: 'Band',
      ensemble: 'Ensemble',
      orchestra: 'Orchestra',
    },
    customerTypes: {
      individual: 'Individual',
      restaurant: 'Restaurant / Venue',
      agency: 'Event Agency',
      government: 'Government',
      company: 'Company',
    },
    teamRoles: {
      owner: 'Owner',
      manager: 'Manager',
      accountant: 'Accountant',
    },
  },
};
