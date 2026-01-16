import { 
  TrendingUp, 
  Shield, 
  Globe, 
  Sparkles, 
  Users, 
  DollarSign,
  Music,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface AboutPlatformProps {
  onNavigate: (page: string) => void;
}

export function AboutPlatform({ onNavigate }: AboutPlatformProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/10 border-white/20">О платформе</Badge>
          <h1 className="text-5xl md:text-6xl mb-6">
            TuranSound
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
            Превращаем культуру Центральной Азии из хаоса в цифровую экономику
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Problem Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-center mb-4">Проблема рынка</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Сегодня музыканты, тамады и артисты в РК и ЦА работают как в 1998 году
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '90% в тени',
              'Нет каталога',
              'Нет рейтингов',
              'Нет контрактов',
              'Нет защиты',
              'Нет истории',
              'Нет экспорта',
              'Нет аналитики'
            ].map((problem) => (
              <div
                key={problem}
                className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 text-center"
              >
                <div className="text-sm text-red-900 dark:text-red-100">{problem}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-center mb-4">Наше решение</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Как Uber превратил такси из хаоса в систему —<br />
            мы превращаем культуру в экономику
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3>Для артистов</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span>Цифровое портфолио с видео и аудио</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span>Рейтинг и история выступлений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span>Календарь и онлайн-контракты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span>Безопасные платежи</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span>Выход на рынки ЦА, Турции, России</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-950 rounded-xl flex items-center justify-center mb-3">
                  <Target className="w-6 h-6 text-pink-600" />
                </div>
                <h3>Для заказчиков</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    <span>Фильтры по жанру, региону, цене</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    <span>Видео выступлений и отзывы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    <span>Прозрачные цены</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    <span>Гарантированные контракты</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                    <span>Защита от обмана</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-xl flex items-center justify-center mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3>Для государства</h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span>Учёт оборота культурных услуг</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span>Налоговая прозрачность</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span>Экспорт культурного продукта</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span>Поддержка национальных артистов</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span>Аналитика и статистика</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2>AI — цифровой продюсер</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Искусственный интеллект превращает платформу в мозг индустрии
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Собирает сет-лист под аудиторию',
                'Пишет сценарий мероприятия',
                'Подбирает состав группы',
                'Планирует туры',
                'Анализирует вкусы региона',
                'Прогнозирует спрос'
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Size */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-center mb-12">Размер рынка</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-5xl mb-2">100,000+</div>
                <div className="text-muted-foreground">Артистов в ЦА</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-5xl mb-2">5</div>
                <div className="text-muted-foreground">Стран охвата</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-5xl mb-2">₸2 млрд</div>
                <div className="text-muted-foreground">Годовой оборот</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why it will work */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-12">Почему это выстрелит</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="mb-2">Деньги есть</h4>
                    <p className="text-sm text-muted-foreground">
                      Миллиарды тенге оборота в год, миллионы мероприятий
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="mb-2">Системы нет</h4>
                    <p className="text-sm text-muted-foreground">
                      Ноль цифровой инфраструктуры — мы первые
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="mb-2">Культурный экспорт</h4>
                    <p className="text-sm text-muted-foreground">
                      Прямой выход на рынки без посредников-кровопийц
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Music className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="mb-2">Огромная культура</h4>
                    <p className="text-sm text-muted-foreground">
                      Центральная Азия — это музыка, свадьбы, туризм, диаспоры
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
