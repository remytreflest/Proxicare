# LANCEMENT DU PROJET

npm run migrate
npm run dev

# MIGRATION

## Créer une migration

npx sequelize-cli migration:generate --name create-patients

## Lancer les migrations

npm run migrate

# TESTS UNITAIRES

## Lancer les tests unitaires

npx jest

## Lancer la couverture de code (qui semble à analyser car étonnante)

npx jest --coverage
