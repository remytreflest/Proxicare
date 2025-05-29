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
