import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, Calendar, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { useArtistReviews, useRespondToReview } from '../hooks/useReviews';
import { toast } from 'sonner@2.0.3';

interface ReviewsSectionProps {
  artistId: string;
  isArtistOwner?: boolean;
}

export function ReviewsSection({ artistId, isArtistOwner = false }: ReviewsSectionProps) {
  const { reviews, loading, averageRating, totalReviews } = useArtistReviews(artistId);
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const { respondToReview, responding } = useRespondToReview(artistId);

  if (loading) {
    return (
      <Card className="border-purple-200">
        <CardContent className="p-8">
          <div className="text-center text-gray-500">
            Загрузка отзывов...
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleSubmitResponse = async (reviewId: string) => {
    if (!responseText.trim()) {
      toast.error('Введите ответ на отзыв');
      return;
    }

    const result = await respondToReview(reviewId, responseText.trim());
    
    if (result.success) {
      toast.success('Ответ опубликован');
      setRespondingTo(null);
      setResponseText('');
    } else {
      toast.error('Ошибка публикации ответа', {
        description: result.error
      });
    }
  };

  // Подсчёт рейтингов
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: totalReviews > 0 
      ? Math.round((reviews.filter(r => r.rating === rating).length / totalReviews) * 100)
      : 0
  }));

  const recommendCount = reviews.filter(r => r.wouldRecommend).length;
  const recommendPercentage = totalReviews > 0
    ? Math.round((recommendCount / totalReviews) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Сводка */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Общий рейтинг */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= averageRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                {totalReviews} {totalReviews === 1 ? 'отзыв' : totalReviews < 5 ? 'отзыва' : 'отзывов'}
              </p>
            </div>

            {/* Распределение */}
            <div className="space-y-2">
              {ratingCounts.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress value={percentage} className="flex-1 h-2" />
                  <span className="text-sm text-gray-600 w-12 text-right">
                    {count}
                  </span>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200 mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Рекомендуют:</span>
                  <span className="font-semibold text-purple-600">
                    {recommendPercentage}% ({recommendCount})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список отзывов */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <Card className="border-gray-200">
            <CardContent className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Пока нет отзывов</p>
              <p className="text-sm mt-2">Станьте первым, кто оставит отзыв!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="border-gray-200 hover:border-purple-300 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      {review.customerId.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold">Заказчик</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {new Date(review.createdAt).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                        {review.isVerified && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Shield className="w-3 h-3" />
                            <span className="text-xs">Проверено</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Детальные оценки */}
                {(review.professionalismRating || review.communicationRating || 
                  review.qualityRating || review.valueRating) && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
                    {review.professionalismRating && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600 mb-1">Профессионализм</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{review.professionalismRating}</span>
                        </div>
                      </div>
                    )}
                    {review.communicationRating && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600 mb-1">Общение</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{review.communicationRating}</span>
                        </div>
                      </div>
                    )}
                    {review.qualityRating && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600 mb-1">Качество</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{review.qualityRating}</span>
                        </div>
                      </div>
                    )}
                    {review.valueRating && (
                      <div className="bg-gray-50 p-2 rounded">
                        <p className="text-gray-600 mb-1">Цена/Качество</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{review.valueRating}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Текст отзыва */}
                {review.reviewText && (
                  <p className="text-gray-700 mb-3">{review.reviewText}</p>
                )}

                {/* Плюсы и минусы */}
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  {review.pros && (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-800 text-sm">Плюсы</span>
                      </div>
                      <p className="text-sm text-green-700">{review.pros}</p>
                    </div>
                  )}
                  {review.cons && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 mb-2">
                        <ThumbsDown className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-red-800 text-sm">Минусы</span>
                      </div>
                      <p className="text-sm text-red-700">{review.cons}</p>
                    </div>
                  )}
                </div>

                {/* Рекомендация */}
                {review.wouldRecommend && (
                  <div className="text-sm text-purple-600 font-medium mb-3">
                    ✓ Рекомендует этого артиста
                  </div>
                )}

                {/* Ответ артиста */}
                {review.artistResponse && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-800">Ответ артиста</span>
                      {review.artistRespondedAt && (
                        <span className="text-xs text-purple-600">
                          {new Date(review.artistRespondedAt).toLocaleDateString('ru-RU')}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-purple-700">{review.artistResponse}</p>
                  </div>
                )}

                {/* Форма ответа (только для артиста) */}
                {isArtistOwner && !review.artistResponse && (
                  <div className="mt-4">
                    {respondingTo === review.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          placeholder="Напишите ответ на отзыв..."
                          className="min-h-[100px]"
                          maxLength={1000}
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleSubmitResponse(review.id)}
                            disabled={responding}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            {responding ? 'Отправка...' : 'Опубликовать ответ'}
                          </Button>
                          <Button
                            onClick={() => {
                              setRespondingTo(null);
                              setResponseText('');
                            }}
                            variant="outline"
                          >
                            Отмена
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setRespondingTo(review.id)}
                        variant="outline"
                        size="sm"
                        className="border-purple-300 hover:bg-purple-50"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Ответить на отзыв
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
