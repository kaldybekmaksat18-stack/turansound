export type Language = 'kk' | 'ru' | 'en';

export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    search: string;
    filter: string;
    clear: string;
    apply: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    confirm: string;
    viewProfile: string;
    book: string;
    contact: string;
    from: string;
    to: string;
    price: string;
    date: string;
    time: string;
    welcomeBack: string;
    invalidCredentials: string;
    checkEmail: string;
    success: string;
  };

  // Header & Navigation
  header: {
    platformName: string;
    platformSubtitle: string;
    home: string;
    catalog: string;
    production: string;
    aiAssistant: string;
    reputation: string;
    about: string;
    login: string;
    register: string;
    logout: string;
    notifications: string;
    bookings: string;
    support: string;
    profile: string;
    dashboard: string;
    financial: string;
    contracts: string;
    verification: string;
    settings: string;
    artist: string;
    customer: string;
  };

  // Home Page
  home: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    browseArtists: string;
    registerAsArtist: string;
    tryAI: string;
    topArtists: string;
    viewAllArtists: string;
    categories: string;
    howItWorks: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    whyChooseUs: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    artistCount: string;
    searchPlaceholder: string;
    findArtist: string;
    demoVersion: string;
    demoHint: string;
    stats: {
      artists: string;
      artistsLabel: string;
      countries: string;
      countriesLabel: string;
      revenue: string;
      revenueLabel: string;
    };
    features: {
      contracts: {
        title: string;
        description: string;
      };
      rating: {
        title: string;
        description: string;
      };
      export: {
        title: string;
        description: string;
      };
    };
  };

  // Catalog
  catalog: {
    title: string;
    subtitle: string;
    filters: string;
    searchPlaceholder: string;
    priceRange: string;
    location: string;
    genre: string;
    language: string;
    experience: string;
    rating: string;
    verified: string;
    clearFilters: string;
    applyFilters: string;
    artistsFound: string;
    noArtistsFound: string;
    sortBy: string;
    sortRating: string;
    sortPriceLow: string;
    sortPriceHigh: string;
    sortPopular: string;
    viewMore: string;
    hideDetails: string;
    // Filter-specific
    section: string;
    all: string;
    roles: string;
    genres: string;
    nationalStyles: string;
    eventFormats: string;
    region: string;
    allRegions: string;
    priceThousands: string;
    thousands: string;
    minRating: string;
    activeFilters: string;
    searchLabel: string;
    sectionLabel: string;
    regionLabel: string;
    ratingLabel: string;
    priceLabel: string;
    reset: string;
    artistNamePlaceholder: string;
    // Quick search
    quickSearchPlaceholder: string;
    popular: string;
  };

  // Artist Profile
  artist: {
    about: string;
    portfolio: string;
    reviews: string;
    availability: string;
    pricing: string;
    experience: string;
    languages: string;
    genres: string;
    verified: string;
    notVerified: string;
    rating: string;
    reviews_count: string;
    bookNow: string;
    contactArtist: string;
    shareProfile: string;
    reportProfile: string;
  };

  // Booking
  booking: {
    title: string;
    selectDate: string;
    selectTime: string;
    eventType: string;
    eventLocation: string;
    eventDetails: string;
    duration: string;
    totalPrice: string;
    deposit: string;
    bookingFee: string;
    finalAmount: string;
    confirmBooking: string;
    cancelBooking: string;
    bookingSuccess: string;
    bookingError: string;
    myBookings: string;
    upcoming: string;
    past: string;
    cancelled: string;
    status: {
      pending: string;
      confirmed: string;
      completed: string;
      cancelled: string;
    };
  };

  // Footer
  footer: {
    benefits: {
      secureDeals: string;
      escrow: string;
      transparency: string;
      digitalContracts: string;
      artistsCount: string;
      verifiedProfiles: string;
      aiMatching: string;
      smartSearch: string;
    };
    about: {
      description: string;
    };
    forArtists: {
      title: string;
      register: string;
      dashboard: string;
      verification: string;
      financial: string;
      reputation: string;
      adminPanel: string;
    };
    forCustomers: {
      title: string;
      catalog: string;
      aiAssistant: string;
      bookings: string;
      legalDocs: string;
      support: string;
    };
    contacts: {
      title: string;
      address: string;
    };
    bottom: {
      rights: string;
      about: string;
      terms: string;
      privacy: string;
      regions: string;
    };
  };

  // Languages
  languages: {
    kazakh: string;
    russian: string;
    english: string;
  };

  // Roles
  roles: {
    singer: string;
    musician: string;
    dj: string;
    mc: string;
    dancer: string;
    band: string;
    orchestra: string;
    host: string;
    showman: string;
  };

  // Genres
  genres: {
    pop: string;
    rock: string;
    jazz: string;
    classical: string;
    electronic: string;
    folk: string;
    traditional: string;
    world: string;
    hiphop: string;
    rnb: string;
    country: string;
    blues: string;
  };

  // Auth
  auth: {
    login: {
      title: string;
      subtitle: string;
      welcome: string;
      description: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      forgotPassword: string;
      rememberMe: string;
      loginButton: string;
      orLoginWith: string;
      noAccount: string;
      signUp: string;
      demoHint: string;
      fillAsArtist: string;
      fillAsCustomer: string;
      feature1Title: string;
      feature1Desc: string;
      feature2Title: string;
      feature2Desc: string;
      feature3Title: string;
      feature3Desc: string;
    };
    register: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      confirmPasswordLabel: string;
      confirmPasswordPlaceholder: string;
      roleLabel: string;
      artistRole: string;
      customerRole: string;
      artistDesc: string;
      customerDesc: string;
      termsAccept: string;
      termsLink: string;
      privacyLink: string;
      registerButton: string;
      haveAccount: string;
      signIn: string;
      orRegisterWith: string;
      passwordMismatch: string;
      registrationSuccess: string;
      userExists: string;
    };
  };

  // Artist Card
  artistCard: {
    verified: string;
    reviewsCount: string;
    bookingsCount: string;
  };

  // Regions
  regions: {
    almaty: string;
    astana: string;
    shymkent: string;
    karaganda: string;
    aktobe: string;
    tashkent: string;
    bishkek: string;
    istanbul: string;
    moscow: string;
    beijing: string;
  };
}

export const translations: Record<Language, Translations> = {
  kk: {
    common: {
      loading: 'Жүктелуде...',
      error: 'Қате',
      save: 'Сақтау',
      cancel: 'Болдырмау',
      delete: 'Жою',
      edit: 'Өңдеу',
      search: 'Іздеу',
      filter: 'Сүзгі',
      clear: 'Тазалау',
      apply: 'Қолдану',
      close: 'Жабу',
      back: 'Артқа',
      next: 'Келесі',
      previous: 'Алдыңғы',
      submit: 'Жіберу',
      confirm: 'Растау',
      viewProfile: 'Профильді көру',
      book: 'Брондау',
      contact: 'Байланысу',
      from: 'бастап',
      to: 'дейін',
      price: 'Баға',
      date: 'Күн',
      time: 'Уақыт',
      welcomeBack: 'Қайтып келдіңізді табақан!',
      invalidCredentials: 'Логин немесе пароль туындамас',
      checkEmail: 'Электрондық поштаңызды тексеріңіз',
      success: 'Сәтті!',
    },
    header: {
      platformName: 'TuranSound',
      platformSubtitle: 'Орталық Азия артистер платформасы',
      home: 'Басты бет',
      catalog: 'Каталог',
      production: '🎬 Продакшн',
      aiAssistant: 'AI-Көмекші',
      reputation: 'Беделділік',
      about: 'Платформа туралы',
      login: 'Кіру',
      register: 'Тіркелу',
      logout: 'Шығу',
      notifications: 'Хабарламалар',
      bookings: 'Брондаулар',
      support: 'Қолдау',
      profile: 'Профиль',
      dashboard: 'Басқару панелі',
      financial: 'Қаржы',
      contracts: 'Келісімшарттар',
      verification: 'Верификация',
      settings: 'Баптаулар',
      artist: '🎵 Артист',
      customer: '👤 Тапсырыс беруші',
    },
    home: {
      heroTitle: 'Орталық Азияның музыкалық платформасы',
      heroSubtitle: 'TuranSound',
      heroDescription: 'Қазақстан, Өзбекстан, Қырғызстан және Түркиядағы 180+ растлаған артистпен қауіпсіз келісімшарттар жасаңыз. AI көмегімен өз іс-шараңызға тамаша орындаушыны табыңыз.',
      browseArtists: 'Артистерді көру',
      registerAsArtist: 'Артист ретінде тіркелу',
      tryAI: 'AI-Көмекшіні сынау',
      topArtists: 'Үздік артистер',
      viewAllArtists: 'Барлық артистерді көру',
      categories: 'Санаттар',
      howItWorks: 'Қалай жұмыс істейді?',
      step1Title: 'Артистті табыңыз',
      step1Desc: 'Каталогты шолыңыз немесе AI-көмекшісін пайдаланыңыз',
      step2Title: 'Брондаңыз',
      step2Desc: 'Қауіпсіз эскроу-шот арқылы төлем жасаңыз',
      step3Title: 'Растаңыз',
      step3Desc: 'Цифрлық келісімшарт алыңыз',
      step4Title: 'Ләззат алыңыз',
      step4Desc: 'Іс-шараңыздан ләззат алыңыз және пікір қалдырыңыз',
      whyChooseUs: 'Неліктен бізді таңдау керек?',
      feature1Title: 'Қауіпсіз мәмілелер',
      feature1Desc: 'Эскроу-шоттар арқылы қорғалған төлемдер',
      feature2Title: 'Растаған артистер',
      feature2Desc: '180+ тексерілген кәсіпқойлар',
      feature3Title: 'AI-Іріктеу',
      feature3Desc: 'Ақылды іздеу жүйесі',
      feature4Title: 'Цифрлық келісімшарттар',
      feature4Desc: 'Мөлдір және заңды',
      artistCount: '180+ артист',
      searchPlaceholder: 'Артист атын іздеу...',
      findArtist: 'Артист табу',
      demoVersion: 'Демо версиясы',
      demoHint: 'Барлық функцияларды қолдану үшін тіркеліңіз',
      stats: {
        artists: '180+',
        artistsLabel: 'артист',
        countries: '4',
        countriesLabel: 'өлкес',
        revenue: '1000000+',
        revenueLabel: 'тенге',
      },
      features: {
        contracts: {
          title: 'Цифрлық келісімшарттар',
          description: 'Мөлдір және заңды',
        },
        rating: {
          title: 'Рейтинг',
          description: 'Артистердің рейтингі',
        },
        export: {
          title: 'Экспорт',
          description: 'Мағлumatтарды экспорттау',
        },
      },
    },
    catalog: {
      title: 'Артистер каталогы',
      subtitle: 'Өз іс-шараңызға тамаша орындаушыны табыңыз',
      filters: 'Сүзгілер',
      searchPlaceholder: 'Артист атын іздеу...',
      priceRange: 'Баға диапазоны',
      location: 'Қала',
      genre: 'Жанр',
      language: 'Тіл',
      experience: 'Тәжірибе',
      rating: 'Рейтинг',
      verified: 'Расталған',
      clearFilters: 'Сүзгілерді тазалау',
      applyFilters: 'Қолдану',
      artistsFound: 'артист табылды',
      noArtistsFound: 'Артистер табылмады',
      sortBy: 'Сұрыптау:',
      sortRating: 'Рейтинг бойынша',
      sortPriceLow: 'Арзан',
      sortPriceHigh: 'Қымбат',
      sortPopular: 'Танымал',
      viewMore: 'Толығырақ',
      hideDetails: 'Жасыру',
      // Filter-specific
      section: 'Бөлім',
      all: 'Барлығы',
      roles: 'Рөлдер',
      genres: 'Жанрлар',
      nationalStyles: 'Мамлекеттік стилдер',
      eventFormats: 'Оқиға форматтары',
      region: 'Регион',
      allRegions: 'Барлық региондар',
      priceThousands: 'Баға (мің)',
      thousands: 'мің',
      minRating: 'Мінімалды рейтинг',
      activeFilters: 'Қолданылған сүзгілер',
      searchLabel: 'Іздеу',
      sectionLabel: 'Бөлім',
      regionLabel: 'Регион',
      ratingLabel: 'Рейтинг',
      priceLabel: 'Баға',
      reset: 'Тазалау',
      artistNamePlaceholder: 'Артист атын енгізіңіз...',
      // Quick search
      quickSearchPlaceholder: 'Қыска іздеу...',
      popular: 'Танымал',
    },
    artist: {
      about: 'Туралы',
      portfolio: 'Портфолио',
      reviews: 'Пікірлер',
      availability: 'Қолжетімділік',
      pricing: 'Бағалар',
      experience: 'Тәжірибе',
      languages: 'Тілдер',
      genres: 'Жанрлар',
      verified: 'Расталған',
      notVerified: 'Расталмаған',
      rating: 'Рейтинг',
      reviews_count: 'пікір',
      bookNow: 'Қазір брондау',
      contactArtist: 'Артистпен байланысу',
      shareProfile: 'Бөлісу',
      reportProfile: 'Шағымдану',
    },
    booking: {
      title: 'Брондау',
      selectDate: 'Күнді таңдаңыз',
      selectTime: 'Уақытты таңдаңыз',
      eventType: 'Іс-шара түрі',
      eventLocation: 'Орын',
      eventDetails: 'Толық ақпарат',
      duration: 'Ұзақтығы',
      totalPrice: 'Жалпы бағасы',
      deposit: 'Депозит',
      bookingFee: 'Қызмет ақысы',
      finalAmount: 'Қорытынды сома',
      confirmBooking: 'Брондауды растау',
      cancelBooking: 'Болдырмау',
      bookingSuccess: 'Брондау сәтті!',
      bookingError: 'Қате орын алды',
      myBookings: 'Менің брондауларым',
      upcoming: 'Алдағы',
      past: 'Өткен',
      cancelled: 'Болдырылған',
      status: {
        pending: 'Күтуде',
        confirmed: 'Расталды',
        completed: 'Аяқталды',
        cancelled: 'Болдырылды',
      },
    },
    footer: {
      benefits: {
        secureDeals: 'Қауіпсіз мәмілелер',
        escrow: 'Эскроу-шоттар',
        transparency: 'Ашықтық',
        digitalContracts: 'Цифрлық келісімшарттар',
        artistsCount: '180+ артист',
        verifiedProfiles: 'Расталған профилдер',
        aiMatching: 'AI-іріктеу',
        smartSearch: 'Ақылды іздеу',
      },
      about: {
        description: 'Орталық Азия музыкалық нарығы үшін цифрлық платформа. Артистер мен тапсырыс берушілерді біртұтас экожүйеде біріктіреміз.',
      },
      forArtists: {
        title: 'Артисте��ге',
        register: 'Артист тіркелуі',
        dashboard: 'Жеке кабинет',
        verification: 'Профильді растау',
        financial: 'Қаржылық профиль',
        reputation: 'Беделділік жүйесі',
        adminPanel: '🔧 Админ панелі (Dev)',
      },
      forCustomers: {
        title: 'Тапсырыс берушілерге',
        catalog: 'Артистер каталогы',
        aiAssistant: 'AI-Көмекші',
        bookings: 'Менің брондауларым',
        legalDocs: 'Құқықтық құжаттар',
        support: 'Қолдау және дау-дамайлар',
      },
      contacts: {
        title: 'Контакты',
        address: 'Алматы, Казахстан\nпр. Абая, 150',
      },
      bottom: {
        rights: 'Барлық құқықтар қорғалған.',
        about: 'Платформа туралы',
        terms: 'Пайдалану шарттары',
        privacy: 'Құпиялылық саясаты',
        regions: 'Жұмыс істейміз: Алматы • Астана • Шымкент • Қарағанды • Ташкент • Бішкек • Стамбул',
      },
    },
    languages: {
      kazakh: 'Қазақша',
      russian: 'Русский',
      english: 'English',
    },
    roles: {
      singer: 'Әнші',
      musician: 'Музыкант',
      dj: 'DJ',
      mc: 'Тамада',
      dancer: 'Би қойушы',
      band: 'Топ',
      orchestra: 'Оркестр',
      host: 'Жүргізуші',
      showman: 'Шоумен',
    },
    genres: {
      pop: 'Поп',
      rock: 'Рок',
      jazz: 'Джаз',
      classical: 'Классикалық',
      electronic: 'Электронды',
      folk: 'Халық',
      traditional: 'Дәстүрлі',
      world: 'Әлем музыкасы',
      hiphop: 'Хип-хоп',
      rnb: 'R&B',
      country: 'Кантри',
      blues: 'Блюз',
    },
    auth: {
      login: {
        title: 'Кіру',
        subtitle: 'Тіркелген сіз болсаңыз',
        welcome: 'Қош келдіңізді!',
        description: 'Тіркелген сіз болсаңыз, төмендегі ақпаратты толтырыңыз.',
        emailLabel: 'Электрондық поштаңызды енгізіңіз',
        emailPlaceholder: 'example@example.com',
        passwordLabel: 'Құпия сөздіңізді енгізіңіз',
        passwordPlaceholder: 'Құпия сөз',
        forgotPassword: 'Құпия сөздіңізді ұмыттыңыз?',
        rememberMe: 'Мені ескеру',
        loginButton: 'Кіру',
        orLoginWith: 'Кіру үшін басқа түрлер',
        noAccount: 'Тіркелген сіз болмасаңыз',
        signUp: 'Тіркелу',
        demoHint: 'Демо версиясын қолдану үшін тіркеліңіз',
        fillAsArtist: 'Артист ретінде толтыру',
        fillAsCustomer: 'Тапсырыс беруші ретінде толтыру',
        feature1Title: 'Қауіпсіз мәмілелер',
        feature1Desc: 'Эскроу-шоттар арқылы қорғалған төлемдер',
        feature2Title: 'Растаған артистер',
        feature2Desc: '180+ тексерілген кәсіпқойлар',
        feature3Title: 'AI-Іріктеу',
        feature3Desc: 'Ақылды іздеу жүйесі',
      },
      register: {
        title: 'Тіркелу',
        subtitle: 'Жаңа сіз болсаңыз',
        nameLabel: 'Атыңызды енгізіңіз',
        namePlaceholder: 'Атыңыз',
        emailLabel: 'Электрондық поштаңызды енгізіңіз',
        emailPlaceholder: 'example@example.com',
        passwordLabel: 'Құпия сөздіңізді енгізіңіз',
        passwordPlaceholder: 'Құпия сөз',
        confirmPasswordLabel: 'Құпия сөзді тастықтаңыз',
        confirmPasswordPlaceholder: 'Құпия сөз',
        roleLabel: 'Рөлді таңдаңыз',
        artistRole: 'Артист',
        customerRole: 'Тапсырыс беруші',
        artistDesc: 'Музыкалық артист болу',
        customerDesc: 'Музыкалық артистерге тапсырыс беру',
        termsAccept: 'Мен пайдалану шарттарын талдаған және келісімді растамын',
        termsLink: 'пайдалану шарттарын',
        privacyLink: 'құпиялылық саясатын',
        registerButton: 'Тіркелу',
        haveAccount: 'Тіркелген сіз болсаңыз',
        signIn: 'Кіру',
        orRegisterWith: 'Тіркелу үшін басқа түрлер',
        passwordMismatch: 'Құпия сөздер сәйкес емес',
        registrationSuccess: 'Тіркелу сәтті!',
        userExists: 'Бұл электрондық пошта тіркелген',
      },
    },
    artistCard: {
      verified: 'Расталған',
      reviewsCount: 'пікірлер саны',
      bookingsCount: 'брондаулар саны',
    },
    regions: {
      almaty: 'Алматы',
      astana: 'Астана',
      shymkent: 'Шымкент',
      karaganda: 'Карағанды',
      aktobe: 'Актобе',
      tashkent: 'Ташкент',
      bishkek: 'Бішкек',
      istanbul: 'Стамбул',
      moscow: 'Москва',
      beijing: 'Бейжінг',
    },
  },

  ru: {
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      search: 'Поиск',
      filter: 'Фильтр',
      clear: 'Очистить',
      apply: 'Применить',
      close: 'Закрыть',
      back: 'Назад',
      next: 'Далее',
      previous: 'Предыдущий',
      submit: 'Отправить',
      confirm: 'Подтвердить',
      viewProfile: 'Смотреть профиль',
      book: 'Забронировать',
      contact: 'Связаться',
      from: 'от',
      to: 'до',
      price: 'Цена',
      date: 'Дата',
      time: 'Время',
      welcomeBack: 'Добро пожаловать обратно!',
      invalidCredentials: 'Неверный логин или пароль',
      checkEmail: 'Проверьте свой электронный адрес',
      success: 'Успешно!',
    },
    header: {
      platformName: 'TuranSound',
      platformSubtitle: 'Платформа артистов ЦА',
      home: 'Главная',
      catalog: 'Каталог',
      production: '🎬 Продакшн',
      aiAssistant: 'AI-Помощник',
      reputation: 'Репутация',
      about: 'О платформе',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      notifications: 'Уведомления',
      bookings: 'Бронирования',
      support: 'Поддержка',
      profile: 'Профиль',
      dashboard: 'Дашборд',
      financial: 'Финансы',
      contracts: 'Контракты',
      verification: 'Верификация',
      settings: 'Настройки',
      artist: '🎵 Артист',
      customer: '👤 Заказчик',
    },
    home: {
      heroTitle: 'Музыкальная платформа Центральной Азии',
      heroSubtitle: 'TuranSound',
      heroDescription: 'Безопасные сделки с 180+ верифицированными артистами из Казахстана, Узбекистана, Кыргызстана и Турции. Найдите идеального исполнителя для вашего события с помощью AI.',
      browseArtists: 'Смотреть артистов',
      registerAsArtist: 'Зарегистрироваться как артист',
      tryAI: 'Попробовать AI-Помощника',
      topArtists: 'Топ артистов',
      viewAllArtists: 'Все артисты',
      categories: 'Категории',
      howItWorks: 'Как это работает?',
      step1Title: 'Найдите артиста',
      step1Desc: 'Просмотрите каталог или используйте AI-помощника',
      step2Title: 'Забронируйте',
      step2Desc: 'Оплатите через защищённый эскроу-счёт',
      step3Title: 'Подтвердите',
      step3Desc: 'Получите цифровой контракт',
      step4Title: 'Наслаждайтесь',
      step4Desc: 'Наслаждайтесь событием и оставьте отзыв',
      whyChooseUs: 'Почему выбирают нас?',
      feature1Title: 'Безопасные сделки',
      feature1Desc: 'Защищённые платежи через эскроу-счета',
      feature2Title: 'Проверенные артисты',
      feature2Desc: '180+ верифицированных профессионалов',
      feature3Title: 'AI-Подбор',
      feature3Desc: 'Умная система поиска',
      feature4Title: 'Цифровые контракты',
      feature4Desc: 'Прозрачно и законно',
      artistCount: '180+ артистов',
      searchPlaceholder: 'Поиск по имени артис��а...',
      findArtist: 'Найти артиста',
      demoVersion: 'Демо версия',
      demoHint: 'Зарегистрируйтесь, чтобы использовать все функции',
      stats: {
        artists: '180+',
        artistsLabel: 'артистов',
        countries: '4',
        countriesLabel: 'страны',
        revenue: '1000000+',
        revenueLabel: 'тенге',
      },
      features: {
        contracts: {
          title: 'Цифровые контракты',
          description: 'Прозрачно и законно',
        },
        rating: {
          title: 'Рейтинг',
          description: 'Рейтинг артистов',
        },
        export: {
          title: 'Экспорт',
          description: 'Экспорт данных',
        },
      },
    },
    catalog: {
      title: 'Каталог артистов',
      subtitle: 'Найдите идеального исполнителя для вашего события',
      filters: 'Фильтры',
      searchPlaceholder: 'Поиск по имени артиста...',
      priceRange: 'Диапазон цен',
      location: 'Город',
      genre: 'Жанр',
      language: 'Язык',
      experience: 'Опыт',
      rating: 'Рейтинг',
      verified: 'Верифицирован',
      clearFilters: 'Очистить фильтры',
      applyFilters: 'Применить',
      artistsFound: 'артистов найдено',
      noArtistsFound: 'Артисты не найдены',
      sortBy: 'Сортировка:',
      sortRating: 'По рейтингу',
      sortPriceLow: 'Дешевле',
      sortPriceHigh: 'Дороже',
      sortPopular: 'Популярные',
      viewMore: 'Подробнее',
      hideDetails: 'Скрыть',
      // Filter-specific
      section: 'Раздел',
      all: 'Все',
      roles: 'Роли',
      genres: 'Жанры',
      nationalStyles: 'Национальные стили',
      eventFormats: 'Форматы событий',
      region: 'Регион',
      allRegions: 'Все регионы',
      priceThousands: 'Цена (тыс.)',
      thousands: 'тыс.',
      minRating: 'Минимальный рейтинг',
      activeFilters: 'Активные фильтры',
      searchLabel: 'Поиск',
      sectionLabel: 'Раздел',
      regionLabel: 'Регион',
      ratingLabel: 'Рейтинг',
      priceLabel: 'Цена',
      reset: 'Сбросить',
      artistNamePlaceholder: 'Введите имя артиста...',
      // Quick search
      quickSearchPlaceholder: 'Быстрый поиск...',
      popular: 'Популярные',
    },
    artist: {
      about: 'О себе',
      portfolio: 'Портфолио',
      reviews: 'Отзывы',
      availability: 'Доступность',
      pricing: 'Цены',
      experience: 'Опыт',
      languages: 'Языки',
      genres: 'Жанры',
      verified: 'Верифицирован',
      notVerified: 'Не верифицирован',
      rating: 'Рейтинг',
      reviews_count: 'отзывов',
      bookNow: 'Забронировать',
      contactArtist: 'Связаться с артистом',
      shareProfile: 'Поделиться',
      reportProfile: 'Пожаловаться',
    },
    booking: {
      title: 'Бронирование',
      selectDate: 'Выберите дату',
      selectTime: 'Выберите время',
      eventType: 'Тип события',
      eventLocation: 'Место проведения',
      eventDetails: 'Детали события',
      duration: 'Продолжительность',
      totalPrice: 'Общая стоимость',
      deposit: 'Депозит',
      bookingFee: 'Комиссия',
      finalAmount: 'Итоговая сумма',
      confirmBooking: 'Подтвердить бронирование',
      cancelBooking: 'Отменить',
      bookingSuccess: 'Успешно забронировано!',
      bookingError: 'Произошла ошибка',
      myBookings: 'Мои бронирования',
      upcoming: 'Предстоящие',
      past: 'Прошедшие',
      cancelled: 'Отменённые',
      status: {
        pending: 'Ожидание',
        confirmed: 'Подтверждено',
        completed: 'Завершено',
        cancelled: 'Отменено',
      },
    },
    footer: {
      benefits: {
        secureDeals: 'Безопасные сделки',
        escrow: 'Эскроу-счета',
        transparency: 'Прозрачность',
        digitalContracts: 'Цифровые контракты',
        artistsCount: '180+ артистов',
        verifiedProfiles: 'Верифицированные профили',
        aiMatching: 'AI-подбор',
        smartSearch: 'Умный поиск',
      },
      about: {
        description: 'Цифровая платформа для музыкального рынка Центральной Азии. Объединяем артистов и заказчиков в единой экосистеме.',
      },
      forArtists: {
        title: 'Для артистов',
        register: 'Регистрация артиста',
        dashboard: 'Личный кабинет',
        verification: 'Верификация профиля',
        financial: 'Финансовый профиль',
        reputation: 'Репутационная система',
        adminPanel: '🔧 Админ-панель (Dev)',
      },
      forCustomers: {
        title: 'Для заказчиков',
        catalog: 'Каталог артистов',
        aiAssistant: 'AI-ассистент',
        bookings: 'Мои бронирования',
        legalDocs: 'Юридические документы',
        support: 'Поддержка и споры',
      },
      contacts: {
        title: 'Контакты',
        address: 'Алматы, Казахстан\nпр. Абая, 150',
      },
      bottom: {
        rights: 'Все права защищены.',
        about: 'О платформе',
        terms: 'Условия использования',
        privacy: 'Политика конфиденциальности',
        regions: 'Работаем в: Алматы • Астана • Шымкент • Караганда • Ташкент • Бишкек • Стамбул',
      },
    },
    languages: {
      kazakh: 'Қазақша',
      russian: 'Русский',
      english: 'English',
    },
    roles: {
      singer: 'Певец/певица',
      musician: 'Музыкант',
      dj: 'DJ',
      mc: 'Тамада',
      dancer: 'Танцор',
      band: 'Группа',
      orchestra: 'Оркестр',
      host: 'Ведущий',
      showman: 'Шоумен',
    },
    genres: {
      pop: 'Поп',
      rock: 'Рок',
      jazz: 'Джаз',
      classical: 'Классика',
      electronic: 'Электронная',
      folk: 'Фолк',
      traditional: 'Традиционная',
      world: 'Мировая',
      hiphop: 'Хип-хоп',
      rnb: 'R&B',
      country: 'Кантри',
      blues: 'Блюз',
    },
    auth: {
      login: {
        title: 'Вход',
        subtitle: 'Если вы уже зарегистрированы',
        welcome: 'Добро пожаловать!',
        description: 'Если вы уже зарегистрированы, заполните нижеуказанные поля.',
        emailLabel: 'Введите ваш адрес электронной почты',
        emailPlaceholder: 'example@example.com',
        passwordLabel: 'Введите ваш пароль',
        passwordPlaceholder: 'Пароль',
        forgotPassword: 'Забыли пароль?',
        rememberMe: 'Запомнить меня',
        loginButton: 'Войти',
        orLoginWith: 'Войти с помощью',
        noAccount: 'Если вы еще не зарегистрированы',
        signUp: 'Зарегистрироваться',
        demoHint: 'Зарегистрируйтесь, чтоб�� использовать демоверсию',
        fillAsArtist: 'Заполнить как артист',
        fillAsCustomer: 'Заполнить как заказчик',
        feature1Title: 'Безопасные сделки',
        feature1Desc: 'Защищенные платежи через эскроу-счета',
        feature2Title: 'Проверенные артисты',
        feature2Desc: '180+ проверенных профессионалов',
        feature3Title: 'AI-Подбор',
        feature3Desc: 'Умная система поиска',
      },
      register: {
        title: 'Регистрация',
        subtitle: 'Если вы новый пользователь',
        nameLabel: 'Введите ваше имя',
        namePlaceholder: 'Ваше имя',
        emailLabel: 'Введите ваш адрес электронной почты',
        emailPlaceholder: 'example@example.com',
        passwordLabel: 'Введите ваш пароль',
        passwordPlaceholder: 'Пароль',
        confirmPasswordLabel: 'Подтвердите пароль',
        confirmPasswordPlaceholder: 'Пароль',
        roleLabel: 'Выберите роль',
        artistRole: 'Артист',
        customerRole: 'Заказчик',
        artistDesc: 'Стать музыкальным артистом',
        customerDesc: 'Заказывать музыкальных артистов',
        termsAccept: 'Я ознакомлен с условиями использования и принимаю соглашение',
        termsLink: 'условия использования',
        privacyLink: 'политику конфиденциальности',
        registerButton: 'Зарегистрироваться',
        haveAccount: 'Если вы уже зарегистрированы',
        signIn: 'Войти',
        orRegisterWith: 'Регистрация с помощью',
        passwordMismatch: 'Пароли не совпадают',
        registrationSuccess: 'Регистрация успешна!',
        userExists: 'Пользователь с таким электронным адресом уже существует',
      },
    },
    artistCard: {
      verified: 'Верифицирован',
      reviewsCount: 'количество отзывов',
      bookingsCount: 'количество бронирований',
    },
    regions: {
      almaty: 'Алматы',
      astana: 'Астана',
      shymkent: 'Шымкент',
      karaganda: 'Карағанды',
      aktobe: 'Актобе',
      tashkent: 'Ташкент',
      bishkek: 'Бишкек',
      istanbul: 'Стамбул',
      moscow: 'Москва',
      beijing: 'Бейжінг',
    },
  },

  en: {
    common: {
      loading: 'Loading...',
      error: 'Error',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      apply: 'Apply',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      confirm: 'Confirm',
      viewProfile: 'View Profile',
      book: 'Book',
      contact: 'Contact',
      from: 'from',
      to: 'to',
      price: 'Price',
      date: 'Date',
      time: 'Time',
      welcomeBack: 'Welcome back!',
      invalidCredentials: 'Invalid login or password',
      checkEmail: 'Check your email',
      success: 'Success!',
    },
    header: {
      platformName: 'TuranSound',
      platformSubtitle: 'Central Asian Artists Platform',
      home: 'Home',
      catalog: 'Catalog',
      production: '🎬 Production',
      aiAssistant: 'AI Assistant',
      reputation: 'Reputation',
      about: 'About',
      login: 'Log In',
      register: 'Sign Up',
      logout: 'Log Out',
      notifications: 'Notifications',
      bookings: 'Bookings',
      support: 'Support',
      profile: 'Profile',
      dashboard: 'Dashboard',
      financial: 'Financial',
      contracts: 'Contracts',
      verification: 'Verification',
      settings: 'Settings',
      artist: '🎵 Artist',
      customer: '👤 Customer',
    },
    home: {
      heroTitle: 'Central Asian Music Platform',
      heroSubtitle: 'TuranSound',
      heroDescription: 'Secure deals with 180+ verified artists from Kazakhstan, Uzbekistan, Kyrgyzstan, and Turkey. Find the perfect performer for your event with AI assistance.',
      browseArtists: 'Browse Artists',
      registerAsArtist: 'Register as Artist',
      tryAI: 'Try AI Assistant',
      topArtists: 'Top Artists',
      viewAllArtists: 'View All Artists',
      categories: 'Categories',
      howItWorks: 'How It Works?',
      step1Title: 'Find an Artist',
      step1Desc: 'Browse catalog or use AI assistant',
      step2Title: 'Book',
      step2Desc: 'Pay through secure escrow account',
      step3Title: 'Confirm',
      step3Desc: 'Get digital contract',
      step4Title: 'Enjoy',
      step4Desc: 'Enjoy your event and leave a review',
      whyChooseUs: 'Why Choose Us?',
      feature1Title: 'Secure Transactions',
      feature1Desc: 'Protected payments via escrow accounts',
      feature2Title: 'Verified Artists',
      feature2Desc: '180+ verified professionals',
      feature3Title: 'AI Matching',
      feature3Desc: 'Smart search system',
      feature4Title: 'Digital Contracts',
      feature4Desc: 'Transparent and legal',
      artistCount: '180+ artists',
      searchPlaceholder: 'Search by artist name...',
      findArtist: 'Find Artist',
      demoVersion: 'Demo Version',
      demoHint: 'Sign up to use all features',
      stats: {
        artists: '180+',
        artistsLabel: 'artists',
        countries: '4',
        countriesLabel: 'countries',
        revenue: '1000000+',
        revenueLabel: 'tenge',
      },
      features: {
        contracts: {
          title: 'Digital Contracts',
          description: 'Transparent and legal',
        },
        rating: {
          title: 'Rating',
          description: 'Artist ratings',
        },
        export: {
          title: 'Export',
          description: 'Export data',
        },
      },
    },
    catalog: {
      title: 'Artist Catalog',
      subtitle: 'Find the perfect performer for your event',
      filters: 'Filters',
      searchPlaceholder: 'Search by artist name...',
      priceRange: 'Price Range',
      location: 'City',
      genre: 'Genre',
      language: 'Language',
      experience: 'Experience',
      rating: 'Rating',
      verified: 'Verified',
      clearFilters: 'Clear Filters',
      applyFilters: 'Apply',
      artistsFound: 'artists found',
      noArtistsFound: 'No artists found',
      sortBy: 'Sort by:',
      sortRating: 'Rating',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortPopular: 'Popular',
      viewMore: 'View More',
      hideDetails: 'Hide',
      // Filter-specific
      section: 'Section',
      all: 'All',
      roles: 'Roles',
      genres: 'Genres',
      nationalStyles: 'National Styles',
      eventFormats: 'Event Formats',
      region: 'Region',
      allRegions: 'All Regions',
      priceThousands: 'Price (thousands)',
      thousands: 'thousands',
      minRating: 'Minimum Rating',
      activeFilters: 'Active Filters',
      searchLabel: 'Search',
      sectionLabel: 'Section',
      regionLabel: 'Region',
      ratingLabel: 'Rating',
      priceLabel: 'Price',
      reset: 'Reset',
      artistNamePlaceholder: 'Enter artist name...',
      // Quick search
      quickSearchPlaceholder: 'Quick search...',
      popular: 'Popular',
    },
    artist: {
      about: 'About',
      portfolio: 'Portfolio',
      reviews: 'Reviews',
      availability: 'Availability',
      pricing: 'Pricing',
      experience: 'Experience',
      languages: 'Languages',
      genres: 'Genres',
      verified: 'Verified',
      notVerified: 'Not Verified',
      rating: 'Rating',
      reviews_count: 'reviews',
      bookNow: 'Book Now',
      contactArtist: 'Contact Artist',
      shareProfile: 'Share',
      reportProfile: 'Report',
    },
    booking: {
      title: 'Booking',
      selectDate: 'Select Date',
      selectTime: 'Select Time',
      eventType: 'Event Type',
      eventLocation: 'Location',
      eventDetails: 'Event Details',
      duration: 'Duration',
      totalPrice: 'Total Price',
      deposit: 'Deposit',
      bookingFee: 'Booking Fee',
      finalAmount: 'Final Amount',
      confirmBooking: 'Confirm Booking',
      cancelBooking: 'Cancel',
      bookingSuccess: 'Successfully booked!',
      bookingError: 'An error occurred',
      myBookings: 'My Bookings',
      upcoming: 'Upcoming',
      past: 'Past',
      cancelled: 'Cancelled',
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        completed: 'Completed',
        cancelled: 'Cancelled',
      },
    },
    footer: {
      benefits: {
        secureDeals: 'Secure Transactions',
        escrow: 'Escrow Accounts',
        transparency: 'Transparency',
        digitalContracts: 'Digital Contracts',
        artistsCount: '180+ artists',
        verifiedProfiles: 'Verified Profiles',
        aiMatching: 'AI Matching',
        smartSearch: 'Smart Search',
      },
      about: {
        description: 'Digital platform for the Central Asian music market. Connecting artists and customers in a unified ecosystem.',
      },
      forArtists: {
        title: 'For Artists',
        register: 'Artist Registration',
        dashboard: 'Dashboard',
        verification: 'Profile Verification',
        financial: 'Financial Profile',
        reputation: 'Reputation System',
        adminPanel: 'Admin Panel',
      },
      forCustomers: {
        title: 'For Customers',
        catalog: 'Artist Catalog',
        aiAssistant: 'AI Assistant',
        bookings: 'My Bookings',
        legalDocs: 'Legal Documents',
        support: 'Support & Disputes',
      },
      contacts: {
        title: 'Contacts',
        address: 'Almaty, Kazakhstan\nAbay Avenue, 150',
      },
      bottom: {
        rights: 'All rights reserved.',
        about: 'About Platform',
        terms: 'Terms of Use',
        privacy: 'Privacy Policy',
        regions: 'Working in: Almaty • Astana • Shymkent • Karaganda • Tashkent • Bishkek • Istanbul',
      },
    },
    languages: {
      kazakh: 'Қазақша',
      russian: 'Русский',
      english: 'English',
    },
    roles: {
      singer: 'Singer',
      musician: 'Musician',
      dj: 'DJ',
      mc: 'MC/Toastmaster',
      dancer: 'Dancer',
      band: 'Band',
      orchestra: 'Orchestra',
      host: 'Host',
      showman: 'Showman',
    },
    genres: {
      pop: 'Pop',
      rock: 'Rock',
      jazz: 'Jazz',
      classical: 'Classical',
      electronic: 'Electronic',
      folk: 'Folk',
      traditional: 'Traditional',
      world: 'World Music',
      hiphop: 'Hip-Hop',
      rnb: 'R&B',
      country: 'Country',
      blues: 'Blues',
    },
    auth: {
      login: {
        title: 'Login',
        subtitle: 'If you already have an account',
        welcome: 'Welcome back!',
        description: 'If you already have an account, fill in the fields below.',
        emailLabel: 'Enter your email address',
        emailPlaceholder: 'example@example.com',
        passwordLabel: 'Enter your password',
        passwordPlaceholder: 'Password',
        forgotPassword: 'Forgot password?',
        rememberMe: 'Remember me',
        loginButton: 'Login',
        orLoginWith: 'Login with',
        noAccount: 'If you don\'t have an account',
        signUp: 'Sign Up',
        demoHint: 'Sign up to use the demo version',
        fillAsArtist: 'Fill as Artist',
        fillAsCustomer: 'Fill as Customer',
        feature1Title: 'Secure Transactions',
        feature1Desc: 'Protected payments via escrow accounts',
        feature2Title: 'Verified Artists',
        feature2Desc: '180+ verified professionals',
        feature3Title: 'AI Matching',
        feature3Desc: 'Smart search system',
      },
      register: {
        title: 'Register',
        subtitle: 'If you are a new user',
        nameLabel: 'Enter your name',
        namePlaceholder: 'Your name',
        emailLabel: 'Enter your email address',
        emailPlaceholder: 'example@example.com',
        passwordLabel: 'Enter your password',
        passwordPlaceholder: 'Password',
        confirmPasswordLabel: 'Confirm password',
        confirmPasswordPlaceholder: 'Password',
        roleLabel: 'Select role',
        artistRole: 'Artist',
        customerRole: 'Customer',
        artistDesc: 'Become a musical artist',
        customerDesc: 'Order musical artists',
        termsAccept: 'I have read and accept the terms of use and agreement',
        termsLink: 'terms of use',
        privacyLink: 'privacy policy',
        registerButton: 'Register',
        haveAccount: 'If you already have an account',
        signIn: 'Login',
        orRegisterWith: 'Register with',
        passwordMismatch: 'Passwords do not match',
        registrationSuccess: 'Registration successful!',
        userExists: 'User with this email already exists',
      },
    },
    artistCard: {
      verified: 'Verified',
      reviewsCount: 'reviews count',
      bookingsCount: 'bookings count',
    },
    regions: {
      almaty: 'Almaty',
      astana: 'Astana',
      shymkent: 'Shymkent',
      karaganda: 'Karaganda',
      aktobe: 'Aktobe',
      tashkent: 'Tashkent',
      bishkek: 'Bishkek',
      istanbul: 'Istanbul',
      moscow: 'Moscow',
      beijing: 'Beijing',
    },
  },
};