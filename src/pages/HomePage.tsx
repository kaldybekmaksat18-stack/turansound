import { TrendingUp, Star, Music2 } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ArtistCard } from '../components/ArtistCard';
import { GenreShowcase } from '../components/GenreShowcase';
import { SectionSelector } from '../components/SectionSelector';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockArtists } from '../data/mockData';
import { genreStats } from '../data/allKazakhArtists';
import { ArtistSection } from '../types/artist';
import { useProfileTranslation } from '../lib/i18n/useProfileTranslation';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const topArtists = mockArtists.slice(0, 6);

  const handleSectionSelect = (section: ArtistSection) => {
    onNavigate('catalog', { section });
  };

  const t = useProfileTranslation();

  return (
    <div>
      <Hero onNavigate={onNavigate} />

      {/* Section Selector - КТО ЭТО */}
      <SectionSelector onSelectSection={handleSectionSelect} />

      <div className="container mx-auto px-4 py-16">
        {/* Top Artists */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Топовые артисты</h2>
              <p className="text-muted-foreground">
                Лучшие музыканты и исполнители Центральной Азии
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate('catalog')}
            >
              Смотреть всех
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                onViewProfile={(id) => onNavigate('artist', { artistId: id })}
              />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-20">
          <h2 className="mb-8 text-center">Популярные жанры</h2>
          <p className="text-center text-muted-foreground mb-12">
            Выберите жанр и познакомьтесь с лучшими казахстанскими артистами
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {Object.entries(genreStats).map(([key, genre]) => (
              <Card
                key={key}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onNavigate('catalog', { genre: genre.name })}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {genre.icon}
                  </div>
                  <div className="font-medium mb-1">{genre.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {genre.count} артистов
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Showcase each genre */}
          <div className="space-y-12">
            <GenreShowcase genre="Традиционная" icon="🎵" onNavigate={onNavigate} />
            <GenreShowcase genre="Свадебная" icon="💒" onNavigate={onNavigate} />
            <GenreShowcase genre="Джаз" icon=".saxophone" onNavigate={onNavigate} />
            <GenreShowcase genre="Электронная" icon="🎧" onNavigate={onNavigate} />
            <GenreShowcase genre="Классика" icon="🎻" onNavigate={onNavigate} />
            <GenreShowcase genre="Поп" icon="🎤" onNavigate={onNavigate} />
            <GenreShowcase genre="Фолк" icon="🪕" onNavigate={onNavigate} />
            <GenreShowcase genre="Домбра" icon="🎸" onNavigate={onNavigate} />
            <GenreShowcase genre="Хосты и шоу-артисты" icon="🎤" onNavigate={onNavigate} />
          </div>
        </div>

        {/* Production Highlight Banner */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 text-white border-0 overflow-hidden">
            <CardContent className="p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 opacity-10 text-9xl">🎬</div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-white/20 text-white border-0">НОВОЕ</Badge>
                  <span className="text-4xl">🎬</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  База продакшн-специалистов
                </h2>
                <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl">
                  20 известных казахстанских профессионалов: актёры, режиссёры, режиссёры рекламы и сценаристы
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={() => onNavigate('production')}
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 border-0"
                  >
                    Смотреть всех артистов
                  </Button>
                  <Button
                    onClick={() => onNavigate('catalog', { section: 'creative_production' })}
                    size="lg"
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  >
                    В каталог
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regions */}
        <div className="mb-20">
          <h2 className="mb-8 text-center">География платформы</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: t.cities.almaty, flag: '🇰🇿', count: 12456 },
              { name: t.cities.astana, flag: '🇰🇿', count: 8765 },
              { name: t.cities.shymkent, flag: '🇰🇿', count: 5432 },
              { name: t.cities.tashkent, flag: '🇺🇿', count: 9876 },
              { name: t.cities.bishkek, flag: '🇰🇬', count: 4321 }
            ].map((city, index) => (
              <Card
                key={city.name}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate('catalog', { region: city.name })}
              >
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl mb-2">{city.flag}</div>
                  <div className="font-medium mb-1">{city.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {city.count.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white rounded-2xl p-12">
          <h2 className="text-center mb-12 text-white">Платформа в цифрах</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">100,000+</div>
              <div className="text-purple-200">Артистов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">234,567</div>
              <div className="text-purple-200">Выступлений</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">4.87</div>
              <div className="text-purple-200">Средний рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl mb-2">₸2 млрд</div>
              <div className="text-purple-200">Оборот</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}