# Étape 1 : Build Angular
FROM node:20 AS build
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du projet
COPY . .

# Build Angular (Angular 17+)
RUN npm run build -- --configuration production

# Étape 2 : Serveur Nginx
FROM nginx:alpine

# Copier le build Angular dans Nginx
COPY --from=build /app/dist/* /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
