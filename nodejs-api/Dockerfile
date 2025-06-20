FROM node:18
WORKDIR /app
COPY . .
RUN npm install

# Donner les droits d'exécution au script
RUN chmod +x entrypoint.sh

EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]