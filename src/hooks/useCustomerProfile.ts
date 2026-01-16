import { useState, useEffect } from 'react';
import { 
  getCustomerProfile, 
  updateCustomerProfile, 
  createCustomerProfile,
  CustomerProfile,
  isSupabaseConfigured
} from '../lib/supabase';

export function useCustomerProfile(userId: string) {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Если Supabase не подключен, быстро завершаем загрузку
      if (!isSupabaseConfigured()) {
        setProfile(null);
        setLoading(false);
        return;
      }
      
      const data = await getCustomerProfile(userId);
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (updates: Partial<CustomerProfile>) => {
    try {
      setLoading(true);
      setError(null);

      // Если профиль не существует, создаем новый
      if (!profile) {
        const result = await createCustomerProfile(userId, updates);
        if (!result.success) {
          setError(result.error || 'Ошибка создания профиля');
          return false;
        }
      } else {
        // Иначе обновляем существующий
        const result = await updateCustomerProfile(userId, updates);
        if (!result.success) {
          setError(result.error || 'Ошибка обновления профиля');
          return false;
        }
      }

      // Перезагружаем профиль только если Supabase подключен
      if (isSupabaseConfigured()) {
        await loadProfile();
      }
      
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    saveProfile,
    reloadProfile: loadProfile
  };
}