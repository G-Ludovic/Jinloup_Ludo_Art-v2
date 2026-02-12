import { Knex } from "knex";
import knexfile from "../knexfile";

const env = process.env.NODE_ENV || "development";

async function migrate() {
  const config = knexfile[env as keyof typeof knexfile] as Knex.Config;

  const knex = Knex(config);

  try {
    console.log(`Running migrations in ${env} environment...`);

    await knex.migrate.latest();

    console.log("Migrations completed successfully!");

    await knex.destroy();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

async function seed() {
  const config = knexfile[env as keyof typeof knexfile] as Knex.Config;

  const knex = Knex(config);

  try {
    console.log(`Running seeds in ${env} environment...`);

    await knex.seed.run();

    console.log("Seeds completed successfully!");

    await knex.destroy();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

async function rollback() {
  const config = knexfile[env as keyof typeof knexfile] as Knex.Config;

  const knex = Knex(config);

  try {
    console.log(`Rolling back migrations in ${env} environment...`);

    await knex.migrate.rollback();

    console.log("Rollback completed successfully!");

    await knex.destroy();
  } catch (error) {
    console.error("Rollback failed:", error);
    process.exit(1);
  }
}

const command = process.argv[2];

if (command === "migrate:latest" || command === "migrate") {
  migrate();
} else if (command === "seed:run" || command === "seed") {
  seed();
} else if (command === "migrate:rollback" || command === "rollback") {
  rollback();
} else {
  console.log(
    "Usage: npm run db:migrate:latest | db:seed:run | db:migrate:rollback",
  );
  process.exit(1);
}
