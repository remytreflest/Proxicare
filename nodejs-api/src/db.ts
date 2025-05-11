const { Pool } = require("pg");

const pool = new Pool({
  user: "myuser",
  host: "localhost", // Ou "db" si exécuté dans un autre conteneur Docker
  database: "mydatabase",
  password: "mypassword",
  port: 5432,
});

pool.connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch((err: any) => console.error("❌ Erreur de connexion à PostgreSQL", err));

module.exports = pool;