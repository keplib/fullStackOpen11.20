FROM node:latest

WORKDIR /phonebook-backend

COPY . .

RUN npm ci

# Set environment variable
ENV NODE_ENV=development
ENV MONGODB_URL_DEV=mongodb://mongo:27017/phonebook_dev

CMD ["npm", "run", "dev"]

EXPOSE 3000
