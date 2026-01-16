import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';
import { Booking } from './useBookings';

export interface BookingWithArtist extends Booking {
  artist?: {
    id: string;
    stageName: string;
    avatar: string;
    rating: number;
    city: string;
    genres: string[];
  };
}

interface BookingStats {
  total: number;
  upcoming: number;
  completed: number;
  escrowTotal: number;
}

/**
 * Расширенный хук для работы с бронированиями + данные артистов
 */
export function useBookingsWithArtists(userId: string | null) {
  const [bookings, setBookings] = useState<BookingWithArtist[]>([]);
  const [stats, setStats] = useState<BookingStats>({
    total: 0,
    upcoming: 0,
    completed: 0,
    escrowTotal: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setBookings([]);
      setStats({
        total: 0,
        upcoming: 0,
        completed: 0,
        escrowTotal: 0
      });
      return;
    }

    fetchBookings();
  }, [userId]);

  const fetchBookings = async () => {
    if (!userId) return;

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      setError('Supabase не настроен');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Сначала получаем бронирования
      const { data: bookingsData, error: queryError } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });

      if (queryError) {
        throw queryError;
      }

      if (!bookingsData || bookingsData.length === 0) {
        setBookings([]);
        setStats({
          total: 0,
          upcoming: 0,
          completed: 0,
          escrowTotal: 0
        });
        setLoading(false);
        return;
      }

      // Получаем уникальные ID артистов
      const artistIds = [...new Set(bookingsData.map(b => b.artist_id))];

      // Загружаем данные артистов
      const { data: artistsData, error: artistsError } = await supabase
        .from('artists_catalog')
        .select('id, stage_name, avatar, rating, city, genres')
        .in('id', artistIds);

      if (artistsError) {
        console.warn('Не удалось загрузить данные артистов:', artistsError);
        // Продолжаем без данных артистов
      }

      // Создаем маппинг артистов по ID
      const artistsMap = new Map(
        (artistsData || []).map(artist => [artist.id, artist])
      );

      const mappedBookings: BookingWithArtist[] = bookingsData.map((dbBooking: any) => {
        const artistData = artistsMap.get(dbBooking.artist_id);
        
        return {
          id: dbBooking.id,
          customerId: dbBooking.customer_id,
          artistId: dbBooking.artist_id,
          eventType: dbBooking.event_type,
          eventDate: dbBooking.event_date,
          eventTime: dbBooking.event_time,
          eventDuration: dbBooking.event_duration,
          eventLocation: dbBooking.event_location,
          eventCity: dbBooking.event_city,
          guestCount: dbBooking.guest_count,
          specialRequests: dbBooking.special_requests,
          totalPrice: Number(dbBooking.total_price),
          currency: dbBooking.currency,
          paymentStatus: dbBooking.payment_status,
          escrowAmount: Number(dbBooking.escrow_amount),
          status: dbBooking.status,
          contractSigned: dbBooking.contract_signed,
          contractUrl: dbBooking.contract_url,
          createdAt: dbBooking.created_at,
          updatedAt: dbBooking.updated_at,
          confirmedAt: dbBooking.confirmed_at,
          completedAt: dbBooking.completed_at,
          cancelledAt: dbBooking.cancelled_at,
          artist: artistData ? {
            id: artistData.id,
            stageName: artistData.stage_name,
            avatar: artistData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${artistData.stage_name}`,
            rating: Number(artistData.rating),
            city: artistData.city,
            genres: artistData.genres || []
          } : undefined
        };
      });

      setBookings(mappedBookings);

      // Вычисляем статистику
      const total = mappedBookings.length;
      const upcoming = mappedBookings.filter(b => 
        b.status === 'pending' || b.status === 'confirmed'
      ).length;
      const completed = mappedBookings.filter(b => 
        b.status === 'completed'
      ).length;
      const escrowTotal = mappedBookings
        .filter(b => b.paymentStatus === 'escrow' || b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.totalPrice, 0);

      setStats({
        total,
        upcoming,
        completed,
        escrowTotal
      });

    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Ошибка загрузки бронирований');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Отмена бронирования
   */
  const cancelBooking = async (bookingId: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString(),
          payment_status: 'refunded' // Автоматический возврат при отмене
        })
        .eq('id', bookingId);

      if (updateError) {
        throw updateError;
      }

      await fetchBookings();
      return { success: true };
    } catch (err: any) {
      console.error('Error cancelling booking:', err);
      return { 
        success: false,
        error: err.message || 'Ошибка отмены бронирования'
      };
    }
  };

  /**
   * Подтверждение завершения мероприятия
   */
  const completeBooking = async (bookingId: string): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          payment_status: 'released' // Автоматическая выплата артисту
        })
        .eq('id', bookingId);

      if (updateError) {
        throw updateError;
      }

      await fetchBookings();
      return { success: true };
    } catch (err: any) {
      console.error('Error completing booking:', err);
      return { 
        success: false,
        error: err.message || 'Ошибка завершения бронирования'
      };
    }
  };

  return {
    bookings,
    stats,
    loading,
    error,
    cancelBooking,
    completeBooking,
    refetch: fetchBookings
  };
}