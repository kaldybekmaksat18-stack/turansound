import { useState, useEffect } from 'react';
import { AboutPlatform } from './components/AboutPlatform';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { BookingsPage } from './components/BookingsPage';
import { FinancialProfile } from './components/FinancialProfile';
import { ContractsLegal } from './components/ContractsLegal';
import { ReputationSystem } from './components/ReputationSystem';
import { ArtistDashboard } from './components/ArtistDashboard';
import { ArtistProfileSettings } from './components/ArtistProfileSettings';
import { CustomerProfileSettings } from './components/CustomerProfileSettings';
import { NotificationCenter } from './components/NotificationCenter';
import { VerificationCenter } from './components/VerificationCenter';
import { SupportDisputes } from './components/SupportDisputes';
import { EnhancedBookingModal } from './components/EnhancedBookingModal';
import { DatabaseSetupWarning } from './components/DatabaseSetupWarning';
import { DatabaseSeedPanel } from './components/DatabaseSeedPanel';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductionPage } from './pages/ProductionPage';
import { ArtistProfile } from './components/ArtistProfile';
import { AIAssistant } from './components/AIAssistant';
import { mockArtists } from './data/mockData';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { User } from './types';
import { authHelpers } from './utils/supabase/client';
import { useDatabaseStatus } from './hooks/useDatabaseStatus';

type Page = 'home' | 'catalog' | 'artist' | 'ai-assistant' | 'about' | 'bookings' | 'login' | 'register' | 'financial' | 'contracts' | 'reputation' | 'dashboard' | 'profile-settings' | 'customer-profile' | 'notifications' | 'verification' | 'support' | 'production' | 'admin-seed';

interface PageParams {
  artistId?: string;
  genre?: string;
  region?: string;
  section?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<PageParams>({});
  const [bookingArtist, setBookingArtist] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { tablesExist, checking } = useDatabaseStatus();

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const session = await authHelpers.getSession();
      
      if (session?.access_token && session.user) {
        console.log('Existing session found');
        console.log('User ID:', session.user.id);
        console.log('User metadata:', session.user.user_metadata);
        
        // Use auth metadata directly (no backend call needed)
        const authUser = session.user;
        setCurrentUser({
          id: authUser.id,
          email: authUser.email || '',
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
          phone: authUser.user_metadata?.phone || '',
          region: authUser.user_metadata?.region || 'almaty',
          role: authUser.user_metadata?.role || 'client',
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.email}`,
          ...(authUser.user_metadata?.role === 'artist' && {
            stageName: authUser.user_metadata?.stageName,
            genres: authUser.user_metadata?.genres || [],
            experience: authUser.user_metadata?.experience,
          })
        });
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  };

  const handleNavigate = (page: Page, params?: PageParams) => {
    setCurrentPage(page);
    if (params) {
      setPageParams(params);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = (artistId: string) => {
    if (!currentUser) {
      toast.info('Войдите или зарегистрируйтесь для бронирования');
      handleNavigate('login');
      return;
    }
    setBookingArtist(artistId);
  };

  const handleBookingConfirm = () => {
    setBookingArtist(null);
    toast.success('Бронирование подтверждено!', {
      description: 'Деньги заблокированы на эскроу-счёте. Контракт создан.'
    });
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    toast.success(`Добро пожаловать, ${user.name}!`);
  };

  const handleRegister = (user: User) => {
    setCurrentUser(user);
    toast.success('Регистрация успешна!', {
      description: 'Добро пожаловать на TuranSound'
    });
  };

  const handleLogout = async () => {
    try {
      await authHelpers.signOut();
      setCurrentUser(null);
      handleNavigate('home');
      toast.success('Вы успешно вышли из системы');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Ошибка при выходе');
    }
  };

  const selectedArtist = pageParams.artistId 
    ? mockArtists.find(a => a.id === pageParams.artistId)
    : null;

  const bookingModalArtist = bookingArtist 
    ? mockArtists.find(a => a.id === bookingArtist)
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Database Setup Warning */}
      {!checking && tablesExist === false && <DatabaseSetupWarning />}
      
      <Header 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      <div className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'catalog' && <CatalogPage onNavigate={handleNavigate} initialSection={pageParams.section} />}
        {currentPage === 'artist' && selectedArtist && (
          <ArtistProfile 
            artist={selectedArtist}
            onBack={() => handleNavigate('catalog')}
            onBook={handleBook}
          />
        )}
        {currentPage === 'ai-assistant' && <AIAssistant onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPlatform onNavigate={handleNavigate} />}
        {currentPage === 'login' && (
          <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
        )}
        {currentPage === 'register' && (
          <RegisterPage onNavigate={handleNavigate} onRegister={handleRegister} />
        )}
        {currentPage === 'bookings' && (
          <BookingsPage onNavigate={handleNavigate} userId={currentUser?.id} />
        )}
        {currentPage === 'financial' && (
          <FinancialProfile artistId={currentUser?.id || '1'} />
        )}
        {currentPage === 'contracts' && (
          <ContractsLegal userRole={currentUser?.role || 'artist'} />
        )}
        {currentPage === 'reputation' && (
          <ReputationSystem userId={currentUser?.id || '1'} userRole={currentUser?.role || 'artist'} />
        )}
        {currentPage === 'dashboard' && (
          <ArtistDashboard onNavigate={handleNavigate} userId={currentUser?.id || '1'} />
        )}
        {currentPage === 'profile-settings' && (
          <ArtistProfileSettings artistId={currentUser?.id || '1'} onNavigate={handleNavigate} />
        )}
        {currentPage === 'customer-profile' && (
          <CustomerProfileSettings customerId={currentUser?.id || '1'} onNavigate={handleNavigate} />
        )}
        {currentPage === 'notifications' && (
          <NotificationCenter />
        )}
        {currentPage === 'verification' && (
          <VerificationCenter userType={currentUser?.role || 'artist'} userId={currentUser?.id || '1'} />
        )}
        {currentPage === 'support' && (
          <SupportDisputes userId={currentUser?.id || '1'} userRole={currentUser?.role || 'artist'} />
        )}
        {currentPage === 'production' && (
          <ProductionPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'admin-seed' && (
          <DatabaseSeedPanel />
        )}
      </div>

      {/* Enhanced Booking Modal */}
      {bookingModalArtist && (
        <EnhancedBookingModal
          artist={bookingModalArtist}
          onClose={() => setBookingArtist(null)}
          onConfirm={handleBookingConfirm}
          userId={currentUser?.id}
        />
      )}

      <Toaster />
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}