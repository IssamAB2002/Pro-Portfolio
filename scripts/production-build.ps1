$ErrorActionPreference = "Stop"

Write-Host "Installing frontend dependencies..."
Push-Location "frontend"
npm ci

Write-Host "Building frontend and syncing to Django..."
npm run build:django
Pop-Location

Write-Host "Installing backend dependencies..."
python -m pip install -r backend/requirements.txt

Write-Host "Running Django checks and migrations..."
Push-Location "backend"
python manage.py check --deploy
python manage.py migrate --noinput
python manage.py collectstatic --noinput
Pop-Location

Write-Host "Production build pipeline complete."
