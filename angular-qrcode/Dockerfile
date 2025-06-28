FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Étape 2 : servir avec Nginx
FROM nginx:alpine
COPY --from=builder /app/dist/angular-qrcode /usr/share/nginx/html