import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, MapPin, Clock, BadgeCheck } from 'lucide-react';
import { 
  productionStats, 
  actors, 
  directors, 
  adDirectors, 
  screenwriters 
} from '../data/productionArtists';
import { ROLE_LABELS } from '../types/artist';

interface ProductionShowcaseProps {
  onNavigate: (page: string, params?: any) => void;
}

export function ProductionShowcase({ onNavigate }: ProductionShowcaseProps) {
  const categories = [
    { key: 'actors', data: productionStats.actors, artists: actors, gradient: 'from-purple-500 to-pink-500' },
    { key: 'directors', data: productionStats.directors, artists: directors, gradient: 'from-pink-500 to-rose-500' },
    { key: 'adDirectors', data: productionStats.adDirectors, artists: adDirectors, gradient: 'from-violet-500 to-purple-500' },
    { key: 'screenwriters', data: productionStats.screenwriters, artists: screenwriters, gradient: 'from-fuchsia-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-6">
      {/* Заголовок */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🎬</span>
            <span className="font-semibold">Креатив и продакшн</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            База продакшн-специалистов
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            20 известных казахстанских профессионалов из мира кино, театра и рекламы
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Card 
              key={category.key} 
              className="hover:shadow-xl transition-all duration-300 border-2 hover:scale-105 cursor-pointer"
              onClick={() => onNavigate('catalog', { section: 'creative_production' })}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{category.data.icon}</span>
                  <Badge className={`bg-gradient-to-r ${category.gradient} text-white border-0`}>
                    {category.data.count}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{category.data.name}</h3>
                <p className="text-sm text-gray-600">Профессионалов в базе</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Категории артистов */}
      {categories.map((category) => (
        <div key={category.key} className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className={`text-4xl p-3 bg-gradient-to-r ${category.gradient} rounded-xl text-white`}>
              {category.data.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold">{category.data.name}</h2>
              <p className="text-gray-600">{category.data.count} специалистов</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.artists.map((artist) => (
              <Card 
                key={artist.id} 
                className="hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
                onClick={() => onNavigate('artist', { artistId: artist.id })}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={artist.avatar} 
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      {artist.isVerified && (
                        <Badge className="bg-blue-500 text-white border-0 flex items-center gap-1">
                          <BadgeCheck className="h-3 w-3" />
                          Верифицирован
                        </Badge>
                      )}
                      {artist.isAvailable && (
                        <Badge className="bg-green-500 text-white border-0">
                          Доступен
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl mb-2">{artist.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {artist.roles.map((role) => (
                      <Badge 
                        key={role} 
                        variant="outline"
                        className={`bg-gradient-to-r ${category.gradient} text-white border-0`}
                      >
                        {ROLE_LABELS[role]}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {artist.bio}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span>{artist.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{artist.experience} лет опыта</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{artist.rating}</span>
                      <span className="text-gray-500">({artist.reviewCount} отзывов)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-xs text-gray-500">От</div>
                      <div className="font-bold text-lg">
                        {(artist.priceFrom / 1000).toLocaleString()} ₸
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">До</div>
                      <div className="font-bold text-lg text-purple-600">
                        {artist.priceTo ? `${(artist.priceTo / 1000).toLocaleString()} ₸` : '—'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="text-xs text-gray-500 mb-1">Форматы мероприятий:</div>
                    <div className="flex flex-wrap gap-1">
                      {artist.eventFormats.slice(0, 3).map((format) => (
                        <Badge 
                          key={format} 
                          variant="secondary"
                          className="text-xs"
                        >
                          {format}
                        </Badge>
                      ))}
                      {artist.eventFormats.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{artist.eventFormats.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Призыв к действию */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Готовы начать работу с профессионалами?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Все артисты верифицированы, имеют подтвержденный опыт работы и готовы к сотрудничеству
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => onNavigate('catalog', { section: 'creative_production' })}
                className="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Открыть каталог
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="px-8 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
              >
                О платформе
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}