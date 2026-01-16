import { Star, MapPin, BadgeCheck, Music2 } from 'lucide-react';
import { Artist } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArtistCardProps {
  artist: Artist;
  onViewProfile: (artistId: string) => void;
}

export function ArtistCard({ artist, onViewProfile }: ArtistCardProps) {
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
    // Add new regions for production artists
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

  // Check if artist is from database (UUID) or mock data
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isFromDatabase = uuidRegex.test(artist.id);

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
      <div 
        className="relative h-48 overflow-hidden bg-muted"
        onClick={() => onViewProfile(artist.id)}
      >
        <ImageWithFallback 
          src={(artist as any).coverImage || artist.avatar} 
          alt={artist.stageName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {((artist as any).verified || (artist as any).isVerified) && (
            <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" />
              Проверен
            </div>
          )}
        </div>
      </div>

      <CardContent className="pt-4">
        <div className="flex items-start gap-3 mb-3">
          <ImageWithFallback 
            src={artist.avatar} 
            alt={artist.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-lg -mt-8 relative z-10"
          />
          <div className="flex-1 min-w-0">
            <h3 className="truncate mb-1">{artist.stageName}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {regionNames[artist.region]}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm">{artist.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {artist.reviewCount} отзывов
          </span>
          <span className="text-sm text-muted-foreground">
            • {artist.bookingCount} букингов
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {artist.genres.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genreNames[genre]}
            </Badge>
          ))}
        </div>

        {(artist as any).languages && (artist as any).languages.length > 0 && (
          <div className="text-sm text-muted-foreground mb-2">
            {(artist as any).languages.join(', ')}
          </div>
        )}

        <div className="text-lg">
          {(() => {
            const minPrice = (artist as any).priceRange?.min ?? (artist as any).priceFrom ?? 0;
            const maxPrice = (artist as any).priceRange?.max ?? (artist as any).priceTo ?? 0;
            return `${(minPrice / 1000).toLocaleString()} - ${(maxPrice / 1000).toLocaleString()} ₸`;
          })()}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          onClick={() => onViewProfile(artist.id)}
        >
          Смотреть профиль
        </Button>
      </CardFooter>
    </Card>
  );
}