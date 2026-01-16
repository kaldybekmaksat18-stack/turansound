// Тестовый файл для проверки импортов
import { allKazakhArtists, totalArtistsCount } from './data/allKazakhArtists';
import { mockArtists } from './data/mockData';

console.log('✅ Импорты успешно загружены!');
console.log(`📊 Всего артистов: ${totalArtistsCount}`);
console.log(`📊 Mock артисты: ${mockArtists.length}`);
console.log(`📊 Все казахстанские артисты: ${allKazakhArtists.length}`);
