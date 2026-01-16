import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';

export interface Review {
  id: string;
  bookingId: string;
  artistId: string;
  customerId: string;
  rating: number;
  professionalismRating?: number;
  communicationRating?: number;
  qualityRating?: number;
  valueRating?: number;
  reviewText?: string;
  pros?: string;
  cons?: string;
  wouldRecommend: boolean;
  artistResponse?: string;
  artistRespondedAt?: string;
  isVerified: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  bookingId: string;
  artistId: string;
  rating: number;
  professionalismRating?: number;
  communicationRating?: number;
  qualityRating?: number;
  valueRating?: number;
  reviewText?: string;
  pros?: string;
  cons?: string;
  wouldRecommend?: boolean;
}

/**
 * Хук для работы с отзывами артиста
 */
export function useArtistReviews(artistId: string | null) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (!artistId) {
      setReviews([]);
      return;
    }

    fetchReviews();
  }, [artistId]);

  const fetchReviews = async () => {
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
        .from('reviews')
        .select('*')
        .eq('artist_id', artistId)
        .eq('is_visible', true)
        .order('created_at', { ascending: false });

      if (queryError) {
        throw queryError;
      }

      const mappedReviews: Review[] = (data || []).map((dbReview: any) => ({
        id: dbReview.id,
        bookingId: dbReview.booking_id,
        artistId: dbReview.artist_id,
        customerId: dbReview.customer_id,
        rating: dbReview.rating,
        professionalismRating: dbReview.professionalism_rating,
        communicationRating: dbReview.communication_rating,
        qualityRating: dbReview.quality_rating,
        valueRating: dbReview.value_rating,
        reviewText: dbReview.review_text,
        pros: dbReview.pros,
        cons: dbReview.cons,
        wouldRecommend: dbReview.would_recommend,
        artistResponse: dbReview.artist_response,
        artistRespondedAt: dbReview.artist_responded_at,
        isVerified: dbReview.is_verified,
        isVisible: dbReview.is_visible,
        createdAt: dbReview.created_at,
        updatedAt: dbReview.updated_at
      }));

      setReviews(mappedReviews);
      setTotalReviews(mappedReviews.length);

      // Вычисляем средний рейтинг
      if (mappedReviews.length > 0) {
        const avg = mappedReviews.reduce((sum, review) => sum + review.rating, 0) / mappedReviews.length;
        setAverageRating(Math.round(avg * 10) / 10);
      } else {
        setAverageRating(0);
      }
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      setError(err.message || 'Ошибка загрузки отзывов');
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    averageRating,
    totalReviews,
    refetch: fetchReviews
  };
}

/**
 * Хук для создания отзыва
 */
export function useCreateReview(userId: string | null) {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReview = async (reviewData: CreateReviewData): Promise<{ success: boolean; review?: Review; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'Пользователь не авторизован' };
    }

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    setCreating(true);
    setError(null);

    try {
      // Проверяем, что бронирование завершено
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('status, customer_id')
        .eq('id', reviewData.bookingId)
        .single();

      if (bookingError) {
        throw bookingError;
      }

      if (booking.customer_id !== userId) {
        throw new Error('Вы не можете оставить отзыв на чужое бронирование');
      }

      if (booking.status !== 'completed') {
        throw new Error('Отзыв можно оставить только после завершения мероприятия');
      }

      // Проверяем, не оставлен ли уже отзыв
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('id')
        .eq('booking_id', reviewData.bookingId)
        .single();

      if (existingReview) {
        throw new Error('Вы уже оставили отзыв на это бронирование');
      }

      // Создаём отзыв
      const { data, error: insertError } = await supabase
        .from('reviews')
        .insert({
          booking_id: reviewData.bookingId,
          artist_id: reviewData.artistId,
          customer_id: userId,
          rating: reviewData.rating,
          professionalism_rating: reviewData.professionalismRating,
          communication_rating: reviewData.communicationRating,
          quality_rating: reviewData.qualityRating,
          value_rating: reviewData.valueRating,
          review_text: reviewData.reviewText,
          pros: reviewData.pros,
          cons: reviewData.cons,
          would_recommend: reviewData.wouldRecommend !== false,
          is_verified: false,
          is_visible: true
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      const mappedReview: Review = {
        id: data.id,
        bookingId: data.booking_id,
        artistId: data.artist_id,
        customerId: data.customer_id,
        rating: data.rating,
        professionalismRating: data.professionalism_rating,
        communicationRating: data.communication_rating,
        qualityRating: data.quality_rating,
        valueRating: data.value_rating,
        reviewText: data.review_text,
        pros: data.pros,
        cons: data.cons,
        wouldRecommend: data.would_recommend,
        artistResponse: data.artist_response,
        artistRespondedAt: data.artist_responded_at,
        isVerified: data.is_verified,
        isVisible: data.is_visible,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };

      return { 
        success: true,
        review: mappedReview
      };
    } catch (err: any) {
      console.error('Error creating review:', err);
      const errorMessage = err.message || 'Ошибка создания отзыва';
      setError(errorMessage);
      return { 
        success: false,
        error: errorMessage
      };
    } finally {
      setCreating(false);
    }
  };

  return {
    createReview,
    creating,
    error
  };
}

/**
 * Хук для ответа артиста на отзыв
 */
export function useRespondToReview(artistId: string | null) {
  const [responding, setResponding] = useState(false);

  const respondToReview = async (reviewId: string, response: string): Promise<{ success: boolean; error?: string }> => {
    if (!artistId) {
      return { success: false, error: 'Артист не авторизован' };
    }

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    setResponding(true);

    try {
      const { error: updateError } = await supabase
        .from('reviews')
        .update({
          artist_response: response,
          artist_responded_at: new Date().toISOString()
        })
        .eq('id', reviewId)
        .eq('artist_id', artistId);

      if (updateError) {
        throw updateError;
      }

      return { success: true };
    } catch (err: any) {
      console.error('Error responding to review:', err);
      return { 
        success: false,
        error: err.message || 'Ошибка отправки ответа'
      };
    } finally {
      setResponding(false);
    }
  };

  return {
    respondToReview,
    responding
  };
}
