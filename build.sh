#!/bin/bash

# Exit on error
set -e

# Install frontend dependencies and build
cd frontend
npm install
npm run build:django
cd ..
