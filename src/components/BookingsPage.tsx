import { Calendar, Clock, MapPin, User, FileText, CreditCard, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBookingsWithArtists } from '../hooks/useBookingsWithArtists';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useState } from 'react';

interface BookingsPageProps {
  onNavigate: (page: string, params?: any) => void;
  userId?: string | null;
}

export function BookingsPage({ onNavigate, userId }: BookingsPageProps) {
  const { bookings, stats, loading, error, cancelBooking, completeBooking } = useBookingsWithArtists(userId || null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;

    const result = await cancelBooking(selectedBookingId);
    
    if (result.success) {
      toast.success('Бронирование отменено', {
        description: 'Средства возвращены на ваш счёт'
      });
    } else {
      toast.error('Ошибка отмены', {
        description: result.error || 'Попробуйте позже'
      });
    }
    
    setCancelDialogOpen(false);
    setSelectedBookingId(null);
  };

  const handleCompleteBooking = async (bookingId: string) => {
    const result = await completeBooking(bookingId);
    
    if (result.success) {
      toast.success('Мероприятие завершено', {
        description: 'Средства переведены артисту'
      });
    } else {
      toast.error('Ошибка', {
        description: result.error || 'Попробуйте позже'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Ожидает', variant: 'secondary' },
      confirmed: { label: 'Подтверждено', variant: 'default' },
      completed: { label: 'Завершено', variant: 'outline' },
      cancelled: { label: 'Отменено', variant: 'destructive' },
      in_progress: { label: 'В процессе', variant: 'default' },
      disputed: { label: 'Спор', variant: 'destructive' }
    };
    return <Badge variant={variants[status]?.variant || 'secondary'}>{variants[status]?.label || status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'in_progress':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
      case 'disputed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPaymentStatusLabel = (paymentStatus: string) => {
    const labels: Record<string, string> = {
      pending: '⏳ Ожидает оплаты',
      paid: '💳 Оплачено',
      escrow: '🔒 На эскроу',
      released: '✅ Выплачено',
      refunded: '↩️ Возвращено'
    };
    return labels[paymentStatus] || paymentStatus;
  };

  // Show message if not authenticated
  if (!userId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="mb-2">Требуется авторизация</h3>
            <p className="text-muted-foreground mb-4">
              Войдите в систему, чтобы просмотреть ваши бронирования
            </p>
            <Button onClick={() => onNavigate('login')} className="w-full">
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка бронирований...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="mb-2">Ошибка загрузки</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Обновить страницу
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">Мои бронирования</h1>
          <p className="text-muted-foreground">
            Управляйте вашими заказами и контрактами
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl mb-1">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Всего букингов</div>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl mb-1">{stats.upcoming}</div>
                  <div className="text-sm text-muted-foreground">Предстоящих</div>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl mb-1">₸{(stats.escrowTotal / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-muted-foreground">На эскроу</div>
                </div>
                <CreditCard className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl mb-1">{stats.completed}</div>
                  <div className="text-sm text-muted-foreground">Завершённых</div>
                </div>
                <CheckCircle className="w-8 h-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Empty state */}
        {bookings.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="mb-2">У вас пока нет бронирований</h3>
              <p className="text-muted-foreground mb-6">
                Начните с поиска артистов в каталоге
              </p>
              <Button 
                onClick={() => onNavigate('catalog')} 
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                Перейти в каталог
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Bookings List */}
        {bookings.length > 0 && (
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="upcoming">Предстоящие</TabsTrigger>
              <TabsTrigger value="completed">Завершённые</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-6">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Artist Avatar */}
                      <ImageWithFallback 
                        src={booking.artist?.avatar || 'https://images.unsplash.com/photo-1545947288-c22ade2af79d?w=400'}
                        alt={booking.artist?.stageName || 'Артист'}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      {/* Main Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="mb-1">{booking.artist?.stageName || 'Артист'}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                              {getStatusBadge(booking.status)}
                              <span>•</span>
                              <span>{booking.eventType}</span>
                              {booking.artist && booking.artist.genres.length > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{booking.artist.genres[0]}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl mb-1">{booking.totalPrice.toLocaleString()} ₸</div>
                            <div className="text-xs text-muted-foreground">
                              {getPaymentStatusLabel(booking.paymentStatus)}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>
                              {new Date(booking.eventDate).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                              {booking.eventTime && ` в ${booking.eventTime.slice(0, 5)}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{booking.eventLocation || booking.eventCity || 'Не указано'}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 flex-wrap">
                          {booking.contractUrl && (
                            <Button variant="outline" size="sm" onClick={() => window.open(booking.contractUrl, '_blank')}>
                              <FileText className="w-4 h-4 mr-2" />
                              Контракт
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => toast.info('Функция чата в разработке')}
                          >
                            <User className="w-4 h-4 mr-2" />
                            Связаться
                          </Button>
                          {(booking.status === 'confirmed' || booking.status === 'pending') && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedBookingId(booking.id);
                                setCancelDialogOpen(true);
                              }}
                            >
                              Отменить
                            </Button>
                          )}
                          {booking.status === 'in_progress' && (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-green-600 to-emerald-600"
                              onClick={() => handleCompleteBooking(booking.id)}
                            >
                              Завершить мероприятие
                            </Button>
                          )}
                          {booking.status === 'completed' && (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-purple-600 to-pink-600"
                              onClick={() => toast.info('Функция отзывов в разработке')}
                            >
                              Оставить отзыв
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Status Icon */}
                      <div className="hidden md:block">
                        {getStatusIcon(booking.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {bookings
                .filter(b => b.status === 'pending' || b.status === 'confirmed' || b.status === 'in_progress')
                .map((booking) => (
                  <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ImageWithFallback 
                          src={booking.artist?.avatar || 'https://images.unsplash.com/photo-1545947288-c22ade2af79d?w=400'}
                          alt={booking.artist?.stageName || 'Артист'}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="mb-1">{booking.artist?.stageName || 'Артист'}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {getStatusBadge(booking.status)}
                                <span>•</span>
                                <span>{booking.eventType}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl mb-1">{booking.totalPrice.toLocaleString()} ₸</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm mb-4">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>
                              {new Date(booking.eventDate).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {booking.contractUrl && (
                              <Button variant="outline" size="sm" onClick={() => window.open(booking.contractUrl, '_blank')}>
                                <FileText className="w-4 h-4 mr-2" />
                                Контракт
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <User className="w-4 h-4 mr-2" />
                              Связаться
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-6">
              {bookings
                .filter(b => b.status === 'completed')
                .map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <ImageWithFallback 
                          src={booking.artist?.avatar || 'https://images.unsplash.com/photo-1545947288-c22ade2af79d?w=400'}
                          alt={booking.artist?.stageName || 'Артист'}
                          className="w-20 h-20 rounded-xl object-cover opacity-75"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="mb-1">{booking.artist?.stageName || 'Артист'}</h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                {getStatusBadge(booking.status)}
                                <span>•</span>
                                <span>{booking.eventType}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl mb-1 text-muted-foreground">{booking.totalPrice.toLocaleString()} ₸</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm mb-4 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(booking.eventDate).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-purple-600 to-pink-600"
                            onClick={() => toast.info('Функция отзывов в разработке')}
                          >
                            Оставить отзыв
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Отменить бронирование?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие отменит бронирование и вернёт средства на ваш счёт.
              В зависимости от условий контракта, может быть удержана комиссия.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Не отменять</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancelBooking}
              className="bg-red-600 hover:bg-red-700"
            >
              Да, отменить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}