import { Artist, Review } from '../types';
import { allKazakhArtists } from './allKazakhArtists';

// Используем расширенную базу данных казахстанских знаменитостей
// 160 артистов: по 20 в каждом из 8 жанров
export const mockArtists: Artist[] = allKazakhArtists;

// Оставляем оригинальные отзывы
export const mockReviews: Review[] = [
  {
    id: 'r1',
    artistId: '1',
    clientName: 'Асель Мукашева',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asel',
    rating: 5,
    comment: 'Айгерім создала невероятную атмосферу на нашей свадьбе! Гости до сих пор вспоминают её выступление. Профессионализм на высшем уровне!',
    date: '2025-12-15',
    eventType: 'Свадьба'
  },
  {
    id: 'r2',
    artistId: '1',
    clientName: 'Ерлан Садыков',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erlan',
    rating: 5,
    comment: 'Потрясающее исполнение национальных композиций. Рекомендую всем!',
    date: '2025-11-20',
    eventType: 'Корпоратив'
  },
  {
    id: 'r3',
    artistId: '2',
    clientName: 'Алина Жунусова',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alina',
    rating: 5,
    comment: 'DJ Marat - лучший! Танцпол не пустовал ни минуты. Спасибо за незабываемый вечер!',
    date: '2025-12-28',
    eventType: 'Свадьба'
  },
  {
    id: 'r4',
    artistId: '3',
    clientName: 'Бакыт Ахметов',
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bakyt',
    rating: 5,
    comment: 'Камила - вокалистка мирового уровня! Голос просто волшебный. Все гости были в восторге!',
    date: '2025-12-10',
    eventType: 'Юбилей'
  }
];
