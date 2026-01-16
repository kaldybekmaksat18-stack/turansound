import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';
import { getArtistsByGenre } from '../data/allKazakhArtists';

interface GenreShowcaseProps {
  genre: string;
  icon: string;
  onNavigate: (page: string, params?: any) => void;
}

export function GenreShowcase({ genre, icon, onNavigate }: GenreShowcaseProps) {
  const artists = getArtistsByGenre(genre).slice(0, 8); // Ограничиваем до 8 артистов
  const topArtists = artists.slice(0, 3); // Показываем топ-3 артистов

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-xl font-semibold">{genre}</h3>
          <p className="text-sm text-muted-foreground">{artists.length} артистов</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topArtists.map((artist) => (
          <Card
            key={artist.id}
            className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
            onClick={() => onNavigate('artist', { artistId: artist.id })}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {(artist.verified || artist.isVerified) && (
                <Badge className="absolute top-2 right-2 bg-purple-600">
                  ✓ Верифицирован
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-1">{artist.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{artist.stageName}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{artist.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({artist.reviewCount} отзывов)
                </span>
              </div>

              <div className="text-sm text-muted-foreground">
                {artist.priceRange?.min 
                  ? `${artist.priceRange.min.toLocaleString()} - ${artist.priceRange.max.toLocaleString()} ₸`
                  : `от ${artist.priceFrom.toLocaleString()} ₸`
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          className="text-purple-600 hover:text-purple-700 font-medium text-sm"
          onClick={() => onNavigate('catalog', { genre })}
        >
          Смотреть всех {artists.length} артистов →
        </button>
      </div>
    </div>
  );
}