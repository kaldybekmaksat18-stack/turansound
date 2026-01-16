import { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useChat } from '../hooks/useChat';
import { toast } from 'sonner@2.0.3';

interface ChatWindowProps {
  userId: string;
  recipientId: string;
  recipientName: string;
  bookingId?: string;
  onClose: () => void;
}

export function ChatWindow({
  userId,
  recipientId,
  recipientName,
  bookingId,
  onClose
}: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');
  const { messages, loading, sendMessage, markAsRead, unreadCount } = useChat(userId, bookingId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Прокрутка к последнему сообщению
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Отметить непрочитанные сообщения как прочитанные
  useEffect(() => {
    const unreadMessages = messages
      .filter(msg => msg.recipientId === userId && !msg.isRead)
      .map(msg => msg.id);

    if (unreadMessages.length > 0) {
      markAsRead(unreadMessages);
    }
  }, [messages, userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const result = await sendMessage({
      bookingId,
      recipientId,
      message: messageText.trim()
    });

    if (result.success) {
      setMessageText('');
    } else {
      toast.error('Ошибка отправки сообщения', {
        description: result.error
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 shadow-2xl rounded-lg overflow-hidden z-50 border border-purple-200">
      <Card className="h-[600px] flex flex-col">
        {/* Header */}
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5" />
              <div>
                <CardTitle className="text-lg">{recipientName}</CardTitle>
                {bookingId && (
                  <p className="text-xs text-purple-100">Бронирование #{bookingId.slice(0, 8)}</p>
                )}
              </div>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            {loading && messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Загрузка сообщений...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Начните общение</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const isOwn = message.senderId === userId;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          isOwn
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.messageType === 'system' ? (
                          <p className="text-xs text-center italic">{message.message}</p>
                        ) : (
                          <>
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {message.message}
                            </p>
                            <div
                              className={`flex items-center gap-1 mt-1 text-xs ${
                                isOwn ? 'text-purple-100' : 'text-gray-500'
                              }`}
                            >
                              <Clock className="w-3 h-3" />
                              <span>{formatTime(message.createdAt)}</span>
                              {isOwn && message.isRead && (
                                <span className="ml-1">✓✓</span>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
        </CardContent>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
              className="flex-1"
              maxLength={1000}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Нажмите Enter для отправки
          </p>
        </div>
      </Card>
    </div>
  );
}

/**
 * Кнопка открытия чата (плавающая)
 */
interface ChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export function ChatButton({ onClick, unreadCount = 0 }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all z-40"
    >
      <MessageCircle className="w-6 h-6" />
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}
    </button>
  );
}
