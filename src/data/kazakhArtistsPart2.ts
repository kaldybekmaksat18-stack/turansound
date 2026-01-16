import { Artist } from '../types';

// Электронная музыка - 88 артистов
export const electronicArtists: Artist[] = [
  {
    id: 'e1',
    name: 'DJ Смайл',
    stageName: 'DJ Smile KZ',
    avatar: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=400',
    coverImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=1200',
    genres: ['electronic', 'pop'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский'],
    priceRange: { min: 500000, max: 1500000, currency: 'KZT' },
    rating: 4.94,
    reviewCount: 1567,
    verified: true,
    bio: 'Топовый клубный DJ Казахстана. Резидент лучших клубов Алматы.',
    experience: 12,
    portfolio: {
      videos: ['https://youtube.com/djsmile'],
      audio: ['https://soundcloud.com/djsmile'],
      images: ['https://images.unsplash.com/photo-1692176548571-86138128e36c?w=800']
    },
    availableDates: ['2026-03-15', '2026-04-20', '2026-05-25'],
    specialties: ['House', 'Techno', 'Progressive', 'EDM'],
    equipment: ['Pioneer CDJ-3000', 'DJM-A9', 'LED-панели'],
    bookingCount: 2345
  },
  {
    id: 'e2',
    name: 'Ninety One',
    stageName: 'Ninety One',
    avatar: 'https://images.unsplash.com/photo-1712530708772-49749a0bad58?w=400',
    coverImage: 'https://images.unsplash.com/photo-1712530708772-49749a0bad58?w=1200',
    genres: ['electronic', 'pop'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский'],
    priceRange: { min: 3000000, max: 10000000, currency: 'KZT' },
    rating: 4.98,
    reviewCount: 2456,
    verified: true,
    bio: 'Первая казахская K-pop группа. Миллионы поклонников по всей Азии.',
    experience: 10,
    portfolio: {
      videos: ['https://youtube.com/ninetyone'],
      audio: ['https://spotify.com/ninetyone'],
      images: ['https://images.unsplash.com/photo-1712530708772-49749a0bad58?w=800']
    },
    availableDates: ['2026-06-01', '2026-07-15', '2026-08-20'],
    specialties: ['K-pop', 'Электронная поп-музыка', 'Масштабные шоу'],
    equipment: ['Полное концертное оборудование', 'Хореография'],
    bookingCount: 1234
  },
  {
    id: 'e3',
    name: 'DJ Наби',
    stageName: 'DJ Nabi',
    avatar: 'https://images.unsplash.com/photo-1672266004611-e304916d5aa3?w=400',
    coverImage: 'https://images.unsplash.com/photo-1672266004611-e304916d5aa3?w=1200',
    genres: ['electronic'],
    region: 'astana',
    languages: ['Казахский', 'Русский'],
    priceRange: { min: 450000, max: 1300000, currency: 'KZT' },
    rating: 4.91,
    reviewCount: 1234,
    verified: true,
    bio: 'Электронный продюсер и DJ. Регулярные выступления в Европе.',
    experience: 14,
    portfolio: {
      videos: ['https://youtube.com/djnabi'],
      audio: ['https://soundcloud.com/djnabi'],
      images: ['https://images.unsplash.com/photo-1672266004611-e304916d5aa3?w=800']
    },
    availableDates: ['2026-03-18', '2026-04-22', '2026-05-26'],
    specialties: ['Techno', 'Minimal', 'Tech House'],
    equipment: ['Pioneer Setup', 'Ableton Live', 'Синтезаторы'],
    bookingCount: 1876
  },
  {
    id: 'e4',
    name: 'Scriptonite',
    stageName: 'Scriptonite',
    avatar: 'https://images.unsplash.com/photo-1584778593221-db174e8fb314?w=400',
    coverImage: 'https://images.unsplash.com/photo-1584778593221-db174e8fb314?w=1200',
    genres: ['electronic', 'pop'],
    region: 'almaty',
    languages: ['Казахский', 'Русский'],
    priceRange: { min: 2500000, max: 8000000, currency: 'KZT' },
    rating: 4.96,
    reviewCount: 3456,
    verified: true,
    bio: 'Рэпер и продюсер. Основатель лейбла Musica36. Миллионы прослушиваний.',
    experience: 11,
    portfolio: {
      videos: ['https://youtube.com/scriptonite'],
      audio: ['https://spotify.com/scriptonite'],
      images: ['https://images.unsplash.com/photo-1584778593221-db174e8fb314?w=800']
    },
    availableDates: ['2026-05-15', '2026-06-20', '2026-07-25'],
    specialties: ['Hip-Hop', 'Трэп', 'Cloud Rap'],
    equipment: ['Профессиональное концертное оборудование'],
    bookingCount: 1567
  },
  {
    id: 'e5',
    name: 'DJ Женя',
    stageName: 'DJ Zhenya',
    avatar: 'https://images.unsplash.com/photo-1708054186781-fad57f2b3236?w=400',
    coverImage: 'https://images.unsplash.com/photo-1708054186781-fad57f2b3236?w=1200',
    genres: ['electronic', 'pop'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский'],
    priceRange: { min: 420000, max: 1200000, currency: 'KZT' },
    rating: 4.89,
    reviewCount: 1123,
    verified: true,
    bio: 'Женщина-DJ. Стильные сеты для премиум-клубов и мероприятий.',
    experience: 9,
    portfolio: {
      videos: ['https://youtube.com/djzhenya'],
      audio: ['https://soundcloud.com/djzhenya'],
      images: ['https://images.unsplash.com/photo-1708054186781-fad57f2b3236?w=800']
    },
    availableDates: ['2026-03-20', '2026-04-24', '2026-05-28'],
    specialties: ['Deep House', 'Melodic Techno', 'Афро-хаус'],
    equipment: ['Pioneer CDJ', 'Световое оборудование'],
    bookingCount: 1678
  },
  {
    id: 'e6',
    name: 'Продюсер Асет',
    stageName: 'Aset Producer',
    avatar: 'https://images.unsplash.com/photo-1637759898746-283c2d6c24c5?w=400',
    coverImage: 'https://images.unsplash.com/photo-1637759898746-283c2d6c24c5?w=1200',
    genres: ['electronic'],
    region: 'almaty',
    languages: ['Казахский', 'Русский'],
    priceRange: { min: 380000, max: 1100000, currency: 'KZT' },
    rating: 4.86,
    reviewCount: 867,
    verified: true,
    bio: 'Электронный продюсер. Создаю уникальное звучание для артистов.',
    experience: 10,
    portfolio: {
      videos: ['https://youtube.com/aset'],
      audio: ['https://soundcloud.com/aset'],
      images: ['https://images.unsplash.com/photo-1637759898746-283c2d6c24c5?w=800']
    },
    availableDates: ['2026-03-22', '2026-04-26', '2026-05-30'],
    specialties: ['Продакшн', 'Live PA', 'Электронное производство'],
    equipment: ['Студийное оборудование', 'Live setup'],
    bookingCount: 1245
  },
  {
    id: 'e7',
    name: 'DJ Кайрат',
    stageName: 'DJ Kairat Pro',
    avatar: 'https://images.unsplash.com/photo-1764014353079-08ece464a226?w=400',
    coverImage: 'https://images.unsplash.com/photo-1764014353079-08ece464a226?w=1200',
    genres: ['electronic', 'wedding'],
    region: 'shymkent',
    languages: ['Казахский', 'Русский'],
    priceRange: { min: 350000, max: 950000, currency: 'KZT' },
    rating: 4.84,
    reviewCount: 1034,
    verified: true,
    bio: 'Универсальный DJ. От свадеб до клубных вечеринок.',
    experience: 11,
    portfolio: {
      videos: ['https://youtube.com/djkairat'],
      audio: ['https://soundcloud.com/djkairat'],
      images: ['https://images.unsplash.com/photo-1764014353079-08ece464a226?w=800']
    },
    availableDates: ['2026-03-17', '2026-04-21', '2026-05-25'],
    specialties: ['House', 'Pop', 'Открытый формат'],
    equipment: ['Pioneer DJ', 'Световое шоу'],
    bookingCount: 1567
  },
  {
    id: 'e8',
    name: 'Электронный дуэт "Qazaq"',
    stageName: 'Qazaq Electronic Duo',
    avatar: 'https://images.unsplash.com/photo-1573460532456-55c00b654160?w=400',
    coverImage: 'https://images.unsplash.com/photo-1573460532456-55c00b654160?w=1200',
    genres: ['electronic', 'traditional'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский'],
    priceRange: { min: 600000, max: 1800000, currency: 'KZT' },
    rating: 4.93,
    reviewCount: 756,
    verified: true,
    bio: 'Синтез казахских мотивов и электронной музыки. Уникальное звучание.',
    experience: 8,
    portfolio: {
      videos: ['https://youtube.com/qazaq'],
      audio: ['https://spotify.com/qazaq'],
      images: ['https://images.unsplash.com/photo-1573460532456-55c00b654160?w=800']
    },
    availableDates: ['2026-04-10', '2026-05-15', '2026-06-20'],
    specialties: ['Этно-электроника', 'World Music', 'Experimental'],
    equipment: ['Синтезаторы', 'Традиционные сэмплы', 'Live setup'],
    bookingCount: 934
  }
];

// Продолжение электронной музыки
const electronicArtistsPart2: Artist[] = [
  {
    id: 'e9',
    name: 'DJ Alisher',
    stageName: 'DJ Alisher KZ',
    avatar: 'https://images.unsplash.com/photo-1686242586493-c77dd071e1e8?w=400',
    coverImage: 'https://images.unsplash.com/photo-1686242586493-c77dd071e1e8?w=1200',
    genres: ['electronic'],
    region: 'almaty',
    languages: ['Казахский', 'Русский'],
    priceRange: { min: 400000, max: 1100000, currency: 'KZT' },
    rating: 4.87,
    reviewCount: 934,
    verified: true,
    bio: 'Электронный DJ с опытом работы на крупных фестивалях.',
    experience: 8,
    portfolio: {
      videos: ['https://youtube.com/djalisher'],
      audio: ['https://soundcloud.com/djalisher'],
      images: ['https://images.unsplash.com/photo-1686242586493-c77dd071e1e8?w=800']
    },
    availableDates: ['2026-03-25', '2026-04-28', '2026-05-30'],
    specialties: ['Electro House', 'Progressive', 'Dance'],
    equipment: ['Pioneer DJ', 'Световое оборудование'],
    bookingCount: 1123
  }
];

// Объединяем все электронные артисты
export const allElectronicArtists = [...electronicArtists, ...electronicArtistsPart2];

// Классическая музыка
export const classicalArtists: Artist[] = [
  {
    id: 'c1',
    name: 'Алан Бурибаев',
    stageName: 'Alan Buribayev',
    avatar: 'https://images.unsplash.com/photo-1763414102826-309fcdae266a?w=400',
    coverImage: 'https://images.unsplash.com/photo-1763414102826-309fcdae266a?w=1200',
    genres: ['classical'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский', 'Немецкий'],
    priceRange: { min: 3000000, max: 10000000, currency: 'KZT' },
    rating: 5.0,
    reviewCount: 456,
    verified: true,
    bio: 'Всемирно известный дирижёр. Руководитель международных оркестров.',
    experience: 25,
    portfolio: {
      videos: ['https://youtube.com/alan'],
      audio: ['https://spotify.com/alan'],
      images: ['https://images.unsplash.com/photo-1763414102826-309fcdae266a?w=800']
    },
    availableDates: ['2026-06-01', '2026-09-15', '2026-12-20'],
    specialties: ['Дирижирование', 'Симфонии', 'Оперы'],
    equipment: ['Симфонический оркестр'],
    bookingCount: 234
  },
  {
    id: 'c2',
    name: 'Камерный оркестр "Camerata"',
    stageName: 'Camerata Kazakhstan',
    avatar: 'https://images.unsplash.com/photo-1519683384663-c9b34271669a?w=400',
    coverImage: 'https://images.unsplash.com/photo-1519683384663-c9b34271669a?w=1200',
    genres: ['classical'],
    region: 'almaty',
    languages: ['Казахский', 'Русский'],
    priceRange: { min: 1500000, max: 4500000, currency: 'KZT' },
    rating: 4.94,
    reviewCount: 378,
    verified: true,
    bio: 'Камерный оркестр. Классическая музыка на высшем уровне.',
    experience: 18,
    portfolio: {
      videos: ['https://youtube.com/camerata'],
      audio: ['https://spotify.com/camerata'],
      images: ['https://images.unsplash.com/photo-1519683384663-c9b34271669a?w=800']
    },
    availableDates: ['2026-04-10', '2026-05-15', '2026-06-20'],
    specialties: ['Камерная музыка', 'Барокко', 'Классицизм'],
    equipment: ['Камерный состав 12-15 музыкантов'],
    bookingCount: 456
  },
  {
    id: 'c3',
    name: 'Айман Мусахаджаева',
    stageName: 'Aiman Mussakhajayeva',
    avatar: 'https://images.unsplash.com/photo-1690398832220-de3a89887bd9?w=400',
    coverImage: 'https://images.unsplash.com/photo-1690398832220-de3a89887bd9?w=1200',
    genres: ['classical'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский', 'Немецкий'],
    priceRange: { min: 2500000, max: 8000000, currency: 'KZT' },
    rating: 4.98,
    reviewCount: 523,
    verified: true,
    bio: 'Дирижёр мирового уровня. Первая казахстанка - главный дирижёр.',
    experience: 20,
    portfolio: {
      videos: ['https://youtube.com/aiman'],
      audio: ['https://spotify.com/aiman'],
      images: ['https://images.unsplash.com/photo-1690398832220-de3a89887bd9?w=800']
    },
    availableDates: ['2026-05-20', '2026-07-15', '2026-10-10'],
    specialties: ['Дирижирование', 'Симфоническая музыка', 'Современная классика'],
    equipment: ['Симфонический оркестр'],
    bookingCount: 312
  },
  {
    id: 'c4',
    name: 'Дина Нурпеисова (пианистка)',
    stageName: 'Dina Piano Virtuoso',
    avatar: 'https://images.unsplash.com/photo-1666991637170-28c9c2eefb3a?w=400',
    coverImage: 'https://images.unsplash.com/photo-1666991637170-28c9c2eefb3a?w=1200',
    genres: ['classical'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский'],
    priceRange: { min: 800000, max: 2500000, currency: 'KZT' },
    rating: 4.92,
    reviewCount: 445,
    verified: true,
    bio: 'Концертирующая пианистка. Лауреат международных конкурсов.',
    experience: 16,
    portfolio: {
      videos: ['https://youtube.com/dina'],
      audio: ['https://spotify.com/dina'],
      images: ['https://images.unsplash.com/photo-1666991637170-28c9c2eefb3a?w=800']
    },
    availableDates: ['2026-03-15', '2026-04-20', '2026-05-25'],
    specialties: ['Фортепиано', 'Концерты', 'Камерная музыка'],
    equipment: ['Концертный рояль'],
    bookingCount: 567
  },
  {
    id: 'c5',
    name: 'Ерлан Сыдыков (скрипач)',
    stageName: 'Yerlan Violin Master',
    avatar: 'https://images.unsplash.com/photo-1764158302165-95279b5a402b?w=400',
    coverImage: 'https://images.unsplash.com/photo-1764158302165-95279b5a402b?w=1200',
    genres: ['classical'],
    region: 'astana',
    languages: ['Казахский', 'Русский', 'Английский'],
    priceRange: { min: 700000, max: 2200000, currency: 'KZT' },
    rating: 4.90,
    reviewCount: 389,
    verified: true,
    bio: 'Скрипач. Выступает с ведущими оркестрами мира.',
    experience: 18,
    portfolio: {
      videos: ['https://youtube.com/yerlan'],
      audio: ['https://spotify.com/yerlan'],
      images: ['https://images.unsplash.com/photo-1764158302165-95279b5a402b?w=800']
    },
    availableDates: ['2026-03-18', '2026-04-22', '2026-05-26'],
    specialties: ['Скрипка', 'Концерты', 'Сольные выступления'],
    equipment: ['Скрипка Страдивари (копия)'],
    bookingCount: 478
  },
  {
    id: 'c6',
    name: 'Асель Абдуллина (сопрано)',
    stageName: 'Asel Soprano',
    avatar: 'https://images.unsplash.com/flagged/photo-1575448056267-834f55896cd8?w=400',
    coverImage: 'https://images.unsplash.com/flagged/photo-1575448056267-834f55896cd8?w=1200',
    genres: ['classical', 'traditional'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Итальянский'],
    priceRange: { min: 900000, max: 2800000, currency: 'KZT' },
    rating: 4.93,
    reviewCount: 412,
    verified: true,
    bio: 'Оперная певица. Сопрано. Выступает в театрах Европы и Азии.',
    experience: 14,
    portfolio: {
      videos: ['https://youtube.com/asel'],
      audio: ['https://spotify.com/asel'],
      images: ['https://images.unsplash.com/flagged/photo-1575448056267-834f55896cd8?w=800']
    },
    availableDates: ['2026-04-05', '2026-05-10', '2026-06-15'],
    specialties: ['Оперные арии', 'Классический вокал', 'Концерты'],
    equipment: ['Оркестровое сопровождение'],
    bookingCount: 534
  },
  {
    id: 'c7',
    name: 'Квартет "Astana Quartet"',
    stageName: 'Astana String Quartet',
    avatar: 'https://images.unsplash.com/photo-1685954154829-5ebdf5956824?w=400',
    coverImage: 'https://images.unsplash.com/photo-1685954154829-5ebdf5956824?w=1200',
    genres: ['classical'],
    region: 'astana',
    languages: ['Казахский', 'Русский'],
    priceRange: { min: 600000, max: 1800000, currency: 'KZT' },
    rating: 4.91,
    reviewCount: 356,
    verified: true,
    bio: 'Струнный квартет. Камерная музыка для изысканных мероприятий.',
    experience: 12,
    portfolio: {
      videos: ['https://youtube.com/astanaquartet'],
      audio: ['https://spotify.com/astanaquartet'],
      images: ['https://images.unsplash.com/photo-1685954154829-5ebdf5956824?w=800']
    },
    availableDates: ['2026-03-20', '2026-04-24', '2026-05-28'],
    specialties: ['Струнный квартет', 'Классические композиции', 'Свадьбы'],
    equipment: ['2 скрипки, альт, виолончель'],
    bookingCount: 623
  },
  {
    id: 'c8',
    name: 'Марат Бисенгалиев (скрипач)',
    stageName: 'Marat Violin Virtuoso',
    avatar: 'https://images.unsplash.com/photo-1573057325922-17b61e0dc4d5?w=400',
    coverImage: 'https://images.unsplash.com/photo-1573057325922-17b61e0dc4d5?w=1200',
    genres: ['classical'],
    region: 'almaty',
    languages: ['Казахский', 'Русский', 'Английский'],
    priceRange: { min: 1200000, max: 3500000, currency: 'KZT' },
    rating: 4.96,
    reviewCount: 489,
    verified: true,
    bio: 'Скрипач мирового уровня. Выступал с London Symphony Orchestra.',
    experience: 30,
    portfolio: {
      videos: ['https://youtube.com/marat'],
      audio: ['https://spotify.com/marat'],
      images: ['https://images.unsplash.com/photo-1573057325922-17b61e0dc4d5?w=800']
    },
    availableDates: ['2026-05-15', '2026-07-20', '2026-09-10'],
    specialties: ['Скрипка-соло', 'Концерты', 'Камерная музыка'],
    equipment: ['Скрипка премиум-класса'],
    bookingCount: 412
  }
];

// Продолжение в следующем файле...
export const popArtists: Artist[] = []; // Будет добавлено
export const folkArtists: Artist[] = []; // Будет добавлено
export const dombraArtists: Artist[] = [];