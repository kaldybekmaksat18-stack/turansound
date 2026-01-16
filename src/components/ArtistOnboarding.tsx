import { useState } from 'react';
import { Music, Mic, Film, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import {
  ArtistSection,
  ArtistRole,
  MusicGenre,
  NationalStyle,
  EventFormat,
  SECTION_LABELS,
  SECTION_DESCRIPTIONS,
  ROLE_LABELS,
  GENRE_LABELS,
  NATIONAL_STYLE_LABELS,
  EVENT_FORMAT_LABELS,
  ROLES_BY_SECTION
} from '../types/artist';

interface ArtistOnboardingProps {
  onComplete: (data: ArtistOnboardingData) => void;
  onBack?: () => void;
}

export interface ArtistOnboardingData {
  // СЛОЙ 1: Раздел
  section: ArtistSection;
  
  // СЛОЙ 2: Роли
  roles: ArtistRole[];
  
  // СЛОЙ 3: Жанры и форматы
  genres: MusicGenre[];
  nationalStyles: NationalStyle[];
  eventFormats: EventFormat[];
  
  // Портфолио
  stageName: string;
  bio: string;
  experience: number;
  priceFrom: number;
  priceTo: number;
}

export function ArtistOnboarding({ onComplete, onBack }: ArtistOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ArtistOnboardingData>({
    section: 'stage_artists',
    roles: [],
    genres: [],
    nationalStyles: [],
    eventFormats: [],
    stageName: '',
    bio: '',
    experience: 0,
    priceFrom: 0,
    priceTo: 0
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else if (onBack) {
      onBack();
    }
  };

  // Проверка валидности текущего шага
  const isStepValid = () => {
    switch (step) {
      case 1: return formData.section !== null;
      case 2: return formData.roles.length > 0;
      case 3: return formData.genres.length > 0 && formData.eventFormats.length > 0;
      case 4: return formData.stageName.length > 0 && formData.bio.length > 20;
      case 5: return formData.priceFrom > 0;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                    i + 1 <= step
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {i + 1 < step ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      i + 1 < step
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Шаг {step} из {totalSteps}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-lg border">
          {/* STEP 1: Выбор раздела (КТО) */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="mb-2">Выберите категорию</h2>
                <p className="text-muted-foreground">
                  Определите основное направление вашей деятельности
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'stage_artists' as ArtistSection, icon: Music, color: 'purple' },
                  { id: 'hosts_and_shows' as ArtistSection, icon: Mic, color: 'pink' },
                  { id: 'creative_production' as ArtistSection, icon: Film, color: 'violet' }
                ].map((section) => {
                  const Icon = section.icon;
                  const isSelected = formData.section === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setFormData({ ...formData, section: section.id })}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? `border-${section.color}-600 bg-${section.color}-50 dark:bg-${section.color}-950/20`
                          : 'border-border hover:border-muted-foreground'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected
                          ? `bg-gradient-to-br from-${section.color}-600 to-pink-600`
                          : 'bg-muted'
                      }`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                      </div>
                      <h3 className="font-semibold mb-2">{SECTION_LABELS[section.id]}</h3>
                      <p className="text-sm text-muted-foreground">
                        {SECTION_DESCRIPTIONS[section.id]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Выбор ролей (ЧТО ДЕЛАЕТЕ) */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="mb-2">Выберите роли</h2>
                <p className="text-muted-foreground">
                  Можно выбрать несколько (например, музыкант + композитор)
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {ROLES_BY_SECTION[formData.section].map((role) => (
                  <div
                    key={role}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.roles.includes(role)
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => {
                      if (formData.roles.includes(role)) {
                        setFormData({
                          ...formData,
                          roles: formData.roles.filter((r) => r !== role)
                        });
                      } else {
                        setFormData({
                          ...formData,
                          roles: [...formData.roles, role]
                        });
                      }
                    }}
                  >
                    <Checkbox
                      checked={formData.roles.includes(role)}
                      onCheckedChange={() => {}}
                    />
                    <Label className="cursor-pointer flex-1">{ROLE_LABELS[role]}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Жанры и форматы (СТИЛИ) */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="mb-2">Жанры и форматы</h2>
                <p className="text-muted-foreground">
                  Укажите, в каких стилях вы работаете
                </p>
              </div>

              {/* Музыкальные жанры */}
              <div>
                <Label className="text-base mb-3 block">Музыкальные жанры *</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(GENRE_LABELS).map(([key, label]) => {
                    const genre = key as MusicGenre;
                    const isSelected = formData.genres.includes(genre);
                    return (
                      <Badge
                        key={genre}
                        variant={isSelected ? 'default' : 'outline'}
                        className={`cursor-pointer px-4 py-2 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                            : ''
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              genres: formData.genres.filter((g) => g !== genre)
                            });
                          } else {
                            setFormData({
                              ...formData,
                              genres: [...formData.genres, genre]
                            });
                          }
                        }}
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Национальные стили */}
              <div>
                <Label className="text-base mb-3 block">Национальные стили</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(NATIONAL_STYLE_LABELS).map(([key, label]) => {
                    const style = key as NationalStyle;
                    const isSelected = formData.nationalStyles.includes(style);
                    return (
                      <Badge
                        key={style}
                        variant={isSelected ? 'default' : 'outline'}
                        className={`cursor-pointer px-4 py-2 ${
                          isSelected ? 'bg-gradient-to-r from-violet-600 to-purple-600' : ''
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              nationalStyles: formData.nationalStyles.filter((s) => s !== style)
                            });
                          } else {
                            setFormData({
                              ...formData,
                              nationalStyles: [...formData.nationalStyles, style]
                            });
                          }
                        }}
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Форматы мероприятий */}
              <div>
                <Label className="text-base mb-3 block">Форматы мероприятий *</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(EVENT_FORMAT_LABELS).map(([key, label]) => {
                    const format = key as EventFormat;
                    const isSelected = formData.eventFormats.includes(format);
                    return (
                      <Badge
                        key={format}
                        variant={isSelected ? 'default' : 'outline'}
                        className={`cursor-pointer px-4 py-2 ${
                          isSelected ? 'bg-gradient-to-r from-pink-600 to-rose-600' : ''
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            setFormData({
                              ...formData,
                              eventFormats: formData.eventFormats.filter((f) => f !== format)
                            });
                          } else {
                            setFormData({
                              ...formData,
                              eventFormats: [...formData.eventFormats, format]
                            });
                          }
                        }}
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Портфолио */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="mb-2">Расскажите о себе</h2>
                <p className="text-muted-foreground">
                  Заполните информацию для вашего профиля
                </p>
              </div>

              <div>
                <Label htmlFor="stageName">Сценическое имя *</Label>
                <Input
                  id="stageName"
                  placeholder="Как вас знает публика"
                  value={formData.stageName}
                  onChange={(e) => setFormData({ ...formData, stageName: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="bio">О себе *</Label>
                <Textarea
                  id="bio"
                  placeholder="Расскажите о своем опыте, достижениях, стиле работы..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="mt-2 min-h-32"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Минимум 20 символов
                </p>
              </div>

              <div>
                <Label htmlFor="experience">Опыт работы (лет) *</Label>
                <Input
                  id="experience"
                  type="number"
                  min={0}
                  placeholder="Количество лет"
                  value={formData.experience || ''}
                  onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Цены */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="mb-2">Укажите цены</h2>
                <p className="text-muted-foreground">
                  Диапазон стоимости ваших услуг
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priceFrom">Цена от (₸) *</Label>
                  <Input
                    id="priceFrom"
                    type="number"
                    min={0}
                    placeholder="50000"
                    value={formData.priceFrom || ''}
                    onChange={(e) => setFormData({ ...formData, priceFrom: parseInt(e.target.value) || 0 })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="priceTo">Цена до (₸)</Label>
                  <Input
                    id="priceTo"
                    type="number"
                    min={0}
                    placeholder="200000"
                    value={formData.priceTo || ''}
                    onChange={(e) => setFormData({ ...formData, priceTo: parseInt(e.target.value) || 0 })}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
                <p className="text-sm">
                  💡 <strong>Совет:</strong> Укажите реалистичный диапазон цен.
                  Вы сможете обсудить точную стоимость с заказчиком при бронировании.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {step === totalSteps ? 'Завершить' : 'Продолжить'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
