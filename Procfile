release: ./build.sh && cd backend && python manage.py migrate && python manage.py collectstatic --noinput
web: cd backend && gunicorn pro_portfolio.wsgi