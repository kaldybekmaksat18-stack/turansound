import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  PieChart, 
  BarChart3,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FinancialProfileProps {
  artistId: string;
}

export function FinancialProfile({ artistId }: FinancialProfileProps) {
  const financialData = {
    totalEarnings: 4850000,
    currentMonth: 650000,
    averageBooking: 242500,
    bookingsCount: 20,
    escrowBalance: 1300000,
    pendingPayments: 850000,
    monthlyGrowth: 23.5,
    reputationScore: 96
  };

  const monthlyData = [
    { month: 'Янв', earnings: 450000, bookings: 3 },
    { month: 'Фев', earnings: 380000, bookings: 2 },
    { month: 'Мар', earnings: 520000, bookings: 4 },
    { month: 'Апр', earnings: 620000, bookings: 4 },
    { month: 'Май', earnings: 580000, bookings: 3 },
    { month: 'Июн', earnings: 650000, bookings: 4 }
  ];

  const recentPayments = [
    { id: '1', date: '2026-01-10', event: 'Свадьба в Rixos', amount: 450000, status: 'released' },
    { id: '2', date: '2026-01-05', event: 'Корпоратив Tengri Bank', amount: 800000, status: 'released' },
    { id: '3', date: '2025-12-28', event: 'День рождения', amount: 320000, status: 'released' },
    { id: '4', date: '2025-12-20', event: 'Новогодний корпоратив', amount: 950000, status: 'released' }
  ];

  const upcomingPayments = [
    { id: '1', date: '2026-02-15', event: 'Свадьба', amount: 500000, status: 'locked' },
    { id: '2', date: '2026-02-20', event: 'Корпоратив', amount: 800000, status: 'locked' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Финансовый профиль</h1>
          <p className="text-muted-foreground">
            Управление доходами и финансовой репутацией
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  +{financialData.monthlyGrowth}%
                </Badge>
              </div>
              <div className="text-2xl mb-1">₸{(financialData.totalEarnings / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Всего заработано</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl mb-1">₸{financialData.currentMonth.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Этот месяц</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950 dark:to-green-900 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-2xl mb-1">₸{(financialData.escrowBalance / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">На эскроу</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-950 dark:to-pink-900 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <div className="text-2xl mb-1">₸{financialData.averageBooking.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Средний чек</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Charts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <h3>Динамика доходов</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Последние 6 месяцев
                  </p>
                </div>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 месяц</SelectItem>
                    <SelectItem value="3months">3 месяца</SelectItem>
                    <SelectItem value="6months">6 месяцев</SelectItem>
                    <SelectItem value="1year">1 год</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => {
                    const maxEarnings = Math.max(...monthlyData.map(d => d.earnings));
                    const percentage = (data.earnings / maxEarnings) * 100;
                    
                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{data.month}</span>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">
                              {data.bookings} букингов
                            </Badge>
                            <span className="text-sm font-medium">
                              ₸{data.earnings.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-1">{financialData.bookingsCount}</div>
                    <div className="text-xs text-muted-foreground">Всего букингов</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">94%</div>
                    <div className="text-xs text-muted-foreground">Завершено успешно</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1 text-green-600">+23%</div>
                    <div className="text-xs text-muted-foreground">Рост за месяц</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>История выплат</h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium mb-1">{payment.event}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          +₸{payment.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Выплачено</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Financial Reputation */}
            <Card>
              <CardHeader>
                <h3>Финансовая репутация</h3>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(financialData.reputationScore / 100) * 351.86} 351.86`}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#9333ea" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl font-bold">{financialData.reputationScore}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Отличная репутация
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Пунктуальность</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '98%' }} />
                      </div>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Надёжность</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '95%' }} />
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Без срывов</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '100%' }} />
                      </div>
                      <span className="text-sm font-medium">100%</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                    🏆 Надёжный исполнитель
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300">
                    Вы в топ-5% артистов платформы
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <h3>Ожидаемые выплаты</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1">{payment.event}</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {new Date(payment.date).toLocaleDateString('ru-RU')}
                          </div>
                          <div className="font-medium text-yellow-600">
                            ₸{payment.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            На эскроу-счёте
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Итого ожидается</span>
                    <span className="font-medium">₸{financialData.escrowBalance.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3>Быстрые действия</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать отчёт за период
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="w-4 h-4 mr-2" />
                  Налоговая декларация
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Настроить выплаты
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
