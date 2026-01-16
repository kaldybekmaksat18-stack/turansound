import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Shield, 
  CheckCircle,
  Clock,
  AlertCircle,
  FileSignature,
  Lock,
  Eye,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface ContractsLegalProps {
  userRole: 'artist' | 'client';
}

interface Contract {
  id: string;
  type: string;
  clientName?: string;
  artistName?: string;
  eventDate: string;
  amount: number;
  status: 'draft' | 'pending' | 'signed' | 'active' | 'completed';
  signedDate?: string;
  escrowStatus: 'none' | 'locked' | 'released';
  penalties: {
    artistCancellation: number;
    clientCancellation: number;
    lateArrival: number;
  };
}

const contractTemplates = [
  {
    id: 'wedding',
    name: 'Свадебное мероприятие',
    description: 'Стандартный договор на свадебное выступление',
    icon: '💒',
    clauses: 15
  },
  {
    id: 'corporate',
    name: 'Корпоративное мероприятие',
    description: 'Договор для корпоративных клиентов',
    icon: '🏢',
    clauses: 18
  },
  {
    id: 'festival',
    name: 'Фестиваль/Концерт',
    description: 'Для публичных мероприятий и фестивалей',
    icon: '🎪',
    clauses: 22
  },
  {
    id: 'government',
    name: 'Государственное мероприятие',
    description: 'Специальный шаблон для госзаказов',
    icon: '🏛️',
    clauses: 25
  },
  {
    id: 'restaurant',
    name: 'Ресторан/Лаунж',
    description: 'Регулярные выступления в заведениях',
    icon: '🍽️',
    clauses: 12
  },
  {
    id: 'private',
    name: 'Частное мероприятие',
    description: 'День рождения, юбилей и др.',
    icon: '🎉',
    clauses: 14
  }
];

const mockContracts: Contract[] = [
  {
    id: '1',
    type: 'wedding',
    clientName: 'Асель Мукашева',
    eventDate: '2026-02-20',
    amount: 450000,
    status: 'signed',
    signedDate: '2026-01-15',
    escrowStatus: 'locked',
    penalties: {
      artistCancellation: 225000,
      clientCancellation: 90000,
      lateArrival: 50000
    }
  },
  {
    id: '2',
    type: 'corporate',
    clientName: 'Tengri Bank',
    eventDate: '2026-03-10',
    amount: 800000,
    status: 'pending',
    escrowStatus: 'none',
    penalties: {
      artistCancellation: 400000,
      clientCancellation: 160000,
      lateArrival: 80000
    }
  },
  {
    id: '3',
    type: 'wedding',
    clientName: 'Ерлан Садыков',
    eventDate: '2025-12-15',
    amount: 380000,
    status: 'completed',
    signedDate: '2025-11-20',
    escrowStatus: 'released',
    penalties: {
      artistCancellation: 190000,
      clientCancellation: 76000,
      lateArrival: 40000
    }
  }
];

export function ContractsLegal({ userRole }: ContractsLegalProps) {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const getStatusBadge = (status: Contract['status']) => {
    const variants: Record<typeof status, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      draft: { label: 'Черновик', variant: 'secondary' },
      pending: { label: 'Ожидает подписи', variant: 'outline' },
      signed: { label: 'Подписан', variant: 'default' },
      active: { label: 'Активен', variant: 'default' },
      completed: { label: 'Завершён', variant: 'outline' }
    };
    return <Badge variant={variants[status].variant}>{variants[status].label}</Badge>;
  };

  const getStatusIcon = (status: Contract['status']) => {
    switch (status) {
      case 'draft':
        return <FileText className="w-5 h-5 text-gray-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'signed':
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Контракты и юридические документы</h1>
          <p className="text-muted-foreground">
            Смарт-контракты с автоматическим исполнением условий
          </p>
        </div>

        <Tabs defaultValue="contracts" className="w-full">
          <TabsList>
            <TabsTrigger value="contracts">Мои контракты</TabsTrigger>
            <TabsTrigger value="templates">Шаблоны</TabsTrigger>
            <TabsTrigger value="signatures">ЭЦП</TabsTrigger>
          </TabsList>

          {/* Contracts List */}
          <TabsContent value="contracts" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Stats */}
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl mb-1">8</div>
                        <div className="text-sm text-muted-foreground">Всего контрактов</div>
                      </div>
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl mb-1">3</div>
                        <div className="text-sm text-muted-foreground">Активных</div>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl mb-1">₸1.3M</div>
                        <div className="text-sm text-muted-foreground">На эскроу</div>
                      </div>
                      <Lock className="w-8 h-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl mb-1">100%</div>
                        <div className="text-sm text-muted-foreground">Надёжность</div>
                      </div>
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contracts List */}
              <div className="lg:col-span-2 space-y-4">
                {mockContracts.map((contract) => (
                  <Card 
                    key={contract.id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedContract(contract)}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-xl flex items-center justify-center flex-shrink-0">
                          {getStatusIcon(contract.status)}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="mb-1">
                                {contractTemplates.find(t => t.id === contract.type)?.name}
                              </h4>
                              <div className="text-sm text-muted-foreground">
                                {userRole === 'artist' ? contract.clientName : contract.artistName}
                              </div>
                            </div>
                            {getStatusBadge(contract.status)}
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span>Договор #{contract.id}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{new Date(contract.eventDate).toLocaleDateString('ru-RU')}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t">
                            <div className="text-lg font-medium">
                              ₸{contract.amount.toLocaleString()}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Открыть
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                PDF
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contract Details Sidebar */}
              <div className="space-y-6">
                {selectedContract ? (
                  <>
                    <Card>
                      <CardHeader>
                        <h3>Детали контракта</h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Тип мероприятия</div>
                          <div className="font-medium">
                            {contractTemplates.find(t => t.id === selectedContract.type)?.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Дата события</div>
                          <div className="font-medium">
                            {new Date(selectedContract.eventDate).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                          <div className="font-medium text-lg">
                            ₸{selectedContract.amount.toLocaleString()}
                          </div>
                        </div>
                        {selectedContract.signedDate && (
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Дата подписания</div>
                            <div className="font-medium">
                              {new Date(selectedContract.signedDate).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h3>Условия и штрафы</h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                          <div className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                            Отмена артистом
                          </div>
                          <div className="text-xs text-red-700 dark:text-red-300">
                            Штраф: ₸{selectedContract.penalties.artistCancellation.toLocaleString()} (50%)
                          </div>
                        </div>

                        <div className="p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                          <div className="text-sm font-medium text-orange-900 dark:text-orange-100 mb-1">
                            Отмена заказчиком
                          </div>
                          <div className="text-xs text-orange-700 dark:text-orange-300">
                            За 7+ дней: возврат 90%<br />
                            Менее 7 дней: ₸{selectedContract.penalties.clientCancellation.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="text-sm font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                            Опоздание артиста
                          </div>
                          <div className="text-xs text-yellow-700 dark:text-yellow-300">
                            Более 30 мин: ₸{selectedContract.penalties.lateArrival.toLocaleString()}
                          </div>
                        </div>

                        <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                            ✓ Форс-мажор
                          </div>
                          <div className="text-xs text-green-700 dark:text-green-300">
                            Полный возврат средств без штрафов
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <h3>Эскроу-счёт</h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Статус</span>
                            <Badge variant={selectedContract.escrowStatus === 'locked' ? 'secondary' : 'outline'}>
                              {selectedContract.escrowStatus === 'locked' ? '🔒 Заблокировано' : '✅ Выплачено'}
                            </Badge>
                          </div>
                          {selectedContract.escrowStatus === 'locked' && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                              <div className="text-sm text-blue-900 dark:text-blue-100">
                                Деньги будут автоматически переведены артисту через 24 часа после мероприятия
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Выберите контракт для просмотра деталей</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="mt-6">
            <div className="mb-6">
              <h2 className="mb-2">Шаблоны контрактов</h2>
              <p className="text-muted-foreground">
                Готовые юридические шаблоны для разных типов мероприятий
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contractTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{template.icon}</div>
                    <h3 className="mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{template.clauses} пунктов</Badge>
                      <Badge variant="outline">Готов к использованию</Badge>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Создать контракт
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Предпросмотр
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Digital Signatures */}
          <TabsContent value="signatures" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900 rounded-xl flex items-center justify-center">
                      <FileSignature className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3>Электронная цифровая подпись (ЭЦП)</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Юридически значимая подпись для контрактов
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="mb-4">Ваша ЭЦП</h4>
                      <div className="p-4 bg-muted rounded-lg mb-4">
                        <div className="text-sm text-muted-foreground mb-2">Статус</div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Активна
                        </Badge>
                      </div>
                      <div className="p-4 bg-muted rounded-lg mb-4">
                        <div className="text-sm text-muted-foreground mb-2">Сертификат</div>
                        <div className="text-sm font-mono">
                          RU-12345678-ABCD-EFGH
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Срок действия</div>
                        <div className="text-sm">До 15 декабря 2027</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4">Интеграции</h4>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg border flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-1">Blockchain ID</div>
                            <div className="text-xs text-muted-foreground">
                              Децентрализованная система
                            </div>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>

                        <div className="p-4 rounded-lg border flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center">
                            <FileSignature className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium mb-1">GovTech KZ</div>
                            <div className="text-xs text-muted-foreground">
                              Государственная система ЭЦП
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Подключить
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                          Юридическая сила
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          Все контракты с ЭЦП имеют полную юридическую силу согласно законодательству РК и признаются в суде
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4">История подписей</h4>
                    <div className="space-y-2">
                      {[
                        { date: '2026-01-15', document: 'Свадебный контракт #1', client: 'Асель Мукашева' },
                        { date: '2025-12-20', document: 'Корпоративный контракт #2', client: 'Tengri Bank' },
                        { date: '2025-11-18', document: 'Частное мероприятие #3', client: 'Бакыт Ахметов' }
                      ].map((item, index) => (
                        <div key={index} className="p-3 rounded-lg border flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileSignature className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <div className="text-sm font-medium">{item.document}</div>
                              <div className="text-xs text-muted-foreground">{item.client}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
