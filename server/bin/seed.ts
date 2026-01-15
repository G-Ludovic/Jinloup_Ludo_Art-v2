// Charger les variables d'environnement à partir du fichier .env
import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

// Importer le client de base de données
import database from "../database/client";

import type { AbstractSeeder } from "../database/fixtures/AbstractSeeder";

// Fonction pour nettoyer le dossier uploads
const cleanUploadsFolder = () => {
  const uploadsPath = path.join(process.cwd(), "public/uploads");
  if (fs.existsSync(uploadsPath)) {
    const files = fs.readdirSync(uploadsPath);
    for (const file of files) {
      const filePath = path.join(uploadsPath, file);
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn(`Could not delete ${filePath}:`, err);
      }
    }
    console.info("Uploads folder cleaned 🧹");
  }
};

const fixturesPath = path.join(__dirname, "../database/fixtures");

const seed = async () => {
  try {
    const dependencyMap: { [key: string]: AbstractSeeder } = {};

    // Construct each seeder
    const filePaths = fs
      .readdirSync(fixturesPath)
      .filter((filePath: string) => !filePath.startsWith("Abstract"));

    for (const filePath of filePaths) {
      const { default: SeederClass } = await import(
        `file://${path.join(fixturesPath, filePath)}`
      );

      const seeder = new SeederClass() as AbstractSeeder;

      dependencyMap[SeederClass.toString()] = seeder;
    }

    // Trier les seeders en fonction de leurs dépendances
    const sortedSeeders: AbstractSeeder[] = [];

    // The recursive solver
    const solveDependencies = (n: AbstractSeeder) => {
      for (const DependencyClass of n.dependencies) {
        const dependency = dependencyMap[DependencyClass.toString()];

        if (!sortedSeeders.includes(dependency)) {
          solveDependencies(dependency);
        }
      }

      if (!sortedSeeders.includes(n)) {
        sortedSeeders.push(n);
      }
    };

    // Résoudre les dépendances pour chaque seeder
    for (const seeder of Object.values(dependencyMap)) {
      solveDependencies(seeder);
    }

    // Tronquer les tables (en commençant par celles qui en dépendent)

    for (const seeder of sortedSeeders.toReversed()) {
      // Utiliser DELETE au lieu de TRUNCATE pour contourner la contrainte de clé étrangère
      // Attendre la fin de la promesse DELETE
      await database.query(`delete from ${seeder.table}`);
    }

    // Nettoyer le dossier uploads
    cleanUploadsFolder();

    // Exécuter chaque seeder

    for (const seeder of sortedSeeders) {
      await seeder.run();

      // Attendre la fin de toutes les promesses d'insertion
      // Nous souhaitons attendre afin de satisfaire les dépendances
      await Promise.all(seeder.promises);
    }

    // Fermer la connexion à la base de données
    database.end();

    console.info(
      `${process.env.DB_NAME} filled from '${path.normalize(fixturesPath)}' 🌱`,
    );
  } catch (err) {
    const { message, stack } = err as Error;
    console.error("Error filling the database:", message, stack);
  }
};

// Exécuter la fonction de seed
seed();
