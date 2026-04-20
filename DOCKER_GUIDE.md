# Finalisation de l'Orchestration Docker Compose

Pour que ton ami puisse lancer tout le projet (Base de données + Backend + Frontend) avec une seule commande, nous allons configurer des Dockerfiles et mettre à jour le fichier `docker-compose.yml`.

## 1. Dockerfile pour le Backend (`backend/Dockerfile`)
```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]
```

## 2. Dockerfile pour le Frontend (`frontend/Dockerfile`)
```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
```

## 3. Mise à jour du `docker-compose.yml`
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    container_name: agro-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    container_name: agro-backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongodb:27017/agro_ecommerce
      - PORT=5000
      - JWT_SECRET=votre_secret
      - STRIPE_SECRET_KEY=votre_sk
      # ... ajoutez les autres variables du .env ici
    depends_on:
      - mongodb

  frontend:
    build: ./frontend
    container_name: agro-frontend
    ports:
      - "3000:3000"
    environment:
      - WDS_SOCKET_PORT=0
    depends_on:
      - backend

volumes:
  mongo-data:
```

## Commande pour tout lancer :
```bash
docker-compose up --build
```
