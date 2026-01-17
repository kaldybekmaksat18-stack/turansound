import { useState, useMemo } from 'react';
import { CatalogFilters } from '../components/CatalogFilters';
import { CatalogBreadcrumbs } from '../components/CatalogBreadcrumbs';
import { QuickSearchBar } from '../components/QuickSearchBar';
import { FilterStats } from '../components/FilterStats';
import { ArtistCard } from '../components/ArtistCard';
import { mockArtists } from '../data/mockData';
import { Artist } from '../types';
import {
  ArtistSection,
  ArtistRole,
  MusicGenre,
  NationalStyle,
  EventFormat
} from '../types/artist';
import { mapArtistsArray } from '../utils/artistMapper';
import { useTranslation } from '../lib/i18n/LanguageContext';

interface CatalogPageProps {
  onNavigate: (page: string, params?: any) => void;
  initialSection?: ArtistSection;
}

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

export function CatalogPage({ onNavigate, initialSection }: CatalogPageProps) {
  const { t } = useTranslation();
  
  // Маппим всех артистов в новый формат с section и roles
  const artists = useMemo(() => mapArtistsArray(mockArtists), []);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    section: initialSection || 'all',
    roles: [],
    genres: [],
    nationalStyles: [],
    eventFormats: [],
    region: 'all',
    priceRange: [0, 3000],
    rating: 0
  });

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          artist.name.toLowerCase().includes(searchLower) ||
          artist.stageName.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // СЛОЙ 1: Section filter (раздел каталога)
      if (filters.section !== 'all') {
        // Проверяем наличие поля section в новом формате
        if ((artist as any).section) {
          if ((artist as any).section !== filters.section) return false;
        } else {
          // Если нет section, пропускаем артиста при выборе конкретного раздела
          return false;
        }
      }

      // СЛОЙ 2: Roles filter (роли - множественный выбор)
      if (filters.roles.length > 0) {
        const artistRoles = (artist as any).roles || [];
        // Проверяем, есть ли хотя бы одна роль из выбранных
        const hasMatchingRole = filters.roles.some(role => artistRoles.includes(role));
        if (!hasMatchingRole) return false;
      }

      // СЛОЙ 3: Genres filter (жанры)
      if (filters.genres.length > 0) {
        const artistGenres = artist.genres || [];
        // Проверяем, есть ли хотя бы один жанр из выбранных
        const hasMatchingGenre = filters.genres.some(genre => artistGenres.includes(genre));
        if (!hasMatchingGenre) return false;
      }

      // СЛОЙ 3: National Styles filter (национальные стили)
      if (filters.nationalStyles.length > 0) {
        const artistNationalStyles = (artist as any).nationalStyles || [];
        // Проверяем, есть ли хотя бы один стиль из выбранных
        const hasMatchingStyle = filters.nationalStyles.some(style => 
          artistNationalStyles.includes(style)
        );
        if (!hasMatchingStyle) return false;
      }

      // СЛОЙ 3: Event Formats filter (форматы мероприятий)
      if (filters.eventFormats.length > 0) {
        const artistEventFormats = (artist as any).eventFormats || [];
        // Проверяем, есть ли хотя бы один формат из выбранных
        const hasMatchingFormat = filters.eventFormats.some(format => 
          artistEventFormats.includes(format)
        );
        if (!hasMatchingFormat) return false;
      }

      // Region filter
      if (filters.region !== 'all') {
        if (artist.region !== filters.region) return false;
      }

      // Price filter
      const priceMin = filters.priceRange[0] * 1000;
      const priceMax = filters.priceRange[1] * 1000;
      
      // Handle both old priceRange format and new priceFrom/priceTo format
      const artistMinPrice = (artist as any).priceRange?.min ?? (artist as any).priceFrom ?? 0;
      const artistMaxPrice = (artist as any).priceRange?.max ?? (artist as any).priceTo ?? Infinity;
      
      if (artistMaxPrice < priceMin || artistMinPrice > priceMax) {
        return false;
      }

      // Rating filter
      if (artist.rating < filters.rating) return false;

      return true;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleReset = () => {
    setFilters({
      search: '',
      section: 'all',
      roles: [],
      genres: [],
      nationalStyles: [],
      eventFormats: [],
      region: 'all',
      priceRange: [0, 3000],
      rating: 0
    });
  };

  const handleQuickFilter = (type: 'section' | 'genre' | 'format', value: string) => {
    if (type === 'section') {
      setFilters({ 
        ...filters, 
        section: value as ArtistSection,
        roles: [] // Сбрасываем роли при смене раздела
      });
    } else if (type === 'genre') {
      const genre = value as MusicGenre;
      if (!filters.genres.includes(genre)) {
        setFilters({ ...filters, genres: [...filters.genres, genre] });
      }
    } else if (type === 'format') {
      const format = value as EventFormat;
      if (!filters.eventFormats.includes(format)) {
        setFilters({ ...filters, eventFormats: [...filters.eventFormats, format] });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <CatalogBreadcrumbs
          section={filters.section}
          onNavigateHome={() => onNavigate('home')}
          onNavigateCatalog={() => {
            setFilters({ ...filters, section: 'all' });
          }}
        />

        <div className="mb-8">
          <h1 className="mb-2">{t.catalog.title}</h1>
          <p className="text-muted-foreground">
            {filteredArtists.length} {t.catalog.artistsFound}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <CatalogFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Quick Search Bar */}
            <QuickSearchBar
              onSearch={(query) => handleFilterChange({ search: query })}
              onQuickFilter={handleQuickFilter}
            />

            {/* Filter Stats */}
            <FilterStats
              totalArtists={mockArtists.length}
              filteredArtists={filteredArtists.length}
            />

            {filteredArtists.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    onViewProfile={(id) => onNavigate('artist', { artistId: id })}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="mb-2">{t.catalog.noArtistsFound}</h3>
                <p className="text-muted-foreground mb-6">
                  {t.catalog.subtitle}
                </p>
                <button
                  onClick={handleReset}
                  className="text-purple-600 hover:text-purple-700"
                >
                  {t.catalog.clearFilters}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}