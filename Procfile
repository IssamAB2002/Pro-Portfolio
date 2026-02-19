release: (cd frontend && npm install --production=false && npm run build:django) && (cd backend && python manage.py collectstatic --noinput && python manage.py migrate)
web: gunicorn pro_portfolio.wsgi --chdir backend
