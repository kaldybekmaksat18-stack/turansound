import { Search, TrendingUp, Shield, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
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
            <span className="text-sm">100,000+ артистов в Центральной Азии</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Культура становится экономикой
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
            Цифровой рынок музыкантов, композиторов и артистов.<br />
            От Алматы до Стамбула. От хаоса к системе.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2 p-2 bg-white rounded-xl shadow-2xl">
              <Input 
                placeholder="Жанр, регион или имя артиста..."
                className="border-0 bg-transparent text-base"
              />
              <Button 
                size="lg"
                onClick={() => onNavigate('catalog')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Search className="w-5 h-5 mr-2" />
                Найти артиста
              </Button>
            </div>
          </div>

          {/* Demo hint */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-purple-500/20 backdrop-blur-sm border border-purple-300/30 rounded-lg p-4 text-sm">
              <p className="text-purple-100">
                💡 <strong>Демо-версия:</strong> Нажмите "Регистрация" в правом верхнем углу, чтобы создать аккаунт артиста или заказчика
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-2">100,000+</div>
              <div className="text-purple-200">Артистов</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-2">5 стран</div>
              <div className="text-purple-200">Центральная Азия</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="text-4xl mb-2">₸2 млрд</div>
              <div className="text-purple-200">Оборот в год</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="flex gap-3">
              <Shield className="w-6 h-6 flex-shrink-0 text-purple-300" />
              <div>
                <div className="mb-1">Безопасные контракты</div>
                <div className="text-sm text-purple-200">Защита от кидалова</div>
              </div>
            </div>
            <div className="flex gap-3">
              <TrendingUp className="w-6 h-6 flex-shrink-0 text-purple-300" />
              <div>
                <div className="mb-1">Прозрачный рейтинг</div>
                <div className="text-sm text-purple-200">Реальные отзывы</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Globe className="w-6 h-6 flex-shrink-0 text-purple-300" />
              <div>
                <div className="mb-1">Экспорт культуры</div>
                <div className="text-sm text-purple-200">Выход на мировой рынок</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}