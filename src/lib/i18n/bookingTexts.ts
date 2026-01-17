// Simplified booking translations module
// Directly usable in components without modifying main translations.ts

import { Language } from './translations';

export const bookingTexts: Record<Language, {
  // Simple booking modal
  artistBooking: string;
  step: string;
  of: string;
  eventType: string;
  selectType: string;
  date: string;
  duration: string;
  selectDuration: string;
  location: string;
  locationPlaceholder: string;
  guestCount: string;
  guestCountPlaceholder: string;
  additionalNotes: string;
  notesPlaceholder: string;
  next: string;
  yourName: string;
  namePlaceholder: string;
  phone: string;
  email: string;
  howItWorks: string;
  howItWorksDesc: string;
  back: string;
  sendRequest: string;
  requestSent: string;
  receivedRequest: string;
  event: string;
  location2: string;
  close: string;
  // Event types
  wedding: string;
  corporate: string;
  birthday: string;
  festival: string;
  concert: string;
  restaurant: string;
  government: string;
  other: string;
  // Durations
  hour1: string;
  hour2: string;
  hour3: string;
  hour3std: string;
  hour4: string;
  hour6: string;
  hour8: string;
  fullDay: string;
  // Enhanced booking
  smartBooking: string;
  escrowSmartContract: string;
  from: string;
  performances: string;
  city: string;
  cityPlaceholder: string;
  startTime: string;
  priceRecalc: string;
  nextServices: string;
  additionalServices: string;
  additionalServicesDesc: string;
  soundSystem: string;
  soundSystemDesc: string;
  lightingEquipment: string;
  lightingEquipmentDesc: string;
  videoProduction: string;
  videoProductionDesc: string;
  eventHost: string;
  eventHostDesc: string;
  aiRecommends: string;
  aiRecommendsFor: string;
  nextContact: string;
  nextPayment: string;
  priceBreakdown: string;
  performance: string;
  platformServices: string;
  total: string;
  escrowProtection: string;
  escrowProtectionDesc: string;
  understandEscrow: string;
  smartContract: string;
  smartContractDesc: string;
  penaltyCancel: string;
  forceMajeure: string;
  cancelWeek: string;
  acceptContract: string;
  publicOffer: string;
  pay: string;
  processing: string;
  bookingConfirmed: string;
  fundsLocked: string;
  artist: string;
  paid: string;
  downloadContract: string;
  // Bookings page
  myBookings: string;
  manageBookings: string;
  totalBookings: string;
  upcoming: string;
  onEscrow: string;
  completed: string;
  authRequired: string;
  authRequiredDesc: string;
  login: string;
  loadingBookings: string;
  loadingError: string;
  reload: string;
  noBookings: string;
  noBookingsDesc: string;
  goToCatalog: string;
  all: string;
  contract: string;
  contact: string;
  cancel: string;
  completeEvent: string;
  leaveReview: string;
  cancelBookingTitle: string;
  cancelBookingDesc: string;
  dontCancel: string;
  yesCancel: string;
  // Statuses
  pending: string;
  confirmed: string;
  inProgress: string;
  disputed: string;
  // Payment statuses
  awaitingPayment: string;
  paidStatus: string;
  inEscrow: string;
  released: string;
  refunded: string;
}> = {
  kk: {
    artistBooking: 'Артист брондау',
    step: 'Қадам',
    of: '-',
    eventType: 'Іс-шара түрі *',
    selectType: 'Түрін таңдаңыз',
    date: 'Күн *',
    duration: 'Ұзақтығы',
    selectDuration: 'Таңдаңыз',
    location: 'Орын *',
    locationPlaceholder: 'Қала, мекенжай немесе мекеме атауы',
    guestCount: 'Қонақтар саны',
    guestCountPlaceholder: 'Шамамен саны',
    additionalNotes: 'Қосымша тілектер',
    notesPlaceholder: 'Арнайы талаптар, репертуар, техникалық ақпарат...',
    next: 'Келесі',
    yourName: 'Атыңыз *',
    namePlaceholder: 'Қалай қаратуға болады',
    phone: 'Телефон *',
    email: 'Email *',
    howItWorks: 'Қалай жұмыс істейді?',
    howItWorksDesc: 'Өтінімді жібергеннен кейін артист хабарлама алады және 24 сағат ішінде сізбен байланысады.',
    back: 'Артқа',
    sendRequest: 'Өтінім жіберу',
    requestSent: 'Өтінім жіберілді!',
    receivedRequest: 'өтініміңізді алды және көп ұзамай сізбен байланысады',
    event: 'Іс-шара:',
    location2: 'Орын:',
    close: 'Жабу',
    wedding: 'Үйлену тойы',
    corporate: 'Корпоратив',
    birthday: 'Туған күн',
    festival: 'Фестиваль',
    concert: 'Концерт',
    restaurant: 'Мейрамхана',
    government: 'Мемлекеттік іс-шара',
    other: 'Басқа',
    hour1: '1 сағат',
    hour2: '2 сағат',
    hour3: '3 сағат',
    hour3std: '3 сағат (стандарт)',
    hour4: '4 сағат',
    hour6: '6 сағат',
    hour8: '8 сағат',
    fullDay: 'Бүкіл күн',
    smartBooking: 'Ақылды брондау',
    escrowSmartContract: 'Эскроу қорғауы + Смарт-келісімшарт',
    from: 'бастап',
    performances: 'өнерлері',
    city: 'Қала *',
    cityPlaceholder: 'Алматы, Астана...',
    startTime: 'Басталу уақыты',
    priceRecalc: 'Баға автоматты түрде қ��йта есептеледі',
    nextServices: 'Келесі: Қосымша қызметтер',
    additionalServices: 'Қосымша қызметтер',
    additionalServicesDesc: 'Іс-шараңыз үшін толық продакшнды сақтаңыз',
    soundSystem: 'Кәсіби дыбыс жүйесі',
    soundSystemDesc: 'Дыбыс жабдықтарының толық жиынтығы + дыбыс режиссері',
    lightingEquipment: 'Жарық жабдықтары',
    lightingEquipmentDesc: 'Кәсіби жарық + жарық режиссері',
    videoProduction: 'Бейне түсірілім',
    videoProductionDesc: '2 камера, кәсіби монтаж',
    eventHost: 'Іс-шара жүргізушісі',
    eventHostDesc: 'Тәжірибелі тамада/жүргізуші',
    aiRecommends: 'AI ұсынады',
    aiRecommendsFor: 'үшін',
    nextContact: 'Келесі: Байланыс деректері',
    nextPayment: 'Келесі: Төлем және келісімшарт',
    priceBreakdown: 'Құнның толық ақпараты',
    performance: 'Артист өнері',
    platformServices: 'Платформа қызметтері (3%)',
    total: 'Барлығы',
    escrowProtection: 'Эскроу қорғауы',
    escrowProtectionDesc: 'Ақша өнер көрсетілгенге дейін қорғалған шотта блокталады. Іс-шарадан кейін артистке автоматты төлем.',
    understandEscrow: 'Мен эскроу-депонирлеудің шарттарын түсінемін',
    smartContract: 'Смарт-келісімшарт',
    smartContractDesc: 'Заңды күші бар автоматты келісім',
    penaltyCancel: 'Үзілу үшін айыппұл: сомасының 50%',
    forceMajeure: 'Форс-мажор: толық қайтарым',
    cancelWeek: '7+ күн бұрын болдырмау: 90% қайтарым',
    acceptContract: 'Мен смарт-келісімшарттың шарттарын қабылдаймын және',
    publicOffer: 'Жария оферта',
    pay: 'Төлеу',
    processing: 'Өңделуде...',
    bookingConfirmed: 'Брондау расталды!',
    fundsLocked: 'Ақша эскроу-шотта блокталды. Келісімшарт жасалды.',
    artist: 'Артист:',
    paid: 'Төленді:',
    downloadContract: 'Келісімшартты жүктеу (PDF)',
    myBookings: 'Менің брондауларым',
    manageBookings: 'Тапсырыстар мен келісімшарттарды басқару',
    totalBookings: 'Барлық брондаулар',
    upcoming: 'Алдағы',
    onEscrow: 'Эскроуда',
    completed: 'Аяқталған',
    authRequired: 'Авторизация қажет',
    authRequiredDesc: 'Брондауларыңызды көру үшін жүйеге кіріңіз',
    login: 'Кіру',
    loadingBookings: 'Брондаулар жүктелуде...',
    loadingError: 'Жүктеу қатесі',
    reload: 'Бетті жаңарту',
    noBookings: 'Әзірге брондауларыңыз жоқ',
    noBookingsDesc: 'Каталогтан артист іздеуден бастаңыз',
    goToCatalog: 'Каталогқа өту',
    all: 'Барлығы',
    contract: 'Келісімшарт',
    contact: 'Байланысу',
    cancel: 'Болдырмау',
    completeEvent: 'Іс-шараны аяқтау',
    leaveReview: 'Пікір қалдыру',
    cancelBookingTitle: 'Брондауды болдырмау керек пе?',
    cancelBookingDesc: 'Бұл әрекет брондауды болдырып, қаражатты шотыңызға қайтарады. Келісімшарт шарттарына байланысты комиссия ұсталуы мүмкін.',
    dontCancel: 'Болдырмау',
    yesCancel: 'Иә, болдыру',
    pending: 'Күтуде',
    confirmed: 'Расталды',
    inProgress: 'Үдерісте',
    disputed: 'Дау',
    awaitingPayment: '⏳ Төлем күтуде',
    paidStatus: '💳 Төленді',
    inEscrow: '🔒 Эскроуда',
    released: '✅ Төленді',
    refunded: '↩️ Қайтарылды'
  },
  
  ru: {
    artistBooking: 'Бронирование артиста',
    step: 'Шаг',
    of: 'из',
    eventType: 'Тип мероприятия *',
    selectType: 'Выберите тип',
    date: 'Дата *',
    duration: 'Длительность',
    selectDuration: 'Выберите',
    location: 'Место проведения *',
    locationPlaceholder: 'Город, адрес или название заведения',
    guestCount: 'Количество гостей',
    guestCountPlaceholder: 'Примерное количество',
    additionalNotes: 'Дополнительные пожелания',
    notesPlaceholder: 'Особые требования, репертуар, технические детали...',
    next: 'Далее',
    yourName: 'Ваше имя *',
    namePlaceholder: 'Как к вам обращаться',
    phone: 'Телефон *',
    email: 'Email *',
    howItWorks: 'Как это работает?',
    howItWorksDesc: 'После отправки заявки артист получит уведомление и свяжется с вами в течение 24 часов для уточнения деталей.',
    back: 'Назад',
    sendRequest: 'Отправить заявку',
    requestSent: 'Заявка отправлена!',
    receivedRequest: 'получил вашу заявку и скоро с вами свяжется',
    event: 'Мероприятие:',
    location2: 'Место:',
    close: 'Закрыть',
    wedding: 'Свадьба',
    corporate: 'Корпоратив',
    birthday: 'День рождения',
    festival: 'Фестиваль',
    concert: 'Концерт',
    restaurant: 'Ресторан',
    government: 'Государственное мероприятие',
    other: 'Другое',
    hour1: '1 час',
    hour2: '2 часа',
    hour3: '3 часа',
    hour3std: '3 часа (стандарт)',
    hour4: '4 часа',
    hour6: '6 часов',
    hour8: '8 часов',
    fullDay: 'Весь день',
    smartBooking: 'Умное бронирование',
    escrowSmartContract: 'Защита эскроу + Смарт-контракт',
    from: 'От',
    performances: 'выступлений',
    city: 'Город *',
    cityPlaceholder: 'Алматы, Астана...',
    startTime: 'Время начала',
    priceRecalc: 'Цена пересчитается автоматически',
    nextServices: 'Далее: Дополнительные услуги',
    additionalServices: 'Дополнительные услуги',
    additionalServicesDesc: 'Сохраните полный продакшн для вашего мероприятия',
    soundSystem: 'Профессиональная звуковая система',
    soundSystemDesc: 'Полный комплект звукового оборудования + звукорежиссёр',
    lightingEquipment: 'Световое оборудование',
    lightingEquipmentDesc: 'Профессиональный свет + светорежиссёр',
    videoProduction: 'Видеосъёмка',
    videoProductionDesc: '2 камеры, профессиональный монтаж',
    eventHost: 'Ведущий мероприятия',
    eventHostDesc: 'Опытный тамада/ведущий',
    aiRecommends: 'AI рекомендует',
    aiRecommendsFor: 'для',
    nextContact: 'Далее: Контактные данные',
    nextPayment: 'Далее: Оплата и контракт',
    priceBreakdown: 'Детализация стоимости',
    performance: 'Выступление артиста',
    platformServices: 'Услуги платформы (3%)',
    total: 'Итого',
    escrowProtection: 'Защита эскроу',
    escrowProtectionDesc: 'Деньги блокируются на защищённом счёте до выступления. Автоматическая выплата артисту после мероприятия.',
    understandEscrow: 'Я понимаю условия эскроу-депонирования',
    smartContract: 'Смарт-контракт',
    smartContractDesc: 'Автоматический договор с юридической силой',
    penaltyCancel: 'Штраф за срыв: 50% от суммы',
    forceMajeure: 'Форс-мажор: полный возврат',
    cancelWeek: 'Отмена за 7+ дней: возврат 90%',
    acceptContract: 'Я принимаю условия смарт-контракта и',
    publicOffer: 'Публичной оферты',
    pay: 'Оплатить',
    processing: 'Обработка...',
    bookingConfirmed: 'Бронирование подтверждено!',
    fundsLocked: 'Деньги заблокированы на эскроу-счёте. Контракт создан.',
    artist: 'Артист:',
    paid: 'Оплачено:',
    downloadContract: 'Скачать контракт (PDF)',
    myBookings: 'Мои бронирования',
    manageBookings: 'Управляйте вашими заказами и контрактами',
    totalBookings: 'Всего букингов',
    upcoming: 'Предстоящих',
    onEscrow: 'На эскроу',
    completed: 'Завершённых',
    authRequired: 'Требуется авторизация',
    authRequiredDesc: 'Войдите в систему, чтобы просмотреть ваши бронирования',
    login: 'Войти',
    loadingBookings: 'Загрузка бронирований...',
    loadingError: 'Ошибка загрузки',
    reload: 'Обновить страницу',
    noBookings: 'У вас пока нет бронирований',
    noBookingsDesc: 'Начните с поиска артистов в каталоге',
    goToCatalog: 'Перейти в каталог',
    all: 'Все',
    contract: 'Контракт',
    contact: 'Связаться',
    cancel: 'Отменить',
    completeEvent: 'Завершить мероприятие',
    leaveReview: 'Оставить отзыв',
    cancelBookingTitle: 'Отменить бронирование?',
    cancelBookingDesc: 'Это действие отменит бронирование и вернёт средства на ваш счёт. В зависимости от условий контракта, может быть удержана комиссия.',
    dontCancel: 'Не отменять',
    yesCancel: 'Да, отменить',
    pending: 'Ожидает',
    confirmed: 'Подтверждено',
    inProgress: 'В процессе',
    disputed: 'Спор',
    awaitingPayment: '⏳ Ожидает оплаты',
    paidStatus: '💳 Оплачено',
    inEscrow: '🔒 На эскроу',
    released: '✅ Выплачено',
    refunded: '↩️ Возвращено'
  },
  
  en: {
    artistBooking: 'Artist Booking',
    step: 'Step',
    of: 'of',
    eventType: 'Event Type *',
    selectType: 'Select type',
    date: 'Date *',
    duration: 'Duration',
    selectDuration: 'Select',
    location: 'Venue *',
    locationPlaceholder: 'City, address, or venue name',
    guestCount: 'Guest Count',
    guestCountPlaceholder: 'Approximate number',
    additionalNotes: 'Additional Notes',
    notesPlaceholder: 'Special requirements, repertoire, technical details...',
    next: 'Next',
    yourName: 'Your Name *',
    namePlaceholder: 'How to address you',
    phone: 'Phone *',
    email: 'Email *',
    howItWorks: 'How does it work?',
    howItWorksDesc: 'After submitting the request, the artist will receive a notification and contact you within 24 hours to clarify details.',
    back: 'Back',
    sendRequest: 'Send Request',
    requestSent: 'Request sent!',
    receivedRequest: 'received your request and will contact you soon',
    event: 'Event:',
    location2: 'Location:',
    close: 'Close',
    wedding: 'Wedding',
    corporate: 'Corporate',
    birthday: 'Birthday',
    festival: 'Festival',
    concert: 'Concert',
    restaurant: 'Restaurant',
    government: 'Government Event',
    other: 'Other',
    hour1: '1 hour',
    hour2: '2 hours',
    hour3: '3 hours',
    hour3std: '3 hours (standard)',
    hour4: '4 hours',
    hour6: '6 hours',
    hour8: '8 hours',
    fullDay: 'Full day',
    smartBooking: 'Smart Booking',
    escrowSmartContract: 'Escrow Protection + Smart Contract',
    from: 'From',
    performances: 'performances',
    city: 'City *',
    cityPlaceholder: 'Almaty, Astana...',
    startTime: 'Start Time',
    priceRecalc: 'Price will be recalculated automatically',
    nextServices: 'Next: Additional Services',
    additionalServices: 'Additional Services',
    additionalServicesDesc: 'Keep full production for your event',
    soundSystem: 'Professional Sound System',
    soundSystemDesc: 'Full audio equipment set + sound engineer',
    lightingEquipment: 'Lighting Equipment',
    lightingEquipmentDesc: 'Professional lighting + lighting engineer',
    videoProduction: 'Video Production',
    videoProductionDesc: '2 cameras, professional editing',
    eventHost: 'Event Host',
    eventHostDesc: 'Experienced MC/Host',
    aiRecommends: 'AI recommends',
    aiRecommendsFor: 'for',
    nextContact: 'Next: Contact Details',
    nextPayment: 'Next: Payment & Contract',
    priceBreakdown: 'Price Breakdown',
    performance: 'Artist Performance',
    platformServices: 'Platform Services (3%)',
    total: 'Total',
    escrowProtection: 'Escrow Protection',
    escrowProtectionDesc: 'Money is locked in a secure account until the performance. Automatic payment to the artist after the event.',
    understandEscrow: 'I understand the escrow terms',
    smartContract: 'Smart Contract',
    smartContractDesc: 'Automatic agreement with legal force',
    penaltyCancel: 'Cancellation penalty: 50% of amount',
    forceMajeure: 'Force majeure: full refund',
    cancelWeek: 'Cancel 7+ days prior: 90% refund',
    acceptContract: 'I accept the smart contract terms and',
    publicOffer: 'Public Offer',
    pay: 'Pay',
    processing: 'Processing...',
    bookingConfirmed: 'Booking Confirmed!',
    fundsLocked: 'Funds locked in escrow account. Contract created.',
    artist: 'Artist:',
    paid: 'Paid:',
    downloadContract: 'Download Contract (PDF)',
    myBookings: 'My Bookings',
    manageBookings: 'Manage your orders and contracts',
    totalBookings: 'Total Bookings',
    upcoming: 'Upcoming',
    onEscrow: 'In Escrow',
    completed: 'Completed',
    authRequired: 'Authorization required',
    authRequiredDesc: 'Log in to view your bookings',
    login: 'Log In',
    loadingBookings: 'Loading bookings...',
    loadingError: 'Loading error',
    reload: 'Reload page',
    noBookings: 'You have no bookings yet',
    noBookingsDesc: 'Start by searching for artists in the catalog',
    goToCatalog: 'Go to Catalog',
    all: 'All',
    contract: 'Contract',
    contact: 'Contact',
    cancel: 'Cancel',
    completeEvent: 'Complete Event',
    leaveReview: 'Leave Review',
    cancelBookingTitle: 'Cancel booking?',
    cancelBookingDesc: 'This action will cancel the booking and return funds to your account. Depending on contract terms, a commission may be withheld.',
    dontCancel: 'Don\'t Cancel',
    yesCancel: 'Yes, Cancel',
    pending: 'Pending',
    confirmed: 'Confirmed',
    inProgress: 'In Progress',
    disputed: 'Disputed',
    awaitingPayment: '⏳ Awaiting Payment',
    paidStatus: '💳 Paid',
    inEscrow: '🔒 In Escrow',
    released: '✅ Released',
    refunded: '↩️ Refunded'
  }
};

// Helper function to get booking texts
export function useBookingTexts(language: Language) {
  return bookingTexts[language];
}
