import { useState } from 'react';
import { User, Mail, Lock, ArrowRight, Music, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Checkbox } from './ui/checkbox';
import { authHelpers, apiHelpers } from '../utils/supabase/client';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: any) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Sign in and get user data
      const user = await apiHelpers.signInAndGetUser(email, password);

      // Call onLogin with user data
      onLogin(user);

      toast.success(`Добро пожаловать, ${user.name}!`);
      onNavigate('home');
    } catch (error: any) {
      console.error('Login error:', error);
      
      // More helpful error message
      const errorMessage = error.message || '';
      if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('Invalid')) {
        toast.error('Неверные данные для входа', {
          description: 'Пользователя с такими данными не существует. Создайте новый аккаунт.',
          action: {
            label: 'Регистрация',
            onClick: () => onNavigate('register')
          }
        });
      } else {
        toast.error('Ошибка входа', {
          description: errorMessage || 'Проверьте email и пароль'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Quick fill demo credentials
  const fillDemoCredentials = (type: 'artist' | 'client') => {
    if (type === 'artist') {
      setEmail('artist@test.com');
      setPassword('test12345');
    } else {
      setEmail('client@test.com');
      setPassword('test12345');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-semibold">TuranSound</div>
              <div className="text-sm text-muted-foreground">Платформа артистов ЦА</div>
            </div>
          </div>

          <h2 className="mb-4">Добро пожаловать!</h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Войдите в свой аккаунт, чтобы управлять бронированиями, просматривать аналитику и находить лучших артистов
          </p>

          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />
              <div>
                <div className="font-medium mb-1">Безопасные сделки</div>
                <div className="text-sm text-muted-foreground">
                  Эскроу-счета и смарт-контракты
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-2 h-2 rounded-full bg-pink-500 mt-2" />
              <div>
                <div className="font-medium mb-1">Прозрачный рейтинг</div>
                <div className="text-sm text-muted-foreground">
                  Только реальные отзывы после выступлений
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
              <div>
                <div className="font-medium mb-1">AI-помощник</div>
                <div className="text-sm text-muted-foreground">
                  Подбор артистов за минуту
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card>
          <CardHeader>
            <h3>Вход в систему</h3>
            <p className="text-sm text-muted-foreground">
              Введите ваши данные для входа
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="password">Пароль</Label>
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Забыли пароль?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Запомнить меня
                </Label>
              </div>

              {/* Demo credentials helper */}
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                <p className="text-xs text-purple-900 dark:text-purple-100 mb-2">
                  <strong>Для тестирования:</strong> используйте демо-аккаунты или зарегистрируйтесь
                </p>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillDemoCredentials('artist')}
                    className="text-xs flex-1 border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40"
                  >
                    Заполнить как Артист
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => fillDemoCredentials('client')}
                    className="text-xs flex-1 border-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40"
                  >
                    Заполнить как Заказчик
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Войти
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Или войдите через
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" type="button">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Facebook
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Нет аккаунта? </span>
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Зарегистрироваться
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}