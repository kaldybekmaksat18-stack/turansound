import { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  CreditCard, 
  X,
  Shield,
  FileText,
  TrendingUp,
  Zap,
  Music2,
  Mic,
  Radio,
  Lightbulb,
  Camera,
  Check
} from 'lucide-react';
import { Artist } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { useBookings } from '../hooks/useBookings';
import { toast } from 'sonner@2.0.3';

interface EnhancedBookingModalProps {
  artist: Artist;
  onClose: () => void;
  onConfirm: () => void;
  userId?: string | null;
}

interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  category: 'equipment' | 'personnel' | 'production';
}

const additionalServices: AdditionalService[] = [
  {
    id: 'sound',
    name: 'Профессиональная звуковая система',
    description: 'Полный комплект звукового оборудования + звукорежиссёр',
    price: 150000,
    icon: Radio,
    category: 'equipment'
  },
  {
    id: 'lighting',
    name: 'Световое оборудование',
    description: 'Профессиональный свет + светорежиссёр',
    price: 120000,
    icon: Lightbulb,
    category: 'equipment'
  },
  {
    id: 'video',
    name: 'Видеосъёмка',
    description: '2 камеры, профессиональный монтаж',
    price: 180000,
    icon: Camera,
    category: 'production'
  },
  {
    id: 'host',
    name: 'Ведущий мероприятия',
    description: 'Опытный тамада/ведущий',
    price: 100000,
    icon: Mic,
    category: 'personnel'
  }
];

export function EnhancedBookingModal({ artist, onClose, onConfirm, userId }: EnhancedBookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createBooking } = useBookings(userId || null);
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    time: '',
    location: '',
    city: '',
    guestCount: '',
    duration: '3',
    notes: '',
    name: '',
    phone: '',
    email: '',
    selectedServices: [] as string[],
    acceptContract: false,
    escrowAgreed: false
  });

  // Dynamic pricing
  // Handle both old priceRange format and new priceFrom/priceTo format
  const basePrice = (artist as any).priceRange?.min ?? (artist as any).priceFrom ?? 100000;
  const servicesTotal = formData.selectedServices.reduce((sum, serviceId) => {
    const service = additionalServices.find(s => s.id === serviceId);
    return sum + (service?.price || 0);
  }, 0);
  const durationMultiplier = parseFloat(formData.duration) / 3;
  const totalPrice = (basePrice * durationMultiplier) + servicesTotal;
  const escrowFee = totalPrice * 0.03; // 3% платформенная комиссия
  const finalPrice = totalPrice + escrowFee;

  const handleSubmit = async () => {
    if (!userId) {
      toast.error('Необходимо авторизоваться');
      return;
    }

    // Check if artist ID is a valid UUID (from database)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(artist.id)) {
      toast.error('Невозможно забронировать этого артиста', {
        description: 'Этот артист из демо-данных. Пожалуйста, выберите артиста из каталога после загрузки базы данных.',
        duration: 5000
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Маппинг русских названий типов мероприятий на английские
      const eventTypeMap: Record<string, string> = {
        'wedding': 'Свадьба',
        'corporate': 'Корпоратив',
        'birthday': 'День рождения',
        'festival': 'Фестиваль',
        'concert': 'Концерт',
        'restaurant': 'Ресторан',
        'government': 'Государственное мероприятие'
      };

      const result = await createBooking({
        artistId: artist.id,
        eventType: eventTypeMap[formData.eventType] || formData.eventType,
        eventDate: formData.date,
        eventTime: formData.time || undefined,
        eventDuration: parseFloat(formData.duration) * 60, // конвертируем в минуты
        eventLocation: formData.location,
        eventCity: formData.city || undefined,
        guestCount: formData.guestCount ? parseInt(formData.guestCount) : undefined,
        specialRequests: formData.notes || undefined,
        totalPrice: finalPrice,
        currency: 'KZT'
      });

      if (result.success) {
        setStep(5);
        setTimeout(() => {
          onConfirm();
          toast.success('Бронирование создано!', {
            description: 'Проверьте раздел "Мои бронирования"'
          });
        }, 2000);
      } else {
        toast.error('Ошибка создания бронирования', {
          description: result.error || 'Попробуйте позже'
        });
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error('Ошибка', {
        description: error.message || 'Не удалось создать бронирование'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b sticky top-0 bg-card z-10">
          <div>
            <h2>Умное бронирование</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Шаг {step} из 5 • Защита эскроу + Смарт-контракт
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="pt-6">
          {/* Artist Info */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl mb-6 border border-purple-200 dark:border-purple-800">
            <ImageWithFallback 
              src={artist.avatar} 
              alt={artist.stageName}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <div className="font-medium mb-1">{artist.stageName}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Badge variant="secondary">{artist.genres[0]}</Badge>
                <span>⭐ {artist.rating}</span>
                <span>• {artist.bookingCount} выступлений</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">От</div>
              <div className="text-xl">{basePrice.toLocaleString()} ₸</div>
            </div>
          </div>

          {/* Step 1: Event Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventType">Тип мероприятия *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                  >
                    <SelectTrigger id="eventType" className="mt-2">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Свадьба</SelectItem>
                      <SelectItem value="corporate">Корпоратив</SelectItem>
                      <SelectItem value="birthday">День рождения</SelectItem>
                      <SelectItem value="festival">Фестиваль</SelectItem>
                      <SelectItem value="concert">Концерт</SelectItem>
                      <SelectItem value="restaurant">Ресторан</SelectItem>
                      <SelectItem value="government">Государственное мероприятие</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date">Дата мероприятия *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-2"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="time">Время начала</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="duration">Длительность</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger id="duration" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 час</SelectItem>
                      <SelectItem value="2">2 часа</SelectItem>
                      <SelectItem value="3">3 часа (стандарт)</SelectItem>
                      <SelectItem value="4">4 часа</SelectItem>
                      <SelectItem value="6">6 часов</SelectItem>
                      <SelectItem value="8">Весь день</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Цена пересчитается автоматически
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Город *</Label>
                  <Input
                    id="city"
                    placeholder="Алматы, Астана..."
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="guestCount">Количество гостей</Label>
                  <Input
                    id="guestCount"
                    type="number"
                    placeholder="Примерное количество"
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="mt-2"
                    min={1}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Место проведения *</Label>
                <Input
                  id="location"
                  placeholder="Адрес или название заведения"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="notes">Дополнительные пожелания</Label>
                <Textarea
                  id="notes"
                  placeholder="Особые требования, репертуар, технические детали..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="mt-2 min-h-[100px]"
                />
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() => setStep(2)}
                disabled={!formData.eventType || !formData.date || !formData.location || !formData.city}
              >
                Далее: Дополнительные услуги
              </Button>
            </div>
          )}

          {/* Step 2: Additional Services */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-2">Дополнительные услуги</h3>
                <p className="text-sm text-muted-foreground">
                  Сохраните полный продакшн для вашего мероприятия
                </p>
              </div>

              <div className="space-y-3">
                {additionalServices.map((service) => {
                  const Icon = service.icon;
                  const isSelected = formData.selectedServices.includes(service.id);
                  
                  return (
                    <div
                      key={service.id}
                      onClick={() => {
                        if (isSelected) {
                          setFormData({
                            ...formData,
                            selectedServices: formData.selectedServices.filter(id => id !== service.id)
                          });
                        } else {
                          setFormData({
                            ...formData,
                            selectedServices: [...formData.selectedServices, service.id]
                          });
                        }
                      }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20'
                          : 'border-border hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-purple-600' : 'bg-muted'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium">{service.name}</div>
                            <div className="font-medium">{service.price.toLocaleString()} ₸</div>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-purple-600 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-2">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      AI рекомендует
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      Для {formData.eventType === 'wedding' ? 'свадьбы' : 'корпоратива'} на {formData.guestCount || '100+'} человек рекомендуем добавить звук и свет
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Назад
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => setStep(3)}
                >
                  Далее: Контактные данные
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  placeholder="Как к вам обращаться"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Назад
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => setStep(4)}
                  disabled={!formData.name || !formData.phone || !formData.email}
                >
                  Далее: Оплата и контракт
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Payment & Contract */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Price Breakdown */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <h3>Детализация стоимости</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Выступление артиста ({formData.duration}ч)</span>
                    <span>{(basePrice * durationMultiplier).toLocaleString()} ₸</span>
                  </div>
                  {formData.selectedServices.map(serviceId => {
                    const service = additionalServices.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="flex justify-between">
                        <span className="text-muted-foreground">{service.name}</span>
                        <span>{service.price.toLocaleString()} ₸</span>
                      </div>
                    ) : null;
                  })}
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Услуги платформы (3%)</span>
                    <span>{escrowFee.toLocaleString()} ₸</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span>Итого</span>
                    <span className="font-semibold">{finalPrice.toLocaleString()} ₸</span>
                  </div>
                </CardContent>
              </Card>

              {/* Escrow Protection */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="mb-1">Защита эскроу</h4>
                      <p className="text-sm text-muted-foreground">
                        Деньги блокируются на защищённом счёте до выступления. Автоматическая выплата артисту после мероприятия.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="escrow"
                      checked={formData.escrowAgreed}
                      onCheckedChange={(checked) => setFormData({ ...formData, escrowAgreed: checked as boolean })}
                    />
                    <Label htmlFor="escrow" className="text-sm font-normal cursor-pointer">
                      Я понимаю условия эскроу-депонирования
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Smart Contract */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="mb-1">Смарт-контракт</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Автоматический договор с юридической силой
                      </p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          Штраф за срыв: 50% от суммы
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          Форс-мажор: полный возврат
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          Отмена за 7+ дней: возврат 90%
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="contract"
                      checked={formData.acceptContract}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptContract: checked as boolean })}
                    />
                    <Label htmlFor="contract" className="text-sm font-normal cursor-pointer">
                      Я принимаю условия смарт-контракта и{' '}
                      <button type="button" className="text-purple-600 hover:text-purple-700">
                        Публичной оферты
                      </button>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)} className="flex-1" disabled={isSubmitting}>
                  Назад
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleSubmit}
                  disabled={!formData.escrowAgreed || !formData.acceptContract || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Обработка...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Оплатить {finalPrice.toLocaleString()} ₸
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2">Бронирование подтверждено!</h3>
              <p className="text-muted-foreground mb-6">
                Деньги заблокированы на эскроу-счёте. Контракт создан.
              </p>
              
              <Card className="text-left mb-6">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Артист:</span>
                    <span className="font-medium">{artist.stageName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Мероприятие:</span>
                    <span className="font-medium">{formData.eventType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Дата:</span>
                    <span className="font-medium">
                      {new Date(formData.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Место:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Оплачено:</span>
                    <span className="text-lg font-semibold text-green-600">
                      {finalPrice.toLocaleString()} ₸
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2 mb-6">
                <Button variant="outline" className="w-full" onClick={() => toast.info('Контракт будет доступен в разделе бронирований')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Скачать контракт (PDF)
                </Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Перейти в мои бронирования
                </Button>
              </div>

              <Button onClick={onClose} className="w-full">
                Закрыть
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}