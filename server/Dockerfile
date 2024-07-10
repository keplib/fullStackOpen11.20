FROM node:latest

WORKDIR /phonebook-backend

COPY . .

RUN npm ci

# Set environment variable
ENV NODE_ENV=production

CMD ["node", "index.js"]

EXPOSE 3000
