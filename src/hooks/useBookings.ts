import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';

export interface Booking {
  id: string;
  customerId: string;
  artistId: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  eventDuration?: number;
  eventLocation?: string;
  eventCity?: string;
  guestCount?: number;
  specialRequests?: string;
  totalPrice: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'escrow' | 'released' | 'refunded';
  escrowAmount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  contractSigned: boolean;
  contractUrl?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface CreateBookingData {
  artistId: string;
  eventType: string;
  eventDate: string;
  eventTime?: string;
  eventDuration?: number;
  eventLocation?: string;
  eventCity?: string;
  guestCount?: number;
  specialRequests?: string;
  totalPrice: number;
  currency?: string;
}

/**
 * Хук для работы с бронированиями пользователя
 */
export function useBookings(userId: string | null) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setBookings([]);
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
      // Получаем бронирования, где пользователь - заказчик
      const { data, error: queryError } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', userId)
        .order('created_at', { ascending: false });

      if (queryError) {
        throw queryError;
      }

      const mappedBookings: Booking[] = (data || []).map((dbBooking: any) => ({
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
        cancelledAt: dbBooking.cancelled_at
      }));

      setBookings(mappedBookings);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Ошибка загрузки бронирований');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Создание нового бронирования
   */
  const createBooking = async (bookingData: CreateBookingData): Promise<{ success: boolean; booking?: Booking; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'Пользователь не авторизован' };
    }

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    try {
      const { data, error: insertError } = await supabase
        .from('bookings')
        .insert({
          customer_id: userId,
          artist_id: bookingData.artistId,
          event_type: bookingData.eventType,
          event_date: bookingData.eventDate,
          event_time: bookingData.eventTime,
          event_duration: bookingData.eventDuration,
          event_location: bookingData.eventLocation,
          event_city: bookingData.eventCity,
          guest_count: bookingData.guestCount,
          special_requests: bookingData.specialRequests,
          total_price: bookingData.totalPrice,
          currency: bookingData.currency || 'KZT',
          payment_status: 'pending',
          status: 'pending',
          escrow_amount: 0,
          contract_signed: false
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating booking:', insertError);
        
        // Provide more helpful error messages
        if (insertError.code === '22P02' && insertError.message.includes('uuid')) {
          throw new Error('Невозможно забронировать этого артиста. Пожалуйста, выберите артиста из каталога базы данных.');
        }
        
        throw insertError;
      }

      // Обновляем локальный список
      await fetchBookings();

      return { 
        success: true,
        booking: {
          id: data.id,
          customerId: data.customer_id,
          artistId: data.artist_id,
          eventType: data.event_type,
          eventDate: data.event_date,
          eventTime: data.event_time,
          eventDuration: data.event_duration,
          eventLocation: data.event_location,
          eventCity: data.event_city,
          guestCount: data.guest_count,
          specialRequests: data.special_requests,
          totalPrice: Number(data.total_price),
          currency: data.currency,
          paymentStatus: data.payment_status,
          escrowAmount: Number(data.escrow_amount),
          status: data.status,
          contractSigned: data.contract_signed,
          contractUrl: data.contract_url,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          confirmedAt: data.confirmed_at,
          completedAt: data.completed_at,
          cancelledAt: data.cancelled_at
        }
      };
    } catch (err: any) {
      console.error('Error creating booking:', err);
      return { 
        success: false,
        error: err.message || 'Ошибка создания бронирования'
      };
    }
  };

  /**
   * Обновление статуса бронирования
   */
  const updateBookingStatus = async (
    bookingId: string,
    status: Booking['status']
  ): Promise<{ success: boolean; error?: string }> => {
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    try {
      const updateData: any = { status };

      // Добавляем временные метки
      if (status === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString();
      } else if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      } else if (status === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString();
      }

      const { error: updateError } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId);

      if (updateError) {
        throw updateError;
      }

      // Обновляем локальный список
      await fetchBookings();

      return { success: true };
    } catch (err: any) {
      console.error('Error updating booking status:', err);
      return { 
        success: false,
        error: err.message || 'Ошибка обновления статуса'
      };
    }
  };

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBookingStatus,
    refetch: fetchBookings
  };
}