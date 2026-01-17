import { Search, TrendingUp, Shield, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTranslation } from '../lib/i18n/LanguageContext';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const { t } = useTranslation();
  
  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-pink-900/80 to-black/90 z-10" />
      <ImageWithFallback 
        src="https://images.unsplash.com/photo-1689793354800-de168c0a4c9b?w=1920" 
        alt="Music Concert"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">{t.home.artistCount}</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            {t.home.heroTitle}
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
            {t.home.heroSubtitle}
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2 p-2 bg-white rounded-xl shadow-2xl">
              <Input 
                placeholder={t.home.searchPlaceholder}
                className="border-0 bg-transparent text-base"
              />
              <Button 
                size="lg"
                onClick={() => onNavigate('catalog')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Search className="w-5 h-5 mr-2" />
                {t.home.findArtist}
              </Button>
            </div>
          </div>

          {/* Demo hint */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-300/30 rounded-lg p-4 text-sm">
              <p className="text-purple-100">
                💡 <strong>{t.home.demoVersion}</strong> {t.home.demoHint}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-2">{t.home.stats.artists}</div>
              <div className="text-purple-200">{t.home.stats.artistsLabel}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-2">{t.home.stats.countries}</div>
              <div className="text-purple-200">{t.home.stats.countriesLabel}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-2">{t.home.stats.revenue}</div>
              <div className="text-purple-200">{t.home.stats.revenueLabel}</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex gap-3">
              <Shield className="w-6 h-6 flex-shrink-0 text-purple-300" />
              <div>
                <div className="mb-1">{t.home.features.contracts.title}</div>
                <div className="text-sm text-purple-200">{t.home.features.contracts.description}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <TrendingUp className="w-6 h-6 flex-shrink-0 text-purple-300" />
              <div>
                <div className="mb-1">{t.home.features.rating.title}</div>
                <div className="text-sm text-purple-200">{t.home.features.rating.description}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Globe className="w-6 h-6 flex-shrink-0 text-purple-300" />
              <div>
                <div className="mb-1">{t.home.features.export.title}</div>
                <div className="text-sm text-purple-200">{t.home.features.export.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}