import { useState } from 'react';
import { 
  Bell, 
  Check, 
  X,
  Calendar,
  DollarSign,
  Star,
  AlertTriangle,
  FileText,
  Users,
  Sparkles,
  Shield,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface NotificationCenterProps {
  onClose?: () => void;
}

interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'system' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState('all');
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Новое бронирование',
      message: 'Tengri Capital забронировал вас на 20 февраля',
      time: '5 минут назад',
      read: false,
      action: {
        label: 'Просмотреть',
        onClick: () => console.log('View booking')
      }
    },
    {
      id: '2',
      type: 'payment',
      title: 'Выплата получена',
      message: '₸450,000 зачислено на ваш счёт',
      time: '2 часа назад',
      read: false
    },
    {
      id: '3',
      type: 'review',
      title: 'Новый отзыв',
      message: 'Асель Мукашева оставила отзыв: ⭐⭐⭐⭐⭐',
      time: '5 часов назад',
      read: true,
      action: {
        label: 'Прочитать',
        onClick: () => console.log('Read review')
      }
    },
    {
      id: '4',
      type: 'system',
      title: 'Верификация завершена',
      message: 'Ваш профиль успешно верифицирован',
      time: '1 день назад',
      read: true
    },
    {
      id: '5',
      type: 'message',
      title: 'Новое сообщение',
      message: 'У вас новое сообщение от Бакыт Ахметов',
      time: '2 дня назад',
      read: true
    }
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-600" />;
      case 'system':
        return <Shield className="w-5 h-5 text-purple-600" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-pink-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h3>Уведомления</h3>
            {unreadCount > 0 && (
              <Badge className="bg-red-600">{unreadCount}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Прочитать все
              </Button>
            )}
            {onClose && (
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-5 mb-4">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="booking">
              <Calendar className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="payment">
              <DollarSign className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="review">
              <Star className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="system">
              <Shield className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Нет уведомлений</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      !notification.read 
                        ? 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' 
                        : 'bg-background'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'}`}>
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 flex-shrink-0"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {notification.time}
                          </span>
                          <div className="flex items-center gap-2">
                            {notification.action && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={notification.action.onClick}
                              >
                                {notification.action.label}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
}
