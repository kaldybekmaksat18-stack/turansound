import { ChevronRight, Home } from 'lucide-react';
import {
  ArtistSection,
  SECTION_LABELS
} from '../types/artist';

interface CatalogBreadcrumbsProps {
  section?: ArtistSection | 'all';
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
}

export function CatalogBreadcrumbs({ 
  section,
  onNavigateHome,
  onNavigateCatalog
}: CatalogBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <button
        onClick={onNavigateHome}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        Главная
      </button>
      
      <ChevronRight className="w-4 h-4" />
      
      <button
        onClick={onNavigateCatalog}
        className={`hover:text-foreground transition-colors ${
          section === 'all' || !section ? 'text-foreground font-medium' : ''
        }`}
      >
        Каталог
      </button>
      
      {section && section !== 'all' && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">
            {SECTION_LABELS[section]}
          </span>
        </>
      )}
    </nav>
  );
}
