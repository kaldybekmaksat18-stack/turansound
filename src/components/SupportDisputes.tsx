import { useState } from 'react';
import { 
  MessageSquare, 
  AlertTriangle, 
  Send,
  Paperclip,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Scale,
  Shield
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
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner@2.0.3';

interface SupportDisputesProps {
  userId: string;
  userRole: 'artist' | 'customer';
}

interface Ticket {
  id: string;
  type: 'support' | 'dispute';
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created: string;
  lastUpdate: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'user' | 'support' | 'admin';
  content: string;
  time: string;
  attachments?: string[];
}

export function SupportDisputes({ userId, userRole }: SupportDisputesProps) {
  const [activeTab, setActiveTab] = useState('support');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '1',
      type: 'support',
      subject: 'Не могу привязать карту',
      status: 'resolved',
      priority: 'medium',
      created: '2026-01-10',
      lastUpdate: '2026-01-11',
      messages: [
        {
          id: '1',
          sender: 'user',
          content: 'Здравствуйте, при попытке добавить карту появляется ошибка',
          time: '2026-01-10 14:30'
        },
        {
          id: '2',
          sender: 'support',
          content: 'Здравствуйте! Попробуйте использовать другой браузер. Если проблема сохраняется, укажите тип карты.',
          time: '2026-01-10 15:15'
        },
        {
          id: '3',
          sender: 'user',
          content: 'Спасибо, в Chrome всё заработало!',
          time: '2026-01-11 10:20'
        }
      ]
    },
    {
      id: '2',
      type: 'dispute',
      subject: 'Артист не явился на мероприятие',
      status: 'in_progress',
      priority: 'urgent',
      created: '2026-01-12',
      lastUpdate: '2026-01-13',
      messages: [
        {
          id: '1',
          sender: 'user',
          content: 'Артист DJ Arman не явился на мероприятие 11 января. Прошу вернуть деньги.',
          time: '2026-01-12 09:00'
        },
        {
          id: '2',
          sender: 'admin',
          content: 'Спор принят к рассмотрению. Мы связались с артистом для выяснения обстоятельств. Решение будет принято в течение 48 часов.',
          time: '2026-01-12 11:30'
        }
      ]
    }
  ]);

  const getStatusBadge = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline">Открыт</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-600">В работе</Badge>;
      case 'resolved':
        return <Badge className="bg-green-600">Решён</Badge>;
      case 'closed':
        return <Badge variant="secondary">Закрыт</Badge>;
    }
  };

  const getPriorityBadge = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="text-gray-600 border-gray-600">Низкий</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Средний</Badge>;
      case 'high':
        return <Badge variant="outline" className="text-orange-600 border-orange-600">Высокий</Badge>;
      case 'urgent':
        return <Badge className="bg-red-600">Срочный</Badge>;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      time: new Date().toLocaleString('ru-RU')
    };

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === selectedTicket
          ? { ...ticket, messages: [...ticket.messages, newMsg] }
          : ticket
      )
    );

    setNewMessage('');
    toast.success('Сообщение отправлено');
  };

  const handleCreateTicket = (type: 'support' | 'dispute') => {
    toast.success('Обращение создано', {
      description: 'Мы ответим в ближайшее время'
    });
  };

  const filteredTickets = tickets.filter(t => t.type === activeTab);
  const selectedTicketData = tickets.find(t => t.id === selectedTicket);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Поддержка и споры</h1>
          <p className="text-muted-foreground">
            Получите помощь или разрешите спорные ситуации
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tickets List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="support">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Поддержка
                    </TabsTrigger>
                    <TabsTrigger value="dispute">
                      <Scale className="w-4 h-4 mr-2" />
                      Споры
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full mb-4 bg-gradient-to-r from-purple-600 to-pink-600"
                  onClick={() => handleCreateTicket(activeTab as 'support' | 'dispute')}
                >
                  {activeTab === 'support' ? 'Новое обращение' : 'Открыть спор'}
                </Button>

                <ScrollArea className="h-[500px]">
                  <div className="space-y-2">
                    {filteredTickets.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Нет обращений</p>
                      </div>
                    ) : (
                      filteredTickets.map((ticket) => (
                        <div
                          key={ticket.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedTicket === ticket.id
                              ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => setSelectedTicket(ticket.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-medium">{ticket.subject}</h4>
                            {ticket.type === 'dispute' && (
                              <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(ticket.status)}
                            {getPriorityBadge(ticket.priority)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Обновлено: {new Date(ticket.lastUpdate).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Contacts */}
            <Card className="mt-6">
              <CardHeader>
                <h3>Быстрая связь</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  +7 727 123 4567
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  support@turansound.kz
                </Button>
                <div className="text-xs text-muted-foreground pt-2">
                  Поддержка работает 24/7
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedTicketData ? (
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3>{selectedTicketData.subject}</h3>
                        {selectedTicketData.type === 'dispute' && (
                          <Badge className="bg-red-600">
                            <Scale className="w-3 h-3 mr-1" />
                            Спор
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(selectedTicketData.status)}
                        {getPriorityBadge(selectedTicketData.priority)}
                        <span className="text-sm text-muted-foreground">
                          #{selectedTicketData.id}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>Создано: {new Date(selectedTicketData.created).toLocaleDateString('ru-RU')}</div>
                      <div>Обновлено: {new Date(selectedTicketData.lastUpdate).toLocaleDateString('ru-RU')}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Messages */}
                  <ScrollArea className="h-[400px] mb-4">
                    <div className="space-y-4">
                      {selectedTicketData.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-4 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : message.sender === 'admin'
                                ? 'bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800'
                                : 'bg-muted'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {message.sender === 'admin' && (
                                <Shield className="w-4 h-4 text-red-600" />
                              )}
                              <span className="text-xs font-medium">
                                {message.sender === 'user' ? 'Вы' : message.sender === 'admin' ? 'Администратор' : 'Поддержка'}
                              </span>
                              <span className={`text-xs ${message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'}`}>
                                {message.time}
                              </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((file, index) => (
                                  <div key={index} className="flex items-center gap-2 text-xs">
                                    <FileText className="w-3 h-3" />
                                    <span>{file}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  {selectedTicketData.status !== 'closed' && (
                    <div className="space-y-3">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                        className="min-h-[100px]"
                      />
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          <Paperclip className="w-4 h-4 mr-2" />
                          Прикрепить файл
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Отправить
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Dispute Resolution */}
                  {selectedTicketData.type === 'dispute' && selectedTicketData.status === 'in_progress' && (
                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                            Спор рассматривается
                          </div>
                          <div className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                            Администрация изучает доказательства обеих сторон. Решение будет принято в течение 48 часов.
                          </div>
                          <div className="text-xs text-yellow-700 dark:text-yellow-300">
                            Средства заблокированы на эскроу-счёте до разрешения спора
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full">
                <CardContent className="pt-6 flex flex-col items-center justify-center h-[600px]">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="mb-2">Выберите обращение</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Выберите обращение из списка слева или создайте новое
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* FAQ */}
        <Card className="mt-6">
          <CardHeader>
            <h3>Часто задаваемые вопросы</h3>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border">
                <h4 className="mb-2">Как работает эскроу?</h4>
                <p className="text-sm text-muted-foreground">
                  Деньги блокируются на защищённом счёте до выполнения услуги
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="mb-2">Сроки рассмотрения спора</h4>
                <p className="text-sm text-muted-foreground">
                  Администрация рассматривает споры в течение 48 часов
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="mb-2">Можно ли отменить бронирование?</h4>
                <p className="text-sm text-muted-foreground">
                  Да, но применяются штрафы согласно условиям контракта
                </p>
              </div>
              <div className="p-4 rounded-lg border">
                <h4 className="mb-2">Как получить возврат?</h4>
                <p className="text-sm text-muted-foreground">
                  Откройте спор и предоставьте доказательства нарушения
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
