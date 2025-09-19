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

1. **Créez un fichier de configuration locale :**
    Créez un fichier nommé `config.js` à la racine du projet (au même niveau que `App.js`).

    ```bash
    touch config.js
    ```

2. **Modifiez `config.js` :**
    Ouvrez le fichier `config.js` et ajoutez l'URL de votre backend Symfony.

    ```javascript
    // config.js
    const API_BASE_URL = 'http://192.168.1.XX:8000'; // Remplacez par l'adresse IP de votre machine et le port de Symfony

    export default API_BASE_URL;
