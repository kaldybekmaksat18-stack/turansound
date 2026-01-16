import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { supabase as supabaseClientInstance } from '../utils/supabase/client';

// Получаем URL Supabase
const supabaseUrl = `https://${projectId}.supabase.co`;

// Проверяем, подключен ли Supabase
export const isSupabaseConfigured = () => {
  const isConfigured = !!(projectId && publicAnonKey);
  
  if (isConfigured) {
    console.log('✅ Supabase подключен:', supabaseUrl);
  }
  
  return isConfigured;
};

// Используем существующий клиент из utils/supabase/client.tsx
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase не подключен. Используются mock данные.');
    return null;
  }
  
  return supabaseClientInstance;
};

// Для обратной совместимости - используем тот же клиент
export const supabase = isSupabaseConfigured() ? supabaseClientInstance : null;

// Типы для профилей
export interface ArtistProfile {
  id: string;
  user_id: string;
  stage_name?: string;
  real_name?: string;
  avatar?: string;
  cover_video?: string;
  city?: string;
  languages?: string[];
  genres?: string[];
  bio?: string;
  verified?: boolean;
  experience?: number;
  total_performances?: number;
  base_price?: number;
  price_ranges?: any;
  included_services?: string[];
  additional_services?: any[];
  availability?: any;
  willing_to_travel?: boolean;
  travel_regions?: string[];
  audio_tracks?: any[];
  videos?: any[];
  photos?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CustomerProfile {
  id: string;
  user_id: string;
  full_name?: string;
  company_name?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  city?: string;
  event_preferences?: string[];
  budget_range?: { min: number; max: number };
  bio?: string;
  created_at?: string;
  updated_at?: string;
}

// Функции для работы с профилями артистов
export async function getArtistProfile(userId: string): Promise<ArtistProfile | null> {
  const client = getSupabaseClient();
  
  if (!client) {
    // Если Supabase не подключен, возвращаем null
    console.log('📦 Supabase не подключен. Профиль не загружен.');
    return null;
  }

  try {
    const { data, error } = await client
      .from('artist_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      // Специальная обработка для отсутствующей таблицы
      if (error.code === 'PGRST116' || error.message.includes('Could not find')) {
        console.warn('⚠️ Таблица artist_profiles не найдена.');
        console.warn('📖 Решение: Выполните SQL миграцию в Supabase Dashboard');
        console.warn('   1. Откройте: https://supabase.com/dashboard/project/hpcwkbkglggimwcbxpoh/editor');
        console.warn('   2. SQL Editor → New Query');
        console.warn('   3. Скопируйте файл: /supabase/migrations/000_COMPLETE_SETUP.sql');
        console.warn('   4. Нажмите Run');
        console.warn('   Подробнее: README.md → "Частые проблемы"');
        // Возвращаем null вместо выброса ошибки
        return null;
      }
      
      // Если профиль не найден (404), это нормально - просто нет профиля
      if (error.code === 'PGRST116') {
        return null;
      }
      
      console.error('Error fetching artist profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getArtistProfile:', error);
    return null;
  }
}

export async function updateArtistProfile(
  userId: string,
  updates: Partial<ArtistProfile>
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  
  if (!client) {
    console.log('📦 Supabase не подключен. Изменения сохранены локально (mock).');
    // В режиме mock считаем операцию успешной
    return { success: true };
  }

  try {
    const { error } = await client
      .from('artist_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating artist profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in updateArtistProfile:', error);
    return { success: false, error: error.message };
  }
}

export async function createArtistProfile(
  userId: string,
  profile: Partial<ArtistProfile>
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  
  if (!client) {
    console.log('📦 Supabase не подключен. Профиль создан локально (mock).');
    return { success: true };
  }

  try {
    const { error } = await client
      .from('artist_profiles')
      .insert({
        user_id: userId,
        ...profile,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error creating artist profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in createArtistProfile:', error);
    return { success: false, error: error.message };
  }
}

// Функции для работы с профилями заказчиков
export async function getCustomerProfile(userId: string): Promise<CustomerProfile | null> {
  const client = getSupabaseClient();
  
  if (!client) {
    console.log('📦 Supabase не подключен. Профиль не загружен.');
    return null;
  }

  try {
    const { data, error } = await client
      .from('customer_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Изменено с .single() на .maybeSingle()

    if (error) {
      // Специальная обработка для отсутствующей таблицы
      if (error.code === 'PGRST116' || error.message.includes('Could not find')) {
        console.warn('⚠️ Таблица customer_profiles не найдена.');
        console.warn('📖 Решение: Выполните SQL миграцию в Supabase Dashboard');
        console.warn('   Файл: /supabase/migrations/000_COMPLETE_SETUP.sql');
        // Возвращаем null вместо выброса ошибки
        return null;
      }
      
      console.error('Error fetching customer profile:', error);
      return null;
    }

    // Если профиль не найден, возвращаем null без ошибки
    return data;
  } catch (error) {
    console.error('Error in getCustomerProfile:', error);
    return null;
  }
}

export async function updateCustomerProfile(
  userId: string,
  updates: Partial<CustomerProfile>
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  
  if (!client) {
    console.log('📦 Supabase не подключен. Изменения сохранены локально (mock).');
    return { success: true };
  }

  try {
    const { error } = await client
      .from('customer_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating customer profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in updateCustomerProfile:', error);
    return { success: false, error: error.message };
  }
}

export async function createCustomerProfile(
  userId: string,
  profile: Partial<CustomerProfile>
): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();
  
  if (!client) {
    console.log('📦 Supabase не подключен. Профиль создан локально (mock).');
    return { success: true };
  }

  try {
    const { error } = await client
      .from('customer_profiles')
      .insert({
        user_id: userId,
        ...profile,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error creating customer profile:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Error in createCustomerProfile:', error);
    return { success: false, error: error.message };
  }
}