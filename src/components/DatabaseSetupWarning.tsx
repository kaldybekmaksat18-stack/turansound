import { useState } from 'react';
import { AlertTriangle, Database, ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export function DatabaseSetupWarning() {
  const [dismissed, setDismissed] = useState(false);
  const [showSQL, setShowSQL] = useState(false);

  if (dismissed) return null;

  const sqlScript = `-- Создание таблиц TuranSound
CREATE TABLE IF NOT EXISTS public.artist_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  stage_name TEXT,
  real_name TEXT,
  avatar TEXT,
  cover_video TEXT,
  city TEXT,
  languages TEXT[] DEFAULT '{}',
  genres TEXT[] DEFAULT '{}',
  bio TEXT,
  verified BOOLEAN DEFAULT false,
  experience INTEGER DEFAULT 0,
  total_performances INTEGER DEFAULT 0,
  base_price NUMERIC DEFAULT 0,
  price_ranges JSONB DEFAULT '{}',
  included_services TEXT[] DEFAULT '{}',
  additional_services JSONB DEFAULT '[]',
  availability JSONB DEFAULT '{"weekdays": true, "weekends": true, "holidays": true}',
  willing_to_travel BOOLEAN DEFAULT false,
  travel_regions TEXT[] DEFAULT '{}',
  audio_tracks JSONB DEFAULT '[]',
  videos JSONB DEFAULT '[]',
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.customer_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  avatar TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  event_preferences TEXT[] DEFAULT '{}',
  budget_range JSONB DEFAULT '{"min": 0, "max": 0}',
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artist_profiles_user_id ON public.artist_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_profiles_user_id ON public.customer_profiles(user_id);

ALTER TABLE public.artist_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Artist profiles are viewable by everyone" ON public.artist_profiles;
CREATE POLICY "Artist profiles are viewable by everyone"
  ON public.artist_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create their own artist profile" ON public.artist_profiles;
CREATE POLICY "Users can create their own artist profile"
  ON public.artist_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own artist profile" ON public.artist_profiles;
CREATE POLICY "Users can update their own artist profile"
  ON public.artist_profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Customer profiles are viewable by everyone" ON public.customer_profiles;
CREATE POLICY "Customer profiles are viewable by everyone"
  ON public.customer_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create their own customer profile" ON public.customer_profiles;
CREATE POLICY "Users can create their own customer profile"
  ON public.customer_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own customer profile" ON public.customer_profiles;
CREATE POLICY "Users can update their own customer profile"
  ON public.customer_profiles FOR UPDATE USING (auth.uid() = user_id);`;

  const copyToClipboard = () => {
    // Альтернативный метод копирования для iframe
    const textArea = document.createElement('textarea');
    textArea.value = sqlScript;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      textArea.remove();
      if (successful) {
        alert('✅ SQL скопирован в буфер обмена!');
      } else {
        // Если копирование не удалось, показываем SQL в UI
        setShowSQL(true);
      }
    } catch (err) {
      textArea.remove();
      // Показываем SQL прямо в интерфейсе
      setShowSQL(true);
    }
  };

  const handleSelectAll = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    (e.target as HTMLTextAreaElement).select();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white border-2 border-orange-500">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Требуется настройка базы данных
              </h2>
              <p className="text-gray-600 mb-4">
                База данных Supabase подключена, но таблицы профилей ещё не созданы.
              </p>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-4 border border-purple-200">
                <h3 className="font-semibold mb-2 text-purple-900">
                  📋 Быстрая установка (2 минуты):
                </h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600 min-w-[20px]">1.</span>
                    <span>Нажмите кнопку "Открыть Supabase Dashboard" ниже</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600 min-w-[20px]">2.</span>
                    <span>Перейдите в раздел <strong>SQL Editor</strong> (левое меню)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600 min-w-[20px]">3.</span>
                    <span>Нажмите <strong>New Query</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600 min-w-[20px]">4.</span>
                    <span>Нажмите "Копировать SQL" ниже и вставьте в редактор</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600 min-w-[20px]">5.</span>
                    <span>Нажмите <strong>Run</strong> (или Ctrl+Enter)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600 min-w-[20px]">6.</span>
                    <span>Перезагрузите эту страницу</span>
                  </li>
                </ol>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button
                  onClick={() => window.open('https://supabase.com/dashboard/project/hpcwkbkglggimwcbxpoh/editor', '_blank')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Открыть Supabase Dashboard
                </Button>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="border-purple-300 hover:bg-purple-50"
                >
                  <Database className="w-4 h-4 mr-2" />
                  Копировать SQL
                </Button>
                {!showSQL && (
                  <Button
                    onClick={() => setShowSQL(true)}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Показать SQL
                  </Button>
                )}
              </div>

              {showSQL && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">SQL Script (выделите и скопируйте Ctrl+C):</span>
                    <Button
                      onClick={() => setShowSQL(false)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <textarea
                    readOnly
                    value={sqlScript}
                    onClick={handleSelectAll}
                    className="w-full h-64 p-3 font-mono text-xs bg-white border border-gray-300 rounded resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Кликните на текст для выделения, затем нажмите Ctrl+C (Cmd+C на Mac)
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  💡 <strong>Подсказка:</strong> Этот процесс выполняется один раз при первоначальной настройке проекта.
                  После создания таблиц это окно больше не появится.
                </p>
              </div>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={() => setDismissed(true)}
          >
            <X className="w-5 h-5" />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}