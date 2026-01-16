// Утилита для загрузки всех артистов в Supabase
import { allKazakhArtists } from '../data/allKazakhArtists';
import { getSupabaseClient } from '../lib/supabase';

export interface ArtistSeedData {
  name: string;
  stage_name: string;
  avatar: string;
  city: string;
  region: string;
  section: string;
  roles: string[];
  genres: string[];
  national_styles?: string[];
  event_formats: string[];
  bio: string;
  experience: number;
  videos?: string[];
  photos?: string[];
  audio?: string[];
  price_from: number;
  price_to?: number;
  currency: string;
  rating: number;
  review_count: number;
  booking_count: number;
  is_verified: boolean;
  is_available: boolean;
}

/**
 * Конвертация артиста из mockData в формат базы данных
 */
function convertArtistToSeedData(artist: any): ArtistSeedData {
  return {
    name: artist.name || artist.stageName,
    stage_name: artist.stageName || artist.name,
    avatar: artist.avatar || artist.coverImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${artist.id}`,
    city: artist.city || artist.region || 'Алматы',
    region: artist.region || 'almaty',
    
    // Трехслойная архитектура
    section: artist.section || 'stage_artists',
    roles: artist.roles || ['musician'],
    genres: artist.genres || ['pop'],
    national_styles: artist.nationalStyles || [],
    event_formats: artist.eventFormats || ['wedding', 'corporate'],
    
    // Портфолио
    bio: artist.bio || `${artist.stageName || artist.name} - профессиональный артист из ${artist.city || 'Казахстана'}`,
    experience: artist.experience || 5,
    videos: artist.videos || [],
    photos: artist.photos || [],
    audio: artist.audio || [],
    
    // Финансы
    price_from: artist.priceFrom || artist.priceRange?.from || 100000,
    price_to: artist.priceTo || artist.priceRange?.to,
    currency: artist.currency || 'KZT',
    
    // Репутация
    rating: artist.rating || 4.5,
    review_count: artist.reviewCount || 0,
    booking_count: artist.bookingCount || 0,
    
    // Статусы
    is_verified: artist.isVerified || false,
    is_available: artist.isAvailable !== false
  };
}

/**
 * Основная функция загрузки артистов
 */
export async function seedAllArtists() {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    console.error('❌ Supabase client не инициализирован');
    return {
      success: false,
      error: 'Supabase not configured'
    };
  }

  console.log(`🚀 Начинаем загрузку ${allKazakhArtists.length} артистов...`);
  
  const artistsToSeed = allKazakhArtists.map(convertArtistToSeedData);
  
  let successCount = 0;
  let errorCount = 0;
  const errors: any[] = [];

  // Загружаем пакетами по 50 артистов
  const batchSize = 50;
  for (let i = 0; i < artistsToSeed.length; i += batchSize) {
    const batch = artistsToSeed.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from('artists_catalog')
      .insert(batch)
      .select();
    
    if (error) {
      console.error(`❌ Ошибка в пакете ${i / batchSize + 1}:`, error);
      errorCount += batch.length;
      errors.push(error);
    } else {
      successCount += data?.length || 0;
      console.log(`✅ Пакет ${i / batchSize + 1}: загружено ${data?.length} артистов`);
    }
  }

  console.log(`\n✨ Загрузка завершена!`);
  console.log(`✅ Успешно: ${successCount} артистов`);
  console.log(`❌ Ошибки: ${errorCount} артистов`);
  
  return {
    success: errorCount === 0,
    successCount,
    errorCount,
    errors
  };
}

/**
 * Проверка, загружены ли артисты
 */
export async function checkArtistsExist() {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    return { exists: false, count: 0 };
  }

  const { data, error } = await supabase
    .from('artists_catalog')
    .select('id', { count: 'exact', head: true });

  if (error) {
    console.error('Ошибка проверки артистов:', error);
    return { exists: false, count: 0 };
  }

  return {
    exists: (data as any) > 0,
    count: (data as any) || 0
  };
}

/**
 * Очистка таблицы артистов (для тестирования)
 */
export async function clearArtistsCatalog() {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  const { error } = await supabase
    .from('artists_catalog')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Удаляем все

  if (error) {
    console.error('❌ Ошибка очистки:', error);
    return { success: false, error };
  }

  console.log('✅ Таблица artists_catalog очищена');
  return { success: true };
}
