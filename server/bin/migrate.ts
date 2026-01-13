// Charger les variables d'environnement à partir du fichier .env
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

// Construire le chemin d'accès au fichier SQL du schéma
const schema = path.join(__dirname, "../../server/database/schema.sql");

// Récupérer les informations de connexion à la base de données à partir du fichier .env
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Mettre à jour le schéma de la base de données
import mysql from "mysql2/promise";
const migrate = async () => {
  try {
    // Lire les instructions SQL à partir du fichier de schéma
    const sql = fs.readFileSync(schema, "utf8");
    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: Number.parseInt(DB_PORT as string) || 3306,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Autoriser plusieurs requêtes SQL
      ssl: "amazon",
    });
    // Supprimer la base de données existante si elle existe
    await database.query(`DROP DATABASE IF EXISTS \`${DB_NAME}\``);
    // Créer une nouvelle base de données avec le nom spécifié
    await database.query(`CREATE DATABASE \`${DB_NAME}\``);
    // Basculer vers la base de données nouvellement créée
    await database.query(`USE \`${DB_NAME}\``);
    // Exécuter les instructions SQL pour mettre à jour le schéma de la base de données
    await database.query(sql);
    // Fermer la connexion à la base de données
    await database.end();
    console.info(`${DB_NAME} updated from '${path.normalize(schema)}' 🆙`);
  } catch (err) {
    const { message, stack } = err as Error;
    console.error("Error updating the database:", message, stack);
  }
};
// Exécuter la fonction de migration
migrate();
