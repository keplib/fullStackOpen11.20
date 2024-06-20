FROM node:latest

WORKDIR /phonebook-backend

COPY . .

RUN npm ci

CMD ["node", "index.js"]

EXPOSE 3000
