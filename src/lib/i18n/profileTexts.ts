import { Language } from './translations';

// Расширенные переводы для профилей артистов и заказчиков
export interface ProfileTranslations {
  // Artist Profile Page
  artistProfile: {
    back: string;
    description: string;
    specialization: string;
    equipment: string;
    yearsExperience: string;
    performances: string;
    languages: string;
    videoPerformances: string;
    photos: string;
    bookingCard: {
      title: string;
      from: string;
      basePrice: string;
      included: string;
      additionalServices: string;
      book: string;
      contact: string;
    };
    tabs: {
      about: string;
      portfolio: string;
      reviews: string;
    };
  };

  // Artist Dashboard
  artistDashboard: {
    title: string;
    subtitle: string;
    editProfile: string;
    myBookings: string;
    financialProfile: {
      title: string;
      subtitle: string;
      thisMonth: string;
      onEscrow: string;
    };
    contracts: {
      title: string;
      subtitle: string;
      active: string;
      completed: string;
    };
    reputation: {
      title: string;
      subtitle: string;
      overallScore: string;
      reviews: string;
      platinum: string;
    };
    bookings: {
      title: string;
      subtitle: string;
      upcoming: string;
      viewAll: string;
    };
    verification: {
      title: string;
      subtitle: string;
      status: string;
      verified: string;
      pending: string;
      notStarted: string;
      verify: string;
    };
    support: {
      title: string;
      subtitle: string;
      openDisputes: string;
      resolved: string;
      viewAll: string;
    };
    stats: {
      rating: string;
      bookings: string;
      performances: string;
      revenue: string;
    };
  };

  // Artist Profile Settings
  artistSettings: {
    title: string;
    subtitle: string;
    saveChanges: string;
    cancelEditing: string;
    saving: string;
    saved: string;
    savingError: string;
    tabs: {
      basic: string;
      commercial: string;
      calendar: string;
      media: string;
      security: string;
    };
    basic: {
      mainInfo: string;
      stageName: string;
      stageNamePlaceholder: string;
      realName: string;
      realNamePlaceholder: string;
      avatar: string;
      uploadAvatar: string;
      coverVideo: string;
      coverVideoPlaceholder: string;
      location: string;
      selectCity: string;
      languages: string;
      addLanguage: string;
      languagePlaceholder: string;
      genres: string;
      addGenre: string;
      genrePlaceholder: string;
      format: string;
      solo: string;
      duo: string;
      band: string;
      orchestra: string;
      bio: string;
      bioPlaceholder: string;
      verification: string;
      verificationStatus: string;
      verified: string;
      verifiedDescription: string;
      notVerified: string;
      experience: string;
      yearsPlaceholder: string;
      totalPerformances: string;
      performancesPlaceholder: string;
    };
    commercial: {
      pricing: string;
      basePrice: string;
      basePricePlaceholder: string;
      priceRanges: string;
      wedding: string;
      corporate: string;
      private: string;
      minPrice: string;
      maxPrice: string;
      included: string;
      addIncluded: string;
      includedPlaceholder: string;
      additionalServices: string;
      serviceName: string;
      servicePrice: string;
      addService: string;
    };
    calendar: {
      availability: string;
      weekdays: string;
      weekends: string;
      holidays: string;
      travel: string;
      willingToTravel: string;
      travelRegions: string;
      addRegion: string;
    };
    media: {
      portfolio: string;
      audioTracks: string;
      addAudio: string;
      trackName: string;
      trackUrl: string;
      videos: string;
      addVideo: string;
      videoTitle: string;
      videoUrl: string;
      photos: string;
      uploadPhotos: string;
      photoUrl: string;
    };
    security: {
      accountSecurity: string;
      twoFactor: string;
      twoFactorDesc: string;
      notifications: string;
      emailNotifications: string;
      smsNotifications: string;
      bookingAlerts: string;
      reviewAlerts: string;
      privacy: string;
      profileVisibility: string;
      public: string;
      private: string;
      showRealName: string;
      showPhone: string;
    };
    aiTools: {
      title: string;
      generateDescription: string;
      generateDescriptionDesc: string;
      optimizePricing: string;
      optimizePricingDesc: string;
    };
  };

  // Customer Profile Settings
  customerSettings: {
    title: string;
    subtitle: string;
    saveChanges: string;
    saving: string;
    tabs: {
      basic: string;
      history: string;
      reputation: string;
      payment: string;
      team: string;
      security: string;
    };
    basic: {
      mainInfo: string;
      customerType: string;
      individual: string;
      company: string;
      fullName: string;
      fullNamePlaceholder: string;
      companyName: string;
      companyNamePlaceholder: string;
      city: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      avatar: string;
      uploadAvatar: string;
      status: string;
      verified: string;
      vipStatus: string;
      bio: string;
      bioPlaceholder: string;
      preferences: string;
      eventTypes: string;
      addEventType: string;
      budgetRange: string;
      minBudget: string;
      maxBudget: string;
    };
    history: {
      eventHistory: string;
      totalEvents: string;
      activeBookings: string;
      cancelledEvents: string;
      totalSpent: string;
    };
    reputation: {
      customerReputation: string;
      rating: string;
      reliability: string;
      reliabilityDesc: string;
      artistReviews: string;
      reviewsDesc: string;
      status: string;
      statusNew: string;
      statusRegular: string;
      statusVip: string;
      statusBlacklisted: string;
    };
    payment: {
      paymentMethods: string;
      addPaymentMethod: string;
      cardNumber: string;
      cardNumberPlaceholder: string;
      cardHolder: string;
      cardHolderPlaceholder: string;
      expiryDate: string;
      expiryPlaceholder: string;
      cvv: string;
      cvvPlaceholder: string;
      defaultCard: string;
    };
    team: {
      teamManagement: string;
      addMember: string;
      memberName: string;
      memberRole: string;
      memberEmail: string;
      memberPhone: string;
      owner: string;
      manager: string;
      accountant: string;
    };
    security: {
      accountSecurity: string;
      twoFactor: string;
      twoFactorDesc: string;
      changePassword: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
      updatePassword: string;
      notifications: string;
      emailNotifications: string;
      smsNotifications: string;
      bookingAlerts: string;
      reviewAlerts: string;
      paymentAlerts: string;
    };
  };

  // AI Assistant
  aiAssistant: {
    title: string;
    subtitle: string;
    greeting: string;
    inputPlaceholder: string;
    send: string;
    quickPrompts: {
      wedding: string;
      jazzEvening: string;
      corporate: string;
      birthday: string;
    };
    features: {
      genreSelection: string;
      groupComposition: string;
      planning: string;
      analytics: string;
    };
  };

  // Notification Center
  notifications: {
    title: string;
    subtitle: string;
    tabs: {
      all: string;
      bookings: string;
      payments: string;
      reviews: string;
      system: string;
    };
    types: {
      newBooking: string;
      paymentReceived: string;
      newReview: string;
      verificationComplete: string;
      newMessage: string;
    };
    actions: {
      view: string;
      read: string;
      markAllRead: string;
      clear: string;
    };
    empty: string;
    timeAgo: {
      minutesAgo: string;
      hoursAgo: string;
      daysAgo: string;
      weeksAgo: string;
    };
  };

  // Contracts & Legal
  contracts: {
    title: string;
    subtitle: string;
    tabs: {
      active: string;
      templates: string;
      history: string;
      settings: string;
      signatures: string;
    };
    templates: {
      title: string;
      description: string;
      wedding: string;
      weddingDesc: string;
      corporate: string;
      corporateDesc: string;
      festival: string;
      festivalDesc: string;
      government: string;
      governmentDesc: string;
      restaurant: string;
      restaurantDesc: string;
      private: string;
      privateDesc: string;
      clauses: string;
      readyToUse: string;
    };
    status: {
      draft: string;
      pending: string;
      signed: string;
      active: string;
      completed: string;
    };
    statuses: {
      draft: string;
      pending: string;
      signed: string;
      active: string;
      completed: string;
    };
    escrow: {
      none: string;
      locked: string;
      released: string;
      status: string;
      autoTransfer: string;
      lockedBadge: string;
      releasedBadge: string;
    };
    actions: {
      view: string;
      sign: string;
      download: string;
      create: string;
      preview: string;
      connect: string;
      createContract: string;
    };
    details: {
      title: string;
      eventType: string;
      eventDate: string;
      amount: string;
      signedDate: string;
      penalties: string;
      termsAndPenalties: string;
      escrowTitle: string;
    };
    stats: {
      totalContracts: string;
      active: string;
      onEscrow: string;
      reliability: string;
    };
    penalties: {
      artistCancellation: string;
      artistCancellationDesc: string;
      clientCancellation: string;
      clientCancellationDesc: string;
      lateArrival: string;
      lateArrivalDesc: string;
      forceMajeure: string;
      forceMajeureDesc: string;
      penalty: string;
      refund7days: string;
      refundLess7days: string;
      moreThan30min: string;
    };
    selectToView: string;
    digitalSignature: {
      title: string;
      subtitle: string;
      yourSignature: string;
      status: string;
      active: string;
      certificate: string;
      validUntil: string;
      integrations: string;
      blockchainId: string;
      blockchainDesc: string;
      govTechKz: string;
      govTechDesc: string;
      legalPower: string;
      legalPowerDesc: string;
      signatureHistory: string;
    };
  };

  // Reputation System
  reputation: {
    title: string;
    subtitle: string;
    overallScore: string;
    level: string;
    rank: string;
    metrics: {
      punctuality: string;
      quality: string;
      professionalism: string;
      audienceWork: string;
      technicalPrep: string;
    };
    achievements: {
      title: string;
      unlocked: string;
      locked: string;
      firstSteps: string;
      reliableArtist: string;
      topRated: string;
      speedster: string;
      techMaster: string;
    };
    reviews: {
      title: string;
      positive: string;
      neutral: string;
      negative: string;
    };
  };

  // Financial Profile
  financial: {
    title: string;
    subtitle: string;
    stats: {
      totalEarnings: string;
      thisMonth: string;
      averageBooking: string;
      escrowBalance: string;
      pendingPayments: string;
      monthlyGrowth: string;
    };
    tabs: {
      overview: string;
      analytics: string;
      transactions: string;
      taxes: string;
    };
    transactions: {
      recent: string;
      upcoming: string;
      date: string;
      event: string;
      amount: string;
      status: string;
    };
    actions: {
      withdraw: string;
      downloadReport: string;
      viewDetails: string;
    };
  };
}

export const profileTranslations: Record<Language, ProfileTranslations> = {
  kk: {
    artistProfile: {
      back: 'Артқа',
      description: 'Сипаттама',
      specialization: 'Мамандандыру',
      equipment: 'Жабдық',
      yearsExperience: 'жыл тәжірибе',
      performances: 'өнерпаз',
      languages: 'тіл',
      videoPerformances: 'Бейне өнер',
      photos: 'Фотосуреттер',
      bookingCard: {
        title: 'Брондау',
        from: 'бастап',
        basePrice: 'Негізгі баға',
        included: 'Бағаға кіреді',
        additionalServices: 'Қосымша қызметтер',
        book: 'Қазір брондау',
        contact: 'Байланысу',
      },
      tabs: {
        about: 'Туралы',
        portfolio: 'Портфолио',
        reviews: 'Пікірлер',
      },
    },
    artistDashboard: {
      title: 'Артист панелі',
      subtitle: 'Профильді, қаржыны және беделділікті басқару',
      editProfile: 'Профильді өңдеу',
      myBookings: 'Менің брондауларым',
      financialProfile: {
        title: 'Қаржылық профиль',
        subtitle: 'Кірістер, талдау, салық есептері',
        thisMonth: 'Осы ай',
        onEscrow: 'Эскроу бойынша',
      },
      contracts: {
        title: 'Келісімшарттар және ЭЦҚ',
        subtitle: 'Смарт-келісімшарттар, үлгілер, заңды құжаттар',
        active: 'Белсенді',
        completed: 'Аяқталған',
      },
      reputation: {
        title: 'Беделділік',
        subtitle: 'Рейтинг, пікірлер, жетістіктер',
        overallScore: 'Жалпы балл',
        reviews: 'Пікірлер',
        platinum: 'Платина',
      },
      bookings: {
        title: 'Брондаулар',
        subtitle: 'Келе жатқан іс-шаралар және брондаулар',
        upcoming: 'Келе жатқан',
        viewAll: 'Барлығын көру',
      },
      verification: {
        title: 'Верификация',
        subtitle: 'Профильді растау және беделділікті арттыру',
        status: 'Мәртебе',
        verified: 'Расталған',
        pending: 'Тексерілуде',
        notStarted: 'Басталмаған',
        verify: 'Растау',
      },
      support: {
        title: 'Қолдау',
        subtitle: 'Даулар және қолдау сұраулары',
        openDisputes: 'Ашық даулар',
        resolved: 'Шешілген',
        viewAll: 'Барлығын көру',
      },
      stats: {
        rating: 'Рейтинг',
        bookings: 'Брондаулар',
        performances: 'Өнерпаздар',
        revenue: 'Кіріс',
      },
    },
    artistSettings: {
      title: 'Профиль баптаулары',
      subtitle: 'Артистік профильді басқару',
      saveChanges: 'Өзгерістерді сақтау',
      cancelEditing: 'Өңдеуді болдырау',
      saving: 'Сақтау...',
      saved: 'Сәтті сақталды!',
      savingError: 'Сақтау сәлбесі болды!',
      tabs: {
        basic: 'Негізгі',
        commercial: 'Коммерциялық',
        calendar: 'Күнтізбе',
        media: 'Медиа',
        security: 'Қауіпсіздік',
      },
      basic: {
        mainInfo: 'Негізгі ақпарат',
        stageName: 'Сахна аты',
        stageNamePlaceholder: 'Енгізу...',
        realName: 'Шын аты',
        realNamePlaceholder: 'Енгізу...',
        avatar: 'Аватар',
        uploadAvatar: 'Жүктеу',
        coverVideo: 'Мұқаба бейнесі',
        coverVideoPlaceholder: 'YouTube немесе бейне сілтемесі',
        location: 'Орын',
        selectCity: 'Қаланы таңдаңыз',
        languages: 'Тілдер',
        addLanguage: 'Тілді қосу',
        languagePlaceholder: 'Тілді енгізіңіз...',
        genres: 'Жанрлар',
        addGenre: 'Жанрды қосу',
        genrePlaceholder: 'Жанрды енгізіңіз...',
        format: 'Формат',
        solo: 'Жеке',
        duo: 'Дуэт',
        band: 'Топ',
        orchestra: 'Оркестр',
        bio: 'Өзі туралы',
        bioPlaceholder: 'Өзіңіз туралы айтыңыз...',
        verification: 'Верификация',
        verificationStatus: 'Мәртебе',
        verified: 'Расталған',
        verifiedDescription: 'Профиль расталған',
        notVerified: 'Расталмаған',
        experience: 'Тәжірибе (жылдар)',
        yearsPlaceholder: '5',
        totalPerformances: 'Жалпы өнерпаздар',
        performancesPlaceholder: '20',
      },
      commercial: {
        pricing: 'Баға белгілеу',
        basePrice: 'Негізгі баға',
        basePricePlaceholder: '₸ 200,000',
        priceRanges: 'Іс-шара түрлері бойынша баға диапазондары',
        wedding: 'Той',
        corporate: 'Корпоративтк',
        private: 'Жеке',
        minPrice: 'Мін',
        maxPrice: 'Макс',
        included: 'Бағаға кіреді',
        addIncluded: 'Қосу',
        includedPlaceholder: 'Мысалы: 2 сағат өнер',
        additionalServices: 'Қосымша қызметтер',
        serviceName: 'Қызмет атауы',
        servicePrice: 'Баға',
        addService: 'Қызметті қосу',
      },
      calendar: {
        availability: 'Қолжетімділік',
        weekdays: 'Апта күндері',
        weekends: 'Демалыс күндері',
        holidays: 'Мерекелер',
        travel: 'Саяхат',
        willingToTravel: 'Саяхатқа дайын',
        travelRegions: 'Саяхат аймақтары',
        addRegion: 'Аймақты қосу',
      },
      media: {
        portfolio: 'Портфолио',
        audioTracks: 'Аудио трактілер',
        addAudio: 'Аудио қосу',
        trackName: 'Трек атауы',
        trackUrl: 'Аудио сілтемесі',
        videos: 'Бейнелер',
        addVideo: 'Бейне қосу',
        videoTitle: 'Бейне атауы',
        videoUrl: 'Бейне сілтемесі',
        photos: 'Фотосуреттер',
        uploadPhotos: 'Фото жүктеу',
        photoUrl: 'Фото сілтемесі',
      },
      security: {
        accountSecurity: 'Тіркелгі қауіпсіздігі',
        twoFactor: 'Екі факторлы аутентификация',
        twoFactorDesc: 'Қосымша қауіпсіздік қабаты',
        notifications: 'Хабарламалар',
        emailNotifications: 'Эл. пошта хабарламалары',
        smsNotifications: 'SMS хабарламалары',
        bookingAlerts: 'Брондау хабарламалары',
        reviewAlerts: 'Пікір хабарламалары',
        privacy: 'Құпиялылық',
        profileVisibility: 'Профиль көрінісі',
        public: 'Ашық',
        private: 'Жабық',
        showRealName: 'Шын атын көрсету',
        showPhone: 'Телефонды көрсету',
      },
      aiTools: {
        title: 'AI құралдары',
        generateDescription: 'Сипаттаманы жасау',
        generateDescriptionDesc: 'AI профильдің тартымды сипаттамасын жасайды',
        optimizePricing: 'Баға оңтайландыру',
        optimizePricingDesc: 'Нарық деректері негізінде бағаларды талдау',
      },
    },
    customerSettings: {
      title: 'Тапсырыс беруші профиль баптаулары',
      subtitle: 'Профильді және іс-шараларды басқару',
      saveChanges: 'Өзгерістерді сақтау',
      saving: 'Сақтау...',
      tabs: {
        basic: 'Негізгі',
        history: 'Тарих',
        reputation: 'Беделділік',
        payment: 'Төлем',
        team: 'Команда',
        security: 'Қауіпсіздік',
      },
      basic: {
        mainInfo: 'Негізгі ақпарат',
        customerType: 'Тапсырыс беруші түрі',
        individual: 'Жеке тұлға',
        company: 'Компания',
        fullName: 'Толық аты',
        fullNamePlaceholder: 'Атыңызды енгізіңіз',
        companyName: 'Компания атауы',
        companyNamePlaceholder: 'Компанияңыздың атын енгізіңіз',
        city: 'Қала',
        phone: 'Телефон',
        phonePlaceholder: '+7 (777) 123-45-67',
        email: 'Эл. пошта',
        emailPlaceholder: 'example@example.com',
        avatar: 'Аватар',
        uploadAvatar: 'Жүктеу',
        status: 'Мәртебе',
        verified: 'Расталған',
        vipStatus: 'VIP мәртебе',
        bio: 'Өзі туралы',
        bioPlaceholder: 'Өзіңіз туралы айтыңыз...',
        preferences: 'Қалаулылық',
        eventTypes: 'Іс-шара түрлері',
        addEventType: 'Қосу',
        budgetRange: 'Бюджет диапазоны',
        minBudget: 'Мін',
        maxBudget: 'Макс',
      },
      history: {
        eventHistory: 'Іс-шаралар тарихы',
        totalEvents: 'Жалпы іс-шаралар',
        activeBookings: 'Белсенді брондаулар',
        cancelledEvents: 'Болдырылған іс-шаралар',
        totalSpent: 'Жалпы шығыстар',
      },
      reputation: {
        customerReputation: 'Тапсырыс берушінің беделділігі',
        rating: 'Рейтинг',
        reliability: 'Сенімділік',
        reliabilityDesc: 'Міндеттемелерді орындау деңгейі',
        artistReviews: 'Артистердің пікірлері',
        reviewsDesc: 'Артистер тарапынан пікірлер',
        status: 'Мәртебе',
        statusNew: 'Жаңа',
        statusRegular: 'Тұрақты',
        statusVip: 'VIP',
        statusBlacklisted: 'Қара тізімде',
      },
      payment: {
        paymentMethods: 'Төлем әдістері',
        addPaymentMethod: 'Әдісті қосу',
        cardNumber: 'Карта нөмірі',
        cardNumberPlaceholder: '1234 5678 9012 3456',
        cardHolder: 'Карта иесі',
        cardHolderPlaceholder: 'IVANOV IVAN',
        expiryDate: 'Жарамдылық мерзімі',
        expiryPlaceholder: '12/25',
        cvv: 'CVV',
        cvvPlaceholder: '123',
        defaultCard: 'Әдепкі карта',
      },
      team: {
        teamManagement: 'Команда басқаруы',
        addMember: 'Мүшені қосу',
        memberName: 'Аты',
        memberRole: 'Рөлі',
        memberEmail: 'Эл. пошта',
        memberPhone: 'Телефон',
        owner: 'Иесі',
        manager: 'Менеджер',
        accountant: 'Бухгалтер',
      },
      security: {
        accountSecurity: 'Тіркелгі қауіпсіздігі',
        twoFactor: 'Екі факторлы аутентификация',
        twoFactorDesc: 'Қосымша қауіпсіздік қабаты',
        changePassword: 'Құпия сөзді өзгерту',
        currentPassword: 'Ағымдағы құпия сөз',
        newPassword: 'Жаңа құпия сөз',
        confirmPassword: 'Құпия сөзді растау',
        updatePassword: 'Жаңарту',
        notifications: 'Хабарламалар',
        emailNotifications: 'Эл. пошта хабарламалары',
        smsNotifications: 'SMS хабарламалары',
        bookingAlerts: 'Брондау хабарламалары',
        reviewAlerts: 'Пікір хабарламалары',
        paymentAlerts: 'Төлем хабарламалары',
      },
    },
    aiAssistant: {
      title: 'AI көмекші',
      subtitle: 'Артисттерге және тапсырыс берушілерге көмектесу',
      greeting: 'Сәләм! Мен сізге көмектесу үшін барым!',
      inputPlaceholder: 'Сұрауңызды енгізіңіз...',
      send: 'Жіберу',
      quickPrompts: {
        wedding: 'Той',
        jazzEvening: 'Джаз күні',
        corporate: 'Корпоративтік',
        birthday: 'Денсаулық күні',
      },
      features: {
        genreSelection: 'Жанр таңдау',
        groupComposition: 'Группа тұрғысын түзіу',
        planning: 'Орналасқандау',
        analytics: 'Аналитикалық талдау',
      },
    },
    notifications: {
      title: 'Хабарламалар',
      subtitle: 'Сізге барлық хабарламаларды көрсетеді',
      tabs: {
        all: 'Барлығы',
        bookings: 'Брондаулар',
        payments: 'Төлемдер',
        reviews: 'Пікірлер',
        system: 'Системалық',
      },
      types: {
        newBooking: 'Жаңа брондау',
        paymentReceived: 'Төлем алынды',
        newReview: 'Жаңа пікір',
        verificationComplete: 'Верификация толықталды',
        newMessage: 'Жаңа хабар',
      },
      actions: {
        view: 'Көру',
        read: 'Оқу',
        markAllRead: 'Барлығын оқылған деп белгілеу',
        clear: 'Тазалоо',
      },
      empty: 'Хабарламалар жок',
      timeAgo: {
        minutesAgo: 'минут бұрын',
        hoursAgo: 'сағат бұрын',
        daysAgo: 'күн бұрын',
        weeksAgo: 'апта бұрын',
      },
    },
    contracts: {
      title: 'Келісімшарттар және ЭЦҚ',
      subtitle: 'Смарт-келісімшарттар, үлгілер, заңды құжаттар',
      tabs: {
        active: 'Белсенді',
        templates: 'Үлгілер',
        history: 'Тарих',
        settings: 'Баптаулар',
        signatures: 'ЭЦҚ',
      },
      templates: {
        title: 'Үлгілер',
        description: 'Әртүрлі іс-шаралар түрлері үшін дайын заңды үлгілер',
        wedding: 'Той',
        weddingDesc: 'Үйлену тойында өнер көрсетуге арналған стандартты келісімшарт',
        corporate: 'Корпоративтік',
        corporateDesc: 'Корпоративтік клиенттерге арналған келісімшарт',
        festival: 'Фестиваль',
        festivalDesc: 'Қоғамдық іс-шаралар мен фестивальдарға арналған',
        government: 'Мемлекеттік',
        governmentDesc: 'Мемлекеттік тапсырыстарға арналған арнайы үлгі',
        restaurant: 'Ресторан',
        restaurantDesc: 'Мекемелерде тұрақты өнер көрсетулерге арналған',
        private: 'Жеке',
        privateDesc: 'Туған күн, мерейтой және т.б.',
        clauses: 'тармақ',
        readyToUse: 'Қолдануға дайын',
      },
      status: {
        draft: 'Жоба',
        pending: 'Күтуде',
        signed: 'Қол қойылды',
        active: 'Белсенді',
        completed: 'Аяқталды',
      },
      statuses: {
        draft: 'Жоба',
        pending: 'Күтуде',
        signed: 'Қол қойылды',
        active: 'Белсенді',
        completed: 'Аяқталды',
      },
      escrow: {
        none: 'Жоқ',
        locked: 'Бұғатталған',
        released: 'Төленді',
        status: 'Мәртебе',
        autoTransfer: 'Ақша іс-шарадан кейін 24 сағат ішінде артистке автоматты түрде аударылады',
        lockedBadge: '🔒 Бұғатталған',
        releasedBadge: '✅ Төленді',
      },
      actions: {
        view: 'Көру',
        sign: 'Қол қою',
        download: 'Жүктеп алу',
        create: 'Жасау',
        preview: 'Алдын ала қарау',
        connect: 'Қосу',
        createContract: 'Келісімшарт жасау',
      },
      details: {
        title: 'Келісімшарт мәліметтері',
        eventType: 'Іс-шара түрі',
        eventDate: 'Іс-шара күні',
        amount: 'Сомасы',
        signedDate: 'Қол қою күні',
        penalties: 'Айыппұлдар',
        termsAndPenalties: 'Шарттар мен айыппұлдар',
        escrowTitle: 'Эскроу-шот',
      },
      stats: {
        totalContracts: 'Барлық келісімшарттар',
        active: 'Белсенді',
        onEscrow: 'Эскроуда',
        reliability: 'Сенімділік',
      },
      penalties: {
        artistCancellation: 'Артист бас тартуы',
        artistCancellationDesc: 'Айыппұл: ₸{amount} (50%)',
        clientCancellation: 'Тапсырыс беруші бас тартуы',
        clientCancellationDesc: '7+ күн: 90% қайтарым\nКемінде 7 күн: ₸{amount}',
        lateArrival: 'Артист кешігуі',
        lateArrivalDesc: '30 минуттан артық: ₸{amount}',
        forceMajeure: '✓ Форс-мажор',
        forceMajeureDesc: 'Айыппұлсыз ақшаны толық қайтару',
        penalty: 'Айыппұл:',
        refund7days: '7+ күн: 90% қайтарым',
        refundLess7days: 'Кемінде 7 күн:',
        moreThan30min: '30 минуттан артық:',
      },
      selectToView: 'Мәліметтерді көру үшін келісімшартты таңдаңыз',
      digitalSignature: {
        title: 'Электрондық цифрлық қолтаңба (ЭЦҚ)',
        subtitle: 'Келісімшарттарға арналған заңды маңызды қолтаңба',
        yourSignature: 'Сіздің ЭЦҚ',
        status: 'Мәртебе',
        active: 'Белсенді',
        certificate: 'Сертификат',
        validUntil: 'Жарамдылық мерзімі',
        integrations: 'Интеграциялар',
        blockchainId: 'Blockchain ID',
        blockchainDesc: 'Орталықсыздандырылған жүйе',
        govTechKz: 'GovTech KZ',
        govTechDesc: 'Мемлекеттік ЭЦҚ жүйесі',
        legalPower: 'Заңды күші',
        legalPowerDesc: 'ЭЦҚ бар барлық келісімшарттар ҚР заңнамасына сәйкес толық заңды күшке ие және сотта танылады',
        signatureHistory: 'Қолтаңба тарихы',
      },
    },
    reputation: {
      title: 'Беделділік жүйесі',
      subtitle: 'Рейтинг, пікірлер және жетістіктер',
      overallScore: 'Жалпы балл',
      level: 'Мәртебе',
      rank: 'Рейтинг',
      metrics: {
        punctuality: 'Уақыттықтық',
        quality: 'Қалыптану',
        professionalism: 'Професионалдық',
        audienceWork: 'Аудиториялық жұмыс',
        technicalPrep: 'Техникалық түзілім',
      },
      achievements: {
        title: 'Жетістіктер',
        unlocked: 'Ачылып туратын',
        locked: 'Жабық',
        firstSteps: 'Бірінші қадамдар',
        reliableArtist: 'Сенімділік артист',
        topRated: 'Жоғары рейтингте',
        speedster: 'Жылдам',
        techMaster: 'Техникалық мұрасты',
      },
      reviews: {
        title: 'Пікірлер',
        positive: 'Позитивті',
        neutral: 'Нейтралды',
        negative: 'Негативті',
      },
    },
    financial: {
      title: 'Қаржылық профиль',
      subtitle: 'Кірістер, талдау және салықтар',
      stats: {
        totalEarnings: 'Жалпы кірістер',
        thisMonth: 'Осы ай',
        averageBooking: 'Орта брондау',
        escrowBalance: 'Эскроу балансы',
        pendingPayments: 'Тексерілуде төлемдер',
        monthlyGrowth: 'Айлық өсу',
      },
      tabs: {
        overview: 'Анықтама',
        analytics: 'Аналитика',
        transactions: 'Транзакциялар',
        taxes: 'Салықтар',
      },
      transactions: {
        recent: 'Жаңа',
        upcoming: 'Келе жатқан',
        date: 'Таріх',
        event: 'Іс-шара',
        amount: 'Сумма',
        status: 'Мәртебе',
      },
      actions: {
        withdraw: 'Шғару',
        downloadReport: 'Ескерту сипаттамасын жүктеп алу',
        viewDetails: 'Толығырақ көру',
      },
    },
  },

  ru: {
    artistProfile: {
      back: 'Назад',
      description: 'Описание',
      specialization: 'Специализация',
      equipment: 'Оборудование',
      yearsExperience: 'лет опыта',
      performances: 'выступлений',
      languages: 'языка',
      videoPerformances: 'Видео выступлений',
      photos: 'Фотографии',
      bookingCard: {
        title: 'Бронирование',
        from: 'от',
        basePrice: 'Базовая цена',
        included: 'Включено в стоимость',
        additionalServices: 'Дополнительные услуги',
        book: 'Забронировать сейчас',
        contact: 'Связаться',
      },
      tabs: {
        about: 'О себе',
        portfolio: 'Портфолио',
        reviews: 'Отзывы',
      },
    },
    artistDashboard: {
      title: 'Панель артиста',
      subtitle: 'Управление профилем, инансами и репутацией',
      editProfile: 'Редактировать профиль',
      myBookings: 'Мои бронирования',
      financialProfile: {
        title: 'Финансовый профиль',
        subtitle: 'Доходы, аналитика, налоговые отчёты',
        thisMonth: 'Этот месяц',
        onEscrow: 'На эскроу',
      },
      contracts: {
        title: 'Контракты и ЭЦП',
        subtitle: 'Смарт-контракты, шаблоны, юридические документы',
        active: 'Активных',
        completed: 'Завершённых',
      },
      reputation: {
        title: 'Репутация',
        subtitle: 'Рейтинг, отзывы, достижения',
        overallScore: 'Общий балл',
        reviews: 'Отзывов',
        platinum: 'Платина',
      },
      bookings: {
        title: 'Бронирования',
        subtitle: 'Предстоящие события и бронирования',
        upcoming: 'Предстоящих',
        viewAll: 'Смотреть все',
      },
      verification: {
        title: 'Верификация',
        subtitle: 'Подтверждение профиля и повышение репутации',
        status: 'Статус',
        verified: 'Верифицирован',
        pending: 'На проверке',
        notStarted: 'Не начато',
        verify: 'Пройти верификацию',
      },
      support: {
        title: 'Поддержка',
        subtitle: 'Споры и запросы в поддержку',
        openDisputes: 'Открытых споров',
        resolved: 'Решено',
        viewAll: 'Смотреть все',
      },
      stats: {
        rating: 'Рейтинг',
        bookings: 'Бронирований',
        performances: 'Выступлений',
        revenue: 'Доход',
      },
    },
    artistSettings: {
      title: 'Настройки профиля',
      subtitle: 'Управление вашим артистическим профилем',
      saveChanges: 'Сохранить изменения',
      cancelEditing: 'Отменить редактирование',
      saving: 'Сохранение...',
      saved: 'Успешно сохранено!',
      savingError: 'Ошибка сохранения!',
      tabs: {
        basic: 'Основное',
        commercial: 'Коммерческое',
        calendar: 'Календарь',
        media: 'Медиа',
        security: 'Безопасность',
      },
      basic: {
        mainInfo: 'Основная информация',
        stageName: 'Сценическое имя',
        stageNamePlaceholder: 'Введите...',
        realName: 'Настоящее имя',
        realNamePlaceholder: 'Введите...',
        avatar: 'Аватар',
        uploadAvatar: 'Загрузить',
        coverVideo: 'Обложка (видео)',
        coverVideoPlaceholder: 'YouTube или ссылка на видео',
        location: 'Местоположение',
        selectCity: 'Выберите город',
        languages: 'Языки',
        addLanguage: 'Добавить язык',
        languagePlaceholder: 'Введите язык...',
        genres: 'Жанры',
        addGenre: 'Добавить жанр',
        genrePlaceholder: 'Введите жанр...',
        format: 'Формат',
        solo: 'Соло',
        duo: 'Дуэт',
        band: 'Группа',
        orchestra: 'Оркестр',
        bio: 'О себе',
        bioPlaceholder: 'Расскажите о себе...',
        verification: 'Верификация',
        verificationStatus: 'Статус',
        verified: 'Верифицирован',
        verifiedDescription: 'Профиль верифицирован',
        notVerified: 'Не верифицирован',
        experience: 'Опыт (лет)',
        yearsPlaceholder: '5',
        totalPerformances: 'Всего выступлений',
        performancesPlaceholder: '20',
      },
      commercial: {
        pricing: 'Ценообразование',
        basePrice: 'Базовая цена',
        basePricePlaceholder: '₸ 200,000',
        priceRanges: 'Диапазоны цен по типам мероприятий',
        wedding: 'Свадьба',
        corporate: 'Корпоратив',
        private: 'Частное',
        minPrice: 'Мин',
        maxPrice: 'Макс',
        included: 'Включено в стоимость',
        addIncluded: 'Добавить',
        includedPlaceholder: 'Например: 2 часа выступления',
        additionalServices: 'Дополнительные услуги',
        serviceName: 'Название услуги',
        servicePrice: 'Цена',
        addService: 'Добавить услугу',
      },
      calendar: {
        availability: 'Доступность',
        weekdays: 'Будни',
        weekends: 'Выходные',
        holidays: 'Праздники',
        travel: 'Путешествия',
        willingToTravel: 'Готов к поездкам',
        travelRegions: 'Регионы поездок',
        addRegion: 'Добавить регион',
      },
      media: {
        portfolio: 'Портфолио',
        audioTracks: 'Аудиотреки',
        addAudio: 'Добавить аудио',
        trackName: 'Название трека',
        trackUrl: 'Ссылка на аудио',
        videos: 'Видео',
        addVideo: 'Добавить видео',
        videoTitle: 'Название видео',
        videoUrl: 'Ссылка на видео',
        photos: 'Фотографии',
        uploadPhotos: 'Загрузить фото',
        photoUrl: 'Ссылка на фото',
      },
      security: {
        accountSecurity: 'Безопасность аккаунта',
        twoFactor: 'Двухфакторная аутентификация',
        twoFactorDesc: 'Дополнительный уровень безопасности',
        notifications: 'Уведомления',
        emailNotifications: 'Email уведомления',
        smsNotifications: 'SMS уведомления',
        bookingAlerts: 'Уведомления о бронированиях',
        reviewAlerts: 'Уведомления об отзывах',
        privacy: 'Приватность',
        profileVisibility: 'Видимость профиля',
        public: 'Публичный',
        private: 'Приватный',
        showRealName: 'Показывать настоящее имя',
        showPhone: 'Показывать телефон',
      },
      aiTools: {
        title: 'AI инструменты',
        generateDescription: 'Генерация описания',
        generateDescriptionDesc: 'AI создаст привлекательное описание профиля',
        optimizePricing: 'Оптимизация цен',
        optimizePricingDesc: 'Анализ цен на основе рыночных данных',
      },
    },
    customerSettings: {
      title: 'Настройки профиля заказчика',
      subtitle: 'Управление профилем и мероприятиями',
      saveChanges: 'Сохранить изменения',
      saving: 'Сохранение...',
      tabs: {
        basic: 'Основное',
        history: 'История',
        reputation: 'Репутация',
        payment: 'Оплата',
        team: 'Команда',
        security: 'Безопасность',
      },
      basic: {
        mainInfo: 'Основная информация',
        customerType: 'Тип заказчика',
        individual: 'Физическое лицо',
        company: 'Компания',
        fullName: 'Полное имя',
        fullNamePlaceholder: 'Введите ваше имя',
        companyName: 'Название компании',
        companyNamePlaceholder: 'Введите название компании',
        city: 'Город',
        phone: 'Телефон',
        phonePlaceholder: '+7 (777) 123-45-67',
        email: 'Email',
        emailPlaceholder: 'example@example.com',
        avatar: 'Аватар',
        uploadAvatar: 'Загрузить',
        status: 'Статус',
        verified: 'Верифицирован',
        vipStatus: 'VIP статус',
        bio: 'О себе',
        bioPlaceholder: 'Расскажите о себе...',
        preferences: 'Предпочтения',
        eventTypes: 'Типы мероприятий',
        addEventType: 'Добавить',
        budgetRange: 'Бюджетный диапазон',
        minBudget: 'Мин',
        maxBudget: 'Макс',
      },
      history: {
        eventHistory: 'История мероприятий',
        totalEvents: 'Всего мероприятий',
        activeBookings: 'Активных бронирований',
        cancelledEvents: 'Отменённых мероприятий',
        totalSpent: 'Всего потрачено',
      },
      reputation: {
        customerReputation: 'Репутация заказчика',
        rating: 'Рейтинг',
        reliability: 'Надёжность',
        reliabilityDesc: 'Уровень выполнения обязательств',
        artistReviews: 'Отзывы от артистов',
        reviewsDesc: 'Отзывы со стороны артистов',
        status: 'Статус',
        statusNew: 'Новый',
        statusRegular: 'Постоянный',
        statusVip: 'VIP',
        statusBlacklisted: 'В черном списке',
      },
      payment: {
        paymentMethods: 'Способы оплаты',
        addPaymentMethod: 'Добавить способ',
        cardNumber: 'Номер карты',
        cardNumberPlaceholder: '1234 5678 9012 3456',
        cardHolder: 'Держатель карты',
        cardHolderPlaceholder: 'IVANOV IVAN',
        expiryDate: 'Срок действия',
        expiryPlaceholder: '12/25',
        cvv: 'CVV',
        cvvPlaceholder: '123',
        defaultCard: 'Основная карта',
      },
      team: {
        teamManagement: 'Управление командой',
        addMember: 'Добавить участника',
        memberName: 'Имя',
        memberRole: 'Роль',
        memberEmail: 'Email',
        memberPhone: 'Телефон',
        owner: 'Владелец',
        manager: 'Менеджер',
        accountant: 'Бухгалтер',
      },
      security: {
        accountSecurity: 'Безопасность аккаунта',
        twoFactor: 'Двухфакторная аутентификация',
        twoFactorDesc: 'Дополнительный уровень безопасности',
        changePassword: 'Изменить пароль',
        currentPassword: 'Текущий пароль',
        newPassword: 'Новый пароль',
        confirmPassword: 'Подтверждение пароля',
        updatePassword: 'Обновить',
        notifications: 'Уведомления',
        emailNotifications: 'Email уведомления',
        smsNotifications: 'SMS уведомления',
        bookingAlerts: 'Уведомления о бронированиях',
        reviewAlerts: 'Уведомления об отзывах',
        paymentAlerts: 'Уведомления об оплате',
      },
    },
    aiAssistant: {
      title: 'AI ассистент',
      subtitle: 'Помощь артистам и заказчикам',
      greeting: 'Привет! Я здесь, чтобы помочь вам!',
      inputPlaceholder: 'Введите ваш запрос...',
      send: 'Отправить',
      quickPrompts: {
        wedding: 'Свадьба',
        jazzEvening: 'Джаз вечеринка',
        corporate: 'Корпоративное мероприятие',
        birthday: 'День рождения',
      },
      features: {
        genreSelection: 'Выбор жанра',
        groupComposition: 'Состав группы',
        planning: 'Планирование',
        analytics: 'Аналитика',
      },
    },
    notifications: {
      title: 'Уведомления',
      subtitle: 'Все ваши уведомления в одном месте',
      tabs: {
        all: 'Все',
        bookings: 'Бронирования',
        payments: 'Оплаты',
        reviews: 'Отзывы',
        system: 'Системные',
      },
      types: {
        newBooking: 'Новое бронирование',
        paymentReceived: 'Оплата получена',
        newReview: 'Новый отзыв',
        verificationComplete: 'Верификация завершена',
        newMessage: 'Новое сообщение',
      },
      actions: {
        view: 'Просмотреть',
        read: 'Прочитать',
        markAllRead: 'Отметить все как прочитанное',
        clear: 'Очистить',
      },
      empty: 'Уведомлений нет',
      timeAgo: {
        minutesAgo: 'минут назад',
        hoursAgo: 'часов назад',
        daysAgo: 'дней назад',
        weeksAgo: 'недель назад',
      },
    },
    contracts: {
      title: 'Контракты и ЭЦП',
      subtitle: 'Смарт-контракты, шаблоны, юридические документы',
      tabs: {
        active: 'Активные',
        templates: 'Шаблоны',
        history: 'История',
        settings: 'Настройки',
        signatures: 'ЭЦП',
      },
      templates: {
        title: 'Шаблоны',
        description: 'Готовые юридические шаблоны для разных типов мероприятий',
        wedding: 'Свадьба',
        weddingDesc: 'Стандартный договор на свадебное выступление',
        corporate: 'Корпоратив',
        corporateDesc: 'Договор для корпоративных клиентов',
        festival: 'Фестиваль',
        festivalDesc: 'Для публичных мероприятий и фестивалей',
        government: 'Госзаказ',
        governmentDesc: 'Специальный шаблон для госзаказов',
        restaurant: 'Ресторан',
        restaurantDesc: 'Регулярные выступления в заведениях',
        private: 'Частное',
        privateDesc: 'День рождения, юбилей и др.',
        clauses: 'пунктов',
        readyToUse: 'Готов к использованию',
      },
      status: {
        draft: 'Черновик',
        pending: 'Ожидание',
        signed: 'Подписан',
        active: 'Активен',
        completed: 'Завершён',
      },
      statuses: {
        draft: 'Черновик',
        pending: 'Ожидание',
        signed: 'Подписан',
        active: 'Активен',
        completed: 'Завершён',
      },
      escrow: {
        none: 'Нет',
        locked: 'Заблокировано',
        released: 'Выплачено',
        status: 'Статус',
        autoTransfer: 'Деньги будут автоматически переведены артисту через 24 часа после мероприятия',
        lockedBadge: '🔒 Заблокировано',
        releasedBadge: '✅ Выплачено',
      },
      actions: {
        view: 'Просмотр',
        sign: 'Подписать',
        download: 'Скачать',
        create: 'Создать',
        preview: 'Предпросмотр',
        connect: 'Подключить',
        createContract: 'Создать контракт',
      },
      details: {
        title: 'Детали контракта',
        eventType: 'Тип мероприятия',
        eventDate: 'Дата события',
        amount: 'Стоимость',
        signedDate: 'Дата подписания',
        penalties: 'Штрафы',
        termsAndPenalties: 'Условия и штрафы',
        escrowTitle: 'Эскроу-счёт',
      },
      stats: {
        totalContracts: 'Всего контрактов',
        active: 'Активных',
        onEscrow: 'На эскроу',
        reliability: 'Надежность',
      },
      penalties: {
        artistCancellation: 'Отмена артистом',
        artistCancellationDesc: 'Штраф: ₸{amount} (50%)',
        clientCancellation: 'Отмена заказчиком',
        clientCancellationDesc: 'За 7+ дней: возврат 90%\nМенее 7 дней: ₸{amount}',
        lateArrival: 'Опоздание артиста',
        lateArrivalDesc: 'Более 30 мин: ₸{amount}',
        forceMajeure: '✓ Форс-мажор',
        forceMajeureDesc: 'Полный возврат средств без штрафов',
        penalty: 'Штраф:',
        refund7days: 'За 7+ дней: возврат 90%',
        refundLess7days: 'Менее 7 дней:',
        moreThan30min: 'Более 30 мин:',
      },
      selectToView: 'Выберите контракт для просмотра деталей',
      digitalSignature: {
        title: 'Электронная цифровая подпись (ЭЦП)',
        subtitle: 'Юридически значимая подпись для контрактов',
        yourSignature: 'Ваша ЭЦП',
        status: 'Статус',
        active: 'Активна',
        certificate: 'Сертификат',
        validUntil: 'Срок действия',
        integrations: 'Интеграции',
        blockchainId: 'Blockchain ID',
        blockchainDesc: 'Децентрализованная система',
        govTechKz: 'GovTech KZ',
        govTechDesc: 'Государственная система ЭЦП',
        legalPower: 'Юридическая сила',
        legalPowerDesc: 'Все контракты с ЭЦП имеют полную юридическую силу согласно законодательству РК и признаются в суде',
        signatureHistory: 'История подписей',
      },
    },
    reputation: {
      title: 'Система репутации',
      subtitle: 'Рейтинг, отзывы и достижения',
      overallScore: 'Общий балл',
      level: 'Уровень',
      rank: 'Рейтинг',
      metrics: {
        punctuality: 'Точность',
        quality: 'Качество',
        professionalism: 'Профессионализм',
        audienceWork: 'Работа с аудиторией',
        technicalPrep: 'Техническая подготовка',
      },
      achievements: {
        title: 'Достижения',
        unlocked: 'Разблокированы',
        locked: 'Заблокированы',
        firstSteps: 'Первые шаги',
        reliableArtist: 'Надежный артист',
        topRated: 'Топ-рейтинг',
        speedster: 'Быстрый',
        techMaster: 'Мастер техники',
      },
      reviews: {
        title: 'Отзывы',
        positive: 'Позитивные',
        neutral: 'Нейтральные',
        negative: 'Негативные',
      },
    },
    financial: {
      title: 'Финансовый профиль',
      subtitle: 'Доходы, аналитика и налоги',
      stats: {
        totalEarnings: 'Общий доход',
        thisMonth: 'Этот месяц',
        averageBooking: 'Средняя бронь',
        escrowBalance: 'Баланс эскроу',
        pendingPayments: 'Ожидающие оплаты',
        monthlyGrowth: 'Месячный рост',
      },
      tabs: {
        overview: 'Обзор',
        analytics: 'Аналитика',
        transactions: 'Транзакции',
        taxes: 'Налоги',
      },
      transactions: {
        recent: 'Недавние',
        upcoming: 'Будущие',
        date: 'Дата',
        event: 'Событие',
        amount: 'Сумма',
        status: 'Статус',
      },
      actions: {
        withdraw: 'Вывести',
        downloadReport: 'Скачать отчет',
        viewDetails: 'Просмотреть детали',
      },
    },
  },

  en: {
    artistProfile: {
      back: 'Back',
      description: 'Description',
      specialization: 'Specialization',
      equipment: 'Equipment',
      yearsExperience: 'years of experience',
      performances: 'performances',
      languages: 'languages',
      videoPerformances: 'Video Performances',
      photos: 'Photos',
      bookingCard: {
        title: 'Booking',
        from: 'from',
        basePrice: 'Base Price',
        included: 'Included',
        additionalServices: 'Additional Services',
        book: 'Book Now',
        contact: 'Contact',
      },
      tabs: {
        about: 'About',
        portfolio: 'Portfolio',
        reviews: 'Reviews',
      },
    },
    artistDashboard: {
      title: 'Artist Dashboard',
      subtitle: 'Manage your profile, finances and reputation',
      editProfile: 'Edit Profile',
      myBookings: 'My Bookings',
      financialProfile: {
        title: 'Financial Profile',
        subtitle: 'Revenue, analytics, tax reports',
        thisMonth: 'This Month',
        onEscrow: 'On Escrow',
      },
      contracts: {
        title: 'Contracts & Digital Signature',
        subtitle: 'Smart contracts, templates, legal documents',
        active: 'Active',
        completed: 'Completed',
      },
      reputation: {
        title: 'Reputation',
        subtitle: 'Rating, reviews, achievements',
        overallScore: 'Overall Score',
        reviews: 'Reviews',
        platinum: 'Platinum',
      },
      bookings: {
        title: 'Bookings',
        subtitle: 'Upcoming events and bookings',
        upcoming: 'Upcoming',
        viewAll: 'View All',
      },
      verification: {
        title: 'Verification',
        subtitle: 'Confirm profile and increase reputation',
        status: 'Status',
        verified: 'Verified',
        pending: 'Pending',
        notStarted: 'Not Started',
        verify: 'Get Verified',
      },
      support: {
        title: 'Support',
        subtitle: 'Disputes and support requests',
        openDisputes: 'Open Disputes',
        resolved: 'Resolved',
        viewAll: 'View All',
      },
      stats: {
        rating: 'Rating',
        bookings: 'Bookings',
        performances: 'Performances',
        revenue: 'Revenue',
      },
    },
    artistSettings: {
      title: 'Profile Settings',
      subtitle: 'Manage your artist profile',
      saveChanges: 'Save Changes',
      cancelEditing: 'Cancel Editing',
      saving: 'Saving...',
      saved: 'Successfully saved!',
      savingError: 'Saving error!',
      tabs: {
        basic: 'Basic',
        commercial: 'Commercial',
        calendar: 'Calendar',
        media: 'Media',
        security: 'Security',
      },
      basic: {
        mainInfo: 'Main Information',
        stageName: 'Stage Name',
        stageNamePlaceholder: 'Enter...',
        realName: 'Real Name',
        realNamePlaceholder: 'Enter...',
        avatar: 'Avatar',
        uploadAvatar: 'Upload',
        coverVideo: 'Cover Video',
        coverVideoPlaceholder: 'YouTube or video link',
        location: 'Location',
        selectCity: 'Select city',
        languages: 'Languages',
        addLanguage: 'Add Language',
        languagePlaceholder: 'Enter language...',
        genres: 'Genres',
        addGenre: 'Add Genre',
        genrePlaceholder: 'Enter genre...',
        format: 'Format',
        solo: 'Solo',
        duo: 'Duo',
        band: 'Band',
        orchestra: 'Orchestra',
        bio: 'Bio',
        bioPlaceholder: 'Tell about yourself...',
        verification: 'Verification',
        verificationStatus: 'Status',
        verified: 'Verified',
        verifiedDescription: 'Profile verified',
        notVerified: 'Not Verified',
        experience: 'Experience (years)',
        yearsPlaceholder: '5',
        totalPerformances: 'Total Performances',
        performancesPlaceholder: '20',
      },
      commercial: {
        pricing: 'Pricing',
        basePrice: 'Base Price',
        basePricePlaceholder: '₸ 200,000',
        priceRanges: 'Price ranges by event types',
        wedding: 'Wedding',
        corporate: 'Corporate',
        private: 'Private',
        minPrice: 'Min',
        maxPrice: 'Max',
        included: 'Included',
        addIncluded: 'Add',
        includedPlaceholder: 'e.g., 2 hours performance',
        additionalServices: 'Additional Services',
        serviceName: 'Service Name',
        servicePrice: 'Price',
        addService: 'Add Service',
      },
      calendar: {
        availability: 'Availability',
        weekdays: 'Weekdays',
        weekends: 'Weekends',
        holidays: 'Holidays',
        travel: 'Travel',
        willingToTravel: 'Willing to Travel',
        travelRegions: 'Travel Regions',
        addRegion: 'Add Region',
      },
      media: {
        portfolio: 'Portfolio',
        audioTracks: 'Audio Tracks',
        addAudio: 'Add Audio',
        trackName: 'Track Name',
        trackUrl: 'Audio Link',
        videos: 'Videos',
        addVideo: 'Add Video',
        videoTitle: 'Video Title',
        videoUrl: 'Video Link',
        photos: 'Photos',
        uploadPhotos: 'Upload Photos',
        photoUrl: 'Photo Link',
      },
      security: {
        accountSecurity: 'Account Security',
        twoFactor: 'Two-Factor Authentication',
        twoFactorDesc: 'Additional security layer',
        notifications: 'Notifications',
        emailNotifications: 'Email Notifications',
        smsNotifications: 'SMS Notifications',
        bookingAlerts: 'Booking Alerts',
        reviewAlerts: 'Review Alerts',
        privacy: 'Privacy',
        profileVisibility: 'Profile Visibility',
        public: 'Public',
        private: 'Private',
        showRealName: 'Show Real Name',
        showPhone: 'Show Phone',
      },
      aiTools: {
        title: 'AI Tools',
        generateDescription: 'Generate Description',
        generateDescriptionDesc: 'AI will create an attractive profile description',
        optimizePricing: 'Optimize Pricing',
        optimizePricingDesc: 'Analyze prices based on market data',
      },
    },
    customerSettings: {
      title: 'Customer Profile Settings',
      subtitle: 'Manage your profile and events',
      saveChanges: 'Save Changes',
      saving: 'Saving...',
      tabs: {
        basic: 'Basic',
        history: 'History',
        reputation: 'Reputation',
        payment: 'Payment',
        team: 'Team',
        security: 'Security',
      },
      basic: {
        mainInfo: 'Main Information',
        customerType: 'Customer Type',
        individual: 'Individual',
        company: 'Company',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your name',
        companyName: 'Company Name',
        companyNamePlaceholder: 'Enter company name',
        city: 'City',
        phone: 'Phone',
        phonePlaceholder: '+7 (777) 123-45-67',
        email: 'Email',
        emailPlaceholder: 'example@example.com',
        avatar: 'Avatar',
        uploadAvatar: 'Upload',
        status: 'Status',
        verified: 'Verified',
        vipStatus: 'VIP Status',
        bio: 'Bio',
        bioPlaceholder: 'Tell about yourself...',
        preferences: 'Preferences',
        eventTypes: 'Event Types',
        addEventType: 'Add',
        budgetRange: 'Budget Range',
        minBudget: 'Min',
        maxBudget: 'Max',
      },
      history: {
        eventHistory: 'Event History',
        totalEvents: 'Total Events',
        activeBookings: 'Active Bookings',
        cancelledEvents: 'Cancelled Events',
        totalSpent: 'Total Spent',
      },
      reputation: {
        customerReputation: 'Customer Reputation',
        rating: 'Rating',
        reliability: 'Reliability',
        reliabilityDesc: 'Level of commitment fulfillment',
        artistReviews: 'Artist Reviews',
        reviewsDesc: 'Reviews from artists',
        status: 'Status',
        statusNew: 'New',
        statusRegular: 'Regular',
        statusVip: 'VIP',
        statusBlacklisted: 'Blacklisted',
      },
      payment: {
        paymentMethods: 'Payment Methods',
        addPaymentMethod: 'Add Method',
        cardNumber: 'Card Number',
        cardNumberPlaceholder: '1234 5678 9012 3456',
        cardHolder: 'Card Holder',
        cardHolderPlaceholder: 'IVANOV IVAN',
        expiryDate: 'Expiry Date',
        expiryPlaceholder: '12/25',
        cvv: 'CVV',
        cvvPlaceholder: '123',
        defaultCard: 'Default Card',
      },
      team: {
        teamManagement: 'Team Management',
        addMember: 'Add Member',
        memberName: 'Name',
        memberRole: 'Role',
        memberEmail: 'Email',
        memberPhone: 'Phone',
        owner: 'Owner',
        manager: 'Manager',
        accountant: 'Accountant',
      },
      security: {
        accountSecurity: 'Account Security',
        twoFactor: 'Two-Factor Authentication',
        twoFactorDesc: 'Additional security layer',
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        updatePassword: 'Update',
        notifications: 'Notifications',
        emailNotifications: 'Email Notifications',
        smsNotifications: 'SMS Notifications',
        bookingAlerts: 'Booking Alerts',
        reviewAlerts: 'Review Alerts',
        paymentAlerts: 'Payment Alerts',
      },
    },
    aiAssistant: {
      title: 'AI Assistant',
      subtitle: 'Help for artists and customers',
      greeting: 'Hello! I am here to help you!',
      inputPlaceholder: 'Enter your query...',
      send: 'Send',
      quickPrompts: {
        wedding: 'Wedding',
        jazzEvening: 'Jazz Evening',
        corporate: 'Corporate Event',
        birthday: 'Birthday Party',
      },
      features: {
        genreSelection: 'Genre Selection',
        groupComposition: 'Group Composition',
        planning: 'Planning',
        analytics: 'Analytics',
      },
    },
    notifications: {
      title: 'Notifications',
      subtitle: 'All your notifications in one place',
      tabs: {
        all: 'All',
        bookings: 'Bookings',
        payments: 'Payments',
        reviews: 'Reviews',
        system: 'System',
      },
      types: {
        newBooking: 'New Booking',
        paymentReceived: 'Payment Received',
        newReview: 'New Review',
        verificationComplete: 'Verification Complete',
        newMessage: 'New Message',
      },
      actions: {
        view: 'View',
        read: 'Read',
        markAllRead: 'Mark All as Read',
        clear: 'Clear',
      },
      empty: 'No notifications',
      timeAgo: {
        minutesAgo: 'minutes ago',
        hoursAgo: 'hours ago',
        daysAgo: 'days ago',
        weeksAgo: 'weeks ago',
      },
    },
    contracts: {
      title: 'Contracts & Digital Signature',
      subtitle: 'Smart contracts, templates, legal documents',
      tabs: {
        active: 'Active',
        templates: 'Templates',
        history: 'History',
        settings: 'Settings',
        signatures: 'EDS',
      },
      templates: {
        title: 'Templates',
        description: 'Ready-made legal templates for different types of events',
        wedding: 'Wedding',
        weddingDesc: 'Standard contract for wedding performance',
        corporate: 'Corporate',
        corporateDesc: 'Contract for corporate clients',
        festival: 'Festival',
        festivalDesc: 'For public events and festivals',
        government: 'Government',
        governmentDesc: 'Special template for government orders',
        restaurant: 'Restaurant',
        restaurantDesc: 'Regular performances at venues',
        private: 'Private',
        privateDesc: 'Birthday, anniversary, etc.',
        clauses: 'clauses',
        readyToUse: 'Ready to use',
      },
      status: {
        draft: 'Draft',
        pending: 'Pending',
        signed: 'Signed',
        active: 'Active',
        completed: 'Completed',
      },
      statuses: {
        draft: 'Draft',
        pending: 'Pending',
        signed: 'Signed',
        active: 'Active',
        completed: 'Completed',
      },
      escrow: {
        none: 'None',
        locked: 'Locked',
        released: 'Released',
        status: 'Status',
        autoTransfer: 'Funds will be automatically transferred to the artist 24 hours after the event',
        lockedBadge: '🔒 Locked',
        releasedBadge: '✅ Released',
      },
      actions: {
        view: 'View',
        sign: 'Sign',
        download: 'Download',
        create: 'Create',
        preview: 'Preview',
        connect: 'Connect',
        createContract: 'Create Contract',
      },
      details: {
        title: 'Contract Details',
        eventType: 'Event Type',
        eventDate: 'Event Date',
        amount: 'Amount',
        signedDate: 'Signed Date',
        penalties: 'Penalties',
        termsAndPenalties: 'Terms and Penalties',
        escrowTitle: 'Escrow Account',
      },
      stats: {
        totalContracts: 'Total Contracts',
        active: 'Active',
        onEscrow: 'On Escrow',
        reliability: 'Reliability',
      },
      penalties: {
        artistCancellation: 'Artist Cancellation',
        artistCancellationDesc: 'Penalty: ₸{amount} (50%)',
        clientCancellation: 'Client Cancellation',
        clientCancellationDesc: '7+ days: 90% refund\nLess than 7 days: ₸{amount}',
        lateArrival: 'Artist Late Arrival',
        lateArrivalDesc: 'More than 30 min: ₸{amount}',
        forceMajeure: '✓ Force Majeure',
        forceMajeureDesc: 'Full refund without penalties',
        penalty: 'Penalty:',
        refund7days: '7+ days: 90% refund',
        refundLess7days: 'Less than 7 days:',
        moreThan30min: 'More than 30 min:',
      },
      selectToView: 'Select contract to view details',
      digitalSignature: {
        title: 'Electronic Digital Signature (EDS)',
        subtitle: 'Legally valid signature for contracts',
        yourSignature: 'Your EDS',
        status: 'Status',
        active: 'Active',
        certificate: 'Certificate',
        validUntil: 'Valid Until',
        integrations: 'Integrations',
        blockchainId: 'Blockchain ID',
        blockchainDesc: 'Decentralized system',
        govTechKz: 'GovTech KZ',
        govTechDesc: 'Government EDS system',
        legalPower: 'Legal Force',
        legalPowerDesc: 'All contracts with EDS have full legal force according to RK legislation and are recognized in court',
        signatureHistory: 'Signature History',
      },
    },
    reputation: {
      title: 'Reputation System',
      subtitle: 'Rating, reviews, and achievements',
      overallScore: 'Overall Score',
      level: 'Level',
      rank: 'Rank',
      metrics: {
        punctuality: 'Punctuality',
        quality: 'Quality',
        professionalism: 'Professionalism',
        audienceWork: 'Audience Work',
        technicalPrep: 'Technical Preparation',
      },
      achievements: {
        title: 'Achievements',
        unlocked: 'Unlocked',
        locked: 'Locked',
        firstSteps: 'First Steps',
        reliableArtist: 'Reliable Artist',
        topRated: 'Top Rated',
        speedster: 'Speedster',
        techMaster: 'Tech Master',
      },
      reviews: {
        title: 'Reviews',
        positive: 'Positive',
        neutral: 'Neutral',
        negative: 'Negative',
      },
    },
    financial: {
      title: 'Financial Profile',
      subtitle: 'Earnings, analytics, and taxes',
      stats: {
        totalEarnings: 'Total Earnings',
        thisMonth: 'This Month',
        averageBooking: 'Average Booking',
        escrowBalance: 'Escrow Balance',
        pendingPayments: 'Pending Payments',
        monthlyGrowth: 'Monthly Growth',
      },
      tabs: {
        overview: 'Overview',
        analytics: 'Analytics',
        transactions: 'Transactions',
        taxes: 'Taxes',
      },
      transactions: {
        recent: 'Recent',
        upcoming: 'Upcoming',
        date: 'Date',
        event: 'Event',
        amount: 'Amount',
        status: 'Status',
      },
      actions: {
        withdraw: 'Withdraw',
        downloadReport: 'Download Report',
        viewDetails: 'View Details',
      },
    },
  },
};