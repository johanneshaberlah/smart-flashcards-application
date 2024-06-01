# Stage 1: Build the Vue.js application
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx tailwindcss init -p

COPY . .
RUN npm run build

# Stage 2: Serve the built application with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
