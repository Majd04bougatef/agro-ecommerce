# 📱 App Mobile Flutter — Agro E-Commerce

## Prérequis

- **Flutter SDK** v3.0+ : [https://flutter.dev/docs/get-started/install](https://flutter.dev/docs/get-started/install)
- **Android Studio** (pour émulateur Android) ou **Xcode** (pour iOS)
- Backend + Frontend démarrés sur `localhost:8080` et `localhost:3000`

---

## Installation (macOS)

### 1. Installer Flutter

```bash
# Télécharger
cd ~/
git clone https://github.com/flutter/flutter.git -b stable
export PATH="$PATH:~/flutter/bin"

# Vérifier
flutter --version
flutter doctor
```

### 2. Configurer l'émulateur Android

```bash
# Lancer Android Studio
open -a "Android Studio"

# Dans Android Studio:
# Tools → Device Manager → Create Virtual Device
# → Pixel 6 + Android 14 (API 34)
```

Ou lancer directement depuis le terminal :
```bash
flutter emulators --launch pixel_6
```

### 3. Préparer le projet Flutter

```bash
cd ~/Desktop/agro-ecommerce/flutter_app
flutter pub get
```

---

## Lancement

### Mode développement (avec hot reload)

```bash
cd ~/Desktop/agro-ecommerce/flutter_app
flutter run
```

**Ou avec un appareil physique connecté :**
```bash
flutter run -d <device-id>
flutter devices  # Voir les appareils disponibles
```

---

## Tests complets

### 1. Inscription
- Ouvre l'app
- Tape un email, mot de passe, sélectionne **Agriculteur**
- Clique **S'inscrire**

### 2. Voir les produits
- Page d'accueil affiche les produits
- Clique sur les catégories pour filtrer
- Ajoute au panier : 🛒

### 3. Panier & Checkout
- Icône 🛒 en haut → voir le panier
- Ajuste les quantités (+/−)
- **Procéder au paiement** → test paiement
- Carte test : `4242 4242 4242 4242` — Exp: 12/34 — CVC: 123

### 4. Flux complet
1. Register → Home → Products → Add to cart
2. Cart → Checkout → Confirm payment
3. Message ✅ de succès

---

## Partager avec ton ami

### Option 1 : Envoyer le code source (+ installation)

Ton ami a besoin de :
1. Flutter SDK installé
2. Cloner le repo ou copier le dossier `flutter_app/`
3. Lancer `flutter pub get` puis `flutter run`

**Avantage** : Travail facile, hot reload en développement  
**Inconvénient** : Il doit installer Flutter

### Option 2 : Envoyer l'APK (Android)

```bash
cd ~/Desktop/agro-ecommerce/flutter_app
flutter build apk --release
```

Fichier généré : `build/app/outputs/flutter-app-release.apk`

**Envoyer l'APK à ton ami** → il installe sur son téléphone Android (pas de Flutter requis)

### Option 3 : Envoyer le .ipa (iPhone)

```bash
cd ~/Desktop/agro-ecommerce/flutter_app
flutter build ios --release
```

Puis utiliser **Xcode** pour envoyer à TestFlight ou créer un `.ipa`.

---

## Dépannage

| Problème | Solution |
|---|---|
| `flutter doctor` affiche des erreurs | Lancer `flutter doctor --android-licenses` |
| Émulateur ne démarre pas | Redémarrer Android Studio, réduire la RAM allouée |
| "Xcode is not installed" (macOS) | `xcode-select --install` ou télécharger via App Store |
| Erreur "No connected devices" | `flutter devices` pour voir les appareils, `flutter run -d <id>` |
| Backend non trouvé | Vérifier que backend tourne sur `http://localhost:8080/api` |

---

## Structure du code

```
flutter_app/
├── lib/
│   ├── models/          Product, CartItem
│   ├── services/        ApiService (requêtes HTTP)
│   ├── providers/       CartProvider (state management)
│   ├── screens/         HomeScreen, ProductsScreen, CartScreen, etc.
│   ├── widgets/         ProductCard
│   └── main.dart
├── pubspec.yaml         Dépendances (http, provider, intl)
└── ...
```

---

## APIs utilisées

L'app communique avec le backend sur `http://localhost:8080/api` :

- `POST /auth/register` — Inscription
- `POST /auth/login` — Connexion
- `GET /products?category=X` — Lister produits
- `POST /orders` — Créer une commande
- `POST /payments/create-payment-intent` — Initier paiement Stripe

**Important** : Le token JWT est stocké en mémoire (pas persistant après redémarrage).

---

## Notes de développement

- **Provider** : Gestion d'état du panier
- **http** : Requêtes API REST
- **Material Design** : UI cohérente avec le frontend React

Modifications faciles :
- Changer `ApiService.baseUrl` pour un autre serveur
- Ajouter des écrans : créer un nouveau fichier dans `screens/`
- Ajouter des providers : créer dans `providers/`
