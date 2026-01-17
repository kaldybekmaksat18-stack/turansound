import { useState, useEffect } from 'react';
import { toast } from 'sonner@2.0.3';
import { useArtistProfile } from '../hooks/useArtistProfile';
import { isSupabaseConfigured } from '../lib/supabase';
import { useProfileTranslation } from '../lib/i18n/useProfileTranslation';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  User, Music, DollarSign, Calendar, Shield, Check, Edit, Eye, 
  Camera, Video, Lock, Plus, X, Upload, FileAudio, Trash2, 
  Sparkles, TrendingUp, MapPin, Bell, Smartphone, AlertTriangle,
  Star, Loader2
} from 'lucide-react';

interface ArtistProfileSettingsProps {
  artistId: string;
  onNavigate: (page: string) => void;
}

export function ArtistProfileSettings({ artistId, onNavigate }: ArtistProfileSettingsProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Подключаем переводы
  const t = useProfileTranslation();
  
  // Состояния для добавления языков и жанров
  const [newLanguage, setNewLanguage] = useState('');
  const [newGenre, setNewGenre] = useState('');
  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [showGenreInput, setShowGenreInput] = useState(false);
  
  // Используем хук для работы с профилем
  const { profile: dbProfile, loading, error: dbError, saveProfile } = useArtistProfile(artistId);

  // Mock data с default values
  const [profileData, setProfileData] = useState({
    // Basic
    stageName: '',
    realName: '',
    avatar: '',
    coverVideo: '',
    city: 'almaty',
    languages: [] as string[],
    genres: [] as string[],
    format: 'solo',
    bio: '',
    verified: false,
    experience: 0,
    totalPerformances: 0,
    
    // Commercial
    basePrice: 0,
    priceRanges: {
      wedding: { min: 0, max: 0 },
      corporate: { min: 0, max: 0 },
      private: { min: 0, max: 0 }
    },
    included: [] as string[],
    additionalServices: [] as any[],
    
    // Calendar
    availability: {
      weekdays: true,
      weekends: true,
      holidays: true
    },
    willingToTravel: false,
    travelRegions: [] as string[],
    
    // Media
    audioTracks: [] as any[],
    videos: [] as any[],
    photos: [] as string[]
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    emailNotifications: true,
    smsNotifications: false,
    bookingAlerts: true,
    reviewAlerts: true,
    profileVisibility: 'public',
    showRealName: false,
    showPhone: false
  });

  // Загружаем данные из базы при монтировании или изменении dbProfile
  useEffect(() => {
    if (dbProfile) {
      setProfileData({
        stageName: dbProfile.stage_name || '',
        realName: dbProfile.real_name || '',
        avatar: dbProfile.avatar || 'https://images.unsplash.com/photo-1545947288-c22ade2af79d?w=400',
        coverVideo: dbProfile.cover_video || '',
        city: dbProfile.city || 'almaty',
        languages: dbProfile.languages || [],
        genres: dbProfile.genres || [],
        format: 'solo', // TODO: add to DB schema
        bio: dbProfile.bio || '',
        verified: dbProfile.verified || false,
        experience: dbProfile.experience || 0,
        totalPerformances: dbProfile.total_performances || 0,
        basePrice: dbProfile.base_price || 0,
        priceRanges: dbProfile.price_ranges || {
          wedding: { min: 0, max: 0 },
          corporate: { min: 0, max: 0 },
          private: { min: 0, max: 0 }
        },
        included: dbProfile.included_services || [],
        additionalServices: dbProfile.additional_services || [],
        availability: dbProfile.availability || {
          weekdays: true,
          weekends: true,
          holidays: true
        },
        willingToTravel: dbProfile.willing_to_travel || false,
        travelRegions: dbProfile.travel_regions || [],
        audioTracks: dbProfile.audio_tracks || [],
        videos: dbProfile.videos || [],
        photos: dbProfile.photos || []
      });
    } else if (!loading && !dbProfile) {
      // Если профиль не найден и загрузка завершена, используем дефолтные значения
      setProfileData({
        stageName: 'Aigerim Soul',
        realName: 'Айгерім Касымова',
        avatar: 'https://images.unsplash.com/photo-1545947288-c22ade2af79d?w=400',
        coverVideo: '',
        city: 'almaty',
        languages: ['Казахский', 'Русский', 'Английский'],
        genres: ['Джаз', 'Соул', 'Поп'],
        format: 'solo',
        bio: 'Профессиональная певица с 8-летним опытом. Специализируюсь на джазе и соуле. Выступала на международных фестивалях.',
        verified: false,
        experience: 8,
        totalPerformances: 156,
        basePrice: 250000,
        priceRanges: {
          wedding: { min: 300000, max: 500000 },
          corporate: { min: 400000, max: 800000 },
          private: { min: 250000, max: 400000 }
        },
        included: ['Живое исполнение 3 часа', 'Профессиональное оборудование', 'Работа со звукорежиссёром'],
        additionalServices: [
          { id: '1', name: 'Back vocals', price: 50000 },
          { id: '2', name: 'Дополнительный час', price: 80000 },
          { id: '3', name: 'Репетиция', price: 30000 }
        ],
        availability: {
          weekdays: true,
          weekends: true,
          holidays: true
        },
        willingToTravel: true,
        travelRegions: ['Алматы', 'Астана', 'Шымкент'],
        audioTracks: [
          { id: '1', title: 'At Last - Etta James (cover)', duration: '3:45', url: '#' },
          { id: '2', title: 'Summertime - Jazz Standard', duration: '4:20', url: '#' }
        ],
        videos: [
          { id: '1', title: 'Свадьба в Rixos 2025', thumbnail: '', url: '#' },
          { id: '2', title: 'Jazz Festival Almaty', thumbnail: '', url: '#' }
        ],
        photos: []
      });
    }
  }, [dbProfile, loading]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Преобразуем данные в формат для БД
      const success = await saveProfile({
        stage_name: profileData.stageName,
        real_name: profileData.realName,
        avatar: profileData.avatar,
        cover_video: profileData.coverVideo,
        city: profileData.city,
        languages: profileData.languages,
        genres: profileData.genres,
        bio: profileData.bio,
        experience: profileData.experience,
        total_performances: profileData.totalPerformances,
        base_price: profileData.basePrice,
        price_ranges: profileData.priceRanges,
        included_services: profileData.included,
        additional_services: profileData.additionalServices,
        availability: profileData.availability,
        willing_to_travel: profileData.willingToTravel,
        travel_regions: profileData.travelRegions,
        audio_tracks: profileData.audioTracks,
        videos: profileData.videos,
        photos: profileData.photos
      });

      if (success) {
        setIsEditing(false);
        toast.success('Профиль обновлён', {
          description: 'Изменения успешно сохранены в базе данных'
        });
      } else {
        toast.error('Ошибка сохранения', {
          description: dbError || 'Не удалось сохранить изменения'
        });
      }
    } catch (error) {
      toast.error('Ошибка', {
        description: 'Произошла ошибка при сохранении'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Показываем загрузку при первоначальной загрузке данных
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-purple-600" />
          <p className="text-muted-foreground">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="mb-2">{t.artistSettings.title}</h1>
              <p className="text-muted-foreground">
                {t.artistSettings.subtitle}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onNavigate('artist')}>
                <Eye className="w-4 h-4 mr-2" />
                {t.artistDashboard.editProfile.replace('Редактировать профиль', 'Предпросмотр')}
              </Button>
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    {t.artistSettings.cancelEditing}
                  </Button>
                  <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {t.artistSettings.saving}
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        {t.artistSettings.saveChanges}
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Edit className="w-4 h-4 mr-2" />
                  {t.artistDashboard.editProfile}
                </Button>
              )}
            </div>
          </div>

          {/* Verification Status */}
          {profileData.verified && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <div className="font-medium text-green-900 dark:text-green-100">
                  {t.artistSettings.basic.verified}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300">
                  {t.artistSettings.basic.verifiedDescription}
                </div>
              </div>
              <Badge className="bg-green-600">{t.statuses.verified}</Badge>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Основное</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Медиа</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Цены</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI-помощник</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Безопасность</span>
            </TabsTrigger>
            <TabsTrigger value="reputation" className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span className="hidden sm:inline">Репутация</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span className="hidden sm:inline">Финансы</span>
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Базовая информация</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar & Cover */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Фото профиля</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <ImageWithFallback 
                        src={profileData.avatar}
                        alt={profileData.stageName}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Изменить фото
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label>Видео-обложка (опционально)</Label>
                    <div className="mt-2">
                      {isEditing ? (
                        <Button variant="outline" className="w-full">
                          <Video className="w-4 h-4 mr-2" />
                          Загрузить видео
                        </Button>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          Видео не загружено
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Names */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stageName">Сценическое имя *</Label>
                    <Input
                      id="stageName"
                      value={profileData.stageName}
                      onChange={(e) => setProfileData({ ...profileData, stageName: e.target.value })}
                      disabled={!isEditing}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="realName">Реальное ФИО (скрыто)</Label>
                    <div className="relative mt-2">
                      <Input
                        id="realName"
                        value={profileData.realName}
                        onChange={(e) => setProfileData({ ...profileData, realName: e.target.value })}
                        disabled={!isEditing}
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Используется только для контрактов
                    </p>
                  </div>
                </div>

                {/* Location & Languages */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Город / Регион *</Label>
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
                    <Label>Языки исполнения</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileData.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary">
                          {lang}
                          {isEditing && (
                            <X 
                              className="w-3 h-3 ml-1 cursor-pointer" 
                              onClick={() => {
                                setProfileData({
                                  ...profileData,
                                  languages: profileData.languages.filter((_, i) => i !== index)
                                });
                              }}
                            />
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <>
                          {showLanguageInput ? (
                            <Input
                              value={newLanguage}
                              onChange={(e) => setNewLanguage(e.target.value)}
                              className="w-24"
                              placeholder="Новый язык"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && newLanguage.trim()) {
                                  setProfileData({
                                    ...profileData,
                                    languages: [...profileData.languages, newLanguage.trim()]
                                  });
                                  setNewLanguage('');
                                  setShowLanguageInput(false);
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowLanguageInput(true)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Добавить
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Genres & Format */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Жанры</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileData.genres.map((genre, index) => (
                        <Badge key={index} className="bg-gradient-to-r from-purple-600 to-pink-600">
                          {genre}
                          {isEditing && (
                            <X 
                              className="w-3 h-3 ml-1 cursor-pointer" 
                              onClick={() => {
                                setProfileData({
                                  ...profileData,
                                  genres: profileData.genres.filter((_, i) => i !== index)
                                });
                              }}
                            />
                          )}
                        </Badge>
                      ))}
                      {isEditing && (
                        <>
                          {showGenreInput ? (
                            <Input
                              value={newGenre}
                              onChange={(e) => setNewGenre(e.target.value)}
                              className="w-24"
                              placeholder="Новый жанр"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && newGenre.trim()) {
                                  setProfileData({
                                    ...profileData,
                                    genres: [...profileData.genres, newGenre.trim()]
                                  });
                                  setNewGenre('');
                                  setShowGenreInput(false);
                                }
                              }}
                              autoFocus
                            />
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowGenreInput(true)}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Добавить
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="format">Формат выступления</Label>
                    <Select
                      value={profileData.format}
                      onValueChange={(value) => setProfileData({ ...profileData, format: value })}
                      disabled={!isEditing}
                    >
                      <SelectTrigger id="format" className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Соло</SelectItem>
                        <SelectItem value="duo">Дуэт</SelectItem>
                        <SelectItem value="band">Группа</SelectItem>
                        <SelectItem value="ensemble">Ансамбль</SelectItem>
                        <SelectItem value="orchestra">Оркестр</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    className="mt-2 min-h-[120px]"
                    placeholder="Расскажите о вашем опыте, стиле, достижениях..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {profileData.bio.length} / 500 символов
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Portfolio Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>Медиа-портфолио</h3>
                  {isEditing && (
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Upload className="w-4 h-4 mr-2" />
                      Загрузить
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Audio Tracks */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Аудио-треки</Label>
                    <Badge variant="secondary">{profileData.audioTracks.length} треков</Badge>
                  </div>
                  <div className="space-y-2">
                    {profileData.audioTracks.map((track) => (
                      <div key={track.id} className="p-4 rounded-lg border flex items-center gap-4">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                          <FileAudio className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium mb-1">{track.title}</div>
                          <div className="text-sm text-muted-foreground">{track.duration}</div>
                        </div>
                        {isEditing && (
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label>Видео выступлений</Label>
                    <Badge variant="secondary">{profileData.videos.length} видео</Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {profileData.videos.map((video) => (
                      <div key={video.id} className="p-4 rounded-lg border">
                        <div className="aspect-video bg-muted rounded-lg mb-3 flex items-center justify-center">
                          <Video className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="flex items-start justify-between">
                          <div className="font-medium text-sm">{video.title}</div>
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

                {/* AI Tagging Info */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                        AI-тегирование
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        Ваш контент автоматически анаизируется: жанр, настроение, тип аудитории. Это помогает клиентам находить вас быстрее.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commercial Tab */}
          <TabsContent value="commercial" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Коммерческие условия</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Base Price */}
                <div>
                  <Label htmlFor="basePrice">Базовая цена (3 часа)</Label>
                  <div className="relative mt-2">
                    <Input
                      id="basePrice"
                      type="number"
                      value={profileData.basePrice}
                      onChange={(e) => setProfileData({ ...profileData, basePrice: parseInt(e.target.value) })}
                      disabled={!isEditing}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      ₸
                    </span>
                  </div>
                  <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-900 dark:text-purple-100">
                        AI рекомендует: ₸{(profileData.basePrice * 1.15).toLocaleString()} (+15% к рынку)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Ranges */}
                <div>
                  <Label>Диапазон цен по типу мероприятия</Label>
                  <div className="mt-3 space-y-3">
                    {Object.entries(profileData.priceRanges).map(([type, range]) => (
                      <div key={type} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium capitalize">{type}</span>
                          <Badge variant="secondary">
                            ₸{range.min.toLocaleString()} - ₸{range.max.toLocaleString()}
                          </Badge>
                        </div>
                        {isEditing && (
                          <div className="grid grid-cols-2 gap-3">
                            <Input
                              placeholder="Минимум"
                              type="number"
                              value={range.min}
                              onChange={(e) => {
                                const newValue = parseInt(e.target.value) || 0;
                                setProfileData({
                                  ...profileData,
                                  priceRanges: {
                                    ...profileData.priceRanges,
                                    [type]: { ...range, min: newValue }
                                  }
                                });
                              }}
                              disabled={!isEditing}
                            />
                            <Input
                              placeholder="Максимум"
                              type="number"
                              value={range.max}
                              onChange={(e) => {
                                const newValue = parseInt(e.target.value) || 0;
                                setProfileData({
                                  ...profileData,
                                  priceRanges: {
                                    ...profileData.priceRanges,
                                    [type]: { ...range, max: newValue }
                                  }
                                });
                              }}
                              disabled={!isEditing}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included Services */}
                <div>
                  <Label>Что входит в стоимость</Label>
                  <div className="mt-3 space-y-2">
                    {profileData.included.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                        {isEditing && (
                          <Button variant="ghost" size="icon" className="ml-auto">
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить пункт
                      </Button>
                    )}
                  </div>
                </div>

                {/* Additional Services */}
                <div>
                  <Label>Дополнительные услуги</Label>
                  <div className="mt-3 space-y-2">
                    {profileData.additionalServices.map((service) => (
                      <div key={service.id} className="p-3 rounded-lg border flex items-center justify-between">
                        <span className="text-sm">{service.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">₸{service.price.toLocaleString()}</span>
                          {isEditing && (
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить услугу
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <h3>Календарь и доступность</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Availability */}
                <div>
                  <Label>Доступность по дням</Label>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span>Будни</span>
                      <Switch
                        checked={profileData.availability.weekdays}
                        onCheckedChange={(checked) => 
                          setProfileData({
                            ...profileData,
                            availability: { ...profileData.availability, weekdays: checked }
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span>Выходные</span>
                      <Switch
                        checked={profileData.availability.weekends}
                        onCheckedChange={(checked) => 
                          setProfileData({
                            ...profileData,
                            availability: { ...profileData.availability, weekends: checked }
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span>Праздничные дни</span>
                      <Switch
                        checked={profileData.availability.holidays}
                        onCheckedChange={(checked) => 
                          setProfileData({
                            ...profileData,
                            availability: { ...profileData.availability, holidays: checked }
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Travel */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label>Готовность к выезду</Label>
                    <Switch
                      checked={profileData.willingToTravel}
                      onCheckedChange={(checked) => 
                        setProfileData({ ...profileData, willingToTravel: checked })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  {profileData.willingToTravel && (
                    <div className="mt-3">
                      <Label className="text-sm text-muted-foreground">Регионы и страны</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profileData.travelRegions.map((region, index) => (
                          <Badge key={index} variant="secondary">
                            <MapPin className="w-3 h-3 mr-1" />
                            {region}
                            {isEditing && (
                              <X className="w-3 h-3 ml-1 cursor-pointer" />
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button variant="outline" size="sm">
                            <Plus className="w-3 h-3 mr-1" />
                            Добавить
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Calendar Integration */}
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium mb-1">Google Calendar</div>
                        <div className="text-sm text-muted-foreground">
                          Синхронизация с вашим календарём
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Подключить
                    </Button>
                  </div>
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
                    <h3>AI-помощник артиста</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Персональные рекомендации для роста
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Analysis */}
                <div className="p-4 rounded-lg border">
                  <h4 className="mb-3">Анализ профиля</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Заполненность профиля</span>
                      <Badge>85%</Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" style={{ width: '85%' }} />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Добавьте ещё 2 видео и 3 фото для 100%
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="mb-3">Рекомендации по росту</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex gap-3">
                        <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                            Увеличьте видимость на 40%
                          </div>
                          <div className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                            Добавьте жанры: R&B, Blues. Спрос вырос на 35% за месяц
                          </div>
                          <Button size="sm" variant="outline">
                            Добавить жанры
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                            Новые рынки
                          </div>
                          <div className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                            В Караганде дефицит джазвых исполнителей. Средняя цена: ₸400,000
                          </div>
                          <Button size="sm" variant="outline">
                            Добавить регион
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex gap-3">
                        <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-green-900 dark:text-green-100 mb-1">
                            Оптимизация цен
                          </div>
                          <div className="text-sm text-green-700 dark:text-green-300">
                            Рекомендуем поднять цену на корпоративы до ₸500,000 (выше рынка на 15%)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Tools */}
                <div>
                  <h4 className="mb-3">AI-инструменты</h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-medium mb-1">Генерация описания</div>
                        <div className="text-xs text-muted-foreground">
                          AI создаст привлекательное описание профиля
                        </div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="font-medium mb-1">Сет-листы</div>
                        <div className="text-xs text-muted-foreground">
                          Умные подборки треков под мероприятие
                        </div>
                      </div>
                    </Button>
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
                {/* Two-Factor Auth */}
                <div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium mb-1">Двухфакторная аутентификация</div>
                        <div className="text-sm text-muted-foreground">
                          Дополнительная защита аккаунта
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
                </div>

                {/* Notifications */}
                <div>
                  <h4 className="mb-3">Уведомления</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Email-уведомления</span>
                      </div>
                      <Switch
                        checked={securitySettings.emailNotifications}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, emailNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">SMS-уведомления</span>
                      </div>
                      <Switch
                        checked={securitySettings.smsNotifications}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, smsNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Новые бронирования</span>
                      </div>
                      <Switch
                        checked={securitySettings.bookingAlerts}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, bookingAlerts: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy */}
                <div>
                  <h4 className="mb-3">Приватность</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Видимость профиля</Label>
                      <Select
                        value={securitySettings.profileVisibility}
                        onValueChange={(value) => 
                          setSecuritySettings({ ...securitySettings, profileVisibility: value })
                        }
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Публичный</SelectItem>
                          <SelectItem value="verified">Только верифицированные клиенты</SelectItem>
                          <SelectItem value="private">Приватный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm">Показывать реальное имя</span>
                      <Switch
                        checked={securitySettings.showRealName}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, showRealName: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm">Показывать номер телефона</span>
                      <Switch
                        checked={securitySettings.showPhone}
                        onCheckedChange={(checked) => 
                          setSecuritySettings({ ...securitySettings, showPhone: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Blacklist */}
                <div>
                  <h4 className="mb-3">Чёрный список</h4>
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-red-900 dark:text-red-100 mb-1">
                          Заблокированные заказчики
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300">
                          У вас нет заблокированных пользователей
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Links to Other Sections */}
          <TabsContent value="reputation">
            <Card>
              <CardContent className="pt-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="mb-2">Репутационная система</h3>
                <p className="text-muted-foreground mb-6">
                  Просмотрите детальную репутацию и отзывы
                </p>
                <Button onClick={() => onNavigate('reputation')} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Перейти к репутации
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance">
            <Card>
              <CardContent className="pt-6 text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <h3 className="mb-2">Финансовый профиль</h3>
                <p className="text-muted-foreground mb-6">
                  Управление доходами и финансовой аналитикой
                </p>
                <Button onClick={() => onNavigate('financial')} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Перейти к финансам
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}