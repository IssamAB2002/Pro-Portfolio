#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

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

# Collect static files
echo "Collecting static files..."
cd backend
python manage.py collectstatic --noinput
cd ..
