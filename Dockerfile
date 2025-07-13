FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 3000

ENV USUARIO forum-alura
ENV SENHA minhasenhasecreta

CMD ["node", "/app/api/index.js"]