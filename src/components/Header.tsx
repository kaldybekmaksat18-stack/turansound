import { Music, Search, Menu, User, Calendar, Sparkles, Bell, MessageSquare, LogIn, LogOut, Settings, TrendingUp, DollarSign, FileText, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  currentUser?: any;
  onLogout?: () => void;
}

export function Header({ onNavigate, currentPage, currentUser, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-lg">TuranSound</div>
              <div className="text-xs text-muted-foreground">Платформа артистов ЦА</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors ${
                currentPage === 'home' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`transition-colors ${
                currentPage === 'catalog' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Каталог
            </button>
            <button
              onClick={() => onNavigate('production')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'production' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🎬 Продакшн
            </button>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'ai-assistant' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              AI-Помощник
            </button>
            <button
              onClick={() => onNavigate('reputation')}
              className={`transition-colors ${
                currentPage === 'reputation' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Репутация
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors ${
                currentPage === 'about' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              О платформе
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onNavigate('notifications')}
                  className="relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onNavigate('bookings')}
                >
                  <Calendar className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onNavigate('support')}
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
                
                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm">
                        {currentUser.name?.charAt(0) || 'U'}
                      </div>
                      <span className="hidden md:inline text-sm">{currentUser.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">{currentUser.name}</span>
                        <span className="text-xs text-muted-foreground font-normal">{currentUser.email}</span>
                        <span className="text-xs text-purple-600 font-normal mt-1">
                          {currentUser.role === 'artist' ? '🎵 Артист' : '👤 Заказчик'}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        if (currentUser.role === 'artist') {
                          onNavigate('profile-settings');
                        } else {
                          onNavigate('customer-profile');
                        }
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Настройки профиля
                    </DropdownMenuItem>
                    {currentUser.role === 'artist' && (
                      <>
                        <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Дашборд
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onNavigate('financial')}>
                          <DollarSign className="w-4 h-4 mr-2" />
                          Финансы
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={() => onNavigate('contracts')}>
                      <FileText className="w-4 h-4 mr-2" />
                      Контракты
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onNavigate('verification')}>
                      <Shield className="w-4 h-4 mr-2" />
                      Верификация
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  onClick={() => onNavigate('login')}
                  variant="ghost"
                  className="hidden md:flex"
                >
                  Войти
                </Button>
                <Button
                  onClick={() => onNavigate('register')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}