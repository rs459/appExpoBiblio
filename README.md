# expoBiblio-frontend

Ce dépôt contient le frontend de l'application mobile expoBiblio, développé avec React Native et Expo. Il permet aux utilisateurs de consulter les livres, auteurs et éditeurs disponibles via l'API REST fournie par le backend.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre machine :

- [Node.js](https://nodejs.org/en/) (version 16 ou supérieure recommandée)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js) ou [Yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) :

  ```bash
  npm install -g expo-cli
  ```

- Un émulateur Android, un simulateur iOS, ou un appareil physique Android/iOS pour tester l'application.

## Installation et Configuration

Suivez ces étapes pour mettre en place l'environnement de développement.

### 1. Installation des dépendances

Une fois que vous avez cloné le projet et que vous êtes dans le répertoire `appExpoBiblio`, installez les dépendances JavaScript avec npm ou Yarn :

```bash
npm install
# ou
yarn install
```

### 2. Configuration de l'API

L'application doit savoir où se connecter à votre backend Symfony. Vous devez configurer l'URL de base de votre API.
Cette configuration se fait via des variables d'environnement.

1. **Créez un fichier `.env` à la racine du projet :**
   Ce fichier sera utilisé pour le développement local.

2. **Modifiez `.env` :**
   Ouvrez le fichier `.env` et ajoutez l'URL de votre backend Symfony. La variable doit commencer par `EXPO_PUBLIC_`.

   ```bash
   # .env
   EXPO_PUBLIC_API_URL=http://192.168.1.XX:8000 # Remplacez par l'IP de votre machine
   ```

   **Attention** : Votre téléphone ou votre simulateur n'a pas accès à `127.0.0.1` ou `localhost`. Utilisez l'adresse IP de votre machine sur le réseau local.
