// Расширение переводов для системы бронирования
// Эти ключи нужно добавить в секцию booking в translations.ts

export const bookingTranslationsKK = {
  // Заголовки модалов
  artistBooking: 'Артист брондау',
  smartBooking: 'Ақылды брондау',
  stepOf: 'Қадам',
  from: 'бастап',
  
  // Формы
  eventTypeLabel: 'Іс-шара түрі *',
  selectType: 'Түрін таңдаңыз',
  dateLabel: 'Күн *',
  timeLabel: 'Уақыт',
  startTime: 'Басталу уақыты',
  durationLabel: 'Ұзақтығы',
  locationLabel: 'Орын *',
  cityLabel: 'Қала *',
  guestCountLabel: 'Қонақтар саны',
  additionalNotes: 'Қосымша тілектер',
  yourName: 'Атыңыз *',
  phone: 'Телефон *',
  email: 'Email *',
  
  // Placeholders
  selectPlaceholder: 'Таңдаңыз',
  locationPlaceholder: 'Қала, мекенжай немесе мекеме атауы',
  addressPlaceholder: 'Мекенжай немесе мекеме атауы',
  cityPlaceholder: 'Алматы, Астана...',
  guestCountPlaceholder: 'Шамамен саны',
  notesPlaceholder: 'Арнайы талаптар, репертуар, техникалық ақпарат...',
  namePlaceholder: 'Қалай қаратуға болады',
  phonePlaceholder: '+7 (___) ___-__-__',
  
  // Түрлері
  eventTypes: {
    wedding: 'Үйлену тойы',
    corporate: 'Корпоратив',
    birthday: 'Туған күн',
    festival: 'Фестиваль',
    concert: 'Концерт',
    restaurant: 'Мейрамхана',
    government: 'Мемлекеттік іс-шара',
    other: 'Басқа'
  },
  
  // Ұзақтығы
  durations: {
    hour1: '1 сағат',
    hour2: '2 сағат',
    hour3: '3 сағат',
    hour3standard: '3 сағат (стандарт)',
    hour4: '4 сағат',
    hour6: '6 сағат',
    hour8: 'Бүкіл күн',
    fullDay: 'Бүкіл күн'
  },
  
  // Батырмалар
  next: 'Келесі',
  nextServices: 'Келесі: Қосымша қызметтер',
  nextContact: 'Келесі: Байланыс деректері',
  nextPayment: 'Келесі: Төлем және келісімшарт',
  back: 'Артқа',
  sendRequest: 'Өтінім жіберу',
  pay: 'Төлеу',
  processing: 'Өңделуде...',
  close: 'Жабу',
  
  // Ақпарат блоктары
  howItWorks: 'Қалай жұмыс істейді?',
  howItWorksDesc: 'Өтінімді жібергеннен кейін артист хабарлама алады және 24 сағат ішінде сізбен байланысады.',
  requestSent: 'Өтінім жіберілді!',
  requestSentDesc: 'получил вашу заявку және скоро свяжется с вами',
  priceRecalculate: 'Баға автоматты түрде қайта есептеледі',
  
  // Қосымша қызметтер
  additionalServices: 'Қосымша қызметтер',
  additionalServicesDesc: 'Іс-шараңыз үшін толық продакшнды сақтаңыз',
  aiRecommends: 'AI ұсынады',
  aiRecommendsDesc: 'үшін',
  
  services: {
    sound: 'Кәсіби дыбыс жүйесі',
    soundDesc: 'Дыбыс жабдықтарының толық жиынтығы + дыбыс режиссері',
    lighting: 'Жарық жабдықтары',
    lightingDesc: 'Кәсіби жарық + жарық режиссері',
    video: 'Бейне түсірілім',
    videoDesc: '2 камера, кәсіби монтаж',
    host: 'Іс-шара жүргізушісі',
    hostDesc: 'Тәжірибелі тамада/жүргізуші'
  },
  
  // Баға бөлшектері
  priceBreakdown: 'Құнның толық ақпараты',
  performance: 'Артист өнері',
  platformFee: 'Платформа қызметтері (3%)',
  total: 'Барлығы',
  performances: 'өнерлері',
  
  // Эскроу және Келісімшарт
  escrowProtection: 'Эскроу қорғауы + Смарт-келісімшарт',
  escrowTitle: 'Эскроу қорғауы',
  escrowDesc: 'Ақша өнер көрсетілгенге дейін қорғалған шотта блокталады. Іс-шарадан кейін артистке автоматты төлем.',
  escrowAgree: 'Мен эскроу-депонирлеудің шарттарын түсінемін',
  contractTitle: 'Смарт-келісімшарт',
  contractDesc: 'Заңды күші бар автоматты келісім',
  contractTerms: {
    penalty: 'Үзілу үшін айыппұл: сомасының 50%',
    forceMajeure: 'Форс-мажор: толық қайтарым',
    cancellation: '7+ күн бұрын болдырмау: 90% қайтарым'
  },
  contractAccept: 'Мен смарт-келісімшарттың шарттарын қабылдаймын және',
  publicOffer: 'Жария оферта',
  
  // Сәтті аяқталды
  bookingConfirmed: 'Брондау расталды!',
  escrowLocked: 'Ақша эскроу-шотта блокталды. Келісімшарт жасалды.',
  contractCreated: 'Келісімшарт жасалды.',
  artist: 'Артист:',
  event: 'Іс-шара:',
  date: 'Күн:',
  location: 'Орын:',
  paid: 'Төленді:',
  downloadContract: 'Келісімшартты жүктеу (PDF)',
  viewBookings: 'Менің брондауларым',
  
  // Брондаулар беті
  manageBookings: 'Тапсырыстар мен келісімшарттарды басқару',
  stats: {
    total: 'Барлық брондаулар',
    upcoming: 'Алдағы',
    onEscrow: 'Эскроуда',
    completed: 'Аяқталған'
  },
  
  empty: {
    title: 'Әзірге брондауларыңыз жоқ',
    description: 'Каталогтан артист іздеуден бастаңыз',
    goToCatalog: 'Каталогқа өту'
  },
  
  tabs: {
    all: 'Барлығы',
    upcoming: 'Алдағы',
    completed: 'Аяқталған'
  },
  
  status: {
    pending: 'Күтуде',
    confirmed: 'Расталды',
    completed: 'Аяқталды',
    cancelled: 'Болдырылды',
    inProgress: 'Үдерісте',
    disputed: 'Дау'
  },
  
  paymentStatus: {
    pending: '⏳ Төлем күтуде',
    paid: '💳 Төленді',
    escrow: '🔒 Эскроуда',
    released: '✅ Төленді',
    refunded: '↩️ Қайтарылды'
  },
  
  actions: {
    contract: 'Келісімшарт',
    contact: 'Байланысу',
    cancel: 'Болдырмау',
    complete: 'Іс-шараны аяқтау',
    leaveReview: 'Пікір қалдыру'
  },
  
  // Хабарламалар
  loginRequired: 'Авторизация қажет',
  demoArtistError: 'Бұл артистті брондау мүмкін емес',
  demoArtistErrorDesc: 'Бұл артист демо-деректерден. Мәліметтер базасын жүктегеннен кейін каталогтан артист таңдаңыз.',
  bookingCreated: 'Брондау жасалды!',
  bookingCreatedDesc: '\"Менің брондауларым\" бөлімін тексеріңіз',
  bookingCancelled: 'Брондау болдырылды',
  bookingCancelledDesc: 'Қаражат шотыңызға қайтарылды',
  eventCompleted: 'Іс-шара аяқталды',
  eventCompletedDesc: 'Қаражат артистке аударылды',
  error: 'Қате',
  
  // Болдырмау диалогы
  cancelDialog: {
    title: 'Брондауды болдырмау керек пе?',
    description: 'Бұл әрекет брондауды болдырып, қаражатты шотыңызға қайтарады. Келісімшарт шарттарына байланысты комиссия ұсталуы мүмкін.',
    cancel: 'Болдырмау',
    confirm: 'Иә, болдыру'
  },
  
  // Жүктеу және қателер
  loading: 'Брондаулар жүктелуде...',
  loadingError: 'Жүктеу қатесі',
  reload: 'Бетті жаңарту'
};

export const bookingTranslationsRU = {
  // Заголовки модалов
  artistBooking: 'Бронирование артиста',
  smartBooking: 'Умное бронирование',
  stepOf: 'Шаг',
  from: 'От',
  
  // Формы
  eventTypeLabel: 'Тип мероприятия *',
  selectType: 'Выберите тип',
  dateLabel: 'Дата *',
  timeLabel: 'Время',
  startTime: 'Время начала',
  durationLabel: 'Длительность',
  locationLabel: 'Место проведения *',
  cityLabel: 'Город *',
  guestCountLabel: 'Количество гостей',
  additionalNotes: 'Дополнительные пожелания',
  yourName: 'Ваше имя *',
  phone: 'Телефон *',
  email: 'Email *',
  
  // Placeholders
  selectPlaceholder: 'Выберите',
  locationPlaceholder: 'Город, адрес или название заведения',
  addressPlaceholder: 'Адрес или название заведения',
  cityPlaceholder: 'Алматы, Астана...',
  guestCountPlaceholder: 'Примерное количество',
  notesPlaceholder: 'Особые требования, репертуар, технические детали...',
  namePlaceholder: 'Как к вам обращаться',
  phonePlaceholder: '+7 (___) ___-__-__',
  
  // Типы
  eventTypes: {
    wedding: 'Свадьба',
    corporate: 'Корпоратив',
    birthday: 'День рождения',
    festival: 'Фестиваль',
    concert: 'Концерт',
    restaurant: 'Ресторан',
    government: 'Государственное мероприятие',
    other: 'Другое'
  },
  
  // Длительность
  durations: {
    hour1: '1 час',
    hour2: '2 часа',
    hour3: '3 часа',
    hour3standard: '3 часа (стандарт)',
    hour4: '4 часа',
    hour6: '6 часов',
    hour8: 'Весь день',
    fullDay: 'Весь день'
  },
  
  // Кнопки
  next: 'Далее',
  nextServices: 'Далее: Дополнительные услуги',
  nextContact: 'Далее: Контактные данные',
  nextPayment: 'Далее: Оплата и контракт',
  back: 'Назад',
  sendRequest: 'Отправить заявку',
  pay: 'Оплатить',
  processing: 'Обработка...',
  close: 'Закрыть',
  
  // Информационные блоки
  howItWorks: 'Как это работает?',
  howItWorksDesc: 'После отправки заявки артист получит уведомление и свяжется с вами в течение 24 часов для уточнения деталей.',
  requestSent: 'Заявка отправлена!',
  requestSentDesc: 'получил вашу заявку и скоро с вами свяжется',
  priceRecalculate: 'Цена пересчитается автоматически',
  
  // Дополнительные услуги
  additionalServices: 'Дополнительные услуги',
  additionalServicesDesc: 'Сохраните полный продакшн для вашего мероприятия',
  aiRecommends: 'AI рекомендует',
  aiRecommendsDesc: 'для',
  
  services: {
    sound: 'Профессиональная звуковая система',
    soundDesc: 'Полный комплект звукового оборудования + звукорежиссёр',
    lighting: 'Световое оборудование',
    lightingDesc: 'Профессиональный свет + светорежиссёр',
    video: 'Видеосъёмка',
    videoDesc: '2 камеры, профессиональный монтаж',
    host: 'Ведущий мероприятия',
    hostDesc: 'Опытный тамада/ведущий'
  },
  
  // Детализация цены
  priceBreakdown: 'Детализация стоимости',
  performance: 'Выступление артиста',
  platformFee: 'Услуги платформы (3%)',
  total: 'Итого',
  performances: 'выступлений',
  
  // Эскроу и Контракт
  escrowProtection: 'Защита эскроу + Смарт-контракт',
  escrowTitle: 'Защита эскроу',
  escrowDesc: 'Деньги блокируются на защищённом счёте до выступления. Автоматическая выплата артисту после мероприятия.',
  escrowAgree: 'Я понимаю условия эскроу-депонирования',
  contractTitle: 'Смарт-контракт',
  contractDesc: 'Автоматический договор с юридической силой',
  contractTerms: {
    penalty: 'Штраф за срыв: 50% от суммы',
    forceMajeure: 'Форс-мажор: полный возврат',
    cancellation: 'Отмена за 7+ дней: возврат 90%'
  },
  contractAccept: 'Я принимаю условия смарт-контракта и',
  publicOffer: 'Публичной оферты',
  
  // Успешно
  bookingConfirmed: 'Бронирование подтверждено!',
  escrowLocked: 'Деньги заблокированы на эскроу-счёте. Контракт создан.',
  contractCreated: 'Контракт создан.',
  artist: 'Артист:',
  event: 'Мероприятие:',
  date: 'Дата:',
  location: 'Место:',
  paid: 'Оплачено:',
  downloadContract: 'Скачать контракт (PDF)',
  viewBookings: 'Мои бронирования',
  
  // Страница брониров��ний
  manageBookings: 'Управляйте вашими заказами и контрактами',
  stats: {
    total: 'Всего букингов',
    upcoming: 'Предстоящих',
    onEscrow: 'На эскроу',
    completed: 'Завершённых'
  },
  
  empty: {
    title: 'У вас пока нет бронирований',
    description: 'Начните с поиска артистов в каталоге',
    goToCatalog: 'Перейти в каталог'
  },
  
  tabs: {
    all: 'Все',
    upcoming: 'Предстоящие',
    completed: 'Завершённые'
  },
  
  status: {
    pending: 'Ожидает',
    confirmed: 'Подтверждено',
    completed: 'Завершено',
    cancelled: 'Отменено',
    inProgress: 'В процессе',
    disputed: 'Спор'
  },
  
  paymentStatus: {
    pending: '⏳ Ожидает оплаты',
    paid: '💳 Оплачено',
    escrow: '🔒 На эскроу',
    released: '✅ Выплачено',
    refunded: '↩️ Возвращено'
  },
  
  actions: {
    contract: 'Контракт',
    contact: 'Связаться',
    cancel: 'Отменить',
    complete: 'Завершить мероприятие',
    leaveReview: 'Оставить отзыв'
  },
  
  // Сообщения
  loginRequired: 'Необходимо авторизоваться',
  demoArtistError: 'Невозможно забронировать этого артиста',
  demoArtistErrorDesc: 'Этот артист из демо-данных. Пожалуйста, выберите артиста из каталога после загрузки базы данных.',
  bookingCreated: 'Бронирование создано!',
  bookingCreatedDesc: 'Проверьте раздел "Мои бронирования"',
  bookingCancelled: 'Бронирование отменено',
  bookingCancelledDesc: 'Средства возвращены на ваш счёт',
  eventCompleted: 'Мероприятие завершено',
  eventCompletedDesc: 'Средства переведены артисту',
  error: 'Ошибка',
  
  // Диалог отмены
  cancelDialog: {
    title: 'Отменить бронирование?',
    description: 'Это действие отменит бронирование и вернёт средства на ваш счёт. В зависимости от условий контракта, может быть удержана комиссия.',
    cancel: 'Не отменять',
    confirm: 'Да, отменить'
  },
  
  // Загрузка и ошибки
  loading: 'Загрузка бронирований...',
  loadingError: 'Ошибка загрузки',
  reload: 'Обновить страницу'
};

export const bookingTranslationsEN = {
  // Modal titles
  artistBooking: 'Artist Booking',
  smartBooking: 'Smart Booking',
  stepOf: 'Step',
  from: 'From',
  
  // Forms
  eventTypeLabel: 'Event Type *',
  selectType: 'Select type',
  dateLabel: 'Date *',
  timeLabel: 'Time',
  startTime: 'Start Time',
  durationLabel: 'Duration',
  locationLabel: 'Venue *',
  cityLabel: 'City *',
  guestCountLabel: 'Guest Count',
  additionalNotes: 'Additional Notes',
  yourName: 'Your Name *',
  phone: 'Phone *',
  email: 'Email *',
  
  // Placeholders
  selectPlaceholder: 'Select',
  locationPlaceholder: 'City, address, or venue name',
  addressPlaceholder: 'Address or venue name',
  cityPlaceholder: 'Almaty, Astana...',
  guestCountPlaceholder: 'Approximate number',
  notesPlaceholder: 'Special requirements, repertoire, technical details...',
  namePlaceholder: 'How to address you',
  phonePlaceholder: '+7 (___) ___-__-__',
  
  // Types
  eventTypes: {
    wedding: 'Wedding',
    corporate: 'Corporate',
    birthday: 'Birthday',
    festival: 'Festival',
    concert: 'Concert',
    restaurant: 'Restaurant',
    government: 'Government Event',
    other: 'Other'
  },
  
  // Duration
  durations: {
    hour1: '1 hour',
    hour2: '2 hours',
    hour3: '3 hours',
    hour3standard: '3 hours (standard)',
    hour4: '4 hours',
    hour6: '6 hours',
    hour8: 'Full day',
    fullDay: 'Full day'
  },
  
  // Buttons
  next: 'Next',
  nextServices: 'Next: Additional Services',
  nextContact: 'Next: Contact Details',
  nextPayment: 'Next: Payment & Contract',
  back: 'Back',
  sendRequest: 'Send Request',
  pay: 'Pay',
  processing: 'Processing...',
  close: 'Close',
  
  // Info blocks
  howItWorks: 'How does it work?',
  howItWorksDesc: 'After submitting the request, the artist will receive a notification and contact you within 24 hours to clarify details.',
  requestSent: 'Request sent!',
  requestSentDesc: 'received your request and will contact you soon',
  priceRecalculate: 'Price will be recalculated automatically',
  
  // Additional services
  additionalServices: 'Additional Services',
  additionalServicesDesc: 'Keep full production for your event',
  aiRecommends: 'AI recommends',
  aiRecommendsDesc: 'for',
  
  services: {
    sound: 'Professional Sound System',
    soundDesc: 'Full audio equipment set + sound engineer',
    lighting: 'Lighting Equipment',
    lightingDesc: 'Professional lighting + lighting engineer',
    video: 'Video Production',
    videoDesc: '2 cameras, professional editing',
    host: 'Event Host',
    hostDesc: 'Experienced MC/Host'
  },
  
  // Price breakdown
  priceBreakdown: 'Price Breakdown',
  performance: 'Artist Performance',
  platformFee: 'Platform Services (3%)',
  total: 'Total',
  performances: 'performances',
  
  // Escrow & Contract
  escrowProtection: 'Escrow Protection + Smart Contract',
  escrowTitle: 'Escrow Protection',
  escrowDesc: 'Money is locked in a secure account until the performance. Automatic payment to the artist after the event.',
  escrowAgree: 'I understand the escrow terms',
  contractTitle: 'Smart Contract',
  contractDesc: 'Automatic agreement with legal force',
  contractTerms: {
    penalty: 'Cancellation penalty: 50% of amount',
    forceMajeure: 'Force majeure: full refund',
    cancellation: 'Cancel 7+ days prior: 90% refund'
  },
  contractAccept: 'I accept the smart contract terms and',
  publicOffer: 'Public Offer',
  
  // Success
  bookingConfirmed: 'Booking Confirmed!',
  escrowLocked: 'Funds locked in escrow account. Contract created.',
  contractCreated: 'Contract created.',
  artist: 'Artist:',
  event: 'Event:',
  date: 'Date:',
  location: 'Location:',
  paid: 'Paid:',
  downloadContract: 'Download Contract (PDF)',
  viewBookings: 'My Bookings',
  
  // Bookings page
  manageBookings: 'Manage your orders and contracts',
  stats: {
    total: 'Total Bookings',
    upcoming: 'Upcoming',
    onEscrow: 'In Escrow',
    completed: 'Completed'
  },
  
  empty: {
    title: 'You have no bookings yet',
    description: 'Start by searching for artists in the catalog',
    goToCatalog: 'Go to Catalog'
  },
  
  tabs: {
    all: 'All',
    upcoming: 'Upcoming',
    completed: 'Completed'
  },
  
  status: {
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    inProgress: 'In Progress',
    disputed: 'Disputed'
  },
  
  paymentStatus: {
    pending: '⏳ Awaiting Payment',
    paid: '💳 Paid',
    escrow: '🔒 In Escrow',
    released: '✅ Released',
    refunded: '↩️ Refunded'
  },
  
  actions: {
    contract: 'Contract',
    contact: 'Contact',
    cancel: 'Cancel',
    complete: 'Complete Event',
    leaveReview: 'Leave Review'
  },
  
  // Messages
  loginRequired: 'Authorization required',
  demoArtistError: 'Cannot book this artist',
  demoArtistErrorDesc: 'This artist is from demo data. Please select an artist from the catalog after loading the database.',
  bookingCreated: 'Booking created!',
  bookingCreatedDesc: 'Check the "My Bookings" section',
  bookingCancelled: 'Booking cancelled',
  bookingCancelledDesc: 'Funds returned to your account',
  eventCompleted: 'Event completed',
  eventCompletedDesc: 'Funds transferred to artist',
  error: 'Error',
  
  // Cancel dialog
  cancelDialog: {
    title: 'Cancel booking?',
    description: 'This action will cancel the booking and return funds to your account. Depending on contract terms, a commission may be withheld.',
    cancel: 'Don\'t Cancel',
    confirm: 'Yes, Cancel'
  },
  
  // Loading & errors
  loading: 'Loading bookings...',
  loadingError: 'Loading error',
  reload: 'Reload page'
};
