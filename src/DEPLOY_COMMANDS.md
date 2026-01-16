# 🎯 Шпаргалка команд для деплоя

## Git - Первоначальная настройка

```bash
# Инициализация репозитория
git init

# Добавить все файлы
git add .

# Первый коммит
git commit -m "Initial commit: TuranSound platform"

# Подключить GitHub репозиторий (создайте его на github.com/new)
git remote add origin https://github.com/ваш-username/turansound.git

# Отправить код на GitHub
git branch -M main
git push -u origin main
```

## Git - Обновление после изменений

```bash
# Посмотреть измененные файлы
git status

# Добавить все изменения
git add .

# Сделать коммит с описанием
git commit -m "Описание изменений"

# Отправить на GitHub (автоматический деплой!)
git push
```

## NPM - Локальная разработка

```bash
# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Собрать для production
npm run build

# Предпросмотр production сборки
npm run preview
```

## Vercel CLI - Деплой через командную строку

```bash
# Установить Vercel CLI
npm install -g vercel

# Первый деплой
vercel

# Production деплой
vercel --prod

# Посмотреть логи
vercel logs
```

## Netlify CLI - Деплой через командную строку

```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Войти в аккаунт
netlify login

# Инициализировать проект
netlify init

# Деплой на production
netlify deploy --prod

# Открыть сайт
netlify open
```

## Переменные окружения

### Для Vercel (через CLI)
```bash
# Добавить переменную
vercel env add VITE_SUPABASE_PROJECT_ID production

# Список переменных
vercel env ls
```

### Для Netlify (через CLI)
```bash
# Добавить переменную
netlify env:set VITE_SUPABASE_PROJECT_ID "hpcwkbkglggimwcbxpoh"

# Список переменных
netlify env:list
```

### Локально (для разработки)
```bash
# Создайте файл .env в корне проекта
echo "VITE_SUPABASE_PROJECT_ID=hpcwkbkglggimwcbxpoh" > .env
echo "VITE_SUPABASE_ANON_KEY=ваш-ключ" >> .env
```

## Проверка работоспособности

```bash
# Проверить версии
node --version    # должно быть >= 18
npm --version     # должно быть >= 9
git --version     # любая версия

# Проверить package.json
cat package.json

# Проверить сборку локально
npm run build
ls -la dist/      # должны быть файлы

# Запустить production локально
npm run preview
```

## Полезные алиасы

Добавьте в `.bashrc` или `.zshrc`:

```bash
# Git сокращения
alias gs='git status'
alias ga='git add .'
alias gc='git commit -m'
alias gp='git push'

# Деплой сокращения
alias deploy='git push && vercel --prod'
alias deploy-netlify='git push && netlify deploy --prod'

# Development
alias dev='npm run dev'
alias build='npm run build'
```

## Быстрый деплой (одна команда)

```bash
# Создать скрипт deploy.sh
cat > deploy.sh << 'EOF'
#!/bin/bash
echo "🚀 Деплой TuranSound..."
git add .
echo "📝 Введите описание изменений:"
read message
git commit -m "$message"
git push
echo "✅ Код отправлен! Vercel автоматически начнет деплой."
EOF

chmod +x deploy.sh

# Использование
./deploy.sh
```

## Откат к предыдущей версии

```bash
# Посмотреть историю
git log --oneline

# Откатиться к предыдущему коммиту
git revert HEAD

# Или к конкретному
git revert <commit-hash>

# Отправить откат
git push
```

## Очистка и пересборка

```bash
# Удалить node_modules и пересобрать
rm -rf node_modules package-lock.json
npm install

# Очистить кэш npm
npm cache clean --force

# Очистить dist и пересобрать
rm -rf dist
npm run build
```

## Мониторинг деплоя

### Vercel
```bash
# Открыть dashboard
vercel open

# Посмотреть последние деплои
vercel ls

# Логи последнего деплоя
vercel logs
```

### Netlify
```bash
# Открыть dashboard
netlify open

# Статус последнего деплоя
netlify status

# Логи
netlify logs
```

## Решение проблем

```bash
# Ошибка "Module not found"
npm install
npm run build

# Ошибка TypeScript
npm run build -- --no-typecheck

# Проверить линтер
npm run lint

# Очистить всё и начать заново
rm -rf node_modules dist .vercel .netlify
npm install
npm run build
```

## GitHub Actions (CI/CD)

Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📞 Нужна помощь?

- 📖 [Полное руководство](./DEPLOYMENT_GUIDE.md)
- ⚡ [Быстрый старт](./DEPLOY_QUICK_START.md)
- 🐛 [Решение проблем](./DEPLOYMENT_GUIDE.md#устранение-проблем)
