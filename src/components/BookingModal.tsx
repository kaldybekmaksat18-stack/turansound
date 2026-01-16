import { useState } from 'react';
import { Calendar, MapPin, Users, MessageSquare, CreditCard, X } from 'lucide-react';
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

interface BookingModalProps {
  artist: Artist;
  onClose: () => void;
  onConfirm: () => void;
}

export function BookingModal({ artist, onClose, onConfirm }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    location: '',
    guestCount: '',
    duration: '',
    notes: '',
    name: '',
    phone: '',
    email: ''
  });

  const handleSubmit = () => {
    setStep(3);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h2>Бронирование артиста</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Шаг {step} из 3
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent>
          {/* Artist Info */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-6">
            <ImageWithFallback 
              src={artist.avatar} 
              alt={artist.stageName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="font-medium mb-1">{artist.stageName}</div>
              <div className="text-sm text-muted-foreground">
                {artist.priceRange.min.toLocaleString()} - {artist.priceRange.max.toLocaleString()} ₸
              </div>
            </div>
            <Badge variant="secondary">{artist.genres[0]}</Badge>
          </div>

          {/* Step 1: Event Details */}
          {step === 1 && (
            <div className="space-y-4">
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
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Дата *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                      <SelectValue placeholder="Выберите" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 час</SelectItem>
                      <SelectItem value="2">2 часа</SelectItem>
                      <SelectItem value="3">3 часа</SelectItem>
                      <SelectItem value="4">4 часа</SelectItem>
                      <SelectItem value="full">Весь день</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Место проведения *</Label>
                <Input
                  id="location"
                  placeholder="Город, адрес или название заведения"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                disabled={!formData.eventType || !formData.date || !formData.location}
              >
                Далее
              </Button>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="space-y-4">
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

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                      Как это работает?
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      После отправки заявки артист получит уведомление и свяжется с вами в течение 24 часов для уточнения деталей.
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
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.email}
                >
                  Отправить заявку
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2">Заявка отправлена!</h3>
              <p className="text-muted-foreground mb-6">
                {artist.stageName} получил вашу заявку и скоро с вами свяжется
              </p>
              <div className="bg-muted rounded-lg p-4 text-left mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Мероприятие:</span>
                    <span className="font-medium">{formData.eventType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата:</span>
                    <span className="font-medium">
                      {new Date(formData.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Место:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                </div>
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
