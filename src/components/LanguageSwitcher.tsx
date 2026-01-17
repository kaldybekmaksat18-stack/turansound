import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useTranslation } from '../lib/i18n/LanguageContext';
import { Language } from '../lib/i18n/translations';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'kk', label: t.languages.kazakh, flag: '🇰🇿' },
    { code: 'ru', label: t.languages.russian, flag: '🇷🇺' },
    { code: 'en', label: t.languages.english, flag: '🇬🇧' },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang?.flag} {currentLang?.label}</span>
          <span className="sm:hidden">{currentLang?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={language === lang.code ? 'bg-purple-50 dark:bg-purple-950/20' : ''}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
