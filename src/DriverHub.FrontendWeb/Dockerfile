# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar versão estável do npm para consistência
RUN npm install -g npm@10

# Copy package files
COPY package*.json ./

# Instalar dependências - forçar npm install para evitar problemas de lock
RUN echo "📦 Removendo package-lock.json e usando npm install limpo (Padrão Barbear.IA)" && \
    rm -f package-lock.json && \
    npm install --no-audit --no-fund

# Copy source code
COPY . .

# Build the application with debug info
RUN echo "🏗️ Iniciando build de produção..." && \
    npm run build && \
    echo "✅ Build concluído. Verificando arquivos gerados:" && \
    ls -la dist/

# Production stage
FROM nginx:alpine

# Copy built application (Vite default is 'dist')
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check para monitoramento automático
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
