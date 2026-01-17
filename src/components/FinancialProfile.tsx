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
import { useProfileTranslation } from '../lib/i18n/useProfileTranslation';
import { useTranslation } from '../lib/i18n/LanguageContext';

interface FinancialProfileProps {
  artistId: string;
}

export function FinancialProfile({ artistId }: FinancialProfileProps) {
  const t = useProfileTranslation();
  const { language } = useTranslation();
  
  // Названия месяцев в зависимости от языка
  const monthNames = {
    kk: ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'],
    ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  
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
    { month: monthNames[language][0], earnings: 450000, bookings: 3 },
    { month: monthNames[language][1], earnings: 380000, bookings: 2 },
    { month: monthNames[language][2], earnings: 520000, bookings: 4 },
    { month: monthNames[language][3], earnings: 620000, bookings: 4 },
    { month: monthNames[language][4], earnings: 580000, bookings: 3 },
    { month: monthNames[language][5], earnings: 650000, bookings: 4 }
  ];

  const eventNames = {
    wedding: t.eventTypes.wedding,
    corporate: t.eventTypes.corporate,
    birthday: t.eventTypes.birthday,
  };

  const recentPayments = [
    { id: '1', date: '2026-01-10', event: eventNames.wedding, venue: ' в Rixos', amount: 450000, status: 'released' },
    { id: '2', date: '2026-01-05', event: eventNames.corporate, venue: ' Tengri Bank', amount: 800000, status: 'released' },
    { id: '3', date: '2025-12-28', event: eventNames.birthday, venue: '', amount: 320000, status: 'released' },
    { id: '4', date: '2025-12-20', event: eventNames.corporate, venue: '', amount: 950000, status: 'released' }
  ];

  const upcomingPayments = [
    { id: '1', date: '2026-02-15', event: eventNames.wedding, venue: '', amount: 500000, status: 'locked' },
    { id: '2', date: '2026-02-20', event: eventNames.corporate, venue: '', amount: 800000, status: 'locked' }
  ];

  const translatedTexts = {
    kk: {
      totalBookings: 'Жалпы букингтар',
      completedSuccessfully: 'Сәтті аяқталды',
      monthlyGrowth: 'Айлық өсім',
      financialReputation: 'Қаржылық беделділік',
      excellentReputation: 'Тамаша беделділік',
      punctuality: 'Уақытылылық',
      reliability: 'Сенімділік',
      noFailures: 'Сәтсіздіктерсіз',
      reliablePerformer: 'Сенімді орындаушы',
      topPerformers: 'Платформаның топ-5% орындаушысы',
      upcomingPayments: 'Күтілетін төлемдер',
      onEscrow: 'Эскроу шотында',
      totalExpected: 'Барлығы күтілуде',
      quickActions: 'Жылдам әрекеттер',
      downloadReport: 'Кезең бойынша есепті жүктеу',
      taxDeclaration: 'Салық декларациясы',
      configurePayouts: 'Төлемдерді баптау',
      earningsChart: 'Кірістер динамикасы',
      lastSixMonths: 'Соңғы 6 ай',
      oneMonth: '1 ай',
      threeMonths: '3 ай',
      sixMonths: '6 ай',
      oneYear: '1 жыл',
      paymentsHistory: 'Төлемдер тарихы',
      export: 'Экспорттау',
      paid: 'Төленді',
      bookings: 'букингтер',
    },
    ru: {
      totalBookings: 'Всего букингов',
      completedSuccessfully: 'Завершено успешно',
      monthlyGrowth: 'Рост за месяц',
      financialReputation: 'Финансовая репутация',
      excellentReputation: 'Отличная репутация',
      punctuality: 'Пунктуальность',
      reliability: 'Надёжность',
      noFailures: 'Без срывов',
      reliablePerformer: 'Надёжный исполнитель',
      topPerformers: 'Вы в топ-5% артистов платформы',
      upcomingPayments: 'Ожидаемые выплаты',
      onEscrow: 'На эскроу-счёте',
      totalExpected: 'Итого ожидается',
      quickActions: 'Быстрые действия',
      downloadReport: 'Скачать отчёт за период',
      taxDeclaration: 'Налоговая декларация',
      configurePayouts: 'Настроить выплаты',
      earningsChart: 'Динамика доходов',
      lastSixMonths: 'Последние 6 месяцев',
      oneMonth: '1 месяц',
      threeMonths: '3 месяца',
      sixMonths: '6 месяцев',
      oneYear: '1 год',
      paymentsHistory: 'История выплат',
      export: 'Экспорт',
      paid: 'Выплачено',
      bookings: 'букингов',
    },
    en: {
      totalBookings: 'Total Bookings',
      completedSuccessfully: 'Completed Successfully',
      monthlyGrowth: 'Monthly Growth',
      financialReputation: 'Financial Reputation',
      excellentReputation: 'Excellent Reputation',
      punctuality: 'Punctuality',
      reliability: 'Reliability',
      noFailures: 'No Failures',
      reliablePerformer: 'Reliable Performer',
      topPerformers: 'You are in the top 5% of platform artists',
      upcomingPayments: 'Upcoming Payments',
      onEscrow: 'On Escrow',
      totalExpected: 'Total Expected',
      quickActions: 'Quick Actions',
      downloadReport: 'Download Period Report',
      taxDeclaration: 'Tax Declaration',
      configurePayouts: 'Configure Payouts',
      earningsChart: 'Earnings Dynamics',
      lastSixMonths: 'Last 6 Months',
      oneMonth: '1 Month',
      threeMonths: '3 Months',
      sixMonths: '6 Months',
      oneYear: '1 Year',
      paymentsHistory: 'Payments History',
      export: 'Export',
      paid: 'Paid',
      bookings: 'bookings',
    }
  };

  const txt = translatedTexts[language];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">{t.financial.title}</h1>
          <p className="text-muted-foreground">
            {t.financial.subtitle}
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
              <div className="text-sm text-muted-foreground">{t.financial.stats.totalEarnings}</div>
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
              <div className="text-sm text-muted-foreground">{t.financial.stats.thisMonth}</div>
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
              <div className="text-sm text-muted-foreground">{t.financial.stats.escrowBalance}</div>
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
              <div className="text-sm text-muted-foreground">{t.financial.stats.averageBooking}</div>
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
                  <h3>{txt.earningsChart}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {txt.lastSixMonths}
                  </p>
                </div>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">{txt.oneMonth}</SelectItem>
                    <SelectItem value="3months">{txt.threeMonths}</SelectItem>
                    <SelectItem value="6months">{txt.sixMonths}</SelectItem>
                    <SelectItem value="1year">{txt.oneYear}</SelectItem>
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
                              {data.bookings} {txt.bookings}
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
                    <div className="text-xs text-muted-foreground">{txt.totalBookings}</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">94%</div>
                    <div className="text-xs text-muted-foreground">{txt.completedSuccessfully}</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1 text-green-600">+23%</div>
                    <div className="text-xs text-muted-foreground">{txt.monthlyGrowth}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>{txt.paymentsHistory}</h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {txt.export}
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
                          <div className="font-medium mb-1">{payment.event}{payment.venue}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(payment.date).toLocaleDateString(language === 'kk' ? 'kk-KZ' : language === 'ru' ? 'ru-RU' : 'en-US')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">
                          +₸{payment.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">{txt.paid}</div>
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
                <h3>{txt.financialReputation}</h3>
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
                    {txt.excellentReputation}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{txt.punctuality}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '98%' }} />
                      </div>
                      <span className="text-sm font-medium">98%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{txt.reliability}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '95%' }} />
                      </div>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{txt.noFailures}</span>
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
                    🏆 {txt.reliablePerformer}
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-300">
                    {txt.topPerformers}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader>
                <h3>{txt.upcomingPayments}</h3>
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
                          <div className="font-medium mb-1">{payment.event}{payment.venue}</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {new Date(payment.date).toLocaleDateString(language === 'kk' ? 'kk-KZ' : language === 'ru' ? 'ru-RU' : 'en-US')}
                          </div>
                          <div className="font-medium text-yellow-600">
                            ₸{payment.amount.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {txt.onEscrow}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{txt.totalExpected}</span>
                    <span className="font-medium">₸{financialData.escrowBalance.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3>{txt.quickActions}</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  {txt.downloadReport}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="w-4 h-4 mr-2" />
                  {txt.taxDeclaration}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  {txt.configurePayouts}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}