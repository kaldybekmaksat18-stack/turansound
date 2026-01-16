import { useState } from 'react';
import { Sparkles, Send, Music, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIAssistantProps {
  onNavigate: (page: string) => void;
}

export function AIAssistant({ onNavigate }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Здравствуйте! Я AI-помощник TuranSound. Помогу подобрать идеального артиста для вашего мероприятия. Расскажите, что планируете?'
    }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    'Свадьба на 200 человек в Алматы',
    'Джазовый вечер в ресторане',
    'Корпоратив с национальной программой',
    'День рождения с DJ'
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: `Отлично! Для свадьбы рекомендую рассмотреть следующих артистов:

🎵 **Aigerim Soul** - традиционная казахская музыка
💰 150,000-500,000 ₸ | ⭐ 4.9 | 📍 Алматы

🎧 **DJ Marat** - свадебный DJ с опытом 8 лет
💰 200,000-800,000 ₸ | ⭐ 4.8 | 📍 Астана

🎤 **Kamila Voice** - вокалистка (4 языка)
💰 180,000-600,000 ₸ | ⭐ 4.95 | 📍 Шымкент

Хотите посмотреть их профили или уточнить бюджет?`
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1>AI-Помощник</h1>
              <p className="text-muted-foreground">Подберём идеального артиста за минуту</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Music className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <div className="text-sm">Подбор по жанру</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-6 h-6 mx-auto mb-2 text-pink-500" />
                <div className="text-sm">Состав группы</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <div className="text-sm">Планирование</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <div className="text-sm">Аналитика</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat */}
        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">AI-Помощник</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-6 pb-4">
                <div className="text-sm text-muted-foreground mb-2">Быстрые запросы:</div>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <Badge
                      key={prompt}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => setInput(prompt)}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Опишите ваше мероприятие: тип, дата, бюджет, пожелания..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="min-h-[60px] resize-none"
                />
                <Button
                  size="lg"
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Нажмите Enter для отправки, Shift+Enter для новой строки
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
