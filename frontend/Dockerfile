# frontend/Dockerfile

# Fase 1: build
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Fase 2: servir Nginx
FROM nginx:alpine

# Remove default.conf
RUN rm /etc/nginx/conf.d/default.conf

# Copia o build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o seu nginx.conf customizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
