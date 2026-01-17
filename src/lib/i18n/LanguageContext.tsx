import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'turansound_language';

// Detect browser language
function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'ru';
  
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith('kk') || browserLang.startsWith('kaz')) {
    return 'kk';
  } else if (browserLang.startsWith('ru')) {
    return 'ru';
  } else if (browserLang.startsWith('en')) {
    return 'en';
  }
  
  // Default to Russian for Central Asian region
  return 'ru';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved && (saved === 'kk' || saved === 'ru' || saved === 'en')) {
        return saved as Language;
      }
    }
    
    // Otherwise detect from browser
    return detectBrowserLanguage();
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      // Update HTML lang attribute for SEO
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    // Set initial lang attribute
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

// Alias for backward compatibility
export const useLanguage = useTranslation;