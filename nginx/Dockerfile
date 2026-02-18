# /nginx/Dockerfile
FROM nginx:1.25-alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom production configuration
COPY nginx-prod.conf /etc/nginx/conf.d/default.conf

# Copy the built frontend app
COPY ../backend/frontend/dist /usr/share/nginx/html