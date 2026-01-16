import { Artist } from '../types';
import { ArtistSection, ArtistRole } from '../types/artist';

/**
 * Маппинг старых артистов (без section/roles) в новый формат
 * для поддержки трехслойной архитектуры фильтрации
 */
export function mapLegacyArtistToNewFormat(artist: Artist): Artist {
  // Если артист уже имеет section и roles, возвращаем как есть
  if ((artist as any).section && (artist as any).roles) {
    return artist;
  }

  // Определяем section и roles на основе жанров
  let section: ArtistSection = 'stage_artists'; // По умолчанию
  let roles: ArtistRole[] = [];

  const genres = artist.genres || [];

  // Логика маппинга жанров на роли
  const hasHosts = genres.includes('hosts');
  const hasTraditional = genres.some(g => 
    ['traditional', 'folk', 'wedding', 'pop', 'jazz', 'classical'].includes(g)
  );
  const hasElectronic = genres.includes('electronic');
  const hasDJ = artist.name.toLowerCase().includes('dj') || 
                artist.stageName.toLowerCase().includes('dj');

  // Определяем раздел и роли
  if (hasHosts) {
    // Артисты с жанром 'hosts' относятся к разделу "Ведущие и шоу"
    section = 'hosts_and_shows';
    roles.push('tamada');
  } else if (hasDJ || hasElectronic) {
    // DJ и электронщики
    section = 'stage_artists';
    roles.push('dj');
  } else if (hasTraditional) {
    // Музыкальные артисты
    section = 'stage_artists';
    roles.push('singer');
  } else {
    // По умолчанию - артисты сцены
    section = 'stage_artists';
    roles.push('singer');
  }

  // Возвращаем артиста с дополнительными полями
  return {
    ...artist,
    section,
    roles,
    // Добавляем пустые массивы для других фильтров, если их нет
    nationalStyles: (artist as any).nationalStyles || [],
    // По умолчанию артисты доступны для всех типов мероприятий
    eventFormats: (artist as any).eventFormats || ['wedding', 'corporate', 'private_event', 'festival', 'concert']
  } as any;
}

/**
 * Маппинг массива артистов
 */
export function mapArtistsArray(artists: Artist[]): Artist[] {
  const mapped = artists.map(mapLegacyArtistToNewFormat);
  
  // Отладочная информация (можно убрать в продакшене)
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 Артисты после маппинга:', {
      total: mapped.length,
      stage_artists: mapped.filter((a: any) => a.section === 'stage_artists').length,
      hosts_and_shows: mapped.filter((a: any) => a.section === 'hosts_and_shows').length,
      creative_production: mapped.filter((a: any) => a.section === 'creative_production').length,
      singers: mapped.filter((a: any) => a.roles?.includes('singer')).length,
      djs: mapped.filter((a: any) => a.roles?.includes('dj')).length,
    });
  }
  
  return mapped;
}