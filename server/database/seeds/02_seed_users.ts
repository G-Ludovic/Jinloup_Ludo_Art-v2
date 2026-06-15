import argon2 from "argon2";
import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Hash passwords
  const hashedPasswords = {
    johndoe: await argon2.hash("password123", {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    }),
    petitloup: await argon2.hash("password123", {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    }),
    jinloup: await argon2.hash("password123", {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    }),
    kitsunekiss: await argon2.hash("password123", {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    }),
  };

  await knex("user").insert([
    {
      pseudo: "Jdoe",
      email: "johndoe@gmail.com",
      password: hashedPasswords.johndoe,
      role: "jeune loup",
      registration_date: new Date("2025-05-25"),
    },
    {
      pseudo: "PetitLoup",
      email: "petitloup@gmail.com",
      password: hashedPasswords.petitloup,
      role: "loup gardien",
      registration_date: new Date("2024-06-14"),
    },
    {
      pseudo: "Jinloup",
      email: "jinshi.wolf@gmail.com",
      password: hashedPasswords.jinloup,
      role: "loup alpha",
      registration_date: new Date("2020-01-22"),
    },
    {
      pseudo: "Kitsune",
      email: "kitsunekiss@gmail.com",
      password: hashedPasswords.kitsunekiss,
      role: "jeune loup",
      registration_date: new Date("2025-01-06"),
    },
  ]);
}
