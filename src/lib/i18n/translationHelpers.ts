import { Language } from './translations';
import { profileTranslationsComplete } from './profileTexts-complete';

// Хелперы для получения переведенных значений

export function getCityName(cityKey: string, language: Language): string {
  const cities = profileTranslationsComplete[language].cities;
  return cities[cityKey as keyof typeof cities] || cityKey;
}

export function getPerformanceFormatName(formatKey: string, language: Language): string {
  const formats = profileTranslationsComplete[language].performanceFormats;
  return formats[formatKey as keyof typeof formats] || formatKey;
}

export function getEventTypeName(eventKey: string, language: Language): string {
  const events = profileTranslationsComplete[language].eventTypes;
  return events[eventKey as keyof typeof events] || eventKey;
}

export function getCustomerTypeName(typeKey: string, language: Language): string {
  const types = profileTranslationsComplete[language].customerTypes;
  return types[typeKey as keyof typeof types] || typeKey;
}

export function getTeamRoleName(roleKey: string, language: Language): string {
  const roles = profileTranslationsComplete[language].teamRoles;
  return roles[roleKey as keyof typeof roles] || roleKey;
}

export function getStatusName(statusKey: string, language: Language): string {
  const statuses = profileTranslationsComplete[language].statuses;
  return statuses[statusKey as keyof typeof statuses] || statusKey;
}

export function getMonthName(monthIndex: number, language: Language): string {
  const months = {
    kk: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 
         'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
    ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
         'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 
         'July', 'August', 'September', 'October', 'November', 'December']
  };
  return months[language][monthIndex] || '';
}

export function getShortMonthName(monthIndex: number, language: Language): string {
  const months = {
    kk: ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 
         'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел'],
    ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 
         'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  return months[language][monthIndex] || '';
}

// Функция для форматирования дат на нужном языке
export function formatDate(date: Date | string, language: Language): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const day = d.getDate();
  const month = getMonthName(d.getMonth(), language);
  const year = d.getFullYear();
  
  if (language === 'en') {
    return `${month} ${day}, ${year}`;
  }
  return `${day} ${month} ${year}`;
}

// Функция для относительного времени ("5 минут назад")
export function getRelativeTime(date: Date | string, language: Language): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);
  
  const translations = {
    kk: {
      minutesAgo: (n: number) => `${n} минут бұрын`,
      hoursAgo: (n: number) => `${n} сағат бұрын`,
      daysAgo: (n: number) => `${n} күн бұрын`,
      weeksAgo: (n: number) => `${n} апта бұрын`
    },
    ru: {
      minutesAgo: (n: number) => `${n} минут назад`,
      hoursAgo: (n: number) => `${n} часов назад`,
      daysAgo: (n: number) => `${n} дней назад`,
      weeksAgo: (n: number) => `${n} недель назад`
    },
    en: {
      minutesAgo: (n: number) => `${n} minutes ago`,
      hoursAgo: (n: number) => `${n} hours ago`,
      daysAgo: (n: number) => `${n} days ago`,
      weeksAgo: (n: number) => `${n} weeks ago`
    }
  };
  
  const t = translations[language];
  
  if (weeks > 0) return t.weeksAgo(weeks);
  if (days > 0) return t.daysAgo(days);
  if (hours > 0) return t.hoursAgo(hours);
  return t.minutesAgo(minutes);
}
