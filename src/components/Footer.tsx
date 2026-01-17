import { Music2, Mail, Phone, MapPin, Instagram, Facebook, Youtube, Shield, CreditCard, Users, Sparkles } from 'lucide-react';
import { useTranslation } from '../lib/i18n/LanguageContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

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
                <p className="font-semibold text-sm">{t.footer.benefits.secureDeals}</p>
                <p className="text-xs text-slate-400">{t.footer.benefits.escrow}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t.footer.benefits.transparency}</p>
                <p className="text-xs text-slate-400">{t.footer.benefits.digitalContracts}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t.footer.benefits.artistsCount}</p>
                <p className="text-xs text-slate-400">{t.footer.benefits.verifiedProfiles}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t.footer.benefits.aiMatching}</p>
                <p className="text-xs text-slate-400">{t.footer.benefits.smartSearch}</p>
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
              {t.footer.about.description}
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
            <h4 className="font-semibold mb-4">{t.footer.forArtists.title}</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('register')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forArtists.register}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forArtists.dashboard}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('verification')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forArtists.verification}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('financial')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forArtists.financial}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('reputation')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forArtists.reputation}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('admin-seed')}
                  className="hover:text-purple-400 transition-colors text-xs"
                >
                  {t.footer.forArtists.adminPanel}
                </button>
              </li>
            </ul>
          </div>

          {/* Для заказчиков */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.forCustomers.title}</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forCustomers.catalog}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('ai-assistant')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forCustomers.aiAssistant}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bookings')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forCustomers.bookings}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contracts')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forCustomers.legalDocs}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('support')}
                  className="hover:text-purple-400 transition-colors"
                >
                  {t.footer.forCustomers.support}
                </button>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.contacts.title}</h4>
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
                <span className="whitespace-pre-line">
                  {t.footer.contacts.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © {currentYear} TuranSound. {t.footer.bottom.rights}
            </p>
            <div className="flex gap-6">
              <button 
                onClick={() => onNavigate('about')}
                className="hover:text-purple-400 transition-colors"
              >
                {t.footer.bottom.about}
              </button>
              <button 
                onClick={() => onNavigate('contracts')}
                className="hover:text-purple-400 transition-colors"
              >
                {t.footer.bottom.terms}
              </button>
              <button 
                onClick={() => onNavigate('contracts')}
                className="hover:text-purple-400 transition-colors"
              >
                {t.footer.bottom.privacy}
              </button>
            </div>
          </div>
        </div>

        {/* Регионы присутствия */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            {t.footer.bottom.regions}
          </p>
        </div>
      </div>
    </footer>
  );
}