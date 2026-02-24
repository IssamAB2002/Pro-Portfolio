# Pro Portfolio

Production-ready Django + React (Vite) portfolio stack.

## Stack
- Backend: Django 5, PostgreSQL, Gunicorn, WhiteNoise
- Frontend: React + Vite
- Container: Docker Compose (web + db)

## Repository Layout
- `backend/`: Django project and API
- `frontend/`: React app
- `scripts/production-build.ps1`: local production build pipeline
- `docker-compose.yml`: containerized deployment

## Environment Variables
Use:
- `backend/.env.example` for local development
- `backend/.env.production.example` for production

Required backend vars:
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG`
- `DJANGO_ALLOWED_HOSTS`
- `DATABASE_URL`

Recommended production vars:
- `DJANGO_ADMIN_URL`
- `DJANGO_CORS_ALLOWED_ORIGINS`
- `DJANGO_CSRF_TRUSTED_ORIGINS`
- `DJANGO_SECURE_SSL_REDIRECT`
- `DJANGO_SECURE_HSTS_SECONDS`

Frontend:
- `frontend/.env.production.example`

## Local Development
1. Start PostgreSQL.
2. Configure `backend/.env`.
3. Backend:
   - `python -m pip install -r backend/requirements.txt`
   - `python backend/manage.py migrate`
   - `python backend/manage.py runserver`
4. Frontend:
   - `cd frontend`
   - `npm ci`
   - `npm run dev`

## Production Build (Local Script)
Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\production-build.ps1
```

## Docker Deployment
1. Set secure values in `backend/.env`.
2. Build and run:

```bash
docker compose up --build -d
```

3. App is exposed on `:8000`.

## API Endpoints
- `GET /api/projects/`
- `GET /api/skills/`
- `GET /api/skills/home/`
- `GET /api/education/`
- `POST /api/contact/`

## Quality and Security
- CI workflow: `.github/workflows/ci.yml`
- Deploy check:

```bash
python backend/manage.py check --deploy
```

- Tests:

```bash
python backend/manage.py test
```

## Deployment Checklist
- [ ] `DJANGO_DEBUG=False`
- [ ] strong `DJANGO_SECRET_KEY` configured
- [ ] `DJANGO_ALLOWED_HOSTS` set to real domains
- [ ] TLS terminated at reverse proxy/load balancer
- [ ] `DATABASE_URL` points to managed PostgreSQL
- [ ] `python manage.py migrate` completed
- [ ] `python manage.py collectstatic --noinput` completed
- [ ] frontend built and synced (`npm run build:django`)
- [ ] CI passing on main branch
- [ ] backup/restore process validated for PostgreSQL
