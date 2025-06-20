FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run migrate
EXPOSE 5000
ENTRYPOINT ["./entrypoint.sh"]