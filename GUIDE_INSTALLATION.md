# 🌿 Guide d'installation — Agro E-Commerce
### Pour un PC Windows vierge (uniquement VSCode installé)

---

## ⏱ Temps estimé : 30-45 minutes

---

## ÉTAPE 1 — Installer les outils requis

### 1.1 — Node.js
1. Va sur 👉 https://nodejs.org
2. Clique sur **"LTS"** (version recommandée)
3. Télécharge et installe (clique "Next" jusqu'à la fin)
4. Vérifie l'installation : ouvre un terminal et tape :
   ```
   node -v
   npm -v
   ```
   Tu dois voir des numéros de version (ex: `v20.x.x`)

---

### 1.2 — Docker Desktop
1. Va sur 👉 https://www.docker.com/products/docker-desktop
2. Clique **"Download for Windows"**
3. Installe Docker Desktop
4. **Redémarre ton PC** après installation
5. Lance Docker Desktop depuis le bureau — attends que l'icône 🐳 soit verte dans la barre système
6. Vérifie :
   ```
   docker -v
   ```

---

### 1.3 — Flutter
1. Va sur 👉 https://docs.flutter.dev/get-started/install/windows
2. Télécharge le fichier ZIP Flutter (flutter_windows_x.x.x-stable.zip)
3. Extrais le ZIP dans `C:\flutter` (important : pas dans Program Files)
4. Ajoute Flutter au PATH :
   - Cherche "Variables d'environnement" dans le menu Démarrer
   - Clique "Variables d'environnement"
   - Dans "Variables système" → sélectionne "Path" → Modifier
   - Ajoute : `C:\flutter\bin`
   - Clique OK partout
5. Ouvre un **nouveau** terminal et vérifie :
   ```
   flutter --version
   ```

---

### 1.4 — Git
1. Va sur 👉 https://git-scm.com/download/win
2. Télécharge et installe (options par défaut)
3. Vérifie :
   ```
   git --version
   ```

---

## ÉTAPE 2 — Récupérer le projet

Ton ami t'envoie le projet (ZIP ou GitHub). 

### Option A — Via ZIP
1. Décompresse le ZIP dans `C:\Users\<TonNom>\Desktop\agro-ecommerce`

### Option B — Via GitHub (si le projet est sur GitHub)
```bash
cd Desktop
git clone https://github.com/LIEN_DU_PROJET agro-ecommerce
```

---

## ÉTAPE 3 — Configurer les variables d'environnement backend

1. Va dans le dossier `agro-ecommerce/backend/`
2. Le fichier `.env` doit déjà exister. S'il n'existe pas, crée-le et mets :

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/agro_ecommerce
JWT_SECRET=agro_secret_jwt_2024_change_me
STRIPE_SECRET_KEY=votre_cle_stripe_ici
STRIPE_PUBLISHABLE_KEY=votre_cle_publique_ici
STRIPE_WEBHOOK_SECRET=whsec_REMPLACER_PAR_VOTRE_SECRET
EMAIL_USER=karm.chkili@sesame.com.tn
EMAIL_PASS=fzjj rdkb izwt tkjx
```

---

## ÉTAPE 4 — Trouver son adresse IP locale

> ⚠️ Important pour l'app mobile Flutter !

1. Ouvre le terminal (cmd ou PowerShell)
2. Tape :
   ```
   ipconfig
   ```
3. Note l'adresse **IPv4** (ex: `192.168.1.45`) sous "Carte réseau sans fil Wi-Fi"

Ensuite, modifie ces 2 fichiers dans `flutter_app/lib/services/` :
- `api_service.dart` → ligne 6 : remplace l'IP par la tienne
- `auth_service.dart` → ligne 6 : idem

```dart
static const String baseUrl = 'http://192.168.1.45:5001/api'; // ← TON IP
```

---

## ÉTAPE 5 — Lancer l'application (3 terminaux)

Ouvre **3 terminaux séparés** dans VSCode (`Ctrl+` ` ` puis le `+` en haut à droite)

---

### 🖥 Terminal 1 — MongoDB via Docker

```bash
cd Desktop/agro-ecommerce
docker compose up -d
```

✅ Succès si tu vois : `Container agro-ecommerce-mongodb-1 Started`

---

### 🖥 Terminal 2 — Backend Node.js

```bash
cd Desktop/agro-ecommerce/backend
npm install
npm run dev
```

✅ Succès si tu vois :
```
🚀 Serveur démarré sur le port 5001
✅ MongoDB connecté
```

---

### 🖥 Terminal 3 — Frontend React

```bash
cd Desktop/agro-ecommerce/frontend
npm install
npm start
```

✅ Le navigateur s'ouvre automatiquement sur `http://localhost:3000`

---

## ÉTAPE 6 — Lancer l'app Flutter (mobile)

### Installer un émulateur Android

1. Installe **Android Studio** 👉 https://developer.android.com/studio
2. Une fois installé : `Tools` → `Device Manager` → `Create Device`
3. Choisis un téléphone (ex: Pixel 6) → Next → télécharge une image système → Finish
4. Lance l'émulateur avec le bouton ▶️

### Lancer Flutter

Ouvre un **4ème terminal** :

```bash
cd Desktop/agro-ecommerce/flutter_app
flutter pub get
flutter run
```

> 💡 Sur émulateur Android, l'IP dans `api_service.dart` doit être ton IP locale (pas `10.0.2.2` qui ne fonctionne que dans certains cas)

---

## ✅ Vérification — Tout fonctionne si :

| Test | URL / Action |
|------|-------------|
| Backend API | http://localhost:5001/api/health → `{"status":"ok"}` |
| Liste produits | http://localhost:5001/api/products → `[]` |
| App Web | http://localhost:3000 → page d'accueil verte |
| App Mobile | Émulateur affiche l'écran de connexion |

---

## 🧪 Tester le paiement Stripe

Utilise cette carte de test dans le formulaire de paiement :
- **Numéro** : `4242 4242 4242 4242`
- **Date** : n'importe quelle date future (ex: `12/26`)
- **CVC** : n'importe quoi (ex: `123`)

---

## 🔴 Problèmes fréquents

| Problème | Solution |
|----------|----------|
| `Port 5001 already in use` | Tape `npx kill-port 5001` dans le terminal |
| `Cannot connect to Docker` | Lance Docker Desktop et attends l'icône verte |
| `flutter: command not found` | Vérifie que `C:\flutter\bin` est bien dans le PATH |
| App mobile — erreur réseau | Vérifie que l'IP dans `api_service.dart` est correcte (`ipconfig`) |
| `npm install` échoue | Supprime le dossier `node_modules` et relance `npm install` |
| MongoDB ne démarre pas | `docker compose down` puis `docker compose up -d` |

---

## 📦 Résumé des ports utilisés

| Service | Port |
|---------|------|
| Backend API | 5001 |
| Frontend React | 3000 |
| MongoDB | 27017 |

---

*Guide rédigé pour le workshop Agro E-Commerce — Avril 2026*
