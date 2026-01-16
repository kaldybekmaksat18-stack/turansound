import { Search, Music, Mic, Film, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  ArtistSection,
  MusicGenre,
  EventFormat,
  SECTION_LABELS,
  GENRE_LABELS,
  EVENT_FORMAT_LABELS
} from '../types/artist';

interface QuickSearchBarProps {
  onSearch: (query: string) => void;
  onQuickFilter: (type: 'section' | 'genre' | 'format', value: string) => void;
}

export function QuickSearchBar({ onSearch, onQuickFilter }: QuickSearchBarProps) {
  const [query, setQuery] = useState('');

  // Популярные быстрые фильтры
  const popularSections: ArtistSection[] = ['stage_artists', 'hosts_and_shows'];
  const popularGenres: MusicGenre[] = ['pop', 'traditional', 'jazz'];
  const popularFormats: EventFormat[] = ['wedding', 'corporate', 'concert'];

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl p-6 mb-8">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Поиск артистов, жанров, стилей..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 h-12 text-base bg-background"
        />
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        {/* Popular Sections */}
        <div className="flex items-center gap-2 flex-wrap">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Популярные:</span>
          {popularSections.map((section) => (
            <Badge
              key={section}
              variant="outline"
              className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
              onClick={() => onQuickFilter('section', section)}
            >
              {section === 'stage_artists' && <Music className="w-3 h-3 mr-1" />}
              {section === 'hosts_and_shows' && <Mic className="w-3 h-3 mr-1" />}
              {SECTION_LABELS[section]}
            </Badge>
          ))}
          {popularGenres.map((genre) => (
            <Badge
              key={genre}
              variant="outline"
              className="cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors"
              onClick={() => onQuickFilter('genre', genre)}
            >
              {GENRE_LABELS[genre]}
            </Badge>
          ))}
          {popularFormats.map((format) => (
            <Badge
              key={format}
              variant="outline"
              className="cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900 transition-colors"
              onClick={() => onQuickFilter('format', format)}
            >
              {EVENT_FORMAT_LABELS[format]}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
