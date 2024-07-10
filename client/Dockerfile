FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci

# Set environment variables for production
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the application for production
RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html