import { Artist } from '../types/artist';

// ========================================
// ВЕДУЩИЕ И ШОУ: Казахстанские специалисты
// ========================================

// ТАМАДА - 3 артиста
export const tamadas: Artist[] = [
  {
    id: 'tamada-1',
    name: 'Айдар Сарсенбаев',
    stageName: 'Айдар Тамада',
    avatar: 'https://images.unsplash.com/photo-1556020250007-0b5270b9c312?w=400',
    city: 'Алматы',
    region: 'Алматинская область',
    section: 'hosts_and_shows',
    roles: ['tamada'],
    genres: [],
    eventFormats: ['wedding', 'birthday', 'anniversary', 'private_event'],
    bio: 'Профессиональный тамада с 20-летним опытом. Специализируюсь на традиционных казахских свадьбах и семейных торжествах. Знаток национальных обычаев и традиций. Создаю атмосферу праздника с соблюдением всех традиций.',
    experience: 20,
    videos: ['https://youtube.com/aidar-tamada'],
    photos: ['https://images.unsplash.com/photo-1556020250007-0b5270b9c312?w=800'],
    priceFrom: 800000,
    priceTo: 2500000,
    currency: 'KZT',
    rating: 4.93,
    reviewCount: 1456,
    bookingCount: 892,
    createdAt: '2024-01-10',
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'tamada-2',
    name: 'Гульнара Калиева',
    stageName: 'Гульнара Той',
    avatar: 'https://images.unsplash.com/photo-1543949944-4ec048652976?w=400',
    city: 'Астана',
    region: 'Акмолинская область',
    section: 'hosts_and_shows',
    roles: ['tamada'],
    genres: [],
    eventFormats: ['wedding', 'anniversary', 'birthday', 'private_event'],
    bio: 'Тамада-профессионал для семейных торжеств. Более 15 лет провожу свадьбы, юбилеи и семейные праздники. Знаю все традиционные обряды, работаю на казахском и русском языках. Создаю теплую семейную атмосферу.',
    experience: 15,
    videos: ['https://youtube.com/gulnara-toy'],
    photos: ['https://images.unsplash.com/photo-1543949944-4ec048652976?w=800'],
    priceFrom: 600000,
    priceTo: 2000000,
    currency: 'KZT',
    rating: 4.88,
    reviewCount: 1234,
    bookingCount: 756,
    createdAt: '2024-02-15',
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'tamada-3',
    name: 'Ерлан Мухамедов',
    stageName: 'Ерлан Той-баши',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    city: 'Шымкент',
    region: 'Туркестанская область',
    section: 'hosts_and_shows',
    roles: ['tamada'],
    genres: [],
    eventFormats: ['wedding', 'anniversary', 'birthday'],
    bio: 'Опытный тамада южного региона. 18 лет работы на семейных торжествах. Глубокое знание традиций и обычаев. Веду мероприятия на казахском, русском и узбекском языках. Умею создать незабываемую атмосферу праздника.',
    experience: 18,
    videos: ['https://youtube.com/yerlan-toybashi'],
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800'],
    priceFrom: 500000,
    priceTo: 1800000,
    currency: 'KZT',
    rating: 4.85,
    reviewCount: 987,
    bookingCount: 623,
    createdAt: '2024-03-20',
    isVerified: true,
    isAvailable: true
  }
];

// ВЕДУЩИЕ - 3 артиста
export const hosts: Artist[] = [
  {
    id: 'host-1',
    name: 'Азамат Мусагалиев',
    stageName: 'Azamat Show',
    avatar: 'https://images.unsplash.com/photo-1504609747209-9e6c991d30bf?w=400',
    city: 'Алматы',
    region: 'Алматинская область',
    section: 'hosts_and_shows',
    roles: ['host'],
    genres: [],
    eventFormats: ['corporate', 'festival', 'concert', 'private_event'],
    bio: 'Профессиональный ведущий корпоративных и развлекательных мероприятий. Опыт работы на телевидении. Провожу конференции, презентации, корпоративы, концерты. Двуязычный формат. Высокий уровень энергетики и вовлечения аудитории.',
    experience: 14,
    videos: ['https://youtube.com/azamat-show'],
    photos: ['https://images.unsplash.com/photo-1504609747209-9e6c991d30bf?w=800'],
    priceFrom: 1500000,
    priceTo: 4500000,
    currency: 'KZT',
    rating: 4.96,
    reviewCount: 1845,
    bookingCount: 1123,
    createdAt: '2024-01-05',
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'host-2',
    name: 'Дина Нурпеисова',
    stageName: 'Dina Events',
    avatar: 'https://images.unsplash.com/photo-1585440499446-15a19d519495?w=400',
    city: 'Астана',
    region: 'Акмолинская область',
    section: 'hosts_and_shows',
    roles: ['host'],
    genres: [],
    eventFormats: ['corporate', 'festival', 'private_event', 'wedding'],
    bio: 'Ведущая премиум-мероприятий и корпоративных событий. Более 12 лет опыта работы с крупнейшими компаниями Казахстана. Провожу бизнес-конференции, форумы, презентации продуктов, корпоративные вечера. Элегантность и профессионализм.',
    experience: 12,
    videos: ['https://youtube.com/dina-events'],
    photos: ['https://images.unsplash.com/photo-1585440499446-15a19d519495?w=800'],
    priceFrom: 1200000,
    priceTo: 3800000,
    currency: 'KZT',
    rating: 4.92,
    reviewCount: 1456,
    bookingCount: 967,
    createdAt: '2024-02-18',
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'host-3',
    name: 'Камила Бекова',
    stageName: 'Kamila Premium',
    avatar: 'https://images.unsplash.com/photo-1519048353274-7ea097fca86f?w=400',
    city: 'Алматы',
    region: 'Алматинская область',
    section: 'hosts_and_shows',
    roles: ['host'],
    genres: [],
    eventFormats: ['corporate', 'festival', 'private_event', 'concert'],
    bio: 'Ведущая с опытом работы на телевидении и радио. Специализируюсь на модных показах, премиум-мероприятиях, светских вечерах. Безупречная дикция, харизма, знание протокола. Работала с международными брендами.',
    experience: 10,
    videos: ['https://youtube.com/kamila-premium'],
    photos: ['https://images.unsplash.com/photo-1519048353274-7ea097fca86f?w=800'],
    priceFrom: 1100000,
    priceTo: 3500000,
    currency: 'KZT',
    rating: 4.89,
    reviewCount: 1123,
    bookingCount: 845,
    createdAt: '2024-03-25',
    isVerified: true,
    isAvailable: true
  }
];

// ШОУМЕНЫ - 2 артиста
export const showmen: Artist[] = [
  {
    id: 'showman-1',
    name: 'Нурлан Койшибаев',
    stageName: 'Nurlan Energy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    city: 'Алматы',
    region: 'Алматинская область',
    section: 'hosts_and_shows',
    roles: ['showman'],
    genres: [],
    eventFormats: ['corporate', 'festival', 'concert', 'club', 'private_event'],
    bio: 'Шоумен и аниматор развлекательных программ. Специализируюсь на энергичных шоу, интерактивных программах, конкурсах. Работаю с аудиторией любого возраста. Stand-up comedy, импровизация, музыкальные номера. Создаю незабываемое веселье.',
    experience: 13,
    videos: ['https://youtube.com/nurlan-energy'],
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800'],
    priceFrom: 1000000,
    priceTo: 3200000,
    currency: 'KZT',
    rating: 4.94,
    reviewCount: 1567,
    bookingCount: 1034,
    createdAt: '2024-02-05',
    isVerified: true,
    isAvailable: true
  },
  {
    id: 'showman-2',
    name: 'Тимур Асанов',
    stageName: 'Timur Fire Show',
    avatar: 'https://images.unsplash.com/photo-1533174072556-7a4b876ad7a9?w=400',
    city: 'Астана',
    region: 'Акмолинская область',
    section: 'hosts_and_shows',
    roles: ['showman'],
    genres: [],
    eventFormats: ['festival', 'corporate', 'club', 'concert', 'private_event'],
    bio: 'Шоумен и артист огненного шоу. Зрелищные выступления с огнем, пиротехникой и акробатикой. Провожу интерактивные развлекательные программы. Работаю на открытых площадках и в помещениях. Яркие незабываемые номера.',
    experience: 11,
    videos: ['https://youtube.com/timur-fireshow'],
    photos: ['https://images.unsplash.com/photo-1533174072556-7a4b876ad7a9?w=800'],
    priceFrom: 800000,
    priceTo: 2800000,
    currency: 'KZT',
    rating: 4.91,
    reviewCount: 1289,
    bookingCount: 867,
    createdAt: '2024-04-10',
    isVerified: true,
    isAvailable: true
  }
];

// Экспорт всех ведущих и шоу-артистов
export const hostsAndShowArtists: Artist[] = [
  ...tamadas,
  ...hosts,
  ...showmen
];

// Статистика по ролям
export const hostsAndShowStats = {
  tamadas: {
    name: 'Тамада',
    icon: '🎊',
    count: tamadas.length,
    artists: tamadas
  },
  hosts: {
    name: 'Ведущие',
    icon: '🎤',
    count: hosts.length,
    artists: hosts
  },
  showmen: {
    name: 'Шоумены',
    icon: '🎭',
    count: showmen.length,
    artists: showmen
  }
};
