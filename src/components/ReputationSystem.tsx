import { 
  Star, 
  TrendingUp, 
  Shield, 
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ThumbsUp,
  Music,
  Users,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useProfileTranslation } from '../lib/i18n/useProfileTranslation';

interface ReputationSystemProps {
  userId: string;
  userRole: 'artist' | 'client';
}

interface ReputationMetric {
  name: string;
  score: number;
  maxScore: number;
  icon: any;
  color: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  requirement?: number;
}

export function ReputationSystem({ userId, userRole }: ReputationSystemProps) {
  const t = useProfileTranslation();
  const overallScore = 96;
  const level = 'Platinum';
  const rank = '5%';

  const reputationMetrics: ReputationMetric[] = [
    {
      name: t.reputation.metrics.punctuality,
      score: 98,
      maxScore: 100,
      icon: Clock,
      color: 'text-green-600'
    },
    {
      name: t.reputation.metrics.quality,
      score: 95,
      maxScore: 100,
      icon: Music,
      color: 'text-purple-600'
    },
    {
      name: t.reputation.metrics.professionalism,
      score: 97,
      maxScore: 100,
      icon: Award,
      color: 'text-blue-600'
    },
    {
      name: t.reputation.metrics.audienceWork,
      score: 94,
      maxScore: 100,
      icon: Users,
      color: 'text-pink-600'
    },
    {
      name: t.reputation.metrics.technicalPrep,
      score: 96,
      maxScore: 100,
      icon: Zap,
      color: 'text-yellow-600'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      name: t.reputation.achievements.firstSteps,
      description: 'Завершите первое выступление',
      icon: '🎵',
      unlocked: true
    },
    {
      id: '2',
      name: t.reputation.achievements.reliableArtist,
      description: '10 выступлений без срывов',
      icon: '⭐',
      unlocked: true
    },
    {
      id: '3',
      name: t.reputation.achievements.topRated,
      description: 'Средний рейтинг 4.8+',
      icon: '❤️',
      unlocked: true
    },
    {
      id: '4',
      name: 'Топ-исполнитель',
      description: 'Войдите в топ-10% артистов',
      icon: '🏆',
      unlocked: true
    },
    {
      id: '5',
      name: t.reputation.achievements.techMaster,
      description: '50 успешных выступлений',
      icon: '👑',
      unlocked: false,
      progress: 20,
      requirement: 50
    },
    {
      id: '6',
      name: 'Легенда',
      description: '100 выступлений с рейтингом 5.0',
      icon: '💎',
      unlocked: false,
      progress: 8,
      requirement: 100
    }
  ];

  const recentReviews = [
    {
      id: '1',
      clientName: 'Асель Мукашева',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asel',
      rating: 5,
      date: '2026-01-10',
      event: t.eventTypes.wedding,
      comment: 'Невероятное выступление! Айгерім создала волшебную атмосферу. Все гости в восторге!',
      metrics: {
        punctuality: 5,
        quality: 5,
        professionalism: 5,
        audience: 5,
        technical: 5
      }
    },
    {
      id: '2',
      clientName: 'Ерлан Садыков',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Erlan',
      rating: 5,
      date: '2025-12-20',
      event: 'Корпоратив',
      comment: 'Профессионализм на высшем уровне. Программа была идеально подобрана под ау��иторию.',
      metrics: {
        punctuality: 5,
        quality: 5,
        professionalism: 5,
        audience: 4,
        technical: 5
      }
    },
    {
      id: '3',
      clientName: 'Алина Жунусова',
      clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alina',
      rating: 5,
      date: '2025-11-15',
      event: 'День рождения',
      comment: 'Спасибо за прекрасный вечер! Голос потрясающий, репертуар разнообразный.',
      metrics: {
        punctuality: 5,
        quality: 5,
        professionalism: 5,
        audience: 5,
        technical: 4
      }
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 95) return 'bg-green-100 dark:bg-green-950';
    if (score >= 85) return 'bg-blue-100 dark:bg-blue-950';
    if (score >= 75) return 'bg-yellow-100 dark:bg-yellow-950';
    return 'bg-red-100 dark:bg-red-950';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Репутационная система</h1>
          <p className="text-muted-foreground">
            Прозрачный рейтинг на основе реальных выступлений
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Score */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="text-center">
                    <div className="relative inline-block mb-4">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="currentColor"
                          strokeWidth="10"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="url(#gradient)"
                          strokeWidth="10"
                          fill="none"
                          strokeDasharray={`${(overallScore / 100) * 439.82} 439.82`}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9333ea" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold mb-1">{overallScore}</div>
                        <div className="text-sm text-muted-foreground">из 100</div>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                      {level} уровень
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      Топ {rank} платформы
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-4">Детальная оценка</h3>
                    <div className="space-y-4">
                      {reputationMetrics.map((metric) => {
                        const Icon = metric.icon;
                        const percentage = (metric.score / metric.maxScore) * 100;
                        
                        return (
                          <div key={metric.name}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Icon className={`w-4 h-4 ${metric.color}`} />
                                <span className="text-sm">{metric.name}</span>
                              </div>
                              <span className={`text-sm font-medium ${getScoreColor(metric.score)}`}>
                                {metric.score}%
                              </span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-green-900 dark:text-green-100 mb-1">
                            🏆 Надёжный исполнитель
                          </div>
                          <div className="text-sm text-green-700 dark:text-green-300">
                            Высокий уровень репутации. Ваш профиль получает приоритет в рекомендациях.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3>Последние отзывы</h3>
                  <Badge variant="outline">127 отзывов</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg border">
                    <div className="flex items-start gap-4 mb-4">
                      <ImageWithFallback 
                        src={review.clientAvatar}
                        alt={review.clientName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium mb-1">{review.clientName}</div>
                            <div className="text-sm text-muted-foreground">{review.event}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-500 text-yellow-500'
                                    : 'text-muted'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            Пунктуальность: {review.metrics.punctuality}/5
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Music className="w-3 h-3 mr-1" />
                            Качество: {review.metrics.quality}/5
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            Профессионализм: {review.metrics.professionalism}/5
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      {new Date(review.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Показать все отзывы
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <h3>Достижения</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800'
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`text-2xl ${
                          achievement.unlocked ? '' : 'grayscale opacity-50'
                        }`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium mb-1">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground mb-2">
                          {achievement.description}
                        </div>
                        {!achievement.unlocked && achievement.progress !== undefined && (
                          <div>
                            <Progress
                              value={(achievement.progress / (achievement.requirement || 100)) * 100}
                              className="h-1 mb-1"
                            />
                            <div className="text-xs text-muted-foreground">
                              {achievement.progress} / {achievement.requirement}
                            </div>
                          </div>
                        )}
                        {achievement.unlocked && (
                          <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Получено
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <h3>Статистика надёжности</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Выполнено успешно</span>
                  </div>
                  <span className="font-medium">20/20</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Отменено артистом</span>
                  </div>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Опозданий</span>
                  </div>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">Жалобы</span>
                  </div>
                  <span className="font-medium">0</span>
                </div>
              </CardContent>
            </Card>

            {/* Anti-Fraud */}
            <Card>
              <CardHeader>
                <h3>Защита от накрутки</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">Проверенные отзывы</div>
                      <div className="text-xs text-muted-foreground">
                        Только после реального оплаченного выступления
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">AI-мониторинг</div>
                      <div className="text-xs text-muted-foreground">
                        Автоматическое выявление подозрительной активности
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-1">Blockchain-запись</div>
                      <div className="text-xs text-muted-foreground">
                        Невозможно удалить или изменить историю
                      </div>
                    </div>
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