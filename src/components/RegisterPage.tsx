import { useState } from 'react';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Music, Briefcase, UserCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ArtistOnboarding, ArtistOnboardingData } from './ArtistOnboarding';
import { apiHelpers, authHelpers } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onRegister: (user: any) => void;
}

export function RegisterPage({ onNavigate, onRegister }: RegisterPageProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'artist' | 'client' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    region: '',
    // Artist specific
    stageName: '',
    genres: [] as string[],
    experience: '',
    // Terms
    acceptTerms: false,
    acceptPrivacy: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register the user
      const signupResult = await apiHelpers.signUp({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        region: formData.region,
        role: userType!,
        ...(userType === 'artist' && {
          stageName: formData.stageName,
          genres: formData.genres,
          experience: formData.experience,
        })
      });

      console.log('User registered successfully');

      // Now sign in to get active session and user data
      const user = await apiHelpers.signInAndGetUser(formData.email, formData.password);

      // Call onRegister with user data
      onRegister(user);

      toast.success('Регистрация успешна! 🎉', {
        description: `Добро пожаловать на TuranSound! Теперь вы можете использовать ${formData.email} для входа.`
      });

      onNavigate('home');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Check if user already exists
      if (error.message?.includes('already been registered') || 
          error.message?.includes('already exists')) {
        toast.error('Пользователь уже существует', {
          description: 'Этот email уже зарегистрирован. Попробуйте войти.',
          action: {
            label: 'Войти',
            onClick: () => onNavigate('login')
          }
        });
      } else {
        toast.error('Ошибка регистрации', {
          description: error.message || 'Попробуйте снова'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-semibold">TuranSound</div>
              <div className="text-sm text-muted-foreground">Платформа артистов ЦА</div>
            </div>
          </div>
          <h1 className="mb-2">Присоединяйтесь к платформе</h1>
          <p className="text-muted-foreground">
            {step === 1 && 'Выберите тип аккаунта'}
            {step === 2 && 'Заполните основную информацию'}
            {step === 3 && userType === 'artist' && 'Расскажите о себе как артист'}
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    s <= step
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      s < step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            {/* Step 1: Choose User Type */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setUserType('artist')}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      userType === 'artist'
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/20'
                        : 'border-border hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center">
                        <Music className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2">Я артист</h3>
                        <p className="text-sm text-muted-foreground">
                          Музыкант, певец, DJ, тамада, оркестр
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-purple-500" />
                            Создайте портфолио
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-purple-500" />
                            Получайте заказы
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-purple-500" />
                            Выходите на внешние рынки
                          </li>
                        </ul>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setUserType('client')}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      userType === 'client'
                        ? 'border-pink-600 bg-pink-50 dark:bg-pink-950/20'
                        : 'border-border hover:border-pink-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-pink-100 dark:bg-pink-950 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2">Я заказчик</h3>
                        <p className="text-sm text-muted-foreground">
                          Организатор событий, ресторан, компания
                        </p>
                        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-pink-500" />
                            Найдите лучших артистов
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-pink-500" />
                            Безопасные сделки
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-pink-500" />
                            Прозрачные контракты
                          </li>
                        </ul>
                      </div>
                    </div>
                  </button>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                  disabled={!userType}
                  onClick={() => setStep(2)}
                >
                  Продолжить
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Basic Info */}
            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Полное имя *</Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="region">Регион *</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger id="region" className="mt-2">
                        <SelectValue placeholder="Выберите регион" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="almaty">Алматы</SelectItem>
                        <SelectItem value="astana">Астана</SelectItem>
                        <SelectItem value="shymkent">Шымкент</SelectItem>
                        <SelectItem value="karaganda">Караганда</SelectItem>
                        <SelectItem value="tashkent">Ташкент</SelectItem>
                        <SelectItem value="bishkek">Бишкек</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Пароль *</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Минимум 8 символов"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10"
                      required
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Используйте не менее 8 символов, включая буквы и цифры
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.region || !formData.password}
                  >
                    Продолжить
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Artist-specific or Final */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {userType === 'artist' && (
                  <>
                    <div>
                      <Label htmlFor="stageName">Сценическое имя *</Label>
                      <div className="relative mt-2">
                        <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="stageName"
                          placeholder="Как вас знает публика"
                          value={formData.stageName}
                          onChange={(e) => setFormData({ ...formData, stageName: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="experience">Опыт работы (лет) *</Label>
                      <Input
                        id="experience"
                        type="number"
                        placeholder="Количество лет"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="mt-2"
                        required
                        min={0}
                      />
                    </div>

                    <div>
                      <Label>Жанры *</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {['Поп', 'Рок', 'Джаз', 'Традиционная', 'Электронная', 'Фолк'].map((genre) => (
                          <div key={genre} className="flex items-center gap-2">
                            <Checkbox
                              id={genre}
                              checked={formData.genres.includes(genre)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({ ...formData, genres: [...formData.genres, genre] });
                                } else {
                                  setFormData({ ...formData, genres: formData.genres.filter(g => g !== genre) });
                                }
                              }}
                            />
                            <Label htmlFor={genre} className="font-normal cursor-pointer">
                              {genre}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                      required
                    />
                    <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                      Я принимаю{' '}
                      <button type="button" className="text-purple-600 hover:text-purple-700">
                        Условия использования
                      </button>
                    </Label>
                  </div>
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.acceptPrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                      required
                    />
                    <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer">
                      Я согласен с{' '}
                      <button type="button" className="text-purple-600 hover:text-purple-700">
                        Политикой конфиденциальности
                      </button>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={
                      !formData.acceptTerms ||
                      !formData.acceptPrivacy ||
                      (userType === 'artist' && (!formData.stageName || !formData.experience || formData.genres.length === 0))
                    }
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Зарегистрироваться'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">Уже есть аккаунт? </span>
          <button
            onClick={() => onNavigate('login')}
            className="text-sm text-purple-600 hover:text-purple-700 font-medium"
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
}