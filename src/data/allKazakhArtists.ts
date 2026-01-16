// Главный файл со всеми казахстанскими артистами по жанрам
// 80 артистов: по 8 в каждом из 9 жанров + продакшн-специалисты
import { traditionalArtists } from './kazakhArtists';
import { weddingArtists } from './kazakhArtists';
import { jazzArtists } from './kazakhArtists';
import { allElectronicArtists, classicalArtists } from './kazakhArtistsPart2';
import { popArtists } from './kazakhArtistsPart3';
import { folkArtists } from './kazakhArtistsPart3';
import { dombraArtists } from './kazakhArtistsPart3';
import { hostsAndShowArtists, tamadas, hosts, showmen } from './kazakhArtistsPart3';
import { productionArtists, actors, directors, adDirectors, screenwriters } from './productionArtists';

// Экспорт всех артистов по жанрам
export {
  traditionalArtists,
  weddingArtists,
  jazzArtists,
  classicalArtists,
  popArtists,
  folkArtists,
  dombraArtists,
  hostsAndShowArtists,
  tamadas,
  hosts,
  showmen,
  productionArtists,
  actors,
  directors,
  adDirectors,
  screenwriters
};

// Для обратной совместимости
export const electronicArtists = allElectronicArtists;

// Объединенный массив всех артистов
export const allKazakhArtists = [
  ...traditionalArtists,
  ...weddingArtists,
  ...jazzArtists,
  ...allElectronicArtists,
  ...classicalArtists,
  ...popArtists,
  ...folkArtists,
  ...dombraArtists,
  ...hostsAndShowArtists,
  ...productionArtists
];

// Статистика по жанрам
export const genreStats = {
  traditional: {
    name: 'Традиционная',
    icon: '🎵',
    count: traditionalArtists.length,
    artists: traditionalArtists
  },
  wedding: {
    name: 'Свадебная',
    icon: '💒',
    count: weddingArtists.length,
    artists: weddingArtists
  },
  jazz: {
    name: 'Джаз',
    icon: '.sax',
    count: jazzArtists.length,
    artists: jazzArtists
  },
  electronic: {
    name: 'Электронная',
    icon: '🎧',
    count: electronicArtists.length,
    artists: electronicArtists
  },
  classical: {
    name: 'Классика',
    icon: '🎻',
    count: classicalArtists.length,
    artists: classicalArtists
  },
  pop: {
    name: 'Поп',
    icon: '🎤',
    count: popArtists.length,
    artists: popArtists
  },
  folk: {
    name: 'Фолк',
    icon: '🪕',
    count: folkArtists.length,
    artists: folkArtists
  },
  dombra: {
    name: 'Домбра',
    icon: '🎸',
    count: dombraArtists.length,
    artists: dombraArtists
  },
  hostsAndShowArtists: {
    name: 'Хосты и шоу-артисты',
    icon: '���',
    count: hostsAndShowArtists.length,
    artists: hostsAndShowArtists,
    subcategories: {
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
    }
  },
  production: {
    name: 'Продакшн',
    icon: '🎬',
    count: productionArtists.length,
    artists: productionArtists,
    subcategories: {
      actors: {
        name: 'Актёры',
        icon: '🎭',
        count: actors.length,
        artists: actors
      },
      directors: {
        name: 'Режиссёры',
        icon: '🎬',
        count: directors.length,
        artists: directors
      },
      adDirectors: {
        name: 'Режиссёры рекламы',
        icon: '📹',
        count: adDirectors.length,
        artists: adDirectors
      },
      screenwriters: {
        name: 'Сценаристы',
        icon: '✍️',
        count: screenwriters.length,
        artists: screenwriters
      }
    }
  }
};

// Функция для получения артистов по жанру
export function getArtistsByGenre(genre: string) {
  switch(genre.toLowerCase()) {
    case 'традиционная':
    case 'traditional':
      return traditionalArtists;
    case 'свадебная':
    case 'wedding':
      return weddingArtists;
    case 'джаз':
    case 'jazz':
      return jazzArtists;
    case 'электронная':
    case 'electronic':
      return electronicArtists;
    case 'классика':
    case 'classical':
      return classicalArtists;
    case 'поп':
    case 'pop':
      return popArtists;
    case 'фолк':
    case 'folk':
      return folkArtists;
    case 'домбра':
    case 'dombra':
      return dombraArtists;
    case 'хосты и шоу-артисты':
    case 'hostsandshowartists':
      return hostsAndShowArtists;
    case 'тамада':
    case 'tamadas':
      return tamadas;
    case 'ведущие':
    case 'hosts':
      return hosts;
    case 'шоумены':
    case 'showmen':
      return showmen;
    case 'продакшн':
    case 'production':
      return productionArtists;
    case 'актёры':
    case 'actors':
      return actors;
    case 'режиссёры':
    case 'directors':
      return directors;
    case 'режссёры рекламы':
    case 'ad_directors':
      return adDirectors;
    case 'сценаристы':
    case 'screenwriters':
      return screenwriters;
    default:
      return [];
  }
}

// Всего артистов в базе
export const totalArtistsCount = allKazakhArtists.length;

console.log(`🎵 TuranSound: База данных загружена`);
console.log(`📊 Всего артистов: ${totalArtistsCount}`);