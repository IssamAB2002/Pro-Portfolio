FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:latest

COPY --from=builder /app/dist /app/dist
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 3000
```

3. **In Railway Dashboard:**
   - Set Root Directory to `/backend` (or `/frontend` for frontend service)
   - Railway will auto-detect Dockerfile and use it instead of Railpack

---

## Quick Debug Checklist:

**Check these in your repository RIGHT NOW:**

1. **Does `/backend/` folder exist?** (Not `/Backend/` with capital B)
2. **Does `/backend/` contain:**
   - ✅ `manage.py`?
   - ✅ `requirements.txt`?
   - ✅ `Procfile`?
   - ✅ `runtime.txt`?

3. **Does `/backend/Procfile` have the correct Django project name?**
   - Show me what's inside your `/backend/Procfile`
   - What's the name of your Django settings folder? (usually `config` or `myproject`)

4. **Check if there's a hidden issue:**
   - Is there a **root-level** `requirements.txt` or `manage.py`? (There shouldn't be)
   - Is there a **root-level** `Procfile`? (There shouldn't be)

---

## The Most Likely Issue

My guess: Your **Procfile has the wrong Django project name**.

If your Django settings file is at `/backend/myproject/settings.py` (not `config/settings.py`), then your Procfile should say:
```
web: python manage.py migrate && gunicorn myproject.wsgi:application -b 0.0.0.0:$PORT
```

Not:
```
web: python manage.py migrate && gunicorn config.wsgi:application -b 0.0.0.0:$PORT