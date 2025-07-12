FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3000

CMD ["node", "/app/api/index.js"]