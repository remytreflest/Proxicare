# DEUX CHOIX

Pour que le développement et le test local fonctionne il faut désormais installer une autorité certifiante locale pour obtenir des certificats ssl valide

# CHOIX 1 - LANCER LE FICHIER start-proxicare.bat

## PREREQUIS : Avoir powershell

Fait toutes les étapes du choix 2 +
remplace directement dans le fichier environment.ts (angular) la const YOUR_IP et l'équivalent dans le .env (nodejs) +
lance les deux projets

# CHOIX 2 - Actions manuelles

Installer l'outil mkcert
1 --> `choco install mkcert`
Installer l’autorité de certification locale
2 --> `mkcert -install`
Obtenir son ip v4 locale
3 --> `ipconfig`
les champs `<votre ip>` devront être remplacés par votre IP réelle type 192.168.1.19
Générer les certificats pour ton IP locale
4 --> `cd <le chemin jusqu'au dossier proxicare qui est la racine contenant angular-qrcode et nodejs-api`
5 --> `mkcert <votre ip>`

# LANCER ANGULAR AVEC SSL

`ng serve --ssl true --ssl-cert ../<votre ip>.pem --ssl-key ../<votre ip>-key.pem --host <votre ip>`

---

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
