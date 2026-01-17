import { useTranslation } from './LanguageContext';
import { profileTranslations, ProfileTranslations } from './profileTexts';
import { profileTranslationsComplete, ProfileTranslationsComplete } from './profileTexts-complete';

// Объединенный тип переводов (ProfileTranslationsComplete содержит базовые поля)
export type CombinedTranslations = ProfileTranslations & ProfileTranslationsComplete;

// Хук для доступа ко всем переводам (объединяет оба модуля)
export function useProfileTranslation(): CombinedTranslations {
  const { language } = useTranslation();
  
  // Получаем переводы из обоих источников с fallback на русский
  const profile = profileTranslations[language] || profileTranslations['ru'];
  const complete = profileTranslationsComplete[language] || profileTranslationsComplete['ru'];
  
  // Объединяем: сначала complete (базовые поля), потом profile (специфичные)
  // Это гарантирует, что cities, common и другие базовые поля будут доступны
  const combined = {
    ...complete,
    ...profile,
    // Явно переопределяем common, чтобы объединить оба источника
    common: {
      ...complete.common,
      ...(profile as any).common // если есть в profile
    }
  } as CombinedTranslations;
  
  return combined;
}