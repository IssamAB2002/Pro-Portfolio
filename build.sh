#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build frontend
echo "Building frontend..."
cd frontend
npm run build:django
cd ..

# Run migrations
echo "Running database migrations..."
cd backend
python manage.py migrate
cd ..

# Collect static files
echo "Collecting static files..."
cd backend
python manage.py collectstatic --noinput
cd ..

# Start server
echo "Starting server..."
cd backend
gunicorn pro_portfolio.wsgi