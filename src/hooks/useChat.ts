import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';

export interface ChatMessage {
  id: string;
  bookingId?: string;
  senderId: string;
  recipientId: string;
  message: string;
  messageType: 'text' | 'image' | 'file' | 'audio' | 'system';
  attachmentUrl?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface SendMessageData {
  bookingId?: string;
  recipientId: string;
  message: string;
  messageType?: ChatMessage['messageType'];
  attachmentUrl?: string;
}

/**
 * Хук для работы с чатом
 */
export function useChat(userId: string | null, bookingId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) {
      setMessages([]);
      return;
    }

    fetchMessages();
    subscribeToMessages();
  }, [userId, bookingId]);

  const fetchMessages = async () => {
    if (!userId) return;

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      setError('Supabase не настроен');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('chat_messages')
        .select('*')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: true });

      if (bookingId) {
        query = query.eq('booking_id', bookingId);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        throw queryError;
      }

      const mappedMessages: ChatMessage[] = (data || []).map((dbMsg: any) => ({
        id: dbMsg.id,
        bookingId: dbMsg.booking_id,
        senderId: dbMsg.sender_id,
        recipientId: dbMsg.recipient_id,
        message: dbMsg.message,
        messageType: dbMsg.message_type,
        attachmentUrl: dbMsg.attachment_url,
        isRead: dbMsg.is_read,
        readAt: dbMsg.read_at,
        createdAt: dbMsg.created_at
      }));

      setMessages(mappedMessages);

      // Считаем непрочитанные сообщения
      const unread = mappedMessages.filter(
        msg => msg.recipientId === userId && !msg.isRead
      ).length;
      setUnreadCount(unread);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError(err.message || 'Ошибка загрузки сообщений');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Подписка на новые сообщения в реальном времени
   */
  const subscribeToMessages = () => {
    const supabase = getSupabaseClient();
    
    if (!supabase || !userId) return;

    const subscription = supabase
      .channel('chat_messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: bookingId ? `booking_id=eq.${bookingId}` : undefined
        },
        (payload) => {
          const newMsg = payload.new as any;
          
          // Проверяем, относится ли сообщение к текущему пользователю
          if (newMsg.sender_id === userId || newMsg.recipient_id === userId) {
            const mappedMsg: ChatMessage = {
              id: newMsg.id,
              bookingId: newMsg.booking_id,
              senderId: newMsg.sender_id,
              recipientId: newMsg.recipient_id,
              message: newMsg.message,
              messageType: newMsg.message_type,
              attachmentUrl: newMsg.attachment_url,
              isRead: newMsg.is_read,
              readAt: newMsg.read_at,
              createdAt: newMsg.created_at
            };

            setMessages(prev => [...prev, mappedMsg]);

            // Обновляем счётчик непрочитанных
            if (newMsg.recipient_id === userId && !newMsg.is_read) {
              setUnreadCount(prev => prev + 1);
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  /**
   * Отправка сообщения
   */
  const sendMessage = async (messageData: SendMessageData): Promise<{ success: boolean; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'Пользователь не авторизован' };
    }

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    try {
      const { error: insertError } = await supabase
        .from('chat_messages')
        .insert({
          booking_id: messageData.bookingId,
          sender_id: userId,
          recipient_id: messageData.recipientId,
          message: messageData.message,
          message_type: messageData.messageType || 'text',
          attachment_url: messageData.attachmentUrl,
          is_read: false
        });

      if (insertError) {
        throw insertError;
      }

      return { success: true };
    } catch (err: any) {
      console.error('Error sending message:', err);
      return { 
        success: false,
        error: err.message || 'Ошибка отправки сообщения'
      };
    }
  };

  /**
   * Отметить сообщения как прочитанные
   */
  const markAsRead = async (messageIds: string[]): Promise<{ success: boolean; error?: string }> => {
    if (!userId) {
      return { success: false, error: 'Пользователь не авторизован' };
    }

    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return { success: false, error: 'Supabase не настроен' };
    }

    try {
      const { error: updateError } = await supabase
        .from('chat_messages')
        .update({
          is_read: true,
          read_at: new Date().toISOString()
        })
        .in('id', messageIds)
        .eq('recipient_id', userId);

      if (updateError) {
        throw updateError;
      }

      // Обновляем локальное состояние
      setMessages(prev =>
        prev.map(msg =>
          messageIds.includes(msg.id)
            ? { ...msg, isRead: true, readAt: new Date().toISOString() }
            : msg
        )
      );

      setUnreadCount(prev => Math.max(0, prev - messageIds.length));

      return { success: true };
    } catch (err: any) {
      console.error('Error marking messages as read:', err);
      return { 
        success: false,
        error: err.message || 'Ошибка обновления статуса'
      };
    }
  };

  return {
    messages,
    loading,
    error,
    unreadCount,
    sendMessage,
    markAsRead,
    refetch: fetchMessages
  };
}
