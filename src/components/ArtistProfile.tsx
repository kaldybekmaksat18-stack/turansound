import { 
  Star, 
  MapPin, 
  BadgeCheck, 
  Calendar, 
  Music2, 
  Languages, 
  Briefcase,
  Award,
  Play,
  ChevronLeft
} from 'lucide-react';
import { Artist, Review } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockReviews } from '../data/mockData';

interface ArtistProfileProps {
  artist: Artist;
  onBack: () => void;
  onBook: (artistId: string) => void;
}

export function ArtistProfile({ artist, onBack, onBook }: ArtistProfileProps) {
  const reviews = mockReviews.filter(r => r.artistId === artist.id);

  const regionNames: Record<string, string> = {
    almaty: 'Алматы',
    astana: 'Астана',
    shymkent: 'Шымкент',
    karaganda: 'Караганда',
    aktobe: 'Актобе',
    tashkent: 'Ташкент',
    bishkek: 'Бишкек',
    istanbul: 'Стамбул',
    moscow: 'Москва',
    beijing: 'Пекин',
    'Алматинская область': 'Алматы',
    'Акмолинская область': 'Астана',
    'Туркестанская область': 'Шымкент',
    'Карагандинская область': 'Караганда'
  };

  const genreNames: Record<string, string> = {
    pop: 'Поп',
    rock: 'Рок',
    jazz: 'Джаз',
    classical: 'Классика',
    folk: 'Фолк',
    electronic: 'Электронная',
    'hip-hop': 'Хип-хоп',
    traditional: 'Традиционная',
    dombra: 'Домбра',
    kobyz: 'Кобыз',
    wedding: 'Свадебная',
    corporate: 'Корпоративная'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-80 bg-muted">
        <ImageWithFallback 
          src={(artist as any).coverImage || artist.avatar} 
          alt={artist.stageName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <Button
          variant="ghost"
          className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={onBack}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <ImageWithFallback 
                    src={artist.avatar} 
                    alt={artist.name}
                    className="w-32 h-32 rounded-xl object-cover border-4 border-background shadow-xl"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1>{artist.stageName}</h1>
                      {((artist as any).verified || (artist as any).isVerified) && (
                        <BadgeCheck className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{artist.name}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {artist.genres.map((genre) => (
                        <Badge key={genre} variant="secondary">
                          {genreNames[genre]}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        <span className="text-lg">{artist.rating}</span>
                        <span className="text-muted-foreground">({artist.reviewCount} отзывов)</span>
                      </div>
                      <Separator orientation="vertical" className="h-6" />
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{regionNames[artist.region]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">О себе</TabsTrigger>
                <TabsTrigger value="portfolio">Портфолио</TabsTrigger>
                <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <h3>Описание</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
                  </CardContent>
                </Card>

                {(artist as any).specialties && (artist as any).specialties.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h3>Специализация</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {(artist as any).specialties.map((specialty: string) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {(artist as any).equipment && (artist as any).equipment.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h3>Оборудование</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {(artist as any).equipment.map((item: string) => (
                          <li key={item} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Award className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <div className="text-2xl mb-1">{artist.experience}</div>
                      <div className="text-sm text-muted-foreground">лет опыта</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <Briefcase className="w-8 h-8 mx-auto mb-2 text-pink-500" />
                      <div className="text-2xl mb-1">{artist.bookingCount}</div>
                      <div className="text-sm text-muted-foreground">выступлений</div>
                    </CardContent>
                  </Card>
                  {(artist as any).languages && (artist as any).languages.length > 0 && (
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Languages className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                        <div className="text-2xl mb-1">{(artist as any).languages.length}</div>
                        <div className="text-sm text-muted-foreground">языка</div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <h3>Видео выступлений</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative aspect-video bg-muted rounded-lg overflow-hidden group cursor-pointer">
                          <ImageWithFallback 
                            src={(artist as any).coverImage || artist.avatar} 
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h3>Фотографии</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <ImageWithFallback 
                            src={(artist as any).coverImage || artist.avatar} 
                            alt="Portfolio"
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4 mt-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <ImageWithFallback 
                          src={review.clientAvatar} 
                          alt={review.clientName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-medium">{review.clientName}</div>
                              <div className="text-sm text-muted-foreground">{review.eventType}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-500 text-yellow-500'
                                    : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <Card className="sticky top-20">
              <CardHeader>
                <h3>Бронирование</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                  <div className="text-2xl">
                    {(() => {
                      const minPrice = (artist as any).priceRange?.min ?? (artist as any).priceFrom ?? 0;
                      const maxPrice = (artist as any).priceRange?.max ?? (artist as any).priceTo ?? 0;
                      return `${(minPrice / 1000).toLocaleString()} - ${(maxPrice / 1000).toLocaleString()} ₸`;
                    })()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">за выступление</div>
                </div>

                <Separator />

                {(artist as any).languages && (artist as any).languages.length > 0 && (
                  <>
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Языки</div>
                      <div className="flex flex-wrap gap-2">
                        {(artist as any).languages.map((lang: string) => (
                          <Badge key={lang} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                  onClick={() => onBook(artist.id)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Забронировать
                </Button>

                <Button variant="outline" className="w-full">
                  Задать вопрос
                </Button>
              </CardContent>
            </Card>

            {/* Available Dates */}
            {(artist as any).availableDates && (artist as any).availableDates.length > 0 && (
              <Card>
                <CardHeader>
                  <h3>Ближайшие свободные даты</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(artist as any).availableDates.slice(0, 5).map((date: string) => (
                      <div
                        key={date}
                        className="flex items-center gap-2 p-2 rounded-lg bg-muted hover:bg-accent transition-colors cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {new Date(date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

