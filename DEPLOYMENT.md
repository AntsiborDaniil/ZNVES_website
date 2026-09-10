# Деплой на прод (znves.ru)

## Переменные окружения на проде

На **Vercel**, **Timeweb (Docker)** и большинстве хостингов файл `.env` из репозитория **не подхватывается** автоматически (кроме явного `env_file` в compose). Из-за этого на проде возвращается 503 и `CDEK_NOT_CONFIGURED`.

**Что сделать:** добавить переменные в настройках окружения хоста или в `.env.production` на сервере.

### Vercel

1. Откройте проект → **Settings** → **Environment Variables**.
2. Добавьте (для Production и при необходимости Preview):

| Имя | Описание | Секрет |
|-----|----------|--------|
| `CDEK_ACCOUNT` | Логин (client_id) СДЭК API | Да |
| `CDEK_SECURE_PASSWORD` | Пароль (client_secret) СДЭК API | Да |
| `YA_DELIVERY_SOURCE_ADDRESS` | Адрес ПВЗ «откуда везём», напр. «Москва, Промышленная улица, 12А, 115516» | Нет |
| `NEXT_PUBLIC_SITE_URL` | URL сайта, напр. `https://znves.ru` | Нет |
| `NEXT_PUBLIC_API_BASE_URL` | URL бэкенда, напр. `https://api.znves.ru` | Нет |

3. Сохраните и **пересоберите проект** (Redeploy).

### Timeweb (Docker + nginx) — без автодеплоя из этого файла

Файлы в репозитории:

- `Dockerfile` — multi-stage Next.js (`output: "standalone"`)
- `docker-compose.yml` — сервисы `app` + `nginx` (+ опционально `certbot`)
- `deploy/nginx/default.conf` — reverse proxy
- `.env.production.example` — шаблон секретов

**Подготовка на VPS (когда будете деплоить):**

1. Установить Docker + Compose.
2. Скопировать репозиторий на сервер.
3. `cp .env.production.example .env.production` и заполнить значения (как на Vercel).
4. Сборка и запуск (пока не делаем из CI):

```bash
docker compose build
docker compose up -d
```

5. DNS: `znves.ru` / `www` → A на IP сервера; **`api` не трогать**.
6. SSL (после того как DNS указывает на сервер):

```bash
docker compose --profile certs run --rm certbot certonly \
  --webroot -w /var/www/certbot \
  -d znves.ru -d www.znves.ru \
  --email YOUR@EMAIL --agree-tos --no-eff-email
```

Затем раскомментировать HTTPS-блок в `deploy/nginx/default.conf` и `docker compose exec nginx nginx -s reload`.

`NEXT_PUBLIC_*` задаются и в `.env.production`, и как build-args (см. `docker-compose.yml`) — после их смены нужен **rebuild** образа.

### Другие хосты

Укажите те же переменные в разделе Environment Variables / Config Vars вашего хостинга.

---

После добавления переменных запросы к `/api/cdek/pvz` и `/api/cdek/calculate` начнут отрабатывать, список ПВЗ и расчёт доставки СДЭК на проде заработают.
