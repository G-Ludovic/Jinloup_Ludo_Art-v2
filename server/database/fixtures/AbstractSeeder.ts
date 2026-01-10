// Importer la bibliothèque Faker pour générer des données factices
import { faker } from "@faker-js/faker";

import type { Faker } from "@faker-js/faker";

// Importer le client de base de données
import database from "../client";

import type { Result } from "../client";

// Déclarer un objet pour stocker les objets créés à partir de leurs noms de référence
type Ref = object & { insertId: number };

const refs: { [key: string]: Ref } = {};

type SeederOptions = {
  table: string;
  truncate?: boolean;
  dependencies?: (typeof AbstractSeeder)[];
};

// Fournir un accès Faker via la classe AbstractSeeder
abstract class AbstractSeeder implements SeederOptions {
  table: string;
  truncate: boolean;
  dependencies: (typeof AbstractSeeder)[];
  promises: Promise<void>[];
  faker: Faker;

  constructor({
    table,
    truncate = true,
    dependencies = [] as (typeof AbstractSeeder)[],
  }: SeederOptions) {
    this.table = table;

    this.truncate = truncate;

    this.dependencies = dependencies;

    this.promises = [];

    this.faker = faker;
  }

  async #doInsert(data: { refName?: string } & object) {
    // Extraire le nom de la référence (s'il existe)
    const { refName, ...values } = data;

    // Préparer l'instruction SQL : « insert into <table>(<fields>) values ​​(<placeholders>) »
    const fields = Object.keys(values).join(",");
    const placeholders = new Array(Object.keys(values).length)
      .fill("?")
      .join(",");

    const sql = `insert into ${this.table}(${fields}) values (${placeholders})`;

    // Exécuter la requête et, le cas échéant, stocker l'identifiant d'insertion correspondant au nom de référence
    const [result] = await database.query<Result>(sql, Object.values(values));

    if (refName != null) {
      const { insertId } = result;

      refs[refName] = { ...values, insertId };
    }
  }

  insert(data: { refName?: string } & object) {
    this.promises.push(this.#doInsert(data));
  }

  run() {
    throw new Error("You must implement this function");
  }

  getRef(name: string) {
    return refs[name];
  }
}

// Prêt à exporter
export default AbstractSeeder;

export type { AbstractSeeder };
