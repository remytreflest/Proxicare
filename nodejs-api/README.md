# LANCEMENT DU PROJET

npm run migrate (la première fois ou quand il y a un changement)
npm run dev

# MIGRATION

## Créer une migration

npx sequelize-cli migration:generate --name create-patients

## Lancer les migrations

npm run migrate

# TESTS UNITAIRES

## Lancer les tests unitaires

npm run test

## Lancer la couverture de code

npm run coverage

# 🧩 Monorepo Proxicare

Ce dépôt contient deux projets distincts :

/angular-qrcode → Application Angular
/nodejs-api → API Node.js

# 📦 Architecture du projet API

## Technologies utilisées

- Node.js / Express
- TypeScript
- Sequelize (PostgreSQL)
- Jest pour les tests unitaires
- Supertest pour tester les routes
- SonarQube / SonarCloud pour l’analyse de qualité de code et couverture
- ts-node-dev pour le rechargement à chaud en dev

## Structure de /api

/api
├── src
│ ├── models/ → Définition des modèles Sequelize
│ ├── controllers/ → Logique des routes
│ ├── middlewares/ → Middlewares personnalisés (auth, extraction d’ID)
│ ├── config/ → Fichiers de configuration (DB, CORS, etc.)
│ └── app.ts → Initialisation de l’application Express
│
├── tests/ → Tests unitaires (Jest)
│ └── Controllers/
├── **mocks**/ → Mocks Jest pour les modèles Sequelize
│ └── models/ → Models mocké
├── coverage/ → Rapport de couverture Jest (lcov)
├── dist/ → Code compilé (TypeScript)
