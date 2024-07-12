FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm ci

# Copy the rest of the application code
COPY . .

# Set environment variables for production
ARG VITE_API_BASE_URL

# Build the React app with Vite
RUN VITE_API_BASE_URL=$VITE_API_BASE_URL npm run build

FROM nginx:1.21-alpine

# Copy the build output to the nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]