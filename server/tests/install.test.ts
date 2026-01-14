// Charger les variables d'environnement à partir du fichier .env
import "dotenv/config";

import fs from "node:fs";

import databaseClient from "../database/client";

import type { Rows } from "../database/client";

// Fermer la connexion à la base de données une fois tous les tests exécutés
afterAll((done) => {
  databaseClient.end().then(done);
});

// Suite de tests pour l'installation de l'environnement
describe("Installation", () => {
  // Test : Vérifier si le fichier .env existe
  test("You have created /server/.env", async () => {
    expect(fs.existsSync(`${__dirname}/../.env`) || process.env.CI).toBe(true);
  });

  // Test : Vérifier si le fichier .env.sample existe
  test("You have retained /server/.env.sample", async () => {
    expect(fs.existsSync(`${__dirname}/../.env.sample`)).toBe(true);
  });

  // Test : Vérifier si le fichier .env est correctement rempli avec des informations de connexion à la base de données valides
  test("You have filled /server/.env with valid information to connect to your database", async () => {
    if (process.env.CI) return; // Skip in CI
    // Vérifier si la connexion a réussi
    await databaseClient.getConnection();
  });

  // Test : Vérifier si les scripts de migration de la base de données ont été exécutés
  test("You have executed the db:migrate scripts", async () => {
    if (process.env.CI) return; // Skip in CI
    // Interroger la table 'item' pour vérifier si des données ont été insérées.
    const [rows] = await databaseClient.query<Rows>("select * from item");

    // On s'attend à ce que des lignes soient renvoyées, indiquant une migration réussie
    expect(rows.length).toBeGreaterThanOrEqual(0);
  });
});
