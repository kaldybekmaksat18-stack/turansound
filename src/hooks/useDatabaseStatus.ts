import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../lib/supabase';

export function useDatabaseStatus() {
  const [tablesExist, setTablesExist] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    const client = getSupabaseClient();
    
    if (!client) {
      setTablesExist(false);
      setChecking(false);
      return;
    }

    try {
      // Пробуем выполнить простой запрос к таблице
      const { error } = await client
        .from('artist_profiles')
        .select('id')
        .limit(1);

      // Если ошибка связана с отсутствием таблицы
      if (error && (error.code === 'PGRST205' || error.message.includes('Could not find'))) {
        setTablesExist(false);
      } else {
        // Если ошибки нет или другая ошибка (не критичная), считаем что таблицы есть
        setTablesExist(true);
      }
    } catch (error) {
      console.error('Error checking database:', error);
      setTablesExist(false);
    } finally {
      setChecking(false);
    }
  };

  return {
    tablesExist,
    checking,
    recheckDatabase: checkDatabase
  };
}
