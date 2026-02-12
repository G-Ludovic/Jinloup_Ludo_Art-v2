import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const categories = await knex("category").select("id");

  await knex("subject").insert([
    {
      title: "Ici tu peux te présenter à la communauté.",
      user_id: 1,
      category_id: categories[0]?.id || 1,
      creation_date: new Date("2025-12-18 10:55:00"),
    },
    {
      title: "Ajoute ta photo !",
      user_id: 2,
      category_id: categories[1]?.id || 2,
      creation_date: new Date("2025-12-18 10:56:00"),
    },
    {
      title: "Partage tes dessins",
      user_id: 3,
      category_id: categories[2]?.id || 3,
      creation_date: new Date("2025-12-18 10:57:00"),
    },
    {
      title: "Parle de ce que tu aimes",
      user_id: 4,
      category_id: categories[3]?.id || 4,
      creation_date: new Date("2025-12-18 10:58:00"),
    },
    {
      title: "Discutons librement",
      user_id: 1,
      category_id: categories[4]?.id || 5,
      creation_date: new Date("2025-12-18 10:59:00"),
    },
    {
      title: "Retrouve les activités à venir",
      user_id: 2,
      category_id: categories[5]?.id || 6,
      creation_date: new Date("2025-12-18 11:00:00"),
    },
    {
      title: "Besoin de soutien ?",
      user_id: 3,
      category_id: categories[6]?.id || 7,
      creation_date: new Date("2025-12-18 11:01:00"),
    },
    {
      title: "Parlons avenir pro !",
      user_id: 4,
      category_id: categories[7]?.id || 8,
      creation_date: new Date("2025-12-18 11:02:00"),
    },
  ]);
}
