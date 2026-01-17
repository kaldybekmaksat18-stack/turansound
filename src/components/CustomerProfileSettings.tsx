import { useState, useEffect } from 'react';
import { 
  Building2, 
  User, 
  Calendar, 
  DollarSign, 
  FileText,
  Shield,
  Settings,
  Sparkles,
  Upload,
  Check,
  X,
  Eye,
  MapPin,
  Phone,
  Mail,
  Users,
  CreditCard,
  Plus,
  Trash2,
  Edit,
  Bell,
  Lock,
  UserPlus,
  AlertTriangle,
  TrendingUp,
  Star,
  Clock,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { useCustomerProfile } from '../hooks/useCustomerProfile';
import { useProfileTranslation } from '../lib/i18n/useProfileTranslation';

interface CustomerProfileSettingsProps {
  customerId: string;
  onNavigate: (page: string) => void;
}

export function CustomerProfileSettings({ customerId, onNavigate }: CustomerProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Подключаем переводы
  const t = useProfileTranslation();
  
  // Используем хук для работы с профилем
  const { profile: dbProfile, loading, error: dbError, saveProfile } = useCustomerProfile(customerId);

  // Mock data
  const [profileData, setProfileData] = useState({
    // Basic - используем значения по умолчанию для undefined полей
    customerType: 'company',
    fullName: '',
    companyName: '',
    city: 'almaty',
    phone: '',
    email: '',
    avatar: '',
    verified: false,
    vipStatus: false,
    bio: '',
    eventPreferences: [] as string[],
    budgetRange: { min: 0, max: 0 },
    
    // History & Stats (эти данные не из профиля, а из других таблиц)
    totalEvents: 0,
    activeBookings: 0,
    cancelledEvents: 0,
    totalSpent: 0,
    
    // Reputation
    rating: 0,
    reliability: 0,
    artistReviews: 0,
    status: 'new',
    
    // Payment
    paymentMethods: [] as any[],
    
    // Team (for companies)
    team: [] as any[],
    
    // Дополнительные поля для совместимости
    name: '',
    contactPerson: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    invoiceAlerts: true
  });

  const eventHistory = [
    {
      id: '1',
      name: 'Корпоратив Новый Год 2025',
      date: '2025-12-31',
      artist: 'Aigerim Soul',
      amount: 800000,
      status: 'completed',
      rating: 5
    },
    {
      id: '2',
      name: 'День рождения компании',
      date: '2025-10-15',
      artist: 'DJ Arman',
      amount: 350000,
      status: 'completed',
      rating: 5
    },
    {
      id: '3',
      name: 'Презентация нового продукта',
      date: '2026-02-20',
      artist: 'Jazz Band Almaty',
      amount: 600000,
      status: 'upcoming'
    }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Сохраняем только те поля, которые есть в таблице customer_profiles
      const profileToSave = {
        full_name: profileData.fullName,
        company_name: profileData.companyName,
        avatar: profileData.avatar,
        phone: profileData.phone,
        email: profileData.email,
        city: profileData.city,
        event_preferences: profileData.eventPreferences,
        budget_range: profileData.budgetRange,
        bio: profileData.bio
      };
      
      await saveProfile(profileToSave);
      setIsEditing(false);
      toast.success('Профиль обновлён', {
        description: 'Изменения сохранены успешно'
      });
    } catch (error) {
      toast.error(t.common.saving, {
        description: t.customerSettings.saving || t.common.saving
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (dbProfile) {
      setProfileData(prev => ({
        ...prev, // Сохраняем существующие поля (mock data)
        // Обновляем только те поля, которые есть в базе данных
        fullName: dbProfile.full_name || '',
        companyName: dbProfile.company_name || '',
        city: dbProfile.city || 'almaty',
        phone: dbProfile.phone || '',
        email: dbProfile.email || '',
        avatar: dbProfile.avatar || '',
        bio: dbProfile.bio || '',
        eventPreferences: dbProfile.event_preferences || [],
        budgetRange: dbProfile.budget_range || { min: 0, max: 0 }
      }));
    }
  }, [dbProfile]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">Настройки профиля заказчика</h1>
              <p className="text-muted-foreground">
                Управление профилем и мероприятиями
              </p>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {t.common.cancel}
                  </Button>
                  <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.common.saving}
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {t.common.save}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Edit className="w-4 h-4 mr-2" />
                  {t.common.edit}
                </Button>
              )}
            </div>
          </div>

          {/* Verification & VIP Status */}
          <div className="grid md:grid-cols-2 gap-4">
            {profileData.verified && (
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <div className="font-medium text-green-900 dark:text-green-100">
                    ✓ Профиль верифицирован
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Документы проверены
                  </div>
                </div>
                <Badge className="bg-green-600">Проверено</Badge>
              </div>
            )}
            {profileData.vipStatus && (
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800 flex items-center gap-3">
                <Star className="w-5 h-5 text-purple-600" />
                <div className="flex-1">
                  <div className="font-medium text-purple-900 dark:text-purple-100">
                    👑 VIP-статус
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">
                    Приоритет и скидки
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">VIP</Badge>
              </div>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="basic">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Основное</span>
            </TabsTrigger>
            <TabsTrigger value="history">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
            <TabsTrigger value="reputation">
              <Star className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Репутация</span>
            </TabsTrigger>
            <TabsTrigger value="finance">
              <DollarSign className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Финансы</span>
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Мероприятия</span>
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">AI</span>
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Команда</span>
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Безопасность</span>
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Основная информация</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Type */}
                <div>
                  <Label htmlFor="customerType">Тип заказчика *</Label>
                  <Select
                    value={profileData.customerType}
                    onValueChange={(value) => setProfileData({ ...profileData, customerType: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="customerType" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Частное лицо</SelectItem>
                      <SelectItem value="restaurant">Ресторан / Зал</SelectItem>
                      <SelectItem value="agency">Event-агентство</SelectItem>
                      <SelectItem value="government">Госорган</SelectItem>
                      <SelectItem value="company">Компания</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Avatar & Name */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Логотип / Аватар</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <ImageWithFallback 
                        src={profileData.avatar}
                        alt={profileData.name}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Загрузить
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">
                      {profileData.customerType === 'individual' ? 'Полное имя' : 'Название организации'} *
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Contact Person (for non-individuals) */}
                {profileData.customerType !== 'individual' && (
                  <div>
                    <Label htmlFor="contactPerson">Контактное лицо</Label>
                    <Input
                      id="contactPerson"
                      value={profileData.contactPerson}
                      onChange={(e) => setProfileData({ ...profileData, contactPerson: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                )}

                {/* Location & Contacts */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Город *</Label>
                    <Select
                      value={profileData.city}
                      onValueChange={(value) => setProfileData({ ...profileData, city: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="city" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="almaty">{t.cities.almaty}</SelectItem>
                        <SelectItem value="astana">{t.cities.astana}</SelectItem>
                        <SelectItem value="shymkent">{t.cities.shymkent}</SelectItem>
                        <SelectItem value="karaganda">{t.cities.karaganda}</SelectItem>
                        <SelectItem value="tashkent">{t.cities.tashkent}</SelectItem>
                        <SelectItem value="bishkek">{t.cities.bishkek}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Documents */}
                <div className="p-4 bg-muted rounded-lg">
                  <Label className="mb-3 block">Документы для контрактов</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-background">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium text-sm">БИН: 123456789012</div>
                          <div className="text-xs text-muted-foreground">Tengri Capital LLP</div>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-3">
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить документ
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>История мероприятий</h3>
              </CardHeader>
              <CardContent>
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl mb-1">{profileData.totalEvents}</div>
                    <div className="text-sm text-muted-foreground">Всего</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-2xl mb-1 text-green-600">{profileData.activeBookings}</div>
                    <div className="text-sm text-muted-foreground">Активных</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="text-2xl mb-1 text-red-600">{profileData.cancelledEvents}</div>
                    <div className="text-sm text-muted-foreground">Отменено</div>
                  </div>
                </div>

                {/* Event List */}
                <div className="space-y-3">
                  {eventHistory.map((event) => (
                    <div key={event.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="mb-1">{event.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        {event.status === 'completed' ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Завершено
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                            Предстоит
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Артист:</span> {event.artist}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">₸{event.amount.toLocaleString()}</span>
                          {event.rating && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < event.rating
                                      ? 'fill-yellow-500 text-yellow-500'
                                      : 'text-muted'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reputation Tab */}
          <TabsContent value="reputation" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Репутация заказчика</h3>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Score */}
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
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
                          stroke="url(#gradient-customer)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(profileData.rating / 5) * 351.86} 351.86`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient-customer" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9333ea" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold">{profileData.rating}</div>
                        <div className="text-sm text-muted-foreground">из 5.0</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {profileData.artistReviews} отзывов от артистов
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Надёжность</span>
                        <span className="text-sm font-medium">{profileData.reliability}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${profileData.reliability}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Своевременная оплата</span>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Коммуникация</span>
                        <span className="text-sm font-medium">98%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-600 rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100 mb-1">
                        ✓ Надёжный заказчик
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Артисты охотно работают с вами
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Финансы и платежи</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Methods */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Способы оплаты</Label>
                    {isEditing && (
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {profileData.paymentMethods.map((method) => (
                      <div key={method.id} className="p-4 rounded-lg border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium mb-1">
                              {method.type === 'card' ? `•••• ${method.last4}` : method.number}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {method.type === 'card' ? 'Банковская карта' : 'Расчётный счёт'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {method.default && <Badge variant="secondary">По умолчанию</Badge>}
                          {isEditing && (
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Stats */}
                <div>
                  <Label className="mb-3 block">Статистика платежей</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-1">₸12.5M</div>
                      <div className="text-sm text-muted-foreground">Всего потрачено</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl mb-1">24</div>
                      <div className="text-sm text-muted-foreground">Транзакций</div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <Label className="mb-3 block">Счета и акты</Label>
                  <div className="space-y-2">
                    {[
                      { id: '1', number: 'СЧ-001234', date: '2026-01-10', amount: 800000 },
                      { id: '2', number: 'СЧ-001123', date: '2025-12-15', amount: 350000 }
                    ].map((invoice) => (
                      <div key={invoice.id} className="p-3 rounded-lg border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-sm">{invoice.number}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(invoice.date).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm">₸{invoice.amount.toLocaleString()}</span>
                          <Button variant="ghost" size="icon">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>Мои мероприятия</h3>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать мероприятие
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-8 text-center border-2 border-dashed rounded-lg">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="mb-2">Создайте своё первое мероприятие</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Опишите мероприятие, выберите артистов и управляйте всем в одном месте
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3>AI-помощник заказчика</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Умный подбор артистов и планирование
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* AI Features */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium mb-1">🎯 Подбор артистов</div>
                      <div className="text-xs text-muted-foreground">
                        AI найдёт идеальных исполнителей под ваше мероприятие
                      </div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium mb-1">💰 Рекомендации по бюджету</div>
                      <div className="text-xs text-muted-foreground">
                        Оптимальное распределение бюджета
                      </div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium mb-1">📋 Сценарий мероприятия</div>
                      <div className="text-xs text-muted-foreground">
                        Генерация программы и тайминга
                      </div>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-medium mb-1">⏰ Тайминг программы</div>
                      <div className="text-xs text-muted-foreground">
                        Умное планирование времени
                      </div>
                    </div>
                  </Button>
                </div>

                {/* Recent Recommendations */}
                <div>
                  <h4 className="mb-3">Недавние рекомендации</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex gap-3">
                        <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                            Сэкономьте 15% на крпоративе
                          </div>
                          <div className="text-sm text-purple-700 dark:text-purple-300">
                            В будние дни цены артистов на 15% ниже. Рекомендуем 14-15 февраля
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>Управление командой</h3>
                  {isEditing && (
                    <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Пригласить
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profileData.team.map((member) => (
                    <div key={member.id} className="p-4 rounded-lg border flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ImageWithFallback 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                          alt={member.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium mb-1">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Select value={member.role} disabled={!isEditing}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Админ</SelectItem>
                            <SelectItem value="editor">Редактор</SelectItem>
                            <SelectItem value="viewer">Просмотр</SelectItem>
                          </SelectContent>
                        </Select>
                        {isEditing && (
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <h4 className="mb-3">Роли и права</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Админ</span>
                      <span>Полный доступ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Редактор</span>
                      <span>Создание и редактирование</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Просмотр</span>
                      <span>Только чтение</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Настройки безопасности</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Two-Factor */}
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium mb-1">Двухфакторная аутентификация</div>
                      <div className="text-sm text-muted-foreground">
                        Дополнительня защита аккаунта
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })
                    }
                  />
                </div>

                {/* Notifications */}
                <div>
                  <h4 className="mb-3">Уведомления</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm">Email-уведомления</span>
                      <Switch
                        checked={securitySettings.emailNotifications}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, emailNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm">SMS-уведомления</span>
                      <Switch
                        checked={securitySettings.smsNotifications}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, smsNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm">Новые предложения артистов</span>
                      <Switch
                        checked={securitySettings.bookingAlerts}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, bookingAlerts: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm">Счета и акты</span>
                      <Switch
                        checked={securitySettings.invoiceAlerts}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, invoiceAlerts: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}