FROM node:latest

WORKDIR /app

COPY package.json /app
COPY wait-for-it.sh /app

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]