// ========================================
// ТРЕХСЛОЙНАЯ АРХИТЕКТУРА КАТАЛОГА
// ========================================

// СЛОЙ 1: КТО ЭТО (Разделы каталога)
export type ArtistSection = 
  | 'stage_artists'      // Артисты сцены
  | 'hosts_and_shows'    // Ведущие и шоу
  | 'creative_production'; // Креатив и продакшн

// СЛОЙ 2: ЧТО ОНИ ДЕЛАЮТ (Роли)
export type ArtistRole =
  // Музыкальные роли
  | 'musician'           // Исполнитель
  | 'dj'                 // DJ
  | 'ensemble'           // Ансамбль
  | 'orchestra'          // Оркестр
  | 'folk_artist'        // Фольклорный артист
  | 'karaoke_host'       // Караоке-ведущий
  | 'composer'           // Композитор
  | 'arranger'           // Аранжировщик
  | 'lyricist'           // Поэт песен
  | 'sound_designer'     // Саунд-дизайнер
  // Ивент-роли
  | 'tamada'             // Тамада
  | 'host'               // Ведущий
  | 'showman'            // Шоумен
  // Продакшн-роли
  | 'actor'              // Актёр
  | 'director'           // Режиссёр
  | 'ad_director'        // Режиссёр рекламы
  | 'screenwriter';      // Сценарист

// СЛОЙ 3: СТИЛИ И ФОРМАТЫ

// Музыкальные жанры
export type MusicGenre =
  | 'pop'
  | 'rock'
  | 'jazz'
  | 'classical'
  | 'hip_hop'
  | 'electronic'
  | 'folk'
  | 'traditional'
  | 'blues'
  | 'country'
  | 'reggae'
  | 'latin';

// Национальные стили
export type NationalStyle =
  | 'dombra'             // Домбра
  | 'kobyz'              // Кобыз
  | 'ethno'              // Этно
  | 'kazakh_traditional' // Казахская традиционная
  | 'uzbek_traditional'  // Узбекская традиционная
  | 'kyrgyz_traditional' // Кыргызская традиционная
  | 'turkmen_traditional'; // Туркменская традиционная

// Шоу и развлечения
export type EntertainmentGenre =
  | 'host'               // Ведущий
  | 'entertainment'      // Развлечения
  | 'show'               // Шоу
  | 'comedy'             // Комедия
  | 'magic'              // Магия/Иллюзии
  | 'dance'              // Танцы
  | 'kids';              // Детские развлечения

// Форматы мероприятий
export type EventFormat =
  | 'wedding'            // Свадьба
  | 'corporate'          // Корпоратив
  | 'festival'           // Фестиваль
  | 'private_event'      // Частное мероприятие
  | 'concert'            // Концерт
  | 'club'               // Клуб
  | 'restaurant'         // Ресторан
  | 'birthday'           // День рождения
  | 'anniversary';       // Юбилей

// ========================================
// ИНТЕРФЕЙС АРТИСТА
// ========================================

export interface Artist {
  id: string;
  name: string;
  stageName: string;
  avatar: string;
  city: string;
  region: string;
  
  // СЛОЙ 1: Раздел (один)
  section: ArtistSection;
  
  // СЛОЙ 2: Роли (массив - может быть несколько)
  roles: ArtistRole[];
  
  // СЛОЙ 3: Жанры и стили (массивы)
  genres: MusicGenre[];
  nationalStyles?: NationalStyle[];
  eventFormats: EventFormat[];
  
  // Портфолио
  bio: string;
  experience: number; // лет опыта
  videos?: string[];
  photos?: string[];
  audio?: string[];
  
  // Финансы
  priceFrom: number;
  priceTo?: number;
  currency: 'KZT' | 'USD';
  
  // Репутация
  rating: number;
  reviewCount: number;
  bookingCount: number;
  
  // Даты
  createdAt: string;
  isVerified: boolean;
  isAvailable: boolean;
}

// ========================================
// КОНСТ��НТЫ ДЛЯ UI
// ========================================

export const SECTION_LABELS: Record<ArtistSection, string> = {
  stage_artists: 'Артисты сцены',
  hosts_and_shows: 'Ведущие и шоу',
  creative_production: 'Креатив и продакшн'
};

export const SECTION_DESCRIPTIONS: Record<ArtistSection, string> = {
  stage_artists: 'Музыканты, DJ, ансамбли и оркестры',
  hosts_and_shows: 'Тамада, ведущие и шоумены',
  creative_production: 'Композиторы, режиссёры и сценаристы'
};

export const ROLE_LABELS: Record<ArtistRole, string> = {
  musician: 'Музыкант',
  dj: 'DJ',
  ensemble: 'Ансамбль',
  orchestra: 'Оркестр',
  folk_artist: 'Фольклорный артист',
  karaoke_host: 'Караоке-ведущий',
  composer: 'Композитор',
  arranger: 'Аранжировщик',
  lyricist: 'Поэт песен',
  sound_designer: 'Саунд-дизайнер',
  tamada: 'Тамада',
  host: 'Ведущий',
  showman: 'Шоумен',
  actor: 'Актёр',
  director: 'Режиссёр',
  ad_director: 'Режиссёр рекламы',
  screenwriter: 'Сценарист'
};

export const GENRE_LABELS: Record<MusicGenre, string> = {
  pop: 'Поп',
  rock: 'Рок',
  jazz: 'Джаз',
  classical: 'Классика',
  hip_hop: 'Хип-хоп',
  electronic: 'Электронная',
  folk: 'Фолк',
  traditional: 'Традиционная',
  blues: 'Блюз',
  country: 'Кантри',
  reggae: 'Регги',
  latin: 'Латина'
};

export const NATIONAL_STYLE_LABELS: Record<NationalStyle, string> = {
  dombra: 'Домбра',
  kobyz: 'Кобыз',
  ethno: 'Этно',
  kazakh_traditional: 'Казахская традиционная',
  uzbek_traditional: 'Узбекская традиционная',
  kyrgyz_traditional: 'Кыргызская традиционная',
  turkmen_traditional: 'Туркменская традиционная'
};

export const EVENT_FORMAT_LABELS: Record<EventFormat, string> = {
  wedding: 'Свадьба',
  corporate: 'Корпоратив',
  festival: 'Фестиваль',
  private_event: 'Частное мероприятие',
  concert: 'Концерт',
  club: 'Клуб',
  restaurant: 'Ресторан',
  birthday: 'День рождения',
  anniversary: 'Юбилей'
};

// Роли по разделам (для удобства фильтрации)
export const ROLES_BY_SECTION: Record<ArtistSection, ArtistRole[]> = {
  stage_artists: [
    'musician',
    'dj',
    'ensemble',
    'orchestra',
    'folk_artist',
    'karaoke_host'
  ],
  hosts_and_shows: [
    'tamada',
    'host',
    'showman'
  ],
  creative_production: [
    'composer',
    'arranger',
    'lyricist',
    'sound_designer',
    'actor',
    'director',
    'ad_director',
    'screenwriter'
  ]
};