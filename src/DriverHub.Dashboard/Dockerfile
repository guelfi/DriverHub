# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar versão estável do npm
RUN npm install -g npm@10

# Copy package files
COPY package*.json ./

# Definir variável de ambiente para build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Instalar dependências
RUN rm -f package-lock.json && \
    npm install --no-audit --no-fund

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
