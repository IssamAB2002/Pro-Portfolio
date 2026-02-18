# Aurora Stack Atlas (A-to-Z)

Project: **Pro Portfolio**
Scope: End-to-end summary from React/Vite frontend to Django/PostgreSQL backend (current state in repo)
Date: 2026-02-15

## A-Z Build Summary

### A - Architecture
- Monorepo with `frontend/` (React + Vite + Tailwind) and `backend/` (Django 5.1).
- Django serves React production build via template fallback route.
- Frontend dev uses Vite proxy to Django (`localhost:8000`).

### B - Backend Framework
- Django project: `backend/pro_portfolio`.
- Main template bridge view: `backend/pro_portfolio/views.py` (`ReactAppView`).
- URL fallback to React app for non-API/non-admin paths in `backend/pro_portfolio/urls.py`.

### C - CORS and Cross-Origin
- `corsheaders` enabled in `INSTALLED_APPS` and middleware.
- Allowed origins:
  - `http://localhost:5173`
  - `http://127.0.0.1:5173`
- Credentials enabled (`CORS_ALLOW_CREDENTIALS = True`).

### D - Database Strategy
- Config switched from SQLite to PostgreSQL via env-driven `DATABASE_URL`.
- Settings use `django-environ`.
- Example local URL: `postgresql://portfolio_user:securepass@localhost:5432/portfolio_db`.
- `backend/db.sqlite3` still exists as legacy file but active settings target PostgreSQL.

### E - Environment Management
- `.env` support added in Django settings using:
  - `env = environ.Env()`
  - `environ.Env.read_env(BASE_DIR / ".env")`
- Env template exists: `backend/.env.example`.

### F - Frontend Core
- App bootstrap: `frontend/src/main.jsx`.
- Router container: `frontend/src/App.jsx`.
- Navigation: `frontend/src/components/Navbar.jsx`.
- Theme palette (gold + deep purple) defined in Tailwind extension.

### G - Global Styling and UI Direction
- Tailwind configured in `frontend/tailwind.config.js`.
- Design language: strong contrast, glassmorphism cards, gradients, animated accents.
- Primary pages follow a consistent brand style.

### H - Home Experience
- `frontend/src/pages/Home.jsx` includes:
  - Hero section
  - Auto-rotating skills tags
  - Quotes carousel
  - Featured projects section
  - Skills grid
  - Contact CTA section
- Home attempts API fetch for projects and falls back to local sample data on failure.

### I - Integration Layer
- Axios wrapper: `frontend/src/lib/api.js`.
- Base URL strategy:
  - `VITE_API_BASE_URL` if set
  - fallback `/api`
- Vite dev proxy forwards `/api`, `/admin`, `/accounts` to Django backend.

### J - JavaScript Toolchain
- Vite 5, React 19, Tailwind 3, PostCSS/Autoprefixer.
- Scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run build:django` (build + sync into Django static/template folders)

### K - Known Gaps (Current)
- No DRF API routes implemented yet under `/api/...`.
- Frontend `Home.jsx` calls `GET /projects/` (not `/api/projects/`), and backend currently has no such endpoint.
- Result: Home falls back to sample projects until API is implemented.

### L - Local Data Sources
- Static project dataset in `frontend/src/data/projectsData.js`.
- Additional pages rely on static content and client-side routing for now.

### M - Models (Portfolio App)
- App created: `backend/portfolio`.
- Models in `backend/portfolio/models.py`:
  - `Project`
  - `Skill`
  - `Experience`
  - `Education`
  - `ContactMessage`
- Best-practice features implemented:
  - UUID primary keys
  - `slug` for `Project`
  - choices enums for categories
  - validators for numeric ranges
  - `ArrayField` for PostgreSQL-native list storage
  - ordering + `__str__` methods

### N - Navigation and Routing
- Frontend routes:
  - `/`, `/about`, `/projects`, `/projects/:id`, `/blogs`, `/blogs/:id`, `/contact`
- Backend route behavior:
  - `/admin/` to Django admin
  - Other non-static routes routed to React template

### O - Operations and Build Sync
- Build sync script: `frontend/scripts/sync-to-django.mjs`.
- Copies frontend `dist/assets` and `dist/index.html` into:
  - `backend/static/react`
  - `backend/templates/react`

### P - PostgreSQL Readiness
- Installed Python DB deps in backend environment:
  - `psycopg`
  - `django-environ`
- Initial migration file generated for `portfolio` models:
  - `backend/portfolio/migrations/0001_initial.py`
- Current blocker is local PostgreSQL service availability on `localhost:5432`.

### Q - Quality/Safety Practices Applied
- Secret key moved to env-backed config option.
- DB credentials designed for env override.
- Structured models with constraints and validators to reduce bad data.

### R - React Pages Implemented
- `Home`, `About`, `Projects`, `ProjectDetails`, `Blogs`, `BlogDetails`, `Contact`.
- Animated/interactable UI with route-level separation.

### S - Static/Template Serving
- Django static config:
  - `STATIC_URL = '/static/'`
  - `STATICFILES_DIRS = [BASE_DIR / 'static']`
  - `STATIC_ROOT = BASE_DIR / 'staticfiles'`
- React production artifacts already present under `backend/static/react` and `backend/templates/react/index.html`.

### T - Tech Stack Snapshot
- Frontend: React 19, Vite 5, Tailwind CSS 3, Axios, React Router, React Icons.
- Backend: Django 5.1, django-cors-headers, django-environ, PostgreSQL driver (`psycopg`).
- Database: PostgreSQL (target), SQLite legacy file still present.

### U - URL and Data Contract Notes
- Target API convention should be `/api/...` to align with Vite proxy and axios defaults.
- Suggest normalizing frontend project fetch to `/api/projects/` once DRF endpoints are added.

### V - Versioning and Runtime
- Python: 3.12.6.
- Django generated project baseline: 5.1.1.

### W - What Is Working Right Now
- Frontend runs as standalone Vite app.
- Django app boots with updated PostgreSQL settings.
- Portfolio models + initial migration file exist.
- React build can be synced into Django static/template directories.

### X - Execution Status (Cross-Stack)
- Completed:
  - Frontend multi-page UX and routing
  - Django React integration route
  - PostgreSQL settings wiring
  - Initial domain model layer
- Pending to complete full stack:
  - Start/install local PostgreSQL service
  - Run `python manage.py migrate`
  - Add DRF serializers/viewsets/urls
  - Connect Contact form and Project list to backend APIs

### Y - Your Next Commands (When Postgres Is Up)
```bash
cd backend
python manage.py migrate
python manage.py createsuperuser
python manage.py dbshell
```

### Z - Zenith Goal
- Final target architecture: React frontend consuming `/api` endpoints from Django, backed by PostgreSQL models already scaffolded in `portfolio` app, with admin-powered content management and production static serving through Django.

---

## Key Files Added/Changed During Backend Setup
- `backend/pro_portfolio/settings.py` (env + PostgreSQL config + app registration)
- `backend/portfolio/models.py` (core portfolio models)
- `backend/portfolio/migrations/0001_initial.py` (initial schema migration)
- `backend/.env.example` (env template)
- `backend/.env` (local env values)
- `docker-compose.yml` (optional PostgreSQL container template)

## Current Reality Check
- API endpoints are not implemented yet.
- PostgreSQL server is not yet running in this environment, so migrations cannot be applied to Postgres until service installation/start is completed.
