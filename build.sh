#!/bin/bash
set -e

cd backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
```

---

**`Procfile` — clean and simple**
```
build: bash build.sh
web: cd backend && gunicorn pro_portfolio.wsgi