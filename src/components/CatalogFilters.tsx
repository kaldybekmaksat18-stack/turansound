import { Filter, SlidersHorizontal, Music, Mic, Film } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  ArtistSection,
  ArtistRole,
  MusicGenre,
  NationalStyle,
  EventFormat,
  SECTION_LABELS,
  ROLE_LABELS,
  GENRE_LABELS,
  NATIONAL_STYLE_LABELS,
  EVENT_FORMAT_LABELS,
  ROLES_BY_SECTION
} from '../types/artist';

interface FilterState {
  search: string;
  section: ArtistSection | 'all';
  roles: ArtistRole[];
  genres: MusicGenre[];
  nationalStyles: NationalStyle[];
  eventFormats: EventFormat[];
  region: string;
  priceRange: [number, number];
  rating: number;
}

interface CatalogFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
}

export function CatalogFilters({ filters, onFilterChange, onReset }: CatalogFiltersProps) {
  // Получаем доступные роли для выбранного раздела
  const availableRoles = filters.section !== 'all' 
    ? ROLES_BY_SECTION[filters.section]
    : Object.values(ROLES_BY_SECTION).flat();

  const toggleRole = (role: ArtistRole) => {
    if (filters.roles.includes(role)) {
      onFilterChange({ roles: filters.roles.filter(r => r !== role) });
    } else {
      onFilterChange({ roles: [...filters.roles, role] });
    }
  };

  const toggleGenre = (genre: MusicGenre) => {
    if (filters.genres.includes(genre)) {
      onFilterChange({ genres: filters.genres.filter(g => g !== genre) });
    } else {
      onFilterChange({ genres: [...filters.genres, genre] });
    }
  };

  const toggleNationalStyle = (style: NationalStyle) => {
    if (filters.nationalStyles.includes(style)) {
      onFilterChange({ nationalStyles: filters.nationalStyles.filter(s => s !== style) });
    } else {
      onFilterChange({ nationalStyles: [...filters.nationalStyles, style] });
    }
  };

  const toggleEventFormat = (format: EventFormat) => {
    if (filters.eventFormats.includes(format)) {
      onFilterChange({ eventFormats: filters.eventFormats.filter(f => f !== format) });
    } else {
      onFilterChange({ eventFormats: [...filters.eventFormats, format] });
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <h3>Фильтры</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Сбросить
        </Button>
      </div>

      {/* Search */}
      <div>
        <Label htmlFor="search">Поиск</Label>
        <Input
          id="search"
          placeholder="Имя артиста..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="mt-2"
        />
      </div>

      {/* СЛОЙ 1: Разделы (КТО) */}
      <div>
        <Label className="mb-3 block">Раздел</Label>
        <div className="grid grid-cols-1 gap-2">
          {[
            { id: 'all' as const, label: 'Все', icon: Filter },
            { id: 'stage_artists' as ArtistSection, label: SECTION_LABELS.stage_artists, icon: Music },
            { id: 'hosts_and_shows' as ArtistSection, label: SECTION_LABELS.hosts_and_shows, icon: Mic },
            { id: 'creative_production' as ArtistSection, label: SECTION_LABELS.creative_production, icon: Film }
          ].map((section) => {
            const Icon = section.icon;
            const isSelected = filters.section === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  onFilterChange({ 
                    section: section.id,
                    // Сбрасываем роли при смене раздела
                    roles: []
                  });
                }}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                    : 'bg-muted'
                }`}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-sm font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* СЛОЙ 2: Роли (ЧТО ДЕЛАЮТ) */}
      {filters.section !== 'all' && (
        <div>
          <Label className="mb-3 block">Роли</Label>
          <div className="space-y-2">
            {availableRoles.map((role) => (
              <div
                key={role}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  filters.roles.includes(role)
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20'
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => toggleRole(role)}
              >
                <Checkbox
                  checked={filters.roles.includes(role)}
                  onCheckedChange={(e) => {
                    e.stopPropagation?.();
                  }}
                />
                <Label className="cursor-pointer flex-1 text-sm" onClick={(e) => e.preventDefault()}>
                  {ROLE_LABELS[role]}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* СЛОЙ 3: Музыкальные жанры */}
      <div>
        <Label className="mb-3 block">Жанры</Label>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(GENRE_LABELS) as [MusicGenre, string][]).map(([genre, label]) => {
            const isSelected = filters.genres.includes(genre);
            return (
              <Badge
                key={genre}
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    : 'hover:border-purple-600'
                }`}
                onClick={() => toggleGenre(genre)}
              >
                {label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* СЛОЙ 3: Национальные стили */}
      <div>
        <Label className="mb-3 block">Национальные стили</Label>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(NATIONAL_STYLE_LABELS) as [NationalStyle, string][]).map(([style, label]) => {
            const isSelected = filters.nationalStyles.includes(style);
            return (
              <Badge
                key={style}
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700'
                    : 'hover:border-violet-600'
                }`}
                onClick={() => toggleNationalStyle(style)}
              >
                {label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* СЛОЙ 3: Форматы мероприятий */}
      <div>
        <Label className="mb-3 block">Фор��аты мероприятий</Label>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(EVENT_FORMAT_LABELS) as [EventFormat, string][]).map(([format, label]) => {
            const isSelected = filters.eventFormats.includes(format);
            return (
              <Badge
                key={format}
                variant={isSelected ? 'default' : 'outline'}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
                    : 'hover:border-pink-600'
                }`}
                onClick={() => toggleEventFormat(format)}
              >
                {label}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Region */}
      <div>
        <Label htmlFor="region">Регион</Label>
        <Select
          value={filters.region}
          onValueChange={(value) => onFilterChange({ region: value })}
        >
          <SelectTrigger id="region" className="mt-2">
            <SelectValue placeholder="Все регионы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все регионы</SelectItem>
            <SelectItem value="almaty">Алматы</SelectItem>
            <SelectItem value="astana">Астана</SelectItem>
            <SelectItem value="shymkent">Шымкент</SelectItem>
            <SelectItem value="karaganda">Караганда</SelectItem>
            <SelectItem value="tashkent">Ташкент</SelectItem>
            <SelectItem value="bishkek">Бишкек</SelectItem>
            <SelectItem value="istanbul">Стамбул</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label>Цена (тыс. ₸)</Label>
        <div className="mt-4 mb-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => onFilterChange({ priceRange: value as [number, number] })}
            min={0}
            max={3000}
            step={50}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0]} тыс.</span>
            <span>{filters.priceRange[1]} тыс.</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div>
        <Label>Минимальный рейтинг</Label>
        <div className="mt-4 mb-2">
          <Slider
            value={[filters.rating]}
            onValueChange={(value) => onFilterChange({ rating: value[0] })}
            min={0}
            max={5}
            step={0.5}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0</span>
            <span className="font-medium text-foreground">⭐ {filters.rating}+</span>
            <span>5</span>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.section !== 'all' || 
        filters.region !== 'all' || 
        filters.search || 
        filters.roles.length > 0 ||
        filters.genres.length > 0 ||
        filters.nationalStyles.length > 0 ||
        filters.eventFormats.length > 0 ||
        filters.rating > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < 3000
      ) && (
        <div>
          <Label>Активные фильтры</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.search && (
              <Badge variant="secondary" className="gap-1">
                Поиск: {filters.search}
              </Badge>
            )}
            {filters.section !== 'all' && (
              <Badge variant="secondary">
                Раздел: {SECTION_LABELS[filters.section]}
              </Badge>
            )}
            {filters.roles.length > 0 && filters.roles.map(role => (
              <Badge key={role} variant="secondary" className="bg-purple-100 dark:bg-purple-950">
                {ROLE_LABELS[role]}
              </Badge>
            ))}
            {filters.genres.length > 0 && filters.genres.map(genre => (
              <Badge key={genre} variant="secondary" className="bg-pink-100 dark:bg-pink-950">
                {GENRE_LABELS[genre]}
              </Badge>
            ))}
            {filters.nationalStyles.length > 0 && filters.nationalStyles.map(style => (
              <Badge key={style} variant="secondary" className="bg-violet-100 dark:bg-violet-950">
                {NATIONAL_STYLE_LABELS[style]}
              </Badge>
            ))}
            {filters.eventFormats.length > 0 && filters.eventFormats.map(format => (
              <Badge key={format} variant="secondary" className="bg-rose-100 dark:bg-rose-950">
                {EVENT_FORMAT_LABELS[format]}
              </Badge>
            ))}
            {filters.region !== 'all' && (
              <Badge variant="secondary">
                Регион: {filters.region}
              </Badge>
            )}
            {filters.rating > 0 && (
              <Badge variant="secondary">
                Рейтинг: ⭐ {filters.rating}+
              </Badge>
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 3000) && (
              <Badge variant="secondary">
                Цена: {filters.priceRange[0]}-{filters.priceRange[1]} тыс. ₸
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}