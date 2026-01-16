import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';
import { Artist } from '../types/artist';

export interface ArtistFilters {
  section?: string;
  roles?: string[];
  genres?: string[];
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  eventFormat?: string;
  searchQuery?: string;
}

export function useArtistsCatalog(filters: ArtistFilters = {}) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchArtists();
  }, [JSON.stringify(filters)]);

  const fetchArtists = async () => {
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      setError('Supabase не настроен');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('artists_catalog')
        .select('*', { count: 'exact' });

      // Применяем фильтры
      if (filters.section) {
        query = query.eq('section', filters.section);
      }

      if (filters.roles && filters.roles.length > 0) {
        query = query.overlaps('roles', filters.roles);
      }

      if (filters.genres && filters.genres.length > 0) {
        query = query.overlaps('genres', filters.genres);
      }

      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      if (filters.minPrice !== undefined) {
        query = query.gte('price_from', filters.minPrice);
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte('price_from', filters.maxPrice);
      }

      if (filters.minRating !== undefined) {
        query = query.gte('rating', filters.minRating);
      }

      if (filters.eventFormat) {
        query = query.contains('event_formats', [filters.eventFormat]);
      }

      if (filters.searchQuery) {
        query = query.or(
          `stage_name.ilike.%${filters.searchQuery}%,name.ilike.%${filters.searchQuery}%,bio.ilike.%${filters.searchQuery}%`
        );
      }

      // Только доступные артисты
      query = query.eq('is_available', true);

      // Сортировка
      query = query.order('rating', { ascending: false });

      const { data, error: queryError, count: totalCount } = await query;

      if (queryError) {
        throw queryError;
      }

      // Конвертируем в формат Artist
      const mappedArtists: Artist[] = (data || []).map((dbArtist: any) => ({
        id: dbArtist.id,
        name: dbArtist.name,
        stageName: dbArtist.stage_name,
        avatar: dbArtist.avatar,
        city: dbArtist.city,
        region: dbArtist.region,
        section: dbArtist.section,
        roles: dbArtist.roles,
        genres: dbArtist.genres,
        nationalStyles: dbArtist.national_styles,
        eventFormats: dbArtist.event_formats,
        bio: dbArtist.bio,
        experience: dbArtist.experience,
        videos: dbArtist.videos,
        photos: dbArtist.photos,
        audio: dbArtist.audio,
        priceFrom: Number(dbArtist.price_from),
        priceTo: dbArtist.price_to ? Number(dbArtist.price_to) : undefined,
        currency: dbArtist.currency,
        rating: Number(dbArtist.rating),
        reviewCount: dbArtist.review_count,
        bookingCount: dbArtist.booking_count,
        createdAt: dbArtist.created_at,
        isVerified: dbArtist.is_verified,
        isAvailable: dbArtist.is_available
      }));

      setArtists(mappedArtists);
      setCount(totalCount || 0);
    } catch (err: any) {
      console.error('Error fetching artists:', err);
      setError(err.message || 'Ошибка загрузки артистов');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchArtists();
  };

  return {
    artists,
    loading,
    error,
    count,
    refetch
  };
}

/**
 * Хук для получения одного артиста по ID
 */
export function useArtist(artistId: string | null) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artistId) {
      setArtist(null);
      return;
    }

    fetchArtist();
  }, [artistId]);

  const fetchArtist = async () => {
    if (!artistId) return;

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      setError('Supabase не настроен');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('artists_catalog')
        .select('*')
        .eq('id', artistId)
        .single();

      if (queryError) {
        throw queryError;
      }

      if (!data) {
        throw new Error('Артист не найден');
      }

      // Конвертируем в формат Artist
      const mappedArtist: Artist = {
        id: data.id,
        name: data.name,
        stageName: data.stage_name,
        avatar: data.avatar,
        city: data.city,
        region: data.region,
        section: data.section,
        roles: data.roles,
        genres: data.genres,
        nationalStyles: data.national_styles,
        eventFormats: data.event_formats,
        bio: data.bio,
        experience: data.experience,
        videos: data.videos,
        photos: data.photos,
        audio: data.audio,
        priceFrom: Number(data.price_from),
        priceTo: data.price_to ? Number(data.price_to) : undefined,
        currency: data.currency,
        rating: Number(data.rating),
        reviewCount: data.review_count,
        bookingCount: data.booking_count,
        createdAt: data.created_at,
        isVerified: data.is_verified,
        isAvailable: data.is_available
      };

      setArtist(mappedArtist);
    } catch (err: any) {
      console.error('Error fetching artist:', err);
      setError(err.message || 'Ошибка загрузки артиста');
    } finally {
      setLoading(false);
    }
  };

  return {
    artist,
    loading,
    error
  };
}
