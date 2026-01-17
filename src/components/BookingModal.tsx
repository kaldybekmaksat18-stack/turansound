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
import { useLanguage } from '../lib/i18n/LanguageContext';
import { bookingTexts } from '../lib/i18n/bookingTexts';

interface BookingModalProps {
  artist: Artist;
  onClose: () => void;
  onConfirm: () => void;
}

export function BookingModal({ artist, onClose, onConfirm }: BookingModalProps) {
  const { language } = useLanguage();
  const bt = bookingTexts[language];
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
            <h2>{bt.artistBooking}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {bt.step} {step} {bt.of} 3
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
                <Label htmlFor="eventType">{bt.eventType}</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                >
                  <SelectTrigger id="eventType" className="mt-2">
                    <SelectValue placeholder={bt.selectType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">{bt.wedding}</SelectItem>
                    <SelectItem value="corporate">{bt.corporate}</SelectItem>
                    <SelectItem value="birthday">{bt.birthday}</SelectItem>
                    <SelectItem value="festival">{bt.festival}</SelectItem>
                    <SelectItem value="concert">{bt.concert}</SelectItem>
                    <SelectItem value="other">{bt.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">{bt.date}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">{bt.duration}</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger id="duration" className="mt-2">
                      <SelectValue placeholder={bt.selectDuration} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{bt.hour1}</SelectItem>
                      <SelectItem value="2">{bt.hour2}</SelectItem>
                      <SelectItem value="3">{bt.hour3}</SelectItem>
                      <SelectItem value="4">{bt.hour4}</SelectItem>
                      <SelectItem value="full">{bt.fullDay}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">{bt.location}</Label>
                <Input
                  id="location"
                  placeholder={bt.locationPlaceholder}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="guestCount">{bt.guestCount}</Label>
                <Input
                  id="guestCount"
                  type="number"
                  placeholder={bt.guestCountPlaceholder}
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="notes">{bt.additionalNotes}</Label>
                <Textarea
                  id="notes"
                  placeholder={bt.notesPlaceholder}
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
                {bt.next}
              </Button>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">{bt.yourName}</Label>
                <Input
                  id="name"
                  placeholder={bt.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">{bt.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={bt.phonePlaceholder}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">{bt.email}</Label>
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
                      {bt.howItWorks}
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">
                      {bt.howItWorksDesc}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  {bt.back}
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.email}
                >
                  {bt.sendRequest}
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
              <h3 className="mb-2">{bt.requestSent}</h3>
              <p className="text-muted-foreground mb-6">
                {artist.stageName} {bt.receivedRequest}
              </p>
              <div className="bg-muted rounded-lg p-4 text-left mb-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{bt.event}</span>
                    <span className="font-medium">{formData.eventType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{bt.date}:</span>
                    <span className="font-medium">
                      {new Date(formData.date).toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{bt.location2}</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                </div>
              </div>
              <Button onClick={onClose} className="w-full">
                {bt.close}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}