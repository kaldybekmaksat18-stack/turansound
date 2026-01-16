import { Music2, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Shield, CreditCard, Users, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white mt-20">
      {/* Преимущества платформы */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Безопасные сделки</p>
                <p className="text-xs text-slate-400">Эскроу-счета</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Прозрачность</p>
                <p className="text-xs text-slate-400">Цифровые контракты</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">180+ артистов</p>
                <p className="text-xs text-slate-400">Проверенные профили</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">AI-подбор</p>
                <p className="text-xs text-slate-400">Умный поиск</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О платформе */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                <Music2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">TuranSound</h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              Цифровая платформа для музыкального рынка Центральной Азии. Объединяем артистов и заказчиков в единой экосистеме.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 hover:bg-purple-600 rounded-lg transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Для артистов */}
          <div>
            <h4 className="font-semibold mb-4">Для артистов</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('register')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Регистрация артиста
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Личный кабинет
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('verification')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Верификация профиля
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('financial')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Финансовый профиль
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('reputation')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Репутационная система
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin-seed')}
                  className="hover:text-purple-400 transition-colors text-xs"
                >
                  🔧 Админ-панель (Dev)
                </button>
              </li>
            </ul>
          </div>

          {/* Для заказчиков */}
          <div>
            <h4 className="font-semibold mb-4">Для заказчиков</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Каталог артистов
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')}
                  className="hover:text-purple-400 transition-colors"
                >
                  AI-ассистент
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bookings')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Мои бронирования
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contracts')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Юридические документы
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('support')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Поддержка и споры
                </button>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-purple-400" />
                <a href="mailto:info@turansound.com" className="hover:text-purple-400 transition-colors">
                  info@turansound.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-purple-400" />
                <a href="tel:+77011234567" className="hover:text-purple-400 transition-colors">
                  +7 (701) 123-45-67
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-purple-400" />
                <span>
                  Алматы, Казахстан<br />
                  пр. Абая, 150
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © {currentYear} TuranSound. Все права защищены.
            </p>
            <div className="flex gap-6">
              <button 
                onClick={() => onNavigate('about')}
                className="hover:text-purple-400 transition-colors"
              >
                О платформе
              </button>
              <button 
                onClick={() => onNavigate('contracts')}
                className="hover:text-purple-400 transition-colors"
              >
                Условия использования
              </button>
              <button 
                onClick={() => onNavigate('contracts')}
                className="hover:text-purple-400 transition-colors"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>

        {/* Регионы присутствия */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Работаем в: Алматы • Астана • Шымкент • Караганда • Ташкент • Бишкек • Стамбул
          </p>
        </div>
      </div>
    </footer>
  );
}