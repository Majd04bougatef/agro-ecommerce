# Agro E-Commerce - Guide de Démarrage (Windows)

Bienvenue dans le projet Agro E-Commerce ! Ce guide est spécialement conçu pour t'aider à configurer et lancer le projet sur une machine **Windows**.

## Prérequis
Avant de commencer, assure-toi d'avoir installé les outils suivants sur ton PC :
- [Git for Windows](https://git-scm.com/downloads) (pour cloner le repo)
- [Docker Desktop pour Windows](https://www.docker.com/products/docker-desktop/) (pour lancer la base de données via docker-compose)
- [Node.js](https://nodejs.org/) (version LTS recommandée)
- [Flutter SDK & Android Studio](https://docs.flutter.dev/get-started/install/windows) (pour émuler et lancer l'application mobile)

---

## Étape 1 : Cloner le projet

Ouvre ton terminal (Invite de commandes, PowerShell ou Git Bash) et exécute :

```cmd
git clone https://github.com/Majd04bougatef/agro-ecommerce.git
cd agro-ecommerce
```
*(Remplace l'URL par l'URL exacte du dépôt GitHub)*

---

## Étape 2 : Lancer Docker (Services / Base de données)

Avant de démarrer le code, il faut lancer les services Docker (comme la base de données).
1. Assure-toi que l'application **Docker Desktop** est ouverte et tourne en arrière-plan.
2. Dans le terminal à la racine du projet (`agro-ecommerce`), lance la commande :

```cmd
docker-compose up -d
```
*Pour vérifier que tout fonctionne : tape `docker ps`. Tu devrais voir les conteneurs en cours d'exécution.*

---

## Étape 3 : Lancer le Backend (API Node.js)

Ouvre un nouveau terminal (laisse Docker tourner) et navigue dans le dossier backend :

```cmd
cd backend
```

1. **Installer les dépendances** :
   ```cmd
   npm install
   ```
2. **Démarrer le serveur backend** :
   ```cmd
   npm run dev
   ```
3. **Vérifier que ça marche** :
   Ouvre ton navigateur et va sur : [http://localhost:8080](http://localhost:8080) (ou la route de base de l'API). Tu devrais recevoir une réponse JSON ou un message confirmant que le serveur tourne.
4. **Faire les tests du backend** :
   ```cmd
   npm test
   ```

---

## Étape 4 : Lancer le Frontend (Application React)

Ouvre un **nouveau** terminal (laisse le backend tourner) et navigue dans le dossier frontend :

```cmd
cd frontend
```

1. **Installer les dépendances** :
   ```cmd
   npm install
   ```
2. **Démarrer le serveur web React** :
   ```cmd
   npm run dev
   ```
3. **Vérifier que ça marche** :
   Ouvre ton navigateur sur : [http://localhost:3000](http://localhost:3000). Le site E-commerce devrait s'afficher correctement et se connecter au backend.
4. **Faire les tests du frontend** :
   ```cmd
   npm test
   ```
   *(Si cela demande de fermer le mode interactif des tests, appuie sur `q`)*

---

## Étape 5 : Lancer l'Application Mobile (Flutter)

Ouvre un **nouveau** terminal et navigue dans le dossier mobile :

```cmd
cd flutter_app
```

1. **Installer les packages** :
   ```cmd
   flutter pub get
   ```
2. **Lancer un émulateur Android** :
   Ouvre **Android Studio** et lance un appareil virtuel (AVD) via le Device Manager, ou branche directement ton téléphone Android avec le débogage USB activé.
3. **Démarrer l'application** :
   Une fois l'émulateur allumé, lance :
   ```cmd
   flutter run
   ```
4. **Faire les tests de l'application mobile** :
   ```cmd
   flutter test
   ```

---
Bon code ! 🚀# Agro E-Commerce

Bienvenue dans le projet Agro E-Commerce. Ce projet contient un Backend (Node.js), un Frontend (React.js), et une application Mobile (Flutter).

## Structure du Projet

- `backend/` : L'API Node.js/Express.
- `frontend/` : L'application web React.
- `flutter_app/` : L'application mobile multiplateforme développée avec Flutter.

## Guide d'Installation et d'Exécution

### 1. Backend (Node.js)

Le backend utilise Node.js.

1. Allez dans le dossier `backend` :
   ```bash
   cd backend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez le serveur en mode développement (utilise `nodemon` si configuré) :
   ```bash
   npm run dev
   ```
   *Ou avec Node standard : `node server.js`*

### 2. Frontend (React)

Le frontend est une UI Web en React.

1. Allez dans le dossier `frontend` :
   ```bash
   cd frontend
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez l'application (serveur de développement, généralement sur le port 3000) :
   ```bash
   npm run dev
   ```

### 3. Application Mobile (Flutter)

L'application mobile est construite avec Flutter.

1. Allez dans le dossier `flutter_app` :
   ```bash
   cd flutter_app
   ```
2. Téléchargez les packages Flutter :
   ```bash
   flutter pub get
   ```
3. Lancez le projet sur un émulateur ou un appareil connecté :
   ```bash
   flutter run
   ```

## Connecter le Projet à GitHub

Pour lier ce projet local à un dépôt GitHub déjà créé, exécutez ces commandes à la racine du projet (`/Users/majdbougatef/Desktop/agro-ecommerce`) :

```bash
# 1. Ajouter tous les fichiers (les .gitignore ignoreront les node_modules, etc.)
git add .

# 2. Créer le premier commit
git commit -m "Initial commit - Ajout des dossiers backend, frontend et flutter_app"

# 3. Lier au repository distant (Remplacez l'URL par la vôtre)
git remote add origin https://github.com/VOTRE_USERNAME/VOTRE_REPO.git

# 4. Pousser le code vers la branche principale
git push -u origin main
# (Utilisez "git push -u origin master" si votre branche par défaut s'appelle master)
```# 🌾 Agro E-Commerce — Workshop

Application e-commerce de produits agricoles (Backend Node.js + Frontend React + MongoDB via Docker).

## Prérequis

- [Node.js v18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Démarrage rapide

### 1. Démarrer MongoDB (Docker)

```bash
cd ~/Desktop/agro-ecommerce
docker compose up -d
```

### 2. Démarrer le Backend

```bash
cd ~/Desktop/agro-ecommerce/backend
npm install
npm run dev
```

Backend disponible sur : http://localhost:5000

### 3. Démarrer le Frontend

```bash
cd ~/Desktop/agro-ecommerce/frontend
npm install
npm start
```

Frontend disponible sur : http://localhost:3000

---

## Configuration (optionnelle)

Modifier `backend/.env` et `frontend/.env` avec vos vraies clés :

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (test : sk_test_...) |
| `STRIPE_PUBLISHABLE_KEY` | Clé publiable Stripe (test : pk_test_...) |
| `EMAIL_USER` | Adresse Gmail pour envoi d'emails |
| `EMAIL_PASS` | Mot de passe d'application Gmail |

## Test du paiement Stripe

Carte de test : **4242 4242 4242 4242**  
Date d'expiration : **12/34**  
CVC : **123**

## Routes API disponibles

| Méthode | Route | Description |
|---|---|---|
| POST | /api/auth/register | Inscription |
| POST | /api/auth/login | Connexion |
| GET | /api/products | Liste des produits |
| POST | /api/products | Créer un produit (auth) |
| POST | /api/orders | Créer une commande (auth) |
| GET | /api/orders/my | Mes commandes (auth) |
| POST | /api/payments/create-payment-intent | Initier paiement Stripe (auth) |

## Ajouter des produits de test

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@test.com","password":"123456","role":"farmer"}'
```

Puis se connecter sur http://localhost:3000/login avec ces identifiants.

## Arrêter MongoDB

```bash
docker compose down
```
