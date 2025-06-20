FROM node:18
WORKDIR /app
COPY nodejs-api/ .
RUN npm install
RUN npm run migrate
EXPOSE 5000
CMD ["npm", "run", "dev"]