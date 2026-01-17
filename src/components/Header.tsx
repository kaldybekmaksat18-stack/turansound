import { Music, Search, Menu, User, Calendar, Sparkles, Bell, MessageSquare, LogIn, LogOut, Settings, TrendingUp, DollarSign, FileText, Shield, X } from 'lucide-react';
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../lib/i18n/LanguageContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  currentUser?: any;
  onLogout?: () => void;
}

export function Header({ onNavigate, currentPage, currentUser, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-lg">{t.header.platformName}</div>
              <div className="text-xs text-muted-foreground">{t.header.platformSubtitle}</div>
            </div>
            <div className="sm:hidden">
              <div className="font-semibold">{t.header.platformName}</div>
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
              {t.header.home}
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`transition-colors ${
                currentPage === 'catalog' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.header.catalog}
            </button>
            <button
              onClick={() => onNavigate('production')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'production' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.header.production}
            </button>
            <button
              onClick={() => onNavigate('ai-assistant')}
              className={`flex items-center gap-1 transition-colors ${
                currentPage === 'ai-assistant' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {t.header.aiAssistant}
            </button>
            <button
              onClick={() => onNavigate('reputation')}
              className={`transition-colors ${
                currentPage === 'reputation' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.header.reputation}
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors ${
                currentPage === 'about' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.header.about}
            </button>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {currentUser ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleNavigate('notifications')}
                  className="relative hidden sm:flex"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleNavigate('bookings')}
                  className="hidden sm:flex"
                >
                  <Calendar className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleNavigate('support')}
                  className="hidden sm:flex"
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
                
                {/* Profile Dropdown - Desktop */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hidden md:flex items-center gap-2"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-sm">
                        {currentUser.name?.charAt(0) || 'U'}
                      </div>
                      <span className="text-sm">{currentUser.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">{currentUser.name}</span>
                        <span className="text-xs text-muted-foreground font-normal">{currentUser.email}</span>
                        <span className="text-xs text-purple-600 font-normal mt-1">
                          {currentUser.role === 'artist' ? t.header.artist : t.header.customer}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        if (currentUser.role === 'artist') {
                          handleNavigate('profile-settings');
                        } else {
                          handleNavigate('customer-profile');
                        }
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t.header.settings}
                    </DropdownMenuItem>
                    {currentUser.role === 'artist' && (
                      <>
                        <DropdownMenuItem onClick={() => handleNavigate('dashboard')}>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {t.header.dashboard}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleNavigate('financial')}>
                          <DollarSign className="w-4 h-4 mr-2" />
                          {t.header.financial}
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={() => handleNavigate('contracts')}>
                      <FileText className="w-4 h-4 mr-2" />
                      {t.header.contracts}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate('verification')}>
                      <Shield className="w-4 h-4 mr-2" />
                      {t.header.verification}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      {t.header.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleNavigate('login')}
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex"
                >
                  {t.header.login}
                </Button>
                <Button
                  onClick={() => handleNavigate('register')}
                  size="sm"
                  className="hidden md:flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t.header.register}
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-lg">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <span>TuranSound</span>
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex flex-col gap-4 mt-8">
                  {/* User Info Mobile */}
                  {currentUser && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg mb-2">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-lg">
                        {currentUser.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{currentUser.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{currentUser.email}</div>
                        <div className="text-xs text-purple-600 mt-0.5">
                          {currentUser.role === 'artist' ? t.header.artist : t.header.customer}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <nav className="flex flex-col gap-2">
                    <Button
                      variant={currentPage === 'home' ? 'secondary' : 'ghost'}
                      className="justify-start"
                      onClick={() => handleNavigate('home')}
                    >
                      {t.header.home}
                    </Button>
                    <Button
                      variant={currentPage === 'catalog' ? 'secondary' : 'ghost'}
                      className="justify-start"
                      onClick={() => handleNavigate('catalog')}
                    >
                      {t.header.catalog}
                    </Button>
                    <Button
                      variant={currentPage === 'production' ? 'secondary' : 'ghost'}
                      className="justify-start"
                      onClick={() => handleNavigate('production')}
                    >
                      {t.header.production}
                    </Button>
                    <Button
                      variant={currentPage === 'ai-assistant' ? 'secondary' : 'ghost'}
                      className="justify-start"
                      onClick={() => handleNavigate('ai-assistant')}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t.header.aiAssistant}
                    </Button>
                    <Button
                      variant={currentPage === 'reputation' ? 'secondary' : 'ghost'}
                      className="justify-start"
                      onClick={() => handleNavigate('reputation')}
                    >
                      {t.header.reputation}
                    </Button>
                    <Button
                      variant={currentPage === 'about' ? 'secondary' : 'ghost'}
                      className="justify-start"
                      onClick={() => handleNavigate('about')}
                    >
                      {t.header.about}
                    </Button>
                  </nav>

                  {/* User Actions Mobile */}
                  {currentUser ? (
                    <>
                      <div className="border-t pt-4 mt-2">
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => handleNavigate('notifications')}
                          >
                            <Bell className="w-4 h-4 mr-2" />
                            {t.header.notifications}
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => handleNavigate('bookings')}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            {t.header.bookings}
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => handleNavigate('support')}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            {t.header.support}
                          </Button>
                        </div>
                      </div>

                      <div className="border-t pt-4 mt-2">
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => {
                              if (currentUser.role === 'artist') {
                                handleNavigate('profile-settings');
                              } else {
                                handleNavigate('customer-profile');
                              }
                            }}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            {t.header.settings}
                          </Button>
                          {currentUser.role === 'artist' && (
                            <>
                              <Button
                                variant="ghost"
                                className="justify-start"
                                onClick={() => handleNavigate('dashboard')}
                              >
                                <TrendingUp className="w-4 h-4 mr-2" />
                                {t.header.dashboard}
                              </Button>
                              <Button
                                variant="ghost"
                                className="justify-start"
                                onClick={() => handleNavigate('financial')}
                              >
                                <DollarSign className="w-4 h-4 mr-2" />
                                {t.header.financial}
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => handleNavigate('contracts')}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            {t.header.contracts}
                          </Button>
                          <Button
                            variant="ghost"
                            className="justify-start"
                            onClick={() => handleNavigate('verification')}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            {t.header.verification}
                          </Button>
                        </div>
                      </div>

                      <Button
                        variant="destructive"
                        className="mt-4"
                        onClick={() => {
                          onLogout?.();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {t.header.logout}
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2 mt-4">
                      <Button
                        onClick={() => handleNavigate('login')}
                        variant="outline"
                        className="w-full"
                      >
                        {t.header.login}
                      </Button>
                      <Button
                        onClick={() => handleNavigate('register')}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        {t.header.register}
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}