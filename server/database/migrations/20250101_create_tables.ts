import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create tables
  await knex.schema.createTable("item", (table) => {
    table.increments("id").unsigned().primary();
    table.string("title", 255).notNullable();
    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("user", (table) => {
    table.increments("id").unsigned().primary();
    table.string("pseudo", 255).defaultTo("Anonymous");
    table.string("avatar", 255);
    table.string("location", 100);
    table.text("bio");
    table.string("email", 255).notNullable().unique();
    table.string("password", 500).notNullable();
    table
      .enum("role", ["loup alpha", "loup gardien", "jeune loup"])
      .defaultTo("jeune loup");
    table.timestamp("registration_date").defaultTo(knex.fn.now());
    table.timestamp("last_active").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("category", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name", 100).notNullable();
    table.text("description").notNullable();
  });

  await knex.schema.createTable("subject", (table) => {
    table.increments("id").unsigned().primary();
    table.string("title", 100).notNullable();
    table.timestamp("creation_date").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned().notNullable();
    table.integer("category_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .foreign("category_id")
      .references("id")
      .inTable("category")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("message", (table) => {
    table.increments("id").unsigned().primary();
    table.text("content").notNullable();
    table.string("file", 255);
    table.timestamp("sending_date").defaultTo(knex.fn.now());
    table.timestamp("edited_at");
    table.integer("user_id").unsigned().notNullable();
    table.integer("subject_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .foreign("subject_id")
      .references("id")
      .inTable("subject")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("draw", (table) => {
    table.increments("id").unsigned().primary();
    table.string("name", 100).notNullable();
    table.string("image", 255);
    table.integer("user_id").unsigned();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("SET NULL");
  });

  await knex.schema.createTable("comment", (table) => {
    table.increments("id").unsigned().primary();
    table.text("content").notNullable();
    table.timestamp("comment_date").defaultTo(knex.fn.now());
    table.integer("user_id").unsigned().notNullable();
    table.integer("draw_id").unsigned().notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .foreign("draw_id")
      .references("id")
      .inTable("draw")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop tables in reverse order
  await knex.schema.dropTableIfExists("comment");
  await knex.schema.dropTableIfExists("draw");
  await knex.schema.dropTableIfExists("message");
  await knex.schema.dropTableIfExists("subject");
  await knex.schema.dropTableIfExists("category");
  await knex.schema.dropTableIfExists("user");
  await knex.schema.dropTableIfExists("item");
}
