import { useState } from 'react';
import { Database, Upload, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { seedAllArtists, checkArtistsExist, clearArtistsCatalog } from '../utils/seedArtists';

export function DatabaseSeedPanel() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [artistCount, setArtistCount] = useState<number | null>(null);
  const [seedResult, setSeedResult] = useState<any>(null);

  const handleCheckArtists = async () => {
    setChecking(true);
    try {
      const result = await checkArtistsExist();
      setArtistCount(result.count);
    } catch (error) {
      console.error('Error checking artists:', error);
    } finally {
      setChecking(false);
    }
  };

  const handleSeedArtists = async () => {
    if (!confirm('Загрузить 180 артистов в базу данных? Это займёт около минуты.')) {
      return;
    }

    setLoading(true);
    setSeedResult(null);
    
    try {
      const result = await seedAllArtists();
      setSeedResult(result);
      
      // Обновляем счётчик
      await handleCheckArtists();
    } catch (error) {
      console.error('Error seeding artists:', error);
      setSeedResult({
        success: false,
        error: String(error)
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClearArtists = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ: Это удалит ВСЕ артистов из базы данных. Продолжить?')) {
      return;
    }

    setLoading(true);
    
    try {
      await clearArtistsCatalog();
      setSeedResult(null);
      await handleCheckArtists();
    } catch (error) {
      console.error('Error clearing artists:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg border-purple-200">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Database className="w-6 h-6" />
              База данных артистов
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Статус базы данных */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-600" />
                  Статус каталога
                </h3>
                <Button
                  onClick={handleCheckArtists}
                  disabled={checking}
                  variant="outline"
                  size="sm"
                  className="border-purple-300 hover:bg-purple-50"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
                  Обновить
                </Button>
              </div>
              
              {artistCount !== null && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Артистов в базе:</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {artistCount}
                    </span>
                  </div>
                  
                  {artistCount === 0 && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        База данных пуста. Загрузите артистов для начала работы.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {artistCount > 0 && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Каталог готов к работе!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>

            {/* Действия */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Загрузка артистов */}
              <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-gray-800">Загрузить артистов</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Загрузить 180 реальных казахстанских артистов в базу данных
                    </p>
                    <Button
                      onClick={handleSeedArtists}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Загрузка...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          Загрузить артистов
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Очистка базы */}
              <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-gray-800">Очистить базу</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Удалить всех артистов из базы данных (для тестирования)
                    </p>
                    <Button
                      onClick={handleClearArtists}
                      disabled={loading || artistCount === 0}
                      variant="destructive"
                      className="w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Очистить каталог
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Результат загрузки */}
            {seedResult && (
              <Alert className={seedResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                {seedResult.success ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <AlertDescription className={seedResult.success ? 'text-green-800' : 'text-red-800'}>
                  {seedResult.success ? (
                    <div className="space-y-1">
                      <p className="font-semibold">✅ Загрузка успешно завершена!</p>
                      <p className="text-sm">
                        Загружено {seedResult.successCount} артистов
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="font-semibold">❌ Ошибка загрузки</p>
                      <p className="text-sm">
                        {seedResult.error || 'Неизвестная ошибка'}
                      </p>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Инструкция */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-900 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Инструкция
              </h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-purple-600 min-w-[20px]">1.</span>
                  <span>Убедитесь, что миграция <code className="bg-purple-100 px-1 rounded">002_artists_catalog_and_bookings.sql</code> выполнена</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-purple-600 min-w-[20px]">2.</span>
                  <span>Нажмите "Загрузить артистов" для добавления 180 артистов</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-purple-600 min-w-[20px]">3.</span>
                  <span>После загрузки каталог автоматически переключится на работу с базой данных</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-purple-600 min-w-[20px]">4.</span>
                  <span>Используйте "Очистить базу" только для тестирования/отладки</span>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
