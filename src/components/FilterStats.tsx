import { Music, Users, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface FilterStatsProps {
  totalArtists: number;
  filteredArtists: number;
  averageRating?: number;
  topGenre?: string;
}

export function FilterStats({ 
  totalArtists, 
  filteredArtists,
  averageRating = 4.8,
  topGenre = 'Поп'
}: FilterStatsProps) {
  const stats = [
    {
      icon: Users,
      label: 'Найдено',
      value: filteredArtists,
      subtext: `из ${totalArtists}`,
      color: 'purple'
    },
    {
      icon: Star,
      label: 'Средний рейтинг',
      value: averageRating.toFixed(1),
      subtext: 'баллов',
      color: 'yellow'
    },
    {
      icon: Music,
      label: 'Популярный жанр',
      value: topGenre,
      subtext: 'в выборке',
      color: 'pink'
    },
    {
      icon: TrendingUp,
      label: 'Верифицировано',
      value: `${Math.round((filteredArtists * 0.7))}`,
      subtext: 'артистов',
      color: 'blue'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-950`}>
                  <Icon className={`w-4 h-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-muted-foreground truncate">{stat.label}</div>
                  <div className="font-semibold text-lg">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtext}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
