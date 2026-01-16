import { 
  DollarSign, 
  FileText, 
  Star, 
  TrendingUp,
  Calendar,
  Users,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ArtistDashboardProps {
  onNavigate: (page: string) => void;
  userId: string;
}

export function ArtistDashboard({ onNavigate, userId }: ArtistDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">Панель артиста</h1>
          <p className="text-muted-foreground">
            Управление профилем, финансами и репутацией
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 flex gap-3">
          <Button 
            variant="outline"
            onClick={() => onNavigate('profile-settings')}
          >
            <Users className="w-4 h-4 mr-2" />
            Редактировать профиль
          </Button>
          <Button 
            variant="outline"
            onClick={() => onNavigate('bookings')}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Мои бронирования
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Financial Profile */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onNavigate('financial')}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="mb-2">Финансовый профиль</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Доходы, аналитика, налоговые отчёты
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Этот месяц</span>
                  <span className="font-medium">₸650,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">На эскроу</span>
                  <span className="font-medium">₸1,300,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contracts & Legal */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onNavigate('contracts')}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="mb-2">Контракты и ЭЦП</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Смарт-контракты, шаблоны, юридические документы
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Активных</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Завершённых</span>
                  <span className="font-medium">20</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reputation System */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onNavigate('reputation')}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-950 dark:to-pink-900 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-pink-600" />
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Platinum
                </Badge>
              </div>
              <h3 className="mb-2">Репутация</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Рейтинг, отзывы, достижения
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Общий балл</span>
                  <span className="font-medium">96/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Отзывов</span>
                  <span className="font-medium">127</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings */}
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => onNavigate('bookings')}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950 dark:to-green-900 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="mb-2">Бронирования</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Управление заказами и расписанием
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Предстоящих</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">В этом месяце</span>
                  <span className="font-medium">4</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-950 dark:to-yellow-900 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  +23%
                </Badge>
              </div>
              <h3 className="mb-2">Аналитика</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Статистика, инсайты, тренды
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Просмотры</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Конверсия</span>
                  <span className="font-medium">12.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audience */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950 dark:to-orange-900 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h3 className="mb-2">Аудитория</h3>
              <p className="text-sm text-muted-foreground mb-4">
                География, предпочтения, сегменты
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Подписчиков</span>
                  <span className="font-medium">456</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Регионы</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card className="mt-6">
          <CardHeader>
            <h3>Быстрая статистика</h3>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">₸4.8M</div>
                <div className="text-sm text-muted-foreground">Всего заработано</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">20</div>
                <div className="text-sm text-muted-foreground">Выступлений</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">4.9</div>
                <div className="text-sm text-muted-foreground">Средний рейтинг</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Надёжность</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}