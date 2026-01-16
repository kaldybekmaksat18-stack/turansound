import { useState } from 'react';
import { 
  Shield, 
  Upload, 
  Check, 
  FileText,
  CreditCard,
  User,
  Building2,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface VerificationCenterProps {
  userType: 'artist' | 'customer';
  userId: string;
}

interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  required: boolean;
}

export function VerificationCenter({ userType, userId }: VerificationCenterProps) {
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    {
      id: 'identity',
      title: 'Подтверждение личности',
      description: 'Загрузите удостоверение личности',
      status: 'completed',
      required: true
    },
    {
      id: 'phone',
      title: 'Подтверждение телефона',
      description: 'Введите код из SMS',
      status: 'completed',
      required: true
    },
    {
      id: 'email',
      title: 'Подтверждение email',
      description: 'Перейдите по ссылке в письме',
      status: 'completed',
      required: true
    },
    {
      id: 'payment',
      title: 'Платёжные реквизиты',
      description: 'Добавьте способ оплаты',
      status: 'completed',
      required: true
    },
    {
      id: 'ecp',
      title: 'Электронная цифровая подпись',
      description: 'Подключите ЭЦП для контрактов',
      status: 'in_progress',
      required: false
    },
    {
      id: 'business',
      title: 'Бизнес-документы',
      description: 'БИН, учредительные документы',
      status: userType === 'customer' ? 'completed' : 'pending',
      required: userType === 'customer'
    }
  ]);

  const completedSteps = verificationSteps.filter(s => s.status === 'completed').length;
  const totalSteps = verificationSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  const requiredCompleted = verificationSteps.filter(s => s.required && s.status === 'completed').length;
  const requiredTotal = verificationSteps.filter(s => s.required).length;

  const getStatusIcon = (status: VerificationStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: VerificationStep['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Завершено</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-600">В процессе</Badge>;
      case 'failed':
        return <Badge className="bg-red-600">Отклонено</Badge>;
      default:
        return <Badge variant="outline">Не начато</Badge>;
    }
  };

  const handleUpload = (stepId: string) => {
    toast.success('Документ загружен', {
      description: 'Проверка займёт до 24 часов'
    });
    
    setVerificationSteps(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, status: 'in_progress' } : step
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2">Центр верификации</h1>
            <p className="text-muted-foreground">
              Подтвердите свой профиль для полного доступа к платформе
            </p>
          </div>

          {/* Progress Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">Прогресс верификации</h3>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>{completedSteps} из {totalSteps} шагов завершено</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                </div>
              </div>

              {requiredCompleted === requiredTotal ? (
                <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-green-900 dark:text-green-100">
                        ✓ Базовая верификация завершена
                      </div>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Вы можете пользоваться всеми функциями платформы
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <div className="font-medium text-yellow-900 dark:text-yellow-100">
                        Завершите обязательные шаги
                      </div>
                      <div className="text-sm text-yellow-700 dark:text-yellow-300">
                        {requiredTotal - requiredCompleted} обязательных шага осталось
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification Steps */}
          <div className="space-y-4">
            {verificationSteps.map((step) => (
              <Card key={step.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4>{step.title}</h4>
                            {step.required && (
                              <Badge variant="outline" className="text-xs">Обязательно</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                        {getStatusBadge(step.status)}
                      </div>

                      {step.status === 'pending' && (
                        <div className="mt-4 space-y-3">
                          {step.id === 'identity' && (
                            <div className="space-y-2">
                              <Label>Тип документа</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" className="justify-start">
                                  <User className="w-4 h-4 mr-2" />
                                  Удостоверение
                                </Button>
                                <Button variant="outline" className="justify-start">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Паспорт
                                </Button>
                              </div>
                            </div>
                          )}
                          {step.id === 'business' && (
                            <div className="space-y-2">
                              <Label>БИН организации</Label>
                              <Input placeholder="123456789012" />
                            </div>
                          )}
                          {step.id === 'payment' && (
                            <div className="space-y-2">
                              <Label>Банковская карта</Label>
                              <Input placeholder="0000 0000 0000 0000" />
                            </div>
                          )}
                          <Button 
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                            onClick={() => handleUpload(step.id)}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Загрузить документы
                          </Button>
                        </div>
                      )}

                      {step.status === 'in_progress' && (
                        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="flex items-center gap-2 text-sm text-yellow-900 dark:text-yellow-100">
                            <Clock className="w-4 h-4" />
                            <span>Документы на проверке (до 24 часов)</span>
                          </div>
                        </div>
                      )}

                      {step.status === 'failed' && (
                        <div className="mt-4 space-y-3">
                          <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="text-sm text-red-900 dark:text-red-100 mb-1 font-medium">
                              Документы отклонены
                            </div>
                            <div className="text-sm text-red-700 dark:text-red-300">
                              Причина: Плохое качество фото. Пожалуйста, загрузите более чёткий снимок.
                            </div>
                          </div>
                          <Button 
                            variant="outline"
                            className="w-full"
                            onClick={() => handleUpload(step.id)}
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Загрузить повторно
                          </Button>
                        </div>
                      )}

                      {step.status === 'completed' && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center gap-2 text-sm text-green-900 dark:text-green-100">
                            <Check className="w-4 h-4" />
                            <span>Проверено и одобрено</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits */}
          <Card className="mt-6">
            <CardHeader>
              <h3>Преимущества верификации</h3>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">Больше доверия</div>
                    <div className="text-sm text-muted-foreground">
                      Верифицированные профили получают на 3x больше заказов
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">Защита сделок</div>
                    <div className="text-sm text-muted-foreground">
                      Эскроу-счета и юридические контракты
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">Приоритет в поиске</div>
                    <div className="text-sm text-muted-foreground">
                      Ваш профиль будет выше в результатах
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium mb-1">VIP-функции</div>
                    <div className="text-sm text-muted-foreground">
                      Доступ к эксклюзивным возможностям
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
